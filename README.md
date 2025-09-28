# API de Suivi d'Entraînement Sportif

Travail pratique 15D - Session A2025

## Description
API REST complète pour la gestion et le suivi des performances d'entraînement sportif. Permet aux athlètes de suivre leurs séances, exercices et performances avec des calculs automatiques de progression.

## Installation

1. Cloner le projet
2. Installer les dépendances :
```bash
npm install
```

3. Configurer MongoDB :
- Créer une base de données nommée `entrainement`
- Modifier le fichier `.env` si nécessaire

4. Lancer le serveur :
```bash
npm run dev
```

## Initialisation des données

Pour charger des données de test :
```
GET http://localhost:3000/db/seed
```

## Structure du projet

```
├── models/              # Modèles Mongoose
│   ├── athlete.mjs
│   ├── exercice.mjs
│   ├── seance.mjs
│   └── performanceExercice.mjs
├── controllers/         # Contrôleurs
│   ├── athleteController.mjs
│   ├── exerciceController.mjs
│   ├── performanceController.mjs
│   └── seanceController.mjs
├── routes/             # Routes Express
│   ├── athlete.mjs
│   ├── db.mjs
│   ├── exercice.mjs
│   ├── performance.mjs
│   └── seance.mjs
├── app.mjs            # Application principale
├── package.json
└── .env
```

## Fonctionnalités principales

### Calculs automatiques
- **Volume d'entraînement** : séries × répétitions × poids
- **Calories brûlées** : basé sur le poids de l'athlète et la durée
- **IMC** : calculé automatiquement pour chaque athlète

## Technologies utilisées

- **Node.js** - Environnement d'exécution
- **Express.js** - Framework web
- **MongoDB** - Base de données
- **Mongoose** - ORM pour MongoDB
- **Morgan** - Logger des requêtes HTTP
- **Helmet** - Sécurité des en-têtes HTTP
- **CORS** - Cross-Origin Resource Sharing
- **dotenv-flow** - Gestion des variables d'environnement

## Validation des données

Toutes les entrées sont validées avec Mongoose :
- Formats d'email conformes RFC 6531
- Validation des plages de valeurs (âge, poids, taille, etc.)
- Contraintes d'unicité sur les champs requis
- Types de données strictement respectés

## Tests

Utilisez la collection Postman fournie pour tester tous les endpoints de l'API.
