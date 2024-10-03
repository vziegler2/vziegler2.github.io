sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/CheckBox",
    "sap/m/Label",
    "sap/m/HBox"
], function (Controller, JSONModel, MessageBox, CheckBox, Label, HBox) {
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
                selectedSalesMarkets: [],
                checkboxes: [],
                uploadedFileName: ""
            });
            this.getView().setModel(oViewModel, "viewModel");
        },

        onMaterialGroupChange: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
            var oViewModel = this.getView().getModel("viewModel");

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

            var aCheckboxData = aCheckboxes.map(function(sText) {
                return {
                    text: sText,
                    selected: false,
                    hasFile: false,
                    fileName: ""
                };
            });
            oViewModel.setProperty("/checkboxes", aCheckboxData);

            this.updateCheckboxes();
        },

        updateCheckboxes: function() {
            var oViewModel = this.getView().getModel("viewModel");
            var aCheckboxData = oViewModel.getProperty("/checkboxes");
            var oCheckboxVBox = this.byId("checkboxVBox");

            oCheckboxVBox.removeAllItems();

            aCheckboxData.forEach(function (oCheckboxData, iIndex) {
                var oHBox = new HBox({
                    items: [
                        new CheckBox({
                            text: oCheckboxData.hasFile ? 
                                  oCheckboxData.text + ": " + oCheckboxData.fileName :
                                  oCheckboxData.text,
                            selected: "{viewModel>/checkboxes/" + iIndex + "/selected}",
                            enabled: "{= !${viewModel>/checkboxes/" + iIndex + "/hasFile} }",
                            select: this.onCheckboxSelect.bind(this)
                        })
                    ]
                });
                oCheckboxVBox.addItem(oHBox);
            }.bind(this));
        },

        onCheckboxSelect: function(oEvent) {
            var oViewModel = this.getView().getModel("viewModel");
            var aCheckboxData = oViewModel.getProperty("/checkboxes");
            var iIndex = parseInt(oEvent.getSource().getId().split("-").pop());
            aCheckboxData[iIndex].selected = oEvent.getParameter("selected");
            oViewModel.setProperty("/checkboxes", aCheckboxData);
        },

        onShowCheckboxes: function () {
            var oCheckboxContainer = this.byId("checkboxContainer");
            oCheckboxContainer.setVisible(true);
        },

        handleFileChange: function (oEvent) {
            var oFile = oEvent.getParameter("files")[0];
            var oViewModel = this.getView().getModel("viewModel");
            
            if (oFile) {
                var aCheckboxData = oViewModel.getProperty("/checkboxes");
                var bFileAssigned = false;

                aCheckboxData.forEach(function(oCheckbox) {
                    if (oCheckbox.selected && !oCheckbox.hasFile) {
                        oCheckbox.hasFile = true;
                        oCheckbox.fileName = oFile.name;
                        oCheckbox.selected = false;
                        bFileAssigned = true;
                    }
                });

                if (bFileAssigned) {
                    oViewModel.setProperty("/checkboxes", aCheckboxData);
                    this.updateCheckboxes();
                    MessageBox.information("File uploaded successfully: " + oFile.name);
                } else {
                    MessageBox.warning("Please select an available checkbox before uploading a file.");
                }
            }
        },

        onSubmitRequest: function () {
            var oViewModel = this.getView().getModel("viewModel");
            var oData = oViewModel.getData();
            
            // Here you would typically send the data to a server
            // For demonstration, we're just showing the data in a message box
            MessageBox.information("Form submitted successfully!\n\n" + JSON.stringify(oData, null, 2));
        }
    });
});