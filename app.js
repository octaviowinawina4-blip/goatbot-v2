require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Variables d'environnement
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'your_verify_token';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || 'your_page_access_token';
const GRAPH_API_URL = 'https://graph.instagram.com/v18.0';

// ==================== WEBHOOK SETUP ====================
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Webhook vérifié');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// ==================== RECEIVE MESSAGES ====================
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      const webhookEvent = entry.messaging[0];
      const senderPsid = webhookEvent.sender.id;

      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostback(senderPsid, webhookEvent.postback);
      }
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// ==================== HANDLE MESSAGES ====================
async function handleMessage(senderPsid, receivedMessage) {
  let response;

  if (receivedMessage.text) {
    const text = receivedMessage.text.toLowerCase();

    // Réponses automatiques
    if (text.includes('bonjour') || text.includes('hello') || text.includes('salut')) {
      response = { text: '👋 Salut ! Comment ça va ?' };
    } else if (text.includes('aide') || text.includes('help')) {
      response = {
        text: 'Voici mes commandes:\n📌 "bonjour" - Me saluer\n🎮 "menu" - Afficher le menu\n❓ "aide" - Afficher l'aide'
      };
    } else if (text.includes('menu')) {
      response = getMenuResponse();
    } else {
      response = { text: `Vous avez dit: "${receivedMessage.text}"\n\nTapez "aide" pour les commandes disponibles.` };
    }
  } else if (receivedMessage.attachments) {
    response = { text: '📎 Merci pour le fichier reçu !' };
  }

  if (response) {
    callSendAPI(senderPsid, response);
  }
}

// ==================== HANDLE POSTBACK ====================
function handlePostback(senderPsid, receivedPostback) {
  const payload = receivedPostback.payload;

  if (payload === 'GET_STARTED') {
    callSendAPI(senderPsid, {
      text: '🤖 Bienvenue sur GoatBot V2!\n\nJe suis un assistant IA pour Messenger.\nTapez "aide" pour voir les commandes.'
    });
  } else if (payload === 'ABOUT') {
    callSendAPI(senderPsid, {
      text: 'ℹ️ GoatBot V2 est un bot Messenger avancé avec support des boutons, menus, et réponses intelligentes.'
    });
  }
}

// ==================== SEND MESSAGE ====================
async function callSendAPI(senderPsid, response) {
  try {
    const requestBody = {
      recipient: { id: senderPsid },
      message: response
    };

    await axios.post(
      `https://graph.instagram.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      requestBody
    );

    console.log(`✅ Message envoyé à ${senderPsid}`);
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error.response?.data || error.message);
  }
}

// ==================== MENU RESPONSE ====================
function getMenuResponse() {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: '📋 Menu Principal',
        buttons: [
          { type: 'postback', title: '📌 À propos', payload: 'ABOUT' },
          { type: 'web_url', title: '🌐 Visiter', url: 'https://github.com' },
          { type: 'postback', title: '🆘 Support', payload: 'SUPPORT' }
        ]
      }
    }
  };
}

// ==================== SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 GoatBot V2 lancé sur le port ${PORT}`);
  console.log(`📡 Webhook: http://localhost:${PORT}/webhook`);
});

module.exports = app;