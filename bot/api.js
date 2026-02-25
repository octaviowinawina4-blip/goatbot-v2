// api.js

const axios = require('axios');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || 'your_page_access_token';
const GRAPH_API_URL = 'https://graph.instagram.com/v18.0';

// Send a message via Facebook Messenger API
async function sendMessage(senderPsid, response) {
  try {
    const requestBody = {
      recipient: { id: senderPsid },
      message: response
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    await axios.post(
      `${GRAPH_API_URL}/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      requestBody,
      config
    );

    console.log(`✅ Message envoyé à ${senderPsid}`);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error.response?.data || error.message);
    return false;
  }
}

// Get user profile information
async function getUserProfile(senderPsid) {
  try {
    const response = await axios.get(
      `${GRAPH_API_URL}/${senderPsid}?fields=first_name,last_name,profile_pic_url&access_token=${PAGE_ACCESS_TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du profil:', error.message);
    return null;
  }
}

module.exports = { sendMessage, getUserProfile };