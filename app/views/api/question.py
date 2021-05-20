from flask import url_for
from flask_restful import Resource, reqparse
from app.models import User, Question

# from flask_socketio import emit

BASE_URL = "http://127.0.0.1:5000"


class QuestionsApi(Resource):
    def __init__(self):
        self.post_args = reqparse.RequestParser()
        self.post_args.add_argument("question_text")

    def get(self):
        questions = [q.to_json() for q in Question.query.all() if q.is_active is True]
        if not questions:
            resp = {"status": "success", "message": "No active questions!"}
            return resp, 204
        resp = {
            "status": "success",
            "message": "There are active questions!",
            "data": questions,
        }
        return resp, 200

    def post(self):
        args = self.post_args.parse_args()
        asked_question = args["question_text"]
        asker = User.query.get(2)
        new_question = Question()
        new_question.question_text = asked_question
        new_question.asker_id = asker.id
        new_question.save()
        href = BASE_URL + url_for("api.questionapi", question_id=new_question.id)
        resp = {"status": "success", "message": "Question created", "href": href}
        return resp


class QuestionApi(Resource):
    def __init__(self):
        self.post_args = reqparse.RequestParser()
        self.post_args.add_argument("question_text")
        self.post_args.add_argument("is_active")

    def get(self, question_id):
        question = Question.query.get(question_id)
        if not question:
            resp = {"status": "error", "message": "No such question"}
            return resp, 200
        resp = {
            "status": "success",
            "message": "Question found",
            "data": question.question_text,
        }
        return resp, 200

    def put(self, question_id):
        args = self.post_args.parse_args()
        if not args["question_text"] and not args["is_active"]:
            resp = {"status": "error", "message": "Need to pass request body data!"}
            return resp, 400
        question = Question.query.get(question_id)
        if not question:
            resp = {"status": "error", "message": "No such question"}
            return resp, 200
        if args["question_text"]:
            question.question_text = args["question_text"]
        if args["is_active"]:
            question.is_active = False if args["is_active"] == "False" else True
        question.save()
        resp = {
            "status": "success",
            "message": "Question was edited",
            "href": BASE_URL + url_for("api.questionsapi"),
        }
        return resp, 200


class UserQuestionApi(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            resp = {"status": "error", "message": "Wrong user ID"}
            return resp, 400
        questions = [
            q.to_json()
            for q in Question.query.all()
            if q.is_active is True and q.asker_id == user_id
        ]
        if not questions:
            resp = {"status": "error", "message": "User don't have active questions"}
            return resp, 400
        resp = {
            "status": "success",
            "message": "Question found",
            "data": questions,
        }
        return resp, 200
