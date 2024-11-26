import{jsxs as f,Fragment as z,jsx as e}from"react/jsx-runtime";import{u as K,a as $,V as J,b as M,d as Q,c as U,e as W,l as X,j as Y,P as Z,N as ii,_ as oi,O as ni,c7 as ei,c8 as ti,aj as si,n as ai,A as ci,f as g,f1 as P,L as ri,q as di}from"./main-hjbDDO6j.js";import{useState as c}from"react";import{D as li}from"./DynamicComponents-2Oogxguf.js";import{F as pi}from"./FormAccess-DEsYjDHG.js";import{V as mi}from"./ViewHeader-Dr6ZoEJz.js";import{c as I}from"./camelCase-BMVgu5G9.js";import"react-dom";import"./ClientSelect-Di5Ep3wz.js";import"./FileUpload-DFzHUp8z.js";import"./CodeEditor-BF8OqNGf.js";import"./copy-icon-ePLWnxgr.js";import"./GroupPickerDialog-CJH5Fdnt.js";import"./DataListItemRow-C-0mzg8R.js";import"./KeySelect-CBdQO7FV.js";import"./MultiLineInput-BKovUfcB.js";import"./AddRoleMappingModal-B-7S42YC.js";import"./translationFormatter-aKDacg4X.js";import"./useLocaleSort-Bon3wgU4.js";import"./ConfirmDialog-DN_NVsrg.js";import"./filter-icon-I49U7vdU.js";import"./capitalize-BLSIhm4V.js";import"./_baseSlice-F8doVSIJ.js";function Hi(){const{adminClient:v}=K(),{t:n}=$(),{addAlert:N,addError:x}=J(),h=M(),{realm:C}=Q(),[D,T]=c(!1),[d,F]=c(!1),[V,b]=c([]),[w,G]=c([]),[O,j]=c(),[p,H]=c(""),[k,S]=c([]),{policyName:r,conditionName:t}=U(),B=W(),m=X(),A=B.componentTypes?.["org.keycloak.services.clientpolicy.condition.ClientPolicyConditionProvider"],E=s=>{m.reset({config:s.configuration||{}})};Y(()=>v.clientPolicies.listPolicies({includeGlobalPolicies:!0}),s=>{if(b(s.policies??[]),t){let i=s.policies?.find(o=>o.name===r);i===void 0&&(i=s.globalPolicies?.find(o=>o.name===r),F(i!==void 0));const l=i?.conditions?.find(o=>o.condition===t),u=A?.find(o=>o.id===t);j(l),S(u?.properties),E(l)}},[]);const L=async s=>{const i=s.config,l=()=>k.reduce((o,a)=>(o[a.name]=i[a.name],o),{}),u=V.map(o=>{if(o.name!==r)return o;let a=o.conditions??[];if(t){const R={condition:O?.condition,configuration:l()},y=a.findIndex(q=>t===q.condition);if(y===-1)return;const _=[...a.slice(0,y),R,...a.slice(y+1)];return{...o,conditions:_}}return a=a.concat({condition:w[0].condition,configuration:l()}),{...o,conditions:a}});try{await v.clientPolicies.updatePolicy({policies:u}),b(u),h(P({realm:C,policyName:r})),N(n(t?"updateClientConditionSuccess":"createClientConditionSuccess"),di.success)}catch(o){x("createClientConditionError",o)}};return f(z,{children:[e(mi,{titleKey:n(t?d?"viewCondition":"editCondition":"addCondition"),divider:!0}),f(Z,{variant:"light",children:[f(pi,{isHorizontal:!0,role:"manage-realm",isReadOnly:d,className:"pf-v5-u-mt-lg",onSubmit:m.handleSubmit(L),children:[e(ii,{label:n("conditionType"),fieldId:"conditionType",labelIcon:e(oi,{helpText:p?`${I(p.replace(/-/g," "))}Help`:"conditionsHelp",fieldLabelId:"conditionType"}),children:e(ni,{name:"conditions",defaultValue:"any-client",control:m.control,render:({field:s})=>e(ei,{placeholderText:n("selectACondition"),className:"kc-conditionType-select","data-testid":"conditionType-select",toggleId:"provider",isDisabled:!!t,onToggle:i=>T(i),onSelect:i=>{s.onChange(i),S(i.properties),H(i.id),G([{condition:i.id}]),T(!1)},selections:t||p,variant:ti.single,"aria-label":n("conditionType"),isOpen:D,children:A?.map(i=>e(si,{selected:i.id===s.value,description:n(I(i.id.replace(/-/g," "))),value:i,children:i.id},i.id))})})}),e(ai,{...m,children:e(li,{properties:k})}),!d&&f(ci,{children:[e(g,{variant:"primary",type:"submit","data-testid":"addCondition-saveBtn",isDisabled:p===""&&!t&&d,children:n(t?"save":"add")}),e(g,{variant:"link","data-testid":"addCondition-cancelBtn",onClick:()=>h(P({realm:C,policyName:r})),children:n("cancel")})]})]}),d&&e("div",{className:"kc-backToProfile",children:e(g,{component:s=>e(ri,{...s,to:P({realm:C,policyName:r})}),variant:"primary",children:n("back")})})]})]})}export{Hi as default};
//# sourceMappingURL=NewClientPolicyCondition-B1WtDJ50.js.map