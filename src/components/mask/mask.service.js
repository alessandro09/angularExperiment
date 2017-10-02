(function() {
    'use strict';

    angular
        .module('app.components.mask')
        .factory('maskService', maskService);

    maskService.$inject = [
        
    ];

    function maskService(
        
    ) {
        var services = {
            applyMask: applyMask,
            removeMask: removeMask
        };

        return services;
        
        function applyMask(value, mask, caretPos) {
            return processMask(value, mask, caretPos);
        }

        function removeMask(value, mask) {
            return value ? value.replace(/[^\d]+/g,'') : null;
        }

        ////////////////

        function processMask(value, mask, caretPos) {
            if (!mask) return value;
            if (!value) return '';

            var maskArray = mask.split('');
            var valueArray = value.split('');

            return process(maskArray, valueArray, caretPos);
        }

        function process(maskArray, valueArray, caretPos) {
            var formattedValue = '';
            var increase = 0;

            for (var imask = 0, ivalue = 0; imask < maskArray.length && ivalue < valueArray.length; imask++) {
                var maskItem = defineExpression(maskArray[imask]);
                var valueItem = valueArray[ivalue];

                if (maskItem.substitute) {
                    ivalue++;
                    formattedValue += new RegExp(maskItem.value).exec(valueItem)[0];
                } else {
                    if ((imask + 1) >= caretPos) {
                        increase++;
                    }
                    formattedValue += maskItem.value;
                }
            }

            return {
                value: formattedValue,
                increase: increase
            };
        }

        function defineExpression(maskItem) {
            switch (maskItem) {
                case '9': return {substitute: true, value: '\\d'};
                default: return {substitute: false, value: maskItem};
            }
        }
    }
})();
