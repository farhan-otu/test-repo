import{jsx as t,jsxs as f}from"react/jsx-runtime";import{u as k,a as v,l as C,d as E,V as F,j as O,P as R,F as w,n as x,A as D,f as p,L as V,k as _}from"./main-hjbDDO6j.js";import{useState as B}from"react";import{D as H}from"./DynamicComponents-2Oogxguf.js";import{u as I}from"./useParams-XtwJXIDJ.js";import{T as u}from"./constants-BclHbWtx.js";const J=({id:g,providerType:c,page:{id:o,...P}})=>{const{adminClient:r}=k(),{t:n}=v(),m=C(),{realm:h,realmRepresentation:y}=E(),{addAlert:S,addError:b}=F(),[i,d]=B(g),l=I();O(async()=>await Promise.all([i?r.components.findOne({id:i}):Promise.resolve(),c===u?r.components.find({type:u}):Promise.resolve()]),([a,s])=>{const e=(s||[]).find(j=>j.providerId===o);m.reset(a||e||{}),e&&d(e.id)},[]);const A=async a=>{(a.config||l)&&(a.config=Object.assign(a.config||{},l),Object.entries(a.config).forEach(([s,e])=>a.config[s]=Array.isArray(e)?e:[e]));try{const s={...a,providerId:o,providerType:c,parentId:y?.id};if(i)await r.components.update({id:i},s);else{const{id:e}=await r.components.create(s);d(e)}S(n("itemSaveSuccessful"))}catch(s){b("itemSaveError",s)}};return t(R,{variant:"light",children:f(w,{isHorizontal:!0,onSubmit:m.handleSubmit(A),className:"keycloak__form",children:[t(x,{...m,children:t(H,{properties:P.properties})}),f(D,{children:[t(p,{"data-testid":"save",type:"submit",children:n("save")}),t(p,{variant:"link",component:a=>t(V,{...a,to:_({realm:h,providerId:o})}),children:n("cancel")})]})]})})};export{J as P};
//# sourceMappingURL=PageHandler-Dm6Ir_Zl.js.map