function e(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function t(e){return(t=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,n,a){return(i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,i,n){var a=function(e,i){for(;!Object.prototype.hasOwnProperty.call(e,i)&&null!==(e=t(e)););return e}(e,i);if(a){var s=Object.getOwnPropertyDescriptor(a,i);return s.get?s.get.call(n):s.value}})(e,n,a||e)}function n(e){return function(e){if(Array.isArray(e))return e}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);"Object"===i&&e.constructor&&(i=e.constructor.name);if("Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return a(e,t)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function s(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}function r(e,t,i,n){var a=o();if(n)for(var s=0;s<n.length;s++)a=n[s](a);var r=t((function(e){a.initializeInstanceElements(e,u.elements)}),i),u=a.decorateClass(function(e){for(var t=[],i=function(e){return"method"===e.kind&&e.key===s.key&&e.placement===s.placement},n=0;n<e.length;n++){var a,s=e[n];if("method"===s.kind&&(a=t.find(i)))if(h(s.descriptor)||h(a.descriptor)){if(c(s)||c(a))throw new ReferenceError("Duplicated methods ("+s.key+") can't be decorated.");a.descriptor=s.descriptor}else{if(c(s)){if(c(a))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+s.key+").");a.decorators=s.decorators}d(s,a)}else t.push(s)}return t}(r.d.map(l)),e);return a.initializeClassElements(r.F,u.elements),a.runClassFinishers(r.F,u.finishers)}function o(){o=function(){return e};var e={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function(e,t){["method","field"].forEach((function(i){t.forEach((function(t){t.kind===i&&"own"===t.placement&&this.defineClassElement(e,t)}),this)}),this)},initializeClassElements:function(e,t){var i=e.prototype;["method","field"].forEach((function(n){t.forEach((function(t){var a=t.placement;if(t.kind===n&&("static"===a||"prototype"===a)){var s="static"===a?e:i;this.defineClassElement(s,t)}}),this)}),this)},defineClassElement:function(e,t){var i=t.descriptor;if("field"===t.kind){var n=t.initializer;i={enumerable:i.enumerable,writable:i.writable,configurable:i.configurable,value:void 0===n?void 0:n.call(e)}}Object.defineProperty(e,t.key,i)},decorateClass:function(e,t){var i=[],n=[],a={static:[],prototype:[],own:[]};if(e.forEach((function(e){this.addElementPlacement(e,a)}),this),e.forEach((function(e){if(!c(e))return i.push(e);var t=this.decorateElement(e,a);i.push(t.element),i.push.apply(i,t.extras),n.push.apply(n,t.finishers)}),this),!t)return{elements:i,finishers:n};var s=this.decorateConstructor(i,t);return n.push.apply(n,s.finishers),s.finishers=n,s},addElementPlacement:function(e,t,i){var n=t[e.placement];if(!i&&-1!==n.indexOf(e.key))throw new TypeError("Duplicated element ("+e.key+")");n.push(e.key)},decorateElement:function(e,t){for(var i=[],n=[],a=e.decorators,s=a.length-1;s>=0;s--){var r=t[e.placement];r.splice(r.indexOf(e.key),1);var o=this.fromElementDescriptor(e),l=this.toElementFinisherExtras((0,a[s])(o)||o);e=l.element,this.addElementPlacement(e,t),l.finisher&&n.push(l.finisher);var d=l.extras;if(d){for(var c=0;c<d.length;c++)this.addElementPlacement(d[c],t);i.push.apply(i,d)}}return{element:e,finishers:n,extras:i}},decorateConstructor:function(e,t){for(var i=[],n=t.length-1;n>=0;n--){var a=this.fromClassDescriptor(e),s=this.toClassDescriptor((0,t[n])(a)||a);if(void 0!==s.finisher&&i.push(s.finisher),void 0!==s.elements){e=s.elements;for(var r=0;r<e.length-1;r++)for(var o=r+1;o<e.length;o++)if(e[r].key===e[o].key&&e[r].placement===e[o].placement)throw new TypeError("Duplicated element ("+e[r].key+")")}}return{elements:e,finishers:i}},fromElementDescriptor:function(e){var t={kind:e.kind,key:e.key,placement:e.placement,descriptor:e.descriptor};return Object.defineProperty(t,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===e.kind&&(t.initializer=e.initializer),t},toElementDescriptors:function(e){if(void 0!==e)return n(e).map((function(e){var t=this.toElementDescriptor(e);return this.disallowProperty(e,"finisher","An element descriptor"),this.disallowProperty(e,"extras","An element descriptor"),t}),this)},toElementDescriptor:function(e){var t=String(e.kind);if("method"!==t&&"field"!==t)throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "'+t+'"');var i=s(e.key),n=String(e.placement);if("static"!==n&&"prototype"!==n&&"own"!==n)throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "'+n+'"');var a=e.descriptor;this.disallowProperty(e,"elements","An element descriptor");var r={kind:t,key:i,placement:n,descriptor:Object.assign({},a)};return"field"!==t?this.disallowProperty(e,"initializer","A method descriptor"):(this.disallowProperty(a,"get","The property descriptor of a field descriptor"),this.disallowProperty(a,"set","The property descriptor of a field descriptor"),this.disallowProperty(a,"value","The property descriptor of a field descriptor"),r.initializer=e.initializer),r},toElementFinisherExtras:function(e){return{element:this.toElementDescriptor(e),finisher:u(e,"finisher"),extras:this.toElementDescriptors(e.extras)}},fromClassDescriptor:function(e){var t={kind:"class",elements:e.map(this.fromElementDescriptor,this)};return Object.defineProperty(t,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),t},toClassDescriptor:function(e){var t=String(e.kind);if("class"!==t)throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "'+t+'"');this.disallowProperty(e,"key","A class descriptor"),this.disallowProperty(e,"placement","A class descriptor"),this.disallowProperty(e,"descriptor","A class descriptor"),this.disallowProperty(e,"initializer","A class descriptor"),this.disallowProperty(e,"extras","A class descriptor");var i=u(e,"finisher");return{elements:this.toElementDescriptors(e.elements),finisher:i}},runClassFinishers:function(e,t){for(var i=0;i<t.length;i++){var n=(0,t[i])(e);if(void 0!==n){if("function"!=typeof n)throw new TypeError("Finishers must return a constructor.");e=n}}return e},disallowProperty:function(e,t,i){if(void 0!==e[t])throw new TypeError(i+" can't have a ."+t+" property.")}};return e}function l(e){var t,i=s(e.key);"method"===e.kind?t={value:e.value,writable:!0,configurable:!0,enumerable:!1}:"get"===e.kind?t={get:e.value,configurable:!0,enumerable:!1}:"set"===e.kind?t={set:e.value,configurable:!0,enumerable:!1}:"field"===e.kind&&(t={configurable:!0,writable:!0,enumerable:!0});var n={kind:"field"===e.kind?"field":"method",key:i,placement:e.static?"static":"field"===e.kind?"own":"prototype",descriptor:t};return e.decorators&&(n.decorators=e.decorators),"field"===e.kind&&(n.initializer=e.value),n}function d(e,t){void 0!==e.descriptor.get?t.descriptor.get=e.descriptor.get:t.descriptor.set=e.descriptor.set}function c(e){return e.decorators&&e.decorators.length}function h(e){return void 0!==e&&!(void 0===e.value&&void 0===e.writable)}function u(e,t){var i=e[t];if(void 0!==i&&"function"!=typeof i)throw new TypeError("Expected '"+t+"' to be a function");return i}const p="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,f=(e,t,i=null,n=null)=>{for(;t!==i;){const i=t.nextSibling;e.insertBefore(t,n),t=i}},y=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},m=`{{lit-${String(Math.random()).slice(2)}}}`,g=`\x3c!--${m}--\x3e`,v=new RegExp(`${m}|${g}`);class b{constructor(e,t){this.parts=[],this.element=t;const i=[],n=[],a=document.createTreeWalker(t.content,133,null,!1);let s=0,r=-1,o=0;const{strings:l,values:{length:d}}=e;for(;o<d;){const e=a.nextNode();if(null!==e){if(r++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let n=0;for(let e=0;e<i;e++)_(t[e].name,"$lit$")&&n++;for(;n-- >0;){const t=l[o],i=x.exec(t)[2],n=i.toLowerCase()+"$lit$",a=e.getAttribute(n);e.removeAttribute(n);const s=a.split(v);this.parts.push({type:"attribute",index:r,name:i,strings:s}),o+=s.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),a.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(m)>=0){const n=e.parentNode,a=t.split(v),s=a.length-1;for(let t=0;t<s;t++){let i,s=a[t];if(""===s)i=k();else{const e=x.exec(s);null!==e&&_(e[2],"$lit$")&&(s=s.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(s)}n.insertBefore(i,e),this.parts.push({type:"node",index:++r})}""===a[s]?(n.insertBefore(k(),e),i.push(e)):e.data=a[s],o+=s}}else if(8===e.nodeType)if(e.data===m){const t=e.parentNode;null!==e.previousSibling&&r!==s||(r++,t.insertBefore(k(),e)),s=r,this.parts.push({type:"node",index:r}),null===e.nextSibling?e.data="":(i.push(e),r--),o++}else{let t=-1;for(;-1!==(t=e.data.indexOf(m,t+1));)this.parts.push({type:"node",index:-1}),o++}}else a.currentNode=n.pop()}for(const e of i)e.parentNode.removeChild(e)}}const _=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},w=e=>-1!==e.index,k=()=>document.createComment(""),x=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function S(e,t){const{element:{content:i},parts:n}=e,a=document.createTreeWalker(i,133,null,!1);let s=E(n),r=n[s],o=-1,l=0;const d=[];let c=null;for(;a.nextNode();){o++;const e=a.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==r&&r.index===o;)r.index=null!==c?-1:r.index-l,s=E(n,s),r=n[s]}d.forEach((e=>e.parentNode.removeChild(e)))}const D=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},E=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(w(t))return i}return-1};const C=new WeakMap,T=e=>(...t)=>{const i=e(...t);return C.set(i,!0),i},M=e=>"function"==typeof e&&C.has(e),P={},$={};class N{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=p?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let a,s=0,r=0,o=n.nextNode();for(;s<i.length;)if(a=i[s],w(a)){for(;r<a.index;)r++,"TEMPLATE"===o.nodeName&&(t.push(o),n.currentNode=o.content),null===(o=n.nextNode())&&(n.currentNode=t.pop(),o=n.nextNode());if("node"===a.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(o.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(o,a.name,a.strings,this.options));s++}else this.__parts.push(void 0),s++;return p&&(document.adoptNode(e),customElements.upgrade(e)),e}}const L=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),O=` ${m} `;class A{constructor(e,t,i,n){this.strings=e,this.values=t,this.type=i,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let n=0;n<e;n++){const e=this.strings[n],a=e.lastIndexOf("\x3c!--");i=(a>-1||i)&&-1===e.indexOf("--\x3e",a+1);const s=x.exec(e);t+=null===s?e+(i?O:g):e.substr(0,s.index)+s[1]+s[2]+"$lit$"+s[3]+m}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==L&&(t=L.createHTML(t)),e.innerHTML=t,e}}const z=e=>null===e||!("object"==typeof e||"function"==typeof e),V=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class U{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new R(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!V(e))return e}let n="";for(let a=0;a<t;a++){n+=e[a];const t=i[a];if(void 0!==t){const e=t.value;if(z(e)||!V(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class R{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===P||z(e)&&e===this.value||(this.value=e,M(e)||(this.committer.dirty=!0))}commit(){for(;M(this.value);){const e=this.value;this.value=P,e(this)}this.value!==P&&this.committer.commit()}}class F{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(k()),this.endNode=e.appendChild(k())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=k()),e.__insert(this.endNode=k())}insertAfterPart(e){e.__insert(this.startNode=k()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;M(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=P,e(this)}const e=this.__pendingValue;e!==P&&(z(e)?e!==this.value&&this.__commitText(e):e instanceof A?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):V(e)?this.__commitIterable(e):e===$?(this.value=$,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof N&&this.value.template===t)this.value.update(e.values);else{const i=new N(t,e.processor,this.options),n=i._clone();i.update(e.values),this.__commitNode(n),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,n=0;for(const a of e)i=t[n],void 0===i&&(i=new F(this.options),t.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(t[n-1])),i.setValue(a),i.commit(),n++;n<t.length&&(t.length=n,this.clear(i&&i.endNode))}clear(e=this.startNode){y(this.startNode.parentNode,e.nextSibling,this.endNode)}}class I{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;M(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=P,e(this)}if(this.__pendingValue===P)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=P}}class j extends U{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new W(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class W extends R{}let q=!1;(()=>{try{const e={get capture(){return q=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class H{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;M(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=P,e(this)}if(this.__pendingValue===P)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=B(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=P}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const B=e=>e&&(q?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function Y(e){let t=Z.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},Z.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(m);return i=t.keyString.get(n),void 0===i&&(i=new b(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const Z=new Map,J=new WeakMap;const K=new class{handleAttributeExpressions(e,t,i,n){const a=t[0];if("."===a){return new j(e,t.slice(1),i).parts}if("@"===a)return[new H(e,t.slice(1),n.eventContext)];if("?"===a)return[new I(e,t.slice(1),i)];return new U(e,t,i).parts}handleTextExpression(e){return new F(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const G=(e,...t)=>new A(e,t,"html",K),X=(e,t)=>`${e}--${t}`;let Q=!0;void 0===window.ShadyCSS?Q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Q=!1);const ee=e=>t=>{const i=X(t.type,e);let n=Z.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},Z.set(i,n));let a=n.stringsArray.get(t.strings);if(void 0!==a)return a;const s=t.strings.join(m);if(a=n.keyString.get(s),void 0===a){const i=t.getTemplateElement();Q&&window.ShadyCSS.prepareTemplateDom(i,e),a=new b(t,i),n.keyString.set(s,a)}return n.stringsArray.set(t.strings,a),a},te=["html","svg"],ie=new Set,ne=(e,t,i)=>{ie.add(e);const n=i?i.element:document.createElement("template"),a=t.querySelectorAll("style"),{length:s}=a;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(n,e);const r=document.createElement("style");for(let e=0;e<s;e++){const t=a[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{te.forEach((t=>{const i=Z.get(X(t,e));void 0!==i&&i.keyString.forEach((e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{i.add(e)})),S(e,i)}))}))})(e);const o=n.content;i?function(e,t,i=null){const{element:{content:n},parts:a}=e;if(null==i)return void n.appendChild(t);const s=document.createTreeWalker(n,133,null,!1);let r=E(a),o=0,l=-1;for(;s.nextNode();)for(l++,s.currentNode===i&&(o=D(t),i.parentNode.insertBefore(t,i));-1!==r&&a[r].index===l;){if(o>0){for(;-1!==r;)a[r].index+=o,r=E(a,r);return}r=E(a,r)}}(i,r,o.firstChild):o.insertBefore(r,o.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){o.insertBefore(r,o.firstChild);const e=new Set;e.add(r),S(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const ae={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},se=(e,t)=>t!==e&&(t==t||e==e),re={attribute:!0,type:String,converter:ae,reflect:!1,hasChanged:se};class oe extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const n=this._attributeNameForProperty(i,t);void 0!==n&&(this._attributeToPropertyMap.set(n,i),e.push(n))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=re){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,n=this.getPropertyDescriptor(e,i,t);void 0!==n&&Object.defineProperty(this.prototype,e,n)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){const a=this[e];this[t]=n,this.requestUpdateInternal(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||re}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=se){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,n=t.converter||ae,a="function"==typeof n?n:n.fromAttribute;return a?a(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,n=t.converter;return(n&&n.toAttribute||ae.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=re){const n=this.constructor,a=n._attributeNameForProperty(e,i);if(void 0!==a){const e=n._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(a):this.setAttribute(a,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,n=i._attributeToPropertyMap.get(e);if(void 0!==n){const e=i.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let n=!0;if(void 0!==e){const a=this.constructor;i=i||a.getPropertyOptions(e),a._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}oe.finalized=!0;const le=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:n}=t;return{kind:i,elements:n,finisher(t){window.customElements.define(e,t)}}})(e,t),de=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function ce(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):de(e,t)}function he(e,t){return(i,n)=>{const a={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof n?Symbol():`__${n}`;a.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==n?ue(a,i,n):pe(a,i)}}const ue=(e,t,i)=>{Object.defineProperty(t,i,e)},pe=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e});function fe(e){return(t,i)=>void 0!==i?((e,t,i)=>{Object.assign(t[i],e)})(e,t,i):((e,t)=>Object.assign(Object.assign({},t),{finisher(i){Object.assign(i.prototype[t.key],e)}}))(e,t)}const ye=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,me=Symbol();class ge{constructor(e,t){if(t!==me)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(ye?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ve=(e,...t)=>{const i=t.reduce(((t,i,n)=>t+(e=>{if(e instanceof ge)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[n+1]),e[0]);return new ge(i,me)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const be={};class _e extends oe{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),n=[];i.forEach((e=>n.unshift(e))),this._styles=n}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!ye){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new ge(String(t),me)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ye?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==be&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return be}}_e.finalized=!0,_e.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,a=J.has(t),s=Q&&11===t.nodeType&&!!t.host,r=s&&!ie.has(n),o=r?document.createDocumentFragment():t;if(((e,t,i)=>{let n=J.get(t);void 0===n&&(y(t,t.firstChild),J.set(t,n=new F(Object.assign({templateFactory:Y},i))),n.appendInto(t)),n.setValue(e),n.commit()})(e,o,Object.assign({templateFactory:ee(n)},i)),r){const e=J.get(o);J.delete(o);const i=e.value instanceof N?e.value.template:void 0;ne(n,o,i),y(t,t.firstChild),t.appendChild(o),J.set(t,e)}!a&&s&&window.ShadyCSS.styleElement(t.host)};var we=function(e,t,i,n){var a,s=arguments.length,r=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(r=(s<3?a(r):s>3?a(t,i,r):a(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r},ke=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const xe=ve`
:host {
  opacity: 0;
}
:host(.wired-rendered) {
  opacity: 1;
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
svg {
  display: block;
}
path {
  stroke: currentColor;
  stroke-width: 0.7;
  fill: transparent;
}
.hidden {
  display: none !important;
}
`;class Se extends _e{constructor(){super(...arguments),this.lastSize=[0,0],this.seed=Math.floor(Math.random()*2**31)}updated(e){this.wiredRender()}wiredRender(e=!1){if(this.svg){const t=this.canvasSize();if(!e&&t[0]===this.lastSize[0]&&t[1]===this.lastSize[1])return;for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);this.svg.setAttribute("width",`${t[0]}`),this.svg.setAttribute("height",`${t[1]}`),this.draw(this.svg,t),this.lastSize=t,this.classList.add("wired-rendered")}}}function De(e,t,i){if(e&&e.length){const[n,a]=t,s=Math.PI/180*i,r=Math.cos(s),o=Math.sin(s);e.forEach((e=>{const[t,i]=e;e[0]=(t-n)*r-(i-a)*o+n,e[1]=(t-n)*o+(i-a)*r+a}))}}function Ee(e){const t=e[0],i=e[1];return Math.sqrt(Math.pow(t[0]-i[0],2)+Math.pow(t[1]-i[1],2))}function Ce(e,t,i,n){const a=t[1]-e[1],s=e[0]-t[0],r=a*e[0]+s*e[1],o=n[1]-i[1],l=i[0]-n[0],d=o*i[0]+l*i[1],c=a*l-o*s;return c?[(l*r-s*d)/c,(a*d-o*r)/c]:null}function Te(e,t,i){const n=e.length;if(n<3)return!1;const a=[Number.MAX_SAFE_INTEGER,i],s=[t,i];let r=0;for(let t=0;t<n;t++){const i=e[t],o=e[(t+1)%n];if($e(i,o,s,a)){if(0===Pe(i,s,o))return Me(i,s,o);r++}}return r%2==1}function Me(e,t,i){return t[0]<=Math.max(e[0],i[0])&&t[0]>=Math.min(e[0],i[0])&&t[1]<=Math.max(e[1],i[1])&&t[1]>=Math.min(e[1],i[1])}function Pe(e,t,i){const n=(t[1]-e[1])*(i[0]-t[0])-(t[0]-e[0])*(i[1]-t[1]);return 0===n?0:n>0?1:2}function $e(e,t,i,n){const a=Pe(e,t,i),s=Pe(e,t,n),r=Pe(i,n,e),o=Pe(i,n,t);return a!==s&&r!==o||!(0!==a||!Me(e,i,t))||!(0!==s||!Me(e,n,t))||!(0!==r||!Me(i,e,n))||!(0!==o||!Me(i,t,n))}function Ne(e,t){const i=[0,0],n=Math.round(t.hachureAngle+90);n&&De(e,i,n);const a=function(e,t){const i=[...e];i[0].join(",")!==i[i.length-1].join(",")&&i.push([i[0][0],i[0][1]]);const n=[];if(i&&i.length>2){let e=t.hachureGap;e<0&&(e=4*t.strokeWidth),e=Math.max(e,.1);const a=[];for(let e=0;e<i.length-1;e++){const t=i[e],n=i[e+1];if(t[1]!==n[1]){const e=Math.min(t[1],n[1]);a.push({ymin:e,ymax:Math.max(t[1],n[1]),x:e===t[1]?t[0]:n[0],islope:(n[0]-t[0])/(n[1]-t[1])})}}if(a.sort(((e,t)=>e.ymin<t.ymin?-1:e.ymin>t.ymin?1:e.x<t.x?-1:e.x>t.x?1:e.ymax===t.ymax?0:(e.ymax-t.ymax)/Math.abs(e.ymax-t.ymax))),!a.length)return n;let s=[],r=a[0].ymin;for(;s.length||a.length;){if(a.length){let e=-1;for(let t=0;t<a.length&&!(a[t].ymin>r);t++)e=t;a.splice(0,e+1).forEach((e=>{s.push({s:r,edge:e})}))}if(s=s.filter((e=>!(e.edge.ymax<=r))),s.sort(((e,t)=>e.edge.x===t.edge.x?0:(e.edge.x-t.edge.x)/Math.abs(e.edge.x-t.edge.x))),s.length>1)for(let e=0;e<s.length;e+=2){const t=e+1;if(t>=s.length)break;const i=s[e].edge,a=s[t].edge;n.push([[Math.round(i.x),r],[Math.round(a.x),r]])}r+=e,s.forEach((t=>{t.edge.x=t.edge.x+e*t.edge.islope}))}}return n}(e,t);return n&&(De(e,i,-n),function(e,t,i){const n=[];e.forEach((e=>n.push(...e))),De(n,t,i)}(a,i,-n)),a}we([he("svg"),ke("design:type",SVGSVGElement)],Se.prototype,"svg",void 0);class Le extends class{constructor(e){this.helper=e}fillPolygon(e,t){return this._fillPolygon(e,t)}_fillPolygon(e,t,i=!1){let n=Ne(e,t);if(i){const t=this.connectingLines(e,n);n=n.concat(t)}return{type:"fillSketch",ops:this.renderLines(n,t)}}renderLines(e,t){const i=[];for(const n of e)i.push(...this.helper.doubleLineOps(n[0][0],n[0][1],n[1][0],n[1][1],t));return i}connectingLines(e,t){const i=[];if(t.length>1)for(let n=1;n<t.length;n++){const a=t[n-1];if(Ee(a)<3)continue;const s=[t[n][0],a[1]];if(Ee(s)>3){const t=this.splitOnIntersections(e,s);i.push(...t)}}return i}midPointInPolygon(e,t){return Te(e,(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2)}splitOnIntersections(e,t){const i=Math.max(5,.1*Ee(t)),n=[];for(let a=0;a<e.length;a++){const s=e[a],r=e[(a+1)%e.length];if($e(s,r,...t)){const e=Ce(s,r,t[0],t[1]);if(e){const a=Ee([e,t[0]]),s=Ee([e,t[1]]);a>i&&s>i&&n.push({point:e,distance:a})}}}if(n.length>1){const i=n.sort(((e,t)=>e.distance-t.distance)).map((e=>e.point));if(Te(e,...t[0])||i.shift(),Te(e,...t[1])||i.pop(),i.length<=1)return this.midPointInPolygon(e,t)?[t]:[];const a=[t[0],...i,t[1]],s=[];for(let t=0;t<a.length-1;t+=2){const i=[a[t],a[t+1]];this.midPointInPolygon(e,i)&&s.push(i)}return s}return this.midPointInPolygon(e,t)?[t]:[]}}{fillPolygon(e,t){return this._fillPolygon(e,t,!0)}}class Oe{constructor(e){this.seed=e}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function Ae(e,t,i,n,a){return{type:"path",ops:Fe(e,t,i,n,a)}}function ze(e,t,i,n,a){return function(e,t,i,n){const[a,s]=We(n.increment,e,t,n.rx,n.ry,1,n.increment*Ue(.1,Ue(.4,1,i),i),i);let r=je(a,null,i);if(!i.disableMultiStroke){const[a]=We(n.increment,e,t,n.rx,n.ry,1.5,0,i),s=je(a,null,i);r=r.concat(s)}return{estimatedPoints:s,opset:{type:"path",ops:r}}}(e,t,a,function(e,t,i){const n=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(e/2,2)+Math.pow(t/2,2))/2)),a=Math.max(i.curveStepCount,i.curveStepCount/Math.sqrt(200)*n),s=2*Math.PI/a;let r=Math.abs(e/2),o=Math.abs(t/2);const l=1-i.curveFitting;return r+=Re(r*l,i),o+=Re(o*l,i),{increment:s,rx:r,ry:o}}(i,n,a)).opset}function Ve(e){return e.randomizer||(e.randomizer=new Oe(e.seed||0)),e.randomizer.next()}function Ue(e,t,i,n=1){return i.roughness*n*(Ve(i)*(t-e)+e)}function Re(e,t,i=1){return Ue(-e,e,t,i)}function Fe(e,t,i,n,a,s=!1){const r=s?a.disableMultiStrokeFill:a.disableMultiStroke,o=Ie(e,t,i,n,a,!0,!1);if(r)return o;const l=Ie(e,t,i,n,a,!0,!0);return o.concat(l)}function Ie(e,t,i,n,a,s,r){const o=Math.pow(e-i,2)+Math.pow(t-n,2),l=Math.sqrt(o);let d=1;d=l<200?1:l>500?.4:-.0016668*l+1.233334;let c=a.maxRandomnessOffset||0;c*c*100>o&&(c=l/10);const h=c/2,u=.2+.2*Ve(a);let p=a.bowing*a.maxRandomnessOffset*(n-t)/200,f=a.bowing*a.maxRandomnessOffset*(e-i)/200;p=Re(p,a,d),f=Re(f,a,d);const y=[],m=()=>Re(h,a,d),g=()=>Re(c,a,d);return s&&(r?y.push({op:"move",data:[e+m(),t+m()]}):y.push({op:"move",data:[e+Re(c,a,d),t+Re(c,a,d)]})),r?y.push({op:"bcurveTo",data:[p+e+(i-e)*u+m(),f+t+(n-t)*u+m(),p+e+2*(i-e)*u+m(),f+t+2*(n-t)*u+m(),i+m(),n+m()]}):y.push({op:"bcurveTo",data:[p+e+(i-e)*u+g(),f+t+(n-t)*u+g(),p+e+2*(i-e)*u+g(),f+t+2*(n-t)*u+g(),i+g(),n+g()]}),y}function je(e,t,i){const n=e.length,a=[];if(n>3){const s=[],r=1-i.curveTightness;a.push({op:"move",data:[e[1][0],e[1][1]]});for(let t=1;t+2<n;t++){const i=e[t];s[0]=[i[0],i[1]],s[1]=[i[0]+(r*e[t+1][0]-r*e[t-1][0])/6,i[1]+(r*e[t+1][1]-r*e[t-1][1])/6],s[2]=[e[t+1][0]+(r*e[t][0]-r*e[t+2][0])/6,e[t+1][1]+(r*e[t][1]-r*e[t+2][1])/6],s[3]=[e[t+1][0],e[t+1][1]],a.push({op:"bcurveTo",data:[s[1][0],s[1][1],s[2][0],s[2][1],s[3][0],s[3][1]]})}if(t&&2===t.length){const e=i.maxRandomnessOffset;a.push({op:"lineTo",data:[t[0]+Re(e,i),t[1]+Re(e,i)]})}}else 3===n?(a.push({op:"move",data:[e[1][0],e[1][1]]}),a.push({op:"bcurveTo",data:[e[1][0],e[1][1],e[2][0],e[2][1],e[2][0],e[2][1]]})):2===n&&a.push(...Fe(e[0][0],e[0][1],e[1][0],e[1][1],i));return a}function We(e,t,i,n,a,s,r,o){const l=[],d=[],c=Re(.5,o)-Math.PI/2;d.push([Re(s,o)+t+.9*n*Math.cos(c-e),Re(s,o)+i+.9*a*Math.sin(c-e)]);for(let r=c;r<2*Math.PI+c-.01;r+=e){const e=[Re(s,o)+t+n*Math.cos(r),Re(s,o)+i+a*Math.sin(r)];l.push(e),d.push(e)}return d.push([Re(s,o)+t+n*Math.cos(c+2*Math.PI+.5*r),Re(s,o)+i+a*Math.sin(c+2*Math.PI+.5*r)]),d.push([Re(s,o)+t+.98*n*Math.cos(c+r),Re(s,o)+i+.98*a*Math.sin(c+r)]),d.push([Re(s,o)+t+.9*n*Math.cos(c+.5*r),Re(s,o)+i+.9*a*Math.sin(c+.5*r)]),[d,l]}const qe={randOffset:(e,t)=>e,randOffsetWithRange:(e,t,i)=>(e+t)/2,ellipse:(e,t,i,n,a)=>ze(e,t,i,n,a),doubleLineOps:(e,t,i,n,a)=>function(e,t,i,n,a){return Fe(e,t,i,n,a,!0)}(e,t,i,n,a)};function He(e){return{maxRandomnessOffset:2,roughness:1,bowing:.85,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:3.5,hachureAngle:-41,hachureGap:5,dashOffset:-1,dashGap:-1,zigzagOffset:0,combineNestedSvgPaths:!1,disableMultiStroke:!1,disableMultiStrokeFill:!1,seed:e}}function Be(e,t){let i="";for(const n of e.ops){const e=n.data;switch(n.op){case"move":if(t&&i)break;i+=`M${e[0]} ${e[1]} `;break;case"bcurveTo":i+=`C${e[0]} ${e[1]}, ${e[2]} ${e[3]}, ${e[4]} ${e[5]} `;break;case"lineTo":i+=`L${e[0]} ${e[1]} `}}return i.trim()}function Ye(e,t,i=!1){const n=function(e,t){const i=document.createElementNS("http://www.w3.org/2000/svg",e);if(t)for(const e in t)i.setAttributeNS(null,e,t[e]);return i}("path",{d:Be(e,i)});return t&&t.appendChild(n),n}function Ze(e,t,i,n,a,s){return Ye(function(e,t,i,n,a){return function(e,t){return function(e,t,i){const n=(e||[]).length;if(n>2){const t=[];for(let a=0;a<n-1;a++)t.push(...Fe(e[a][0],e[a][1],e[a+1][0],e[a+1][1],i));return t.push(...Fe(e[n-1][0],e[n-1][1],e[0][0],e[0][1],i)),{type:"path",ops:t}}return 2===n?Ae(e[0][0],e[0][1],e[1][0],e[1][1],i):{type:"path",ops:[]}}(e,0,t)}([[e,t],[e+i,t],[e+i,t+n],[e,t+n]],a)}(t+2,i+2,n-4,a-4,He(s)),e)}function Je(e,t,i,n,a,s){return Ye(Ae(t,i,n,a,He(s)),e)}var Ke=function(e,t,i,n){var a,s=arguments.length,r=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(r=(s<3?a(r):s>3?a(t,i,r):a(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r},Ge=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Xe=class extends Se{constructor(){super(),this.elevation=1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender()})))}static get styles(){return[xe,ve`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
        path.cardFill {
          stroke-width: 3.5;
          stroke: var(--wired-card-background-fill);
        }
        path {
          stroke: var(--wired-card-background-fill, currentColor);
        }
      `]}render(){return G`
    <div id="overlay"><svg></svg></div>
    <div style="position: relative;">
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    `}updated(e){const t=e.has("fill");this.wiredRender(t),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),n=t[0]-2*(i-1),a=t[1]-2*(i-1);if(this.fill&&this.fill.trim()){const t=function(e,t){return Ye(new Le(qe).fillPolygon(e,He(t)),null)}([[2,2],[n-4,2],[n-2,a-4],[2,a-4]],this.seed);t.classList.add("cardFill"),e.style.setProperty("--wired-card-background-fill",this.fill.trim()),e.appendChild(t)}Ze(e,2,2,n-4,a-4,this.seed);for(let t=1;t<i;t++)Je(e,2*t,a-4+2*t,n-4+2*t,a-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Je(e,n-4+2*t,a-4+2*t,n-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100,Je(e,2*t,a-4+2*t,n-4+2*t,a-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Je(e,n-4+2*t,a-4+2*t,n-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100}};Ke([ce({type:Number}),Ge("design:type",Object)],Xe.prototype,"elevation",void 0),Ke([ce({type:String}),Ge("design:type",String)],Xe.prototype,"fill",void 0),Xe=Ke([le("wired-card"),Ge("design:paramtypes",[])],Xe);class Qe{constructor(t,i,n,a){e(this,"time",void 0),e(this,"latitude",void 0),e(this,"longitude",void 0),e(this,"street",void 0),this.time=t,this.latitude=i,this.longitude=n,this.street=a}}const et=Intl&&Intl.DateTimeFormat,tt=[38,33,36],it=[40,34,35],nt=new Set([37,...tt]),at=new Set([39,...it]),st=new Set([39,...tt]),rt=new Set([37,...it]),ot=new Set([37,39,...tt,...it]);function lt(e,t,i,n){var a,s=arguments.length,r=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(r=(s<3?a(r):s>3?a(t,i,r):a(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r}const dt=new WeakMap,ct=T((e=>t=>{if(!(t instanceof F))throw new Error("cache can only be used in text bindings");let i=dt.get(t);void 0===i&&(i=new WeakMap,dt.set(t,i));const n=t.value;if(n instanceof N){if(e instanceof A&&n.template===t.options.templateFactory(e))return void t.setValue(e);{let e=i.get(n.template);void 0===e&&(e={instance:n,nodes:document.createDocumentFragment()},i.set(n.template,e)),f(e.nodes,t.startNode.nextSibling,t.endNode)}}if(e instanceof A){const n=t.options.templateFactory(e),a=i.get(n);void 0!==a&&(t.setValue(a.nodes),t.commit(),t.value=a.instance)}t.setValue(e)}));class ht{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;const t=(e.getAttribute("class")||"").split(/\s+/);for(const e of t)this.classes.add(e)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach((t=>e+=t+" ")),this.element.setAttribute("class",e)}}}const ut=new WeakMap,pt=T((e=>t=>{if(!(t instanceof R)||t instanceof W||"class"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:i}=t,{element:n}=i;let a=ut.get(t);void 0===a&&(n.setAttribute("class",i.strings.join(" ")),ut.set(t,a=new Set));const s=n.classList||new ht(n);a.forEach((t=>{t in e||(s.remove(t),a.delete(t))}));for(const t in e){const i=e[t];i!=a.has(t)&&(i?(s.add(t),a.add(t)):(s.remove(t),a.delete(t)))}"function"==typeof s.commit&&s.commit()})),ft=(e,t)=>{const i=e.startNode.parentNode,n=void 0===t?e.endNode:t.startNode,a=i.insertBefore(k(),n);i.insertBefore(k(),n);const s=new F(e.options);return s.insertAfterNode(a),s},yt=(e,t)=>(e.setValue(t),e.commit(),e),mt=(e,t,i)=>{const n=e.startNode.parentNode,a=i?i.startNode:e.endNode,s=t.endNode.nextSibling;s!==a&&f(n,t.startNode,s,a)},gt=e=>{y(e.startNode.parentNode,e.startNode,e.endNode.nextSibling)},vt=(e,t,i)=>{const n=new Map;for(let a=t;a<=i;a++)n.set(e[a],a);return n},bt=new WeakMap,_t=new WeakMap,wt=T(((e,t,i)=>{let n;return void 0===i?i=t:void 0!==t&&(n=t),t=>{if(!(t instanceof F))throw new Error("repeat can only be used in text bindings");const a=bt.get(t)||[],s=_t.get(t)||[],r=[],o=[],l=[];let d,c,h=0;for(const t of e)l[h]=n?n(t,h):h,o[h]=i(t,h),h++;let u=0,p=a.length-1,f=0,y=o.length-1;for(;u<=p&&f<=y;)if(null===a[u])u++;else if(null===a[p])p--;else if(s[u]===l[f])r[f]=yt(a[u],o[f]),u++,f++;else if(s[p]===l[y])r[y]=yt(a[p],o[y]),p--,y--;else if(s[u]===l[y])r[y]=yt(a[u],o[y]),mt(t,a[u],r[y+1]),u++,y--;else if(s[p]===l[f])r[f]=yt(a[p],o[f]),mt(t,a[p],a[u]),p--,f++;else if(void 0===d&&(d=vt(l,f,y),c=vt(s,u,p)),d.has(s[u]))if(d.has(s[p])){const e=c.get(l[f]),i=void 0!==e?a[e]:null;if(null===i){const e=ft(t,a[u]);yt(e,o[f]),r[f]=e}else r[f]=yt(i,o[f]),mt(t,i,a[u]),a[e]=null;f++}else gt(a[p]),p--;else gt(a[u]),u++;for(;f<=y;){const e=ft(t,r[y+1]);yt(e,o[f]),r[f++]=e}for(;u<=p;){const e=a[u++];null!==e&&gt(e)}bt.set(t,r),_t.set(t,l)}}));function kt(e,t,i){return new Date(Date.UTC(e,t,i))}const xt=G`<svg height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>`,St=G`<svg height="24" viewBox="0 0 24 24" width="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>`,Dt=ve`
button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  background: none; /** NOTE: IE11 fix */
  color: inherit;
  border: none;
  font: inherit;
  text-align: left;
  text-transform: inherit;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
`;ve`
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  position: relative;
  display: inline-block;
  background: initial;
  color: inherit;
  font: inherit;
  text-transform: inherit;
  text-decoration: none;
  outline: none;
}
a:focus,
a:focus.page-selected {
  text-decoration: underline;
}
`,ve`
svg {
  display: block;
  min-width: var(--svg-icon-min-width, 24px);
  min-height: var(--svg-icon-min-height, 24px);
  fill: var(--svg-icon-fill, currentColor);
  pointer-events: none;
}
`,ve`[hidden] { display: none !important; }`;const Et=ve`
:host {
  display: block;

  /* --app-datepicker-width: 300px; */
  /* --app-datepicker-primary-color: #4285f4; */
  /* --app-datepicker-header-height: 80px; */
}

