/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BindingMode","./StaticBinding","./CompositeBinding","./FormatException","./ParseException","./ValidateException","./Context","sap/base/future","sap/base/Log","sap/base/assert","sap/ui/base/BindingInfo","sap/ui/base/Object","sap/base/util/ObjectPath","sap/ui/base/SyncPromise","sap/ui/base/ManagedObjectMetadata"],function(e,t,n,i,a,r,s,d,o,g,f,h,l,u,p){"use strict";var c={_bindObject:function(e){var t,n,i,a,r=this;var s=function(e){r.setElementBindingContext(t.getBoundContext(),i)};var d=function(e){var n=t.getDataState();if(!n){return}if(r.refreshDataState){r.refreshDataState("",n)}};i=e.model;a=this.getModel(i);n=this.getBindingContext(i);t=a.bindContext(e.path,n,e.parameters);if(e.suspended){t.suspend(true)}t.attachChange(s);e.binding=t;e.modelChangeHandler=s;e.dataStateChangeHandler=d;t.attachEvents(e.events);if(this.refreshDataState){t.attachAggregatedDataStateChange(d)}t.initialize()},_unbindObject:function(e,t,n){if(e.binding){if(!this._bIsBeingDestroyed){this._detachObjectBindingHandlers(e)}e.binding.destroy()}delete this.mElementBindingContexts[t];if(!n){this.updateBindingContext(false,t);this.propagateProperties(t);this.fireModelContextChange()}},_detachObjectBindingHandlers:function(e){if(e.binding){e.binding.detachChange(e.modelChangeHandler);e.binding.detachEvents(e.events);if(this.refreshDataState){e.binding.detachAggregatedDataStateChange(e.dataStateChangeHandler)}}},updateBindings:function(e,t){var n=this,i,a,r;function s(i){var a=i.parts,r;if(a){if(a.length==1){return(e||a[0].model==t)&&!i.binding.updateRequired(n.getModel(a[0].model))}else{for(r=0;r<a.length;r++){if((e||a[r].model==t)&&!i.binding.aBindings[r].updateRequired(n.getModel(a[r].model))){return true}}}}else{return(e||i.model==t)&&!i.binding.updateRequired(n.getModel(i.model))}}function d(e){var t=e.binding;if(n.refreshDataState){n.refreshDataState(i,t.getDataState())}t.detachChange(e.modelChangeHandler);if(e.modelRefreshHandler){t.detachRefresh(e.modelRefreshHandler)}t.detachEvents(e.events);t.destroy();delete e.binding;delete e.modelChangeHandler;delete e.dataStateChangeHandler;delete e.modelRefreshHandler}for(i in this.mObjectBindingInfos){r=this.mObjectBindingInfos[i];a=f.isReady(r,this);if(r.binding&&s(r)){d(r);if(!a){delete this.mElementBindingContexts[i]}}if(!r.binding&&a){this._bindObject(r)}}for(i in this.mBindingInfos){r=this.mBindingInfos[i];if(r.binding&&s(r)){if(this._observer){var o=r.factory?"aggregation":"property";this._observer.bindingChange(this,i,"remove",r,o)}d(r)}if(!r.binding&&f.isReady(r,this)){if(r.factory){this._bindAggregation(i,r)}else{this._bindProperty(i,r)}}}},updateProperty:function(e){var t=this.mBindingInfos[e],n=t.binding,a=this.getMetadata().getPropertyLikeSetting(e),r=this;function s(s){if(s instanceof i){r.fireFormatError({element:r,property:e,type:n.getType(),newValue:n.getValue(),oldValue:r[a._sGetter](),exception:s,message:s.message},false,true);o.error("FormatException in property '"+e+"' of '"+r+"': "+s.message+"\nHint: single properties referenced in composite bindings and within binding expressions are automatically converted "+"into the type of the bound control property, unless a different 'targetType' is specified. targetType:'any' may avoid "+"the conversion and lead to the expected behavior.");t.skipModelUpdate++;r.resetProperty(e);t.skipModelUpdate--}else{throw s}}if(t.skipPropertyUpdate){return}u.resolve().then(function(){return n.getExternalValue()}).then(function(e){t.skipModelUpdate++;r[a._sMutator](e);t.skipModelUpdate--}).catch(function(e){s(e)}).unwrap()},updateModelProperty:function(t,n,i){var s,d,o=this;function g(e){var s={element:o,property:t,type:d.getType(),newValue:n,oldValue:i,exception:e,message:e.message};if(e instanceof a){o.fireParseError(s,false,true)}else if(e instanceof r){o.fireValidationError(s,false,true)}else{throw e}}function f(){var e={element:o,property:t,type:d.getType(),newValue:n,oldValue:i};if(d.hasValidation()){o.fireValidationSuccess(e,false,true)}}if(this.isBound(t)){s=this.mBindingInfos[t];d=s.binding;if(s.skipModelUpdate||d&&d.isSuspended()){return}if(d&&d.getBindingMode()==e.TwoWay){s.skipPropertyUpdate++;u.resolve(n).then(function(e){return d.setExternalValue(e)}).then(function(){s.skipPropertyUpdate--;return d.getExternalValue()}).then(function(e){if(n!=e){o.updateProperty(t)}f()}).catch(function(e){s.skipPropertyUpdate--;g(e)}).unwrap()}}},updateAggregation:function(e,t,n){var i=this.mBindingInfos[e],a=i.binding,r=i.factory,s=this.getMetadata().getAggregation(e),o,g,f,l=s._sMutator+"Group",u=this;function c(e,t){if(u.bUseExtendedChangeDetection){return p.uid("clone")}else{return e.getId()+"-"+t}}function m(e,t,n,a){var d=e[s._sGetter]()||[],o,g;if(d.length>t.length){for(var f=t.length;f<d.length;f++){g=d[f];e[s._sRemoveMutator](g);g.destroy("KeepDom")}}for(var f=0;f<t.length;f++){o=t[f];g=d[f];if(n){n(o)}if(g){g.setBindingContext(o,i.model)}else{g=r(c(e,f),o);g.setBindingContext(o,i.model);e[s._sMutator](g)}if(a){a(o,g)}}}function b(e,t){var n=t.diff,a=e[s._sGetter]()||[],o,g,f,h;if(!n||a.length===0){m(e,t);return}for(h=0;h<n.length;h++){o=n[h];switch(o.type){case"insert":f=t[o.index];g=r(c(e,o.index),f);g.setBindingContext(f,i.model);e[s._sInsertMutator](g,o.index);break;case"delete":g=e[s._sRemoveMutator](o.index);g.destroy("KeepDom");break;default:d.errorThrows('Unknown diff type "'+o.type+'"')}}a=e[s._sGetter]()||[];for(h=0;h<a.length;h++){a[h].setBindingContext(t[h],i.model)}}function y(e){var t=a.getGroup(e);if(t.key!==o){var n;if(i.groupHeaderFactory){n=i.groupHeaderFactory(t)}u[l](t,n);o=t.key}}function C(e,t){m(e,t,null,function(e,t){C(t,a.getNodeContexts(e))})}if(h.isObjectA(a,"sap.ui.model.ListBinding")){f=a.getContexts(i.startIndex,i.length);g=a.isGrouped()&&u[l];if(g||a.bWasGrouped){this[s._sDestructor]();m(this,f,g?y:undefined)}else if(this.bUseExtendedChangeDetection){b(this,f)}else{if(!i.template){this[s._sDestructor]()}m(this,f)}a.bWasGrouped=g}else if(h.isObjectA(a,"sap.ui.model.TreeBinding")){if(!i.template){this[s._sDestructor]()}C(this,a.getRootContexts())}},updateBindingContext:function(e,t,i){var a,r={},d,o,g,f,h;function l(e){return h[e].model==d&&h[e].value===undefined}if(i){for(d in this.oModels){if(this.oModels.hasOwnProperty(d)){r[d]=d}}for(d in this.oPropagatedProperties.oModels){if(this.oPropagatedProperties.oModels.hasOwnProperty(d)){r[d]=d}}}else{r[t]=t}for(d in r){if(r.hasOwnProperty(d)){d=d==="undefined"?undefined:d;a=this.getModel(d);f=this.mObjectBindingInfos[d];if(a&&f&&!e){if(!f.binding){this._bindObject(f)}else{o=this._getBindingContext(d);var u=f.binding.getContext();if(s.hasChanged(u,o)){f.binding.setContext(o)}}continue}o=this.getBindingContext(d);for(g in this.mBindingInfos){var f=this.mBindingInfos[g],p=f.binding;h=f.parts;if(!p){continue}if(p instanceof n){p.setContext(o,{fnIsBindingRelevant:l});this.updateFieldHelp?.(g)}else if(f.factory){if(f.model==d){p.setContext(o);this.updateFieldHelp?.(g)}}else if(l(0)){p.setContext(o);this.updateFieldHelp?.(g)}}}}},refreshAggregation:function(e){var t=this.mBindingInfos[e],n=t.binding;n.getContexts(t.startIndex,t.length)},setElementBindingContext:function(e,t){g(t===undefined||typeof t==="string"&&!/^(undefined|null)?$/.test(t),"sModelName must be a string or omitted");var n=this.mElementBindingContexts[t];if(s.hasChanged(n,e)){if(e===undefined){delete this.mElementBindingContexts[t]}else{this.mElementBindingContexts[t]=e}this.updateBindingContext(true,t);this.propagateProperties(t);this.fireModelContextChange()}return this},_bindProperty:function(i,a){var r,s,o,g,f=e.TwoWay,h,u,p=this.getMetadata().getPropertyLikeSetting(i),c=p._iKind===0?p.type:p.altTypes[0],m=this,b=[],y=function(t){m.updateProperty(i);var n=o.getDataState();if(n){var r=n.getControlMessages();if(r&&r.length>0){n.setControlMessages([]);var s=sap.ui.require("sap/ui/core/Messaging");if(s){s.removeMessages(r)}}n.setInvalidValue(undefined)}if(o.getBindingMode()===e.OneTime&&o.isResolved()){o.detachChange(y);if(this.refreshDataState){o.detachAggregatedDataStateChange(C)}o.detachEvents(a.events)}},C=function(){var e=o.getDataState();if(!e){return}if(m.refreshDataState){m.refreshDataState(i,e)}},v=function(e,t){var n=e.replace(/\./g,"/");var i=sap.ui.require(n);if(!i){i=l.get(e);if(typeof i==="function"&&!i._sapUiLazyLoader){d.errorThrows("The type class '"+e+"' is exported to the global namespace without being set as an export value of a UI5 module. "+"This scenario will not be supported in the future and a separate UI5 module needs to be created which exports this type class.")}else{i=sap.ui.requireSync(n)}}if(typeof i!=="function"){throw new Error(`Cannot find type "${e}" used in control "${t.getId()}"!`)}return i};a.parts.forEach(function(n){s=m.getBindingContext(n.model);r=m.getModel(n.model);h=n.type;if(typeof h=="string"){u=v(h,m);h=new u(n.formatOptions,n.constraints)}if(n.value!==undefined){o=new t(n.value)}else{o=r.bindProperty(n.path,s,n.parameters||a.parameters)}o.setType(h,n.targetType||c);o.setFormatter(n.formatter);if(n.suspended){o.suspend(true)}g=n.mode||r&&r.getDefaultBindingMode()||e.TwoWay;o.setBindingMode(g);if(g!==e.TwoWay){f=e.OneWay}o.attachEvents(n.events);b.push(o)});if(b.length>1||a.formatter&&a.formatter.textFragments){h=a.type;if(typeof h=="string"){u=v(h,this);h=new u(a.formatOptions,a.constraints)}o=new n(b,a.useRawValues,a.useInternalValues);o.setType(h,a.targetType||c);o.setBindingMode(a.mode||f)}else{o=b[0]}o.attachChange(y);if(this.refreshDataState){o.attachAggregatedDataStateChange(C)}if(typeof a.formatter==="function"){o.setFormatter(a.formatter.bind(this))}a.binding=o;a.modelChangeHandler=y;a.dataStateChangeHandler=C;o.attachEvents(a.events);o.initialize();this.updateFieldHelp?.(i);if(this._observer){this._observer.bindingChange(this,i,"ready",a,"property")}},_unbindProperty:function(e,t){var n;n=e.binding;if(n){if(!this._bIsBeingDestroyed){this._detachPropertyBindingHandlers(t)}n.destroy();if(this.refreshDataState&&!this._bIsBeingDestroyed){n.detachAggregatedDataStateChange(e.dataStateChangeHandler)}this.updateFieldHelp?.(t)}},_detachPropertyBindingHandlers:function(e){var t=this.mBindingInfos[e],n;if(t){n=t.binding;if(n){n.detachChange(t.modelChangeHandler);n.detachEvents(t.events);if(this.refreshDataState&&this._bIsBeingDestroyed){n.detachAggregatedDataStateChange(t.dataStateChangeHandler)}}const e=t.aBindings;e?.forEach(function(e,n){e.detachEvents(t.parts[n].events)})}},_bindAggregation:function(e,t){var n=this,i,a=this.getMetadata().getAggregation(e),r=function(e){a.update(n,e.getParameter("reason"),{detailedReason:e.getParameter("detailedReason")})},s=function(e){a.refresh(n,e.getParameter("reason"))},d=function(t){var a=i.getDataState();if(!a){return}if(n.refreshDataState){n.refreshDataState(e,a)}};var o=this.getModel(t.model);if(this.isTreeBinding(e)){i=o.bindTree(t.path,this.getBindingContext(t.model),t.filters,t.parameters,t.sorter)}else{i=o.bindList(t.path,this.getBindingContext(t.model),t.sorter,t.filters,t.parameters);if(this.bUseExtendedChangeDetection){g(!this.oExtendedChangeDetectionConfig||!this.oExtendedChangeDetectionConfig.symbol,"symbol function must not be set by controls");i.enableExtendedChangeDetection(!t.template,t.key,this.oExtendedChangeDetectionConfig)}}if(t.suspended){i.suspend(true)}t.binding=i;t.modelChangeHandler=r;t.modelRefreshHandler=s;t.dataStateChangeHandler=d;i.attachChange(r);i.attachRefresh(s);i.attachEvents(t.events);if(this.refreshDataState){i.attachAggregatedDataStateChange(d)}i.initialize();if(this._observer){this._observer.bindingChange(this,e,"ready",t,"aggregation")}},_unbindAggregation:function(e,t){if(e.binding){if(!this._bIsBeingDestroyed){this._detachAggregationBindingHandlers(t)}e.binding.destroy()}},_detachAggregationBindingHandlers:function(e){var t=this.mBindingInfos[e];if(t){if(t.binding){t.binding.detachChange(t.modelChangeHandler);t.binding.detachRefresh(t.modelRefreshHandler);t.binding.detachEvents(t.events);if(this.refreshDataState){t.binding.detachAggregatedDataStateChange(t.dataStateChangeHandler)}}}}};return c});
//# sourceMappingURL=ManagedObjectBindingSupport.js.map