(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state,authorization, principal)
    {
        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event,toState,toStateParams)
        {   
            console.log("changing state");
            $rootScope.loadingProgress = true;
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            //checks whether stateto is login or not to avoid infinite loop
            /*if(toState.bodyClass!=='login-v2'){
                console.log('not login');
                authorization.authorize();
            }*/
            //if (principal.isIdentityResolved()) 
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();