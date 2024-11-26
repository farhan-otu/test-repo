import{jsx as t,jsxs as y,Fragment as E}from"react/jsx-runtime";import{a as C,Y as S,N as v,_ as b,O as k,S as z,ce as H,cf as F,U as Y,W as U,f as A,c7 as B,c8 as K,aj as D,dS as G,aw as V,ax as x,a1 as O,a4 as Z,ac as q,a9 as Q,ad as X,ae as ee,ct as te,z as ne,Z as ae,a0 as P,a5 as J,J as le,dT as oe,K as re,cM as se,u as ie,j as ce,bF as de}from"./main-hjbDDO6j.js";import{C as ue}from"./ClientSelect-Di5Ep3wz.js";import{useState as L,useEffect as pe}from"react";import{F as he}from"./FileUpload-DFzHUp8z.js";import{G as me}from"./GroupPickerDialog-CJH5Fdnt.js";import{A as fe,a as ge,K as Ce}from"./KeySelect-CBdQO7FV.js";import{M as Ie}from"./MultiLineInput-BKovUfcB.js";import{A as ve,S as be}from"./AddRoleMappingModal-B-7S42YC.js";import{C as Se,L as ye}from"./CodeEditor-BF8OqNGf.js";const Le=({name:e,label:n,helpText:s,isDisabled:o=!1,defaultValue:r,isNew:l=!0})=>{const{t:a}=C(),{control:u}=S();return t(v,{hasNoPaddingTop:!0,label:a(n),fieldId:e,labelIcon:t(b,{helpText:a(s),fieldLabelId:`${n}`}),children:t(k,{name:I(e),"data-testid":e,defaultValue:l?r:!1,control:u,render:({field:c})=>t(z,{id:e,isDisabled:o,label:a("on"),labelOff:a("off"),isChecked:c.value==="true"||c.value===!0||c.value?.[0]==="true",onChange:(p,h)=>c.onChange(""+h),"data-testid":e,"aria-label":a(n)})})})},Te=e=>t(ue,{...e,name:I(e.name)}),$e=({name:e,label:n,helpText:s,defaultValue:o,required:r,isDisabled:l=!1})=>{const{t:a}=C(),{control:u}=S(),[c,p]=L(""),[h,d]=L(!1);return t(v,{label:a(n),labelIcon:t(b,{helpText:a(s),fieldLabelId:`${n}`}),fieldId:e,isRequired:r,children:t(k,{name:I(e),control:u,defaultValue:o||"",render:({field:i})=>t(he,{id:e,value:i.value,type:"text",filename:c,isDisabled:l,onFileInputChange:(g,T)=>p(T.name),onReadStarted:()=>d(!0),onReadFinished:()=>d(!1),onClearClick:()=>{i.onChange(""),p("")},isLoading:h,allowEditingUploadedText:!1,onTextChange:g=>{i.onChange(g)}})})})},ke=({name:e,label:n,helpText:s,required:o})=>{const{t:r}=C(),[l,a]=L(!1),[u,c]=L(),{control:p}=S();return t(k,{name:I(e),defaultValue:"",control:p,render:({field:h})=>y(E,{children:[l&&t(me,{type:"selectOne",text:{title:"selectGroup",ok:"select"},onConfirm:d=>{h.onChange(d?.[0].path),c(d),a(!1)},onClose:()=>a(!1),filterGroups:u}),t(v,{label:r(n),labelIcon:t(b,{helpText:r(s),fieldLabelId:`${n}`}),fieldId:e,isRequired:o,children:y(H,{children:[t(F,{children:t(Y,{children:h.value&&t(U,{onClick:()=>h.onChange(void 0),children:h.value})})}),t(F,{children:t(A,{id:"kc-join-groups-button",onClick:()=>a(!l),variant:"secondary","data-testid":"join-groups-button",children:r("selectGroup")})})]})})]})})},we=({name:e,label:n,helpText:s,defaultValue:o,options:r,required:l,isDisabled:a=!1})=>{const{t:u}=C(),{control:c}=S(),[p,h]=L(!1);return t(v,{label:u(n),labelIcon:t(b,{helpText:u(s),fieldLabelId:`${n}`}),fieldId:e,isRequired:l,children:t(k,{name:I(e),"data-testid":e,defaultValue:o||r?.[0]||"",control:c,render:({field:d})=>t(B,{toggleId:e,isDisabled:a,onToggle:i=>h(i),onSelect:i=>{d.onChange(i),h(!1)},selections:d.value,variant:K.single,"aria-label":u(n),isOpen:p,children:r?.map(i=>t(D,{selected:i===d.value,value:i,children:i},i))})})})},xe=({name:e,label:n,helpText:s,required:o,isDisabled:r})=>{const{t:l}=C(),{getValues:a,setValue:u,register:c}=S(),[p,h]=L([]),d=I(e);pe(()=>{c(d);const f=JSON.parse(a(d)||"[]");h(f.map(m=>({...m,id:G()})))},[]);const i=()=>h([...p,{key:"",value:"",id:G()}]),g=(f=p)=>{u(d,JSON.stringify(f.filter(m=>m.key!=="").map(({id:m,...R})=>R)))},T=(f,m)=>{$(f,{...p[f],key:m})},w=(f,m)=>{$(f,{...p[f],value:m})},$=(f,m)=>h([...p.slice(0,f),m,...p.slice(f+1)]),M=f=>{const m=[...p.slice(0,f),...p.slice(f+1)];h(m),g(m)};return p.length!==0?y(v,{label:l(n),labelIcon:t(b,{helpText:l(s),fieldLabelId:`${n}`}),fieldId:e,isRequired:o,children:[y(V,{direction:{default:"column"},children:[y(V,{children:[t(x,{grow:{default:"grow"},spacer:{default:"spacerNone"},children:t("strong",{children:l("key")})}),t(x,{grow:{default:"grow"},children:t("strong",{children:l("value")})})]}),p.map((f,m)=>y(V,{"data-testid":"row",children:[t(x,{grow:{default:"grow"},children:t(O,{name:`${d}.${m}.key`,placeholder:l("keyPlaceholder"),"aria-label":l("key"),defaultValue:f.key,"data-testid":`${d}.${m}.key`,onChange:(R,N)=>T(m,N),onBlur:()=>g()})}),t(x,{grow:{default:"grow"},spacer:{default:"spacerNone"},children:t(O,{name:`${d}.${m}.value`,placeholder:l("valuePlaceholder"),"aria-label":l("value"),defaultValue:f.value,"data-testid":`${d}.${m}.value`,onChange:(R,N)=>w(m,N),onBlur:()=>g()})}),t(x,{children:t(A,{variant:"link",title:l("removeAttribute"),isDisabled:r,onClick:()=>M(m),"data-testid":`${d}.${m}.remove`,children:t(Z,{})})})]},f.id))]}),t(fe,{children:t(ge,{children:t(A,{"data-testid":`${d}-add-row`,className:"pf-v5-u-px-0 pf-v5-u-mt-sm",variant:"link",icon:t(q,{}),onClick:()=>i(),children:l("addAttribute",{label:n})})})})]}):y(Q,{"data-testid":`${e}-empty-state`,className:"pf-v5-u-p-0",variant:"xs",children:[t(X,{children:l("missingAttributes",{label:n})}),t(ee,{children:t(A,{"data-testid":`${e}-add-row`,variant:"link",icon:t(q,{}),size:"sm",onClick:i,isDisabled:r,children:l("addAttribute",{label:n})})})]})};function _(e){return typeof e=="string"&&e.length>0?e.split("##"):[]}function Ae(e){return e.join("##")}const Me=({name:e,label:n,helpText:s,defaultValue:o,options:r,isDisabled:l=!1,stringify:a,required:u})=>{const{t:c}=C(),{control:p}=S(),[h,d]=L(!1);return t(v,{label:c(n),labelIcon:t(b,{helpText:c(s),fieldLabelId:`${n}`}),fieldId:e,isRequired:u,children:t(k,{name:I(e),control:p,defaultValue:a?o||"":o?[o]:[],render:({field:i})=>t(B,{toggleId:e,"data-testid":e,isDisabled:l,chipGroupProps:{numChips:3,expandedText:c("hide"),collapsedText:c("showRemaining")},variant:K.typeaheadMulti,typeAheadAriaLabel:"Select",onToggle:g=>d(g),selections:a?_(i.value):i.value,onSelect:g=>{const T=g.toString(),w=a?_(i.value):i.value;let $;w.includes(T)?$=w.filter(M=>M!==T):$=[...w,T],i.onChange(a?Ae($):$)},onClear:()=>{i.onChange(a?"":[])},isOpen:h,"aria-label":c(n),children:r?.map(g=>t(D,{value:g,children:g},g))})})})};function Re(e){return e&&Array.isArray(e)?e:[e]}const Ne=({name:e,label:n,defaultValue:s,helpText:o,stringify:r,required:l,isDisabled:a=!1})=>{const{t:u}=C(),c=I(e);return t(v,{label:u(n),labelIcon:t(b,{helpText:u(o),fieldLabelId:`${n}`}),fieldId:e,isRequired:l,children:t(Ie,{"aria-label":u(n),name:c,isDisabled:a,defaultValue:Re(s),addButtonLabel:u("addMultivaluedLabel",{fieldLabel:u(n).toLowerCase()}),stringify:r})})},Ve=({name:e,label:n,helpText:s,defaultValue:o,required:r,isDisabled:l=!1})=>{const{t:a}=C();return t(te,{name:I(e),label:a(n),labelIcon:a(s),isDisabled:l,defaultValue:o?.toString(),rules:{required:{value:!!r,message:a("required")}}})},j=e=>e?.includes(".")?e.split("."):["",e||""],Fe=e=>e.client?.clientId?`${e.client.clientId}.${e.role.name}`:e.role.name,Ge=({name:e,label:n,helpText:s,defaultValue:o,required:r,isDisabled:l=!1})=>{const{t:a}=C(),[u,c]=ne(),{control:p,formState:{errors:h}}=S(),d=I(e);return y(v,{label:a(n),labelIcon:t(b,{helpText:a(s),fieldLabelId:`${n}`}),fieldId:e,isRequired:r,children:[t(k,{name:d,defaultValue:o||"",control:p,render:({field:i})=>y(ae,{children:[u&&t(ve,{id:"id",type:"roles",name:e,onAssign:g=>i.onChange(Fe(g[0])),onClose:c,isRadio:!0}),i.value!==""&&t(P,{children:t(U,{textMaxWidth:"500px",onClick:()=>i.onChange(""),children:t(be,{role:{name:j(i.value)[1]},client:{clientId:j(i.value)[0]}})})}),t(P,{children:t(A,{onClick:c,variant:"secondary","data-testid":"add-roles",disabled:l,children:a("selectRole.label")})})]})}),h[d]&&t(J,{message:a("required")})]})},Oe=({name:e,label:n,helpText:s,defaultValue:o,required:r,isDisabled:l=!1})=>{const{t:a}=C(),{control:u}=S();return t(v,{label:a(n),labelIcon:t(b,{helpText:t("span",{style:{whiteSpace:"pre-wrap"},children:s}),fieldLabelId:`${n}`}),fieldId:e,isRequired:r,children:t(k,{name:I(e),defaultValue:o,control:u,render:({field:c})=>t(Se,{id:e,"data-testid":e,isReadOnly:l,type:"text",onChange:c.onChange,code:Array.isArray(c.value)?c.value[0]:c.value,height:"600px",language:ye.javascript})})})},qe=({name:e,label:n,helpText:s,...o})=>{const{t:r}=C();return t(le,{name:I(e),label:r(n),labelIcon:r(s),"data-testid":e,...o})},Pe=({name:e,label:n,helpText:s,defaultValue:o,required:r,isDisabled:l=!1})=>{const{t:a}=C(),{register:u}=S();return t(v,{label:a(n),labelIcon:t(b,{helpText:a(s),fieldLabelId:`${n}`}),fieldId:e,required:r,children:t(oe,{id:e,"data-testid":e,isDisabled:l,defaultValue:o?.toString(),...u(I(e))})})},_e=({name:e,label:n,helpText:s})=>{const{t:o}=C(),{control:r}=S(),{value:l}=re({control:r,name:e,defaultValue:""});return t(v,{label:o(n),fieldId:e,labelIcon:t(b,{helpText:o(s),fieldLabelId:`${n}`}),className:"keycloak__identity-providers__url_component",children:t(se,{title:o(s),href:l,isInline:!0})})},je=({name:e,label:n,helpText:s,required:o=!1})=>{const{adminClient:r}=ie(),{t:l}=C(),{formState:{errors:a}}=S(),[u,c]=L(),p=I(e);ce(()=>r.users.getProfile(),d=>c(d),[]);const h=d=>d?.attributes?d.attributes.map(i=>({key:i.name,label:i.name})):[];return u?y(v,{label:l(n),isRequired:o,labelIcon:t(b,{helpText:l(s),fieldLabelId:n}),fieldId:p,children:[t(Ce,{name:p,rules:o?{required:!0}:{},selectItems:h(u)}),a[p]&&t(J,{message:l("required")})]}):null},W={String:qe,Text:Pe,boolean:Le,List:we,Role:Ge,Script:Oe,Map:xe,Group:ke,ClientList:Te,UserProfileAttributeList:je,MultivaluedList:Me,MultivaluedString:Ne,File:$e,Password:Ve,Url:_e},Ee=e=>e in W,Qe=({properties:e,...n})=>t(E,{children:e.map(s=>{const o=s.type;if(Ee(o)){const r=W[o];return t(r,{...s,...n},s.name)}else console.warn(`There is no editor registered for ${o}`)})}),I=e=>de(`config.${e}`);export{Qe as D,I as c};
//# sourceMappingURL=DynamicComponents-2Oogxguf.js.map
