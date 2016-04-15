angular.module('daily_record_form', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};

    // Add tree to database
    $scope.addData = function(todoID) {
        $http.post('/dataAdded', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.dailyData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };
    // download data
    $scope.exportData = function() {
        $http.get('/exportData').success(function(data, status, headers, config) {
         var anchor = angular.element('<a/>');
         anchor.attr({
             href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
             target: '_blank',
             download: 'dailyRecord.csv'
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
$(function () {
          $('#datetimepicker2').datetimepicker();

          });

});



