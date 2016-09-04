(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $rootScope)
    {
        // Data

        //////////
      $rootScope.$broadcast('msSplashScreen::remove');
        // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function (event)

        {
           console.log("hello");
            if ( event.targetScope.$id === $scope.$id )
            {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }
})();
