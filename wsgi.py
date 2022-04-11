from beartype import beartype

from backend import app


@beartype
def exec():
    app.run(port=5000, debug=True)


if __name__ == "__main__":

    exec()
