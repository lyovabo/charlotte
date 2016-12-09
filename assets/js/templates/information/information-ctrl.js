module
  .controller('InformationCtrl', informationCtrl);

function informationCtrl($scope, $stateParams, $rootScope,$translate) {
  // $scope.singer = 'singers.';
  // $scope.singer += $stateParams.singer;
   // console.log( $translate('singers.'+$stateParams.singer))
   // console.log($stateParams.singer);
   var singer = 'siners.'+$stateParams.singer;
   // console.log(singer);
      $scope.singer = {}
   $translate([singer+'.firstName',singer+'.lastName',singer+'.fullName',singer+'.about',singer+'.listen',singer+'.imagesCount']).then(function(res) {    
      $scope.singer.firstName = res[singer+'.firstName'];
      $scope.singer.lastName = res[singer+'.lastName'];
      $scope.singer.fullName = res[singer+'.fullName'];
      $scope.singer.about = res[singer+'.about'];
      $scope.singer.listen = res[singer+'.listen'];

      $scope.singer.imagesCount =Array.apply(null, {length:  Number.parseInt(res[singer+'.imagesCount'])}).map(Number.call, Number)
      $scope.singer.id = $stateParams.singer;
      console.log([].constructor($scope.singer.imagesCount) )
   },function(res) {
    console.log(res);
   });
}
