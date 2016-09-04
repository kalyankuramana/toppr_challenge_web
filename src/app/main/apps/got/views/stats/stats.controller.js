(function ()
{
  'use strict';

  angular
    .module('app.got')
    .controller('StatsController', StatsController);
  /** @ngInject */
  function StatsController($scope,$document,$timeout,$http,$state,$stateParams,msApi,CONSTS,Stats) {
    var vm = this;
    $scope.CONSTS = CONSTS;
    vm.stats ={};
    Stats.$promise.then(function (data) {
      vm.stats = data;
    });

  }


})();
