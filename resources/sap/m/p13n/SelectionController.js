/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/base/util/array/diff","sap/ui/base/Object","sap/base/util/merge","sap/base/util/deepEqual","sap/m/p13n/SelectionPanel","sap/m/p13n/modules/xConfigAPI","sap/ui/core/Locale","sap/ui/core/Lib","sap/ui/core/mvc/View"],(e,t,n,o,i,s,r,a,p,c)=>{"use strict";const l=n.extend("sap.m.p13n.SelectionController",{constructor:function(e){n.call(this);this._oAdaptationControl=e.control;this._sPersistenceIdentifier=e.persistenceIdentifier?e.persistenceIdentifier:null;this._oMetadataHelper=e.helper?e.helper:null;this._aStableKeys=e.stableKeys||[];if(!this._oAdaptationControl){throw new Error("Always provide atleast a 'control' configuration when creating a new p13n controller!")}this._sTargetAggregation=e.targetAggregation;this._fSelector=e.getKeyForItem;this._oP13nData=null;this._bLiveMode=false;this._bResetEnabled=false;this._bReorderingEnabled=e.hasOwnProperty("enableReorder")?e.enableReorder:true}});l.prototype.getPersistenceIdentifier=function(){return this._sPersistenceIdentifier};l.prototype.getMetadataHelper=function(){return this._oMetadataHelper};l.prototype.getAdaptationControl=function(){return this._oAdaptationControl};l.prototype.getTargetAggregation=function(){return this._sTargetAggregation};l.prototype.getChangeOperations=()=>({add:"addItem",remove:"removeItem",move:"moveItem"});l.prototype.getSelectorForReset=function(){return this._oAdaptationControl};l.prototype.sanityCheck=e=>e;l.prototype.initAdaptationUI=function(e){const t=this.mixInfoAndState(e);this._oPanel=this.createUI(t);return Promise.resolve(this._oPanel)};l.prototype.createUI=function(e){const t=new s({showHeader:true,enableCount:true});t.setEnableReorder(this._bReorderingEnabled);return t.setP13nData(e.items)};const h=e=>{if(e instanceof c){return e}if(e&&typeof e.getParent==="function"){e=e.getParent();return h(e)}};l.prototype._calcPresentState=function(){const e=[],t=this.getAdaptationControl().getAggregation(this.getTargetAggregation())||[];const n=h(this.getAdaptationControl());t.forEach((t,o)=>{const i=t.getVisible()?t.data("p13nKey"):null;const s=n?n.getLocalId(t.getId()):t.getId();const r=i||(this._fSelector?this._fSelector(t):t.getVisible());if(r){e.push({key:typeof r==="boolean"?s:r})}});return e};l.prototype.getCurrentState=function(){const e=this._calcPresentState();const t=r.readConfig(this.getAdaptationControl())||{};const n=t.hasOwnProperty("aggregations")?t.aggregations[this._sTargetAggregation]:{};const o=[];if(n){Object.entries(n).forEach(([e,t])=>{o.push({key:e,position:t.position,visible:t.visible})});o.sort((e,t)=>e.position-t.position)}o.sort((e,t)=>e.position-t.position);o.forEach(({key:t})=>{const o=e.map(e=>e.key);let i=o.indexOf(t);const s=n[t].position;const r=n[t].visible!==false;const a=s!==undefined;if(r&&i===-1){e.push({key:t})}if(r&&a&&e.length>0){const t=e.splice(i,1)[0];e.splice(s,0,t);i=s}if(n[t].visible===false&&i>-1){e.splice(i,1)}});return e};l.prototype.getStateKey=()=>"items";l.prototype.getDelta=function(e){const t=this._getPresenceAttribute(e.externalAppliance);const n=e=>e.hasOwnProperty(t)&&e[t]===false?false:true;const o=e.applyAbsolute?e.changedState.filter(n):this._getFilledArray(e.existingState,e.changedState,t).filter(n);this._aStableKeys.forEach((e,t)=>{const n=this.arrayToMap(this.getCurrentState());const i=this.arrayToMap(o);const s=n[e]||t-1;if(!i.hasOwnProperty(e)){o.splice(s,0,n[e])}});e.changedState=o;if(i(e.existingState,o)){return[]}else{return this.getArrayDeltaChanges(e)}};l.prototype.getArrayDeltaChanges=function(e){const t=e.existingState;const n=e.changedState;const o=e.control;const i=e.changeOperations.add;const s=e.changeOperations.remove;const r=e.changeOperations.move;const a=e.deltaAttributes||[];const p=this._calculateDeleteInserts(t,n,a);let c=this._createAddRemoveChanges(p.deletes,o,s,a);if(r){const e=this._removeItems(t,p.deletes);const i=this._removeItems(n,p.inserts);const s=this._createMoveChanges(e,i,o,r,a);c=c.concat(s)}const l=this._createAddRemoveChanges(p.inserts,o,i,a);c=c.concat(l);return c};l.prototype._createMoveChanges=function(e,n,o,i,s){let r;let a;let p;const c=[];if(e.length===n.length){const l=e=>{let t="";s.forEach(n=>{t=t+e[n]});return t};const h=t(e,n,l);const g=[];for(let t=0;t<h.length;t++){if(h[t].type==="delete"){p=e[h[t].index];g.push(p)}else if(h[t].type==="insert"){r=n[h[t].index].key||n[h[t].index].name;a=h[t].index;g.forEach(n=>{if(r!=n.key){const o=this._indexOfByKeyName(e,n.key||n.name);if(o<h[t].index){a++}}});c.push(this._createMoveChange(r,Math.min(a,n.length),i,o))}}}return c};l.prototype._createAddRemoveChanges=function(e,t,n,o){const i=[];for(let s=0;s<e.length;s++){i.push(this._createAddRemoveChange(t,n,this._getChangeContent(e[s],o)))}return i};l.prototype._removeItems=function(e,t){let n;const o=[];for(let i=0;i<e.length;i++){n=e[i].key||e[i].name;if(this._indexOfByKeyName(t,n)===-1){o.push(e[i])}}return o};l.prototype._indexOfByKeyName=(e,t)=>{let n=-1;e.some((e,o)=>{if(e.key===t||e.name===t){n=o}return n!=-1});return n};l.prototype._calculateDeleteInserts=function(e,t,n){let i,s,r,a;const p={deletes:[],inserts:[]};for(i=0;i<e.length;i++){s=e[i].key||e[i].name;a=this._indexOfByKeyName(t,s);if(a===-1){r=o({},e[i]);p.deletes.push(r)}else if(n.length){if(this._verifyDeltaAttributes(e[i],t[a],n)){p.deletes.push(e[i]);r=o({},t[a]);r.index=a;p.inserts.push(r)}}}for(i=0;i<t.length;i++){s=t[i].key||t[i].name;if(this._indexOfByKeyName(e,s)===-1){r=o({},t[i]);r.index=i;p.inserts.push(r)}}return p};l.prototype._verifyDeltaAttributes=(e,t,n)=>{let o=false;n.some(n=>{if(!e.hasOwnProperty(n)&&t.hasOwnProperty(n)||e.hasOwnProperty(n)&&!t.hasOwnProperty(n)||e[n]!=t[n]){o=true}return o});return o};l.prototype._getChangeContent=(e,t)=>{const n={};if(e.hasOwnProperty("index")&&e.index>=0){n.index=e.index}t.forEach(t=>{if(e.hasOwnProperty(t)){n[t]=e[t]}});return n};l.prototype._createAddRemoveChange=function(e,t,n){const o=n;if(t.indexOf("set")!==0){o.value=t==this.getChangeOperations()["add"]}if(this.getTargetAggregation()){o.targetAggregation=this.getTargetAggregation()}if(this._sPersistenceIdentifier){o.persistenceIdentifier=this._sPersistenceIdentifier}const i={selectorElement:e,changeSpecificData:{changeType:t,content:o}};return i};l.prototype._createMoveChange=function(e,t,n,o){const i={key:e,targetAggregation:this.getTargetAggregation(),index:t};if(this._sPersistenceIdentifier){i.persistenceIdentifier=this._sPersistenceIdentifier}const s={selectorElement:o,changeSpecificData:{changeType:n,content:i}};return s};l.prototype._getPresenceAttribute=e=>"visible";l.prototype.getBeforeApply=()=>Promise.resolve();l.prototype.mixInfoAndState=function(e){const t=this.getCurrentState();const n=this.arrayToMap(t);const o=this.prepareAdaptationData(e,(e,t)=>{const o=n[t.name||t.key];e.visible=!!o;e.position=o?o.position:-1;return!(t.visible===false||this._aStableKeys.indexOf(t.name||t.key)>-1)});this.sortP13nData({visible:"visible",position:"position"},o.items);o.items.forEach(e=>{delete e.position});return o};l.prototype.getP13nData=function(){return this._oPanel?this._oPanel.getP13nData():this._oAdaptationModel&&this._oAdaptationModel.getProperty("/items")};l.prototype.model2State=false;l.prototype.update=function(e){if(this._oPanel){if(!this._oPanel.isDestroyed()){const t=this.mixInfoAndState(e);this._oPanel.setP13nData(t.items)}}else if(this._oAdaptationModel){const t=this.mixInfoAndState(e);this._oAdaptationModel.setProperty("/items",t.items);this._oAdaptationModel.setProperty("/itemsGrouped",t.itemsGrouped)}};l.prototype._getFilledArray=function(e,t,n){const i=o([],e);const s=o([],t);s.forEach(e=>{const t=this.arrayToMap(i);const o=t[e.key];if(!e.hasOwnProperty(n)||e[n]){let t=e.position;if(o){t=t>-1?t:o.position;const e=o.position;i.splice(t,0,i.splice(e,1)[0])}else{t=t>-1?t:i.length;i.splice(t,0,e)}i[t]=e}else if(o){i[o.position][n]=false}});return i};l.prototype.getPropertySetterChanges=function(e){const t=e.control;const n=e.existingState;const o=e.changedState;const i=e.operation;const s=e.deltaAttribute;const r=[];o.forEach(e=>{if(e.hasOwnProperty(s)){const o=n.find(t=>t.name==e.name);const a=o&&o.hasOwnProperty(s)&&o[s];const p=e[s];const c=a!==p;if(c){r.push(this._createAddRemoveChange(t,i,{[e.hasOwnProperty("key")?"key":"name"]:e.key||e.name,targetAggregation:this.getTargetAggregation(),value:e[s]}))}}});return r};l.prototype.changesToState=function(e){const t=[];e.forEach(e=>{const n=o({},e.changeSpecificData.content);const i=n.index;delete n.index;if(i!==undefined){n.position=i}if(e.changeSpecificData.changeType===this.getChangeOperations()["remove"]){n[this._getPresenceAttribute()]=false}t.push(n)});return t};l.prototype.prepareAdaptationData=function(e,t,n){const o=[];const i=n?{}:null;const s=t instanceof Function;const r=this.getMetadataHelper();const a=r?r:e;a.getProperties().forEach(e=>{const n={};n.key=e.name||e.key;n.name=e.name||e.key;if(s){const o=t(n,e);if(!o){return}}n.label=e.label||n.key;n.tooltip=e.tooltip;if(i){n.group=e.group?e.group:"BASIC";n.groupLabel=e.groupLabel;i[n.group]=i[n.group]?i[n.group]:[];i[n.group].push(n)}o.push(n)});const p={items:o};if(i){p.itemsGrouped=this._buildGroupStructure(i)}return p};l.prototype._buildGroupStructure=function(e){const t=[];Object.keys(e).forEach(n=>{this.sortP13nData("generic",e[n]);t.push({group:n,groupLabel:e[n][0].groupLabel||p.getResourceBundleFor("sap.m").getText("p13n.BASIC_DEFAULT_GROUP"),groupVisible:true,items:e[n]})});return t};l.prototype.sortP13nData=(t,n)=>{const o=t;const i=o.position;const s=o.visible;const r=new a(e.getLanguageTag()).toString();const p=window.Intl.Collator(r,{});n.sort((e,t)=>{if(e[s]&&t[s]){return(e[i]||0)-(t[i]||0)}else if(e[s]){return-1}else if(t[s]){return 1}else if(!e[s]&&!t[s]){return p.compare(e.label,t.label)}})};l.prototype.arrayToMap=e=>e.reduce((e,t,n)=>{e[t.key]=t;e[t.key].position=n;return e},{});l.prototype.destroy=function(){n.prototype.destroy.apply(this,arguments);this._oAdaptationControl=null;this._bLiveMode=null;this._oPanel=null;this._bResetEnabled=null;this._oAdaptationModel=null};return l});
//# sourceMappingURL=SelectionController.js.map