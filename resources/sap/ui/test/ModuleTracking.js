/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";const e=Array.from(document.getElementsByTagName("script")).find(e=>/ModuleTracking.js$/.test(e.getAttribute("src")));function t(e){return e&&JSON.parse(JSON.stringify(e))}var n,o="sap.ui.base.SyncPromise",i=0,r=/(=)(?=&|$)/g,c={},s=new Map;function a(e){var t,i=Object.keys(c).length+(s?s.size:0),r="Uncaught (in promise): "+i+" times\n",a,u,f,l;if(i){for(t in c){a=c[t];if(a.getResult()&&a.getResult().stack){r+=a.getResult().stack}else{r+=a.getResult()}if(a.$error.stack){r+="\n>>> SyncPromise rejected with above reason...\n"+a.$error.stack.split("\n").slice(2).join("\n")}r+="\n\n"}c={};if(s&&s.size){l=s.values();for(;;){f=l.next();if(f.done){break}u=f.value;r+=(u&&u.stack||u)+"\n\n"}s.clear()}if(e){e(r)}else if(n){n.info(`Clearing ${i} uncaught promises`,r,o)}}}if(e.getAttribute("data-uncaught-in-promise")!=="true"){window.addEventListener("unhandledrejection",function(e){if(e.reason&&e.reason.$uncaughtInPromise){return}if(s){s.set(e.promise,e.reason);e.preventDefault()}else{alert("Uncaught (in promise) "+e.reason)}});window.addEventListener("rejectionhandled",function(e){if(s){s.delete(e.promise)}})}function u(e,t){if(t){delete c[e.$id];if(n){n.info(`Promise ${e.$id} caught`,Object.keys(c),o)}return}e.$id=i++;e.$error=new Error;c[e.$id]=e;if(n){n.info(`Promise ${e.$id} rejected with ${e.getResult()}`,Object.keys(c),o)}}let f;const l={};const d=/(testId|filter)=/.test(window.location.search);function m(){if(window.__coverage__&&Object.keys(l).length){if(window.location.search.includes("moduleId=")){window.__coverage__=l}else{for(const[e,t]of Object.entries(l)){p(e,t)}}}}function g(e){if(!window.__coverage__){return undefined}if(e.endsWith(".js")){return e}const t=`${e.replace(/\./g,"/")}.js`;return Object.keys(window.__coverage__).find(e=>e.endsWith(t))}function h(e,t){const n=e.b;const o=t.b;for(const[e,t]of Object.entries(o)){const o=n[e];t.forEach((e,t)=>{o[t]=e})}}function b(e,t){for(const[n,o]of Object.entries(t)){e[n]=o}}function p(e,t){const n=g(e);if(n){const e=window.__coverage__[n];const o=t||f[n];h(e,o);b(e.f,o.f);b(e.s,o.s)}}function w(){f=t(window.__coverage__)}function _(e){const n=g(e);if(!n){return false}const o=t(window.__coverage__[n]);l[n]=o;if(d){return false}return Object.values(o.b).some(e=>e.some(e=>e===0))||Object.values(o.f).some(e=>e===0)||Object.values(o.s).some(e=>e===0)}const v=QUnit.module.bind(QUnit);function y(e,t){t=t||{};const n=t.after||function(){};const o=t.afterEach||function(){};const i=t.before||function(){};const r=t.beforeEach||function(){};t.after=function(t){if(!this.__ignoreIsolatedCoverage__&&_(e)){t.ok(false,`${e}: Coverage below 100%`)}return n.apply(this,arguments)};t.afterEach=function(e){const t=a.bind(null,e.ok.bind(e,false));function n(e){t();throw e}function i(e){if(e&&typeof e.then==="function"){return e.then(i,n)}t();return e}try{return i(o.apply(this,arguments))}catch(e){return n(e)}};t.before=function(){const t=i.apply(this,arguments);if(!this.__ignoreIsolatedCoverage__){p(e)}return t};t.beforeEach=function(){a();return r.apply(this,arguments)};v(e,t)}if(QUnit.module!==y){QUnit.module=y;sap.ui.require(["sap/base/Log","sap/ui/base/SyncPromise"],function(e,t){if(e.isLoggable(e.Level.INFO,o)){n=e}t.listener=u});QUnit.begin(()=>{document.body.style.overflow="scroll";document.getElementById("qunit-modulefilter-dropdown-list").style.maxHeight="none";document.getElementById("qunit-modulefilter-dropdown").addEventListener("click",function(e){if(e.target.tagName==="LABEL"&&e.target.innerText!=="All modules"){setTimeout(function(){document.getElementById("qunit-modulefilter-actions").firstChild.dispatchEvent(new MouseEvent("click"))})}});const e=new URLSearchParams(document.location.search);if(e.has("filter")){const t=document.createElement("button");t.type="button";t.innerText="✕";t.addEventListener("click",t=>{e.delete("filter");document.location.search=e.toString().replace(r,"")});document.querySelector(".qunit-filter button").insertAdjacentElement("beforeBegin",t)}const t=document.createElement("style");t.innerText=`\n\t\t\t\tbutton:hover {\n\t\t\t\t\tbackground-color: #DDD !important;\n\t\t\t\t}\n\t\t\t\tbutton:focus {\n\t\t\t\t\tbox-shadow: 0 0 0 2px rgba(94, 116, 11, 0.5) !important;\n\t\t\t\t}\n\t\t\t`;document.head.appendChild(t);w()});QUnit.done(()=>{m();const e=new URLSearchParams(document.location.search);if(e.has("testId")){const t=document.querySelector("#qunit-clearFilter");if(t){e.delete("testId");const n=new URL(document.location.href);n.search=e.toString().replace(r,"");t.href=n}}})}})();
//# sourceMappingURL=ModuleTracking.js.map