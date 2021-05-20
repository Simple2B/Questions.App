from flask_socketio import Namespace, emit
from flask import request
from app.models import Question, User


class QuestionsNamespace(Namespace):
    def on_connect(self):
        print("someone connected")
        print(request.sid)

    def on_disconnect(self):
        questions = Question.query.filter_by(session_id=request.sid).all()
        for q in questions:
            q.delete()
        resp = {"status": "success", "message": "User disconnect"}
        print(questions)
        print("someone disconnected")
        print((request.sid))

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

    def on_create_question(self, params):
        print(params)
        asked_question = params["question"]
        session_id = params["session"]
        asker = User.query.get(2)
        new_question = Question()
        new_question.question_text = asked_question
        new_question.asker_id = asker.id
        new_question.session_id = session_id
        new_question.save()
        resp = {"status": "success", "message": "Question created"}
        emit("question_create_success", resp)

    def on_leave_service(self, params):
        print(params)
