/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Element","sap/ui/core/Renderer","sap/ui/core/library","sap/ui/Device","sap/ui/core/InvisibleText"],function(e,t,i,r,n,a){"use strict";var o=e.PopinDisplay;var s=r.VerticalAlign;var p=r.TextAlign;var u=r.SortOrder;var d=t.extend("sap.m.Column",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},hAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Begin},vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:s.Inherit},styleClass:{type:"string",group:"Appearance",defaultValue:null},visible:{type:"boolean",group:"Appearance",defaultValue:true},minScreenWidth:{type:"string",group:"Behavior",defaultValue:null},demandPopin:{type:"boolean",group:"Behavior",defaultValue:false},popinHAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Begin,deprecated:true},popinDisplay:{type:"sap.m.PopinDisplay",group:"Appearance",defaultValue:o.Block},mergeDuplicates:{type:"boolean",group:"Behavior",defaultValue:false},mergeFunctionName:{type:"string",group:"Misc",defaultValue:"getText"},sortIndicator:{type:"sap.ui.core.SortOrder",group:"Appearance",defaultValue:u.None},importance:{type:"sap.ui.core.Priority",group:"Behavior",defaultValue:"None"},autoPopinWidth:{type:"float",group:"Behavior",defaultValue:8}},defaultAggregation:"header",aggregations:{header:{type:"sap.ui.core.Control",multiple:false},footer:{type:"sap.ui.core.Control",multiple:false}},associations:{headerMenu:{type:"sap.ui.core.IColumnHeaderMenu",multiple:false}},designtime:"sap/m/designtime/Column.designtime"}});d.prototype._index=-1;d.prototype._media=null;d.prototype._bForcedColumn=false;d.prototype.exit=function(){this._clearMedia()};d.prototype.setParent=function(e){t.prototype.setParent.apply(this,arguments);if(!e){delete this._initialOrder}return this};d.prototype.getTable=function(){var e=this.getParent();if(e&&e.isA("sap.m.Table")){return e}};d.prototype.informTable=function(e,t,i){var r=this.getTable();if(r){var n="onColumn"+e;if(r[n]){r[n](this,t,i)}}};d.prototype.ontouchstart=function(e){this._bTouchStartMarked=e.isMarked()};d.prototype.ontap=function(e){if(!this._bTouchStartMarked&&!e.isMarked()){this.informTable("Press")}};d.prototype.onsapspace=function(e){if(e.srcControl===this){this.informTable("Press");e.preventDefault()}};d.prototype.onsapenter=d.prototype.onsapspace;d.prototype.oncontextmenu=function(e){var t=this.getHeaderMenuInstance();if(t){t.openBy(this);e.preventDefault()}};d.prototype.invalidate=function(){var e=this.getParent();if(e&&e.bOutput){t.prototype.invalidate.apply(this,arguments)}};d.prototype._clearMedia=function(){if(this._media&&this._minWidth){this._detachMediaContainerWidthChange(this._notifyResize,this,this.getId());n.media.removeRangeSet(this.getId());this._media=null}};d.prototype._addMedia=function(){delete this._bShouldAddMedia;if(this._minWidth){n.media.initRangeSet(this.getId(),[parseFloat(this._minWidth)]);this._attachMediaContainerWidthChange(this._notifyResize,this,this.getId());this._media=this._getCurrentMediaContainerRange(this.getId());if(this._media){this._media.matches=!!this._media.from}}};d.prototype._notifyResize=function(e){if(this._media.from===e.from){return}this._media=e;this._media.matches=!!e.from;if(this.getVisible()){this.informTable("Resize")}};d.prototype._validateMinWidth=function(t){if(!t){return}if(Object.prototype.toString.call(t)!="[object String]"){throw new Error('expected string for property "minScreenWidth" of '+this)}if(Object.keys(e.ScreenSizes).indexOf(t.toLowerCase())!=-1){return}if(!/^\d+(\.\d+)?(px|em|rem)$/i.test(t)){throw new Error('invalid CSS size("px", "em", "rem" required) or sap.m.ScreenSize enumeration for property "minScreenWidth" of '+this)}};d.prototype.getCssAlign=function(e){e=e||this.getHAlign();if(e===p.Begin||e===p.End||e===p.Initial){e=i.getTextAlign(e)}return e.toLowerCase()};d.prototype.setIndex=function(e){this._index=+e};d.prototype.getIndex=function(){return this._index};d.prototype.setOrder=function(e){this._order=+e};d.prototype.getOrder=function(){return this.hasOwnProperty("_order")?this._order:this.getInitialOrder()};d.prototype.setInitialOrder=function(e){this._initialOrder=+e};d.prototype.getInitialOrder=function(){if(this.hasOwnProperty("_initialOrder")){return this._initialOrder}var e=this.getTable();if(!e){return-1}return e.indexOfColumn(this)};d.prototype._setMinScreenWidth=function(t){this._clearMedia();this._minWidth=0;if(t){t=t.toLowerCase();var i=e.ScreenSizes[t];if(i){this._minWidth=i+"px"}else if(t.endsWith("px")){this._minWidth=t}else{var r=parseFloat(e.BaseFontSize);this._minWidth=parseFloat(t)*r+"px"}var n=this.getTable();if(n&&n.isActive()){this._addMedia()}else{this._bShouldAddMedia=true}}};d.prototype.setMinScreenWidth=function(e){e=e||"";if(e==this.getMinScreenWidth()){return this}this._validateMinWidth(e);this._setMinScreenWidth(e);return this.setProperty("minScreenWidth",e)};d.prototype.setSortIndicator=function(e){this.setProperty("sortIndicator",e,true);this.$().attr("aria-sort",this.getSortIndicator().toLowerCase());return this};d.prototype.isPopin=function(){if(!this.getDemandPopin()){return false}var e=this.getTable();if(e){var t=e.getHiddenInPopin()||[];var i=t.includes(this.getImportance());if(i){return false}}return this.isHidden()};d.prototype.isHidden=function(){return this._media?!this._media.matches:false};d.prototype.setLastValue=function(e){this._lastValue=e;return this};d.prototype.clearLastValue=function(){return this.setLastValue(NaN)};d.prototype.getLastValue=function(){return this._lastValue};d.prototype.onItemsRemoved=function(){this.clearLastValue()};d.prototype.onTableRendering=function(){this.clearLastValue();if(this._bShouldAddMedia){this._addMedia()}};d.prototype.getCalculatedMinScreenWidth=function(){return parseInt(this._minWidth)||0};d.prototype.setForcedColumn=function(e){if(this._bForcedColumn==e){return}this._bForcedColumn=e;this._setMinScreenWidth(e?"":this.getMinScreenWidth())};d.prototype.getHeaderMenuInstance=function(){return t.getElementById(this.getHeaderMenu())};d.prototype.setHeader=function(e){var t=this.getHeader();if(t&&t.isA("sap.m.Label")){t.detachEvent("_change",this._onLabelPropertyChange,this);t.setIsInColumnHeaderContext(false)}this.setAggregation("header",e);var i=this.getHeader();if(i&&i.isA("sap.m.Label")){i.attachEvent("_change",this._onLabelPropertyChange,this);i.setIsInColumnHeaderContext(true)}return this};d.prototype._onLabelPropertyChange=function(e){var t=this.getTable();if(!t||e.getParameter("name")!="required"){return}if(t.bActiveHeaders||this.getHeaderMenuInstance()){this.$()[e.getSource().getRequired()?"addAriaDescribedBy":"removeAriaDescribedBy"](a.getStaticId("sap.m","CONTROL_IN_COLUMN_REQUIRED"))}};d.prototype.getFieldHelpInfo=function(){return{label:this.getHeader()?.getText?.()||""}};return d});
//# sourceMappingURL=Column.js.map