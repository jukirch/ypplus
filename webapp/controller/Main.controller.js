sap.ui.define([

    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "sap/f/library",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/Sorter',
    'sap/m/MessageBox'
],
    
    function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
        "use strict";

        return Controller.extend("ypshopping.controller.Main", {

            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this._bDescendingSort = false;

                this.oRouter.getRoute("Main").attachPatternMatched(this._onProductMatched, this);
                this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
                this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onSupplierMatched, this);
            },

            formatPriceWithEuro: function (sPrice) {
                // Add the € sign to the Price and return it as a formatted string
                return sPrice + " €";
            },

            onListItemPress: function (oEvent) {
                var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
                    productPath = oEvent.getSource().getSelectedItem().getBindingContext("northWind").getPath(),
                    product = productPath.split("/").slice(-1).pop();

                this.oRouter.navTo("detail", { layout: oNextUIState.layout, product: product });
            },

            onSearch: function (oEvent) {
                var oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new sap.ui.model.Filter("Name", FilterOperator.Contains, sQuery)];
                }

                this.getView().byId("productsTable").getBinding("items").filter(oTableSearchState);
            },

            onAdd: function (oEvent) {
                sap.m.MessageBox.show("This functionality is not ready yet.", {
                    icon: sap.m.MessageBox.Icon.INFORMATION,
                    title: "Aw, Snap!",
                    actions: [sap.m.MessageBox.Action.OK]
                });
            },

            onSort: function (oEvent) {
                this._bDescendingSort = !this._bDescendingSort;
                var oView = this.getView(),
                    oTable = oView.byId("productsTable"),
                    oBinding = oTable.getBinding("items"),
                    oSorter = new Sorter("Name", this._bDescendingSort);

                oBinding.sort(oSorter);
            },

            _onProductMatched: function (oEvent) {
                var sProduct = oEvent.getParameter("arguments").product || this._product || "0",
                    oTable = this.byId("productsTable");

                oTable.getItems()[oTable.getBinding("items").aIndices.indexOf(+sProduct)].setSelected(true);
            }

        });
    });
