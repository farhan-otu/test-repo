import{jsx as e,jsxs as w,Fragment as M}from"react/jsx-runtime";import{useState as K}from"react";import{u as g,a as m,V as S,M as U,m as N,f as d,w as k,h as v,by as l,ap as C,cz as I}from"./main-hjbDDO6j.js";import{d as R}from"./differenceBy-BM_QxZMj.js";const V=r=>{const{t:s}=m();return w(M,{children:[r.username," ",!r.enabled&&e(C,{color:"red",icon:e(I,{}),children:s("disabled")})]})},E=({membersQuery:r,onAdd:s,onClose:n})=>{const{adminClient:u}=g(),{t:a}=m(),{addError:y}=S(),[p,h]=K([]),f=async(t,c,b)=>{const o=await r(t,c),F={first:t,max:c+o.length,search:b||""};try{const i=await u.users.find({...F});return R(i,o,"id").slice(0,c)}catch(i){return y("noUsersFoundError",i),[]}};return e(U,{variant:N.large,title:a("addMember"),isOpen:!0,onClose:n,actions:[e(d,{"data-testid":"add",variant:"primary",onClick:async()=>{await s(p),n()},children:a("add")},"confirm"),e(d,{"data-testid":"cancel",variant:"link",onClick:n,children:a("cancel")},"cancel")],children:e(k,{loader:f,isPaginated:!0,ariaLabelKey:"titleUsers",searchPlaceholderKey:"searchForUser",canSelectAll:!0,onSelect:t=>h([...t]),emptyState:e(v,{message:a("noUsersFound"),instructions:a("emptyInstructions")}),columns:[{name:"username",displayKey:"username",cellRenderer:V},{name:"email",displayKey:"email",cellFormatters:[l()]},{name:"lastName",displayKey:"lastName",cellFormatters:[l()]},{name:"firstName",displayKey:"firstName",cellFormatters:[l()]}]})})};export{E as M};
//# sourceMappingURL=MembersModal-C-yaYxu4.js.map