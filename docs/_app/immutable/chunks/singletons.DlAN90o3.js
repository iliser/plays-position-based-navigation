import{a as k}from"./paths.DdZd3SIF.js";const u=[];function d(){}function E(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function p(t,e=d){let n=null;const s=new Set;function r(o){if(E(t,o)&&(t=o,n)){const c=!u.length;for(const i of s)i[1](),u.push(i,t);if(c){for(let i=0;i<u.length;i+=2)u[i][0](u[i+1]);u.length=0}}}function l(o){r(o(t))}function a(o,c=d){const i=[o,c];return s.add(i),s.size===1&&(n=e(r,l)||d),o(t),()=>{s.delete(i),s.size===0&&n&&(n(),n=null)}}return{set:r,update:l,subscribe:a}}const m="1718899782685",y="sveltekit:snapshot",I="sveltekit:scroll",T="sveltekit:states",w="sveltekit:pageurl",N="sveltekit:history",U="sveltekit:navigation",_={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},b=location.origin;function L(t){if(t instanceof URL)return t;let e=document.baseURI;if(!e){const n=document.getElementsByTagName("base");e=n.length?n[0].href:document.URL}return new URL(t,e)}function O(){return{x:pageXOffset,y:pageYOffset}}function f(t,e){return t.getAttribute(`data-sveltekit-${e}`)}const g={..._,"":_.hover};function v(t){let e=t.assignedSlot??t.parentNode;return e?.nodeType===11&&(e=e.host),e}function Y(t,e){for(;t&&t!==e;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=v(t)}}function x(t,e){let n;try{n=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI)}catch{}const s=t instanceof SVGAElement?t.target.baseVal:t.target,r=!n||!!s||R(n,e)||(t.getAttribute("rel")||"").split(/\s+/).includes("external"),l=n?.origin===b&&t.hasAttribute("download");return{url:n,external:r,target:s,download:l}}function P(t){let e=null,n=null,s=null,r=null,l=null,a=null,o=t;for(;o&&o!==document.documentElement;)s===null&&(s=f(o,"preload-code")),r===null&&(r=f(o,"preload-data")),e===null&&(e=f(o,"keepfocus")),n===null&&(n=f(o,"noscroll")),l===null&&(l=f(o,"reload")),a===null&&(a=f(o,"replacestate")),o=v(o);function c(i){switch(i){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:g[s??"off"],preload_data:g[r??"off"],keepfocus:c(e),noscroll:c(n),reload:c(l),replace_state:c(a)}}function h(t){const e=p(t);let n=!0;function s(){n=!0,e.update(a=>a)}function r(a){n=!1,e.set(a)}function l(a){let o;return e.subscribe(c=>{(o===void 0||n&&c!==o)&&a(o=c)})}return{notify:s,set:r,subscribe:l}}function A(){const{set:t,subscribe:e}=p(!1);let n;async function s(){clearTimeout(n);try{const r=await fetch(`${k}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!r.ok)return!1;const a=(await r.json()).version!==m;return a&&(t(!0),clearTimeout(n)),a}catch{return!1}}return{subscribe:e,check:s}}function R(t,e){return t.origin!==b||!t.pathname.startsWith(e)}const V={url:h({}),page:h({}),navigating:p(null),updated:A()};export{N as H,U as N,w as P,I as S,T as a,y as b,P as c,V as d,_ as e,Y as f,x as g,R as i,b as o,L as r,O as s};
