sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("myapp.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set data model
            var oData = {
                salesMarkets: [],
                hasFormulaContact: "",
                usedForTransportOnly: "",
                countryOfOrigin: "",
                supplier: "",
                manufacturerLink: "",
                supplierContact: "",
                materialName: "",
                materialGroup: "",
                materialType: "",
                materialSubtype: "",
                color: "",
                opacity: "",
                madeFromRenewableResources: "",
                technicalExpertGroup: "",
                materialPredecessor: "",
                recyclingTechnology: "",
                pcrContent: 0,
                pirContent: 0,
                latestDeadline: null,
                requester: "",
                groupCheckboxes: [],
                emailAddress: ""
            };

            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            // create the views based on the url/hash
            this.getRouter().initialize();
        }
    });
});
