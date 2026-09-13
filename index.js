require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');
const twilio = require('twilio');
const fetch = import('node-fetch').then(m => m.default);

const app = express();
app.use(express.urlencoded({ extended: false }));

// ============================================
// CONFIGURATION TWILIO (WhatsApp)
// ============================================
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ============================================
// CONFIGURATION TELEGRAM
// ============================================
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Appelle l'API OpenAI si disponible
 */
async function callOpenAI(message) {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  try {
    const fetchModule = await fetch;
    const response = await fetchModule('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error('❌ Erreur OpenAI:', error.message);
    return null;
  }
}

// ============================================
// WEBHOOKS WHATSAPP (Twilio)
// ============================================

app.post('/whatsapp', async (req, res) => {
  const incomingMessage = req.body.Body;
  const senderNumber = req.body.From;

  console.log(`📱 WhatsApp reçu de ${senderNumber}: ${incomingMessage}`);

  try {
    // Optionnel : Appel OpenAI
    let reply = '👋 Bonjour! Je suis Eldorado bot.';
    const aiResponse = await callOpenAI(incomingMessage);
    if (aiResponse) {
      reply = aiResponse;
    }

    // Envoyer la réponse
    await twilioClient.messages.create({
      body: reply,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: senderNumber,
    });

    console.log(`✅ Réponse envoyée à ${senderNumber}`);
  } catch (error) {
    console.error('❌ Erreur WhatsApp:', error.message);
  }

  res.status(200).send('OK');
});

// ============================================
// HANDLERS TELEGRAM
// ============================================

bot.start((ctx) => {
  ctx.reply('👋 Bienvenue sur Eldorado bot! Envoie-moi un message.');
});

bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;
  console.log(`💬 Telegram reçu: ${userMessage}`);

  try {
    let reply = '👋 Bonjour! Je suis Eldorado bot.';
    const aiResponse = await callOpenAI(userMessage);
    if (aiResponse) {
      reply = aiResponse;
    }

    await ctx.reply(reply);
    console.log(`✅ Réponse Telegram envoyée`);
  } catch (error) {
    console.error('❌ Erreur Telegram:', error.message);
    await ctx.reply('❌ Une erreur est survenue.');
  }
});

// ============================================
// ROUTES HTTP
// ============================================

app.get('/', (req, res) => {
  res.json({
    status: '✅ Bot Eldorado en ligne',
    version: '1.0.0',
    platforms: ['WhatsApp', 'Telegram'],
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur Express démarré sur le port ${PORT}`);
  console.log(`📱 WhatsApp webhook: POST http://localhost:${PORT}/whatsapp`);
  console.log(`💬 Telegram en mode polling...`);
});

// Démarrer Telegram bot en polling mode
bot.launch().catch((error) => {
  console.error('❌ Erreur démarrage Telegram:', error);
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
