/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/Log","sap/base/assert"],function(e,t,n){"use strict";const i={create(i){const r=Object.create(null);let o=0;i??={};const a={init(n){if(typeof n!=="function"||!(n.prototype instanceof e)){throw new TypeError("ManagedObjectRegistry mixin can only be applied to subclasses of sap.ui.base.ManagedObject")}var s=i.onDuplicate||function(e,i,r){var o=n.getMetadata().getStereotype();t.error('adding object "'+o+"\" with duplicate id '"+e+"'");throw new Error('Error: adding object "'+o+"\" with duplicate id '"+e+"'")};var c=i.onDeregister||null;n.prototype.register=function e(){var t=this.getId(),n=r[t];if(n&&n!==this){s(t,n,this);o--}r[t]=this;o++};n.prototype.deregister=function e(){var t=this.getId();if(r[t]){if(c){c(t)}delete r[t];o--}};delete a.init;Object.freeze(a)},get size(){return o},all:function(){var e=Object.create(null);return Object.assign(e,r)},get:function(e){n(e==null||typeof e==="string","id must be a string when defined");return e==null?undefined:r[e]},forEach:function(e,t){if(typeof e!=="function"){throw new TypeError(e+" is not a function")}if(t!=null){e=e.bind(t)}for(var n in r){e(r[n],n)}},filter:function(e,t){if(typeof e!=="function"){throw new TypeError(e+" is not a function")}if(t!=null){e=e.bind(t)}var n=[],i;for(i in r){if(e(r[i],i)){n.push(r[i])}}return n}};return a},apply(e,t){const n=i.create(t);n.init(e);e.registry=n}};return i});
//# sourceMappingURL=ManagedObjectRegistry.js.map