import{jsxs as d,Fragment as x,jsx as r}from"react/jsx-runtime";import{u as O,a as j,V as k,l as K,b as N,d as q,e as G,bz as H,bA as L,j as z,B as R,q as h,D as U,P as $,n as J,N as Q,a1 as W,J as X,A as Y,f as v,L as Z,bu as _,bB as ee,p as oe,o as te}from"./main-hjbDDO6j.js";import{useState as b}from"react";import{u as ae}from"./ConfirmDialog-DN_NVsrg.js";import{D as re}from"./DynamicComponents-2Oogxguf.js";import{F as pe}from"./FormAccess-DEsYjDHG.js";import{V as ie}from"./ViewHeader-Dr6ZoEJz.js";import{u as ne}from"./useParams-XtwJXIDJ.js";import"react-dom";import"./ClientSelect-Di5Ep3wz.js";import"./FileUpload-DFzHUp8z.js";import"./CodeEditor-BF8OqNGf.js";import"./copy-icon-ePLWnxgr.js";import"./GroupPickerDialog-CJH5Fdnt.js";import"./DataListItemRow-C-0mzg8R.js";import"./KeySelect-CBdQO7FV.js";import"./MultiLineInput-BKovUfcB.js";import"./AddRoleMappingModal-B-7S42YC.js";import"./translationFormatter-aKDacg4X.js";import"./useLocaleSort-Bon3wgU4.js";import"./filter-icon-I49U7vdU.js";function Ie(){const{adminClient:i}=O(),{t:o}=j(),{addAlert:u,addError:f}=k(),{id:t,mapperId:p,viewMode:S}=ne(),g=K(),{setValue:D,handleSubmit:T}=g,[m,C]=b(),[P,V]=b(),F=N(),{realm:y}=q(),M=G(),s=S==="edit",c=!!H(L.path),w=()=>c?_({realm:y,id:t,tab:"mappers"}):ee({realm:y,clientId:t,tab:"mappers"});z(async()=>{let e;if(s){if(c?e=await i.clientScopes.findProtocolMapper({id:t,mapperId:p}):e=await i.clients.findProtocolMapperById({id:t,mapperId:p}),!e)throw new Error(o("notFound"));const a=M.protocolMapperTypes[e.protocol].find(l=>l.id===e.protocolMapper);return{config:{protocol:e.protocol,protocolMapper:e.protocolMapper},mapping:a,data:e}}else{const n=c?await i.clientScopes.findOne({id:t}):await i.clients.findOne({id:t});if(!n)throw new Error(o("notFound"));const l=M.protocolMapperTypes[n.protocol].find(E=>E.id===p);if(!l)throw new Error(o("notFound"));return{mapping:l,config:{protocol:n.protocol,protocolMapper:p}}}},({config:e,mapping:n,data:a})=>{V(e),C(n),a&&te(a,D)},[]);const[I,A]=ae({titleKey:"deleteMappingTitle",messageKey:"deleteMappingConfirm",continueButtonLabel:"delete",continueButtonVariant:R.danger,onConfirm:async()=>{try{c?await i.clientScopes.delProtocolMapper({id:t,mapperId:p}):await i.clients.delProtocolMapper({id:t,mapperId:p}),u(o("mappingDeletedSuccess"),h.success),F(w())}catch(e){f("mappingDeletedError",e)}}}),B=async e=>{const n=s?"Updated":"Created";try{const a={...P,...oe(e)};s?c?await i.clientScopes.updateProtocolMapper({id:t,mapperId:p},{id:p,...a}):await i.clients.updateProtocolMapper({id:t,mapperId:p},{id:p,...a}):c?await i.clientScopes.addProtocolMapper({id:t},a):await i.clients.addProtocolMapper({id:t},a),u(o(`mapping${n}Success`),h.success)}catch(a){f(`mapping${n}Error`,a)}};return d(x,{children:[r(A,{}),r(ie,{titleKey:s?m?.name:o("addMapper"),subKey:s?p:"addMapperExplain",dropdownItems:s?[r(U,{value:"delete",onClick:I,children:o("delete")},"delete")]:void 0}),r($,{variant:"light",children:r(J,{...g,children:d(pe,{isHorizontal:!0,onSubmit:T(B),role:"manage-clients",children:[r(Q,{label:o("mapperType"),fieldId:"mapperType",children:r(W,{type:"text",id:"mapperType",name:"mapperType",readOnlyVariant:"default",value:m?.name})}),r(X,{name:"name",label:o("name"),labelIcon:o("mapperNameHelp"),readOnlyVariant:s?"default":void 0,rules:{required:o("required")}}),r(re,{properties:m?.properties||[],isNew:!s,stringify:!0}),d(Y,{children:[r(v,{variant:"primary",type:"submit",children:o("save")}),r(v,{variant:"link",component:e=>r(Z,{...e,to:w()}),children:o("cancel")})]})]})})})]})}export{Ie as default};
//# sourceMappingURL=MappingDetails-BTKbu2rh.js.map
