from json import load
from flask import Flask, request
import requests as r 
import os 
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
  raise EnvironmentError("Please create .env.local file and insert there UNSPLASH_KEY")

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG

# retorna single image
@app.route("/newImage") 
def newImage():
  word = request.args.get("query") # obtiene el parametro query
  
  payload = {
    "query": word
  }
  headers = {
    "Accept-Version": "v1",
    "Authorization": "Client-ID {}".format(UNSPLASH_KEY)
  }
    
  response = r.get(url=UNSPLASH_URL, headers=headers, params=payload)
  data = response.json()
  return data

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5050)