import{jsxs as g,Fragment as y,jsx as t}from"react/jsx-runtime";import{u as F,a as D,b as v,V as K,d as b,B as S,q as h,w as V,f as x,L as f,cP as k,by as I,h as N,b$ as P,dk as $,_ as B}from"./main-hjbDDO6j.js";import{useState as E}from"react";import{t as T}from"./translationFormatter-aKDacg4X.js";import{u as j}from"./ConfirmDialog-DN_NVsrg.js";const _=({defaultRoleName:c,toDetail:m,messageBundle:n,...a})=>{const{t:l}=D(n),{realm:d}=b(),{hasAccess:s,hasSomeAccess:i}=P(),e=s("view-realm")&&i("view-clients","manage-clients");return a.name!==c?t(f,{to:m(a.id),children:a.name}):g(y,{children:[e?t(f,{to:$({realm:d,tab:"user-registration"}),children:a.name}):t("span",{children:a.name}),t(B,{helpText:l(`${n}:defaultRole`),fieldLabelId:"defaultRole"})]})},J=({loader:c,paginated:m=!0,parentRoleId:n,messageBundle:a="roles",toCreate:l,toDetail:d,isReadOnly:s})=>{const{adminClient:i}=F(),{t:e}=D(),C=v(),{addAlert:R,addError:L}=K(),{realmRepresentation:u}=b(),[r,p]=E(),[w,A]=j({titleKey:"roleDeleteConfirm",messageKey:e("roleDeleteConfirmDialog",{selectedRoleName:r?r.name:""}),continueButtonLabel:"delete",continueButtonVariant:S.danger,onConfirm:async()=>{try{n?await i.roles.delCompositeRoles({id:n},[r]):await i.roles.delById({id:r.id}),p(void 0),R(e("roleDeletedSuccess"),h.success)}catch(o){L("roleDeleteError",o)}}});return g(y,{children:[t(A,{}),t(V,{loader:c,ariaLabelKey:"roleList",searchPlaceholderKey:"searchForRoles",isPaginated:m,toolbarItem:!s&&t(x,{"data-testid":"create-role",component:o=>t(f,{...o,to:l}),children:e("createRole")}),actions:s?void 0:[{title:e("delete"),onRowClick:o=>{p(o),u?.defaultRole&&o.name===u.defaultRole.name?R(e("defaultRoleDeleteError"),h.danger):w()}}],columns:[{name:"name",displayKey:"roleName",cellRenderer:o=>t(_,{...o,defaultRoleName:u?.defaultRole?.name,toDetail:d,messageBundle:a})},{name:"composite",displayKey:"composite",cellFormatters:[k(),I()]},{name:"description",cellFormatters:[T(e)]}],emptyState:t(N,{hasIcon:!0,message:e(`noRoles-${a}`),instructions:s?"":e(`noRolesInstructions-${a}`),primaryActionText:s?"":e("createRole"),onPrimaryAction:()=>C(l)})},r?r.id:"roleList")]})};export{J as R};
//# sourceMappingURL=RolesList-CTB0TkUW.js.map