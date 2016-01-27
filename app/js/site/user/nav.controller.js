/**
 * @ngdoc controller
 * @name ngFireUser.NavCtrl:NavCtrl
 * @requires $scope
 * @requires $log
 * @requires $location
 * @requires ngFireCommon.AuthService
 * @description
 * This is the controller for NavCtrl.
 */
angular.module('ngFireUser').controller('NavCtrl', function($scope, $log, $location, AuthService) {
    'use strict';

    $scope.currentUser = AuthService.userProfile;
    $scope.isAuthenticated = AuthService.isAuthenticated;

    $scope.logout = function() {
        AuthService.logout();
        $log.log('Logout was successful');
        $location.path('/');
    };
});