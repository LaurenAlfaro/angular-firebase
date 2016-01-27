/**
 * @ngdoc controller
 * @name ngFireJobs.SearchCtrl:SearchCtrl
 * @requires $scope
 * @requires ngFireCommon.JobsService
 * @description
 * This is the controller for SearchCtrl.
 */
angular.module('ngFireJobs').controller('SearchCtrl', function($scope, JobsService) {
    'use strict';

    $scope.jobs = JobsService.all;
});