(function ()
{
    'use strict';

    angular
        .module('app.checking', [])
        .config(config);

        /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.checking', {
                url    : '/checking',
                views  : {
                    'content@app': {
                        templateUrl: 'app/checking/checking.html',
                        controller : 'checkingController'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('checking');
        msNavigationServiceProvider.saveItem('Hub', {
            title    : 'Hub',
            icon     : 'icon-tile-four',
            /*stateParams: {
                'param1': 'page'
             },*/	
            weight   : 1
        });
        msNavigationServiceProvider.saveItem('Hub.checking', {
            title    : 'Checking',
            icon     : 'icon-minus',
            state    : 'app.checking',
            /*stateParams: {
                'param1': 'page'
             },*/	
            weight   : 1
        });

    }
})();