window.apiBaseUrl = 'http://irancard.local/';

window.irancard = angular.module('irancard', [
  'ngRoute'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/views/index',
      controller: 'IrancardController'
    }).
    when('/news/:id/:header', {
      templateUrl: '/views/news',
      controller: 'NewsController'
    }).
    when('/panel', {
      templateUrl: '/views/panel',
      controller: 'PanelController'
    }).
    when('/register', {
      templateUrl: '/views/register',
      controller: 'RegisterController'
    }).

    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(false);

});
