import{ei as A,el as R,eH as m,eI as p,eJ as w,dq as y,dr as I,ds as f,du as L}from"./main-hjbDDO6j.js";import{b as l}from"./_baseFlatten-DK0O-V_R.js";var C=200;function E(i,e,n,o){var a=-1,h=p,c=!0,b=i.length,s=[],g=e.length;if(!b)return s;n&&(e=A(e,R(n))),e.length>=C&&(h=w,c=!1,e=new m(e));e:for(;++a<b;){var r=i[a],t=n==null?r:n(r);if(r=r!==0?r:0,c&&t===t){for(var d=g;d--;)if(e[d]===t)continue e;s.push(r)}else h(e,t,o)||s.push(r)}return s}var _=y(function(i,e){var n=I(e);return f(n)&&(n=void 0),f(i)?E(i,l(e,1,f,!0),L(n)):[]});export{_ as d};
//# sourceMappingURL=differenceBy-BM_QxZMj.js.map
