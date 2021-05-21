from flask_socketio import Namespace, emit
from flask import request
from app.models import Question, User

asker_clients = 0


class QuestionsNamespace(Namespace):
    def on_connect(self):
        global asker_clients
        asker_clients = asker_clients + 1
        print("CONNECTED")
        print(f"SID: {request.sid}")
        print(f"ASKER total: {asker_clients}")

    def on_disconnect(self):
        questions = Question.query.filter_by(session_id=request.sid).all()
        for q in questions:
            q.is_active = False
            q.save()
        global asker_clients
        emit("asker_leave", broadcast=True)
        asker_clients = asker_clients - 1

        print("DISCONNECTED")
        print(f"SID: {request.sid}")
        print(f"ASKER total: {asker_clients}")

    def on_get_active_questions(self):
        questions = [q.to_json() for q in Question.query.all() if q.is_active is True]
        if not questions:
            resp = {"status": "success", "message": "No active questions!"}
            emit("no_active_questions", resp)
        resp = {
            "status": "success",
            "message": "There are active questions!",
            "data": questions,
        }
        emit("success_active_questions", resp, broadcast=True)

    def on_get_all_questions(self):
        questions = [q.to_json() for q in Question.query.all()]

        resp = {
            "status": "success",
            "message": "Here you are! ^-)",
            "data": questions,
        }
        emit("success_get_all_questions", resp)

    def on_create_question(self, params):
        print(params)
        asked_question = params["question"]
        asker = User.query.get(2)
        new_question = Question()
        new_question.question_text = asked_question
        new_question.asker_id = asker.id
        new_question.session_id = request.sid
        new_question.save()
        resp = {"status": "success", "message": "Question created"}
        emit("create_question_success", resp, broadcast=True)

    def on_leave_service(self, params):
        print(params)

    def on_get_questions_by_session_id(self):
        questions = [
            q.to_json()
            for q in Question.query.all()
            if q.is_active is True and q.session_id == request.sid
        ]
        if not questions:
            resp = {
                "status": "success",
                "message": "No active questions!",
                "data": [],
            }
            emit("no_active_questions", resp)
        resp = {
            "status": "success",
            "message": "There are active questions!",
            "data": questions,
        }
        emit("success_get_questions_by_session_id", resp)
