import{a as d,_ as P}from"./@babel-11e817af.js";import{r as m}from"./react-5e5497d9.js";function l(r){return"default"+r.charAt(0).toUpperCase()+r.substr(1)}function b(r){var t=y(r,"string");return typeof t=="symbol"?t:String(t)}function y(r,t){if(typeof r!="object"||r===null)return r;var o=r[Symbol.toPrimitive];if(o!==void 0){var e=o.call(r,t||"default");if(typeof e!="object")return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(r)}function S(r,t,o){var e=m.useRef(r!==void 0),n=m.useState(t),a=n[0],f=n[1],i=r!==void 0,p=e.current;return e.current=i,!i&&p&&a!==t&&f(t),[i?r:a,m.useCallback(function(c){for(var u=arguments.length,v=new Array(u>1?u-1:0),s=1;s<u;s++)v[s-1]=arguments[s];o&&o.apply(void 0,[c].concat(v)),f(c)},[o])]}function j(r,t){return Object.keys(t).reduce(function(o,e){var n,a=o,f=a[l(e)],i=a[e],p=d(a,[l(e),e].map(b)),c=t[e],u=S(i,f,r[c]),v=u[0],s=u[1];return P({},p,(n={},n[e]=v,n[c]=s,n))},r)}export{S as a,j as u};
