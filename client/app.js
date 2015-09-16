var app = angular.module('app', []);

app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    $scope.cat = {};
    $scope.cats = [];

    var fetchCats = function() {
        // ajax to get /cats, which is essentially an API to
        // get the cats json data from Mongo
        return $http.get('/cats').then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch cats from the API');
            }
            $scope.cat = {};
            $scope.cats = response.data;
            return response.data;
        })
    };

    // post ajax to /add to add this cat to mongo db, then ajax out new json data
    $scope.add = function(cat) {
        return $http.post('/add', cat).then(fetchCats);
    };

    fetchCats();
}]);

app.controller("CaroController", ['$scope', '$http', function($scope, $http){
    $scope.things = [
        "one",
        "two",
        "three",
        "four"
    ]
}]);