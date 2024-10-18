sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
   "use strict";

   return Controller.extend("com.mycompany.myapp.controller.Main", {
      onInit: function () {
         // Initialisierungslogik für responsives Verhalten
         this._adjustLayout();
         sap.ui.Device.resize.attachHandler(this._adjustLayout, this);
      },

      _adjustLayout: function() {
         var oView = this.getView();
         var oModel = new JSONModel({
            isPhone: sap.ui.Device.system.phone,
            isTablet: sap.ui.Device.system.tablet,
            isDesktop: sap.ui.Device.system.desktop
         });
         oView.setModel(oModel, "device");
      },

      onExit: function () {
         sap.ui.Device.resize.detachHandler(this._adjustLayout, this);
      }
   });
});