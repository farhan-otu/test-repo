import{jsx as r,jsxs as D}from"react/jsx-runtime";import{u as M,a as T,V as B,j as P,y as I,M as N,m as S,f as u,B as V,G as j,H as k}from"./main-hjbDDO6j.js";import{useState as c}from"react";import{s as A}from"./sortBy-D1UyZ0jY.js";import{c as w,d as E,a as F,b as H,D as W}from"./Droppable-BpTayVV3.js";import{d as z,D as G,a as R,b as q,c as J}from"./DataListItemRow-C-0mzg8R.js";const _=({orgId:m,hideRealmBasedIdps:h=!1,onClose:d})=>{const{adminClient:l}=M(),{t:e}=T(),{addAlert:f,addError:v}=B(),[C,s]=c(""),[p,y]=c(),[n,g]=c([]),L=({index:a})=>(s(e("onDragStart",{item:n[a]})),!0),b=({index:a})=>{s(e("onDragMove",{item:n[a]}))},x=(a,t)=>{if(t){const i=[...n],[o]=i.splice(a.index,1);return i.splice(t.index,0,o),s(e("onDragFinish",{list:i})),g(i),!0}else return s(e("onDragCancel")),!1};return P(()=>m?l.organizations.listIdentityProviders({orgId:m}):l.identityProviders.find({realmOnly:h}),a=>{y(a),g(A(a,["config.guiOrder","alias"]).map(t=>t.alias))},[]),p?D(N,{variant:S.small,title:e("manageDisplayOrder"),isOpen:!0,onClose:d,actions:[r(u,{id:"modal-confirm","data-testid":"confirm",onClick:async()=>{const a=n.map((t,i)=>{const o=p.find(O=>O.alias===t);return o.config.guiOrder=i,l.identityProviders.update({alias:t},o)});try{await Promise.all(a),f(e("orderChangeSuccess"))}catch(t){v("orderChangeError",t)}d()},children:e("save")},"confirm"),r(u,{id:"modal-cancel","data-testid":"cancel",variant:V.link,onClick:d,children:e("cancel")},"cancel")],children:[r(j,{className:"pf-v5-u-pb-lg",children:r(k,{children:e("orderDialogIntro")})}),r(w,{onDrag:L,onDragMove:b,onDrop:x,children:r(E,{hasNoWrapper:!0,children:r(z,{"aria-label":e("manageOrderTableAria"),"data-testid":"manageOrderDataList",isCompact:!0,children:n.map(a=>r(F,{hasNoWrapper:!0,children:r(G,{"aria-label":a,id:a,children:D(R,{children:[r(H,{children:r(W,{"aria-label":e("dragHelp")})}),r(q,{dataListCells:[r(J,{"data-testid":a,children:a},a)]})]})})},a))})})}),r("div",{className:"pf-v5-screen-reader","aria-live":"assertive",children:C})]}):r(I,{})};export{_ as M};
//# sourceMappingURL=ManageOrderDialog-Dm20IJc0.js.map