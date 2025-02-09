from locust import HttpUser, task, between
from random import choice, randint
import json

class TodoUser(HttpUser):
    host = "http://localhost:3000"
    wait_time = between(3, 5)
    
    def on_start(self):
        # Authentification au démarrage
        self.client.post("/api/auth/signin/credentials", json={
            "email": "test@example.com",
            "password": "password123"
        })
        # Récupération des espaces pour les tests
        response = self.client.get("/api/model/space")
        if response.ok:
            self.spaces = response.json()
        else:
            self.spaces = []

    @task(3)
    def view_home(self):
        self.client.get("/")

    @task(2)
    def view_signin(self):
        self.client.get("/signin")

    @task(2)
    def view_signup(self):
        self.client.get("/signup")

    @task(1)
    def signup_user(self):
        random_id = randint(1000, 9999)
        self.client.post("/api/auth/signup", json={
            "email": f"test{random_id}@example.com",
            "password": "password123"
        })

    @task(1)
    def create_space(self):
        space_name = f"Test Space {randint(1000, 9999)}"
        space_slug = f"test{randint(1000, 9999)}"
        
        self.client.post("/api/model/space", json={
            "data": {
                "name": space_name,
                "slug": space_slug
            }
        })

    @task(2)
    def view_space(self):
        if self.spaces:
            space = choice(self.spaces)
            self.client.get(f"/space/{space['slug']}")

    @task(2)
    def create_todo_list(self):
        if self.spaces:
            space = choice(self.spaces)
            self.client.post("/api/model/list", json={
                "data": {
                    "title": f"Test List {randint(1000, 9999)}",
                    "spaceId": space["id"],
                    "private": choice([True, False])
                }
            })

    @task(3)
    def create_todo(self):
        response = self.client.get("/api/model/list")
        if response.ok:
            lists = response.json()
            if lists:
                selected_list = choice(lists)
                self.client.post("/api/model/todo", json={
                    "data": {
                        "title": f"Test Todo {randint(1000, 9999)}",
                        "listId": selected_list["id"],
                        "completed": choice([True, False])
                    }
                })

    @task(1)
    def update_todo(self):
        response = self.client.get("/api/model/todo")
        if response.ok:
            todos = response.json()
            if todos:
                todo = choice(todos)
                self.client.put(f"/api/model/todo/{todo['id']}", json={
                    "data": {
                        "completed": not todo["completed"]
                    }
                })

    @task(2)
    def view_space_page(self):
        if self.spaces:
            space = choice(self.spaces)
            self.client.get(f"/space/{space['slug']}")

    @task(2)
    def view_todo_list(self):
        response = self.client.get("/api/model/list")
        if response.ok:
            lists = response.json()
            if lists:
                selected_list = choice(lists)
                space = next((s for s in self.spaces if s['id'] == selected_list['spaceId']), None)
                if space:
                    self.client.get(f"/space/{space['slug']}/{selected_list['id']}")

    @task(1)
    def update_space(self):
        if self.spaces:
            space = choice(self.spaces)
            self.client.put(f"/api/model/space/{space['id']}", json={
                "data": {
                    "name": f"Updated Space {randint(1000, 9999)}"
                }
            })

    @task(1)
    def delete_todo(self):
        response = self.client.get("/api/model/todo")
        if response.ok:
            todos = response.json()
            if todos:
                todo = choice(todos)
                self.client.delete(f"/api/model/todo/{todo['id']}")

    @task(1)
    def search_todos(self):
        if self.spaces:
            space = choice(self.spaces)
            self.client.get(f"/api/model/todo?where={{'spaceId':'{space['id']}'}}")
