angular.module('AngularFire.jobs').controller('PublishCtrl', function($scope, $log, $location, JobsService) {
    'use strict';

    $scope.job = {};

    $scope.publishJob = function(job) {
        JobsService.publishJob(job).then(function() {
            $log.log('Job was published');
            $location.path('/search');
        }, function (error) {
            $log.error('Error publishing the Job');
        });
    };
});