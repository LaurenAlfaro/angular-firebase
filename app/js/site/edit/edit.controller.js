angular.module('AngularFire.edit').controller('EditCtrl', function($scope, $location, $routeParams, Jobs) {
    'use strict';

    if ($routeParams.jobId) {
        $scope.job = Jobs.getJob($routeParams.jobId);
    } else {
        $location.path('/');
    }

    $scope.editJob = function(job) {
        Jobs.editJob(job).then(function() {
            console.log('Job was modified');
            $location.path('/');
        }, function (error) {
            console.log(error);
        });
    };
});