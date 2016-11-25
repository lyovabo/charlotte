var templatesPath = 'assets/js/templates';
module.config(function($routeProvider, $locationProvider, $qProvider) {
  $locationProvider.baseHref = "/";
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });
  $qProvider.errorOnUnhandledRejections(false);
  $routeProvider
    .when('/', {
      templateUrl: templatesPath+'/controller-free/main-content.html'
    })
    .when('/show', {
      templateUrl: templatesPath+'/controller-free/show-content.html'
    })
    .when('/special', {
      templateUrl: templatesPath+'/controller-free/special-content.html'
    })
    .when('/posters', {
      templateUrl: templatesPath+'/controller-free/posters-content.html'
    })
    .when('/strip', {
      templateUrl: templatesPath+'/controller-free/strip-content.html'
    })
    .when('/vip', {
      templateUrl: templatesPath+'/controller-free/vip-content.html'
    })
    .when('/gallery', {
      templateUrl: templatesPath+'/gallery/gallery-content.html'
    })
    .when('/strip-gallery', {
      templateUrl: templatesPath+'/gallery-strip/gallery-strip-content.html'
    })
    .when('/menu', {
      templateUrl: templatesPath+'/controller-free/menu/menu-content.html'
    })
    .when('/menu-crazy', {
      templateUrl: templatesPath+'/controller-free/menu/menu-crazy-content.html'
    })
    .when('/menu-nargile', {
      templateUrl: templatesPath+'/controller-free/menu/menu-nargile-content.html'
    })
    .when('/events', {
      templateUrl: templatesPath+'/events/events-content.html',
    })
    .when('/history', {
      templateUrl: templatesPath+'/history/history-content.html',
      
    })
    .when('/contact-us', {
      templateUrl: templatesPath+'/contact-us/contact-us-content.html',
      
    })
    .when('/career', {
      templateUrl: templatesPath+'/contact-us/career-content.html',
      
    })
    .when('/show/:singer',{
      templateUrl: templatesPath+'/information/information-content.html',
      controller: "InformationCtrl"
    })
    .when('/reservation', {
      templateUrl: templatesPath+'/controller-free/reservation-content.html'
    })
  $routeProvider.otherwise({ templateUrl: templatesPath+'/controller-free/main-content.html' });
})
module.run(['$rootScope','$http',run])
function run($rootScope,$http) {
  $http.get('assets/js/configs/config.json').then(function(response){
    $rootScope.singers = response.data;
  },function(err){
      alert(err);
  })
}