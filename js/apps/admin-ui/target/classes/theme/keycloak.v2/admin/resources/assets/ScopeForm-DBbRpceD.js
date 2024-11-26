import{jsx as a,jsxs as l,Fragment as T}from"react/jsx-runtime";import{useEffect as V}from"react";import{a as k,l as E,d as L,bC as O,bD as A,bE as $,K as g,bF as t,o as j,n as q,J as c,bo as S,$ as h,A as N,aq as P,f as G,L as J,br as R}from"./main-hjbDDO6j.js";import{g as w}from"./utils-C-TUnOch.js";import{D as i}from"./SwitchControl-C_wbgFy3.js";import{b as F}from"./ClientScopeTypes-CQeLlnWG.js";import{F as z}from"./FormAccess-DEsYjDHG.js";const Z=({clientScope:o,save:I})=>{const{t:e}=k(),r=E({mode:"onChange"}),{control:m,handleSubmit:x,setValue:p,formState:u}=r,{isDirty:H,isValid:v}=u,{realm:C}=L(),d=O(),b=A()($.DynamicScopes),y=g({control:m,name:t("attributes.display.on.consent.screen"),defaultValue:o?.attributes?.["display.on.consent.screen"]??"true"}),D=g({control:m,name:t("attributes.is.dynamic.scope"),defaultValue:"false"}),f=(n,s)=>p(t("attributes.dynamic.scope.regexp"),s?`${n}:*`:n,{shouldDirty:!0});return V(()=>{j(o??{},p)},[o]),a(z,{role:"manage-clients",onSubmit:x(I),isHorizontal:!0,children:l(q,{...r,children:[a(c,{name:"name",label:e("name"),labelIcon:e("scopeNameHelp"),rules:{required:e("required"),onChange:n=>{b&&f(n.target.validated,!0)}}}),b&&l(T,{children:[a(i,{name:t("attributes.is.dynamic.scope"),label:e("dynamicScope"),labelIcon:e("dynamicScopeHelp"),onChange:(n,s)=>{f(s&&r.getValues("name")||"",s)},stringify:!0}),D==="true"&&a(c,{name:t("attributes.dynamic.scope.regexp"),label:e("dynamicScopeFormat"),labelIcon:e("dynamicScopeFormatHelp"),isDisabled:!0})]}),a(S,{name:"description",label:e("description"),labelIcon:e("scopeDescriptionHelp"),rules:{maxLength:{value:255,message:e("maxLength")}}}),a(h,{id:"kc-type",name:"type",label:e("type"),labelIcon:e("scopeTypeHelp"),controller:{defaultValue:F[0]},options:F.map(n=>({key:n,value:e(`clientScopeType.${n}`)}))}),!o&&a(h,{id:"kc-protocol",name:"protocol",label:e("protocol"),labelIcon:e("protocolHelp"),controller:{defaultValue:d[0]},options:d.map(n=>({key:n,value:w(e,n)}))}),a(i,{name:t("attributes.display.on.consent.screen"),defaultValue:y,label:e("displayOnConsentScreen"),labelIcon:e("displayOnConsentScreenHelp"),stringify:!0}),y==="true"&&a(S,{name:t("attributes.consent.screen.text"),label:e("consentScreenText"),labelIcon:e("consentScreenTextHelp")}),a(i,{name:t("attributes.include.in.token.scope"),label:e("includeInTokenScope"),labelIcon:e("includeInTokenScopeHelp"),stringify:!0}),a(c,{name:t("attributes.gui.order"),label:e("guiOrder"),labelIcon:e("guiOrderHelp"),type:"number",min:0}),l(N,{children:[a(P,{formState:u,disabled:!H||!v,children:e("save")}),a(G,{variant:"link",component:n=>a(J,{...n,to:R({realm:C})}),children:e("cancel")})]})]})})};export{Z as S};
//# sourceMappingURL=ScopeForm-DBbRpceD.js.map
