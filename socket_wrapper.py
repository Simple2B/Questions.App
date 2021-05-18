from flask_socketio import SocketIO, send


def implement_socket_io(app):
    socketio = SocketIO(app)

    @socketio.on("connection")
    def handleConnection(obj):
        usr = obj["id"]
        msg = f"User {usr} has connected"
        print(msg)
        send(msg, broadcast=True)

    @socketio.on("post_question")
    def handlePostQuestion(message):
        print(message)
        send(message, broadcast=True)

    return socketio
