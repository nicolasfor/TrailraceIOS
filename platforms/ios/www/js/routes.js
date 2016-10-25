angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('main', {
    url: '/main',
    templateUrl: './templates/login.html',
    controller: 'loginCtrl'
  })

  .state('login', {
      url: '/login',
      templateUrl: './templates/login.html',
      controller: 'loginCtrl'
      
    })
  .state('crearMapa', {
      url: '/crearMapa',
      templateUrl: './templates/crearMapa.html',
      controller: 'MapCtrl'
    })

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main');
  $urlRouterProvider.when('', '/main');
});
