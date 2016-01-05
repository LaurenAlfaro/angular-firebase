angular.module('AngularFire.detail').controller('DetailCtrl', function($scope, $routeParams, $location, Jobs) {
    'use strict';

    if ($routeParams.jobId) {
        $scope.job = Jobs.getJob($routeParams.jobId);
    } else {
        $location.path('/');
    }
});