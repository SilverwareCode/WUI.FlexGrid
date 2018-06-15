(function (window) {
    'use strict'

    //Web User Interface
    function defineWUI() {
        var WUI = {};
        console.log('WUI library loaded');
        WUI.alert = function () {
            alert("WUI Alert");
        };

        WUI.pop = function () {
            showPopup();
        };


        WUI.flexGrid = function (elemName,dataMapping) {

            var elem = document.getElementById(elemName);

            createFlexGrid(elem,dataMapping);

        };

        return WUI;
    }


    if (typeof (WUI) === 'undefined') {
        window.WUI = defineWUI();
    }

})(window);