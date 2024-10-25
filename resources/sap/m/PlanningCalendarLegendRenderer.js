/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/CalendarLegendRenderer","sap/ui/core/Renderer"],function(e,t){"use strict";var n=t.extend(e);n.apiVersion=2;n.renderItemsHeader=function(e,t){var n=t._getItemsHeader();if(n&&(t.getItems().length||t.getStandardItems().length)){this._renderItemsHeader(e,n)}};n.renderAppointmentsItemsHeader=function(e,t){var n=t._getAppointmentItemsHeader();if(n&&t.getAppointmentItems().length){this._renderItemsHeader(e,n)}else if(t.getAppointmentItems().length&&(t.getItems().length||t.getStandardItems().length)){e.voidStart("hr");e.attr("role","listitem");e.voidEnd()}};n._renderItemsHeader=function(e,t){e.openStart("div");e.class("sapMPlanCalLegendHeader");e.attr("role","listitem");e.attr("aria-level","3");e.openEnd();e.text(t);e.close("div");e.voidStart("hr");e.attr("role","listitem");e.voidEnd()};n.renderAdditionalContent=function(e,t){var n=t.getAppointmentItems(),r,i,d,a=["sapUiUnifiedLegendSquareColor","sapMPlanCalLegendAppCircle"];this.renderAppointmentsItemsHeader(e,t);e.openStart("div");e.class("sapUiUnifiedLegendItems");i=t.getColumnWidth();e.style("column-width",i);e.style("-moz-column-width",i);e.style("-webkit-column-width",i);e.openEnd();for(r=0;r<n.length;r++){d="sapUiCalLegDayType"+t._getItemType(n[r],n).slice(4);this.renderLegendItem(e,d,n[r],a,r+1,n.length)}e.close("div")};return n},true);
//# sourceMappingURL=PlanningCalendarLegendRenderer.js.map