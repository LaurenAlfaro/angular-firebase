angular.module('AngularFire.jobs').controller('EditCtrl', function($scope, $log, $location, $routeParams, JobsService) {
    'use strict';

    if ($routeParams.jobId) {
        $scope.job = JobsService.getJob($routeParams.jobId);
    } else {
        $location.path('/');
    }

    $scope.editJob = function(job) {
        JobsService.editJob(job).then(function() {
            $log.log('Job was modified');
            $location.path('/search');
        }, function (error) {
            $log.error('Error updating the Job');
        });
    };
});