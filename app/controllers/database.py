from app.models import User, Question
from config import BaseConfig as conf


def fill_db_data():
    admin = User(username=conf.ADMIN_NAME, email=conf.ADMIN_MAIL)
    admin.password = conf.ADMIN_PASS
    admin.save()
    anonymous = User(username=conf.ANONYMOUS_NAME, email=conf.ANONYMOUS_MAIL)
    anonymous.password = conf.ANONYMOUS_PASS
    anonymous.save()
    if conf.GENERATE_TEST_DATA == "YES":
        question1 = Question()
        question1.asker_id = 2
        question1.question_text = "Active question 1"
        question1.is_active = True
        question1.session_id = "test"
        question1.save()
        question2 = Question()
        question2.asker_id = 2
        question2.question_text = "Solved question 2"
        question2.is_active = False
        question2.session_id = "test"
        question2.save()
        question3 = Question()
        question3.asker_id = 2
        question3.question_text = "Active question 3"
        question3.is_active = True
        question3.session_id = "test"
        question3.save()

    pass
