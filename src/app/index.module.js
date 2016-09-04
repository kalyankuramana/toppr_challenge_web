(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Login


            // Quick panel


            // Apps
            'app.got',
        ])
        .factory('storageService', function ($window,$rootScope,USER_STATUS) {

                var service = {

                    model: {
                        name: '',
                        email: '',
                        token: ''
                    },

                    SaveState: function () {
                        //sessionStorage.storageService = angular.toJson(service.model);
                        $window.localStorage.setItem('name',service.model.name);
                        $window.localStorage.setItem('email',service.model.email);
                    },

                    RestoreState: function () {
                        //service.model = angular.fromJson(sessionStorage.storageService);
                        service.model.name=$window.localStorage.getItem('name');
                        service.model.email=$window.localStorage.getItem('email');
                        if(typeof service.model.name==='undefined' || service.model.name==='')
                            $rootScope.$broadcast('userStatusEvent', { status:USER_STATUS.offline});

                        else
                            $rootScope.$broadcast('userStatusEvent', { status:USER_STATUS.online});
                    }
                }

                $rootScope.$on("savestate", service.SaveState);
                $rootScope.$on("restorestate", service.RestoreState);

                return service;
            })
            .factory('principal', ['$q', '$http', '$timeout',
              function($q, $http, $timeout) {
                var _identity = undefined,
                  _authenticated = false;

                return {
                  isIdentityResolved: function() {
                        console.log("inside identiryresolve authorize"+angular.isDefined(_identity));
                    return angular.isDefined(_identity);
                  },
                  isAuthenticated: function() {
                    return _authenticated;
                  },
                  isInRole: function(role) {
                    if (!_authenticated || !_identity.roles) return false;

                    return _identity.roles.indexOf(role) != -1;
                  },
                  isInAnyRole: function(roles) {
                    if (!_authenticated || !_identity.roles) return false;

                    for (var i = 0; i < roles.length; i++) {
                      if (this.isInRole(roles[i])) return true;
                    }

                    return false;
                  },
                  authenticate: function(identity) {
                    _identity = identity;
                    _authenticated = identity != null;
                  },
                  identity: function(force) {
                    console.log("inside identiry principal");
                    var deferred = $q.defer();

                    if (force === true) _identity = undefined;

                    // check and see if we have retrieved the
                    // identity data from the server. if we have,
                    // reuse it by immediately resolving
                    if (angular.isDefined(_identity)) {
                      deferred.resolve(_identity);

                      return deferred.promise;
                    }

                    // otherwise, retrieve the identity data from the
                    // server, update the identity object, and then
                    // resolve.
                    //           $http.get('/svc/account/identity',
                    //                     { ignoreErrors: true })
                    //                .success(function(data) {
                    //                    _identity = data;
                    //                    _authenticated = true;
                    //                    deferred.resolve(_identity);
                    //                })
                    //                .error(function () {
                    //                    _identity = null;
                    //                    _authenticated = false;
                    //                    deferred.resolve(_identity);
                    //                });

                    // for the sake of the demo, fake the lookup
                    // by using a timeout to create a valid
                    // fake identity. in reality,  you'll want
                    // something more like the $http request
                    // commented out above. in this example, we fake
                    // looking up to find the user is
                    // not logged in
                    var self = this;
                    $timeout(function() {
                      self.authenticate(null);
                      deferred.resolve(_identity);
                    }, 1000);

                    return deferred.promise;
                  }
                };
              }
            ])
            .factory('authorization', ['$rootScope', '$state', 'principal',
              function($rootScope, $state, principal) {
                return {
                  authorize: function() {
                    return principal.identity()
                      .then(function() {
                        var isAuthenticated = principal.isAuthenticated();

                        if (typeof $rootScope.toState.data!='undefined'
                            &&$rootScope.toState.data.roles
                            && $rootScope.toState
                                         .data.roles.length > 0
                            && !principal.isInAnyRole(
                               $rootScope.toState.data.roles))
                        {
                          if(isAuthenticated) {
                              // user is signed in but not
                              // authorized for desired state
                              $state.go('accessdenied');
                          }else {
                            // user is not authenticated. Stow
                            // the state they wanted before you
                            // send them to the sign-in state, so
                            // you can return them when you're done
                            $rootScope.returnToState
                                = $rootScope.toState;
                            $rootScope.returnToStateParams
                                = $rootScope.toStateParams;

                            // now, send them to the signin state
                            // so they can log in
                            $state.go('signin');
                          }
                        }
                        else
                        {
                            $state.go('app.pages_auth_login-v2');
                        }
                      });
                  }
                };
              }
            ]);
})();
