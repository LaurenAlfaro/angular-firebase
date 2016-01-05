angular.module('AngularFire.delete').controller('DeleteCtrl', function($scope, $location, $routeParams, Jobs) {
    'use strict';

    if ($routeParams.jobId) {
        $scope.job = Jobs.getJob($routeParams.jobId);
    } else {
        $location.path('/');
    }

    $scope.deleteJob = function(job) {
        Jobs.deleteJob(job).then(function() {
            console.log('Job was deleted');
            $location.path('/');
        }, function (error) {
            console.log(error);
        });
    };
});