(function ()
{
    'use strict';

    angular
        .module('global',[])
        .constant('USER_STATUS',{
            'online':0,
            'offline':4
        })
        .constant('AUTH_EVENTS', {
          loginSuccess: 'auth-login-success',
          loginFailed: 'auth-login-failed',
          logoutSuccess: 'auth-logout-success',
          sessionTimeout: 'auth-session-timeout',
          notAuthenticated: 'auth-not-authenticated',
          notAuthorized: 'auth-not-authorized'
        })
        .constant('USER_ROLES', {
          all: '*',
          admin: 'admin',
          editor: 'editor',
          guest: 'guest'
        })
        .constant('CONSTS',{
            "APIbaseURL": "http://128.199.118.212:6543/api/",
            "GeoCodebaseURL":"http://maps.google.com/maps/api/geocode/json?",
            "battle":{
               "name":"name",
               "region":"region",
               "attacker":"attacker_king",
               "defender":"defender_king",
               "location":"location",
               "no":"battle_number",
               "attackers":"attackers",
               "defenders":"defenders",
               "year":"year",
               "outcome":"attacker_outcome",
               "type":"battle_type",
               "attackSize":"attacker_size",
               "defenceSize":"defender_size",
               "attackCommanders":"attacker_commander",
               "defenceCommanders":"defender_commander",
               "majorDeath":"major_death",
               "majorCapture":"major_capture",
               "note":"note",
               "summer":"summer"

            }

        })
        .factory('AuthService', function ($http, Session) {
            var authService = {};

            authService.login = function (credentials) {
                return $http
                .post('/login', credentials)
                .then(function (res) {
                    Session.create(res.data.id, res.data.user.id,
                               res.data.user.role);
                    return res.data.user;
                });
            };

            authService.isAuthenticated = function () {
              return !!Session.userId;
            };

            authService.isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                  authorizedRoles = [authorizedRoles];
                }
                return (authService.isAuthenticated() &&
                  authorizedRoles.indexOf(Session.userRole) !== -1);
            };

            return authService;
        })
        .service('Session', function () {
          this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
          };
          this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
          };
        });

})();
