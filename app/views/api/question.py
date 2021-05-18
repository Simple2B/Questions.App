from flask import url_for
from flask_restful import Resource, reqparse
from app.models import User, Question

BASE_URL = "http://127.0.0.1:5000"


class QuestionsApi(Resource):
    def __init__(self):
        self.post_args = reqparse.RequestParser()
        self.post_args.add_argument("question_text")

    def get(self):
        questions = [q.to_json() for q in Question.query.all()]
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
        self.get_args = reqparse.RequestParser()

    def get(self, question_id):
        question = Question.query.get(question_id)
        if not question:
            resp = {"status": "error", "message": "No such question"}
            return resp, 204
        resp = {
            "status": "success",
            "message": "Question found",
            "data": question.question_text,
        }
        return resp, 200
