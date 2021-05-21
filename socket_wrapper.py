from flask_socketio import SocketIO

# from app.models import Question
from app.namespaces import QuestionsNamespace
from app.namespaces import AnswersNamespace


def implement_socket_io(app):
    socketio = SocketIO(app)

    socketio.on_namespace(QuestionsNamespace("/questions"))
    socketio.on_namespace(AnswersNamespace("/answers"))

    return socketio
