var app = angular.module('ridApp', []);

app.controller('ridCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("controller is work");

var refresh = function() {
  $http.get('/api/products').success(function(response) {
    console.log("Got request");
    $scope.items = response;

    console.log(response);
  });
};

refresh();



}]);