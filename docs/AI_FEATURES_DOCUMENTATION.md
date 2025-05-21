# Dokumentácia rozšírených AI funkcionalít

## Prehľad

Tento dokument poskytuje podrobnú dokumentáciu k rozšíreným AI funkcionalitám implementovaným v aplikácii "Architekt kúziel". Rozšírené AI funkcionality zahŕňajú integráciu s OpenAI API, pokročilé NLP funkcie, personalizované odporúčania a ďalšie inteligentné funkcie.

## Implementované funkcionality

### 1. Rozšírená analýza obsahu

**Služba**: `enhancedAiService.analyzeContent(text)`  
**Endpoint**: `POST /api/ai/enhanced/analyze`  
**Parametre**:
- `text` (string, povinný): Text na analýzu

**Návratová hodnota**:
```json
{
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "sentiment": "positive/negative/neutral",
  "entities": [
    {"type": "person/organization/location/date/other", "name": "meno entity", "relevance": 0.0-1.0}
  ],
  "summary": "krátke zhrnutie textu",
  "language": "jazyk textu",
  "categories": ["kategória1", "kategória2"]
}
```

**Popis**:
Táto funkcionalita poskytuje komplexnú analýzu textu, vrátane extrakcie kľúčových slov (tagov), analýzy sentimentu, identifikácie entít, automatického zhrnutia, detekcie jazyka a kategorizácie textu. V produkčnom prostredí využíva OpenAI API pre pokročilú analýzu, v vývojovom prostredí používa simulované výsledky.

**Príklad použitia**:
```javascript
// Backend
const analysis = await enhancedAiService.analyzeContent("Tento text obsahuje informácie o spoločnosti XYZ, ktorá bola založená 1.1.2020.");

// Frontend (API volanie)
const response = await fetch('/api/ai/enhanced/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: "Tento text obsahuje informácie o spoločnosti XYZ, ktorá bola založená 1.1.2020." })
});
const analysis = await response.json();
```

### 2. Pokročilé generovanie obsahu

**Služba**: `enhancedAiService.generateContent(options)`  
**Endpoint**: `POST /api/ai/enhanced/generate`  
**Parametre**:
- `prompt` (string, povinný): Základný prompt pre generovanie
- `type` (string, voliteľný): Typ obsahu (article, email, social, report, presentation)
- `tone` (string, voliteľný): Tón obsahu (formal, informal, technical, friendly)
- `language` (string, voliteľný): Jazyk obsahu (sk, en, cs, ...)

**Návratová hodnota**:
```json
{
  "content": "vygenerovaný obsah"
}
```

**Popis**:
Táto funkcionalita generuje obsah na základe zadaného promptu s možnosťou špecifikácie typu obsahu, tónu a jazyka. V produkčnom prostredí využíva OpenAI API pre generovanie kvalitného obsahu, v vývojovom prostredí používa šablóny pre simuláciu rôznych typov obsahu.

**Príklad použitia**:
```javascript
// Backend
const options = {
  prompt: "Umelá inteligencia v modernom svete",
  type: "article",
  tone: "technical",
  language: "sk"
};
const content = await enhancedAiService.generateContent(options);

// Frontend (API volanie)
const response = await fetch('/api/ai/enhanced/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "Umelá inteligencia v modernom svete",
    type: "article",
    tone: "technical",
    language: "sk"
  })
});
const result = await response.json();
const content = result.content;
```

### 3. Personalizované predikcie akcií používateľa

**Služba**: `enhancedAiService.predictUserActions(userContext)`  
**Endpoint**: `POST /api/ai/enhanced/predict`  
**Parametre**:
- `userContext` (object, povinný): Kontext používateľa vrátane histórie aktivít

**Návratová hodnota**:
```json
{
  "predictions": [
    {
      "action": "názov akcie",
      "probability": 0.0-1.0,
      "context": "kontext predikcie",
      "recommendation": "odporúčanie pre UI"
    }
  ]
}
```

**Popis**:
Táto funkcionalita predikuje budúce akcie používateľa na základe jeho kontextu a histórie. V produkčnom prostredí využíva OpenAI API pre pokročilú analýzu používateľského správania, v vývojovom prostredí používa simulované predikcie založené na základných pravidlách.

**Príklad použitia**:
```javascript
// Backend
const userContext = {
  recentActivities: ["content_creation", "tag_browsing"],
  preferences: { usesTags: true },
  role: "editor"
};
const predictions = await enhancedAiService.predictUserActions(userContext);

// Frontend (API volanie)
const response = await fetch('/api/ai/enhanced/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userContext: {
      recentActivities: ["content_creation", "tag_browsing"],
      preferences: { usesTags: true },
      role: "editor"
    }
  })
});
const result = await response.json();
const predictions = result.predictions;
```

### 4. Sumarizácia obsahu

**Služba**: `enhancedAiService.summarizeContent(text, options)`  
**Endpoint**: `POST /api/ai/enhanced/summarize`  
**Parametre**:
- `text` (string, povinný): Text na sumarizáciu
- `maxLength` (number, voliteľný): Maximálna dĺžka zhrnutia v znakoch
- `extractKeyPoints` (boolean, voliteľný): Či extrahovať kľúčové body
- `extractActionItems` (boolean, voliteľný): Či extrahovať akčné položky (TODO)

**Návratová hodnota**:
```json
{
  "summary": "zhrnutie textu",
  "keyPoints": ["kľúčový bod 1", "kľúčový bod 2", ...],
  "actionItems": ["akčná položka 1", "akčná položka 2", ...]
}
```

