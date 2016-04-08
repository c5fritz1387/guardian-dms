angular.module('nodeTodo', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    //$scope.treeData = {};

    // Get all todos
    /*$http.get('/dataAdded')
        .success(function(data) {
            $scope.treeData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });*/

    // Add tree to database
    $scope.addData = function(todoID) {
        $http.post('/treeAdded', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.treeData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

});




