import"wired-card";import"fecha";import"https://unpkg.com/app-datepicker@4.4.1/dist/app-datepicker.js?module";import{LitElement as e,html as t,css as i}from"https://unpkg.com/lit-element@2.4.0/lit-element.js?module";import{mdiCalendar as s,mdiCheck as r,mdiClose as n,mdiMenuUp as a,mdiMenuDown as o}from"https://unpkg.com/@mdi/js@5.8.55/mdi.js?module";import{Map as l,Icon as d,TileLayer as c,Browser as p,Marker as h,Polyline as u,LatLngBounds as m}from"https://unpkg.com/leaflet@1.7.1/dist/leaflet-src.esm.js?module";function f(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t,i){return(g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,i){var s=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=y(e)););return e}(e,t);if(s){var r=Object.getOwnPropertyDescriptor(s,t);return r.get?r.get.call(i):r.value}})(e,t,i||e)}function v(e){return function(e){if(Array.isArray(e))return e}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return _(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return _(e,t)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,s=new Array(t);i<t;i++)s[i]=e[i];return s}function w(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var s=i.call(e,t||"default");if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}function b(){b=function(){return e};var e={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function(e,t){["method","field"].forEach((function(i){t.forEach((function(t){t.kind===i&&"own"===t.placement&&this.defineClassElement(e,t)}),this)}),this)},initializeClassElements:function(e,t){var i=e.prototype;["method","field"].forEach((function(s){t.forEach((function(t){var r=t.placement;if(t.kind===s&&("static"===r||"prototype"===r)){var n="static"===r?e:i;this.defineClassElement(n,t)}}),this)}),this)},defineClassElement:function(e,t){var i=t.descriptor;if("field"===t.kind){var s=t.initializer;i={enumerable:i.enumerable,writable:i.writable,configurable:i.configurable,value:void 0===s?void 0:s.call(e)}}Object.defineProperty(e,t.key,i)},decorateClass:function(e,t){var i=[],s=[],r={static:[],prototype:[],own:[]};if(e.forEach((function(e){this.addElementPlacement(e,r)}),this),e.forEach((function(e){if(!k(e))return i.push(e);var t=this.decorateElement(e,r);i.push(t.element),i.push.apply(i,t.extras),s.push.apply(s,t.finishers)}),this),!t)return{elements:i,finishers:s};var n=this.decorateConstructor(i,t);return s.push.apply(s,n.finishers),n.finishers=s,n},addElementPlacement:function(e,t,i){var s=t[e.placement];if(!i&&-1!==s.indexOf(e.key))throw new TypeError("Duplicated element ("+e.key+")");s.push(e.key)},decorateElement:function(e,t){for(var i=[],s=[],r=e.decorators,n=r.length-1;n>=0;n--){var a=t[e.placement];a.splice(a.indexOf(e.key),1);var o=this.fromElementDescriptor(e),l=this.toElementFinisherExtras((0,r[n])(o)||o);e=l.element,this.addElementPlacement(e,t),l.finisher&&s.push(l.finisher);var d=l.extras;if(d){for(var c=0;c<d.length;c++)this.addElementPlacement(d[c],t);i.push.apply(i,d)}}return{element:e,finishers:s,extras:i}},decorateConstructor:function(e,t){for(var i=[],s=t.length-1;s>=0;s--){var r=this.fromClassDescriptor(e),n=this.toClassDescriptor((0,t[s])(r)||r);if(void 0!==n.finisher&&i.push(n.finisher),void 0!==n.elements){e=n.elements;for(var a=0;a<e.length-1;a++)for(var o=a+1;o<e.length;o++)if(e[a].key===e[o].key&&e[a].placement===e[o].placement)throw new TypeError("Duplicated element ("+e[a].key+")")}}return{elements:e,finishers:i}},fromElementDescriptor:function(e){var t={kind:e.kind,key:e.key,placement:e.placement,descriptor:e.descriptor};return Object.defineProperty(t,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===e.kind&&(t.initializer=e.initializer),t},toElementDescriptors:function(e){if(void 0!==e)return v(e).map((function(e){var t=this.toElementDescriptor(e);return this.disallowProperty(e,"finisher","An element descriptor"),this.disallowProperty(e,"extras","An element descriptor"),t}),this)},toElementDescriptor:function(e){var t=String(e.kind);if("method"!==t&&"field"!==t)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+t+'"');var i=w(e.key),s=String(e.placement);if("static"!==s&&"prototype"!==s&&"own"!==s)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+s+'"');var r=e.descriptor;this.disallowProperty(e,"elements","An element descriptor");var n={kind:t,key:i,placement:s,descriptor:Object.assign({},r)};return"field"!==t?this.disallowProperty(e,"initializer","A method descriptor"):(this.disallowProperty(r,"get","The property descriptor of a field descriptor"),this.disallowProperty(r,"set","The property descriptor of a field descriptor"),this.disallowProperty(r,"value","The property descriptor of a field descriptor"),n.initializer=e.initializer),n},toElementFinisherExtras:function(e){return{element:this.toElementDescriptor(e),finisher:P(e,"finisher"),extras:this.toElementDescriptors(e.extras)}},fromClassDescriptor:function(e){var t={kind:"class",elements:e.map(this.fromElementDescriptor,this)};return Object.defineProperty(t,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),t},toClassDescriptor:function(e){var t=String(e.kind);if("class"!==t)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+t+'"');this.disallowProperty(e,"key","A class descriptor"),this.disallowProperty(e,"placement","A class descriptor"),this.disallowProperty(e,"descriptor","A class descriptor"),this.disallowProperty(e,"initializer","A class descriptor"),this.disallowProperty(e,"extras","A class descriptor");var i=P(e,"finisher");return{elements:this.toElementDescriptors(e.elements),finisher:i}},runClassFinishers:function(e,t){for(var i=0;i<t.length;i++){var s=(0,t[i])(e);if(void 0!==s){if("function"!=typeof s)throw new TypeError("Finishers must return a constructor.");e=s}}return e},disallowProperty:function(e,t,i){if(void 0!==e[t])throw new TypeError(i+" can't have a ."+t+" property.")}};return e}function x(e){var t,i=w(e.key);"method"===e.kind?t={value:e.value,writable:!0,configurable:!0,enumerable:!1}:"get"===e.kind?t={get:e.value,configurable:!0,enumerable:!1}:"set"===e.kind?t={set:e.value,configurable:!0,enumerable:!1}:"field"===e.kind&&(t={configurable:!0,writable:!0,enumerable:!0});var s={kind:"field"===e.kind?"field":"method",key:i,placement:e.static?"static":"field"===e.kind?"own":"prototype",descriptor:t};return e.decorators&&(s.decorators=e.decorators),"field"===e.kind&&(s.initializer=e.value),s}function S(e,t){void 0!==e.descriptor.get?t.descriptor.get=e.descriptor.get:t.descriptor.set=e.descriptor.set}function k(e){return e.decorators&&e.decorators.length}function E(e){return void 0!==e&&!(void 0===e.value&&void 0===e.writable)}function P(e,t){var i=e[t];if(void 0!==i&&"function"!=typeof i)throw new TypeError("Expected '"+t+"' to be a function");return i}const C="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,$=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},D=`{{lit-${String(Math.random()).slice(2)}}}`,T=`\x3c!--${D}--\x3e`,A=new RegExp(`${D}|${T}`);class N{constructor(e,t){this.parts=[],this.element=t;const i=[],s=[],r=document.createTreeWalker(t.content,133,null,!1);let n=0,a=-1,o=0;const{strings:l,values:{length:d}}=e;for(;o<d;){const e=r.nextNode();if(null!==e){if(a++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)O(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=l[o],i=V.exec(t)[2],s=i.toLowerCase()+"$lit$",r=e.getAttribute(s);e.removeAttribute(s);const n=r.split(A);this.parts.push({type:"attribute",index:a,name:i,strings:n}),o+=n.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),r.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(D)>=0){const s=e.parentNode,r=t.split(A),n=r.length-1;for(let t=0;t<n;t++){let i,n=r[t];if(""===n)i=z();else{const e=V.exec(n);null!==e&&O(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(n)}s.insertBefore(i,e),this.parts.push({type:"node",index:++a})}""===r[n]?(s.insertBefore(z(),e),i.push(e)):e.data=r[n],o+=n}}else if(8===e.nodeType)if(e.data===D){const t=e.parentNode;null!==e.previousSibling&&a!==n||(a++,t.insertBefore(z(),e)),n=a,this.parts.push({type:"node",index:a}),null===e.nextSibling?e.data="":(i.push(e),a--),o++}else{let t=-1;for(;-1!==(t=e.data.indexOf(D,t+1));)this.parts.push({type:"node",index:-1}),o++}}else r.currentNode=s.pop()}for(const e of i)e.parentNode.removeChild(e)}}const O=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},I=e=>-1!==e.index,z=()=>document.createComment(""),V=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function M(e,t){const{element:{content:i},parts:s}=e,r=document.createTreeWalker(i,133,null,!1);let n=j(s),a=s[n],o=-1,l=0;const d=[];let c=null;for(;r.nextNode();){o++;const e=r.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==a&&a.index===o;)a.index=null!==c?-1:a.index-l,n=j(s,n),a=s[n]}d.forEach((e=>e.parentNode.removeChild(e)))}const R=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},j=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(I(t))return i}return-1};const U=new WeakMap,L=e=>"function"==typeof e&&U.has(e),q={},F={};class H{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=C?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,s=document.createTreeWalker(e,133,null,!1);let r,n=0,a=0,o=s.nextNode();for(;n<i.length;)if(r=i[n],I(r)){for(;a<r.index;)a++,"TEMPLATE"===o.nodeName&&(t.push(o),s.currentNode=o.content),null===(o=s.nextNode())&&(s.currentNode=t.pop(),o=s.nextNode());if("node"===r.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(o.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(o,r.name,r.strings,this.options));n++}else this.__parts.push(void 0),n++;return C&&(document.adoptNode(e),customElements.upgrade(e)),e}}const B=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),W=` ${D} `;class J{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let s=0;s<e;s++){const e=this.strings[s],r=e.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===e.indexOf("--\x3e",r+1);const n=V.exec(e);t+=null===n?e+(i?W:T):e.substr(0,n.index)+n[1]+n[2]+"$lit$"+n[3]+D}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==B&&(t=B.createHTML(t)),e.innerHTML=t,e}}const G=e=>null===e||!("object"==typeof e||"function"==typeof e),Z=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class X{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new K(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!Z(e))return e}let s="";for(let r=0;r<t;r++){s+=e[r];const t=i[r];if(void 0!==t){const e=t.value;if(G(e)||!Z(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class K{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===q||G(e)&&e===this.value||(this.value=e,L(e)||(this.committer.dirty=!0))}commit(){for(;L(this.value);){const e=this.value;this.value=q,e(this)}this.value!==q&&this.committer.commit()}}class Q{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(z()),this.endNode=e.appendChild(z())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=z()),e.__insert(this.endNode=z())}insertAfterPart(e){e.__insert(this.startNode=z()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;L(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=q,e(this)}const e=this.__pendingValue;e!==q&&(G(e)?e!==this.value&&this.__commitText(e):e instanceof J?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):Z(e)?this.__commitIterable(e):e===F?(this.value=F,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof H&&this.value.template===t)this.value.update(e.values);else{const i=new H(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const r of e)i=t[s],void 0===i&&(i=new Q(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(r),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){$(this.startNode.parentNode,e.nextSibling,this.endNode)}}class Y{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;L(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=q,e(this)}if(this.__pendingValue===q)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=q}}class ee extends X{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new te(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class te extends K{}let ie=!1;(()=>{try{const e={get capture(){return ie=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class se{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;L(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=q,e(this)}if(this.__pendingValue===q)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=re(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=q}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const re=e=>e&&(ie?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function ne(e){let t=ae.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},ae.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(D);return i=t.keyString.get(s),void 0===i&&(i=new N(e,e.getTemplateElement()),t.keyString.set(s,i)),t.stringsArray.set(e.strings,i),i}const ae=new Map,oe=new WeakMap;const le=new class{handleAttributeExpressions(e,t,i,s){const r=t[0];if("."===r){return new ee(e,t.slice(1),i).parts}if("@"===r)return[new se(e,t.slice(1),s.eventContext)];if("?"===r)return[new Y(e,t.slice(1),i)];return new X(e,t,i).parts}handleTextExpression(e){return new Q(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const de=(e,...t)=>new J(e,t,"html",le),ce=(e,t)=>`${e}--${t}`;let pe=!0;void 0===window.ShadyCSS?pe=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),pe=!1);const he=e=>t=>{const i=ce(t.type,e);let s=ae.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},ae.set(i,s));let r=s.stringsArray.get(t.strings);if(void 0!==r)return r;const n=t.strings.join(D);if(r=s.keyString.get(n),void 0===r){const i=t.getTemplateElement();pe&&window.ShadyCSS.prepareTemplateDom(i,e),r=new N(t,i),s.keyString.set(n,r)}return s.stringsArray.set(t.strings,r),r},ue=["html","svg"],me=new Set,fe=(e,t,i)=>{me.add(e);const s=i?i.element:document.createElement("template"),r=t.querySelectorAll("style"),{length:n}=r;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(s,e);const a=document.createElement("style");for(let e=0;e<n;e++){const t=r[e];t.parentNode.removeChild(t),a.textContent+=t.textContent}(e=>{ue.forEach((t=>{const i=ae.get(ce(t,e));void 0!==i&&i.keyString.forEach((e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{i.add(e)})),M(e,i)}))}))})(e);const o=s.content;i?function(e,t,i=null){const{element:{content:s},parts:r}=e;if(null==i)return void s.appendChild(t);const n=document.createTreeWalker(s,133,null,!1);let a=j(r),o=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===i&&(o=R(t),i.parentNode.insertBefore(t,i));-1!==a&&r[a].index===l;){if(o>0){for(;-1!==a;)r[a].index+=o,a=j(r,a);return}a=j(r,a)}}(i,a,o.firstChild):o.insertBefore(a,o.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){o.insertBefore(a,o.firstChild);const e=new Set;e.add(a),M(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const ye={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},ge=(e,t)=>t!==e&&(t==t||e==e),ve={attribute:!0,type:String,converter:ye,reflect:!1,hasChanged:ge};class _e extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=ve){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const r=this[e];this[t]=s,this.requestUpdateInternal(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||ve}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=ge){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||ye,r="function"==typeof s?s:s.fromAttribute;return r?r(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||ye.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=ve){const s=this.constructor,r=s._attributeNameForProperty(e,i);if(void 0!==r){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(r):this.setAttribute(r,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const r=this.constructor;i=i||r.getPropertyOptions(e),r._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}_e.finalized=!0;const we=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};const be=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xe=Symbol();class Se{constructor(e,t){if(t!==xe)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(be?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ke=(e,...t)=>{const i=t.reduce(((t,i,s)=>t+(e=>{if(e instanceof Se)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1]),e[0]);return new Se(i,xe)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Ee={};class Pe extends _e{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),s=[];i.forEach((e=>s.unshift(e))),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!be){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Se(String(t),xe)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?be?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Ee&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Ee}}Pe.finalized=!0,Pe.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,r=oe.has(t),n=pe&&11===t.nodeType&&!!t.host,a=n&&!me.has(s),o=a?document.createDocumentFragment():t;if(((e,t,i)=>{let s=oe.get(t);void 0===s&&($(t,t.firstChild),oe.set(t,s=new Q(Object.assign({templateFactory:ne},i))),s.appendInto(t)),s.setValue(e),s.commit()})(e,o,Object.assign({templateFactory:he(s)},i)),a){const e=oe.get(o);oe.delete(o);const i=e.value instanceof H?e.value.template:void 0;fe(s,o,i),$(t,t.firstChild),t.appendChild(o),oe.set(t,e)}!r&&n&&window.ShadyCSS.styleElement(t.host)},function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}();customElements.define("ha-route-day-picker",class extends e{constructor(){super(),this.open=!1}static get properties(){return{hass:{type:Object},date:{type:Date},open:{type:Boolean}}}get _daypicker(){return this.shadowRoot.querySelector(".route-day-picker")}render(){return t`
      <div @click=${this._openDateRange} class="date-range-inputs">
        <ha-svg-icon .path=${s}></ha-svg-icon>
        <paper-input
          .value=${this.date.toLocaleString(this.hass.language,{year:"numeric",month:"long",day:"numeric"})}
          .label=${this.hass.localize("ui.dialogs.helper_settings.input_datetime.date")}
          .disabled=${this.disabled}
          readonly
        ></paper-input>
      </div>
      <div @click=${this._closeDateRange} class="route-day-picker-scrim${this.open?" route-day-picker-opened":""}"></div>
      <div class="route-day-picker-dialog${this.open?" route-day-picker-opened":""}">
        <app-datepicker class="route-day-picker"
          min="2020-01-01"
          max="${(new Date).toDateString()}"
          value="${this.date.toDateString()}"
          locale="${this.hass.language}"
          inline
        label="Label" placeholder="Placeholder"></app-datepicker>
        <div class="route-day-picker-footer">
          <mwc-button @click=${this._closeDateRange} slot="secondaryAction">
            ${this.hass.localize("ui.common.cancel")}
          </mwc-button>
          <mwc-button @click=${this._applyDateRange} slot="primaryAction">
            ${this.hass.localize("ui.components.date-range-picker.select")}
          </mwc-button>
        </div>
      </div>
    `}static get styles(){return i`
      :host {
        margin-right: 16px;
        max-width: 100%;
      }

      :host([narrow]) {
        margin-right: 0px;
      }

      app-datepicker {
        --app-datepicker-border-top-left-radius: var(--ha-card-border-radius, 4px);
        --app-datepicker-border-top-right-radius: var(--ha-card-border-radius, 4px);
        --app-datepicker-border-bottom-right-radius: var(--ha-card-border-radius, 4px);
        --app-datepicker-border-bottom-left-radius: var(--ha-card-border-radius, 4px);
        --app-datepicker-accent-color: var(--primary-color);
        --app-datepicker-focused-day-color: var(--text-primary-color);
        --app-datepicker-color: var(--secondary-text-color);
        --app-datepicker-weekday-color: var(--secondary-text-color);
        --app-datepicker-disabled-day-color: var(--disabled-text-color);
        --app-datepicker-bg-color: var(--card-background-color);
      }

      .route-day-picker-scrim {
        display: none;
        position: fixed;
        top: 0px;
        left: 0px;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        z-index: 3000;
      }
      
      .route-day-picker-dialog {
        background-color: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 4px);
        position: absolute;
        z-index: 3001;
        display: none;
      }
      
      .route-day-picker-opened {
        display: block;
      }
      
      .route-day-picker-footer {
        display: flex;
        justify-content: flex-end;
        padding: 8px;
        border-top: 1px solid var(--divider-color);
      }

      ha-svg-icon {
        margin-right: 8px;
      }

      .date-range-inputs {
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      @media only screen and (max-width: 500px) {
        paper-input {
          min-width: inherit;
        }
        ha-svg-icon {
          display: none;
        }
      }
    `}_openDateRange(){this.open=!0}_closeDateRange(){this.open=!1}_applyDateRange(){this.date=new Date(this._daypicker.value);let e=new CustomEvent("change",{detail:{date:this.date}});this.dispatchEvent(e),this._closeDateRange()}});customElements.define("entity-multiselect-picker",class extends e{constructor(){super(),this.open=!1,this.searchValue=""}static get properties(){return{hass:{type:Object},entityIds:{type:Map},selectedEntityIds:{type:Array},searchValue:{type:String},open:{type:Boolean}}}renderEntityId(e){const i=this.selectedEntityIds.includes(e[0]);return t`
      <div @click=${this._handleEntityClick} class="multiselect-list-element-container">
        <div class="multiselect-list-element-check">
          ${i?t`<ha-svg-icon
            .path=${r}
          ></ha-svg-icon>`:t``}
        </div>
        <div class="multiselect-list-element">
          <div>${e[1]}</div>
          <div class="secondary">${e[0]}</div>
        </div>
      </div>`}get _inputElement(){return this.shadowRoot.querySelector(".paper-input-input")}get _filteredentityIds(){return this.searchValue?[...this.entityIds].filter((([e,t])=>e.includes(this.searchValue)||t.includes(this.searchValue))):[...this.entityIds]}render(){return t`
      <div class="multiselect" role="combobox" aria-expanded="true">
        <paper-input-container 
          @click=${this._openMultiselectPopup}
          .alwaysFloatLabel = ${this.selectedEntityIds.length>0||this.searchValue}
          class="input"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
        >
          <div class="suffix" slot="suffix">
            ${this.selectedEntityIds.length>0||this.searchValue?t`
                <mwc-icon-button
                  .label=${this.hass.localize("ui.components.entity.entity-picker.clear")}
                  tabindex="-1"
                  @click=${this._clearValues}
                  no-ripple
                >
                  <ha-svg-icon .path=${n}></ha-svg-icon>
                </mwc-icon-button>
              `:""}
            <mwc-icon-button
              .label=${this.hass.localize("ui.components.entity.entity-picker.show_entities")}
              class="toggle-button"
              tabindex="-1"
            >
              <ha-svg-icon
                .path=${this.open?a:o}
              ></ha-svg-icon>
            </mwc-icon-button>
          </div>
          <label slot="label">${void 0===this.label?this.hass.localize("ui.components.entity.entity-picker.entity"):this.label}</label>
          <div bind-value="" slot="input" class="multiselect-input-element" id="input-1">
            ${this.selectedEntityIds.length>0?this.selectedEntityIds.map((e=>t`
                  <div class="multiselect-tag">
                    <div class="multiselect-tag-text">${this.entityIds.get(e)}</div>
                    <mwc-icon-button
                      .label=${this.hass.localize("ui.components.entity.entity-picker.clear")}
                      class="multiselect-tag-remove-button"
                      tabindex="-1"
                      @click=${this._clearValue}
                      no-ripple
                    >
                      <ha-svg-icon .path=${n}></ha-svg-icon>
                    </mwc-icon-button>
                  </div>
                `)):""}
            <input 
              @input=${this._searchValueChanged} 
              value="${this.searchValue}" 
              class="paper-input-input" 
              autocomplete="off" 
              placeholder="" 
              autocapitalize="none" 
              autocorrect="off" 
              aria-describedby="" 
              aria-labelledby="paper-input-label-2"
            >
          </div>
        </paper-input-container>
        <div @click=${this._closeMultiselectPopup} class="multiselect-scrim ${this.open?"multiselect-opened":""}"></div>
        <div class="multiselect-popup ${this.open?"multiselect-opened":""}">
          <div class="multiselect-list">
            ${this._filteredentityIds.map((e=>this.renderEntityId(e)))}
          </div>
        </div>
      </div>
    `}static get styles(){return i`
      :host {
        display: inline-block;
        flex-grow: 1;
        max-width: 800px;
      }

      :host([narrow]) {
        max-width: none;
        width: 100%;
      }

      .multiselect {
        width: 100%;
      }

      .multiselect-tag {
        cursor: pointer;
        display: flex; 
        padding: 3px;
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color); 
        border-radius: 15px; 
        margin: 0px 2px 2px 0px; 
        line-height: 1;
      }

      .multiselect-input-element{
        display: flex;
      }

      .multiselect-input-element .paper-input-input {
        padding: var(--paper-input-container-shared-input-style_-_padding); 
        width: var(--paper-input-container-shared-input-style_-_width); 
        max-width: var(--paper-input-container-shared-input-style_-_max-width); 
        background: var(--paper-input-container-shared-input-style_-_background); 
        border: var(--paper-input-container-shared-input-style_-_border); 
        font-family: var(--paper-input-container-shared-input-style_-_font-family); 
        font-size: var(--paper-input-container-shared-input-style_-_font-size); 
        line-height: var(--paper-input-container-shared-input-style_-_line-height);
        outline: var(--paper-input-container-shared-input-style_-_outline); 
      }
      
      .multiselect-tag-text {
        padding: 0px 0px 0px 5px;
        white-space: nowrap; 
        color: var(--text-primary-color);
      }

      .multiselect-tag-remove-button {
        --mdc-icon-button-size: 14px;
        --mdc-icon-size: 14px; 
        color: var(--text-primary-color);
      }

      .suffix {
        display: flex;
      }
      
      mwc-icon-button {
        --mdc-icon-button-size: 24px;
        padding: 0px 2px;
        color: var(--secondary-text-color);
      }

      .multiselect-scrim {
        display: none;
        position: fixed;
        top: 0px;
        left: 0px;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        z-index: 3000;
      }
      
      .multiselect-popup {
        background-color: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 4px);
        position: absolute;
        z-index: 3001;
        display: none;
      }
      
      .multiselect-opened {
        display: block;
      }

      .multiselect-list-element-container{
        cursor: pointer;
        padding: 4px 10px;
        display: flex;
        align-items: center;
      }
      
      .multiselect-list-element-check{
        background: var(--secondary-background-color);
        font-size: 24px;
        line-height: 1;
        width: 24px;
        height: 24px;
        margin-right: 10px;
        color: var(--material-secondary-text-color);
      }
      
      .multiselect-list-element{
        color: var(--material-body-text-color);
        font-size: var(--paper-font-subhead_-_font-size);
        line-height: 24px;
        padding: 9px 0px;
      }

      .multiselect-list-element .secondary{
        font-size: var(--paper-font-body1_-_font-size);
        line-height: 20px;
        color: var(--secondary-text-color);
      }
    `}_clearValues(){this._setSearchValue(""),this.selectedEntityIds=[],this.selectedEntityIdsChanged()}_clearValue(e){const t=e.path[6].innerText,i=this.selectedEntityIds.findIndex((e=>this.entityIds.get(e)===t));i>-1&&this.selectedEntityIds.splice(i,1),this.requestUpdate("selectedEntityIds"),this.selectedEntityIdsChanged()}_setSearchValue(e){this.searchValue=e,this._inputElement.value=this.searchValue}_searchValueChanged(){this.searchValue=this._inputElement.value}_openMultiselectPopup(){this.open=!0}_closeMultiselectPopup(){this.open=!1}_handleEntityClick(e){const t=e.path.find((e=>"multiselect-list-element-container"==e.className)).getElementsByClassName("multiselect-list-element")[0].getElementsByClassName("secondary")[0].innerText,i=this.selectedEntityIds.indexOf(t);i>-1?this.selectedEntityIds.splice(i,1):this.selectedEntityIds.push(t),this.requestUpdate("selectedEntityIds"),this.selectedEntityIdsChanged(),this._setSearchValue("")}selectedEntityIdsChanged(){let e=new CustomEvent("change",{detail:{date:this.selectedEntityIds}});this.dispatchEvent(e)}});customElements.define("ha-route-map",class extends e{constructor(){super(),this.markers=[],this.polyLines=[]}static get properties(){return{hass:{type:Object},routeData:{type:l}}}firstUpdated(e){super.firstUpdated(e),d.Default.imagePath="/static/images/leaflet/images/";var t=this.shadowRoot.getElementById("map");this.map=new l(t);const i=document.createElement("link");i.setAttribute("href","/static/images/leaflet/leaflet.css"),i.setAttribute("rel","stylesheet"),t.parentNode.appendChild(i),this.map.setView([this.hass.config.latitude,this.hass.config.longitude],14),new c(`https://{s}.basemaps.cartocdn.com/${this.hass.themes.darkMode?"dark_all":"light_all"}/{z}/{x}/{y}${p.retina?"@2x.png":".png"}`,{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',subdomains:"abcd",minZoom:0,maxZoom:20}).addTo(this.map),this.map.invalidateSize()}async updateMapItems(){for(const[a,o]of this.routeData.entries()){var e="#"+Math.floor(16777215*Math.random()).toString(16),t=null,i=0;for(const[l,d]of o.entries()){var s=new h([d.latitude,d.longitude],{title:`${i} ${a} ${l} ${d.street}`});if(++i,s.addTo(this.map),this.markers.push(s),t){var r=[[t.latitude,t.longitude],[d.latitude,d.longitude]];(await new Promise((e=>{var t=new XMLHttpRequest;t.open("GET",`https://routing.openstreetmap.de/routed-foot/route/v1/driving/${r[0][1]},${r[0][0]};${r[1][1]},${r[1][0]}?overview=false&geometries=geojson&steps=true`,!0),t.responseType="json",t.onload=function(i){e(t.response)},t.send()}))).routes[0].legs[0].steps.map((e=>e.geometry.coordinates.map((e=>r.splice(r.length-1,0,[e[1],e[0]])))));var n=new u(r,{color:e});n.addTo(this.map),this.polyLines.push(n)}t=d}}var a=new m(this.markers.map((e=>e.getLatLng())));this.map.fitBounds(a.pad(.5))}updated(e){super.updated(e),e.has("routeData")&&(null!=e.get("routeData")&&0!=e.get("routeData").size||this.map.invalidateSize(),this.markers.forEach((function(e){e.remove()})),this.markers=[],this.polyLines.forEach((function(e){e.remove()})),this.polyLines=[],0!=this.routeData.size&&this.updateMapItems())}render(){return t`
      ${0==this.routeData.size?t`
          <div class="container no-entries" dir="ltr">
            ${this.hass.localize("ui.components.data-table.no-data")}
          </div>
        `:t``}
    <div id="map" ?hidden=${0==this.routeData.size}></div>`}static get styles(){return i`
      :host {
        --config-height: 62px;
        --config-padding: 16px;
      }

      :host([narrow]) {
        --config-height: 124px;
      }

      .no-entries {
        text-align: center;
        color: var(--secondary-text-color);
      }

      #map { 
        height: calc(100vh - var(--header-height) - var(--config-height) - var(--config-padding));
        width: 100%;
        z-index: 0;
        background: inherit;
      }
    `}});class Ce{constructor(e,t,i){f(this,"latitude",void 0),f(this,"longitude",void 0),f(this,"street",void 0),this.latitude=e,this.longitude=t,this.street=i}}let $e=function(e,t,i,s){var r=b();if(s)for(var n=0;n<s.length;n++)r=s[n](r);var a=t((function(e){r.initializeInstanceElements(e,o.elements)}),i),o=r.decorateClass(function(e){for(var t=[],i=function(e){return"method"===e.kind&&e.key===n.key&&e.placement===n.placement},s=0;s<e.length;s++){var r,n=e[s];if("method"===n.kind&&(r=t.find(i)))if(E(n.descriptor)||E(r.descriptor)){if(k(n)||k(r))throw new ReferenceError("Duplicated methods ("+n.key+") can't be decorated.");r.descriptor=n.descriptor}else{if(k(n)){if(k(r))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+n.key+").");r.decorators=n.decorators}S(n,r)}else t.push(n)}return t}(a.d.map(x)),e);return r.initializeClassElements(a.F,o.elements),r.runClassFinishers(a.F,o.finishers)}([(De="route-frontend",e=>"function"==typeof e?((e,t)=>(window.customElements.define(e,t),t))(De,e):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){window.customElements.define(e,t)}}})(De,e))],(function(e,t){class i extends t{constructor(){super(),e(this);const t=new Date;t.setHours(0),t.setMinutes(0),t.setSeconds(0),this._startDate=t;const i=new Date;i.setHours(23),i.setMinutes(59),i.setSeconds(59),this._endDate=i,this.routeData=new Map}}return{F:i,d:[{kind:"field",key:"_startDate",value:void 0},{kind:"field",key:"_endDate",value:void 0},{kind:"field",key:"routeData",value:void 0},{kind:"field",key:"_isLoading",value:void 0},{kind:"field",key:"_entityIds",value:void 0},{kind:"field",decorators:[(s={attribute:!1},(e,t)=>void 0!==t?((e,t,i)=>{t.constructor.createProperty(i,e)})(s,e,t):we(s,e))],key:"hass",value:void 0},{kind:"field",key:"panel",value:void 0},{kind:"field",key:"narrow",value:void 0},{kind:"get",static:!0,key:"properties",value:function(){return{hass:{type:Object},narrow:{type:Boolean},route:{type:Object},panel:{type:Object},routeData:{type:Map},_startDate:{type:Date},_endDate:{type:Date},_entityIds:{type:Array}}}},{kind:"method",key:"shouldUpdate",value:function(e){return e.has("routeData")?!this._isLoading:g(y(i.prototype),"shouldUpdate",this).call(this,e)}},{kind:"method",key:"getDistance",value:function(e,t){var i=this.toRadian(e[1]),s=this.toRadian(e[0]),r=this.toRadian(t[1]),n=this.toRadian(t[0]),a=n-s,o=r-i,l=Math.pow(Math.sin(a/2),2)+Math.cos(s)*Math.cos(n)*Math.pow(Math.sin(o/2),2);return 6371*(2*Math.asin(Math.sqrt(l)))*1e3}},{kind:"method",key:"toRadian",value:function(e){return e*Math.PI/180}},{kind:"method",key:"updateGPSHistory",value:async function(){if(0===this._entityIds.length)return void(this.routeData=new Map);this._isLoading=!0;const e=await(t=this.hass,i=this._startDate,s=this._endDate,r=this._entityIds.join(),t.callApi("GET",`history/period/${i.toISOString()}?end_time=${s.toISOString()}&minimal_response${r?`&filter_entity_id=${r}`:""}`));var t,i,s,r;if(!e)return this._isLoading=!1,void(this.routeData=new Map);const n=new Map(this.routeData);this.routeData=new Map,e.forEach((e=>{if(0!==e.length){var t=null,i=new Map;for(let n=0;n<e.length;n++)if(""!=e[n].state&&e[n].state!==(t?t.state:"")){if(n+1!=e.length){if(t){var s=this.getDistance([t.attributes.latitude,t.attributes.longitude],[e[n].attributes.latitude,e[n].attributes.longitude]);if(s<this.panel.config.mindst){console.log(`${e[n].state} was skiped because distance(${s}) < ${this.panel.config.mindst}`);continue}}var r=(new Date(e[n+1].last_changed).valueOf()-new Date(e[n].last_changed).valueOf())/1e3/60;if(r<this.panel.config.mintime){console.log(`${e[n].state} was skiped because deltaTime(${r}) < ${this.panel.config.mintime}`);continue}}i.set(new Date(e[n].last_changed),new Ce(e[n].attributes.latitude,e[n].attributes.longitude,e[n].state)),t=e[n]}this.routeData.set(this.panel.config.entities.get(e[0].entity_id),i)}})),this._isLoading=!1,this.requestUpdate("routeData",n)}},{kind:"method",key:"dateRangeChanged",value:function(e){e.detail.date.setHours(0),e.detail.date.setMinutes(0),e.detail.date.setSeconds(0),this._startDate=new Date(e.detail.date),e.detail.date.setHours(23),e.detail.date.setMinutes(59),e.detail.date.setSeconds(59),this._endDate=new Date(e.detail.date)}},{kind:"method",key:"entityChanged",value:function(e){this._entityIds=[...e.detail.date]}},{kind:"method",key:"firstUpdated",value:function(e){g(y(i.prototype),"firstUpdated",this).call(this,e),this.panel.config.entities=new Map(Object.entries(this.panel.config.entities)),this._entityIds=Array.from(this.panel.config.entities.keys())}},{kind:"method",key:"updated",value:function(e){g(y(i.prototype),"updated",this).call(this,e),(e.has("_startDate")||e.has("_endDate")||e.has("_entityIds"))&&this.updateGPSHistory()}},{kind:"method",key:"render",value:function(){return de`
      <app-toolbar>
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <div main-title>Route</div> <!--Localize this-->
      </app-toolbar>
      <div class="flex content">
        <div class="flex layout horizontal wrap">
          <ha-route-day-picker
            .hass=${this.hass}
            .date=${this._startDate}
            ?disabled=${this._isLoading}
            ?narrow = ${this.narrow}
            @change=${this.dateRangeChanged}
          ></ha-route-day-picker>
          <entity-multiselect-picker
            .hass=${this.hass}
            .entityIds=${this.panel.config.entities}
            .selectedEntityIds=${this._entityIds}
            ?narrow = ${this.narrow}
            @change=${this.entityChanged}
          ></entity-multiselect-picker>
        </div>
      </div>
      <ha-route-map
        .hass=${this.hass}
        .routeData=${this.routeData}
        ?narrow = ${this.narrow}
      ></ha-route-map>
  `}},{kind:"get",static:!0,key:"styles",value:function(){return[ke`
        app-toolbar {
          background-color: var(--app-header-background-color);
          height: var(--header-height);
        }

        .layout.horizontal{
          display: flex;
          flex-direction: row;
        }

        .layout.wrap {
          flex-wrap: wrap;
        }
        
        .content {
          padding: 0 16px 16px;
        }
      `]}}]};var s}),Pe);var De;customElements.define("ha-panel-route",$e);
