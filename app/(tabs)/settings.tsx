import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/login');
    } catch (err) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <LogOut size={24} color="#ff3b30" />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  buttonText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#ff3b30',
    fontFamily: 'Inter_600SemiBold',
  },
});