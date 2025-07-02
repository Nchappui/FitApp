# 💪 FitApp

Une application mobile moderne et intuitive pour gérer vos exercices, suivre vos séries et optimiser vos entraînements.

## Fonctionnalités Principales

### Gestion des Exercices

- **Catalogue complet** : Plus de 50 exercices pré-configurés avec catégories et groupes musculaires
- **(TODO) Exercices personnalisés** : Ajoutez et gérez vos propres exercices
- **Recherche intelligente** : Filtrez par nom, catégorie ou muscle ciblé
- **Système de favoris** : Marquez vos exercices préférés d'une étoile

### Suivi des Séances

- **Ajout de séries** : Interface moderne avec gestion du poids, répétitions et intensité
- **Historique complet** : Consultez toutes vos séances passées par exercice
- **Statistiques rapides** : Visualisez vos performances en un coup d'œil
- **Suppression flexible** : Retirez facilement les séries non désirées

### Interface Utilisateur

- **Design moderne** : Interface épurée et responsive
- **Navigation intuitive** : Onglets clairs (Fitness/Cardio) avec Expo Router
- **Gestion du clavier** : Optimisée pour une saisie fluide
- **Responsive design** : S'adapte parfaitement à tous les écrans

### Persistance des Données

- **Stockage local** : Toutes vos données restent sur votre appareil
- **AsyncStorage** : Sauvegarde automatique et rapide

## Stack Technique

### Framework & Plateforme

- **[Expo](https://expo.dev)** v53.0.15 - Plateforme de développement React Native
- **[Expo Router](https://docs.expo.dev/router/introduction/)** v5.1.2 - Navigation file-based moderne
- **[React Native](https://reactnative.dev)** v0.79.4 - Framework mobile cross-platform

### Langage & Types

- **[TypeScript](https://www.typescriptlang.org/)** v5.8.3 - Typage statique pour JavaScript
- **Types personnalisés** - Définitions strictes pour Exercise, WorkoutSet, etc.

### Navigation & UI

- **[@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)** - Navigation par onglets
- **[@expo/vector-icons](https://docs.expo.dev/guides/icons/)** - Icônes vectorielles
- **expo-haptics** - Retour haptique

### Stockage & Données

- **[@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)** - Persistance locale
- **Services personnalisés** - workoutStorage, favoritesStorage

### Gestion des Gestures & Animations

- **react-native-gesture-handler** - Gestion avancée des gestes
- **react-native-reanimated** - Animations fluides
- **expo-linear-gradient** - Dégradés modernes

## Installation et Lancement

### Prérequis

- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn**
- **Expo CLI** (optionnel mais recommandé)

### Installation

```bash
# Cloner le projet
git clone <votre-repo-url>
cd FitApp

# Installer les dépendances
npm install
```

### Lancement du Développement

```bash
# Démarrer le serveur de développement
npm start
# ou
npx expo start
```

### Options de Prévisualisation

#### Sur Appareil Mobile

1. Installez **[Expo Go](https://expo.dev/go)** sur votre téléphone
2. Scannez le QR code affiché dans le terminal/navigateur

#### Sur Navigateur Web

```bash
# Lancer la version web
npm run web
# ou
npx expo start --web
```

#### Sur Émulateur/Simulateur

```bash
# Android (nécessite Android Studio)
npm run android
# ou
npx expo start --android

# iOS (nécessite Xcode - macOS uniquement)
npm run ios
# ou
npx expo start --ios
```

## Architecture du Projet

```
FitApp/
├── 📁 app/                    # Pages et navigation (Expo Router)
│   ├── 📁 (tabs)/            # Onglets principaux
│   │   ├── _layout.tsx       # Layout des onglets
│   │   ├── index.tsx         # Page Fitness (accueil)
│   │   └── cardio.tsx        # Page Cardio
│   ├── 📁 exercise/          # Pages des exercices
│   │   ├── [id].tsx          # Détail d'un exercice
│   │   └── 📁 history/       # Historique
│   │       └── [id].tsx      # Historique d'un exercice
│   ├── _layout.tsx           # Layout racine
│   └── +not-found.tsx        # Page 404
├── 📁 components/            # Composants réutilisables
│   ├── FitCard.tsx           # Carte d'exercice
│   ├── FitCardList.tsx       # Liste des cartes avec recherche
│   ├── ExerciseSection.tsx   # Section d'exercices par catégorie
│   └── AddSetModal.tsx       # Modal d'ajout de série
├── 📁 data/                  # Données statiques
│   └── exercises.ts          # Catalogue des exercices
├── 📁 services/              # Services de données
│   ├── workoutStorage.ts     # Gestion des séries
│   └── favoritesStorage.ts   # Gestion des favoris
├── 📁 types/                 # Définitions TypeScript
│   └── fitness.ts            # Types Exercise, WorkoutSet, etc.
└── 📁 assets/                # Ressources statiques
    ├── 📁 images/            # Images et icônes
    └── 📁 fonts/             # Polices personnalisées
```

## Scripts Disponibles

```bash
# Développement
npm start              # Démarrer le serveur Expo
npm run web           # Lancer sur navigateur web
npm run android       # Lancer sur émulateur Android
npm run ios           # Lancer sur simulateur iOS

# Maintenance
npm run lint          # Vérifier la qualité du code
npm run reset-project # Réinitialiser le projet
```

## Utilisation

### Ajouter une Série

1. Sélectionnez un exercice depuis l'accueil
2. Appuyez sur "Ajouter une série"
3. Renseignez le poids, répétitions, intensité et notes
4. Validez avec "Ajouter la série"

### Gérer les Favoris

- Appuyez sur l'⭐ à droite de chaque exercice
- Utilisez le bouton "Favoris" pour filtrer
- Les favoris sont sauvegardés automatiquement

### Consulter l'Historique

- Accédez au détail d'un exercice
- Appuyez sur "Voir l'historique"
- Supprimez les séries indésirables

### Rechercher des Exercices

- Utilisez la barre de recherche en haut de l'accueil
- Filtrez par nom, catégorie ou muscle
- La recherche est instantanée et insensible à la casse

## Dépannage

### Cache Expo

Si vous rencontrez des problèmes, videz le cache :

```bash
npx expo start --clear
```

### Problèmes de Dépendances

Réinstallez les dépendances :

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreurs TypeScript

Vérifiez les types et la compilation :

```bash
npm run lint
npx tsc --noEmit
```

## Déploiement

### Build de Production

```bash
# Build Android
npx expo build:android

# Build iOS
npx expo build:ios

# Build Web
npx expo build:web
```
