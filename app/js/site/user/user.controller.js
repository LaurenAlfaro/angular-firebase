angular.module('AngularFire.user').controller('UserCtrl', function($scope, FBURL, $firebaseArray, $location, $timeout, Auth) {
    'use strict';

    $scope.user = {};

    $scope.hasError = function(element) {
        return $scope.form[element].$invalid && $scope.submitted;
    };

    $scope.login = function(user) {
        $scope.submitted = true;
        $scope.error = false;

        if ($scope.form.$valid) {
            Auth.login(user).then(function() {
                console.log('Login was successful');
                $location.path('/');
            }, function (error) {
                $scope.error = error;
                $timeout(function() {
                    $scope.error = false;
                }, 3000);
            });
        }
    };

    $scope.register = function(user) {
        $scope.submitted = true;
        $scope.error = false;

        if ($scope.form.$valid) {
            Auth.register(user).then(function() {
                console.log('Register was successful');
                $location.path('/');
            }, function (error) {
                $scope.error = error;
                $timeout(function() {
                    $scope.error = false;
                }, 3000);
            });
        }
    };
});