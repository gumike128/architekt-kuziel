// Vylepšená AI služba pre aplikáciu Architekt kúziel
// Integrácia s OpenAI API, Groq API a pokročilými NLP funkciami

const axios = require('axios');

class EnhancedAIService {
  constructor() {
    // Konfigurácia pre AI služby
    this.openaiConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    };
    
    this.groqConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      }
    };
    
    // API URLs
    this.openaiApiUrl = 'https://api.openai.com/v1';
    this.groqApiUrl = 'https://api.groq.com/openai/v1';
    
    // Modely
    this.models = {
      openai: {
        completion: 'gpt-4', // alebo 'gpt-3.5-turbo' pre nižšie náklady
        embedding: 'text-embedding-ada-002'
      },
      groq: {
        completion: 'llama3-8b-8192', // alebo 'mixtral-8x7b-32768' pre komplexnejšie úlohy
        fast: 'llama3-70b-8192' // pre rýchlejšie odpovede
      }
    };
    
    // Cache pre optimalizáciu API volaní
    this.cache = new Map();
    
    // Preferovaný poskytovateľ AI (openai, groq)
    this.preferredProvider = process.env.PREFERRED_AI_PROVIDER || 'openai';
  }

  /**
   * Analyzuje obsah a vráti rozšírenú analýzu vrátane tagov, sentimentu a entít
   * @param {string} text - Text na analýzu
   * @returns {Promise<Object>} - Objekt s výsledkami analýzy
   */
  async analyzeContent(text) {
    try {
      // Kontrola cache
      const cacheKey = `analyze_${this._hashString(text)}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }
      
      // Príprava promptu pre AI
      const prompt = `
        Analyzuj nasledujúci text a poskytni štruktúrovanú analýzu vo formáte JSON:
        
        Text na analýzu:
        """
        ${text}
        """
        
        Požadovaný výstup (JSON):
        {
          "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"], // 5 najrelevantnejších kľúčových slov alebo fráz
          "sentiment": "positive/negative/neutral", // celkový sentiment textu
          "entities": [ // identifikované entity
            {"type": "person/organization/location/date/other", "name": "meno entity", "relevance": 0.0-1.0}
          ],
          "summary": "krátke zhrnutie textu v 1-2 vetách",
          "language": "jazyk textu",
          "categories": ["kategória1", "kategória2"] // hlavné tematické kategórie
        }
      `;
      
      // V produkčnom prostredí - volanie AI API
      if (process.env.NODE_ENV === 'production' && (process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY)) {
        let response;
        
        // Výber poskytovateľa AI
        if (this.preferredProvider === 'groq' && process.env.GROQ_API_KEY) {
          // Použitie Groq API
          response = await axios.post(
            `${this.groqApiUrl}/chat/completions`,
            {
              model: this.models.groq.completion,
              messages: [
                { role: 'system', content: 'Si expertný systém na analýzu textu. Tvoja úloha je analyzovať text a poskytnúť štruktúrovanú odpoveď vo formáte JSON.' },
                { role: 'user', content: prompt }
              ],
              temperature: 0.3,
              response_format: { type: 'json_object' }
            },
            this.groqConfig
          );
        } else if (process.env.OPENAI_API_KEY) {
          // Použitie OpenAI API
          response = await axios.post(
            `${this.openaiApiUrl}/chat/completions`,
            {
              model: this.models.openai.completion,
              messages: [
                { role: 'system', content: 'Si expertný systém na analýzu textu. Tvoja úloha je analyzovať text a poskytnúť štruktúrovanú odpoveď vo formáte JSON.' },
                { role: 'user', content: prompt }
              ],
              temperature: 0.3,
              response_format: { type: 'json_object' }
            },
            this.openaiConfig
          );
        } else {
          throw new Error('Nie je nakonfigurovaný žiadny AI poskytovateľ');
        }
        
        // Parsovanie JSON odpovede
        const result = JSON.parse(response.data.choices[0].message.content);
        
        // Uloženie do cache
        this.cache.set(cacheKey, result);
        
        return result;
      } 
      // Simulácia v vývojovom prostredí
      else {
        // Simulovaná odpoveď pre vývojové prostredie
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Základná analýza textu
        const keywords = this._extractKeywords(text);
        const sentiment = this._analyzeSentiment(text);
        const entities = this._extractEntities(text);
        const language = this._detectLanguage(text);
        
        const result = {
          tags: keywords,
          sentiment: sentiment,
          entities: entities,
          summary: this._generateSummary(text),
          language: language,
          categories: this._categorizeText(text)
        };
        
        // Uloženie do cache
        this.cache.set(cacheKey, result);
        
        return result;
      }
    } catch (error) {
      console.error('Chyba pri analýze obsahu:', error);
      
      // Fallback na základnú analýzu
      return {
        tags: this._extractKeywords(text),
        sentiment: 'neutral',
        entities: [],
        summary: '',
        language: 'sk',
        categories: []
      };
    }
  }

  /**
   * Generuje obsah na základe promptu s pokročilými možnosťami
   * @param {Object} options - Možnosti pre generovanie obsahu
   * @param {string} options.prompt - Základný prompt pre generovanie
   * @param {string} options.type - Typ obsahu (article, email, social, report, presentation)
   * @param {string} options.tone - Tón obsahu (formal, informal, technical, friendly)
   * @param {string} options.language - Jazyk obsahu (sk, en, cs, ...)
   * @returns {Promise<string>} - Vygenerovaný obsah
   */
  async generateContent(options) {
    try {
      const { prompt, type = 'article', tone = 'formal', language = 'sk' } = options;
      
      // Kontrola cache
      const cacheKey = `generate_${this._hashString(JSON.stringify(options))}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }
      
      // Príprava systémového promptu podľa typu a tónu
      let systemPrompt = 'Si expertný asistent pre tvorbu obsahu.';
      
      switch (type) {
        case 'article':
          systemPrompt += ' Tvoja úloha je vytvoriť informatívny článok s úvodom, hlavnou časťou a záverom.';
          break;
        case 'email':
          systemPrompt += ' Tvoja úloha je vytvoriť profesionálny email s predmetom, oslovením, hlavnou časťou a záverom.';
          break;
        case 'social':
          systemPrompt += ' Tvoja úloha je vytvoriť pútavý príspevok na sociálne siete s hashtagmi a výzvou na akciu.';
          break;
        case 'report':
          systemPrompt += ' Tvoja úloha je vytvoriť štruktúrovaný report s exekutívnym zhrnutím, analýzou a odporúčaniami.';
          break;
        case 'presentation':
          systemPrompt += ' Tvoja úloha je vytvoriť osnovu prezentácie s hlavnými bodmi a poznámkami pre prezentujúceho.';
          break;
      }
      
      // Pridanie informácie o tóne
      switch (tone) {
        case 'formal':
          systemPrompt += ' Používaj formálny, profesionálny tón.';
          break;
        case 'informal':
          systemPrompt += ' Používaj neformálny, konverzačný tón.';
          break;
        case 'technical':
          systemPrompt += ' Používaj technický, odborný tón s príslušnou terminológiou.';
          break;
        case 'friendly':
          systemPrompt += ' Používaj priateľský, prístupný tón.';
          break;
      }
      
      // Pridanie informácie o jazyku
      systemPrompt += ` Obsah vytvor v jazyku: ${language}.`;
      
      // V produkčnom prostredí - volanie AI API
      if (process.env.NODE_ENV === 'production' && (process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY)) {
        let response;
        
        // Výber poskytovateľa AI
        if (this.preferredProvider === 'groq' && process.env.GROQ_API_KEY) {
          // Použitie Groq API - rýchlejší model pre generovanie obsahu
          response = await axios.post(
            `${this.groqApiUrl}/chat/completions`,
            {
              model: this.models.groq.fast,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
              ],
              temperature: 0.7
            },
            this.groqConfig
          );
        } else if (process.env.OPENAI_API_KEY) {
          // Použitie OpenAI API
          response = await axios.post(
            `${this.openaiApiUrl}/chat/completions`,
            {
              model: this.models.openai.completion,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
              ],
              temperature: 0.7
            },
            this.openaiConfig
          );
        } else {
          throw new Error('Nie je nakonfigurovaný žiadny AI poskytovateľ');
        }
        
        const result = response.data.choices[0].message.content;
        
        // Uloženie do cache
        this.cache.set(cacheKey, result);
        
        return result;
      } 
      // Simulácia v vývojovom prostredí
      else {
        // Simulovaná odpoveď pre vývojové prostredie
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Použitie existujúcej metódy pre simuláciu s rozšírením o typ a tón
        const result = this._generateSimulatedContent(prompt, type, tone, language);
        
        // Uloženie do cache
        this.cache.set(cacheKey, result);
        
        return result;
      }
    } catch (error) {
      console.error('Chyba pri generovaní obsahu:', error);
      return 'Nepodarilo sa vygenerovať obsah. Skúste to znova neskôr.';
    }
  }

  /**
   * Predikuje budúce akcie používateľa na základe jeho kontextu a histórie
   * @param {Object} userContext - Kontext používateľa vrátane histórie aktivít
   * @returns {Promise<Object[]>} - Pole predikcií s akciami a pravdepodobnosťami
   */
  async predictUserActions(userContext) {
    try {
      // Kontrola cache
      const cacheKey = `predict_${this._hashString(JSON.stringify(userContext))}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }
      
      // Príprava promptu pre AI
      const prompt = `
        Analyzuj nasledujúci kontext používateľa a predikuj jeho najpravdepodobnejšie budúce akcie.
        Poskytni odpoveď vo formáte JSON.
        
        Kontext používateľa:
        """
        ${JSON.stringify(userContext, null, 2)}
        """
        
        Požadovaný výstup (JSON):
        [
          {
            "action": "názov akcie",
            "probability": 0.0-1.0,
            "context": "kontext predikcie",
            "recommendation": "odporúčanie pre UI"
          }
        ]
      `;
      
      // V produkčnom prostredí - volanie AI API
      if (process.env.NODE_ENV === 'production' && (process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY)) {
        let response;
        
        // Výber poskytovateľa AI
        if (this.preferredProvider === 'groq' && process.env.GROQ_API_KEY) {
          // Použitie Groq API
          response = await axios.post(
            `${this.groqApiUrl}/chat/completions`,
            {
              model: this.models.groq.completion,
              messages: [
                { role: 'system', content: 'Si expertný systém na predikciu používateľského správania. Tvoja úloha je analyzovať kontext používateľa a predpovedať jeho budúce akcie.' },
                { role: 'user', content: prompt }
              ],
              temperature: 0.3,
              response_format: { type: 'json_object' }
            },
            this.groqConfig
          );
        } else if (process.env.OPENAI_API_KEY) {
          // Použitie OpenAI API
          response = await axios.post(
            `${this.openaiApiUrl}/chat/completions`,
            {
              model: this.models.openai.completion,
              messages: [
                { role: 'system', content: 'Si expertný systém na predikciu používateľského správania. Tvoja úloha je analyzovať kontext používateľa a predpovedať jeho budúce akcie.' },
                { role: 'user', content: prompt }
              ],
              temperature: 0.3,
              response_format: { type: 'json_object' }
            },
            this.openaiConfig
          );
        } else {
          throw new Error('Nie je nakonfigurovaný žiadny AI poskytovateľ');
        }
        
        // Parsovanie JSON odpovede
        const result = JSON.parse(response.data.choices[0].message.content);
        
        // Uloženie do cache
        this.cache.set(cacheKey, result);
        
        return result;
      } 
      // Simulácia v vývojovom prostredí
      else {
        // Simulovaná odpoveď pre vývojové prostredie
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Základná analýza používateľského kontextu
        const result = this._simulatePredictions(userContext);
        
        // Uloženie do cache
        this.cache.set(cacheKey, result);
        
        return result;
      }
    } catch (error) {
      console.error('Chyba pri predikcii akcií:', error);
      
      // Fallback na základné predikcie
      return [
        { action: 'create_content', probability: 0.8, context: 'recent_activity', recommendation: 'Ponúknuť vytvorenie nového obsahu' },
        { action: 'view_analytics', probability: 0.6, context: 'time_of_day', recommendation: 'Zobraziť analytický widget na dashboarde' },
        { action: 'update_profile', probability: 0.3, context: 'account_age', recommendation: 'Pripomenúť aktualizáciu profilu' }
      ];
    }
  }

  /**
   * Sumarizuje dlhý text a extrahuje kľúčové informácie
   * @param {string} text - Text na sumarizáciu
   * @param {Object} options - Možnosti sumarizácie
   * @param {number} options.maxLength - Maximálna dĺžka zhrnutia v znakoch
   * @param {boolean} options.extractKeyPoints - Či extrahovať kľúčové body
   * @param {boolean} options.extractActionItems - Či extrahovať akčné položky (TODO)
   * @returns {Promise<Object>} - Objekt so zhrnutím a extrahovanými informáciami
   */
  async summarizeContent(text, options = {}) {
    try {
      const { maxLength = 200, extractKeyPoints = true, extractActionItems = false } = options;
      
      // Kontrola cache
      const cacheKey = `summarize_${this._hashString(text)}_${maxLength}_${extractKeyPoints}_${extractActionItems}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }
      
      // Príprava promptu pre AI
      let prompt = `
        Sumarizuj nasledujúci text do maximálne ${maxLength} znakov.
        
        Text na sumarizáciu:
        """
        ${text}
        """
        
        Požadovaný výstup (JSON):
        {
          "summary": "zhrnutie textu"
      `;
      
      if (extractKeyPoints) {
        prompt += `,
          "keyPoints": ["kľúčový bod 1", "kľúčový bod 2", ...]
        `;
      }
      
      if (extractActionItems) {
        prompt += `,
          "actionItems": ["akčná položka 1", "akčná položka 2", ...]
        `;
      }
      
      prompt += `
        }
      `;
      
      // V produkčnom prostredí - volanie AI API
      if (process.env.NODE_ENV === 'production' && (process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY)) {
        let response;
        
        // Výber poskytovateľa AI
        if (this.preferredProvider === 'groq' && process.env.GROQ_API_KEY) {
          // Použitie Groq API
          response = await axios.post(
            `${this.groqApiUrl}/chat/completions`,
            {
              model: this.models.groq.completion,
              messages: [
                { role: 'system', content: 'Si expertný systém na sumarizáciu textu. Tvoja úloha je sumarizovať text a extrahovať kľúčové informácie.' },
                { role: 'user', content: prompt }
              ],
              temperature: 0.3,
              response_format: { type: 'json_object' }
            },
            this.groqConfig
          );
        } else if (process.env.OPENAI_API_KEY) {
          // Použitie OpenAI API
          response = await axios.post(
            `${this.openaiApiUrl}/chat/completions`,
            {
              model: this.models.openai.completion,
              messages: [
                { role: 'system', content: 'Si expertný systém na sumarizáciu textu. Tvoja úloha je sumarizovať text a extrahovať kľúčové informácie.' },
                { role: 'user', content: prompt }
              ],
              temperature: 0.3,
              response_format: { type: 'json_object' }
            },
            this.openaiConfig
          );
        } else {
          throw new Error('Nie je nakonfigurovaný žiadny AI poskytovateľ');
        }
        
        // Parsovanie JSON odpovede
        const result = JSON.parse(response.data.choices[0].message.content);
        
        // Uloženie do cache
        this.cache.set(cacheKey, result);
        
        return result;
      } 
      // Simulácia v vývojovom prostredí
      else {
        // Simulovaná odpoveď pre vývojové prostredie
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Základná sumarizácia textu
        const result = {
          summary: this._generateSummary(text, maxLength)
        };
        
        if (extractKeyPoints) {
          result.keyPoints = this._extractKeyPoints(text);
        }
        
        if (extractActionItems) {
          result.actionItems = this._extractActionItems(text);
        }
        
        // Uloženie do cache
        this.cache.set(cacheKey, result);
        
        return result;
      }
    } catch (error) {
      console.error('Chyba pri sumarizácii obsahu:', error);
      
      // Fallback na základnú sumarizáciu
      return {
        summary: text.length > 200 ? text.substring(0, 197) + '...' : text
      };
    }
  }

  /**
   * Nastaví preferovaného poskytovateľa AI
   * @param {string} provider - Poskytovateľ AI ('openai' alebo 'groq')
   */
  setPreferredProvider(provider) {
    if (provider === 'openai' || provider === 'groq') {
      this.preferredProvider = provider;
    } else {
      throw new Error('Neplatný poskytovateľ AI. Podporované hodnoty: "openai", "groq"');
    }
  }

  // Pomocné metódy pre simuláciu v vývojovom prostredí

  /**
   * Pomocná metóda pre extrakciu kľúčových slov z textu
   * @private
   * @param {string} text - Text na analýzu
   * @returns {string[]} - Pole kľúčových slov
   */
  _extractKeywords(text) {
    // Jednoduchá implementácia extrakcie kľúčových slov
    // V produkčnom prostredí by tu bola pokročilejšia NLP logika
    const words = text.toLowerCase().split(/\W+/);
    const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by'];
    
    // Filtrovanie stop slov a krátkych slov
    const filteredWords = words.filter(word => 
      word.length > 3 && !stopWords.includes(word)
    );
    
    // Počítanie frekvencií
    const wordFreq = {};
    filteredWords.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Zoradenie podľa frekvencie
    const sortedWords = Object.keys(wordFreq).sort((a, b) => wordFreq[b] - wordFreq[a]);
    
    // Vrátenie top 5 kľúčových slov
    return sortedWords.slice(0, 5);
  }

  /**
   * Pomocná metóda pre analýzu sentimentu textu
   * @private
   * @param {string} text - Text na analýzu
   * @returns {string} - Sentiment (positive, negative, neutral)
   */
  _analyzeSentiment(text) {
    // Jednoduchá implementácia analýzy sentimentu
    const positiveWords = ['dobrý', 'skvelý', 'výborný', 'úžasný', 'perfektný', 'rád', 'spokojný', 'šťastný'];
    const negativeWords = ['zlý', 'hrozný', 'strašný', 'nespokojný', 'problém', 'chyba', 'smutný', 'nešťastný'];
    
    const lowerText = text.toLowerCase();
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      const matches = lowerText.match(regex);
      if (matches) {
        positiveCount += matches.length;
      }
    });
    
    negativeWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      const matches = lowerText.match(regex);
      if (matches) {
        negativeCount += matches.length;
      }
    });
    
    if (positiveCount > negativeCount) {
      return 'positive';
    } else if (negativeCount > positiveCount) {
      return 'negative';
    } else {
      return 'neutral';
    }
  }

  /**
   * Pomocná metóda pre extrakciu entít z textu
   * @private
   * @param {string} text - Text na analýzu
   * @returns {Object[]} - Pole entít
   */
  _extractEntities(text) {
    // Jednoduchá implementácia extrakcie entít
    // V produkčnom prostredí by tu bola pokročilejšia NER logika
    const entities = [];
    
    // Detekcia osôb (veľké písmeno nasledované malými písmenami)
    const personRegex = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
    const personMatches = text.match(personRegex) || [];
    
    personMatches.forEach(match => {
      entities.push({
        type: 'person',
        name: match,
        relevance: 0.8
      });
    });
    
    // Detekcia organizácií (slová končiace na s.r.o., a.s., atď.)
    const orgRegex = /\b[A-Za-z]+ (s\.r\.o\.|a\.s\.|k\.s\.)\b/g;
    const orgMatches = text.match(orgRegex) || [];
    
    orgMatches.forEach(match => {
      entities.push({
        type: 'organization',
        name: match,
        relevance: 0.7
      });
    });
    
    // Detekcia dátumov
    const dateRegex = /\b\d{1,2}\.\s?\d{1,2}\.\s?\d{4}\b/g;
    const dateMatches = text.match(dateRegex) || [];
    
    dateMatches.forEach(match => {
      entities.push({
        type: 'date',
        name: match,
        relevance: 0.6
      });
    });
    
    return entities;
  }

  /**
   * Pomocná metóda pre detekciu jazyka textu
   * @private
   * @param {string} text - Text na analýzu
   * @returns {string} - Kód jazyka
   */
  _detectLanguage(text) {
    // Jednoduchá implementácia detekcie jazyka
    // V produkčnom prostredí by tu bola pokročilejšia detekcia jazyka
    
    // Slovenské špecifické znaky a slová
    const skRegex = /[ľščťžýáíéúäô]|som|sme|ste|bolo|ako/gi;
    const skMatches = text.match(skRegex) || [];
    
    // České špecifické znaky a slová
    const csRegex = /[ěščřžýáíéúů]|jsem|jsme|jste|bylo|jak/gi;
    const csMatches = text.match(csRegex) || [];
    
    // Anglické špecifické slová
    const enRegex = /\b(the|is|are|was|were|have|has|had|been|will|would)\b/gi;
    const enMatches = text.match(enRegex) || [];
    
    if (skMatches.length > csMatches.length && skMatches.length > enMatches.length) {
      return 'sk';
    } else if (csMatches.length > skMatches.length && csMatches.length > enMatches.length) {
      return 'cs';
    } else {
      return 'en';
    }
  }

  /**
   * Pomocná metóda pre kategorizáciu textu
   * @private
   * @param {string} text - Text na kategorizáciu
   * @returns {string[]} - Pole kategórií
   */
  _categorizeText(text) {
    // Jednoduchá implementácia kategorizácie textu
    const categories = [];
    const lowerText = text.toLowerCase();
    
    // Kategórie a kľúčové slová
    const categoryKeywords = {
      'business': ['biznis', 'podnikanie', 'firma', 'spoločnosť', 'trh', 'predaj', 'marketing'],
      'technology': ['technológia', 'softvér', 'hardvér', 'aplikácia', 'systém', 'vývoj', 'programovanie'],
      'science': ['veda', 'výskum', 'štúdia', 'experiment', 'teória', 'analýza'],
      'health': ['zdravie', 'medicína', 'choroba', 'liečba', 'pacient', 'lekár'],
      'education': ['vzdelávanie', 'škola', 'študent', 'učiteľ', 'kurz', 'tréning'],
      'entertainment': ['zábava', 'film', 'hudba', 'hra', 'šport', 'umenie']
    };
    
    // Kontrola výskytu kľúčových slov pre každú kategóriu
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          categories.push(category);
          break;
        }
      }
    }
    
    return categories.length > 0 ? categories : ['general'];
  }

  /**
   * Pomocná metóda pre generovanie zhrnutia textu
   * @private
   * @param {string} text - Text na zhrnutie
   * @param {number} maxLength - Maximálna dĺžka zhrnutia
   * @returns {string} - Zhrnutie textu
   */
  _generateSummary(text, maxLength = 200) {
    // Jednoduchá implementácia generovania zhrnutia
    // V produkčnom prostredí by tu bola pokročilejšia sumarizácia
    
    // Rozdelenie textu na vety
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    if (sentences.length === 0) {
      return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    }
    
    // Výber prvých viet ako zhrnutie
    let summary = '';
    let i = 0;
    
    while (i < sentences.length && summary.length + sentences[i].length <= maxLength - 3) {
      summary += sentences[i];
      i++;
    }
    
    // Pridanie elipsy, ak je zhrnutie kratšie ako pôvodný text
    if (i < sentences.length) {
      summary += '...';
    }
    
    return summary;
  }

  /**
   * Pomocná metóda pre extrakciu kľúčových bodov z textu
   * @private
   * @param {string} text - Text na analýzu
   * @returns {string[]} - Pole kľúčových bodov
   */
  _extractKeyPoints(text) {
    // Jednoduchá implementácia extrakcie kľúčových bodov
    // V produkčnom prostredí by tu bola pokročilejšia extrakcia
    
    // Rozdelenie textu na vety
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    if (sentences.length <= 3) {
      return sentences;
    }
    
    // Výber viet s kľúčovými slovami
    const keywordSentences = sentences.filter(sentence => {
      const lowerSentence = sentence.toLowerCase();
      return lowerSentence.includes('dôležité') || 
             lowerSentence.includes('kľúčové') || 
             lowerSentence.includes('hlavné') ||
             lowerSentence.includes('významné') ||
             lowerSentence.includes('podstatné');
    });
    
    // Ak nie sú nájdené žiadne vety s kľúčovými slovami, vrátime prvé 3 vety
    if (keywordSentences.length === 0) {
      return sentences.slice(0, 3);
    }
    
    // Inak vrátime nájdené vety s kľúčovými slovami
    return keywordSentences;
  }

  /**
   * Pomocná metóda pre extrakciu akčných položiek z textu
   * @private
   * @param {string} text - Text na analýzu
   * @returns {string[]} - Pole akčných položiek
   */
  _extractActionItems(text) {
    // Jednoduchá implementácia extrakcie akčných položiek
    // V produkčnom prostredí by tu bola pokročilejšia extrakcia
    
    // Rozdelenie textu na vety
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    
    // Výber viet s akčnými slovesami
    const actionSentences = sentences.filter(sentence => {
      const lowerSentence = sentence.toLowerCase();
      return lowerSentence.includes('musí') || 
             lowerSentence.includes('treba') || 
             lowerSentence.includes('potrebné') ||
             lowerSentence.includes('vykonať') ||
             lowerSentence.includes('implementovať') ||
             lowerSentence.includes('zabezpečiť');
    });
    
    return actionSentences;
  }

  /**
   * Pomocná metóda pre generovanie simulovaného obsahu
   * @private
   * @param {string} prompt - Prompt pre generovanie
   * @param {string} type - Typ obsahu
   * @param {string} tone - Tón obsahu
   * @param {string} language - Jazyk obsahu
   * @returns {string} - Vygenerovaný obsah
   */
  _generateSimulatedContent(prompt, type = 'article', tone = 'formal', language = 'sk') {
    // Základné šablóny pre rôzne typy obsahu
    const templates = {
      article: {
        formal: `# ${prompt}\n\nV dnešnej dobe je dôležité zamyslieť sa nad tým, ako ${prompt.toLowerCase()} ovplyvňuje náš každodenný život. Existuje niekoľko kľúčových aspektov, ktoré by sme mali zvážiť.\n\n## Hlavné body\n\n1. Analýza súčasného stavu\n2. Výhody a nevýhody\n3. Budúce trendy\n\n## Záver\n\nNa záver môžeme konštatovať, že ${prompt.toLowerCase()} predstavuje významnú oblasť, ktorej by sme mali venovať pozornosť v nasledujúcich rokoch.`,
        
        informal: `# ${prompt}\n\nHej, poďme sa pozrieť na to, ako ${prompt.toLowerCase()} ovplyvňuje naše životy! Je tu pár vecí, o ktorých by sme mali hovoriť.\n\n## O čom to vlastne je?\n\n1. Kde sme teraz\n2. Čo je super a čo nie\n3. Kam to smeruje\n\n## Takže...\n\nCelkovo si myslím, že ${prompt.toLowerCase()} je téma, ktorú by sme nemali ignorovať. Čo si o tom myslíš ty?`,
        
        technical: `# Technická analýza: ${prompt}\n\n## 1. Úvod\n\nTáto technická analýza sa zaoberá problematikou ${prompt.toLowerCase()} a jej implikáciami v súčasnom kontexte. Nasledujúce sekcie poskytujú detailný rozbor relevantných aspektov.\n\n## 2. Metodológia\n\nAnalýza bola vykonaná s využitím štandardných postupov a metód, zahŕňajúcich kvantitatívne aj kvalitatívne prístupy.\n\n## 3. Výsledky\n\nZískané dáta indikujú signifikantné korelácie medzi ${prompt.toLowerCase()} a súvisiacimi premennými.\n\n## 4. Záver\n\nNa základe vykonanej analýzy možno konštatovať, že ${prompt.toLowerCase()} predstavuje významný faktor, ktorý vyžaduje ďalší výskum a implementáciu adekvátnych opatrení.`
      },
      
      email: {
        formal: `Predmet: ${prompt}\n\nVážený klient,\n\nďakujeme za Váš záujem o tému "${prompt}".\n\nRadi by sme Vám poskytli viac informácií o tejto téme. Na základe našej analýzy sme identifikovali niekoľko kľúčových aspektov, ktoré by mohli byť pre Vás relevantné.\n\nV prípade záujmu o ďalšie podrobnosti nás neváhajte kontaktovať.\n\nS úctou,\nTím Architekt kúziel`,
        
        informal: `Predmet: ${prompt}\n\nAhoj,\n\nďakujeme, že ťa zaujíma téma "${prompt}".\n\nMáme pre teba niekoľko zaujímavých informácií o tejto téme. Pozreli sme sa na to bližšie a našli sme veci, ktoré by sa ti mohli páčiť.\n\nAk chceš vedieť viac, daj nám vedieť!\n\nS pozdravom,\nTím Architekt kúziel`,
        
        technical: `Predmet: Technická špecifikácia - ${prompt}\n\nVážený partner,\n\nv nadväznosti na Vašu požiadavku Vám zasielame technickú špecifikáciu týkajúcu sa "${prompt}".\n\nŠpecifikácia zahŕňa nasledujúce komponenty:\n- Technické parametre\n- Implementačné požiadavky\n- Kompatibilita s existujúcimi systémami\n- Odporúčané konfigurácie\n\nV prípade akýchkoľvek technických otázok kontaktujte naše oddelenie podpory.\n\nS pozdravom,\nTechnický tím Architekt kúziel`
      },
      
      social: {
        formal: `📢 ${prompt} 📢\n\nRadi by sme sa s vami podelili o niekoľko odborných poznatkov na tému "${prompt}".\n\nNaši experti identifikovali kľúčové trendy a poznatky, ktoré môžu byť pre vás prínosné.\n\nPre viac informácií navštívte náš web alebo nás kontaktujte priamo.\n\n#${prompt.replace(/\s+/g, '')} #ArchitektKuziel #OdbornéInformácie`,
        
        informal: `🔥 ${prompt} 🔥\n\nHej, pozrite sa na toto! Máme super novinky o "${prompt}"!\n\nToto vás určite zaujme... Pozrite si naše najnovšie zistenia a tipy!\n\nČo si o tom myslíte vy? Zdieľajte svoje názory v komentároch! 👇\n\n#${prompt.replace(/\s+/g, '')} #ArchitektKuziel #TrendyTémy`,
        
        technical: `📊 Technická analýza: ${prompt} 📊\n\nPredstavujeme výsledky našej technickej analýzy témy "${prompt}".\n\nKľúčové metriky:\n- Efektivita: +25%\n- Optimalizácia: Významné zlepšenie\n- ROI: Pozitívny trend\n\nPre detailnú technickú dokumentáciu navštívte náš repozitár.\n\n#${prompt.replace(/\s+/g, '')} #TechnickáAnalýza #DataDriven`
      },
      
      report: {
        formal: `# Správa: ${prompt}\n\n## Exekutívne zhrnutie\n\nTáto správa poskytuje komplexnú analýzu témy "${prompt}" a jej implikácií pre relevantné zainteresované strany.\n\n## Metodológia\n\nAnalýza bola vykonaná s využitím kombinácie kvalitatívnych a kvantitatívnych metód, zahŕňajúcich zber dát, analýzu a interpretáciu výsledkov.\n\n## Kľúčové zistenia\n\n1. Zistenie 1\n2. Zistenie 2\n3. Zistenie 3\n\n## Odporúčania\n\nNa základe našich zistení odporúčame nasledujúce kroky:\n\n1. Odporúčanie 1\n2. Odporúčanie 2\n3. Odporúčanie 3\n\n## Záver\n\nTéma "${prompt}" predstavuje významný faktor, ktorý vyžaduje strategický prístup a implementáciu navrhovaných opatrení.`,
        
        informal: `# Správa o ${prompt}\n\n## O čom to celé je\n\nPozreli sme sa bližšie na "${prompt}" a máme pre vás zhrnutie toho, čo sme zistili.\n\n## Ako sme na to išli\n\nPoužili sme mix rôznych prístupov, aby sme získali čo najlepší obraz o situácii.\n\n## Čo sme zistili\n\n1. Toto je zaujímavé...\n2. Toto nás prekvapilo...\n3. Toto stojí za zmienku...\n\n## Čo odporúčame\n\nNa základe toho, čo sme zistili, navrhujeme:\n\n1. Skúste toto...\n2. Možno by pomohlo...\n3. Určite zvážte...\n\n## Záver\n\n"${prompt}" je téma, ktorá si zaslúži vašu pozornosť. S našimi odporúčaniami by ste mali vidieť pozitívne výsledky!`,
        
        technical: `# Technická správa: ${prompt}\n\n## Exekutívne zhrnutie\n\nTáto technická správa analyzuje "${prompt}" z hľadiska technických parametrov, výkonnosti a implementačných aspektov.\n\n## Metodológia testovania\n\nTestovanie bolo vykonané v kontrolovanom prostredí s využitím štandardizovaných protokolov a metrík.\n\n## Technické špecifikácie\n\n| Parameter | Hodnota | Benchmark |\n|-----------|---------|----------|\n| Parameter 1 | Hodnota 1 | Benchmark 1 |\n| Parameter 2 | Hodnota 2 | Benchmark 2 |\n| Parameter 3 | Hodnota 3 | Benchmark 3 |\n\n## Analýza výkonnosti\n\nVýkonnostné testy indikujú nasledujúce charakteristiky:\n\n```\nEfficiency: 87.5%\nThroughput: 1250 ops/sec\nLatency: 45ms (avg)\n```\n\n## Technické odporúčania\n\n1. Implementačná stratégia A s parametrami X, Y, Z\n2. Optimalizácia komponentu B pre zvýšenie efektivity\n3. Integrácia s existujúcimi systémami prostredníctvom API C\n\n## Záver\n\nZ technického hľadiska "${prompt}" vykazuje optimálne charakteristiky pri implementácii navrhovaných konfigurácií a optimalizácií.`
      },
      
      presentation: {
        formal: `# Prezentácia: ${prompt}\n\n## Snímka 1: Úvod\n- Predstavenie témy "${prompt}"\n- Ciele prezentácie\n- Prehľad obsahu\n\n## Snímka 2: Kontext\n- Historický vývoj\n- Súčasný stav\n- Relevancia pre publikum\n\n## Snímka 3: Kľúčové body\n- Bod 1: [Detaily]\n- Bod 2: [Detaily]\n- Bod 3: [Detaily]\n\n## Snímka 4: Analýza\n- Výhody a prínosy\n- Výzvy a obmedzenia\n- Porovnanie s alternatívami\n\n## Snímka 5: Prípadová štúdia\n- Konkrétny príklad implementácie\n- Dosiahnuté výsledky\n- Poučenia\n\n## Snímka 6: Odporúčania\n- Strategické odporúčania\n- Implementačné kroky\n- Očakávané výsledky\n\n## Snímka 7: Záver\n- Zhrnutie kľúčových bodov\n- Výzva k akcii\n- Kontaktné informácie\n\n## Poznámky pre prezentujúceho\n- Pripraviť odpovede na očakávané otázky\n- Zdôrazniť praktické príklady\n- Prispôsobiť tempo podľa reakcií publika`,
        
        informal: `# Prezentácia: ${prompt}\n\n## Snímka 1: Začíname!\n- Hej, poďme sa pozrieť na "${prompt}"\n- O čom budeme hovoriť\n- Čo sa dozviete\n\n## Snímka 2: Trochu kontextu\n- Odkiaľ to prišlo\n- Kde sme teraz\n- Prečo by vás to malo zaujímať\n\n## Snímka 3: Hlavné veci\n- Vec 1: [Detaily]\n- Vec 2: [Detaily]\n- Vec 3: [Detaily]\n\n## Snímka 4: Rozbor\n- Čo je na tom super\n- S čím môžete mať problém\n- Ako to porovnať s inými možnosťami\n\n## Snímka 5: Príklad z praxe\n- Pozrite sa, ako to funguje v reálnom svete\n- Čo sa podarilo dosiahnuť\n- Čo sme sa naučili\n\n## Snímka 6: Tipy a triky\n- Čo odporúčame\n- Ako na to\n- Čo môžete očakávať\n\n## Snímka 7: Záver\n- Rýchle zhrnutie\n- Čo teraz?\n- Kde nás nájdete\n\n## Poznámky pre prezentujúceho\n- Buďte pripravení na otázky typu...\n- Použite príklady, ktoré ľudia poznajú\n- Sledujte reakcie a prispôsobte sa`,
        
        technical: `# Technická prezentácia: ${prompt}\n\n## Snímka 1: Úvod do technickej problematiky\n- Technický kontext "${prompt}"\n- Špecifikácia cieľov\n- Štruktúra technickej prezentácie\n\n## Snímka 2: Technické pozadie\n- Technologický stack\n- Architektúra systému\n- Technické požiadavky\n\n## Snímka 3: Technická špecifikácia\n- Parameter 1: [Technické detaily]\n- Parameter 2: [Technické detaily]\n- Parameter 3: [Technické detaily]\n\n## Snímka 4: Implementačná analýza\n- Výkonnostné metriky\n- Škálovateľnosť a optimalizácia\n- Bezpečnostné aspekty\n\n## Snímka 5: Demonštrácia\n- Ukážka kódu / Pseudokód\n```\nfunction implementSolution(params) {\n  // Implementačná logika\n  return optimizedResult;\n}\n```\n- Výsledky benchmarkov\n- Analýza edge cases\n\n## Snímka 6: Implementačný plán\n- Technická roadmapa\n- Integračné body\n- Monitorovanie a údržba\n\n## Snímka 7: Technický záver\n- Zhrnutie technických aspektov\n- Ďalšie kroky vývoja\n- Technická dokumentácia a zdroje\n\n## Poznámky pre prezentujúceho\n- Pripraviť odpovede na technické otázky\n- Mať pripravené alternatívne implementačné scenáre\n- Zdôrazniť technické výhody oproti konkurenčným riešeniam`
      }
    };
    
    // Výber šablóny na základe typu a tónu
    let content = '';
    
    if (templates[type] && templates[type][tone]) {
      content = templates[type][tone];
    } else {
      // Fallback na článok s formálnym tónom
      content = templates.article.formal;
    }
    
    // Preklad obsahu do požadovaného jazyka, ak nie je slovenčina
    if (language !== 'sk') {
      // Simulácia prekladu - v produkčnom prostredí by tu bol skutočný preklad
      content += `\n\n[Tento obsah by bol preložený do jazyka: ${language}]`;
    }
    
    return content;
  }

  /**
   * Pomocná metóda pre simuláciu predikcií používateľských akcií
   * @private
   * @param {Object} userContext - Kontext používateľa
   * @returns {Object[]} - Pole predikcií
   */
  _simulatePredictions(userContext) {
    // Základné predikcie
    const predictions = [
      { 
        action: 'create_content', 
        probability: 0.8, 
        context: 'recent_activity',
        recommendation: 'Ponúknuť vytvorenie nového obsahu na základe nedávnych aktivít'
      },
      { 
        action: 'view_analytics', 
        probability: 0.6, 
        context: 'time_of_day',
        recommendation: 'Zobraziť analytický widget na dashboarde s aktuálnymi metrikami'
      },
      { 
        action: 'update_profile', 
        probability: 0.3, 
        context: 'account_age',
        recommendation: 'Pripomenúť aktualizáciu profilu pre lepšiu personalizáciu'
      }
    ];
    
    // Ak máme kontext používateľa, upravíme predikcie
    if (userContext) {
      // Ak používateľ nedávno vytvoril obsah, znížime pravdepodobnosť vytvorenia nového
      if (userContext.recentActivities && userContext.recentActivities.includes('content_creation')) {
        predictions[0].probability = 0.5;
        
        // Pridáme novú predikciu pre úpravu existujúceho obsahu
        predictions.push({
          action: 'edit_content',
          probability: 0.7,
          context: 'recent_content_creation',
          recommendation: 'Ponúknuť úpravu nedávno vytvoreného obsahu'
        });
      }
      
      // Ak používateľ často používa tagy, odporučíme organizáciu obsahu
      if (userContext.preferences && userContext.preferences.usesTags) {
        predictions.push({
          action: 'organize_content',
          probability: 0.75,
          context: 'tag_preference',
          recommendation: 'Navrhnúť reorganizáciu obsahu pomocou tagov'
        });
      }
      
      // Ak je používateľ admin, odporučíme správu používateľov
      if (userContext.role === 'admin') {
        predictions.push({
          action: 'manage_users',
          probability: 0.65,
          context: 'admin_role',
          recommendation: 'Zobraziť prehľad aktivity používateľov'
        });
      }
    }
    
    // Zoradenie predikcií podľa pravdepodobnosti
    return predictions.sort((a, b) => b.probability - a.probability);
  }

  /**
   * Pomocná metóda pre vytvorenie hash reťazca
   * @private
   * @param {string} str - Reťazec na hashovanie
   * @returns {string} - Hash reťazec
   */
  _hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }
}

module.exports = new EnhancedAIService();
