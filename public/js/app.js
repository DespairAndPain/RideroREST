//ngRoute выдаёт ошибку, хотя модули есть. Доработать

 'use strict';
 
var bookApp = angular.module('bookApp', [
  'ngRoute',
  'bookController'
]);
console.log('hey');

bookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/add', {
        templateUrl: 'partial/add-book.html',
        controller: 'bookAddCtrl'
      }).
      when('/:bookId', {
        templateUrl: 'partial/view-book.html',
        controller: 'bookViewCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
console.log('hey2');