var app = angular.module('myApp', [
    'ngResource',   // 引入rest风格请求
    'ui.router',    // 引入路由选择
    'ui.bootstrap'// 引入bootstrap风格组件
])//依赖注入
    .config(function ($httpProvider) {
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                views: {
                    'header': {
                        templateUrl: 'header.html'
                        // controller: 'HeaderCtrl'
                    },
                    'left': {
                        templateUrl: 'left.html',
                        controller: 'LeftCtrl'
                    },
                    'right': {
                        templateUrl: 'right.html'
                    },
                    'footer': {
                        templateUrl: 'footer.html'
                    }
                }
            })
             .state('main.yundanList', {
                url: '/mainYundanList',
                templateUrl:'yundanList.html'
            })
             .state('main.yundanDetail', {
                url: '/mainYundanDetail',
                templateUrl:'yundan/yundanDetail.html'
            })
              .state('main.yundanPush', {
                url: '/mainYundanPush',
                templateUrl:'yundan/yundanPush.html'
            })
              .state('main.yundanRoad', {
                url: '/mainYundanRoad',
                templateUrl:'yundan/yundanRoad.html'
            })
               .state('main.addressManage', {
                url: '/mainAddressManage',
                templateUrl:'yundan/addressManage.html'
            })
               .state('main.addressCreate', {
                url: '/mainAddressCreate',
                templateUrl:'yundan/addressCreate.html'
            })
               .state('main.carManage', {
                url: '/mainCarManage',
                templateUrl:'car/carManage.html'
            })
               .state('main.carInfo', {
                url: '/mainCarInfo',
                templateUrl:'car/carInfo.html'
            })
                .state('main.carInvite', {
                url: '/mainCarInvite',
                templateUrl:'car/carInvite.html'
            })
                .state('main.departmentManage', {
                url: '/mainDepartmentMange',
                templateUrl:'system/departmentMange.html'
            })
            .state('main.userManage', {
                url: '/mainUserManage',
                templateUrl:'system/userManage.html'
            })
              .state('main.powerManage', {
                url: '/mainPowerManage',
                templateUrl:'system/powerManage.html'
            })
              .state('main.loginManage', {
                url: '/mainLoginManage',
                templateUrl:'system/loginManage.html'
            })
               .state('main.goodsList', {
                url: '/mainGoodsList',
                templateUrl:'goods/goodsList.html'
            })
               .state('main.goodsPublish', {
                url: '/mainGoodsPublish',
                templateUrl:'goods/goodsPublish.html'
            })
                .state('main.orderList', {
                url: '/mainOrderList',
                templateUrl:'order/orderList.html'
            })
                ;
        // 设置默认页
        $urlRouterProvider.otherwise('/main');
    })

//loading
app.factory('timestampMarker', ["$rootScope", function ($rootScope) {
    var timestampMarker = {
        request: function (config) {
            $rootScope.loading = true;
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function (response) {
            $rootScope.loading = false;
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return timestampMarker;
}]);