import datetime
from authlib.integrations.sqla_oauth2 import OAuth2TokenMixin
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin, AnonymousUserMixin
from flask_sqlalchemy import SQLAlchemy
import time
from .__init__ import db

class _localuser(AnonymousUserMixin, UserMixin,db.Model):
    __tablename__ = '_localuser'
    id       = db.Column(db.Integer(), primary_key=True)
    email    = db.Column(db.String(), nullable=False)
    username = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)

    is_authenticated = False
    is_active = False
    is_anonymous = False

    def get_id(self):
        return self.id
        
    def is_authenticated(self):
        return self.authenticated

    def __init__(self,email,username,password): 
        self.email = email
        self.username = username
        self.password = generate_password_hash(password)

        
    def verify_password(self, pwd):
        return check_password_hash(self.password, pwd)

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()
    @classmethod
    def identify(cls, id):
        return cls.query.get(id)
    @property
    def identity(self):
        return self.id
    def is_valid(self):
        return self.is_active


class task_dispatch(db.Model):
    __tablename__ = 'task_dispatch'
    id = db.Column(db.Integer(), primary_key = True)
    task_owner = db.Column(db.String(), db.ForeignKey('_localuser.username'))
    activity = db.Column(db.String(), nullable=False)
    creation_date = db.Column(db.DateTime(), default=datetime.datetime.utcnow)
    due_time = db.Column(db.DateTime(), default=2)
    urgency = db.Column(db.Integer())

    def __init__(self,task_owner,activity,creation_date,due_time,urgency): 
        self.task_owner = task_owner
        self.activity = activity
        self.creation_date = creation_date
        self.due_time = due_time
        self.urgency = urgency

class _googleAuthUser(UserMixin, db.Model):
    __tablename__ = '_googleAuthUser'
    id = db.Column(db.Integer(), primary_key = True)
    uid = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False)
    profile_pic = db.Column(db.String(), nullable=False)
    
    is_authenticated = False
    is_active = False
    is_anonymous = False
    
    def __init__(self, uid, name, email, profile_pic):
        self.uid = generate_password_hash(uid)
        self.name = name
        self.email = email
        self.profile_pic = profile_pic
    
    def get_id(self):
        return self.uid

    def is_authenticated(self):
        return self.authenticated
    
    def verify_user(self, uid):
        return check_password_hash(self.uid, uid)
