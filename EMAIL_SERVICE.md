# 📧 Service Email - Documentation

## Vue d'ensemble
Cette intégration envoie automatiquement deux emails lors de la création d'un nouvel utilisateur :
1. **Email de bienvenue** - Envoyé à l'utilisateur qui vient de s'inscrire
2. **Email de notification** - Envoyé à l'administrateur pour l'informer d'une nouvelle inscription

## 📁 Fichiers utilisés

### 1. `utils/email.service.js`
Utilitaire qui gère l'envoi d'emails via Gmail SMTP.

**Fonctions disponibles:**
- `sendWelcomeEmail(userEmail, firstName)` - Envoie un email de bienvenue
- `sendAdminNotificationEmail(user)` - Envoie une notification à l'admin
- `testEmailConnection()` - Teste la connexion email

### 2. `controllers/users.Controller.js` (modifié)
Le contrôleur `createUser` appelle maintenant :
- `sendWelcomeEmail()` - Après la création de l'utilisateur
- `sendAdminNotificationEmail()` - Pour notifier l'admin

## 🔑 Configuration

### Variables d'environnement (.env)
```env
EMAIL_USER = medaziz.benismail@gmail.com
EMAIL_PASSWORD = cunu vyhz fzxp jgar
ADMIN_EMAIL = medaziz.benismail@gmail.com
```

### ⚠️ Configuration Gmail

Pour utiliser Gmail SMTP, vous devez :

1. **Activer les mots de passe d'application** :
   - Aller à [myaccount.google.com/security](https://myaccount.google.com/security)
   - Activer la vérification en deux étapes
   - Générer un mot de passe d'application (pour "Mail" et "Windows")
   - Utiliser ce mot de passe dans `EMAIL_PASSWORD`

2. **Autoriser les applications moins sûres** (optionnel) :
   - Si vous n'utilisez pas l'authentification 2FA
   - Aller à [myaccount.google.com/lesssecureapps](https://myaccount.google.com/lesssecureapps)

## 📨 Format des emails

### Email de bienvenue (utilisateur)

**Sujet:** 🎉 Bienvenue dans notre plateforme !

**Contenu:**
- Salutation personnalisée avec le prénom
- Message de bienvenue
- Bouton d'accès à la plateforme
- Informations de contact

### Email de notification (admin)

**Sujet:** 📢 Nouvel utilisateur inscrit sur la plateforme

**Contenu:**
- Titre informatif
- Détails de l'utilisateur :
  - Prénom, Nom
  - Email (cliquable)
  - Téléphone
  - Âge
  - Ville, Pays
  - Date d'inscription
  - ID utilisateur

## 🧪 Test

### Via Postman:
```bash
POST http://localhost:5000/users
Content-Type: multipart/form-data

Fields:
- firstname: John
- lastname: Doe
- email: john.doe@example.com
- password: Password123
- age: 28
- phone: +33612345678
- city: Paris
- country: France
```

### Résultat attendu:
1. L'utilisateur est créé ✓
2. Notification Discord est envoyée ✓
3. Email de bienvenue envoyé à `john.doe@example.com` ✓
4. Email de notification envoyé à `medaziz.benismail@gmail.com` ✓

## ⚙️ Gestion des erreurs

- Si les variables email ne sont pas configurées, les fonctions s'exécutent en silence (console warning)
- Les erreurs d'envoi d'email ne bloquent pas la création d'utilisateur
- Toutes les erreurs sont loggées dans la console serveur

## 🔐 Sécurité

- ✅ Mot de passe stocké dans `.env` (non commité sur Git)
- ✅ Aucune exposition d'identifiants
- ✅ Utilise le protocole SMTP sécurisé de Gmail
- ✅ Configuration 2FA recommandée

## 📦 Dépendances

- `nodemailer` - Pour l'envoi d'emails SMTP

## 🚀 Améliorations futures

- Templates d'email personnalisables
- Envoi d'emails asynchrone avec queue
- Support de multiples fournisseurs email
- Emails de notification pour autres actions (suppression, modification)
- Système d'unsubscribe
- Tracking et analytics d'emails

## 🐛 Troubleshooting

### L'email n'est pas envoyé

**Vérifiez:**
1. Les variables `.env` sont correctement configurées
2. Le mot de passe d'application Gmail est correct
3. La vérification 2FA est activée sur Gmail
4. Les pare-feu/antivirus ne bloquent pas le port SMTP 587

### Vérifier la connexion

```javascript
const emailService = require('./utils/email.service');
emailService.testEmailConnection();
```

Consultez la console pour voir si la connexion est établie.
