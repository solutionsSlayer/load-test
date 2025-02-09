import requests
import random
from datetime import datetime

BASE_URL = "http://localhost:3000/api"

def create_user(email, password):
    try:
        print(f"Tentative de création de l'utilisateur {email}...")
        # First register the user using the model API
        response = requests.post(f"{BASE_URL}/model/user", json={
            "data": {
                "email": email,
                "password": password,
                "emailVerified": None,
                "name": None,
                "image": None
            }
        })
        print(f"Status code signup: {response.status_code}")
        print(f"Réponse signup: {response.text}")
        
        if response.ok:
            print("Tentative de connexion...")
            # Then login using the NextAuth credentials endpoint
            auth_response = requests.post(f"{BASE_URL}/auth/signin/credentials", json={
                "email": email,
                "password": password,
                "redirect": False
            })
            print(f"Status code signin: {auth_response.status_code}")
            print(f"Réponse signin: {auth_response.text}")
            
            if auth_response.ok:
                auth_data = auth_response.json()
                if isinstance(auth_data, dict):
                    return {"email": email, "id": auth_data.get("user", {}).get("id"), "token": auth_data.get("token")}
    except Exception as e:
        print(f"Erreur lors de la création/connexion: {str(e)}")
    return None

def create_space(token, name, slug):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(f"{BASE_URL}/model/space", 
        headers=headers,
        json={
            "data": {
                "name": name,
                "slug": slug
            }
        }
    )
    return response.json() if response.ok else None

def create_list(token, space_id, title):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(f"{BASE_URL}/model/list",
        headers=headers,
        json={
            "data": {
                "title": title,
                "spaceId": space_id,
                "private": False
            }
        }
    )
    return response.json() if response.ok else None

def create_todo(token, list_id, title):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(f"{BASE_URL}/model/todo",
        headers=headers,
        json={
            "data": {
                "title": title,
                "listId": list_id,
                "completed": False
            }
        }
    )
    return response.json() if response.ok else None

def add_member(token, space_id, user_id):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(f"{BASE_URL}/model/spaceUser",
        headers=headers,
        json={
            "data": {
                "spaceId": space_id,
                "userId": user_id,
                "role": "USER"
            }
        }
    )
    return response.json() if response.ok else None

def create_initial_data():
    print("Création des données initiales...")
    
    # 1. Créer un utilisateur admin
    print("Création de l'admin...")
    admin = create_user("admin@test.com", "password123")
    if not admin:
        print("Échec de la création de l'admin")
        return
    
    # 2. Créer plusieurs espaces
    print("Création des espaces...")
    spaces = []
    for i in range(5):
        space = create_space(
            admin["token"],
            f"Espace Test {i}",
            f"espace-test-{i}"
        )
        if space:
            spaces.append(space)
            print(f"Espace {i} créé")
    
    # 3. Pour chaque espace, créer des listes
    print("Création des listes...")
    for space in spaces:
        for j in range(3):
            list_obj = create_list(
                admin["token"],
                space["id"],
                f"Liste {j} dans {space['name']}"
            )
            
            if list_obj:
                print(f"Liste créée dans {space['name']}")
                # 4. Pour chaque liste, créer des todos
                for k in range(5):
                    todo = create_todo(
                        admin["token"],
                        list_obj["id"],
                        f"Todo {k} dans {list_obj['title']}"
                    )
                    if todo:
                        print(f"Todo créé dans {list_obj['title']}")

    # 5. Créer des utilisateurs supplémentaires
    print("Création des utilisateurs supplémentaires...")
    users = []
    for i in range(10):
        user = create_user(f"user{i}@test.com", "password123")
        if user:
            users.append(user)
            print(f"Utilisateur {i} créé")
            
            # 6. Les ajouter comme membres à certains espaces
            for space in random.sample(spaces, min(2, len(spaces))):
                member = add_member(admin["token"], space["id"], user["id"])
                if member:
                    print(f"Utilisateur {i} ajouté à l'espace {space['name']}")

    print("Génération des données terminée!")

if __name__ == "__main__":
    create_initial_data() 