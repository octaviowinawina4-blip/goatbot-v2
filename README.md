# 🤖 GoatBot V2 - Messenger Bot

Un bot Messenger avancé et complet, prêt à être déployé.

## 📋 Fonctionnalités

✅ Réponses automatiques intelligentes
✅ Gestion des commandes
✅ Support des menus et boutons
✅ Webhook Facebook/Meta
✅ Gestion des messages et postbacks
✅ Structure modulaire et extensible

## 🚀 Installation

### Prérequis
- Node.js v14+ 
- npm ou yarn
- Compte Facebook Developer

### Étapes

1. **Cloner et installer**
```bash
git clone https://github.com/octaviowinawina4-blip/goatbot-v2.git
cd goatbot-v2
npm install
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Remplissez `.env` avec vos tokens:
- `PAGE_ACCESS_TOKEN` - Token d'accès de votre page Facebook
- `VERIFY_TOKEN` - Token de vérification du webhook

3. **Lancer le bot**
```bash
npm start
```

En développement avec hot-reload:
```bash
npm run dev
```

## 🔌 Configuration du Webhook

1. Allez sur [Facebook Developers](https://developers.facebook.com)
2. Sélectionnez votre application
3. Allez dans Messenger > Configuration
4. Ajoutez votre Webhook URL: `https://votre-domaine.com/webhook`
5. Verify Token: utilisez la valeur de votre `.env`
6. Subscribe aux événements: `messages`, `messaging_postbacks`

## 📝 Commandes Disponibles

- `bonjour/hello/salut` - Saluer le bot
- `aide/help` - Afficher l'aide
- `menu` - Afficher le menu principal

## 📂 Structure du Projet

```
goatbot-v2/
├── app.js              # Fichier principal
├── package.json        # Dépendances
├── .env.example        # Variables d'environnement (template)
├── .gitignore          # Fichiers ignorés
└── README.md           # Documentation
```

## 🌐 Déploiement

### Avec Heroku
```bash
heroku create votre-app
git push heroku main
heroku config:set PAGE_ACCESS_TOKEN=xxx VERIFY_TOKEN=yyy
```

### Avec Railway, Render, ou Replit
Configurez les variables d'environnement et déployez directement.

## 🛠️ Dépannage

**Le webhook ne se connecte pas?**
- Vérifiez que `VERIFY_TOKEN` correspond à celui de Facebook
- Assurez-vous que l'URL est accessible publiquement

**Les messages ne sont pas envoyés?**
- Vérifiez que `PAGE_ACCESS_TOKEN` est correct
- Assurez-vous que la page est liée à votre app

## 📚 Documentation

- [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform)
- [Graph API Reference](https://developers.facebook.com/docs/graph-api)

## 📄 Licence

MIT

## 👤 Auteur

octaviowinawina4-blip

---
**Besoin d'aide?** Ouvrez une issue sur GitHub!