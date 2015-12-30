angular.module('fireJobApp.publish').controller('PublishCtrl', function($scope, FBURL, $firebaseArray) {
    'use strict';

    var ref = new Firebase(FBURL);
    $scope.jobs = $firebaseArray(ref.child('jobs'));

    $scope.publishJob = function(job) {
        $scope.jobs.$add(job);
    };
});