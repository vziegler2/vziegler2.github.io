/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","./ChangeReason","./DataState","sap/base/Log","sap/base/util/each"],function(t,e,a,s,n){"use strict";var i;var o=[];var r=t.extend("sap.ui.model.Binding",{constructor:function(e,a,s,n){t.apply(this);this.oModel=e;this.bRelative=!a.startsWith("/");this.sPath=a;this.oContext=s;this.mParameters=n;this.bInitial=false;this.bSuspended=false;this.oDataState=null;this.bIgnoreMessages=undefined;this.bIsBeingDestroyed=undefined;this.bFiredAsync=undefined},metadata:{abstract:true,publicMethods:["getPath","getContext","getModel","attachChange","detachChange","refresh","isInitial","attachDataStateChange","detachDataStateChange","attachAggregatedDataStateChange","detachAggregatedDataStateChange","attachDataRequested","detachDataRequested","attachDataReceived","detachDataReceived","suspend","resume","isSuspended"]}});r.prototype.getPath=function(){return this.sPath};r.prototype.getContext=function(){return this.oContext};r.prototype.setContext=function(t,a){var s;if(this.oContext!=t){var n=sap.ui.require("sap/ui/core/Messaging");if(n){n.removeMessages(this.getDataState().getControlMessages(),true)}this.oContext=t;this.getDataState().reset();this.checkDataState();s={reason:e.Context};if(a&&a.detailedReason){s.detailedReason=a.detailedReason}this._fireChange(s)}};r.prototype.getDataState=function(){if(!this.oDataState){this.oDataState=new a}return this.oDataState};r.prototype.getModel=function(){return this.oModel};r.prototype.getResolvedPath=function(){return this.oModel?this.oModel.resolve(this.sPath,this.oContext):undefined};r.prototype.getIgnoreMessages=function(){if(this.bIgnoreMessages===undefined){return undefined}return this.bIgnoreMessages&&this.supportsIgnoreMessages()};r.prototype.setIgnoreMessages=function(t){this.bIgnoreMessages=t};r.prototype.supportsIgnoreMessages=function(){return false};r.prototype.attachChange=function(t,e){if(!this.hasListeners("change")){this.oModel.addBinding(this)}this.attachEvent("change",t,e)};r.prototype.detachChange=function(t,e){this.detachEvent("change",t,e);if(!this.hasListeners("change")){this.oModel.removeBinding(this)}};r.prototype.attachDataStateChange=function(t,e){this.attachEvent("DataStateChange",t,e)};r.prototype.detachDataStateChange=function(t,e){this.detachEvent("DataStateChange",t,e)};r.prototype.attachAggregatedDataStateChange=function(t,e){this.attachEvent("AggregatedDataStateChange",t,e)};r.prototype.detachAggregatedDataStateChange=function(t,e){this.detachEvent("AggregatedDataStateChange",t,e)};r.prototype._fireChange=function(t){this.fireEvent("change",t)};r.prototype.attachDataRequested=function(t,e){this.attachEvent("dataRequested",t,e)};r.prototype.detachDataRequested=function(t,e){this.detachEvent("dataRequested",t,e)};r.prototype.fireDataRequested=function(t){this.fireEvent("dataRequested",t)};r.prototype.attachDataReceived=function(t,e){this.attachEvent("dataReceived",t,e)};r.prototype.detachDataReceived=function(t,e){this.detachEvent("dataReceived",t,e)};r.prototype.fireDataReceived=function(t){this.fireEvent("dataReceived",t)};r.prototype.updateRequired=function(t){return t&&this.getModel()===t};r.prototype.hasValidation=function(){return!!this.getType()};r.prototype.checkUpdate=function(t){if(this.bSuspended&&!t){return}this._fireChange({reason:e.Change})};r.prototype.refresh=function(t){if(this.bSuspended&&!t){return}this.checkUpdate(t)};r.prototype.initialize=function(){if(!this.bSuspended){this.checkUpdate(true)}return this};r.prototype._refresh=function(t){this.refresh(t)};r.prototype.isResolved=function(){return!this.bRelative||!!this.oContext};r.prototype.isInitial=function(){return this.bInitial};r.prototype.isRelative=function(){return this.bRelative};r.prototype.attachEvents=function(t){if(!t){return this}var e=this;n(t,function(t,a){var n="attach"+t.substring(0,1).toUpperCase()+t.substring(1);if(e[n]){e[n](a)}else{s.warning(e.toString()+" has no handler for event '"+t+"'")}});return this};r.prototype.detachEvents=function(t){if(!t){return this}var e=this;n(t,function(t,a){var n="detach"+t.substring(0,1).toUpperCase()+t.substring(1);if(e[n]){e[n](a)}else{s.warning(e.toString()+" has no handler for event '"+t+"'")}});return this};r.prototype.attachRefresh=function(t,e){this.attachEvent("refresh",t,e)};r.prototype.detachRefresh=function(t,e){this.detachEvent("refresh",t,e)};r.prototype._fireRefresh=function(t){this.fireEvent("refresh",t)};r.prototype.suspend=function(){this.bSuspended=true};r.prototype.isSuspended=function(){return this.bSuspended};r.prototype.resume=function(){this.bSuspended=false;this.checkUpdate()};r.prototype.destroy=function(){var e=this.oDataState;if(this.bIsBeingDestroyed){return}this.bIsBeingDestroyed=true;if(e){var a=sap.ui.require("sap/ui/core/Messaging");if(a){a.removeMessages(e.getControlMessages(),true)}e.setModelMessages();if(e.changed()){this.fireEvent("DataStateChange",{dataState:e});this.fireEvent("AggregatedDataStateChange",{dataState:e})}delete this.oDataState}t.prototype.destroy.apply(this,arguments)};r.prototype.isDestroyed=function(){return!!this.bIsBeingDestroyed};r.prototype.checkDataState=function(t){this._checkDataState(this.getResolvedPath(),t)};r.prototype._checkDataState=function(t,e){if(!e||t&&t in e){var a=this;var s=this.getDataState();var n=function(){a.fireEvent("AggregatedDataStateChange",{dataState:s});s.changed(false);a.bFiredAsync=false};if(!this.getIgnoreMessages()){this._checkDataStateMessages(s,t)}if(s&&s.changed()){if(this.mEventRegistry["DataStateChange"]){this.fireEvent("DataStateChange",{dataState:s})}if(this.bIsBeingDestroyed){n()}else if(this.mEventRegistry["AggregatedDataStateChange"]&&!this.bFiredAsync){h(n);this.bFiredAsync=true}}}};r.prototype._checkDataStateMessages=function(t,e){if(e){t.setModelMessages(this.oModel.getMessagesByPath(e))}else{t.setModelMessages([])}};function h(t){if(!i){i=setTimeout(function(){i=undefined;var t=o;o=[];t.forEach(function(t){t()})},0)}o.push(t)}return r});
//# sourceMappingURL=Binding.js.map