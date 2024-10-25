/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/m/Dialog","sap/m/Button","sap/m/IllustratedMessage","sap/m/IllustratedMessageType","sap/m/OverflowToolbar","sap/m/OverflowToolbarButton","sap/m/Title","sap/m/ToolbarSpacer","sap/m/OverflowToolbarLayoutData"],function(t,e,o,n,r,s,i,a,l,u){"use strict";var d=t.OverflowToolbarPriority;var p=t.ButtonType;var g={extendPdfViewer:function(t){t.prototype._initPopupControl=function(){var t=this;var n={contentHeight:"100%",contentWidth:"100%",horizontalScrolling:false,verticalScrolling:false,showHeader:true,buttons:[],afterClose:t._onAfterPopupClose.bind(t)},r=t.getId()+"-popup",s=r+"-popupCloseButton",i="getPopupCloseButton",a="getPopup";this._objectsRegister[i]=function(){var e=new o(s,{text:"",press:function(){t._objectsRegister.getPopup().close()}});t._objectsRegister[i]=function(){return e};return e};this._objectsRegister[a]=function(o){if(o===true){return null}var s=new e(r,n);s.addStyleClass("sapUiContentPadding");t._objectsRegister[a]=function(){return s};return s}};t.prototype._preparePopup=function(t){var e=this.getPopupButtons().slice(),o=this._objectsRegister.getPopupCloseButton(),n=this._objectsRegister.getPopupDownloadButtonControl();o.setText(this._getLibraryResourceBundle().getText("PDF_VIEWER_POPUP_CLOSE_BUTTON"));if(this.getShowDownloadButton()){e.push(n)}e.push(o);t.removeAllButtons();e.forEach(function(e){t.addButton(e)});t.setShowHeader(true);if(this.getTitle()){t.setTitle(this.getTitle())}};t.prototype._initErrorPlaceholderIllustratedMessageControl=function(){var t=this,e="getErrorPlaceholderIllustratedMessageControl";this._objectsRegister[e]=function(){var o=new n({title:t._getIllustratedMessageErrorMessage(),illustrationType:r.SimpleError,enableDefaultTitleAndDescription:false});t.setAggregation("_illustratedMessage",o);t._objectsRegister[e]=function(){o.setTitle(t._getIllustratedMessageErrorMessage());o.setIllustrationType(r.SimpleError);o.setEnableDefaultTitleAndDescription(false);return o};return o}};t.prototype._initOverflowToolbarControl=function(){var t=this,e=this.getId()+"-overflowToolbar",o=e+"-title",n="getOverflowToolbarControl";this._objectsRegister[n]=function(r){if(r===true){return null}var i=new s(e,{}),p=new a(o,{text:t.getTitle()}),g=t._objectsRegister.getToolbarDownloadButtonControl();function c(){if(t._isDisplayDownloadButton()){i.addContent(g)}else{i.removeContent(g)}g.setEnabled(t._bRenderPdfContent);p.setText(t.getTitle())}i.addStyleClass("sapUiTinyMarginBottom");i.addContent(p);i.addContent(new l);c();g.setLayoutData(new u({priority:d.NeverOverflow}));t._objectsRegister[n]=function(t){if(!t){c()}return i};return i}};t.prototype._initToolbarDownloadButtonControl=function(){var t=this,e=this.getId()+"-toolbarDownloadButton",o="getToolbarDownloadButtonControl";this._objectsRegister[o]=function(n){if(n){return null}var r=new i(e,{type:p.Transparent,icon:"sap-icon://download"});r.attachPress(t.downloadPDF.bind(t));r.setEnabled(t._bRenderPdfContent);t._objectsRegister[o]=function(){r.setEnabled(t._bRenderPdfContent);return r};return r}};t.prototype._initPopupDownloadButtonControl=function(){var t=this,e=this.getId()+"-popupDownloadButton",n="getPopupDownloadButtonControl";this._objectsRegister[n]=function(){var r=new o(e,{text:t._getLibraryResourceBundle().getText("PDF_VIEWER_DOWNLOAD_TEXT"),type:p.Emphasized});r.attachPress(t.downloadPDF.bind(t));r.setEnabled(t._bRenderPdfContent);t._objectsRegister[n]=function(){r.setEnabled(t._bRenderPdfContent);return r};return r}};t.prototype._getNonTrustedSourceIllustratedMessage=function(){var t=this._objectsRegister.getPopupDownloadButtonControl(),e=this.getAggregation("_nonTrustedIllustratedMessage");if(!e){e=new n({title:this._getLibraryResourceBundle().getText("PDF_VIEWER_NONTRUSTEDSOURCEMESSAGE_TITLE"),illustrationType:"tnt-ExternalLink",enableDefaultTitleAndDescription:false,additionalContent:[t]});this.setAggregation("_nonTrustedIllustratedMessage",e)}return e}}};return g},true);
//# sourceMappingURL=PDFViewerRenderManager.js.map