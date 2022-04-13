from flask import Flask


def load_api(app: Flask) -> None:
    from backend.API.auth_api import auth
    from backend.API.crud_api import crud

    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(crud, url_prefix="/crud")
