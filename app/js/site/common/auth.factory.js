/**
 * @ngdoc service
 * @name ngFireCommon.AuthService
 * @requires ngFireCommon.FBURL
 * @requires $firebaseAuth
 * @requires $firebaseObject
 * @requires ngFireCommon.GravatarService
 * @description
 * This service handles all the actions related for users.
 */
angular.module('ngFireCommon').factory('AuthService', function(FBURL, $firebaseAuth, $firebaseObject, GravatarService) {
    'use strict';

    var ref = new Firebase(FBURL),
        aut = $firebaseAuth(ref),
        fac = {
            /**
             * @ngdoc
             * @name ngFireCommon.AuthService#userProfile
             * @propertyOf ngFireCommon.AuthService
             * @description
             * This property contains the user profile.
             */
            userProfile: {},
            /**
             * @ngdoc
             * @name ngFireCommon.AuthService#createProfile
             * @methodOf ngFireCommon.AuthService
             * @description
             * This method creates an user profile.
             * @param {string} uid User id.
             * @param {object} user Contains the user information.
             */
            createProfile: function(uid, user) {
                var profile = {
                    name: user.name,
                    email: user.email,
                    gravatar: GravatarService.getGravatar(user.email, 40)
                };

                ref.onAuth(function(AuthData) {
                    if (AuthData) {
                        return ref.child('users').child(AuthData.uid).set({
                            provider: AuthData.provider,
                            profile: profile
                        });
                    }
                });
            },
            /**
             * @ngdoc
             * @name ngFireCommon.AuthService#login
             * @methodOf ngFireCommon.AuthService
             * @description
             * This method login an user in the application.
             * @param {object} user Contains the user information.
             */
            login: function (user) {
                return aut.$authWithPassword({
                    email: user.email,
                    password: user.password
                });
            },
            /**
             * @ngdoc
             * @name ngFireCommon.AuthService#register
             * @methodOf ngFireCommon.AuthService
             * @description
             * This method registers an user in the application.
             * @param {object} user Contains the user information.
             */
            register: function (user) {
                return aut.$createUser({
                    email: user.email,
                    password: user.password
                }).then(function() {
                    return fac.login(user);
                }).then(function(AuthData) {
                    return fac.createProfile(AuthData.uid, user);
                });
            },
            /**
             * @ngdoc
             * @name ngFireCommon.AuthService#isAuthenticated
             * @methodOf ngFireCommon.AuthService
             * @description
             * This method verify if the user is logged.
             */
            isAuthenticated: function() {
                return !!fac.userProfile.profile;

            },
            /**
             * @ngdoc
             * @name ngFireCommon.AuthService#logout
             * @methodOf ngFireCommon.AuthService
             * @description
             * This method logout the user in the application.
             */
            logout: function() {
                aut.$unauth();
            }
        };

    aut.$onAuth(function(AuthData) {
        if (AuthData) {
            angular.copy(AuthData, fac.userProfile);
            fac.userProfile.profile = $firebaseObject(ref.child('users').child(AuthData.uid).child('profile'));
        } else {
            if (fac.userProfile && fac.userProfile.profile) {
                fac.userProfile.profile.$destroy();
            }
            angular.copy({}, fac.userProfile);
        }
    });

    return fac;
});