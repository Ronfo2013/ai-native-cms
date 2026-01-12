# 🎯 Due Progetti in Uno Repository

Questo repository contiene **due progetti distinti** che condividono la stessa base tecnologica ma hanno obiettivi diversi.

## 📋 Progetti Disponibili

### 1. AI-Native CMS (Branch: `main`)

**Cosa fa**: CMS completo per gestire contenuti (post, pagine, utenti)

**Features**:
- Blog post con AI assistance
- Pagine statiche
- User management
- Semantic search
- RAG per Q&A
- REST + GraphQL APIs

**Ideale per**:
- Blog aziendali
- Knowledge bases
- Documentation sites
- Content-heavy websites

**Branch**: `main`

[📖 Documentazione Completa →](README.md)

---

### 2. AI Landing Page Builder 🚀 (Branch: `feature/landing-page-builder`)

**Cosa fa**: Crea landing pages professionali in 15-20 secondi con AI

**Features**:
- 🎨 Genera landing page da descrizione testuale
- ⚡ 5 template pronti (SaaS, Product, Event, Waitlist, Hero+CTA)
- 🤖 AI genera: Hero, Features, Testimonials, Pricing, FAQ
- 🔄 A/B testing con varianti AI
- ✨ Copy improvement automatico
- 📊 Analytics integrato

**Ideale per**:
- Startup che servono landing veloce per MVP
- Marketing teams che fanno campagne ads
- Product launches
- Lead generation
- Event promotion
- Waitlist collection

**Branch**: `feature/landing-page-builder`

[📖 Documentazione Landing Pages →](https://github.com/Ronfo2013/ai-native-cms/blob/feature/landing-page-builder/LANDING_PAGES.md)

---

## 🤔 Quale Usare?

### Usa **AI-Native CMS** (`main`) se:
- ✅ Hai bisogno di un blog o sito content-heavy
- ✅ Vuoi gestire articoli e pagine nel tempo
- ✅ Serve user management e permessi
- ✅ Vuoi semantic search avanzata
- ✅ Focus su contenuto long-form

**Esempio**: Blog aziendale, documentation site, knowledge base

### Usa **Landing Page Builder** (`feature/landing-page-builder`) se:
- ✅ Devi creare landing pages velocemente
- ✅ Focus su conversioni e lead generation
- ✅ Serve per campagne marketing
- ✅ Vuoi fare A/B testing facilmente
- ✅ Non serve backend complesso

**Esempio**: Product launch, campagna ads, waitlist, event registration

---

## 🚀 Quick Start

### Per AI-Native CMS (main):

```bash
git clone https://github.com/Ronfo2013/ai-native-cms.git
cd ai-native-cms
git checkout main

cp .env.example .env
# Aggiungi ANTHROPIC_API_KEY

docker-compose up -d
```

Apri: http://localhost:5173

### Per Landing Page Builder:

```bash
git clone https://github.com/Ronfo2013/ai-native-cms.git
cd ai-native-cms
git checkout feature/landing-page-builder

cp .env.example .env
# Aggiungi ANTHROPIC_API_KEY

docker-compose up -d
```

Apri: http://localhost:5173
Click: "New Landing Page" → Compila form → Generate!

---

## 📊 Confronto Features

| Feature | AI-Native CMS | Landing Page Builder |
|---------|--------------|---------------------|
| **Tempo setup** | 5 min | 2 min |
| **Use case principale** | Content management | Lead generation |
| **AI Generation** | Post, summaries, tags | Complete landing pages |
| **Template** | 2-3 page templates | 5 landing templates |
| **Sezioni modulari** | Limited | 10+ section types |
| **A/B Testing** | ❌ | ✅ Built-in |
| **Analytics** | Basic | Conversions focused |
| **User Management** | Full RBAC | Basic |
| **API** | REST + GraphQL | REST |
| **Time to first page** | ~10 min | ~1 min |
| **Costo per pagina** | ~$0.02-0.05 | ~$0.05-0.08 |

---

## 💡 Possibile Merge Futuro?

I due progetti potrebbero essere mergiati in futuro creando un sistema ibrido:
- **CMS** per contenuto long-form
- **Landing Builder** per conversion pages

Ma per ora sono separati per:
1. **Focus diversi**: Uno è content-first, l'altro conversion-first
2. **UI diversa**: Dashboard vs Builder interface
3. **Testing**: Più facile testare separatamente
4. **Deploy**: Possibilità di deployare solo uno dei due

---

## 📚 Documentazione

### AI-Native CMS
- [README.md](README.md) - Documentazione completa
- [QUICKSTART.md](QUICKSTART.md) - Setup veloce
- [ARCHITECTURE.md](ARCHITECTURE.md) - Architettura sistema
- [CONTRIBUTING.md](CONTRIBUTING.md) - Come contribuire

### Landing Page Builder
- [LANDING_PAGES.md](https://github.com/Ronfo2013/ai-native-cms/blob/feature/landing-page-builder/LANDING_PAGES.md) - Guida completa (Italiano)
- API Reference nel README del branch
- Esempi pratici di utilizzo

---

## 🤝 Contribuire

Puoi contribuire a entrambi i progetti!

**Per CMS (main)**:
```bash
git checkout main
git checkout -b feature/your-feature
# ... fai modifiche
git push origin feature/your-feature
```

**Per Landing Builder**:
```bash
git checkout feature/landing-page-builder
git checkout -b feature/your-feature
# ... fai modifiche
git push origin feature/your-feature
```

---

## ❓ FAQ

**Q: Posso usare entrambi insieme?**
A: Tecnicamente sì, ma richiederebbe merge dei due branch. Per ora sono pensati per use case diversi.

**Q: Quale costa meno?**
A: Simili (~$0.05 per contenuto). CMS ha più caching quindi può costare meno nel tempo.

**Q: Quale è più veloce?**
A: Landing Page Builder è ultra-veloce (1 minuto da idea a landing live). CMS richiede più setup iniziale.

**Q: Posso migrare da uno all'altro?**
A: Non facilmente. Sono database schemas diversi. Meglio scegliere quello giusto dall'inizio.

**Q: Updates futuri?**
A: Entrambi i branch vengono aggiornati. `main` è più stabile, `feature/landing-page-builder` è più sperimentale.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Ronfo2013/ai-native-cms/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Ronfo2013/ai-native-cms/discussions)
- **PRs**: Benvenute su entrambi i branch!

---

**Built with Claude Opus 4.5** 🤖
