import{j as oe,k as ne,l as s,m as re,n as ie,d as E,p as G,r as n,q as le,e as H,h as ce,u as i,g as q}from"../chunks/disclose-version.DUjR6L-g.js";import{p as ue,u as de,r as L,c as pe,j as o,$ as ve,f as me,g as T,s as be,i as e}from"../chunks/runtime.Dsq7FSpV.js";import{k as fe}from"../chunks/kb_focus_handler.DK5H8N_4.js";import{b as he}from"../chunks/paths.COh2_lza.js";var ge=q('<div><label><input type="checkbox"> </label></div>'),_e=q(`<div class="viewport svelte-e59i81"><h1>Position based focus</h1> <p>Allow to focus element based on position of this element on screen.</p> <p>You can navigate through this page by using arrow keys + enter for "click" into elements</p> <p>Utils is split into two parts. First defines which element is focused now, can be focused and manage focus movement by directional events like <br> <code>type Direction = "right" | "left" | "up" | "down";</code> <br> This part is framework agnostic and operate over html dom elements <br> It just emit focus change event on movement and manage current focused node.</p> <p>Second part is responsible for integration first part with dom or framework used <br> It manages keybindings, adding dom elements into registry, remove dom elements from registry, react on focus change events, and manage clicks inputs</p> <p>This page implemented on svelte and second part uses <a href="https://learn.svelte.dev/tutorial/actions" class="svelte-e59i81">svelte actions</a> feature for manage focusable elements</p> <p>Current limitation is you can't nest focusable into each other. Cause <code>'in' | 'out'</code> movement direction is not implemented right now, and this implementation just proof of concept.</p> <h3>Implemented features</h3> <h4>Core</h4> <div><label><input type="checkbox"> Focus management</label></div> <div><label><input type="checkbox"> Horizontal + Vertical movements</label></div> <div><label><input type="checkbox"> Focus change events</label></div> <div><label><input type="checkbox"> Nested(In + Out) movements</label></div> <h4>Svelte binding</h4> <!> <h3>Some examples</h3> <label><input type="checkbox"> Show outline around focusable elements</label> <a class="svelte-e59i81">Grid example</a> <input type="text"></div>`);function Ce(_,z){ue(z,!0);const{gfocus:D,windowKeydown:N}=fe("selected");let l=be(!1),a=function(t){t.classList.add("focusable_outline");const r=D(t);return{destroy(){t.classList.remove(".focusable_outline"),r.destroy()}}};de(()=>console.log(a));const O=[["Keyboard bindings for movements (up,down,left,right)",!0],["Keyboard bindings for focus/click (Enter)",!0],["Browser focus escape (Escape, double movement to border in start/end)",!0],["Clickable elements (buttons, links, checkboxes)",!0],["Focusable by default elements (textarea, input)",!0],["Autofocus elements",!0],["Focusable by param elements",!1],["Clickable by param elements",!1],["Hover for focus",!1]];var c=H(_,!0,_e),P=o(c),k=e(e(P)),y=e(e(k)),w=e(e(y)),x=e(e(w)),F=e(e(x)),U=e(o(F)),C=e(e(F)),V=e(e(C)),Y=e(e(V)),u=e(e(Y)),$=o(u),j=o($);n(j),j.checked=!0;var d=e(e(u)),J=o(d),I=o(J);n(I),I.checked=!0;var p=e(e(d)),M=o(p),S=o(M);n(S),S.checked=!0;var v=e(e(p)),Q=o(v),K=o(Q);n(K),K.checked=!1;var R=e(e(v)),A=e(e(R)),W=e(e(A)),m=e(e(W)),B=o(m);n(B);var b=e(e(m));oe(b,"href",`${G(he)}/grid`);var X=e(e(b));L(()=>{le(c,"show-focusable",T(l))}),ne("keydown",ve,N,!1),s(k,t=>a(t)),s(y,t=>a(t)),s(w,t=>a(t)),s(x,t=>a(t)),s(U,t=>a(t)),s(C,t=>a(t)),s(u,t=>a(t)),s(d,t=>a(t)),s(p,t=>a(t)),s(v,t=>a(t)),re(A,()=>O,1,null,(t,r,ke)=>{let Z=()=>i(i(r))[0],ee=()=>i(i(r))[1];var f=H(t,!0,ge),te=o(f),h=o(te);n(h);var ae=e(h),g;L(()=>{g!==(g=ee())&&(h.checked=g),ce(ae,` ${G(Z())}`)}),s(f,se=>a(se)),E(t,f)}),s(m,t=>a(t)),ie(B,()=>T(l),t=>me(l,t)),s(b,t=>a(t)),s(X,t=>a(t)),E(_,c),pe()}export{Ce as component};