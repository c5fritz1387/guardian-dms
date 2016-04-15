angular.module('new_tree_form', [])

.controller('treeController', function($scope, $http) {

    $scope.formData = {};

    // Add tree to database
    $scope.addTree = function(todoID) {
        $http.post('/treeAdded', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.newtreeData = data;
                console.log(data);
                
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

    // download data
    $scope.exportTrees = function() {
        $http.get('/exportTrees').success(function(data, status, headers, config) {
         var anchor = angular.element('<a/>');
         anchor.attr({
             href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
             target: '_blank',
             download: 'tappingTrees.csv'
         })[0].click();

      }).
  error(function(data, status, headers, config) {
    // handle error
});
}


$(function () {
          $('#datetimepicker1').datetimepicker({
            format: 'DD/MM/YYYY'
          });

          });

});




