from flask_socketio import Namespace, emit
from flask import request

from app.models import User, Answer

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

    def on_add_answer(self, params):
        answerer = User.query.get(3)
        if not answerer:
            emit("unauthorized_user")
        answer = Answer()
        answer.answer_text = params["answer_text"]
        answer.question_id = params["question_id"]
        answer.answerer_id = answerer.id
        answer.save()
        emit("answer_created")
