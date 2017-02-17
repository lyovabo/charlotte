var templatesPath = 'assets/js/templates';
module.factory('customLoader',function($q,$translate){
  return function(){
    var deffered = $q.defer();
    var ref = firebase.database().ref($translate.proposedLanguage());
    ref.on('value',function(data){
      deffered.resolve(data.val());
    });
    return deffered.promise;
  }
});

module.config(['$translateProvider','$locationProvider','$stateProvider','$urlRouterProvider', configFunction]);
function configFunction($translateProvider,$locationProvider,$stateProvider,$urlRouterProvider) {
  $translateProvider
  .useLoader('customLoader');
  $translateProvider
  .preferredLanguage('en')
  .useLocalStorage();
  $translateProvider.useSanitizeValueStrategy();
  $translateProvider.forceAsyncReload(true);
  $translateProvider.useLoaderCache(true);
  $locationProvider.baseHref = "/";
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });
  $urlRouterProvider.otherwise('/en/');
  $stateProvider.state('app', {
    abstract: true,
    url: '/{lang:(?:ru|en)}',
    template: '<ui-view/>'
  });
  
  $stateProvider
   .state("otherwise", { url : '/en/',
                         templateUrl   : templatesPath+'/controller-free/main-content.html'})
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
    templateUrl   : templatesPath+'/contact-us/contact-us-content.html'
  })
  .state('app.career', {
    url           : '/career',
    templateUrl   : templatesPath+'/contact-us/career-content.html'
  })
  .state('app.reservation', {
    url           : '/reservation',
    templateUrl   : templatesPath+'/controller-free/reservation-content.html'
  });
};

module.run(['$rootScope','$http','$translate','$location','$stateParams','$firebaseObject',run]);

function run($rootScope,$http,$translate,$location,$stateParams,$firebaseObject) {
  var ref = firebase.database().ref('en');
  
  ref.on('value',function(data){
    console.log(data.val());
  })
  $rootScope.changeLanguage = function(langKey) {
      $translate.use(langKey);
    }
  $rootScope.backButton = function() {
    return (   location.pathname != '/ru/' 
            && location.pathname != '/en/'
            && location.pathname != '/charlotte/en/'
            && location.pathname != '/charlotte/ru/');
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
  $rootScope.charlotte  = $translate.instant('charlotte') 
}