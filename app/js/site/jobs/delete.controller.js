angular.module('AngularFire.jobs').controller('DeleteCtrl', function($scope, $log, $location, $routeParams, JobsService) {
    'use strict';

    if ($routeParams.jobId) {
        $scope.job = JobsService.getJob($routeParams.jobId);
    } else {
        $location.path('/');
    }

    $scope.deleteJob = function(job) {
        JobsService.deleteJob(job).then(function() {
            $log.log('Job was deleted');
            $location.path('/search');
        }, function (error) {
            $log.error('Error deleting the Job');
        });
    };
});