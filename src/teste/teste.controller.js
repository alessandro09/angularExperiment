(function() {
    'use strict';

    angular
        .module('app.teste')
        .controller('TesteController', TesteController);

    TesteController.$inject = [

    ];

    function TesteController() {
        var vm = this;
        vm.teste = '07823771900';
        

        activate();

        ////////////////

        function activate() { }
    }
})();