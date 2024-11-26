import{jsxs as m,Fragment as S,jsx as r}from"react/jsx-runtime";import{a as O,J as V,$ as B,N as k,_ as q,O as x,c7 as E,c8 as K,aj as L,u as N,l as U,V as H,b as G,d as $,B as _,q as P,dK as I,j as z,y as J,P as R,D as Q,n as W,A as X,f as T,L as Y,p as Z,dM as ee,o as re}from"./main-hjbDDO6j.js";import{useState as C}from"react";import{u as ae}from"./ConfirmDialog-DN_NVsrg.js";import{D as te}from"./DynamicComponents-2Oogxguf.js";import{F as ie}from"./FormAccess-DEsYjDHG.js";import{V as oe}from"./ViewHeader-Dr6ZoEJz.js";import{u as se,m as ne}from"./useLocaleSort-Bon3wgU4.js";import{u as pe}from"./useParams-XtwJXIDJ.js";import"react-dom";import"./ClientSelect-Di5Ep3wz.js";import"./FileUpload-DFzHUp8z.js";import"./CodeEditor-BF8OqNGf.js";import"./copy-icon-ePLWnxgr.js";import"./GroupPickerDialog-CJH5Fdnt.js";import"./DataListItemRow-C-0mzg8R.js";import"./KeySelect-CBdQO7FV.js";import"./MultiLineInput-BKovUfcB.js";import"./AddRoleMappingModal-B-7S42YC.js";import"./translationFormatter-aKDacg4X.js";import"./filter-icon-I49U7vdU.js";const de=({mapperTypes:n,mapperType:a,form:d,id:f,updateMapperType:u})=>{const{t:o}=O(),{control:M}=d,[g,l]=C(!1),t=["inherit","import","legacy","force"];return m(S,{children:[r(V,{name:"name",label:o("name"),labelIcon:o("addIdpMapperNameHelp"),readOnly:!!f,rules:{required:o("required")}}),r(B,{name:"config.syncMode",label:o("syncModeOverride"),labelIcon:o("syncModeOverrideHelp"),options:t.map(i=>({key:i.toUpperCase(),value:o(`syncModes.${i}`)})),controller:{defaultValue:t[0].toUpperCase()}}),r(k,{label:o("mapperType"),labelIcon:r(q,{helpText:a.helpText,fieldLabelId:"mapperType"}),fieldId:"identityProviderMapper",children:r(x,{name:"identityProviderMapper",defaultValue:n[0].id,control:M,render:({field:i})=>r(E,{toggleId:"identityProviderMapper","data-testid":"idp-mapper-select",isDisabled:!!f,onToggle:()=>l(!g),onSelect:e=>{const y=e;u(y),i.onChange(y.id),l(!1)},selections:a.name,variant:K.single,"aria-label":o("mapperType"),isOpen:g,children:n.map(e=>r(L,{selected:e===i.value,"datatest-id":e.id,value:e,children:e.name},e.name))})})})]})};function we(){const{adminClient:n}=N(),{t:a}=O(),d=U({shouldUnregister:!0}),{handleSubmit:f}=d,{addAlert:u,addError:o}=H(),M=G(),g=se(),{realm:l}=$(),{id:t,providerId:i,alias:e}=pe(),[y,F]=C(),[v,h]=C(),A=async s=>{const b=Z(s),c={...b,config:{...b.config},identityProviderAlias:e};if(t)try{await n.identityProviders.updateMapper({id:t,alias:e},{...c,id:t}),u(a("mapperSaveSuccess"),P.success)}catch(p){o("mapperSaveError",p)}else try{const p=await n.identityProviders.createMapper({identityProviderMapper:c,alias:e});u(a("mapperCreateSuccess"),P.success),M(ee({realm:l,alias:e,providerId:i,id:p.id}))}catch(p){o("mapperCreateError",p)}},[D,w]=ae({titleKey:"deleteProviderMapper",messageKey:a("deleteMapperConfirm",{mapper:v?.name}),continueButtonLabel:"delete",continueButtonVariant:_.danger,onConfirm:async()=>{try{await n.identityProviders.delMapper({alias:e,id:t}),u(a("deleteMapperSuccess"),P.success),M(I({providerId:i,alias:e,tab:"mappers",realm:l}))}catch(s){o("deleteErrorIdentityProvider",s)}}});z(()=>Promise.all([t?n.identityProviders.findOneMapper({alias:e,id:t}):null,n.identityProviders.findMapperTypes({alias:e})]),([s,b])=>{const c=g(Object.values(b),ne("name"));s?(h(c.find(({id:p})=>p===s.identityProviderMapper)),j(s)):h(c[0]),F(c)},[t]);const j=s=>{re(s,d.setValue)};return!y||!v?r(J,{}):m(R,{variant:"light",children:[r(w,{}),r(oe,{className:"kc-add-mapper-title",titleKey:t?a("editIdPMapper",{providerId:i[0].toUpperCase()+i.substring(1)}):a("addIdPMapper",{providerId:i[0].toUpperCase()+i.substring(1)}),dropdownItems:t?[r(Q,{onClick:D,children:a("delete")},"delete")]:void 0,divider:!0}),m(ie,{role:"manage-identity-providers",isHorizontal:!0,onSubmit:f(A),className:"pf-v5-u-mt-lg",children:[m(W,{...d,children:[t&&r(V,{name:"id",label:a("id"),readOnly:!0,rules:{required:a("required")}}),v.properties&&m(S,{children:[r(de,{form:d,id:t,mapperTypes:y,updateMapperType:h,mapperType:v}),r(te,{properties:v.properties})]})]}),m(X,{children:[r(T,{"data-testid":"new-mapper-save-button",variant:"primary",type:"submit",children:a("save")}),r(T,{"data-testid":"new-mapper-cancel-button",variant:"link",component:s=>r(Y,{...s,to:I({realm:l,providerId:i,alias:e,tab:"mappers"})}),children:a("cancel")})]})]})]})}export{we as default};
//# sourceMappingURL=AddMapper-CzQeI77J.js.map