# n8n Workflow Dashboard

## Présentation du projet

Le n8n Workflow Dashboard est une interface moderne permettant de visualiser et gérer vos workflows n8n. Conçue avec un thème sombre et des accents néon, cette application offre une expérience utilisateur intuitive pour surveiller et interagir avec vos automatisations n8n.

![Dashboard Screenshot](https://via.placeholder.com/800x450?text=n8n+Workflow+Dashboard)

## Fonctionnalités principales

- **Vue d'ensemble des workflows** : Visualisez tous vos workflows avec leur statut en temps réel
- **Double affichage** : Basculez entre la vue grille et la vue liste selon vos préférences
- **Organisation par dossiers** : Filtrez vos workflows par dossiers pour une meilleure organisation
- **Détails des workflows** : Accédez aux informations détaillées de chaque workflow
- **Statistiques d'exécution** : Consultez les taux de réussite et d'erreur de vos workflows
- **Thème sombre** : Interface moderne avec un thème sombre et des accents néon
- **Intégration API** : Connexion à l'API n8n pour des données en temps réel

## Technologies utilisées

- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Recharts (pour les visualisations)
- Vite

## Installation locale

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn
- Une instance n8n accessible (pour l'intégration API complète)

### Étapes d'installation

1. **Cloner le dépôt**

```bash
git clone https://github.com/votre-utilisateur/n8n-workflow-dashboard.git
cd n8n-workflow-dashboard
```

2. **Installer les dépendances**

```bash
npm install
# ou avec yarn
yarn install
```

3. **Configurer les variables d'environnement (optionnel)**

Créez un fichier `.env` à la racine du projet et ajoutez vos variables d'environnement :

```
VITE_N8N_API_URL=https://votre-instance-n8n.com/api/
VITE_N8N_API_KEY=votre_cle_api
```

4. **Lancer l'application en mode développement**

```bash
npm run dev
# ou avec yarn
yarn dev
```

L'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173)

5. **Construire pour la production**

```bash
npm run build
# ou avec yarn
yarn build
```

Les fichiers de production seront générés dans le dossier `dist`.

## Utilisation

### Connexion à l'API n8n

1. Cliquez sur l'icône utilisateur dans la barre de navigation
2. Entrez l'URL de votre instance n8n et votre clé API
3. Cliquez sur "Enregistrer" pour établir la connexion

### Navigation

- Utilisez le panneau latéral pour filtrer les workflows par dossier
- Basculez entre la vue grille et la vue liste avec les boutons dédiés
- Cliquez sur un workflow pour voir ses détails
- Utilisez les boutons d'action pour interagir avec vos workflows

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request pour améliorer ce projet.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
