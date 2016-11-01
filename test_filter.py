import unittest2
from filter import Filter
class testFilter(unittest2.TestCase):

    def setUp(self):
        unittest2.TestCase.setUp(self)
        self.filter = Filter()

    def tearDown(self):
        unittest2.TestCase.tearDown(self)

    # assert and instance test intersected_activity_points
    def test_filter_intersection_activity_points(self):
        features = []
        filtered_features = []

        feature1 = {}
        feature1['properties'] = {'previous_dominating_activity': 'in_vehicle', 'current_dominating_activity': 'still',
                                  'speed': 5}
        feature1['geometry'] = {"type": "Point", "coordinates": [39.2796017, -6.8224933]}

        features.append(feature1)
        filtered_features.append(feature1)

        feature2 = {}
        feature2['properties'] = {'previous_dominating_activity': 'not', 'current_dominating_activity': 'still',
                                  'speed': 45}  # wrong data
        feature2['geometry'] = {"type": "Point", "coordinates": [39.2720017, -6.82539933]}
        features.append(feature2)

        result_features = self.filter.filter_activity_points(features)
        self.assertIsInstance(result_features, list)
        self.assertIsInstance(result_features[0], object)
        self.assertItemsEqual(result_features, filtered_features)

        routes = {
            "features": [
                {"type": "Feature", "properties": {"route_id": 5509682}, "geometry": {"type": "LineString", "coordinates": [
                [39.1708251, -6.8765432], [39.1712366, -6.8763936], [39.1714444, -6.876443], [39.1714371, -6.8771191],
                [39.1713169, -6.8779287], [39.1711023, -6.8795136], [39.170965, -6.8806299],
                [39.1707848, -6.8817973]]}}]
        }
        intersection = self.filter.intersected_activity_points(features, routes)

        self.assertIsInstance(intersection, object)
        self.assertItemsEqual(intersection, [])

if __name__ == '__main__':
    unittest2.main()