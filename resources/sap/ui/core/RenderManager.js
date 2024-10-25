/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./LabelEnablement","sap/ui/base/Object","sap/ui/performance/trace/Interaction","sap/base/util/uid","sap/ui/util/ActivityDetection","sap/ui/thirdparty/jquery","sap/base/security/encodeXML","sap/base/security/encodeCSS","sap/base/assert","sap/ui/performance/Measurement","sap/base/Log","sap/base/util/extend","./ControlBehavior","./InvisibleRenderer","./Patcher","./FocusHandler"],function(e,t,n,r,i,jQuery,a,s,o,l,u,f,c,d,p,h){"use strict";var g;var m=["renderControl","cleanupControlWithoutRendering","accessibilityState","icon"];var y=["write","writeEscaped","writeAcceleratorKey","writeControlData","writeElementData","writeAttribute","writeAttributeEscaped","addClass","writeClasses","addStyle","writeStyles","writeAccessibilityState","writeIcon","translate","getConfiguration","getHTML"];var b=["openStart","voidStart","attr","class","style","openEnd","voidEnd","text","unsafeHtml","close"];var v=["render","flush","destroy"];var C=document.createElement("template");var S="data-sap-ui-stylekey";var E="data-sap-ui-render";function A(){var e=this,r,s,f,c,g="",w=false,I,D="",O={},j={},T=[],N=new p,M,B;function H(){o(!(M=B=""));r=e.aBuffer=[];s=e.aRenderedControls=[];f=e.aStyleStack=[{}];I=undefined;w=false;g=""}function L(e,t){r.push(" ",e,'="',t,'"')}function F(e){var t=f[f.length-1];var n;if(e){n=e.aCustomStyleClasses}else if(e===false){n=[]}else{n=t.aCustomStyleClasses}if(t.aClasses||n){var r=[].concat(t.aClasses||[],n||[]);if(r.length){L("class",r.join(" "))}}if(!e){t.aCustomStyleClasses=null}t.aClasses=null}function q(){var e=f[f.length-1];if(e.aStyle&&e.aStyle.length){L(S,T.push(e.aStyle.join(" "))-1)}e.aStyle=null}function V(e,t){o(e&&typeof e=="string"&&/^[a-z_][a-zA-Z0-9_\-]*$/.test(e),"The "+t+" name provided '"+e+"' is not valid; it must contain alphanumeric characters, hyphens or underscores")}function U(e){o(g,"There is no open tag; '"+e+"' must not be called without an open tag")}function W(e){var t=e===undefined?!g:e;o(t,"There is an open tag; '"+g+"' tag has not yet ended with '"+(w?"voidEnd":"openEnd")+"'")}function G(e){V(e,"attr");o((e!="class"||B!="class"&&(B="attr"))&&(e!="style"||M!="style"&&(M="attr")),"Attributes 'class' and 'style' must not be written when the methods with the same name"+" have been called for the same element already")}function X(e){o(B!="attr"&&(B="class"),"Method class() must not be called after the 'class' attribute has been written for the same element");o(typeof e=="string"&&!/\s/.test(e)&&arguments.length===1,"Method 'class' must be called with exactly one class name")}function $(e){o(M!="attr"&&(M="style"),"Method style() must not be called after the 'style' attribute has been written for the same element");o(e&&typeof e=="string"&&!/\s/.test(e),"Method 'style' must be called with a non-empty string name")}this.write=function(e){o(typeof e==="string"||typeof e==="number","sText must be a string or number");r.push.apply(r,arguments);return this};this.writeEscaped=function(e,t){if(e!=null){e=a(String(e));if(t){e=e.replace(/&#xa;/g,"<br>")}r.push(e)}return this};this.writeAttribute=function(e,t){o(typeof e==="string","sName must be a string");o(typeof t==="string"||typeof t==="number"||typeof t==="boolean","value must be a string, number or boolean");r.push(" ",e,'="',t,'"');return this};this.writeAttributeEscaped=function(e,t){o(typeof e==="string","sName must be a string");r.push(" ",e,'="',a(String(t)),'"');return this};this.addStyle=function(e,t){o(typeof e==="string","sName must be a string");if(t!=null&&t!=""){o(typeof t==="string"||typeof t==="number","value must be a string or number");var n=f[f.length-1];if(!n.aStyle){n.aStyle=[]}n.aStyle.push(e+": "+t+";")}return this};this.writeStyles=function(){q();return this};this.addClass=function(e){if(e){o(typeof e==="string","sName must be a string");var t=f[f.length-1];if(!t.aClasses){t.aClasses=[]}t.aClasses.push(e)}return this};this.writeClasses=function(e){o(!e||typeof e==="boolean"||t.isObjectA(e,"sap.ui.core.Element"),"oElement must be empty, a boolean, or an sap.ui.core.Element");F(e);return this};this.openStart=function(e,n){V(e,"tag");W();o(!(M=B=""));g=e;r.push("<"+e);if(n){if(typeof n=="string"){this.attr("id",n)}else{o(n&&t.isObjectA(n,"sap.ui.core.Element"),"vControlOrId must be an sap.ui.core.Element");this.attr("id",n.getId());_(this,n)}}return this};this.openEnd=function(e){U("openEnd");W(!w);o(e===undefined||e===true,"The private parameter bExludeStyleClasses must be true or omitted!");g="";F(e===true?false:undefined);q();r.push(">");return this};this.close=function(e){V(e,"tag");W();r.push("</"+e+">");return this};this.voidStart=function(e,t){this.openStart(e,t);w=true;return this};this.voidEnd=function(e){U("voidEnd");W(w||!g);w=false;g="";F(e?false:undefined);q();r.push(">");return this};this.unsafeHtml=function(e){W();r.push(e);return this};this.text=function(e){W();if(e!=null){e=a(String(e));r.push(e)}return this};this.attr=function(e,t){G(e);if(e=="style"){f[f.length-1].aStyle=[t]}else{r.push(" ",e,'="',a(String(t)),'"')}return this};this.class=function(e){if(e){X.apply(this,arguments);var t=f[f.length-1];if(!t.aClasses){t.aClasses=[]}t.aClasses.push(a(e))}return this};this.style=function(e,t){$(e);if(t!=null&&t!=""){o(typeof t==="string"||typeof t==="number","value must be a string or number");var n=f[f.length-1];if(!n.aStyle){n.aStyle=[]}n.aStyle.push(e+": "+t+";")}return this};j.openStart=function(e,t){V(e,"tag");W();o(!(M=B=""));g=e;if(!t){N.openStart(e)}else if(typeof t=="string"){N.openStart(e,t)}else{N.openStart(e,t.getId());_(this,t)}return this};j.voidStart=function(e,t){this.openStart(e,t);w=true;return this};j.attr=function(e,t){G(e);U("attr");N.attr(e,t);return this};j.class=function(e){if(e){X.apply(this,arguments);U("class");N.class(e)}return this};j.style=function(e,t){$(e);U("style");N.style(e,t);return this};j.openEnd=function(e){if(e!==true){var t=f[f.length-1];var n=t.aCustomStyleClasses;if(n){n.forEach(N.class,N);t.aCustomStyleClasses=null}}U("openEnd");W(!w);o(e===undefined||e===true,"The private parameter bExludeStyleClasses must be true or omitted!");g="";N.openEnd();return this};j.voidEnd=function(e){if(!e){var t=f[f.length-1];var n=t.aCustomStyleClasses;if(n){n.forEach(N.class,N);t.aCustomStyleClasses=null}}U("voidEnd");W(w||!g);w=false;g="";N.voidEnd();return this};j.text=function(e){W();if(e!=null){N.text(e)}return this};j.unsafeHtml=function(e){W();N.unsafeHtml(e);return this};j.close=function(e){V(e,"tag");W();N.close(e);return this};function z(e){c=true;try{var t=new jQuery.Event("BeforeRendering");t.srcControl=e;e._bOnBeforeRenderingPhase=true;e._handleEvent(t)}finally{e._bOnBeforeRenderingPhase=false;c=false}}this.cleanupControlWithoutRendering=function(e){o(!e||t.isObjectA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!e){return}var n=e.getDomRef();if(n){z(e);A.preserveContent(n,false,false);if(!n.hasAttribute(P)){e._bNeedsRendering=false;e.bOutput=false}}};function J(e,t){if(t){z(e)}if(e.bOutput==true){var n=e.aBindParameters;if(n&&n.length>0){var i=e.$();n.forEach(function(e){i.off(e.sEventType,e.fnProxy)})}}var a=k(e);if(a==d){d.render(I?j:O,e);e.bOutput="invisible"}else if(a&&typeof a.render==="function"){var o={};if(e.aCustomStyleClasses&&e.aCustomStyleClasses.length>0){o.aCustomStyleClasses=e.aCustomStyleClasses}f.push(o);e._bRenderingPhase=true;if(I){var l=N.getCurrentNode();a.render(j,e);if(N.getCurrentNode()==l){N.unsafeHtml("",e.getId());e.bOutput=false}else{e.bOutput=true}}else{var c=r.length;a.render(O,e);e.bOutput=r.length!=c}e._bRenderingPhase=false;f.pop()}else{u.error("The renderer for class "+e.getMetadata().getName()+" is not defined or does not define a render function! Rendering of "+e.getId()+" will be skipped!")}s.push(e);e._bNeedsRendering=false;var p=e.getUIArea();if(p){p._onControlRendered(e)}}this.renderControl=function(e){o(!e||t.isObjectA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!e){return this}var n,i;var a=true;if(r.length){I=false}else if(I===undefined){z(e);a=false;i=k(e);if(A.getApiVersion(i)!=1){n=e.getDomRef()||d.getDomRef(e);if(A.isPreservedContent(n)){I=false}else{n&&h.storePatchingControlFocusInfo(n);N.setRootNode(n);I=true}}else{I=false}}else if(!D&&I){i=k(e);if(A.getApiVersion(i)==1){D=e.getId();I=false}}if(I){if(e._bNeedsRendering||!e.getParent()||N.isCreating()||!A.canSkipRendering(e)||!(n=n||e.getDomRef()||d.getDomRef(e))||n.hasAttribute(E)||n.querySelector("["+E+"]")){J(e,a)}else{N.alignWithDom(n)}}else{J(e,a);if(D&&D===e.getId()){N.unsafeHtml(r.join(""),D,Y);D="";I=true;r=[]}}return this};this.getHTML=function(e){o(e&&t.isObjectA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");var n=r;var i=r=this.aBuffer=[];this.renderControl(e);r=this.aBuffer=n;return i.join("")};function K(e){var t,n=s.length;for(t=0;t<n;t++){s[t]._sapui_bInAfterRenderingPhase=true}c=true;try{for(t=0;t<n;t++){var r=s[t];if(r.bOutput&&r.bOutput!=="invisible"){var i=new jQuery.Event("AfterRendering");i.srcControl=r;l.start(r.getId()+"---AfterRendering","AfterRendering of "+r.getMetadata().getName(),["rendering","after"]);r._handleEvent(i);l.end(r.getId()+"---AfterRendering")}}}finally{for(t=0;t<n;t++){delete s[t]._sapui_bInAfterRenderingPhase}c=false}try{h.restoreFocus(e)}catch(e){u.warning("Problems while restoring the focus after rendering: "+e,null)}for(t=0;t<n;t++){var r=s[t],a=r.aBindParameters,o;if(a&&a.length>0&&(o=r.getDomRef())){var f=jQuery(o);for(var d=0;d<a.length;d++){var p=a[d];f.on(p.sEventType,p.fnProxy)}}}}function Z(e,t,n){var a;if(!I){a=h.getControlFocusInfo();var s=r.join("");if(s&&T.length){if(n instanceof SVGElement&&n.localName!="foreignObject"){C.innerHTML="<svg>"+s+"</svg>";C.replaceWith.apply(C.content.firstChild,C.content.firstChild.childNodes)}else{C.innerHTML=s}Y(C.content.childNodes);e(C.content)}else{e(s)}}else{var o=N.getRootNode();if(o.nodeType==11){a=h.getControlFocusInfo();e(o.lastChild?o:"")}else{a=h.getPatchingControlFocusInfo()}N.reset()}K(a);H();i.refresh();if(t){t()}}function Q(e,t){var n=e.getAttribute(S);if(n!=t){return 0}e.style=T[t];e.removeAttribute(S);return 1}function Y(e){if(!T.length){return}var t=0;e.forEach(function(e){if(e.nodeType==1){t+=Q(e,t);e.querySelectorAll("["+S+"]").forEach(function(e){t+=Q(e,t)})}});T=[]}this.flush=function(e,t,r){o(typeof e==="object"&&e.ownerDocument==document,"oTargetDomNode must be a DOM element");var i=n.notifyAsyncStep();if(!t&&typeof r!=="number"&&!r){A.preserveContent(e)}Z(function(t){for(var n=0;n<s.length;n++){var i=s[n].getDomRef();if(i&&!A.isPreservedContent(i)){if(A.isInlineTemplate(i)){jQuery(i).empty()}else{jQuery(i).remove()}}}if(typeof r==="number"){if(r<=0){x(e,"prepend",t)}else{var a=e.children[r-1];if(a){x(a,"after",t)}else{x(e,"append",t)}}}else if(!r){jQuery(e).html(t)}else{x(e,"append",t)}},i,e)};this.render=function(e,r){o(e&&t.isObjectA(e,"sap.ui.core.Control"),"oControl must be a control");o(typeof r==="object"&&r.ownerDocument==document,"oTargetDomNode must be a DOM element");if(c){u.error("Render must not be called within Before or After Rendering Phase. Call ignored.",null,this);return}var i=n.notifyAsyncStep();H();this.renderControl(e);Z(function(t){if(e&&r){var n=e.getDomRef();if(!n||A.isPreservedContent(n)){n=d.getDomRef(e)||document.getElementById(R.Dummy+e.getId())}var i=n&&n.parentNode!=r;if(i){if(!A.isPreservedContent(n)){if(A.isInlineTemplate(n)){jQuery(n).empty()}else{jQuery(n).remove()}}if(t){x(r,"append",t)}}else{if(t){if(n){if(A.isInlineTemplate(n)){jQuery(n).html(t)}else{x(n,"after",t);jQuery(n).remove()}}else{x(r,"append",t)}}else{if(A.isInlineTemplate(n)){jQuery(n).empty()}else{if(!e.getParent()||!e.getParent()._onChildRerenderedEmpty||!e.getParent()._onChildRerenderedEmpty(e,n)){jQuery(n).remove()}}}}}},i,r)};this.destroy=function(){H()};var ee={};m.forEach(function(e){O[e]=j[e]=ee[e]=this[e]},this);b.forEach(function(e){O[e]=ee[e]=this[e]},this);y.forEach(function(e){O[e]=ee[e]=this[e]},this);v.forEach(function(e){ee[e]=this[e]},this);this.getRendererInterface=function(){return O};this.getInterface=function(){return ee};H()}A.prototype.getConfiguration=function(){return sap.ui.require("sap/ui/core/Configuration")};A.prototype.translate=function(e){};A.prototype.writeAcceleratorKey=function(){return this};A.prototype.writeControlData=function(e){o(e&&t.isObjectA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");this.writeElementData(e);return this};A.prototype.writeElementData=function(e){o(e&&t.isObjectA(e,"sap.ui.core.Element"),"oElement must be an sap.ui.core.Element");this.attr("id",e.getId());_(this,e);return this};A.prototype.accessibilityState=function(n,r){if(!c.isAccessibilityEnabled()){return this}if(arguments.length==1&&!t.isObjectA(n,"sap.ui.core.Element")){r=n;n=null}var i={};if(n!=null){var a=n.getMetadata();var s=function(e,t,r){var s=a.getProperty(e);if(s&&n[s._sGetter]()===r){i[t]="true"}};var o=function(t,r){var s=a.getAssociation(t);if(s&&s.multiple){var o=n[s._sGetter]();if(t=="ariaLabelledBy"){var l=e.getReferencingLabels(n);var u=l.length;if(u){var f=[];for(var c=0;c<u;c++){if(o.indexOf(l[c])<0){f.push(l[c])}}o=f.concat(o)}}if(o.length>0){i[r]=o.join(" ")}}};s("editable","readonly",false);s("enabled","disabled",false);s("visible","hidden",false);if(e.isRequired(n)){i["required"]="true"}s("selected","selected",true);s("checked","checked",true);o("ariaDescribedBy","describedby");o("ariaLabelledBy","labelledby")}if(r){var l=function(e){var t=typeof e;return e===null||t==="number"||t==="string"||t==="boolean"};var u={};var f,d,p;for(f in r){d=r[f];if(l(d)){u[f]=d}else if(typeof d==="object"&&l(d.value)){p="";if(d.append&&(f==="describedby"||f==="labelledby")){p=i[f]?i[f]+" ":""}u[f]=p+d.value}}Object.assign(i,u)}if(t.isObjectA(n,"sap.ui.core.Element")){var h=n.getParent();if(h&&h.enhanceAccessibilityState){var g=Object.assign({},i);h.enhanceAccessibilityState(n,i);if(i.canSkipRendering==false||i.canSkipRendering==undefined&&t.isObjectA(n,"sap.ui.core.Control")&&A.canSkipRendering(n)&&JSON.stringify(g)!=JSON.stringify(i)){this.attr(E,"")}delete i.canSkipRendering}}for(var m in i){if(i[m]!=null&&i[m]!==""){this.attr(m==="role"?m:"aria-"+m,i[m])}}return this};A.prototype.writeAccessibilityState=A.prototype.accessibilityState;A.prototype.icon=function(e,t,n){var i=sap.ui.require("sap/ui/core/IconPool");if(!i){u.warning("Synchronous loading of IconPool due to sap.ui.core.RenderManager#icon call. "+"Ensure that 'sap/ui/core/IconPool is loaded before this function is called","SyncXHR",null,function(){return{type:"SyncXHR",name:"rendermanager-icon"}});i=sap.ui.requireSync("sap/ui/core/IconPool")}var a=i.isIconURI(e),o=false,l,c,d,p,h;if(typeof t==="string"){t=[t]}if(a){c=i.getIconInfo(e);if(!c){u.error("An unregistered icon: "+e+" is used in sap.ui.core.RenderManager's writeIcon method.");return this}if(!t){t=[]}t.push("sapUiIcon");if(!c.suppressMirroring){t.push("sapUiIconMirrorInRTL")}}if(a){this.openStart("span")}else{this.voidStart("img")}if(Array.isArray(t)){t.forEach(function(e){this.class(e)},this)}if(a){d={"data-sap-ui-icon-content":c.content,role:"presentation",title:c.text||null};this.style("font-family","'"+s(c.fontFamily)+"'")}else{d={role:"presentation",alt:"",src:e}}n=f(d,n);if(!n.id){n.id=r()}if(n.role==="presentation"){n["aria-hidden"]=true}if(a){p=n.alt||n.title||c.text||c.name;h=n.id+"-label";if(n["aria-labelledby"]){o=true;n["aria-labelledby"]+=" "+h}else if(!n.hasOwnProperty("aria-label")){n["aria-label"]=p}}if(typeof n==="object"){for(l in n){if(n.hasOwnProperty(l)&&n[l]!==null){this.attr(l,n[l])}}}if(a){this.openEnd();if(o){this.openStart("span");this.style("display","none");this.attr("id",h);this.openEnd();this.text(p);this.close("span")}this.close("span")}else{this.voidEnd()}return this};A.prototype.writeIcon=A.prototype.icon;A.prototype.getRenderer=function(e){o(e&&t.isObjectA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return A.getRenderer(e)};var R=A.RenderPrefixes={Invisible:d.PlaceholderPrefix,Dummy:"sap-ui-dummy-",Temporary:"sap-ui-tmp-"};A.getRenderer=function(e){o(e&&t.isObjectA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return e.getMetadata().getRenderer()};A.forceRepaint=function(e){var t=e?window.document.getElementById(e):null;var n=typeof e=="string"?t:e;if(n){u.debug("forcing a repaint for "+(n.id||String(n)));var r=n.style.display;var i=document.activeElement;n.style.display="none";n.offsetHeight;n.style.display=r;if(document.activeElement!==i&&i){i.focus()}}};A.createInvisiblePlaceholderId=function(e){return d.createInvisiblePlaceholderId(e)};var w="sap-ui-preserve",I="sap-ui-static",P="data-sap-ui-preserve",D="data-sap-ui-area";function O(){var e=jQuery(document.getElementById(w));if(e.length===0){e=jQuery("<div></div>",{"aria-hidden":"true",id:w}).addClass("sapUiHidden").addClass("sapUiForcedHidden").css("width","0").css("height","0").css("overflow","hidden").appendTo(document.body)}return e}function j(e){var t=jQuery("<div></div>",{id:R.Dummy+e.id}).addClass("sapUiHidden");if(e.hasAttribute(E)){t.attr(E,"")}t.insertBefore(e)}var T=[];A.attachPreserveContent=function(e,t){A.detachPreserveContent(e);T.push({fn:e,context:t})};A.detachPreserveContent=function(e){T=T.filter(function(t){return t.fn!==e})};A.preserveContent=function(e,t,n,r){o(typeof e==="object"&&e.ownerDocument==document,"oRootNode must be a DOM element");g=g?g:sap.ui.require("sap/ui/core/Element");T.forEach(function(t){t.fn.call(t.context||A,{domNode:e})});var i=O();function a(t){while(t&&t!=e&&t.parentNode){t=t.parentNode;if(t.hasAttribute(P)){return true}if(t.hasAttribute("data-sap-ui")){break}}}function s(e,t,n){if(e===t){return true}for(var r=t.getParent();r;r=r.isA("sap.ui.core.UIComponent")?r.oContainer:r.getParent()){if(r.isA("sap.ui.core.Control")){if(!r.getVisible()){return false}var i=r.getDomRef();if(i&&!i.contains(n)){return false}}if(r===e){return true}}}function u(t){if(t.id===w||t.id===I){return}var o=t.getAttribute(P);if(o){let n;if(r){n=g.getElementById(o);if(n&&s(r,n,t)){return}}if(t===e||a(t)){j(t)}else if(n&&t.hasAttribute(E)){j(t)}h.trackFocusForPreservedElement(t);i.append(t)}else if(n&&t.id){h.trackFocusForPreservedElement(t);A.markPreservableContent(jQuery(t),t.id);i.append(t);return}if(!t.hasAttribute(D)){var l=t.firstChild;while(l){t=l;l=l.nextSibling;if(t.nodeType===1){u(t)}}}}l.start(e.id+"---preserveContent","preserveContent for "+e.id,["rendering","preserve"]);if(t){u(e)}else{jQuery(e).children().each(function(e,t){u(t)})}l.end(e.id+"---preserveContent")};A.findPreservedContent=function(e){o(typeof e==="string","sId must be a string");var t=O(),n=t.children("["+P+"='"+e.replace(/(:|\.)/g,"\\$1")+"']");return n};A.markPreservableContent=function(e,t){e.attr(P,t)};A.isPreservedContent=function(e){return e&&e.getAttribute(P)&&e.parentNode&&e.parentNode.id==w};A.getPreserveAreaRef=function(){return O()[0]};var N="data-sap-ui-template";A.markInlineTemplate=function(e){e.attr(N,"")};A.isInlineTemplate=function(e){return e&&e.hasAttribute(N)};A.getApiVersion=function(e){return e&&e.hasOwnProperty("apiVersion")?e.apiVersion:1};A.canSkipRendering=function(e,t){var n=this.getRenderer(e);var r=this.getApiVersion(n)==4;if(!r&&t!=2){return false}var i=r&&!e.hasRenderingDelegate();if(t){var a=e.getDomRef();if(a){a.toggleAttribute(E,!i)}}return i};function _(e,n){var r=n.getId();e.attr("data-sap-ui",r);if(t.isObjectA(n,"sap.ui.core.Control")&&!A.canSkipRendering(n)){e.attr(E,"")}if(n.__slot){e.attr("slot",n.__slot)}n.getCustomData().forEach(function(t){var r=t._checkWriteToDom(n);if(r){e.attr(r.key.toLowerCase(),r.value)}});var i=n.getDragDropConfig().some(function(e){return e.isDraggable(n)});if(!i){var a=n.getParent();if(a&&a.getDragDropConfig){i=a.getDragDropConfig().some(function(e){return e.isDraggable(n)})}}if(i){e.attr("draggable","true");e.attr("data-sap-ui-draggable","true")}return this}var M={before:"beforebegin",prepend:"afterbegin",append:"beforeend",after:"afterend"};function x(e,t,n){if(typeof n=="string"){e.insertAdjacentHTML(M[t],n)}else{e[t](n)}}function k(e){var t=e.getMetadata();var n=!e.getVisible()&&t.getProperty("visible")._oParent.getName()=="sap.ui.core.Control";return n?d:t.getRenderer()}return A},true);
//# sourceMappingURL=RenderManager.js.map