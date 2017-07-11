 var app = angular.module('smallcaseApp', []);

 app.controller('stockCtrl', function($scope, $http) {

     var price = [];
     var stocknum = [];
     //**************** Begin of json data access**********************
     $http.get('data.json').then(function(response) {
         $scope.stocksArray = [];
         var indexes = [];
         // var epsindex = [];



         $scope.stocks = response.data.price;
         $scope.eps = response.data.eps;
         // console.log(eps);


         //**************** Begin of adding data to table **********************
         $scope.addToTable = function(key, value, index, shares = 1) {
             var mystock = {};
             mystock.key = key;
             mystock.value = value;
             mystock.index = index;
             mystock.shares = shares;
             mystock.eps = $scope.eps[key];
             mystock.individualStock = function() {
                 return this.value * this.shares;
             };
             if (indexes.indexOf(index) == -1) {
                 indexes.push(index);
                 //   console.log(mystock.shares);
                 price.push(value);
                 $scope.stocksArray.push(mystock);
                 // for (var i=0; i<stocknum.length;i++) {
                 //    console.log (stocknum.length);
                 // }

             }

         };
         //****************** Begin of Incrementer and Decrementer*****************
         $scope.incrementValue = function(stock) {
             $scope.stocksArray[$scope.stocksArray.indexOf(stock)].shares++;


         };

         $scope.decrementValue = function(stock) {
             if (stock.shares < 1) {
                 stock = 0;
                 display(stock);
             } else {
                 $scope.stocksArray[$scope.stocksArray.indexOf(stock)].shares--;
             }
         };

     });

     //****************** End of Incrementer and Decrementer***********************
     // mystock.peratio = function() {
     //          return this.value*this.shares;
     //       };  
     //          if ((epsindex.indexof(index)== -1)) {
     //              epsindex.push(index);
     //              console.log(epsindex);
     //          }

     //**************** End of adding data to table*************************

     $scope.getNetWorth = function() {
         var total = 0;

         for (var i = 0; i < $scope.stocksArray.length; i++) {
             total += $scope.stocksArray[i].individualStock();
             // console.log();
         }

         return total.toFixed(2);
     };

     $scope.getPortfolioPE = function() {
         var temp = 0;
         var total = 0;
         for (var i = 0; i < $scope.stocksArray.length; i++) {
             total += $scope.stocksArray[i].eps * $scope.stocksArray[i].shares;
         }
         if (total === 0) {
             total = 1;
         }
         temp += $scope.getNetWorth() / total;
         return temp.toFixed(2);

     };


     $scope.remove = function(idx) {
         $scope.stocksArray.splice(idx, 1);
     };


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
