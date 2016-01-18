angular.module('AngularFire.jobs').controller('SearchCtrl', function($scope, JobsService) {
    'use strict';

    $scope.jobs = JobsService.all;
});