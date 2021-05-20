from datetime import datetime
import math

from app import db
from app.models.utils import ModelMixin
from sqlalchemy.orm import relationship


class Question(db.Model, ModelMixin):

    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    question_text = db.Column(db.String(512), nullable=False)
    session_id = db.Column(db.String(128), nullable=False)
    asker_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    asker = relationship("User")
    answers = relationship("Answer")
    is_active = db.Column(db.Boolean, nullable=True, default=True)

    def to_json(self):
        answers_list = [a.to_json() for a in self.answers]
        time = int(math.floor(datetime.timestamp(self.created_at))) * 1000
        return {
            "id": self.id,
            "question_text": self.question_text,
            "session_id": self.session_id,
            "created_at": time,
            "answers_list": answers_list,
        }
