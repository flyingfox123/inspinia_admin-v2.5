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


app.controller('orderCtrl', ['$scope', '$resource', '$modal',
	function($scope, $resource, $modal) {
		$scope.operate = function(num) {
				var modalInstance = $modal.open({
					templateUrl: 'order/orderExDeal.html',
					controller: 'goodsDetailCtrl',
					backdrop: 'static'
				});
		};

		$scope.view = function() {
				var modalInstance = $modal.open({
					templateUrl: 'order/yundanDetail.html',
					controller: 'goodsDetailCtrl',
					backdrop: 'static',
					size:'lg'
				});
		};

	}
]);


app.controller('carCtrl', ['$scope', '$resource', '$modal',
	function($scope, $resource, $modal) {
		$scope.operate = function(num) {
				var modalInstance = $modal.open({
					templateUrl: 'car/carRecDeal.html',
					controller: 'goodsDetailCtrl',
					backdrop: 'static'

				});
		};

	}
]);


app.controller('driverInfoCtrl', ['$scope', '$resource', '$modal',
	function($scope, $resource, $modal) {
		$scope.operate = function(num) {
				var modalInstance = $modal.open({
					templateUrl: 'car/driverInfoDetail.html',
					controller: 'goodsDetailCtrl',
					backdrop: 'static',
					size:'lg'

				});
		};

	}
]);

app.controller('yundanCtrl', ['$scope', '$resource', '$modal','$state',
	function($scope, $resource, $modal,$state) {
		$scope.view = function() {
				$state.go('main.yundanRoad');
		};

	}
]);


app.controller('sweetAlertCtrl', ['$scope', '$resource', '$modal',
	function($scope, $resource, $modal) {
		$scope.view = function(num) {
				var modalInstance = $modal.open({
					templateUrl: 'invoice/invoiceDetail.html',
					controller: 'goodsDetailCtrl',
					backdrop: 'static'

				});
		};


$scope.addAddress = function(num) {
				var modalInstance = $modal.open({
					templateUrl: 'invoice/addAddress.html',
					controller: 'goodsDetailCtrl',
					backdrop: 'static'

				});
		};

		$scope.delete = function () {
		        swal({
		                title: "是否确定删除?",
		                text: "删除后数据将无法恢复!",
		                type: "warning",
		                showCancelButton: true,
		                confirmButtonColor: "#DD6B55",
		                confirmButtonText: "确定",
		                cancelButtonText: "取消",
		                closeOnConfirm: false,
		                closeOnCancel: false
		            },
		            function () {
		                swal("已删除!");
		            });
   		 }

	}
]);