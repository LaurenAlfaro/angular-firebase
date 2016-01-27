/**
 * @ngdoc controller
 * @name ngFireJobs.EditCtrl:EditCtrl
 * @requires $scope
 * @requires $log
 * @requires $location
 * @requires $routeParams
 * @requires ngFireCommon.JobsService
 * @description
 * This is the controller for EditCtrl.
 */
angular.module('ngFireJobs').controller('EditCtrl', function($scope, $log, $location, $routeParams, JobsService) {
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