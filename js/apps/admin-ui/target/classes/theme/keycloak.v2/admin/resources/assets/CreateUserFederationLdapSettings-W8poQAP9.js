import{jsxs as l,jsx as r}from"react/jsx-runtime";import{u,a as v,l as f,b as h,d as g,V as F,n as P,P as t,q as U,f6 as S}from"./main-hjbDDO6j.js";import{U as x,s as A}from"./UserFederationLdapForm-gnGk_vC9.js";import{E as C}from"./ExtendedHeader-YYzKCuX6.js";import"react";import"react-dom";import"./FormAccess-DEsYjDHG.js";import"./copy-icon-ePLWnxgr.js";import"./SettingsCache-B8YydRw1.js";import"./ConfirmDialog-DN_NVsrg.js";import"./ViewHeader-Dr6ZoEJz.js";import"./isEqual-DwRuOUtl.js";function R(){const{adminClient:o}=u(),{t:s}=v(),e=f({mode:"onChange"}),i=h(),{realm:n}=g(),{addAlert:m,addError:d}=F(),a=async c=>{try{await o.components.create(A(c)),m(s("createUserProviderSuccess"),U.success),i(S({realm:n}))}catch(p){d("createUserProviderError",p)}};return l(P,{...e,children:[r(C,{provider:"LDAP",noDivider:!0,save:()=>e.handleSubmit(a)()}),r(t,{variant:"light",className:"pf-v5-u-p-0",children:r(t,{variant:"light",children:r(x,{onSubmit:a})})})]})}export{R as default};
//# sourceMappingURL=CreateUserFederationLdapSettings-W8poQAP9.js.map
