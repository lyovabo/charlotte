var templatesPath = 'assets/js/templates';
module.factory('customLoader',function( $q, $translate ){
  return function(){
    var deffered = $q.defer();
    var ref = firebase.database().ref('/languages/' + $translate.proposedLanguage());
    ref.on('value',function( data ){
      deffered.resolve(data.val());
    });
    return deffered.promise;
  }
});
module.config(['$translateProvider','$locationProvider','$stateProvider','$urlRouterProvider', configFunction]);
function configFunction( $translateProvider,$locationProvider,$stateProvider,$urlRouterProvider) {
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
   .state("otherwise", { 
      url : '/en/',
      templateProvider    :  function( $state, $q, $translate ) {
        return returnFirebaseTemplate( $q,'homepage' );
    }
  })
  .state('app.home', {
    url           : '/',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'homepage' );
    }
  })
  .state('app.show', {
    url           : '/show',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'show' );
    }
  })
   .state('app.singer', {
    url           : '/show/:singer',
    controller    : 'InformationCtrl',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'show-singer' );
    }
  })
  .state('app.special', {
    url           : '/special',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'special' );
    }
  })
  .state('app.posters', {
    url           : '/posters',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'posters' );
    }
  })
  .state('app.strip', {
    url           : '/strip',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'strip' );
    }
  })
  .state('app.vip', {
    url           : '/vip',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'vip' );
    }
  })
  .state('app.gallery', {
    url           : '/gallery',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'gallery' );
    }
  })
  .state('app.galleryStrip', {
    url           : '/gallery-strip',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'gallery-strip' );
    }
  })
  .state('app.menu', {
    url           : '/menu',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'menu' );
    }
  })
  .state('app.menuNargile', {
    url           : '/menu-nargile',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'menu-nargile' );
    }
  })
  .state('app.menuCrazy', {
    url                 : '/menu-crazy',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'menu-crazy' );
    }
  })
  .state('app.events', {
    url                 : '/events',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'events' )
    }
  })
  .state('app.history', {
    url                 : '/history',
    controller          : "HistoryCtrl",
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'history' )
    }
  })
  .state('app.contacts', {
    url                 : '/contact-us',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'contact-us' )
    }
  })
  .state('app.career', {
    url                 : '/career',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'career' )
    }
  })
  .state('app.reservation', {
    url           : '/reservation',
    templateProvider    :  function( $state, $q ) {
      return returnFirebaseTemplate( $q,'reservation' )
    }
  });
};
function returnFirebaseTemplate( $q, page ) {
  
  var ref = firebase.database().ref('components/'+page);
      var deffered = $q.defer();
      ref.on('value',function(data){
        deffered.resolve(data.val());
      });
      return deffered.promise;
}
module.run(['$rootScope','$http','$translate','$location','$stateParams',run]);

function run($rootScope,$http,$translate,$location,$stateParams) {
  $rootScope.changeLanguage = function(langKey) {
      $translate.use(langKey);
    }
  $rootScope.backButton = function() {
    return (   location.pathname != '/ru/' 
            && location.pathname != '/en/'
            && location.pathname != '/charlotte/en/'
            && location.pathname != '/charlotte/ru/');
  }
    if($location.url().indexOf('/ru/') != -1) {
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