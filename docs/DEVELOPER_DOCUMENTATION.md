# Architekt kúziel - Dokumentácia pre vývojárov

## Obsah

1. [Úvod](#úvod)
2. [Architektúra systému](#architektúra-systému)
3. [Technologický stack](#technologický-stack)
4. [Inštalácia a nastavenie vývojového prostredia](#inštalácia-a-nastavenie-vývojového-prostredia)
5. [Štruktúra projektu](#štruktúra-projektu)
6. [Frontend](#frontend)
7. [Backend](#backend)
8. [Databáza](#databáza)
9. [AI komponenty](#ai-komponenty)
10. [API dokumentácia](#api-dokumentácia)
11. [Testovanie](#testovanie)
12. [Nasadenie](#nasadenie)
13. [Bezpečnosť](#bezpečnosť)
14. [Výkonnostné optimalizácie](#výkonnostné-optimalizácie)
15. [Rozširovanie aplikácie](#rozširovanie-aplikácie)
16. [Riešenie problémov](#riešenie-problémov)

## Úvod

"Architekt kúziel" je inteligentný, automatizovaný ekosystém pre prácu s informáciami a obsahom. Aplikácia poskytuje intuitívne rozhranie pre interakciu s AI, organizáciu obsahu a tvorbu nových materiálov.

Táto dokumentácia je určená pre vývojárov, ktorí budú pracovať na údržbe, rozširovaní alebo úprave aplikácie. Poskytuje komplexný prehľad o architektúre, technológiách, kódovej základni a postupoch pre vývoj a nasadenie.

## Architektúra systému

Aplikácia "Architekt kúziel" je postavená na modernej mikroslužbovej architektúre s jasným oddelením frontendu a backendu.

### Vysokoúrovňová architektúra

```
+----------------------------------+
|           Frontend               |
|  (Next.js, React, Redux, UI)     |
+----------------------------------+
              |
              | HTTP/WebSocket
              |
+----------------------------------+
|           Backend                |
|  (Node.js, Express, GraphQL)     |
+----------------------------------+
              |
              | ORM
              |
+----------------------------------+
|           Databáza               |
|        (PostgreSQL)              |
+----------------------------------+
              |
              | API
              |
+----------------------------------+
|        Externé služby            |
| (OpenAI API, Groq API, atď.)     |
+----------------------------------+
```

### Kľúčové komponenty

1. **Univerzálny Prompt Interface** - centrálne rozhranie pre interakciu s aplikáciou
2. **Adaptívny Dashboard** - personalizovaný dashboard s konfigurovateľnými widgetmi
3. **MindFinder Navigator** - inteligentná organizácia a vizualizácia obsahu
4. **Content Creation Studio** - pokročilý editor s AI asistentom
5. **AI/ML komponenty** - vrátane Context Analyzer, Semantic Tagger, Pattern Recognizer a ďalších

### Dátový tok

1. Používateľ interaguje s frontend komponentmi
2. Frontend posiela požiadavky na backend API
3. Backend spracováva požiadavky, komunikuje s databázou a externými službami
4. Výsledky sú vrátené na frontend a zobrazené používateľovi
5. Realtime aktualizácie sú zabezpečené cez WebSocket spojenia

## Technologický stack

### Frontend
- **Framework**: Next.js (React)
- **Štátový manažment**: Redux s Redux Toolkit
- **Typovanie**: TypeScript
- **Štýlovanie**: Tailwind CSS, CSS Modules
- **Animácie**: Framer Motion
- **HTTP klient**: Axios
- **Formuláre**: React Hook Form
- **Validácia**: Yup/Zod
- **Testovanie**: Jest, React Testing Library
- **Bundler**: Webpack (cez Next.js)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **API**: GraphQL (Apollo Server), REST
- **Realtime**: Socket.IO
- **Autentifikácia**: JWT, bcrypt
- **Validácia**: Joi
- **Logovanie**: Winston
- **Testovanie**: Mocha, Chai, Supertest

### Databáza
- **Hlavná databáza**: PostgreSQL
- **ORM**: Sequelize
- **Migrácie**: Sequelize CLI
- **Caching**: Redis (voliteľné)

### DevOps
- **Kontajnerizácia**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Nasadenie**: Vercel (frontend), Railway (backend)
- **Monitoring**: Sentry, Prometheus (voliteľné)

### AI/ML
- **Externé API**: OpenAI API, Groq AI API
- **NLP**: Vlastné implementácie, integrácia s externými API

## Inštalácia a nastavenie vývojového prostredia

### Požiadavky
- Node.js (v16+)
- npm (v7+) alebo yarn (v1.22+)
- PostgreSQL (v13+)
- Git

### Kroky inštalácie

1. **Klonovanie repozitára**
   ```bash
   git clone https://github.com/your-org/architekt-kuziel.git
   cd architekt-kuziel
   ```

2. **Inštalácia závislostí**
   ```bash
   # Inštalácia hlavných závislostí
   npm install
   
   # Inštalácia frontend závislostí
   cd src/frontend
   npm install
   cd ../..
   
   # Inštalácia backend závislostí
   cd src/backend
   npm install
   cd ../..
   ```

3. **Nastavenie environment premenných**
   
   Vytvorte súbor `.env` v adresári `src/backend` podľa vzoru `.env.example`:
   ```
   PORT=4000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key_here
   FRONTEND_URL=http://localhost:3000
   DATABASE_URL=postgres://username:password@localhost:5432/architekt_kuziel
   
   # AI API kľúče (voliteľné pre vývoj)
   OPENAI_API_KEY=your_openai_api_key
   GROQ_API_KEY=your_groq_api_key
   PREFERRED_AI_PROVIDER=openai
   ```

4. **Nastavenie databázy**
   ```bash
   # Vytvorenie databázy
   createdb architekt_kuziel
   
   # Spustenie migrácií
   cd src/backend
   npx sequelize-cli db:migrate
   
   # Naplnenie databázy testovacími dátami (voliteľné)
   npx sequelize-cli db:seed:all
   cd ../..
   ```

5. **Spustenie vývojových serverov**
   ```bash
   # Spustenie backendu
   cd src/backend
   npm run dev
   
   # V novom termináli, spustenie frontendu
   cd src/frontend
   npm run dev
   ```

6. **Prístup k aplikácii**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - GraphQL Playground: http://localhost:4000/graphql

## Štruktúra projektu

```
architekt-kuziel/
├── src/
│   ├── frontend/               # Frontend aplikácia (Next.js)
│   │   ├── components/         # React komponenty
│   │   │   ├── AI/             # AI-špecifické komponenty
│   │   │   ├── ContentStudio/  # Komponenty pre tvorbu obsahu
│   │   │   ├── Dashboard/      # Dashboard komponenty
│   │   │   ├── Integration/    # Integračné komponenty
│   │   │   ├── Layout/         # Layouty a štruktúrne komponenty
│   │   │   ├── MindFinder/     # Komponenty pre navigáciu obsahu
│   │   │   └── UniversalPrompt/ # Komponenty pre univerzálny prompt
│   │   ├── contexts/           # React kontexty
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Next.js stránky
│   │   ├── public/             # Statické súbory
│   │   ├── services/           # Služby pre API volania
│   │   ├── store/              # Redux store a slice-y
│   │   │   └── slices/         # Redux slice moduly
│   │   ├── styles/             # Globálne štýly
│   │   ├── utils/              # Pomocné utility
│   │   ├── __tests__/          # Testy
│   │   ├── next.config.js      # Next.js konfigurácia
│   │   ├── package.json        # Frontend závislosti
│   │   └── tsconfig.json       # TypeScript konfigurácia
│   │
│   ├── backend/                # Backend aplikácia (Node.js/Express)
│   │   ├── config/             # Konfiguračné súbory
│   │   ├── middleware/         # Express middleware
│   │   ├── models/             # Sequelize modely
│   │   ├── routes/             # API routes
│   │   ├── schema/             # GraphQL schema
│   │   │   ├── resolvers.js    # GraphQL resolvery
│   │   │   └── typeDefs.js     # GraphQL typy
│   │   ├── services/           # Biznis logika a služby
│   │   ├── utils/              # Pomocné utility
│   │   ├── .env                # Environment premenné
│   │   ├── .env.example        # Vzor pre environment premenné
│   │   ├── server.js           # Hlavný entry point
│   │   └── package.json        # Backend závislosti
│   │
│   └── shared/                 # Zdieľané moduly medzi frontend a backend
│       └── types/              # TypeScript typy
│
├── scripts/                    # Utility skripty
├── docs/                       # Dokumentácia
├── deployment-web/             # Súbory pre nasadenie
├── docker-compose.yml          # Docker Compose konfigurácia
├── package.json                # Hlavné závislosti a skripty
├── tsconfig.json               # Hlavná TypeScript konfigurácia
└── README.md                   # Hlavný README súbor
```

## Frontend

### Kľúčové komponenty

#### Univerzálny Prompt (UniversalPrompt)
Centrálne rozhranie pre interakciu s aplikáciou, ktoré umožňuje používateľom zadávať príkazy, otázky a požiadavky v prirodzenom jazyku.

```jsx
// Príklad použitia UniversalPrompt komponentu
import { UniversalPrompt } from '../components/UniversalPrompt/UniversalPrompt';

const MyComponent = () => {
  const handlePromptSubmit = (prompt) => {
    // Spracovanie promptu
    console.log('Prompt submitted:', prompt);
  };

  return (
    <div>
      <UniversalPrompt onSubmit={handlePromptSubmit} />
    </div>
  );
};
```

#### Adaptívny Dashboard (AdaptiveDashboard)
Personalizovaný dashboard s konfigurovateľnými widgetmi, ktorý sa prispôsobuje potrebám používateľa.

```jsx
// Príklad použitia AdaptiveDashboard komponentu
import { AdaptiveDashboard } from '../components/Dashboard/AdaptiveDashboard';

const DashboardPage = () => {
  const widgets = [
    { id: 'recent', type: 'recent-content', title: 'Nedávny obsah' },
    { id: 'stats', type: 'statistics', title: 'Štatistiky' },
    // Ďalšie widgety...
  ];

  return (
    <div>
      <AdaptiveDashboard widgets={widgets} />
    </div>
  );
};
```

#### MindFinder Navigator (MindFinderNavigator)
Inteligentná organizácia a vizualizácia obsahu, ktorá pomáha používateľom navigovať a objavovať súvislosti medzi informáciami.

```jsx
// Príklad použitia MindFinderNavigator komponentu
import { MindFinderNavigator } from '../components/MindFinder/MindFinderNavigator';

const ContentExplorerPage = () => {
  const contentItems = [
    // Položky obsahu...
  ];

  return (
    <div>
      <MindFinderNavigator items={contentItems} />
    </div>
  );
};
```

#### Content Creation Studio (ContentCreationStudio)
Pokročilý editor s AI asistentom pre tvorbu a úpravu obsahu.

```jsx
// Príklad použitia ContentCreationStudio komponentu
import { ContentCreationStudio } from '../components/ContentStudio/ContentCreationStudio';

const CreateContentPage = () => {
  const handleSave = (content) => {
    // Uloženie obsahu
    console.log('Content saved:', content);
  };

  return (
    <div>
      <ContentCreationStudio onSave={handleSave} />
    </div>
  );
};
```

### Redux Store

Aplikácia používa Redux pre globálny stav s Redux Toolkit pre zjednodušenie práce s Reduxom.

```jsx
// Príklad použitia Redux store
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/slices/authSlice';

const AuthComponent = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = (credentials) => {
    dispatch(login(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Odhlásiť sa</button>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
};
```

### Routing

Aplikácia používa Next.js routing systém.

```jsx
// Príklad vytvorenia novej stránky
// pages/my-new-page.tsx
import { NextPage } from 'next';
import { MainLayout } from '../components/Layout/MainLayout';

const MyNewPage: NextPage = () => {
  return (
    <MainLayout>
      <h1>Moja nová stránka</h1>
      <p>Obsah stránky...</p>
    </MainLayout>
  );
};

export default MyNewPage;
```

### API volania

Aplikácia používa Axios pre API volania.

```jsx
// Príklad API volania
import { api } from '../services/api';

const fetchData = async () => {
  try {
    const response = await api.get('/api/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
```

## Backend

### Server

Backend server je postavený na Express.js s podporou pre REST API a GraphQL.

```javascript
// Základná štruktúra server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const authMiddleware = require('./middleware/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(authMiddleware);

// REST API routes
require('./routes/userRoutes')(app);
require('./routes/contentRoutes')(app);
require('./routes/aiRoutes')(app);

// GraphQL server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user })
});

apolloServer.applyMiddleware({ app });

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
});
```

### Modely

Aplikácia používa Sequelize ORM pre prácu s databázou.

```javascript
// Príklad modelu User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });

  User.prototype.validatePassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.hasMany(models.Content, { foreignKey: 'userId', as: 'contents' });
    User.hasMany(models.Widget, { foreignKey: 'userId', as: 'widgets' });
  };

  return User;
};
```

### API Routes

Aplikácia poskytuje REST API endpointy.

```javascript
// Príklad routes/contentRoutes.js
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middleware/auth');

module.exports = (app) => {
  // Get all content
  app.get('/api/content', authMiddleware, contentController.getAllContent);
  
  // Get content by ID
  app.get('/api/content/:id', authMiddleware, contentController.getContentById);
  
  // Create new content
  app.post('/api/content', authMiddleware, contentController.createContent);
  
  // Update content
  app.put('/api/content/:id', authMiddleware, contentController.updateContent);
  
  // Delete content
  app.delete('/api/content/:id', authMiddleware, contentController.deleteContent);
  
  // Search content
  app.get('/api/content/search', authMiddleware, contentController.searchContent);
};
```

### GraphQL Schema

Aplikácia poskytuje GraphQL API.

```javascript
// Príklad schema/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    contents: [Content]
    widgets: [Widget]
    createdAt: String!
    updatedAt: String!
  }

  type Content {
    id: ID!
    title: String!
    body: String!
    tags: [String]
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Widget {
    id: ID!
    type: String!
    title: String!
    config: String
    position: Int
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    user(id: ID!): User
    users: [User]
    content(id: ID!): Content
    contents: [Content]
    searchContents(query: String!): [Content]
    widgets: [Widget]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createContent(title: String!, body: String!, tags: [String]): Content!
    updateContent(id: ID!, title: String, body: String, tags: [String]): Content!
    deleteContent(id: ID!): Boolean!
    createWidget(type: String!, title: String!, config: String, position: Int): Widget!
    updateWidget(id: ID!, title: String, config: String, position: Int): Widget!
    deleteWidget(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
```

```javascript
// Príklad schema/resolvers.js
const jwt = require('jsonwebtoken');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Content, Widget } = require('../models');

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return User.findByPk(user.id, {
        include: [
          { model: Content, as: 'contents' },
          { model: Widget, as: 'widgets' }
        ]
      });
    },
    // Ďalšie query resolvery...
  },
  
  Mutation: {
    register: async (_, { username, email, password }) => {
      // Implementácia registrácie...
    },
    
    login: async (_, { email, password }) => {
      // Implementácia prihlásenia...
    },
    
    // Ďalšie mutation resolvery...
  },
  
  // Ďalšie resolvery pre typy...
};

module.exports = resolvers;
```

## Databáza

### Schéma databázy

Hlavné entity v databáze:

1. **Users** - používatelia aplikácie
2. **Contents** - obsah vytvorený používateľmi
3. **Tags** - tagy pre kategorizáciu obsahu
4. **Widgets** - konfigurovateľné widgety pre dashboard
5. **AISuggestions** - návrhy a odporúčania od AI

### Vzťahy medzi entitami

```
User 1:N Content (Používateľ môže mať viacero obsahov)
User 1:N Widget (Používateľ môže mať viacero widgetov)
Content N:M Tag (Obsah môže mať viacero tagov a tag môže byť priradený k viacerým obsahom)
Content 1:N AISuggestion (Obsah môže mať viacero AI návrhov)
```

### Migrácie

Aplikácia používa Sequelize CLI pre správu migrácií.

```bash
# Vytvorenie novej migrácie
npx sequelize-cli migration:generate --name add-new-field

# Spustenie migrácií
npx sequelize-cli db:migrate

# Rollback poslednej migrácie
npx sequelize-cli db:migrate:undo
```

## AI komponenty

### Architektúra AI komponentov

```
+----------------------------------+
|       Frontend AI komponenty     |
|  (React komponenty pre AI UI)    |
+----------------------------------+
              |
              | API volania
              |
+----------------------------------+
|       Backend AI služby          |
|  (Spracovanie a integrácia AI)   |
+----------------------------------+
              |
              | API volania
              |
+----------------------------------+
|       Externé AI API             |
|  (OpenAI API, Groq API)          |
+----------------------------------+
```

### Kľúčové AI komponenty

1. **Context Analyzer** - analýza kontextu a obsahu
2. **Semantic Tagger** - automatické tagovanie obsahu
3. **Pattern Recognizer** - rozpoznávanie vzorov v dátach
4. **Content Generator** - generovanie obsahu
5. **Predictive Engine** - predikcia akcií používateľa

### Integrácia s AI API

Aplikácia podporuje integráciu s OpenAI API a Groq AI API.

```javascript
// Príklad použitia AI služby
const enhancedAiService = require('../services/enhancedAiService');

// Analýza obsahu
const analysis = await enhancedAiService.analyzeContent(text);

// Generovanie obsahu
const options = {
  prompt: "Umelá inteligencia v modernom svete",
  type: "article",
  tone: "technical",
  language: "sk"
};
const content = await enhancedAiService.generateContent(options);

// Predikcia akcií používateľa
const userContext = {
  recentActivities: ["content_creation", "tag_browsing"],
  preferences: { usesTags: true },
  role: "editor"
};
const predictions = await enhancedAiService.predictUserActions(userContext);

// Sumarizácia obsahu
const options = {
  maxLength: 150,
  extractKeyPoints: true,
  extractActionItems: true
};
const summary = await enhancedAiService.summarizeContent(longText, options);
```

### Konfigurácia AI

Konfigurácia AI služieb sa vykonáva prostredníctvom environment premenných:

```
# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Groq AI API
GROQ_API_KEY=your_groq_api_key

# Preferovaný poskytovateľ AI (openai alebo groq)
PREFERRED_AI_PROVIDER=openai
```

## API dokumentácia

### REST API

#### Autentifikácia

```
POST /api/auth/register
- Registrácia nového používateľa
- Body: { username, email, password }
- Response: { token, user }

POST /api/auth/login
- Prihlásenie používateľa
- Body: { email, password }
- Response: { token, user }
```

#### Používatelia

```
GET /api/users
- Získanie zoznamu používateľov (len pre admin)
- Headers: Authorization: Bearer {token}
- Response: [{ id, username, email, role, createdAt, updatedAt }, ...]

GET /api/users/:id
- Získanie detailov používateľa
- Headers: Authorization: Bearer {token}
- Response: { id, username, email, role, createdAt, updatedAt }

PUT /api/users/:id
- Aktualizácia používateľa
- Headers: Authorization: Bearer {token}
- Body: { username, email, password, role }
- Response: { id, username, email, role, createdAt, updatedAt }
```

#### Obsah

```
GET /api/content
- Získanie zoznamu obsahov
- Headers: Authorization: Bearer {token}
- Query: { page, limit, sort, filter }
- Response: { items: [{ id, title, body, tags, userId, createdAt, updatedAt }, ...], total, page, limit }

GET /api/content/:id
- Získanie detailov obsahu
- Headers: Authorization: Bearer {token}
- Response: { id, title, body, tags, userId, createdAt, updatedAt }

POST /api/content
- Vytvorenie nového obsahu
- Headers: Authorization: Bearer {token}
- Body: { title, body, tags }
- Response: { id, title, body, tags, userId, createdAt, updatedAt }

PUT /api/content/:id
- Aktualizácia obsahu
- Headers: Authorization: Bearer {token}
- Body: { title, body, tags }
- Response: { id, title, body, tags, userId, createdAt, updatedAt }

DELETE /api/content/:id
- Odstránenie obsahu
- Headers: Authorization: Bearer {token}
- Response: { success: true }

GET /api/content/search
- Vyhľadávanie v obsahu
- Headers: Authorization: Bearer {token}
- Query: { q, tags, page, limit }
- Response: { items: [{ id, title, body, tags, userId, createdAt, updatedAt }, ...], total, page, limit }
```

#### Widgety

```
GET /api/widgets
- Získanie zoznamu widgetov
- Headers: Authorization: Bearer {token}
- Response: [{ id, type, title, config, position, userId, createdAt, updatedAt }, ...]

POST /api/widgets
- Vytvorenie nového widgetu
- Headers: Authorization: Bearer {token}
- Body: { type, title, config, position }
- Response: { id, type, title, config, position, userId, createdAt, updatedAt }

PUT /api/widgets/:id
- Aktualizácia widgetu
- Headers: Authorization: Bearer {token}
- Body: { title, config, position }
- Response: { id, type, title, config, position, userId, createdAt, updatedAt }

DELETE /api/widgets/:id
- Odstránenie widgetu
- Headers: Authorization: Bearer {token}
- Response: { success: true }
```

#### AI

```
POST /api/ai/enhanced/analyze
- Analýza obsahu
- Headers: Authorization: Bearer {token}
- Body: { text }
- Response: { tags, sentiment, entities, summary, language, categories }

POST /api/ai/enhanced/generate
- Generovanie obsahu
- Headers: Authorization: Bearer {token}
- Body: { prompt, type, tone, language }
- Response: { content }

POST /api/ai/enhanced/predict
- Predikcia akcií používateľa
- Headers: Authorization: Bearer {token}
- Body: { userContext }
- Response: { predictions: [{ action, probability, context, recommendation }, ...] }

POST /api/ai/enhanced/summarize
- Sumarizácia obsahu
- Headers: Authorization: Bearer {token}
- Body: { text, maxLength, extractKeyPoints, extractActionItems }
- Response: { summary, keyPoints, actionItems }
```

### GraphQL API

GraphQL endpoint je dostupný na `/graphql`. Kompletná dokumentácia je dostupná v GraphQL Playground na `/graphql` pri spustenom serveri.

#### Príklady GraphQL queries

```graphql
# Získanie informácií o prihlásenom používateľovi
query Me {
  me {
    id
    username
    email
    role
    contents {
      id
      title
    }
    widgets {
      id
      type
      title
    }
  }
}

# Vytvorenie nového obsahu
mutation CreateContent {
  createContent(
    title: "Nový obsah"
    body: "Toto je obsah nového príspevku."
    tags: ["tag1", "tag2"]
  ) {
    id
    title
    body
    tags
    createdAt
  }
}

# Vyhľadávanie v obsahu
query SearchContents {
  searchContents(query: "umelá inteligencia") {
    id
    title
    body
    tags
    user {
      username
    }
  }
}
```

## Testovanie

### Frontend testy

Aplikácia používa Jest a React Testing Library pre testovanie frontend komponentov.

```jsx
// Príklad testu komponentu
import { render, screen, fireEvent } from '@testing-library/react';
import { UniversalPrompt } from '../components/UniversalPrompt/UniversalPrompt';

describe('UniversalPrompt', () => {
  test('renders input field', () => {
    render(<UniversalPrompt onSubmit={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/zadajte príkaz/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onSubmit when form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<UniversalPrompt onSubmit={handleSubmit} />);
    
    const inputElement = screen.getByPlaceholderText(/zadajte príkaz/i);
    const submitButton = screen.getByRole('button', { name: /odoslať/i });
    
    fireEvent.change(inputElement, { target: { value: 'test prompt' } });
    fireEvent.click(submitButton);
    
    expect(handleSubmit).toHaveBeenCalledWith('test prompt');
  });
});
```

### Backend testy

Aplikácia používa Mocha, Chai a Supertest pre testovanie backend API.

```javascript
// Príklad testu API
const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const { User } = require('../models');

describe('Auth API', () => {
  before(async () => {
    // Setup test database
    await User.destroy({ where: {} });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('token');
      expect(res.body.user).to.have.property('username', 'testuser');
    });

    it('should return error for duplicate email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser2',
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
    });
  });

  // Ďalšie testy...
});
```

### Spustenie testov

```bash
# Spustenie frontend testov
cd src/frontend
npm test

# Spustenie backend testov
cd src/backend
npm test
```

## Nasadenie

### Nasadenie na Vercel (Frontend)

1. **Príprava projektu**
   ```bash
   cd src/frontend
   npm run build
   ```

2. **Nasadenie pomocou Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

3. **Konfigurácia environment premenných na Vercel**
   - `NEXT_PUBLIC_API_URL`: URL backendu (napr. https://api-architekt-kuziel.up.railway.app)
   - `NEXT_PUBLIC_GROQ_API_KEY`: Groq API kľúč (ak používate Groq AI)

### Nasadenie na Railway (Backend)

1. **Príprava projektu**
   ```bash
   cd src/backend
   npm run build
   ```

2. **Nasadenie pomocou Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

3. **Konfigurácia environment premenných na Railway**
   - `PORT`: 4000
   - `NODE_ENV`: production
   - `JWT_SECRET`: bezpečný tajný kľúč
   - `FRONTEND_URL`: URL frontendu (napr. https://architekt-kuziel.vercel.app)
   - `DATABASE_URL`: URL PostgreSQL databázy
   - `OPENAI_API_KEY`: OpenAI API kľúč
   - `GROQ_API_KEY`: Groq API kľúč
   - `PREFERRED_AI_PROVIDER`: openai alebo groq

### Nasadenie pomocou Docker

1. **Build Docker obrazov**
   ```bash
   docker-compose build
   ```

2. **Spustenie kontajnerov**
   ```bash
   docker-compose up -d
   ```

## Bezpečnosť

### Autentifikácia a autorizácia

Aplikácia používa JWT (JSON Web Tokens) pre autentifikáciu a autorizáciu používateľov.

```javascript
// Príklad middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Bezpečnostné best practices

1. **Hašovanie hesiel** - Aplikácia používa bcrypt pre bezpečné hašovanie hesiel
2. **HTTPS** - Všetka komunikácia by mala prebiehať cez HTTPS
3. **CORS** - Správna konfigurácia CORS pre obmedzenie prístupu
4. **Rate limiting** - Obmedzenie počtu požiadaviek pre prevenciu DoS útokov
5. **Input validácia** - Validácia všetkých vstupov od používateľa
6. **Sanitizácia výstupov** - Prevencia XSS útokov
7. **Content Security Policy** - Ochrana pred rôznymi typmi útokov
8. **Bezpečné cookies** - Použitie secure a httpOnly cookies
9. **Dependency scanning** - Pravidelná kontrola závislostí na zraniteľnosti

## Výkonnostné optimalizácie

### Frontend optimalizácie

1. **Code splitting** - Rozdelenie kódu pre rýchlejšie načítanie
2. **Lazy loading** - Odložené načítanie komponentov
3. **Memoizácia** - Použitie React.memo, useMemo a useCallback
4. **Optimalizácia obrázkov** - Použitie next/image pre optimalizáciu obrázkov
5. **Bundle analýza** - Pravidelná analýza veľkosti bundle

```jsx
// Príklad lazy loading
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('../components/HeavyComponent'));

const MyComponent = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
};
```

### Backend optimalizácie

1. **Caching** - Implementácia cache pre často používané dáta
2. **Pagination** - Stránkovanie pre veľké množstvo dát
3. **Indexy** - Správne indexy v databáze
4. **Query optimalizácia** - Optimalizácia databázových dotazov
5. **Compression** - Kompresia odpovedí

```javascript
// Príklad implementácie cache
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minút TTL

const getCachedData = async (key, fetchFunction) => {
  const cachedData = cache.get(key);
  
  if (cachedData) {
    return cachedData;
  }
  
  const data = await fetchFunction();
  cache.set(key, data);
  return data;
};
```

## Rozširovanie aplikácie

### Pridanie nového komponentu

1. **Vytvorenie React komponentu**
   ```jsx
   // components/NewFeature/NewFeatureComponent.tsx
   import React from 'react';
   
   interface NewFeatureComponentProps {
     title: string;
     // Ďalšie props...
   }
   
   export const NewFeatureComponent: React.FC<NewFeatureComponentProps> = ({ title }) => {
     return (
       <div className="new-feature">
         <h2>{title}</h2>
         {/* Obsah komponentu */}
       </div>
     );
   };
   ```

2. **Vytvorenie novej stránky**
   ```jsx
   // pages/new-feature.tsx
   import { NextPage } from 'next';
   import { MainLayout } from '../components/Layout/MainLayout';
   import { NewFeatureComponent } from '../components/NewFeature/NewFeatureComponent';
   
   const NewFeaturePage: NextPage = () => {
     return (
       <MainLayout>
         <NewFeatureComponent title="Nová funkcia" />
       </MainLayout>
     );
   };
   
   export default NewFeaturePage;
   ```

3. **Pridanie do navigácie**
   ```jsx
   // components/Layout/Sidebar.tsx
   // Pridanie novej položky do navigácie
   const navigationItems = [
     // Existujúce položky...
     {
       name: 'Nová funkcia',
       href: '/new-feature',
       icon: NewFeatureIcon
     }
   ];
   ```

### Pridanie novej API endpoint

1. **Vytvorenie nového controllera**
   ```javascript
   // controllers/newFeatureController.js
   const { NewFeature } = require('../models');
   
   exports.getAllNewFeatures = async (req, res) => {
     try {
       const newFeatures = await NewFeature.findAll();
       res.json(newFeatures);
     } catch (error) {
       console.error('Error fetching new features:', error);
       res.status(500).json({ error: 'Internal server error' });
     }
   };
   
   // Ďalšie metódy controllera...
   ```

2. **Vytvorenie nových routes**
   ```javascript
   // routes/newFeatureRoutes.js
   const newFeatureController = require('../controllers/newFeatureController');
   const authMiddleware = require('../middleware/auth');
   
   module.exports = (app) => {
     app.get('/api/new-features', authMiddleware, newFeatureController.getAllNewFeatures);
     // Ďalšie routes...
   };
   ```

3. **Registrácia routes v server.js**
   ```javascript
   // server.js
   // Pridanie nových routes
   require('./routes/newFeatureRoutes')(app);
   ```

### Pridanie nového modelu

1. **Vytvorenie migrácie**
   ```bash
   npx sequelize-cli model:generate --name NewFeature --attributes name:string,description:text,isActive:boolean
   ```

2. **Úprava modelu**
   ```javascript
   // models/NewFeature.js
   const { DataTypes } = require('sequelize');
   
   module.exports = (sequelize) => {
     const NewFeature = sequelize.define('NewFeature', {
       id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true
       },
       name: {
         type: DataTypes.STRING,
         allowNull: false
       },
       description: {
         type: DataTypes.TEXT
       },
       isActive: {
         type: DataTypes.BOOLEAN,
         defaultValue: true
       }
     });
   
     NewFeature.associate = (models) => {
       NewFeature.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
     };
   
     return NewFeature;
   };
   ```

3. **Spustenie migrácie**
   ```bash
   npx sequelize-cli db:migrate
   ```

## Riešenie problémov

### Časté problémy a ich riešenia

#### Frontend

1. **Problém**: Komponenty sa neaktualizujú po zmene stavu
   **Riešenie**: Skontrolujte, či používate správne React hooks a či sú závislosti v useEffect správne nastavené

2. **Problém**: Chyby pri kompilácii TypeScript
   **Riešenie**: Skontrolujte typy a rozhrania, aktualizujte definície typov

3. **Problém**: Problémy s routingom v Next.js
   **Riešenie**: Skontrolujte štruktúru adresára pages a správne použitie next/router

4. **Problém**: Problémy s Redux stavom
   **Riešenie**: Použite Redux DevTools pre debugovanie stavu, skontrolujte správne použitie dispatch a selektorov

#### Backend

1. **Problém**: Chyby pri pripojení k databáze
   **Riešenie**: Skontrolujte connection string, prístupové údaje a dostupnosť databázy

2. **Problém**: Problémy s autentifikáciou
   **Riešenie**: Skontrolujte JWT token, secret key a middleware

3. **Problém**: Problémy s ORM a databázovými dotazmi
   **Riešenie**: Skontrolujte modely, asociácie a SQL dotazy

4. **Problém**: Problémy s AI API
   **Riešenie**: Skontrolujte API kľúče, formát požiadaviek a odpovede, rate limity

### Logovanie a monitoring

Aplikácia používa Winston pre logovanie a Sentry pre monitoring chýb.

```javascript
// Príklad konfigurácie logovania
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Použitie loggera
logger.info('Server started', { port: process.env.PORT });
logger.error('Database connection error', { error: err.message });
```

### Debugovanie

#### Frontend debugovanie

1. **React DevTools** - Debugovanie React komponentov a ich props
2. **Redux DevTools** - Debugovanie Redux stavu a akcií
3. **Chrome DevTools** - Debugovanie JavaScript, CSS a sieťových požiadaviek
4. **Next.js debugovanie** - Použitie `next dev --debug` pre detailné logy

#### Backend debugovanie

1. **Node.js debugger** - Použitie `node --inspect server.js` pre pripojenie debuggera
2. **VS Code debugger** - Konfigurácia VS Code pre debugovanie Node.js
3. **Postman/Insomnia** - Testovanie API endpointov
4. **Morgan** - HTTP request logging middleware

```javascript
// Príklad použitia Morgan pre logovanie HTTP requestov
const morgan = require('morgan');
app.use(morgan('dev'));
```

---

Táto dokumentácia poskytuje komplexný prehľad o aplikácii "Architekt kúziel" pre vývojárov. Pre ďalšie informácie alebo pomoc kontaktujte tím vývojárov alebo pozrite si zdrojový kód a komentáre v kóde.
