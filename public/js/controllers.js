var hospitalControllers = angular.module('hospitalControllers', []);

hospitalControllers.controller("EmployeesController", function($scope, $http){
    $scope.staff = [];

    $http.get('http://localhost:8080/ajax/getEmployees').
        success(function(data) {
            $scope.staff = data;
        }).
        error(function(data, status, headers, config){
            console.log("Error: " + data);
        });


    $scope.deletePerson = function(id){
        $http.delete('http://localhost:8080/ajax/deleteEmployee/' + id).
            success(function(data) {
                $scope.staff = _.reject($scope.staff, {id:id});
            }).
            error(function(data, status, headers, config){
                console.log("Error: " + data);
            });
    }
    $scope.isFormOpen = false;
    $scope.isFormEdit = false;
    $scope.showForm = function(){
         $scope.newUser = {};
         $scope.isFormOpen = true;
         $scope.isFormEdit = false;
    };

    $scope.newUser = {
        "firstName": "",
        "lastName":"",
        "position":""
    }

    $scope.saveEmployee = function(newUser){
        if(!$scope.newUser.id){
            var user = angular.copy($scope.newUser);
            user.id = generateUUID();
            $http.post("http://localhost:8080/ajax/addEmployee", user).
                success(function(data){
                    if(data.status === "OK"){
                        $scope.staff.push(user);
                    } else {
                        console.log(data.status + ": " + data.message);
                    }
                }).
                error(function(err){
                    console.log(err.status + ": " + err.message);
                });
        }else{
            $http.put("http://localhost:8080/ajax/editEmployee/", newUser).
                success(function(data){
                    if(data.status === "OK"){
                        var user = _.find($scope.staff,{id:newUser.id});
                        user.firstName = $scope.newUser.firstName;
                        user.lastName = $scope.newUser.lastName;
                        user.position = $scope.newUser.position;
                    } else {
                        console.log(data.status + ": " + data.message);
                    }
                }).
                error(function(data){
                    console.log(data.status + ": " + data.message);
                });

        }
    }

    $scope.editUser = function(person){
        $scope.isFormOpen = true;
        $scope.isFormEdit = true;
        $scope.newUser.firstName = person.firstName;
        $scope.newUser.lastName = person.lastName;
        $scope.newUser.position = person.position;
        $scope.newUser.id = person.id;
    }

    function generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };
});

hospitalControllers.controller("LoginController", function ($scope) {

});