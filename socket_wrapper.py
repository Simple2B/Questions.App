from flask_socketio import SocketIO, send


def implement_socket_io(app):
    async_mode = None
    socketio = SocketIO(app, async_mode=async_mode)

    @socketio.on("message")
    def handleMessage(msg):
        print("Message: " + msg)
        send(msg, broadcast=True)

    return socketio
