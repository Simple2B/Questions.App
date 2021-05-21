from flask_socketio import Namespace
from flask import request

# from app.models import Question, User

answerer_clients = 0


class AnswersNamespace(Namespace):
    def on_connect(self):
        global answerer_clients
        answerer_clients = answerer_clients + 1
        print(f"SID: {request.sid}. CONNECTED")
        print(f"ANSWERER total: {answerer_clients}")

    def on_disconnect(self):
        global answerer_clients
        answerer_clients = answerer_clients - 1
        print(f"SID: {request.sid}. DISCONNECTED")
        print(f"ANSWERER total: {answerer_clients}")
