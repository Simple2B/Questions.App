from datetime import datetime

from app import db
from app.models.utils import ModelMixin
from sqlalchemy.orm import relationship


class Answer(db.Model, ModelMixin):

    __tablename__ = "answers"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    answer_text = db.Column(db.String(512), nullable=False)
    answerer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    answerer = relationship("User")
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=False)
    question = relationship("Question")

    def to_json(self):
        return {
            "id": self.id,
            "answer_text": self.answer_text,
            "answerer_id": self.answerer_id,
            "answerer": self.answerer,
            "created_at": datetime.timestamp(self.created_at),
            "question_id": self.question_id,
            "question": self.question,
        }
