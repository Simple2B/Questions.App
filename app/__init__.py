import os


from flask import Flask, Blueprint, render_template, scaffold, helpers
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from flask_restful import Api


helpers._endpoint_from_view_func = scaffold._endpoint_from_view_func

# instantiate extensions
login_manager = LoginManager()
db = SQLAlchemy()


def create_app(environment="development"):

    from config import config
    from app.views import (
        main_blueprint,
        auth_blueprint,
        QuestionsApi,
        QuestionApi,
        UserQuestionApi,
    )
    from app.models import (
        User,
        AnonymousUser,
    )

    # Instantiate app.
    app = Flask(__name__)
    api_blueprint = Blueprint("api", __name__, url_prefix="/api/v1")
    api = Api(api_blueprint)
    CORS(app)

    # Set app config.
    env = os.environ.get("FLASK_ENV", environment)
    app.config.from_object(config[env])
    config[env].configure(app)

    # Set up extensions.
    db.init_app(app)
    login_manager.init_app(app)

    # Add API resources.
    api.add_resource(QuestionsApi, "/questions")
    api.add_resource(QuestionApi, "/questions/<int:question_id>")
    api.add_resource(UserQuestionApi, "/users/<int:user_id>/questions")

    # Register blueprints.
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(main_blueprint)
    app.register_blueprint(api_blueprint)

    # Set up flask login.
    @login_manager.user_loader
    def get_user(id):
        return User.query.get(int(id))

    login_manager.login_view = "auth.login"
    login_manager.login_message_category = "info"
    login_manager.anonymous_user = AnonymousUser

    # Error handlers.
    @app.errorhandler(HTTPException)
    def handle_http_error(exc):
        return render_template("error.html", error=exc), exc.code

    return app
