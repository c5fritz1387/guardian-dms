angular.module('new_tree_form', [])

.controller('treeController', function($scope, $http) {

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
    $scope.addTree = function(todoID) {
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




