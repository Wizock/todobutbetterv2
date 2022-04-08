import datetime
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin
from backend.__init__ import db as db
from backend.__init__ import guard as guard

class _localuser(UserMixin,db.Model):
    __tablename__ = '_localuser'
    id       = db.Column(db.Integer(), primary_key=True)
    email    = db.Column(db.String(), nullable=False)
    username = db.Column(db.String(), nullable=False)
    hashed_password = db.Column(db.String(), nullable=False)
    roles = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True, server_default="true")

    is_authenticated = False
    is_active = False
    is_anonymous = False

    def __init__(self,email,username,hashed_password): 
        self.email = email
        self.username = username
        self.hashed_password = guard.hash_password(hashed_password)
    
    def is_active(self):
        return True

    def get_id(self):
        return self.email

    def is_authenticated(self):
        return self.authenticated

    def is_anonymous(self):
        return False
        
    @property
    def identity(self):
        return self.id

    @property
    def rolenames(self):
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @property
    def password(self):
        return self.hashed_password

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    def is_valid(self):
        return self.is_active

class task_dispatch(db.Model):
    __tablename__ = 'task_dispatch'
    id                  = db.Column(db.Integer(), primary_key = True)
    task_owner          = db.Column(db.String() , db.ForeignKey('_localuser.username'), nullable=False)
    creation_time       = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    title               = db.Column(db.String() , nullable=False)
    description         = db.Column(db.String() , nullable=False)
    priority            = db.Column(db.Integer(), nullable=False)
    starting_date_value = db.Column(db.String()   , nullable=False)
    due_date_value      = db.Column(db.String()   , nullable=False)
    due_time_value      = db.Column(db.String()   , nullable=False)
    def __repr__(self):
        return '<Task %r>' % self.title

    def __init__(self,task_owner,title,description,priority,starting_date_value,due_date_value,due_time_value) -> None:
        self.task_owner = task_owner
        self.title = title
        self.description = description
        self.priority = priority
        self.starting_date_value = starting_date_value
        self.due_date_value = due_date_value
        self.due_time_value = due_time_value

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
