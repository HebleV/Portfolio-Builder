 var app = angular.module('smallcaseApp', []);

 app.controller('stockCtrl', function($scope, $http) {


    //**************** Begin of json data access**********************
     $http.get('data.json').then(function(response) {
         $scope.stocksArray = [];
         $scope.weight = [];
         var indexes = [];
         $scope.stocks = response.data.price;
    //**************** End of json data access**********************


    //**************** Begin of adding data to table **********************
         $scope.addToTable = function(key, value, index) {
             var mystock = {};
             mystock.key = key;
             mystock.value = value;
             mystock.index = index;
             if (indexes.indexOf(index) == -1) {
                 indexes.push(index);
                 $scope.stocksArray.push(mystock);
                 $scope.weight = mystock.value;

             }
         };
    //**************** End of adding data to table*************************


    //****************** Begin of Incrementer and Decrementer*****************
         $scope.incrementValue = function(index) {
            number =1;
             var value = parseInt(document.getElementById('number' + index).value, 10);
             value = isNaN(value) ? 1 : value;
             value++;
             document.getElementById('number' + index).value = value;
         };

         $scope.decrementValue = function(index) {
            number =1;
             value = parseInt(document.getElementById('number' + index).value, 10);
             value = isNaN(value) ? 1 : value;
             value--;
             document.getElementById('number' + index).value = value;
         };

     });

    //****************** End of Incrementer and Decrementer*****************
 });


//****************************** Begin of Filter*************************

 app.filter('objLimitTo', [function() {
     return function(obj, limit) {
         if (obj) {
             var keys = Object.keys(obj);
             if (keys.length < 1) {
                 return [];
             }
         }

         var result = {},
             count = 0;
         angular.forEach(keys, function(key) {
             if (count >= limit) {
                 return false;
             }
             result[key] = obj[key];
             count++;
         });
         return result;
     };
 }]);
//****************** End of Filter*****************