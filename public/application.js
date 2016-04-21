/*
File Name:          application.js
Author Name:        Albert Monteiro, Bhanu Kaplish, Manuel Castro
Website Name:       College-system
File Description:   This is file provides the module name for main application.
*/

var mainApplicationModuleName = "mean";

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute', 'users', 'example', 'experiences','enrollments','enrollmentscourse']);

mainApplicationModule.config(['$locationProvider',          
function($locationProvider){
    $locationProvider.hashPrefix('!');
}]);

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName]);
});