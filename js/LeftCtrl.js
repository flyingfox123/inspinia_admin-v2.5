/**
 * 左侧菜单
 * @type {module|*}
 */
var app = angular.module('myApp');
app.controller("LeftCtrl", function($scope, $state, $rootScope, $window, $resource) {

	//$state.go('main.yundanList');

});


app.controller('goodsListCtrl', ['$scope', '$resource', '$modal',
	function($scope, $resource, $modal) {

		$scope.viewDetail = function(num) {
			if (num == 1) {
				var modalInstance = $modal.open({
					templateUrl: 'goods/goodsDetail.html',
					controller: 'goodsDetailCtrl',
					backdrop: 'static',
					resolve: {
						condition: function() {
							//return $scope.condition;
						}
					},
					size: 'lg'

				});
			} else if (num == 2) {
				var modalInstance = $modal.open({
					templateUrl: 'goods/goodsDetail2.html',
					controller: 'goodsDetailCtrl',
					backdrop: 'static',
					resolve: {
						condition: function() {
							//return $scope.condition;
						}
					},
					size: 'lg'

				});
			} else {
				var modalInstance = $modal.open({
					templateUrl: 'goods/goodsDetail3.html',
					controller: 'goodsDetailCtrl',
					backdrop: 'static',
					resolve: {
						condition: function() {
							//return $scope.condition;
						}
					},
					size: 'lg'

				});
			}

		};

	}
]);

app.controller('goodsDetailCtrl', ['$scope', '$resource', '$modalInstance', '$modal',
	function($scope, $resource, $modalInstance, $modal) {
		$scope.bj = function() {
				var modalInstance = $modal.open({
					templateUrl: 'goods/bj.html',
					controller: 'goodsBjCtrl',
					backdrop: 'static',
					resolve: {
						condition: function() {
							//return $scope.condition;
						}
					},
					size: 'lg'

				});
			};
			$scope.qd = function() {
				var modalInstance = $modal.open({
					templateUrl: 'goods/bj.html',
					controller: 'goodsBjCtrl',
					backdrop: 'static',
					resolve: {
						condition: function() {
							//return $scope.condition;
						}
					},
					size: 'lg'

				});
			};
			$scope.jd = function() {
				var modalInstance = $modal.open({
					templateUrl: 'goods/bj.html',
					controller: 'goodsBjCtrl',
					backdrop: 'static',
					resolve: {
						condition: function() {
							//return $scope.condition;
						}
					},
					size: 'lg'

				});
			};
			// 关闭modal弹框
		$scope.cancel = function() {
			$modalInstance.close();
		};
	}
]);

app.controller('goodsBjCtrl', ['$scope', '$resource', '$modalInstance', '$modal',
	function($scope, $resource, $modalInstance, $modal) {
		$scope.bj = function() {
				var modalInstance = $modal.open({
					templateUrl: 'goods/bj.html',
					controller: 'goodsBjCtrl',
					backdrop: 'static',
					resolve: {
						condition: function() {
							//return $scope.condition;
						}
					},
					size: 'lg'

				});
			}
			// 关闭modal弹框
		$scope.cancel = function() {
			$modalInstance.close();
		};
	}
]);