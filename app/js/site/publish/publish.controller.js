angular.module('AngularFire.publish').controller('PublishCtrl', function($scope, $location, Jobs) {
    'use strict';

    $scope.job = {};

    $scope.publishJob = function(job) {
        Jobs.publishJob(job).then(function() {
            console.log('Job was published');
            $location.path('/search');
        }, function (error) {
            console.log(error);
        });
    };
});