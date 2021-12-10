var Q=Object.defineProperty;var O=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable;var q=(a,e,t)=>e in a?Q(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,V=(a,e)=>{for(var t in e||(e={}))X.call(e,t)&&q(a,t,e[t]);if(O)for(var t of O(e))Z.call(e,t)&&q(a,t,e[t]);return a};import{r as ee,c as f,a as E,o as l,b as u,d as o,e as h,F as U,S as N,f as te,g as M,w as ne,M as R,h as d,v as _,i as L,j as B,u as oe,k as ae,l as j,m as se,n as re,p as ie,q as ce,s as w,t as A,x as p,y as F,z as H,A as $,B as le,C as de}from"./vendor.f20538c6.js";const ue=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(r){if(r.ep)return;r.ep=!0;const c=t(r);fetch(r.href,c)}};ue();const i=ee({user:{},account:{},events:[],activeEvent:{},comments:[],attendees:[],alreadyAttending:!1,myAttendance:[]});var b=(a,e)=>{for(const[t,n]of e)a[t]=n;return a};const me={name:"App",setup(){return{appState:f(()=>i)}}},ve={class:"bg-secondary"},_e=o("footer",null,[o("div",{class:"bg-dark text-light text-center p-4"},"Made By Scott Bickish")],-1);function pe(a,e,t,n,r,c){const s=E("Navbar"),y=E("router-view");return l(),u(U,null,[o("header",null,[h(s)]),o("main",ve,[h(y)]),_e],64)}var ge=b(me,[["render",pe]]);const z=window.location.origin.includes("localhost"),K=z?"http://localhost:3000":"",fe="scott-codeworks.us.auth0.com",he="RCyA1uqr2CFegPI99M78Pp4D6sx08pJA",be="https://ScottDev.com";function S(a,e){if(z)console[a](`[${a}] :: ${new Date().toLocaleTimeString()} :: `,...e);else{switch(a){case"log":case"assert":return}console[a](`[${a}] :: ${new Date().toLocaleTimeString()} :: `,...e)}}const g={log(){S("log",arguments)},error(){S("error",arguments)},warn(){S("warn",arguments)},assert(){S("assert",arguments)},trace(){S("trace",arguments)}};class x{static async confirm(e="Are you sure?",t="You won't be able to revert this!",n="warning",r="Yes, delete it!"){try{return!!(await N.fire({title:e,text:t,icon:n,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:r})).isConfirmed}catch{return!1}}static toast(e="Warning!",t="warning",n="top-end",r=3e3,c=!0){N.fire({title:e,icon:t,position:n,timer:r,timerProgressBar:c,toast:!0,showConfirmButton:!1})}}const m=te.create({baseURL:K,timeout:8e3});class ye{async getAllEvents(){const e=await m.get("api/events");i.events=e.data}async getActiveEvent(e){const t=await m.get(`api/events/${e}`);i.activeEvent=t.data}async createEvent(e){const t=await m.post("api/events",e);i.activeEvent=t.data}async cancelEvent(e){await m.delete(`api/events/${e.id}`),i.events=i.events.filter(t=>t.id!==i.events.id),this.getActiveEvent(e.id)}async editEvent(e){const n=(await m.put(`api/events/${e.id}`,e)).data;i.activeEvent=n;const r=i.events.findIndex(c=>c.id===n.id);if(r===-1){i.events.push(n);return}i.events.splice(r,1,n)}}const I=new ye,Ee={props:{event:{type:Event}},setup(a){const e=M({});return ne(()=>{e.value=V({},a.event)}),{editable:e,async handleSubmit(){try{await I.editEvent(e.value),R.getOrCreateInstance(document.getElementById("EditEventForm")).hide()}catch(t){g.error(t),x.toast(t)}}}}},we={class:"EditEventform",id:"EditEventForm"},Ae=o("option",null,"concert",-1),Se=o("option",null,"digital",-1),xe=o("option",null,"convention",-1),Ce=o("option",null,"sport",-1),ke=[Ae,Se,xe,Ce],Te=o("button",{type:"submit"},"Update",-1);function Pe(a,e,t,n,r,c){return l(),u("div",we,[o("form",{onSubmit:e[7]||(e[7]=B((...s)=>n.handleSubmit&&n.handleSubmit(...s),["prevent"]))},[d(o("input",{class:"form-control my-2",type:"text",name:"title",id:"title",placeholder:"title...",required:"","onUpdate:modelValue":e[0]||(e[0]=s=>n.editable.name=s)},null,512),[[_,n.editable.name]]),d(o("select",{"onUpdate:modelValue":e[1]||(e[1]=s=>n.editable.type=s)},ke,512),[[L,n.editable.type]]),d(o("textarea",{class:"form-control my-2",name:"description",id:"dscription",cols:"30",rows:"10",placeholder:"event description...",required:"","onUpdate:modelValue":e[2]||(e[2]=s=>n.editable.description=s)},null,512),[[_,n.editable.description]]),d(o("input",{type:"text",class:"form-control my-2",name:"location",id:"location",placeholder:"event location",required:"","onUpdate:modelValue":e[3]||(e[3]=s=>n.editable.location=s)},null,512),[[_,n.editable.location]]),d(o("input",{type:"number",name:"capacity",id:"capacity",class:"form-control my-2",required:"","onUpdate:modelValue":e[4]||(e[4]=s=>n.editable.capacity=s)},null,512),[[_,n.editable.capacity]]),d(o("input",{type:"date",name:"date",id:"date",class:"form-control my-2",required:"","onUpdate:modelValue":e[5]||(e[5]=s=>n.editable.startDate=s)},null,512),[[_,n.editable.startDate]]),d(o("input",{type:"url",name:"coverimg",id:"coverimg",class:"form-control my-2",placeholder:"coverimg...",required:"","onUpdate:modelValue":e[6]||(e[6]=s=>n.editable.coverImg=s)},null,512),[[_,n.editable.coverImg]]),Te],32)])}var De=b(Ee,[["render",Pe]]),$e=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:De});const Ie={setup(){const a=oe(),e=ae(),t=M({});return{event:t,route:a,router:e,async createEvent(){try{await I.createEvent(t.value),R.getOrCreateInstance(document.getElementById("EventForm")).hide(),e.push({name:"EventDetailsPage",params:{id:i.activeEvent.id}})}catch(n){g.error(n),x.toast(n)}}}}},Oe={class:"Eventform"},qe=o("label",{class:"me-2"}," Select a type of Event ",-1),Ve=o("option",null,"concert",-1),Ue=o("option",null,"digital",-1),Ne=o("option",null,"convention",-1),Me=o("option",null,"sport",-1),Re=[Ve,Ue,Ne,Me],Le=o("button",{type:"submit",title:"submit"},"submit",-1);function Be(a,e,t,n,r,c){return l(),u("div",Oe,[o("form",{onSubmit:e[7]||(e[7]=B(s=>n.createEvent(),["prevent"]))},[d(o("input",{class:"form-control my-2",type:"text",name:"title",id:"title",placeholder:"title...",required:"","onUpdate:modelValue":e[0]||(e[0]=s=>n.event.name=s)},null,512),[[_,n.event.name]]),qe,d(o("select",{"onUpdate:modelValue":e[1]||(e[1]=s=>n.event.type=s),title:"select a type",class:"selectable"},Re,512),[[L,n.event.type]]),d(o("textarea",{class:"form-control my-2",name:"description",id:"dscription",cols:"30",rows:"10",placeholder:"event description...",required:"","onUpdate:modelValue":e[2]||(e[2]=s=>n.event.description=s)},null,512),[[_,n.event.description]]),d(o("input",{type:"text",class:"form-control my-2",name:"location",id:"location",placeholder:"event location",required:"","onUpdate:modelValue":e[3]||(e[3]=s=>n.event.location=s)},null,512),[[_,n.event.location]]),d(o("input",{type:"number",name:"capacity",id:"capacity",class:"form-control my-2",required:"",placeholder:"Capacity use the arrows...","onUpdate:modelValue":e[4]||(e[4]=s=>n.event.capacity=s)},null,512),[[_,n.event.capacity]]),d(o("input",{title:"pick a date",type:"date",name:"date",id:"date",class:"form-control my-2 selectable",required:"","onUpdate:modelValue":e[5]||(e[5]=s=>n.event.startDate=s)},null,512),[[_,n.event.startDate]]),d(o("input",{type:"url",name:"coverimg",id:"coverimg",class:"form-control my-2",placeholder:"coverimg...",required:"","onUpdate:modelValue":e[6]||(e[6]=s=>n.event.coverImg=s)},null,512),[[_,n.event.coverImg]]),Le],32)])}var je=b(Ie,[["render",Be]]),Fe=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:je});const He={},ze={class:"modal",tabindex:"-1"},Ke={class:"modal-dialog modal-xl"},Ye={class:"modal-content"},Ge={class:"modal-header"},We={class:"modal-title my-3"},Je=o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close",title:"Close"},null,-1),Qe={class:"modal-body bg-body"};function Xe(a,e){return l(),u("div",ze,[o("div",Ke,[o("div",Ye,[o("div",Ge,[o("h5",We,[j(a.$slots,"modal-title")]),Je]),o("div",Qe,[j(a.$slots,"modal-body")])])])])}var Ze=b(He,[["render",Xe]]),et=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Ze});const tt="modulepreload",Y={},nt="/",C=function(e,t){return!t||t.length===0?e():Promise.all(t.map(n=>{if(n=`${nt}${n}`,n in Y)return;Y[n]=!0;const r=n.endsWith(".css"),c=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${c}`))return;const s=document.createElement("link");if(s.rel=r?"stylesheet":tt,r||(s.as="script",s.crossOrigin=""),s.href=n,document.head.appendChild(s),r)return new Promise((y,P)=>{s.addEventListener("load",y),s.addEventListener("error",P)})})).then(()=>e())};function ot(a){switch(a){case"./pages/AboutPage.vue":return C(()=>import("./AboutPage.8d2e38c2.js"),["assets/AboutPage.8d2e38c2.js","assets/vendor.f20538c6.js"]);case"./pages/AccountPage.vue":return C(()=>import("./AccountPage.9725bf86.js"),["assets/AccountPage.9725bf86.js","assets/AccountPage.1dfcf6aa.css","assets/AttendeesService.4937e560.js","assets/vendor.f20538c6.js"]);case"./pages/EventDetailsPage.vue":return C(()=>import("./EventDetailsPage.0da205b6.js"),["assets/EventDetailsPage.0da205b6.js","assets/EventDetailsPage.220e222c.css","assets/vendor.f20538c6.js","assets/AttendeesService.4937e560.js"]);case"./pages/HomePage.vue":return C(()=>import("./HomePage.5d0498a0.js"),["assets/HomePage.5d0498a0.js","assets/vendor.f20538c6.js"]);default:return new Promise(function(e,t){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+a)))})}}function k(a){return()=>ot(`./pages/${a}.vue`)}const at=[{path:"/",name:"Home",component:k("HomePage")},{path:"/about",name:"About",component:k("AboutPage")},{path:"/eventdetails/:id",name:"EventDetailsPage",component:k("EventDetailsPage")},{path:"/account",name:"Account",component:k("AccountPage"),beforeEnter:ie}],G=se({linkActiveClass:"router-link-active",linkExactActiveClass:"router-link-exact-active",history:re(),routes:at});class st{async getAccount(){try{const e=await m.get("/account");i.account=e.data}catch(e){g.error("HAVE YOU STARTED YOUR SERVER YET???",e)}}async getMyAttendance(e){const t=await m.get("/account/attendees",e);i.myAttendance=t.data}}const rt=new st,it={connection:"connection",connected:"connected",disconnect:"disconnect",authenticate:"authenticate",authenticated:"authenticated",userConnected:"userConnected",userDisconnected:"userDisconnected",error:"error"};class ct{constructor(e=!1,t=K){}on(e,t){var n;return(n=this.socket)==null||n.on(e,t.bind(this)),this}onConnected(e){g.log("[SOCKET_CONNECTION]",e),this.connected=!0,this.playback()}onAuthenticated(e){g.log("[SOCKET_AUTHENTICATED]",e),this.authenticated=!0,this.playback()}authenticate(e){var t;(t=this.socket)==null||t.emit(it.authenticate,e)}onError(e){g.error("[SOCKET_ERROR]",e)}enqueue(e,t){g.log("[ENQUEING_ACTION]",{action:e,payload:t}),this.queue.push({action:e,payload:t})}playback(){g.log("[SOCKET_PLAYBACK]");const e=[...this.queue];this.queue=[],e.forEach(t=>{this.emit(t.action,t.payload)})}emit(e,t=void 0){if(this.requiresAuth&&!this.authenticated)return this.enqueue(e,t);if(!this.connected)return this.enqueue(e,t);this.socket.emit(e,t)}}class lt extends ct{constructor(){super();this.on("error",this.onError)}onError(e){x.toast(e.message,"error")}}const W=new lt,v=ce({domain:fe,clientId:he,audience:be,useRefreshTokens:!0,onRedirectCallback:a=>{G.push(a&&a.targetUrl?a.targetUrl:window.location.pathname)}});v.on(v.AUTH_EVENTS.AUTHENTICATED,async function(){m.defaults.headers.authorization=v.bearer,m.interceptors.request.use(dt),i.user=v.user,await rt.getAccount(),W.authenticate(v.bearer),await I.getAllEvents()});async function dt(a){if(!v.isAuthenticated)return a;const e=v.identity.exp*1e3,t=e<Date.now(),n=e<Date.now()+1e3*60*60*12;return t?await v.loginWithPopup():n&&(await v.getTokenSilently(),m.defaults.headers.authorization=v.bearer,W.authenticate(v.bearer)),a}const ut={setup(){return{account:f(()=>i.account),user:f(()=>i.user),async login(){v.loginWithPopup()},async logout(){v.logout({returnTo:window.location.origin})}}}},T=a=>(F("data-v-d5cd1492"),a=a(),H(),a),mt={class:"navbar navbar-expand-lg navbar-dark bg-dark px-3"},vt=T(()=>o("div",{class:"d-flex flex-column align-items-center btn text-light lighten-30 selectable text-uppercase",title:"Go-Home"}," Home ",-1)),_t=T(()=>o("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[o("span",{class:"navbar-toggler-icon"})],-1)),pt={class:"collapse navbar-collapse",id:"navbarText"},gt={class:"navbar-nav me-auto"},ft=$("Account "),ht={key:0,class:"btn-btn rounded bg-success me-5","data-bs-toggle":"modal","data-bs-target":"#EventForm",title:"form"},bt={class:"navbar-text"},yt={key:1,class:"dropdown my-2 my-lg-0"},Et={title:"Login or logout",class:"dropdown-toggle selectable","data-bs-toggle":"dropdown","aria-expanded":"false",id:"authDropdown"},wt=["src"],At={class:"mx-3 text-success lighten-30"},St={class:"dropdown-menu p-0 list-group w-100","aria-labelledby":"authDropdown"},xt=T(()=>o("div",{class:"list-group-item list-group-item-action hoverable",title:"manage account"}," Manage Account ",-1)),Ct=T(()=>o("i",{class:"mdi mdi-logout"},null,-1)),kt=$(" logout "),Tt=[Ct,kt],Pt=$(" Make an Event! ");function Dt(a,e,t,n,r,c){const s=E("router-link"),y=E("EventForm"),P=E("Modal");return l(),u(U,null,[o("nav",mt,[h(s,{class:"navbar-brand d-flex",to:{name:"Home"}},{default:w(()=>[vt]),_:1}),_t,o("div",pt,[o("ul",gt,[o("li",null,[h(s,{to:{name:"Account"},class:"btn text-light lighten-30 selectable text-uppercase",title:"Go to Account Page"},{default:w(()=>[ft]),_:1})])]),n.account.id?(l(),u("button",ht," Create New Event ")):A("",!0),o("span",bt,[n.user.isAuthenticated?(l(),u("div",yt,[o("div",Et,[o("img",{src:n.user.picture,alt:"user photo",height:"40",class:"rounded"},null,8,wt),o("span",At,p(n.user.name),1)]),o("div",St,[h(s,{to:{name:"Account"}},{default:w(()=>[xt]),_:1}),o("div",{title:"logout",class:"list-group-item list-group-item-action hoverable text-danger",onClick:e[1]||(e[1]=(...D)=>n.logout&&n.logout(...D))},Tt)])])):(l(),u("button",{key:0,title:"login",class:"btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0",onClick:e[0]||(e[0]=(...D)=>n.login&&n.login(...D))}," Login "))])])]),h(P,{id:"EventForm"},{"modal-title":w(()=>[Pt]),"modal-body":w(()=>[h(y)]),_:1})],64)}var $t=b(ut,[["render",Dt],["__scopeId","data-v-d5cd1492"]]),It=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:$t});class Ot{async getEventComments(e){const t=await m.get(`api/events/${e}/comments`);i.comments=t.data}async createComment(e){const t=await m.post("api/comments",e);i.comments=[...i.comments,t.data]}async removeComment(e){await m.delete(`api/comments/${e}`),i.comments=i.comments.filter(t=>t.id!==e)}}const qt=new Ot;const Vt={props:{comment:Object},setup(){return{account:f(()=>i.account),async removeComment(a){try{await window.confirm("are you sure you want to delete?")&&await qt.removeComment(a)}catch(e){g.error(e),x.toast(e)}}}}},Ut={class:"card elevation-2 border m-3 p-2"},Nt=["src"],Mt={class:"text-end m-3"};function Rt(a,e,t,n,r,c){return l(),u("div",Ut,[o("img",{class:"fit",src:t.comment.creator.picture,alt:""},null,8,Nt),o("p",null,p(t.comment.creator.name),1),o("p",null,p(t.comment.body),1),o("div",Mt,[n.account.id==t.comment.creator.id?(l(),u("button",{key:0,title:"delete comment",class:"bg-danger rounded",onClick:e[0]||(e[0]=s=>n.removeComment(t.comment.id))}," Delete ")):A("",!0)])])}var Lt=b(Vt,[["render",Rt],["__scopeId","data-v-4dea1cee"]]),Bt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Lt});const jt={props:{event:Object},setup(a){return{alreadyAttending:f(()=>i.alreadyAttending),activeEvent:f(()=>i.activeEvent),setActive(){i.activeEvent=a.event},alreadyAttending:f(()=>i.account.id?!!i.attendees.find(t=>t.accountId===i.account.id):!1)}}},Ft=a=>(F("data-v-0e3a8608"),a=a(),H(),a),Ht=["src"],zt={key:0},Kt={key:1,class:"cancel"},Yt={key:2},Gt=Ft(()=>o("h6",{class:"cancel"},"This event is canceled",-1)),Wt=[Gt];function Jt(a,e,t,n,r,c){const s=E("router-link");return l(),le(s,{to:{name:"EventDetailsPage",params:{id:t.event.id}}},{default:w(()=>[o("div",{title:"open in new page",class:"selectable card elevation-2 my-2",onClick:e[0]||(e[0]=y=>n.setActive())},[o("img",{class:"img-fluid fix",src:t.event.coverImg,alt:""},null,8,Ht),o("h3",null,p(t.event.name),1),o("h5",null,"Event type: "+p(t.event.type),1),o("h5",null,p(new Date(t.event.startDate).toDateString()),1),o("h5",null,p(t.event.location),1),t.event.capacity>0?(l(),u("p",zt,"Capacity left: "+p(t.event.capacity),1)):A("",!0),t.event.capacity==0?(l(),u("p",Kt,"This event if full")):A("",!0),o("p",null,p(t.event.description),1),t.event.isCanceled?(l(),u("div",Yt,Wt)):A("",!0)])]),_:1},8,["to"])}var Qt=b(jt,[["render",Jt],["__scopeId","data-v-0e3a8608"]]),Xt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Qt});function Zt(a){Object.entries({"./components/EditEventForm.vue":$e,"./components/EventForm.vue":Fe,"./components/Modal.vue":et,"./components/Navbar.vue":It,"./components/SingleComment.vue":Bt,"./components/SingleEvent.vue":Xt}).forEach(([t,n])=>{const r=n.name||t.substr(t.lastIndexOf("/")+1).replace(/\.\w+$/,"");a.component(r,n.default)})}const J=de(ge);Zt(J);J.use(G).mount("#app");export{i as A,x as P,b as _,rt as a,m as b,qt as c,I as e,g as l};
