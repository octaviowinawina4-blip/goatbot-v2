// commands.js

const commands = {
  help: {
    name: 'aide',
    description: 'Affiche les commandes disponibles',
    execute: (msg) => {
      return 'Voici mes commandes:\n📌 "bonjour" - Me saluer\n🎮 "menu" - Afficher le menu\n❓ "aide" - Afficher l'aide';
    }
  },
  hello: {
    name: 'bonjour',
    description: 'Saluer le bot',
    execute: (msg) => {
      return '👋 Salut ! Comment ça va ?';
    }
  },
  menu: {
    name: 'menu',
    description: 'Afficher le menu principal',
    execute: (msg) => {
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
  }
};

function getCommand(text) {
  const input = text.toLowerCase();
  for (const [key, cmd] of Object.entries(commands)) {
    if (input.includes(cmd.name)) {
      return cmd;
    }
  }
  return null;
}

module.exports = { commands, getCommand };