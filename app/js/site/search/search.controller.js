angular.module('fireJobApp.search').controller('SearchCtrl', function($scope, FBURL, $firebaseArray) {
    'use strict';

    var ref = new Firebase(FBURL);
    $scope.jobs = $firebaseArray(ref.child('jobs'));
});