**Popis**:
Táto funkcionalita sumarizuje dlhý text a extrahuje kľúčové informácie. V produkčnom prostredí využíva OpenAI API pre kvalitné zhrnutie a extrakciu informácií, v vývojovom prostredí používa jednoduchú extrakciu viet a kľúčových slov.

**Príklad použitia**:
```javascript
// Backend
const options = {
  maxLength: 150,
  extractKeyPoints: true,
  extractActionItems: true
};
const summary = await enhancedAiService.summarizeContent(longText, options);

// Frontend (API volanie)
const response = await fetch('/api/ai/enhanced/summarize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: longText,
    maxLength: 150,
    extractKeyPoints: true,
    extractActionItems: true
  })
});
const summary = await response.json();
```

## Integrácia s OpenAI API

Rozšírené AI funkcionality využívajú OpenAI API pre pokročilú analýzu a generovanie obsahu. Pre správne fungovanie v produkčnom prostredí je potrebné nastaviť nasledujúce environment variables:

- `OPENAI_API_KEY`: API kľúč pre prístup k OpenAI API
- `NODE_ENV`: Nastavte na "production" pre použitie OpenAI API

### Konfigurácia OpenAI API

V produkčnom prostredí je možné konfigurovať nasledujúce parametre:

- Model: Aktuálne je nastavený na "gpt-4" pre najlepšie výsledky, ale je možné ho zmeniť na "gpt-3.5-turbo" pre nižšie náklady
- Temperature: Nastavená na rôzne hodnoty podľa typu úlohy (0.3 pre analýzu, 0.7 pre generovanie)
- Response format: Pre analýzu a predikcie je nastavený na JSON

## Vývojové prostredie

V vývojovom prostredí (`NODE_ENV` nie je "production" alebo `OPENAI_API_KEY` nie je nastavený) používajú všetky funkcie simulované odpovede:

- Analýza obsahu používa jednoduchú frekvenčnú analýzu slov a základné pravidlá
- Generovanie obsahu používa predpripravené šablóny pre rôzne typy a tóny
- Predikcie používateľských akcií sú založené na základných pravidlách a kontexte
- Sumarizácia používa jednoduchú extrakciu viet

## Optimalizácia a caching

Služba implementuje jednoduchý caching mechanizmus pre optimalizáciu API volaní:

- Každý request je cachovaný na základe hash hodnoty vstupných parametrov
- Cache je uložená v pamäti a je platná počas behu aplikácie
- Pre produkčné nasadenie s vysokou záťažou odporúčame implementovať distribuovaný cache (Redis, Memcached)

## Integrácia do frontend komponentov

Pre integráciu rozšírených AI funkcionalít do frontend komponentov odporúčame nasledujúci postup:

1. **Analýza obsahu pri vytváraní**:
   ```jsx
   const [content, setContent] = useState('');
   const [analysis, setAnalysis] = useState(null);
   
   const analyzeContent = async () => {
     const response = await fetch('/api/ai/enhanced/analyze', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ text: content })
     });
     const result = await response.json();
     setAnalysis(result);
   };
   ```

2. **Asistované generovanie obsahu**:
   ```jsx
   const [prompt, setPrompt] = useState('');
   const [generatedContent, setGeneratedContent] = useState('');
   
   const generateContent = async () => {
     const response = await fetch('/api/ai/enhanced/generate', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         prompt,
         type: 'article',
         tone: 'formal'
       })
     });
     const result = await response.json();
     setGeneratedContent(result.content);
   };
   ```

3. **Personalizované odporúčania na dashboarde**:
   ```jsx
   const [recommendations, setRecommendations] = useState([]);
   
   useEffect(() => {
     const fetchRecommendations = async () => {
       const userContext = {
         recentActivities: getUserActivities(),
         preferences: getUserPreferences(),
         role: getUserRole()
       };
       
       const response = await fetch('/api/ai/enhanced/predict', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ userContext })
       });
       
       const result = await response.json();
       setRecommendations(result.predictions);
     };
     
     fetchRecommendations();
   }, []);
   ```

## Bezpečnosť a limity

Pri používaní rozšírených AI funkcionalít je potrebné brať do úvahy nasledujúce bezpečnostné aspekty a limity:

1. **API kľúče**: OpenAI API kľúč by mal byť uložený bezpečne a nikdy by nemal byť exponovaný na frontende
2. **Rate limiting**: OpenAI API má limity na počet requestov, ktoré je potrebné rešpektovať
3. **Náklady**: Používanie OpenAI API je spoplatnené, preto je vhodné implementovať monitoring nákladov
4. **Obsah**: Je potrebné implementovať kontrolu obsahu pre zabránenie generovaniu nevhodného obsahu
5. **Latencia**: Volania na OpenAI API môžu trvať dlhšie, preto je vhodné implementovať loading stavy

## Ďalší vývoj

Plánované rozšírenia AI funkcionalít v budúcich verziách:

1. **Integrácia s Hugging Face**: Alternatívny backend pre AI funkcionality
2. **Vizuálne AI funkcie**: Generovanie a analýza obrázkov
3. **Asistované editovanie**: Real-time návrhy pri písaní obsahu
4. **Pokročilé odporúčania**: Kolaboratívne filtrovanie a kontextové odporúčania
5. **Viacjazyčná podpora**: Rozšírenie podpory pre viac jazykov

## Záver

Implementované rozšírené AI funkcionality výrazne zvyšujú hodnotu aplikácie "Architekt kúziel" pre používateľov. Integrácia s OpenAI API prináša pokročilé možnosti analýzy a generovania obsahu, zatiaľ čo simulovaný režim umožňuje vývoj a testovanie bez nákladov na API volania.
