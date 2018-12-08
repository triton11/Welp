var app = angular.module('angularjsNodejsTutorial',[]);
// app.controller('myController', function($scope, $http) {
//         $scope.message="";
//         $scope.Submit = function() {
//         var request = $http.get('/data/'+$scope.email);
//         request.success(function(data) {
//             $scope.data = data;
//         });
//         request.error(function(data){
//             console.log('err');
//         });
    
//     }; 
// });

app.controller('insertController', function($scope, $http) {
        $scope.message="";
        $scope.Insert = function() {
        var request = $http.get('/data/'+$scope.login+'/data/'+$scope.name+'/data/'+$scope.sex+
            '/data/'+$scope.RelationshipStatus+'/data/'+$scope.Birthyear);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    
    }; 
});

// app.controller('friendsController', function($scope, $http) {
//         $scope.message="";
//         $scope.Submit = function() {
//         var request = $http.get('/friends/'+$scope.email);
//         request.success(function(data) {
//             $scope.data = data;
//         });
//         request.error(function(data){
//             console.log('err');
//         });
    
//     }; 
// });

// app.controller('familyController', function($scope, $http) {
//         $scope.message="";
//         $scope.names = [];
//         $scope.Load = function() {
//             var request = $http.get('/load/');
//             request.success(function(data) {
//                 var logins = [];
//                 for (var i = 0; i < data.length; i++) {
//                     logins[i] = data[i].login;
//                 }
//                 console.log(logins);
//                 $scope.names = logins;
//             });
//             request.error(function(data){
//                 console.log('err');
//             });
//         };
//         $scope.Submit = function() {
//             var request = $http.get('/family/'+$scope.email);
//             request.success(function(data) {
//                 $scope.data = data;
//             });
//             request.error(function(data){
//                 console.log('err');
//             });
//         }; 
//         $scope.Load();
// });