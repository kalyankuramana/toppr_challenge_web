(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController($rootScope,fuseTheming,storageService)
    {
        var vm = this;
        vm.user=storageService;

        $rootScope.$broadcast('restorestate');
        // Data
        vm.themes = fuseTheming.themes;

        //////////
    }
})();