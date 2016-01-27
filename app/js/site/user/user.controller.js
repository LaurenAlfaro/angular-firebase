/**
 * @ngdoc controller
 * @name ngFireUser.UserCtrl:UserCtrl
 * @requires $scope
 * @requires $log
 * @requires $location
 * @requires $timeout
 * @requires ngFireCommon.AuthService
 * @description
 * This is the controller for UserCtrl.
 */
angular.module('ngFireUser').controller('UserCtrl', function($scope, $log, $location, $timeout, AuthService) {
    'use strict';

    $scope.user = {};

    $scope.hasError = function(element) {
        return $scope.form[element].$invalid && $scope.submitted;
    };

    $scope.login = function(user) {
        $scope.submitted = true;
        $scope.error = false;

        if ($scope.form.$valid) {
            AuthService.login(user).then(function() {
                $log.log('Login was successful');
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
            AuthService.register(user).then(function() {
                $log.log('Register was successful');
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