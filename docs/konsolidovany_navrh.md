# Konsolidovaný návrh aplikácie "Architekt kúziel"

## Úvod

Tento dokument predstavuje konsolidovaný návrh webovej aplikácie "Architekt kúziel", ktorá implementuje kľúčové koncepty z existujúceho konceptuálneho návrhu čarovnej aplikácie. Návrh je zameraný na vytvorenie používateľsky prívetivej, inteligentnej a adaptívnej webovej aplikácie, ktorá pomáha používateľom efektívne pracovať s informáciami a obsahom.

## Zjednodušená architektúra pre webovú implementáciu

### Vysokoúrovňový pohľad na architektúru

```
+-------------------------------------------------------+
|                                                       |
|                  Frontend (Next.js)                   |
|                                                       |
|  +----------------+  +----------------+  +---------+  |
|  |   Univerzálny  |  |   Adaptívny    |  |         |  |
|  |     Prompt     |  |    Dashboard   |  |  Ďalšie |  |
|  |   Interface    |  |                |  |    UI   |  |
|  +----------------+  +----------------+  +---------+  |
|                                                       |
+------------------------+----------------------------+--+
                         |
                         v
+------------------------+----------------------------+--+
|                                                       |
|                  Backend (Node.js)                    |
|                                                       |
|  +----------------+  +----------------+  +---------+  |
|  |    GraphQL     |  |     AI/ML      |  |         |  |
|  |      API       |  |    Services    |  | Ďalšie  |  |
|  |                |  |                |  |Služby   |  |
|  +----------------+  +----------------+  +---------+  |
|                                                       |
+------------------------+----------------------------+--+
                         |
                         v
+------------------------+----------------------------+--+
|                                                       |
|                  Dátová vrstva                        |
|                                                       |
|  +----------------+  +----------------+  +---------+  |
|  |   PostgreSQL   |  |  Elasticsearch  |  |         |  |
|  |    Databáza    |  |                |  |  Redis  |  |
|  |                |  |                |  |         |  |
|  +----------------+  +----------------+  +---------+  |
|                                                       |
+-------------------------------------------------------+
```

### Komponenty architektúry

#### 1. Frontend vrstva

Frontend aplikácie bude implementovaný pomocou React a Next.js, s dôrazom na responzívny dizajn, plynulé animácie a intuitívne používateľské rozhranie.

**Kľúčové komponenty:**
- **Univerzálny Prompt Interface** - hlavný vstupný bod pre interakciu s aplikáciou
- **Adaptívny Dashboard** - personalizované rozhranie s konfigurovateľnými widgetmi
- **MindFinder Navigator** - inteligentný systém pre navigáciu a organizáciu obsahu
- **Content Creation Studio** - nástroje pre tvorbu a úpravu obsahu
- **Notifikačný systém** - proaktívne upozornenia a návrhy

**Technológie:**
- React a Next.js pre framework
- Tailwind CSS pre štýlovanie
- Redux Toolkit pre správu stavu
- Framer Motion pre animácie
- D3.js pre vizualizácie

#### 2. Backend vrstva

Backend aplikácie bude postavený na Node.js s Express.js, poskytujúc GraphQL API pre komunikáciu s frontendovou časťou a integráciu s AI/ML službami.

**Kľúčové komponenty:**
- **GraphQL API** - jednotné rozhranie pre prístup k dátam a službám
- **AI/ML Services** - služby pre spracovanie prirodzeného jazyka, analýzu kontextu a predikciu
- **Authentication Service** - služba pre autentifikáciu a autorizáciu
- **Content Service** - služba pre správu obsahu
- **User Service** - služba pre správu používateľov a preferencií

**Technológie:**
- Node.js s Express.js
- Apollo Server pre GraphQL
- JWT pre autentifikáciu
- Socket.IO pre real-time komunikáciu

#### 3. Dátová vrstva

Dátová vrstva zabezpečuje perzistenciu dát, vyhľadávanie a cache.

