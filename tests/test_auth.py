import pytest

from app import db, create_app
from tests.utils import register, login, logout
from app.models import User


@pytest.fixture
def client():
    app = create_app(environment="testing")
    app.config["TESTING"] = True

    with app.test_client() as client:
        app_ctx = app.app_context()
        app_ctx.push()
        db.drop_all()
        db.create_all()
        yield client
        db.session.remove()
        db.drop_all()
        app_ctx.pop()


def test_auth_pages(client):
    response = client.get("/auth/register")
    assert response.status_code == 200
    response = client.get("/auth/login")
    assert response.status_code == 200
    response = client.get("/auth/logout")
    assert response.status_code == 302


def test_register(client):
    users = User.query.all()
    user_num_before = len(users)
    response = client.post(
        "/auth/register",
        data=dict(
            username="sam",
            email="sam@test.com",
            password="password",
            password_confirmation="password",
        ),
        follow_redirects=True,
    )
    assert response
    assert response.status_code == 200
    assert b"Registration successful. You are logged in." in response.data
    users = User.query.all()
    assert users
    assert len(users) == user_num_before + 1
    last_user = users[-1]
    assert last_user.username == "sam"


def test_login_and_logout(client):
    # Access to logout view before login should fail.
    response = logout(client)
    assert b"Please log in to access this page." in response.data
    register("sam")
    response = login(client, "sam")
    assert b"Login successful." in response.data
    # Should successfully logout the currently logged in user.
    response = logout(client)
    assert b"You were logged out." in response.data
    # Incorrect login credentials should fail.
    response = login(client, "sam", "wrongpassword")
    assert b"Wrong user ID or password." in response.data
    # Correct credentials should login
    response = login(client, "sam")
    assert b"Login successful." in response.data
