(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports={sidebar:"Sidebar_sidebar__2WupE",nav:"Sidebar_nav__i8Lo5",item:"Sidebar_item__3zPF1",active:"Sidebar_active__37KeR",friends:"Sidebar_friends__18f4t"}},123:function(e,t,n){"use strict";n.d(t,"b",function(){return i});var a=n(40),r=n(8),o={dialogs:[{id:1,name:"Alex"},{id:2,name:"Jon"},{id:3,name:"Steve"}],messages:[{id:1,message:"Hi"},{id:2,message:"How are you?"},{id:3,message:"How was your day today?"}]},i=function(e){return{type:"messages/SEND-MESSAGE",newMessageBody:e}};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"messages/SEND-MESSAGE":var n=t.newMessageBody;return Object(r.a)({},e,{messages:[].concat(Object(a.a)(e.messages),[{id:7,message:n}])});default:return e}}},131:function(e,t,n){e.exports={footer:"Footer_footer__1w0lV"}},134:function(e,t,n){e.exports=n.p+"static/media/user.aa960f01.png"},135:function(e,t,n){e.exports=n.p+"static/media/loading.630c3d93.gif"},162:function(e,t,n){e.exports=n(292)},167:function(e,t,n){},191:function(e,t,n){},192:function(e,t,n){},21:function(e,t,n){"use strict";n.d(t,"c",function(){return o}),n.d(t,"b",function(){return i}),n.d(t,"a",function(){return s});var a=n(129),r=a.create({baseURL:"https://social-network.samuraijs.com/api/1.0/",withCredentials:!0,headers:{"API-KEY":"a961e904-1f8c-4fef-bfed-e41e73517e06"}}),o={getUsers:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return r.get("users?page=".concat(e,"&count=").concat(t)).then(function(e){return e.data})},unfollow:function(e){return r.delete("follow/".concat(e)).then(function(e){return e.data})},follow:function(e){return r.post("follow/".concat(e)).then(function(e){return e.data})},getProfile:function(e){return console.warn("Obsolete method. Please use profileAPI object."),i.getProfile(e)}},i={getProfile:function(e){return r.get("profile/".concat(e)).then(function(e){return e.data})},getStatus:function(e){return r.get("profile/status/".concat(e)).then(function(e){return e.data})},updateStatus:function(e){return r.put("profile/status",{status:e})}},s={autentificate:function(){return r.get("auth/me")},login:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r.post("auth/login",{email:e,password:t,rememberMe:n}).then(function(e){return e.data})},logout:function(){return r.delete("auth/login").then(function(e){return e.data})}}},291:function(e,t,n){},292:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(64),i=n.n(o);n(167),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s=n(33),u=n(34),c=n(36),l=n(35),f=n(37),m=n(70),p=n.n(m),d=n(13),g=function(e){return r.a.createElement("header",{className:p.a.header},r.a.createElement("img",{src:"https://3.img-dpreview.com/files/p/E~TS940x788~articles/shared/apple_sq.png",alt:"Image"}),r.a.createElement("div",{className:p.a.loginBlock},e.isAuth?r.a.createElement("div",null,e.login," - ",r.a.createElement("button",{className:p.a.btn_logout,onClick:e.logout},"Log Out")):r.a.createElement(d.b,{to:"/login"},"Login")))},E=n(9),h=n.n(E),b=n(20),v=n(8),_=n(21),w=n(54),O={userId:null,email:null,login:null,isAuth:!1,isFetching:!1},S=function(e,t,n,a){return{type:"auth/SET_USER_DATA",payload:{userId:e,email:t,login:n,isAuth:a}}},P=function(){return function(){var e=Object(b.a)(h.a.mark(function e(t){var n,a,r,o,i;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.a.autentificate();case 2:0===(n=e.sent).data.resultCode&&(a=n.data.data,r=a.id,o=a.login,i=a.email,t(S(r,i,o,!0)));case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"auth/SET_USER_DATA":return Object(v.a)({},e,t.payload);default:return e}},y=n(12),C=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(g,this.props)}}]),t}(r.a.Component),I=Object(y.b)(function(e){return{isAuth:e.auth.isAuth,login:e.auth.login}},{logout:function(){return function(){var e=Object(b.a)(h.a.mark(function e(t){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.a.logout();case 2:0===e.sent.resultCode&&t(S(null,null,null,!1));case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()}})(C),N=n(131),x=n.n(N),T=function(){return r.a.createElement("footer",{className:x.a.footer},r.a.createElement("p",null,"Footer"))},k=n(10),L=n.n(k),U=(n(191),function(e){return r.a.createElement("li",null,r.a.createElement("figure",null,r.a.createElement("img",{src:e.friendInfo.img,alt:"Img"})),r.a.createElement("p",null,e.friendInfo.name))}),A=function(e){return r.a.createElement("div",{className:L.a.sidebar},r.a.createElement("ul",{className:L.a.nav},r.a.createElement("li",{className:L.a.item},r.a.createElement(d.b,{exact:!0,to:"/profile",activeClassName:L.a.active},"Profile")),r.a.createElement("li",{className:L.a.item},r.a.createElement(d.b,{to:"/dialogs",activeClassName:L.a.active},"Messages")),r.a.createElement("li",{className:L.a.item},r.a.createElement(d.b,{to:"/news",activeClassName:L.a.active},"News")),r.a.createElement("li",{className:L.a.item},r.a.createElement(d.b,{to:"/music",activeClassName:L.a.active},"Music")),r.a.createElement("li",{className:L.a.item},r.a.createElement(d.b,{to:"/settings",activeClassName:L.a.active},"Settings")),r.a.createElement("li",{className:L.a.item},r.a.createElement(d.b,{to:"/users",activeClassName:L.a.active},"Users"))),r.a.createElement("ul",{className:L.a.friends},e.friends))},F=Object(y.b)(function(e){return{friends:e.sidebar.friends.map(function(e){return r.a.createElement(U,{key:e.id,friendInfo:e})})}})(A),z=function(){return r.a.createElement("div",null,"News")},R=function(){return r.a.createElement("div",null,"Music")},G=function(){return r.a.createElement("div",null,"Settings")},D=(n(192),function(){return r.a.createElement("div",null,"Not Found")}),M=n(124),H=n(125),W=n(65),B=n(75),q=n(29),V=n(45),Z=n.n(V),J=n(51),K=n.n(J),Q=Object(H.a)({form:"login"})(function(e){var t=e.handleSubmit,n=e.error;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",{className:Z.a.login_field},r.a.createElement(M.a,{placeholder:"Email",name:"email",component:W.a,validate:[B.b]})),r.a.createElement("div",{className:Z.a.login_field},r.a.createElement(M.a,{type:"password",placeholder:"Password",name:"password",component:W.a,valida:!0,te:[B.b]})),r.a.createElement("label",{className:Z.a.agreement},r.a.createElement(M.a,{type:"checkbox",name:"rememberMe",component:W.a})," remember me"),n&&r.a.createElement("div",{className:K.a.formSummaryError},n),r.a.createElement("div",null,r.a.createElement("button",{className:"btn "+Z.a.btn_login},"Login")))}),X=Object(y.b)(function(e){return{isAuth:e.auth.isAuth}},{login:function(e,t,n){return function(){var a=Object(b.a)(h.a.mark(function a(r){var o,i;return h.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,_.a.login(e,t,n);case 2:0===(o=a.sent).resultCode?r(P()):(i=o.messages.length>0?o.messages[0]:"Login or email is invalid",r(Object(w.a)("login",{_error:i})));case 4:case"end":return a.stop()}},a)}));return function(e){return a.apply(this,arguments)}}()}})(function(e){return e.isAuth?r.a.createElement(q.a,{to:"/profile"}):r.a.createElement("div",{className:Z.a.wrapper},r.a.createElement("h1",null,"Login"),r.a.createElement(Q,{onSubmit:function(t){var n=t.email,a=t.password,r=t.rememberMe;e.login(n,a,r)}}))}),Y=n(7),$=n(40),ee=function(e,t,n,a){return e.map(function(e){return e[n]===t?Object(v.a)({},e,a):e})},te={users:[],pageSize:10,totalUsersCount:0,currentPage:1,isFetching:!1,followingInProgress:[]},ne=function(e){return{type:"users/FOLLOW",userId:e}},ae=function(e){return{type:"users/UNFOLLOW",userId:e}},re=function(e){return{type:"users/SET_CURRENT_PAGE",currentPage:e}},oe=function(e){return{type:"users/TOGGLE_IS_FETCHING",isFetching:e}},ie=function(e,t){return{type:"users/TOGGLE_IS_FOLLOWING_PROGRESS",isFetching:e,userId:t}},se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"users/FOLLOW":return Object(v.a)({},e,{users:ee(e.users,t.userId,"id",{followed:!0})});case"users/UNFOLLOW":return Object(v.a)({},e,{users:ee(e.users,t.userId,"id",{followed:!1})});case"users/SET_USERS":return Object(v.a)({},e,{users:t.users});case"users/SET_CURRENT_PAGE":return Object(v.a)({},e,{currentPage:t.currentPage});case"users/SET_TOTAL_COUNT":return Object(v.a)({},e,{totalUsersCount:t.totalCount});case"users/TOGGLE_IS_FETCHING":return Object(v.a)({},e,{isFetching:t.isFetching});case"users/TOGGLE_IS_FOLLOWING_PROGRESS":return Object(v.a)({},e,{followingInProgress:t.isFetching?[].concat(Object($.a)(e.followingInProgress),[t.userId]):e.followingInProgress.filter(function(e){return e!=t.userId})});default:return e}},ue=n(133),ce=Object(ue.a)(function(e){return e.usersPage.users},function(e){return e.filter(function(e){return!0})}),le=function(e){return e.usersPage.pageSize},fe=function(e){return e.usersPage.totalUsersCount},me=function(e){return e.usersPage.currentPage},pe=function(e){return e.usersPage.isFetching},de=function(e){return e.usersPage.followingInProgress},ge=n(44),Ee=n.n(ge),he=n(126),be=n(94),ve=n.n(be),_e=function(e){for(var t=e.totalItemsCount,n=e.pageSize,o=e.currentPage,i=e.onPageChanged,s=e.portionSize,u=void 0===s?10:s,c=Object(a.useState)(1),l=Object(he.a)(c,2),f=l[0],m=l[1],p=Math.ceil(t/n),d=[],g=1;g<=p;g++)d.push(g);var E=Math.ceil(p/u),h=(f-1)*u+1,b=f*u;return r.a.createElement("div",{className:ve.a.pagination},f>1&&r.a.createElement("button",{onClick:function(){m(f-1)}},"Prev"),d.filter(function(e){return e>=h&&e<=b}).map(function(e){return r.a.createElement("span",{key:e,className:o===e&&ve.a.selectedPage,onClick:function(t){i(e)}},e)}),E>f&&r.a.createElement("button",{onClick:function(){m(f+1)}},"Next"))},we=n(134),Oe=n.n(we),Se=function(e){var t=e.user,n=e.followingInProgress,a=e.unfollow,o=e.follow;return r.a.createElement("div",{className:Ee.a.user},r.a.createElement("span",null,r.a.createElement("div",null,r.a.createElement(d.b,{to:"/profile/"+t.id},r.a.createElement("img",{src:null!=t.photos.small?t.photos.small:Oe.a,className:Ee.a.userPhoto,alt:"Image"}))),r.a.createElement("div",null,t.followed?r.a.createElement("button",{disabled:n.some(function(e){return e===t.id}),onClick:function(){a(t.id)}},"Unfollow"):r.a.createElement("button",{disabled:n.some(function(e){return e===t.id}),onClick:function(){o(t.id)}},"Follow"))),r.a.createElement("span",null,r.a.createElement("span",null,r.a.createElement("div",null,t.name),r.a.createElement("div",null,t.status)),r.a.createElement("span",null,r.a.createElement("div",null,"user.location.city"),r.a.createElement("div",null,"user.location.country"))))},Pe=function(e){return r.a.createElement("div",{className:Ee.a.usersPage},r.a.createElement(_e,{currentPag:e.currentPage,totalItemsCount:e.totalUsersCount,pageSize:e.pageSize,onPageChanged:e.onPageChanged}),r.a.createElement("div",{className:Ee.a.usersList},e.users.map(function(t){return r.a.createElement(Se,{key:t.id,user:t,followingInProgress:e.followingInProgress,unfollow:e.unfollow,follow:e.follow})})))},je=n(39),ye=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).onPageChanged=function(e){var t=n.props.pageSize;n.props.requestUsers(e,t)},n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.currentPage,n=e.pageSize;this.props.requestUsers(t,n)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.props.isFetching?r.a.createElement(je.a,null):null,r.a.createElement(Pe,{totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,onPageChanged:this.onPageChanged,users:this.props.users,follow:this.props.follow,unfollow:this.props.unfollow,followingInProgress:this.props.followingInProgress}))}}]),t}(r.a.Component),Ce=Object(Y.d)(Object(y.b)(function(e){return{users:ce(e),pageSize:le(e),totalUsersCount:fe(e),currentPage:me(e),isFetching:pe(e),followingInProgress:de(e)}},{follow:function(e){return function(){var t=Object(b.a)(h.a.mark(function t(n){return h.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n(ie(!0,e)),t.next=3,_.c.follow(e);case 3:0===t.sent.resultCode&&n(ne(e)),n(ie(!1,e));case 6:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},unfollow:function(e){return function(){var t=Object(b.a)(h.a.mark(function t(n){return h.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n(ie(!0,e)),t.next=3,_.c.unfollow(e);case 3:0===t.sent.resultCode&&n(ae(e)),n(ie(!1,e));case 6:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},setCurrentPage:re,requestUsers:function(e,t){return function(){var n=Object(b.a)(h.a.mark(function n(a){var r;return h.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a(oe(!0)),n.next=3,_.c.getUsers(e,t);case 3:r=n.sent,a(oe(!1)),a({type:"users/SET_USERS",users:r.items}),a({type:"users/SET_TOTAL_COUNT",totalCount:r.totalCount}),a(re(e));case 8:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}()}}))(ye),Ie=(n(291),{initialized:!1}),Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ie;switch((arguments.length>1?arguments[1]:void 0).type){case"app/INITIALIZED_SUCCESS":return Object(v.a)({},e,{initialized:!0});default:return e}},xe=n(95),Te=n(123),ke={friends:[{id:1,name:"Harry",img:"http://dreamatico.com/data_images/people/people-2.jpg"},{id:2,name:"Stefani",img:"https://pixel.nymag.com/imgs/fashion/daily/2018/08/17/magazine/tessa-thompson-1.w570.h712.jpg"},{id:3,name:"Donald",img:"https://images.axios.com/078ps5QcbNgqsgEI_QkV9hDW9PQ=/0x0:3900x2194/1920x1080/2018/08/25/1535212462538.jpg"}]},Le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ke;arguments.length>1&&arguments[1];return e},Ue=n(136),Ae=n(127),Fe=Object(Y.c)({profilePage:xe.b,messagesPage:Te.a,sidebar:Le,usersPage:se,auth:j,form:Ae.a,app:Ne}),ze=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Y.d,Re=Object(Y.e)(Fe,ze(Object(Y.a)(Ue.a)));window.store=Re;var Ge=Re,De=function(e){return function(t){return r.a.createElement(r.a.Suspense,{fallback:r.a.createElement(je.a,null)},r.a.createElement(e,t))}},Me=r.a.lazy(function(){return n.e(4).then(n.bind(null,301))}),He=r.a.lazy(function(){return n.e(3).then(n.bind(null,300))}),We=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.initializeApp()}},{key:"render",value:function(){return this.props.initialized?r.a.createElement("div",{className:"app-wrapper"},r.a.createElement(I,null),r.a.createElement(F,null),r.a.createElement("div",{className:"app-wrapper__content"},r.a.createElement(q.d,null,r.a.createElement(q.b,{exact:!0,path:"/profile/:userId?",render:De(He)}),r.a.createElement(q.b,{path:"/dialogs",render:De(Me)}),r.a.createElement(q.b,{path:"/news",component:z}),r.a.createElement(q.b,{path:"/music",component:R}),r.a.createElement(q.b,{path:"/settings",component:G}),r.a.createElement(q.b,{path:"/users",render:function(){return r.a.createElement(Ce,null)}}),r.a.createElement(q.b,{path:"/login",render:function(){return r.a.createElement(X,null)}}),r.a.createElement(q.b,{component:D}))),r.a.createElement(T,null)):r.a.createElement(je.a,null)}}]),t}(a.Component),Be=Object(Y.d)(q.g,Object(y.b)(function(e){return{initialized:e.app.initialized}},{initializeApp:function(){return function(e){var t=e(P());Promise.all([t]).then(function(){e({type:"app/INITIALIZED_SUCCESS"})})}}}))(We),qe=function(e){return r.a.createElement(y.a,{store:Ge},r.a.createElement(d.a,null,r.a.createElement(Be,null)))};i.a.render(r.a.createElement(qe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},39:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(135),i=n.n(o);t.a=function(e){return r.a.createElement("div",{style:{backgroundColor:"rgba(0,0,0,0.7)"}},r.a.createElement("img",{src:i.a,alt:"Prloader"}))}},44:function(e,t,n){e.exports={userPhoto:"users_userPhoto__1_En6"}},45:function(e,t,n){e.exports={wrapper:"Login_wrapper__1IflB",agreement:"Login_agreement__11Nwi",btn_login:"Login_btn_login__HOmyI"}},51:function(e,t,n){e.exports={form_control:"FormControls_form_control__2MVrZ",error:"FormControls_error__3zfBa",formSummaryError:"FormControls_formSummaryError__2ffxR"}},65:function(e,t,n){"use strict";n.d(t,"b",function(){return c}),n.d(t,"a",function(){return l});var a=n(72),r=n(0),o=n.n(r),i=n(51),s=n.n(i),u=function(e){e.input;var t=e.meta,n=t.touched,r=t.error,i=Object(a.a)(e,["input","meta"]),u=n&&r;return o.a.createElement("div",{className:s.a.form_control+" "+(u?s.a.error:"")},o.a.createElement("div",null,i.children),u&&o.a.createElement("span",null,r))},c=function(e){var t=e.input,n=(e.meta,Object(a.a)(e,["input","meta"]));return o.a.createElement(u,e,o.a.createElement("textarea",Object.assign({},t,n)))},l=function(e){var t=e.input,n=(e.meta,Object(a.a)(e,["input","meta"]));return o.a.createElement(u,e,o.a.createElement("input",Object.assign({},t,n)))}},70:function(e,t,n){e.exports={header:"Header_header__1VCKf",loginBlock:"Header_loginBlock__6mma5",btn_logout:"Header_btn_logout__2cvt6"}},75:function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"a",function(){return r});var a=function(e){if(!e)return"Field is required!"},r=function(e){return function(t){if(t.length>e)return"Max length is ".concat(e," symbols")}}},94:function(e,t,n){e.exports={pagination:"Paginator_pagination__1asUZ",selectedPage:"Paginator_selectedPage__3SIki"}},95:function(e,t,n){"use strict";n.d(t,"a",function(){return l}),n.d(t,"c",function(){return m}),n.d(t,"d",function(){return p}),n.d(t,"e",function(){return d});var a=n(9),r=n.n(a),o=n(20),i=n(40),s=n(8),u=n(21),c={posts:[{id:1,message:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, non!",likes:10},{id:2,message:"Illo modi, culpa cupiditate repellat eos rerum saepe hic distinctio odio dolor!",likes:23}],profile:null,status:""},l=function(e){return{type:"profile/ADD-POST",newPostText:e}},f=function(e){return{type:"profile/SET_STATUS",status:e}},m=function(e){return function(){var t=Object(o.a)(r.a.mark(function t(n){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.c.getProfile(e);case 2:a=t.sent,n({type:"profile/SET_USER_PROFILE",profile:a});case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},p=function(e){return function(){var t=Object(o.a)(r.a.mark(function t(n){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.b.getStatus(e);case 2:a=t.sent,n(f(a));case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},d=function(e){return function(){var t=Object(o.a)(r.a.mark(function t(n){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.b.updateStatus(e);case 2:0===t.sent.data.resultCode&&n(f(e));case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()};t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"profile/ADD-POST":var n={id:5,message:t.newPostText,likes:0};return Object(s.a)({},e,{posts:[].concat(Object(i.a)(e.posts),[n])});case"profile/SET_USER_PROFILE":return Object(s.a)({},e,{profile:t.profile});case"profile/SET_STATUS":return Object(s.a)({},e,{status:t.status});case"profile/DELETE_POST":return Object(s.a)({},e,{posts:e.posts.filter(function(e){return e.id!=t.postId})});default:return e}}}},[[162,1,2]]]);
//# sourceMappingURL=main.1e77bd34.chunk.js.map