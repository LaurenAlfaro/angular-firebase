/**
 * @ngdoc service
 * @name AngularFire.common.AuthService
 * @requires AngularFire.common.FBURL
 * @requires $firebaseAuth
 * @requires $firebaseObject
 * @requires AngularFire.common.GravatarService
 * @description
 * Service for user authenticate.
 */
angular.module('AngularFire.common').factory('AuthService', function(FBURL, $firebaseAuth, $firebaseObject, GravatarService) {
    'use strict';

    var ref = new Firebase(FBURL),
        aut = $firebaseAuth(ref),
        fac = {
            userProfile: {},
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
            login: function (user) {
                return aut.$authWithPassword({
                    email: user.email,
                    password: user.password
                });
            },
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
            isAuthenticated: function() {
                return !!fac.userProfile.profile;

            },
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