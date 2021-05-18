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


def test_question_endpoints(client):
    response = client.get("api/v1/questions")
    assert response.status_code == 200
    response = client.get("api/v1/questions/1")
    assert response.status_code == 200
    response = client.post(
        "api/v1/questions",
        data=dict(
            question_text="test question?",
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200


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


def test_get_non_existent_question(client):
    response = client.get(
        "api/v1/questions/999",
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert response.json["status"] == "error"
    assert response.json["message"] == "No such question"


def test_edit_question_text(client):
    response = client.get(
        "api/v1/questions/1",
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert response.json["data"] == "Active question 1"
    response = client.put(
        "api/v1/questions/1",
        data=dict(
            question_text="Active question 1 edited",
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert response.json["status"] == "success"
    assert response.json["message"] == "Question was edited"
    assert response.json["href"] == "http://127.0.0.1:5000/api/v1/questions"


def test_edit_question_without_data(client):
    response = client.put(
        "api/v1/questions/1",
        follow_redirects=True,
    )
    assert response.status_code == 400
    assert response.json["status"] == "error"
    assert response.json["message"] == "Need to pass request body data!"
    response = client.put(
        "api/v1/questions/1",
        data=dict(
            question_text="Active question 1 edited",
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert response.json["status"] == "success"
    assert response.json["message"] == "Question was edited"
    response = client.put(
        "api/v1/questions/1",
        data=dict(
            is_active=False,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert response.json["status"] == "success"
    assert response.json["message"] == "Question was edited"


def test_edit_non_existent_question(client):
    response = client.put(
        "api/v1/questions/999",
        data=dict(
            question_text="Active question 1 edited",
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert response.json["status"] == "error"
    assert response.json["message"] == "No such question"


def test_edit_question_is_active(client):
    response = client.put(
        "api/v1/questions/1",
        data=dict(
            is_active="False",
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    response = client.get(
        "api/v1/questions/1",
        follow_redirects=True,
    )
    assert response.status_code == 200
    q = Question.query.get(1)
    assert q.is_active is False
