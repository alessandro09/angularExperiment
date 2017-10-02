(function() {
    'use strict';

    angular
        .module('app.components.mask')
        .directive('appMask', AppMask);

    AppMask.$inject = [
        'caretService'
    ];

    function AppMask(
        caretService
    ) {
        var directive = {
            bindToController: true,
            controller: MaskController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            require: 'ngModel',
            scope: {
                appMask: '@'
            }
        };
        return directive;
        
        function link(scope, element, attrs, model) {
            var ctrl = scope.vm;
            var component = element[0];

            model.$parsers.unshift(function(viewValue) {
                var data = prepareData(viewValue);

                var newValueForView = ctrl.format(data.viewValueUnmask, data.caretPos);

                render(model, newValueForView.value);

                var caretPos = data.caretPos;

                if (data.modelValue && data.viewValueUnmask && data.viewValueUnmask.length > data.modelValue.length) {
                    caretPos = caretPos + newValueForView.increase;
                }

                caretService.setPos(component, caretPos);

                return data.viewValueUnmask;
            });

            model.$formatters.unshift(function(modelValue) {
                return ctrl.format(modelValue, modelValue).value;
            });

            function prepareData(viewValue) {
                return {
                    viewValueUnmask: ctrl.parser(viewValue),
                    caretPos: caretService.getPos(component),
                    modelValue: model.$modelValue,
                }
            }
        }

        function render(model, value) {
            model.$setViewValue(value);
            model.$render();
        }
    }

    MaskController.$inject = [
        'maskService'
    ];

    /* @ngInject */
    function MaskController (
        maskService
    ) {
        var vm = this;

        vm.format = format;
        vm.parser = parser;

        function format(modelValue, caretPos) {
            return maskService.applyMask(modelValue, vm.appMask, caretPos);
        }

        function parser(viewValue) {
            return maskService.removeMask(viewValue);
        }
    }
})();