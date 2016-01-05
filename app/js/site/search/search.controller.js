angular.module('AngularFire.search').controller('SearchCtrl', function($scope, Jobs) {
    'use strict';

    $scope.jobs = Jobs.all;
});