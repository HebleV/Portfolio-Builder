 var app = angular.module('smallcaseApp', []);

 app.controller('stockCtrl', function($scope, $http) {

     var price = [];
     var stocknum = [];
     $scope.stocksArray = [];

     //**************** Begin of json data access**********************
     $http.get('data.json').then(function(response) {

         var indexes = [];
         $scope.stocks = response.data.price;
         $scope.eps = response.data.eps;


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

                 price.push(value);
                 $scope.stocksArray.push(mystock);

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


     // *******************Getting P/E ratio and networth values*****************

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
         $scope.stocksArray.splice(idx, 1);     //Delete Stocks
     };

 });
