const nodemailer = require('nodemailer');

// Configurer le transporteur email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Envoyer un email de bienvenue au nouvel utilisateur
 * @param {String} userEmail - Email du nouvel utilisateur
 * @param {String} firstName - Prénom de l'utilisateur
 */
module.exports.sendWelcomeEmail = async (userEmail, firstName) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Configuration email incomplète');
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: '🎉 Bienvenue dans notre plateforme !',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Bienvenue ${firstName} ! 🎉</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #333;">Bonjour ${firstName},</p>
            
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              Nous sommes ravi de vous accueillir sur notre plateforme ! Votre compte a été créé avec succès.
            </p>
            
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              Vous pouvez maintenant vous connecter et accéder à tous les services disponibles.
            </p>
            
            <div style="margin: 30px 0; text-align: center;">
              <a href="http://localhost:5000" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Accéder à la plateforme
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              Si vous avez des questions, n'hésitez pas à nous contacter.
            </p>
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              Email: ${process.env.EMAIL_USER}
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de bienvenue envoyé à ${userEmail}`);

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email de bienvenue:', error.message);
  }
};

/**
 * Envoyer un email de notification au propriétaire
 * @param {Object} user - Données de l'utilisateur créé
 */
module.exports.sendAdminNotificationEmail = async (user) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.ADMIN_EMAIL) {
      console.warn('Configuration email incomplète pour notification admin');
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: '📢 Nouvel utilisateur inscrit sur la plateforme',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">📢 Nouvel Utilisateur</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #333;">Un nouvel utilisateur s'est inscrit sur la plateforme !</p>
            
            <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea;">
              <p><strong>Informations de l'utilisateur:</strong></p>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <strong>Prénom:</strong> ${user.firstname || 'Non renseigné'}
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <strong>Nom:</strong> ${user.lastname || 'Non renseigné'}
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <strong>Email:</strong> <a href="mailto:${user.email}" style="color: #667eea;">${user.email}</a>
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <strong>Téléphone:</strong> ${user.phone || 'Non renseigné'}
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <strong>Âge:</strong> ${user.age ? user.age + ' ans' : 'Non renseigné'}
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <strong>Ville:</strong> ${user.city || 'Non renseigné'}
                </li>
                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <strong>Pays:</strong> ${user.country || 'Non renseigné'}
                </li>
                <li style="padding: 8px 0;">
                  <strong>Date d'inscription:</strong> ${new Date().toLocaleString('fr-FR')}
                </li>
              </ul>
            </div>
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              ID Utilisateur: ${user._id?.toString()}
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email de notification envoyé à ${process.env.ADMIN_EMAIL}`);

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email de notification:', error.message);
  }
};

/**
 * Tester la connexion email
 */
module.exports.testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ Connexion email vérifiée avec succès');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion email:', error.message);
    return false;
  }
};
