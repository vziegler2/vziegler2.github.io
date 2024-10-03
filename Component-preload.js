//@ui5-bundle myfirstui5app/Component-preload.js
sap.ui.predefine("myfirstui5app/Component", ["sap/ui/core/UIComponent"],function(e){"use strict";return e.extend("myfirstui5app.Component",{metadata:{manifest:"json"}})});
sap.ui.require.preload({
	"myfirstui5app/manifest.json":'{"sap.app":{"id":"myfirstui5app","type":"application","i18n":"i18n/i18n.properties","title":"My First SAP UI5 App","applicationVersion":{"version":"1.0.0"}},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}}}'
});
//# sourceMappingURL=Component-preload.js.map
