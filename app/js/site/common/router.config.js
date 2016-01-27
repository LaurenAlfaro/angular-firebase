/**
 * @ngdoc service
 * @name ngFireCommon.Config
 * @description
 * Configuration for the ngRouter
 * @example
 * <pre>
 * .config(function($routeProvider) {
 *       $routeProvider
 *           .when('/', {
 *               templateUrl: 'views/search.html',
 *               controller: 'SearchCtrl'
 *           })
 *           .when('/publish', {
 *               templateUrl: 'views/publish.html',
 *               controller: 'PublishCtrl',
 *               resolve: {
 *                   authenticate: ['$q', 'AuthService', '$location', '$timeout', authenticate]
 *               }
 *           })
 *           .when('/edit/:jobId', {
 *               templateUrl: 'views/edit.html',
 *               controller: 'EditCtrl',
 *               resolve: {
 *                   authenticate: ['$q', 'AuthService', '$location', '$timeout', authenticate]
 *               }
 *           })
 *           .when('/detail/:jobId', {
 *               templateUrl: 'views/detail.html',
 *               controller: 'DetailCtrl',
 *               resolve: {
 *                   authenticate: ['$q', 'AuthService', '$location', '$timeout', authenticate]
 *               }
 *           })
 *           .when('/delete/:jobId', {
 *               templateUrl: 'views/delete.html',
 *               controller: 'DeleteCtrl',
 *               resolve: {
 *                   authenticate: ['$q', 'AuthService', '$location', '$timeout', authenticate]
 *               }
 *           })        .when('/login', {
 *               templateUrl: 'views/login.html',
 *               controller: 'UserCtrl'
 *           })
 *           .when('/register', {
 *               templateUrl: 'views/register.html',
 *               controller: 'UserCtrl'
 *           })
 *           .otherwise({
 *               redirectTo: '/'
 *           });
 *   });
 * );
 * </pre>
 */
function authenticate($q, AuthService, $location, $timeout) {
    'use strict';

    var deferred = $q.defer();

    if (AuthService.isAuthenticated()) {
        deferred.resolve();
    } else {
        $timeout(function () {
            $location.path('/');
        });
        deferred.reject();
    }

    return deferred.promise;
}

angular.module('ngFireCommon').config(function($routeProvider) {
    'use strict';

    $routeProvider
        .when('/', {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        })
        .when('/publish', {
            templateUrl: 'views/publish.html',
            controller: 'PublishCtrl',
            resolve: {
                authenticate: ['$q', 'AuthService', '$location', '$timeout', authenticate]
            }
        })
        .when('/edit/:jobId', {
            templateUrl: 'views/edit.html',
            controller: 'EditCtrl',
            resolve: {
                authenticate: ['$q', 'AuthService', '$location', '$timeout', authenticate]
            }
        })
        .when('/detail/:jobId', {
            templateUrl: 'views/detail.html',
            controller: 'DetailCtrl',
            resolve: {
                authenticate: ['$q', 'AuthService', '$location', '$timeout', authenticate]
            }
        })
        .when('/delete/:jobId', {
            templateUrl: 'views/delete.html',
            controller: 'DeleteCtrl',
            resolve: {
                authenticate: ['$q', 'AuthService', '$location', '$timeout', authenticate]
            }
        })        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'UserCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'UserCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});