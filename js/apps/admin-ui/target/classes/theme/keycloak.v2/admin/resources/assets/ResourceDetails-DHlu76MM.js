import{jsx as e,jsxs as I,Fragment as P}from"react/jsx-runtime";import{u as T,a as H,Y as B,j as V,y as L,N as w,_ as C,O as M,c7 as j,c8 as E,aj as G,V as K,l as U,b as J,b$ as W,bt as Y,q as x,cE as F,D as $,P as Q,n as X,J as g,A as Z,f as N,B as ee,L as ae,p as re,cq as te,o as se}from"./main-hjbDDO6j.js";import{useState as m}from"react";import{D as oe}from"./SwitchControl-C_wbgFy3.js";import{u as ne}from"./ConfirmDialog-DN_NVsrg.js";import{F as ie}from"./FormAccess-DEsYjDHG.js";import{K as le}from"./KeyValueInput-BjiKJH0l.js";import{M as ce}from"./MultiLineInput-BKovUfcB.js";import{V as ue}from"./ViewHeader-Dr6ZoEJz.js";import{u as de}from"./useParams-XtwJXIDJ.js";import"react-dom";import"./copy-icon-ePLWnxgr.js";import"./KeySelect-CBdQO7FV.js";const me=({clientId:i})=>{const{adminClient:a}=T(),{t:l}=H(),{control:y}=B(),[A,v]=m(!1),[u,S]=m(),[p,h]=m("");V(()=>{const n={id:i,first:0,max:20,deep:!1,name:p};return a.clients.listAllScopes(n)},S,[p]);const b=n=>n.map(r=>e(G,{value:r,children:r.name},r.id));return u?e(w,{label:l("authorizationScopes"),labelIcon:e(C,{helpText:l("clientScopesHelp"),fieldLabelId:"scopes"}),fieldId:"scopes",children:e(M,{name:"scopes",defaultValue:[],control:y,render:({field:n})=>e(j,{toggleId:"scopes",variant:E.typeaheadMulti,chipGroupProps:{numChips:3,expandedText:l("hide"),collapsedText:l("showRemaining")},onToggle:r=>v(r),isOpen:A,selections:n.value.map(r=>r.name),onFilter:r=>(h(r),b(u)),onSelect:r=>{const t=typeof r=="string"?r:r.name,s=n.value.find(c=>c.name===t)?n.value.filter(c=>c.name!==t):[...n.value,r];n.onChange(s)},onClear:()=>{h(""),n.onChange([])},typeAheadAriaLabel:l("authorizationScopes"),children:b(u)})})}):e(L,{})};function Re(){const{adminClient:i}=T(),{t:a}=H(),[l,y]=m(),[A,v]=m(),[u,S]=m(),{addAlert:p,addError:h}=K(),b=U({mode:"onChange"}),{setValue:n,handleSubmit:r}=b,{id:t,resourceId:s,realm:c}=de(),D=J(),_=(o={})=>{se(o,n)},{hasAccess:O}=W(),R=!O("manage-authorization");V(()=>Promise.all([i.clients.findOne({id:t}),s?i.clients.getResource({id:t,resourceId:s}):Promise.resolve(void 0),s?i.clients.listPermissionsByResource({id:t,resourceId:s}):Promise.resolve(void 0)]),([o,d,f])=>{if(!o)throw new Error(a("notFound"));y(o),S(f),v(d),_(d)},[]);const k=async o=>{const d=re(o);try{if(s)await i.clients.updateResource({id:t,resourceId:s},d);else{const f=await i.clients.createResource({id:t},d);v(d),D(te({realm:c,id:t,resourceId:f._id}))}p(a((s?"update":"create")+"ResourceSuccess"),x.success)}catch(f){h("resourceSaveError",f)}},[q,z]=ne({titleKey:"deleteResource",children:I(P,{children:[a("deleteResourceConfirm"),u?.length!==0&&e(Y,{variant:"warning",isInline:!0,isPlain:!0,title:a("deleteResourceWarning"),className:"pf-v5-u-pt-lg",children:e("p",{className:"pf-v5-u-pt-xs",children:u?.map(o=>e("strong",{className:"pf-v5-u-pr-md",children:o.name},o.id))})})]}),continueButtonLabel:"confirm",onConfirm:async()=>{try{await i.clients.delResource({id:t,resourceId:s}),p(a("resourceDeletedSuccess"),x.success),D(F({realm:c,clientId:t,tab:"resources"}))}catch(o){h("resourceDeletedError",o)}}});return l?I(P,{children:[e(z,{}),e(ue,{titleKey:s?A?.name:"createResource",dropdownItems:s?[e($,{"data-testid":"delete-resource",isDisabled:R,onClick:()=>q(),children:a("delete")},"delete")]:void 0}),e(Q,{variant:"light",children:e(X,{...b,children:I(ie,{isHorizontal:!0,role:"manage-authorization",className:"keycloak__resource-details__form",onSubmit:r(k),children:[e(g,{name:s?"owner.name":"",label:a("owner"),labelIcon:a("ownerHelp"),defaultValue:l.clientId,readOnly:!0}),e(g,{name:"name",label:a("name"),labelIcon:a("resourceNameHelp"),rules:{required:a("required")}}),e(g,{name:"displayName",label:a("displayName"),labelIcon:a("displayNameHelp"),rules:{required:a("required")}}),e(g,{name:"type",label:a("type"),labelIcon:a("resourceDetailsTypeHelp")}),e(w,{label:a("uris"),fieldId:"uris",labelIcon:e(C,{helpText:a("urisHelp"),fieldLabelId:"uris"}),children:e(ce,{name:"uris",type:"url","aria-label":a("uris"),addButtonLabel:"addUri"})}),e(me,{clientId:t}),e(g,{name:"icon_uri",label:a("iconUri"),labelIcon:a("iconUriHelp"),type:"url"}),e(oe,{name:"ownerManagedAccess",label:a("ownerManagedAccess"),labelIcon:a("ownerManagedAccessHelp")}),e(w,{hasNoPaddingTop:!0,label:a("resourceAttribute"),labelIcon:e(C,{helpText:a("resourceAttributeHelp"),fieldLabelId:"resourceAttribute"}),fieldId:"resourceAttribute",children:e(le,{name:"attributes",isDisabled:R})}),e(Z,{children:I("div",{className:"pf-v5-u-mt-md",children:[e(N,{variant:ee.primary,type:"submit","data-testid":"save",children:a("save")}),e(N,{variant:"link","data-testid":"cancel",component:o=>e(ae,{...o,to:F({realm:c,clientId:t,tab:"resources"})}),children:a("cancel")})]})})]})})})]}):e(L,{})}export{Re as default};
//# sourceMappingURL=ResourceDetails-DHlu76MM.js.map
