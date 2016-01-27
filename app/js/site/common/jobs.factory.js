/**
 * @ngdoc service
 * @name ngFireCommon.JobsService
 * @requires ngFireCommon.FBURL
 * @requires $firebaseArray
 * @requires $firebaseObject
 * @requires ngFireCommon.AuthService
 * @description
 * Service for manipulate Jobs actions.
 */
angular.module('ngFireCommon').factory('JobsService', function(FBURL, $firebaseArray, $firebaseObject, AuthService) {
    'use strict';

    var ref = new Firebase(FBURL),
        jobs = $firebaseArray(ref.child('jobs')),
        user = AuthService.userProfile,
        fac = {
            /**
             * @ngdoc
             * @name ngFireCommon.JobsService#all
             * @propertyOf ngFireCommon.JobsService
             * @description
             * This property contains all the jobs.
             */
            all: jobs,
            /**
             * @ngdoc method
             * @name ngFireCommon.JobsService#getJob
             * @methodOf ngFireCommon.JobsService
             * @description
             * This method get a job.
             * @param {string} jobId Job Id.
             */
            getJob: function(jobId) {
                return $firebaseObject(ref.child('jobs').child(jobId));
            },
            /**
             * @ngdoc method
             * @name ngFireCommon.JobsService#publishJob
             * @methodOf ngFireCommon.JobsService
             * @description
             * This method publishes a job.
             * @param {object} job This object contain the job to publish.
             */
            publishJob: function(job) {
                job.date = Firebase.ServerValue.TIMESTAMP;
                job.gravatar = user.profile.gravatar;
                return jobs.$add(job);
            },
            /**
             * @ngdoc method
             * @name ngFireCommon.JobsService#editJob
             * @methodOf ngFireCommon.JobsService
             * @description
             * This method edits a job.
             * @param {object} job This object contain the job to edit.
             */
            editJob: function(job) {
                job.date = Firebase.ServerValue.TIMESTAMP;
                job.gravatar = job.gravatar || user.profile.gravatar;
                return job.$save();
            },
            /**
             * @ngdoc method
             * @name ngFireCommon.JobsService#deleteJob
             * @methodOf ngFireCommon.JobsService
             * @description
             * This method deletes a job.
             * @param {object} job This object contain the job to delete.
             */
            deleteJob: function(job) {
                return job.$remove();
            }
        };

    return fac;
});