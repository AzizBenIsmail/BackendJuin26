const mongoose = require('mongoose');
const UserModel = require('../models/user.Model');
require('dotenv').config();

// Données statiques de 20 utilisateurs
const users = [
  {
    firstname: 'Alice',
    lastname: 'Martin',
    email: 'alice.martin@example.com',
    password: 'Alice@12345',
    age: 28,
    phone: '+33612345678',
    address: '123 Rue de la Paix',
    city: 'Paris',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@example.com',
    password: 'Bob@123456',
    age: 35,
    phone: '+33623456789',
    address: '456 Avenue des Champs',
    city: 'Lyon',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Catherine',
    lastname: 'Bernard',
    email: 'catherine.bernard@example.com',
    password: 'Catherine@1234',
    age: 42,
    phone: '+33634567890',
    address: '789 Boulevard Saint-Germain',
    city: 'Marseille',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'David',
    lastname: 'Leblanc',
    email: 'david.leblanc@example.com',
    password: 'David@123456',
    age: 31,
    phone: '+33645678901',
    address: '321 Rue de Rivoli',
    city: 'Toulouse',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Emma',
    lastname: 'Moreau',
    email: 'emma.moreau@example.com',
    password: 'Emma@1234567',
    age: 26,
    phone: '+33656789012',
    address: '654 Avenue Montaigne',
    city: 'Nice',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Frank',
    lastname: 'Petit',
    email: 'frank.petit@example.com',
    password: 'Frank@123456',
    age: 38,
    phone: '+33667890123',
    address: '987 Rue de la Republique',
    city: 'Bordeaux',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Gabrielle',
    lastname: 'Rousseau',
    email: 'gabrielle.rousseau@example.com',
    password: 'Gabrielle@123',
    age: 29,
    phone: '+33678901234',
    address: '111 Chemin de la Gare',
    city: 'Lille',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Henry',
    lastname: 'Fournier',
    email: 'henry.fournier@example.com',
    password: 'Henry@1234567',
    age: 45,
    phone: '+33689012345',
    address: '222 Rue de la Liberation',
    city: 'Nantes',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Isabelle',
    lastname: 'Garnier',
    email: 'isabelle.garnier@example.com',
    password: 'Isabelle@1234',
    age: 33,
    phone: '+33690123456',
    address: '333 Avenue de France',
    city: 'Strasbourg',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Jacques',
    lastname: 'Mercier',
    email: 'jacques.mercier@example.com',
    password: 'Jacques@123456',
    age: 50,
    phone: '+33701234567',
    address: '444 Rue Saint-Martin',
    city: 'Montpellier',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Karen',
    lastname: 'Vincent',
    email: 'karen.vincent@example.com',
    password: 'Karen@1234567',
    age: 27,
    phone: '+33712345678',
    address: '555 Boulevard Victor-Hugo',
    city: 'Toulouse',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Laurent',
    lastname: 'Benoit',
    email: 'laurent.benoit@example.com',
    password: 'Laurent@123456',
    age: 41,
    phone: '+33723456789',
    address: '666 Rue de Bellechasse',
    city: 'Lyon',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Marie',
    lastname: 'Arnaud',
    email: 'marie.arnaud@example.com',
    password: 'Marie@1234567',
    age: 24,
    phone: '+33734567890',
    address: '777 Avenue de la Republique',
    city: 'Nice',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Nicolas',
    lastname: 'Lefevre',
    email: 'nicolas.lefevre@example.com',
    password: 'Nicolas@123456',
    age: 36,
    phone: '+33745678901',
    address: '888 Rue de Turenne',
    city: 'Bordeaux',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Olivia',
    lastname: 'Dubois',
    email: 'olivia.dubois@example.com',
    password: 'Olivia@1234567',
    age: 30,
    phone: '+33756789012',
    address: '999 Boulevard de Strasbourg',
    city: 'Marseille',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Philippe',
    lastname: 'Gallet',
    email: 'philippe.gallet@example.com',
    password: 'Philippe@123456',
    age: 48,
    phone: '+33767890123',
    address: '1010 Rue de Berri',
    city: 'Lille',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Québec',
    lastname: 'Noel',
    email: 'quebec.noel@example.com',
    password: 'Quebec@1234567',
    age: 25,
    phone: '+33778901234',
    address: '1111 Rue Sainte-Anne',
    city: 'Nantes',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Rachel',
    lastname: 'Leroy',
    email: 'rachel.leroy@example.com',
    password: 'Rachel@1234567',
    age: 39,
    phone: '+33789012345',
    address: '1212 Avenue Foch',
    city: 'Strasbourg',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Samuel',
    lastname: 'Gauthier',
    email: 'samuel.gauthier@example.com',
    password: 'Samuel@123456',
    age: 32,
    phone: '+33790123456',
    address: '1313 Boulevard de la Croisette',
    city: 'Montpellier',
    country: 'France',
    isActive: true
  },
  {
    firstname: 'Therese',
    lastname: 'Hubert',
    email: 'therese.hubert@example.com',
    password: 'Therese@1234567',
    age: 44,
    phone: '+33701234567',
    address: '1414 Rue de Rennes',
    city: 'Paris',
    country: 'France',
    isActive: true
  }
];

// Fonction pour ajouter les utilisateurs
const seedUsers = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.mongoURI);
    console.log('✅ Connecté à MongoDB');

    // Vérifier si les utilisateurs existent déjà
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      console.log(`⚠️  La base de données contient déjà ${userCount} utilisateurs.`);
      console.log('🗑️  Suppression des utilisateurs existants...');
      await UserModel.deleteMany({});
      console.log('✅ Utilisateurs existants supprimés');
    }

    // Ajouter les nouveaux utilisateurs
    console.log('📝 Ajout de 20 utilisateurs...');
    const createdUsers = await UserModel.insertMany(users);
    console.log(`✅ ${createdUsers.length} utilisateurs ajoutés avec succès !`);

    // Afficher les résultats
    console.log('\n📊 Statistiques :');
    console.log(`   - Total utilisateurs: ${createdUsers.length}`);
    console.log(`   - Hommes: ${createdUsers.length / 2}`);
    console.log(`   - Femmes: ${createdUsers.length / 2}`);
    console.log(`   - Âge moyen: ${(users.reduce((sum, u) => sum + u.age, 0) / users.length).toFixed(1)} ans`);

    console.log('\n📧 Quelques utilisateurs créés:');
    createdUsers.slice(0, 3).forEach(user => {
      console.log(`   - ${user.firstname} ${user.lastname} (${user.email})`);
    });

    // Fermer la connexion
    await mongoose.disconnect();
    console.log('\n✅ Seed complétée avec succès !');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erreur lors du seed:', error.message);
    process.exit(1);
  }
};

// Exécuter le seed
seedUsers();
