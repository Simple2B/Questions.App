from datetime import datetime

from app import db
from app.models.utils import ModelMixin
from sqlalchemy.orm import relationship


class Question(db.Model, ModelMixin):

    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    question_text = db.Column(db.String(512), nullable=False)
    asker_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    asker = relationship("User")
    answers = relationship("Answer")

    def to_json(self):
        answers_list = [a.to_json() for a in self.answers]
        return {
            "id": self.id,
            "question_text": self.answer_text,
            "asker": self.asker,
            "created_at": datetime.timestamp(self.created_at),
            "answers_list": answers_list,
        }
