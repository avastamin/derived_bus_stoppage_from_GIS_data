import os
import json
from flask import Flask, render_template
from filter import Filter

app = Flask(__name__)

# Open activity_points.geojson and get activity points
PORJECT_DIR = os.getcwd()
activity_points_file = "static/assests/data/activity_points.geojson"
abs_activity_points_file = os.path.join(PORJECT_DIR, activity_points_file)
with open(abs_activity_points_file) as activity_points:
    activity_points = json.load(activity_points)

# Open routes GEOjson file and read data from it
routes_file = "static/assests/data/routes.geojson"
abs_routes_file = os.path.join(PORJECT_DIR, routes_file)
with open(abs_routes_file) as routes_data:
    routes = json.load(routes_data)

# Show all Bus Stoppages
@app.route('/')
def showBusStoppages():
    features = Filter().filter_activity_points(activity_points['features'])
    busstoppages = Filter().intersected_activity_points(features, routes)
    return render_template('index.html', busstoppages = busstoppages)


if __name__ == '__main__':
    app.secret_key = 'gis_code_challenge_by_ruhul'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)