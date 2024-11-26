import{jsx as a,jsxs as k}from"react/jsx-runtime";import{f as I,h as m,_ as q,u as D,a as F,P as M,t as Q,a_ as $,a$ as z,b0 as B,b1 as T,M as G}from"./main-B1vcX1Xc.js";import*as f from"react";import{useState as h,useMemo as C,useEffect as U}from"react";import{r as H,g as J}from"./api-z6juZ93J.js";import"react-dom";const S={actionList:"pf-v5-c-action-list",actionListGroup:"pf-v5-c-action-list__group",modifiers:{icons:"pf-m-icons"}},E=e=>{var{children:t,isIconList:n,className:i=""}=e,l=I(e,["children","isIconList","className"]);return f.createElement("div",Object.assign({className:m(S.actionList,n&&S.modifiers.icons,i)},l),t)};E.displayName="ActionList";const P=e=>{var{children:t,className:n=""}=e,i=I(e,["children","className"]);return f.createElement("div",Object.assign({className:m(`${S.actionList}__item`,n)},i),t)};P.displayName="ActionListItem";const s={list:"pf-v5-c-list",listItem:"pf-v5-c-list__item",listItemIcon:"pf-v5-c-list__item-icon",modifiers:{iconLg:"pf-m-icon-lg",plain:"pf-m-plain",inline:"pf-m-inline",bordered:"pf-m-bordered"}};var O;(function(e){e.number="1",e.lowercaseLetter="a",e.uppercaseLetter="A",e.lowercaseRomanNumber="i",e.uppercaseRomanNumber="I"})(O||(O={}));var j;(function(e){e.inline="inline"})(j||(j={}));var b;(function(e){e.ol="ol",e.ul="ul"})(b||(b={}));const A=e=>{var{className:t="",children:n=null,variant:i=null,isBordered:l=!1,isPlain:c=!1,iconSize:o="default",type:u=O.number,ref:d=null,component:N=b.ul}=e,v=I(e,["className","children","variant","isBordered","isPlain","iconSize","type","ref","component"]);return N===b.ol?f.createElement("ol",Object.assign({ref:d,type:u},c&&{role:"list"},v,{className:m(s.list,i&&s.modifiers[i],l&&s.modifiers.bordered,c&&s.modifiers.plain,o&&o==="large"&&s.modifiers.iconLg,t)}),n):f.createElement("ul",Object.assign({ref:d},c&&{role:"list"},v,{className:m(s.list,i&&s.modifiers[i],l&&s.modifiers.bordered,c&&s.modifiers.plain,o&&o==="large"&&s.modifiers.iconLg,t)}),n)};A.displayName="List";const _=e=>{var{icon:t=null,children:n=null}=e,i=I(e,["icon","children"]);return f.createElement("li",Object.assign({className:m(t&&s.listItem)},i),t&&f.createElement("span",{className:m(s.listItemIcon)},t),n)};_.displayName="ListItem";const ee=()=>{const e=q(),{t}=D(),n=t("verifiableCredentialsSelectionDefault"),[i,l]=h(n),[c,o]=h(""),[u,d]=h(!1),[N,v]=h(!1),[p,R]=h();F(()=>J(e),R);const L=C(()=>typeof p<"u"?p.credential_configurations_supported:{},[p]),V=C(()=>typeof L<"u"?Array.from(Object.keys(L)):[],[L]);U(()=>{n!==i&&p!==void 0&&H(e,L[i],p).then(r=>{const g=new FileReader;g.readAsDataURL(r),g.onloadend=function(){const y=g.result;typeof y=="string"&&(o(y),v(!0),d(!1))}})},[i]);const w=()=>{d(!u)},x=r=>a(G,{ref:r,onClick:w,isExpanded:u,"data-testid":"menu-toggle",children:i});return a(M,{title:t("verifiableCredentialsTitle"),description:t("verifiableCredentialsDescription"),children:a(Q,{isFilled:!0,variant:$.light,children:k(A,{isPlain:!0,children:[a(_,{children:a(z,{"data-testid":"credential-select",onOpenChange:r=>d(r),onSelect:(r,g)=>l(g),isOpen:u,selected:i,toggle:x,shouldFocusToggleOnSelect:!0,children:a(B,{children:V.map(r=>a(T,{value:r,"data-testid":r,children:r},r))})})}),a(_,{children:a(E,{children:N&&a(P,{children:a("img",{width:"500",height:"500",src:c,"data-testid":"qr-code"})})})})]})})})};export{ee as Oid4Vci,ee as default};
//# sourceMappingURL=Oid4Vci-DH3rRf80.js.map