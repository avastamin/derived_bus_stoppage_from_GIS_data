from shapely.geometry import shape, Point
class Filter:

    def __init__(self):
        return

    def filter_activity_points(self, features):
        """
        takes features which comes from activity_points.geojson
        :param features: object
        :return filtered_features: object
        """
        filtered_features = []

        for feature in features:

            if(feature['properties']['previous_dominating_activity'] in ['in_vehicle','still', 'on_foot', 'on_bicyle', 'NULL']  and
                       feature['properties']['current_dominating_activity'] in ['in_vehicle','still', 'on_foot', 'on_bicyle', 'NULL'] and
                       feature['properties']['speed'] <=10):
               filtered_features.append(feature)

            else:
                #Do not considered because of very less probability of showing any bus stop.
               pass;

        return filtered_features

    def intersected_activity_points(self, points, routes):
        """
         Take Filtered activity_points  as points object and routes from routes.geojson
        :param points:Filtered activity_points
        :param routes: routes object from routes.geojson
        :return: intersec_filtered_features as filtered points(possible bus stoppages)
        """
        intersec_filtered_features = []
        # Go through all points and check if it intersects with routes
        for point in points:
            geopoint = Point(point["geometry"]["coordinates"][0], point["geometry"]["coordinates"][1]).buffer(0.0005)

            # check each polygon to see if it contains the point and set found flag
            found = 0
            for feature in routes['features']:
                polygon = shape(feature['geometry'])
                if polygon.intersects(geopoint):
                    found += 1
                    break
                else:
                    pass

            if(found == 1):
                intersec_filtered_features.append(point)
            else:
               pass

        return intersec_filtered_features




