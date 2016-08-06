var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/comment', {
    templateUrl:'/../index.ejs',
    controller: 'myCtrl'
  });
}]);
  myApp.controller('myCtrl', ['$scope','$http', function($scope,$http){

    var refresh = function() {
    $http.get('/comment').success(function(data){
      console.log("Scope contents", data);
      $scope.comment = data;
    });
    };
    refresh();
    $scope.addComment = function(data){
      $scope.comment.splice(0, 100);
      $scope.comment.push({
        name: $scope.comment.name,
        comment: $scope.comment.comment
      });
      $http.post('/comment', $scope.comment).success(function(){
      });
      $scope.comment.name = ""; //Clear input box fields
      $scope.comment.comment = ""; //Clear input box fields
      refresh();
    };
    $scope.remove = function(id){
    console.log(id);
    $http.delete('/comment/' + id).success(function(data){
      $scope.comment = data;
      console.log("Deleted: ", data);
      refresh();
    });
  };
}]);
