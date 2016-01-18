angular.module('AngularFire.jobs').controller('DetailCtrl', function($scope, $routeParams, $location, JobsService) {
    'use strict';

    if ($routeParams.jobId) {
        $scope.job = JobsService.getJob($routeParams.jobId);
    } else {
        $location.path('/');
    }
});