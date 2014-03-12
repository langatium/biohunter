'''
Created on 12.03.2014

@author: heinz-peterlang
'''
import requests
from flask import Flask
from flask import Flask, render_template

from flask_bootstrap import Bootstrap
from flask_googlemaps import GoogleMaps
from flask_googlemaps import Map

def create_app():
    app = Flask(__name__)
    Bootstrap(app)
    return app

app = create_app()

@app.route('/')
def index():
    content = 'hello world'
    return render_template('index.html', content=content)

@app.route("/map")
def mapview():
    # creating a map in the view
    url = 'https://biohunterp1940459638trial.hanatrial.ondemand.com/biohunter/BarcodeDataServlet'
    r = requests.get(url, headers=headers)
    
    mymap = Map(
        identifier="view-side",
        lat=37.4419,
        lng=-122.1419,
        markers=[(37.4419, -122.1419)]
    )
    return render_template('index.html', content=r.text)
#     return render_template('map.html', mymap=mymap)

app.run(debug=True)
