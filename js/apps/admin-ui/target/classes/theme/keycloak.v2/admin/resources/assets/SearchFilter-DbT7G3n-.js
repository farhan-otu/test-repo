import{jsx as e,jsxs as S,Fragment as T}from"react/jsx-runtime";import{useState as O}from"react";import{u as $,a as y,V as x,ag as f,ah as C,q as F,ai as u,bm as k,bn as A,T as g,aj as D,D as E}from"./main-hjbDDO6j.js";import{f as P,c as j,g as w,b as L,A as m}from"./ClientScopeTypes-CQeLlnWG.js";import{F as V}from"./filter-icon-I49U7vdU.js";const B=({clientId:n,selectedRows:l,refresh:r})=>{const{adminClient:p}=$(),{t:a}=y(),[i,t]=O(!1),{addAlert:s,addError:c}=x();return e(f,{"aria-label":"change-type-to",onOpenChange:o=>t(o),isOpen:i,toggle:o=>e(C,{id:"change-type-dropdown",isDisabled:l.length===0,ref:o,onClick:()=>t(!i),isExpanded:i,children:a("changeTypeTo")}),onSelect:async(o,d)=>{try{await Promise.all(l.map(h=>n?P(p,n,h,h.type,d):j(p,h,d))),t(!1),r(),s(a("clientScopeSuccess"),F.success)}catch(h){c("clientScopeError",h)}},children:e(u,{children:w(a,n?void 0:L)})})},_=["all","saml","openid-connect"],G=(n="")=>l=>l.name?.includes(n),H=n=>l=>n===m.none||l.type===n,J=n=>l=>n==="all"||l.protocol===n,b=({searchType:n,withProtocol:l=!1,onSelect:r})=>{const{t:p}=y(),[a,i]=O(!1),t=c=>e(E,{onClick:()=>{r(c),i(!1)},children:p(`clientScopeSearch.${c}`)},c),s=[t("name"),t("type")];return l&&s.push(t("protocol")),e(k,{onOpenChange:c=>i(c),toggle:c=>S(C,{"data-testid":"clientScopeSearch",ref:c,id:"toggle-id",onClick:()=>i(!a),children:[e(V,{})," ",p(`clientScopeSearch.${n}`)]}),isOpen:a,children:e(A,{children:s})})},K=({searchType:n,onSelect:l,type:r,onType:p,protocol:a,onProtocol:i})=>{const{t}=y(),[s,c]=O(!1);return S(T,{children:[n==="type"&&S(T,{children:[e(g,{children:e(b,{searchType:n,onSelect:l,withProtocol:!!a})}),e(g,{children:e(f,{toggle:o=>e(C,{"data-testid":"clientScopeSearchType",ref:o,isExpanded:s,onClick:()=>c(!s),children:r===m.none?t("allTypes"):t(`clientScopeTypes.${r}`)}),onOpenChange:o=>c(o),isOpen:s,selected:r===m.none?t("allTypes"):t(`clientScopeTypes.${r}`),onSelect:(o,d)=>{p(d),c(!1)},children:S(u,{children:[e(D,{value:m.none,children:t("allTypes")}),w(t)]})})})]}),n==="protocol"&&!!a&&S(T,{children:[e(g,{children:e(b,{searchType:n,onSelect:l,withProtocol:!0})}),e(g,{children:e(f,{toggle:o=>e(C,{"data-testid":"clientScopeSearchProtocol",ref:o,isExpanded:s,onClick:()=>c(!s),children:t(`protocolTypes.${a}`)}),onOpenChange:o=>c(o),isOpen:s,selected:t(`protocolTypes.${a}`),onSelect:(o,d)=>{i?.(d),c(!1)},children:e(u,{children:_.map(o=>e(D,{value:o,children:t(`protocolTypes.${o}`)},o))})})})]})]})};export{B as C,b as S,K as a,G as n,J as p,H as t};
//# sourceMappingURL=SearchFilter-DbT7G3n-.js.map
