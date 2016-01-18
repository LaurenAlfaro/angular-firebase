angular.module('AngularFire.user').controller('NavCtrl', function($scope, $log, $location, AuthService) {
    'use strict';

    $scope.currentUser = AuthService.userProfile;
    $scope.isAuthenticated = AuthService.isAuthenticated;

    $scope.logout = function() {
        AuthService.logout();
        $log.log('Logout was successful');
        $location.path('/');
    };
});