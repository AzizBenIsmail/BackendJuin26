const axios = require('axios');

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

/**
 * Envoyer une notification Discord pour la création d'un utilisateur
 * @param {Object} user - Les données de l'utilisateur créé
 */
module.exports.notifyUserCreation = async (user) => {
  try {
    if (!DISCORD_WEBHOOK_URL) {
      console.warn('Discord webhook URL non configurée');
      return;
    }

    const embed = {
      title: '✅ Nouvel utilisateur créé',
      description: `Un nouvel utilisateur s'est inscrit sur le système`,
      color: 3066993, // Vert
      fields: [
        {
          name: 'Prénom',
          value: user.firstname || 'Non renseigné',
          inline: true
        },
        {
          name: 'Nom',
          value: user.lastname || 'Non renseigné',
          inline: true
        },
        {
          name: 'Email',
          value: user.email || 'Non renseigné',
          inline: false
        },
        {
          name: 'Âge',
          value: user.age ? `${user.age} ans` : 'Non renseigné',
          inline: true
        },
        {
          name: 'Téléphone',
          value: user.phone || 'Non renseigné',
          inline: true
        },
        {
          name: 'Ville',
          value: user.city || 'Non renseigné',
          inline: true
        },
        {
          name: 'Pays',
          value: user.country || 'Non renseigné',
          inline: true
        },
        {
          name: 'ID Utilisateur',
          value: user._id?.toString() || 'N/A',
          inline: false
        },
        {
          name: 'Date de création',
          value: new Date().toLocaleString('fr-FR'),
          inline: false
        }
      ],
      footer: {
        text: 'Backend API - Notification Utilisateur'
      },
      timestamp: new Date().toISOString()
    };

    await axios.post(DISCORD_WEBHOOK_URL, {
      embeds: [embed]
    });

    console.log('✅ Notification Discord envoyée avec succès');

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de la notification Discord:', error.message);
    // On ne lève pas l'erreur pour ne pas bloquer la création de l'utilisateur
  }
};

/**
 * Envoyer une notification Discord générique
 * @param {String} title - Titre du message
 * @param {String} description - Description du message
 * @param {String} color - Couleur (hex ou entier)
 * @param {Object} fields - Champs additionnels
 */
module.exports.sendDiscordNotification = async (title, description, color = 3066993, fields = []) => {
  try {
    if (!DISCORD_WEBHOOK_URL) {
      console.warn('Discord webhook URL non configurée');
      return;
    }

    const embed = {
      title,
      description,
      color,
      fields,
      footer: {
        text: 'Backend API - Notification Système'
      },
      timestamp: new Date().toISOString()
    };

    await axios.post(DISCORD_WEBHOOK_URL, {
      embeds: [embed]
    });

    console.log('✅ Notification Discord envoyée');

  } catch (error) {
    console.error('❌ Erreur Discord notification:', error.message);
  }
};
