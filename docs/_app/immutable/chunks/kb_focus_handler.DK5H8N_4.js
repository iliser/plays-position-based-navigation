class b{constructor(s){this.onFocusChange=s}focused=null;targets=new Set;findMatch(s,o,u){const n=s.getBoundingClientRect();function a(t){const e=(t.top+t.bottom)/2,c=(t.left+t.right)/2;switch(u){case"down":return[c,t.top];case"up":return[c,t.bottom];case"left":return[t.right,e];case"right":return[t.left,e]}}function w(t,e){const[c,g]=a(t),[h,i]=a(e),r=c-h,f=g-i;return r*r+f*f}let l=1e9,d=null;for(const t of this.targets){const e=t.getBoundingClientRect();if(!o(e))continue;const c=w(e,n);c<l&&(d=t,l=c)}return d}focus(s){if(s==this.focused)return;const o=this.focused;this.focused=s,this.onFocusChange(o,s)}unfocus(){const s=this.focused;this.focused=null,this.onFocusChange(s,null)}blur(){this.unfocus()}move(s){if(console.time("move"),this.focused==null){const o=this.targets.values();this.focused=o.next().value,this.onFocusChange(null,this.focused)}else{const o=this.focused.getBoundingClientRect();let u=this.findMatch(this.focused,{up:n=>n.bottom<=o.top,down:n=>n.top>=o.bottom,left:n=>n.right<=o.left,right:n=>n.left>=o.right}[s],s);if(u!=null){const n=this.focused;this.focused=u,this.onFocusChange(n,u)}}console.timeEnd("move")}}function v(p){const s="kbgf_autofocus",o=new b(function(t,e){t?.blur(),t?.classList.remove(p),e?.classList.add(p),e?.scrollIntoView({block:"center",inline:"center",behavior:"smooth"}),e?.dataset[s]!=null&&e?.focus()});function u(t,e){return o.targets.add(t),{destroy:function(){o.targets.delete(t)}}}function n(t,e){const c=u(t),g=function(i){const r=i.target;r!=null&&o.focus(r)},h=i=>{i.stopPropagation();const r=i.target,f=r.value.length,m=r.selectionStart;i.key=="ArrowDown"&&m>=f&&o.move("down"),i.key=="ArrowUp"&&(m==0&&o.move("up"),i.stopPropagation()),i.key=="ArrowLeft"&&m==0&&o.move("left"),i.key=="ArrowRight"&&m>=f&&o.move("right"),i.key=="Escape"&&i.target?.blur()};return t.addEventListener("keydown",h),t.addEventListener("focus",g),e?.autofocus&&(t.dataset[s]="true"),{destroy(){e?.autofocus&&(t.dataset[s]=void 0),c.destroy(),t.removeEventListener("keydown",h),t.removeEventListener("focus",g)}}}function a(t,e){const c=t.tagName.toLowerCase();return c=="textarea"||c=="input"?n(t,e):u(t)}function w(t){const e=t.tagName.toLowerCase();return e=="button"||e=="a"||e=="label"||t.attributes.getNamedItem("data-isclickable")}function l(t){const e=t.tagName.toLowerCase();return e=="input"||e=="textarea"||t.attributes.getNamedItem("data-isfocusable")}function d(t){if(t.code=="ArrowLeft"&&(t.preventDefault(),o.move("left")),t.code=="ArrowRight"&&(t.preventDefault(),o.move("right")),t.code=="ArrowDown"&&(t.preventDefault(),o.move("down")),t.code=="ArrowUp"&&(t.preventDefault(),o.move("up")),t.code=="Enter"){if(t.preventDefault(),!o.focused)return;l(o.focused)&&o.focused.focus(),w(o.focused)&&o.focused.click()}}return{gfocus:a,windowKeydown:d}}export{v as k};
