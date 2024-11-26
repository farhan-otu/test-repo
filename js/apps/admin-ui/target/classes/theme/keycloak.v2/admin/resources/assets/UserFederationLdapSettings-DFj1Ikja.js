import{jsxs as M,Fragment as k,jsx as e}from"react/jsx-runtime";import{u as A,b as I,a as w,V as x,c as B,j as E,B as K,q as R,w as U,T as j,f as N,L as V,h as q,l as z,d as H,y as O,n as G,P as T,ft as C,fu as F}from"./main-hjbDDO6j.js";import{useState as d}from"react";import{R as J,u as Q}from"./RoutableTabs-ChOqIl6o.js";import{U as W,s as X}from"./UserFederationLdapForm-gnGk_vC9.js";import{u as Y}from"./ConfirmDialog-DN_NVsrg.js";import{u as Z,m as _}from"./useLocaleSort-Bon3wgU4.js";import{E as $}from"./ExtendedHeader-YYzKCuX6.js";import{a as P,b as D}from"./Tabs-TiG_cKa2.js";import"react-dom";import"./PageHandler-Dm6Ir_Zl.js";import"./DynamicComponents-2Oogxguf.js";import"./ClientSelect-Di5Ep3wz.js";import"./FileUpload-DFzHUp8z.js";import"./CodeEditor-BF8OqNGf.js";import"./copy-icon-ePLWnxgr.js";import"./GroupPickerDialog-CJH5Fdnt.js";import"./DataListItemRow-C-0mzg8R.js";import"./KeySelect-CBdQO7FV.js";import"./MultiLineInput-BKovUfcB.js";import"./AddRoleMappingModal-B-7S42YC.js";import"./translationFormatter-aKDacg4X.js";import"./filter-icon-I49U7vdU.js";import"./useParams-XtwJXIDJ.js";import"./constants-BclHbWtx.js";import"./FormAccess-DEsYjDHG.js";import"./SettingsCache-B8YydRw1.js";import"./ViewHeader-Dr6ZoEJz.js";import"./isEqual-DwRuOUtl.js";const ee=({toDetail:i,...o})=>e(V,{to:i(o.id),children:o.name}),te=({toCreate:i,toDetail:o})=>{const{adminClient:s}=A(),n=I(),{t:r}=w(),{addAlert:f,addError:g}=x(),[p,y]=d(0),h=()=>y(p+1),[b,S]=d([]),m=Z(),{id:v}=B(),[c,l]=d();E(()=>s.components.find({parent:v,type:"org.keycloak.storage.ldap.mappers.LDAPStorageMapper"}),a=>{S(m(a.map(L=>({...L,name:L.name,type:L.providerId})),_("name")))},[p]);const[u,t]=Y({titleKey:r("deleteMappingTitle",{mapperId:c?.id}),messageKey:"deleteMappingConfirm",continueButtonLabel:"delete",continueButtonVariant:K.danger,onConfirm:async()=>{try{await s.components.del({id:c.id}),h(),f(r("mappingDeletedSuccess"),R.success),l(void 0)}catch(a){g("mappingDeletedError",a)}}});return M(k,{children:[e(t,{}),e(U,{loader:b,ariaLabelKey:"ldapMappersList",searchPlaceholderKey:"searchForMapper",toolbarItem:e(j,{children:e(N,{"data-testid":"add-mapper-btn",variant:"primary",component:a=>e(V,{...a,to:i}),children:r("addMapper")})}),actions:[{title:r("delete"),onRowClick:a=>{l(a),u()}}],columns:[{name:"name",cellRenderer:a=>e(ee,{...a,toDetail:o})},{name:"type"}],emptyState:e(q,{message:r("emptyMappers"),instructions:r("emptyMappersInstructions"),primaryActionText:r("emptyPrimaryAction"),onPrimaryAction:()=>n(i)})},p)]})};function Be(){const{adminClient:i}=A(),{t:o}=w(),s=z({mode:"onChange"}),{realm:n}=H(),{id:r}=B(),{addAlert:f,addError:g}=x(),[p,y]=d(),[h,b]=d(0),S=()=>b(t=>t+1);E(()=>i.components.findOne({id:r}),t=>{if(!t)throw new Error(o("notFound"));y(t),l(t)},[r,h]);const m=t=>Q(C({realm:n,id:r,tab:t})),v=m("settings"),c=m("mappers"),l=t=>{s.reset(t),s.setValue("config.periodicChangedUsersSync",t.config?.changedSyncPeriod?.[0]!=="-1"),s.setValue("config.periodicFullSync",t.config?.fullSyncPeriod?.[0]!=="-1")},u=async t=>{try{await i.components.update({id:r},X(t)),f(o("userProviderSaveSuccess"),R.success),S()}catch(a){g("userProviderSaveError",a)}};return p?M(G,{...s,children:[e($,{provider:"LDAP",noDivider:!0,editMode:p.config?.editMode,save:()=>s.handleSubmit(u)()}),e(T,{variant:"light",className:"pf-v5-u-p-0",children:M(J,{defaultLocation:C({realm:n,id:r,tab:"settings"}),isBox:!0,children:[e(P,{id:"settings",title:e(D,{children:o("settings")}),...v,children:e(T,{variant:"light",children:e(W,{id:r,onSubmit:u})})}),e(P,{id:"mappers",title:e(D,{children:o("mappers")}),"data-testid":"ldap-mappers-tab",...c,children:e(te,{toCreate:F({realm:n,id:r,mapperId:"new"}),toDetail:t=>F({realm:n,id:r,mapperId:t})})})]})})]}):e(O,{})}export{Be as default};
//# sourceMappingURL=UserFederationLdapSettings-DFj1Ikja.js.map