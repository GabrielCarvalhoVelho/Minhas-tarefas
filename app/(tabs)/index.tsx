import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Check, Trash2 } from 'lucide-react-native';

interface Todo {
  id: number;
  title: string;
  is_complete: boolean;
  user_id: string;
}

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
    
    const subscription = supabase
      .channel('todos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, fetchTodos)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTodos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login');
        return;
      }

      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('todos')
        .insert([{ title: newTodo.trim(), user_id: user.id }]);

      if (error) throw error;
      setNewTodo('');
      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ is_complete: !todo.is_complete })
        .eq('id', todo.id);

      if (error) throw error;
      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas tarefas</Text>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicione uma nova tarefa"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={[styles.checkbox, item.is_complete && styles.checkboxChecked]}
              onPress={() => toggleTodo(item)}
            >
              {item.is_complete && <Check size={16} color="#fff" />}
            </TouchableOpacity>
            
            <Text style={[
              styles.todoText,
              item.is_complete && styles.todoTextCompleted
            ]}>
              {item.title}
            </Text>
            
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTodo(item.id)}
            >
              <Trash2 size={20} color="#ff3b30" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    marginTop: 60,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    fontFamily: 'Inter_400Regular',
  },
  addButton: {
    backgroundColor: '#007AFF',
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#8e8e93',
  },
  deleteButton: {
    padding: 8,
  },
  error: {
    color: '#ff3b30',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
});