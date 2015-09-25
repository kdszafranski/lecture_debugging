var app = angular.module('app', []);

app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://www.youtube.com**'
    ]);
});

app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    $scope.cat = {};
    $scope.cats = [];
    $scope.catNames = {};

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

    var conKitty = function() {
        return $http.get('/conKitty').then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to concatenate with the API');
            }
            $scope.catNames = {};
            $scope.catNames = response.data;
            return response.data;
        })
    };

    // post ajax to /add to add this cat to mongo db, then ajax out new json data
    $scope.add = function(cat) {
        return $http.post('/add', cat).then(fetchCats).then(conKitty);
    };

    fetchCats();
    conKitty();
}]);

app.controller("CaroController", ['$scope', '$http', function($scope, $http){
    //$scope.vid = "https://www.youtube.com/embed/XAg5KjnAhuU";
    $scope.welcome = "hello, there!";
    $scope.vids = [
        {length: 4, width: 10,
            hi: function() {
                return function() {return this.width;}
            }
        },
        "https://www.youtube.com/embed/jsX2Uefpyhw",
        "https://www.youtube.com/embed/XAg5KjnAhuU",
        "https://www.youtube.com/embed/Ff5qbXITt_M",
    ];

}]);