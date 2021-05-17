from app.models.question import Question
import pytest

from app import db, create_app
from app.controllers import fill_db_data

# from tests.utils import register, login, logout

TEST_USER = "John"


@pytest.fixture
def client():
    app = create_app(environment="testing")
    app.config["TESTING"] = True

    with app.test_client() as client:
        app_ctx = app.app_context()
        app_ctx.push()
        db.drop_all()
        db.create_all()
        fill_db_data()
        yield client
        db.session.remove()
        db.drop_all()
        app_ctx.pop()


def test_create_question(client):
    questions_before_len = len(Question.query.all())
    response1 = client.post(
        "api/v1/questions",
        data=dict(
            question_text="test question?",
        ),
        follow_redirects=True,
    )
    assert response1.status_code == 200
    assert len(Question.query.all()) == questions_before_len + 1
    assert response1.json["status"] == "success"
    link = response1.json["href"]
    response2 = client.get(
        link,
        follow_redirects=True,
    )
    assert response2.status_code == 200
    assert response2.json["status"] == "success"
    assert response2.json["data"] == "test question?"


def test_get_active_questions(client):
    response = client.get(
        "api/v1/questions",
        follow_redirects=True,
    )
    assert response.status_code == 200
