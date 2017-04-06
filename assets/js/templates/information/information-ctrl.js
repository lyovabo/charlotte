module
  .controller('InformationCtrl', ['$scope','$stateParams','$translate',informationCtrl]);

function informationCtrl($scope, $stateParams ,$translate) {

   var singer = 'siners.'+$stateParams.singer;
   
      $scope.singer = {}
   $translate([singer+'.firstName',singer+'.lastName',singer+'.fullName',singer+'.about',singer+'.listen',singer+'.imagesCount']).then(function(res) {    
      $scope.singer.firstName = res[singer+'.firstName'];
      $scope.singer.lastName = res[singer+'.lastName'];
      $scope.singer.fullName = res[singer+'.fullName'];
      $scope.singer.about = res[singer+'.about'];
      $scope.singer.listen = res[singer+'.listen'];

      $scope.singer.imagesCount =Array.apply(null, {length:  Number.parseInt(res[singer+'.imagesCount'])}).map(Number.call, Number)
      $scope.singer.id = $stateParams.singer;
   },function(res) {
   });
}
