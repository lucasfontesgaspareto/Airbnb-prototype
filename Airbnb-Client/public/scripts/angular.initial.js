/**
 * http://usejsdoc.org/
 */

var airbnbApp = angular.module('airbnbApp',['ui.router']);
//handles client side routing
airbnbApp.config(function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.
		otherwise('/');
	
	$stateProvider
		.state('home',
				{
					url:'/',
					templateUrl : './templates/view.homepage.html',
					/*resolve : {
						userSession : function($http){
							 return $http({
									method : "POST",
									url : '/getSession'
									});
							}
					},*/
					controller : 'controllerHome'
				})
})


