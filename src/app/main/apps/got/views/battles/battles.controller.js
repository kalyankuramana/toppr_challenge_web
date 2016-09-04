(function ()
{
  'use strict';

  angular
    .module('app.got')
    .controller('BattlesController', BattlesController);
  /** @ngInject */
  function BattlesController($scope,$document,$timeout,$http,$state,$stateParams,Battles,msApi) {

    var vm = this;
    vm.Battles=[];
    vm.Battles_length = 0;
    getBattles();
    vm.gotobattleDetail = gotobattleDetail

    vm.dtInstance = {};
    vm.dtOptions = {
      dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',

      initComplete: function ()
      {

        var api = this.api(),
          searchBox = angular.element('body').find('#got-battles-search');

        // Bind an external input as a table wide search box
        if ( searchBox.length > 0 )
        {
          searchBox.on('keyup', function (event)
          {
            api.search(event.target.value).draw();
          });
        }
      },
      pagingType  : 'simple',
      lengthMenu  : [10, 20, 30, 50, 100],
      pageLength  : 20,
      scrollY     : 'auto',
      responsive  : true
    };

    function gotobattleDetail($event,battle) {
      $event.stopPropagation();
      $state.go('app.got.battles.battle', {battle:battle});
    }
    function getBattles(params) {
      var result = msApi.resolve('got.battles@get',params);
      result.then(function (data) {
        vm.Battles_length = data.total;
        vm.Battles = data.data;
        console.log(vm.Battles);

      });
    }

  }


})();