* {
  box-sizing: border-box;
}
`;function Ct(e,t){return+t-+e}function Tt({hasAltKey:e,keyCode:t,focusedDate:i,selectedDate:n,disabledDaysSet:a,disabledDatesSet:s,minTime:r,maxTime:o}){const l=i.getUTCFullYear(),d=i.getUTCMonth(),c=i.getUTCDate(),h=+i,u=n.getUTCFullYear(),p=n.getUTCMonth();let f=l,y=d,m=c,g=!0;switch((p!==d||u!==l)&&(f=u,y=p,m=1,g=34===t||33===t||35===t),g){case h===r&&nt.has(t):case h===o&&at.has(t):break;case 38===t:m-=7;break;case 40===t:m+=7;break;case 37===t:m-=1;break;case 39===t:m+=1;break;case 34===t:e?f+=1:y+=1;break;case 33===t:e?f-=1:y-=1;break;case 35===t:y+=1,m=0;break;case 36===t:default:m=1}if(34===t||33===t){const e=kt(f,y+1,0).getUTCDate();m>e&&(m=e)}return function({keyCode:e,disabledDaysSet:t,disabledDatesSet:i,focusedDate:n,maxTime:a,minTime:s}){const r=+n;let o=r<s,l=r>a;if(Ct(s,a)<864e5)return n;let d=o||l||t.has(n.getUTCDay())||i.has(r);if(!d)return n;let c=0,h=o===l?n:new Date(o?s-864e5:864e5+a);const u=h.getUTCFullYear(),p=h.getUTCMonth();let f=h.getUTCDate();for(;d;)(o||!l&&st.has(e))&&(f+=1),(l||!o&&rt.has(e))&&(f-=1),h=kt(u,p,f),c=+h,o||(o=c<s,o&&(h=new Date(s),c=+h,f=h.getUTCDate())),l||(l=c>a,l&&(h=new Date(a),c=+h,f=h.getUTCDate())),d=t.has(h.getUTCDay())||i.has(c);return h}({keyCode:t,maxTime:o,minTime:r,disabledDaysSet:a,disabledDatesSet:s,focusedDate:kt(f,y,m)})}function Mt(e,t,i){return e.dispatchEvent(new CustomEvent(t,{detail:i,bubbles:!0,composed:!0}))}function Pt(e,t){return e.composedPath().find((e=>e instanceof HTMLElement&&t(e)))}function $t(e){return t=>e.format(t).replace(/\u200e/gi,"")}function Nt(e){const t=et(e,{timeZone:"UTC",weekday:"short",month:"short",day:"numeric"}),i=et(e,{timeZone:"UTC",day:"numeric"}),n=et(e,{timeZone:"UTC",year:"numeric",month:"short",day:"numeric"}),a=et(e,{timeZone:"UTC",year:"numeric",month:"long"}),s=et(e,{timeZone:"UTC",weekday:"long"}),r=et(e,{timeZone:"UTC",weekday:"narrow"}),o=et(e,{timeZone:"UTC",year:"numeric"});return{locale:e,dateFormat:$t(t),dayFormat:$t(i),fullDateFormat:$t(n),longMonthYearFormat:$t(a),longWeekdayFormat:$t(s),narrowWeekdayFormat:$t(r),yearFormat:$t(o)}}function Lt(e,t){const i=function(e,t){const i=t.getUTCFullYear(),n=t.getUTCMonth(),a=t.getUTCDate(),s=t.getUTCDay();let r=s;return"first-4-day-week"===e&&(r=3),"first-day-of-year"===e&&(r=6),"first-full-week"===e&&(r=0),kt(i,n,a-s+r)}(e,t),n=kt(i.getUTCFullYear(),0,1),a=1+(+i-+n)/864e5;return Math.ceil(a/7)}function Ot(e){if(e>=0&&e<7)return Math.abs(e);return((e<0?7*Math.ceil(Math.abs(e)):0)+e)%7}function At(e,t,i){const n=Ot(e-t);return i?1+n:n}function zt(e){const{dayFormat:t,fullDateFormat:i,locale:n,longWeekdayFormat:a,narrowWeekdayFormat:s,selectedDate:r,disabledDates:o,disabledDays:l,firstDayOfWeek:d,max:c,min:h,showWeekNumber:u,weekLabel:p,weekNumberType:f}=e,y=null==h?Number.MIN_SAFE_INTEGER:+h,m=null==c?Number.MAX_SAFE_INTEGER:+c,g=function(e){const{firstDayOfWeek:t=0,showWeekNumber:i=!1,weekLabel:n,longWeekdayFormat:a,narrowWeekdayFormat:s}=e||{},r=1+(t+(t<0?7:0))%7,o=n||"Wk",l=i?[{label:"Wk"===o?"Week":o,value:o}]:[];return Array.from(Array(7)).reduce(((e,t,i)=>{const n=kt(2017,0,r+i);return e.push({label:a(n),value:s(n)}),e}),l)}({longWeekdayFormat:a,narrowWeekdayFormat:s,firstDayOfWeek:d,showWeekNumber:u,weekLabel:p}),v=e=>[n,e.toJSON(),null==o?void 0:o.join("_"),null==l?void 0:l.join("_"),d,null==c?void 0:c.toJSON(),null==h?void 0:h.toJSON(),u,p,f].filter(Boolean).join(":"),b=r.getUTCFullYear(),_=r.getUTCMonth(),w=[-1,0,1].map((e=>{const a=kt(b,_+e,1),s=+kt(b,_+e+1,0),r=v(a);if(s<y||+a>m)return{key:r,calendar:[],disabledDatesSet:new Set,disabledDaysSet:new Set};return{...function(e){const{dayFormat:t,fullDateFormat:i,locale:n="en-US",selectedDate:a,disabledDates:s=[],disabledDays:r=[],firstDayOfWeek:o=0,max:l,min:d,showWeekNumber:c=!1,weekLabel:h="Week",weekNumberType:u="first-4-day-week"}=e||{},p=Ot(o),f=a.getUTCFullYear(),y=a.getUTCMonth(),m=kt(f,y,1),g=new Set(r.map((e=>At(e,p,c)))),v=new Set(s.map((e=>+e))),b=[m.toJSON(),p,n,null==l?"":l.toJSON(),null==d?"":d.toJSON(),Array.from(g).join(","),Array.from(v).join(","),u].filter(Boolean).join(":"),_=At(m.getUTCDay(),p,c),w=null==d?+new Date("2000-01-01"):+d,k=null==l?+new Date("2100-12-31"):+l,x=c?8:7,S=kt(f,1+y,0).getUTCDate(),D=[];let E=[],C=!1,T=1;for(const e of[0,1,2,3,4,5]){for(const n of[0,1,2,3,4,5,6].concat(7===x?[]:[7])){const a=n+e*x;if(!C&&c&&0===n){const t=Lt(u,kt(f,y,T-(e<1?p:0))),i=`${h} ${t}`;E.push({fullDate:null,label:i,value:`${t}`,key:`${b}:${i}`,disabled:!0});continue}if(C||a<_){E.push({fullDate:null,label:"",value:"",key:`${b}:${a}`,disabled:!0});continue}const s=kt(f,y,T),r=+s,o=g.has(n)||v.has(r)||r<w||r>k;o&&v.add(r),E.push({fullDate:s,label:i(s),value:t(s),key:`${b}:${s.toJSON()}`,disabled:o}),T+=1,T>S&&(C=!0)}D.push(E),E=[]}return{disabledDatesSet:v,calendar:D,disabledDaysSet:new Set(r.map((e=>Ot(e)))),key:b}}({dayFormat:t,fullDateFormat:i,locale:n,disabledDates:o,disabledDays:l,firstDayOfWeek:d,max:c,min:h,showWeekNumber:u,weekNumberType:f,selectedDate:a}),key:r}})),k=[],x=new Set,S=new Set;for(const e of w){const{disabledDatesSet:t,disabledDaysSet:i,...n}=e;if(n.calendar.length>0){if(i.size>0)for(const e of i)S.add(e);if(t.size>0)for(const e of t)x.add(e)}k.push(n)}return{calendars:k,weekdays:g,disabledDatesSet:x,disabledDaysSet:S,key:v(r)}}function Vt(e){const t=null==e?new Date:new Date(e),i="string"==typeof e&&(/^\d{4}-\d{2}-\d{2}$/i.test(e)||/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(Z|\+00:00|-00:00)$/i.test(e)),n="number"==typeof e&&e>0&&isFinite(e);let a=t.getFullYear(),s=t.getMonth(),r=t.getDate();return(i||n)&&(a=t.getUTCFullYear(),s=t.getUTCMonth(),r=t.getUTCDate()),kt(a,s,r)}function Ut(e,t){return e.classList.contains(t)}function Rt(e,t){return!(null==e||!(t instanceof Date)||isNaN(+t))}function Ft(e){return e-Math.floor(e)>0?+e.toFixed(3):e}function It(e){return{passive:!0,handleEvent:e}}function jt(e,t){const i="string"==typeof e&&e.length>0?e.split(/,\s*/i):[];return i.length?"function"==typeof t?i.map(t):i:[]}function Wt(e){if(e instanceof Date&&!isNaN(+e)){const t=e.toJSON();return null==t?"":t.replace(/^(.+)T.+/i,"$1")}return""}function qt(e,t){if(Ct(e,t)<864e5)return[];const i=e.getUTCFullYear();return Array.from(Array(t.getUTCFullYear()-i+1),((e,t)=>t+i))}function Ht(e,t,i){const n="number"==typeof e?e:+e,a=+t,s=+i;return n<a?a:n>s?s:e}let Bt=!1;const Yt=()=>{},Zt={get passive(){return Bt=!0,!1}};document.addEventListener("x",Yt,Zt),document.removeEventListener("x",Yt);const Jt=Bt;function Kt(e){const{clientX:t,clientY:i,pageX:n,pageY:a}=e,s=Math.max(n,t),r=Math.max(a,i),o=e.identifier||e.pointerId;return{x:s,y:r,id:null==o?0:o}}function Gt(e,t){const i=t.changedTouches;if(null==i)return{newPointer:Kt(t),oldPointer:e};const n=Array.from(i,(e=>Kt(e)));return{newPointer:null==e?n[0]:n.find((t=>t.id===e.id)),oldPointer:e}}function Xt(e,t,i){e.addEventListener(t,i,!!Jt&&{passive:!0})}class Qt{constructor(e,t){this._element=e,this._startPointer=null;const{down:i,move:n,up:a}=t;this._down=this._onDown(i),this._move=this._onMove(n),this._up=this._onUp(a),e&&e.addEventListener&&(e.addEventListener("mousedown",this._down),Xt(e,"touchstart",this._down),Xt(e,"touchmove",this._move),Xt(e,"touchend",this._up))}disconnect(){const e=this._element;e&&e.removeEventListener&&(e.removeEventListener("mousedown",this._down),e.removeEventListener("touchstart",this._down),e.removeEventListener("touchmove",this._move),e.removeEventListener("touchend",this._up))}_onDown(e){return t=>{t instanceof MouseEvent&&(this._element.addEventListener("mousemove",this._move),this._element.addEventListener("mouseup",this._up),this._element.addEventListener("mouseleave",this._up));const{newPointer:i}=Gt(this._startPointer,t);e(i,t),this._startPointer=i}}_onMove(e){return t=>{this._updatePointers(e,t)}}_onUp(e){return t=>{this._updatePointers(e,t,!0)}}_updatePointers(e,t,i){i&&t instanceof MouseEvent&&(this._element.removeEventListener("mousemove",this._move),this._element.removeEventListener("mouseup",this._up),this._element.removeEventListener("mouseleave",this._up));const{newPointer:n,oldPointer:a}=Gt(this._startPointer,t);e(n,a,t),this._startPointer=i?null:n}}class ei extends _e{constructor(){super(),this.firstDayOfWeek=0,this.showWeekNumber=!1,this.weekNumberType="first-4-day-week",this.landscape=!1,this.locale=et&&et().resolvedOptions&&et().resolvedOptions().locale||"en-US",this.disabledDays="",this.disabledDates="",this.weekLabel="Wk",this.inline=!1,this.dragRatio=.15,this._hasMin=!1,this._hasMax=!1,this._disabledDaysSet=new Set,this._disabledDatesSet=new Set,this._dx=-1/0,this._hasNativeWebAnimation="animate"in HTMLElement.prototype,this._updatingDateWithKey=!1;const e=Vt(),t=Nt(this.locale),i=Wt(e),n=Vt("2100-12-31");this.value=i,this.startView="calendar",this._min=new Date(e),this._max=new Date(n),this._todayDate=e,this._maxDate=n,this._yearList=qt(e,n),this._selectedDate=new Date(e),this._focusedDate=new Date(e),this._formatters=t}get startView(){return this._startView}set startView(e){const t=e||"calendar";if("calendar"!==t&&"yearList"!==t)return;const i=this._startView;this._startView=t,this.requestUpdate("startView",i)}get min(){return this._hasMin?Wt(this._min):""}set min(e){const t=Vt(e),i=Rt(e,t);this._min=i?t:this._todayDate,this._hasMin=i,this.requestUpdate("min")}get max(){return this._hasMax?Wt(this._max):""}set max(e){const t=Vt(e),i=Rt(e,t);this._max=i?t:this._maxDate,this._hasMax=i,this.requestUpdate("max")}get value(){return Wt(this._focusedDate)}set value(e){const t=Vt(e),i=Rt(e,t)?t:this._todayDate;this._focusedDate=new Date(i),this._selectedDate=this._lastSelectedDate=new Date(i)}get datepickerBodyCalendarView(){return this.shadowRoot.querySelector(".datepicker-body__calendar-view")}get calendarsContainer(){return this.shadowRoot.querySelector(".calendars-container")}disconnectedCallback(){super.disconnectedCallback(),this._tracker&&(this._tracker.disconnect(),this._tracker=void 0)}render(){this._formatters.locale!==this.locale&&(this._formatters=Nt(this.locale));const e="yearList"===this._startView?this._renderDatepickerYearList():this._renderDatepickerCalendar(),t=this.inline?null:G`<div class="datepicker-header" part="header">${this._renderHeaderSelectorButton()}</div>`;return G`
    ${t}
    <div class="datepicker-body" part="body">${ct(e)}</div>
    `}firstUpdated(){let e;e="calendar"===this._startView?this.inline?this.shadowRoot.querySelector(".btn__month-selector"):this._buttonSelectorYear:this._yearViewListItem,Mt(this,"datepicker-first-updated",{firstFocusableElement:e,value:this.value})}updated(e){const t=this._startView;if(e.has("min")||e.has("max")){this._yearList=qt(this._min,this._max),"yearList"===t&&this.requestUpdate();const e=+this._min,i=+this._max;if(Ct(e,i)>864e5){const t=+this._focusedDate;let n=t;t<e&&(n=e),t>i&&(n=i),this.value=Wt(new Date(n))}}if(e.has("_startView")||e.has("startView")){if("yearList"===t){const e=48*(this._selectedDate.getUTCFullYear()-this._min.getUTCFullYear()-2);!function(e,t){if(null==e.scrollTo){const{top:i,left:n}=t||{};e.scrollTop=i||0,e.scrollLeft=n||0}else e.scrollTo(t)}(this._yearViewFullList,{top:e,left:0})}if("calendar"===t&&null==this._tracker){const e=this.calendarsContainer;let t=!1,i=!1,n=!1;if(e){const a={down:()=>{n||(t=!0,this._dx=0)},move:(a,s)=>{if(n||!t)return;const r=this._dx,o=r<0&&Ut(e,"has-max-date")||r>0&&Ut(e,"has-min-date");!o&&Math.abs(r)>0&&t&&(i=!0,e.style.transform=`translateX(${Ft(r)}px)`),this._dx=o?0:r+(a.x-s.x)},up:async(a,s,r)=>{if(t&&i){const a=this._dx,s=e.getBoundingClientRect().width/3,r=Math.abs(a)>Number(this.dragRatio)*s,o=350,l="cubic-bezier(0, 0, .4, 1)",d=r?Ft(s*(a<0?-1:1)):0;n=!0,await async function(e,t){const{hasNativeWebAnimation:i=!1,keyframes:n=[],options:a={duration:100}}=t||{};if(Array.isArray(n)&&n.length)return new Promise((t=>{if(i)e.animate(n,a).onfinish=()=>t();else{const[,i]=n||[],s=()=>{e.removeEventListener("transitionend",s),t()};e.addEventListener("transitionend",s),e.style.transitionDuration=`${a.duration}ms`,a.easing&&(e.style.transitionTimingFunction=a.easing),Object.keys(i).forEach((t=>{t&&(e.style[t]=i[t])}))}}))}(e,{hasNativeWebAnimation:this._hasNativeWebAnimation,keyframes:[{transform:`translateX(${a}px)`},{transform:`translateX(${d}px)`}],options:{duration:o,easing:l}}),r&&this._updateMonth(a<0?"next":"previous").handleEvent(),t=i=n=!1,this._dx=-1/0,e.removeAttribute("style"),Mt(this,"datepicker-animation-finished")}else t&&(this._updateFocusedDate(r),t=i=!1,this._dx=-1/0)}};this._tracker=new Qt(e,a)}}e.get("_startView")&&"calendar"===t&&this._focusElement('[part="year-selector"]')}this._updatingDateWithKey&&(this._focusElement('[part="calendars"]:nth-of-type(2) .day--focused'),this._updatingDateWithKey=!1)}_focusElement(e){const t=this.shadowRoot.querySelector(e);t&&t.focus()}_renderHeaderSelectorButton(){const{yearFormat:e,dateFormat:t}=this._formatters,i="calendar"===this.startView,n=this._focusedDate,a=t(n),s=e(n);return G`
    <button
      class="${pt({"btn__year-selector":!0,selected:!i})}"
      type="button"
      part="year-selector"
      data-view="${"yearList"}"
      @click="${this._updateView("yearList")}">${s}</button>

    <div class="datepicker-toolbar" part="toolbar">
      <button
        class="${pt({"btn__calendar-selector":!0,selected:i})}"
        type="button"
        part="calendar-selector"
        data-view="${"calendar"}"
        @click="${this._updateView("calendar")}">${a}</button>
    </div>
    `}_renderDatepickerYearList(){const{yearFormat:e}=this._formatters,t=this._focusedDate.getUTCFullYear();return G`
    <div class="datepicker-body__year-list-view" part="year-list-view">
      <div class="year-list-view__full-list" part="year-list" @click="${this._updateYear}">
      ${this._yearList.map((i=>G`<button
        class="${pt({"year-list-view__list-item":!0,"year--selected":t===i})}"
        type="button"
        part="year"
        .year="${i}">${e(kt(i,0,1))}</button>`))}</div>
    </div>
    `}_renderDatepickerCalendar(){const{longMonthYearFormat:e,dayFormat:t,fullDateFormat:i,longWeekdayFormat:n,narrowWeekdayFormat:a}=this._formatters,s=jt(this.disabledDays,Number),r=jt(this.disabledDates,Vt),o=this.showWeekNumber,l=this._focusedDate,d=this.firstDayOfWeek,c=Vt(),h=this._selectedDate,u=this._max,p=this._min,{calendars:f,disabledDaysSet:y,disabledDatesSet:m,weekdays:g}=zt({dayFormat:t,fullDateFormat:i,longWeekdayFormat:n,narrowWeekdayFormat:a,firstDayOfWeek:d,disabledDays:s,disabledDates:r,locale:this.locale,selectedDate:h,showWeekNumber:this.showWeekNumber,weekNumberType:this.weekNumberType,max:u,min:p,weekLabel:this.weekLabel}),v=!f[0].calendar.length,b=!f[2].calendar.length,_=g.map((e=>G`<th
        class="calendar-weekday"
        part="calendar-weekday"
        role="columnheader"
        aria-label="${e.label}"
      >
        <div class="weekday" part="weekday">${e.value}</div>
      </th>`)),w=wt(f,(e=>e.key),(({calendar:t},i)=>{if(!t.length)return G`<div class="calendar-container" part="calendar"></div>`;const n=`calendarcaption${i}`,a=t[1][1].fullDate,s=1===i,r=s&&!this._isInVisibleMonth(l,h)?Tt({disabledDaysSet:y,disabledDatesSet:m,hasAltKey:!1,keyCode:36,focusedDate:l,selectedDate:h,minTime:+p,maxTime:+u}):l;return G`
      <div class="calendar-container" part="calendar">
        <table class="calendar-table" part="table" role="grid" aria-labelledby="${n}">
          <caption id="${n}">
            <div class="calendar-label" part="label">${a?e(a):""}</div>
          </caption>

          <thead role="rowgroup">
            <tr class="calendar-weekdays" part="weekdays" role="row">${_}</tr>
          </thead>

          <tbody role="rowgroup">${t.map((e=>G`<tr role="row">${e.map(((e,t)=>{const{disabled:i,fullDate:n,label:a,value:d}=e;if(!n&&d&&o&&t<1)return G`<th
                      class="full-calendar__day weekday-label"
                      part="calendar-day"
                      scope="row"
                      role="rowheader"
                      abbr="${a}"
                      aria-label="${a}"
                    >${d}</th>`;if(!d||!n)return G`<td class="full-calendar__day day--empty" part="calendar-day"></td>`;const h=+new Date(n),u=+l===h,p=s&&r.getUTCDate()===Number(d);return G`
                  <td
                    tabindex="${p?"0":"-1"}"
                    class="${pt({"full-calendar__day":!0,"day--disabled":i,"day--today":+c===h,"day--focused":!i&&u})}"
                    part="calendar-day"
                    role="gridcell"
                    aria-disabled="${i?"true":"false"}"
                    aria-label="${a}"
                    aria-selected="${u?"true":"false"}"
                    .fullDate="${n}"
                    .day="${d}"
                  >
                    <div class="calendar-day" part="day">${d}</div>
                  </td>
                  `}))}</tr>`))}</tbody>
        </table>
      </div>
      `}));return this._disabledDatesSet=m,this._disabledDaysSet=y,G`
    <div class="datepicker-body__calendar-view" part="calendar-view">
      <div class="calendar-view__month-selector" part="month-selectors">
        <div class="month-selector-container">${v?null:G`
          <button
            class="btn__month-selector"
            type="button"
            part="month-selector"
            aria-label="Previous month"
            @click="${this._updateMonth("previous")}"
          >${xt}</button>
        `}</div>

        <div class="month-selector-container">${b?null:G`
          <button
            class="btn__month-selector"
            type="button"
            part="month-selector"
            aria-label="Next month"
            @click="${this._updateMonth("next")}"
          >${St}</button>
        `}</div>
      </div>

      <div
        class="${pt({"calendars-container":!0,"has-min-date":v,"has-max-date":b})}"
        part="calendars"
        @keyup="${this._updateFocusedDateWithKeyboard}"
      >${w}</div>
    </div>
    `}_updateView(e){return It((()=>{"calendar"===e&&(this._selectedDate=this._lastSelectedDate=new Date(Ht(this._focusedDate,this._min,this._max))),this._startView=e}))}_updateMonth(e){return It((()=>{if(null==this.calendarsContainer)return this.updateComplete;const t=this._lastSelectedDate||this._selectedDate,i=this._min,n=this._max,a="previous"===e,s=kt(t.getUTCFullYear(),t.getUTCMonth()+(a?-1:1),1),r=s.getUTCFullYear(),o=s.getUTCMonth(),l=i.getUTCFullYear(),d=i.getUTCMonth(),c=n.getUTCFullYear(),h=n.getUTCMonth();return r<l||r<=l&&o<d||(r>c||r>=c&&o>h)||(this._lastSelectedDate=s,this._selectedDate=this._lastSelectedDate),this.updateComplete}))}_updateYear(e){const t=Pt(e,(e=>Ut(e,"year-list-view__list-item")));if(null==t)return;const i=Ht(new Date(this._focusedDate).setUTCFullYear(+t.year),this._min,this._max);this._selectedDate=this._lastSelectedDate=new Date(i),this._focusedDate=new Date(i),this._startView="calendar"}_updateFocusedDate(e){const t=Pt(e,(e=>Ut(e,"full-calendar__day")));null==t||["day--empty","day--disabled","day--focused","weekday-label"].some((e=>Ut(t,e)))||(this._focusedDate=new Date(t.fullDate),Mt(this,"datepicker-value-updated",{isKeypress:!1,value:this.value}))}_updateFocusedDateWithKeyboard(e){const t=e.keyCode;if(13===t||32===t)return Mt(this,"datepicker-value-updated",{keyCode:t,isKeypress:!0,value:this.value}),void(this._focusedDate=new Date(this._selectedDate));if(9===t||!ot.has(t))return;const i=this._selectedDate,n=Tt({keyCode:t,selectedDate:i,disabledDatesSet:this._disabledDatesSet,disabledDaysSet:this._disabledDaysSet,focusedDate:this._focusedDate,hasAltKey:e.altKey,maxTime:+this._max,minTime:+this._min});this._isInVisibleMonth(n,i)||(this._selectedDate=this._lastSelectedDate=n),this._focusedDate=n,this._updatingDateWithKey=!0,Mt(this,"datepicker-value-updated",{keyCode:t,isKeypress:!0,value:this.value})}_isInVisibleMonth(e,t){const i=e.getUTCFullYear(),n=e.getUTCMonth(),a=t.getUTCFullYear(),s=t.getUTCMonth();return i===a&&n===s}}var ti,ii;ei.styles=[Et,Dt,ve`
    :host {
      width: 312px;
      /** NOTE: Magic number as 16:9 aspect ratio does not look good */
      /* height: calc((var(--app-datepicker-width) / .66) - var(--app-datepicker-footer-height, 56px)); */
      background-color: var(--app-datepicker-bg-color, #fff);
      color: var(--app-datepicker-color, #000);
      border-radius:
        var(--app-datepicker-border-top-left-radius, 0)
        var(--app-datepicker-border-top-right-radius, 0)
        var(--app-datepicker-border-bottom-right-radius, 0)
        var(--app-datepicker-border-bottom-left-radius, 0);
      contain: content;
      overflow: hidden;
    }
    :host([landscape]) {
      display: flex;

      /** <iphone-5-landscape-width> - <standard-side-margin-width> */
      min-width: calc(568px - 16px * 2);
      width: calc(568px - 16px * 2);
    }

    .datepicker-header + .datepicker-body {
      border-top: 1px solid var(--app-datepicker-separator-color, #ddd);
    }
    :host([landscape]) > .datepicker-header + .datepicker-body {
      border-top: none;
      border-left: 1px solid var(--app-datepicker-separator-color, #ddd);
    }

    .datepicker-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      position: relative;
      padding: 16px 24px;
    }
    :host([landscape]) > .datepicker-header {
      /** :this.<one-liner-month-day-width> + :this.<side-padding-width> */
      min-width: calc(14ch + 24px * 2);
    }

    .btn__year-selector,
    .btn__calendar-selector {
      color: var(--app-datepicker-selector-color, rgba(0, 0, 0, .55));
      cursor: pointer;
      /* outline: none; */
    }
    .btn__year-selector.selected,
    .btn__calendar-selector.selected {
      color: currentColor;
    }

    /**
      * NOTE: IE11-only fix. This prevents formatted focused date from overflowing the container.
      */
    .datepicker-toolbar {
      width: 100%;
    }

    .btn__year-selector {
      font-size: 16px;
      font-weight: 700;
    }
    .btn__calendar-selector {
      font-size: 36px;
      font-weight: 700;
      line-height: 1;
    }

    .datepicker-body {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .datepicker-body__calendar-view {
      min-height: 56px;
    }

    .calendar-view__month-selector {
      display: flex;
      align-items: center;

      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 0 8px;
      z-index: 1;
    }

    .month-selector-container {
      max-height: 56px;
      height: 100%;
    }
    .month-selector-container + .month-selector-container {
      margin: 0 0 0 auto;
    }

    .btn__month-selector {
      padding: calc((56px - 24px) / 2);
      /**
        * NOTE: button element contains no text, only SVG.
        * No extra height will incur with such setting.
        */
      line-height: 0;
    }
    .btn__month-selector > svg {
      fill: currentColor;
    }

    .calendars-container {
      display: flex;
      justify-content: center;

      position: relative;
      top: 0;
      left: calc(-100%);
      width: calc(100% * 3);
      transform: translateZ(0);
      will-change: transform;
      /**
        * NOTE: Required for Pointer Events API to work on touch devices.
        * Native \`pan-y\` action will be fired by the browsers since we only care about the
        * horizontal direction. This is great as vertical scrolling still works even when touch
        * event happens on a datepicker's calendar.
        */
      touch-action: pan-y;
      /* outline: none; */
    }

    .year-list-view__full-list {
      max-height: calc(48px * 7);
      overflow-y: auto;

      scrollbar-color: var(--app-datepicker-scrollbar-thumb-bg-color, rgba(0, 0, 0, .35)) rgba(0, 0, 0, 0);
      scrollbar-width: thin;
    }
    .year-list-view__full-list::-webkit-scrollbar {
      width: 8px;
      background-color: rgba(0, 0, 0, 0);
    }
    .year-list-view__full-list::-webkit-scrollbar-thumb {
      background-color: var(--app-datepicker-scrollbar-thumb-bg-color, rgba(0, 0, 0, .35));
      border-radius: 50px;
    }
    .year-list-view__full-list::-webkit-scrollbar-thumb:hover {
      background-color: var(--app-datepicker-scrollbar-thumb-hover-bg-color, rgba(0, 0, 0, .5));
    }

    .calendar-weekdays > th,
    .weekday-label {
      color: var(--app-datepicker-weekday-color, rgba(0, 0, 0, .55));
      font-weight: 400;
      transform: translateZ(0);
      will-change: transform;
    }

    .calendar-container,
    .calendar-label,
    .calendar-table {
      width: 100%;
    }

    .calendar-container {
      position: relative;
      padding: 0 16px 16px;
    }

    .calendar-table {
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;

      border-collapse: collapse;
      border-spacing: 0;
      text-align: center;
    }

    .calendar-label {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 56px;
      font-weight: 500;
      text-align: center;
    }

    .calendar-weekday,
    .full-calendar__day {
      position: relative;
      width: calc(100% / 7);
      height: 0;
      padding: calc(100% / 7 / 2) 0;
      outline: none;
      text-align: center;
    }
    .full-calendar__day:not(.day--disabled):focus {
      outline: #000 dotted 1px;
      outline: -webkit-focus-ring-color auto 1px;
    }
    :host([showweeknumber]) .calendar-weekday,
    :host([showweeknumber]) .full-calendar__day {
      width: calc(100% / 8);
      padding-top: calc(100% / 8);
      padding-bottom: 0;
    }
    :host([showweeknumber]) th.weekday-label {
      padding: 0;
    }

    /**
      * NOTE: Interesting fact! That is ::after will trigger paint when dragging. This will trigger
      * layout and paint on **ONLY** affected nodes. This is much cheaper as compared to rendering
      * all :::after of all calendar day elements. When dragging the entire calendar container,
      * because of all layout and paint trigger on each and every ::after, this becomes a expensive
      * task for the browsers especially on low-end devices. Even though animating opacity is much
      * cheaper, the technique does not work here. Adding 'will-change' will further reduce overall
      * painting at the expense of memory consumption as many cells in a table has been promoted
      * a its own layer.
      */
    .full-calendar__day:not(.day--empty):not(.day--disabled):not(.weekday-label) {
      transform: translateZ(0);
      will-change: transform;
    }
    .full-calendar__day:not(.day--empty):not(.day--disabled):not(.weekday-label).day--focused::after,
    .full-calendar__day:not(.day--empty):not(.day--disabled):not(.day--focused):not(.weekday-label):hover::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--app-datepicker-accent-color, #1a73e8);
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
    }
    .full-calendar__day:not(.day--empty):not(.day--disabled):not(.weekday-label) {
      cursor: pointer;
      pointer-events: auto;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .full-calendar__day.day--focused:not(.day--empty):not(.day--disabled):not(.weekday-label)::after,
    .full-calendar__day.day--today.day--focused:not(.day--empty):not(.day--disabled):not(.weekday-label)::after {
      opacity: 1;
    }

    .calendar-weekday > .weekday,
    .full-calendar__day > .calendar-day {
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
      top: 5%;
      left: 5%;
      width: 90%;
      height: 90%;
      color: currentColor;
      font-size: 14px;
      pointer-events: none;
      z-index: 1;
    }
    .full-calendar__day.day--today {
      color: var(--app-datepicker-accent-color, #1a73e8);
    }
    .full-calendar__day.day--focused,
    .full-calendar__day.day--today.day--focused {
      color: var(--app-datepicker-focused-day-color, #fff);
    }
    .full-calendar__day.day--empty,
    .full-calendar__day.weekday-label,
    .full-calendar__day.day--disabled > .calendar-day {
      pointer-events: none;
    }
    .full-calendar__day.day--disabled:not(.day--today) {
      color: var(--app-datepicker-disabled-day-color, rgba(0, 0, 0, .55));
    }

    .year-list-view__list-item {
      position: relative;
      width: 100%;
      padding: 12px 16px;
      text-align: center;
      /** NOTE: Reduce paint when hovering and scrolling, but this increases memory usage */
      /* will-change: opacity; */
      /* outline: none; */
    }
    .year-list-view__list-item::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--app-datepicker-focused-year-bg-color, #000);
      opacity: 0;
      pointer-events: none;
    }
    .year-list-view__list-item:focus::after {
      opacity: .05;
    }
    .year-list-view__list-item.year--selected {
      color: var(--app-datepicker-accent-color, #1a73e8);
      font-size: 24px;
      font-weight: 500;
    }

    @media (any-hover: hover) {
      .btn__month-selector:hover,
      .year-list-view__list-item:hover {
        cursor: pointer;
      }
      .full-calendar__day:not(.day--empty):not(.day--disabled):not(.day--focused):not(.weekday-label):hover::after {
        opacity: .15;
      }
      .year-list-view__list-item:hover::after {
        opacity: .05;
      }
    }

    @supports (background: -webkit-canvas(squares)) {
      .calendar-container {
        padding: 56px 16px 16px;
      }

      table > caption {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        will-change: transform;
      }
    }
    `],lt([ce({type:Number,reflect:!0})],ei.prototype,"firstDayOfWeek",void 0),lt([ce({type:Boolean,reflect:!0})],ei.prototype,"showWeekNumber",void 0),lt([ce({type:String,reflect:!0})],ei.prototype,"weekNumberType",void 0),lt([ce({type:Boolean,reflect:!0})],ei.prototype,"landscape",void 0),lt([ce({type:String,reflect:!0})],ei.prototype,"startView",null),lt([ce({type:String,reflect:!0})],ei.prototype,"min",null),lt([ce({type:String,reflect:!0})],ei.prototype,"max",null),lt([ce({type:String})],ei.prototype,"value",null),lt([ce({type:String})],ei.prototype,"locale",void 0),lt([ce({type:String})],ei.prototype,"disabledDays",void 0),lt([ce({type:String})],ei.prototype,"disabledDates",void 0),lt([ce({type:String})],ei.prototype,"weekLabel",void 0),lt([ce({type:Boolean})],ei.prototype,"inline",void 0),lt([ce({type:Number})],ei.prototype,"dragRatio",void 0),lt([ce({type:Date,attribute:!1})],ei.prototype,"_selectedDate",void 0),lt([ce({type:Date,attribute:!1})],ei.prototype,"_focusedDate",void 0),lt([ce({type:String,attribute:!1})],ei.prototype,"_startView",void 0),lt([he(".year-list-view__full-list")],ei.prototype,"_yearViewFullList",void 0),lt([he(".btn__year-selector")],ei.prototype,"_buttonSelectorYear",void 0),lt([he(".year-list-view__list-item")],ei.prototype,"_yearViewListItem",void 0),lt([fe({passive:!0})],ei.prototype,"_updateYear",null),lt([fe({passive:!0})],ei.prototype,"_updateFocusedDateWithKeyboard",null),ti="app-datepicker",ii=ei,window.customElements&&!window.customElements.get(ti)&&window.customElements.define(ti,ii);var ni="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";r([le("ha-route-day-picker")],(function(e,t){return{F:class extends t{constructor(){super(),e(this),this.open=!1}},d:[{kind:"field",decorators:[ce({attribute:!1})],key:"open",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"date",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"hass",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"disabled",value:void 0},{kind:"get",key:"_daypicker",value:function(){return this.shadowRoot.querySelector(".route-day-picker")}},{kind:"method",key:"render",value:function(){return G`
      <div @click=${this._openDateRange} class="date-range-inputs">
        <ha-svg-icon .path=${"M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"}></ha-svg-icon>
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
    `}},{kind:"get",static:!0,key:"styles",value:function(){return ve`
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
    `}},{kind:"method",key:"_openDateRange",value:function(){this.open=!0}},{kind:"method",key:"_closeDateRange",value:function(){this.open=!1}},{kind:"method",key:"_applyDateRange",value:function(){this.date=new Date(this._daypicker.value);let e=new CustomEvent("change",{detail:{date:this.date}});this.dispatchEvent(e),this._closeDateRange()}}]}}),_e),r([le("entity-multiselect-picker")],(function(e,t){return{F:class extends t{constructor(){super(),e(this),this.open=!1,this.searchValue=""}},d:[{kind:"field",decorators:[ce({attribute:!1})],key:"open",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"searchValue",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"selectedEntityIds",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"entityIds",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"hass",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"label",value:void 0},{kind:"method",key:"renderEntityId",value:function(e){const t=this.selectedEntityIds.includes(e[0]);return G`
      <div @click=${this._handleEntityClick} class="multiselect-list-element-container">
        <div class="multiselect-list-element-check">
          ${t?G`<ha-svg-icon
            .path=${"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}
          ></ha-svg-icon>`:G``}
        </div>
        <div class="multiselect-list-element">
          <div>${e[1]}</div>
          <div class="secondary">${e[0]}</div>
        </div>
      </div>`}},{kind:"get",key:"_inputElement",value:function(){return this.shadowRoot.querySelector(".paper-input-input")}},{kind:"get",key:"_filteredentityIds",value:function(){return this.searchValue?[...this.entityIds].filter((([e,t])=>e.includes(this.searchValue)||t.includes(this.searchValue))):[...this.entityIds]}},{kind:"method",key:"render",value:function(){return G`
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
            ${this.selectedEntityIds.length>0||this.searchValue?G`
                <mwc-icon-button
                  .label=${this.hass.localize("ui.components.entity.entity-picker.clear")}
                  tabindex="-1"
                  @click=${this._clearValues}
                  no-ripple
                >
                  <ha-svg-icon .path=${ni}></ha-svg-icon>
                </mwc-icon-button>
              `:""}
            <mwc-icon-button
              .label=${this.hass.localize("ui.components.entity.entity-picker.show_entities")}
              class="toggle-button"
              tabindex="-1"
            >
              <ha-svg-icon
                .path=${this.open?"M7,15L12,10L17,15H7Z":"M7,10L12,15L17,10H7Z"}
              ></ha-svg-icon>
            </mwc-icon-button>
          </div>
          <label slot="label">${void 0===this.label?this.hass.localize("ui.components.entity.entity-picker.entity"):this.label}</label>
          <div bind-value="" slot="input" class="multiselect-input-element" id="input-1">
            ${this.selectedEntityIds.length>0?this.selectedEntityIds.map((e=>G`
                  <div class="multiselect-tag">
                    <div class="multiselect-tag-text">${this.entityIds.get(e)}</div>
                    <mwc-icon-button
                      .label=${this.hass.localize("ui.components.entity.entity-picker.clear")}
                      class="multiselect-tag-remove-button"
                      tabindex="-1"
                      @click=${this._clearValue}
                      no-ripple
                    >
                      <ha-svg-icon .path=${ni}></ha-svg-icon>
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
    `}},{kind:"get",static:!0,key:"styles",value:function(){return ve`
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
    `}},{kind:"method",key:"_clearValues",value:function(){this._setSearchValue(""),this.selectedEntityIds=[],this.selectedEntityIdsChanged()}},{kind:"method",key:"_clearValue",value:function(e){const t=e.path[6].innerText,i=this.selectedEntityIds.findIndex((e=>this.entityIds.get(e)===t));i>-1&&this.selectedEntityIds.splice(i,1),this.requestUpdate("selectedEntityIds"),this.selectedEntityIdsChanged()}},{kind:"method",key:"_setSearchValue",value:function(e){this.searchValue=e,this._inputElement.value=this.searchValue}},{kind:"method",key:"_searchValueChanged",value:function(){this.searchValue=this._inputElement.value}},{kind:"method",key:"_openMultiselectPopup",value:function(){this.open=!0}},{kind:"method",key:"_closeMultiselectPopup",value:function(){this.open=!1}},{kind:"method",key:"_handleEntityClick",value:function(e){const t=e.path.find((e=>"multiselect-list-element-container"==e.className)).getElementsByClassName("multiselect-list-element")[0].getElementsByClassName("secondary")[0].innerText,i=this.selectedEntityIds.indexOf(t);i>-1?this.selectedEntityIds.splice(i,1):this.selectedEntityIds.push(t),this.requestUpdate("selectedEntityIds"),this.selectedEntityIdsChanged(),this._setSearchValue("")}},{kind:"method",key:"selectedEntityIdsChanged",value:function(){let e=new CustomEvent("change",{detail:{date:this.selectedEntityIds}});this.dispatchEvent(e)}}]}}),_e);const ai=(e,t)=>e.tileLayer(`https://{s}.basemaps.cartocdn.com/${t?"dark_all":"light_all"}/{z}/{x}/{y}${e.Browser.retina?"@2x.png":".png"}`,{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',subdomains:"abcd",minZoom:0,maxZoom:20});r([le("ha-route-map")],(function(e,n){class a extends n{constructor(){super(),e(this),this.markers=[],this.polyLines=[]}}return{F:a,d:[{kind:"field",decorators:[ce({attribute:!1})],key:"markers",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"polyLines",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"map",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"hass",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"routeData",value:void 0},{kind:"field",key:"Leaflet",value:void 0},{kind:"field",key:"_darkMode",value:void 0},{kind:"field",key:"loadMapPromise",value:void 0},{kind:"field",key:"tileLayer",value:void 0},{kind:"method",key:"fitMap",value:function(){let e;0===this.markers.length?this.map.setView(new this.Leaflet.LatLng(this.hass.config.latitude,this.hass.config.longitude),14):(e=new this.Leaflet.latLngBounds(this.markers.map((e=>e.getLatLng()))),this.map.fitBounds(e.pad(.5)))}},{kind:"method",key:"loadMap",value:async function(){this._darkMode=this.hass.themes.darkMode;var e=this.shadowRoot.getElementById("map");[this.map,this.Leaflet,this.tileLayer]=await(async(e,t)=>{if(!e.parentNode)throw new Error("Cannot setup Leaflet map on disconnected element");const i=(await import("./c.3117dd7e.js").then((function(e){return e.l}))).default;i.Icon.Default.imagePath="/static/images/leaflet/images/";const n=i.map(e),a=document.createElement("link");return a.setAttribute("href","/static/images/leaflet/leaflet.css"),a.setAttribute("rel","stylesheet"),e.parentNode.appendChild(a),n.setView([52.3731339,4.8903147],13),[n,i,ai(i,Boolean(t)).addTo(n)]})(e,this._darkMode),this.map.invalidateSize(),this.fitMap()}},{kind:"method",key:"firstUpdated",value:function(e){i(t(a.prototype),"firstUpdated",this).call(this,e),this.loadMapPromise=this.loadMap()}},{kind:"method",key:"updateMapItems",value:async function(){await this.loadMapPromise;for(const[r,o]of this.routeData.entries()){var e="#"+(16777216+16777215*Math.random()).toString(16).substr(1,6),t=null,i=0;for(const l of o){var n=this.Leaflet.marker([l.latitude,l.longitude],{title:`${i} ${r} ${l.time} ${l.street}`});if(++i,n.addTo(this.map),this.markers.push(n),t){var a=[[t.latitude,t.longitude],[l.latitude,l.longitude]];(await new Promise((e=>{var t=new XMLHttpRequest;t.open("GET",`https://routing.openstreetmap.de/routed-foot/route/v1/driving/${a[0][1]},${a[0][0]};${a[1][1]},${a[1][0]}?overview=false&geometries=geojson&steps=true`,!0),t.responseType="json",t.onload=function(){e(t.response)},t.send()}))).routes[0].legs[0].steps.map((e=>e.geometry.coordinates.map((e=>a.splice(a.length-1,0,[e[1],e[0]])))));var s=this.Leaflet.polyline(a,{color:e});s.addTo(this.map),this.polyLines.push(s)}t=l}}this.fitMap()}},{kind:"method",key:"updated",value:function(e){i(t(a.prototype),"updated",this).call(this,e),e.has("routeData")&&(null!=e.get("routeData")&&0!=e.get("routeData").size||this.map.invalidateSize(),this.markers.forEach((function(e){e.remove()})),this.markers=[],this.polyLines.forEach((function(e){e.remove()})),this.polyLines=[],0!=this.routeData.size&&this.updateMapItems())}},{kind:"method",key:"render",value:function(){return G`
      ${0==this.routeData.size?G`
          <div class="container no-entries" dir="ltr">
            ${this.hass.localize("ui.components.data-table.no-data")}
          </div>
        `:G``}
    <div id="map" ?hidden=${0==this.routeData.size}></div>`}},{kind:"get",static:!0,key:"styles",value:function(){return ve`
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
    `}}]}}),_e),r([le("ha-panel-route")],(function(e,n){class a extends n{constructor(){super(),e(this),this.day=new Date,this.routeData=new Map}}return{F:a,d:[{kind:"field",decorators:[ce({attribute:!1})],key:"day",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"routeData",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"_isLoading",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"_entityIds",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"hass",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"panel",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"narrow",value:void 0},{kind:"field",decorators:[ce({attribute:!1})],key:"entities",value:void 0},{kind:"method",key:"shouldUpdate",value:function(e){return e.has("routeData")?!this._isLoading:i(t(a.prototype),"shouldUpdate",this).call(this,e)}},{kind:"method",key:"getDistance",value:function(e,t){let i=this.toRadian(e[1]),n=this.toRadian(e[0]),a=this.toRadian(t[1]),s=this.toRadian(t[0]),r=s-n,o=a-i,l=Math.pow(Math.sin(r/2),2)+Math.cos(n)*Math.cos(s)*Math.pow(Math.sin(o/2),2);return 6371*(2*Math.asin(Math.sqrt(l)))*1e3}},{kind:"method",key:"toRadian",value:function(e){return e*Math.PI/180}},{kind:"method",key:"updateGPSHistory",value:async function(){if(0===this._entityIds.length)return void(this.routeData=new Map);this._isLoading=!0;const e=await((e,t,i)=>{let n=new Date(t);n.setHours(0,0,0,0);let a=new Date(t);return a.setHours(23,59,59),e.callApi("GET",`history/period/${n.toISOString()}?end_time=${a.toISOString()}&filter_entity_id=${i.join()}`)})(this.hass,this.day,this._entityIds);if(!e)return this._isLoading=!1,void(this.routeData=new Map);const t=new Map(this.routeData);this.routeData=new Map,e.forEach((e=>{if(0!==e.length){var t=null,i=new Array;for(let n=0;n<e.length;n++)if(""!=e[n].state&&e[n].state!==(t?t.state:"")){if(null==e[n].attributes.lati||null==e[n].attributes.long){if(console.log(e[n].attributes),null==e[n].attributes.latitude||null==e[n].attributes.longitude)continue;e[n].attributes.lati=e[n].attributes.latitude,e[n].attributes.long=e[n].attributes.longitude}e.length,i.push(new Qe(new Date(e[n].last_changed),e[n].attributes.lati,e[n].attributes.long,e[n].state)),t=e[n]}this.routeData.set(this.entities.get(e[0].entity_id),i)}})),this._isLoading=!1,this.requestUpdate("routeData",t)}},{kind:"method",key:"dateRangeChanged",value:function(e){this.day=new Date(e.detail.date)}},{kind:"method",key:"entityChanged",value:function(e){this._entityIds=[...e.detail.date]}},{kind:"method",key:"firstUpdated",value:function(e){i(t(a.prototype),"firstUpdated",this).call(this,e),this.entities=new Map(Object.entries(this.panel.config.entities)),this._entityIds=Array.from(this.entities.keys())}},{kind:"method",key:"updated",value:function(e){i(t(a.prototype),"updated",this).call(this,e),(e.has("_startDate")||e.has("_endDate")||e.has("_entityIds"))&&this.updateGPSHistory()}},{kind:"method",key:"render",value:function(){return G`
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
            .date=${this.day}
            ?disabled=${this._isLoading}
            ?narrow = ${this.narrow}
            @change=${this.dateRangeChanged}
          ></ha-route-day-picker>
          <entity-multiselect-picker
            .hass=${this.hass}
            .entityIds=${this.entities}
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
  `}},{kind:"get",static:!0,key:"styles",value:function(){return[ve`
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
      `]}}]}}),_e);
