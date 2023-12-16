import{j as e,R as y,r as f}from"./react-5e5497d9.js";import{a as s,U as b,b as P}from"./index-f22a0ac5.js";import{U as k}from"./UserPropertySell-50f5e11f.js";import{F as r,R as N,C as i,f as j,B as S}from"./react-bootstrap-94f1a3e9.js";/* empty css                  */import{u as w,a}from"./react-redux-fda6d297.js";import{u as A}from"./react-router-c0ec2a24.js";import"./@zegocloud-df1323c4.js";import"./react-dom-585b8c01.js";import"./scheduler-765c72db.js";import"./react-router-dom-992c6d67.js";import"./@babel-11e817af.js";import"./history-14403fb6.js";import"./resolve-pathname-e210f2ac.js";import"./value-equal-17d7769a.js";import"./tiny-invariant-253458cb.js";import"./react-icons-64287f7e.js";import"./mdb-react-ui-kit-0e4b3bef.js";import"./@reduxjs-69ed7b28.js";import"./immer-41fd5235.js";import"./redux-cef7b9c2.js";import"./redux-thunk-ef899f4c.js";import"./react-google-login-4b940c99.js";import"./gapi-script-6c9bcd75.js";import"./hoist-non-react-statics-d5fd62bb.js";import"./react-is-e5978b8b.js";import"./axios-28bc18a3.js";import"./mapbox-gl-6f08f8e4.js";import"./redux-persist-daa3df3a.js";import"./classnames-8e509635.js";import"./prop-types-extra-571b8aa3.js";import"./uncontrollable-11f2de37.js";import"./@restart-bee8d52b.js";import"./dom-helpers-fa9da9d2.js";import"./@react-aria-2d9aeea2.js";import"./dequal-5d0cf067.js";import"./@popperjs-a8253bfa.js";import"./warning-a06a1dc5.js";import"./react-transition-group-33a4e12e.js";import"./prop-types-9bfe13df.js";import"./use-sync-external-store-9e4930e8.js";import"./path-to-regexp-00f975c1.js";import"./isarray-7a86238f.js";const u=({method:l})=>e.jsx(y.Fragment,{children:e.jsx("div",{className:"flex justify-center align-center",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"200",height:"200",viewBox:"0 0 16 16",className:"svg-icon",children:[e.jsx("path",{d:"M8.447.276a.5.5 0 0 0-.894 0L7.19 1H2.5A1.5 1.5 0 0 0 1 2.5V10h14V2.5A1.5 1.5 0 0 0 13.5 1H8.809L8.447.276Z"}),e.jsx("text",{x:"50%",y:"37%",dy:".3em",textAnchor:"middle",fontSize:"3",fontWeight:"bold",fill:"#000",fontFamily:"Arial, sans-serif",children:l}),e.jsx("path",{"fill-rule":"evenodd",d:"M.5 11a.5.5 0 0 0 0 1h2.86l-.845 3.379a.5.5 0 0 0 .97.242L3.89 14h8.22l.405 1.621a.5.5 0 0 0 .97-.242L12.64 12h2.86a.5.5 0 0 0 0-1H.5Zm3.64 2 .25-1h7.22l.25 1H4.14Z"})]})})}),F=()=>{const l=A(),o=w(),[v,C]=f.useState(!1),x=a(t=>t.showPropertyAddress.transactionType),d=a(t=>t.showPropertyAddress.address),n=a(t=>t.showPropertyAddress.unit),p=a(t=>t.showPropertyAddress.city),c=a(t=>t.showPropertyAddress.state),m=a(t=>t.showPropertyAddress.pincode),h=t=>{o(s({transactionType:t}))},g=t=>{t.preventDefault(),t.currentTarget.checkValidity()===!1?t.stopPropagation():console.log(x,d,n,p,c,m),x&&d&&n&&p&&c&&m&&(C(!0),l.push("/markproperty"))};return e.jsxs("div",{className:"user-property-sell-mid",children:[e.jsx("h3",{className:"explore-head",children:"Explore your options"}),e.jsxs("div",{className:"row p-3",children:[e.jsx("div",{className:"col",onClick:()=>h("Sale"),children:e.jsx(u,{method:"SELL"})}),e.jsx("div",{className:"col",onClick:()=>h("Rent"),children:e.jsx(u,{method:"RENT"})}),e.jsx("div",{className:"col",onClick:()=>h("Lease"),children:e.jsx(u,{method:"LEASE"})})]}),e.jsxs(r,{className:"pt-5 pl-5 pr-5 pb-2",onSubmit:g,style:{backgroundColor:"#D9D9D9",margin:"100px",borderRadius:"20px"},noValidate:!0,validated:v,children:[e.jsxs(N,{children:[e.jsxs(r.Group,{as:i,md:"3",controlId:"validationCustom01",className:"m-1",children:[e.jsx(r.Control,{value:d,onChange:t=>o(s({address:t.target.value})),required:!0,type:"text",placeholder:"Street Address"}),e.jsx(r.Control.Feedback,{children:"Looks good!"}),e.jsx(r.Control.Feedback,{type:"invalid",children:"Please choose an address."})]}),e.jsxs(r.Group,{as:i,md:"2",controlId:"validationCustom02",className:"m-1",children:[e.jsx(r.Control,{required:!0,value:n,onChange:t=>o(s({unit:t.target.value})),type:"text",placeholder:"Unit"}),e.jsx(r.Control.Feedback,{type:"invalid",children:"Please choose an unit."}),e.jsx(r.Control.Feedback,{children:"Looks good!"})]}),e.jsx(r.Group,{as:i,md:"2",controlId:"validationCustomUsername",className:"m-1",children:e.jsxs(j,{hasValidation:!0,children:[e.jsx(j.Text,{id:"inputGroupPrepend",children:"@"}),e.jsx(r.Control,{type:"text",value:p,onChange:t=>o(s({city:t.target.value})),placeholder:"City","aria-describedby":"inputGroupPrepend",required:!0}),e.jsx(r.Control.Feedback,{type:"invalid",children:"Please choose a city."})]})}),e.jsxs(r.Group,{as:i,md:"2",controlId:"validationCustom03",className:"m-1",children:[e.jsx(r.Control,{type:"text",placeholder:"State",required:!0,value:c,onChange:t=>o(s({state:t.target.value}))}),e.jsx(r.Control.Feedback,{type:"invalid",children:"Please provide a valid state."})]}),e.jsxs(r.Group,{as:i,md:"2",controlId:"validationCustom04",className:"m-1",children:[e.jsx(r.Control,{type:"text",value:m,onChange:t=>o(s({pincode:t.target.value})),placeholder:"PinCode",required:!0}),e.jsx(r.Control.Feedback,{type:"invalid",children:"Please provide a valid pincode."})]})]}),e.jsx(S,{type:"submit",className:"m-3 continue-button",children:"Continue"})]})]})},ge=()=>e.jsxs(y.Fragment,{children:[e.jsx(b,{}),e.jsx(k,{}),e.jsx(F,{}),e.jsx(P,{})]});export{ge as default};