pyre init
isort .
black .
poetry update
poetry build 
python wsgi.py
