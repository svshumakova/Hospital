/*
'use strict';

var hospitalServices = angular.module('hospitalServices', ['ngResource']);

phonecatServices.factory('Stuff', ['$resource',
    function($resource){
        return  $resource('phones/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    }]);
*/
