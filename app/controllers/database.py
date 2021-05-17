from app.models import User
from config import BaseConfig as conf


def fill_db_data():
    admin = User(username=conf.ADMIN_NAME, email=conf.ADMIN_MAIL)
    admin.password = conf.ADMIN_PASS
    admin.save()
    anonymous = User(username=conf.ANONYMOUS_NAME, email=conf.ANONYMOUS_MAIL)
    anonymous.password = conf.ANONYMOUS_PASS
    anonymous.save()
    if conf.GENERATE_TEST_DATA == "YES":
        pass

    pass
