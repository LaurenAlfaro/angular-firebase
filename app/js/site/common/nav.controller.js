angular.module('AngularFire.common').controller('NavCtrl', function($scope, $location, Auth) {
    'use strict';

    $scope.currentUser = Auth.userProfile;
    $scope.isAuthenticated = Auth.isAuthenticated;

    $scope.logout = function() {
        Auth.logout();
        console.log('Logout was successful');
        $location.path('/');
    };
});