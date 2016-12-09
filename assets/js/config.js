var templatesPath = 'assets/js/templates';
module.config(function( $translateProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
   $translateProvider
  .useStaticFilesLoader({
    prefix : './assets/js/translations/',
    suffix : '.json'
  })
  .preferredLanguage('ru')
  .useLocalStorage();
  $translateProvider.useSanitizeValueStrategy();
  $translateProvider.forceAsyncReload(true);
  $translateProvider.useLoaderCache(true);
  $locationProvider.baseHref = "/";
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('app', {
    abstract: true,
    url: '/{lang:(?:ru|en)}',
    template: '<ui-view/>'
  });
  
  $stateProvider
  .state('app.home', {
    url           : '/',
    templateUrl   : templatesPath+'/controller-free/main-content.html',
  })
  .state('app.show', {
    url           : '/show',
    templateUrl   : templatesPath+'/controller-free/show-content.html'
  })
   .state('app.singer', {
    url           : '/show/:singer',
    templateUrl   : templatesPath+'/information/information-content.html',
    controller    : 'InformationCtrl'
  })
  .state('app.special', {
    url           : '/special',
    templateUrl   : templatesPath+'/controller-free/special-content.html'
  })
  .state('app.posters', {
    url           : '/posters',
    templateUrl   : templatesPath+'/controller-free/posters-content.html'
  })
  .state('app.strip', {
    url           : '/strip',
    templateUrl   : templatesPath+'/controller-free/strip-content.html'
  })
  .state('app.vip', {
    url           : '/vip',
    templateUrl   : templatesPath+'/controller-free/vip-content.html'
  })
  .state('app.gallery', {
    url           : '/gallery',
    templateUrl   : templatesPath+'/gallery/gallery-content.html'
  })
  .state('app.galleryStrip', {
    url           : '/gallery-strip',
    templateUrl   : templatesPath+'/gallery-strip/gallery-strip-content.html'
  })
  .state('app.menu', {
    url           : '/menu',
    templateUrl   : templatesPath+'/controller-free/menu/menu-content.html'
  })
  .state('app.menuNargile', {
    url           : '/menu-nargile',
    templateUrl   : templatesPath+'/controller-free/menu/menu-nargile-content.html'
  })
  .state('app.menuCrazy', {
    url           : '/menu-crazy',
    templateUrl   : templatesPath+'/controller-free/menu/menu-crazy-content.html'
  })
  .state('app.events', {
    url           : '/events',
    templateUrl   : templatesPath+'/events/events-content.html'
  })
  .state('app.history', {
    url           : '/history',
    templateUrl   : templatesPath+'/history/history-content.html',
    controller    : "HistoryCtrl"
  })

  .state('app.contacts', {
    url           : '/contact-us',
    templateUrl   : templatesPath+'/contact-us/contact-us-content.html',
    
  })
  .state('app.career', {
    url           : '/career',
    templateUrl   : templatesPath+'/contact-us/career-content.html'
  })
  .state('app.reservation', {
    url           : '/career',
    templateUrl   : templatesPath+'/controller-free/reservation-content.html'
  })
})
module.run(['$rootScope','$http','$translate','$location','$stateParams',run])
function run($rootScope,$http,$translate,$location,$stateParams) {

  $rootScope.changeLanguage = function(langKey) {
      $translate.use(langKey);
    }
    if($location.url().indexOf('/ru/')!=-1) {
      $('body').addClass('ru');
    }
    $rootScope.$on('$translateChangeSuccess', function(event,langObj,etc) {
      if($rootScope.activeLang!== langObj.language){
        $rootScope.activeLang = langObj.language;
        var lang = ($rootScope.activeLang === 'ru') ? 'en' : 'ru';
        if(lang != 'ru'){
          $('body').addClass('ru');
        } else {
          $('body').removeClass('ru');
        }
        $location.path( $location.url().replace(lang, langObj.language)).replace();
      }
      
    })
  $rootScope.activeLang = $translate.preferredLanguage();
  $rootScope.charlotte = $translate.instant('charlotte')
 
  
}