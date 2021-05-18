import os

base_dir = os.path.dirname(os.path.abspath(__file__))


class BaseConfig(object):
    """Base configuration."""

    APP_NAME = "Questions.App"
    DEBUG_TB_ENABLED = False
    SECRET_KEY = os.environ.get(
        "SECRET_KEY", "Ensure you set a secret key, this is important!"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WTF_CSRF_ENABLED = False

    ADMIN_NAME = os.environ.get("ADMIN_NAME", "admin")
    ADMIN_PASS = os.environ.get("ADMIN_PASS", "admin")
    ADMIN_MAIL = os.environ.get("ADMIN_MAIL", "admin@mail.com")
    ANONYMOUS_NAME = os.environ.get("ANONYMOUS_NAME", "anonymous")
    ANONYMOUS_PASS = os.environ.get("ANONYMOUS_PASS", "anonymous")
    ANONYMOUS_MAIL = os.environ.get("ANONYMOUS_MAIL", "anonymous@mail.com")

    USE_ANONYMOUS_USER = os.environ.get("USE_ANONYMOUS_USER", "NO")
    GENERATE_TEST_DATA = os.environ.get("GENERATE_TEST_DATA", "NO")

    @staticmethod
    def configure(app):
        # Implement this method to do further configuration on your app.
        pass


class DevelopmentConfig(BaseConfig):
    """Development configuration."""

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DEVEL_DATABASE_URL",
        "sqlite:///" + os.path.join(base_dir, "database-devel.sqlite3"),
    )


class TestingConfig(BaseConfig):
    """Testing configuration."""

    TESTING = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "TEST_DATABASE_URL",
        "sqlite:///" + os.path.join(base_dir, "database-test.sqlite3"),
    )


class ProductionConfig(BaseConfig):
    """Production configuration."""

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", "sqlite:///" + os.path.join(base_dir, "database.sqlite3")
    )
    WTF_CSRF_ENABLED = True


config = dict(
    development=DevelopmentConfig, testing=TestingConfig, production=ProductionConfig
)
