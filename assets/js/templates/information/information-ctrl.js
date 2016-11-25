console.log('informationCtrl')
module
  .controller('InformationCtrl',informationCtrl);
function informationCtrl ($scope,$routeParams,$rootScope) {
  $scope.singer = $rootScope.singers[$routeParams.singer];  
}