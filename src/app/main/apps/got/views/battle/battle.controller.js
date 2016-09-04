(function ()
{
  'use strict';

  angular
    .module('app.got')
    .controller('BattleController', BattleController);
  /** @ngInject */
  function BattleController($scope,$document,$timeout,$http,$state,$stateParams,msApi,CONSTS) {
      var vm = this;
      $scope.CONSTS = CONSTS;
      vm.battle ={};
      vm.gotobattles = gotobattles;
      if($stateParams.battle==null){
        gotobattles();
        return;
      }
      else{
        vm.battle=$stateParams.battle;
        console.log(vm.battle);
      }
    function gotobattles() {
      $timeout(function () {
        $state.go('app.got.battles', {}, {reload: true, inherit: false, notify: true});
      }, 1000);

    }
  }


})();
