# 🤖 Eldorado Bot - Bot Multi-Plateforme

Bot intelligent pour **WhatsApp** et **Telegram** avec intégration **OpenAI** optionnelle.

---

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Déploiement](#-déploiement)
- [Utilisation](#-utilisation)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Fonctionnalités

✅ **WhatsApp** - Répond aux messages via Twilio  
✅ **Telegram** - Bot conversationnel  
✅ **OpenAI** - Réponses intelligentes (optionnel)  
✅ **Express.js** - Serveur HTTP performant  
✅ **Dotenv** - Gestion sécurisée des secrets  

---

## 📦 Prérequis

- **Node.js** >= 18
- **npm** ou **yarn**
- Comptes (au moins un parmi) :
  - 🔔 **Twilio** (WhatsApp)
  - 🤖 **Telegram** (@BotFather)
  - 🧠 **OpenAI** (optionnel)

---

## 🚀 Installation

### 1️⃣ Cloner le repo
```bash
git clone https://github.com/proxina79/eldorado-proxina79-bot.git
cd eldorado-proxina79-bot
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Créer le fichier `.env`
```bash
cp .env.example .env
```

---

## ⚙️ Configuration

Éditez le fichier `.env` avec vos secrets :

### 📱 WhatsApp (Twilio)

1. Allez sur **https://www.twilio.com/console**
2. Récupérez :
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_NUMBER` (numéro fourni par Twilio)
3. Mettez à jour `.env` :

```env
TWILIO_ACCOUNT_SID=AC123456789abcdef
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155552671
WHATSAPP_ADMIN_NUMBER=whatsapp:+33612345678
```

### 💬 Telegram

1. Ouvrez Telegram et cherchez **@BotFather**
2. Créez un nouveau bot (`/newbot`)
3. Récupérez le token et mettez-le dans `.env` :

```env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

### 🧠 OpenAI (Optionnel)

1. Allez sur **https://platform.openai.com/api-keys**
2. Créez une nouvelle clé API
3. Ajoutez dans `.env` :

```env
OPENAI_API_KEY=sk-proj-abc123def456...
```

---

## 🌐 Déploiement

### En local (développement)
```bash
npm run dev
```

Le bot démarre sur `http://localhost:3000`

### En production

#### Option 1 : Heroku
```bash
heroku create eldorado-bot
heroku config:set TWILIO_ACCOUNT_SID=your_sid
heroku config:set TWILIO_AUTH_TOKEN=your_token
# ... ajouter tous les autres secrets
git push heroku main
```

#### Option 2 : Railway
```bash
railway link
railway variables
# Ajouter vos secrets via l'interface Railway
git push
```

#### Option 3 : Vercel (avec serverless)
```bash
vercel
# Configurer les variables d'environnement dans Vercel
```

#### Option 4 : Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t eldorado-bot .
docker run -p 3000:3000 --env-file .env eldorado-bot
```

---

## 📖 Utilisation

### 📱 Tester sur WhatsApp

1. Configurez le webhook Twilio pour recevoir les messages
2. Envoyez un message WhatsApp au numéro Twilio
3. Le bot répond automatiquement

**Webhook URL** (à ajouter dans Twilio) :
```
https://your-domain.com/whatsapp
```

### 💬 Tester sur Telegram

1. Cherchez votre bot sur Telegram
2. Cliquez `/start`
3. Envoyez n'importe quel message
4. Le bot répond automatiquement

### 🧠 Avec OpenAI

Si la clé OpenAI est configurée, le bot utilise GPT-3.5 pour générer des réponses intelligentes.

---

## 🔧 Structure du projet

```
eldorado-proxina79-bot/
├── index.js              # Fichier principal du bot
├── package.json          # Dépendances
├── .env.example          # Template des secrets
├── .env                  # Secrets (NE PAS COMMITTER)
├── .gitignore            # Fichiers ignorés
└── README.md             # Ce fichier
```

---

## 📝 Variables d'environnement

| Variable | Type | Exemple | Optionnel |
|----------|------|---------|-----------|
| `TWILIO_ACCOUNT_SID` | string | `AC123...` | ✅ |
| `TWILIO_AUTH_TOKEN` | string | `token...` | ✅ |
| `TWILIO_WHATSAPP_NUMBER` | string | `whatsapp:+1...` | ✅ |
| `WHATSAPP_ADMIN_NUMBER` | string | `whatsapp:+33...` | ✅ |
| `TELEGRAM_BOT_TOKEN` | string | `123456:ABC...` | ✅ |
| `OPENAI_API_KEY` | string | `sk-proj-...` | ✅ |
| `PORT` | number | `3000` | ✅ (défaut: 3000) |
| `NODE_ENV` | string | `development` | ✅ |

---

## 🐛 Troubleshooting

### ❌ "Error: Cannot find module 'dotenv'"
```bash
npm install
```

### ❌ "Twilio credentials invalid"
- Vérifiez que `TWILIO_ACCOUNT_SID` et `TWILIO_AUTH_TOKEN` sont corrects
- Testez sur https://www.twilio.com/console

### ❌ "Telegram bot not responding"
- Vérifiez que `TELEGRAM_BOT_TOKEN` est correct
- Assurez-vous que le bot est en mode polling (pas de webhook)

### ❌ "OpenAI API rate limit"
- Attendez quelques minutes
- Vérifiez votre crédit API

### ❌ Port déjà utilisé
```bash
PORT=3001 npm run dev
```

---

## 📞 Support

- **Twilio Docs** : https://www.twilio.com/docs
- **Telegram Bot API** : https://core.telegram.org/bots/api
- **OpenAI API** : https://platform.openai.com/docs

---

## 📄 Licence

MIT License - Voir le fichier `LICENSE`

---

## 👨‍💻 Auteur

**proxina79** - Bot Eldorado multi-plateforme

🚀 Bon développement !
