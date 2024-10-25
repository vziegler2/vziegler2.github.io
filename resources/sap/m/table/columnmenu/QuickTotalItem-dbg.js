/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"./QuickActionItem"
], function (
	QuickActionItem
) {
	"use strict";

	/**
	 * Constructor for a new <code>QuickTotalItem</code>.
	 *
	 * @param {string} [sId] ID for the new <code>QuickTotalItem</code>, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new <code>QuickTotalItem</code>
	 *
	 * @class
	 * The <code>QuickTotalItem</code> class is used for items for the <code>sap.m.table.columnmenu.QuickTotal</code>.
	 * It can be used to specify control- and application-specific items for totaling.
	 *
	 * @extends sap.m.table.columnmenu.QuickActionItem
	 *
	 * @author SAP SE
	 * @version 1.129.0
	 *
	 * @public
	 * @since 1.110
	 *
	 * @alias sap.m.table.columnmenu.QuickTotalItem
	 */
	var QuickTotalItem = QuickActionItem.extend("sap.m.table.columnmenu.QuickTotalItem", {

		metadata: {
			library: "sap.m",
			properties: {
				/**
				 * Specifies whether a total for the respective column is shown.
				 */
				totaled: { type: "boolean", defaultValue: false }
			}
		}
	});

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	QuickTotalItem.prototype.setTotaled = function(bTotaled) {
		return this.setProperty("totaled", bTotaled).updateContent();
	};

	return QuickTotalItem;
});