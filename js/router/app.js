var app = angular.module('myApp', [
    'ngResource',   // 引入rest风格请求
    'ui.router',    // 引入路由选择
    'ui.bootstrap', // 引入bootstrap风格组件
    'angularFileUpload', // 引入angualr-file-upload组件
    'myPageModule',
    'myAttrToggle',
    'textAngular',
    'ng.ueditor'
])//依赖注入
    .config(function ($httpProvider) {
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('toLogin', {
                url: '/toLogin',
                templateUrl: 'html/login.html',
                controller: 'LoginCtrl'
            })
            .state('main', {
                url: '/main',
                views: {
                    'header': {
                        templateUrl: 'html/layout/header.html',
                        controller: 'HeaderCtrl'
                    },
                    'left': {
                        templateUrl: 'html/layout/left.html',
                        controller: 'LeftCtrl'
                    },
                    'right': {
                        templateUrl: 'html/layout/right.html'
                    },
                    'footer': {
                        templateUrl: 'html/layout/footer.html'
                    }
                }
            });
        // 设置默认页
        $urlRouterProvider.otherwise('/toLogin');
    })
    .run(function ($rootScope, $state, $resource, $window) {
        if(typeof $rootScope.menuNodes == "undefined" && typeof $window.sessionStorage.loginName != 'undefined') {
            $resource("mgr/usercenter/user/queryperms", {
                loginName : $window.sessionStorage.loginName
            }, {
                query: {
                    isArray: true
                }
            }).query().$promise.then(function (data) {
                if(typeof data[0] == 'undefined') {
                    $rootScope.result = {};
                    $rootScope.result.state = "failure";
                    $rootScope.result.errMsg = "您的账号无任何可访问权限！";
                } else {
                    $rootScope.menuNodes = data[0].children;
                    $rootScope.buttonMenu = $rootScope.menuNodes[0].children[0].children;
                }
            });
        }
    });

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