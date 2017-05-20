"use strict";
import "babel-polyfill";
import $ from 'jquery';import jQuery from 'jquery';window.$ = $;window.jQuery = jQuery;
window.$ = window.jQuery = jQuery; jQuery.noConflict(true);
import _ from 'underscore';
import angular from 'angular';
import { listCtrl, searchCtrl } from './controllers';
import { routeConfigure } from './routing.js';
import { getApiFactory } from './factories.js'

(()=> {
  let myApp = angular.module('bookapp', ['ui.router']);
  myApp.constant('example', 'constant value to inject in factory constructor');
  myApp.factory("getApi", getApiFactory);
  myApp.controller('ListCtrl', ['$http','$interval', '$timeout','getApi', listCtrl]);
  myApp.controller('SearchCtrl', ['$http','$interval', '$timeout', searchCtrl]);
  myApp.config(routeConfigure);
})();
