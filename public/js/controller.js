var app = angular.module('ridApp', []);

app.controller('ridCtrl', ['$scope', '$http', function($scope, $http) {
	
    // Параметры из урла
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
    console.log(id+'  '+ (id != null));
    // Если есть параметры то открывать модал
 	if (id != null) {
 		$('#Modal').modal('show');
 	};

// Обновление отобраажениея (Гет по всем книгам)
var refreshviwe = function() {
  $http.get('/api/books').success(function(response) {
    console.log("Got request");
    $scope.items = response;

    console.log(response);
  });
};

// Добавить в коллекцию books записи
$scope.add = function(){
	console.log($scope.author);
	console.log($scope.name);

	$http({
        url: '/api/books',
        method: "POST",
        data: { 'author' : $scope.author,
        		'title' : $scope.name,
        		'file' : id }
    })
    .then(function(response) {
      console.log('send');      
    });

    refreshviwe();
}

//Удалить записи
$scope.delete = function(file, id){
	console.log(file);
	console.log(id);
    
    // Удаление из коллекции books
    $http.delete('/api/books/' + id);
    // Удаление файла привязанного к колекции
    $http.delete('/delete/book/' + id);
    refreshviwe();
}

refreshviwe();

}]);

