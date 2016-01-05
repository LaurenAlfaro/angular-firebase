function authenticate($q, Auth, $location, $timeout) {
    'use strict';

    var deferred = $q.defer();

    if (Auth.isAuthenticated()) {
        deferred.resolve();
    } else {
        $timeout(function () {
            $location.path('/');
        });
        deferred.reject();
    }

    return deferred.promise;
}

angular.module('AngularFire').config(function($routeProvider) {
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
                authenticate: authenticate
            }
        })
        .when('/edit/:jobId', {
            templateUrl: 'views/edit.html',
            controller: 'EditCtrl',
            resolve: {
                authenticate: authenticate
            }
        })
        .when('/detail/:jobId', {
            templateUrl: 'views/detail.html',
            controller: 'DetailCtrl',
            resolve: {
                authenticate: authenticate
            }
        })
        .when('/delete/:jobId', {
            templateUrl: 'views/delete.html',
            controller: 'DeleteCtrl',
            resolve: {
                authenticate: authenticate
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