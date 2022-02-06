from backend.models import _googleAuthUser, _localuser
from backend import *
import os, json, sys


login_manager = LoginManager(app)

login_manager.login_view = "authentication.login_route"

@login_manager.user_loader
def load_user(user_id):
    return _localuser.query.get(int(user_id))

@login_manager.user_loader
def loadgoogleuser(user_id):
    return _googleAuthUser.query.get(int(user_id))