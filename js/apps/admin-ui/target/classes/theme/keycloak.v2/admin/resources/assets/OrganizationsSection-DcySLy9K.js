import{jsxs as s,Fragment as B,jsx as e}from"react/jsx-runtime";import{u as C,d as V,a as v,V as x,b as A,B as K,P as S,eN as E,L as d,dh as I,T as L,f as P,eO as l,h as T}from"./main-hjbDDO6j.js";import{useState as c}from"react";import{u as k}from"./ConfirmDialog-DN_NVsrg.js";import{V as w}from"./ViewHeader-Dr6ZoEJz.js";import"react-dom";function G(){const{adminClient:o}=C(),{realm:n}=V(),{t:a}=v(),{addAlert:g,addError:m}=x(),u=A(),[r,f]=c(0),z=()=>f(r+1),[p,y]=c();async function O(t,i,b){return await o.organizations.find({first:t,max:i,search:b})}const[h,D]=k({titleKey:"organizationDelete",messageKey:"organizationDeleteConfirm",continueButtonLabel:"delete",continueButtonVariant:K.danger,onConfirm:async()=>{try{await o.organizations.delById({id:p.id}),g(a("organizationDeletedSuccess")),z()}catch(t){m("organizationDeleteError",t)}}});return s(B,{children:[e(w,{titleKey:"organizationsList",subKey:"organizationsExplain",divider:!0}),s(S,{variant:"light",className:"pf-v5-u-p-0",children:[e(D,{}),e(E,{link:({organization:t,children:i})=>e(d,{to:I({realm:n,id:t.id,tab:"settings"}),children:i},t.id),loader:O,isPaginated:!0,toolbarItem:e(L,{children:e(P,{"data-testid":"addOrganization",component:t=>e(d,{...t,to:l({realm:n})}),children:a("createOrganization")})}),onDelete:t=>{y(t),h()},children:e(T,{message:a("emptyOrganizations"),instructions:a("emptyOrganizationsInstructions"),primaryActionText:a("createOrganization"),onPrimaryAction:()=>u(l({realm:n}))})},r)]})]})}export{G as default};
//# sourceMappingURL=OrganizationsSection-DcySLy9K.js.map