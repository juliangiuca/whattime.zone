var thyme = angular.module('thyme', []);

thyme.controller('indexCtrl', ["$scope", "$interval",
        function indexCtrl ($scope, $interval) {

  var tz = jstz.determine();
  $scope.zone = tz.name();
  $scope.adjustment = '';

  $scope.days = []
  _.times(6, function (day) {
    $scope.days.push(moment().add(day, 'days').format('ddd Do MMM'));
  });

  var calc = function () {
    var date = $scope.date || new Date();
    $scope.sanfrancisco = moment(date).tz('America/Los_Angeles').format("dddd Do @ h:mma");
    $scope.sydney       = moment(date).tz('Australia/Sydney').format("dddd Do @ h:mma");
    $scope.shanghai     = moment(date).tz('Asia/Shanghai').format("dddd Do @ h:mma");
  }

  $interval(function () { calc() }, 100);

  $scope.$watch('adjustment', function (oldVar, newVar) {
    if (oldVar !== newVar) {
      $scope.date = chrono.parseDate($scope.adjustment);
      calc();
    }
  });
}]);
