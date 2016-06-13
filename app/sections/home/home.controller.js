angular
  .module('adminNext')
  .controller('HomeController', HomeController);


HomeController.$inject = ['$brExpansionCardManager'];
function HomeController($brExpansionCardManager) {
  $brExpansionCardManager('cardManager').removeAll();
}
