var thyme = angular.module('thyme', []);

thyme.controller('indexCtrl', ["$scope",
        function indexCtrl ($scope) {

  var tz = jstz.determine();
  $scope.zone = tz.name();
  $scope.adjustment = '';

  var calc = function (startDate) {
    var date = startDate || new Date();
    $scope.sanfrancisco = moment(date).tz('America/Los_Angeles').format("dddd, MMMM Do YYYY, h:mm:ss a");
    $scope.sydney       = moment(date).tz('Australia/Sydney').format("dddd, MMMM Do YYYY, h:mm:ss a");
    $scope.shanghai     = moment(date).tz('Asia/Shanghai').format("dddd, MMMM Do YYYY, h:mm:ss a");
  }
  calc();

  $scope.$watch('adjustment', function (oldVar, newVar) {
    if (oldVar !== newVar) {
      var newDate = chrono.parseDate($scope.adjustment);
      calc(newDate);
    }
  });
}]);
