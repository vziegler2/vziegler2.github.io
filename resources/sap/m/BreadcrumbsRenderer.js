/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Text"],function(e){"use strict";var t={apiVersion:2};t.render=function(e,t){var n=t._getControlsForBreadcrumbTrail(),r=t._getSelect(),a=t._sSeparatorSymbol,s=t._getInvisibleText().getId(),i=t.getAriaLabelledBy().slice();e.openStart("nav",t);e.class("sapMBreadcrumbs");i.push(s);e.accessibilityState(null,{labelledby:{value:i.join(" "),append:true}});if(t._iMinWidth&&t._iMinWidth!==t.MIN_WIDTH_IN_OFT){e.style("min-width",t._iMinWidth+"px")}e.openEnd();e.openStart("ol");e.openEnd();if(r.getVisible()){this._renderControlInListItem(e,r,a,false,"sapMBreadcrumbsSelectItem")}n.forEach(function(t,r){this._renderControlInListItem(e,t,a,t.hasStyleClass("sapMBreadcrumbsCurrentLocation"),undefined,r,n.length)},this);e.close("ol");e.close("nav")};t._renderControlInListItem=function(e,t,n,r,a,s,i){e.openStart("li");e.class("sapMBreadcrumbsItem");e.class(a);e.openEnd();e.renderControl(t);if(!r){e.openStart("span").class("sapMBreadcrumbsSeparator").attr("aria-hidden",true).openEnd().text(n).close("span")}e.close("li")};return t},true);
//# sourceMappingURL=BreadcrumbsRenderer.js.map