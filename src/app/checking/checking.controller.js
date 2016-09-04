(function ()
{
    'use strict';

    angular
        .module('app.checking')
        .controller('checkingController', checkingController);

    /** @ngInject */
    function checkingController($scope)
    {
        // Data
        $scope.name="vikas";
        
    }
})();