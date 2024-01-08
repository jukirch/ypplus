sap.ui.define([
    "sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/f/library"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ypshopping.controller.Main", {
            onInit: function () {
                
            },
            formatPriceWithEuro: function (sPrice) {
                // Add the € sign to the Price and return it as a formatted string
                return sPrice + " €";
            },
            onListItemPress: function (oEvent) {
            }

        });
    });
