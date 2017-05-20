import angular from 'angular';

function getApiFactory($http)
{
   // Revealing Module pattern
   return {
     allData: function(urlApi) {
       return $http.get(urlApi, { cache: false })
       .catch(function(error) { console.log(error); });
       // a promise returns
     },
   };
 }

export {getApiFactory};
