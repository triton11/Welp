var app = angular.module('myApp',['ngRoute']);
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

app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/main.html',
            controller  : 'insertController'
        })

        // route for the about page
        .when('/proposal', {
            templateUrl : 'pages/proposal.html',
            controller  : 'proposalController'
        })

        .when('/plan', {
            templateUrl : 'pages/plan.html',
            controller  : 'planController'
        })
});

app.factory('proposalService', function() {
 var activities = {};
 var breakfast;
 var lunch;
 var dinner;
 var city;
 var occassion;
 var day;
 var timeStart;
 var timeEnd;
 function set(data, br, lu, din, cit, occassio, da, timeStar, timeEn) {
   var all = data.data;
   //activities = data;
   if (br) {
     breakfast = all[0];
     all.shift();
   } else {
     breakfast = undefined
   }
   if (lu) {
     lunch = all[0];
     all.shift();
   } else {
     lunch = undefined
   }
   if (din) {
    dinner = all[0];
    all.shift();
   } else {
     dinner = undefined
   }
   activities = all;
   city = cit;
   occassion = occassio;
   day = da;
   timeStart = timeStar;
   timeEnd = timeEn;
 };
 function get() {
  return activities;
 };
 function bre() {
  return breakfast;
 };
 function lun() {
  return lunch;
 };
 function din() {
  return dinner;
 };
 function cit() {
  return city;
 };
 function occas() {
  return occassion;
 };
 function da() {
  return day;
 };
 function timeStar() {
  return timeStart;
 };
 function timeEn() {
  return timeEnd;
 };
 return {
  set: set,
  get: get,
  breakfast: bre,
  lunch: lun,
  dinner: din,
  city: cit,
  occassion: occas,
  day: da,
  timeStart: timeStar,
  timeEnd: timeEn
 }

});
app.controller('insertController', function($scope, $http, $window, proposalService) {
    $scope.message="";
    $scope.Insert = function() {
        //proposalService.set(undefined, undefined, undefined, undefined, 
        //        undefined, undefined, undefined, undefined, undefined);
        var request = $http.get('/data/'+$scope.city+'/'+$scope.timeStart+
            '/'+$scope.timeEnd+'/'+$scope.day+'/'+$scope.occassion+'/'+$scope.breakfast+'/'+
            $scope.lunch + '/' +$scope.dinner)
        .then(function (result) {
            proposalService.set(result, $scope.breakfast, $scope.lunch, $scope.dinner, 
                $scope.city, $scope.occassion, $scope.day, $scope.timeStart, $scope.timeEnd);
            //$scope.data = result;
            $window.location.href = '#proposal';
        }, function(result) {
            //some error
            console.log("ERROR");
        });
        
    
    }; 
});

app.controller('proposalController', function($scope, $http, proposalService) {
        console.log("SDSDSD")
        $scope.message="";
        $scope.breakfast = proposalService.breakfast();
        $scope.lunch = proposalService.lunch();
        $scope.dinner = proposalService.dinner();
        $scope.data = proposalService.get();
        $scope.city = proposalService.city();
        $scope.occassion= proposalService.occassion();
        $scope.day = proposalService.day();
        $scope.timeStart = proposalService.timeStart();
        $scope.timeEnd = proposalService.timeEnd();
        console.log($scope.city);
        $scope.Replace = function(x, t, ind) {
            console.log(ind)
            console.log(t)
            if (ind == -1) {
                var request = $http.get('/update/'+$scope.city+'/'+$scope.timeStart+
                '/'+$scope.timeEnd+'/'+$scope.day+'/'+t)
                .then(function (result) {

                    $scope.breakfast = result.data[Math.floor(Math.random()*result.data.length)];
                    console.log($scope.data)
                    //$window.location.href = '#proposal';
                }, function(result) {
                    //some error
                    console.log("ERROR");
                });
            } else if (ind == -2) {
                var request = $http.get('/update/'+$scope.city+'/'+$scope.timeStart+
                '/'+$scope.timeEnd+'/'+$scope.day+'/'+t)
                .then(function (result) {

                    $scope.lunch = result.data[Math.floor(Math.random()*result.data.length)];
                    console.log($scope.data)
                    //$window.location.href = '#proposal';
                }, function(result) {
                    //some error
                    console.log("ERROR");
                });
            } else if (ind == -3) {
                var request = $http.get('/update/'+$scope.city+'/'+$scope.timeStart+
                '/'+$scope.timeEnd+'/'+$scope.day+'/'+t)
                .then(function (result) {

                    $scope.dinner = result.data[Math.floor(Math.random()*result.data.length)];
                    console.log($scope.data)
                    //$window.location.href = '#proposal';
                }, function(result) {
                    //some error
                    console.log("ERROR");
                });
            } else {
                var request = $http.get('/update/'+$scope.city+'/'+$scope.timeStart+
                '/'+$scope.timeEnd+'/'+$scope.day+'/'+t)
                .then(function (result) {

                    $scope.data[ind] = result.data[Math.floor(Math.random()*result.data.length)];
                    console.log($scope.data)
                    //$window.location.href = '#proposal';
                }, function(result) {
                    //some error
                    console.log("ERROR");
                });
            }
        }
        $scope.Finalize = function() {
            // var result = 
            // proposalService.set(, $scope.breakfast, $scope.lunch, $scope.dinner, 
            //     $scope.city, $scope.occassion, $scope.day, $scope.timeStart, $scope.timeEnd);
            window.location.href='#plan'
        }

});

app.controller('planController', function($scope, $http, proposalService) {
    console.log("SDSDSD")
        $scope.message="";
        
        $scope.city   
        $scope.city = proposalService.city();
        $scope.occassion= proposalService.occassion();
        $scope.day = proposalService.day();
        $scope.timeStart = proposalService.timeStart();
        $scope.timeEnd = proposalService.timeEnd();
        console.log($scope.city);
});

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