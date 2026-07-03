# FishRank

FishRank é uma rede social para pescadores com feed de capturas, ranking, conquistas, títulos equipáveis e perfis públicos. O projeto usa React 19, Vite, TailwindCSS, Firebase Authentication, Firestore e Cloudinary para imagens.

## Como instalar

```bash
npm install
```

## Como configurar o Firebase

1. Crie um projeto no Firebase Console.
2. Ative Authentication com os provedores Google e Email/Senha.
3. Crie um banco Firestore.
4. Copie `.env.example` para `.env.local`.
5. Preencha as variáveis:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_CLOUDINARY_CLOUD_NAME=hfq3jtuh
VITE_CLOUDINARY_UPLOAD_PRESET=fishrank
```

As chaves ficam centralizadas em `src/firebase/config.js`. Para trocar as credenciais, altere apenas o `.env.local` em desenvolvimento ou as Environment Variables na Vercel.

## Collections previstas

- `users`: perfil, cidade, bio, foto, estatísticas, medalhas, títulos e likes.
- `captures`: foto, peixe, espécie, peso, comprimento, cidade, local, descrição e data.
- `titles`: coleção preparada para expansão futura, embora os títulos base estejam em `src/constants/titles.js`.
- `achievements`: coleção preparada para expansão futura, embora as conquistas base estejam em `src/constants/achievements.js`.
- `likes`: preparada para evolução do sistema de curtidas.

## Como executar

```bash
npm run dev
```

## Como gerar build

```bash
npm run build
```

## Como publicar na Vercel

1. Importe o repositório na Vercel.
2. Configure o framework como Vite.
3. Use `npm run build` como build command.
4. Use `dist` como output directory.
5. Cadastre as variáveis `VITE_FIREBASE_*` e `VITE_CLOUDINARY_*` no painel do projeto.
6. Faça o deploy.

## Estrutura do projeto

```text
src/
  components/common/   Componentes reutilizáveis
  constants/           Títulos, conquistas e listas de apoio
  context/             AuthContext
  firebase/            Inicialização do Firebase
  pages/               Telas da aplicação
  services/            Auth, usuários, capturas, imagens e progressão
  utils/               Formatadores e helpers
```

## Funcionalidades

- Login Google, login email/senha, cadastro e logout.
- Feed de capturas com foto, usuário, título equipado, peixe, peso, comprimento, cidade, data, curtir e compartilhar.
- Nova captura com upload para Cloudinary e registro no Firestore.
- Perfil com foto, cidade, bio, estatísticas, medalhas, títulos e lista de capturas.
- Edição de perfil com foto, nome, cidade, bio e título equipado.
- Ranking por quantidade de peixes, peso total, maior peixe, espécies e medalhas.
- Conquistas categorizadas com status bloqueado/desbloqueado.
- Sistema de títulos desbloqueáveis com um título equipado por vez.
- Atualização automática de estatísticas, conquistas, títulos e ranking após cada captura.
