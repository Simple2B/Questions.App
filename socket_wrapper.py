from flask_socketio import SocketIO, send

# from app.models import Question
from app.namespaces import QuestionsNamespace


def implement_socket_io(app):
    socketio = SocketIO(app)

    @socketio.on("message")
    def handleConnection(obj):
        print(obj)

    @socketio.on("post_question")
    def handlePostQuestion(message):
        print(message)
        send(message, broadcast=True)

    socketio.on_namespace(QuestionsNamespace("/questions"))

    return socketio
