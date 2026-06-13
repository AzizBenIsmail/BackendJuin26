# 🌱 Seeder Utilisateurs - Documentation

## Vue d'ensemble
Le seeder permet d'ajouter rapidement 20 utilisateurs de test à la base de données MongoDB pour faciliter le développement et les tests.

## 📁 Fichier

### `seeders/users.seeder.js`
Script Node.js qui :
- Se connecte à MongoDB
- Supprime les utilisateurs existants (si présents)
- Ajoute 20 nouveaux utilisateurs avec des données réalistes
- Affiche des statistiques
- Se déconnecte proprement

## 🚀 Utilisation

### Exécuter le seeder
```bash
npm run seed
```

### Résultat attendu
```
✅ Connecté à MongoDB
⚠️  La base de données contient déjà X utilisateurs.
🗑️  Suppression des utilisateurs existants...
✅ Utilisateurs existants supprimés
📝 Ajout de 20 utilisateurs...
✅ 20 utilisateurs ajoutés avec succès !

📊 Statistiques :
   - Total utilisateurs: 20
   - Hommes: 10
   - Femmes: 10
   - Âge moyen: 35.1 ans

📧 Quelques utilisateurs créés:
   - Alice Martin (alice.martin@example.com)
   - Bob Dupont (bob.dupont@example.com)
   - Catherine Bernard (catherine.bernard@example.com)

✅ Seed complétée avec succès !
```

## 👥 Utilisateurs créés

Voici la liste des 20 utilisateurs créés :

1. **Alice Martin** - alice.martin@example.com - 28 ans - Paris
2. **Bob Dupont** - bob.dupont@example.com - 35 ans - Lyon
3. **Catherine Bernard** - catherine.bernard@example.com - 42 ans - Marseille
4. **David Leblanc** - david.leblanc@example.com - 31 ans - Toulouse
5. **Emma Moreau** - emma.moreau@example.com - 26 ans - Nice
6. **Frank Petit** - frank.petit@example.com - 38 ans - Bordeaux
7. **Gabrielle Rousseau** - gabrielle.rousseau@example.com - 29 ans - Lille
8. **Henry Fournier** - henry.fournier@example.com - 45 ans - Nantes
9. **Isabelle Garnier** - isabelle.garnier@example.com - 33 ans - Strasbourg
10. **Jacques Mercier** - jacques.mercier@example.com - 50 ans - Montpellier
11. **Karen Vincent** - karen.vincent@example.com - 27 ans - Toulouse
12. **Laurent Benoit** - laurent.benoit@example.com - 41 ans - Lyon
13. **Marie Arnaud** - marie.arnaud@example.com - 24 ans - Nice
14. **Nicolas Lefevre** - nicolas.lefevre@example.com - 36 ans - Bordeaux
15. **Olivia Dubois** - olivia.dubois@example.com - 30 ans - Marseille
16. **Philippe Gallet** - philippe.gallet@example.com - 48 ans - Lille
17. **Québec Noel** - quebec.noel@example.com - 25 ans - Nantes
18. **Rachel Leroy** - rachel.leroy@example.com - 39 ans - Strasbourg
19. **Samuel Gauthier** - samuel.gauthier@example.com - 32 ans - Montpellier
20. **Therese Hubert** - therese.hubert@example.com - 44 ans - Paris

## 🔐 Mots de passe

Tous les utilisateurs ont des mots de passe différents au format :
- **Format:** `Prenom@123456` (ou variantes)
- **Exemple:** Alice@12345, Bob@123456, etc.

### Validation
- ✅ Contient une majuscule
- ✅ Contient une minuscule
- ✅ Contient au moins un chiffre
- ✅ Minimum 6 caractères

## 📊 Statistiques des données

- **Total:** 20 utilisateurs
- **Hommes:** 10 (50%)
- **Femmes:** 10 (50%)
- **Âge moyen:** 35.1 ans
- **Pays:** Tous France
- **Villes:** Paris, Lyon, Marseille, Toulouse, Nice, Bordeaux, Lille, Nantes, Strasbourg, Montpellier

## ✨ Caractéristiques des données

Chaque utilisateur a :
- ✅ Prénom et nom
- ✅ Email unique et valide
- ✅ Mot de passe hashé automatiquement (grâce à bcrypt)
- ✅ Âge (entre 24 et 50 ans)
- ✅ Téléphone (+33...)
- ✅ Adresse complète
- ✅ Ville française
- ✅ Pays (France)
- ✅ Statut actif (true)
- ✅ Timestamps (createdAt, updatedAt)

## 🔄 Flux du seeder

```
1. Connexion à MongoDB
   ↓
2. Vérifier les utilisateurs existants
   ↓
3. Si existants → Supprimer
   ↓
4. Insérer 20 nouveaux utilisateurs
   ↓
5. Afficher statistiques
   ↓
6. Déconnecter et quitter
```

## 🧪 Test après seed

### Via GET /users
```bash
curl http://localhost:5000/users
```

Devrait retourner tous les 20 utilisateurs (sans les mots de passe).

### Via GET /users/:id
```bash
curl http://localhost:5000/users/ID_DE_L_UTILISATEUR
```

Retourne un utilisateur spécifique.

## ⚠️ Important

- ⚠️ Le seeder **supprime les utilisateurs existants** à chaque exécution
- ⚠️ Les données sont remises à zéro
- ⚠️ À utiliser uniquement en développement
- ⚠️ Ne jamais exécuter sur une base de données en production

## 🔒 Sécurité

- ✅ Les mots de passe sont automatiquement hashés avec bcrypt
- ✅ Aucune donnée sensible n'est loggée
- ✅ Variables d'environnement utilisées pour la connexion

## 🚀 Améliorations futures

- Ajouter des seed pour d'autres modèles
- Créer des relations entre entités
- Seed avec images de profil
- Seed avec des données en plusieurs langues
- Création d'un seeder pour les données de test complexes

## 🐛 Troubleshooting

### Erreur: Connexion à MongoDB échouée
- Vérifiez que MongoDB est en cours d'exécution
- Vérifiez la variable `mongoURI` dans `.env`
- Vérifiez votre connexion Internet

### Erreur: Dupliqué sur email
- Les emails sont uniques
- Supprimez les utilisateurs et réessayez
- Exécutez `npm run seed` à nouveau

### Erreur: Mot de passe invalide
- Les mots de passe doivent respecter les règles du schéma
- Format requis: 1 maj + 1 min + 1 chiffre
