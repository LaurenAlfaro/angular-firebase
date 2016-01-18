/**
 * @ngdoc service
 * @name AngularFire.common.JobsService
 * @requires FBURL
 * @requires $firebaseArray
 * @requires $firebaseObject
 * @requires AngularFire.common.AuthService
 * @description
 * Service for manipulate Jobs.
 */
angular.module('AngularFire.common').factory('JobsService', function(FBURL, $firebaseArray, $firebaseObject, AuthService) {
    'use strict';

    var ref = new Firebase(FBURL),
        jobs = $firebaseArray(ref.child('jobs')),
        user = AuthService.userProfile,
        fac = {
            all: jobs,
            getJob: function(jobId) {
                return $firebaseObject(ref.child('jobs').child(jobId));
            },
            publishJob: function(job) {
                job.date = Firebase.ServerValue.TIMESTAMP;
                job.gravatar = user.profile.gravatar;
                return jobs.$add(job);
            },
            editJob: function(job) {
                job.date = Firebase.ServerValue.TIMESTAMP;
                job.gravatar = job.gravatar || user.profile.gravatar;
                return job.$save();
            },
            deleteJob: function(job) {
                return job.$remove();
            }
        };

    return fac;
});