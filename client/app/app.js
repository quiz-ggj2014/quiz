angular.module('Quiz', ['ui.router'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);

        // all unmatched urls are sent to the game.
        $urlRouterProvider.otherwise('play');

        // define ui states.
        $stateProvider
            .state('start', {
                url: '/start',
                templateUrl: 'static/partials/start.html',
                controller: 'StartCtrl'
            })
            .state('game', {
                url: '/play',
                templateUrl: 'static/partials/game.html',
                controller: 'GameCtrl'
            })
            .state('win', {
                url: '/win',
                templateUrl: 'static/partials/win.html',
                controller: 'WinCtrl'
            });
    }]);