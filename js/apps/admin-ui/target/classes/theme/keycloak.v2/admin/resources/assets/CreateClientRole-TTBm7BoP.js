import{jsx as i}from"react/jsx-runtime";import{u,a as C,l as p,b as R,c as b,d as f,V as g,n as h,bN as v,q as A,cC as F}from"./main-hjbDDO6j.js";import{R as N}from"./RoleForm-D4Wq_a6z.js";import"react";import"react-dom";import"./FormAccess-DEsYjDHG.js";import"./copy-icon-ePLWnxgr.js";import"./ViewHeader-Dr6ZoEJz.js";function q(){const{adminClient:a}=u(),{t:l}=C(),o=p({mode:"onChange"}),m=R(),{clientId:e}=b(),{realm:r}=f(),{addAlert:c,addError:d}=g();return i(h,{...o,children:i(N,{form:o,onSubmit:async n=>{const s={...n,name:n.name?.trim(),attributes:{}};try{await a.clients.createRole({id:e,...s});const t=await a.clients.findRole({id:e,roleName:s.name});c(l("roleCreated"),A.success),m(F({realm:r,clientId:e,id:t.id,tab:"details"}))}catch(t){d("roleCreateError",t)}},cancelLink:v({realm:r,clientId:e,tab:"roles"}),role:"manage-clients",editMode:!1})})}export{q as default};
//# sourceMappingURL=CreateClientRole-TTBm7BoP.js.map