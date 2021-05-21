from datetime import datetime
import math

from app import db
from app.models.utils import ModelMixin


class Answer(db.Model, ModelMixin):

    __tablename__ = "answers"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    answer_text = db.Column(db.String(512), nullable=False)
    answerer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=False)

    def to_json(self):
        time = int(math.floor(datetime.timestamp(self.created_at))) * 1000
        return {
            "id": self.id,
            "answer_text": self.answer_text,
            "answerer_id": self.answerer_id,
            "created_at": time,
            "question_id": self.question_id,
        }
