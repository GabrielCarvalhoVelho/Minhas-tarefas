# 📱 Lista de Tarefas - Aplicativo Expo

Um aplicativo moderno de lista de tarefas construído com Expo e React Native, oferecendo uma experiência multiplataforma com foco em usabilidade e design.

## 🚀 Funcionalidades

- ✅ Gerenciamento completo de tarefas (criar, editar, excluir)
- 👤 Sistema de autenticação seguro
- 🔄 Sincronização em tempo real com Supabase
- 💻 Compatível com Web, iOS e Android
- 🎨 Interface moderna e responsiva

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Expo CLI
- Conta no Supabase (para o backend)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione suas credenciais do Supabase:
```
EXPO_PUBLIC_SUPABASE_URL=sua_url_do_supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 🚀 Como Executar

### Desenvolvimento

```bash
npm run dev
```

### Build para Web

```bash
npm run build:web
```

## 📱 Estrutura do Projeto

```
├── app/                    # Rotas e navegação
│   ├── (auth)/            # Telas de autenticação
│   └── (tabs)/            # Telas principais do app
├── components/            # Componentes reutilizáveis
├── hooks/                 # Hooks personalizados
├── lib/                   # Configurações e utilitários
└── supabase/             # Migrações e configurações do Supabase
```

## 🔒 Autenticação

O aplicativo utiliza o sistema de autenticação do Supabase, oferecendo:
- Login com email e senha
- Registro de novos usuários
- Gerenciamento seguro de sessões

## 💾 Banco de Dados

### Estrutura das Tabelas

#### Tabela: todos
- `id`: Identificador único
- `created_at`: Data de criação
- `title`: Título da tarefa
- `is_complete`: Status de conclusão
- `user_id`: ID do usuário (relacionamento com auth.users)

## 🛡️ Segurança

- Políticas de RLS (Row Level Security) implementadas
- Acesso restrito aos dados do próprio usuário
- Validação de dados em todas as operações

## 🎨 Design e UI

- Interface limpa e intuitiva
- Feedback visual para ações do usuário
- Suporte a temas claros e escuros
- Fontes personalizadas do Google Fonts

## 📦 Principais Dependências

- Expo SDK 52
- Expo Router 4
- Supabase JS
- React Native Reanimated
- Lucide Icons

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
