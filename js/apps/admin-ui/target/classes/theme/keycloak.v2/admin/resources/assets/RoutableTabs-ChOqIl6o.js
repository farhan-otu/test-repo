import{jsxs as v,jsx as o}from"react/jsx-runtime";import{Children as K,isValidElement as g}from"react";import{dw as x,c as P,e as R,bD as E,a as I,e2 as D,e3 as F,bE as j,e4 as p}from"./main-hjbDDO6j.js";import{P as A}from"./PageHandler-Dm6Ir_Zl.js";import{T as c}from"./constants-BclHbWtx.js";import{T as C,d as H,a as L}from"./Tabs-TiG_cKa2.js";const _=({children:a,defaultLocation:t,...n})=>{const{pathname:s}=x(),i=P(),{componentTypes:l}=R(),h=l?.[c]||[],d=E(),{t:u}=I(),r=h.filter(e=>D({path:e.metadata.path},s)).map(e=>({...e,pathname:F(e.metadata.path,{...i,...e.metadata.params})})),f=r.map(e=>e.pathname),m=K.toArray(a).filter(e=>g(e)).map(e=>e.props.eventKey.toString()),T=[...m,...f].find(e=>e===decodeURI(s)),y=m.filter(e=>s.includes(e)).sort((e,b)=>e.length-b.length).pop();return v(C,{activeKey:T??y??t?.pathname??s,component:H.nav,inset:{default:"insetNone",xl:"insetLg","2xl":"inset2xl"},...n,children:[a,d(j.DeclarativeUI)&&r.map(e=>o(M,{eventKey:e.pathname,title:u(e.id),children:o(A,{page:e,providerType:c})},e.id))]})},M=({children:a,...t})=>{const n=p(t.eventKey);return o(L,{href:n,...t,children:a})},k=a=>({eventKey:a.pathname??"",href:p(a)});export{_ as R,k as u};
//# sourceMappingURL=RoutableTabs-ChOqIl6o.js.map