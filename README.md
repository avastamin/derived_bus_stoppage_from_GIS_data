# Derived bus stations from GIS data

Goal to derive bus stations from the given  [acitvity points geojson][1] file of Dar Es Salam, Tanzania.

### There are goals of this application:
1. To develop an algorithm in Python that processes the data.
2. Visualise results in a web map.

### Steps to fulfill the requirements:
1. Filter crowdsourced locations using my algorithm.
 In my algorithm, first I considered speed because in bus stations maximum speed can be less than 20-30km/hr or 20-124mile/hr and dominating
 activity 'in_vehicle','still', 'on_foot', 'on_bicyle', 'NULL' can be considered as bus stations in both cases where it
 is previous_dominating_activity or current_dominating_activity.

2. Filter again with routes geojson data
This is the 2nd filter step. The idea is, if the crowdsourced locations are close enough to routes then it can be bus stations,
I used Shapely to generate geometry and checked if points are intersect with the routes line or not. Routes are so tinny to I made
buffer(0.0005) to consider some wide area with routes

3. Render results on html template to visualize on web browser
To visualize this data I used The Google Maps Data layer with  the Google Maps JavaScript API. The Google Maps Data layer
provides a container for arbitrary geospatial data. I used Data layer to store my data and to display routes GeoJSON data on a Google map.
To visualize routes geojson I just used
  `map.data.loadGeoJson('static/assets/data/routes.geojson');`

I am taking bus stations data from python script. Then I used that data on my template and visualize on Map. I did not visualize
routes on Map by default. Instead of this, I added some control for bus stations and routes just on Map legend where
user can control their visualisation.
 ![Control pannel](static/assets/img/map_control.png?raw=true "Control Panel")

### How to use this application:
I used virtualenv to manage all dependencies.
1. clone or download the files
2. Go to the directory and intall Virtual environment `virtualenv --no-site-packages --distribute .env`
3. run Virtual Environment `source .env/bin/activate`
4. To install all dependency `pip install -r requirements.txt`
5. Run the application `python application.py`
6. Open your browser and see on `http://localhost:5000/`

  ![Map View](static/assets/img/map_view.png?raw=true "Map View")

[1]: https://github.com/avastamin/derived_bus_stoppage_from_GIS_data/blob/master/static/assets/data/activity_points.geojson "activity_points.geojson"
