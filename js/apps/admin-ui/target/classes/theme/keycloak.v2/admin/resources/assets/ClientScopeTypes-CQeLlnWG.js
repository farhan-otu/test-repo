import{jsx as c}from"react/jsx-runtime";import{useState as h}from"react";import{aj as u,a as y,ag as g,ah as O,b_ as m,D as T}from"./main-hjbDDO6j.js";var p=(e=>(e.default="default",e.optional="optional",e))(p||{}),f=(e=>(e.none="none",e))(f||{});const d=Object.keys(p),$=Object.keys({...f,...p}),k=(e,a=d)=>a.map(n=>c(u,{value:n,children:e(`clientScopeType.${n}`)},n)),A=(e,a)=>d.map(n=>c(T,{onClick:()=>a(n),children:e(`clientScopeType.${n}`)},n)),I=({clientScope:e,type:a,onSelect:n,all:o=!1,isDisabled:t,...C})=>{const{t:r}=y(),[i,l]=h(!1);return c(g,{toggle:s=>c(O,{"data-testid":"cell-dropdown",className:`keycloak__client-scope__${a}`,ref:s,onClick:()=>l(!i),isExpanded:i,isDisabled:t,children:r(`clientScopeType.${a}`)}),isOpen:i,onOpenChange:s=>l(s),selected:[a],onSelect:(s,S)=>{n(S),l(!1)},...C,children:k(r,o?$:d)},e.id)},E=async(e,a,n)=>{await D(e,a),await _(e,a,n)},w=e=>e.clientScopes,D=async(e,a)=>{a.type!=="none"&&await w(e)[`delDefault${a.type==="optional"?"Optional":""}ClientScope`]({id:a.id})},_=async(e,a,n)=>{n!=="none"&&await w(e)[`addDefault${n==="optional"?"Optional":""}ClientScope`]({id:a.id})},M=async(e,a,n,o,t)=>{o!=="none"&&await b(e,a,n,o),await j(e,a,n,t)},b=async(e,a,n,o)=>{const t=`del${m(o)}ClientScope`;await e.clients[t]({id:a,clientScopeId:n.id})},j=async(e,a,n,o)=>{const t=`add${m(o)}ClientScope`;await e.clients[t]({id:a,clientScopeId:n.id})};export{f as A,p as C,I as a,$ as b,E as c,b as d,j as e,M as f,k as g,A as h,D as r};
//# sourceMappingURL=ClientScopeTypes-CQeLlnWG.js.map