**Kľúčové komponenty:**
- **PostgreSQL** - primárna databáza s pgvector pre vektorové vyhľadávanie
- **Elasticsearch** - vyhľadávací engine pre full-text vyhľadávanie
- **Redis** - in-memory databáza pre cache a dočasné úložisko
- **MinIO** - object storage pre súbory a médiá

### Integrácia AI/ML komponentov

AI/ML komponenty budú implementované kombináciou client-side a server-side spracovania:

1. **Client-side ML** (pomocou TensorFlow.js):
   - Základné predikcie používateľských preferencií
   - Jednoduchá analýza vstupu
   - Personalizácia UI

2. **Server-side ML** (pomocou Hugging Face Transformers):
   - Pokročilé spracovanie prirodzeného jazyka
   - Kontextová analýza
   - Sémantické tagovanie
   - Generovanie obsahu

3. **Hybridný prístup**:
   - Client-side pre okamžitú spätnú väzbu
   - Server-side pre komplexné úlohy
   - Synchronizácia modelov medzi klientom a serverom

## Používateľské rozhranie a tok interakcií

### Hlavné obrazovky aplikácie

#### 1. Prihlasovacia obrazovka
- Prihlásenie a registrácia
- Základné informácie o aplikácii
- Ukážky funkcií a možností

#### 2. Adaptívny Dashboard
- Personalizovaný prehľad
- Konfigurovateľné widgety
- Rýchly prístup k častým akciám
- Notifikácie a upozornenia

```
+------------------------------------------------------------------+
|                                                                  |
|  +------------------+  +------------------+  +------------------+ |
|  |                  |  |                  |  |                  | |
|  |  Personalizované |  |   Nedávne        |  |   Odporúčané     | |
|  |     widgety      |  |   aktivity       |  |    obsah         | |
|  |                  |  |                  |  |                  | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                  |
|  +------------------+  +------------------+                      |
|  |                  |  |                  |                      |
|  |  Rýchly prístup  |  |  Notifikácie     |                      |
|  |                  |  |                  |                      |
|  +------------------+  +------------------+                      |
|                                                                  |
+------------------------------------------------------------------+
```

#### 3. Univerzálny Prompt Interface
- Vstupné pole pre zadávanie požiadaviek
- Kontextové návrhy a odporúčania
- Okamžitá spätná väzba
- Vizualizácia porozumenia vstupu

```
+------------------------------------------------------------------+
|                                                                  |
|  +------------------+------------------------------------------+ |
|  |                  |                                          | |
|  |  Univerzálny     |  Čo by ste chceli dnes urobiť?          | |
|  |  Prompt          |                                          | |
|  |                  |                                          | |
|  +------------------+------------------------------------------+ |
|                                                                  |
|  +------------------+  +------------------+  +------------------+ |
|  |                  |  |                  |  |                  | |
|  |  Kontextové      |  |   Nedávne        |  |   Odporúčané     | |
|  |  návrhy          |  |   aktivity       |  |   akcie          | |
|  |                  |  |                  |  |                  | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                  |
+------------------------------------------------------------------+
```

#### 4. MindFinder Navigator
- Vizualizácia obsahu a vzťahov
- Inteligentné vyhľadávanie a filtrovanie
- Dynamická navigácia
- Organizácia obsahu

```
+------------------------------------------------------------------+
|                                                                  |
|  +------------------+  +---------------------------------------+ |
|  |                  |  |                                       | |
|  |  Kategórie       |  |                                       | |
|  |  a tagy          |  |                                       | |
|  |                  |  |                                       | |
|  |  - Kategória 1   |  |           Vizualizácia                | |
|  |  - Kategória 2   |  |           obsahu a vzťahov           | |
|  |  - Kategória 3   |  |                                       | |
|  |                  |  |                                       | |
|  +------------------+  |                                       | |
|                        |                                       | |
|  +------------------+  |                                       | |
|  |                  |  |                                       | |
|  |  Filtre          |  |                                       | |
|  |                  |  |                                       | |
|  +------------------+  +---------------------------------------+ |
|                                                                  |
+------------------------------------------------------------------+
```

