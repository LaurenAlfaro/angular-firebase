/**
 * @ngdoc controller
 * @name ngFireJobs.DetailCtrl:DetailCtrl
 * @requires $scope
 * @requires $location
 * @requires $routeParams
 * @requires ngFireCommon.JobsService
 * @description
 * This is the controller for DetailCtrl.
 */
angular.module('ngFireJobs').controller('DetailCtrl', function($scope, $location, $routeParams, JobsService) {
    'use strict';

    if ($routeParams.jobId) {
        $scope.job = JobsService.getJob($routeParams.jobId);
    } else {
        $location.path('/');
    }
});