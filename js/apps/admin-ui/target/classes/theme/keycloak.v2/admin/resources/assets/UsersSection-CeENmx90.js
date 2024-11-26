import{jsx as e,jsxs as l,Fragment as v}from"react/jsx-runtime";import{V as Ce}from"./ViewHeader-Dr6ZoEJz.js";import{a as S,bm as me,ah as he,bn as be,D as $,V as pe,l as Ue,fH as Te,G as z,H as B,I as W,bt as xe,ce as fe,cf as H,a1 as ne,f as E,fb as Ne,O as Ie,cW as De,A as Se,B as J,q,c7 as we,c8 as Fe,aj as Ee,db as ie,b$ as ge,T as F,bw as Ke,dA as Pe,eM as Ve,u as Re,d as Z,b as Oe,j as Le,y as _e,w as Be,a6 as qe,a7 as je,a9 as Ge,h as Me,by as Q,L as We,cA as $e,bl as ye,ap as le,cz as ze,bL as He,fI as Qe,fJ as Je,ax as Ze,U as Xe,W as Ye,bD as et,bE as tt,al as rt,P as at,ez as oe}from"./main-hjbDDO6j.js";import{P as st}from"./PermissionTab-CE0biuPZ.js";import{useState as p}from"react";import{u as ce}from"./ConfirmDialog-DN_NVsrg.js";import{a as nt}from"./AddRoleMappingModal-B-7S42YC.js";import{F as it}from"./filter-icon-I49U7vdU.js";import{D as lt}from"./DropdownPanel-D_qgc_Fl.js";import{W as Ae}from"./warning-triangle-icon-CUSjnRec.js";import{R as ot,u as ct}from"./RoutableTabs-ChOqIl6o.js";/* empty css                     */import{a as ue,b as de}from"./Tabs-TiG_cKa2.js";import"react-dom";import"./useLocaleSort-Bon3wgU4.js";import"./Trans-BCvPJnzT.js";import"./translationFormatter-aKDacg4X.js";import"./PageHandler-Dm6Ir_Zl.js";import"./DynamicComponents-2Oogxguf.js";import"./ClientSelect-Di5Ep3wz.js";import"./FileUpload-DFzHUp8z.js";import"./CodeEditor-BF8OqNGf.js";import"./copy-icon-ePLWnxgr.js";import"./GroupPickerDialog-CJH5Fdnt.js";import"./DataListItemRow-C-0mzg8R.js";import"./KeySelect-CBdQO7FV.js";import"./MultiLineInput-BKovUfcB.js";import"./useParams-XtwJXIDJ.js";import"./constants-BclHbWtx.js";const ut=({searchType:r,onSelect:a})=>{const{t:c}=S(),[m,b]=p(!1),s=i=>e($,{onClick:()=>{a(i),b(!1)},children:c(`searchType.${i}`)},i),y=[s("default"),s("attribute")];return e(me,{className:"keycloak__users__searchtype",onOpenChange:i=>b(i),toggle:i=>e(he,{"data-testid":"user-search-toggle",ref:i,id:"toggle-id",onClick:()=>b(!m),icon:e(it,{}),children:c(`searchType.${r}`)}),isOpen:m,children:e(be,{children:y})})};function dt({activeFilters:r,setActiveFilters:a,profile:c,createAttributeSearchChips:m,searchUserWithAttributes:b}){const{t:s}=S(),{addAlert:y}=pe(),[i,x]=p(!1),w={name:"",displayName:"",value:""},{getValues:o,register:k,reset:N,formState:{errors:h},setValue:K,setError:I,clearErrors:V,control:u}=Ue({mode:"onChange",defaultValues:w}),d=()=>r.userAttribute.some(t=>t.name===o().name),C=()=>{let t=!1;return o().name.length?r.userAttribute.some(A=>A.name===o().name)?I("name",{type:"conflict",message:s("searchUserByAttributeKeyAlreadyInUseError")}):t=!0:I("name",{type:"empty",message:s("searchUserByAttributeMissingKeyError")}),t},U=()=>{let t=!1;return o().value.length?t=!0:I("value",{type:"empty",message:s("searchUserByAttributeMissingValueError")}),t},R=()=>C()&&U(),T=()=>{R()?(a({exact:o().exact,userAttribute:[...r.userAttribute,{...o()}]}),N({exact:o().exact})):(h.name?.message&&y(h.name.message,q.danger),h.value?.message&&y(h.value.message,q.danger))},P=()=>{const t=[...r.userAttribute].filter(A=>A.name!==A.name);a({exact:o().exact,userAttribute:t})},O=()=>c?e(we,{"data-testid":"search-attribute-name-select",variant:Fe.typeahead,onToggle:t=>x(t),selections:o().displayName,onSelect:t=>{K("displayName",t.toString()),d()?I("name",{type:"conflict"}):V("name")},isOpen:i,placeholderText:s("selectAttribute"),validated:h.name&&"error",maxHeight:300,...k("displayName",{required:!0,validate:C}),children:c.attributes?.map(t=>e(Ee,{value:ie(s,t.displayName,t.name),onClick:A=>{A.stopPropagation(),x(!1),K("name",t.name)},children:ie(s,t.displayName,t.name)},t.name))}):e(ne,{id:"name",placeholder:s("keyPlaceholder"),validated:h.name&&"error",onKeyDown:t=>t.key==="Enter"&&T(),...k("name",{required:!0,validate:C})});return l(Te,{className:"user-attribute-search-form","data-testid":"user-attribute-search-form",children:[e(z,{className:"user-attribute-search-form-headline",children:e(B,{component:W.h2,children:s("selectAttributes")})}),e(xe,{isInline:!0,className:"user-attribute-search-form-alert",variant:"info",title:s("searchUserByAttributeDescription"),component:"h3"}),l(z,{className:"user-attribute-search-form-key-value",children:[e("div",{className:"user-attribute-search-form-left",children:e(B,{component:W.h3,children:s("key")})}),e("div",{className:"user-attribute-search-form-right",children:e(B,{component:W.h3,children:s("value")})})]}),e("div",{className:"user-attribute-search-form-left",children:O()}),e("div",{className:"user-attribute-search-form-right",children:l(fe,{children:[e(H,{children:e(ne,{id:"value",placeholder:s("valuePlaceholder"),validated:h.value&&"error",onKeyDown:t=>{t.key==="Enter"&&(t.preventDefault(),T())},...k("value",{required:!0,validate:U})})}),e(H,{children:e(E,{"data-testid":"user-attribute-search-add-filter-button",variant:"control",icon:e(Ne,{}),onClick:T,"aria-label":s("addToFilter")})})]})}),m(),e("div",{className:"pf-v5-u-pt-lg",children:e(Ie,{name:"exact",defaultValue:!1,control:u,render:({field:t})=>e(De,{id:"exact","data-testid":"exact",label:s("exactSearch"),isChecked:t.value,onChange:t.onChange})})}),l(Se,{className:"user-attribute-search-form-action-group",children:[e(E,{"data-testid":"search-user-attribute-btn",variant:"primary",type:"submit",isDisabled:!r.userAttribute.length,onClick:b,children:s("search")}),e(E,{variant:J.link,onClick:()=>{N(),P()},children:s("reset")})]})]})}function mt({searchDropdownOpen:r,setSearchDropdownOpen:a,realm:c,hasSelectedRows:m,toggleDeleteDialog:b,toggleUnlockUsersDialog:s,goToCreate:y,searchType:i,setSearchType:x,searchUser:w,setSearchUser:o,activeFilters:k,setActiveFilters:N,refresh:h,profile:K,clearAllFilters:I,createAttributeSearchChips:V,searchUserWithAttributes:u}){const{t:d}=S(),[C,U]=p(!1),{hasAccess:R}=ge(),T=R("query-users"),P=()=>e(F,{children:l(fe,{children:[e(H,{children:e(ut,{searchType:i,onSelect:f=>{I(),x(f)}})}),i==="default"&&O(),i==="attribute"&&t()]})}),O=()=>e(F,{children:e(Pe,{"data-testid":"table-search-input",placeholder:d("searchForUser"),"aria-label":d("search"),value:w,onSearch:(f,L,G)=>{o(G.haswords),h()},onKeyDown:f=>{if(f.key==="Enter"){const L=f.target;o(L.value),h()}},onClear:()=>{o(""),h()}})}),t=()=>l(v,{children:[e(lt,{"data-testid":"select-attributes-dropdown",buttonText:d("selectAttributes"),setSearchDropdownOpen:a,searchDropdownOpen:r,width:"15vw",children:e(dt,{activeFilters:k,setActiveFilters:N,profile:K,createAttributeSearchChips:V,searchUserWithAttributes:()=>{u(),a(!1)}})}),e(E,{icon:e(Ve,{}),variant:"control",onClick:()=>{u(),a(!1)},"aria-label":d("searchAttributes")})]}),A=c.bruteForceProtected?e(F,{children:e(me,{onOpenChange:f=>U(f),toggle:f=>e(he,{ref:f,isExpanded:C,variant:"plain",onClick:()=>U(!C),children:e(Ke,{})}),isOpen:C,shouldFocusToggleOnSelect:!0,children:l(be,{children:[e($,{component:"button",isDisabled:m,onClick:()=>{b(),U(!1)},children:d("deleteUser")},"deleteUser"),e($,{component:"button",onClick:()=>{s(),U(!1)},children:d("unlockAllUsers")},"unlock")]})})}):e(F,{children:e(E,{variant:J.link,onClick:b,"data-testid":"delete-user-btn",isDisabled:m,children:d("deleteUser")})}),j=l(v,{children:[e(F,{children:e(E,{"data-testid":"add-user",onClick:y,children:d("addUser")})}),A]});return l(v,{children:[P(),T?j:null]})}const ht=r=>{const{t:a}=S(),{realm:c}=Z();return l(v,{children:[l(We,{to:$e({realm:c,id:r.id,tab:"settings"}),children:[r.username,e(bt,{user:r})]}),r.attributes?.is_temporary_admin[0]==="true"&&e(ye,{content:a("temporaryAdmin"),children:e(Ae,{className:"pf-v5-u-ml-sm",id:"temporary-admin-label"})})]})},bt=({user:r})=>{const{t:a}=S();return l(v,{children:[!r.enabled&&e(le,{color:"red",icon:e(ze,{}),children:a("disabled")}),r.bruteForceStatus?.disabled&&e(le,{color:"orange",icon:e(Ae,{}),children:a("temporaryLocked")})]})},pt=r=>{const{t:a}=S();return l(v,{children:[!r.emailVerified&&e(ye,{content:a("notVerified"),children:e(He,{className:"keycloak__user-section__email-verified"})})," ",Q()(r.email)]})};function ft(){const{adminClient:r}=Re(),{t:a}=S(),{addAlert:c,addError:m}=pe(),{realm:b,realmRepresentation:s}=Z(),y=Oe(),[i,x]=p({}),[w,o]=p(""),[k,N]=p([]),[h,K]=p("default"),[I,V]=p(!1),[u,d]=p({exact:!1,userAttribute:[]}),[C,U]=p({}),[R,T]=p(""),[P,O]=p(0),t=()=>O(P+1);Le(async()=>{try{return await Promise.all([Qe(r),r.users.getProfile()])}catch{return[{},{}]}},([n,g])=>{x(n),U(g)},[]);const A=async(n,g,ae)=>{const D={first:n,max:g,q:R},_=ae||w||"";if(_&&(D.search=_),u.exact&&(D.exact=!0),!Y&&!(D.search||D.q))return[];try{return await nt(r,{briefRepresentation:!0,...D})}catch(se){return i.userProfileProvidersEnabled?m("noUsersFoundErrorStorage",se):m("noUsersFoundError",se),[]}},[j,f]=ce({titleKey:"unlockAllUsers",messageKey:"unlockUsersConfirm",continueButtonLabel:"unlock",onConfirm:async()=>{try{await r.attackDetection.delAll(),t(),c(a("unlockUsersSuccess"),q.success)}catch(n){m("unlockUsersError",n)}}}),[L,G]=ce({titleKey:"deleteConfirmUsers",messageKey:a("deleteConfirmDialog",{count:k.length}),continueButtonLabel:"delete",continueButtonVariant:J.danger,onConfirm:async()=>{try{for(const n of k)await r.users.del({id:n.id});N([]),M(),c(a("userDeletedSuccess"),q.success)}catch(n){m("userDeletedError",n)}}}),X=()=>y(Je({realm:b}));if(!i||!s)return e(_e,{});const Y=!i.userProfileProvidersEnabled,M=()=>{d({exact:!1,userAttribute:[]}),o(""),T(""),t()},ee=n=>n.userAttribute.map(g=>`${g.name}:${g.value}`).join(" "),ve=()=>{const n=ee(u);T(n),t()},te=()=>e(Ze,{children:u.userAttribute.length>0&&e(v,{children:Object.values(u.userAttribute).map(n=>e(Xe,{className:"pf-v5-u-mt-md pf-v5-u-mr-md","data-testid":"user-attribute-search-chips-group",categoryName:n.displayName.length?n.displayName:n.name,isClosable:!0,onClick:g=>{g.stopPropagation();const D={userAttribute:[...u.userAttribute].filter(_=>_.name!==n.name),exact:u.exact};d(D),T(ee(D)),t()},children:e(Ye,{isReadOnly:!0,children:n.value},n.name)},n.name))})}),re=()=>e(mt,{searchDropdownOpen:I,setSearchDropdownOpen:V,realm:s,hasSelectedRows:k.length===0,toggleDeleteDialog:L,toggleUnlockUsersDialog:j,goToCreate:X,searchType:h,setSearchType:K,searchUser:w,setSearchUser:o,activeFilters:u,setActiveFilters:d,refresh:t,profile:C,clearAllFilters:M,createAttributeSearchChips:te,searchUserWithAttributes:ve}),ke=()=>{if(u.userAttribute.length)return l("div",{className:"user-attribute-search-form-subtoolbar",children:[e(F,{children:te()}),e(F,{children:e(E,{variant:"link",onClick:()=>{M()},children:a("clearAllFilters")})})]})};return l(v,{children:[e(G,{}),e(f,{}),e(Be,{isSearching:w!==""||u.userAttribute.length!==0,loader:A,isPaginated:!0,ariaLabelKey:"titleUsers",canSelectAll:!0,onSelect:n=>N([...n]),emptyState:Y?e(Me,{message:a("noUsersFound"),instructions:a("emptyInstructions"),primaryActionText:a("createNewUser"),onPrimaryAction:X}):l(v,{children:[e(qe,{children:e(je,{children:re()})}),e(Ge,{"data-testid":"empty-state",variant:"lg",children:e(z,{className:"kc-search-users-text",children:e(B,{children:a("searchForUserDescription")})})})]}),toolbarItem:re(),subToolbar:ke(),actionResolver:n=>{const g=n.data;return g.access?.manage?[{title:a("delete"),onClick:()=>{N([g]),L()}}]:[]},columns:[{name:"username",displayKey:"username",cellRenderer:ht},{name:"email",displayKey:"email",cellRenderer:pt},{name:"lastName",displayKey:"lastName",cellFormatters:[Q()]},{name:"firstName",displayKey:"firstName",cellFormatters:[Q()]}]},P)]})}function $t(){const{t:r}=S(),{realm:a}=Z(),{hasAccess:c}=ge(),b=et()(tt.AdminFineGrainedAuthz)&&c("manage-authorization","manage-users","manage-clients"),s=x=>ct(oe({realm:a,tab:x})),y=s("list"),i=s("permissions");return l(v,{children:[e(Ce,{titleKey:"titleUsers",subKey:"usersExplain",helpUrl:rt.usersUrl,divider:!1}),e(at,{"data-testid":"users-page",variant:"light",className:"pf-v5-u-p-0",children:l(ot,{"data-testid":"user-tabs",defaultLocation:oe({realm:a,tab:"list"}),isBox:!0,mountOnEnter:!0,children:[e(ue,{id:"list","data-testid":"listTab",title:e(de,{children:r("userList")}),...y,children:e(ft,{})}),b&&e(ue,{id:"permissions","data-testid":"permissionsTab",title:e(de,{children:r("permissions")}),...i,children:e(st,{type:"users"})})]})})]})}export{$t as default};
//# sourceMappingURL=UsersSection-CeENmx90.js.map