#### 5. Content Creation Studio
- Editor s inteligentnými funkciami
- Automatické odporúčania a vylepšenia
- Kolaboratívne nástroje
- Export a zdieľanie

```
+------------------------------------------------------------------+
|                                                                  |
|  +------------------+------------------------------------------+ |
|  |                  |                                          | |
|  |  Nástroje        |                                          | |
|  |  a formátovanie  |                                          | |
|  |                  |                                          | |
|  |  - Text          |                                          | |
|  |  - Obrázky       |           Obsah dokumentu               | |
|  |  - Tabuľky       |                                          | |
|  |                  |                                          | |
|  +------------------+                                          | |
|                     |                                          | |
|  +------------------+                                          | |
|  |                  |                                          | |
|  |  Inteligentné    |                                          | |
|  |  odporúčania     |                                          | |
|  |                  |                                          | |
|  +------------------+------------------------------------------+ |
|                                                                  |
|  +------------------+  +------------------+  +------------------+ |
|  |                  |  |                  |  |                  | |
|  |  Kolaborácia     |  |  Verzie          |  |  Export          | |
|  |                  |  |                  |  |                  | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                  |
+------------------------------------------------------------------+
```

### Tok interakcií

#### 1. Onboarding a prvé použitie
1. Používateľ sa registruje alebo prihlasuje
2. Systém zobrazí krátky onboarding tutorial
3. Používateľ je prevedený základnými funkciami
4. Systém zbiera počiatočné preferencie
5. Vytvorenie personalizovaného dashboardu

#### 2. Bežné používanie - Univerzálny Prompt
1. Používateľ zadá požiadavku do Univerzálneho Promptu
2. Systém analyzuje vstup a určí zámer
3. Systém zobrazí relevantné návrhy a odporúčania
4. Používateľ vyberie akciu alebo pokračuje v zadávaní
5. Systém vykoná požadovanú akciu alebo naviguje na príslušnú obrazovku

#### 3. Práca s obsahom
1. Používateľ vytvorí nový dokument alebo otvorí existujúci
2. Content Creation Studio poskytuje inteligentné odporúčania počas písania
3. Systém automaticky taguje a kategorizuje obsah
4. Používateľ môže zdieľať dokument alebo spolupracovať s inými
5. Systém ukladá dokument a aktualizuje MindFinder Navigator

#### 4. Vyhľadávanie a objavovanie
1. Používateľ otvorí MindFinder Navigator
2. Systém zobrazí personalizovaný pohľad na obsah
3. Používateľ môže vyhľadávať, filtrovať alebo prezerať vizualizáciu
4. Systém zobrazuje relevantné výsledky a súvisiaci obsah
5. Používateľ môže otvoriť dokument alebo pokračovať v objavovaní

#### 5. Personalizácia a adaptácia
1. Systém sleduje správanie používateľa
2. Adaptívny Dashboard sa prispôsobuje preferenciám
3. Notifikačný systém proaktívne ponúka relevantné návrhy
4. Používateľ môže manuálne upraviť nastavenia a preferencie
5. Systém sa kontinuálne učí a zlepšuje personalizáciu

## Dátový model a štruktúra

### Hlavné entity

#### 1. User
- id: UUID
- email: String
- password: String (hashed)
- name: String
- role: Enum (ADMIN, EDITOR, USER)
- preferences: JSON
- createdAt: DateTime
- updatedAt: DateTime

#### 2. Content
- id: UUID
- title: String
- body: Text
- format: Enum (TEXT, HTML, MARKDOWN)
- status: Enum (DRAFT, PUBLISHED)
- authorId: UUID (FK to User)
- createdAt: DateTime
- updatedAt: DateTime

#### 3. Tag
- id: UUID
- name: String
- type: Enum (CATEGORY, TAG, SYSTEM)
- createdAt: DateTime
- updatedAt: DateTime

#### 4. ContentTag
- contentId: UUID (FK to Content)
- tagId: UUID (FK to Tag)
- confidence: Float
- createdAt: DateTime

