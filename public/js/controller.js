var app = angular.module('ridApp', []);

app.controller('ridCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    console.log("controller is work");
    var searchObject = $location.search();
	

	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};
 	
 	var id = getUrlParameter('id');
    

var refreshviwe = function() {
  $http.get('/api/products').success(function(response) {
    console.log("Got request");
    $scope.items = response;

    console.log(response);
  });
};

refreshviwe();

}]);

