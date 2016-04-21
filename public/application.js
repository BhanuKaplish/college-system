var mainApplicationModuleName = "mean";

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute', 'users', 'example', 'experiences','enrollments','enrollmentscourse']);

mainApplicationModule.config(['$locationProvider',          
function($locationProvider){
    $locationProvider.hashPrefix('!');
}]);

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleName]);
});