import uiRouter from 'angular-ui-router';

function routeConfigure($stateProvider,$urlRouterProvider) {

  $urlRouterProvider.otherwise('/list');
  let listState = {
    name: 'blist',
    url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'ListCtrl',
    controllerAs: 'lstb'
  }

  let searchState = {
    name: 'bsearch',
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'SearchCtrl',
    controllerAs: 'srcb'
  }

  $stateProvider.state(listState);
  $stateProvider.state(searchState);
};

export {routeConfigure};
