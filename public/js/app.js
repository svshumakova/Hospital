'use strict';
var hospitalAppModule = angular.module('hospitalApp',[
    'ngRoute',
    'hospitalControllers'
]);

hospitalAppModule.config(['$routeProvider',
    function($routeProvider) {
    $routeProvider.
        when('/employees', {
            templateUrl: 'partials/employees.html',
            controller: 'EmployeesController'
        }).
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
         }).
        otherwise({
            redirectTo: '/employees'
        });
}]);


