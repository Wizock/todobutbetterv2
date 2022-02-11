from backend import app
from backend.API.crud_api import crud
app.register_blueprint(crud)
if __name__=="__main__":
    
    app.run(port = 5000,debug=True)
