angular.module('AngularFire.common').factory('Jobs', function(FBURL, $firebaseArray, $firebaseObject, Auth) {
    'use strict';

    var ref = new Firebase(FBURL),
        jobs = $firebaseArray(ref.child('jobs')),
        user = Auth.userProfile,
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