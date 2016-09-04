
(function ()
{
  'use strict';

  angular
    .module('app.got',
      [
        'flow','ngMdIcons','ngMessages','fuse','global','app.core'
      ]
    )
    .config(config)


  /** @ngInject */
  function config($stateProvider,$httpProvider,CONSTS,$translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
  {
    // State

    $stateProvider
      .state('app.got', {
        abstract: true,
        url     : '/got'
      })
      .state('app.got.battles', {
        url      : '/battles',
        views    : {
          'content@app': {
            templateUrl: 'app/main/apps/got/views/battles/battles.html',
            controller : 'BattlesController as vm'
          }
        },
        resolve  : {
          Battles: function (msApi)
          {
            return msApi.resolve('got.battles@get');
          }
        }
      })
      .state('app.got.battles.battle',{
        url   : '/detail',
        views : {
          'content@app':{
            templateUrl: 'app/main/apps/got/views/battle/battle.html',
            controller : 'BattleController as vm'
          }
        },
        params: {battle: null}
      })
      .state('app.got.stats',{
        url   : '/stats',
        views : {
          'content@app':{
            templateUrl: 'app/main/apps/got/views/stats/stats.html',
            controller : 'StatsController as vm'
          }
        },
        resolve  : {
          Stats: function (msApi)
          {
            return msApi.resolve('got.stats@get');
          }
        }
      })
    ;

    // Api

    msApiProvider.register('got.battles',['http://128.199.118.212:6543/api/battles']);
    msApiProvider.register('got.stats',['http://128.199.118.212:6543/api/stats']);

    // msNavigationServiceProvider

    msNavigationServiceProvider.saveItem('apps.got', {
      title : 'GOT',
      icon  : 'icon-tile-four',
      weight: 2
    });

    msNavigationServiceProvider.saveItem('apps.got.battles', {
      title: 'Battles',
      state: 'app.got.battles'
    });
    msNavigationServiceProvider.saveItem('apps.got.stats', {
      title: 'Stats',
      state: 'app.got.stats'
    });


    $httpProvider.defaults.headers.patch = {};
  }
})();