#### 5. Interaction
- id: UUID
- userId: UUID (FK to User)
- contentId: UUID (FK to Content)
- type: Enum (VIEW, EDIT, SHARE, LIKE)
- metadata: JSON
- createdAt: DateTime

#### 6. Notification
- id: UUID
- userId: UUID (FK to User)
- type: Enum (SYSTEM, CONTENT, COLLABORATION)
- message: String
- read: Boolean
- metadata: JSON
- createdAt: DateTime

#### 7. Collaboration
- id: UUID
- contentId: UUID (FK to Content)
- userId: UUID (FK to User)
- role: Enum (OWNER, EDITOR, VIEWER)
- createdAt: DateTime
- updatedAt: DateTime

### Vzťahy medzi entitami

- User 1:N Content (autor)
- User N:M Content (cez Collaboration)
- Content N:M Tag (cez ContentTag)
- User 1:N Interaction
- Content 1:N Interaction
- User 1:N Notification

## API a integračné body

### GraphQL API

#### Queries
- `me`: Získanie informácií o prihlásenom používateľovi
- `user(id: ID!)`: Získanie informácií o používateľovi
- `content(id: ID!)`: Získanie obsahu
- `contents(filter: ContentFilter)`: Získanie zoznamu obsahov
- `tags(filter: TagFilter)`: Získanie zoznamu tagov
- `search(query: String!)`: Vyhľadávanie v obsahu

#### Mutations
- `login(email: String!, password: String!)`: Prihlásenie
- `register(input: RegisterInput!)`: Registrácia
- `createContent(input: ContentInput!)`: Vytvorenie obsahu
- `updateContent(id: ID!, input: ContentInput!)`: Aktualizácia obsahu
- `deleteContent(id: ID!)`: Vymazanie obsahu
- `shareContent(id: ID!, input: ShareInput!)`: Zdieľanie obsahu
- `updatePreferences(input: PreferencesInput!)`: Aktualizácia preferencií

#### Subscriptions
- `notificationAdded`: Notifikácia o novej notifikácii
- `contentUpdated(id: ID!)`: Notifikácia o aktualizácii obsahu

### Externé integrácie

#### 1. AI/ML služby
- Hugging Face Inference API pre NLP
- OpenAI API pre generovanie obsahu
- TensorFlow.js modely pre client-side ML

#### 2. Cloudové úložiská
- Dropbox API
- Google Drive API
- OneDrive API

#### 3. Exportné formáty
- PDF export
- Microsoft Office formáty
- HTML/CSS export

## Bezpečnosť a súkromie

### Autentifikácia a autorizácia
- JWT-based autentifikácia
- Role-based access control (RBAC)
- OAuth 2.0 pre integráciu s tretími stranami

### Ochrana dát
- Šifrovanie citlivých dát
- HTTPS pre všetku komunikáciu
- Pravidelné zálohovanie dát

### Súkromie
- Transparentné zbieranie a využívanie dát
- Možnosť exportu a vymazania používateľských dát
- Súlad s GDPR a inými reguláciami

## Responzívny dizajn a prístupnosť

### Responzívny dizajn
- Mobile-first prístup
- Adaptívne rozloženie pre rôzne veľkosti obrazoviek
- Optimalizácia pre dotykovú interakciu

### Prístupnosť
- Súlad s WCAG 2.1 AA štandardmi
- Podpora pre klávesovú navigáciu
- Alternatívne texty pre obrázky
- Dostatočný kontrast a čitateľnosť

## Záver

Tento konsolidovaný návrh aplikácie "Architekt kúziel" poskytuje základ pre implementáciu webovej aplikácie, ktorá implementuje kľúčové koncepty z existujúceho konceptuálneho návrhu. Návrh sa zameriava na vytvorenie používateľsky prívetivej, inteligentnej a adaptívnej aplikácie, ktorá pomáha používateľom efektívne pracovať s informáciami a obsahom.

Nasledujúcim krokom bude vytvorenie detailného produkčného plánu, ktorý definuje časový harmonogram, míľniky a konkrétne úlohy pre implementáciu aplikácie.
