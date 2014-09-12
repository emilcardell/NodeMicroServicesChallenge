var app = angular.module('FruitApp', ['ngRoute']);

app.controller('StartPageController', ['$scope', '$http', function($scope, $http){

	$http.get('list-of-products.json').success(function(data){
		$scope.recommendedProducts = data;
	});

}]);

app.controller('CategoryMenuController', ['$scope', '$http', function($scope, $http){
	$http.get('category-menu.json').success(function(data){
		$scope.menuItems = data;
	});	
}]);

app.controller('CategoryController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	$scope.categoryName = $routeParams.categoryId;
	$http.get('list-of-products.json').success(function(data){
		$scope.categoryProducts = data;
	});
}]);

app.controller('ProductController', ['$scope', '$http', function($scope, $http){

	$http.get('product-info.json').success(function(data){
		$scope.productInfo = data;
	});


	$http.get('list-of-products.json').success(function(data){
		$scope.recommendedProducts = data;
	});

}]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'template-startpage.html',
        controller: 'StartPageController'
      }).
      when('/category/:categoryId', {
        templateUrl: 'template-category.html',
        controller: 'CategoryController'
      }).
      when('/product/:productId', {
        templateUrl: 'template-product.html',
        controller: 'ProductController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);