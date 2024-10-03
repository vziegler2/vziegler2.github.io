sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("myapp.controller.Main", {
        onInit: function () {
            var oViewModel = new JSONModel({
                salesMarkets: [
                    {key: "worldwide", text: "Worldwide"},
                    {key: "asiaAfricaAustralia", text: "Asia/Africa/Australia"},
                    {key: "centralEastEurope", text: "Central/East Europe"},
                    {key: "europe", text: "Europe"},
                    {key: "latinAmerica", text: "Latin America"},
                    {key: "middleEast", text: "Middle East"},
                    {key: "northAmerica", text: "North America"}
                ],
                countries: [
                    {key: "germany", text: "Germany"},
                    {key: "france", text: "France"},
                    {key: "italy", text: "Italy"},
                    {key: "spain", text: "Spain"},
                    {key: "uk", text: "United Kingdom"}
                ],
                selectedSalesMarkets: []
            });
            this.getView().setModel(oViewModel, "viewModel");
        },

        onMaterialGroupChange: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
            var oCheckboxContainer = this.byId("checkboxContainer");
            oCheckboxContainer.removeAllContent();

            var aCheckboxes;
            switch (sSelectedKey) {
                case "group1":
                    aCheckboxes = ["Checkbox 1", "Checkbox 2", "Checkbox 3"];
                    break;
                case "group2":
                    aCheckboxes = ["Checkbox 2", "Checkbox 3", "Checkbox 4"];
                    break;
                case "group3":
                    aCheckboxes = ["Checkbox 3", "Checkbox 4", "Checkbox 5"];
                    break;
                default:
                    aCheckboxes = [];
            }

            aCheckboxes.forEach(function (sCheckboxText) {
                var oCheckBox = new sap.m.CheckBox({
                    text: sCheckboxText,
                    selected: "{/" + sCheckboxText.replace(" ", "") + "}"
                });
                oCheckboxContainer.addContent(oCheckBox);
            });
        },

        onShowCheckboxes: function () {
            var oCheckboxContainer = this.byId("checkboxContainer");
            oCheckboxContainer.setVisible(true);
        },

        handleFileChange: function (oEvent) {
            var aFiles = oEvent.getParameter("files");
            if (aFiles && aFiles.length > 0) {
                var aFileNames = aFiles.map(function (oFile) {
                    return oFile.name;
                });
                MessageBox.information("Files selected: " + aFileNames.join(", "));

                // Here you would typically handle the file upload
                // For demonstration, we're just showing the file names
            }
        },

        onSubmitRequest: function () {
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            
            // Here you would typically send the data to a server
            // For demonstration, we're just showing the data in a message box
            MessageBox.information("Form submitted successfully!\n\n" + JSON.stringify(oData, null, 2));
        }
    });
});