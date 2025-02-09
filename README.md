<div align="center">
    <img src="https://github.com/zenstackhq/sample-todo-sveltekit/assets/16688722/df13f0ee-1d56-4a13-9a55-39e8779c6d9f" height="256">
    <h1>ZenStack SaaS Demo</h1>
    <a href="https://twitter.com/intent/tweet?text=Wow%20%40zenstackhq">
        <img src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fzenstackhq%2Fzenstack">
    </a>
    <a href="https://discord.gg/6HhebQynfz">
        <img src="https://img.shields.io/discord/1035538056146595961">
    </a>
</div>

# A Collaborative Todo Sample - ZenStack + Next.js

This project is a collaborative Todo app built with [Next.js](https://nextjs.org), [Next-Auth](nextauth.org), and [ZenStack](https://zenstack.dev).

In this fictitious app, users can be invited to workspaces where they can collaborate on todos. Public todo lists are visible to all members in the workspace.

See a live deployment at: https://zenstack-todo.vercel.app/.

## Features

-   User signup/signin
-   Creating workspaces and inviting members
-   Data segregation and permission control

## Implementation

-   Data model is located at `/schema.zmodel`.
-   An automatic CRUD API is mounted at `/api/model` by `pages/api/model/[...path].ts`.
-   [SWR](https://swr.vercel.app/) CRUD hooks are generated under `lib/hooks` folder.

## Running the sample

1. Setup a new PostgreSQL database

    You can launch a PostgreSQL instance locally, or create one from a hoster like [Supabase](https://supabase.com). Create a new database for this app, and set the connection string in .env file.

1. Install dependencies

    ```bash
    npm install
    ```

1. Generate server and client-side code from model

    ```bash
    npm run generate
    ```

1. Synchronize database schema

    ```bash
    npm run db:push
    ```

1. Start dev server

    ```bash
    npm run dev
    ```

For more information on using ZenStack, visit [https://zenstack.dev](https://zenstack.dev).

## Load Testing

### Setup and Execution

1. Create and activate Python virtual environment:

```bash
cd test/load
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. Run tests:
```bash
./run_tests.sh  # On Windows: run_tests.bat
```

3. View results:
- Real-time dashboard: http://localhost:8089
- Detailed report: open detailed_report.html

### Problèmes Connus

Basé sur les résultats des tests de charge (2 minutes et 54 secondes avec utilisateurs simultanés) :

1. Performance d'Authentification
   - Les opérations de connexion montrent une latence très élevée (moy : 7991ms, max : 19724ms)
   - Améliorations possibles :
     - Mettre en place un cache pour les données de session
     - Ajouter une limitation de taux pour les points d'accès d'authentification
     - Envisager l'implémentation d'une authentification basée sur JWT

2. Gestion des Espaces
   - La récupération des espaces montre une latence élevée (moy : 2393ms)
   - Taux d'échec élevé pour la création d'espaces (788 échecs)
   - Optimisations recommandées :
     - Implémenter la pagination pour les listes d'espaces
     - Ajouter un cache pour les espaces fréquemment accédés
     - Optimiser les requêtes de base de données

3. Opérations sur les Listes de Tâches
   - Taux d'échec élevé sur la récupération des listes (3796 échecs)
   - Temps de réponse moyen : 2940ms
   - Améliorations suggérées :
     - Implémenter des opérations par lots pour les mises à jour
     - Ajouter la pagination pour la récupération des listes
     - Mettre en cache les listes fréquemment consultées

4. Performance des Pages Frontend
   - Page d'accueil : moy 3807ms, max 8712ms
   - Page de connexion : moy 3781ms, max 8514ms
   - Page d'inscription : moy 3811ms, max 8470ms
   - Optimisations nécessaires :
     - Implémenter le rendu côté serveur
     - Ajouter du cache côté client
     - Optimiser la taille des bundles
     - Ajouter des états de chargement

5. Problèmes des Points d'API
   - Taux élevé d'erreurs 400 Bad Request sur plusieurs endpoints
   - Erreurs de réinitialisation de connexion (WinError 10054)
   - Améliorations nécessaires :
     - Implémenter une validation appropriée des requêtes
     - Ajouter un pool de connexions
     - Mettre en place des mécanismes de retry
     - Ajouter une gestion d'erreur appropriée

6. Optimisation de Base de Données Requise
   - Latence élevée sur les opérations de données
   - Améliorations nécessaires :
     - Ajouter des index appropriés
     - Optimiser les modèles de requêtes
     - Envisager l'implémentation de répliques en lecture
     - Ajouter un pool de connexions à la base de données

7. Gestion des Erreurs
   - Multiples erreurs de réinitialisation de connexion
   - Nombre élevé d'erreurs 400 Bad Request
   - Améliorations nécessaires :
     - Implémenter une gestion d'erreur appropriée
     - Ajouter des mécanismes de retry
     - Améliorer la validation des entrées
     - Ajouter une journalisation appropriée
