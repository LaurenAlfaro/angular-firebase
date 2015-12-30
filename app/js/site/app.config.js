angular.module('fireJobApp').config(function($routeProvider) {
    'use strict';

    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/publish', {
            templateUrl: 'views/publish.html',
            controller: 'PublishCtrl'
        })
        .when('/edit', {
            templateUrl: 'views/edit.html',
            controller: 'EditCtrl'
        })
        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});