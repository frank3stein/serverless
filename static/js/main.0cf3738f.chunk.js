(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{204:function(e,t,n){e.exports=n(367)},209:function(e,t,n){},367:function(e,t,n){"use strict";n.r(t);var a=n(47),o=n.n(a);n(209),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(210);var r=n(0),i=n.n(r),c=n(24),s=n(25),l=n(168),u="https://".concat("l9h5zc3ea3",".execute-api.us-east-1.amazonaws.com/dev"),d={domain:"dev-t-ikyd9q.eu.auth0.com",clientId:"qKwsIARzGpKwEonmAaHsN3yjGIVZewtx",callbackUrl:"http://localhost:3000/callback"},h=function(){function e(t){Object(c.a)(this,e),this.auth0=new l.a.WebAuth({domain:d.domain,clientID:d.clientId,redirectUri:d.callbackUrl,responseType:"token id_token",scope:"openid"}),this.history=t,this.login=this.login.bind(this),this.logout=this.logout.bind(this),this.handleAuthentication=this.handleAuthentication.bind(this),this.isAuthenticated=this.isAuthenticated.bind(this),this.getAccessToken=this.getAccessToken.bind(this),this.getIdToken=this.getIdToken.bind(this),this.renewSession=this.renewSession.bind(this)}return Object(s.a)(e,[{key:"login",value:function(){this.auth0.authorize()}},{key:"handleAuthentication",value:function(){var e=this;this.auth0.parseHash(function(t,n){n&&n.accessToken&&n.idToken?(console.log("Access token: ",n.accessToken),console.log("id token: ",n.idToken),e.setSession(n)):t&&(e.history.replace("/"),console.log(t),alert("Error: ".concat(t.error,". Check the console for further details.")))})}},{key:"getAccessToken",value:function(){return this.accessToken}},{key:"getIdToken",value:function(){return this.idToken}},{key:"setSession",value:function(e){localStorage.setItem("isLoggedIn","true");var t=1e3*e.expiresIn+(new Date).getTime();this.accessToken=e.accessToken,this.idToken=e.idToken,this.expiresAt=t,this.history.replace("/")}},{key:"renewSession",value:function(){var e=this;this.auth0.checkSession({},function(t,n){n&&n.accessToken&&n.idToken?e.setSession(n):t&&(e.logout(),console.log(t),alert("Could not get a new token (".concat(t.error,": ").concat(t.error_description,").")))})}},{key:"logout",value:function(){this.accessToken=null,this.idToken=null,this.expiresAt=0,localStorage.removeItem("isLoggedIn"),this.auth0.logout({return_to:window.location.origin}),this.history.replace("/")}},{key:"isAuthenticated",value:function(){var e=this.expiresAt;return(new Date).getTime()<e}}]),e}(),p=n(43),m=n(380),f=n(375);var g,v=function(){return i.a.createElement(m.a,{active:!0},i.a.createElement(f.a,{content:"Loading"}))},k=n(190),b=n.n(k),y=n(31),w=n(30),E=n(32),T=n(49),O=n(118),j=n(384),C=n(383),x=n(381),I=n(16),A=n.n(I),S=n(22),U=n(379),L=n(368),D=n(52),F=n.n(D);function N(e){return B.apply(this,arguments)}function B(){return(B=Object(S.a)(A.a.mark(function e(t){var n;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Fetching todos"),e.next=3,F.a.get("".concat(u,"/todos"),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)}});case 3:return n=e.sent,console.log("Todos:",n.data),e.abrupt("return",n.data.todos);case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}function P(e,t){return z.apply(this,arguments)}function z(){return(z=Object(S.a)(A.a.mark(function e(t,n){var a;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.post("".concat(u,"/todos"),JSON.stringify(n),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)}});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function R(e,t,n){return _.apply(this,arguments)}function _(){return(_=Object(S.a)(A.a.mark(function e(t,n,a){return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.patch("".concat(u,"/todos/").concat(n),JSON.stringify(a),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)}});case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function J(e,t){return M.apply(this,arguments)}function M(){return(M=Object(S.a)(A.a.mark(function e(t,n){return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.delete("".concat(u,"/todos/").concat(n),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(t)}});case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function H(e,t){return W.apply(this,arguments)}function W(){return(W=Object(S.a)(A.a.mark(function e(t,n){var a;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.post("".concat(u,"/todos/").concat(n,"/attachment"),"",{headers:{"Content-Type":"image/png",Authorization:"Bearer ".concat(t)}});case 2:return a=e.sent,e.abrupt("return",a.data.uploadUrl);case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function q(e,t){return G.apply(this,arguments)}function G(){return(G=Object(S.a)(A.a.mark(function e(t,n){return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.put(t,n,{headers:{"Content-Type":"image/png"}});case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(e){e[e.NoUpload=0]="NoUpload",e[e.FetchingPresignedUrl=1]="FetchingPresignedUrl",e[e.UploadingFile=2]="UploadingFile"}(g||(g={}));var K=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(y.a)(this,(e=Object(w.a)(t)).call.apply(e,[this].concat(o)))).state={file:void 0,uploadState:g.NoUpload},n.handleFileChange=function(e){var t=e.target.files;t&&n.setState({file:t[0]})},n.handleSubmit=function(){var e=Object(S.a)(A.a.mark(function e(t){var a;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,n.state.file){e.next=5;break}return alert("File should be selected"),e.abrupt("return");case 5:return n.setUploadState(g.FetchingPresignedUrl),e.next=8,H(n.props.auth.getIdToken(),n.props.match.params.todoId);case 8:return a=e.sent,n.setUploadState(g.UploadingFile),e.next=12,q(a,n.state.file);case 12:alert("File was uploaded!"),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(1),alert("Could not upload a file: "+e.t0.message);case 18:return e.prev=18,n.setUploadState(g.NoUpload),e.finish(18);case 21:case"end":return e.stop()}},e,null,[[1,15,18,21]])}));return function(t){return e.apply(this,arguments)}}(),n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"setUploadState",value:function(e){this.setState({uploadState:e})}},{key:"render",value:function(){return r.createElement("div",null,r.createElement("h1",null,"Upload new image"),r.createElement(U.a,{onSubmit:this.handleSubmit},r.createElement(U.a.Field,null,r.createElement("label",null,"File"),r.createElement("input",{type:"file",accept:"image/*",placeholder:"Image to upload",onChange:this.handleFileChange})),this.renderButton()))}},{key:"renderButton",value:function(){return r.createElement("div",null,this.state.uploadState===g.FetchingPresignedUrl&&r.createElement("p",null,"Uploading image metadata"),this.state.uploadState===g.UploadingFile&&r.createElement("p",null,"Uploading file"),r.createElement(L.a,{loading:this.state.uploadState!==g.NoUpload,type:"submit"},"Upload"))}}]),t}(r.PureComponent),$=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(y.a)(this,(e=Object(w.a)(t)).call.apply(e,[this].concat(o)))).onLogin=function(){n.props.auth.login()},n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.createElement("div",null,r.createElement("h1",null,"Please log in"),r.createElement(L.a,{onClick:this.onLogin,size:"huge",color:"olive"},"Log in"))}}]),t}(r.PureComponent),V=function(e){function t(){return Object(c.a)(this,t),Object(y.a)(this,Object(w.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.createElement("h1",null,"Not Found")}}]),t}(r.PureComponent),Z=n(184),Q=n(191),X=n(185),Y=n.n(X),ee=n(186),te=n.n(ee),ne=n(382),ae=n(377),oe=n(378),re=n(376),ie=n(51),ce=n(192),se=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(y.a)(this,(e=Object(w.a)(t)).call.apply(e,[this].concat(o)))).state={todos:[],newTodoName:"",loadingTodos:!0},n.handleNameChange=function(e){n.setState({newTodoName:e.target.value})},n.onEditButtonClick=function(e){n.props.history.push("/todos/".concat(e,"/edit"))},n.onTodoCreate=function(){var e=Object(S.a)(A.a.mark(function e(t){var a,o;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=n.calculateDueDate(),e.next=4,P(n.props.auth.getIdToken(),{name:n.state.newTodoName,dueDate:a});case 4:o=e.sent,n.setState({todos:[].concat(Object(Q.a)(n.state.todos),[o]),newTodoName:""}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),alert("Todo creation failed");case 11:case"end":return e.stop()}},e,null,[[0,8]])}));return function(t){return e.apply(this,arguments)}}(),n.onTodoDelete=function(){var e=Object(S.a)(A.a.mark(function e(t){return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,J(n.props.auth.getIdToken(),t);case 3:n.setState({todos:n.state.todos.filter(function(e){return e.todoId!=t})}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),alert("Todo deletion failed");case 9:case"end":return e.stop()}},e,null,[[0,6]])}));return function(t){return e.apply(this,arguments)}}(),n.onTodoCheck=function(){var e=Object(S.a)(A.a.mark(function e(t){var a;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=n.state.todos[t],n.setState({todos:te()(n.state.todos,Object(Z.a)({},t,{done:{$set:!a.done}}))}),e.next=5,R(n.props.auth.getIdToken(),a.todoId,{name:a.name,dueDate:a.dueDate,done:!a.done});case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert("Todo check failed");case 10:case"end":return e.stop()}},e,null,[[0,7]])}));return function(t){return e.apply(this,arguments)}}(),n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Object(S.a)(A.a.mark(function e(){var t;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N(this.props.auth.getIdToken());case 3:t=e.sent,this.setState({todos:t,loadingTodos:!1}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert("Failed to fetch todos: ".concat(e.t0.message));case 10:case"end":return e.stop()}},e,this,[[0,7]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.createElement("div",null,r.createElement(ne.a,{as:"h1"},"TODOs"),this.renderCreateTodoInput(),this.renderTodos())}},{key:"renderCreateTodoInput",value:function(){return r.createElement(C.a.Row,null,r.createElement(C.a.Column,{width:16},r.createElement(ae.a,{action:{color:"teal",labelPosition:"left",icon:"add",content:"New task",onClick:this.onTodoCreate},fluid:!0,actionPosition:"left",placeholder:"To change the world...",onChange:this.handleNameChange})),r.createElement(C.a.Column,{width:16},r.createElement(oe.a,null)))}},{key:"renderTodos",value:function(){return this.state.loadingTodos?this.renderLoading():this.renderTodosList()}},{key:"renderLoading",value:function(){return r.createElement(C.a.Row,null,r.createElement(f.a,{indeterminate:!0,active:!0,inline:"centered"},"Loading TODOs"))}},{key:"renderTodosList",value:function(){var e=this;return r.createElement(C.a,{padded:!0},this.state.todos.map(function(t,n){return r.createElement(C.a.Row,{key:t.todoId},r.createElement(C.a.Column,{width:1,verticalAlign:"middle"},r.createElement(re.a,{onChange:function(){return e.onTodoCheck(n)},checked:t.done})),r.createElement(C.a.Column,{width:10,verticalAlign:"middle"},t.name),r.createElement(C.a.Column,{width:3,floated:"right"},t.dueDate),r.createElement(C.a.Column,{width:1,floated:"right"},r.createElement(L.a,{icon:!0,color:"blue",onClick:function(){return e.onEditButtonClick(t.todoId)}},r.createElement(ie.a,{name:"pencil"}))),r.createElement(C.a.Column,{width:1,floated:"right"},r.createElement(L.a,{icon:!0,color:"red",onClick:function(){return e.onTodoDelete(t.todoId)}},r.createElement(ie.a,{name:"delete"}))),t.attachmentUrl&&r.createElement(ce.a,{src:t.attachmentUrl,size:"small",wrapped:!0}),r.createElement(C.a.Column,{width:16},r.createElement(oe.a,null)))}))}},{key:"calculateDueDate",value:function(){var e=new Date;return e.setDate(e.getDate()+7),Y()(e,"yyyy-mm-dd")}}]),t}(r.PureComponent),le=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(y.a)(this,Object(w.a)(t).call(this,e))).handleLogin=n.handleLogin.bind(Object(T.a)(Object(T.a)(n))),n.handleLogout=n.handleLogout.bind(Object(T.a)(Object(T.a)(n))),n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"handleLogin",value:function(){this.props.auth.login()}},{key:"handleLogout",value:function(){this.props.auth.logout()}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(j.a,{style:{padding:"8em 0em"},vertical:!0},i.a.createElement(C.a,{container:!0,stackable:!0,verticalAlign:"middle"},i.a.createElement(C.a.Row,null,i.a.createElement(C.a.Column,{width:16},i.a.createElement(p.b,{history:this.props.history},this.generateMenu(),this.generateCurrentPage()))))))}},{key:"generateMenu",value:function(){return i.a.createElement(x.a,null,i.a.createElement(x.a.Item,{name:"home"},i.a.createElement(O.a,{to:"/"},"Home")),i.a.createElement(x.a.Menu,{position:"right"},this.logInLogOutButton()))}},{key:"logInLogOutButton",value:function(){return this.props.auth.isAuthenticated()?i.a.createElement(x.a.Item,{name:"logout",onClick:this.handleLogout},"Log Out"):i.a.createElement(x.a.Item,{name:"login",onClick:this.handleLogin},"Log In")}},{key:"generateCurrentPage",value:function(){var e=this;return this.props.auth.isAuthenticated()?i.a.createElement(p.c,null,i.a.createElement(p.a,{path:"/",exact:!0,render:function(t){return i.a.createElement(se,Object.assign({},t,{auth:e.props.auth}))}}),i.a.createElement(p.a,{path:"/todos/:todoId/edit",exact:!0,render:function(t){return i.a.createElement(K,Object.assign({},t,{auth:e.props.auth}))}}),i.a.createElement(p.a,{component:V})):i.a.createElement($,{auth:this.props.auth})}}]),t}(r.Component),ue=b()(),de=new h(ue);o.a.render(i.a.createElement(p.b,{history:ue},i.a.createElement("div",null,i.a.createElement(p.a,{path:"/callback",render:function(e){return function(e){var t=e.location;/access_token|id_token|error/.test(t.hash)&&de.handleAuthentication()}(e),i.a.createElement(v,null)}}),i.a.createElement(p.a,{render:function(e){return i.a.createElement(le,Object.assign({auth:de},e))}}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[204,1,2]]]);
//# sourceMappingURL=main.0cf3738f.chunk.js.map