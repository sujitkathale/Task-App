(this.webpackJsonptasks=this.webpackJsonptasks||[]).push([[11],{123:function(e,a,t){"use strict";var c=t(73),s=t(0),n=t(75),r=t.n(n),l=t(1);a.a=function(e){return s.forwardRef((function(a,t){return Object(l.jsx)("div",Object(c.a)(Object(c.a)({},a),{},{ref:t,className:r()(a.className,e)}))}))}},124:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return x}));var c=t(77),s=t(0),n=t(18),r=t(310),l=t(87),i=t(180),j=t(15),b=(t(6),t(91)),o=t(3),d=(t(79),t(42),t(1));RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);function x(){var e=Object(s.useState)([]),a=Object(c.a)(e,2),t=a[0],x=a[1],O=Object(s.useState)(""),m=Object(c.a)(O,2),u=(m[0],m[1]),h=Object(s.useState)(""),p=Object(c.a)(h,2),f=(p[0],p[1],Object(s.useState)("")),v=Object(c.a)(f,2),g=(v[0],v[1]),N=Object(s.useState)(""),y=Object(c.a)(N,2),S=(y[0],y[1]),k=Object(o.f)(),C=Object(s.useState)(""),w=Object(c.a)(C,2),P=(w[0],w[1]),E=Object(s.useState)(""),I=Object(c.a)(E,2);I[0],I[1];Object(s.useEffect)((function(){if(void 0!=localStorage.getItem("_token")){var e=localStorage.getItem("_token"),a=Object(b.a)(e);console.log(a),Object(j.m)(localStorage.getItem("user")).then((function(e){if(e.data.user){console.log(e.data.user);var a=e.data.user;x(a),S(a.email),u(a.name),g(a.mobile),T()}}))}else k.push("/")}),[]);var T=function(){var e=localStorage.getItem("user");Object(j.k)(e).then((function(e){0==e.data.err?P(e.data.data.profileImg):P("images/pro.jpg")}))};return Object(d.jsx)("div",{children:Object(d.jsxs)("div",{className:"container-fluid",children:[Object(d.jsx)("br",{}),Object(d.jsx)(r.a,{variant:"secondary",children:Object(d.jsx)(n.b,{to:"/Addtask",className:"nav-link text-light text-uppercase",children:"Back"})}),Object(d.jsxs)("div",{className:" text-left  mt-5",children:[Object(d.jsxs)("h3",{className:"text-danger text-left mt-1",children:[t.name,"\xa0",t.lname]}),Object(d.jsx)("br",{}),Object(d.jsxs)("div",{children:[Object(d.jsx)(r.a,{variant:"secondary",children:Object(d.jsxs)(n.b,{className:"btn sha text-light text-center",style:{width:"200px"},to:"/Profile",children:[Object(d.jsx)(i.a,{size:"30px"}),"Profile"]})}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)(r.a,{variant:"secondary",children:Object(d.jsxs)(n.b,{className:"btn text-light sha text-center",style:{width:"200px"},to:"/ChangePasssword",children:[Object(d.jsx)(l.a,{size:"30px"}),"ChangePasssword"]})}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{})]})]})]})})}},177:function(e,a,t){"use strict";var c=t(73),s=t(74),n=t(75),r=t.n(n),l=t(0),i=t(76),j=t(1),b=["bsPrefix","className","as"],o=["xxl","xl","lg","md","sm","xs"],d=l.forwardRef((function(e,a){var t=e.bsPrefix,n=e.className,l=e.as,d=void 0===l?"div":l,x=Object(s.a)(e,b),O=Object(i.a)(t,"row"),m="".concat(O,"-cols"),u=[];return o.forEach((function(e){var a,t=x[e];delete x[e],a=null!=t&&"object"===typeof t?t.cols:t;var c="xs"!==e?"-".concat(e):"";null!=a&&u.push("".concat(m).concat(c,"-").concat(a))})),Object(j.jsx)(d,Object(c.a)(Object(c.a)({ref:a},x),{},{className:r.a.apply(void 0,[n,O].concat(u))}))}));d.displayName="Row",a.a=d},309:function(e,a,t){"use strict";var c=t(73),s=t(74),n=t(75),r=t.n(n),l=t(0),i=t(76),j=t(97),b=t(123),o=t(1),d=["bsPrefix","className","variant","as"],x=l.forwardRef((function(e,a){var t=e.bsPrefix,n=e.className,l=e.variant,j=e.as,b=void 0===j?"img":j,x=Object(s.a)(e,d),O=Object(i.a)(t,"card-img");return Object(o.jsx)(b,Object(c.a)({ref:a,className:r()(l?"".concat(O,"-").concat(l):O,n)},x))}));x.displayName="CardImg";var O=x,m=l.createContext(null);m.displayName="CardHeaderContext";var u=m,h=["bsPrefix","className","as"],p=l.forwardRef((function(e,a){var t=e.bsPrefix,n=e.className,j=e.as,b=void 0===j?"div":j,d=Object(s.a)(e,h),x=Object(i.a)(t,"card-header"),O=Object(l.useMemo)((function(){return{cardHeaderBsPrefix:x}}),[x]);return Object(o.jsx)(u.Provider,{value:O,children:Object(o.jsx)(b,Object(c.a)(Object(c.a)({ref:a},d),{},{className:r()(n,x)}))})}));p.displayName="CardHeader";var f=p,v=["bsPrefix","className","bg","text","border","body","children","as"],g=Object(b.a)("h5"),N=Object(b.a)("h6"),y=Object(j.a)("card-body"),S=Object(j.a)("card-title",{Component:g}),k=Object(j.a)("card-subtitle",{Component:N}),C=Object(j.a)("card-link",{Component:"a"}),w=Object(j.a)("card-text",{Component:"p"}),P=Object(j.a)("card-footer"),E=Object(j.a)("card-img-overlay"),I=l.forwardRef((function(e,a){var t=e.bsPrefix,n=e.className,l=e.bg,j=e.text,b=e.border,d=e.body,x=e.children,O=e.as,m=void 0===O?"div":O,u=Object(s.a)(e,v),h=Object(i.a)(t,"card");return Object(o.jsx)(m,Object(c.a)(Object(c.a)({ref:a},u),{},{className:r()(n,h,l&&"bg-".concat(l),j&&"text-".concat(j),b&&"border-".concat(b)),children:d?Object(o.jsx)(y,{children:x}):x}))}));I.displayName="Card",I.defaultProps={body:!1};a.a=Object.assign(I,{Img:O,Title:S,Subtitle:k,Body:y,Link:C,Text:w,Header:f,Footer:P,ImgOverlay:E})},315:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return u}));var c=t(77),s=t(0),n=t(309),r=t(310),l=t(321),i=t(177),j=t(183),b=t(83),o=(t(84),t(124)),d=t(15),x=(t(42),t(79)),O=t(1),m=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);function u(){var e=Object(s.useState)([]),a=Object(c.a)(e,2),t=a[0],u=a[1],h=Object(s.useState)(!1),p=Object(c.a)(h,2),f=p[0],v=p[1],g=Object(s.useState)(""),N=Object(c.a)(g,2),y=(N[0],N[1],Object(s.useState)("")),S=Object(c.a)(y,2),k=S[0],C=S[1],w=Object(s.useState)(""),P=Object(c.a)(w,2),E=P[0],I=P[1],T=Object(s.useState)(""),L=Object(c.a)(T,2),R=L[0],z=L[1],G=Object(s.useState)(""),A=Object(c.a)(G,2),D=A[0],M=A[1];Object(s.useEffect)((function(){Object(d.m)(localStorage.getItem("user")).then((function(e){if(e.data.user){console.log(e.data.user);var a=e.data.user;u(a),M(a.email),C(a.name),I(a.lname),z(a.mobile)}}))}),[]);var _=function(e){var a={name:k,lname:E,email:D,mobile:R};console.log(a),Object(d.p)(e,a).then((function(e){e.data.err?function(e){b.b.error(e,{position:b.b.POSITION.TOP_CENTER})}(e.data.err):function(e){b.b.success(e,{position:b.b.POSITION.TOP_CENTER})}(e.data.msg)}))};return Object(O.jsxs)("div",{children:[" ",Object(O.jsx)(x.a,{}),Object(O.jsxs)("div",{className:"container-fluid card4",children:[Object(O.jsx)("h3",{className:"text-center display-6",children:"My Account"}),Object(O.jsx)("hr",{}),Object(O.jsxs)("div",{className:"row  ",children:[Object(O.jsx)("div",{className:"col-lg-6 col-md-7 col-sm-12",children:Object(O.jsx)(o.default,{})}),Object(O.jsxs)("div",{className:"col-lg-6 col-md-7 col-sm-12",children:[!f&&Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)("div",{className:"card1",children:[Object(O.jsx)(n.a.Title,{style:{fontSize:"32px"},children:"Profile"}),Object(O.jsx)("hr",{}),Object(O.jsxs)(n.a.Body,{children:[Object(O.jsxs)(n.a.Text,{style:{fontSize:"20px"},children:[Object(O.jsx)("b",{children:"FirstName:"}),"\xa0 ",Object(O.jsxs)("span",{children:[t.name," "]})]}),Object(O.jsxs)(n.a.Text,{style:{fontSize:"20px"},children:[Object(O.jsx)("b",{children:"LastName:"}),"\xa0",Object(O.jsxs)("span",{children:[" ",t.lname," "]})," "]}),Object(O.jsxs)(n.a.Text,{style:{fontSize:"20px"},children:[Object(O.jsx)("b",{children:"Email:"}),"\xa0",Object(O.jsxs)("span",{children:[" ",t.email]})]}),Object(O.jsxs)(n.a.Text,{style:{fontSize:"20px"},children:[Object(O.jsx)("b",{children:"Gender:"}),"\xa0",Object(O.jsxs)("span",{children:[" ",t.gender]})]}),Object(O.jsxs)(n.a.Text,{style:{fontSize:"20px"},children:[Object(O.jsx)("b",{children:"Mobile:"}),"\xa0",Object(O.jsxs)("span",{children:[" ",t.mobile]})]}),Object(O.jsx)("hr",{}),Object(O.jsx)(r.a,{variant:"secondary",onClick:function(){return v(!0)},style:{width:"150px"},children:"Edit profile"})]})]})}),f&&Object(O.jsx)("div",{className:"m-1",children:Object(O.jsxs)("div",{className:"card1",children:[Object(O.jsx)("h2",{className:"text-center pt-3 p-3",children:"Update Profile "}),Object(O.jsxs)(l.a,{children:[Object(O.jsxs)(l.a.Group,{as:i.a,className:"mb-3",children:[Object(O.jsx)(l.a.Label,{column:!0,sm:"3",children:Object(O.jsx)("b",{children:"First Name"})}),Object(O.jsxs)(j.a,{sm:"8",children:[Object(O.jsx)(l.a.Control,{type:"text",placeholder:"Enter Name",name:"name",defaultValue:t.name,onChange:function(e){C(e.target.value)}}),""!=k&&k.length<4&&Object(O.jsx)("span",{className:"text-danger",children:"Enter Name correctly"})]})]}),Object(O.jsxs)(l.a.Group,{as:i.a,className:"mb-3",children:[Object(O.jsx)(l.a.Label,{column:!0,sm:"3",children:Object(O.jsx)("b",{children:"Last Name"})}),Object(O.jsxs)(j.a,{sm:"8",children:[Object(O.jsx)(l.a.Control,{type:"text",placeholder:"Enter Name",name:"lname",defaultValue:t.lname,onChange:function(e){I(e.target.value)}}),""!=E&&E.length<4&&Object(O.jsx)("span",{className:"text-danger",children:"Enter Name correctly"})]})]}),Object(O.jsxs)(l.a.Group,{as:i.a,className:"mb-3",children:[Object(O.jsx)(l.a.Label,{column:!0,sm:"3",children:Object(O.jsx)("b",{children:"Email"})}),Object(O.jsxs)(j.a,{sm:"8",children:[Object(O.jsx)(l.a.Control,{type:"text",placeholder:"Enter Email",name:"email",defaultValue:t.email,readOnly:!0}),""!=D&&!m.test(D)&&Object(O.jsx)("span",{className:"text-danger",children:"Enter email correctly"})]})]}),Object(O.jsxs)(l.a.Group,{as:i.a,className:"mb-3",children:[Object(O.jsx)(l.a.Label,{column:!0,sm:"3",children:Object(O.jsx)("b",{children:" Mobile"})}),Object(O.jsxs)(j.a,{sm:"8",children:[Object(O.jsx)(l.a.Control,{type:"text",placeholder:"Enter mobile number",name:"mobile",defaultValue:t.mobile,onChange:function(e){z(e.target.value)}}),""!=R&&R.length<10&&Object(O.jsx)("span",{className:"text-danger",children:"Enter mobile correctly"})]})]}),Object(O.jsx)(r.a,{variant:"info",onClick:function(){return _(t._id)},className:"mt-3",children:"Update"}),Object(O.jsx)(r.a,{variant:"danger",onClick:function(){return v(!1)},className:"mt-3 ml-3",children:"Close"})]})]})})]})]})]})]})}b.b.configure()},79:function(e,a,t){"use strict";t.d(a,"a",(function(){return d}));var c=t(77),s=t(0),n=t(3),r=t(18),l=t(87),i=t(94),j=t(95),b=(t(82),t(1)),o=function(){var e,a="clicked",t=document.body,c="light",s="dark";localStorage&&(e=localStorage.getItem("theme")),e===c||e===s?t.classList.add(e):t.classList.add(c);return Object(b.jsx)("button",{className:"dark"===e?a:"",id:"darkMode",onClick:function(n){return function(n){e===s?(t.classList.replace(s,c),n.target.classList.remove(a),localStorage.setItem("theme","light"),e=c):(t.classList.replace(c,s),n.target.classList.add(a),localStorage.setItem("theme","dark"),e=s)}(n)}})};function d(){var e=Object(n.f)(),a=Object(s.useState)(1),t=Object(c.a)(a,2),d=(t[0],t[1]);return Object(b.jsx)("div",{children:Object(b.jsx)("nav",{className:"navbar navbar-expand-lg cardnav",children:Object(b.jsxs)("div",{className:"container-fluid",children:[Object(b.jsx)("a",{className:"navbar-brand",href:"#",children:Object(b.jsx)("h3",{children:Object(b.jsx)("span",{className:"text-danger fw-bold",children:"TASK"})})}),Object(b.jsxs)("button",{className:"navbar-toggler",type:"button btn-dark","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:[Object(b.jsx)(l.b,{}),Object(b.jsx)("span",{className:"navbar-toggler-icon"})]}),Object(b.jsx)("div",{className:"collapse navbar-collapse ",id:"navbarSupportedContent",children:Object(b.jsxs)("ul",{className:"navbar-nav  mb-2 mb-lg-0 mx-auto",style:{marginTop:"10px"},children:[Object(b.jsx)("li",{class:"nav-item",children:Object(b.jsx)("a",{className:"nav-link active","aria-current":"page",children:Object(b.jsx)(r.b,{to:"/Dash",className:"nav-link text-uppercase",children:"Dashboard"})})}),Object(b.jsx)("li",{class:"nav-item",children:Object(b.jsx)("a",{className:"nav-link active","aria-current":"page",children:Object(b.jsx)(r.b,{to:"/Addtask",className:"nav-link text-uppercase",children:"Add Task"})})}),Object(b.jsx)("li",{class:"nav-item",children:Object(b.jsx)("a",{className:"nav-link active","aria-current":"page",children:Object(b.jsx)(r.b,{to:"/contact",className:"nav-link text-uppercase",children:"Contact Us"})})}),Object(b.jsxs)("li",{className:"nav-item dropdown",style:{width:"100px"},children:[Object(b.jsx)("a",{className:"nav-link dropdown-toggle",href:"#",id:"navbarDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false",children:Object(b.jsx)(i.a,{size:"25px",style:{marginTop:"10px"}})}),Object(b.jsxs)("ul",{className:"dropdown-menu  mx-auto","aria-labelledby":"navbarDropdown",children:[void 0==localStorage.getItem("user")?Object(b.jsxs)("li",{children:[" ",Object(b.jsx)("a",{className:"dropdown-item",children:Object(b.jsx)(r.b,{to:"/Reg",className:"nav-link text-dark text-uppercase",children:"Register"})})]}):" ",void 0==localStorage.getItem("user")?Object(b.jsx)("li",{children:Object(b.jsx)("a",{className:"dropdown-item",children:Object(b.jsx)(r.b,{to:"/",className:"nav-link text-dark text-uppercase",children:"Login"})})}):" ",localStorage.getItem("user")?Object(b.jsx)("li",{className:"dropdown-item",children:Object(b.jsx)("a",{className:"nav-link text-dark",onClick:function(a){a.preventDefault(),localStorage.clear(),e.push("/"),d(0)},children:"LOGOUT"})}):" ",localStorage.getItem("user")?Object(b.jsx)("li",{className:"dropdown-item",children:Object(b.jsx)("a",{className:"nav-link",children:Object(b.jsxs)(r.b,{to:"/Profile",className:"nav-link text-dark ",children:[Object(b.jsx)(j.a,{size:"25px",className:"text-info"}),"\xa0Profile"]})})}):" "]})]}),Object(b.jsx)(o,{})]})})]})})})}},82:function(e,a,t){}}]);
//# sourceMappingURL=11.bfeb561e.chunk.js.map