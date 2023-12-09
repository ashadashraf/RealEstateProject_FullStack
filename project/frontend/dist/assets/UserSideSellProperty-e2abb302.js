import{j as e,R as f,r as x,u as N,c as k,F as b,I as P,a as S,b as F,d as n,e as t,f as A,C as h,g as l,B as R,U as L,h as T}from"./index-9d4d201b.js";import{U}from"./UserPropertySell-fc6c15f0.js";const v=({method:o})=>e.jsx(f.Fragment,{children:e.jsx("div",{className:"flex justify-center align-center",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"200",height:"200",viewBox:"0 0 16 16",className:"svg-icon",children:[e.jsx("path",{d:"M8.447.276a.5.5 0 0 0-.894 0L7.19 1H2.5A1.5 1.5 0 0 0 1 2.5V10h14V2.5A1.5 1.5 0 0 0 13.5 1H8.809L8.447.276Z"}),e.jsx("text",{x:"50%",y:"37%",dy:".3em",textAnchor:"middle",fontSize:"3",fontWeight:"bold",fill:"#000",fontFamily:"Arial, sans-serif",children:o}),e.jsx("path",{"fill-rule":"evenodd",d:"M.5 11a.5.5 0 0 0 0 1h2.86l-.845 3.379a.5.5 0 0 0 .97.242L3.89 14h8.22l.405 1.621a.5.5 0 0 0 .97-.242L12.64 12h2.86a.5.5 0 0 0 0-1H.5Zm3.64 2 .25-1h7.22l.25 1H4.14Z"})]})})}),w=x.forwardRef(({className:o,bsPrefix:r,as:d="span",...i},a)=>(r=N(r,"input-group-text"),e.jsx(d,{ref:a,className:k(o,r),...i})));w.displayName="InputGroupText";const C=w,E=o=>e.jsx(C,{children:e.jsx(b,{type:"checkbox",...o})}),V=o=>e.jsx(C,{children:e.jsx(b,{type:"radio",...o})}),G=x.forwardRef(({bsPrefix:o,size:r,hasValidation:d,className:i,as:a="div",...c},p)=>{o=N(o,"input-group");const u=x.useMemo(()=>({}),[]);return e.jsx(P.Provider,{value:u,children:e.jsx(a,{ref:p,...c,className:k(i,o,r&&`${o}-${r}`,d&&"has-validation")})})});G.displayName="InputGroup";const g=Object.assign(G,{Text:C,Radio:V,Checkbox:E}),H=()=>{const o=S(),r=F(),[d,i]=x.useState(!1),a=n(s=>s.showPropertyAddress.transactionType),c=n(s=>s.showPropertyAddress.address),p=n(s=>s.showPropertyAddress.unit),u=n(s=>s.showPropertyAddress.city),m=n(s=>s.showPropertyAddress.state),j=n(s=>s.showPropertyAddress.pincode),y=s=>{r(l({transactionType:s}))},I=s=>{s.preventDefault(),s.currentTarget.checkValidity()===!1?s.stopPropagation():console.log(a,c,p,u,m,j),a&&c&&p&&u&&m&&j&&(i(!0),o.push("/markproperty"))};return e.jsxs("div",{className:"user-property-sell-mid",children:[e.jsx("h3",{className:"explore-head",children:"Explore your options"}),e.jsxs("div",{className:"row p-3",children:[e.jsx("div",{className:"col",onClick:()=>y("Sale"),children:e.jsx(v,{method:"SELL"})}),e.jsx("div",{className:"col",onClick:()=>y("Rent"),children:e.jsx(v,{method:"RENT"})}),e.jsx("div",{className:"col",onClick:()=>y("Lease"),children:e.jsx(v,{method:"LEASE"})})]}),e.jsxs(t,{className:"pt-5 pl-5 pr-5 pb-2",onSubmit:I,style:{backgroundColor:"#D9D9D9",margin:"100px",borderRadius:"20px"},noValidate:!0,validated:d,children:[e.jsxs(A,{children:[e.jsxs(t.Group,{as:h,md:"3",controlId:"validationCustom01",className:"m-1",children:[e.jsx(t.Control,{value:c,onChange:s=>r(l({address:s.target.value})),required:!0,type:"text",placeholder:"Street Address"}),e.jsx(t.Control.Feedback,{children:"Looks good!"}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please choose an address."})]}),e.jsxs(t.Group,{as:h,md:"2",controlId:"validationCustom02",className:"m-1",children:[e.jsx(t.Control,{required:!0,value:p,onChange:s=>r(l({unit:s.target.value})),type:"text",placeholder:"Unit"}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please choose an unit."}),e.jsx(t.Control.Feedback,{children:"Looks good!"})]}),e.jsx(t.Group,{as:h,md:"2",controlId:"validationCustomUsername",className:"m-1",children:e.jsxs(g,{hasValidation:!0,children:[e.jsx(g.Text,{id:"inputGroupPrepend",children:"@"}),e.jsx(t.Control,{type:"text",value:u,onChange:s=>r(l({city:s.target.value})),placeholder:"City","aria-describedby":"inputGroupPrepend",required:!0}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please choose a city."})]})}),e.jsxs(t.Group,{as:h,md:"2",controlId:"validationCustom03",className:"m-1",children:[e.jsx(t.Control,{type:"text",placeholder:"State",required:!0,value:m,onChange:s=>r(l({state:s.target.value}))}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please provide a valid state."})]}),e.jsxs(t.Group,{as:h,md:"2",controlId:"validationCustom04",className:"m-1",children:[e.jsx(t.Control,{type:"text",value:j,onChange:s=>r(l({pincode:s.target.value})),placeholder:"PinCode",required:!0}),e.jsx(t.Control.Feedback,{type:"invalid",children:"Please provide a valid pincode."})]})]}),e.jsx(R,{type:"submit",className:"m-3 continue-button",children:"Continue"})]})]})},M=()=>e.jsxs(f.Fragment,{children:[e.jsx(L,{}),e.jsx(U,{}),e.jsx(H,{}),e.jsx(T,{})]});export{M as default};
