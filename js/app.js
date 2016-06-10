'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ui.router',
	'ui.bootstrap',
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers',
    'angularMoment',
    'wu.masonry',
    'infinite-scroll',
    'ngCookies',
    'bsLoadingOverlay',
    'ngProgress',
    'flow',
    'ng-jwplayer',
    'angulartics',
    'angulartics.google.analytics',
    'ui.utils',
    'luegg.directives',
    'ngStorage'
	]).
    config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $urlRouterProvider.otherwise("error");
    $stateProvider.state("home", {
        url: "/", templateUrl: "/views/home/home.html",
        controller: "HomeCtrl"
    }).state("post", {
        url: "/post/:post_id",
        templateUrl: "/views/post/detail.html",
        resolve: {
            post: function (Post, $stateParams, $state) {
                return Post.getPost($stateParams.post_id).success(function (data) {
                    if (data.error != 0)return $state.go("error");
                    return data
                })
            }
        },
        controller: "PostDetailCtrl"
    }).state("search", {
        url: "/search?keyword",
        templateUrl: "/views/home/search.html"
    }).state("users", {
        url: "/users",
        templateUrl: "views/home/search.html"
    }).state("profiles", {
        url: "/profiles",
        templateUrl: "/views/user/profiles.html",
        controller: "ProfilesCtrl"
    }).state("chat", {
        url: "/chat",
        templateUrl: "/views/chat/chat.html"
    }).state("chat/", {
        url: "/chat/:chatId",
        templateUrl: "/views/chat/chat.html"
    }).state("user", {
        url: "/user/:userId",
        templateUrl: "/views/user/index.html",
        "abstract": true,
        controller: "UserCtrl",
        resolve: {
            user: function ($stateParams, $state, User, $rootScope) {
                return User.getUserInfo($stateParams.userId).success(function (data, status, header, config) {
                    //if (!data.status)return $state.go("error");

                    return data
                })
            }
    }}).state("user.activity", {
        url: "", 
        templateUrl: "/views/user/index.html"
    }).state("category", {
        url: "/category/:slug",
        templateUrl: "/views/home/home.html",
        "abstract": true,
        controller: "CategoryCtrl",
        resolve: {}
    }).state("category.detail", {
        url: "", 
        templateUrl: "/views/home/home.html"
    }).state("error", {
        url: "/error", 
        templateUrl: "/views/error.html"
    });
    $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix("!")

})
.run(function(amMoment, $rootScope, $location, $anchorScroll, $state) {
    amMoment.changeLocale('vi');
    $rootScope.$on('$routeChangeSuccess', function(){
        ga('send', 'pageview', $location.path());
    });
    $rootScope.$on("$locationChangeSuccess", function() {
        $anchorScroll();
    });
    $rootScope.user = {};

});

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1184650714881453',
      xfbml      : true,
      version    : 'v2.6'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));