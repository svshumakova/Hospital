var hospitalControllers = angular.module('hospitalControllers', []);

hospitalControllers.controller("EmployeesController", function($scope){
    $scope.staff = [
        {   "id":1,
            "firstName": "Sveta",
            "lastName":"Shumakova",
            "position":"nurse"},
        {   "id":2,
            "firstName": "Alena",
            "lastName":"Lisogub",
            "position":"prinsipal"},
        {   "id":3,
            "firstName": "Yura",
            "lastName":"Krivinets",
            "position":"psychologist"}
    ];
    $scope.deletePerson = function(id){
        $scope.staff = _.reject($scope.staff, {id:id});
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
            user.id = _.uniqueId("employee_");
            $scope.staff.push(user);
        }else{
            var user = _.find($scope.staff,{id:$scope.newUser.id});
            user.firstName = $scope.newUser.firstName;
            user.lastName = $scope.newUser.lastName;
            user.position = $scope.newUser.position;
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
});

hospitalControllers.controller("LoginController", function ($scope) {

});