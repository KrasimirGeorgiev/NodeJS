### I am a Controller ###
angular.module('demoApp')
  .controller('HomeController', ['$scope', ($scope) ->
    $scope.messageOfTheDay = 'pesho is the best'
    undefined
  ])
