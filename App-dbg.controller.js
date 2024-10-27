sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
	"use strict";

	return Controller.extend("ui5.App", {
		onPress(oEvent) {
			const sButtonId = oEvent.getSource().getId();
			const oApp = this.byId("app");

			if (sButtonId.endsWith("next")) {
				oApp.to(this.byId("intro"), "show");
				MessageToast.show("Hello Visitor");
			} else if (sButtonId.endsWith("back")) {
				oApp.back();
			}
		},

		onInit() {
			this.getView().setModel(new JSONModel({
					features: [
						"Mr",
						"Vikram",
						"Ziegler",
						"Neuwiedenthal",
						"Hamburg",
						"Germany"
					]
				})
			);
		},

		onChange(oEvent) {
			const bState = oEvent.getParameter("state");
			this.byId("ready").setVisible(bState);
		}
	});

});