(function() {
    'use strict';

    angular
        .module('app.components.caret')
        .factory('caretService', caretService);

    caretService.$inject = [

    ];

    function caretService() {
        var service = {
            getPos: getPos,
            setPos: setPos
        };
        
        return service;

        ////////////////
        function getPos(element) {
            if (!element) return null; 

            if ('selectionStart' in element) {
                return element.selectionStart;
            } else if (document.selection) {
                element.focus();
                var sel = document.selection.createRange();
                var selLen = document.selection.createRange().text.length;
                sel.moveStart('character', -element.value.length);
                return sel.text.length - selLen;
            }
        }

        function setPos(element, caretPos) {
            if (!element) return; 

            if (element.createTextRange) {
                var range = element.createTextRange();
                range.move('character', caretPos);
                range.select();
            } else {
                element.focus();
                if (element.selectionStart !== undefined) {
                    element.setSelectionRange(caretPos, caretPos);
                }
            }
        }
    }
})();