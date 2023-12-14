import{c as p}from"./classnames-8e509635.js";import{r as a,j as l,R as ue}from"./react-5e5497d9.js";import"./prop-types-extra-571b8aa3.js";import{u as re,a as Yn}from"./uncontrollable-11f2de37.js";import{u as qn,m as zn,A as fe,B as Jn,a as le,b as Z,M as Qn,c as Zn,d as Pn,S as eo,e as to,f as no,g as ze,h as oo,D as ao,i as so,j as ro,k as lo,l as co,n as Je,o as io}from"./@restart-bee8d52b.js";import{T as uo,E as fo,a as Qe,b as ve,c as Oe}from"./react-transition-group-33a4e12e.js";import{P as S}from"./prop-types-9bfe13df.js";import{t as po,s as oe,e as mo,q as te,r as vo,h as We,b as ho}from"./dom-helpers-fa9da9d2.js";import{R as No}from"./react-dom-585b8c01.js";const xo=["xxl","xl","lg","md","sm","xs"],Co="xs",he=a.createContext({prefixes:{},breakpoints:xo,minBreakpoint:Co});function v(t,e){const{prefixes:n}=a.useContext(he);return t||n[e]||e}function Ze(){const{breakpoints:t}=a.useContext(he);return t}function Pe(){const{minBreakpoint:t}=a.useContext(he);return t}function Ne(){const{dir:t}=a.useContext(he);return t==="rtl"}const et=a.forwardRef(({bsPrefix:t,fluid:e=!1,as:n="div",className:o,...s},r)=>{const c=v(t,"container"),i=typeof e=="string"?`-${e}`:"-fluid";return l.jsx(n,{ref:r,...s,className:p(o,e?`${c}${i}`:c)})});et.displayName="Container";const es=et,tt=a.createContext(null);tt.displayName="NavbarContext";const P=tt,nt=a.createContext(null);nt.displayName="CardHeaderContext";const ot=nt,at=a.forwardRef(({className:t,bsPrefix:e,as:n="div",...o},s)=>(e=v(e,"nav-item"),l.jsx(n,{ref:s,className:p(t,e),...o})));at.displayName="NavItem";const go=at,st=a.forwardRef(({bsPrefix:t,className:e,as:n=fe,active:o,eventKey:s,disabled:r=!1,...c},i)=>{t=v(t,"nav-link");const[d,u]=qn({key:zn(s,c.href),active:o,disabled:r,...c});return l.jsx(n,{...c,...d,ref:i,disabled:r,className:p(e,t,r&&"disabled",u.isActive&&"active")})});st.displayName="NavLink";const rt=st,lt=a.forwardRef((t,e)=>{const{as:n="div",bsPrefix:o,variant:s,fill:r=!1,justify:c=!1,navbar:i,navbarScroll:d,className:u,activeKey:f,...m}=re(t,{activeKey:"onSelect"}),N=v(o,"nav");let x,C,w=!1;const h=a.useContext(P),R=a.useContext(ot);return h?(x=h.bsPrefix,w=i??!0):R&&({cardHeaderBsPrefix:C}=R),l.jsx(Jn,{as:n,ref:e,activeKey:f,className:p(u,{[N]:!w,[`${x}-nav`]:w,[`${x}-nav-scroll`]:w&&d,[`${C}-${s}`]:!!C,[`${N}-${s}`]:!!s,[`${N}-fill`]:r,[`${N}-justified`]:c}),...m})});lt.displayName="Nav";const ts=Object.assign(lt,{Item:go,Link:rt}),ct=a.forwardRef(({bsPrefix:t,className:e,as:n,...o},s)=>{t=v(t,"navbar-brand");const r=n||(o.href?"a":"span");return l.jsx(r,{...o,ref:s,className:p(e,t)})});ct.displayName="NavbarBrand";const yo=ct;function Xe(t,e){const n=oe(t,e)||"",o=n.indexOf("ms")===-1?1e3:1;return parseFloat(n)*o}function xe(t,e){const n=Xe(t,"transitionDuration"),o=Xe(t,"transitionDelay"),s=po(t,r=>{r.target===t&&(s(),e(r))},n+o)}function se(...t){return t.filter(e=>e!=null).reduce((e,n)=>{if(typeof n!="function")throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return e===null?n:function(...s){e.apply(this,s),n.apply(this,s)}},null)}function ke(t){t.offsetHeight}function pe(t){return t&&"setState"in t?No.findDOMNode(t):t??null}const wo=ue.forwardRef(({onEnter:t,onEntering:e,onEntered:n,onExit:o,onExiting:s,onExited:r,addEndListener:c,children:i,childRef:d,...u},f)=>{const m=a.useRef(null),N=le(m,d),x=g=>{N(pe(g))},C=g=>$=>{g&&m.current&&g(m.current,$)},w=a.useCallback(C(t),[t]),h=a.useCallback(C(e),[e]),R=a.useCallback(C(n),[n]),j=a.useCallback(C(o),[o]),T=a.useCallback(C(s),[s]),O=a.useCallback(C(r),[r]),E=a.useCallback(C(c),[c]);return l.jsx(uo,{ref:f,...u,onEnter:w,onEntered:R,onEntering:h,onExit:j,onExited:O,onExiting:T,addEndListener:E,nodeRef:m,children:typeof i=="function"?(g,$)=>i(g,{...$,ref:x}):ue.cloneElement(i,{ref:x})})}),Ce=wo,$o={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function Ro(t,e){const n=`offset${t[0].toUpperCase()}${t.slice(1)}`,o=e[n],s=$o[t];return o+parseInt(oe(e,s[0]),10)+parseInt(oe(e,s[1]),10)}const jo={[fo]:"collapse",[Qe]:"collapsing",[ve]:"collapsing",[Oe]:"collapse show"},To=ue.forwardRef(({onEnter:t,onEntering:e,onEntered:n,onExit:o,onExiting:s,className:r,children:c,dimension:i="height",in:d=!1,timeout:u=300,mountOnEnter:f=!1,unmountOnExit:m=!1,appear:N=!1,getDimensionValue:x=Ro,...C},w)=>{const h=typeof i=="function"?i():i,R=a.useMemo(()=>se(g=>{g.style[h]="0"},t),[h,t]),j=a.useMemo(()=>se(g=>{const $=`scroll${h[0].toUpperCase()}${h.slice(1)}`;g.style[h]=`${g[$]}px`},e),[h,e]),T=a.useMemo(()=>se(g=>{g.style[h]=null},n),[h,n]),O=a.useMemo(()=>se(g=>{g.style[h]=`${x(h,g)}px`,ke(g)},o),[o,x,h]),E=a.useMemo(()=>se(g=>{g.style[h]=null},s),[h,s]);return l.jsx(Ce,{ref:w,addEndListener:xe,...C,"aria-expanded":C.role?d:null,onEnter:R,onEntering:j,onEntered:T,onExit:O,onExiting:E,childRef:c.ref,in:d,timeout:u,mountOnEnter:f,unmountOnExit:m,appear:N,children:(g,$)=>ue.cloneElement(c,{...$,className:p(r,c.props.className,jo[g],h==="width"&&"collapse-horizontal")})})}),it=To,dt=a.forwardRef(({children:t,bsPrefix:e,...n},o)=>{e=v(e,"navbar-collapse");const s=a.useContext(P);return l.jsx(it,{in:!!(s&&s.expanded),...n,children:l.jsx("div",{ref:o,className:e,children:t})})});dt.displayName="NavbarCollapse";const Eo=dt,ut=a.forwardRef(({bsPrefix:t,className:e,children:n,label:o="Toggle navigation",as:s="button",onClick:r,...c},i)=>{t=v(t,"navbar-toggler");const{onToggle:d,expanded:u}=a.useContext(P)||{},f=Z(m=>{r&&r(m),d&&d()});return s==="button"&&(c.type="button"),l.jsx(s,{...c,ref:i,onClick:f,"aria-label":o,className:p(e,t,!u&&"collapsed"),children:n||l.jsx("span",{className:`${t}-icon`})})});ut.displayName="NavbarToggle";const Io=ut,Oo={[ve]:"show",[Oe]:"show"},ft=a.forwardRef(({className:t,children:e,transitionClasses:n={},onEnter:o,...s},r)=>{const c={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,...s},i=a.useCallback((d,u)=>{ke(d),o==null||o(d,u)},[o]);return l.jsx(Ce,{ref:r,addEndListener:xe,...c,onEnter:i,childRef:e.ref,children:(d,u)=>a.cloneElement(e,{...u,className:p("fade",t,e.props.className,Oo[d],n[d])})})});ft.displayName="Fade";const Ee=ft,pt=a.forwardRef(({className:t,bsPrefix:e,as:n="div",...o},s)=>(e=v(e,"offcanvas-body"),l.jsx(n,{ref:s,className:p(t,e),...o})));pt.displayName="OffcanvasBody";const ko=pt,bo={[ve]:"show",[Oe]:"show"},mt=a.forwardRef(({bsPrefix:t,className:e,children:n,in:o=!1,mountOnEnter:s=!1,unmountOnExit:r=!1,appear:c=!1,...i},d)=>(t=v(t,"offcanvas"),l.jsx(Ce,{ref:d,addEndListener:xe,in:o,mountOnEnter:s,unmountOnExit:r,appear:c,...i,childRef:n.ref,children:(u,f)=>a.cloneElement(n,{...f,className:p(e,n.props.className,(u===ve||u===Qe)&&`${t}-toggling`,bo[u])})})));mt.displayName="OffcanvasToggling";const Fo=mt,So=a.createContext({onHide(){}}),vt=So,Do={"aria-label":S.string,onClick:S.func,variant:S.oneOf(["white"])},be=a.forwardRef(({className:t,variant:e,"aria-label":n="Close",...o},s)=>l.jsx("button",{ref:s,type:"button",className:p("btn-close",e&&`btn-close-${e}`,t),"aria-label":n,...o}));be.displayName="CloseButton";be.propTypes=Do;const Bo=be,Ao=a.forwardRef(({closeLabel:t="Close",closeVariant:e,closeButton:n=!1,onHide:o,children:s,...r},c)=>{const i=a.useContext(vt),d=Z(()=>{i==null||i.onHide(),o==null||o()});return l.jsxs("div",{ref:c,...r,children:[s,n&&l.jsx(Bo,{"aria-label":t,variant:e,onClick:d})]})}),Mo=Ao,ht=a.forwardRef(({bsPrefix:t,className:e,closeLabel:n="Close",closeButton:o=!1,...s},r)=>(t=v(t,"offcanvas-header"),l.jsx(Mo,{ref:r,...s,className:p(e,t),closeLabel:n,closeButton:o})));ht.displayName="OffcanvasHeader";const Lo=ht,Fe=t=>a.forwardRef((e,n)=>l.jsx("div",{...e,ref:n,className:p(e.className,t)})),Ho=Fe("h5"),Nt=a.forwardRef(({className:t,bsPrefix:e,as:n=Ho,...o},s)=>(e=v(e,"offcanvas-title"),l.jsx(n,{ref:s,className:p(t,e),...o})));Nt.displayName="OffcanvasTitle";const _o=Nt,ne={FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top",NAVBAR_TOGGLER:".navbar-toggler"};class xt extends Qn{adjustAndStore(e,n,o){const s=n.style[e];n.dataset[e]=s,oe(n,{[e]:`${parseFloat(oe(n,e))+o}px`})}restore(e,n){const o=n.dataset[e];o!==void 0&&(delete n.dataset[e],oe(n,{[e]:o}))}setContainerStyle(e){super.setContainerStyle(e);const n=this.getElement();if(mo(n,"modal-open"),!e.scrollBarWidth)return;const o=this.isRTL?"paddingLeft":"paddingRight",s=this.isRTL?"marginLeft":"marginRight";te(n,ne.FIXED_CONTENT).forEach(r=>this.adjustAndStore(o,r,e.scrollBarWidth)),te(n,ne.STICKY_CONTENT).forEach(r=>this.adjustAndStore(s,r,-e.scrollBarWidth)),te(n,ne.NAVBAR_TOGGLER).forEach(r=>this.adjustAndStore(s,r,e.scrollBarWidth))}removeContainerStyle(e){super.removeContainerStyle(e);const n=this.getElement();vo(n,"modal-open");const o=this.isRTL?"paddingLeft":"paddingRight",s=this.isRTL?"marginLeft":"marginRight";te(n,ne.FIXED_CONTENT).forEach(r=>this.restore(o,r)),te(n,ne.STICKY_CONTENT).forEach(r=>this.restore(s,r)),te(n,ne.NAVBAR_TOGGLER).forEach(r=>this.restore(s,r))}}let Te;function Go(t){return Te||(Te=new xt(t)),Te}const Ko=xt;function Vo(t){return l.jsx(Fo,{...t})}function Uo(t){return l.jsx(Ee,{...t})}const Ct=a.forwardRef(({bsPrefix:t,className:e,children:n,"aria-labelledby":o,placement:s="start",responsive:r,show:c=!1,backdrop:i=!0,keyboard:d=!0,scroll:u=!1,onEscapeKeyDown:f,onShow:m,onHide:N,container:x,autoFocus:C=!0,enforceFocus:w=!0,restoreFocus:h=!0,restoreFocusOptions:R,onEntered:j,onExit:T,onExiting:O,onEnter:E,onEntering:g,onExited:$,backdropClassName:k,manager:G,renderStaticNode:K=!1,...Y},V)=>{const D=a.useRef();t=v(t,"offcanvas");const{onToggle:A}=a.useContext(P)||{},[F,we]=a.useState(!1),M=Zn(r||"xs","up");a.useEffect(()=>{we(r?c&&!M:c)},[c,r,M]);const L=Z(()=>{A==null||A(),N==null||N()}),q=a.useMemo(()=>({onHide:L}),[L]);function ce(){return G||(u?(D.current||(D.current=new Ko({handleContainerOverflow:!1})),D.current):Go())}const ie=(B,...b)=>{B&&(B.style.visibility="visible"),E==null||E(B,...b)},$e=(B,...b)=>{B&&(B.style.visibility=""),$==null||$(...b)},ee=a.useCallback(B=>l.jsx("div",{...B,className:p(`${t}-backdrop`,k)}),[k,t]),U=B=>l.jsx("div",{...B,...Y,className:p(e,r?`${t}-${r}`:t,`${t}-${s}`),"aria-labelledby":o,children:n});return l.jsxs(l.Fragment,{children:[!F&&(r||K)&&U({}),l.jsx(vt.Provider,{value:q,children:l.jsx(Pn,{show:F,ref:V,backdrop:i,container:x,keyboard:d,autoFocus:C,enforceFocus:w&&!u,restoreFocus:h,restoreFocusOptions:R,onEscapeKeyDown:f,onShow:m,onHide:L,onEnter:ie,onEntering:g,onEntered:j,onExit:T,onExiting:O,onExited:$e,manager:ce(),transition:Vo,backdropTransition:Uo,renderBackdrop:ee,renderDialog:U})})]})});Ct.displayName="Offcanvas";const Wo=Object.assign(Ct,{Body:ko,Header:Lo,Title:_o}),gt=a.forwardRef((t,e)=>{const n=a.useContext(P);return l.jsx(Wo,{ref:e,show:!!(n!=null&&n.expanded),...t,renderStaticNode:!0})});gt.displayName="NavbarOffcanvas";const Xo=gt,yt=a.forwardRef(({className:t,bsPrefix:e,as:n="span",...o},s)=>(e=v(e,"navbar-text"),l.jsx(n,{ref:s,className:p(t,e),...o})));yt.displayName="NavbarText";const Yo=yt,wt=a.forwardRef((t,e)=>{const{bsPrefix:n,expand:o=!0,variant:s="light",bg:r,fixed:c,sticky:i,className:d,as:u="nav",expanded:f,onToggle:m,onSelect:N,collapseOnSelect:x=!1,...C}=re(t,{expanded:"onToggle"}),w=v(n,"navbar"),h=a.useCallback((...T)=>{N==null||N(...T),x&&f&&(m==null||m(!1))},[N,x,f,m]);C.role===void 0&&u!=="nav"&&(C.role="navigation");let R=`${w}-expand`;typeof o=="string"&&(R=`${R}-${o}`);const j=a.useMemo(()=>({onToggle:()=>m==null?void 0:m(!f),bsPrefix:w,expanded:!!f,expand:o}),[w,f,o,m]);return l.jsx(P.Provider,{value:j,children:l.jsx(eo.Provider,{value:h,children:l.jsx(u,{ref:e,...C,className:p(d,w,o&&R,s&&`${w}-${s}`,r&&`bg-${r}`,i&&`sticky-${i}`,c&&`fixed-${c}`)})})})});wt.displayName="Navbar";const ns=Object.assign(wt,{Brand:yo,Collapse:Eo,Offcanvas:Xo,Text:Yo,Toggle:Io}),$t=a.createContext({});$t.displayName="DropdownContext";const Rt=$t,jt=a.forwardRef(({className:t,bsPrefix:e,as:n="hr",role:o="separator",...s},r)=>(e=v(e,"dropdown-divider"),l.jsx(n,{ref:r,className:p(t,e),role:o,...s})));jt.displayName="DropdownDivider";const qo=jt,Tt=a.forwardRef(({className:t,bsPrefix:e,as:n="div",role:o="heading",...s},r)=>(e=v(e,"dropdown-header"),l.jsx(n,{ref:r,className:p(t,e),role:o,...s})));Tt.displayName="DropdownHeader";const zo=Tt,Et=a.forwardRef(({bsPrefix:t,className:e,eventKey:n,disabled:o=!1,onClick:s,active:r,as:c=fe,...i},d)=>{const u=v(t,"dropdown-item"),[f,m]=to({key:n,href:i.href,disabled:o,onClick:s,active:r});return l.jsx(c,{...i,...f,ref:d,className:p(e,u,m.isActive&&"active",o&&"disabled")})});Et.displayName="DropdownItem";const Jo=Et,It=a.forwardRef(({className:t,bsPrefix:e,as:n="span",...o},s)=>(e=v(e,"dropdown-item-text"),l.jsx(n,{ref:s,className:p(t,e),...o})));It.displayName="DropdownItemText";const Qo=It,Ot=a.createContext(null);Ot.displayName="InputGroupContext";const Se=Ot;function kt(t,e){return t}function bt(t,e,n){const o=n?"top-end":"top-start",s=n?"top-start":"top-end",r=n?"bottom-end":"bottom-start",c=n?"bottom-start":"bottom-end",i=n?"right-start":"left-start",d=n?"right-end":"left-end",u=n?"left-start":"right-start",f=n?"left-end":"right-end";let m=t?c:r;return e==="up"?m=t?s:o:e==="end"?m=t?f:u:e==="start"?m=t?d:i:e==="down-centered"?m="bottom":e==="up-centered"&&(m="top"),m}const Ft=a.forwardRef(({bsPrefix:t,className:e,align:n,rootCloseEvent:o,flip:s=!0,show:r,renderOnMount:c,as:i="div",popperConfig:d,variant:u,...f},m)=>{let N=!1;const x=a.useContext(P),C=v(t,"dropdown-menu"),{align:w,drop:h,isRTL:R}=a.useContext(Rt);n=n||w;const j=a.useContext(Se),T=[];if(n)if(typeof n=="object"){const Y=Object.keys(n);if(Y.length){const V=Y[0],D=n[V];N=D==="start",T.push(`${C}-${V}-${D}`)}}else n==="end"&&(N=!0);const O=bt(N,h,R),[E,{hasShown:g,popper:$,show:k,toggle:G}]=no({flip:s,rootCloseEvent:o,show:r,usePopper:!x&&T.length===0,offset:[0,2],popperConfig:d,placement:O});if(E.ref=le(kt(m),E.ref),ze(()=>{k&&($==null||$.update())},[k]),!g&&!c&&!j)return null;typeof i!="string"&&(E.show=k,E.close=()=>G==null?void 0:G(!1),E.align=n);let K=f.style;return $!=null&&$.placement&&(K={...f.style,...E.style},f["x-placement"]=$.placement),l.jsx(i,{...f,...E,style:K,...(T.length||x)&&{"data-bs-popper":"static"},className:p(e,C,k&&"show",N&&`${C}-end`,u&&`${C}-${u}`,...T)})});Ft.displayName="DropdownMenu";const Zo=Ft,St=a.forwardRef(({as:t,bsPrefix:e,variant:n="primary",size:o,active:s=!1,disabled:r=!1,className:c,...i},d)=>{const u=v(e,"btn"),[f,{tagName:m}]=oo({tagName:t,disabled:r,...i}),N=m;return l.jsx(N,{...f,...i,ref:d,disabled:r,className:p(c,u,s&&"active",n&&`${u}-${n}`,o&&`${u}-${o}`,i.href&&r&&"disabled")})});St.displayName="Button";const Po=St,Dt=a.forwardRef(({bsPrefix:t,split:e,className:n,childBsPrefix:o,as:s=Po,...r},c)=>{const i=v(t,"dropdown-toggle"),d=a.useContext(ao);o!==void 0&&(r.bsPrefix=o);const[u]=so();return u.ref=le(u.ref,kt(c)),l.jsx(s,{className:p(n,i,e&&`${i}-split`,(d==null?void 0:d.show)&&"show"),...u,...r})});Dt.displayName="DropdownToggle";const ea=Dt,Bt=a.forwardRef((t,e)=>{const{bsPrefix:n,drop:o="down",show:s,className:r,align:c="start",onSelect:i,onToggle:d,focusFirstItemOnShow:u,as:f="div",navbar:m,autoClose:N=!0,...x}=re(t,{show:"onToggle"}),C=a.useContext(Se),w=v(n,"dropdown"),h=Ne(),R=$=>N===!1?$==="click":N==="inside"?$!=="rootClose":N==="outside"?$!=="select":!0,j=Z(($,k)=>{k.originalEvent.currentTarget===document&&(k.source!=="keydown"||k.originalEvent.key==="Escape")&&(k.source="rootClose"),R(k.source)&&(d==null||d($,k))}),O=bt(c==="end",o,h),E=a.useMemo(()=>({align:c,drop:o,isRTL:h}),[c,o,h]),g={down:w,"down-centered":`${w}-center`,up:"dropup","up-centered":"dropup-center dropup",end:"dropend",start:"dropstart"};return l.jsx(Rt.Provider,{value:E,children:l.jsx(ro,{placement:O,show:s,onSelect:i,onToggle:j,focusFirstItemOnShow:u,itemSelector:`.${w}-item:not(.disabled):not(:disabled)`,children:C?x.children:l.jsx(f,{...x,ref:e,className:p(r,s&&"show",g[o])})})})});Bt.displayName="Dropdown";const Q=Object.assign(Bt,{Toggle:ea,Menu:Zo,Item:Jo,ItemText:Qo,Divider:qo,Header:zo}),At=a.forwardRef(({id:t,title:e,children:n,bsPrefix:o,className:s,rootCloseEvent:r,menuRole:c,disabled:i,active:d,renderMenuOnMount:u,menuVariant:f,...m},N)=>{const x=v(void 0,"nav-item");return l.jsxs(Q,{ref:N,...m,className:p(s,x),children:[l.jsx(Q.Toggle,{id:t,eventKey:null,active:d,disabled:i,childBsPrefix:o,as:rt,children:e}),l.jsx(Q.Menu,{role:c,renderOnMount:u,rootCloseEvent:r,variant:f,children:n})]})});At.displayName="NavDropdown";const os=Object.assign(At,{Item:Q.Item,ItemText:Q.ItemText,Divider:Q.Divider,Header:Q.Header}),Mt=a.forwardRef(({bsPrefix:t,className:e,as:n="div",...o},s)=>{const r=v(t,"row"),c=Ze(),i=Pe(),d=`${r}-cols`,u=[];return c.forEach(f=>{const m=o[f];delete o[f];let N;m!=null&&typeof m=="object"?{cols:N}=m:N=m;const x=f!==i?`-${f}`:"";N!=null&&u.push(`${d}${x}-${N}`)}),l.jsx(n,{ref:s,...o,className:p(e,r,...u)})});Mt.displayName="Row";const as=Mt;function ta({as:t,bsPrefix:e,className:n,...o}){e=v(e,"col");const s=Ze(),r=Pe(),c=[],i=[];return s.forEach(d=>{const u=o[d];delete o[d];let f,m,N;typeof u=="object"&&u!=null?{span:f,offset:m,order:N}=u:f=u;const x=d!==r?`-${d}`:"";f&&c.push(f===!0?`${e}${x}`:`${e}${x}-${f}`),N!=null&&i.push(`order${x}-${N}`),m!=null&&i.push(`offset${x}-${m}`)}),[{...o,className:p(n,...c,...i)},{as:t,bsPrefix:e,spans:c}]}const Lt=a.forwardRef((t,e)=>{const[{className:n,...o},{as:s="div",bsPrefix:r,spans:c}]=ta(t);return l.jsx(s,{...o,ref:e,className:p(n,!c.length&&r)})});Lt.displayName="Col";const na=Lt,oa={type:S.string,tooltip:S.bool,as:S.elementType},De=a.forwardRef(({as:t="div",className:e,type:n="valid",tooltip:o=!1,...s},r)=>l.jsx(t,{...s,ref:r,className:p(e,`${n}-${o?"tooltip":"feedback"}`)}));De.displayName="Feedback";De.propTypes=oa;const Ht=De,aa=a.createContext({}),X=aa,_t=a.forwardRef(({id:t,bsPrefix:e,className:n,type:o="checkbox",isValid:s=!1,isInvalid:r=!1,as:c="input",...i},d)=>{const{controlId:u}=a.useContext(X);return e=v(e,"form-check-input"),l.jsx(c,{...i,ref:d,type:o,id:t||u,className:p(n,e,s&&"is-valid",r&&"is-invalid")})});_t.displayName="FormCheckInput";const ge=_t,Gt=a.forwardRef(({bsPrefix:t,className:e,htmlFor:n,...o},s)=>{const{controlId:r}=a.useContext(X);return t=v(t,"form-check-label"),l.jsx("label",{...o,ref:s,htmlFor:n||r,className:p(e,t)})});Gt.displayName="FormCheckLabel";const Ie=Gt;function Ye(t,e){let n=0;return a.Children.map(t,o=>a.isValidElement(o)?e(o,n++):o)}function sa(t,e){let n=0;a.Children.forEach(t,o=>{a.isValidElement(o)&&e(o,n++)})}function ra(t,e){return a.Children.toArray(t).some(n=>a.isValidElement(n)&&n.type===e)}const Kt=a.forwardRef(({id:t,bsPrefix:e,bsSwitchPrefix:n,inline:o=!1,reverse:s=!1,disabled:r=!1,isValid:c=!1,isInvalid:i=!1,feedbackTooltip:d=!1,feedback:u,feedbackType:f,className:m,style:N,title:x="",type:C="checkbox",label:w,children:h,as:R="input",...j},T)=>{e=v(e,"form-check"),n=v(n,"form-switch");const{controlId:O}=a.useContext(X),E=a.useMemo(()=>({controlId:t||O}),[O,t]),g=!h&&w!=null&&w!==!1||ra(h,Ie),$=l.jsx(ge,{...j,type:C==="switch"?"checkbox":C,ref:T,isValid:c,isInvalid:i,disabled:r,as:R});return l.jsx(X.Provider,{value:E,children:l.jsx("div",{style:N,className:p(m,g&&e,o&&`${e}-inline`,s&&`${e}-reverse`,C==="switch"&&n),children:h||l.jsxs(l.Fragment,{children:[$,g&&l.jsx(Ie,{title:x,children:w}),u&&l.jsx(Ht,{type:f,tooltip:d,children:u})]})})})});Kt.displayName="FormCheck";const me=Object.assign(Kt,{Input:ge,Label:Ie}),Vt=a.forwardRef(({bsPrefix:t,type:e,size:n,htmlSize:o,id:s,className:r,isValid:c=!1,isInvalid:i=!1,plaintext:d,readOnly:u,as:f="input",...m},N)=>{const{controlId:x}=a.useContext(X);return t=v(t,"form-control"),l.jsx(f,{...m,type:e,size:o,ref:N,readOnly:u,id:s||x,className:p(r,d?`${t}-plaintext`:t,n&&`${t}-${n}`,e==="color"&&`${t}-color`,c&&"is-valid",i&&"is-invalid")})});Vt.displayName="FormControl";const la=Object.assign(Vt,{Feedback:Ht}),Ut=a.forwardRef(({className:t,bsPrefix:e,as:n="div",...o},s)=>(e=v(e,"form-floating"),l.jsx(n,{ref:s,className:p(t,e),...o})));Ut.displayName="FormFloating";const ca=Ut,Wt=a.forwardRef(({controlId:t,as:e="div",...n},o)=>{const s=a.useMemo(()=>({controlId:t}),[t]);return l.jsx(X.Provider,{value:s,children:l.jsx(e,{...n,ref:o})})});Wt.displayName="FormGroup";const Xt=Wt,Yt=a.forwardRef(({as:t="label",bsPrefix:e,column:n=!1,visuallyHidden:o=!1,className:s,htmlFor:r,...c},i)=>{const{controlId:d}=a.useContext(X);e=v(e,"form-label");let u="col-form-label";typeof n=="string"&&(u=`${u} ${u}-${n}`);const f=p(s,e,o&&"visually-hidden",n&&u);return r=r||d,n?l.jsx(na,{ref:i,as:"label",className:f,htmlFor:r,...c}):l.jsx(t,{ref:i,className:f,htmlFor:r,...c})});Yt.displayName="FormLabel";const ia=Yt,qt=a.forwardRef(({bsPrefix:t,className:e,id:n,...o},s)=>{const{controlId:r}=a.useContext(X);return t=v(t,"form-range"),l.jsx("input",{...o,type:"range",ref:s,className:p(e,t),id:n||r})});qt.displayName="FormRange";const da=qt,zt=a.forwardRef(({bsPrefix:t,size:e,htmlSize:n,className:o,isValid:s=!1,isInvalid:r=!1,id:c,...i},d)=>{const{controlId:u}=a.useContext(X);return t=v(t,"form-select"),l.jsx("select",{...i,size:n,ref:d,className:p(o,t,e&&`${t}-${e}`,s&&"is-valid",r&&"is-invalid"),id:c||u})});zt.displayName="FormSelect";const ua=zt,Jt=a.forwardRef(({bsPrefix:t,className:e,as:n="small",muted:o,...s},r)=>(t=v(t,"form-text"),l.jsx(n,{...s,ref:r,className:p(e,t,o&&"text-muted")})));Jt.displayName="FormText";const fa=Jt,Qt=a.forwardRef((t,e)=>l.jsx(me,{...t,ref:e,type:"switch"}));Qt.displayName="Switch";const pa=Object.assign(Qt,{Input:me.Input,Label:me.Label}),Zt=a.forwardRef(({bsPrefix:t,className:e,children:n,controlId:o,label:s,...r},c)=>(t=v(t,"form-floating"),l.jsxs(Xt,{ref:c,className:p(e,t),controlId:o,...r,children:[n,l.jsx("label",{htmlFor:o,children:s})]})));Zt.displayName="FloatingLabel";const ma=Zt,va={_ref:S.any,validated:S.bool,as:S.elementType},Be=a.forwardRef(({className:t,validated:e,as:n="form",...o},s)=>l.jsx(n,{...o,ref:s,className:p(t,e&&"was-validated")}));Be.displayName="Form";Be.propTypes=va;const ss=Object.assign(Be,{Group:Xt,Control:la,Floating:ca,Check:me,Switch:pa,Label:ia,Text:fa,Range:da,Select:ua,FloatingLabel:ma}),Pt=a.forwardRef(({className:t,bsPrefix:e,as:n="div",...o},s)=>(e=v(e,"card-body"),l.jsx(n,{ref:s,className:p(t,e),...o})));Pt.displayName="CardBody";const en=Pt,tn=a.forwardRef(({className:t,bsPrefix:e,as:n="div",...o},s)=>(e=v(e,"card-footer"),l.jsx(n,{ref:s,className:p(t,e),...o})));tn.displayName="CardFooter";const ha=tn,nn=a.forwardRef(({bsPrefix:t,className:e,as:n="div",...o},s)=>{const r=v(t,"card-header"),c=a.useMemo(()=>({cardHeaderBsPrefix:r}),[r]);return l.jsx(ot.Provider,{value:c,children:l.jsx(n,{ref:s,...o,className:p(e,r)})})});nn.displayName="CardHeader";const Na=nn,on=a.forwardRef(({bsPrefix:t,className:e,variant:n,as:o="img",...s},r)=>{const c=v(t,"card-img");return l.jsx(o,{ref:r,className:p(n?`${c}-${n}`:c,e),...s})});on.displayName="CardImg";const xa=on,an=a.forwardRef(({className:t,bsPrefix:e,as:n="div",...o},s)=>(e=v(e,"card-img-overlay"),l.jsx(n,{ref:s,className:p(t,e),...o})));an.displayName="CardImgOverlay";const Ca=an,sn=a.forwardRef(({className:t,bsPrefix:e,as:n="a",...o},s)=>(e=v(e,"card-link"),l.jsx(n,{ref:s,className:p(t,e),...o})));sn.displayName="CardLink";const ga=sn,ya=Fe("h6"),rn=a.forwardRef(({className:t,bsPrefix:e,as:n=ya,...o},s)=>(e=v(e,"card-subtitle"),l.jsx(n,{ref:s,className:p(t,e),...o})));rn.displayName="CardSubtitle";const wa=rn,ln=a.forwardRef(({className:t,bsPrefix:e,as:n="p",...o},s)=>(e=v(e,"card-text"),l.jsx(n,{ref:s,className:p(t,e),...o})));ln.displayName="CardText";const $a=ln,Ra=Fe("h5"),cn=a.forwardRef(({className:t,bsPrefix:e,as:n=Ra,...o},s)=>(e=v(e,"card-title"),l.jsx(n,{ref:s,className:p(t,e),...o})));cn.displayName="CardTitle";const ja=cn,dn=a.forwardRef(({bsPrefix:t,className:e,bg:n,text:o,border:s,body:r=!1,children:c,as:i="div",...d},u)=>{const f=v(t,"card");return l.jsx(i,{ref:u,...d,className:p(e,f,n&&`bg-${n}`,o&&`text-${o}`,s&&`border-${s}`),children:r?l.jsx(en,{children:c}):c})});dn.displayName="Card";const rs=Object.assign(dn,{Img:xa,Title:ja,Subtitle:wa,Body:en,Link:ga,Text:$a,Header:Na,Footer:ha,ImgOverlay:Ca}),un=a.forwardRef(({className:t,bsPrefix:e,as:n="div",...o},s)=>(e=v(e,"carousel-caption"),l.jsx(n,{ref:s,className:p(t,e),...o})));un.displayName="CarouselCaption";const Ta=un,fn=a.forwardRef(({as:t="div",bsPrefix:e,className:n,...o},s)=>{const r=p(n,v(e,"carousel-item"));return l.jsx(t,{ref:s,...o,className:r})});fn.displayName="CarouselItem";const Ea=fn,Ia=40;function Oa(t){if(!t||!t.style||!t.parentNode||!t.parentNode.style)return!1;const e=getComputedStyle(t);return e.display!=="none"&&e.visibility!=="hidden"&&getComputedStyle(t.parentNode).display!=="none"}const pn=a.forwardRef(({defaultActiveIndex:t=0,...e},n)=>{const{as:o="div",bsPrefix:s,slide:r=!0,fade:c=!1,controls:i=!0,indicators:d=!0,indicatorLabels:u=[],activeIndex:f,onSelect:m,onSlide:N,onSlid:x,interval:C=5e3,keyboard:w=!0,onKeyDown:h,pause:R="hover",onMouseOver:j,onMouseOut:T,wrap:O=!0,touch:E=!0,onTouchStart:g,onTouchMove:$,onTouchEnd:k,prevIcon:G=l.jsx("span",{"aria-hidden":"true",className:"carousel-control-prev-icon"}),prevLabel:K="Previous",nextIcon:Y=l.jsx("span",{"aria-hidden":"true",className:"carousel-control-next-icon"}),nextLabel:V="Next",variant:D,className:A,children:F,...we}=re({defaultActiveIndex:t,...e},{activeIndex:"onSelect"}),M=v(s,"carousel"),L=Ne(),q=a.useRef(null),[ce,ie]=a.useState("next"),[$e,ee]=a.useState(!1),[U,B]=a.useState(!1),[b,Bn]=a.useState(f||0);a.useEffect(()=>{!U&&f!==b&&(q.current?ie(q.current):ie((f||0)>b?"next":"prev"),r&&B(!0),Bn(f||0))},[f,U,b,r]),a.useEffect(()=>{q.current&&(q.current=null)});let z=0,Le;sa(F,(y,I)=>{++z,I===f&&(Le=y.props.interval)});const He=lo(Le),H=a.useCallback(y=>{if(U)return;let I=b-1;if(I<0){if(!O)return;I=z-1}q.current="prev",m==null||m(I,y)},[U,b,m,O,z]),_=Z(y=>{if(U)return;let I=b+1;if(I>=z){if(!O)return;I=0}q.current="next",m==null||m(I,y)}),Re=a.useRef();a.useImperativeHandle(n,()=>({element:Re.current,prev:H,next:_}));const _e=Z(()=>{!document.hidden&&Oa(Re.current)&&(L?H():_())}),J=ce==="next"?"start":"end";co(()=>{r||(N==null||N(b,J),x==null||x(b,J))},[b]);const An=`${M}-item-${ce}`,Mn=`${M}-item-${J}`,Ln=a.useCallback(y=>{ke(y),N==null||N(b,J)},[N,b,J]),Hn=a.useCallback(()=>{B(!1),x==null||x(b,J)},[x,b,J]),_n=a.useCallback(y=>{if(w&&!/input|textarea/i.test(y.target.tagName))switch(y.key){case"ArrowLeft":y.preventDefault(),L?_(y):H(y);return;case"ArrowRight":y.preventDefault(),L?H(y):_(y);return}h==null||h(y)},[w,h,H,_,L]),Gn=a.useCallback(y=>{R==="hover"&&ee(!0),j==null||j(y)},[R,j]),Kn=a.useCallback(y=>{ee(!1),T==null||T(y)},[T]),Ge=a.useRef(0),de=a.useRef(0),Ke=Je(),Vn=a.useCallback(y=>{Ge.current=y.touches[0].clientX,de.current=0,R==="hover"&&ee(!0),g==null||g(y)},[R,g]),Un=a.useCallback(y=>{y.touches&&y.touches.length>1?de.current=0:de.current=y.touches[0].clientX-Ge.current,$==null||$(y)},[$]),Wn=a.useCallback(y=>{if(E){const I=de.current;Math.abs(I)>Ia&&(I>0?H(y):_(y))}R==="hover"&&Ke.set(()=>{ee(!1)},C||void 0),k==null||k(y)},[E,R,H,_,Ke,C,k]),Ve=C!=null&&!$e&&!U,je=a.useRef();a.useEffect(()=>{var y,I;if(!Ve)return;const W=L?H:_;return je.current=window.setInterval(document.visibilityState?_e:W,(y=(I=He.current)!=null?I:C)!=null?y:void 0),()=>{je.current!==null&&clearInterval(je.current)}},[Ve,H,_,He,C,_e,L]);const Ue=a.useMemo(()=>d&&Array.from({length:z},(y,I)=>W=>{m==null||m(I,W)}),[d,z,m]);return l.jsxs(o,{ref:Re,...we,onKeyDown:_n,onMouseOver:Gn,onMouseOut:Kn,onTouchStart:Vn,onTouchMove:Un,onTouchEnd:Wn,className:p(A,M,r&&"slide",c&&`${M}-fade`,D&&`${M}-${D}`),children:[d&&l.jsx("div",{className:`${M}-indicators`,children:Ye(F,(y,I)=>l.jsx("button",{type:"button","data-bs-target":"","aria-label":u!=null&&u.length?u[I]:`Slide ${I+1}`,className:I===b?"active":void 0,onClick:Ue?Ue[I]:void 0,"aria-current":I===b},I))}),l.jsx("div",{className:`${M}-inner`,children:Ye(F,(y,I)=>{const W=I===b;return r?l.jsx(Ce,{in:W,onEnter:W?Ln:void 0,onEntered:W?Hn:void 0,addEndListener:xe,children:(ae,Xn)=>a.cloneElement(y,{...Xn,className:p(y.props.className,W&&ae!=="entered"&&An,(ae==="entered"||ae==="exiting")&&"active",(ae==="entering"||ae==="exiting")&&Mn)})}):a.cloneElement(y,{className:p(y.props.className,W&&"active")})})}),i&&l.jsxs(l.Fragment,{children:[(O||f!==0)&&l.jsxs(fe,{className:`${M}-control-prev`,onClick:H,children:[G,K&&l.jsx("span",{className:"visually-hidden",children:K})]}),(O||f!==z-1)&&l.jsxs(fe,{className:`${M}-control-next`,onClick:_,children:[Y,V&&l.jsx("span",{className:"visually-hidden",children:V})]})]})]})});pn.displayName="Carousel";const ls=Object.assign(pn,{Caption:Ta,Item:Ea});S.string,S.bool,S.bool,S.bool,S.bool;const mn=a.forwardRef(({bsPrefix:t,className:e,fluid:n=!1,rounded:o=!1,roundedCircle:s=!1,thumbnail:r=!1,...c},i)=>(t=v(t,"img"),l.jsx("img",{ref:i,...c,className:p(e,n&&`${t}-fluid`,o&&"rounded",s&&"rounded-circle",r&&`${t}-thumbnail`)})));mn.displayName="Image";const cs=mn,vn=a.forwardRef(({className:t,bsPrefix:e,as:n="div",...o},s)=>(e=v(e,"popover-header"),l.jsx(n,{ref:s,className:p(t,e),...o})));vn.displayName="PopoverHeader";const ka=vn,hn=a.forwardRef(({className:t,bsPrefix:e,as:n="div",...o},s)=>(e=v(e,"popover-body"),l.jsx(n,{ref:s,className:p(t,e),...o})));hn.displayName="PopoverBody";const Nn=hn;function xn(t,e){let n=t;return t==="left"?n=e?"end":"start":t==="right"&&(n=e?"start":"end"),n}function Cn(t="absolute"){return{position:t,top:"0",left:"0",opacity:"0",pointerEvents:"none"}}const ba=a.forwardRef(({bsPrefix:t,placement:e="right",className:n,style:o,children:s,body:r,arrowProps:c,hasDoneInitialMeasure:i,popper:d,show:u,...f},m)=>{const N=v(t,"popover"),x=Ne(),[C]=(e==null?void 0:e.split("-"))||[],w=xn(C,x);let h=o;return u&&!i&&(h={...o,...Cn(d==null?void 0:d.strategy)}),l.jsxs("div",{ref:m,role:"tooltip",style:h,"x-placement":C,className:p(n,N,C&&`bs-popover-${w}`),...f,children:[l.jsx("div",{className:"popover-arrow",...c}),r?l.jsx(Nn,{children:s}):s]})}),Fa=Object.assign(ba,{Header:ka,Body:Nn,POPPER_OFFSET:[0,8]}),gn=a.forwardRef(({bsPrefix:t,placement:e="right",className:n,style:o,children:s,arrowProps:r,hasDoneInitialMeasure:c,popper:i,show:d,...u},f)=>{t=v(t,"tooltip");const m=Ne(),[N]=(e==null?void 0:e.split("-"))||[],x=xn(N,m);let C=o;return d&&!c&&(C={...o,...Cn(i==null?void 0:i.strategy)}),l.jsxs("div",{ref:f,style:C,role:"tooltip","x-placement":N,className:p(n,t,`bs-tooltip-${x}`),...u,children:[l.jsx("div",{className:"tooltip-arrow",...r}),l.jsx("div",{className:`${t}-inner`,children:s})]})});gn.displayName="Tooltip";const Sa=Object.assign(gn,{TOOLTIP_OFFSET:[0,6]});function Da(t){const e=a.useRef(null),n=v(void 0,"popover"),o=v(void 0,"tooltip"),s=a.useMemo(()=>({name:"offset",options:{offset:()=>{if(t)return t;if(e.current){if(We(e.current,n))return Fa.POPPER_OFFSET;if(We(e.current,o))return Sa.TOOLTIP_OFFSET}return[0,0]}}}),[t,n,o]);return[e,[s]]}function Ba(t,e){const{ref:n}=t,{ref:o}=e;t.ref=n.__wrapped||(n.__wrapped=s=>n(pe(s))),e.ref=o.__wrapped||(o.__wrapped=s=>o(pe(s)))}const yn=a.forwardRef(({children:t,transition:e=Ee,popperConfig:n={},rootClose:o=!1,placement:s="top",show:r=!1,...c},i)=>{const d=a.useRef({}),[u,f]=a.useState(null),[m,N]=Da(c.offset),x=le(i,m),C=e===!0?Ee:e||void 0,w=Z(h=>{f(h),n==null||n.onFirstUpdate==null||n.onFirstUpdate(h)});return ze(()=>{u&&c.target&&(d.current.scheduleUpdate==null||d.current.scheduleUpdate())},[u,c.target]),a.useEffect(()=>{r||f(null)},[r]),l.jsx(io,{...c,ref:x,popperConfig:{...n,modifiers:N.concat(n.modifiers||[]),onFirstUpdate:w},transition:C,rootClose:o,placement:s,show:r,children:(h,{arrowProps:R,popper:j,show:T})=>{var O,E;Ba(h,R);const g=j==null?void 0:j.placement,$=Object.assign(d.current,{state:j==null?void 0:j.state,scheduleUpdate:j==null?void 0:j.update,placement:g,outOfBoundaries:(j==null||(O=j.state)==null||(E=O.modifiersData.hide)==null?void 0:E.isReferenceHidden)||!1,strategy:n.strategy}),k=!!u;return typeof t=="function"?t({...h,placement:g,show:T,...!e&&T&&{className:"show"},popper:$,arrowProps:R,hasDoneInitialMeasure:k}):a.cloneElement(t,{...h,placement:g,arrowProps:R,popper:$,hasDoneInitialMeasure:k,className:p(t.props.className,!e&&T&&"show"),style:{...t.props.style,...h.style}})}})});yn.displayName="Overlay";const Aa=yn;function Ma(t){return t&&typeof t=="object"?t:{show:t,hide:t}}function qe(t,e,n){const[o]=e,s=o.currentTarget,r=o.relatedTarget||o.nativeEvent[n];(!r||r!==s)&&!ho(s,r)&&t(...e)}S.oneOf(["click","hover","focus"]);const La=({trigger:t=["hover","focus"],overlay:e,children:n,popperConfig:o={},show:s,defaultShow:r=!1,onToggle:c,delay:i,placement:d,flip:u=d&&d.indexOf("auto")!==-1,...f})=>{const m=a.useRef(null),N=le(m,n.ref),x=Je(),C=a.useRef(""),[w,h]=Yn(s,r,c),R=Ma(i),{onFocus:j,onBlur:T,onClick:O}=typeof n!="function"?a.Children.only(n).props:{},E=F=>{N(pe(F))},g=a.useCallback(()=>{if(x.clear(),C.current="show",!R.show){h(!0);return}x.set(()=>{C.current==="show"&&h(!0)},R.show)},[R.show,h,x]),$=a.useCallback(()=>{if(x.clear(),C.current="hide",!R.hide){h(!1);return}x.set(()=>{C.current==="hide"&&h(!1)},R.hide)},[R.hide,h,x]),k=a.useCallback((...F)=>{g(),j==null||j(...F)},[g,j]),G=a.useCallback((...F)=>{$(),T==null||T(...F)},[$,T]),K=a.useCallback((...F)=>{h(!w),O==null||O(...F)},[O,h,w]),Y=a.useCallback((...F)=>{qe(g,F,"fromElement")},[g]),V=a.useCallback((...F)=>{qe($,F,"toElement")},[$]),D=t==null?[]:[].concat(t),A={ref:E};return D.indexOf("click")!==-1&&(A.onClick=K),D.indexOf("focus")!==-1&&(A.onFocus=k,A.onBlur=G),D.indexOf("hover")!==-1&&(A.onMouseOver=Y,A.onMouseOut=V),l.jsxs(l.Fragment,{children:[typeof n=="function"?n(A):a.cloneElement(n,A),l.jsx(Aa,{...f,show:w,onHide:$,flip:u,placement:d,popperConfig:o,target:m.current,children:e})]})},is=La;function wn(t,e){return Array.isArray(t)?t.includes(e):t===e}const $n=a.createContext({});$n.displayName="AccordionContext";const ye=$n,Rn=a.forwardRef(({as:t="div",bsPrefix:e,className:n,children:o,eventKey:s,...r},c)=>{const{activeEventKey:i}=a.useContext(ye);return e=v(e,"accordion-collapse"),l.jsx(it,{ref:c,in:wn(i,s),...r,className:p(n,e),children:l.jsx(t,{children:a.Children.only(o)})})});Rn.displayName="AccordionCollapse";const jn=Rn,Tn=a.createContext({eventKey:""});Tn.displayName="AccordionItemContext";const Ae=Tn,En=a.forwardRef(({as:t="div",bsPrefix:e,className:n,onEnter:o,onEntering:s,onEntered:r,onExit:c,onExiting:i,onExited:d,...u},f)=>{e=v(e,"accordion-body");const{eventKey:m}=a.useContext(Ae);return l.jsx(jn,{eventKey:m,onEnter:o,onEntering:s,onEntered:r,onExit:c,onExiting:i,onExited:d,children:l.jsx(t,{ref:f,...u,className:p(n,e)})})});En.displayName="AccordionBody";const Ha=En;function _a(t,e){const{activeEventKey:n,onSelect:o,alwaysOpen:s}=a.useContext(ye);return r=>{let c=t===n?null:t;s&&(Array.isArray(n)?n.includes(t)?c=n.filter(i=>i!==t):c=[...n,t]:c=[t]),o==null||o(c,r),e==null||e(r)}}const In=a.forwardRef(({as:t="button",bsPrefix:e,className:n,onClick:o,...s},r)=>{e=v(e,"accordion-button");const{eventKey:c}=a.useContext(Ae),i=_a(c,o),{activeEventKey:d}=a.useContext(ye);return t==="button"&&(s.type="button"),l.jsx(t,{ref:r,onClick:i,...s,"aria-expanded":Array.isArray(d)?d.includes(c):c===d,className:p(n,e,!wn(d,c)&&"collapsed")})});In.displayName="AccordionButton";const On=In,kn=a.forwardRef(({as:t="h2",bsPrefix:e,className:n,children:o,onClick:s,...r},c)=>(e=v(e,"accordion-header"),l.jsx(t,{ref:c,...r,className:p(n,e),children:l.jsx(On,{onClick:s,children:o})})));kn.displayName="AccordionHeader";const Ga=kn,bn=a.forwardRef(({as:t="div",bsPrefix:e,className:n,eventKey:o,...s},r)=>{e=v(e,"accordion-item");const c=a.useMemo(()=>({eventKey:o}),[o]);return l.jsx(Ae.Provider,{value:c,children:l.jsx(t,{ref:r,...s,className:p(n,e)})})});bn.displayName="AccordionItem";const Ka=bn,Fn=a.forwardRef((t,e)=>{const{as:n="div",activeKey:o,bsPrefix:s,className:r,onSelect:c,flush:i,alwaysOpen:d,...u}=re(t,{activeKey:"onSelect"}),f=v(s,"accordion"),m=a.useMemo(()=>({activeEventKey:o,onSelect:c,alwaysOpen:d}),[o,c,d]);return l.jsx(ye.Provider,{value:m,children:l.jsx(n,{ref:e,...u,className:p(r,f,i&&`${f}-flush`)})})});Fn.displayName="Accordion";const ds=Object.assign(Fn,{Button:On,Collapse:jn,Item:Ka,Header:Ga,Body:Ha}),Sn=a.forwardRef(({className:t,bsPrefix:e,as:n="span",...o},s)=>(e=v(e,"input-group-text"),l.jsx(n,{ref:s,className:p(t,e),...o})));Sn.displayName="InputGroupText";const Me=Sn,Va=t=>l.jsx(Me,{children:l.jsx(ge,{type:"checkbox",...t})}),Ua=t=>l.jsx(Me,{children:l.jsx(ge,{type:"radio",...t})}),Dn=a.forwardRef(({bsPrefix:t,size:e,hasValidation:n,className:o,as:s="div",...r},c)=>{t=v(t,"input-group");const i=a.useMemo(()=>({}),[]);return l.jsx(Se.Provider,{value:i,children:l.jsx(s,{ref:c,...r,className:p(o,t,e&&`${t}-${e}`,n&&"has-validation")})})});Dn.displayName="InputGroup";const us=Object.assign(Dn,{Text:Me,Radio:Ua,Checkbox:Va});export{ds as A,Po as B,na as C,ss as F,cs as I,ns as N,is as O,Fa as P,as as R,es as a,ts as b,os as c,rs as d,ls as e,us as f,ma as g};
