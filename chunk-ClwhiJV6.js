import{n as m,t as l}from"./chunk-Da4-SChG.js";import{An as c_,At as Re,C as C7,Cr as o9,Ct as Pu$1,Dr as p9,Dt as Qh,En as bG,Er as p8,Et as QI,Fn as d9,Gn as g0,Gr as uh$1,Gt as Uh,H as H9,In as d_,Ir as s8,It as T,J as J1,Kn as g7,L as F9,M as E7,Mn as d,Mt as S0,N as E9,O as DG,P as Ee,Pn as d8,Pr as r9,Pt as S9,Q as JL,Qn as h9,Qr as w9,Qt as W_,R as G,Rt as T9,Sn as ar$1,T as D,Tt as Q9,Un as f_,Vn as f7,Vr as t_,Vt as UI,Wn as g,Wt as Ud,X as J9,Xn as gr$1,Xt as W9,Y as J7,Z as JI,Zr as w7,Zt as WI,_n as a7,_r as n7,_t as O9,ai as z,an as Y1,at as L_,b as B,br as n_,bt as P2,dr as k9,dt as N0,en as X7,er as h_,f as $7,g as A1,gn as _9,gr as m9,hr as m7,i as ji$1,ii as yh$1,in as Xl$1,it as L9,jn as cr$1,jt as S,kt as R9,ln as YL,lt as M9,m as $I,n as Z,ni as y7,nn as XI,on as Y7,pn as ZI,pr as l8,pt as N9,qn as g9,ri as y9,rn as Xd,rr as i9,sn as Y9,st as M,ti as y,tt as KI,un as Ye$1,ut as N,vt as Ov$1,wr as p,xn as ah$1,yt as P}from"./main-ZIUGJH24.js";import{t as p$1}from"./chunk-CLqYVl3O.js";import{D as yt,E as xt,S as te,_ as mt$1,a as Mt,b as rt,d as ct,f as dt$1,g as it$1,k as zt,m as gt,n as F,s as St,t as E,v as nt$1,w as ue,y as oe}from"./chunk-Bg6gYsb_.js";function nu(i,e,t,n){return n>0&&t>=200&&t-i>=60?Math.round(140+115*e/255):0}async function ru(i){let e={};return await Promise.all(E.map(async t=>{let n=i.tex[t];n&&(e[t]=await Wl(n))})),e}function im(i){let e=new Uint8ClampedArray(i.length/4);for(let t=0;t<e.length;t++)e[t]=i[t*4];return e}function Wl(i){return new Promise((e,t)=>{let n=new Image;n.onload=()=>{let s=document.createElement(`canvas`);s.width=n.width,s.height=n.height;let r=s.getContext(`2d`,{willReadFrequently:!0});r.drawImage(n,0,0),e(r.getImageData(0,0,n.width,n.height))},n.onerror=()=>t(/* @__PURE__ */ new Error(`Image introuvable : ${i}`)),n.src=i})}function iu(i,e,t,n){let s=new Uint8ClampedArray(t*n*4),r=(o,a)=>Math.min(a-1,Math.max(0,o));for(let o=0;o<n;o++){let a=r(Math.floor(e.max.y+(o+.5)/n*(e.min.y-e.max.y)),i.height);for(let c=0;c<t;c++){let l=r(Math.floor(e.min.x+(c+.5)/t*(e.max.x-e.min.x)),i.width),h=(a*i.width+l)*4;s.set(i.data.subarray(h,h+4),(o*t+c)*4)}}return s}function su(i,e){return{kind:i,size:l({},e.size),pos:l({},e.pos),rot:l({},e.rot),side:e.side,depthWrite:e.depthWrite,depthTest:e.depthTest,faces:{}}}function ou(i,e,t={}){let n={},s=/* @__PURE__ */ new Map,r=(c,l,h)=>{let{w:u,h:d}=zt(c,l),f=`${h.min.x},${h.min.y},${h.max.x},${h.max.y}:${u}x${d}`,g=s.get(f);if(!g){g=`t${s.size}`,s.set(f,g);let M={w:u,h:d,color:iu(e,h,u,d)};E.forEach(m=>{let p=t[m];p&&(M[m]=im(iu(p,h,u,d)))}),n[g]=M}c.faces[l]=g},o=[],a=/* @__PURE__ */ new Map;if(i.boxes.forEach(c=>{let l=su(`box`,c);F.forEach(h=>r(l,h,c.uvs[h])),o.push(l),a.set(l,c.shininess??0)}),i.planes.forEach(c=>{let l=su(`plane`,c);r(l,`front`,c.uvs.front),o.push(l),a.set(l,c.shininess??0)}),t.specular||a.forEach((c,l)=>{c>0&&Object.values(l.faces).forEach(h=>{let u=n[h];u.specular=new Uint8ClampedArray(u.w*u.h).fill(Math.round(Math.min(1,c)*255))})}),!t.night){let c=/* @__PURE__ */ new Map,l=0;Object.values(n).forEach(h=>{let u=new Uint8ClampedArray(h.w*h.h);for(let d=0;d<u.length;d++)u[d]=nu(h.color[d*4],h.color[d*4+1],h.color[d*4+2],h.color[d*4+3]),l+=u[d]?1:0;c.set(h,u)}),l>=50&&c.forEach((h,u)=>h.some(d=>d>0)&&(u.night=h))}return{id:i.id,sway:i.sway,bumpScale:i.tex.bumpScale,hitBox:structuredClone(i.hitBox),parts:o,textures:n}}var zi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2};var Vi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3};var Hu=0;var Rc=1;var Wu=2;var zr=1;var Xu=2;var Ys=3;var si=0;var en=1;var xn=2;var ss=0;var qs=1;var Ic=2;var Lc=3;var Oc=4;var Yu=5;var rs=100;var qu=101;var Zu=102;var $u=103;var Ju=104;var Ku=200;var ju=201;var Qu=202;var ep=203;var Dc=204;var Nc=205;var tp=206;var np=207;var ip=208;var sp=209;var rp=210;var op=211;var ap=212;var lp=213;var cp=214;var Yo=0;var qo=1;var Zo=2;var Ds=3;var $o=4;var Jo=5;var Ko=6;var jo=7;var Vr=0;var hp=1;var dp=2;var ri=0;var Fc=1;var Uc=2;var Bc=3;var kc=4;var zc=5;var Vc=6;var Gc=7;var Hc=300;var os=301;var Zs=302;var wa=303;var Ta=304;var Qo=1e3;var ni=1001;var ea=1002;var Ut=1003;var up=1004;var Gr=1005;var un=1006;var Aa=1007;var Ei=1008;var yn=1009;var Wc=1010;var Xc=1011;var $s=1012;var Pa=1013;var Zn=1014;var kn=1015;var $n=1016;var Ra=1017;var Ia=1018;var as=1020;var Yc=35902;var qc=35899;var Zc=1021;var $c=1022;var Jn=1023;var yi=1026;var wi=1027;var La=1028;var Oa=1029;var Gi=1030;var Da=1031;var Na=1033;var Hr=33776;var Wr=33777;var Xr=33778;var Yr=33779;var Fa=35840;var Ua=35841;var Ba=35842;var ka=35843;var za=36196;var Va=37492;var Ga=37496;var Ha=37488;var Wa=37489;var qr=37490;var Xa=37491;var Ya=37808;var qa=37809;var Za=37810;var $a=37811;var Ja=37812;var Ka=37813;var ja=37814;var Qa=37815;var el=37816;var tl=37817;var nl=37818;var il=37819;var sl=37820;var rl=37821;var ol=36492;var al=36494;var ll=36495;var cl=36283;var hl=36284;var Zr=36285;var dl=36286;var mr=2300;var ta=2301;var Ho=2302;var fc=2303;var mc=2400;var _c=2401;var gc=2402;var pp=3200;var $r=0;var fp=1;var Kn=``;var hn=`srgb`;var _r=`srgb-linear`;var gr=`linear`;var mt=`srgb`;var Wo=7680;var mp=519;var _p=512;var gp=513;var xp=514;var Jc=515;var yp=516;var vp=517;var Kc=518;var jc=519;var Qc=35044;var sm=35048;var eh=`300 es`;var Fn=2e3;var Ns=2001;function rm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function om(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Fs(i){return document.createElementNS(`http://www.w3.org/1999/xhtml`,i)}function Mp(){let i=Fs(`canvas`);return i.style.display=`block`,i}var au={};var Us=null;function xr(...i){let e=`THREE.`+i.shift();Us?Us(`log`,e,...i):console.log(e,...i)}function bp(i){let e=i[0];if(typeof e==`string`&&e.startsWith(`TSL:`)){let t=i[1];t&&t.isStackTrace?i[0]+=` `+t.getLocation():i[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return i}function Ge(...i){i=bp(i);let e=`THREE.`+i.shift();if(Us)Us(`warn`,e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ye(...i){i=bp(i);let e=`THREE.`+i.shift();if(Us)Us(`error`,e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function pr(...i){let e=i.join(` `);e in au||(au[e]=!0,Ge(...i))}function Sp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Cp={[Yo]:Yo,[Zo]:Ko,[$o]:$o,[Ds]:Jo,[qo]:qo,[Ko]:Zo,[jo]:jo,[Jo]:Ds};var Xn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}};var sn=[`00`,`01`,`02`,`03`,`04`,`05`,`06`,`07`,`08`,`09`,`0a`,`0b`,`0c`,`0d`,`0e`,`0f`,`10`,`11`,`12`,`13`,`14`,`15`,`16`,`17`,`18`,`19`,`1a`,`1b`,`1c`,`1d`,`1e`,`1f`,`20`,`21`,`22`,`23`,`24`,`25`,`26`,`27`,`28`,`29`,`2a`,`2b`,`2c`,`2d`,`2e`,`2f`,`30`,`31`,`32`,`33`,`34`,`35`,`36`,`37`,`38`,`39`,`3a`,`3b`,`3c`,`3d`,`3e`,`3f`,`40`,`41`,`42`,`43`,`44`,`45`,`46`,`47`,`48`,`49`,`4a`,`4b`,`4c`,`4d`,`4e`,`4f`,`50`,`51`,`52`,`53`,`54`,`55`,`56`,`57`,`58`,`59`,`5a`,`5b`,`5c`,`5d`,`5e`,`5f`,`60`,`61`,`62`,`63`,`64`,`65`,`66`,`67`,`68`,`69`,`6a`,`6b`,`6c`,`6d`,`6e`,`6f`,`70`,`71`,`72`,`73`,`74`,`75`,`76`,`77`,`78`,`79`,`7a`,`7b`,`7c`,`7d`,`7e`,`7f`,`80`,`81`,`82`,`83`,`84`,`85`,`86`,`87`,`88`,`89`,`8a`,`8b`,`8c`,`8d`,`8e`,`8f`,`90`,`91`,`92`,`93`,`94`,`95`,`96`,`97`,`98`,`99`,`9a`,`9b`,`9c`,`9d`,`9e`,`9f`,`a0`,`a1`,`a2`,`a3`,`a4`,`a5`,`a6`,`a7`,`a8`,`a9`,`aa`,`ab`,`ac`,`ad`,`ae`,`af`,`b0`,`b1`,`b2`,`b3`,`b4`,`b5`,`b6`,`b7`,`b8`,`b9`,`ba`,`bb`,`bc`,`bd`,`be`,`bf`,`c0`,`c1`,`c2`,`c3`,`c4`,`c5`,`c6`,`c7`,`c8`,`c9`,`ca`,`cb`,`cc`,`cd`,`ce`,`cf`,`d0`,`d1`,`d2`,`d3`,`d4`,`d5`,`d6`,`d7`,`d8`,`d9`,`da`,`db`,`dc`,`dd`,`de`,`df`,`e0`,`e1`,`e2`,`e3`,`e4`,`e5`,`e6`,`e7`,`e8`,`e9`,`ea`,`eb`,`ec`,`ed`,`ee`,`ef`,`f0`,`f1`,`f2`,`f3`,`f4`,`f5`,`f6`,`f7`,`f8`,`f9`,`fa`,`fb`,`fc`,`fd`,`fe`,`ff`];var lu=1234567;var Ls=Math.PI/180;var Bs=180/Math.PI;function Hi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]+`-`+sn[e&255]+sn[e>>8&255]+`-`+sn[e>>16&15|64]+sn[e>>24&255]+`-`+sn[t&63|128]+sn[t>>8&255]+`-`+sn[t>>16&255]+sn[t>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function it(i,e,t){return Math.max(e,Math.min(t,i))}function th(i,e){return(i%e+e)%e}function am(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function lm(i,e,t){return i!==e?(t-i)/(e-i):0}function fr(i,e,t){return(1-t)*i+t*e}function cm(i,e,t,n){return fr(i,e,1-Math.exp(-t*n))}function hm(i,e=1){return e-Math.abs(th(i,e*2)-e)}function dm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function um(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function pm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function fm(i,e){return i+Math.random()*(e-i)}function mm(i){return i*(.5-Math.random())}function _m(i){i!==void 0&&(lu=i);let e=lu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function gm(i){return i*Ls}function xm(i){return i*Bs}function ym(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function vm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function nh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Mm(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case`XYX`:i.set(a*h,c*u,c*d,a*l);break;case`YZY`:i.set(c*d,a*h,c*u,a*l);break;case`ZXZ`:i.set(c*u,c*d,a*h,a*l);break;case`XZX`:i.set(a*h,c*g,c*f,a*l);break;case`YXY`:i.set(c*f,a*h,c*g,a*l);break;case`ZYZ`:i.set(c*g,c*f,a*h,a*l);break;default:Ge(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+s)}}function ul(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ih(i,e){if(e.constructor===Float32Array)return i;let t=ul(e);if(t===void 0)throw new Error(`THREE.MathUtils: Invalid component type.`);return Math.max(i/t,-1)}function sh(i,e){if(e.constructor===Float32Array)return i;let t=ul(e);if(t===void 0)throw new Error(`THREE.MathUtils: Invalid component type.`);return Math.round(i*t)}var Jr={DEG2RAD:Ls,RAD2DEG:Bs,generateUUID:Hi,clamp:it,euclideanModulo:th,mapLinear:am,inverseLerp:lm,lerp:fr,damp:cm,pingpong:hm,smoothstep:dm,smootherstep:um,randInt:pm,randFloat:fm,randFloatSpread:mm,seededRandom:_m,degToRad:gm,radToDeg:xm,isPowerOfTwo:ym,ceilPowerOfTwo:vm,floorPowerOfTwo:nh,setQuaternionFromProperEuler:Mm,normalize:sh,denormalize:ih};var Ne=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};var wt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],M=r[o+3];if(u!==M||c!==d||l!==f||h!==g){let m=c*d+l*f+h*g+u*M;m<0&&(d=-d,f=-f,g=-g,M=-M,m=-m);let p=1-a;if(m<.9995){let v=Math.acos(m),C=Math.sin(v);p=Math.sin(p*v)/C,a=Math.sin(a*v)/C,c=c*p+d*a,l=l*p+f*a,h=h*p+g*a,u=u*p+M*a}else{c=c*p+d*a,l=l*p+f*a,h=h*p+g*a,u=u*p+M*a;let v=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=v,l*=v,h*=v,u*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-a*f,e[t+2]=l*g+h*f+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case`XYZ`:this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case`YXZ`:this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case`ZXY`:this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case`ZYX`:this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case`YZX`:this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case`XZY`:this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:Ge(`Quaternion: .setFromEuler() encountered an unknown order: `+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};var L=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xl.copy(this).projectOnVector(e),this.sub(Xl)}reflect(e){return this.sub(Xl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};var Xl=new L;var cu=new wt;var $e=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],M=s[0],m=s[3],p=s[6],v=s[1],C=s[4],S=s[7],T=s[2],w=s[5],_=s[8];return r[0]=o*M+a*v+c*T,r[3]=o*m+a*C+c*w,r[6]=o*p+a*S+c*_,r[1]=l*M+h*v+u*T,r[4]=l*m+h*C+u*w,r[7]=l*p+h*S+u*_,r[2]=d*M+f*v+g*T,r[5]=d*m+f*C+g*w,r[8]=d*p+f*S+g*_,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/g;return e[0]=u*M,e[1]=(s*l-h*n)*M,e[2]=(a*n-s*o)*M,e[3]=d*M,e[4]=(h*t-s*c)*M,e[5]=(s*r-a*t)*M,e[6]=f*M,e[7]=(n*c-l*t)*M,e[8]=(o*t-n*r)*M,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return pr(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Yl.makeScale(e,t)),this}rotate(e){return pr(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Yl.makeRotation(-e)),this}translate(e,t){return pr(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Yl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};var Yl=new $e;var hu=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322);var du=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bm(){let i={enabled:!0,workingColorSpace:_r,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===mt&&(s.r=xi(s.r),s.g=xi(s.g),s.b=xi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===mt&&(s.r=Os(s.r),s.g=Os(s.g),s.b=Os(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===``?gr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[_r]:{primaries:e,whitePoint:n,transfer:gr,toXYZ:hu,fromXYZ:du,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:hu,fromXYZ:du,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}var at=bm();function xi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Os(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ps;var na=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ps===void 0&&(ps=Fs(`canvas`)),ps.width=e.width,ps.height=e.height;let s=ps.getContext(`2d`);e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ps}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Fs(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=xi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(xi(t[n]/255)*255):t[n]=xi(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}};var Sm=0;var ks=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=Hi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ql(s[o].image)):r.push(ql(s[o]))}else r=ql(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ql(i){return typeof HTMLImageElement<`u`&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&i instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&i instanceof ImageBitmap?na.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge(`Texture: Unable to serialize Texture.`),{})}var Cm=0;var Zl=new L;var on=class i extends Xn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=ni,s=ni,r=un,o=Ei,a=Jn,c=yn,l=i.DEFAULT_ANISOTROPY,h=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=Hi(),this.name=``,this.source=new ks(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Zl).x}get height(){return this.source.getSize(Zl).y}get depth(){return this.source.getSize(Zl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==Hc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qo:e.x=e.x-Math.floor(e.x);break;case ni:e.x=e.x<0?0:1;break;case ea:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Qo:e.y=e.y-Math.floor(e.y);break;case ni:e.y=e.y<0?0:1;break;case ea:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=Hc;on.DEFAULT_ANISOTROPY=1;var Tt=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],M=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+M)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let C=(l+1)/2,S=(f+1)/2,T=(p+1)/2,w=(h+d)/4,_=(u+M)/4,b=(g+m)/4;return C>S&&C>T?C<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(C),s=w/n,r=_/n):S>T?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=w/s,r=b/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=_/r,s=b/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(u-M)*(u-M)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-M)/v,this.z=(d-h)/v,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var ia=class extends Xn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new on({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:un,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ks(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}};var wn=class extends ia{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}};var yr=class extends on{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=/* @__PURE__ */ new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var sa=class extends on{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var dt=class i{static{this.prototype.isMatrix4=!0}constructor(e,t,n,s,r,o,a,c,l,h,u,d,f,g,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,f,g,M,m)}set(e,t,n,s,r,o,a,c,l,h,u,d,f,g,M,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/fs.setFromMatrixColumn(e,0).length(),r=1/fs.setFromMatrixColumn(e,1).length(),o=1/fs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order===`XYZ`){let d=o*h,f=o*u,g=a*h,M=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-M*l,t[9]=-a*c,t[2]=M-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order===`YXZ`){let d=c*h,f=c*u,g=l*h,M=l*u;t[0]=d+M*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=M+d*a,t[10]=o*c}else if(e.order===`ZXY`){let d=c*h,f=c*u,g=l*h,M=l*u;t[0]=d-M*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=M-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order===`ZYX`){let d=o*h,f=o*u,g=a*h,M=a*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+M,t[1]=c*u,t[5]=M*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order===`YZX`){let d=o*c,f=o*l,g=a*c,M=a*l;t[0]=c*h,t[4]=M-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-M*u}else if(e.order===`XZY`){let d=o*c,f=o*l,g=a*c,M=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+M,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=M*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Em,e,wm)}lookAt(e,t,n){let s=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Pi.crossVectors(n,bn),Pi.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Pi.crossVectors(n,bn)),Pi.normalize(),fo.crossVectors(bn,Pi),s[0]=Pi.x,s[4]=fo.x,s[8]=bn.x,s[1]=Pi.y,s[5]=fo.y,s[9]=bn.y,s[2]=Pi.z,s[6]=fo.z,s[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],M=n[6],m=n[10],p=n[14],v=n[3],C=n[7],S=n[11],T=n[15],w=s[0],_=s[4],b=s[8],F=s[12],O=s[1],U=s[5],z=s[9],$=s[13],D=s[2],X=s[6],j=s[10],V=s[14],le=s[3],Y=s[7],oe=s[11],ae=s[15];return r[0]=o*w+a*O+c*D+l*le,r[4]=o*_+a*U+c*X+l*Y,r[8]=o*b+a*z+c*j+l*oe,r[12]=o*F+a*$+c*V+l*ae,r[1]=h*w+u*O+d*D+f*le,r[5]=h*_+u*U+d*X+f*Y,r[9]=h*b+u*z+d*j+f*oe,r[13]=h*F+u*$+d*V+f*ae,r[2]=g*w+M*O+m*D+p*le,r[6]=g*_+M*U+m*X+p*Y,r[10]=g*b+M*z+m*j+p*oe,r[14]=g*F+M*$+m*V+p*ae,r[3]=v*w+C*O+S*D+T*le,r[7]=v*_+C*U+S*X+T*Y,r[11]=v*b+C*z+S*j+T*oe,r[15]=v*F+C*$+S*V+T*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],M=e[7],m=e[11],p=e[15],v=c*f-l*d,C=a*f-l*u,S=a*d-c*u,T=o*f-l*h,w=o*d-c*h,_=o*u-a*h;return t*(M*v-m*C+p*S)-n*(g*v-m*T+p*w)+s*(g*C-M*T+p*_)-r*(g*S-M*w+m*_)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],M=e[13],m=e[14],p=e[15],v=t*a-n*o,C=t*c-s*o,S=t*l-r*o,T=n*c-s*a,w=n*l-r*a,_=s*l-r*c,b=h*M-u*g,F=h*m-d*g,O=h*p-f*g,U=u*m-d*M,z=u*p-f*M,$=d*p-f*m,D=v*$-C*z+S*U+T*O-w*F+_*b;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let X=1/D;return e[0]=(a*$-c*z+l*U)*X,e[1]=(s*z-n*$-r*U)*X,e[2]=(M*_-m*w+p*T)*X,e[3]=(d*w-u*_-f*T)*X,e[4]=(c*O-o*$-l*F)*X,e[5]=(t*$-s*O+r*F)*X,e[6]=(m*S-g*_-p*C)*X,e[7]=(h*_-d*S+f*C)*X,e[8]=(o*z-a*O+l*b)*X,e[9]=(n*O-t*z-r*b)*X,e[10]=(g*w-M*S+p*v)*X,e[11]=(u*S-h*w-f*v)*X,e[12]=(a*F-o*U-c*b)*X,e[13]=(t*U-n*F+s*b)*X,e[14]=(M*C-g*T-m*v)*X,e[15]=(h*T-u*C+d*v)*X,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,M=o*h,m=o*u,p=a*u,v=c*l,C=c*h,S=c*u,T=n.x,w=n.y,_=n.z;return s[0]=(1-(M+p))*T,s[1]=(f+S)*T,s[2]=(g-C)*T,s[3]=0,s[4]=(f-S)*w,s[5]=(1-(d+p))*w,s[6]=(m+v)*w,s[7]=0,s[8]=(g+C)*_,s[9]=(m-v)*_,s[10]=(1-(d+M))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=fs.set(s[0],s[1],s[2]).length(),a=fs.set(s[4],s[5],s[6]).length(),c=fs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Gn.copy(this);let l=1/o,h=1/a,u=1/c;return Gn.elements[0]*=l,Gn.elements[1]*=l,Gn.elements[2]*=l,Gn.elements[4]*=h,Gn.elements[5]*=h,Gn.elements[6]*=h,Gn.elements[8]*=u,Gn.elements[9]*=u,Gn.elements[10]*=u,t.setFromRotationMatrix(Gn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,s,r,o,a=Fn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),g,M;if(c)g=r/(o-r),M=o*r/(o-r);else if(a===Fn)g=-(o+r)/(o-r),M=-2*o*r/(o-r);else if(a===Ns)g=-o/(o-r),M=-o*r/(o-r);else throw new Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Fn,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s),g,M;if(c)g=1/(o-r),M=o/(o-r);else if(a===Fn)g=-2/(o-r),M=-(o+r)/(o-r);else if(a===Ns)g=-1/(o-r),M=-r/(o-r);else throw new Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};var fs=new L;var Gn=new dt;var Em=new L(0,0,0);var wm=new L(1,1,1);var Pi=new L;var fo=new L;var bn=new L;var uu=new dt;var pu=new wt;var Un=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case`XYZ`:this._y=Math.asin(it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case`YXZ`:this._x=Math.asin(-it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case`ZXY`:this._x=Math.asin(it(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case`ZYX`:this._y=Math.asin(-it(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case`YZX`:this._z=Math.asin(it(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case`XZY`:this._z=Math.asin(-it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ge(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return uu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pu.setFromEuler(this),this.setFromQuaternion(pu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Un.DEFAULT_ORDER=`XYZ`;var zs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}};var Tm=0;var fu=new L;var ms=new wt;var ui=new dt;var mo=new L;var ir=new L;var Am=new L;var Pm=new wt;var mu=new L(1,0,0);var _u=new L(0,1,0);var gu=new L(0,0,1);var xu={type:`added`};var Rm={type:`removed`};var _s={type:`childadded`,child:null};var $l={type:`childremoved`,child:null};var Nt=class i extends Xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Hi(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new Un,n=new wt,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new dt},normalMatrix:{value:new $e}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.multiply(ms),this}rotateOnWorldAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.premultiply(ms),this}rotateX(e){return this.rotateOnAxis(mu,e)}rotateY(e){return this.rotateOnAxis(_u,e)}rotateZ(e){return this.rotateOnAxis(gu,e)}translateOnAxis(e,t){return fu.copy(e).applyQuaternion(this.quaternion),this.position.add(fu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(mu,e)}translateY(e){return this.translateOnAxis(_u,e)}translateZ(e){return this.translateOnAxis(gu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?mo.copy(e):mo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(ir,mo,this.up):ui.lookAt(mo,ir,this.up),this.quaternion.setFromRotationMatrix(ui),s&&(ui.extractRotation(s.matrixWorld),ms.setFromRotationMatrix(ui),this.quaternion.premultiply(ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xu),_s.child=e,this.dispatchEvent(_s),_s.child=null):Ye(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rm),$l.child=e,this.dispatchEvent($l),$l.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xu),_s.child=e,this.dispatchEvent(_s),_s.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,e,Am),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,Pm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type=`InstancedMesh`,s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type=`BatchedMesh`,s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>m(l({},a),{boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>l({},a)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Nt.DEFAULT_UP=new L(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gi=class extends Nt{constructor(){super(),this.isGroup=!0,this.type=`Group`}};var Im={type:`move`};var Vs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(l&&e.hand){o=!0;for(let M of e.hand.values()){let m=t.getJointPose(M,n),p=this._getHandJoint(l,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints[`index-finger-tip`],u=l.joints[`thumb-tip`],d=h.position.distanceTo(u.position);l.inputState.pinching&&d>.025?(l.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=.015&&(l.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:`gripUpdated`,data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Im)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new gi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Ep={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};var Ri={h:0,s:0,l:0};var _o={h:0,s:0,l:0};function Jl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s==`number`?this.setHex(s):typeof s==`string`&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=at.workingColorSpace){if(e=th(e,1),t=it(t,0,1),n=it(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Jl(o,r,e+1/3),this.g=Jl(o,r,e),this.b=Jl(o,r,e-1/3)}return at.colorSpaceToWorking(this,s),this}setStyle(e,t=hn){function n(r){r!==void 0&&parseFloat(r)<1&&Ge(`Color: Alpha component of `+e+` will be ignored.`)}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case`rgb`:case`rgba`:if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case`hsl`:case`hsla`:if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ge(`Color: Unknown color model `+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ge(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){let n=Ep[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge(`Color: Unknown color `+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xi(e.r),this.g=xi(e.g),this.b=xi(e.b),this}copyLinearToSRGB(e){return this.r=Os(e.r),this.g=Os(e.g),this.b=Os(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return at.workingToColorSpace(rn.copy(this),e),Math.round(it(rn.r*255,0,255))*65536+Math.round(it(rn.g*255,0,255))*256+Math.round(it(rn.b*255,0,255))}getHexString(e=hn){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(rn.copy(this),t);let n=rn.r,s=rn.g,r=rn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=hn){at.workingToColorSpace(rn.copy(this),e);let t=rn.r,n=rn.g,s=rn.b;return e!==`srgb`?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ri),this.setHSL(Ri.h+e,Ri.s+t,Ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ri),e.getHSL(_o);let n=fr(Ri.h,_o.h,t),s=fr(Ri.s,_o.s,t),r=fr(Ri.l,_o.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};var rn=new qe;qe.NAMES=Ep;var xc=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new qe(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}};var vr=class extends Nt{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Hn=new L;var pi=new L;var Kl=new L;var fi=new L;var gs=new L;var xs=new L;var yu=new L;var jl=new L;var Ql=new L;var ec=new L;var tc=new Tt;var nc=new Tt;var ic=new Tt;var ti=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Hn.subVectors(e,t),s.cross(Hn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Hn.subVectors(s,t),pi.subVectors(n,t),Kl.subVectors(e,t);let o=Hn.dot(Hn),a=Hn.dot(pi),c=Hn.dot(Kl),l=pi.dot(pi),h=pi.dot(Kl),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,fi)===null?(c.x=0,c.y=0,`z`in c&&(c.z=0),`w`in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,fi.x),c.addScaledVector(o,fi.y),c.addScaledVector(a,fi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return tc.setScalar(0),nc.setScalar(0),ic.setScalar(0),tc.fromBufferAttribute(e,t),nc.fromBufferAttribute(e,n),ic.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(tc,r.x),o.addScaledVector(nc,r.y),o.addScaledVector(ic,r.z),o}static isFrontFacing(e,t,n,s){return Hn.subVectors(n,t),pi.subVectors(e,t),Hn.cross(pi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Hn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Hn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;gs.subVectors(s,n),xs.subVectors(r,n),jl.subVectors(e,n);let c=gs.dot(jl),l=xs.dot(jl);if(c<=0&&l<=0)return t.copy(n);Ql.subVectors(e,s);let h=gs.dot(Ql),u=xs.dot(Ql);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0&&c-h>0)return o=c/(c-h),t.copy(n).addScaledVector(gs,o);ec.subVectors(e,r);let f=gs.dot(ec),g=xs.dot(ec);if(g>=0&&f<=g)return t.copy(r);let M=f*l-c*g;if(M<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(xs,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return yu.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(yu,a);let p=1/(m+M+d);return o=M*p,a=d*p,t.copy(n).addScaledVector(gs,o).addScaledVector(xs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};var Bn=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Wn):Wn.fromBufferAttribute(r,o),Wn.applyMatrix4(e.matrixWorld),this.expandByPoint(Wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),go.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),go.copy(n.boundingBox)),go.applyMatrix4(e.matrixWorld),this.union(go)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wn),Wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sr),xo.subVectors(this.max,sr),ys.subVectors(e.a,sr),vs.subVectors(e.b,sr),Ms.subVectors(e.c,sr),Ii.subVectors(vs,ys),Li.subVectors(Ms,vs),Ki.subVectors(ys,Ms);let t=[0,-Ii.z,Ii.y,0,-Li.z,Li.y,0,-Ki.z,Ki.y,Ii.z,0,-Ii.x,Li.z,0,-Li.x,Ki.z,0,-Ki.x,-Ii.y,Ii.x,0,-Li.y,Li.x,0,-Ki.y,Ki.x,0];return!sc(t,ys,vs,Ms,xo)||(t=[1,0,0,0,1,0,0,0,1],!sc(t,ys,vs,Ms,xo))?!1:(yo.crossVectors(Ii,Li),t=[yo.x,yo.y,yo.z],sc(t,ys,vs,Ms,xo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}};var mi=[new L,new L,new L,new L,new L,new L,new L,new L];var Wn=new L;var go=new Bn;var ys=new L;var vs=new L;var Ms=new L;var Ii=new L;var Li=new L;var Ki=new L;var sr=new L;var xo=new L;var yo=new L;var ji=new L;function sc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ji.fromArray(i,r);let a=s.x*Math.abs(ji.x)+s.y*Math.abs(ji.y)+s.z*Math.abs(ji.z),c=e.dot(ji),l=t.dot(ji),h=n.dot(ji);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Vt=new L;var vo=new Ne;var Lm=0;var En=class extends Xn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lm++}),this.name=``,this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Qc,this.updateRanges=[],this.gpuType=kn,this.version=0,this._normalizationScale=e!==void 0?ul(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)vo.fromBufferAttribute(this,t),vo.applyMatrix3(e),this.setXY(t,vo.x,vo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):ih(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):sh(e,this.array)}};var Mr=class extends En{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var br=class extends En{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var lt=class extends En{constructor(e,t,n){super(new Float32Array(e),t,n)}};var Om=new Bn;var rr=new L;var rc=new L;var vi=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Om.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rr.subVectors(e,this.center);let t=rr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(rr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(rc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rr.copy(e.center).add(rc)),this.expandByPoint(rr.copy(e.center).sub(rc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}};var Dm=0;var Nn=new dt;var oc=new Nt;var bs=new L;var Sn=new Bn;var or=new Bn;var Jt=new L;var Dt=class i extends Xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=Hi(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rm(e)?br:Mr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $e().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,t,n){return Nn.makeTranslation(e,t,n),this.applyMatrix4(Nn),this}scale(e,t,n){return Nn.makeScale(e,t,n),this.applyMatrix4(Nn),this}lookAt(e){return oc.lookAt(e),oc.updateMatrix(),this.applyMatrix4(oc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute(`position`,new lt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ge(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];or.setFromBufferAttribute(a),this.morphTargetsRelative?(Jt.addVectors(Sn.min,or.min),Sn.expandByPoint(Jt),Jt.addVectors(Sn.max,or.max),Sn.expandByPoint(Jt)):(Sn.expandByPoint(or.min),Sn.expandByPoint(or.max))}Sn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Jt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Jt.fromBufferAttribute(a,l),c&&(bs.fromBufferAttribute(e,l),Jt.add(bs)),s=Math.max(s,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute(`tangent`);(o===void 0||o.count!==n.count)&&(o=new En(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,o));let a=[],c=[],l=new Uint8Array(n.count);for(let F=0;F<n.count;F++)a[F]=new L,c[F]=new L;let h=new L,u=new L,d=new L,f=new Ne,g=new Ne,M=new Ne,m=new L,p=new L;function v(F,O,U){l[F]=l[O]=l[U]=1,h.fromBufferAttribute(n,F),u.fromBufferAttribute(n,O),d.fromBufferAttribute(n,U),f.fromBufferAttribute(r,F),g.fromBufferAttribute(r,O),M.fromBufferAttribute(r,U),u.sub(h),d.sub(h),g.sub(f),M.sub(f);let z=1/(g.x*M.y-M.x*g.y);isFinite(z)&&(m.copy(u).multiplyScalar(M.y).addScaledVector(d,-g.y).multiplyScalar(z),p.copy(d).multiplyScalar(g.x).addScaledVector(u,-M.x).multiplyScalar(z),a[F].add(m),a[O].add(m),a[U].add(m),c[F].add(p),c[O].add(p),c[U].add(p))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let F=0,O=C.length;F<O;++F){let U=C[F],z=U.start,$=U.count;for(let D=z,X=z+$;D<X;D+=3)v(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let S=new L,T=new L,w=new L,_=new L;function b(F){w.fromBufferAttribute(s,F),_.copy(w);let O=a[F];S.copy(O),S.sub(w.multiplyScalar(w.dot(O))).normalize(),T.crossVectors(_,O);let z=T.dot(c[F])<0?-1:1;o.setXYZW(F,S.x,S.y,S.z,z)}for(let F=0,O=n.count;F<O;++F)l[F]&&b(F);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new En(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),M=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,M),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let M=0,m=c.length;M<m;M++){a.isInterleavedBufferAttribute?f=c[M]*a.data.stride+a.offset:f=c[M]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new En(d,h,u)}if(this.index===null)return Ge(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}};var ra=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Qc,this.updateRanges=[],this.version=0,this.uuid=Hi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=vu(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=vu(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function vu(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=Hi()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+`:`+i.byteOffset+`:`+i.byteLength}var cn=new L;var Sr=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?ul(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix4(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyNormalMatrix(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.transformDirection(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){xr(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new En(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){xr(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):ih(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):sh(e,this.data.array)}};var ac=new L;var Nm=new L;var Fm=new $e;var Cn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=ac.subVectors(n,t).cross(Nm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(ac),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Fm.getNormalMatrix(e),s=this.coplanarPoint(ac).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}};var Um=0;var Yn=class extends Xn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=Hi(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Dc,this.blendDst=Nc,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wo,this.stencilZFail=Wo,this.stencilZPass=Wo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Cn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors==`number`?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ne().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ne().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}};var oa=class extends Yn{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}};var Ss;var ar=new L;var Cs=new L;var Es=new L;var ws=new Ne;var lr=new Ne;var wp=new dt;var Mo=new L;var cr=new L;var bo=new L;var Mu=new Ne;var lc=new Ne;var bu=new Ne;var yc=class extends Nt{constructor(e=new oa){if(super(),this.isSprite=!0,this.type=`Sprite`,Ss===void 0){Ss=new Dt;let n=new ra(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Ss.setIndex([0,1,2,0,2,3]),Ss.setAttribute(`position`,new Sr(n,3,0,!1)),Ss.setAttribute(`uv`,new Sr(n,2,3,!1))}this.geometry=Ss,this.material=e,this.center=new Ne(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Ye(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Cs.setFromMatrixScale(this.matrixWorld),wp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Es.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Cs.multiplyScalar(-Es.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;So(Mo.set(-.5,-.5,0),Es,o,Cs,s,r),So(cr.set(.5,-.5,0),Es,o,Cs,s,r),So(bo.set(.5,.5,0),Es,o,Cs,s,r),Mu.set(0,0),lc.set(1,0),bu.set(1,1);let a=e.ray.intersectTriangle(Mo,cr,bo,!1,ar);if(a===null&&(So(cr.set(-.5,.5,0),Es,o,Cs,s,r),lc.set(0,1),a=e.ray.intersectTriangle(Mo,bo,cr,!1,ar),a===null))return;let c=e.ray.origin.distanceTo(ar);c<e.near||c>e.far||t.push({distance:c,point:ar.clone(),uv:ti.getInterpolation(ar,Mo,cr,bo,Mu,lc,bu,new Ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function So(i,e,t,n,s,r){ws.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(lr.x=r*ws.x-s*ws.y,lr.y=s*ws.x+r*ws.y):lr.copy(ws),i.copy(e),i.x+=lr.x,i.y+=lr.y,i.applyMatrix4(wp)}var _i=new L;var cc=new L;var Co=new L;var Eo=new L;var Di=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){cc.copy(e).add(t).multiplyScalar(.5),Co.copy(t).sub(e).normalize(),Eo.copy(this.origin).sub(cc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Co),a=Eo.dot(this.direction),c=-Eo.dot(Co),l=Eo.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let M=1/h;u*=M,d*=M,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(cc).addScaledVector(Co,d),f}intersectSphere(e,t){if(e.radius<0)return null;_i.subVectors(e.center,this.origin);let n=_i.dot(this.direction),s=_i.dot(_i)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,u=e.x-o.x,d=e.y-o.y,f=e.z-o.z,g=t.x-o.x,M=t.y-o.y,m=t.z-o.z,p=n.x-o.x,v=n.y-o.y,C=n.z-o.z,S=Math.abs(c),T=Math.abs(l),w=Math.abs(h),_,b,F,O,U,z,$,D,X,j,V,le;if(S>=T&&S>=w?(F=c,z=u,X=g,le=p,c>=0?(_=l,b=h,O=d,U=f,$=M,D=m,j=v,V=C):(_=h,b=l,O=f,U=d,$=m,D=M,j=C,V=v)):T>=w?(F=l,z=d,X=M,le=v,l>=0?(_=h,b=c,O=f,U=u,$=m,D=g,j=C,V=p):(_=c,b=h,O=u,U=f,$=g,D=m,j=p,V=C)):(F=h,z=f,X=m,le=C,h>=0?(_=c,b=l,O=u,U=d,$=g,D=M,j=p,V=v):(_=l,b=c,O=d,U=u,$=M,D=g,j=v,V=p)),F===0)return null;let Y=_/F,oe=b/F,ae=1/F,Ae=O-Y*z,Ze=U-oe*z,te=$-Y*X,Ee=D-oe*X,Re=j-Y*le,He=V-oe*le,we=Re*Ee-He*te,je=Ae*He-Ze*Re,Bt=te*Ze-Ee*Ae;if(s){if(we<0||je<0||Bt<0)return null}else if((we<0||je<0||Bt<0)&&(we>0||je>0||Bt>0))return null;let Xe=we+je+Bt;if(Xe===0)return null;let _t=ae*(we*z+je*X+Bt*le);return(Xe>0?_t<0:_t>0)?null:this.at(_t/Xe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};var Mi=class extends Yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Vr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Su=new dt;var Qi=new Di;var wo=new vi;var Cu=new L;var To=new L;var Ao=new L;var Po=new L;var hc=new L;var Ro=new L;var Eu=new L;var Io=new L;var Se=class extends Nt{constructor(e=new Dt,t=new Mi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Ro.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(hc.fromBufferAttribute(u,e),o?Ro.addScaledVector(hc,h):Ro.addScaledVector(hc.sub(t),h))}t.add(Ro)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wo.copy(n.boundingSphere),wo.applyMatrix4(r),Qi.copy(e.ray).recast(e.near),!(wo.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(wo,Cu)===null||Qi.origin.distanceToSquared(Cu)>(e.far-e.near)**2))&&(Su.copy(r).invert(),Qi.copy(e.ray).applyMatrix4(Su),(n.boundingBox===null||Qi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Qi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,M=d.length;g<M;g++){let m=d[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),C=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let S=v,T=C;S<T;S+=3){let w=a.getX(S),_=a.getX(S+1),b=a.getX(S+2);s=Lo(this,p,e,n,l,h,u,w,_,b),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),M=Math.min(a.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){let v=a.getX(m),C=a.getX(m+1),S=a.getX(m+2);s=Lo(this,o,e,n,l,h,u,v,C,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,M=d.length;g<M;g++){let m=d[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),C=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let S=v,T=C;S<T;S+=3){let w=S,_=S+1,b=S+2;s=Lo(this,p,e,n,l,h,u,w,_,b),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),M=Math.min(c.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){let v=m,C=m+1,S=m+2;s=Lo(this,o,e,n,l,h,u,v,C,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Bm(i,e,t,n,s,r,o,a){let c;if(e.side===1?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===0,a),c===null)return null;Io.copy(a),Io.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Io);return l<t.near||l>t.far?null:{distance:l,point:Io.clone(),object:i}}function Lo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,To),i.getVertexPosition(c,Ao),i.getVertexPosition(l,Po);let h=Bm(i,e,t,n,To,Ao,Po,Eu);if(h){let u=new L;ti.getBarycoord(Eu,To,Ao,Po,u),s&&(h.uv=ti.getInterpolatedAttribute(s,a,c,l,u,new Ne)),r&&(h.uv1=ti.getInterpolatedAttribute(r,a,c,l,u,new Ne)),o&&(h.normal=ti.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new L,materialIndex:0};ti.getNormal(To,Ao,Po,d.normal),h.face=d,h.barycoord=u}return h}var Cr=class extends on{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Ut,h=Ut,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Er=class extends En{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}};var Ts=new dt;var wu=new dt;var Oo=[];var Tu=new Bn;var km=new dt;var hr=new Se;var dr=new vi;var vc=class extends Se{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Er(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,km)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Bn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ts),Tu.copy(e.boundingBox).applyMatrix4(Ts),this.boundingBox.union(Tu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ts),dr.copy(e.boundingSphere).applyMatrix4(Ts),this.boundingSphere.union(dr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,o=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(hr.geometry=this.geometry,hr.material=this.material,hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),dr.copy(this.boundingSphere),dr.applyMatrix4(n),e.ray.intersectsSphere(dr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ts),wu.multiplyMatrices(n,Ts),hr.matrixWorld=wu,hr.raycast(e,Oo);for(let o=0,a=Oo.length;o<a;o++){let c=Oo[o];c.instanceId=r,c.object=this,t.push(c)}Oo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Er(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Cr(new Float32Array(s*this.count),s,this.count,La,kn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}};var es=new vi;var zm=new Ne(.5,.5);var Do=new L;var Ni=class{constructor(e=new Cn,t=new Cn,n=new Cn,s=new Cn,r=new Cn,o=new Cn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],M=r[9],m=r[10],p=r[11],v=r[12],C=r[13],S=r[14],T=r[15];if(s[0].setComponents(l-o,f-h,p-g,T-v).normalize(),s[1].setComponents(l+o,f+h,p+g,T+v).normalize(),s[2].setComponents(l+a,f+u,p+M,T+C).normalize(),s[3].setComponents(l-a,f-u,p-M,T-C).normalize(),n)s[4].setComponents(c,d,m,S).normalize(),s[5].setComponents(l-c,f-d,p-m,T-S).normalize();else if(s[4].setComponents(l-c,f-d,p-m,T-S).normalize(),t===Fn)s[5].setComponents(l+c,f+d,p+m,T+S).normalize();else if(t===Ns)s[5].setComponents(c,d,m,S).normalize();else throw new Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(e){es.center.set(0,0,0);return es.radius=.7071067811865476+zm.distanceTo(e.center),es.applyMatrix4(e.matrixWorld),this.intersectsSphere(es)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Do.x=s.normal.x>0?e.max.x:e.min.x,Do.y=s.normal.y>0?e.max.y:e.min.y,Do.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Do)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Au=new dt;var aa=class i{constructor(){this.coordinateSystem=Fn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Au.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Ni),n[s].setFromProjectionMatrix(Au,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Ni),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var qn=class extends Yn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}};var la=new L;var ca=new L;var Pu=new dt;var ur=new Di;var No=new vi;var dc=new L;var Ru=new L;var gn=class extends Nt{constructor(e=new Dt,t=new qn){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)la.fromBufferAttribute(t,s-1),ca.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=la.distanceTo(ca);e.setAttribute(`lineDistance`,new lt(n,1))}else Ge(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(s),No.radius+=r,e.ray.intersectsSphere(No)===!1)return;Pu.copy(s).invert(),ur.copy(e.ray).applyMatrix4(Pu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let M=f,m=g-1;M<m;M+=l){let p=h.getX(M),v=h.getX(M+1),C=Fo(this,e,ur,c,p,v,M);C&&t.push(C)}if(this.isLineLoop){let M=h.getX(g-1),m=h.getX(f),p=Fo(this,e,ur,c,M,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let M=f,m=g-1;M<m;M+=l){let p=Fo(this,e,ur,c,M,M+1,M);p&&t.push(p)}if(this.isLineLoop){let M=Fo(this,e,ur,c,g-1,f,g-1);M&&t.push(M)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Fo(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(la.fromBufferAttribute(a,s),ca.fromBufferAttribute(a,r),t.distanceSqToSegment(la,ca,dc,Ru)>n)return;dc.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(dc);if(!(l<e.near||l>e.far))return{distance:l,point:Ru.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Iu=new L;var Lu=new L;var ts=class extends gn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Iu.fromBufferAttribute(t,s),Lu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Iu.distanceTo(Lu);e.setAttribute(`lineDistance`,new lt(n,1))}else Ge(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}};var wr=class extends gn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}};var Tr=class extends on{constructor(e=[],t=os,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Ar=class extends on{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var bi=class extends on{constructor(e,t,n=Zn,s,r,o,a=Ut,c=Ut,l,h=yi,u=1){if(h!==yi&&h!==wi)throw new Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ks(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}};var Pr=class extends bi{constructor(e,t=Zn,n=os,s,r,o=Ut,a=Ut,c,l=yi){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}};var Rr=class extends on{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var At=class i extends Dt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g(`z`,`y`,`x`,-1,-1,n,t,e,o,r,0),g(`z`,`y`,`x`,1,-1,n,t,-e,o,r,1),g(`x`,`z`,`y`,1,1,e,n,t,s,o,2),g(`x`,`z`,`y`,1,-1,e,n,-t,s,o,3),g(`x`,`y`,`z`,1,-1,e,t,n,s,r,4),g(`x`,`y`,`z`,-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute(`position`,new lt(l,3)),this.setAttribute(`normal`,new lt(h,3)),this.setAttribute(`uv`,new lt(u,2));function g(M,m,p,v,C,S,T,w,_,b,F){let O=S/_,U=T/b,z=S/2,$=T/2,D=w/2,X=_+1,j=b+1,V=0,le=0,Y=new L;for(let oe=0;oe<j;oe++){let ae=oe*U-$;for(let Ae=0;Ae<X;Ae++)Y[M]=(Ae*O-z)*v,Y[m]=ae*C,Y[p]=D,l.push(Y.x,Y.y,Y.z),Y[M]=0,Y[m]=0,Y[p]=w>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(Ae/_),u.push(1-oe/b),V+=1}for(let oe=0;oe<b;oe++)for(let ae=0;ae<_;ae++){let Ae=d+ae+X*oe,Ze=d+ae+X*(oe+1),te=d+(ae+1)+X*(oe+1),Ee=d+(ae+1)+X*oe;c.push(Ae,Ze,Ee),c.push(Ze,te,Ee),le+=6}a.addGroup(f,le,F),f+=le,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Kt=class i extends Dt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,M=[],m=n/2,p=0;v(),o===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(h),this.setAttribute(`position`,new lt(u,3)),this.setAttribute(`normal`,new lt(d,3)),this.setAttribute(`uv`,new lt(f,2));function v(){let S=new L,T=new L,w=0,_=(t-e)/n;for(let b=0;b<=r;b++){let F=[],O=b/r,U=O*(t-e)+e;for(let z=0;z<=s;z++){let $=z/s,D=$*c+a,X=Math.sin(D),j=Math.cos(D);T.x=U*X,T.y=-O*n+m,T.z=U*j,u.push(T.x,T.y,T.z),S.set(X,_,j).normalize(),d.push(S.x,S.y,S.z),f.push($,1-O),F.push(g++)}M.push(F)}for(let b=0;b<s;b++)for(let F=0;F<r;F++){let O=M[F][b],U=M[F+1][b],z=M[F+1][b+1],$=M[F][b+1];(e>0||F!==0)&&(h.push(O,U,$),w+=3),(t>0||F!==r-1)&&(h.push(U,z,$),w+=3)}l.addGroup(p,w,0),p+=w}function C(S){let T=g,w=new Ne,_=new L,b=0,F=S===!0?e:t,O=S===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,m*O,0),d.push(0,O,0),f.push(.5,.5),g++;let U=g;for(let z=0;z<=s;z++){let D=z/s*c+a,X=Math.cos(D),j=Math.sin(D);_.x=F*j,_.y=m*O,_.z=F*X,u.push(_.x,_.y,_.z),d.push(0,O,0),w.x=X*.5+.5,w.y=j*.5*O+.5,f.push(w.x,w.y),g++}for(let z=0;z<s;z++){let $=T+z,D=U+z;S===!0?h.push(D,D+1,$):h.push(D+1,D,$),b+=3}l.addGroup(p,b,S===!0?1:2),p+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var ha=class i extends Dt{constructor(e=[],t=[],n=1,s=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute(`position`,new lt(r,3)),this.setAttribute(`normal`,new lt(r.slice(),3)),this.setAttribute(`uv`,new lt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let C=new L,S=new L,T=new L;for(let w=0;w<t.length;w+=3)f(t[w+0],C),f(t[w+1],S),f(t[w+2],T),c(C,S,T,v)}function c(v,C,S,T){let w=T+1,_=[];for(let b=0;b<=w;b++){_[b]=[];let F=v.clone().lerp(S,b/w),O=C.clone().lerp(S,b/w),U=w-b;for(let z=0;z<=U;z++)z===0&&b===w?_[b][z]=F:_[b][z]=F.clone().lerp(O,z/U)}for(let b=0;b<w;b++)for(let F=0;F<2*(w-b)-1;F++){let O=Math.floor(F/2);F%2===0?(d(_[b][O+1]),d(_[b+1][O]),d(_[b][O])):(d(_[b][O+1]),d(_[b+1][O+1]),d(_[b+1][O]))}}function l(v){let C=new L;for(let S=0;S<r.length;S+=3)C.x=r[S+0],C.y=r[S+1],C.z=r[S+2],C.normalize().multiplyScalar(v),r[S+0]=C.x,r[S+1]=C.y,r[S+2]=C.z}function h(){let v=new L;for(let C=0;C<r.length;C+=3){v.x=r[C+0],v.y=r[C+1],v.z=r[C+2];let S=m(v)/2/Math.PI+.5,T=p(v)/Math.PI+.5;o.push(S,1-T)}g(),u()}function u(){for(let v=0;v<o.length;v+=6){let C=o[v+0],S=o[v+2],T=o[v+4];Math.max(C,S,T)>.9&&Math.min(C,S,T)<.1&&(C<.2&&(o[v+0]+=1),S<.2&&(o[v+2]+=1),T<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,C){let S=v*3;C.x=e[S+0],C.y=e[S+1],C.z=e[S+2]}function g(){let v=new L,C=new L,S=new L,T=new L,w=new Ne,_=new Ne,b=new Ne;for(let F=0,O=0;F<r.length;F+=9,O+=6){v.set(r[F+0],r[F+1],r[F+2]),C.set(r[F+3],r[F+4],r[F+5]),S.set(r[F+6],r[F+7],r[F+8]),w.set(o[O+0],o[O+1]),_.set(o[O+2],o[O+3]),b.set(o[O+4],o[O+5]),T.copy(v).add(C).add(S).divideScalar(3);let U=m(T);M(w,O+0,v,U),M(_,O+2,C,U),M(b,O+4,S,U)}}function M(v,C,S,T){T<0&&v.x===1&&(o[C]=v.x-1),S.x===0&&S.z===0&&(o[C]=T/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var Uo=new L;var Bo=new L;var uc=new L;var ko=new ti;var Ir=class extends Dt{constructor(e=null,t=1){if(super(),this.type=`EdgesGeometry`,this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(Ls*t),o=e.getIndex(),a=e.getAttribute(`position`),c=o?o.count:a.count,l=[0,0,0],h=[`a`,`b`,`c`],u=new Array(3),d=/* @__PURE__ */ new Map,f=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:M,b:m,c:p}=ko;if(M.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),ko.getNormal(uc),u[0]=`${Math.round(M.x*s)},${Math.round(M.y*s)},${Math.round(M.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let v=0;v<3;v++){let C=(v+1)%3,S=u[v],T=u[C],w=ko[h[v]],_=ko[h[C]],b=`${S}_${T}`,F=`${T}_${S}`,O=d.get(F);O?(uc.dot(O.normal)<=r&&(f.push(w.x,w.y,w.z),f.push(_.x,_.y,_.z)),d.set(F,null)):d.has(b)||d.set(b,{index0:l[v],index1:l[C],normal:uc.clone()})}}for(let g of d.values())if(g){let{index0:M,index1:m}=g;Uo.fromBufferAttribute(a,M),Bo.fromBufferAttribute(a,m),f.push(Uo.x,Uo.y,Uo.z),f.push(Bo.x,Bo.y,Bo.z)}this.setAttribute(`position`,new lt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var Fi=class i extends ha{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Si=class i extends Dt{constructor(e=1,t=1,n=1,s=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,f=[],g=[],M=[],m=[];for(let p=0;p<h;p++){let v=p*d-o;for(let C=0;C<l;C++){let S=C*u-r;g.push(S,-v,0),M.push(0,0,1),m.push(C/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){let C=v+l*p,S=v+l*(p+1),T=v+1+l*(p+1),w=v+1+l*p;f.push(C,S,w),f.push(S,T,w)}this.setIndex(f),this.setAttribute(`position`,new lt(g,3)),this.setAttribute(`normal`,new lt(M,3)),this.setAttribute(`uv`,new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Mc=class i extends Dt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=e,d=(t-e)/s,f=new L,g=new Ne;for(let M=0;M<=s;M++){for(let m=0;m<=n;m++){let p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let M=0;M<s;M++){let m=M*(n+1);for(let p=0;p<n;p++){let v=p+m,C=v,S=v+n+1,T=v+n+2,w=v+1;a.push(C,S,w),a.push(S,T,w)}}this.setIndex(a),this.setAttribute(`position`,new lt(c,3)),this.setAttribute(`normal`,new lt(l,3)),this.setAttribute(`uv`,new lt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Lr=class i extends Dt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new L,d=new L,f=[],g=[],M=[],m=[];for(let p=0;p<=n;p++){let v=[],C=p/n,S=o+C*a,T=e*Math.cos(S),w=Math.sqrt(e*e-T*T),_=0;p===0&&o===0?_=.5/t:p===n&&c===Math.PI&&(_=-.5/t);for(let b=0;b<=t;b++){let F=b/t,O=s+F*r;u.x=-w*Math.cos(O),u.y=T,u.z=w*Math.sin(O),g.push(u.x,u.y,u.z),d.copy(u).normalize(),M.push(d.x,d.y,d.z),m.push(F+_,1-C),v.push(l++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){let C=h[p][v+1],S=h[p][v],T=h[p+1][v],w=h[p+1][v+1];(p!==0||o>0)&&f.push(C,S,w),(p!==n-1||c<Math.PI)&&f.push(S,T,w)}this.setIndex(f),this.setAttribute(`position`,new lt(g,3)),this.setAttribute(`normal`,new lt(M,3)),this.setAttribute(`uv`,new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ci=class i extends Dt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],h=[],u=[],d=new L,f=new L,g=new L;for(let M=0;M<=n;M++){let m=o+M/n*a;for(let p=0;p<=s;p++){let v=p/s*r;f.x=(e+t*Math.cos(m))*Math.cos(v),f.y=(e+t*Math.cos(m))*Math.sin(v),f.z=t*Math.sin(m),l.push(f.x,f.y,f.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),g.subVectors(f,d).normalize(),h.push(g.x,g.y,g.z),u.push(p/s),u.push(M/n)}}for(let M=1;M<=n;M++)for(let m=1;m<=s;m++){let p=(s+1)*M+m-1,v=(s+1)*(M-1)+m-1,C=(s+1)*(M-1)+m,S=(s+1)*M+m;c.push(p,v,S),c.push(v,C,S)}this.setIndex(c),this.setAttribute(`position`,new lt(l,3)),this.setAttribute(`normal`,new lt(h,3)),this.setAttribute(`uv`,new lt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function ls(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Ou(s))s.isRenderTargetTexture?(Ge(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Ou(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function an(i){let e={};for(let t=0;t<i.length;t++){let n=ls(i[t]);for(let s in n)e[s]=n[s]}return e}function Ou(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Vm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function rh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}var Tp={clone:ls,merge:an};var Gm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;var Hm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;var ii=class extends Yn{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gm,this.fragmentShader=Hm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ls(e.uniforms),this.uniformsGroups=Vm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:`t`,value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:`c`,value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:`v2`,value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:`v3`,value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:`v4`,value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:`m3`,value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:`m4`,value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case`t`:this.uniforms[n].value=t[s.value]||null;break;case`c`:this.uniforms[n].value=new qe().setHex(s.value);break;case`v2`:this.uniforms[n].value=new Ne().fromArray(s.value);break;case`v3`:this.uniforms[n].value=new L().fromArray(s.value);break;case`v4`:this.uniforms[n].value=new Tt().fromArray(s.value);break;case`m3`:this.uniforms[n].value=new $e().fromArray(s.value);break;case`m4`:this.uniforms[n].value=new dt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}};var da=class extends ii{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}};var Or=class extends Yn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type=`MeshPhongMaterial`,this.color=new qe(16777215),this.specular=new qe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$r,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Vr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var bc=class extends Yn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$r,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Vr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var ua=class extends Yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=pp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}};var pa=class extends Yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function As(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT==`number`?new e(i):Array.prototype.slice.call(i)}function zo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ui=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}};var fa=class extends Ui{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:mc,endingEnd:mc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case _c:r=e,a=2*t-n;break;case gc:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case _c:o=e,c=2*n-t;break;case gc:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),M=g*g,m=M*g,p=-d*m+2*d*M-d*g,v=(1+d)*m+(-1.5-2*d)*M+(-.5+d)*g+1,C=(-1-f)*m+(1.5+f)*M+.5*g,S=f*m-f*M;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+v*o[l+T]+C*o[c+T]+S*o[u+T];return r}};var ma=class extends Ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}};var _a=class extends Ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}};var ga=class extends Ui{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(n-t)/(s-t),M=1-g;for(let m=0;m!==a;++m)r[m]=o[l+m]*M+o[c+m]*g;return r}let d=a*2,f=e-1;for(let g=0;g!==a;++g){let M=o[l+g],m=o[c+g],p=f*d+g*2,v=u[p],C=u[p+1],S=e*d+g*2,T=h[S],w=h[S+1],_=Xm(n,t,v,T,s);r[g]=Ap(_,M,C,w,m)}return r}};function Ap(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Wm(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Xm(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=Ap(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let c=Wm(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var Tn=class{constructor(e,t,n,s){if(e===void 0)throw new Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw new Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=As(t,this.TimeBufferType),this.values=As(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:As(e.times,Array),values:As(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),zo(e.settings)&&(n.settings={inTangents:As(e.settings.inTangents,Array),outTangents:As(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new _a(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ma(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ga(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case mr:t=this.InterpolantFactoryMethodDiscrete;break;case ta:t=this.InterpolantFactoryMethodLinear;break;case Ho:t=this.InterpolantFactoryMethodSmooth;break;case fc:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let n=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ge(`KeyframeTrack:`,n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return mr;case this.InterpolantFactoryMethodLinear:return ta;case this.InterpolantFactoryMethodSmooth:return Ho;case this.InterpolantFactoryMethodBezier:return fc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;zo(this.settings)&&(Du(this.settings.inTangents,e),Du(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;zo(this.settings)&&(Nu(this.settings.inTangents,e),Nu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ye(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ye(`KeyframeTrack: Track is empty.`,this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c==`number`&&isNaN(c)){Ye(`KeyframeTrack: Time is not a valid number.`,this,a,c),e=!1;break}if(o!==null&&o>c){Ye(`KeyframeTrack: Out of order keys.`,this,a,c,o),e=!1;break}o=c}if(s!==void 0&&om(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Ye(`KeyframeTrack: Value is not a valid number.`,this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ho,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a];if(l!==e[a+1]&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let M=t[u+g];if(M!==t[d+g]||M!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,zo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Du(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function Nu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Tn.prototype.ValueTypeName=``;Tn.prototype.TimeBufferType=Float32Array;Tn.prototype.ValueBufferType=Float32Array;Tn.prototype.DefaultInterpolation=ta;var Bi=class extends Tn{constructor(e,t,n){super(e,t,n)}};Bi.prototype.ValueTypeName=`bool`;Bi.prototype.ValueBufferType=Array;Bi.prototype.DefaultInterpolation=mr;Bi.prototype.InterpolantFactoryMethodLinear=void 0;Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var xa=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};xa.prototype.ValueTypeName=`color`;var ya=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};ya.prototype.ValueTypeName=`number`;var va=class extends Ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)wt.slerpFlat(r,0,o,l-a,o,l,c);return r}};var Dr=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new va(this.times,this.values,this.getValueSize(),e)}};Dr.prototype.ValueTypeName=`quaternion`;Dr.prototype.InterpolantFactoryMethodSmooth=void 0;var ki=class extends Tn{constructor(e,t,n){super(e,t,n)}};ki.prototype.ValueTypeName=`string`;ki.prototype.ValueBufferType=Array;ki.prototype.DefaultInterpolation=mr;ki.prototype.InterpolantFactoryMethodLinear=void 0;ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Ma=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};Ma.prototype.ValueTypeName=`vector`;var Xo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Fu(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Fu(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Fu(i){try{let e=i.slice(i.indexOf(`:`)+1);return new URL(e).protocol===`blob:`}catch{return!1}}var ba=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize(`NFC`),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}};var Pp=new ba;var Gs=class{constructor(e){this.manager=e!==void 0?e:Pp,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Gs.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Ps=/* @__PURE__ */ new WeakMap;var Sa=class extends Gs{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Xo.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=Ps.get(o);u===void 0&&(u=[],Ps.set(o,u)),u.push({onLoad:t,onError:s})}return o}let a=Fs(`img`);function c(){h(),t&&t(this);let u=Ps.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Ps.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),Xo.remove(`image:${e}`);let d=Ps.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(u)}Ps.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener(`load`,c,!1),a.removeEventListener(`error`,l,!1)}return a.addEventListener(`load`,c,!1),a.addEventListener(`error`,l,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Xo.add(`image:${e}`,a),r.manager.itemStart(e),a.fetchPriority=this.priority,a.src=e,a}};var Sc=class extends Gs{constructor(e){super(e)}load(e,t,n,s){let r=new on,o=new Sa(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}};var Hs=class extends Nt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new qe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var Nr=class extends Hs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}};var pc=new dt;var Uu=new L;var Bu=new L;var Ca=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ni,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Uu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Uu),Bu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){pc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(pc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Ns||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(pc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Vo=new L;var Go=new wt;var ei=new L;var Fr=class extends Nt{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Vo,Go,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vo,Go,ei.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Vo,Go,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vo,Go,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}};var Oi=new L;var ku=new Ne;var zu=new Ne;var dn=class extends Fr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ls*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bs*2*Math.atan(Math.tan(Ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,ku,zu),t.subVectors(zu,ku)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ls*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ur=class extends Fr{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Cc=class extends Ca{constructor(){super(new Ur(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}};var Br=class extends Hs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new Cc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ec=class extends Hs{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}};var Rs=-90;var Is=1;var Ws=class extends Nt{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new dn(Rs,Is,e,t);s.layers=this.layers,this.add(s);let r=new dn(Rs,Is,e,t);r.layers=this.layers,this.add(r);let o=new dn(Rs,Is,e,t);o.layers=this.layers,this.add(o);let a=new dn(Rs,Is,e,t);a.layers=this.layers,this.add(a);let c=new dn(Rs,Is,e,t);c.layers=this.layers,this.add(c);let l=new dn(Rs,Is,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ns)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let M=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=M,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}};var Ea=class extends dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var oh=`\\[\\]\\.:\\/`;var Ym=new RegExp(`[`+oh+`]`,`g`);var ah=`[^`+oh+`]`;var qm=`[^`+oh.replace(`\\.`,``)+`]`;var Zm=/((?:WC+[\/:])*)/.source.replace(`WC`,ah);var $m=/(WCOD+)?/.source.replace(`WCOD`,qm);var Jm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace(`WC`,ah);var Km=/\.(WC+)(?:\[(.+)\])?/.source.replace(`WC`,ah);var jm=new RegExp(`^`+Zm+$m+Jm+Km+`$`);var Qm=[`material`,`materials`,`bones`,`map`];var wc=class{constructor(e,t,n){let s=n||bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}};var bt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ym,``)}static parseTrackName(e){let t=jm.exec(e);if(t===null)throw new Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Qm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ge(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(n){let l=t.objectIndex;switch(n){case`materials`:if(!e.material){Ye(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!e.material.materials){Ye(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}e=e.material.materials;break;case`bones`:if(!e.skeleton){Ye(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case`map`:if(`map`in e){e=e.map;break}if(!e.material){Ye(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!e.material.map){Ye(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}e=e.material.map;break;default:if(e[n]===void 0){Ye(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ye(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;Ye(`PropertyBinding: Trying to update property for track: `+l+`.`+s+` but it wasn't found.`,e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s===`morphTargetInfluences`){if(!e.geometry){Ye(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!e.geometry.morphAttributes){Ye(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};bt.Composite=wc;bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};bt.prototype.GetterByBindingType=[bt.prototype._getValue_direct,bt.prototype._getValue_array,bt.prototype._getValue_arrayElement,bt.prototype._getValue_toArray];bt.prototype.SetterByBindingTypeAndVersioning=[[bt.prototype._setValue_direct,bt.prototype._setValue_direct_setNeedsUpdate,bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_array,bt.prototype._setValue_array_setNeedsUpdate,bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_arrayElement,bt.prototype._setValue_arrayElement_setNeedsUpdate,bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_fromArray,bt.prototype._setValue_fromArray_setNeedsUpdate,bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Vu=new dt;var ns=class{constructor(e,t,n=0,s=1/0){this.ray=new Di(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new zs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ye(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Vu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vu),this}intersectObject(e,t=!0,n=[]){return Tc(e,this,n,t),n.sort(Gu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Tc(e[s],this,n,t);return n.sort(Gu),n}};function Gu(i,e){return i.distance-e.distance}function Tc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Tc(r[o],e,t,!0)}}var Xs=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=it(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(it(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Ac=class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var kr=class extends ts{constructor(e=10,t=10,n=4473924,s=8947848){n=new qe(n),s=new qe(s);let r=t/2,o=e/t,a=e/2,c=[],l=[];for(let d=0,f=0,g=-a;d<=t;d++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);let M=d===r?n:s;M.toArray(l,f),f+=3,M.toArray(l,f),f+=3,M.toArray(l,f),f+=3,M.toArray(l,f),f+=3}let h=new Dt;h.setAttribute(`position`,new lt(c,3)),h.setAttribute(`color`,new lt(l,3));let u=new qn({vertexColors:!0,toneMapped:!1});super(h,u),this.type=`GridHelper`}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};var Pc=class extends ts{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new Dt;r.setIndex(new En(n,1)),r.setAttribute(`position`,new lt(s,3)),super(r,new qn({color:t,toneMapped:!1})),this.box=e,this.type=`Box3Helper`,this.geometry.computeBoundingSphere()}updateMatrixWorld(e){let t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};var is=class extends Xn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function lh(i,e,t,n){let s=e0(n);switch(t){case Zc:return i*e;case La:return i*e/s.components*s.byteLength;case Oa:return i*e/s.components*s.byteLength;case Gi:return i*e*2/s.components*s.byteLength;case Da:return i*e*2/s.components*s.byteLength;case $c:return i*e*3/s.components*s.byteLength;case Jn:return i*e*4/s.components*s.byteLength;case Na:return i*e*4/s.components*s.byteLength;case Hr:case Wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Xr:case Yr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ua:case ka:return Math.max(i,16)*Math.max(e,8)/4;case Fa:case Ba:return Math.max(i,8)*Math.max(e,8)/2;case za:case Va:case Ha:case Wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ga:case qr:case Xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Za:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case $a:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ka:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ja:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Qa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case el:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case tl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case nl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case il:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case sl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case rl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ol:case al:case ll:return Math.ceil(i/4)*Math.ceil(e/4)*16;case cl:case hl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Zr:case dl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function e0(i){switch(i){case yn:case Wc:return{byteLength:1,components:1};case $s:case Xc:case $n:return{byteLength:2,components:1};case Ra:case Ia:return{byteLength:2,components:4};case Zn:case Pa:case kn:return{byteLength:4,components:1};case Yc:case qc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}}));typeof window<`u`&&(window.__THREE__?Ge(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Kp(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function n0(i){let e=/* @__PURE__ */ new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<`u`&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],M=u[f];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++d,u[d]=M)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let M=u[f];i.bufferSubData(l,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var nt={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`};var Ce={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}};var ai={basic:{uniforms:an([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:an([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:an([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:an([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:an([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new qe(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:an([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:an([Ce.points,Ce.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:an([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:an([Ce.common,Ce.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:an([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:an([Ce.sprite,Ce.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distance:{uniforms:an([Ce.common,Ce.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distance_vert,fragmentShader:nt.distance_frag},shadow:{uniforms:an([Ce.lights,Ce.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};ai.physical={uniforms:an([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new $e},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var pl={r:0,b:0,g:0};var Fg=new dt;var jp=new $e;jp.set(-1,0,0,0,1,0,0,0,1);function Ug(i,e,t,n,s,r){let o=new qe(0),a=s===!0?0:1,c,l,h=null,u=0,d=null;function f(v){let C=v.isScene===!0?v.background:null;if(C&&C.isTexture){let S=v.backgroundBlurriness>0;C=e.get(C,S)}return C}function g(v){let C=!1,S=f(v);S===null?m(o,a):S&&S.isColor&&(m(S,1),C=!0);let T=i.xr.getEnvironmentBlendMode();T===`additive`?t.buffers.color.setClear(0,0,0,1,r):T===`alpha-blend`&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(v,C){let S=f(C);S&&S.isCubeTexture?(l===void 0&&(l=new Se(new At(1,1,1),new ii({name:`BackgroundCubeMaterial`,uniforms:ls(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(T,w,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Fg.makeRotationFromEuler(C.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(jp),l.material.toneMapped=at.getTransfer(S.colorSpace)!==mt,(h!==S||u!==S.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,u=S.version,d=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Se(new Si(2,2),new ii({name:`BackgroundMaterial`,uniforms:ls(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=at.getTransfer(S.colorSpace)!==mt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||u!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,u=S.version,d=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,C){v.getRGB(pl,rh(i)),t.buffers.color.setClear(pl.r,pl.g,pl.b,C,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,C=1){o.set(v),a=C,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,m(o,a)},render:g,addToRenderList:M,dispose:p}}function Bg(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(U,z,$,D,X){let j=!1,V=u(U,D,$,z);r!==V&&(r=V,l(r.object)),j=f(U,D,$,X),j&&g(U,D,$,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,S(U,z,$,D),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return i.createVertexArray()}function l(U){return i.bindVertexArray(U)}function h(U){return i.deleteVertexArray(U)}function u(U,z,$,D){let X=D.wireframe===!0,j=n[z.id];j===void 0&&(j={},n[z.id]=j);let V=U.isInstancedMesh===!0?U.id:0,le=j[V];le===void 0&&(le={},j[V]=le);let Y=le[$.id];Y===void 0&&(Y={},le[$.id]=Y);let oe=Y[X];return oe===void 0&&(oe=d(c()),Y[X]=oe),oe}function d(U){let z=[],$=[],D=[];for(let X=0;X<t;X++)z[X]=0,$[X]=0,D[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:$,attributeDivisors:D,object:U,attributes:{},index:null}}function f(U,z,$,D){let X=r.attributes,j=z.attributes,V=0,le=$.getAttributes();for(let Y in le)if(le[Y].location>=0){let ae=X[Y],Ae=j[Y];if(Ae===void 0&&(Y===`instanceMatrix`&&U.instanceMatrix&&(Ae=U.instanceMatrix),Y===`instanceColor`&&U.instanceColor&&(Ae=U.instanceColor)),ae===void 0||ae.attribute!==Ae||Ae&&ae.data!==Ae.data)return!0;V++}return r.attributesNum!==V||r.index!==D}function g(U,z,$,D){let X={},j=z.attributes,V=0,le=$.getAttributes();for(let Y in le)if(le[Y].location>=0){let ae=j[Y];ae===void 0&&(Y===`instanceMatrix`&&U.instanceMatrix&&(ae=U.instanceMatrix),Y===`instanceColor`&&U.instanceColor&&(ae=U.instanceColor));let Ae={};Ae.attribute=ae,ae&&ae.data&&(Ae.data=ae.data),X[Y]=Ae,V++}r.attributes=X,r.attributesNum=V,r.index=D}function M(){let U=r.newAttributes;for(let z=0,$=U.length;z<$;z++)U[z]=0}function m(U){p(U,0)}function p(U,z){let $=r.newAttributes,D=r.enabledAttributes,X=r.attributeDivisors;$[U]=1,D[U]===0&&(i.enableVertexAttribArray(U),D[U]=1),X[U]!==z&&(i.vertexAttribDivisor(U,z),X[U]=z)}function v(){let U=r.newAttributes,z=r.enabledAttributes;for(let $=0,D=z.length;$<D;$++)z[$]!==U[$]&&(i.disableVertexAttribArray($),z[$]=0)}function C(U,z,$,D,X,j,V){V===!0?i.vertexAttribIPointer(U,z,$,X,j):i.vertexAttribPointer(U,z,$,D,X,j)}function S(U,z,$,D){M();let X=D.attributes,j=$.getAttributes(),V=z.defaultAttributeValues;for(let le in j){let Y=j[le];if(Y.location>=0){let oe=X[le];if(oe===void 0&&(le===`instanceMatrix`&&U.instanceMatrix&&(oe=U.instanceMatrix),le===`instanceColor`&&U.instanceColor&&(oe=U.instanceColor)),oe!==void 0){let ae=oe.normalized,Ae=oe.itemSize,Ze=e.get(oe);if(Ze===void 0)continue;let te=Ze.buffer,Ee=Ze.type,Re=Ze.bytesPerElement,He=Ee===i.INT||Ee===i.UNSIGNED_INT||oe.gpuType===Pa;if(oe.isInterleavedBufferAttribute){let we=oe.data,je=we.isInterleavedBuffer===!0?we.stride:we.itemSize,Bt=oe.offset;if(we.isInstancedInterleavedBuffer||we.isInstancedBufferAttribute){for(let Xe=0;Xe<Y.locationSize;Xe++)p(Y.location+Xe,we.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=we.meshPerAttribute*we.count)}else for(let Xe=0;Xe<Y.locationSize;Xe++)m(Y.location+Xe);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Xe=0;Xe<Y.locationSize;Xe++)C(Y.location+Xe,Ae/Y.locationSize,Ee,ae,je*Re,(Bt+Ae/Y.locationSize*Xe)*Re,He)}else{if(oe.isInstancedBufferAttribute){for(let we=0;we<Y.locationSize;we++)p(Y.location+we,oe.meshPerAttribute);U.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let we=0;we<Y.locationSize;we++)m(Y.location+we);i.bindBuffer(i.ARRAY_BUFFER,te);for(let we=0;we<Y.locationSize;we++)C(Y.location+we,Ae/Y.locationSize,Ee,ae,Ae*Re,Ae/Y.locationSize*we*Re,He)}}else if(V!==void 0){let ae=V[le];if(ae!==void 0)switch(ae.length){case 2:i.vertexAttrib2fv(Y.location,ae);break;case 3:i.vertexAttrib3fv(Y.location,ae);break;case 4:i.vertexAttrib4fv(Y.location,ae);break;default:i.vertexAttrib1fv(Y.location,ae)}}}}v()}function T(){F();for(let U in n){let z=n[U];for(let $ in z){let D=z[$];for(let X in D){let j=D[X];for(let V in j)h(j[V].object),delete j[V];delete D[X]}}delete n[U]}}function w(U){if(n[U.id]===void 0)return;let z=n[U.id];for(let $ in z){let D=z[$];for(let X in D){let j=D[X];for(let V in j)h(j[V].object),delete j[V];delete D[X]}}delete n[U.id]}function _(U){for(let z in n){let $=n[z];for(let D in $){let X=$[D];if(X[U.id]===void 0)continue;let j=X[U.id];for(let V in j)h(j[V].object),delete j[V];delete X[U.id]}}}function b(U){for(let z in n){let $=n[z],D=U.isInstancedMesh===!0?U.id:0,X=$[D];if(X!==void 0){for(let j in X){let V=X[j];for(let le in V)h(V[le].object),delete V[le];delete X[j]}delete $[D],Object.keys($).length===0&&delete n[z]}}}function F(){O(),o=!0,r!==s&&(r=s,l(r.object))}function O(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:F,resetDefaultState:O,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:b,releaseStatesOfProgram:_,initAttributes:M,enableAttribute:m,disableUnusedAttributes:v}}function kg(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function a(c,l,h){if(h===0)return;e.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function zg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has(`EXT_texture_filter_anisotropic`)===!0){let _=e.get(`EXT_texture_filter_anisotropic`);s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(_){return!(_!==1023&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(_){let b=_===1016&&(e.has(`EXT_color_buffer_half_float`)||e.has(`EXT_color_buffer_float`));return!(_!==yn&&_!==kn&&!b&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(_){if(_===`highp`){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return`highp`;_=`mediump`}return _===`mediump`&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=t.precision!==void 0?t.precision:`highp`,h=c(l);h!==l&&(Ge(`WebGLRenderer:`,l,`not supported, using`,h,`instead.`),l=h);let u=t.reversedDepthBuffer===!0&&e.has(`EXT_clip_control`),d=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Ge(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),t.logarithmicDepthBuffer===!0&&u===!0&&Ge(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:C,maxFragmentUniforms:S,maxSamples:T,samples:w}}function Vg(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Cn,a=new $e,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,M=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let v=r?0:n,C=v*4,S=p.clippingState||null;c.value=S,S=h(g,d,C,f);for(let T=0;T!==C;++T)S[T]=t[T];p.clippingState=S,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let M=u!==null?u.length:0,m=null;if(M!==0){if(m=c.value,g!==!0||m===null){let p=f+M*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let C=0,S=f;C!==M;++C,S+=4)o.copy(u[C]).applyMatrix4(v,a),o.normal.toArray(m,S),m[S+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}var Qr=class extends wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Tr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new At(5,5,5),r=new ii({name:`CubemapFromEquirect`,uniforms:ls(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:ss});r.uniforms.tEquirect.value=t;let o=new Se(s,r),a=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Ws(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};var Rp=256;var Gg=3;var Hg=20;var Qp=256;var ef=16;var Wg=3;var Xg=new L;var Yg=new qe;var ml=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ws(1,10,null),this._boxMesh=new Se(new At(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=Xg}=r,c=this._renderer;this._setSize(o);let l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let u=c.autoClear,d=c.autoClearColor,f=c.autoClearDepth,g=c.autoClearStencil,M=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,M===null&&(e.background=c.getClearColor(Yg));let m=new Ws(n,s,h);return m.position.copy(a),m.update(c,e),c.autoClear=u,c.autoClearColor=d,c.autoClearDepth=f,c.autoClearStencil=g,e.background=M,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Op(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Rp,nh(e))}_fromTexture(e,t){e.mapping===os||e.mapping===Zs?this._setSize(e.image.length===0?Rp:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Ip(e,!1,!1),n=Math.log2(e)-Gg;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Ip(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===os||e.mapping===Zs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Op()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Lp()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=qg(),this._integrationMaterial=Zg());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/ef);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-Wg)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let c=a>0?Math.log2(t)+.5*Math.log2(6/(Qp*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=$g());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function Ip(i,e,t){return new Qr(i,{minFilter:Ei,generateMipmaps:e,type:$n,colorSpace:_r,depthBuffer:t})}function eo(i,e,t){return new ii({name:i,uniforms:e,vertexShader:nt.cube_vert,fragmentShader:t,side:1,blending:ss,depthTest:!1,depthWrite:!1})}function qg(){return eo(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Qp}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Zg(){return eo(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:ef}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function $g(){return eo(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Hg}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Lp(){return eo(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Op(){return eo(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Jg(i){let e=/* @__PURE__ */ new WeakMap,t=/* @__PURE__ */ new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===wa||f===Ta)if(e.has(d)){let g=e.get(d).texture;return a(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let M=new Qr(g.height);return M.fromEquirectangularTexture(i,d),e.set(d,M),d.addEventListener(`dispose`,l),a(M.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let f=d.mapping,g=f===wa||f===Ta,M=f===os||f===Zs;if(g||M){let m=t.get(d),p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new ml(i)),m=g?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let v=d.image;return g&&v&&v.height>0||M&&v&&c(v)?(n===null&&(n=new ml(i)),m=g?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener(`dispose`,h),m.texture):null}}}return d}function a(d,f){return f===wa?d.mapping=os:f===Ta&&(d.mapping=Zs),d}function c(d){let f=0,g=6;for(let M=0;M<g;M++)d[M]!==void 0&&f++;return f===g}function l(d){let f=d.target;f.removeEventListener(`dispose`,l);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(d){let f=d.target;f.removeEventListener(`dispose`,h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(){e=/* @__PURE__ */ new WeakMap,t=/* @__PURE__ */ new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Kg(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t(`EXT_color_buffer_float`),t(`WEBGL_clip_cull_distance`),t(`OES_texture_float_linear`),t(`EXT_color_buffer_half_float`),t(`WEBGL_multisampled_render_to_texture`),t(`WEBGL_render_shared_exponent`)},get:function(n){let s=t(n);return s===null&&pr(`WebGLRenderer: `+n+` extension not supported.`),s}}}function jg(i,e,t,n){let s={},r=/* @__PURE__ */ new WeakMap,o=new FinalizationRegistry(g=>delete s[g]);function a(g){c(g.target)}function c(g){g.index!==null&&e.remove(g.index);for(let m in g.attributes)e.remove(g.attributes[m]);g.removeEventListener(`dispose`,a),delete s[g.id],o.unregister(g);let M=r.get(g);M&&(e.remove(M),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function l(g,M){return s[M.id]!==void 0||(M.addEventListener(`dispose`,a),s[M.id]=new WeakRef(M),o.register(M,M.id,M),t.memory.geometries++),M}function h(g){let M=g.attributes;for(let m in M)e.update(M[m],i.ARRAY_BUFFER)}function u(g){let M=g.index,m=g.attributes.position,p=0;if(m===void 0)return;let v=M!==null?M.array.length:m.array.length/3-1,S=new(m.count>=65535?br:Mr)(Math.ceil(v/3)*6,1),T=S.array;if(M!==null){let _=M.array;p=M.version;for(let b=0,F=0;b<v;b+=3){let O=_[b+0],U=_[b+1],z=_[b+2];T[F++]=O,T[F++]=U,T[F++]=U,T[F++]=z,T[F++]=z,T[F++]=O}}else{p=m.version;for(let _=0,b=0;_<v;_+=3){let F=_+0,O=_+1,U=_+2;T[b++]=F,T[b++]=O,T[b++]=O,T[b++]=U,T[b++]=U,T[b++]=F}}S.version=p;let w=r.get(g);w&&e.remove(w),r.set(g,S)}function d(g){let M=r.get(g);if(M){let m=g.index;m!==null&&M.version<m.version&&u(g)}else u(g);return r.get(g)}function f(){for(let g in s){let M=s[g].deref();M!==void 0&&c(M)}}return{get:l,update:h,getWireframeAttribute:d,dispose:f}}function Qg(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*o),t.update(d,n,1)}function l(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*o,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(n,d,0,r,u,0,f);let M=0;for(let m=0;m<f;m++)M+=d[m];t.update(M,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function ex(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Ye(`WebGLInfo: Unknown draw mode:`,o)}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function tx(i,e,t){let n=/* @__PURE__ */ new WeakMap,s=new Tt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let O=function(){b.dispose(),n.delete(a),a.removeEventListener(`dispose`,O)};d!==void 0&&d.texture.dispose();let g=a.morphAttributes.position!==void 0,M=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],C=a.morphAttributes.color||[],S=0;g===!0&&(S=1),M===!0&&(S=2),m===!0&&(S=3);let T=a.attributes.position.count*S,w=1;T>e.maxTextureSize&&(w=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);let _=new Float32Array(T*w*4*u),b=new yr(_,T,w,u);b.type=kn,b.needsUpdate=!0;let F=S*4;for(let U=0;U<u;U++){let z=p[U],$=v[U],D=C[U],X=T*w*4*U;for(let j=0;j<z.count;j++){let V=j*F;g===!0&&(s.fromBufferAttribute(z,j),_[X+V+0]=s.x,_[X+V+1]=s.y,_[X+V+2]=s.z,_[X+V+3]=0),M===!0&&(s.fromBufferAttribute($,j),_[X+V+4]=s.x,_[X+V+5]=s.y,_[X+V+6]=s.z,_[X+V+7]=0),m===!0&&(s.fromBufferAttribute(D,j),_[X+V+8]=s.x,_[X+V+9]=s.y,_[X+V+10]=s.z,_[X+V+11]=D.itemSize===4?s.w:1)}}d={count:u,texture:b,size:new Ne(T,w)},n.set(a,d),a.addEventListener(`dispose`,O)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,`morphTexture`,o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];let M=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,`morphTargetBaseInfluence`,M),c.getUniforms().setValue(i,`morphTargetInfluences`,l)}c.getUniforms().setValue(i,`morphTargetsTexture`,d.texture,t),c.getUniforms().setValue(i,`morphTargetsTextureSize`,d.size)}return{update:r}}function nx(i,e,t,n,s){let r=/* @__PURE__ */ new WeakMap;function o(l){let h=s.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener(`dispose`,c)===!1&&l.addEventListener(`dispose`,c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=/* @__PURE__ */ new WeakMap}function c(l){let h=l.target;h.removeEventListener(`dispose`,c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var ix={[Fc]:`LINEAR_TONE_MAPPING`,[Uc]:`REINHARD_TONE_MAPPING`,[Bc]:`CINEON_TONE_MAPPING`,[kc]:`ACES_FILMIC_TONE_MAPPING`,[Vc]:`AGX_TONE_MAPPING`,[Gc]:`NEUTRAL_TONE_MAPPING`,[zc]:`CUSTOM_TONE_MAPPING`};function sx(i,e,t,n,s,r){let o=new wn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,h=new Dt;h.setAttribute(`position`,new lt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute(`uv`,new lt([0,2,0,0,2,0],2));let u=new da({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Se(h,u),f=new Ur(-1,1,1,-1,0,1),g=null,M=null,m=!1,p,v=null,C=[],S=!1;this.setSize=function(T,w){o.setSize(T,w),a!==null&&a.setSize(T,w),c!==null&&c.setSize(T,w);for(let _=0;_<C.length;_++){let b=C[_];b.setSize&&b.setSize(T,w)}},this.setEffects=function(T){C=T,S=C.length>0&&C[0].isRenderPass===!0;let w=o.width,_=o.height;C.length>0&&a===null&&(a=new wn(w,_,{type:1016,depthBuffer:!1,stencilBuffer:!1}),c=new wn(w,_,{type:1016,depthBuffer:!1,stencilBuffer:!1}));let b=s===!0&&C.some(F=>F.needsDepthTexture===!0);b!==(o.depthTexture!==null)&&(b===!0&&l===null&&(l=new bi(w,_),r===!0&&(l.format=wi,l.type=as)),o.dispose(),o.depthTexture=b?l:null,o.resolveDepthBuffer=b,o.storeMultisampledDepthBuffer=b);for(let F=0;F<C.length;F++){let O=C[F];O.setSize&&O.setSize(w,_),b&&O.needsDepthTexture===!0&&O.setDepthTexture&&O.setDepthTexture(l)}},this.begin=function(T,w){if(m||T.toneMapping===ri&&C.length===0)return!1;if(v=w,w!==null){let _=w.width,b=w.height;(o.width!==_||o.height!==b)&&this.setSize(_,b)}return S===!1&&T.setRenderTarget(o),p=T.toneMapping,T.toneMapping=ri,!0},this.hasRenderPass=function(){return S},this.end=function(T,w){T.toneMapping=p,m=!0;let _=o,b=a;for(let F=0;F<C.length;F++){let O=C[F];O.enabled!==!1&&(O.render(T,b,_,w),O.needsSwap!==!1&&(_=b,b=b===a?c:a))}if(g!==T.outputColorSpace||M!==T.toneMapping){g=T.outputColorSpace,M=T.toneMapping,u.defines={},at.getTransfer(g)===mt&&(u.defines.SRGB_TRANSFER=``);let F=ix[M];F&&(u.defines[F]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=_.texture,T.setRenderTarget(v),T.render(d,f),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),h.dispose(),u.dispose()}}var tf=new on;var nf=new bi(1,1);var sf=new Pr(1);var rf=new yr;var of=new sa;var af=new Tr;var Dp=[];var Np=[];var Fp=/* @__PURE__ */ new Float32Array(16);var Up=/* @__PURE__ */ new Float32Array(9);var Bp=/* @__PURE__ */ new Float32Array(4);function Ks(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Dp[s];if(r===void 0&&(r=new Float32Array(s),Dp[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function gl(i,e){let t=Np[e];t===void 0&&(t=new Int32Array(e),Np[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function rx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2fv(this.addr,e),Xt(t,e)}}function ax(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;i.uniform3fv(this.addr,e),Xt(t,e)}}function lx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4fv(this.addr,e),Xt(t,e)}}function cx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Bp.set(n),i.uniformMatrix2fv(this.addr,!1,Bp),Xt(t,n)}}function hx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Up.set(n),i.uniformMatrix3fv(this.addr,!1,Up),Xt(t,n)}}function dx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Fp.set(n),i.uniformMatrix4fv(this.addr,!1,Fp),Xt(t,n)}}function ux(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function px(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2iv(this.addr,e),Xt(t,e)}}function fx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3iv(this.addr,e),Xt(t,e)}}function mx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4iv(this.addr,e),Xt(t,e)}}function _x(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function gx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2uiv(this.addr,e),Xt(t,e)}}function xx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3uiv(this.addr,e),Xt(t,e)}}function yx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4uiv(this.addr,e),Xt(t,e)}}function xl(i){return i.version===0&&(i.compareFunction=jc,i.needsUpdate=!0),i}function vx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=xl(nf):r=tf,t.setTexture2D(e||r,s)}function Mx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||of,s)}function bx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=xl(sf):r=af,t.setTextureCube(e||r,s)}function Sx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||rf,s)}function Cx(i){switch(i){case 5126:return rx;case 35664:return ox;case 35665:return ax;case 35666:return lx;case 35674:return cx;case 35675:return hx;case 35676:return dx;case 5124:case 35670:return ux;case 35667:case 35671:return px;case 35668:case 35672:return fx;case 35669:case 35673:return mx;case 5125:return _x;case 36294:return gx;case 36295:return xx;case 36296:return yx;case 35678:case 36198:case 36298:case 36306:case 35682:return vx;case 35679:case 36299:case 36307:return Mx;case 35680:case 36300:case 36308:case 36293:return bx;case 36289:case 36303:case 36311:case 36292:return Sx}}function Ex(i,e){i.uniform1fv(this.addr,e)}function wx(i,e){let t=Ks(e,this.size,2);i.uniform2fv(this.addr,t)}function Tx(i,e){let t=Ks(e,this.size,3);i.uniform3fv(this.addr,t)}function Ax(i,e){let t=Ks(e,this.size,4);i.uniform4fv(this.addr,t)}function Px(i,e){let t=Ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Rx(i,e){let t=Ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ix(i,e){let t=Ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Lx(i,e){i.uniform1iv(this.addr,e)}function Ox(i,e){i.uniform2iv(this.addr,e)}function Dx(i,e){i.uniform3iv(this.addr,e)}function Nx(i,e){i.uniform4iv(this.addr,e)}function Fx(i,e){i.uniform1uiv(this.addr,e)}function Ux(i,e){i.uniform2uiv(this.addr,e)}function Bx(i,e){i.uniform3uiv(this.addr,e)}function kx(i,e){i.uniform4uiv(this.addr,e)}function zx(i,e,t){let n=this.cache,s=e.length,r=gl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=xl(nf):o=tf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Vx(i,e,t){let n=this.cache,s=e.length,r=gl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||of,r[o])}function Gx(i,e,t){let n=this.cache,s=e.length,r=gl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=xl(sf):o=af;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function Hx(i,e,t){let n=this.cache,s=e.length,r=gl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||rf,r[o])}function Wx(i){switch(i){case 5126:return Ex;case 35664:return wx;case 35665:return Tx;case 35666:return Ax;case 35674:return Px;case 35675:return Rx;case 35676:return Ix;case 5124:case 35670:return Lx;case 35667:case 35671:return Ox;case 35668:case 35672:return Dx;case 35669:case 35673:return Nx;case 5125:return Fx;case 36294:return Ux;case 36295:return Bx;case 36296:return kx;case 35678:case 36198:case 36298:case 36306:case 35682:return zx;case 35679:case 36299:case 36307:return Vx;case 35680:case 36300:case 36308:case 36293:return Gx;case 36289:case 36303:case 36311:case 36292:return Hx}}var dh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cx(t.type)}};var uh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wx(t.type)}};var ph=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}};var ch=/(\w+)(\])?(\[|\.)?/g;function kp(i,e){i.seq.push(e),i.map[e.id]=e}function Xx(i,e,t){let n=i.name,s=n.length;for(ch.lastIndex=0;;){let r=ch.exec(n),o=ch.lastIndex,a=r[1],c=r[2]===`]`,l=r[3];if(c&&(a=a|0),l===void 0||l===`[`&&o+2===s){kp(t,l===void 0?new dh(a,i,e):new uh(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new ph(a),kp(t,u)),t=u}}}var Js=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o);Xx(a,e.getUniformLocation(t,a.name),this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function zp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Yx=37297;var qx=0;function Zx(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?`>`:` `} ${a}: ${t[o]}`)}return n.join(`
`)}var Vp=new $e;function $x(i){at._getMatrix(Vp,at.workingColorSpace,i);let e=`mat3( ${Vp.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(i)){case gr:return[e,`LinearTransferOETF`];case mt:return[e,`sRGBTransferOETF`];default:return Ge(`WebGLProgram: Unsupported color space: `,i),[e,`LinearTransferOETF`]}}function Gp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||``).trim();if(n&&r===``)return``;let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Zx(i.getShaderSource(e),a)}else return r}function Jx(i,e){let t=$x(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Kx={[Fc]:`Linear`,[Uc]:`Reinhard`,[Bc]:`Cineon`,[kc]:`ACESFilmic`,[Vc]:`AgX`,[Gc]:`Neutral`,[zc]:`Custom`};function jx(i,e){let t=Kx[e];return t===void 0?(Ge(`WebGLProgram: Unsupported toneMapping:`,e),`vec3 `+i+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+i+`( vec3 color ) { return `+t+`ToneMapping( color ); }`}var fl=new L;function Qx(){at.getLuminanceCoefficients(fl);return[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${fl.x.toFixed(4)}, ${fl.y.toFixed(4)}, ${fl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function ey(i){return[i.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,i.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(jr).join(`
`)}function ty(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push(`#define `+t+` `+n)}return e.join(`
`)}function ny(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function jr(i){return i!==``}function Hp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Wp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var iy=/^[ \t]*#include +<([\w\d./]+)>/gm;function fh(i){return i.replace(iy,sy)}function sy(i,e){let t=nt[e];if(t===void 0)throw new Error(`THREE.WebGLProgram: Can not resolve #include <`+e+`>`);return fh(t)}var ry=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xp(i){return i.replace(ry,oy)}function oy(i,e,t,n){let s=``;for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,`[ `+r+` ]`).replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yp(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision===`highp`?e+=`
#define HIGH_PRECISION`:i.precision===`mediump`?e+=`
#define MEDIUM_PRECISION`:i.precision===`lowp`&&(e+=`
#define LOW_PRECISION`),e}var ay={[1]:`SHADOWMAP_TYPE_PCF`,[Ys]:`SHADOWMAP_TYPE_VSM`};function ly(i){return ay[i.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var cy={[Zs]:`ENVMAP_MODE_REFRACTION`};function hy(i){return i.envMap===!1?`ENVMAP_MODE_REFLECTION`:cy[i.envMapMode]||`ENVMAP_MODE_REFLECTION`}var dy={[Vr]:`ENVMAP_BLENDING_MULTIPLY`,[hp]:`ENVMAP_BLENDING_MIX`,[dp]:`ENVMAP_BLENDING_ADD`};function uy(i){return i.envMap===!1?`ENVMAP_BLENDING_NONE`:dy[i.combine]||`ENVMAP_BLENDING_NONE`}function py(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=ly(t),l=t.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,h=hy(t),u=uy(t),d=ey(t),f=ty(r),g=s.createProgram(),M,m,p=t.glslVersion?`#version `+t.glslVersion+`
`:``;t.isRawShaderMaterial?(M=[`#define SHADER_TYPE `+t.shaderType,`#define SHADER_NAME `+t.shaderName,f].filter(jr).join(`
`),M.length>0&&(M+=`
`),m=[`#define SHADER_TYPE `+t.shaderType,`#define SHADER_NAME `+t.shaderName,f].filter(jr).join(`
`),m.length>0&&(m+=`
`)):(M=[Yp(t),`#define SHADER_TYPE `+t.shaderType,`#define SHADER_NAME `+t.shaderName,f,t.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,t.batching?`#define USE_BATCHING`:``,t.batchingColor?`#define USE_BATCHING_COLOR`:``,t.instancing?`#define USE_INSTANCING`:``,t.instancingColor?`#define USE_INSTANCING_COLOR`:``,t.instancingMorph?`#define USE_INSTANCING_MORPH`:``,t.useFog&&t.fog?`#define USE_FOG`:``,t.useFog&&t.fogExp2?`#define FOG_EXP2`:``,t.map?`#define USE_MAP`:``,t.envMap?`#define USE_ENVMAP`:``,t.envMap?`#define `+h:``,t.lightMap?`#define USE_LIGHTMAP`:``,t.aoMap?`#define USE_AOMAP`:``,t.bumpMap?`#define USE_BUMPMAP`:``,t.normalMap?`#define USE_NORMALMAP`:``,t.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,t.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,t.displacementMap?`#define USE_DISPLACEMENTMAP`:``,t.emissiveMap?`#define USE_EMISSIVEMAP`:``,t.anisotropy?`#define USE_ANISOTROPY`:``,t.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,t.clearcoatMap?`#define USE_CLEARCOATMAP`:``,t.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,t.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,t.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,t.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,t.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,t.specularMap?`#define USE_SPECULARMAP`:``,t.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,t.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,t.roughnessMap?`#define USE_ROUGHNESSMAP`:``,t.metalnessMap?`#define USE_METALNESSMAP`:``,t.alphaMap?`#define USE_ALPHAMAP`:``,t.alphaHash?`#define USE_ALPHAHASH`:``,t.transmission?`#define USE_TRANSMISSION`:``,t.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,t.thicknessMap?`#define USE_THICKNESSMAP`:``,t.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,t.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,t.mapUv?`#define MAP_UV `+t.mapUv:``,t.alphaMapUv?`#define ALPHAMAP_UV `+t.alphaMapUv:``,t.lightMapUv?`#define LIGHTMAP_UV `+t.lightMapUv:``,t.aoMapUv?`#define AOMAP_UV `+t.aoMapUv:``,t.emissiveMapUv?`#define EMISSIVEMAP_UV `+t.emissiveMapUv:``,t.bumpMapUv?`#define BUMPMAP_UV `+t.bumpMapUv:``,t.normalMapUv?`#define NORMALMAP_UV `+t.normalMapUv:``,t.displacementMapUv?`#define DISPLACEMENTMAP_UV `+t.displacementMapUv:``,t.metalnessMapUv?`#define METALNESSMAP_UV `+t.metalnessMapUv:``,t.roughnessMapUv?`#define ROUGHNESSMAP_UV `+t.roughnessMapUv:``,t.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+t.anisotropyMapUv:``,t.clearcoatMapUv?`#define CLEARCOATMAP_UV `+t.clearcoatMapUv:``,t.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+t.clearcoatNormalMapUv:``,t.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+t.clearcoatRoughnessMapUv:``,t.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+t.diffuseRoughnessMapUv:``,t.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+t.iridescenceMapUv:``,t.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+t.iridescenceThicknessMapUv:``,t.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+t.sheenColorMapUv:``,t.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+t.sheenRoughnessMapUv:``,t.specularMapUv?`#define SPECULARMAP_UV `+t.specularMapUv:``,t.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+t.specularColorMapUv:``,t.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+t.specularIntensityMapUv:``,t.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+t.transmissionMapUv:``,t.thicknessMapUv?`#define THICKNESSMAP_UV `+t.thicknessMapUv:``,t.vertexTangents&&t.flatShading===!1?`#define USE_TANGENT`:``,t.vertexNormals?`#define HAS_NORMAL`:``,t.vertexColors?`#define USE_COLOR`:``,t.vertexAlphas?`#define USE_COLOR_ALPHA`:``,t.vertexUv1s?`#define USE_UV1`:``,t.vertexUv2s?`#define USE_UV2`:``,t.vertexUv3s?`#define USE_UV3`:``,t.pointsUvs?`#define USE_POINTS_UV`:``,t.flatShading?`#define FLAT_SHADED`:``,t.skinning?`#define USE_SKINNING`:``,t.morphTargets?`#define USE_MORPHTARGETS`:``,t.morphNormals&&t.flatShading===!1?`#define USE_MORPHNORMALS`:``,t.morphColors?`#define USE_MORPHCOLORS`:``,t.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+t.morphTextureStride:``,t.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+t.morphTargetsCount:``,t.doubleSided?`#define DOUBLE_SIDED`:``,t.flipSided?`#define FLIP_SIDED`:``,t.shadowMapEnabled?`#define USE_SHADOWMAP`:``,t.shadowMapEnabled?`#define `+c:``,t.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,t.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,t.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,t.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(jr).join(`
`),m=[Yp(t),`#define SHADER_TYPE `+t.shaderType,`#define SHADER_NAME `+t.shaderName,f,t.useFog&&t.fog?`#define USE_FOG`:``,t.useFog&&t.fogExp2?`#define FOG_EXP2`:``,t.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,t.map?`#define USE_MAP`:``,t.matcap?`#define USE_MATCAP`:``,t.envMap?`#define USE_ENVMAP`:``,t.envMap?`#define `+l:``,t.envMap?`#define `+h:``,t.envMap?`#define `+u:``,t.envMapPMREM?`#define ENVMAP_MAX_LOD `+t.envMapMaxLod+`.0`:``,t.envMapPMREM?`#define ENVMAP_SIZE `+t.envMapSize+`.0`:``,t.lightMap?`#define USE_LIGHTMAP`:``,t.aoMap?`#define USE_AOMAP`:``,t.bumpMap?`#define USE_BUMPMAP`:``,t.normalMap?`#define USE_NORMALMAP`:``,t.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,t.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,t.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,t.emissiveMap?`#define USE_EMISSIVEMAP`:``,t.anisotropy?`#define USE_ANISOTROPY`:``,t.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,t.clearcoat?`#define USE_CLEARCOAT`:``,t.clearcoatMap?`#define USE_CLEARCOATMAP`:``,t.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,t.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,t.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,t.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,t.dispersion?`#define USE_DISPERSION`:``,t.retroreflection?`#define USE_RETROREFLECTION`:``,t.iridescence?`#define USE_IRIDESCENCE`:``,t.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,t.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,t.specularMap?`#define USE_SPECULARMAP`:``,t.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,t.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,t.roughnessMap?`#define USE_ROUGHNESSMAP`:``,t.metalnessMap?`#define USE_METALNESSMAP`:``,t.alphaMap?`#define USE_ALPHAMAP`:``,t.alphaTest?`#define USE_ALPHATEST`:``,t.alphaHash?`#define USE_ALPHAHASH`:``,t.sheen?`#define USE_SHEEN`:``,t.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,t.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,t.transmission?`#define USE_TRANSMISSION`:``,t.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,t.thicknessMap?`#define USE_THICKNESSMAP`:``,t.vertexTangents&&t.flatShading===!1?`#define USE_TANGENT`:``,t.vertexColors||t.instancingColor?`#define USE_COLOR`:``,t.vertexAlphas||t.batchingColor?`#define USE_COLOR_ALPHA`:``,t.vertexUv1s?`#define USE_UV1`:``,t.vertexUv2s?`#define USE_UV2`:``,t.vertexUv3s?`#define USE_UV3`:``,t.pointsUvs?`#define USE_POINTS_UV`:``,t.gradientMap?`#define USE_GRADIENTMAP`:``,t.flatShading?`#define FLAT_SHADED`:``,t.doubleSided?`#define DOUBLE_SIDED`:``,t.flipSided?`#define FLIP_SIDED`:``,t.shadowMapEnabled?`#define USE_SHADOWMAP`:``,t.shadowMapEnabled?`#define `+c:``,t.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,t.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,t.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,t.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,t.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,t.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,t.toneMapping!==ri?`#define TONE_MAPPING`:``,t.toneMapping!==ri?nt.tonemapping_pars_fragment:``,t.toneMapping!==ri?jx(`toneMapping`,t.toneMapping):``,t.dithering?`#define DITHERING`:``,t.opaque?`#define OPAQUE`:``,nt.colorspace_pars_fragment,Jx(`linearToOutputTexel`,t.outputColorSpace),Qx(),t.useDepthPacking?`#define DEPTH_PACKING `+t.depthPacking:``,`
`].filter(jr).join(`
`)),o=fh(o),o=Hp(o,t),o=Wp(o,t),a=fh(a),a=Hp(a,t),a=Wp(a,t),o=Xp(o),a=Xp(a),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,M=[d,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+M,m=[`#define varying in`,t.glslVersion===eh?``:`layout(location = 0) out highp vec4 pc_fragColor;`,t.glslVersion===eh?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+m);let v=p+M+o,C=p+m+a,S=zp(s,s.VERTEX_SHADER,v),T=zp(s,s.FRAGMENT_SHADER,C);s.attachShader(g,S),s.attachShader(g,T),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,`position`),s.linkProgram(g);function w(O){if(i.debug.checkShaderErrors){let U=s.getProgramInfoLog(g)||``,z=s.getShaderInfoLog(S)||``,$=s.getShaderInfoLog(T)||``,D=U.trim(),X=z.trim(),j=$.trim(),V=!0,le=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError==`function`)i.debug.onShaderError(s,g,S,T);else{let Y=Gp(s,S,`vertex`),oe=Gp(s,T,`fragment`);Ye(`WebGLProgram: Shader Error `+s.getError()+` - VALIDATE_STATUS `+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+D+`
`+Y+`
`+oe)}else D!==``?Ge(`WebGLProgram: Program Info Log:`,D):(X===``||j===``)&&(le=!1);le&&(O.diagnostics={runnable:V,programLog:D,vertexShader:{log:X,prefix:M},fragmentShader:{log:j,prefix:m}})}s.deleteShader(S),s.deleteShader(T),_=new Js(s,g),b=ny(s,g)}let _;this.getUniforms=function(){return _===void 0&&w(this),_};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(g,Yx)),F},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qx++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=T,this}var fy=0;var mh=class{constructor(){this.shaderCache=/* @__PURE__ */ new Map,this.materialCache=/* @__PURE__ */ new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=/* @__PURE__ */ new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new _h(e),t.set(e,n)),n}};var _h=class{constructor(e){this.id=fy++,this.code=e,this.usedTimes=0}};function my(i){return i===Gi||i===qr||i===Zr}function _y(i,e,t,n,s,r){let o=new zs,a=new mh,c=/* @__PURE__ */ new Set,l=[],h=/* @__PURE__ */ new Map,u=n.logarithmicDepthBuffer,d={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function f(_){return c.add(_),_===0?`uv`:`uv${_}`}function g(_,b,F,O,U,z){let $=O.fog,D=U.geometry,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?O.environment:null,j=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,V=e.get(_.envMap||X,j),le=d[_.type],Y=n.precision;_.precision!==null&&(Y=n.getMaxPrecision(_.precision),Y!==_.precision&&Ge(`WebGLProgram.getParameters:`,_.precision,`not supported, using`,Y,`instead.`));let oe=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ae=oe!==void 0?oe.length:0,Ae=0;D.morphAttributes.position!==void 0&&(Ae=1),D.morphAttributes.normal!==void 0&&(Ae=2),D.morphAttributes.color!==void 0&&(Ae=3);let Ze,te,Ee,Re;if(le){let be=ai[le];Ze=be.vertexShader,te=be.fragmentShader}else{Ze=_.vertexShader,te=_.fragmentShader;let be=a.getVertexShaderStage(_),gt=a.getFragmentShaderStage(_);a.update(_,be,gt),Ee=be.id,Re=gt.id}let He=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),je=U.isInstancedMesh===!0,Bt=U.isBatchedMesh===!0,Xe=!!_.map,_t=!!_.matcap,xt=!!V,st=xt&&V.isPMREMTexture===!0,jt=!!_.aoMap,Gt=!!_.lightMap,pn=!!_.bumpMap&&_.wireframe===!1,Rt=!!_.normalMap,jn=!!_.displacementMap,qt=!!_.emissiveMap,An=!!_.metalnessMap,Pn=!!_.roughnessMap,Rn=_.anisotropy>0,B=_.clearcoat>0,In=_.diffuseRoughness>0,St=_.dispersion>0,Ct=_.retroreflectivity>0,Me=_.iridescence>0,Ht=_.sheen>0,We=_.transmission>0,Je=Rn&&!!_.anisotropyMap,E=B&&!!_.clearcoatMap,x=B&&!!_.clearcoatNormalMap,H=B&&!!_.clearcoatRoughnessMap,ce=In&&!!_.diffuseRoughnessMap,re=Me&&!!_.iridescenceMap,pe=Me&&!!_.iridescenceThicknessMap,ye=Ht&&!!_.sheenColorMap,K=Ht&&!!_.sheenRoughnessMap,ne=!!_.specularMap,_e=!!_.specularColorMap,I=!!_.specularIntensityMap,se=We&&!!_.transmissionMap,J=We&&!!_.thicknessMap,ge=!!_.gradientMap,ue=!!_.alphaMap,fe=_.alphaTest>0,ze=!!_.alphaHash,et=!!_.extensions,he=ri;_.toneMapped&&(He===null||He.isXRRenderTarget===!0)&&(he=i.toneMapping);let Ve=st?V.isCompressedCubeTexture?V.image[0].mipmaps:V.mipmaps:null,Qe={shaderID:le,shaderType:_.type,shaderName:_.name,vertexShader:Ze,fragmentShader:te,defines:_.defines,customVertexShaderID:Ee,customFragmentShaderID:Re,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:Y,batching:Bt,batchingColor:Bt&&U._colorsTexture!==null,instancing:je,instancingColor:je&&U.instanceColor!==null,instancingMorph:je&&U.morphTexture!==null,outputColorSpace:He===null?i.outputColorSpace:He.isXRRenderTarget===!0?He.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Xe,matcap:_t,envMap:xt,envMapMode:xt&&V.mapping,envMapPMREM:st,envMapMaxLod:st?Ve.length-1:null,envMapSize:st?Ve[0].width:null,aoMap:jt,lightMap:Gt,bumpMap:pn,normalMap:Rt,displacementMap:jn,emissiveMap:qt,normalMapObjectSpace:Rt&&_.normalMapType===fp,normalMapTangentSpace:Rt&&_.normalMapType===$r,packedNormalMap:Rt&&_.normalMapType===$r&&my(_.normalMap.format),metalnessMap:An,roughnessMap:Pn,anisotropy:Rn,anisotropyMap:Je,clearcoat:B,clearcoatMap:E,clearcoatNormalMap:x,clearcoatRoughnessMap:H,diffuseRoughness:In,diffuseRoughnessMap:ce,dispersion:St,retroreflection:Ct,iridescence:Me,iridescenceMap:re,iridescenceThicknessMap:pe,sheen:Ht,sheenColorMap:ye,sheenRoughnessMap:K,specularMap:ne,specularColorMap:_e,specularIntensityMap:I,transmission:We,transmissionMap:se,thicknessMap:J,gradientMap:ge,opaque:_.transparent===!1&&_.blending===1&&_.alphaToCoverage===!1,alphaMap:ue,alphaTest:fe,alphaHash:ze,combine:_.combine,mapUv:Xe&&f(_.map.channel),aoMapUv:jt&&f(_.aoMap.channel),lightMapUv:Gt&&f(_.lightMap.channel),bumpMapUv:pn&&f(_.bumpMap.channel),normalMapUv:Rt&&f(_.normalMap.channel),displacementMapUv:jn&&f(_.displacementMap.channel),emissiveMapUv:qt&&f(_.emissiveMap.channel),metalnessMapUv:An&&f(_.metalnessMap.channel),roughnessMapUv:Pn&&f(_.roughnessMap.channel),anisotropyMapUv:Je&&f(_.anisotropyMap.channel),clearcoatMapUv:E&&f(_.clearcoatMap.channel),clearcoatNormalMapUv:x&&f(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&f(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ce&&f(_.diffuseRoughnessMap.channel),iridescenceMapUv:re&&f(_.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&f(_.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&f(_.sheenColorMap.channel),sheenRoughnessMapUv:K&&f(_.sheenRoughnessMap.channel),specularMapUv:ne&&f(_.specularMap.channel),specularColorMapUv:_e&&f(_.specularColorMap.channel),specularIntensityMapUv:I&&f(_.specularIntensityMap.channel),transmissionMapUv:se&&f(_.transmissionMap.channel),thicknessMapUv:J&&f(_.thicknessMap.channel),alphaMapUv:ue&&f(_.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(Rt||Rn),vertexNormals:!!D.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!D.attributes.uv&&(Xe||ue),fog:!!$,useFog:_.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||D.attributes.normal===void 0&&Rt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:we,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:Ae,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:z.filter(be=>be.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,decodeVideoTexture:Xe&&_.map.isVideoTexture===!0&&at.getTransfer(_.map.colorSpace)===mt,decodeVideoTextureEmissive:qt&&_.emissiveMap.isVideoTexture===!0&&at.getTransfer(_.emissiveMap.colorSpace)===mt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===2,flipSided:_.side===1,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:et&&_.extensions.clipCullDistance===!0&&t.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(et&&_.extensions.multiDraw===!0||Bt)&&t.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:t.has(`KHR_parallel_shader_compile`),customProgramCacheKey:_.customProgramCacheKey()};return Qe.vertexUv1s=c.has(1),Qe.vertexUv2s=c.has(2),Qe.vertexUv3s=c.has(3),c.clear(),Qe}function M(_){let b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(let F in _.defines)b.push(F),b.push(_.defines[F]);return _.isRawShaderMaterial===!1&&(m(b,_),p(b,_),b.push(i.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function m(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapPMREM),_.push(b.envMapMaxLod),_.push(b.envMapSize),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.diffuseRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.numLightProbeGrids),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function p(_,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.diffuseRoughness&&o.enable(25),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function v(_){let b=d[_.type],F;if(b){let O=ai[b];F=Tp.clone(O.uniforms)}else F=_.uniforms;return F}function C(_,b){let F=h.get(b);return F!==void 0?++F.usedTimes:(F=new py(i,b,_,s),l.push(F),h.set(b,F)),F}function S(_){if(--_.usedTimes===0){let b=l.indexOf(_);l[b]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function T(_){a.remove(_)}function w(){a.dispose()}return{getParameters:g,getProgramCacheKey:M,getUniforms:v,acquireProgram:C,releaseProgram:S,releaseShaderCache:T,programs:l,dispose:w}}function gy(){let i=/* @__PURE__ */ new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=/* @__PURE__ */ new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function xy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function qp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Zp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,g,M,m,p){let v=i[e];return v===void 0?(v={id:d.id,object:d,geometry:f,material:g,materialVariant:o(d),groupOrder:M,renderOrder:d.renderOrder,z:m,group:p},i[e]=v):(v.id=d.id,v.object=d,v.geometry=f,v.material=g,v.materialVariant=o(d),v.groupOrder=M,v.renderOrder=d.renderOrder,v.z=m,v.group=p),e++,v}function c(d,f,g,M,m,p,v){v.reversedDepth===!0&&(m=-m);let C=a(d,f,g,M,m,p);g.transmission>0?n.push(C):g.transparent===!0?s.push(C):t.push(C)}function l(d,f,g,M,m,p){let v=a(d,f,g,M,m,p);g.transmission>0?n.unshift(v):g.transparent===!0?s.unshift(v):t.unshift(v)}function h(d,f){t.length>1&&t.sort(d||xy),n.length>1&&n.sort(f||qp),s.length>1&&s.sort(f||qp)}function u(){for(let d=e,f=i.length;d<f;d++){let g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function yy(){let i=/* @__PURE__ */ new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Zp,i.set(n,[o])):s>=r.length?(o=new Zp,r.push(o)):o=r[s],o}function t(){i=/* @__PURE__ */ new WeakMap}return{get:e,dispose:t}}function vy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case`SunLight`:case`DirectionalLight`:t={direction:new L,color:new qe};break;case`SpotLight`:t={position:new L,direction:new L,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:t={position:new L,color:new qe,distance:0,decay:0};break;case`HemisphereLight`:t={direction:new L,skyColor:new qe,groundColor:new qe};break;case`RectAreaLight`:t={color:new qe,position:new L,halfWidth:new L,halfHeight:new L}}return i[e.id]=t,t}}}function My(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case`SunLight`:case`DirectionalLight`:t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case`SpotLight`:t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case`PointLight`:t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3}}return i[e.id]=t,t}}}var by=0;function Sy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Cy(i){let e=new vy,t=My(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new dt,o=new dt;function a(l){let h=0,u=0,d=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let f=0,g=0,M=0,m=0,p=0,v=0,C=0,S=0,T=0,w=0,_=0,b=0,F=0,O=0;l.sort(Sy);for(let z=0,$=l.length;z<$;z++){let D=l[z],X=D.color,j=D.intensity,V=D.distance,le=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Gi?le=D.shadow.map.texture:le=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=X.r*j,u+=X.g*j,d+=X.b*j;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(D.sh.coefficients[Y],j);O++}else if(D.isSunLight){let Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let oe=D.shadow,ae=t.get(D);ae.shadowIntensity=oe.intensity,ae.shadowBias=oe.bias,ae.shadowNormalBias=oe.normalBias,ae.shadowRadius=oe.radius,ae.shadowMapSize.copy(oe.mapSize).multiply(oe.getFrameExtents()),n.sunShadow[g]=ae,n.sunShadowMap[g]=le;let Ae=oe.getViewportCount();for(let Ze=0;Ze<Ae;Ze++)n.sunShadowMatrix[M+Ze]=oe.getMatrix(Ze),n.sunShadowCascade[M+Ze]=oe._cascadeData[Ze];M+=Ae,g++}n.sun[f]=Y,f++}else if(D.isDirectionalLight){let Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let oe=D.shadow,ae=t.get(D);ae.shadowIntensity=oe.intensity,ae.shadowBias=oe.bias,ae.shadowNormalBias=oe.normalBias,ae.shadowRadius=oe.radius,ae.shadowMapSize=oe.mapSize,n.directionalShadow[m]=ae,n.directionalShadowMap[m]=le,n.directionalShadowMatrix[m]=D.shadow.matrix,T++}n.directional[m]=Y,m++}else if(D.isSpotLight){let Y=e.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(X).multiplyScalar(j),Y.distance=V,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,n.spot[v]=Y;let oe=D.shadow;if(D.map&&(n.spotLightMap[b]=D.map,b++,oe.updateMatrices(D),D.castShadow&&F++),n.spotLightMatrix[v]=oe.matrix,D.castShadow){let ae=t.get(D);ae.shadowIntensity=oe.intensity,ae.shadowBias=oe.bias,ae.shadowNormalBias=oe.normalBias,ae.shadowRadius=oe.radius,ae.shadowMapSize=oe.mapSize,n.spotShadow[v]=ae,n.spotShadowMap[v]=le,_++}v++}else if(D.isRectAreaLight){let Y=e.get(D);Y.color.copy(X).multiplyScalar(j),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),n.rectArea[C]=Y,C++}else if(D.isPointLight){let Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){let oe=D.shadow,ae=t.get(D);ae.shadowIntensity=oe.intensity,ae.shadowBias=oe.bias,ae.shadowNormalBias=oe.normalBias,ae.shadowRadius=oe.radius,ae.shadowMapSize=oe.mapSize,ae.shadowCameraNear=oe.camera.near,ae.shadowCameraFar=oe.camera.far,n.pointShadow[p]=ae,n.pointShadowMap[p]=le,n.pointShadowMatrix[p]=D.shadow.matrix,w++}n.point[p]=Y,p++}else if(D.isHemisphereLight){let Y=e.get(D);Y.skyColor.copy(D.color).multiplyScalar(j),Y.groundColor.copy(D.groundColor).multiplyScalar(j),n.hemi[S]=Y,S++}}C>0&&(i.has(`OES_texture_float_linear`)===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let U=n.hash;(U.sunLength!==f||U.directionalLength!==m||U.pointLength!==p||U.spotLength!==v||U.rectAreaLength!==C||U.hemiLength!==S||U.numSunShadows!==g||U.numDirectionalShadows!==T||U.numPointShadows!==w||U.numSpotShadows!==_||U.numSpotMaps!==b||U.numLightProbes!==O)&&(n.sun.length=f,n.directional.length=m,n.spot.length=v,n.rectArea.length=C,n.point.length=p,n.hemi.length=S,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+b-F,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=F,n.numLightProbes=O,U.sunLength=f,U.directionalLength=m,U.pointLength=p,U.spotLength=v,U.rectAreaLength=C,U.hemiLength=S,U.numSunShadows=g,U.numDirectionalShadows=T,U.numPointShadows=w,U.numSpotShadows=_,U.numSpotMaps=b,U.numLightProbes=O,n.version=by++)}function c(l,h){let u=0,d=0,f=0,g=0,M=0,m=0,p=h.matrixWorldInverse;for(let v=0,C=l.length;v<C;v++){let S=l[v];if(S.isSunLight){let T=n.sun[u];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(p),u++}else if(S.isDirectionalLight){let T=n.directional[d];T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),d++}else if(S.isSpotLight){let T=n.spot[g];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),g++}else if(S.isRectAreaLight){let T=n.rectArea[M];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(p),o.identity(),r.copy(S.matrixWorld),r.premultiply(p),o.extractRotation(r),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),M++}else if(S.isPointLight){let T=n.point[f];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){let T=n.hemi[m];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(p),m++}}}return{setup:a,setupView:c,state:n}}function $p(i){let e=new Cy(i),t=[],n=[],s=[];function r(u){h.camera=u,t.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):t.push(u)}function a(u){n.push(u)}function c(){e.setup(t),s.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function l(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Ey(i){let e=/* @__PURE__ */ new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new $p(i),e.set(s,[a])):r>=o.length?(a=new $p(i),o.push(a)):a=o[r],a}function n(){e=/* @__PURE__ */ new WeakMap}return{get:t,dispose:n}}var wy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`;var Ty=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`;var Ay=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)];var Py=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)];var Jp=new dt;var Kr=new L;var hh=new L;function Ry(i,e,t){let n=new Ni,s=new Ne,r=new Ne,o=new Tt,a=new ua,c=new pa,l={},h=t.maxTextureSize,u={[0]:1,[1]:0,[2]:2},d=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:wy,fragmentShader:Ty}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Dt;g.setAttribute(`position`,new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new Se(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let p=this.type;this.render=function(w,_,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Xu&&(Ge(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let F=i.getRenderTarget(),O=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),z=i.state;z.setBlending(ss),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let $=p!==this.type;$&&_.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(X=>X.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,X=w.length;D<X;D++){let j=w[D],V=j.shadow;if(V===void 0){Ge(`WebGLShadowMap:`,j,`has no shadow.`);continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let le=V.getFrameExtents();s.multiply(le),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/le.x),s.x=r.x*le.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/le.y),s.y=r.y*le.y,V.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=Y,V.map===null||$===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Ys){if(j.isPointLight){Ge(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}V.map=new wn(s.x,s.y,{format:Gi,type:$n,minFilter:un,magFilter:un,generateMipmaps:!1}),V.map.texture.name=j.name+`.shadowMap`,V.map.depthTexture=new bi(s.x,s.y,kn),V.map.depthTexture.name=j.name+`.shadowMapDepth`,V.map.depthTexture.format=yi,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ut,V.map.depthTexture.magFilter=Ut}else j.isPointLight?(V.map=new Qr(s.x),V.map.depthTexture=new Pr(s.x,Zn)):(V.map=new wn(s.x,s.y),V.map.depthTexture=new bi(s.x,s.y,Zn)),V.map.depthTexture.name=j.name+`.shadowMap`,V.map.depthTexture.format=yi,this.type===1?(V.map.depthTexture.compareFunction=Y?Kc:Jc,V.map.depthTexture.minFilter=un,V.map.depthTexture.magFilter=un):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ut,V.map.depthTexture.magFilter=Ut);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y)&&V.map.setSize(s.x,s.y);let oe=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();j.isPointLight!==!0&&V.updateMatrices(j,b);let ae=(V.camera.layers.mask&4294967294)!==0?V.camera.layers:b.layers;for(let Ae=0;Ae<oe;Ae++){let Ze=V.getCamera(Ae);if(j.isPointLight){let te=V.camera,Ee=V.matrix,Re=j.distance||te.far;Re!==te.far&&(te.far=Re,te.updateProjectionMatrix()),Kr.setFromMatrixPosition(j.matrixWorld),te.position.copy(Kr),hh.copy(te.position),hh.add(Ay[Ae]),te.up.copy(Py[Ae]),te.lookAt(hh),te.updateMatrixWorld(),Ee.makeTranslation(-Kr.x,-Kr.y,-Kr.z),Jp.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Jp,te.coordinateSystem,te.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,Ae),i.clear();else{Ae===0&&(i.setRenderTarget(V.map),i.clear());let te=V.getViewport(Ae);o.set(r.x*te.x,r.y*te.y,r.x*te.z,r.y*te.w),z.viewport(o)}n=V.getFrustum(Ae),S(_,b,Ze,j,ae,this.type)}V.isPointLightShadow!==!0&&this.type===Ys&&v(V,b),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(F,O,U)};function v(w,_){let b=e.update(M);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new wn(s.x,s.y,{format:Gi,type:$n}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(_,null,b,d,M,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(_,null,b,f,M,null)}function C(w,_,b,F){let O=null,U=b.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(U!==void 0)O=U;else if(O=b.isPointLight===!0?c:a,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let z=O.uuid,$=_.uuid,D=l[z];D===void 0&&(D={},l[z]=D);let X=D[$];X===void 0&&(X=O.clone(),D[$]=X,_.addEventListener(`dispose`,T)),O=X}if(O.visible=_.visible,O.wireframe=_.wireframe,F===Ys?O.side=_.shadowSide!==null?_.shadowSide:_.side:O.side=_.shadowSide!==null?_.shadowSide:u[_.side],O.alphaMap=_.alphaMap,O.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,O.map=_.map,O.clipShadows=_.clipShadows,O.clippingPlanes=_.clippingPlanes,O.clipIntersection=_.clipIntersection,O.displacementMap=_.displacementMap,O.displacementScale=_.displacementScale,O.displacementBias=_.displacementBias,O.wireframeLinewidth=_.wireframeLinewidth,O.linewidth=_.linewidth,b.isPointLight===!0&&O.isMeshDistanceMaterial===!0){let z=i.properties.get(O);z.light=b}return O}function S(w,_,b,F,O,U){if(w.visible===!1)return;if(w.layers.test(O)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&U===Ys)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,w.matrixWorld);let D=e.update(w),X=w.material;if(Array.isArray(X)){let j=D.groups;for(let V=0,le=j.length;V<le;V++){let Y=j[V],oe=X[Y.materialIndex];if(oe&&oe.visible){let ae=C(w,oe,F,U);w.onBeforeShadow(i,w,_,b,D,ae,Y),i.renderBufferDirect(b,null,D,ae,w,Y),w.onAfterShadow(i,w,_,b,D,ae,Y)}}}else if(X.visible){let j=C(w,X,F,U);w.onBeforeShadow(i,w,_,b,D,j,null),i.renderBufferDirect(b,null,D,j,w,null),w.onAfterShadow(i,w,_,b,D,j,null)}}let $=w.children;for(let D=0,X=$.length;D<X;D++)S($[D],_,b,F,O,U)}function T(w){w.target.removeEventListener(`dispose`,T);for(let b in l){let F=l[b],O=w.target.uuid;O in F&&(F[O].dispose(),delete F[O])}}}function Iy(i,e){function t(){let I=!1,se=new Tt,J=null,ge=new Tt(0,0,0,0);return{setMask:function(ue){J!==ue&&!I&&(i.colorMask(ue,ue,ue,ue),J=ue)},setLocked:function(ue){I=ue},setClear:function(ue,fe,ze,et,he){he===!0&&(ue*=et,fe*=et,ze*=et),se.set(ue,fe,ze,et),ge.equals(se)===!1&&(i.clearColor(ue,fe,ze,et),ge.copy(se))},reset:function(){I=!1,J=null,ge.set(-1,0,0,0)}}}function n(){let I=!1,se=!1,J=null,ge=null,ue=null;return{setReversed:function(fe){if(se!==fe){let ze=e.get(`EXT_clip_control`);fe?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),se=fe;let et=ue;ue=null,this.setClear(et)}},getReversed:function(){return se},setTest:function(fe){fe?we(i.DEPTH_TEST):je(i.DEPTH_TEST)},setMask:function(fe){J!==fe&&!I&&(i.depthMask(fe),J=fe)},setFunc:function(fe){if(se&&(fe=Cp[fe]),ge!==fe){switch(fe){case Yo:i.depthFunc(i.NEVER);break;case qo:i.depthFunc(i.ALWAYS);break;case Zo:i.depthFunc(i.LESS);break;case Ds:i.depthFunc(i.LEQUAL);break;case $o:i.depthFunc(i.EQUAL);break;case Jo:i.depthFunc(i.GEQUAL);break;case Ko:i.depthFunc(i.GREATER);break;case jo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=fe}},setLocked:function(fe){I=fe},setClear:function(fe){ue!==fe&&(ue=fe,se&&(fe=1-fe),i.clearDepth(fe))},reset:function(){I=!1,J=null,ge=null,ue=null,se=!1}}}function s(){let I=!1,se=null,J=null,ge=null,ue=null,fe=null,ze=null,et=null,he=null;return{setTest:function(Ve){I||(Ve?we(i.STENCIL_TEST):je(i.STENCIL_TEST))},setMask:function(Ve){se!==Ve&&!I&&(i.stencilMask(Ve),se=Ve)},setFunc:function(Ve,Qe,be){(J!==Ve||ge!==Qe||ue!==be)&&(i.stencilFunc(Ve,Qe,be),J=Ve,ge=Qe,ue=be)},setOp:function(Ve,Qe,be){(fe!==Ve||ze!==Qe||et!==be)&&(i.stencilOp(Ve,Qe,be),fe=Ve,ze=Qe,et=be)},setLocked:function(Ve){I=Ve},setClear:function(Ve){he!==Ve&&(i.clearStencil(Ve),he=Ve)},reset:function(){I=!1,se=null,J=null,ge=null,ue=null,fe=null,ze=null,et=null,he=null}}}let r=new t,o=new n,a=new s,c={},l=/* @__PURE__ */ new WeakMap,h={},u={},d={},f=/* @__PURE__ */ new WeakMap,g=[],M=null,m=!1,p=null,v=null,C=null,S=null,T=null,w=null,_=null,b=new qe(0,0,0),F=0,O=!1,U=null,z=null,$=null,D=null,X=null,j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,le=0,Y=i.getParameter(i.VERSION);Y.indexOf(`WebGL`)!==-1?(le=parseFloat(/^WebGL (\d)/.exec(Y)[1]),V=le>=1):Y.indexOf(`OpenGL ES`)!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),V=le>=2);let oe=null,ae={},Ae=i.getParameter(i.SCISSOR_BOX),Ze=i.getParameter(i.VIEWPORT),te=new Tt().fromArray(Ae),Ee=new Tt().fromArray(Ze);function Re(I,se,J,ge){let ue=/* @__PURE__ */ new Uint8Array(4),fe=i.createTexture();i.bindTexture(I,fe),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<J;ze++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(se+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return fe}let He={};He[i.TEXTURE_2D]=Re(i.TEXTURE_2D,i.TEXTURE_2D,1),He[i.TEXTURE_CUBE_MAP]=Re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),He[i.TEXTURE_2D_ARRAY]=Re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),He[i.TEXTURE_3D]=Re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),we(i.DEPTH_TEST),o.setFunc(Ds),pn(!1),Rt(Rc),we(i.CULL_FACE),jt(ss);function we(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function je(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Bt(I,se){return d[I]!==se?(i.bindFramebuffer(I,se),d[I]=se,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=se),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Xe(I,se){let J=g,ge=!1;if(I){J=f.get(se),J===void 0&&(J=[],f.set(se,J));let ue=I.textures;if(J.length!==ue.length||J[0]!==i.COLOR_ATTACHMENT0){for(let fe=0,ze=ue.length;fe<ze;fe++)J[fe]=i.COLOR_ATTACHMENT0+fe;J.length=ue.length,ge=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ge=!0);ge&&i.drawBuffers(J)}function _t(I){return M!==I?(i.useProgram(I),M=I,!0):!1}let xt={[rs]:i.FUNC_ADD,[qu]:i.FUNC_SUBTRACT,[Zu]:i.FUNC_REVERSE_SUBTRACT};xt[$u]=i.MIN,xt[Ju]=i.MAX;let st={[Ku]:i.ZERO,[ju]:i.ONE,[Qu]:i.SRC_COLOR,[Dc]:i.SRC_ALPHA,[rp]:i.SRC_ALPHA_SATURATE,[ip]:i.DST_COLOR,[tp]:i.DST_ALPHA,[ep]:i.ONE_MINUS_SRC_COLOR,[Nc]:i.ONE_MINUS_SRC_ALPHA,[sp]:i.ONE_MINUS_DST_COLOR,[np]:i.ONE_MINUS_DST_ALPHA,[op]:i.CONSTANT_COLOR,[ap]:i.ONE_MINUS_CONSTANT_COLOR,[lp]:i.CONSTANT_ALPHA,[cp]:i.ONE_MINUS_CONSTANT_ALPHA};function jt(I,se,J,ge,ue,fe,ze,et,he,Ve){if(I===ss){m===!0&&(je(i.BLEND),m=!1);return}if(m===!1&&(we(i.BLEND),m=!0),I!==Yu){if(I!==p||Ve!==O){if((v!==rs||T!==rs)&&(i.blendEquation(i.FUNC_ADD),v=rs,T=rs),Ve)switch(I){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case Lc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Oc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ye(`WebGLState: Invalid blending: `,I)}else switch(I){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Lc:Ye(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case Oc:Ye(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:Ye(`WebGLState: Invalid blending: `,I)}C=null,S=null,w=null,_=null,b.set(0,0,0),F=0,p=I,O=Ve}return}ue=ue||se,fe=fe||J,ze=ze||ge,(se!==v||ue!==T)&&(i.blendEquationSeparate(xt[se],xt[ue]),v=se,T=ue),(J!==C||ge!==S||fe!==w||ze!==_)&&(i.blendFuncSeparate(st[J],st[ge],st[fe],st[ze]),C=J,S=ge,w=fe,_=ze),(et.equals(b)===!1||he!==F)&&(i.blendColor(et.r,et.g,et.b,he),b.copy(et),F=he),p=I,O=!1}function Gt(I,se){I.side===2?je(i.CULL_FACE):we(i.CULL_FACE);let J=I.side===1;se&&(J=!J),pn(J),I.blending===1&&I.transparent===!1?jt(ss):jt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);let ge=I.stencilWrite;a.setTest(ge),ge&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),qt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?we(i.SAMPLE_ALPHA_TO_COVERAGE):je(i.SAMPLE_ALPHA_TO_COVERAGE)}function pn(I){U!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),U=I)}function Rt(I){I!==Hu?(we(i.CULL_FACE),I!==z&&(I===Rc?i.cullFace(i.BACK):I===Wu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):je(i.CULL_FACE),z=I}function jn(I){I!==$&&(V&&i.lineWidth(I),$=I)}function qt(I,se,J){I?(we(i.POLYGON_OFFSET_FILL),(D!==se||X!==J)&&(D=se,X=J,o.getReversed()&&(se=-se,J=-J),i.polygonOffset(se,J))):je(i.POLYGON_OFFSET_FILL)}function An(I){I?we(i.SCISSOR_TEST):je(i.SCISSOR_TEST)}function Pn(I){I===void 0&&(I=i.TEXTURE0+j-1),oe!==I&&(i.activeTexture(I),oe=I)}function Rn(I,se,J){J===void 0&&(oe===null?J=i.TEXTURE0+j-1:J=oe);let ge=ae[J];ge===void 0&&(ge={type:void 0,texture:void 0},ae[J]=ge),(ge.type!==I||ge.texture!==se)&&(oe!==J&&(i.activeTexture(J),oe=J),i.bindTexture(I,se||He[I]),ge.type=I,ge.texture=se)}function B(){let I=ae[oe];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function In(){try{i.compressedTexImage2D(...arguments)}catch(I){Ye(`WebGLState:`,I)}}function St(){try{i.compressedTexImage3D(...arguments)}catch(I){Ye(`WebGLState:`,I)}}function Ct(){try{i.texSubImage2D(...arguments)}catch(I){Ye(`WebGLState:`,I)}}function Me(){try{i.texSubImage3D(...arguments)}catch(I){Ye(`WebGLState:`,I)}}function Ht(){try{i.compressedTexSubImage2D(...arguments)}catch(I){Ye(`WebGLState:`,I)}}function We(){try{i.compressedTexSubImage3D(...arguments)}catch(I){Ye(`WebGLState:`,I)}}function Je(){try{i.texStorage2D(...arguments)}catch(I){Ye(`WebGLState:`,I)}}function E(){try{i.texStorage3D(...arguments)}catch(I){Ye(`WebGLState:`,I)}}function x(){try{i.texImage2D(...arguments)}catch(I){Ye(`WebGLState:`,I)}}function H(){try{i.texImage3D(...arguments)}catch(I){Ye(`WebGLState:`,I)}}function ce(I){return u[I]!==void 0?u[I]:i.getParameter(I)}function re(I,se){u[I]!==se&&(i.pixelStorei(I,se),u[I]=se)}function pe(I){te.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),te.copy(I))}function ye(I){Ee.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),Ee.copy(I))}function K(I,se){let J=l.get(se);J===void 0&&(J=/* @__PURE__ */ new WeakMap,l.set(se,J));let ge=J.get(I);ge===void 0&&(ge=i.getUniformBlockIndex(se,I.name),i.uniformBlockBinding(se,ge,ge),J.set(I,ge))}function ne(I,se,J){let ue=l.get(se).get(I);c[ue]!==J&&(i.bindBufferBase(i.UNIFORM_BUFFER,ue,J),c[ue]=J)}function _e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},oe=null,ae={},d={},c={},f=/* @__PURE__ */ new WeakMap,g=[],M=null,m=!1,p=null,v=null,C=null,S=null,T=null,w=null,_=null,b=new qe(0,0,0),F=0,O=!1,U=null,z=null,$=null,D=null,X=null,te.set(0,0,i.canvas.width,i.canvas.height),Ee.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:we,disable:je,bindFramebuffer:Bt,drawBuffers:Xe,useProgram:_t,setBlending:jt,setMaterial:Gt,setFlipSided:pn,setCullFace:Rt,setLineWidth:jn,setPolygonOffset:qt,setScissorTest:An,activeTexture:Pn,bindTexture:Rn,unbindTexture:B,compressedTexImage2D:In,compressedTexImage3D:St,texImage2D:x,texImage3D:H,pixelStorei:re,getParameter:ce,updateUBOMapping:K,uniformBlockBinding:ne,texStorage2D:Je,texStorage3D:E,texSubImage2D:Ct,texSubImage3D:Me,compressedTexSubImage2D:Ht,compressedTexSubImage3D:We,scissor:pe,viewport:ye,reset:_e}}function Ly(i,e,t,n,s,r,o){let a=e.has(`WEBGL_multisampled_render_to_texture`)?e.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ne,h=/* @__PURE__ */ new WeakMap,u=/* @__PURE__ */ new Set,d,f=/* @__PURE__ */ new WeakMap,g=/* @__PURE__ */ new Set,M=new FinalizationRegistry(E=>g.delete(E)),m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function p(E,x){return m?new OffscreenCanvas(E,x):Fs(`canvas`)}function v(E,x,H){let ce=1,re=Je(E);if((re.width>H||re.height>H)&&(ce=H/Math.max(re.width,re.height)),ce<1)if(typeof HTMLImageElement<`u`&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&E instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&E instanceof ImageBitmap||typeof VideoFrame<`u`&&E instanceof VideoFrame){let pe=Math.floor(ce*re.width),ye=Math.floor(ce*re.height);d===void 0&&(d=p(pe,ye));let K=x?p(pe,ye):d;return K.width=pe,K.height=ye,K.getContext(`2d`).drawImage(E,0,0,pe,ye),Ge(`WebGLRenderer: Texture has been resized from (`+re.width+`x`+re.height+`) to (`+pe+`x`+ye+`).`),K}else return`data`in E&&Ge(`WebGLRenderer: Image in DataTexture is too big (`+re.width+`x`+re.height+`).`),E;return E}function C(E){return E.generateMipmaps}function S(E){i.generateMipmap(E)}function T(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(E,x,H,ce,re,pe=!1){if(E!==null){if(i[E]!==void 0)return i[E];Ge(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+E+`'`)}let ye;ce&&(ye=e.get(`EXT_texture_norm16`),ye||Ge(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let K=x;if(x===i.RED&&(H===i.FLOAT&&(K=i.R32F),H===i.HALF_FLOAT&&(K=i.R16F),H===i.UNSIGNED_BYTE&&(K=i.R8),H===i.UNSIGNED_SHORT&&ye&&(K=ye.R16_EXT),H===i.SHORT&&ye&&(K=ye.R16_SNORM_EXT)),x===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.R8UI),H===i.UNSIGNED_SHORT&&(K=i.R16UI),H===i.UNSIGNED_INT&&(K=i.R32UI),H===i.BYTE&&(K=i.R8I),H===i.SHORT&&(K=i.R16I),H===i.INT&&(K=i.R32I)),x===i.RG&&(H===i.FLOAT&&(K=i.RG32F),H===i.HALF_FLOAT&&(K=i.RG16F),H===i.UNSIGNED_BYTE&&(K=i.RG8),H===i.UNSIGNED_SHORT&&ye&&(K=ye.RG16_EXT),H===i.SHORT&&ye&&(K=ye.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RG8UI),H===i.UNSIGNED_SHORT&&(K=i.RG16UI),H===i.UNSIGNED_INT&&(K=i.RG32UI),H===i.BYTE&&(K=i.RG8I),H===i.SHORT&&(K=i.RG16I),H===i.INT&&(K=i.RG32I)),x===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGB8UI),H===i.UNSIGNED_SHORT&&(K=i.RGB16UI),H===i.UNSIGNED_INT&&(K=i.RGB32UI),H===i.BYTE&&(K=i.RGB8I),H===i.SHORT&&(K=i.RGB16I),H===i.INT&&(K=i.RGB32I)),x===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),H===i.UNSIGNED_INT&&(K=i.RGBA32UI),H===i.BYTE&&(K=i.RGBA8I),H===i.SHORT&&(K=i.RGBA16I),H===i.INT&&(K=i.RGBA32I)),x===i.RGB&&(H===i.UNSIGNED_SHORT&&ye&&(K=ye.RGB16_EXT),H===i.SHORT&&ye&&(K=ye.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),x===i.RGBA){let ne=pe?gr:at.getTransfer(re);H===i.FLOAT&&(K=i.RGBA32F),H===i.HALF_FLOAT&&(K=i.RGBA16F),H===i.UNSIGNED_BYTE&&(K=ne===mt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&ye&&(K=ye.RGBA16_EXT),H===i.SHORT&&ye&&(K=ye.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get(`EXT_color_buffer_float`),K}function _(E,x){let H;return E?x===null||x===Zn||x===as?H=i.DEPTH24_STENCIL8:x===kn?H=i.DEPTH32F_STENCIL8:x===$s&&(H=i.DEPTH24_STENCIL8,Ge(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):x===null||x===Zn||x===as?H=i.DEPTH_COMPONENT24:x===kn?H=i.DEPTH_COMPONENT32F:x===$s&&(H=i.DEPTH_COMPONENT16),H}function b(E,x){return C(E)===!0||E.isFramebufferTexture&&E.minFilter!==1003&&E.minFilter!==1006?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function F(E){let x=new WeakRef(E);n.get(E).__ref=x,g.add(x),M.register(E,x,x)}function O(E){let x=n.get(E).__ref;x!==void 0&&(g.delete(x),M.unregister(x))}function U(E){$(E.target)}function z(E){D(E.target)}function $(E){E.removeEventListener(`dispose`,U),O(E),j(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&u.delete(E)}function D(E){E.removeEventListener(`dispose`,z),O(E),le(E)}function X(){for(let E of g){let x=E.deref();x!==void 0&&(x.isRenderTarget===!0?D(x):$(x))}g.clear(),u.clear()}function j(E){let x=n.get(E);if(x.__webglInit===void 0)return;let H=E.source,ce=f.get(H);if(ce){let re=ce[x.__cacheKey];re.usedTimes--,re.usedTimes===0&&V(E),Object.keys(ce).length===0&&f.delete(H)}n.remove(E)}function V(E){let x=n.get(E);i.deleteTexture(x.__webglTexture);let H=E.source,ce=f.get(H);delete ce[x.__cacheKey],o.memory.textures--}function le(E){let x=n.get(E);x.__depthDisposeCallback&&x.__depthDisposeCallback();let H=E.depthTexture;if(H&&H.renderTarget===E&&$(H),E.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(x.__webglFramebuffer[re]))for(let pe=0;pe<x.__webglFramebuffer[re].length;pe++)i.deleteFramebuffer(x.__webglFramebuffer[re][pe]);else i.deleteFramebuffer(x.__webglFramebuffer[re]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[re])}else{if(Array.isArray(x.__webglFramebuffer))for(let re=0;re<x.__webglFramebuffer.length;re++)i.deleteFramebuffer(x.__webglFramebuffer[re]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let re=0;re<x.__webglColorRenderbuffer.length;re++)x.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[re]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let ce=E.textures;for(let re=0,pe=ce.length;re<pe;re++){let ye=n.get(ce[re]);ye.__webglTexture&&(i.deleteTexture(ye.__webglTexture),o.memory.textures--),n.remove(ce[re])}n.remove(E)}let Y=0;function oe(){Y=0}function ae(){return Y}function Ae(E){Y=E}function Ze(){let E=Y;return E>=s.maxTextures&&Ge(`WebGLTextures: Trying to use `+(E+1)+` texture units while this GPU supports only `+s.maxTextures),Y+=1,E}function te(E){let x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.mipmapsAutoUpdate),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function Ee(E,x){let H=n.get(E);if(E.isVideoTexture&&Ht(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&H.__version!==E.version){let ce=E.image;if(ce===null)Ge(`WebGLRenderer: Texture marked for update but no image data found.`);else if(ce.complete===!1)Ge(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Gt(H,E,x);return}}else E.isExternalTexture&&(H.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+x)}function Re(E,x){let H=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){Gt(H,E,x);return}else E.isExternalTexture&&(H.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+x)}function He(E,x){let H=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){Gt(H,E,x);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+x)}function we(E,x){let H=n.get(E);if(E.version>0&&H.__version!==E.version){pn(H,E,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+x)}let je={[Qo]:i.REPEAT,[ni]:i.CLAMP_TO_EDGE,[ea]:i.MIRRORED_REPEAT},Bt={[Ut]:i.NEAREST,[up]:i.NEAREST_MIPMAP_NEAREST,[Gr]:i.NEAREST_MIPMAP_LINEAR,[un]:i.LINEAR,[Aa]:i.LINEAR_MIPMAP_NEAREST,[Ei]:i.LINEAR_MIPMAP_LINEAR},Xe={[_p]:i.NEVER,[jc]:i.ALWAYS,[gp]:i.LESS,[Jc]:i.LEQUAL,[xp]:i.EQUAL,[Kc]:i.GEQUAL,[yp]:i.GREATER,[vp]:i.NOTEQUAL};function _t(E,x){if(x.type===kn&&e.has(`OES_texture_float_linear`)===!1&&(x.magFilter===1006||x.magFilter===Aa||x.magFilter===Gr||x.magFilter===1008||x.minFilter===1006||x.minFilter===Aa||x.minFilter===Gr||x.minFilter===1008)&&Ge(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),i.texParameteri(E,i.TEXTURE_WRAP_S,je[x.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,je[x.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,je[x.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Bt[x.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Bt[x.minFilter]),x.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,Xe[x.compareFunction])),e.has(`EXT_texture_filter_anisotropic`)===!0){if(x.magFilter===1003||x.minFilter!==Gr&&x.minFilter!==1008||x.type===kn&&e.has(`OES_texture_float_linear`)===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let H=e.get(`EXT_texture_filter_anisotropic`);i.texParameterf(E,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function xt(E,x){let H=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener(`dispose`,U),F(x));let ce=x.source,re=f.get(ce);re===void 0&&(re={},f.set(ce,re));let pe=te(x);if(pe!==E.__cacheKey){re[pe]===void 0&&(re[pe]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),re[pe].usedTimes++;let ye=re[E.__cacheKey];ye!==void 0&&(re[E.__cacheKey].usedTimes--,ye.usedTimes===0&&V(x)),E.__cacheKey=pe,E.__webglTexture=re[pe].texture}return H}function st(E,x,H){return Math.floor(Math.floor(E/H)/x)}function jt(E,x,H,ce){let pe=E.updateRanges;if(pe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,H,ce,x.data);else{pe.sort((I,se)=>I.start-se.start);let ye=0;for(let I=1;I<pe.length;I++){let se=pe[ye],J=pe[I],ge=se.start+se.count,ue=st(J.start,x.width,4),fe=st(se.start,x.width,4);J.start<=ge+1&&ue===fe&&st(J.start+J.count-1,x.width,4)===ue?se.count=Math.max(se.count,J.start+J.count-se.start):(++ye,pe[ye]=J)}pe.length=ye+1;let K=t.getParameter(i.UNPACK_ROW_LENGTH),ne=t.getParameter(i.UNPACK_SKIP_PIXELS),_e=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let I=0,se=pe.length;I<se;I++){let J=pe[I],ge=Math.floor(J.start/4),ue=Math.ceil(J.count/4),fe=ge%x.width,ze=Math.floor(ge/x.width),et=ue;t.pixelStorei(i.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(i.UNPACK_SKIP_ROWS,ze),t.texSubImage2D(i.TEXTURE_2D,0,fe,ze,et,1,H,ce,x.data)}E.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,K),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,_e)}}function Gt(E,x,H){let ce=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(ce=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(ce=i.TEXTURE_3D);let re=xt(E,x),pe=x.source;t.bindTexture(ce,E.__webglTexture,i.TEXTURE0+H);let ye=n.get(pe);if(pe.version!==ye.__version||re===!0){if(t.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<`u`&&x.image instanceof ImageBitmap)===!1){let he=at.getPrimaries(at.workingColorSpace),Ve=x.colorSpace===``?null:at.getPrimaries(x.colorSpace),Qe=x.colorSpace===``||he===Ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let ne=v(x.image,!1,s.maxTextureSize);ne=We(x,ne);let _e=r.convert(x.format,x.colorSpace),I=r.convert(x.type),se=w(x.internalFormat,_e,I,x.normalized,x.colorSpace,x.isVideoTexture);_t(ce,x);let J,ge=x.mipmaps,ue=x.isVideoTexture!==!0,fe=ye.__version===void 0||re===!0,ze=pe.dataReady,et=b(x,ne);if(x.isDepthTexture)se=_(x.format===wi,x.type),fe&&(ue?t.texStorage2D(i.TEXTURE_2D,1,se,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,se,ne.width,ne.height,0,_e,I,null));else if(x.isDataTexture)if(ge.length>0){ue&&fe&&t.texStorage2D(i.TEXTURE_2D,et,se,ge[0].width,ge[0].height);for(let he=0,Ve=ge.length;he<Ve;he++)J=ge[he],ue?ze&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,J.width,J.height,_e,I,J.data):t.texImage2D(i.TEXTURE_2D,he,se,J.width,J.height,0,_e,I,J.data);x.generateMipmaps=!1}else ue?(fe&&t.texStorage2D(i.TEXTURE_2D,et,se,ne.width,ne.height),ze&&jt(x,ne,_e,I)):t.texImage2D(i.TEXTURE_2D,0,se,ne.width,ne.height,0,_e,I,ne.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ue&&fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,et,se,ge[0].width,ge[0].height,ne.depth);for(let he=0,Ve=ge.length;he<Ve;he++)if(J=ge[he],x.format!==1023)if(_e!==null)if(ue){if(ze)if(x.layerUpdates.size>0){let Qe=lh(J.width,J.height,x.format,x.type);for(let be of x.layerUpdates){let gt=J.data.subarray(be*Qe/J.data.BYTES_PER_ELEMENT,(be+1)*Qe/J.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,be,J.width,J.height,1,_e,gt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,J.width,J.height,ne.depth,_e,J.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,he,se,J.width,J.height,ne.depth,0,J.data,0,0);else Ge(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else ue?ze&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,J.width,J.height,ne.depth,_e,I,J.data):t.texImage3D(i.TEXTURE_2D_ARRAY,he,se,J.width,J.height,ne.depth,0,_e,I,J.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{ue&&fe&&t.texStorage2D(i.TEXTURE_2D,et,se,ge[0].width,ge[0].height);for(let he=0,Ve=ge.length;he<Ve;he++)J=ge[he],x.format!==1023?_e!==null?ue?ze&&t.compressedTexSubImage2D(i.TEXTURE_2D,he,0,0,J.width,J.height,_e,J.data):t.compressedTexImage2D(i.TEXTURE_2D,he,se,J.width,J.height,0,J.data):Ge(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):ue?ze&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,J.width,J.height,_e,I,J.data):t.texImage2D(i.TEXTURE_2D,he,se,J.width,J.height,0,_e,I,J.data)}else if(x.isDataArrayTexture)if(ue){if(fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,et,se,ne.width,ne.height,ne.depth),ze)if(x.layerUpdates.size>0){let he=lh(ne.width,ne.height,x.format,x.type);for(let Ve of x.layerUpdates){let Qe=ne.data.subarray(Ve*he/ne.data.BYTES_PER_ELEMENT,(Ve+1)*he/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ve,ne.width,ne.height,1,_e,I,Qe)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,_e,I,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,se,ne.width,ne.height,ne.depth,0,_e,I,ne.data);else if(x.isData3DTexture)ue?(fe&&t.texStorage3D(i.TEXTURE_3D,et,se,ne.width,ne.height,ne.depth),ze&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,_e,I,ne.data)):t.texImage3D(i.TEXTURE_3D,0,se,ne.width,ne.height,ne.depth,0,_e,I,ne.data);else if(x.isFramebufferTexture){if(fe)if(ue)t.texStorage2D(i.TEXTURE_2D,et,se,ne.width,ne.height);else{let he=ne.width,Ve=ne.height;for(let Qe=0;Qe<et;Qe++)t.texImage2D(i.TEXTURE_2D,Qe,se,he,Ve,0,_e,I,null),he>>=1,Ve>>=1}}else if(x.isHTMLTexture){if(`texElementImage2D`in i){let he=i.canvas;if(he.hasAttribute(`layoutsubtree`)||he.setAttribute(`layoutsubtree`,`true`),ne.parentNode!==he){he.appendChild(ne),u.add(x),he.onpaint=Ve=>{let Qe=Ve.changedElements;for(let be of u)Qe.includes(be.image)&&(be.needsUpdate=!0)},he.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ne);else{let Qe=i.RGBA,be=i.RGBA,gt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Qe,be,gt,ne)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ge.length>0){if(ue&&fe){let he=Je(ge[0]);t.texStorage2D(i.TEXTURE_2D,et,se,he.width,he.height)}for(let he=0,Ve=ge.length;he<Ve;he++)J=ge[he],ue?ze&&t.texSubImage2D(i.TEXTURE_2D,he,0,0,_e,I,J):t.texImage2D(i.TEXTURE_2D,he,se,_e,I,J);x.generateMipmaps=!1}else if(ue){if(fe){let he=Je(ne);t.texStorage2D(i.TEXTURE_2D,et,se,he.width,he.height)}ze&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,I,ne)}else t.texImage2D(i.TEXTURE_2D,0,se,_e,I,ne);C(x)&&x.mipmapsAutoUpdate===!0&&S(ce),ye.__version=pe.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function pn(E,x,H){if(x.image.length!==6)return;let ce=xt(E,x),re=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+H);let pe=n.get(re);if(re.version!==pe.__version||ce===!0){t.activeTexture(i.TEXTURE0+H);let ye=at.getPrimaries(at.workingColorSpace),K=x.colorSpace===``?null:at.getPrimaries(x.colorSpace),ne=x.colorSpace===``||ye===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let _e=x.isCompressedTexture||x.image[0].isCompressedTexture,I=x.image[0]&&x.image[0].isDataTexture,se=[];for(let be=0;be<6;be++)!_e&&!I?se[be]=v(x.image[be],!0,s.maxCubemapSize):se[be]=I?x.image[be].image:x.image[be],se[be]=We(x,se[be]);let J=se[0],ge=r.convert(x.format,x.colorSpace),ue=r.convert(x.type),fe=w(x.internalFormat,ge,ue,x.normalized,x.colorSpace),ze=x.isVideoTexture!==!0,et=pe.__version===void 0||ce===!0,he=re.dataReady,Ve=b(x,J);_t(i.TEXTURE_CUBE_MAP,x);let Qe;if(x.isDepthTexture){if(fe=_(x.format===wi,x.type),et)if(ze)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,fe,J.width,J.height);else for(let be=0;be<6;be++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,fe,J.width,J.height,0,ge,ue,null)}else if(_e){ze&&et&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ve,fe,J.width,J.height);for(let be=0;be<6;be++){Qe=se[be].mipmaps;for(let gt=0;gt<Qe.length;gt++){let Zt=Qe[gt];x.format!==1023?ge!==null?ze?he&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,gt,0,0,Zt.width,Zt.height,ge,Zt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,gt,fe,Zt.width,Zt.height,0,Zt.data):Ge(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):ze?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,gt,0,0,Zt.width,Zt.height,ge,ue,Zt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,gt,fe,Zt.width,Zt.height,0,ge,ue,Zt.data)}}}else{if(Qe=x.mipmaps,ze&&et){Qe.length>0&&Ve++;let be=Je(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ve,fe,be.width,be.height)}for(let be=0;be<6;be++)if(I){ze?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,se[be].width,se[be].height,ge,ue,se[be].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,fe,se[be].width,se[be].height,0,ge,ue,se[be].data);for(let gt=0;gt<Qe.length;gt++){let Ti=Qe[gt].image[be].image;ze?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,gt+1,0,0,Ti.width,Ti.height,ge,ue,Ti.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,gt+1,fe,Ti.width,Ti.height,0,ge,ue,Ti.data)}}else{ze?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,ge,ue,se[be]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,fe,ge,ue,se[be]);for(let gt=0;gt<Qe.length;gt++){let Zt=Qe[gt];ze?he&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,gt+1,0,0,ge,ue,Zt.image[be]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,gt+1,fe,ge,ue,Zt.image[be])}}}C(x)&&x.mipmapsAutoUpdate===!0&&S(i.TEXTURE_CUBE_MAP),pe.__version=re.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Rt(E,x,H,ce,re,pe){let ye=r.convert(H.format,H.colorSpace),K=r.convert(H.type),ne=w(H.internalFormat,ye,K,H.normalized,H.colorSpace),_e=n.get(x),I=n.get(H);if(I.__renderTarget=x,!_e.__hasExternalTextures){let se=Math.max(1,x.width>>pe),J=Math.max(1,x.height>>pe);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,pe,ne,se,J,x.depth,0,ye,K,null):t.texImage2D(re,pe,ne,se,J,0,ye,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),Me(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,re,I.__webglTexture,0,Ct(x)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ce,re,I.__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function jn(E,x,H){if(i.bindRenderbuffer(i.RENDERBUFFER,E),x.depthBuffer){let ce=x.depthTexture,re=ce&&ce.isDepthTexture?ce.type:null,pe=_(x.stencilBuffer,re),ye=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Me(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ct(x),pe,x.width,x.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct(x),pe,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,pe,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,E)}else{let ce=x.textures;for(let re=0;re<ce.length;re++){let pe=ce[re],ye=r.convert(pe.format,pe.colorSpace),K=r.convert(pe.type),ne=w(pe.internalFormat,ye,K,pe.normalized,pe.colorSpace);Me(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ct(x),ne,x.width,x.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct(x),ne,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ne,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function qt(E,x,H){let ce=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let re=n.get(x.depthTexture);re.__renderTarget=x;let pe=ce?x.depthTexture.image[0]:x.depthTexture.image;(!re.__webglTexture||pe.width!==x.width||pe.height!==x.height)&&(pe.width=x.width,pe.height=x.height,x.depthTexture.needsUpdate=!0),ce?we(x.depthTexture,0):Ee(x.depthTexture,0);let ye=re.__webglTexture,K=Ct(x),ne=ce?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,_e=x.depthTexture.format===wi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===yi)Me(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,ne,ye,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,_e,ne,ye,0);else if(x.depthTexture.format===wi)Me(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,ne,ye,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,_e,ne,ye,0);else throw new Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function An(E){let x=n.get(E),H=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){let ce=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),ce){let re=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,ce.removeEventListener(`dispose`,re)};ce.addEventListener(`dispose`,re),x.__depthDisposeCallback=re}x.__boundDepthTexture=ce}if(E.depthTexture&&!x.__autoAllocateDepthBuffer)if(H)for(let ce=0;ce<6;ce++)qt(x.__webglFramebuffer[ce],E,ce);else E.texture.mipmaps.length>0?qt(x.__webglFramebuffer[0],E,0):qt(x.__webglFramebuffer,E,0);else if(H){x.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[ce]),x.__webglDepthbuffer[ce]===void 0)x.__webglDepthbuffer[ce]=i.createRenderbuffer(),jn(x.__webglDepthbuffer[ce],E,!1);else{let re=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=x.__webglDepthbuffer[ce];i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,pe)}}else if(E.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),jn(x.__webglDepthbuffer,E,!1);else{let re=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,pe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pn(E,x,H){let ce=n.get(E);x!==void 0&&Rt(ce.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&An(E)}function Rn(E){let x=E.texture,H=n.get(E),ce=n.get(x);E.addEventListener(`dispose`,z),F(E);let re=E.textures,pe=E.isWebGLCubeRenderTarget===!0,ye=re.length>1;if(ye||(ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture()),ce.__version=x.version,o.memory.textures++),pe){H.__webglFramebuffer=[];for(let K=0;K<6;K++)if(x.mipmaps.length>0){H.__webglFramebuffer[K]=[];for(let ne=0;ne<x.mipmaps.length;ne++)H.__webglFramebuffer[K][ne]=i.createFramebuffer()}else H.__webglFramebuffer[K]=i.createFramebuffer()}else{if(x.mipmaps.length>0){H.__webglFramebuffer=[];for(let K=0;K<x.mipmaps.length;K++)H.__webglFramebuffer[K]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(ye)for(let K=0,ne=re.length;K<ne;K++){let _e=n.get(re[K]);_e.__webglTexture===void 0&&(_e.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&Me(E)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let K=0;K<re.length;K++){let ne=re[K];H.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[K]);let _e=r.convert(ne.format,ne.colorSpace),I=r.convert(ne.type),se=w(ne.internalFormat,_e,I,ne.normalized,ne.colorSpace,E.isXRRenderTarget===!0),J=Ct(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,J,se,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,H.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),jn(H.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pe){t.bindTexture(i.TEXTURE_CUBE_MAP,ce.__webglTexture),_t(i.TEXTURE_CUBE_MAP,x);for(let K=0;K<6;K++)if(x.mipmaps.length>0)for(let ne=0;ne<x.mipmaps.length;ne++)Rt(H.__webglFramebuffer[K][ne],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ne);else Rt(H.__webglFramebuffer[K],E,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);C(x)?S(i.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}else if(ye){for(let K=0,ne=re.length;K<ne;K++){let _e=re[K],I=n.get(_e),se=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(se=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,I.__webglTexture),_t(se,_e),Rt(H.__webglFramebuffer,E,_e,i.COLOR_ATTACHMENT0+K,se,0),C(_e)&&S(se)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(K=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,ce.__webglTexture),_t(K,x),x.mipmaps.length>0)for(let ne=0;ne<x.mipmaps.length;ne++)Rt(H.__webglFramebuffer[ne],E,x,i.COLOR_ATTACHMENT0,K,ne);else Rt(H.__webglFramebuffer,E,x,i.COLOR_ATTACHMENT0,K,0);C(x)?S(K):x.mipmaps.length>0&&i.texParameteri(K,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}E.depthBuffer&&An(E)}function B(E){let x=E.textures;for(let H=0,ce=x.length;H<ce;H++){let re=x[H];if(C(re)&&re.mipmapsAutoUpdate===!0){let pe=T(E),ye=n.get(re).__webglTexture;t.bindTexture(pe,ye),S(pe),t.unbindTexture()}}}let In=[];function St(E){if(E.samples>0){if(Me(E)===!1){let x=E.textures,H=E.width,ce=E.height,re=i.COLOR_BUFFER_BIT,pe=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(E),K=x.length>1;if(K)for(let _e=0;_e<x.length;_e++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let _e=0;_e<x.length;_e++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[_e]);let I=n.get(x[_e]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,I,0)}i.blitFramebuffer(0,0,H,ce,0,0,H,ce,re,i.NEAREST),c===!0&&(In.length=0,In.push(i.COLOR_ATTACHMENT0+_e),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&In.push(pe),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,In))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let _e=0;_e<x.length;_e++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,ye.__webglColorRenderbuffer[_e]);let I=n.get(x[_e]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,I,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&c){let x=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Ct(E){return Math.min(s.maxSamples,E.samples)}function Me(E){let x=n.get(E);return E.samples>0&&e.has(`WEBGL_multisampled_render_to_texture`)===!0&&x.__useRenderToTexture!==!1}function Ht(E){let x=o.render.frame;h.get(E)!==x&&(h.set(E,x),E.update())}function We(E,x){let H=E.colorSpace,ce=E.format,re=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||H!==_r&&H!==``&&(at.getTransfer(H)===mt?(ce!==1023||re!==yn)&&Ge(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):Ye(`WebGLTextures: Unsupported texture color space:`,H)),x}function Je(E){return typeof HTMLImageElement<`u`&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<`u`&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=Ze,this.resetTextureUnits=oe,this.getTextureUnits=ae,this.setTextureUnits=Ae,this.setTexture2D=Ee,this.setTexture2DArray=Re,this.setTexture3D=He,this.setTextureCube=we,this.rebindTextures=Pn,this.setupRenderTarget=Rn,this.updateRenderTargetMipmap=B,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=An,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=Me,this.dispose=X}function Oy(i,e){function t(n,s=``){let r,o=at.getTransfer(s);if(n===yn)return i.UNSIGNED_BYTE;if(n===Ra)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ia)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Yc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wc)return i.BYTE;if(n===Xc)return i.SHORT;if(n===$s)return i.UNSIGNED_SHORT;if(n===Pa)return i.INT;if(n===Zn)return i.UNSIGNED_INT;if(n===kn)return i.FLOAT;if(n===1016)return i.HALF_FLOAT;if(n===Zc)return i.ALPHA;if(n===$c)return i.RGB;if(n===1023)return i.RGBA;if(n===yi)return i.DEPTH_COMPONENT;if(n===wi)return i.DEPTH_STENCIL;if(n===La)return i.RED;if(n===Oa)return i.RED_INTEGER;if(n===Gi)return i.RG;if(n===Da)return i.RG_INTEGER;if(n===Na)return i.RGBA_INTEGER;if(n===Hr||n===Wr||n===Xr||n===Yr)if(o===mt)if(r=e.get(`WEBGL_compressed_texture_s3tc_srgb`),r!==null){if(n===Hr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get(`WEBGL_compressed_texture_s3tc`),r!==null){if(n===Hr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Yr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Fa||n===Ua||n===Ba||n===ka)if(r=e.get(`WEBGL_compressed_texture_pvrtc`),r!==null){if(n===Fa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ka)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===za||n===Va||n===Ga||n===Ha||n===Wa||n===qr||n===Xa)if(r=e.get(`WEBGL_compressed_texture_etc`),r!==null){if(n===za||n===Va)return o===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ga)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ha)return r.COMPRESSED_R11_EAC;if(n===Wa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===qr)return r.COMPRESSED_RG11_EAC;if(n===Xa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ya||n===qa||n===Za||n===$a||n===Ja||n===Ka||n===ja||n===Qa||n===el||n===tl||n===nl||n===il||n===sl||n===rl)if(r=e.get(`WEBGL_compressed_texture_astc`),r!==null){if(n===Ya)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qa)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Za)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$a)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ja)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ka)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ja)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qa)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===el)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===il)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ol||n===al||n===ll)if(r=e.get(`EXT_texture_compression_bptc`),r!==null){if(n===ol)return o===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===al)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ll)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===cl||n===hl||n===Zr||n===dl)if(r=e.get(`EXT_texture_compression_rgtc`),r!==null){if(n===cl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===hl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Zr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===dl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===as?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Dy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`;var Ny=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;var gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Rr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ii({vertexShader:Dy,fragmentShader:Ny,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Se(new Si(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}};var xh=class extends Xn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a=`local-floor`,c=1,l=null,h=null,u=null,d=null,f=null,g=null,M=typeof XRWebGLBinding<`u`,m=new gh,p={},v=t.getContextAttributes(),C=null,S=null,T=[],w=[],_=new Ne,b=null,F=null,O=new dn;O.viewport=new Tt;let U=new dn;U.viewport=new Tt;let z=[O,U],$=new Ea,D=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let Ee=T[te];return Ee===void 0&&(Ee=new Vs,T[te]=Ee),Ee.getTargetRaySpace()},this.getControllerGrip=function(te){let Ee=T[te];return Ee===void 0&&(Ee=new Vs,T[te]=Ee),Ee.getGripSpace()},this.getHand=function(te){let Ee=T[te];return Ee===void 0&&(Ee=new Vs,T[te]=Ee),Ee.getHandSpace()};function j(te){let Ee=w.indexOf(te.inputSource);if(Ee===-1)return;let Re=T[Ee];Re!==void 0&&(Re.update(te.inputSource,te.frame,l||o),Re.dispatchEvent({type:te.type,data:te.inputSource}))}function V(){s.removeEventListener(`select`,j),s.removeEventListener(`selectstart`,j),s.removeEventListener(`selectend`,j),s.removeEventListener(`squeeze`,j),s.removeEventListener(`squeezestart`,j),s.removeEventListener(`squeezeend`,j),s.removeEventListener(`end`,V),s.removeEventListener(`inputsourceschange`,le);for(let te=0;te<T.length;te++){let Ee=w[te];Ee!==null&&(w[te]=null,T[te].disconnect(Ee))}D=null,X=null,m.reset();for(let te in p)delete p[te];if(e.setRenderTarget(C),f=null,d=null,u=null,s=null,S=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(_.width,_.height,!1),F!==null){let te=F.camera;te.fov=F.fov,te.zoom=F.zoom,te.updateProjectionMatrix(),F=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&Ge(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&Ge(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(te){if(s=te,s!==null){if(C=e.getRenderTarget(),s.addEventListener(`select`,j),s.addEventListener(`selectstart`,j),s.addEventListener(`selectend`,j),s.addEventListener(`squeeze`,j),s.addEventListener(`squeezestart`,j),s.addEventListener(`squeezeend`,j),s.addEventListener(`end`,V),s.addEventListener(`inputsourceschange`,le),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(_),M&&`createProjectionLayer`in XRWebGLBinding.prototype){let Re=null,He=null,we=null;v.depth&&(we=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Re=v.stencil?wi:yi,He=v.stencil?as:Zn);let je={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(je),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new wn(d.textureWidth,d.textureHeight,{format:Jn,type:yn,depthTexture:new bi(d.textureWidth,d.textureHeight,He,void 0,void 0,void 0,void 0,void 0,void 0,Re),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Re={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Re),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new wn(f.framebufferWidth,f.framebufferHeight,{format:Jn,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function le(te){for(let Ee=0;Ee<te.removed.length;Ee++){let Re=te.removed[Ee],He=w.indexOf(Re);He>=0&&(w[He]=null,T[He].disconnect(Re))}for(let Ee=0;Ee<te.added.length;Ee++){let Re=te.added[Ee],He=w.indexOf(Re);if(He===-1){for(let je=0;je<T.length;je++)if(je>=w.length){w.push(Re),He=je;break}else if(w[je]===null){w[je]=Re,He=je;break}if(He===-1)break}let we=T[He];we&&we.connect(Re)}}function Y(te,Ee){Ee===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(Ee.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(s===null)return;let Ee=te.near,Re=te.far;m.texture!==null&&(m.depthNear>0&&(Ee=m.depthNear),m.depthFar>0&&(Re=m.depthFar)),$.near=U.near=O.near=Ee,$.far=U.far=O.far=Re,(D!==$.near||X!==$.far)&&(s.updateRenderState({depthNear:$.near,depthFar:$.far}),D=$.near,X=$.far),$.layers.mask=te.layers.mask|6,O.layers.mask=$.layers.mask&-5,U.layers.mask=$.layers.mask&-3;let He=te.parent,we=$.cameras;Y($,He);for(let je=0;je<we.length;je++)Y(we[je],He);$.projectionMatrix.copy(O.projectionMatrix),$.projectionMatrixInverse.copy(O.projectionMatrixInverse),F===null&&te.isPerspectiveCamera&&(F={camera:te,fov:te.fov,zoom:te.zoom}),oe(te,$,He)};function oe(te,Ee,Re){Re===null?te.matrix.copy(Ee.matrixWorld):(te.matrix.copy(Re.matrixWorld),te.matrix.invert(),te.matrix.multiply(Ee.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(Ee.projectionMatrix),te.projectionMatrixInverse.copy(Ee.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Bs*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(te){c=te,d!==null&&(d.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh($)},this.getCameraTexture=function(te){return p[te]};let ae=null;function Ae(te,Ee){if(h=Ee.getViewerPose(l||o),g=Ee,h!==null){let Re=h.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let He=!1;Re.length!==$.cameras.length&&($.cameras.length=0,He=!0);for(let Xe=0;Xe<Re.length;Xe++){let _t=Re[Xe],xt=null;if(f!==null)xt=f.getViewport(_t);else{let jt=u.getViewSubImage(d,_t);xt=jt.viewport,Xe===0&&(e.setRenderTargetTextures(S,jt.colorTexture,jt.depthStencilTexture),e.setRenderTarget(S))}let st=z[Xe];st===void 0&&(st=new dn,st.layers.enable(Xe),st.viewport=new Tt,z[Xe]=st),st.matrix.fromArray(_t.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(_t.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(xt.x,xt.y,xt.width,xt.height),Xe===0&&($.matrix.copy(st.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),He===!0&&$.cameras.push(st)}let we=s.enabledFeatures;if(we&&we.includes(`depth-sensing`)&&s.depthUsage==`gpu-optimized`&&M){u=n.getBinding();let Xe=u.getDepthInformation(Re[0]);Xe&&Xe.isValid&&Xe.texture&&m.init(Xe,s.renderState)}if(we&&we.includes(`camera-access`)&&M){e.state.unbindTexture(),u=n.getBinding();for(let Xe=0;Xe<Re.length;Xe++){let _t=Re[Xe].camera;if(_t){let xt=p[_t];xt||(xt=new Rr,p[_t]=xt);let st=u.getCameraImage(_t);xt.sourceTexture=st}}}}for(let Re=0;Re<T.length;Re++){let He=w[Re],we=T[Re];He!==null&&we!==void 0&&we.update(He,Ee,l||o)}ae&&ae(te,Ee),Ee.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:Ee}),g=null}let Ze=new Kp;Ze.setAnimationLoop(Ae),this.setAnimationLoop=function(te){ae=te},this.dispose=function(){}}};var Fy=new dt;var lf=new $e;lf.set(-1,0,0,0,1,0,0,0,1);function Uy(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,rh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,C,S){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),M(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,C):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=e.get(p),C=v.envMap,S=v.envMapRotation;C&&(m.envMap.value=C,m.envMapRotation.value.setFromMatrix4(Fy.makeRotationFromEuler(S)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(lf),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,C){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=C*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.diffuseRoughness>0&&(m.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===1&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){let v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function By(i,e,t,n){let s={},r={};function o(v,C){let S=C.program;n.uniformBlockBinding(v,S,s[v.id])}function a(v,C){let S=s[v.id];S===void 0&&(g(v),S=c(v),s[v.id]=S,v.addEventListener(`dispose`,m));let T=C.program;n.updateUBOMapping(v,T);let w=e.render.frame;r[v.id]!==w&&(l(v),r[v.id]=w)}function c(v){let C=i.createBuffer(),S=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,C),i.bufferData(i.UNIFORM_BUFFER,S,T),i.bindBuffer(i.UNIFORM_BUFFER,null),C}function l(v){let C=s[v.id],S=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let w=0,_=S.length;w<_;w++){let b=S[w];if(Array.isArray(b))for(let F=0,O=b.length;F<O;F++)h(b[F],w,F,T);else h(b,w,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(v,C,S,T){if(d(v,C,S,T)===!0){let w=v.__offset,_=v.value;if(Array.isArray(_)){let b=0;for(let F=0;F<_.length;F++){let O=_[F],U=M(O,!0);u(O,v.__data,b),b+=U.storage/Float32Array.BYTES_PER_ELEMENT}}else u(_,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,w,v.__data)}}function u(v,C,S){typeof v==`number`||typeof v==`boolean`?C[S]=v:v.isMatrix3?(C[S]=v.elements[0],C[S+1]=v.elements[1],C[S+2]=v.elements[2],C[S+3]=0,C[S+4]=v.elements[3],C[S+5]=v.elements[4],C[S+6]=v.elements[5],C[S+7]=0,C[S+8]=v.elements[6],C[S+9]=v.elements[7],C[S+10]=v.elements[8],C[S+11]=0):ArrayBuffer.isView(v)?C.set(v.subarray(0,C.length-S),S):v.toArray(C,S)}function d(v,C,S,T){let w=v.value,_=C+`_`+S;if(Array.isArray(w)){T[_]===void 0&&(T[_]=[]);let b=T[_],F=!1;for(let O=0;O<w.length;O++)f(w[O],b,O)===!0&&(F=!0);return F}return f(w,T,_)}function f(v,C,S){if(C[S]===void 0)return typeof v==`number`||typeof v==`boolean`?C[S]=v:ArrayBuffer.isView(v)?C[S]=v.slice():C[S]=v.clone(),!0;{let T=C[S];if(typeof v==`number`||typeof v==`boolean`){if(T!==v)return C[S]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(T.equals(v)===!1)return T.copy(v),!0}}return!1}function g(v){let C=v.uniforms,S=0,T=16;for(let _=0,b=C.length;_<b;_++){let F=Array.isArray(C[_])?C[_]:[C[_]];for(let O=0,U=F.length;O<U;O++){let z=F[O],$=Array.isArray(z.value)?z.value:[z.value],D=Array.isArray(C[_])||Array.isArray(z.value),X=S;for(let V=0,le=$.length;V<le;V++){let Y=$[V],oe=M(Y,D),ae=S%T,Ae=ae%oe.boundary,Ze=ae+Ae;S+=Ae,Ze!==0&&T-Ze<oe.storage&&(S+=T-Ze),V===0&&(X=S),S+=oe.storage}z.__data=new(z.type===`int`?Int32Array:z.type===`uint`?Uint32Array:Float32Array)((S-X)/Float32Array.BYTES_PER_ELEMENT),z.__offset=X}}let w=S%T;return w>0&&(S+=T-w),v.__size=S,v.__cache={},this}function M(v,C){let S={boundary:0,storage:0};return typeof v==`number`||typeof v==`boolean`?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=16,S.storage=48):v.isMatrix4?(S.boundary=16,S.storage=64):v.isTexture?Ge(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(v)?(S.boundary=16,S.storage=v.byteLength):Ge(`WebGLRenderer: Unsupported uniform value type.`,v),C===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function m(v){let C=v.target;C.removeEventListener(`dispose`,m),i.deleteBuffer(s[C.id]),delete s[C.id],delete r[C.id]}function p(){for(let v in s)i.deleteBuffer(s[v]);s={},r={}}return{bind:o,update:a,dispose:p}}var ky=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);var oi=null;function zy(){return oi===null&&(oi=new Cr(ky,16,16,Gi,1016),oi.name=`DFG_LUT`,oi.minFilter=1006,oi.magFilter=1006,oi.wrapS=ni,oi.wrapT=ni,oi.generateMipmaps=!1,oi.needsUpdate=!0),oi}var _l=class{constructor(e={}){let{canvas:t=Mp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=yn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw new Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);g=n.getContextAttributes().alpha}else g=o;let M=f,m=/* @__PURE__ */ new Set([Na,Da,Oa]),p=/* @__PURE__ */ new Set([yn,Zn,$s,as,Ra,Ia]),v=/* @__PURE__ */ new Uint32Array(4),C=/* @__PURE__ */ new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]},T=null,w=null,_=[],b=[],F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let O=this,U=!1,z=null,$=null,D=null,X=null;this._outputColorSpace=hn;let j=0,V=0,le=null,Y=-1,oe=null,ae=new Tt,Ae=new Tt,Ze=null,te=new qe(0),Ee=0,Re=t.width,He=t.height,we=1,je=null,Bt=null,Xe=new Tt(0,0,Re,He),_t=new Tt(0,0,Re,He),xt=!1,st=new Ni,jt=new aa,Gt=!1,pn=!1,Rt=new dt,jn=new L,qt=new Tt,An={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Pn=!1;function Rn(){return le===null?we:1}let B=n;function In(y,N){return t.getContext(y,N)}let St,Ct,Me,Ht,We,Je,E,x,H,ce,re,pe,ye,K,ne,_e,I,se,J,ge,ue,fe,ze;try{let y={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,Ve,!1),t.addEventListener(`webglcontextrestored`,Qe,!1),t.addEventListener(`webglcontextcreationerror`,be,!1),B===null){let N=`webgl2`;if(B=In(N,y),B===null)throw In(N)?/* @__PURE__ */ new Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):/* @__PURE__ */ new Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}et()}catch(y){throw t.removeEventListener(`webglcontextlost`,Ve,!1),t.removeEventListener(`webglcontextrestored`,Qe,!1),t.removeEventListener(`webglcontextcreationerror`,be,!1),Ye(`WebGLRenderer: `+y.message),y}function et(){St=new Kg(B),St.init(),ue=new Oy(B,St),Ct=new zg(B,St,e,ue),Me=new Iy(B,St),Ct.reversedDepthBuffer&&d&&Me.buffers.depth.setReversed(!0),$=B.createFramebuffer(),D=B.createFramebuffer(),X=B.createFramebuffer(),Ht=new ex(B),We=new gy,Je=new Ly(B,St,Me,We,Ct,ue,Ht),E=new Jg(O),x=new n0(B),fe=new Bg(B,x),H=new jg(B,x,Ht,fe),ce=new nx(B,H,x,fe,Ht),se=new tx(B,Ct,Je),ne=new Vg(We),re=new _y(O,E,St,Ct,fe,ne),pe=new Uy(O,We),ye=new yy,K=new Ey(St),I=new Ug(O,E,Me,ce,g,c),_e=new Ry(O,ce,Ct),ze=new By(B,Ht,Ct,Me),J=new kg(B,St,Ht),ge=new Qg(B,St,Ht),Ht.programs=re.programs,O.capabilities=Ct,O.extensions=St,O.properties=We,O.renderLists=ye,O.shadowMap=_e,O.state=Me,O.info=Ht}M!==yn&&(F=new sx(M,t.width,t.height,a,s,r));let he=new xh(O,B);this.xr=he,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let y=St.get(`WEBGL_lose_context`);y&&y.loseContext()},this.forceContextRestore=function(){let y=St.get(`WEBGL_lose_context`);y&&y.restoreContext()},this.getPixelRatio=function(){return we},this.setPixelRatio=function(y){y!==void 0&&(we=y,this.setSize(Re,He,!1))},this.getSize=function(y){return y.set(Re,He)},this.setSize=function(y,N,q=!0){if(he.isPresenting){Ge(`WebGLRenderer: Can't change size while VR device is presenting.`);return}Re=y,He=N,t.width=Math.floor(y*we),t.height=Math.floor(N*we),q===!0&&(t.style.width=y+`px`,t.style.height=N+`px`),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(Re*we,He*we).floor()},this.setDrawingBufferSize=function(y,N,q){Re=y,He=N,we=q,t.width=Math.floor(y*q),t.height=Math.floor(N*q),this.setViewport(0,0,y,N)},this.setEffects=function(y){if(M===yn){Ye(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(y){for(let N=0;N<y.length;N++)if(y[N].isOutputPass===!0){Ge(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}F.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(ae)},this.getViewport=function(y){return y.copy(Xe)},this.setViewport=function(y,N,q,G){y.isVector4?Xe.set(y.x,y.y,y.z,y.w):Xe.set(y,N,q,G),Me.viewport(ae.copy(Xe).multiplyScalar(Rn()).round())},this.getScissor=function(y){return y.copy(_t)},this.setScissor=function(y,N,q,G){y.isVector4?_t.set(y.x,y.y,y.z,y.w):_t.set(y,N,q,G),Me.scissor(Ae.copy(_t).multiplyScalar(Rn()).round())},this.getScissorTest=function(){return xt},this.setScissorTest=function(y){Me.setScissorTest(xt=y)},this.setOpaqueSort=function(y){je=y},this.setTransparentSort=function(y){Bt=y},this.getClearColor=function(y){return y.copy(I.getClearColor())},this.setClearColor=function(){I.setClearColor(...arguments)},this.getClearAlpha=function(){return I.getClearAlpha()},this.setClearAlpha=function(){I.setClearAlpha(...arguments)},this.clear=function(y=!0,N=!0,q=!0){let G=0;if(y){let W=!1;if(le!==null){let ve=le.texture.format;W=m.has(ve)}if(W){let ve=le.texture.type,Pe=p.has(ve),xe=I.getClearColor(),Te=I.getClearAlpha(),Be=xe.r,Ke=xe.g,rt=xe.b;Pe?(v[0]=Be,v[1]=Ke,v[2]=rt,v[3]=Te,B.clearBufferuiv(B.COLOR,0,v)):(C[0]=Be,C[1]=Ke,C[2]=rt,C[3]=Te,B.clearBufferiv(B.COLOR,0,C))}else G|=B.COLOR_BUFFER_BIT}N&&(G|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(G|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&B.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),z=y},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ve,!1),t.removeEventListener(`webglcontextrestored`,Qe,!1),t.removeEventListener(`webglcontextcreationerror`,be,!1),I.dispose(),ye.dispose(),K.dispose(),Je.dispose(),We.dispose(),E.dispose(),ce.dispose(),H.dispose(),fe.dispose(),ze.dispose(),re.dispose(),he.dispose(),he.removeEventListener(`sessionstart`,Oh),he.removeEventListener(`sessionend`,Dh),Xi.stop()};function Ve(y){y.preventDefault(),xr(`WebGLRenderer: Context Lost.`),U=!0}function Qe(){xr(`WebGLRenderer: Context Restored.`),U=!1;let y=Ht.autoReset,N=_e.enabled,q=_e.autoUpdate,G=_e.needsUpdate,W=_e.type;et(),Ht.autoReset=y,_e.enabled=N,_e.autoUpdate=q,_e.needsUpdate=G,_e.type=W}function be(y){Ye(`WebGLRenderer: A WebGL context could not be created. Reason: `,y.statusMessage)}function gt(y){let N=y.target;N.removeEventListener(`dispose`,gt),Zt(N)}function Zt(y){Ti(y),We.remove(y)}function Ti(y){let N=We.get(y).programs;N!==void 0&&(N.forEach(function(q){re.releaseProgram(q)}),y.isShaderMaterial&&re.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,q,G,W,ve){N===null&&(N=An);let Pe=W.isMesh&&W.matrixWorld.determinantAffine()<0,xe=Qf(y,N,q,G,W);Me.setMaterial(G,Pe);let Te=q.index,Be=1;if(G.wireframe===!0){if(Te=H.getWireframeAttribute(q),Te===void 0)return;Be=2}let Ke=q.drawRange,rt=q.attributes.position,Ie=Ke.start*Be,ot=(Ke.start+Ke.count)*Be;ve!==null&&(Ie=Math.max(Ie,ve.start*Be),ot=Math.min(ot,(ve.start+ve.count)*Be)),Te!==null?(Ie=Math.max(Ie,0),ot=Math.min(ot,Te.count)):rt!=null&&(Ie=Math.max(Ie,0),ot=Math.min(ot,rt.count));let kt=ot-Ie;if(kt<0||kt===1/0)return;fe.setup(W,G,xe,q,Te);let Mt,yt=J;if(Te!==null&&(Mt=x.get(Te),yt=ge,yt.setIndex(Mt)),W.isMesh)G.wireframe===!0?(Me.setLineWidth(G.wireframeLinewidth*Rn()),yt.setMode(B.LINES)):yt.setMode(B.TRIANGLES);else if(W.isLine){let tn=G.linewidth;tn===void 0&&(tn=1),Me.setLineWidth(tn*Rn()),W.isLineSegments?yt.setMode(B.LINES):W.isLineLoop?yt.setMode(B.LINE_LOOP):yt.setMode(B.LINE_STRIP)}else W.isPoints?yt.setMode(B.POINTS):W.isSprite&&yt.setMode(B.TRIANGLES);if(W.isBatchedMesh)if(St.get(`WEBGL_multi_draw`))yt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let tn=W._multiDrawStarts,Le=W._multiDrawCounts,ln=W._multiDrawCount,ut=Te?x.get(Te).bytesPerElement:1,Yi=We.get(G).currentProgram.getUniforms();for(let nn=0;nn<ln;nn++)Yi.setValue(B,`_gl_DrawID`,nn),yt.render(tn[nn]/ut,Le[nn])}else if(W.isInstancedMesh)yt.renderInstances(Ie,kt,W.count);else if(q.isInstancedBufferGeometry){let tn=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Le=Math.min(q.instanceCount,tn);yt.renderInstances(Ie,kt,Le)}else yt.render(Ie,kt)};function Lh(y,N,q,G){z!==null&&y.isNodeMaterial&&z.setObject(G,y),Gt===!0&&ne.setState(y,q,!1),y.transparent===!0&&y.side===2&&y.forceSinglePass===!1?(y.side=1,y.needsUpdate=!0,Qs(y,N,G),y.side=0,y.needsUpdate=!0,Qs(y,N,G),y.side=2):Qs(y,N,G)}this.compile=function(y,N,q=null){q===null&&(q=y),z!==null&&z.renderStart(y,N,q),w=K.get(q),w.init(N),b.push(w),q.traverseVisible(function(W){W.isLight&&W.layers.test(N.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),y!==q&&y.traverseVisible(function(W){W.isLight&&W.layers.test(N.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),w.setupLights(),z!==null&&z.updateLights(w.state.lightsArray),pn=this.localClippingEnabled,Gt=ne.init(this.clippingPlanes,pn),Gt===!0&&ne.setGlobalState(this.clippingPlanes,N),z!==null&&_e.render(w.state.shadowsArray,q,N);let G=/* @__PURE__ */ new Set;return y.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let ve=W.material;if(ve)if(Array.isArray(ve))for(let Pe=0;Pe<ve.length;Pe++){let xe=ve[Pe];Lh(xe,q,N,W),G.add(xe)}else Lh(ve,q,N,W),G.add(ve)}),w=b.pop(),z!==null&&z.renderEnd(),G},this.compileAsync=function(y,N,q=null){let G=this.compile(y,N,q);return new Promise(W=>{function ve(){if(G.forEach(function(Pe){let Te=We.get(Pe).currentProgram;(Te===void 0||Te.isReady())&&G.delete(Pe)}),G.size===0){W(y);return}setTimeout(ve,10)}St.get(`KHR_parallel_shader_compile`)!==null?ve():setTimeout(ve,10)})};let Dl=null;function Kf(y){Dl&&Dl(y)}function Oh(){Xi.stop()}function Dh(){Xi.start()}let Xi=new Kp;Xi.setAnimationLoop(Kf),typeof self<`u`&&Xi.setContext(self),this.setAnimationLoop=function(y){Dl=y,he.setAnimationLoop(y),y===null?Xi.stop():Xi.start()},he.addEventListener(`sessionstart`,Oh),he.addEventListener(`sessionend`,Dh),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){Ye(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(U===!0)return;z!==null&&z.renderStart(y,N);let q=he.enabled===!0&&he.isPresenting===!0,G=F!==null&&(le===null||q)&&F.begin(O,le);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(he.cameraAutoUpdate===!0&&he.updateCamera(N),N=he.getCamera()),y.isScene===!0&&y.onBeforeRender(O,y,N,le),w=K.get(y,b.length),w.init(N),w.state.textureUnits=Je.getTextureUnits(),b.push(w),Rt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),N.isArrayCamera?jt.setFromArrayCamera(N):st.setFromProjectionMatrix(Rt,Fn,N.reversedDepth),pn=this.localClippingEnabled,Gt=ne.init(this.clippingPlanes,pn),T=ye.get(y,_.length),T.init(),_.push(T),this.info.render.frame++,he.enabled===!0&&he.isPresenting===!0){let Pe=O.xr.getDepthSensingMesh();Pe!==null&&Nl(Pe,N,-1/0,O.sortObjects)}Nl(y,N,0,O.sortObjects),T.finish(),z!==null&&z.updateLights(w.state.lightsArray),O.sortObjects===!0&&T.sort(je,Bt),Pn=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,Pn&&I.addToRenderList(T,y),this.info.autoReset===!0&&this.info.reset(),Gt===!0&&ne.beginShadows();let W=w.state.shadowsArray;if(_e.render(W,y,N),Gt===!0&&ne.endShadows(),(G&&F.hasRenderPass())===!1){let Pe=T.opaque,xe=T.transmissive;if(w.setupLights(),N.isArrayCamera){let Te=N.cameras;if(xe.length>0)for(let Be=0,Ke=Te.length;Be<Ke;Be++){let rt=Te[Be];Fh(Pe,xe,y,rt)}Pn&&I.render(y);for(let Be=0,Ke=Te.length;Be<Ke;Be++){let rt=Te[Be];Nh(T,y,rt,rt.viewport)}}else xe.length>0&&Fh(Pe,xe,y,N),Pn&&I.render(y),Nh(T,y,N)}le!==null&&V===0&&(Je.updateMultisampleRenderTarget(le),Je.updateRenderTargetMipmap(le)),G&&F.end(O),y.isScene===!0&&y.onAfterRender(O,y,N),fe.resetDefaultState(),Y=-1,oe=null,b.pop(),b.length>0?(w=b[b.length-1],Je.setTextureUnits(w.state.textureUnits),Gt===!0&&ne.setGlobalState(O.clippingPlanes,w.state.camera)):w=null,_.pop(),_.length>0?T=_[_.length-1]:T=null,z!==null&&z.renderEnd()};function Nl(y,N,q,G){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)q=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLight)w.pushLight(y),y.castShadow&&w.pushShadow(y);else if(y.isSprite){let Pe=N.isArrayCamera?jt:st;if(!y.frustumCulled||y.intersectsFrustum(Pe)){G&&qt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Rt);let xe=ce.update(y),Te=y.material;Te.visible&&T.push(y,xe,Te,q,qt.z,null,N)}}else if(y.isMesh||y.isLine||y.isPoints){let Pe=N.isArrayCamera?jt:st;if(!y.frustumCulled||y.intersectsFrustum(Pe)){let xe=ce.update(y),Te=y.material;if(G&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),qt.copy(y.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),qt.copy(xe.boundingSphere.center)),qt.applyMatrix4(y.matrixWorld).applyMatrix4(Rt)),Array.isArray(Te)){let Be=xe.groups;for(let Ke=0,rt=Be.length;Ke<rt;Ke++){let Ie=Be[Ke],ot=Te[Ie.materialIndex];ot&&ot.visible&&T.push(y,xe,ot,q,qt.z,Ie,N)}}else Te.visible&&T.push(y,xe,Te,q,qt.z,null,N)}}}let ve=y.children;for(let Pe=0,xe=ve.length;Pe<xe;Pe++)Nl(ve[Pe],N,q,G)}function Nh(y,N,q,G){let{opaque:W,transmissive:ve,transparent:Pe}=y;w.setupLightsView(q),Gt===!0&&ne.setGlobalState(O.clippingPlanes,q),G&&Me.viewport(ae.copy(G)),W.length>0&&oo(W,N,q),ve.length>0&&oo(ve,N,q),Pe.length>0&&oo(Pe,N,q),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function Fh(y,N,q,G){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[G.id]===void 0){let Ie=St.has(`EXT_color_buffer_half_float`)||St.has(`EXT_color_buffer_float`);w.state.transmissionRenderTarget[G.id]=new wn(1,1,{generateMipmaps:!0,type:Ie?$n:yn,minFilter:Ei,samples:Math.max(4,Ct.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:at.workingColorSpace})}let ve=w.state.transmissionRenderTarget[G.id],Pe=G.viewport||ae;ve.setSize(Pe.z*O.transmissionResolutionScale,Pe.w*O.transmissionResolutionScale);let xe=O.getRenderTarget(),Te=O.getActiveCubeFace(),Be=O.getActiveMipmapLevel();O.setRenderTarget(ve),O.getClearColor(te),Ee=O.getClearAlpha(),Ee<1&&O.setClearColor(16777215,.5),O.clear(),Pn&&I.render(q);let Ke=O.toneMapping;O.toneMapping=ri;let rt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),w.setupLightsView(G),Gt===!0&&ne.setGlobalState(O.clippingPlanes,G),oo(y,q,G),Je.updateMultisampleRenderTarget(ve),Je.updateRenderTargetMipmap(ve),St.has(`WEBGL_multisampled_render_to_texture`)===!1){let Ie=!1;for(let ot=0,kt=N.length;ot<kt;ot++){let{object:yt,geometry:tn,material:Le,group:ln}=N[ot];if(Le.side===2&&yt.layers.test(G.layers)){let ut=Le.side;Le.side=1,Le.needsUpdate=!0,Uh(yt,q,G,tn,Le,ln),Le.side=ut,Le.needsUpdate=!0,Ie=!0}}Ie===!0&&(Je.updateMultisampleRenderTarget(ve),Je.updateRenderTargetMipmap(ve))}O.setRenderTarget(xe,Te,Be),O.setClearColor(te,Ee),rt!==void 0&&(G.viewport=rt),O.toneMapping=Ke}function oo(y,N,q){let G=N.isScene===!0?N.overrideMaterial:null;for(let W=0,ve=y.length;W<ve;W++){let Pe=y[W],{object:xe,geometry:Te,group:Be}=Pe,Ke=Pe.material;Ke.allowOverride===!0&&G!==null&&(Ke=G),xe.layers.test(q.layers)&&Uh(xe,N,q,Te,Ke,Be)}}function Uh(y,N,q,G,W,ve){z!==null&&W.isNodeMaterial&&z.setObject(y,W),y.onBeforeRender(O,N,q,G,W,ve),y.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),W.onBeforeRender(O,N,q,G,y,ve),W.transparent===!0&&W.side===2&&W.forceSinglePass===!1?(W.side=1,W.needsUpdate=!0,O.renderBufferDirect(q,N,G,W,y,ve),W.side=0,W.needsUpdate=!0,O.renderBufferDirect(q,N,G,W,y,ve),W.side=2):O.renderBufferDirect(q,N,G,W,y,ve),y.onAfterRender(O,N,q,G,W,ve)}function Bh(y){let N=0;for(let q of y)q.texture!==null&&N++;return N}function Qs(y,N,q){N.isScene!==!0&&(N=An);let G=We.get(y),W=w.state.lights,ve=w.state.shadowsArray,Pe=W.state.version,xe=re.getParameters(y,W.state,ve,N,q,w.state.lightProbeGridArray),Te=re.getProgramCacheKey(xe),Be=G.programs;G.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?N.environment:null,G.fog=N.fog;let Ke=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;G.envMap=E.get(y.envMap||G.environment,Ke),G.envMapRotation=G.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,Be===void 0&&(y.addEventListener(`dispose`,gt),Be=/* @__PURE__ */ new Map,G.programs=Be,G.programVariants=/* @__PURE__ */ new Map);let rt=Be.get(Te);if(rt!==void 0){if(G.currentProgram===rt&&G.lightsStateVersion===Pe)return zh(y,xe),rt}else xe.uniforms=re.getUniforms(y),z!==null&&y.isNodeMaterial&&z.build(y,q,xe),y.onBeforeCompile(xe,O),rt=re.acquireProgram(xe,Te),Be.set(Te,rt),G.uniforms=xe.uniforms;let Ie=G.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ie.clippingPlanes=ne.uniform),zh(y,xe),G.needsLights=tm(y),G.lightsStateVersion=Pe,G.needsLights&&(Ie.ambientLightColor.value=W.state.ambient,Ie.lightProbe.value=W.state.probe,Ie.sunLights.value=W.state.sun,Ie.sunLightShadows.value=W.state.sunShadow,Ie.directionalLights.value=W.state.directional,Ie.directionalLightShadows.value=W.state.directionalShadow,Ie.spotLights.value=W.state.spot,Ie.spotLightShadows.value=W.state.spotShadow,Ie.rectAreaLights.value=W.state.rectArea,Ie.ltc_1.value=W.state.rectAreaLTC1,Ie.ltc_2.value=W.state.rectAreaLTC2,Ie.pointLights.value=W.state.point,Ie.pointLightShadows.value=W.state.pointShadow,Ie.hemisphereLights.value=W.state.hemi,Ie.sunShadowMatrix.value=W.state.sunShadowMatrix,Ie.sunShadowCascade.value=W.state.sunShadowCascade,Ie.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ie.spotLightMatrix.value=W.state.spotLightMatrix,Ie.spotLightMap.value=W.state.spotLightMap,Ie.pointShadowMatrix.value=W.state.pointShadowMatrix),G.numLightProbeGrids=Bh(w.state.lightProbeGridArray),G.currentProgram=rt,G.uniformsList=null,rt}function jf(y,N,q,G,W){let ve=We.get(y),Pe=ve.currentProgram.id+`,`+G+`,`+W,xe=ve.programVariants.get(Pe);return xe===void 0?(xe=Qs(y,N,q),ve.programVariants.set(Pe,xe)):(ve.currentProgram=xe,ve.uniformsList=null,ve.outputColorSpace=G,ve.toneMapping=W),xe}function kh(y){if(y.uniformsList===null){let N=y.currentProgram.getUniforms();y.uniformsList=Js.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function zh(y,N){let q=We.get(y);q.outputColorSpace=N.outputColorSpace,q.batching=N.batching,q.batchingColor=N.batchingColor,q.instancing=N.instancing,q.instancingColor=N.instancingColor,q.instancingMorph=N.instancingMorph,q.skinning=N.skinning,q.morphTargets=N.morphTargets,q.morphNormals=N.morphNormals,q.morphColors=N.morphColors,q.morphTargetsCount=N.morphTargetsCount,q.numClippingPlanes=N.numClippingPlanes,q.numIntersection=N.numClipIntersection,q.vertexAlphas=N.vertexAlphas,q.vertexTangents=N.vertexTangents,q.toneMapping=N.toneMapping}function Qf(y,N,q,G,W){N.isScene!==!0&&(N=An),Je.resetTextureUnits();let ve=N.fog,Pe=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?N.environment:null,xe=le===null?O.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:at.workingColorSpace,Te=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Be=E.get(G.envMap||Pe,Te),Ke=G.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,rt=!!q.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ie=!!q.morphAttributes.position,ot=!!q.morphAttributes.normal,kt=!!q.morphAttributes.color,Mt=ri;G.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(Mt=O.toneMapping);let yt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,tn=yt!==void 0?yt.length:0,Le=We.get(G),ln=w.state.lights;if(Gt===!0&&(pn===!0||y!==oe)){let It=y===oe&&G.id===Y;ne.setState(G,y,It)}let ut=!1,Yi=!1;G.version===Le.__version?Le.needsLights&&Le.lightsStateVersion!==ln.state.version||W.isBatchedMesh&&Le.batching===!1||!W.isBatchedMesh&&Le.batching===!0||W.isBatchedMesh&&Le.batchingColor===!0&&W._colorsTexture===null||W.isBatchedMesh&&Le.batchingColor===!1&&W._colorsTexture!==null||W.isInstancedMesh&&Le.instancing===!1||!W.isInstancedMesh&&Le.instancing===!0||W.isSkinnedMesh&&Le.skinning===!1||!W.isSkinnedMesh&&Le.skinning===!0||W.isInstancedMesh&&Le.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Le.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Le.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Le.instancingMorph===!1&&W.morphTexture!==null||Le.envMap!==Be||G.fog===!0&&Le.fog!==ve||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ne.numPlanes||Le.numIntersection!==ne.numIntersection)||Le.vertexAlphas!==Ke||Le.vertexTangents!==rt||Le.morphTargets!==Ie||Le.morphNormals!==ot||Le.morphColors!==kt||Le.morphTargetsCount!==tn||Le.numLightProbeGrids!==Bh(w.state.lightProbeGridArray)?ut=!0:(Le.outputColorSpace!==xe||Le.toneMapping!==Mt)&&(Yi=!0):(ut=!0,Le.__version=G.version);let nn=Le.currentProgram;(ut===!0||Yi===!0)&&(nn=Yi===!0?jf(G,N,W,xe,Mt):Qs(G,N,W),z&&G.isNodeMaterial&&z.onUpdateProgram(G,nn,Le));let ao=!1,Ai=!1,qi=!1,ht=nn.getUniforms(),Qt=Le.uniforms;if(Me.useProgram(nn.program)&&(ao=!0,Ai=!0,qi=!0),G.id!==Y&&(Y=G.id,Ai=!0),ao||oe!==y){Me.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ht.setValue(B,`projectionMatrix`,y.projectionMatrix),ht.setValue(B,`viewMatrix`,y.matrixWorldInverse);let $t=ht.map.cameraPosition;$t!==void 0&&$t.setValue(B,jn.setFromMatrixPosition(y.matrixWorld)),Ct.logarithmicDepthBuffer&&ht.setValue(B,`logDepthBufFC`,2/(Math.log(y.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ht.setValue(B,`isOrthographic`,y.isOrthographicCamera===!0),oe!==y&&(oe=y,Ai=!0,qi=!0)}if(Le.needsLights&&(ln.state.sunShadowMap.length>0&&ht.setValue(B,`sunShadowMap`,ln.state.sunShadowMap,Je),ln.state.directionalShadowMap.length>0&&ht.setValue(B,`directionalShadowMap`,ln.state.directionalShadowMap,Je),ln.state.spotShadowMap.length>0&&ht.setValue(B,`spotShadowMap`,ln.state.spotShadowMap,Je),ln.state.pointShadowMap.length>0&&ht.setValue(B,`pointShadowMap`,ln.state.pointShadowMap,Je)),W.isSkinnedMesh){ht.setOptional(B,W,`bindMatrix`),ht.setOptional(B,W,`bindMatrixInverse`);let It=W.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),ht.setValue(B,`boneTexture`,It.boneTexture,Je))}W.isBatchedMesh&&(ht.setOptional(B,W,`batchingTexture`),ht.setValue(B,`batchingTexture`,W._matricesTexture,Je),ht.setOptional(B,W,`batchingIdTexture`),ht.setValue(B,`batchingIdTexture`,W._indirectTexture,Je),ht.setOptional(B,W,`batchingColorTexture`),W._colorsTexture!==null&&ht.setValue(B,`batchingColorTexture`,W._colorsTexture,Je));let zn=q.morphAttributes;if((zn.position!==void 0||zn.normal!==void 0||zn.color!==void 0)&&se.update(W,q,nn),(Ai||Le.receiveShadow!==W.receiveShadow)&&(Le.receiveShadow=W.receiveShadow,ht.setValue(B,`receiveShadow`,W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&N.environment!==null&&(Qt.envMapIntensity.value=N.environmentIntensity),Qt.dfgLUT!==void 0&&(Qt.dfgLUT.value=zy()),Ai){if(ht.setValue(B,`toneMappingExposure`,O.toneMappingExposure),Le.needsLights&&em(Qt,qi),ve&&G.fog===!0&&pe.refreshFogUniforms(Qt,ve),pe.refreshMaterialUniforms(Qt,G,we,He,w.state.transmissionRenderTarget[y.id]),Le.needsLights&&Le.numLightProbeGrids>0){let It=S,$t=0;for(let ci of w.state.lightProbeGridArray)ci.texture!==null&&(It.textures[$t]=ci.texture,It.min[$t]=ci.boundingBox.min,It.max[$t]=ci.boundingBox.max,It.resolution[$t]=ci.resolution,$t++);for(let ci in It)It[ci].length=$t;Qt.probesSH.value=It.textures,Qt.probesMin.value=It.min,Qt.probesMax.value=It.max,Qt.probesResolution.value=It.resolution}Js.upload(B,kh(Le),Qt,Je)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Js.upload(B,kh(Le),Qt,Je),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ht.setValue(B,`center`,W.center),ht.setValue(B,`modelViewMatrix`,W.modelViewMatrix),ht.setValue(B,`normalMatrix`,W.normalMatrix),ht.setValue(B,`modelMatrix`,W.matrixWorld),G.uniformsGroups!==void 0){let It=G.uniformsGroups;for(let $t=0,ci=It.length;$t<ci;$t++){let Gh=It[$t];ze.update(Gh,nn),ze.bind(Gh,nn)}}return nn}function em(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.sunLights.needsUpdate=N,y.sunLightShadows.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function tm(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return le},this.setRenderTargetTextures=function(y,N,q){let G=We.get(y);G.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),We.get(y.texture).__webglTexture=N,We.get(y.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:q,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,N){let q=We.get(y);q.__webglFramebuffer=N,q.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(y,N=0,q=0){le=y,j=N,V=q;let G=null,W=!1,ve=!1;if(y){let xe=We.get(y);if(xe.__useDefaultFramebuffer!==void 0){Me.bindFramebuffer(B.FRAMEBUFFER,xe.__webglFramebuffer),ae.copy(y.viewport),Ae.copy(y.scissor),Ze=y.scissorTest,Me.viewport(ae),Me.scissor(Ae),Me.setScissorTest(Ze),Y=-1;return}else if(xe.__webglFramebuffer===void 0)Je.setupRenderTarget(y);else if(xe.__hasExternalTextures)Je.rebindTextures(y,We.get(y.texture).__webglTexture,We.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Ke=y.depthTexture;if(xe.__boundDepthTexture!==Ke){if(Ke!==null&&We.has(Ke)&&(y.width!==Ke.image.width||y.height!==Ke.image.height))throw new Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Je.setupDepthRenderbuffer(y)}}let Te=y.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ve=!0);let Be=We.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Be[N])?G=Be[N][q]:G=Be[N],W=!0):y.samples>0&&Je.useMultisampledRTT(y)===!1?G=We.get(y).__webglMultisampledFramebuffer:Array.isArray(Be)?G=Be[q]:G=Be,ae.copy(y.viewport),Ae.copy(y.scissor),Ze=y.scissorTest}else ae.copy(Xe).multiplyScalar(we).floor(),Ae.copy(_t).multiplyScalar(we).floor(),Ze=xt;if(q!==0&&(G=$),Me.bindFramebuffer(B.FRAMEBUFFER,G)&&Me.drawBuffers(y,G),Me.viewport(ae),Me.scissor(Ae),Me.setScissorTest(Ze),W){let xe=We.get(y.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+N,xe.__webglTexture,q)}else if(ve){let xe=N;for(let Te=0;Te<y.textures.length;Te++){let Be=We.get(y.textures[Te]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Te,Be.__webglTexture,q,xe)}}else if(y!==null&&q!==0){let xe=We.get(y.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,xe.__webglTexture,q)}Y=-1};function Vh(y){let N=We.get(y);return(N.__readFormat!==y.format||N.__readType!==y.type)&&(N.__readFormat=y.format,N.__readType=y.type,N.__formatReadable=Ct.textureFormatReadable(y.format),N.__typeReadable=Ct.textureTypeReadable(y.type)),N}this.readRenderTargetPixels=function(y,N,q,G,W,ve,Pe,xe=0){if(!(y&&y.isWebGLRenderTarget)){Ye(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let Te=We.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Pe!==void 0&&(Te=Te[Pe],Array.isArray(Te)&&(Te=Te[0])),Te){Me.bindFramebuffer(B.FRAMEBUFFER,Te);try{let Be=y.textures[xe],Ke=Be.format,rt=Be.type;y.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xe);let Ie=Vh(Be);if(Ie.__formatReadable===!1){Ye(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(Ie.__typeReadable===!1){Ye(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}N>=0&&N<=y.width-G&&q>=0&&q<=y.height-W&&B.readPixels(N,q,G,W,ue.convert(Ke),ue.convert(rt),ve)}finally{let Be=le!==null?We.get(le).__webglFramebuffer:null;Me.bindFramebuffer(B.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(y,N,q,G,W,ve,Pe,xe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let Te=We.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Pe!==void 0&&(Te=Te[Pe],Array.isArray(Te)&&(Te=Te[0])),Te)if(N>=0&&N<=y.width-G&&q>=0&&q<=y.height-W){Me.bindFramebuffer(B.FRAMEBUFFER,Te);let Be=y.textures[xe],Ke=Be.format,rt=Be.type;y.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xe);let Ie=Vh(Be);if(Ie.__formatReadable===!1)throw new Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(Ie.__typeReadable===!1)throw new Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let ot=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,ot),B.bufferData(B.PIXEL_PACK_BUFFER,ve.byteLength,B.STREAM_READ),B.readPixels(N,q,G,W,ue.convert(Ke),ue.convert(rt),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let kt=le!==null?We.get(le).__webglFramebuffer:null;Me.bindFramebuffer(B.FRAMEBUFFER,kt);let Mt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Sp(B,Mt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,ot),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ve),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(ot),B.deleteSync(Mt),ve}else throw new Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(y,N=null,q=0){let G=Math.pow(2,-q),W=Math.floor(y.image.width*G),ve=Math.floor(y.image.height*G),Pe=N!==null?N.x:0,xe=N!==null?N.y:0;Je.setTexture2D(y,0),B.copyTexSubImage2D(B.TEXTURE_2D,q,0,0,Pe,xe,W,ve),Me.unbindTexture()},this.copyTextureToTexture=function(y,N,q=null,G=null,W=0,ve=0){let Pe,xe,Te,Be,Ke,rt,Ie,ot,kt,Mt=y.isCompressedTexture?y.mipmaps[ve]:y.image;if(q!==null)Pe=q.max.x-q.min.x,xe=q.max.y-q.min.y,Te=q.isBox3?q.max.z-q.min.z:1,Be=q.min.x,Ke=q.min.y,rt=q.isBox3?q.min.z:0;else{let ht=Math.pow(2,-W);Pe=Math.floor(Mt.width*ht),xe=Math.floor(Mt.height*ht),y.isDataArrayTexture?Te=Mt.depth:y.isData3DTexture?Te=Math.floor(Mt.depth*ht):Te=1,Be=0,Ke=0,rt=0}G!==null?(Ie=G.x,ot=G.y,kt=G.z):(Ie=0,ot=0,kt=0);let yt=ue.convert(N.format),tn=ue.convert(N.type),Le;N.isData3DTexture?(Je.setTexture3D(N,0),Le=B.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Je.setTexture2DArray(N,0),Le=B.TEXTURE_2D_ARRAY):(Je.setTexture2D(N,0),Le=B.TEXTURE_2D),Me.activeTexture(B.TEXTURE0),Me.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,N.flipY),Me.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),Me.pixelStorei(B.UNPACK_ALIGNMENT,N.unpackAlignment);let ln=Me.getParameter(B.UNPACK_ROW_LENGTH),ut=Me.getParameter(B.UNPACK_IMAGE_HEIGHT),Yi=Me.getParameter(B.UNPACK_SKIP_PIXELS),nn=Me.getParameter(B.UNPACK_SKIP_ROWS),ao=Me.getParameter(B.UNPACK_SKIP_IMAGES);Me.pixelStorei(B.UNPACK_ROW_LENGTH,Mt.width),Me.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Mt.height),Me.pixelStorei(B.UNPACK_SKIP_PIXELS,Be),Me.pixelStorei(B.UNPACK_SKIP_ROWS,Ke),Me.pixelStorei(B.UNPACK_SKIP_IMAGES,rt);let Ai=y.isDataArrayTexture||y.isData3DTexture,qi=N.isDataArrayTexture||N.isData3DTexture;if(y.isDepthTexture){let ht=We.get(y),Qt=We.get(N),zn=We.get(ht.__renderTarget),It=We.get(Qt.__renderTarget);Me.bindFramebuffer(B.READ_FRAMEBUFFER,zn.__webglFramebuffer),Me.bindFramebuffer(B.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let $t=0;$t<Te;$t++)Ai&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,We.get(y).__webglTexture,W,rt+$t),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,We.get(N).__webglTexture,ve,kt+$t)),B.blitFramebuffer(Be,Ke,Be+Pe,Ke+xe,Ie,ot,Ie+Pe,ot+xe,B.DEPTH_BUFFER_BIT,B.NEAREST);Me.bindFramebuffer(B.READ_FRAMEBUFFER,null),Me.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(W!==0||y.isRenderTargetTexture||We.has(y)){let ht=We.get(y),Qt=We.get(N);Me.bindFramebuffer(B.READ_FRAMEBUFFER,D),Me.bindFramebuffer(B.DRAW_FRAMEBUFFER,X);for(let zn=0;zn<Te;zn++)Ai?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ht.__webglTexture,W,rt+zn):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ht.__webglTexture,W),qi?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Qt.__webglTexture,ve,kt+zn):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Qt.__webglTexture,ve),W!==0?B.blitFramebuffer(Be,Ke,Be+Pe,Ke+xe,Ie,ot,Ie+Pe,ot+xe,B.COLOR_BUFFER_BIT,B.NEAREST):qi?B.copyTexSubImage3D(Le,ve,Ie,ot,kt+zn,Be,Ke,Pe,xe):B.copyTexSubImage2D(Le,ve,Ie,ot,Be,Ke,Pe,xe);Me.bindFramebuffer(B.READ_FRAMEBUFFER,null),Me.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else qi?y.isDataTexture||y.isData3DTexture?B.texSubImage3D(Le,ve,Ie,ot,kt,Pe,xe,Te,yt,tn,Mt.data):N.isCompressedArrayTexture?B.compressedTexSubImage3D(Le,ve,Ie,ot,kt,Pe,xe,Te,yt,Mt.data):B.texSubImage3D(Le,ve,Ie,ot,kt,Pe,xe,Te,yt,tn,Mt):y.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,ve,Ie,ot,Pe,xe,yt,tn,Mt.data):y.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,ve,Ie,ot,Mt.width,Mt.height,yt,Mt.data):B.texSubImage2D(B.TEXTURE_2D,ve,Ie,ot,Pe,xe,yt,tn,Mt);Me.pixelStorei(B.UNPACK_ROW_LENGTH,ln),Me.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ut),Me.pixelStorei(B.UNPACK_SKIP_PIXELS,Yi),Me.pixelStorei(B.UNPACK_SKIP_ROWS,nn),Me.pixelStorei(B.UNPACK_SKIP_IMAGES,ao),ve===0&&N.generateMipmaps===!0&&N.mipmapsAutoUpdate===!0&&B.generateMipmap(Le),Me.unbindTexture()},this.initRenderTarget=function(y){We.get(y).__webglFramebuffer===void 0&&Je.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Je.setTextureCube(y,0):y.isData3DTexture?Je.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Je.setTexture2DArray(y,0):Je.setTexture2D(y,0),Me.unbindTexture()},this.resetState=function(){j=0,V=0,le=null,Me.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}};var cf={type:`change`};var vh={type:`start`};var df={type:`end`};var yl=new Di;var hf=new Cn;var Gy=Math.cos(70*Jr.DEG2RAD);var Yt=new L;var vn=2*Math.PI;var ft={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};var yh=1e-6;var vl=class extends is{constructor(e,t=null){super(e,t),this.state=ft.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:zi.ROTATE,MIDDLE:zi.DOLLY,RIGHT:zi.PAN},this.touches={ONE:Vi.ROTATE,TWO:Vi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new wt,this._lastTargetPosition=new L,this._quat=new wt().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xs,this._sphericalDelta=new Xs,this._scale=1,this._panOffset=new L,this._rotateStart=new Ne,this._rotateEnd=new Ne,this._rotateDelta=new Ne,this._panStart=new Ne,this._panEnd=new Ne,this._panDelta=new Ne,this._dollyStart=new Ne,this._dollyEnd=new Ne,this._dollyDelta=new Ne,this._dollyDirection=new L,this._mouse=new Ne,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Wy.bind(this),this._onPointerDown=Hy.bind(this),this._onPointerUp=Xy.bind(this),this._onContextMenu=jy.bind(this),this._onMouseWheel=Zy.bind(this),this._onKeyDown=$y.bind(this),this._onTouchStart=Jy.bind(this),this._onTouchMove=Ky.bind(this),this._onMouseDown=Yy.bind(this),this._onMouseMove=qy.bind(this),this._interceptControlDown=Qy.bind(this),this._interceptControlUp=ev.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=ft.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(cf),this.update(),this.state=ft.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Yt.copy(t).sub(this.target),Yt.applyQuaternion(this._quat),this._spherical.setFromVector3(Yt),this.autoRotate&&this.state===ft.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=vn:n>Math.PI&&(n-=vn),s<-Math.PI?s+=vn:s>Math.PI&&(s-=vn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Yt.setFromSpherical(this._spherical),Yt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Yt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Yt.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Yt.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(yl.origin.copy(this.object.position),yl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(yl.direction))<Gy?this.object.lookAt(this.target):(hf.setFromNormalAndCoplanarPoint(this.object.up,this.target),yl.intersectPlane(hf,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>yh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>yh||this._lastTargetPosition.distanceToSquared(this.target)>yh?(this.dispatchEvent(cf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?vn/60*this.autoRotateSpeed*e:vn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Yt.setFromMatrixColumn(t,0),Yt.multiplyScalar(-e),this._panOffset.add(Yt)}_panUp(e,t){this.screenSpacePanning===!0?Yt.setFromMatrixColumn(t,1):(Yt.setFromMatrixColumn(t,0),Yt.crossVectors(this.object.up,Yt)),Yt.multiplyScalar(e),this._panOffset.add(Yt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Yt.copy(s).sub(this.target);let r=Yt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ne,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Hy(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType===`touch`?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function Wy(i){this.enabled!==!1&&(i.pointerType===`touch`?this._onTouchMove(i):this._onMouseMove(i))}function Xy(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(df),this.state=ft.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y})}}function Yy(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case zi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ft.DOLLY;break;case zi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ft.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ft.ROTATE}break;case zi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ft.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ft.PAN}break;default:this.state=ft.NONE}this.state!==ft.NONE&&this.dispatchEvent(vh)}function qy(i){switch(this.state){case ft.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ft.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ft.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i)}}function Zy(i){this.enabled===!1||this.enableZoom===!1||this.state!==ft.NONE||(i.preventDefault(),this.dispatchEvent(vh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(df))}function $y(i){this.enabled!==!1&&this._handleKeyDown(i)}function Jy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Vi.ROTATE:if(this.enableRotate===!1){this.state=ft.NONE;break}this._handleTouchStartRotate(i),this.state=ft.TOUCH_ROTATE;break;case Vi.PAN:if(this.enablePan===!1){this.state=ft.NONE;break}this._handleTouchStartPan(i),this.state=ft.TOUCH_PAN;break;default:this.state=ft.NONE}break;case 2:switch(this.touches.TWO){case Vi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ft.TOUCH_DOLLY_PAN;break;case Vi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ft.TOUCH_DOLLY_ROTATE;break;default:this.state=ft.NONE}break;default:this.state=ft.NONE}this.state!==ft.NONE&&this.dispatchEvent(vh)}function Ky(i){switch(this._trackPointer(i),this.state){case ft.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ft.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ft.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ft.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ft.NONE}}function jy(i){this.enabled!==!1&&i.preventDefault()}function Qy(i){i.key===`Control`&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function ev(i){i.key===`Control`&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var cs=new ns;var Ft=new L;var Wi=new L;var Pt=new wt;var uf={X:new L(1,0,0),Y:new L(0,1,0),Z:new L(0,0,1)};var Mh={type:`change`};var pf={type:`mouseDown`,mode:null};var ff={type:`mouseUp`,mode:null};var mf={type:`objectChange`};var El=class extends is{constructor(e,t=null){super(void 0,t);let n=new Sh(this);this._root=n;let s=new Ch;this._gizmo=s,n.add(s);let r=new Eh;this._plane=r,n.add(r);let o=this;function a(C,S){let T=S;Object.defineProperty(o,C,{get:function(){return T!==void 0?T:S},set:function(w){T!==w&&(T=w,r[C]=w,s[C]=w,o.dispatchEvent({type:C+`-changed`,value:w}),o.dispatchEvent(Mh))}}),o[C]=S,r[C]=S,s[C]=S}a(`camera`,e),a(`object`,void 0),a(`enabled`,!0),a(`axis`,null),a(`mode`,`translate`),a(`translationSnap`,null),a(`rotationSnap`,null),a(`scaleSnap`,null),a(`space`,`world`),a(`size`,1),this.viewport=null,a(`dragging`,!1),a(`showX`,!0),a(`showY`,!0),a(`showZ`,!0),a(`showXY`,!0),a(`showYZ`,!0),a(`showXZ`,!0),a(`showXYZE`,!0),a(`showE`,!0),a(`minX`,-1/0),a(`maxX`,1/0),a(`minY`,-1/0),a(`maxY`,1/0),a(`minZ`,-1/0),a(`maxZ`,1/0);let c=new L,l=new L,h=new wt,u=new wt,d=new L,f=new wt,g=new L,M=new L,m=new L,p=0,v=new L;a(`worldPosition`,c),a(`worldPositionStart`,l),a(`worldQuaternion`,h),a(`worldQuaternionStart`,u),a(`cameraPosition`,d),a(`cameraQuaternion`,f),a(`pointStart`,g),a(`pointEnd`,M),a(`rotationAxis`,m),a(`rotationAngle`,p),a(`eye`,v),this._offset=new L,this._startNorm=new L,this._endNorm=new L,this._cameraScale=new L,this._parentPosition=new L,this._parentQuaternion=new wt,this._parentQuaternionInv=new wt,this._parentScale=new L,this._worldScaleStart=new L,this._worldQuaternionInv=new wt,this._worldScale=new L,this._positionStart=new L,this._quaternionStart=new wt,this._scaleStart=new L,this._getPointer=tv.bind(this),this._onPointerDown=iv.bind(this),this._onPointerHover=nv.bind(this),this._onPointerMove=sv.bind(this),this._onPointerUp=rv.bind(this),t!==null&&this.connect(t)}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointermove`,this._onPointerHover),this.domElement.addEventListener(`pointerup`,this._onPointerUp),this.domElement.style.touchAction=`none`}disconnect(){this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.removeEventListener(`pointermove`,this._onPointerHover),this.domElement.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.style.touchAction=``}getHelper(){return this._root}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;e!==null&&cs.setFromCamera(e,this.camera);let t=bh(this._gizmo.picker[this.mode],cs);t?this.axis=t.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e!=null&&e.button!==0)&&this.axis!==null){e!==null&&cs.setFromCamera(e,this.camera);let t=bh(this._plane,cs,!0);t&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(t.point).sub(this.worldPositionStart)),this.dragging=!0,pf.mode=this.mode,this.dispatchEvent(pf)}}pointerMove(e){let t=this.axis,n=this.mode,s=this.object,r=this.space;if(n===`scale`?r=`local`:(t===`E`||t===`XYZE`||t===`XYZ`)&&(r=`world`),s===void 0||t===null||this.dragging===!1||e!==null&&e.button!==-1)return;e!==null&&cs.setFromCamera(e,this.camera);let o=bh(this._plane,cs,!0);if(o){if(this.pointEnd.copy(o.point).sub(this.worldPositionStart),n===`translate`)this._offset.copy(this.pointEnd).sub(this.pointStart),r===`local`&&t!==`XYZ`&&this._offset.applyQuaternion(this._worldQuaternionInv),t.indexOf(`X`)===-1&&(this._offset.x=0),t.indexOf(`Y`)===-1&&(this._offset.y=0),t.indexOf(`Z`)===-1&&(this._offset.z=0),r===`local`&&t!==`XYZ`?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),s.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(r===`local`&&(s.position.applyQuaternion(Pt.copy(this._quaternionStart).invert()),t.search(`X`)!==-1&&(s.position.x=Math.round(s.position.x/this.translationSnap)*this.translationSnap),t.search(`Y`)!==-1&&(s.position.y=Math.round(s.position.y/this.translationSnap)*this.translationSnap),t.search(`Z`)!==-1&&(s.position.z=Math.round(s.position.z/this.translationSnap)*this.translationSnap),s.position.applyQuaternion(this._quaternionStart)),r===`world`&&(s.getWorldPosition(Ft),t.search(`X`)!==-1&&(Ft.x=Math.round(Ft.x/this.translationSnap)*this.translationSnap),t.search(`Y`)!==-1&&(Ft.y=Math.round(Ft.y/this.translationSnap)*this.translationSnap),t.search(`Z`)!==-1&&(Ft.z=Math.round(Ft.z/this.translationSnap)*this.translationSnap),s.position.copy(s.parent.worldToLocal(Ft)))),s.position.x=Math.max(this.minX,Math.min(this.maxX,s.position.x)),s.position.y=Math.max(this.minY,Math.min(this.maxY,s.position.y)),s.position.z=Math.max(this.minZ,Math.min(this.maxZ,s.position.z));else if(n===`scale`){if(t.search(`XYZ`)!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),Wi.set(a,a,a)}else Ft.copy(this.pointStart),Wi.copy(this.pointEnd),Ft.applyQuaternion(this._worldQuaternionInv),Wi.applyQuaternion(this._worldQuaternionInv),Wi.divide(Ft),t.search(`X`)===-1&&(Wi.x=1),t.search(`Y`)===-1&&(Wi.y=1),t.search(`Z`)===-1&&(Wi.z=1);s.scale.copy(this._scaleStart).multiply(Wi),this.scaleSnap&&(t.search(`X`)!==-1&&(s.scale.x=Math.round(s.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search(`Y`)!==-1&&(s.scale.y=Math.round(s.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),t.search(`Z`)!==-1&&(s.scale.z=Math.round(s.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(n===`rotate`){this._offset.copy(this.pointEnd).sub(this.pointStart);let a=20/this.worldPosition.distanceTo(Ft.setFromMatrixPosition(this.camera.matrixWorld)),c=!1;t===`XYZE`?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Ft.copy(this.rotationAxis).cross(this.eye))*a):(t===`X`||t===`Y`||t===`Z`)&&(this.rotationAxis.copy(uf[t]),Ft.copy(uf[t]),r===`local`&&Ft.applyQuaternion(this.worldQuaternion),Ft.cross(this.eye),Ft.length()===0?c=!0:this.rotationAngle=this._offset.dot(Ft.normalize())*a),(t===`E`||c)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),r===`local`&&t!==`E`&&t!==`XYZE`?(s.quaternion.copy(this._quaternionStart),s.quaternion.multiply(Pt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),s.quaternion.copy(Pt.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),s.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Mh),this.dispatchEvent(mf)}}pointerUp(e){e!==null&&e.button!==0||(this.dragging&&this.axis!==null&&(ff.mode=this.mode,this.dispatchEvent(ff)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(e){return this.object=e,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Mh),this.dispatchEvent(mf),this.pointStart.copy(this.pointEnd))}getRaycaster(){return cs}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}setColors(e,t,n,s){let r=this._gizmo.materialLib;r.xAxis.color.set(e),r.yAxis.color.set(t),r.zAxis.color.set(n),r.active.color.set(s),r.xAxisTransparent.color.set(e),r.yAxisTransparent.color.set(t),r.zAxisTransparent.color.set(n),r.activeTransparent.color.set(s),r.xAxis._color&&r.xAxis._color.set(e),r.yAxis._color&&r.yAxis._color.set(t),r.zAxis._color&&r.zAxis._color.set(n),r.active._color&&r.active._color.set(s),r.xAxisTransparent._color&&r.xAxisTransparent._color.set(e),r.yAxisTransparent._color&&r.yAxisTransparent._color.set(t),r.zAxisTransparent._color&&r.zAxisTransparent._color.set(n),r.activeTransparent._color&&r.activeTransparent._color.set(s)}};function tv(i){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:i.button};{let e=this.domElement.getBoundingClientRect(),t=this.viewport,n,s,r,o;return t!==null?(n=t.x,s=e.height-t.y-t.w,r=t.z,o=t.w):(n=0,s=0,r=e.width,o=e.height),{x:(i.clientX-e.left-n)/r*2-1,y:-(i.clientY-e.top-s)/o*2+1,button:i.button}}}function nv(i){if(this.enabled)switch(i.pointerType){case`mouse`:case`pen`:this.pointerHover(this._getPointer(i))}}function iv(i){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener(`pointermove`,this._onPointerMove),this.pointerHover(this._getPointer(i)),this.pointerDown(this._getPointer(i)))}function sv(i){this.enabled&&this.pointerMove(this._getPointer(i))}function rv(i){this.enabled&&(this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener(`pointermove`,this._onPointerMove),this.pointerUp(this._getPointer(i)))}function bh(i,e,t){let n=e.intersectObject(i,!0);for(let s=0;s<n.length;s++)if(n[s].object.visible||t)return n[s];return!1}var Ml=new Un;var vt=new L(0,1,0);var _f=new L(0,0,0);var gf=new dt;var bl=new wt;var Cl=new wt;var li=new L;var wl=new dt;var io=new L(1,0,0);var hs=new L(0,1,0);var so=new L(0,0,1);var Sl=new L;var to=new L;var no=new L;var Sh=class extends Nt{constructor(e){super(),this.isTransformControlsRoot=!0,this.controls=e,this.visible=!1}updateMatrixWorld(e){let t=this.controls;t.object!==void 0&&(t.object.updateMatrixWorld(),t.object.parent===null?console.error(`TransformControls: The attached 3D object must be a part of the scene graph.`):t.object.parent.matrixWorld.decompose(t._parentPosition,t._parentQuaternion,t._parentScale),t.object.matrixWorld.decompose(t.worldPosition,t.worldQuaternion,t._worldScale),t._parentQuaternionInv.copy(t._parentQuaternion).invert(),t._worldQuaternionInv.copy(t.worldQuaternion).invert()),t.camera.updateMatrixWorld(),t.camera.matrixWorld.decompose(t.cameraPosition,t.cameraQuaternion,t._cameraScale),t.camera.isOrthographicCamera?t.camera.getWorldDirection(t.eye).negate():t.eye.copy(t.cameraPosition).sub(t.worldPosition).normalize(),this.parent&&(wl.copy(this.parent.matrixWorld).invert(),wl.decompose(this.position,this.quaternion,this.scale)),super.updateMatrixWorld(e)}dispose(){this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}};var Ch=class extends Nt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type=`TransformControlsGizmo`;let e=new Mi({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),t=new qn({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=e.clone();n.opacity=.15;let s=t.clone();s.opacity=.5;let r=e.clone();r.color.setHex(16711680);let o=e.clone();o.color.setHex(65280);let a=e.clone();a.color.setHex(255);let c=e.clone();c.color.setHex(16711680),c.opacity=.5;let l=e.clone();l.color.setHex(65280),l.opacity=.5;let h=e.clone();h.color.setHex(255),h.opacity=.5;let u=e.clone();u.opacity=.25;let d=e.clone();d.color.setHex(16776960),d.opacity=.25;let f=e.clone();f.color.setHex(16776960);let g=e.clone();g.color.setHex(7895160),this.materialLib={xAxis:r,yAxis:o,zAxis:a,active:f,xAxisTransparent:c,yAxisTransparent:l,zAxisTransparent:h,activeTransparent:d};let M=new Kt(0,.04,.1,12);M.translate(0,.05,0);let m=new At(.08,.08,.08);m.translate(0,.04,0);let p=new Dt;p.setAttribute(`position`,new lt([0,0,0,1,0,0],3));let v=new Kt(.0075,.0075,.5,3);v.translate(0,.25,0);function C(X,j){let V=new Ci(X,.0075,3,64,j*Math.PI*2);return V.rotateY(Math.PI/2),V.rotateX(Math.PI/2),V}function S(){let X=new Dt;return X.setAttribute(`position`,new lt([0,0,0,1,1,1],3)),X}let T={X:[[new Se(M,r),[.5,0,0],[0,0,-Math.PI/2]],[new Se(M,r),[-.5,0,0],[0,0,Math.PI/2]],[new Se(v,r),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new Se(M,o),[0,.5,0]],[new Se(M,o),[0,-.5,0],[Math.PI,0,0]],[new Se(v,o)]],Z:[[new Se(M,a),[0,0,.5],[Math.PI/2,0,0]],[new Se(M,a),[0,0,-.5],[-Math.PI/2,0,0]],[new Se(v,a),null,[Math.PI/2,0,0]]],XYZ:[[new Se(new Fi(.1,0),u),[0,0,0]]],XY:[[new Se(new At(.15,.15,.01),h),[.15,.15,0]]],YZ:[[new Se(new At(.15,.15,.01),c),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Se(new At(.15,.15,.01),l),[.15,0,.15],[-Math.PI/2,0,0]]]},w={X:[[new Se(new Kt(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new Se(new Kt(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new Se(new Kt(.2,0,.6,4),n),[0,.3,0]],[new Se(new Kt(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new Se(new Kt(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new Se(new Kt(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new Se(new Fi(.2,0),n)]],XY:[[new Se(new At(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new Se(new At(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Se(new At(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]]},_={START:[[new Se(new Fi(.01,2),s),null,null,null,`helper`]],END:[[new Se(new Fi(.01,2),s),null,null,null,`helper`]],DELTA:[[new gn(S(),s),null,null,null,`helper`]],X:[[new gn(p,s),[-1e3,0,0],null,[1e6,1,1],`helper`]],Y:[[new gn(p,s),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],`helper`]],Z:[[new gn(p,s),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],`helper`]]},b={XYZE:[[new Se(C(.5,1),g),null,[0,Math.PI/2,0]]],X:[[new Se(C(.5,.5),r)]],Y:[[new Se(C(.5,.5),o),null,[0,0,-Math.PI/2]]],Z:[[new Se(C(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new Se(C(.75,1),d),null,[0,Math.PI/2,0]]]},F={AXIS:[[new gn(p,s),[-1e3,0,0],null,[1e6,1,1],`helper`]]},O={XYZE:[[new Se(new Lr(.25,10,8),n)]],X:[[new Se(new Ci(.5,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new Se(new Ci(.5,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new Se(new Ci(.5,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new Se(new Ci(.75,.1,2,24),n)]]},U={X:[[new Se(m,r),[.5,0,0],[0,0,-Math.PI/2]],[new Se(v,r),[0,0,0],[0,0,-Math.PI/2]],[new Se(m,r),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new Se(m,o),[0,.5,0]],[new Se(v,o)],[new Se(m,o),[0,-.5,0],[0,0,Math.PI]]],Z:[[new Se(m,a),[0,0,.5],[Math.PI/2,0,0]],[new Se(v,a),[0,0,0],[Math.PI/2,0,0]],[new Se(m,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new Se(new At(.15,.15,.01),h),[.15,.15,0]]],YZ:[[new Se(new At(.15,.15,.01),c),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Se(new At(.15,.15,.01),l),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new Se(new At(.1,.1,.1),u)]]},z={X:[[new Se(new Kt(.2,0,.6,4),n),[.3,0,0],[0,0,-Math.PI/2]],[new Se(new Kt(.2,0,.6,4),n),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new Se(new Kt(.2,0,.6,4),n),[0,.3,0]],[new Se(new Kt(.2,0,.6,4),n),[0,-.3,0],[0,0,Math.PI]]],Z:[[new Se(new Kt(.2,0,.6,4),n),[0,0,.3],[Math.PI/2,0,0]],[new Se(new Kt(.2,0,.6,4),n),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new Se(new At(.2,.2,.01),n),[.15,.15,0]]],YZ:[[new Se(new At(.2,.2,.01),n),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new Se(new At(.2,.2,.01),n),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new Se(new At(.2,.2,.2),n),[0,0,0]]]},$={X:[[new gn(p,s),[-1e3,0,0],null,[1e6,1,1],`helper`]],Y:[[new gn(p,s),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],`helper`]],Z:[[new gn(p,s),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],`helper`]]};function D(X){let j=new Nt;for(let V in X)for(let le=X[V].length;le--;){let Y=X[V][le][0].clone(),oe=X[V][le][1],ae=X[V][le][2],Ae=X[V][le][3],Ze=X[V][le][4];Y.name=V,Y.tag=Ze,oe&&Y.position.set(oe[0],oe[1],oe[2]),ae&&Y.rotation.set(ae[0],ae[1],ae[2]),Ae&&Y.scale.set(Ae[0],Ae[1],Ae[2]),Y.updateMatrix();let te=Y.geometry.clone();te.applyMatrix4(Y.matrix),Y.geometry=te,Y.renderOrder=1/0,Y.position.set(0,0,0),Y.rotation.set(0,0,0),Y.scale.set(1,1,1),j.add(Y)}return j}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=D(T)),this.add(this.gizmo.rotate=D(b)),this.add(this.gizmo.scale=D(U)),this.add(this.picker.translate=D(w)),this.add(this.picker.rotate=D(O)),this.add(this.picker.scale=D(z)),this.add(this.helper.translate=D(_)),this.add(this.helper.rotate=D(F)),this.add(this.helper.scale=D($)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){let n=(this.mode===`scale`?`local`:this.space)===`local`?this.worldQuaternion:Cl;this.gizmo.translate.visible=this.mode===`translate`,this.gizmo.rotate.visible=this.mode===`rotate`,this.gizmo.scale.visible=this.mode===`scale`,this.helper.translate.visible=this.mode===`translate`,this.helper.rotate.visible=this.mode===`rotate`,this.helper.scale.visible=this.mode===`scale`;let s=[];s=s.concat(this.picker[this.mode].children),s=s.concat(this.gizmo[this.mode].children),s=s.concat(this.helper[this.mode].children);for(let r=0;r<s.length;r++){let o=s[r];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(a*this.size/4),o.tag===`helper`){o.visible=!1,o.name===`AXIS`?(o.visible=!!this.axis,this.axis===`X`&&(Pt.setFromEuler(Ml.set(0,0,0)),o.quaternion.copy(n).multiply(Pt),Math.abs(vt.copy(io).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis===`Y`&&(Pt.setFromEuler(Ml.set(0,0,Math.PI/2)),o.quaternion.copy(n).multiply(Pt),Math.abs(vt.copy(hs).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis===`Z`&&(Pt.setFromEuler(Ml.set(0,Math.PI/2,0)),o.quaternion.copy(n).multiply(Pt),Math.abs(vt.copy(so).applyQuaternion(n).dot(this.eye))>.9&&(o.visible=!1)),this.axis===`XYZE`&&(Pt.setFromEuler(Ml.set(0,Math.PI/2,0)),vt.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(gf.lookAt(_f,vt,hs)),o.quaternion.multiply(Pt),o.visible=this.dragging),this.axis===`E`&&(o.visible=!1)):o.name===`START`?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name===`END`?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name===`DELTA`?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),Ft.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Ft.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(Ft),o.visible=this.dragging):(o.quaternion.copy(n),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(n),this.mode===`translate`||this.mode===`scale`?(o.name===`X`&&Math.abs(vt.copy(io).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name===`Y`&&Math.abs(vt.copy(hs).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name===`Z`&&Math.abs(vt.copy(so).applyQuaternion(n).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name===`XY`&&Math.abs(vt.copy(so).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name===`YZ`&&Math.abs(vt.copy(io).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name===`XZ`&&Math.abs(vt.copy(hs).applyQuaternion(n).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode===`rotate`&&(bl.copy(n),vt.copy(this.eye).applyQuaternion(Pt.copy(n).invert()),o.name.search(`E`)!==-1&&o.quaternion.setFromRotationMatrix(gf.lookAt(this.eye,_f,hs)),o.name===`X`&&(Pt.setFromAxisAngle(io,Math.atan2(-vt.y,vt.z)),Pt.multiplyQuaternions(bl,Pt),o.quaternion.copy(Pt)),o.name===`Y`&&(Pt.setFromAxisAngle(hs,Math.atan2(vt.x,vt.z)),Pt.multiplyQuaternions(bl,Pt),o.quaternion.copy(Pt)),o.name===`Z`&&(Pt.setFromAxisAngle(so,Math.atan2(vt.y,vt.x)),Pt.multiplyQuaternions(bl,Pt),o.quaternion.copy(Pt))),o.visible=o.visible&&(o.name.indexOf(`X`)===-1||this.showX),o.visible=o.visible&&(o.name.indexOf(`Y`)===-1||this.showY),o.visible=o.visible&&(o.name.indexOf(`Z`)===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf(`E`)===-1||this.showX&&this.showY&&this.showZ),o.visible=o.visible&&(o.name.indexOf(`XY`)===-1||this.showXY),o.visible=o.visible&&(o.name.indexOf(`YZ`)===-1||this.showYZ),o.visible=o.visible&&(o.name.indexOf(`XZ`)===-1||this.showXZ),o.visible=o.visible&&(o.name!==`E`||this.showE),o.visible=o.visible&&(o.name!==`XYZE`||this.showXYZE),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis?(o.material.color.copy(this.materialLib.active.color),o.material.opacity=1):this.axis.split(``).some(function(c){return o.name===c})&&(o.material.color.copy(this.materialLib.active.color),o.material.opacity=1))}super.updateMatrixWorld(e)}};var Eh=class extends Se{constructor(){super(new Si(1e5,1e5,2,2),new Mi({visible:!1,wireframe:!0,side:2,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type=`TransformControlsPlane`}updateMatrixWorld(e){let t=this.space;switch(this.position.copy(this.worldPosition),this.mode===`scale`&&(t=`local`),Sl.copy(io).applyQuaternion(t===`local`?this.worldQuaternion:Cl),to.copy(hs).applyQuaternion(t===`local`?this.worldQuaternion:Cl),no.copy(so).applyQuaternion(t===`local`?this.worldQuaternion:Cl),vt.copy(to),this.mode){case`translate`:case`scale`:switch(this.axis){case`X`:vt.copy(this.eye).cross(Sl),li.copy(Sl).cross(vt);break;case`Y`:vt.copy(this.eye).cross(to),li.copy(to).cross(vt);break;case`Z`:vt.copy(this.eye).cross(no),li.copy(no).cross(vt);break;case`XY`:li.copy(no);break;case`YZ`:li.copy(Sl);break;case`XZ`:vt.copy(no),li.copy(to);break;case`XYZ`:case`E`:li.set(0,0,0)}break;default:li.set(0,0,0)}li.length()===0?this.quaternion.copy(this.cameraQuaternion):(wl.lookAt(Ft.set(0,0,0),li,vt),this.quaternion.setFromRotationMatrix(wl)),super.updateMatrixWorld(e)}};var xf=2763571;var ov=1119004;var av=new qe(16762219);var yf=[`color`,`specular`,`night`,`bump`];var Tl=.32;var Al=12;var lv=new qn({color:16765773,depthTest:!1,transparent:!0});var cv=new qn({color:7319807,depthTest:!1,transparent:!0});var Pl=class{constructor(e){this.host=e;this.renderer=new _l({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.appendChild(this.renderer.domElement),this.scene.background=new qe(xf),this.sun.position.set(60,120,90),this.scene.add(this.hemi,this.sun);let t=new kr(160,160,5592938,3816520);this.scene.add(t,this.group),this.camera.position.set(80,70,110),this.controls=new vl(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.gizmo=new El(this.camera,this.renderer.domElement),this.gizmo.setTranslationSnap(1),this.gizmo.setSize(.8),this.gizmo.addEventListener(`dragging-changed`,n=>{this.controls.enabled=!n.value;let s=this.gizmo.object;!n.value&&s&&this.onPartMoved?.(s.userData.partIndex,{x:s.position.x,y:s.position.y,z:s.position.z})}),this.scene.add(this.gizmo.getHelper()),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),this.renderer.setAnimationLoop(()=>this.render())}host;renderer;scene=new vr;camera=new dn(40,1,.5,5e3);controls;resizeObserver;model=null;group=new gi;textures=/* @__PURE__ */ new Map;previewNight=!1;size=new Ne;outline=null;view={layer:`color`,night:!1};hemi=new Nr(16777215,6710903,1.6);sun=new Br(16777215,1.6);gizmo;onPartMoved=null;raycaster=new ns;render(){this.controls.update();let{x:e,y:t}=this.renderer.getSize(this.size);if(this.renderer.setScissorTest(!1),this.renderer.setViewport(0,0,e,t),this.light(this.view.night&&this.view.layer===`color`),this.renderer.render(this.scene,this.camera),this.view.layer===`color`)return;let n=Math.round(e*Tl),s=Math.round(t*Tl),r=e-n-Al,o=Al;this.renderer.setScissorTest(!0),this.renderer.setScissor(r,o,n,s),this.renderer.setViewport(r,o,n,s);let a=h=>this.group.children.forEach(u=>u.material=u.userData[h]);a(`preview`);let c=this.gizmo.getHelper(),l=c.visible;c.visible=!1,this.outline&&(this.outline.visible=!1),this.light(this.previewNight),this.renderer.render(this.scene,this.camera),a(`main`),c.visible=l,this.outline&&(this.outline.visible=!0),this.renderer.setScissorTest(!1)}light(e){this.scene.background.setHex(e?ov:xf),this.hemi.intensity=e?.35:1.6,this.sun.intensity=e?.15:1.6}setPreviewNight(e){this.previewNight=e,this.group.children.forEach(t=>t.userData.preview.forEach(n=>n.emissiveIntensity=e?1:0))}get canvas(){return this.renderer.domElement}get onGizmo(){return this.gizmo.axis!==null}setView(e){this.view=e,this.model&&this.refresh(this.model)}setModel(e){this.refresh(e),this.frame()}refresh(e){this.gizmo.detach(),this.clear(),this.model=e,Object.entries(e.textures).forEach(([t,n])=>this.textures.set(t,this.makeTextures(n))),e.parts.forEach((t,n)=>{let s=(o,a=!1)=>{let c=this.textures.get(t.faces[o]??``),l$1={side:t.side===2?2:t.side===1?1:0,depthWrite:!!t.depthWrite,depthTest:!!t.depthTest,alphaTest:.5},h=this.view.layer;if(h!==`color`&&!a){let d=h===`specular`?`specularView`:h===`bump`?`bumpView`:h;return new Mi(m(l({},l$1),{map:c?.[d]??null}))}let u=a?this.previewNight:this.view.night;return new Or(m(l({},l$1),{map:c?.color??null,specular:16777215,specularMap:c?.specular??null,shininess:20,emissive:av,emissiveMap:c?.night??null,emissiveIntensity:u?1:0,bumpMap:c?.bump??null,bumpScale:e.bumpScale??1}))},r=t.kind===`box`?new Se(new At(t.size.x,t.size.y,t.size.z),F.map(o=>s(o))):new Se(new Si(t.size.x,t.size.y),[s(`front`)]);t.kind===`plane`&&r.geometry.addGroup(0,1/0,0),r.userData.main=r.material,r.userData.preview=this.view.layer===`color`?[]:(t.kind===`box`?F:[`front`]).map(o=>s(o,!0)),r.position.set(t.pos.x,t.pos.y,t.pos.z),r.rotation.set(t.rot.x,t.rot.y,t.rot.z),r.userData.partIndex=n,this.group.add(r)})}pick(e,t,n=!1){if(!this.model)return null;let s=this.canvas.getBoundingClientRect(),r=new Ne((e-s.left)/s.width*2-1,-(t-s.top)/s.height*2+1);this.raycaster.setFromCamera(r,this.camera);let o=null;for(let a of this.raycaster.intersectObjects(this.group.children,!1)){let l=a.object.userData.partIndex,h=this.model.parts[l],u=h.kind===`box`?F[a.face.materialIndex]:`front`,d=h.faces[u],f=d?this.model.textures[d]:null;if(!f||!a.uv)continue;let g=Math.min(f.w-1,Math.floor(a.uv.x*f.w)),M=Math.min(f.h-1,Math.floor((1-a.uv.y)*f.h));if(f.color[(M*f.w+g)*4+3]<128){o??={partIndex:l,face:u,px:{x:g,y:M}};continue}return{partIndex:l,face:u,px:{x:g,y:M}}}return n?o:null}updateTexture(e){let t=this.textures.get(e),n=this.model?.textures[e];t&&n&&(yf.forEach(s=>{t[s].image.getContext(`2d`).putImageData(new ImageData(new Uint8ClampedArray(St(n,s)),n.w,n.h),0,0),t[s].needsUpdate=!0}),t.specularView.needsUpdate=!0,t.bumpView.needsUpdate=!0)}set orbitEnabled(e){this.controls.enabled=e}set gizmoEnabled(e){this.gizmo.enabled=e,this.gizmo.getHelper().visible=e}highlight(e,t){if(this.outline?.removeFromParent(),this.outline?.geometry.dispose(),this.outline=null,this.gizmo.detach(),e===null||!this.model)return;let n=this.group.children.find(r=>r.userData.partIndex===e);if(!n)return;let s=this.model.parts[e];if(t){let r=s.kind===`box`?F.indexOf(t)*4:0,o=n.geometry.getAttribute(`position`),a=[0,1,3,2].map(c=>new L().fromBufferAttribute(o,r+c));this.outline=new wr(new Dt().setFromPoints(a),lv),this.outline.renderOrder=10,n.add(this.outline)}else this.outline=new ts(new Ir(n.geometry),cv),this.outline.renderOrder=10,n.add(this.outline);this.gizmo.attach(n),this.gizmo.getHelper().visible=this.gizmo.enabled}dispose(){this.renderer.setAnimationLoop(null),this.resizeObserver.disconnect(),this.clear(),this.gizmo.dispose(),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}makeTextures(e){let t=Object.fromEntries(yf.map(n=>{let s=document.createElement(`canvas`);return s.width=e.w,s.height=e.h,s.getContext(`2d`).putImageData(new ImageData(new Uint8ClampedArray(St(e,n)),e.w,e.h),0,0),[n,s]}));return{color:this.makeTexture(t.color,!0),night:this.makeTexture(t.night,!0),specular:this.makeTexture(t.specular,!1),bump:this.makeTexture(t.bump,!1),specularView:this.makeTexture(t.specular,!0),bumpView:this.makeTexture(t.bump,!0)}}makeTexture(e,t){let n=new Ar(e);return n.colorSpace=t?hn:``,n.magFilter=Ut,n.minFilter=Ut,n.generateMipmaps=!1,n}frame(){let e=new Bn().setFromObject(this.group);if(e.isEmpty())return;let t=e.getCenter(new L),s=e.getSize(new L).length()/2/Math.sin(Jr.degToRad(this.camera.fov/2))*1.1,r=new L(.55,.45,.85).normalize();this.controls.target.copy(t),this.camera.position.copy(t).addScaledVector(r,s),this.controls.update()}clear(){this.outline?.geometry.dispose(),this.outline=null,this.group.children.forEach(e=>{let t=e;t.geometry.dispose(),t.material.forEach(n=>n.dispose()),t.userData.preview.forEach(n=>n.dispose())}),this.group.clear(),this.textures.forEach(e=>Object.values(e).forEach(t=>t.dispose())),this.textures.clear(),this.model=null}resize(){let{clientWidth:e,clientHeight:t}=this.host;!e||!t||(this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix())}};var hv=[200,200,205,255];function dv(i,e,t=hv){let n=new Uint8ClampedArray(i*e*4);for(let s=0;s<n.length;s+=4)n.set(t,s);return{w:i,h:e,color:n}}function uv(i){let e=Object.keys(i.textures).length;for(;`t${e}`in i.textures;)e++;return`t${e}`}function Rl(i,e){let t=uv(i);return i.textures[t]=e,t}function Mf(i){return{w:i.w,h:i.h,color:i.color.slice(),specular:i.specular?.slice(),night:i.night?.slice(),bump:i.bump?.slice()}}function pv(i,e){gt(e).forEach(t=>{let{w:n,h:s}=zt(e,t);e.faces[t]=Rl(i,dv(n,s))})}function bf(i){let e={id:i,hitBox:{min:{x:0,y:0,z:0},max:{x:0,y:0,z:0}},parts:[],textures:{}};return wh(e,`box`),e}function fv(i){if(!i.parts.length)return{x:0,y:8,z:0};let e=Math.max(...i.parts.map(t=>t.pos.x+Math.max(t.size.x,t.size.z)/2));return{x:Math.ceil(e)+10,y:8,z:0}}function wh(i,e,t=fv(i)){let n={kind:e,size:{x:16,y:16,z:e===`box`?16:0},pos:l({},t),rot:{x:0,y:0,z:0},side:e===`box`?0:2,depthWrite:!0,depthTest:!0,faces:{}};return pv(i,n),i.parts.push(n),i.parts.length-1}function Sf(i,e){let t=i.parts[e],n=structuredClone(m(l({},t),{faces:{}}));n.pos.x+=Math.max(1,Math.round(t.size.x));let s=/* @__PURE__ */ new Map;return Object.entries(t.faces).forEach(([r,o])=>{s.has(o)||s.set(o,Rl(i,Mf(i.textures[o]))),n.faces[r]=s.get(o)}),i.parts.splice(e+1,0,n),e+1}function Cf(i,e){i.parts.splice(e,1),Th(i)}function mv(i,e,t){let n={w:e,h:t,color:new Uint8ClampedArray(e*t*4)},s=[`specular`,`night`,`bump`].filter(o=>i[o]);s.forEach(o=>n[o]=new Uint8ClampedArray(e*t));let r=t-i.h;for(let o=0;o<t;o++){let a=o-r;if(!(a<0||a>=i.h))for(let c=0;c<Math.min(e,i.w);c++){let l=a*i.w+c,h=o*e+c;n.color.set(i.color.subarray(l*4,l*4+4),h*4),s.forEach(u=>n[u][h]=i[u][l])}}return n}function Ef(i,e,t){let n=i.parts[e];n.size=l({},t);let s=/* @__PURE__ */ new Map;Object.entries(n.faces).forEach(([r,o])=>{let a=i.textures[o],{w:c,h:l}=zt(n,r);if(a.w===c&&a.h===l)return;let h=`${o}:${c}x${l}`;s.has(h)||s.set(h,Rl(i,mv(a,c,l))),n.faces[r]=s.get(h)}),Th(i)}function Th(i){let e=new Set(i.parts.flatMap(t=>Object.values(t.faces)));Object.keys(i.textures).filter(t=>!e.has(t)).forEach(t=>delete i.textures[t])}function wf(i,e,t){let n=i.parts[e],s=n.faces[t];s&&(n.faces[t]=Rl(i,Mf(i.textures[s])))}function Tf(i,e,t,n){let s=i.parts[t],r=i.textures[e],{w:o,h:a}=zt(s,n);return r.w!==o||r.h!==a?!1:(s.faces[n]=e,Th(i),!0)}function Af(i,e,t){let n=Rf(i,i.w,i.h,e,t);i.color.set(n.color),[`specular`,`night`,`bump`].forEach(s=>n[s]&&i[s].set(n[s]))}function Pf(i,e,t,n,s=!1,r=!1){let o=i.parts[t].faces[n];if(!o)return;let a=i.textures[o];i.textures[o]=Rf(i.textures[e],a.w,a.h,s,r)}function Rf(i,e,t,n,s){let r={w:e,h:t,color:new Uint8ClampedArray(e*t*4)},o=[`specular`,`night`,`bump`].filter(a=>i[a]);o.forEach(a=>r[a]=new Uint8ClampedArray(e*t));for(let a=0;a<t;a++){let c=Math.floor((s?t-1-a:a)*i.h/t);for(let l=0;l<e;l++){let h=Math.floor((n?e-1-l:l)*i.w/e),u=c*i.w+h,d=a*e+l;r.color.set(i.color.subarray(u*4,u*4+4),d*4),o.forEach(f=>r[f][d]=i[f][u])}}return r}var _v=60;var Il=class{past=[];future=[];get canUndo(){return this.past.length>0}get canRedo(){return this.future.length>0}record(e){this.past.push(structuredClone(e)),this.past.length>_v&&this.past.shift(),this.future=[]}undo(e){let t=this.past.pop();return t?(this.future.push(structuredClone(e)),t):null}redo(e){let t=this.future.pop();return t?(this.past.push(structuredClone(e)),t):null}drop(){return this.past.pop()??null}clear(){this.past=[],this.future=[]}};function Ah(i,e){let t=(e.y*i.w+e.x)*i.channels;return Array.from(i.data.subarray(t,t+i.channels))}function Ph(i,e,t){e.x>=0&&e.y>=0&&e.x<i.w&&e.y<i.h&&i.data.set(t,(e.y*i.w+e.x)*i.channels)}function If(i,e){let t=[],n=Math.abs(e.x-i.x),s=-Math.abs(e.y-i.y),r=i.x<e.x?1:-1,o=i.y<e.y?1:-1,a=n+s,c=i.x,l=i.y;for(;;){if(t.push({x:c,y:l}),c===e.x&&l===e.y)return t;let h=2*a;h>=s&&(a+=s,c+=r),h<=n&&(a+=n,l+=o)}}function gv(i,e,t){let n=[],[s,r]=[Math.min(i.x,e.x),Math.max(i.x,e.x)],[o,a]=[Math.min(i.y,e.y),Math.max(i.y,e.y)];for(let c=o;c<=a;c++)for(let l=s;l<=r;l++)(t||l===s||l===r||c===o||c===a)&&n.push({x:l,y:c});return n}function xv(i,e,t){let n=Ah(i,e).join();if(n===t.join())return;let s=[e];for(;s.length;){let r=s.pop();r.x<0||r.y<0||r.x>=i.w||r.y>=i.h||Ah(i,r).join()!==n||(Ph(i,r,t),s.push({x:r.x+1,y:r.y},{x:r.x-1,y:r.y},{x:r.x,y:r.y+1},{x:r.x,y:r.y-1}))}}var Ll=class{constructor(e,t,n,s=!1,r=()=>{}){this.tex=e;this.tool=t;this.rgba=n;this.filled=s;this.onPick=r;this.snapshot=t===`line`||t===`rect`?e.data.slice():null}tex;tool;rgba;filled;onPick;snapshot;start=null;last=null;apply(e){let t=!this.start;this.start??=e;let n=this.last;switch(this.last=e,this.tool){case`picker`:return this.onPick(Ah(this.tex,e)),!1;case`fill`:return t&&xv(this.tex,e,this.rgba),t;case`pencil`:case`eraser`:{let s=this.tool===`eraser`?new Array(this.tex.channels).fill(0):this.rgba;return If(n??e,e).forEach(r=>Ph(this.tex,r,s)),!0}case`line`:case`rect`:return this.tex.data.set(this.snapshot),(this.tool===`line`?If(this.start,e):gv(this.start,e,this.filled)).forEach(s=>Ph(this.tex,s,this.rgba)),!0}}};function ro(i){let e=parseInt(i.slice(1),16);return[e>>16&255,e>>8&255,e&255,255]}function js(i){return`#`+i.slice(0,3).map(e=>e.toString(16).padStart(2,`0`)).join(``)}var yv=40;function Lf(i){let e=/* @__PURE__ */ new Map;return Object.values(i.textures).forEach(t=>{for(let n=0;n<t.color.length;n+=4)if(t.color[n+3]>=128){let s=t.color[n]<<16|t.color[n+1]<<8|t.color[n+2];e.set(s,(e.get(s)??0)+1)}}),[...e.entries()].sort((t,n)=>n[1]-t[1]).slice(0,yv).map(([t])=>js([t>>16&255,t>>8&255,t&255,255]))}var vv=256;var Of=`.gpl,.pal,.hex,.txt,.png`;function Rh(i,e,t){return js([i,e,t,255])}function Mv(i){return[...new Set(i)].slice(0,vv)}function bv(i){return{name:/^Name:\s*(.+)$/m.exec(i)?.[1].trim(),colors:i.split(/\r?\n/).map(n=>/^\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})/.exec(n)).filter(n=>!!n).map(n=>Rh(+n[1],+n[2],+n[3]))}}function Sv(i){return i.split(/\r?\n/).slice(3).map(e=>/^\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*$/.exec(e)).filter(e=>!!e).map(e=>Rh(+e[1],+e[2],+e[3]))}function Cv(i){return i.split(/\r?\n/).map(e=>e.trim().replace(/^#/,``)).filter(e=>/^([0-9a-f]{2})?[0-9a-f]{6}$/i.test(e)).map(e=>`#`+e.slice(-6).toLowerCase())}async function Ev(i){let e=await createImageBitmap(i),t=document.createElement(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`,{willReadFrequently:!0});n.drawImage(e,0,0),e.close();let s=n.getImageData(0,0,t.width,t.height).data,r=[];for(let o=0;o<s.length;o+=4)s[o+3]>=128&&r.push(Rh(s[o],s[o+1],s[o+2]));return r}async function Df(i){let e=i.name.toLowerCase().split(`.`).pop()??``,t=i.name.replace(/\.[^.]+$/,``),n,s;if(e===`png`)s=await Ev(i);else{let r=await i.text();/^GIMP Palette/.test(r)?{name:n,colors:s}=bv(r):/^JASC-PAL/.test(r)?s=Sv(r):s=Cv(r)}if(s=Mv(s),!s.length)throw new Error(`Aucune couleur trouv\xE9e dans ${i.name}`);return{name:n||t,colors:s}}function Nf(i,e){let[t,n,s]=ro(i),r=e[0],o=1/0;return e.forEach(a=>{let[c,l,h]=ro(a),u=2*(c-t)**2+4*(l-n)**2+3*(h-s)**2;u<o&&(r=a,o=u)}),r}var Av=[`canvas`];var Pv=[`scroll`];function Rv(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,10),c_(`click`,function(){g0(t);let s=y();return S0(s.zoom.set(0))}),d(),Y1(1,`svg`,11),Ud()}}function Iv(i,e){if(i&1&&(gr$1(0,`span`,8),B(1),Ud()),i&2){let t=e;g(),L_(``,t.x,`, `,t.y)}}var Ff=264;var Uf=220;var Lv=6;var Ov=8192;var Ol=class i{texture=Ye$1.required();layer=Ye$1(`color`);version=Ye$1(0);faceKey=Ye$1(``);fill=Ye$1(!1);strokeStart=bG();strokeMove=bG();strokeEnd=bG();strokeCancel=bG();canvas=DG.required(`canvas`);scroll=DG.required(`scroll`);room=D({w:Ff,h:Uf});zoom=D(0);hover=D(null);drawing=!1;pointers=/* @__PURE__ */ new Map;gesture=null;gestureDone=!1;anchor=null;scale=Re(()=>{let e=this.texture(),t=this.fill()?this.room():{w:Ff,h:Uf};return Math.min(this.maxScale(e),Math.max(1,this.fitScale(e,t)+this.zoom()))});constructor(){let e=z(Ee);Pu$1(()=>{let t=this.scroll().nativeElement,n=new ResizeObserver(()=>{if(t.clientWidth>0&&t.clientHeight>0){let s=getComputedStyle(t),r=parseFloat(s.paddingLeft)+parseFloat(s.paddingRight),o=parseFloat(s.paddingTop)+parseFloat(s.paddingBottom);this.room.set({w:t.clientWidth-r-2,h:t.clientHeight-o-2})}});n.observe(t),e.onDestroy(()=>n.disconnect())}),Xl$1(()=>{this.faceKey(),this.zoom.set(0)}),Xl$1(()=>{this.version(),this.draw(this.texture(),this.layer(),this.scale(),this.hover())})}zoomBy(e){this.setScale(this.scale()+e)}setScale(e,t){let n=this.texture(),s=Math.min(this.maxScale(n),Math.max(1,Math.round(e))),r=this.scale();if(s!==r){if(t){let o=this.canvas().nativeElement.getBoundingClientRect();this.anchor={u:(t.x-o.left)/o.width*n.w,v:(t.y-o.top)/o.height*n.h,x:t.x,y:t.y}}this.zoom.update(o=>o+s-r)}}wheel(e){if(!e.ctrlKey)return;e.preventDefault();let t=this.scale();this.setScale(t*Math.exp(-e.deltaY/100),{x:e.clientX,y:e.clientY}),this.scale()===t&&Math.abs(e.deltaY)>0&&this.setScale(t-Math.sign(e.deltaY),{x:e.clientX,y:e.clientY})}down(e){if(e.button===0){if(this.scroll().nativeElement.setPointerCapture(e.pointerId),this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this.pointers.size===2){this.drawing&&(this.drawing=!1,this.strokeCancel.emit()),this.startGesture();return}this.pointers.size>2||this.gestureDone||e.target!==this.canvas().nativeElement||(this.drawing=!0,e.pointerType===`touch`&&ji$1(`tick`),this.strokeStart.emit(this.pixelAt(e)))}}move(e){if(this.pointers.has(e.pointerId)&&(this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}),this.gesture)){this.moveGesture();return}let t=this.pixelAt(e),n=this.hover();(n?.x!==t.x||n?.y!==t.y)&&(this.hover.set(t),this.drawing&&this.strokeMove.emit(t))}up(e){this.pointers.delete(e.pointerId)&&(this.scroll().nativeElement.releasePointerCapture(e.pointerId),this.gesture&&this.pointers.size<2&&(this.gesture=null,this.gestureDone=!0),this.pointers.size===0&&(this.gestureDone=!1),this.drawing&&(this.drawing=!1,this.strokeEnd.emit()))}startGesture(){let[e,t]=[...this.pointers.values()];this.gesture={dist:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),scale:this.scale(),mid:{x:(e.x+t.x)/2,y:(e.y+t.y)/2}},this.hover.set(null)}moveGesture(){let e=this.gesture,[t,n]=[...this.pointers.values()],s={x:(t.x+n.x)/2,y:(t.y+n.y)/2},r=this.scroll().nativeElement;r.scrollLeft-=s.x-e.mid.x,r.scrollTop-=s.y-e.mid.y,e.mid=s,this.setScale(e.scale*Math.hypot(t.x-n.x,t.y-n.y)/e.dist,s)}fitScale(e,t){return Math.max(1,Math.floor(Math.min(t.w/e.w,t.h/e.h)))}maxScale(e){return Math.max(1,Math.floor(Ov/Math.max(e.w,e.h)))}pixelAt(e){let t=this.texture(),n=this.canvas().nativeElement.getBoundingClientRect();return{x:Math.min(t.w-1,Math.max(0,Math.floor((e.clientX-n.left)/n.width*t.w))),y:Math.min(t.h-1,Math.max(0,Math.floor((e.clientY-n.top)/n.height*t.h)))}}draw(e,t,n,s){let r=this.canvas().nativeElement;if(r.width=e.w*n,r.height=e.h*n,this.anchor){let{u:l,v:h,x:u,y:d}=this.anchor;this.anchor=null;let f=this.scroll().nativeElement,g=r.getBoundingClientRect();f.scrollLeft+=g.left+l*n-u,f.scrollTop+=g.top+h*n-d}let o=r.getContext(`2d`),a=Math.max(2,Math.floor(n/2));for(let l=0;l<r.height;l+=a)for(let h=0;h<r.width;h+=a)o.fillStyle=(h+l)/a%2?`#4a4a52`:`#5c5c66`,o.fillRect(h,l,a,a);let c=document.createElement(`canvas`);if(c.width=e.w,c.height=e.h,c.getContext(`2d`).putImageData(new ImageData(new Uint8ClampedArray(St(e,t)),e.w,e.h),0,0),o.imageSmoothingEnabled=!1,o.drawImage(c,0,0,r.width,r.height),n>=Lv){o.strokeStyle=`rgba(0, 0, 0, 0.18)`,o.lineWidth=1,o.beginPath();for(let l=1;l<e.w;l++)o.moveTo(l*n+.5,0),o.lineTo(l*n+.5,r.height);for(let l=1;l<e.h;l++)o.moveTo(0,l*n+.5),o.lineTo(r.width,l*n+.5);o.stroke()}s&&(o.strokeStyle=`#ffd34d`,o.lineWidth=1,o.strokeRect(s.x*n+.5,s.y*n+.5,n-1,n-1))}static ɵfac=function(t){return new(t||i)};static ɵcmp=G({type:i,selectors:[[`app-pixel-canvas`]],viewQuery:function(t,n){t&1&&n_(n.canvas,Av,5)(n.scroll,Pv,5),t&2&&yh$1(2)},hostVars:2,hostBindings:function(t,n){t&2&&f_(`fill`,n.fill())},inputs:{texture:[1,`texture`],layer:[1,`layer`],version:[1,`version`],faceKey:[1,`faceKey`],fill:[1,`fill`]},outputs:{strokeStart:`strokeStart`,strokeMove:`strokeMove`,strokeEnd:`strokeEnd`,strokeCancel:`strokeCancel`},decls:13,vars:3,consts:[[`scroll`,``],[`canvas`,``],[1,`zoom`],[`type`,`button`,`title`,`Dézoomer`,`aria-label`,`Dézoomer`,1,`btn`,3,`click`],[`lucideZoomOut`,``],[`type`,`button`,`title`,`Zoomer`,`aria-label`,`Zoomer`,1,`btn`,3,`click`],[`lucideZoomIn`,``],[`type`,`button`,`title`,`Toute la face`,`aria-label`,`Toute la face`,1,`btn`,`fit`],[1,`coords`],[1,`scroll`,3,`wheel`,`pointerdown`,`pointermove`,`pointerup`,`pointercancel`,`pointerleave`],[`type`,`button`,`title`,`Toute la face`,`aria-label`,`Toute la face`,1,`btn`,`fit`,3,`click`],[`lucideMaximize`,``]],template:function(t,n){if(t&1&&(gr$1(0,`div`,2)(1,`button`,3),c_(`click`,function(){return n.zoomBy(-1)}),d(),Y1(2,`svg`,4),Ud(),N0(),gr$1(3,`span`),B(4),Ud(),gr$1(5,`button`,5),c_(`click`,function(){return n.zoomBy(1)}),d(),Y1(6,`svg`,6),Ud(),S(7,Rv,2,0,`button`,7),S(8,Iv,2,2,`span`,8),Ud(),N0(),gr$1(9,`div`,9,0),c_(`wheel`,function(r){return n.wheel(r)})(`pointerdown`,function(r){return n.down(r)})(`pointermove`,function(r){return n.move(r)})(`pointerup`,function(r){return n.up(r)})(`pointercancel`,function(r){return n.up(r)})(`pointerleave`,function(){return n.hover.set(null)}),Y1(11,`canvas`,null,1),Ud()),t&2){let s;g(4),Xd(`× `,n.scale()),g(3),T(n.zoom()!==0?7:-1),g(),T((s=n.hover())?8:-1,s)}},dependencies:[s8,p8,o9],styles:[`[_nghost-%COMP%]{display:flex;flex-direction:column;gap:6px;min-height:0}.fill[_nghost-%COMP%]   .scroll[_ngcontent-%COMP%]{flex:1;min-height:0;max-height:none;align-self:stretch;display:flex}.fill[_nghost-%COMP%]   .scroll[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{margin:auto}.fill[_nghost-%COMP%]{gap:0}.fill[_nghost-%COMP%]   .scroll[_ngcontent-%COMP%]{border:none;border-radius:0;padding:16px}.fill[_nghost-%COMP%]   .zoom[_ngcontent-%COMP%]{order:1;min-height:44px;padding:0 16px 0 8px;border-top:1px solid #2f3039}.zoom[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.zoom[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;border:none;border-radius:8px;background:none;color:inherit;font-size:16px;cursor:pointer}.zoom[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover{background:#33353f}.zoom[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:12px;font-weight:600}.zoom[_ngcontent-%COMP%]   .coords[_ngcontent-%COMP%]{margin-left:auto;color:#8a8d9c;font-weight:400;font-variant-numeric:tabular-nums}.scroll[_ngcontent-%COMP%]{max-height:300px;overflow:auto;border:1px solid #3a3c48;border-radius:6px;align-self:flex-start;max-width:100%}canvas[_ngcontent-%COMP%]{display:block;cursor:crosshair}.scroll[_ngcontent-%COMP%]{touch-action:none}@media(pointer:coarse){.zoom[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{width:44px;height:44px;font-size:20px}}`]})};var Dv=[`viewport`];var Nv=[`sheetInner`];var Fv=i=>[i];var Uv=(i,e)=>e.label;var qf=(i,e)=>e.kind;var Zf=(i,e)=>e.value;var $f=(i,e)=>e.face;var Jf=(i,e)=>e.id;function Bv(i,e){if(i&1){let t=ah$1();gr$1(0,`header`,15)(1,`a`,16),c_(`click`,function(s){g0(t);let r=y();return S0(r.backToGame(s))}),B(2,`‹ Jeu`),Ud(),gr$1(3,`button`,17),c_(`click`,function(){g0(t);let s=y();return S0(s.toggleSheet(`model`))}),gr$1(4,`strong`),B(5),Ud(),gr$1(6,`span`,18),B(7),Ud()(),gr$1(8,`div`,19)(9,`button`,20),c_(`click`,function(){g0(t);let s=y();return S0(s.undo())}),d(),Y1(10,`svg`,21),Ud(),N0(),gr$1(11,`button`,22),c_(`click`,function(){g0(t);let s=y();return S0(s.redo())}),d(),Y1(12,`svg`,23),Ud()()(),N0(),gr$1(13,`div`,24),t_(14,25),Ud()}if(i&2){let t=y(),n=uh$1(11);g(5),M(t.model()?.id??`—`),g(2),M(t.isEditedGameModel()?`Modifié · enregistré`:`Enregistré`),g(2),J1(`disabled`,!t.canUndo()),g(2),J1(`disabled`,!t.canRedo()),g(3),J1(`ngTemplateOutlet`,n)}}function kv(i,e){i&1&&(d(),Y1(0,`svg`,28))}function zv(i,e){i&1&&(d(),Y1(0,`svg`,29))}function Vv(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,26),ar$1(`fade-out`),cr$1(`fade-in`),gr$1(1,`span`),B(2),Ud(),gr$1(3,`button`,27),c_(`click`,function(){g0(t);let s=y();return S0(s.setPreviewNight(!s.previewNight()))}),S(4,kv,1,0,`svg`,28)(5,zv,1,0,`svg`,29),Ud()()}if(i&2){let t=y();d_(`width`,t.previewSize*100,`%`)(`height`,t.previewSize*100,`%`)(`right`,t.previewMargin,`px`)(`bottom`,t.previewMargin,`px`),g(2),Xd(`Aperçu `,t.previewNight()?`de nuit`:`de jour`),g(),J1(`title`,t.previewNight()?`Voir de jour`:`Voir de nuit`),p(`aria-label`,t.previewNight()?`Voir de jour`:`Voir de nuit`),g(),T(t.previewNight()?4:5)}}function Gv(i,e){if(i&1&&(gr$1(0,`p`,13),cr$1(`fade-in`),d(),Y1(1,`svg`,30),B(2),Ud()),i&2){let t=y();g(2),Xd(` `,t.mode()===`select`?`Clic : choisir une forme · Glisser : tourner · Molette : zoom`:`Appuyer sur le modèle : peindre · Glisser à côté : tourner · Molette : zoom`,` `)}}function Hv(i,e){if(i&1){let t=ah$1();gr$1(0,`header`)(1,`strong`),B(2),Ud(),gr$1(3,`span`,18),B(4),Ud(),gr$1(5,`button`,32),c_(`click`,function(){g0(t);let s=y(2);return S0(s.setBigView(!1))}),d(),Y1(6,`svg`,33),Ud()()}if(i&2){let t=y(2);g(2),L_(``,t.parts()[t.selection().partIndex],` · `,t.faceInfo()?.face),g(2),L_(``,t.faceInfo()?.size,` · `,t.layerInfo().label)}}function Wv(i,e){if(i&1){let t=ah$1();gr$1(0,`section`,14),ar$1(`face-out`),cr$1(`face-in`),S(1,Hv,7,4,`header`),gr$1(2,`app-pixel-canvas`,31),c_(`strokeStart`,function(s){g0(t);let r=y();return S0(r.strokeStart(s))})(`strokeMove`,function(s){g0(t);let r=y();return S0(r.strokeMove(s))})(`strokeEnd`,function(){g0(t);let s=y();return S0(s.strokeEnd())})(`strokeCancel`,function(){g0(t);let s=y();return S0(s.cancelStroke())}),Ud()()}if(i&2){let t=e,n=y();g(),T(n.phone()?-1:1),g(),J1(`texture`,t.tex)(`layer`,n.layer())(`version`,n.paintVersion())(`fill`,!0)(`faceKey`,t.texId)}}function Xv(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,35),ar$1(`fade-out`),cr$1(`drop-in`),gr$1(1,`span`),B(2),Ud(),gr$1(3,`button`,38),c_(`click`,function(){g0(t);let s=y(2);return S0(s.cancelFaceAction())}),B(4,`Annuler`),Ud()()}i&2&&(g(2),M(e.kind===`link`?`Touche la face à lier (même taille)`:`Touche la face où copier`))}function Yv(i,e){i&1&&(gr$1(0,`p`,39),cr$1(`fade-in`),d(),Y1(1,`svg`,40),B(2,` Toucher une forme · 1 doigt : tourner · 2 doigts : zoomer`),Ud())}function qv(i,e){if(i&1&&S(0,Yv,3,0,`p`,39),i&2){let t=y(2);T(t.selectedPart()?-1:0)}}function Zv(i,e){if(i&1&&(gr$1(0,`p`,41)(1,`strong`),B(2),Ud(),gr$1(3,`span`),B(4),Ud()()),i&2){let t=e,n=y(3);g(2),L_(``,n.parts()[n.selection().partIndex],` · `,t.face),g(2),L_(``,t.size,` · `,n.layerInfo().label)}}function $v(i,e){i&1&&(gr$1(0,`p`,39),B(1,`Touche une face pour la peindre`),Ud())}function Jv(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,36),cr$1(`fade-in`),S(1,Zv,5,4,`p`,41)(2,$v,2,0,`p`,39),gr$1(3,`div`,42)(4,`button`,43),c_(`click`,function(){g0(t);let s=y(2);return S0(s.setBigView(!1))}),B(5,`3D`),Ud(),gr$1(6,`button`,44),c_(`click`,function(){g0(t);let s=y(2);return S0(s.setBigView(!0))}),B(7,`Face`),Ud()()()}if(i&2){let t,n=y(2);g(),T((t=n.faceInfo())?1:2,t),g(3),f_(`on`,!n.bigView()),g(2),f_(`on`,n.bigView()),J1(`disabled`,!n.faceTexture())}}function Kv(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,38),c_(`click`,function(){let s=g0(t).$implicit,r=y(3);return S0(r.nudge(s.axis,s.delta))}),gr$1(1,`span`),d(),Y1(2,`svg`,55),Ud(),N0(),gr$1(3,`small`),B(4),Ud()()}if(i&2){let t=e.$implicit;p(`aria-label`,`Déplacer `+t.label),g(2),J1(`lucideIcon`,t.icon),g(2),M(t.label)}}function jv(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,37),ar$1(`sink-out`),cr$1(`rise-in`),gr$1(1,`div`,45)(2,`strong`),B(3),Ud(),gr$1(4,`span`,46),B(5),Ud(),gr$1(6,`button`,38),c_(`click`,function(){g0(t);let s=y(2);return S0(s.toggleSheet(`shapes`))}),d(),Y1(7,`svg`,47),B(8,` Réglages`),Ud()(),N0(),gr$1(9,`div`,48),P(10,Kv,5,3,`button`,49,Uv),Ud(),gr$1(12,`div`,50)(13,`button`,38),c_(`click`,function(){g0(t);let s=y(2);return S0(s.duplicate())}),d(),Y1(14,`svg`,51),B(15,` Dupliquer`),Ud(),N0(),gr$1(16,`button`,38),c_(`click`,function(){g0(t);let s=y(2);return S0(s.turn())}),d(),Y1(17,`svg`,52),B(18,` Tourner 90°`),Ud(),N0(),gr$1(19,`button`,53),c_(`click`,function(){g0(t);let s=y(2);return S0(s.remove())}),d(),Y1(20,`svg`,54),B(21,` Supprimer`),Ud()()()}if(i&2){let t=y(2);g(3),M(t.parts()[t.selection().partIndex]),g(2),h_(``,t.selectedPart().size.x,` × `,t.selectedPart().size.y,``,t.selectedPart().kind===`box`?` × `+t.selectedPart().size.z:``),g(5),N(t.nudges)}}function Qv(i,e){if(i&1&&(gr$1(0,`div`,34),S(1,Xv,5,1,`div`,35)(2,qv,1,1)(3,Jv,8,6,`div`,36),Ud(),S(4,jv,22,4,`div`,37)),i&2){let t,n=y();g(),T((t=n.pending())?1:n.mode()===`select`?2:3,t),g(3),T(n.mode()===`select`&&n.selectedPart()&&!n.pending()&&!n.sheet()?4:-1)}}function eM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,66),c_(`click`,function(){let s=g0(t).$implicit,r=y(4);return S0(r.setColor(s))}),Ud()}if(i&2){let t=e.$implicit,n=y(4);d_(`background`,t),f_(`on`,t===n.color()),p(`aria-label`,t)}}function tM(i,e){if(i&1){let t=ah$1();gr$1(0,`label`,63)(1,`input`,64),c_(`change`,function(s){g0(t);let r=y(3);return S0(r.useColor(s.target.value))}),Ud()(),P(2,eM,1,5,`button`,65,YL)}if(i&2){let t=y(3);d_(`background`,t.color()),g(),J1(`value`,t.color()),g(),N(t.trayColors())}}function nM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,66),c_(`click`,function(){let s=g0(t).$implicit,r=y(4);return S0(r.gray.set(s))}),Ud()}if(i&2){let t=e.$implicit,n=y(4);d_(`background`,`rgb(`+t+`,`+t+`,`+t+`)`),f_(`on`,t===n.gray()),p(`aria-label`,`Gris `+t)}}function iM(i,e){if(i&1&&P(0,nM,1,5,`button`,65,YL),i&2){let t=y(3);N(t.grays)}}function sM(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,56),cr$1(`rise-in`),gr$1(1,`div`,60),S(2,tM,4,3)(3,iM,2,0),gr$1(4,`button`,61),c_(`click`,function(){g0(t);let s=y(2);return S0(s.toggleSheet(`palette`))}),d(),Y1(5,`svg`,62),Ud()(),N0(),t_(6,25),Ud()}if(i&2){let t=y(2),n=uh$1(21);g(2),T(t.layer()===`color`?2:3),g(2),f_(`on`,t.sheet()===`palette`),g(2),J1(`ngTemplateOutlet`,n)}}function rM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,43),c_(`click`,function(){g0(t);let s=y(2);return S0(s.toggleSheet(`shapes`))}),gr$1(1,`span`),d(),Y1(2,`svg`,67),Ud(),B(3,`Formes`),Ud(),N0(),gr$1(4,`button`,43),c_(`click`,function(){g0(t);let s=y(2);return S0(s.toggleSheet(`add`))}),gr$1(5,`span`),d(),Y1(6,`svg`,68),Ud(),B(7,`Ajouter`),Ud()}if(i&2){let t=y(2);f_(`on`,t.sheet()===`shapes`),g(4),f_(`on`,t.sheet()===`add`)}}function oM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,43),c_(`click`,function(){g0(t);let s=y(2);return S0(s.toggleSheet(`layer`))}),gr$1(1,`span`),d(),Y1(2,`svg`,55),Ud(),B(3,`Calque`),Ud(),N0(),gr$1(4,`button`,43),c_(`click`,function(){g0(t);let s=y(2);return S0(s.toggleSheet(`face`))}),gr$1(5,`span`),d(),Y1(6,`svg`,69),Ud(),B(7,`Face`),Ud()}if(i&2){let t=y(2);f_(`on`,t.sheet()===`layer`),g(2),J1(`lucideIcon`,t.layerInfo().icon),g(2),f_(`on`,t.sheet()===`face`)}}function aM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,38),c_(`click`,function(){g0(t);let s=y(3);return S0(s.create())}),d(),Y1(1,`svg`,68),B(2,` Nouveau`),Ud()}}function lM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,38),c_(`click`,function(){g0(t);let s=y(3);return S0(s.add(`box`))}),d(),Y1(1,`svg`,68),B(2,` Box`),Ud(),N0(),gr$1(3,`button`,38),c_(`click`,function(){g0(t);let s=y(3);return S0(s.add(`plane`))}),d(),Y1(4,`svg`,68),B(5,` Plane`),Ud()}}function cM(i,e){if(i&1&&(gr$1(0,`span`,18),B(1),Ud()),i&2){let t=y(4);g(),M(t.parts()[t.selection().partIndex])}}function hM(i,e){if(i&1&&S(0,cM,2,1,`span`,18),i&2){let t=y(3);T(t.selectedPart()?0:-1)}}function dM(i,e){if(i&1){let t=ah$1();gr$1(0,`label`,77),d(),Y1(1,`svg`,78),B(2,` Importer`),N0(),gr$1(3,`input`,79),c_(`change`,function(s){g0(t);let r=y(4);return S0(r.importPalette(s.target))}),Ud()()}if(i&2){let t=y(4);g(3),J1(`accept`,t.paletteFileTypes)}}function uM(i,e){if(i&1&&S(0,dM,4,1,`label`,77),i&2){let t=y(3);T(t.layer()===`color`?0:-1)}}function pM(i,e){if(i&1&&t_(0,25),i&2){y(4);let t=uh$1(15);J1(`ngTemplateOutlet`,t)}}function fM(i,e){if(i&1&&t_(0,25),i&2){y(4);let t=uh$1(17);J1(`ngTemplateOutlet`,t)}}function mM(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,80)(1,`button`,38),c_(`click`,function(){g0(t);let s=y(4);return s.add(`box`),S0(s.sheet.set(null))}),gr$1(2,`span`),d(),Y1(3,`svg`,81),Ud(),N0(),gr$1(4,`strong`),B(5,`Box`),Ud(),gr$1(6,`small`),B(7,`Bâtiments, murs, toits`),Ud()(),gr$1(8,`button`,38),c_(`click`,function(){g0(t);let s=y(4);return s.add(`plane`),S0(s.sheet.set(null))}),gr$1(9,`span`),d(),Y1(10,`svg`,82),Ud(),N0(),gr$1(11,`strong`),B(12,`Plane`),Ud(),gr$1(13,`small`),B(14,`Fleurs, herbes, panneaux`),Ud()()()}}function _M(i,e){if(i&1&&t_(0,25),i&2){y(4);let t=uh$1(19);J1(`ngTemplateOutlet`,t)}}function gM(i,e){if(i&1&&t_(0,25),i&2){y(4);let t=uh$1(25);J1(`ngTemplateOutlet`,t)}}function xM(i,e){if(i&1&&t_(0,25),i&2){y(4);let t=uh$1(23);J1(`ngTemplateOutlet`,t)}}function yM(i,e){if(i&1&&(gr$1(0,`div`,76),cr$1(`fade-in`),S(1,pM,1,1,`ng-container`,25)(2,fM,1,1,`ng-container`,25)(3,mM,15,0,`div`,80)(4,_M,1,1,`ng-container`,25)(5,gM,1,1,`ng-container`,25)(6,xM,1,1,`ng-container`,25),Ud()),i&2){let t,n=y();g(),T((t=n)===`model`?1:t===`shapes`?2:t===`add`?3:t===`layer`?4:t===`face`?5:t===`palette`?6:-1)}}function vM(i,e){if(i&1){let t=ah$1();gr$1(0,`section`,70),ar$1(`sheet-out`),cr$1(`sheet-in`),gr$1(1,`div`,71,9)(3,`div`,72),c_(`pointerdown`,function(s){g0(t);let r=y(2);return S0(r.sheetDragStart(s))})(`pointermove`,function(s){g0(t);let r=y(2);return S0(r.sheetDragMove(s))})(`pointerup`,function(s){g0(t);let r=y(2);return S0(r.sheetDragEnd(s))})(`pointercancel`,function(s){g0(t);let r=y(2);return S0(r.sheetDragEnd(s))}),Y1(4,`span`,73),gr$1(5,`div`,74)(6,`h2`),B(7),Ud(),S(8,aM,3,0,`button`,49)(9,lM,6,0)(10,hM,1,1)(11,uM,1,1),gr$1(12,`button`,75),c_(`click`,function(){g0(t);let s=y(2);return S0(s.sheet.set(null))}),d(),Y1(13,`svg`,33),Ud()()(),P(14,yM,7,1,`div`,76,YL),Ud()()}if(i&2){let t,n=e,s=y(2);d_(`height`,s.sheetHeight(),`px`)(`transform`,s.sheetDrag()?`translateY(`+s.sheetDrag()+`px)`:null),f_(`dragging`,s.sheetDrag()>0),p(`aria-label`,s.sheetTitles[n]),g(7),M(s.sheetTitles[n]),g(),T((t=n)===`model`?8:t===`shapes`?9:t===`face`?10:t===`palette`?11:-1),g(6),N(Uh(9,Fv,n))}}function MM(i,e){if(i&1){let t=ah$1();S(0,sM,7,4,`div`,56),gr$1(1,`nav`,57)(2,`button`,43),c_(`click`,function(){g0(t);let s=y();return S0(s.toggleSheet(`model`))}),gr$1(3,`span`),d(),Y1(4,`svg`,58),Ud(),B(5,`Modèle`),Ud(),S(6,rM,8,4)(7,oM,8,5),Ud(),S(8,vM,16,11,`section`,59)}if(i&2){let t,n=y();T(n.mode()===`paint`?0:-1),g(2),f_(`on`,n.sheet()===`model`),g(4),T(n.mode()===`select`?6:7),g(2),T((t=n.sheet())?8:-1,t)}}function bM(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,107)(1,`span`,108),B(2,`Nom`),Ud(),gr$1(3,`input`,109),c_(`change`,function(s){g0(t);let r=y(2);return S0(r.rename(s.target.value))}),Ud()(),gr$1(4,`div`,110)(5,`span`,108),B(6,`Vent`),Ud(),gr$1(7,`div`,111)(8,`button`,112),c_(`click`,function(){let s=g0(t),r=y(2);return S0(r.setSway((s.sway??0)-.1))}),d(),Y1(9,`svg`,113),Ud(),N0(),gr$1(10,`input`,114),c_(`change`,function(s){g0(t);let r=y(2);return S0(r.setSway(+s.target.value))}),Ud(),gr$1(11,`button`,115),c_(`click`,function(){let s=g0(t),r=y(2);return S0(r.setSway((s.sway??0)+.1))}),d(),Y1(12,`svg`,68),Ud()(),N0(),gr$1(13,`span`,116),B(14,`0 = immobile`),Ud()()}if(i&2){let t=e;g(3),J1(`value`,t.id),g(7),J1(`value`,t.sway??0)}}function SM(i,e){i&1&&B(0,` Confirmer ? `)}function CM(i,e){i&1&&(d(),Y1(0,`svg`,118),B(1,` Version du jeu `))}function EM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,117),c_(`click`,function(){g0(t);let s=y(2);return S0(s.revert())}),S(1,SM,1,0)(2,CM,2,0),Ud()}if(i&2){let t=y(2);f_(`danger`,t.confirmRevert()),g(),T(t.confirmRevert()?1:2)}}function wM(i,e){if(i&1&&(gr$1(0,`p`,104),B(1),Ud()),i&2){let t=y(2);g(),M(t.status())}}function TM(i,e){i&1&&Y1(0,`img`,105),i&2&&J1(`src`,e)}function AM(i,e){i&1&&(d(),Y1(0,`svg`,81))}function PM(i,e){i&1&&(d(),Y1(0,`svg`,124))}function RM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,123),c_(`click`,function(){let s=g0(t).$index,r=y(4);return S0(r.selectPart(s))}),S(1,AM,1,0,`svg`,81)(2,PM,1,0,`svg`,124),gr$1(3,`span`,125),B(4),Ud(),gr$1(5,`small`),B(6),Ud()()}if(i&2){let t=e.$implicit,n=e.$index,s=y(4);f_(`on`,s.selection()?.partIndex===n),p(`aria-selected`,s.selection()?.partIndex===n),g(),T(t.kind===`box`?1:2),g(3),M(s.parts()[n]),g(2),h_(``,t.size.x,` × `,t.size.y,``,t.kind===`box`?` × `+t.size.z:``)}}function IM(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,111)(1,`button`,43),c_(`click`,function(){g0(t);let s=y().$implicit,r=y().$implicit,o=y(5);return S0(o.stepVec(r.kind,s,-1))}),d(),Y1(2,`svg`,113),Ud(),N0(),gr$1(3,`label`)(4,`i`),B(5),Ud(),gr$1(6,`input`,134),c_(`change`,function(s){g0(t);let r=y().$implicit,o=y().$implicit,a=y(5);return S0(a.setVec(o.kind,r,+s.target.value))}),Ud()(),gr$1(7,`button`,43),c_(`click`,function(){g0(t);let s=y().$implicit,r=y().$implicit,o=y(5);return S0(o.stepVec(r.kind,s,1))}),d(),Y1(8,`svg`,68),Ud()()}if(i&2){let t=y().$implicit,n=y().$implicit,s=y(),r=y(4);g(),p(`aria-label`,n.label+` `+t+` moins`),g(4),M(t),g(),J1(`step`,n.step)(`min`,n.kind===`size`?1:null)(`value`,r.vecValue(s,n.kind,t)),g(),p(`aria-label`,n.label+` `+t+` plus`)}}function LM(i,e){i&1&&Y1(0,`span`,133)}function OM(i,e){if(i&1&&S(0,IM,9,6,`div`,111)(1,LM,1,0,`span`,133),i&2){let t=e.$implicit,n=y().$implicit,s=y();T(n.kind!==`size`||s.kind===`box`||t!==`z`?0:1)}}function DM(i,e){if(i&1&&(gr$1(0,`div`,107)(1,`span`,108),B(2),Ud(),P(3,OM,2,1,null,null,YL),Ud()),i&2){let t=e.$implicit,n=y(5);g(2),M(t.label),g(),N(n.axes)}}function NM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,43),c_(`click`,function(){let s=g0(t).$implicit,r=y(5);return S0(r.setSide(``+s.value))}),B(1),Ud()}if(i&2){let t=e.$implicit,n=y();f_(`on`,(n.side??0)===t.value),g(),M(t.label)}}function FM(i,e){if(i&1){let t=ah$1();gr$1(0,`details`,98),c_(`toggle`,function(s){g0(t);let r=y(4);return S0(r.toggleSection(`part`,s.target.open))}),gr$1(1,`summary`)(2,`span`,99),d(),Y1(3,`svg`,89),Ud(),N0(),gr$1(4,`span`,100),B(5),Ud(),gr$1(6,`button`,126),c_(`click`,function(s){g0(t);let r=y(4);return s.preventDefault(),S0(r.duplicate())}),d(),Y1(7,`svg`,51),Ud(),N0(),gr$1(8,`button`,127),c_(`click`,function(s){g0(t);let r=y(4);return s.preventDefault(),S0(r.turn())}),d(),Y1(9,`svg`,52),Ud(),N0(),gr$1(10,`button`,128),c_(`click`,function(s){g0(t);let r=y(4);return s.preventDefault(),S0(r.remove())}),d(),Y1(11,`svg`,54),Ud()(),P(12,DM,5,1,`div`,107,qf),N0(),gr$1(14,`div`,107)(15,`span`,108),B(16,`Faces`),Ud(),gr$1(17,`div`,129),P(18,NM,2,3,`button`,130,Zf),Ud()(),gr$1(20,`label`,131)(21,`span`),B(22,`Caché par les autres`),gr$1(23,`small`),B(24,`Décocher pour le texte d'un panneau`),Ud()(),gr$1(25,`input`,132),c_(`change`,function(s){g0(t);let r=y(4);return S0(r.setFlag(`depthTest`,s.target.checked))}),Ud()(),gr$1(26,`label`,131)(27,`span`),B(28,`Cache les autres`),gr$1(29,`small`),B(30,`Décocher pour les fleurs, les herbes`),Ud()(),gr$1(31,`input`,132),c_(`change`,function(s){g0(t);let r=y(4);return S0(r.setFlag(`depthWrite`,s.target.checked))}),Ud()()()}if(i&2){let t=e,n=y(4);J1(`open`,n.sections().part),g(5),M(n.parts()[n.selection().partIndex]),g(7),N(n.vecs),g(6),N(n.sides),g(7),J1(`checked`,!!t.depthTest),g(6),J1(`checked`,!!t.depthWrite)}}function UM(i,e){if(i&1){let t=ah$1();gr$1(0,`details`,98),c_(`toggle`,function(s){g0(t);let r=y(3);return S0(r.toggleSection(`parts`,s.target.open))}),gr$1(1,`summary`)(2,`span`,99),d(),Y1(3,`svg`,89),Ud(),N0(),gr$1(4,`span`,100),B(5,`Formes`),Ud(),gr$1(6,`button`,119),c_(`click`,function(s){g0(t);let r=y(3);return s.preventDefault(),S0(r.add(`box`))}),d(),Y1(7,`svg`,68),B(8,` Box`),Ud(),N0(),gr$1(9,`button`,119),c_(`click`,function(s){g0(t);let r=y(3);return s.preventDefault(),S0(r.add(`plane`))}),d(),Y1(10,`svg`,68),B(11,` Plane`),Ud()(),N0(),gr$1(12,`div`,120),P(13,RM,7,8,`button`,121,JL),Ud()(),S(15,FM,32,4,`details`,122)}if(i&2){let t,n=y(3);J1(`open`,n.sections().parts),g(13),N(n.model().parts),g(2),T((t=n.selectedPart())?15:-1,t)}}function BM(i,e){if(i&1){let t=ah$1();gr$1(0,`label`,138),c_(`click`,function(s){return s.stopPropagation()}),d(),Y1(1,`svg`,78),B(2,` Importer`),N0(),gr$1(3,`input`,79),c_(`change`,function(s){g0(t);let r=y(4);return S0(r.importPalette(s.target))}),Ud()()}if(i&2){let t=y(4);g(3),J1(`accept`,t.paletteFileTypes)}}function kM(i,e){if(i&1&&(gr$1(0,`span`,135),B(1),Ud()),i&2){let t=y(4);g(),L_(``,t.parts()[t.selection().partIndex],` · `,e.face)}}function zM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,43),c_(`click`,function(){let s=g0(t).$implicit,r=y(5);return S0(r.selectFace(s.face))}),B(1),Ud()}if(i&2){let t=e.$implicit,n=y(5);f_(`on`,n.selection()?.face===t.face),g(),M(t.label)}}function VM(i,e){if(i&1&&(gr$1(0,`div`,137),P(1,zM,2,3,`button`,130,$f),Ud()),i&2){let t=y(4);g(),N(t.partFaces())}}function GM(i,e){if(i&1){let t=ah$1();gr$1(0,`p`,116),B(1),gr$1(2,`button`,151),c_(`click`,function(){g0(t);let s=y(5);return S0(s.unlink())}),B(3,`Délier`),Ud()()}if(i&2){let t=y();g(),Xd(`Liée à `,t.linked,` autre(s) face(s) · `)}}function HM(i,e){if(i&1){let t=ah$1();gr$1(0,`app-pixel-canvas`,155),c_(`strokeStart`,function(s){g0(t);let r=y(6);return S0(r.strokeStart(s))})(`strokeMove`,function(s){g0(t);let r=y(6);return S0(r.strokeMove(s))})(`strokeEnd`,function(){g0(t);let s=y(6);return S0(s.strokeEnd())})(`strokeCancel`,function(){g0(t);let s=y(6);return S0(s.cancelStroke())}),Ud()}if(i&2){let t=y(),n=y(5);J1(`texture`,t.tex)(`layer`,n.layer())(`version`,n.paintVersion())(`faceKey`,t.texId)}}function WM(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,152),c_(`click`,function(){g0(t);let s=y(5);return S0(s.setBigView(!s.bigView()))}),d(),Y1(1,`svg`,153),B(2),Ud(),S(3,HM,1,4,`app-pixel-canvas`,154)}if(i&2){let t=y(5);f_(`on`,t.bigView()),g(2),Xd(` `,t.bigView()?`Fermer la grande vue`:`Grande vue`,` `),g(),T(t.bigView()?-1:3)}}function XM(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,139)(1,`button`,140),c_(`click`,function(){g0(t);let s=y(4);return S0(s.startFaceAction(`link`))}),d(),Y1(2,`svg`,141),B(3,` Lier à…`),Ud(),N0(),gr$1(4,`button`,142),c_(`click`,function(){g0(t);let s=y(4);return S0(s.startFaceAction(`copy`))}),d(),Y1(5,`svg`,143),B(6,` Copier vers…`),Ud(),N0(),gr$1(7,`button`,144),c_(`click`,function(){g0(t);let s=y(4);return S0(s.flip(!0))}),d(),Y1(8,`svg`,145),Ud(),N0(),gr$1(9,`button`,146),c_(`click`,function(){g0(t);let s=y(4);return S0(s.flip(!1))}),d(),Y1(10,`svg`,147),Ud()(),N0(),gr$1(11,`div`,107)(12,`span`,148),B(13,`Copie en miroir`),Ud(),gr$1(14,`button`,149),c_(`click`,function(){g0(t);let s=y(4);return S0(s.mirrorH.set(!s.mirrorH()))}),d(),Y1(15,`svg`,145),Ud(),N0(),gr$1(16,`button`,150),c_(`click`,function(){g0(t);let s=y(4);return S0(s.mirrorV.set(!s.mirrorV()))}),d(),Y1(17,`svg`,147),Ud()(),S(18,GM,4,1,`p`,116),S(19,WM,4,4)}if(i&2){let t,n=y(4);g(),f_(`on`,n.pending()?.kind===`link`),g(3),f_(`on`,n.pending()?.kind===`copy`),g(10),f_(`on`,n.mirrorH()),g(2),f_(`on`,n.mirrorV()),g(2),T(e.linked?18:-1),g(),T((t=n.faceTexture())?19:-1,t)}}function YM(i,e){i&1&&(gr$1(0,`p`,116),B(1,`Clique une face du modèle pour la choisir.`),Ud())}function qM(i,e){if(i&1){let t=ah$1();gr$1(0,`details`,98),c_(`toggle`,function(s){g0(t);let r=y(3);return S0(r.toggleSection(`layer`,s.target.open))}),gr$1(1,`summary`)(2,`span`,99),d(),Y1(3,`svg`,89),Ud(),N0(),gr$1(4,`span`,100),B(5,`Calque`),Ud(),gr$1(6,`span`,135),B(7),Ud()(),t_(8,25),Ud(),gr$1(9,`details`,98),c_(`toggle`,function(s){g0(t);let r=y(3);return S0(r.toggleSection(`drawing`,s.target.open))}),gr$1(10,`summary`)(11,`span`,99),d(),Y1(12,`svg`,89),Ud(),N0(),gr$1(13,`span`,100),B(14,`Outils`),Ud()(),t_(15,25),Ud(),gr$1(16,`details`,98),c_(`toggle`,function(s){g0(t);let r=y(3);return S0(r.toggleSection(`color`,s.target.open))}),gr$1(17,`summary`)(18,`span`,99),d(),Y1(19,`svg`,89),Ud(),N0(),gr$1(20,`span`,100),B(21),Ud(),S(22,BM,4,1,`label`,136),Ud(),t_(23,25),Ud(),gr$1(24,`details`,98),c_(`toggle`,function(s){g0(t);let r=y(3);return S0(r.toggleSection(`face`,s.target.open))}),gr$1(25,`summary`)(26,`span`,99),d(),Y1(27,`svg`,89),Ud(),N0(),gr$1(28,`span`,100),B(29,`Face`),Ud(),S(30,kM,2,2,`span`,135),Ud(),S(31,VM,3,0,`div`,137),S(32,XM,20,10)(33,YM,2,0,`p`,116),Ud()}if(i&2){let t,n,s=y(3),r=uh$1(19),o=uh$1(21),a=uh$1(23);J1(`open`,s.sections().layer),g(7),M(s.layerInfo().label),g(),J1(`ngTemplateOutlet`,r),g(),J1(`open`,s.sections().drawing),g(6),J1(`ngTemplateOutlet`,o),g(),J1(`open`,s.sections().color),g(5),M(s.layer()===`color`?`Couleur`:`Gris`),g(),T(s.layer()===`color`?22:-1),g(),J1(`ngTemplateOutlet`,a),g(),J1(`open`,s.sections().face),g(6),T((t=s.faceInfo())?30:-1,t),g(),T(s.partFaces().length?31:-1),g(),T((n=s.faceInfo())?32:33,n)}}function ZM(i,e){if(i&1&&S(0,UM,16,2)(1,qM,34,13),i&2){let t=y(2);T(t.mode()===`select`?0:1)}}function $M(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,35),ar$1(`fade-out`),cr$1(`drop-in`),gr$1(1,`span`),B(2),Ud(),gr$1(3,`button`,38),c_(`click`,function(){g0(t);let s=y(2);return S0(s.cancelFaceAction())}),B(4,`Annuler (Échap)`),Ud()()}i&2&&(g(2),M(e.kind===`link`?`Clique la face à lier (même taille)`:`Clique la face où copier`))}function JM(i,e){i&1&&(gr$1(0,`span`)(1,`kbd`),B(2,`←→`),Ud(),B(3,` déplacer`),Ud(),gr$1(4,`span`)(5,`kbd`),B(6,`Ctrl D`),Ud(),B(7,` dupliquer`),Ud(),gr$1(8,`span`)(9,`kbd`),B(10,`Suppr`),Ud(),B(11,` supprimer`),Ud())}function KM(i,e){i&1&&(gr$1(0,`span`)(1,`kbd`),B(2,`P E I F L R`),Ud(),B(3,` outils`),Ud(),gr$1(4,`span`)(5,`kbd`),B(6,`G`),Ud(),B(7,` grande vue`),Ud(),gr$1(8,`span`)(9,`kbd`),B(10,`Ctrl Z`),Ud(),B(11,` annuler`),Ud())}function jM(i,e){if(i&1){let t=ah$1();gr$1(0,`header`,83)(1,`a`,16),c_(`click`,function(s){g0(t);let r=y();return S0(r.backToGame(s))}),d(),Y1(2,`svg`,84),B(3,` Jeu`),Ud(),N0(),Y1(4,`span`,85),gr$1(5,`label`,86),d(),Y1(6,`svg`,87),N0(),gr$1(7,`select`,88),c_(`change`,function(s){g0(t);let r=y();return S0(r.open(s.target.value))}),t_(8,25),Ud(),d(),Y1(9,`svg`,89),Ud(),N0(),gr$1(10,`span`,90),d(),Y1(11,`svg`,91),B(12),Ud(),N0(),gr$1(13,`div`,92),t_(14,25),Ud(),gr$1(15,`div`,19)(16,`button`,93),c_(`click`,function(){g0(t);let s=y();return S0(s.undo())}),d(),Y1(17,`svg`,21),Ud(),N0(),gr$1(18,`button`,94),c_(`click`,function(){g0(t);let s=y();return S0(s.redo())}),d(),Y1(19,`svg`,23),Ud()(),N0(),gr$1(20,`button`,95),c_(`click`,function(){g0(t);let s=y();return S0(s.export())}),d(),Y1(21,`svg`,96),B(22,` Exporter`),Ud()(),N0(),gr$1(23,`aside`,97)(24,`details`,98),c_(`toggle`,function(s){g0(t);let r=y();return S0(r.toggleSection(`model`,s.target.open))}),gr$1(25,`summary`)(26,`span`,99),d(),Y1(27,`svg`,89),Ud(),N0(),gr$1(28,`span`,100),B(29,`Modèle`),Ud()(),S(30,bM,15,2),gr$1(31,`div`,101)(32,`button`,102),c_(`click`,function(){g0(t);let s=y();return S0(s.create())}),d(),Y1(33,`svg`,68),B(34,` Nouveau`),Ud(),S(35,EM,3,3,`button`,103),Ud(),S(36,wM,2,1,`p`,104),S(37,TM,1,1,`img`,105),Ud(),S(38,ZM,2,1),S(39,$M,5,1,`div`,35),N0(),gr$1(40,`footer`,106),S(41,JM,12,0)(42,KM,12,0),Ud()()}if(i&2){let t,n,s,r=y(),o=uh$1(11),a=uh$1(13);g(8),J1(`ngTemplateOutlet`,a),g(4),Xd(` `,r.isEditedGameModel()?`Modifié · enregistré`:`Enregistré`,` `),g(2),J1(`ngTemplateOutlet`,o),g(2),J1(`disabled`,!r.canUndo()),g(2),J1(`disabled`,!r.canRedo()),g(2),J1(`disabled`,!r.model()),g(4),J1(`open`,r.sections().model),g(6),T((t=r.model())?30:-1,t),g(5),T(r.isEditedGameModel()?35:-1),g(),T(r.status()?36:-1),g(),T((n=r.atlasPreview())?37:-1,n),g(),T(r.model()?38:-1),g(),T((s=r.pending())?39:-1,s),g(2),T(r.mode()===`select`?41:42)}}function QM(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,156)(1,`button`,157),c_(`click`,function(){g0(t);let s=y();return S0(s.setEditorMode(`select`))}),d(),Y1(2,`svg`,81),B(3,` Modélisation`),Ud(),N0(),gr$1(4,`button`,158),c_(`click`,function(){g0(t);let s=y();return S0(s.setEditorMode(`paint`))}),d(),Y1(5,`svg`,159),B(6,` Dessin`),Ud()()}if(i&2){let t=y();g(),f_(`on`,t.mode()===`select`),p(`aria-selected`,t.mode()===`select`),g(3),f_(`on`,t.mode()===`paint`),p(`aria-selected`,t.mode()===`paint`)}}function eb(i,e){i&1&&(gr$1(0,`option`,160),B(1,`—`),Ud())}function tb(i,e){if(i&1&&(gr$1(0,`option`,162),B(1),Ud()),i&2){let t=e.$implicit,n=y(2);J1(`value`,t)(`selected`,n.model()?.id===t),g(),L_(``,t,``,n.storedIds().includes(t)?` (modifié)`:``)}}function nb(i,e){if(i&1&&(gr$1(0,`option`,162),B(1),Ud()),i&2){let t=e.$implicit,n=y(3);J1(`value`,t)(`selected`,n.model()?.id===t),g(),M(t)}}function ib(i,e){if(i&1&&(gr$1(0,`optgroup`,163),P(1,nb,2,3,`option`,162,YL),Ud()),i&2){let t=y(2);g(),N(t.newIds())}}function sb(i,e){if(i&1&&(S(0,eb,2,0,`option`,160),gr$1(1,`optgroup`,161),P(2,tb,2,4,`option`,162,YL),Ud(),S(4,ib,3,0,`optgroup`,163)),i&2){let t=y();T(t.model()?-1:0),g(2),N(t.modelIds),g(2),T(t.newIds().length?4:-1)}}function rb(i,e){i&1&&B(0,` Confirmer : revenir à la version du jeu ? `)}function ob(i,e){i&1&&(d(),Y1(0,`svg`,118),B(1,` Revenir à la version du jeu `))}function ab(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,173),c_(`click`,function(){g0(t);let s=y(3);return S0(s.revert())}),S(1,rb,1,0)(2,ob,2,0),Ud()}if(i&2){let t=y(3);f_(`danger`,!t.confirmRevert())(`on`,t.confirmRevert()),g(),T(t.confirmRevert()?1:2)}}function lb(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,166)(1,`label`,167)(2,`span`),B(3,`Nom (id)`),Ud(),gr$1(4,`input`,168),c_(`change`,function(s){g0(t);let r=y(2);return S0(r.rename(s.target.value))}),Ud()(),gr$1(5,`div`,169)(6,`span`),B(7,`Vent`),Ud(),gr$1(8,`div`,111)(9,`button`,112),c_(`click`,function(){let s=g0(t),r=y(2);return S0(r.setSway((s.sway??0)-.1))}),d(),Y1(10,`svg`,113),Ud(),N0(),gr$1(11,`input`,114),c_(`change`,function(s){g0(t);let r=y(2);return S0(r.setSway(+s.target.value))}),Ud(),gr$1(12,`button`,115),c_(`click`,function(){let s=g0(t),r=y(2);return S0(r.setSway((s.sway??0)+.1))}),d(),Y1(13,`svg`,68),Ud()()()(),N0(),gr$1(14,`p`,170),B(15,`Vent : 0 = immobile, 1 = plie beaucoup (herbes, arbres).`),Ud(),S(16,ab,3,5,`button`,171),gr$1(17,`button`,172),c_(`click`,function(){g0(t);let s=y(2);return S0(s.export())}),d(),Y1(18,`svg`,96),B(19,` Exporter (.ts + .png)`),Ud(),N0(),gr$1(20,`p`,170),B(21,`Tes changements sont enregistrés dans ce navigateur et visibles dans le jeu. L'export sert à les ajouter au code.`),Ud()}if(i&2){let t=e,n=y(2);g(4),J1(`value`,t.id),g(7),J1(`value`,t.sway??0),g(5),T(n.isEditedGameModel()?16:-1)}}function cb(i,e){if(i&1&&(gr$1(0,`p`,104),B(1),Ud()),i&2){let t=y(2);g(),M(t.status())}}function hb(i,e){i&1&&Y1(0,`img`,105),i&2&&J1(`src`,e)}function db(i,e){if(i&1){let t=ah$1();gr$1(0,`label`,164)(1,`span`),B(2,`Ouvrir`),Ud(),gr$1(3,`select`,165),c_(`change`,function(s){g0(t);let r=y();return S0(r.open(s.target.value))}),t_(4,25),Ud()(),S(5,lb,22,3),S(6,cb,2,1,`p`,104),S(7,hb,1,1,`img`,105)}if(i&2){let t,n,s=y(),r=uh$1(13);g(4),J1(`ngTemplateOutlet`,r),g(),T((t=s.model())?5:-1,t),g(),T(s.status()?6:-1),g(),T((n=s.atlasPreview())?7:-1,n)}}function ub(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,123),c_(`click`,function(){let s=g0(t).$index,r=y(2);return S0(r.selectPart(s))}),B(1),Ud()}if(i&2){let t=e.$implicit,n=e.$index,s=y(2);f_(`on`,s.selection()?.partIndex===n),p(`aria-selected`,s.selection()?.partIndex===n),g(),M(t)}}function pb(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,111)(1,`button`,43),c_(`click`,function(){g0(t);let s=y().$implicit,r=y().$implicit,o=y(3);return S0(o.stepVec(r.kind,s,-1))}),d(),Y1(2,`svg`,113),Ud(),N0(),gr$1(3,`label`)(4,`i`),B(5),Ud(),gr$1(6,`input`,134),c_(`change`,function(s){g0(t);let r=y().$implicit,o=y().$implicit,a=y(3);return S0(a.setVec(o.kind,r,+s.target.value))}),Ud()(),gr$1(7,`button`,43),c_(`click`,function(){g0(t);let s=y().$implicit,r=y().$implicit,o=y(3);return S0(o.stepVec(r.kind,s,1))}),d(),Y1(8,`svg`,68),Ud()()}if(i&2){let t=y().$implicit,n=y().$implicit,s=y(),r=y(2);g(),p(`aria-label`,n.label+` `+t+` moins`),g(4),M(t),g(),J1(`step`,n.step)(`min`,n.kind===`size`?1:null)(`value`,r.vecValue(s,n.kind,t)),g(),p(`aria-label`,n.label+` `+t+` plus`)}}function fb(i,e){i&1&&Y1(0,`span`)}function mb(i,e){if(i&1&&S(0,pb,9,6,`div`,111)(1,fb,1,0,`span`),i&2){let t=e.$implicit,n=y().$implicit,s=y();T(n.kind!==`size`||s.kind===`box`||t!==`z`?0:1)}}function _b(i,e){if(i&1&&(gr$1(0,`div`,176)(1,`span`),B(2),Ud(),P(3,mb,2,1,null,null,YL),Ud()),i&2){let t=e.$implicit,n=y(3);g(2),M(t.label),g(),N(n.axes)}}function gb(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,43),c_(`click`,function(){let s=g0(t).$implicit,r=y(3);return S0(r.setSide(``+s.value))}),B(1),Ud()}if(i&2){let t=e.$implicit,n=y();f_(`on`,(n.side??0)===t.value),g(),M(t.label)}}function xb(i,e){if(i&1){let t=ah$1();gr$1(0,`h3`),B(1),Ud(),P(2,_b,5,1,`div`,176,qf),gr$1(4,`div`,177)(5,`span`),B(6,`Faces`),Ud(),gr$1(7,`div`,129),P(8,gb,2,3,`button`,130,Zf),Ud()(),gr$1(10,`label`,178)(11,`span`),B(12,`Caché par les autres`),Ud(),gr$1(13,`input`,132),c_(`change`,function(s){g0(t);let r=y(2);return S0(r.setFlag(`depthTest`,s.target.checked))}),Ud()(),gr$1(14,`label`,179)(15,`span`),B(16,`Cache les autres`),Ud(),gr$1(17,`input`,132),c_(`change`,function(s){g0(t);let r=y(2);return S0(r.setFlag(`depthWrite`,s.target.checked))}),Ud()()}if(i&2){let t=e,n=y(2);g(),Xd(`Réglages de `,n.parts()[n.selection().partIndex]),g(),N(n.vecs),g(6),N(n.sides),g(5),J1(`checked`,!!t.depthTest),g(4),J1(`checked`,!!t.depthWrite)}}function yb(i,e){i&1&&(gr$1(0,`p`,175),B(1,`Touche une forme du modèle, ou choisis-la ci-dessus.`),Ud())}function vb(i,e){if(i&1&&(gr$1(0,`div`,174),P(1,ub,2,4,`button`,121,JL),Ud(),S(3,xb,18,3)(4,yb,2,0,`p`,175)),i&2){let t,n=y();g(),N(n.parts()),g(2),T((t=n.selectedPart())?3:4,t)}}function Mb(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,184),c_(`click`,function(){let s=g0(t).$implicit,r=y(2);return S0(r.setLayer(s.id))}),gr$1(1,`span`),d(),Y1(2,`svg`,55),Ud(),N0(),gr$1(3,`strong`),B(4),Ud(),gr$1(5,`small`),B(6),Ud()()}if(i&2){let t=e.$implicit,n=y(2);f_(`on`,n.layer()===t.id),p(`aria-selected`,n.layer()===t.id),g(2),J1(`lucideIcon`,t.icon),g(2),M(t.label),g(2),M(t.short)}}function bb(i,e){if(i&1){let t=ah$1();gr$1(0,`label`,183)(1,`span`),B(2,`Vue de nuit`),Ud(),gr$1(3,`input`,132),c_(`change`,function(s){g0(t);let r=y(2);return S0(r.setNight(s.target.checked))}),Ud()()}if(i&2){let t=y(2);g(3),J1(`checked`,t.night())}}function Sb(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,186)(1,`span`),B(2,`Force du relief`),Ud(),gr$1(3,`div`,111)(4,`button`,187),c_(`click`,function(){g0(t);let s=y(3);return S0(s.setBumpScale((s.model()?.bumpScale??1)-.1))}),d(),Y1(5,`svg`,113),Ud(),N0(),gr$1(6,`input`,188),c_(`change`,function(s){g0(t);let r=y(3);return S0(r.setBumpScale(+s.target.value))}),Ud(),gr$1(7,`button`,189),c_(`click`,function(){g0(t);let s=y(3);return S0(s.setBumpScale((s.model()?.bumpScale??1)+.1))}),d(),Y1(8,`svg`,68),Ud()()()}if(i&2){let t=y(3);g(6),J1(`value`,t.model()?.bumpScale??1)}}function Cb(i,e){if(i&1){let t=ah$1();gr$1(0,`label`,185)(1,`span`),B(2,`Aperçu de nuit`),gr$1(3,`small`),B(4,`Coin de la vue 3D : le modèle en couleurs, lumières allumées`),Ud()(),gr$1(5,`input`,132),c_(`change`,function(s){g0(t);let r=y(2);return S0(r.setPreviewNight(s.target.checked))}),Ud()(),S(6,Sb,9,1,`div`,186)}if(i&2){let t=y(2);g(5),J1(`checked`,t.previewNight()),g(),T(t.layer()===`bump`?6:-1)}}function Eb(i,e){if(i&1&&(gr$1(0,`div`,180),P(1,Mb,7,6,`button`,181,Jf),Ud(),gr$1(3,`p`,182),B(4),Ud(),S(5,bb,4,1,`label`,183)(6,Cb,7,2)),i&2){let t=y();g(),N(t.layers),g(3),M(t.layerInfo().hint),g(),T(t.layer()===`color`?5:6)}}function wb(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,192),c_(`click`,function(){let s=g0(t).$implicit,r=y(2);return S0(r.pickTool(s.id))}),gr$1(1,`span`),d(),Y1(2,`svg`,55),Ud(),N0(),gr$1(3,`small`),B(4),Ud()()}if(i&2){let t=e.$implicit,n=y(2);f_(`on`,n.mode()===`paint`&&n.tool()===t.id),J1(`title`,t.label+` (`+t.key.toUpperCase()+`)`),p(`aria-label`,t.label)(`aria-pressed`,n.mode()===`paint`&&n.tool()===t.id),g(2),J1(`lucideIcon`,t.icon),g(2),M(t.short)}}function Tb(i,e){if(i&1){let t=ah$1();gr$1(0,`label`,131)(1,`span`),B(2,`Rectangle plein`),Ud(),gr$1(3,`input`,132),c_(`change`,function(s){g0(t);let r=y(2);return S0(r.rectFilled.set(s.target.checked))}),Ud()()}if(i&2){let t=y(2);g(3),J1(`checked`,t.rectFilled())}}function Ab(i,e){if(i&1&&(gr$1(0,`div`,190),P(1,wb,5,7,`button`,191,Jf),Ud(),S(3,Tb,4,1,`label`,131)),i&2){let t=y();g(),N(t.tools),g(2),T(t.tool()===`rect`?3:-1)}}function Pb(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,27),c_(`click`,function(){let s=g0(t).$implicit,r=y(4);return S0(r.setColor(s))}),Ud()}if(i&2){let t=e.$implicit,n=y(4);d_(`background`,t),f_(`on`,t===n.color()),J1(`title`,t),p(`aria-label`,t)}}function Rb(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,197)(1,`span`,198),B(2),gr$1(3,`button`,199),c_(`click`,function(){g0(t);let s=y(3);return S0(s.removePalette())}),B(4,`Retirer`),Ud()(),P(5,Pb,1,6,`button`,200,YL),Ud(),gr$1(7,`label`,201)(8,`span`),d(),Y1(9,`svg`,202),B(10,` Garder seulement ces couleurs`),Ud(),N0(),gr$1(11,`input`,132),c_(`change`,function(s){g0(t);let r=y(3);return S0(r.setPaletteLocked(s.target.checked))}),Ud()()}if(i&2){let t=e;g(2),L_(``,t.name,` (`,t.colors.length,`) `),g(3),N(t.colors),g(6),J1(`checked`,t.locked)}}function Ib(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,27),c_(`click`,function(){let s=g0(t).$implicit,r=y(4);return S0(r.setColor(s))}),Ud()}if(i&2){let t=e.$implicit,n=y(4);d_(`background`,t),f_(`on`,t===n.color()),J1(`title`,t),p(`aria-label`,t)}}function Lb(i,e){if(i&1&&(gr$1(0,`div`,195)(1,`span`),B(2,`Récentes`),Ud(),P(3,Ib,1,6,`button`,200,YL),Ud()),i&2){let t=y(3);g(3),N(t.recentColors())}}function Ob(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,27),c_(`click`,function(){let s=g0(t).$implicit,r=y(4);return S0(r.setColor(s))}),Ud()}if(i&2){let t=e.$implicit,n=y(4);d_(`background`,t),f_(`on`,t===n.color()),J1(`title`,t),p(`aria-label`,t)}}function Db(i,e){if(i&1&&(gr$1(0,`div`,196)(1,`span`),B(2,`Couleurs du modèle`),Ud(),P(3,Ob,1,6,`button`,200,YL),Ud()),i&2){let t=y(3);g(3),N(t.palette())}}function Nb(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,193)(1,`label`,194)(2,`input`,64),c_(`change`,function(s){g0(t);let r=y(2);return S0(r.useColor(s.target.value))}),Ud()(),gr$1(3,`div`,125)(4,`strong`),B(5),Ud(),gr$1(6,`span`,18),B(7,`Touche le carré : couleur libre`),Ud()()(),S(8,Rb,12,3),S(9,Lb,5,0,`div`,195),S(10,Db,5,0,`div`,196)}if(i&2){let t,n=y(2);g(),d_(`background`,n.color()),g(),J1(`value`,n.color()),g(3),M(n.color().toUpperCase()),g(3),T((t=n.importedPalette())?8:-1,t),g(),T(n.recentColors().length?9:-1),g(),T(n.palette().length?10:-1)}}function Fb(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,27),c_(`click`,function(){let s=g0(t).$implicit,r=y(3);return S0(r.gray.set(s))}),Ud()}if(i&2){let t=e.$implicit,n=y(3);d_(`background`,`rgb(`+t+`,`+t+`,`+t+`)`),f_(`on`,t===n.gray()),J1(`title`,t),p(`aria-label`,`Gris `+t)}}function Ub(i,e){if(i&1){let t=ah$1();gr$1(0,`div`,203),P(1,Fb,1,6,`button`,200,YL),Ud(),gr$1(3,`label`,204)(4,`input`,205),c_(`input`,function(s){g0(t);let r=y(2);return S0(r.gray.set(+s.target.value))}),Ud(),Y1(5,`span`,206),gr$1(6,`span`),B(7),Ud()()}if(i&2){let t=y(2);g(),N(t.grays),g(3),J1(`value`,t.gray()),g(),d_(`background`,`rgb(`+t.gray()+`,`+t.gray()+`,`+t.gray()+`)`),g(2),M(t.gray())}}function Bb(i,e){if(i&1&&S(0,Nb,11,7)(1,Ub,8,4),i&2){let t=y();T(t.layer()===`color`?0:1)}}function kb(i,e){if(i&1){let t=ah$1();gr$1(0,`button`,38),c_(`click`,function(){let s=g0(t).$implicit,r=y(3);return S0(r.selectFace(s.face))}),B(1),Ud()}if(i&2){let t=e.$implicit,n=y(3);f_(`on`,n.selection()?.face===t.face),g(),M(t.label)}}function zb(i,e){if(i&1&&(gr$1(0,`div`,207),P(1,kb,2,3,`button`,208,$f),Ud()),i&2){let t=y(2);g(),N(t.partFaces())}}function Vb(i,e){if(i&1){let t=ah$1();B(0),gr$1(1,`button`,151),c_(`click`,function(){g0(t);let s=y(3);return S0(s.unlink())}),B(2,`Délier`),Ud()}if(i&2){let t=y();Xd(` · liée à `,t.linked,` autre(s) face(s) `)}}function Gb(i,e){if(i&1){let t=ah$1();gr$1(0,`p`,182),B(1),S(2,Vb,3,1),Ud(),gr$1(3,`div`,209)(4,`button`,210),c_(`click`,function(){g0(t);let s=y(2);return S0(s.flip(!0))}),d(),Y1(5,`svg`,145),B(6,` Retourner`),Ud(),N0(),gr$1(7,`button`,211),c_(`click`,function(){g0(t);let s=y(2);return S0(s.flip(!1))}),d(),Y1(8,`svg`,147),B(9,` Retourner`),Ud(),N0(),gr$1(10,`button`,212),c_(`click`,function(){g0(t);let s=y(2);return S0(s.startFaceAction(`link`))}),d(),Y1(11,`svg`,141),B(12,` Lier à…`),Ud(),N0(),gr$1(13,`button`,213),c_(`click`,function(){g0(t);let s=y(2);return S0(s.startFaceAction(`copy`))}),d(),Y1(14,`svg`,143),B(15,` Copier vers…`),Ud()(),N0(),gr$1(16,`div`,214)(17,`span`,125),B(18,`Copie en miroir`),Ud(),gr$1(19,`button`,215),c_(`click`,function(){g0(t);let s=y(2);return S0(s.mirrorH.set(!s.mirrorH()))}),d(),Y1(20,`svg`,145),Ud(),N0(),gr$1(21,`button`,216),c_(`click`,function(){g0(t);let s=y(2);return S0(s.mirrorV.set(!s.mirrorV()))}),d(),Y1(22,`svg`,147),Ud()()}if(i&2){let t=e,n=y(2);g(),L_(` `,t.face,` · `,t.size,` `),g(),T(t.linked?2:-1),g(8),f_(`on`,n.pending()?.kind===`link`),g(3),f_(`on`,n.pending()?.kind===`copy`),g(6),f_(`on`,n.mirrorH()),g(2),f_(`on`,n.mirrorV())}}function Hb(i,e){i&1&&(gr$1(0,`p`,175),B(1,`Touche une face du modèle pour la choisir.`),Ud())}function Wb(i,e){if(i&1&&(S(0,zb,3,0,`div`,207),S(1,Gb,23,11)(2,Hb,2,0,`p`,175)),i&2){let t,n=y();T(n.partFaces().length?0:-1),g(),T((t=n.faceInfo())?1:2,t)}}var Bf={front:`Avant`,back:`Arrière`,left:`Gauche`,right:`Droite`,top:`Dessus`,bottom:`Dessous`};var Xb=4;var kf=`nouveau-modele`;var zf=[{id:`pencil`,icon:L9,label:`Crayon`,short:`Crayon`,key:`p`},{id:`eraser`,icon:w7,label:`Gomme (transparent)`,short:`Gomme`,key:`e`},{id:`picker`,icon:h9,label:`Pipette`,short:`Pipette`,key:`i`},{id:`fill`,icon:m9,label:`Pot de peinture`,short:`Pot`,key:`f`},{id:`line`,icon:N9,label:`Ligne`,short:`Ligne`,key:`l`},{id:`rect`,icon:H9,label:`Rectangle`,short:`Rectangle`,key:`r`}];var Ih=[{id:`color`,label:`Couleur`,icon:k9,short:`Pixels`,hint:`Les couleurs des pixels.`},{id:`specular`,label:`Brillance`,icon:O9,short:`Reflets`,hint:`Blanc : reflets du soleil · Noir : mat`},{id:`night`,label:`Nuit`,icon:p9,short:`Lumières`,hint:`Ce qui s'allume la nuit (lumière chaude) · Noir : éteint`},{id:`bump`,label:`Relief`,icon:d9,short:`Bosses`,hint:`Blanc : en relief · Noir : en creux (seules les différences comptent)`}];var Vf=[{kind:`size`,label:`Taille`,step:1},{kind:`pos`,label:`Position`,step:1},{kind:`rot`,label:`Rotation °`,step:15}];var Yb=[{axis:`x`,delta:-1,icon:XI,label:`x −`},{axis:`x`,delta:1,icon:ZI,label:`x +`},{axis:`y`,delta:1,icon:JI,label:`y +`},{axis:`y`,delta:-1,icon:$I,label:`y −`},{axis:`z`,delta:-1,icon:QI,label:`z −`},{axis:`z`,delta:1,icon:UI,label:`z +`}];var qb=`(max-width: 700px)`;var Zb=7;var $b=[0,32,64,96,128,160,192,224,255];var Gf=`pk-model-editor-sections`;var Hf=`pk-model-editor-big-view`;function Wf(i,e){try{return l(l({},e),JSON.parse(localStorage.getItem(i)??`null`))}catch{return e}}function Xf(i,e){try{localStorage.setItem(i,JSON.stringify(e))}catch{}}var Jb=400;var Kb=12;var jb=3e3;var Yf=class i{viewport=DG.required(`viewport`);embedded=Ye$1(!1);modelId=Ye$1(null);closed=bG();routeId=z(Z).snapshot.queryParamMap.get(`id`);scene=null;pressAt=null;active=null;touches=/* @__PURE__ */ new Map;multiTouch=!1;history=new Il;saveTimer=null;saving=Promise.resolve();confirmTimer=null;storedAs=null;modelIds=ue.map(e=>e.id);storedIds=D([]);newIds=Re(()=>this.storedIds().filter(e=>!this.modelIds.includes(e)));isEditedGameModel=Re(()=>{let e=this.model()?.id;return!!e&&this.modelIds.includes(e)&&this.storedIds().includes(e)});confirmRevert=D(!1);canUndo=D(!1);canRedo=D(!1);pending=D(null);mirrorH=D(!1);mirrorV=D(!1);recentColors=D(mt$1());paletteFileTypes=Of;importedPalette=D(ct());paletteVersion=D(0);palette=Re(()=>{this.paletteVersion();let e=this.model();return e?Lf(e):[]});axes=[`x`,`y`,`z`];sides=[{value:0,label:`Devant`},{value:2,label:`Deux côtés`},{value:1,label:`Derrière`}];vecs=Vf;nudges=Yb;phone=D(!1);phoneQuery=matchMedia(qb);onPhoneChange=e=>this.phone.set(e.matches);sheet=D(null);sheetTitles={model:`Modèle`,shapes:`Formes`,add:`Ajouter une forme`,layer:`Calque`,face:`Face`,palette:`Palette`};sheetDrag=D(0);sheetDragFrom=null;sheetInner=DG(`sheetInner`);sheetHeight=D(null);trayColors=Re(()=>this.recentColors().slice(0,Zb));layerInfo=Re(()=>Ih.find(e=>e.id===this.layer()));partFaces=Re(()=>{let e=this.selectedPart();return e?(e.kind===`box`?[`front`,`back`,`top`,`left`,`right`,`bottom`]:[`front`]).map(n=>({face:n,label:e.kind===`box`?Bf[n]:`Face`})):[]});model=D(null);selection=D(null);status=D(``);atlasPreview=D(null);tools=zf;mode=D(`select`);tool=D(`pencil`);color=D(`#e04040`);rectFilled=D(!1);layers=Ih;grays=$b;layer=D(`color`);layerHint=Re(()=>Ih.find(e=>e.id===this.layer()).hint);gray=D(255);night=D(!1);previewNight=D(!1);previewSize=Tl;sections=D(l({model:!0,parts:!0,part:!0,layer:!0,drawing:!0,color:!0,face:!0},Wf(Gf,{})));bigView=D(Wf(Hf,{on:!1}).on);previewMargin=Al;paintVersion=D(0);faceTexture=Re(()=>{let e=this.selection(),t=e?.face?this.selectedPart()?.faces[e.face]:void 0,n=t?this.model()?.textures[t]:void 0;return t&&n?{texId:t,tex:n}:null});parts=Re(()=>{let e={box:0,plane:0};return(this.model()?.parts??[]).map(t=>`${t.kind===`box`?`Box`:`Plane`} ${++e[t.kind]}`)});selectedPart=Re(()=>{let e=this.selection();return e?this.model()?.parts[e.partIndex]??null:null});faceInfo=Re(()=>{let e=this.model(),t=this.selection(),n=this.selectedPart();if(!e||!t?.face||!n)return null;let s=n.faces[t.face],r=e.textures[s],o=e.parts.reduce((a,c)=>a+Object.values(c.faces).filter(l=>l===s).length,0)-1;return{face:n.kind===`box`?Bf[t.face]:`Face`,size:`${r.w} \xD7 ${r.h} px`,linked:o}});constructor(){z(W_).track(()=>this.sheet(),()=>this.sheet.set(null)),Xl$1(e=>{let t=this.sheetInner()?.nativeElement;if(!t){this.sheetHeight.set(null);return}let n=new ResizeObserver(()=>this.sheetHeight.set(t.offsetHeight));n.observe(t),e(()=>n.disconnect())}),this.phone.set(this.phoneQuery.matches),this.phoneQuery.addEventListener(`change`,this.onPhoneChange)}async ngAfterViewInit(){this.scene=new Pl(this.viewport().nativeElement),this.scene.onPartMoved=(n,s)=>this.edit(r=>r.parts[n].pos=s);let e=this.viewport().nativeElement;e.addEventListener(`pointerdown`,n=>this.paint3dDown(n),{capture:!0}),e.addEventListener(`pointermove`,n=>this.paint3dMove(n)),e.addEventListener(`pointermove`,n=>this.trackTouch(n),{capture:!0}),e.addEventListener(`pointerup`,n=>this.untrackTouch(n),{capture:!0}),e.addEventListener(`pointercancel`,n=>this.untrackTouch(n),{capture:!0}),await this.refreshStoredIds();let t=this.modelId()??this.routeId;this.open(t&&(this.modelIds.includes(t)||this.storedIds().includes(t))?t:this.modelIds[0])}ngOnDestroy(){this.phoneQuery.removeEventListener(`change`,this.onPhoneChange),this.flushSave(),this.confirmTimer&&clearTimeout(this.confirmTimer),this.scene?.dispose()}async open(e,t=!1){await this.flushSave();let n=t?null:await nt$1(e);if(n){this.show(n,e),this.status.set(this.modelIds.includes(e)?`Version modifiée, enregistrée dans le navigateur : c'est elle que le jeu utilise.`:``);return}let s=ue.find(r=>r.id===e);if(s){this.status.set(`Chargement…`);try{let[r,o]=await Promise.all([Wl(s.tex.link),ru(s)]);this.show(ou(s,r,o),null),this.status.set(``)}catch(r){this.status.set(r.message)}}}create(){this.show(bf(this.freeId(kf)),null),this.save(),this.select({partIndex:0,face:null})}rename(e){let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)||kf,n=t===this.model()?.id?t:this.freeId(t);this.edit(s=>s.id=n,!1)}async revert(){let e=this.model()?.id;if(e){if(!this.confirmRevert()){this.confirmRevert.set(!0),this.confirmTimer=setTimeout(()=>this.confirmRevert.set(!1),jb);return}this.confirmRevert.set(!1),await this.flushSave(),await it$1(e),await this.refreshStoredIds(),this.open(e,!0)}}undo(){let e=this.model(),t=e&&this.history.undo(e);t&&this.restore(t)}redo(){let e=this.model(),t=e&&this.history.redo(e);t&&this.restore(t)}setSway(e){e=Math.round(e*10)/10,this.edit(t=>t.sway=e>0?Math.min(1,e):void 0,!1)}async export(){let e=this.model();if(!e)return;let t=te(e),n=await oe(t.atlas);p$1(`md-${e.id}.ts`,t.source),p$1(`${e.id}.png`,n);let s=Object.entries(t.maps);for(let[c,l]of s)p$1(`${e.id}-${c}.png`,await oe(l));let r=this.atlasPreview();r&&URL.revokeObjectURL(r),this.atlasPreview.set(URL.createObjectURL(n));let o=!this.modelIds.includes(e.id),a=[e.id,...s.map(([c])=>`${e.id}-${c}`)].map(c=>`${c}.png`).join(`, `);this.status.set(`Export\xE9 : md-${e.id}.ts (\u2192 src/assets/models/) et ${a} (\u2192 src/assets/tex/), atlas ${t.atlas.width} \xD7 ${t.atlas.height}.`+(o?` Nouveau mod\xE8le : ajoute ${t.constName} dans src/assets/models/models.ts, { model: ${t.constName} } dans MODEL_CHOICES (ModelChoice.ts) pour la palette de la carte, et son nom dans MODEL_LABELS (editor-bar.component.ts).`:``))}add(e){let t=0;this.edit(n=>t=wh(n,e)),this.select({partIndex:t,face:null})}duplicate(){let e=this.selection();if(!e)return;let t=0;this.edit(n=>t=Sf(n,e.partIndex)),this.select({partIndex:t,face:null})}remove(){let e=this.selection();e&&(this.select(null),this.edit(t=>Cf(t,e.partIndex)))}selectPart(e){this.select({partIndex:e,face:null})}setSize(e,t){let n=this.selection(),s=this.selectedPart();if(!n||!s||!Number.isFinite(t))return;let r=m(l({},s.size),{[e]:Math.max(1,Math.round(t))});this.edit(o=>Ef(o,n.partIndex,r))}setPos(e,t){this.editPart(n=>n.pos=m(l({},n.pos),{[e]:t}),Number.isFinite(t))}setRot(e,t){this.editPart(n=>n.rot=m(l({},n.rot),{[e]:t*Math.PI/180}),Number.isFinite(t))}degrees(e){return Math.round(e*180/Math.PI*100)/100}vecValue(e,t,n){return t===`size`?e.size[n]:t===`pos`?e.pos[n]:this.degrees(e.rot[n])}setVec(e,t,n){e===`size`?this.setSize(t,n):e===`pos`?this.setPos(t,n):this.setRot(t,n)}stepVec(e,t,n){let s=this.selectedPart();s&&this.setVec(e,t,this.vecValue(s,e,t)+n*Vf.find(r=>r.kind===e).step)}nudge(e,t){this.stepVec(`pos`,e,t)}turn(){this.stepVec(`rot`,`y`,6)}setSide(e){this.editPart(t=>t.side=Number(e))}setFlag(e,t){this.editPart(n=>n[e]=t)}setLayer(e){this.layer.set(e),this.setPreviewNight(e===`night`),this.scene?.setView({layer:e,night:this.night()}),this.paintVersion.update(t=>t+1)}setNight(e){this.night.set(e),this.scene?.setView({layer:this.layer(),night:e})}setPreviewNight(e){this.previewNight.set(e),this.scene?.setPreviewNight(e)}setBumpScale(e){e=Math.round(e*10)/10,Number.isFinite(e)&&e>0&&this.edit(t=>t.bumpScale=e)}setMode(e){this.mode.set(e),this.scene&&(this.scene.gizmoEnabled=e===`select`)}pickTool(e){this.tool.set(e),this.setMode(`paint`)}strokeStart(e){let t=this.faceTexture();t&&(this.setMode(`paint`),this.startStroke(t.texId,e,!1))}strokeMove(e){this.active&&!this.active.in3d&&this.applyStroke(e)}strokeEnd(){this.endStroke()}cancelStroke(){let e=this.tool();this.active=null;let t=e!==`picker`?this.history.drop():null;t&&this.restore(t)}startStroke(e,t,n){let s=this.model();this.tool()!==`picker`&&this.record(s);let r=this.layer(),o=Mt(s.textures[e],r),a=r===`color`?ro(this.snap(this.color())):[this.gray()],c=new Ll(o,this.tool(),a,this.rectFilled(),l=>{r!==`color`?(this.gray.set(l[0]),this.tool.set(`pencil`)):l[3]>0&&(this.setColor(js(l)),this.tool.set(`pencil`))});this.active={texId:e,stroke:c,in3d:n},this.applyStroke(t)}applyStroke(e){this.active?.stroke.apply(e)&&(this.scene?.updateTexture(this.active.texId),this.paintVersion.update(t=>t+1))}endStroke(){let e=this.tool();this.active&&e!==`picker`&&(e!==`eraser`&&this.layer()===`color`&&this.useColor(this.color()),this.paletteVersion.update(t=>t+1),this.scheduleSave()),this.active=null,this.scene&&(this.scene.orbitEnabled=!0)}paint3dDown(e){if(!e.isTrusted)return;if(e.pointerType===`touch`&&(this.touches.set(e.pointerId,{x:e.clientX,y:e.clientY}),this.touches.size>1)){this.multiTouch=!0,this.pressAt=null,this.active?.in3d&&this.cancelStroke3d(e.pointerId);return}if(this.fromPreview(e)||this.mode()!==`paint`||e.button!==0||!this.scene||this.pending())return;let t=this.scene.pick(e.clientX,e.clientY,!0),n=t&&this.model()?.parts[t.partIndex].faces[t.face];!t||!n||(this.scene.orbitEnabled=!1,this.pressAt=null,this.viewport().nativeElement.setPointerCapture(e.pointerId),this.select({partIndex:t.partIndex,face:t.face}),e.pointerType===`touch`&&ji$1(`tick`),this.startStroke(n,t.px,!0))}cancelStroke3d(e){if(this.cancelStroke(),!this.scene)return;this.scene.orbitEnabled=!0;let t=this.viewport().nativeElement.querySelector(`canvas`);this.touches.forEach((n,s)=>{s!==e&&t?.dispatchEvent(new PointerEvent(`pointerdown`,{pointerId:s,pointerType:`touch`,isPrimary:!0,button:0,buttons:1,clientX:n.x,clientY:n.y,bubbles:!0}))})}trackTouch(e){this.touches.has(e.pointerId)&&this.touches.set(e.pointerId,{x:e.clientX,y:e.clientY})}untrackTouch(e){this.touches.delete(e.pointerId),this.touches.size||(this.multiTouch=!1)}paint3dMove(e){if(!this.active?.in3d||!this.scene)return;let t=this.scene.pick(e.clientX,e.clientY,!0);t&&this.model()?.parts[t.partIndex].faces[t.face]===this.active.texId&&this.applyStroke(t.px)}async importPalette(e){let t=e.files?.[0];if(e.value=``,!!t)try{let{name:n,colors:s}=await Df(t);this.updatePalette({name:n,colors:s,locked:this.importedPalette()?.locked??!1}),this.status.set(`Palette \xAB ${n} \xBB : ${s.length} couleurs.`)}catch(n){this.status.set(n.message)}}removePalette(){this.updatePalette(null)}setPaletteLocked(e){let t=this.importedPalette();t&&this.updatePalette(m(l({},t),{locked:e}))}updatePalette(e){this.importedPalette.set(e),dt$1(e),this.color.set(this.snap(this.color()))}snap(e){let t=this.importedPalette();return t?.locked?Nf(e,t.colors):e}toggleSection(e,t){this.sections()[e]!==t&&(this.sections.update(n=>m(l({},n),{[e]:t})),Xf(Gf,this.sections()))}setEditorMode(e){this.setMode(e),this.sheet.set(null)}toggleSheet(e){this.sheet.update(t=>t===e?null:e)}sheetDragStart(e){e.target.closest(`button, label, input`)||this.sheetDragFrom||(this.sheetDragFrom={id:e.pointerId,y:e.clientY,grip:e.target.classList.contains(`grip`)},e.currentTarget.setPointerCapture(e.pointerId))}sheetDragMove(e){this.sheetDragFrom?.id===e.pointerId&&this.sheetDrag.set(Math.max(0,e.clientY-this.sheetDragFrom.y))}sheetDragEnd(e){let t=this.sheetDragFrom;t?.id===e.pointerId&&(this.sheetDragFrom=null,(this.sheetDrag()>60||t.grip&&e.type===`pointerup`&&this.sheetDrag()<4)&&this.sheet.set(null),this.sheetDrag.set(0))}cancelFaceAction(){this.pending.set(null),this.status.set(``)}setBigView(e){this.bigView.set(e),Xf(Hf,{on:e})}fromPreview(e){return!!e.target.closest(`.preview`)}onPointerDown(e){!e.isTrusted||this.multiTouch||(this.pressAt=this.fromPreview(e)||this.scene?.onGizmo||this.active?null:{x:e.clientX,y:e.clientY})}onPointerUp(e){if(this.active?.in3d){this.endStroke();return}let t=this.pressAt;if(this.pressAt=null,!t||Math.hypot(e.clientX-t.x,e.clientY-t.y)>Xb)return;let n=this.scene?.pick(e.clientX,e.clientY,!!this.pending());if(this.pending()){n&&this.applyFaceAction(n.partIndex,n.face);return}this.select(n?{partIndex:n.partIndex,face:n.face}:null)}selectFace(e){let t=this.selection();t&&this.select({partIndex:t.partIndex,face:e})}unlink(){let e=this.selection();e?.face&&this.edit(t=>wf(t,e.partIndex,e.face))}flip(e){let t=this.faceTexture();t&&(this.edit(n=>Af(n.textures[t.texId],e,!e)),this.paintVersion.update(n=>n+1))}startFaceAction(e){let t=this.faceTexture();t&&(this.pending.set({kind:e,texId:t.texId}),this.sheet.set(null),this.phone()&&this.setBigView(!1),this.status.set(e===`link`?`Touche la face à lier (même taille).`:`Touche la face où copier.`))}applyFaceAction(e,t){let n=this.pending();this.pending.set(null);let s=!0;n.kind===`link`?this.edit(r=>s=Tf(r,n.texId,e,t)):this.edit(r=>Pf(r,n.texId,e,t,this.mirrorH(),this.mirrorV())),this.status.set(s?``:`Pas lié : les deux faces doivent avoir la même taille.`),this.select({partIndex:e,face:t}),this.paintVersion.update(r=>r+1)}setColor(e){this.color.set(this.snap(e))}useColor(e){e=this.snap(e),this.color.set(e);let t=[e,...this.recentColors().filter(n=>n!==e)].slice(0,Kb);this.recentColors.set(t),yt(t)}onKey(e){if(e.target.closest(`input, select, textarea`))return;let t=e.ctrlKey||e.metaKey;if(t&&(e.key===`z`||e.key===`Z`))e.preventDefault(),e.shiftKey?this.redo():this.undo();else if(t&&e.key===`y`)e.preventDefault(),this.redo();else if((e.key===`Delete`||e.key===`Backspace`)&&this.mode()===`select`)this.remove();else if(e.key===`Escape`)this.sheet()?this.sheet.set(null):this.pending()?(this.pending.set(null),this.status.set(``)):this.select(null);else if(e.key===`d`&&(e.ctrlKey||e.metaKey))e.preventDefault(),this.duplicate();else if(!e.ctrlKey&&!e.metaKey&&!e.altKey){let n=zf.find(s=>s.key===e.key);n?this.pickTool(n.id):e.key===`v`?this.setMode(`select`):e.key===`g`&&this.setBigView(!this.bigView())}}show(e,t){this.flushSave(),this.storedAs=t,this.history.clear(),this.updateHistory(),this.pending.set(null),this.model.set(e),this.atlasPreview.set(null),this.scene?.setModel(e),this.select(null),this.paletteVersion.update(n=>n+1)}restore(e){this.updateHistory(),this.model.set(e),this.scene?.refresh(e);let t=this.selection();this.select(t&&e.parts[t.partIndex]?t:null),this.paintVersion.update(n=>n+1),this.paletteVersion.update(n=>n+1),this.scheduleSave()}record(e){this.history.record(e),this.updateHistory()}updateHistory(){this.canUndo.set(this.history.canUndo),this.canRedo.set(this.history.canRedo)}scheduleSave(){this.saveTimer&&clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.save(),Jb)}flushSave(){return this.saveTimer&&this.save(),this.saving}save(){this.saveTimer&&(clearTimeout(this.saveTimer),this.saveTimer=null);let e=this.model();if(!e)return;let t=this.storedAs??void 0;this.storedAs=e.id,this.saving=this.saving.then(async()=>{await xt(e,t)||this.status.set(`Enregistrement impossible dans le navigateur : pense à exporter.`),await this.refreshStoredIds()})}async refreshStoredIds(){this.storedIds.set(await rt())}async backToGame(e){if(e.preventDefault(),this.embedded()){await this.requestClose();return}await this.flushSave();let t=new URL(location.href);t.hash=`#/`,location.assign(t),location.reload()}async requestClose(){await this.flushSave(),this.closed.emit()}freeId(e){let t=/* @__PURE__ */ new Set([...this.modelIds,...this.storedIds()]),n=e;for(let s=2;t.has(n);s++)n=`${e}-${s}`;return n}edit(e,t=!0){let n=this.model();if(n&&(this.record(n),e(n),this.model.set(l({},n)),this.scheduleSave(),t)){this.scene?.refresh(this.model());let s=this.selection();this.scene?.highlight(s?.partIndex??null,s?.face??null)}}editPart(e,t=!0){let n=this.selection();n&&t&&this.edit(s=>e(s.parts[n.partIndex]))}select(e){this.selection.set(e),this.scene?.highlight(e?.partIndex??null,e?.face??null)}static ɵfac=function(t){return new(t||i)};static ɵcmp=G({type:i,selectors:[[`app-model-editor`]],viewQuery:function(t,n){t&1&&n_(n.viewport,Dv,5)(n.sheetInner,Nv,5),t&2&&yh$1(2)},hostBindings:function(t,n){t&1&&c_(`keydown`,function(r){return n.onKey(r)},P2)},inputs:{embedded:[1,`embedded`],modelId:[1,`modelId`]},outputs:{closed:`closed`},decls:26,vars:8,consts:[[`viewport`,``],[`modeSwitch`,``],[`modelOptions`,``],[`modelTpl`,``],[`shapesTpl`,``],[`layerTpl`,``],[`toolsTpl`,``],[`paletteTpl`,``],[`faceTpl`,``],[`sheetInner`,``],[1,`stage`],[1,`viewport`,3,`pointerdown`,`pointerup`,`pointercancel`],[1,`preview`,3,`width`,`height`,`right`,`bottom`],[1,`view-hint`],[`aria-label`,`Grande vue de la face`,1,`big-face`],[1,`m-top`],[`href`,`#/`,`title`,`Retour au jeu, avec les modèles enregistrés ici`,1,`back`,3,`click`],[`type`,`button`,1,`m-title`,3,`click`],[1,`muted`],[1,`history`],[`type`,`button`,`aria-label`,`Annuler`,1,`btn`,3,`click`,`disabled`],[`lucideUndo2`,``],[`type`,`button`,`aria-label`,`Refaire`,1,`btn`,3,`click`,`disabled`],[`lucideRedo2`,``],[1,`m-mode`],[3,`ngTemplateOutlet`],[1,`preview`],[`type`,`button`,3,`click`,`title`],[`lucideSun`,``],[`lucideMoon`,``],[`lucideMousePointerClick`,``],[3,`strokeStart`,`strokeMove`,`strokeEnd`,`strokeCancel`,`texture`,`layer`,`version`,`fill`,`faceKey`],[`type`,`button`,`title`,`Fermer la grande vue (G)`,`aria-label`,`Fermer la grande vue`,1,`btn`,`ghost`,`icon`,3,`click`],[`lucideX`,``],[1,`m-overlay`],[1,`banner`],[1,`m-view-top`],[1,`selection-card`],[`type`,`button`,1,`btn`,3,`click`],[1,`chip`],[`lucideHand`,``],[1,`chip`,`face-chip`],[`role`,`group`,`aria-label`,`Vue`,1,`view-toggle`],[`type`,`button`,3,`click`],[`type`,`button`,3,`click`,`disabled`],[1,`sel-head`],[1,`muted`,`grow`],[`lucideSettings2`,``],[1,`nudges`],[`type`,`button`,1,`btn`],[1,`sel-actions`],[`lucideCopy`,``],[`lucideRotateCw`,``],[`type`,`button`,`data-haptic`,`warning`,1,`btn`,`danger`,3,`click`],[`lucideTrash`,``],[3,`lucideIcon`],[1,`tray`],[`aria-label`,`Sections`,1,`m-nav`],[`lucidePackage`,``],[`role`,`dialog`,1,`sheet`,3,`height`,`transform`,`dragging`],[1,`tray-colors`],[`type`,`button`,`aria-label`,`Palette`,1,`btn`,`palette-btn`,3,`click`],[`lucidePalette`,``],[`title`,`Couleur libre`,1,`current`],[`type`,`color`,`aria-label`,`Couleur libre`,3,`change`,`value`],[`type`,`button`,1,`swatch`,3,`background`,`on`],[`type`,`button`,1,`swatch`,3,`click`],[`lucideShapes`,``],[`lucidePlus`,``],[`lucideSquareDashed`,``],[`role`,`dialog`,1,`sheet`],[1,`sheet-inner`],[1,`sheet-top`,3,`pointerdown`,`pointermove`,`pointerup`,`pointercancel`],[`aria-hidden`,`true`,1,`grip`],[1,`sheet-head`],[`type`,`button`,`title`,`Fermer`,`aria-label`,`Fermer`,1,`btn`,`close`,3,`click`],[1,`sheet-body`],[`title`,`Fichier .gpl, .pal, .hex ou .png (Aseprite, Lospec, GIMP)`,1,`btn`],[`lucideUpload`,``],[`type`,`file`,`hidden`,``,3,`change`,`accept`],[1,`add-choices`],[`lucideBox`,``],[`lucideRectangleHorizontal`,``],[1,`d-top`],[`lucideChevronLeft`,``],[1,`d-sep`],[`title`,`Ouvrir un modèle`,1,`d-model`],[`lucideHouse`,``],[`aria-label`,`Ouvrir un modèle`,3,`change`],[`lucideChevronDown`,``],[`title`,`Tes changements sont enregistrés dans ce navigateur et visibles dans le jeu. L'export sert à les ajouter au code.`,1,`d-save`],[`lucideCloudCheck`,``],[1,`d-mode`],[`type`,`button`,`title`,`Annuler (Ctrl+Z)`,`aria-label`,`Annuler`,1,`btn`,`ghost`,`icon`,3,`click`,`disabled`],[`type`,`button`,`title`,`Refaire (Ctrl+Y)`,`aria-label`,`Refaire`,1,`btn`,`ghost`,`icon`,3,`click`,`disabled`],[`type`,`button`,`data-haptic`,`success`,`title`,`Télécharge le .ts et les .png, à mettre dans le code`,1,`btn`,`accent`,3,`click`,`disabled`],[`lucideDownload`,``],[`aria-label`,`Éditeur de modèles`,1,`panel`],[1,`block`,3,`toggle`,`open`],[1,`chev`],[1,`title`],[1,`pair`],[`type`,`button`,1,`btn`,`outline`,3,`click`],[`type`,`button`,`data-haptic`,`warning`,`title`,`Oublie les modifications enregistrées dans le navigateur`,1,`btn`,`outline`,3,`danger`],[1,`status`],[`alt`,`Atlas exporté`,1,`atlas`,3,`src`],[1,`shortcuts`],[1,`prop`],[1,`label`],[`type`,`text`,`aria-label`,`Nom du modèle (id)`,`title`,`En minuscules avec des tirets`,3,`change`,`value`],[`title`,`0 à 1 : plie au vent comme la végétation`,1,`prop`],[1,`stepper`],[`type`,`button`,`aria-label`,`Moins de vent`,3,`click`],[`lucideMinus`,``],[`type`,`number`,`min`,`0`,`max`,`1`,`step`,`0.1`,`aria-label`,`Vent`,3,`change`,`value`],[`type`,`button`,`aria-label`,`Plus de vent`,3,`click`],[1,`note`],[`type`,`button`,`data-haptic`,`warning`,`title`,`Oublie les modifications enregistrées dans le navigateur`,1,`btn`,`outline`,3,`click`],[`lucideRotateCcw`,``],[`type`,`button`,1,`btn`,`small`,3,`click`],[`role`,`listbox`,`aria-label`,`Formes du modèle`,1,`shape-list`],[`type`,`button`,`role`,`option`,3,`on`],[1,`block`,3,`open`],[`type`,`button`,`role`,`option`,3,`click`],[`lucideSquare`,``],[1,`grow`],[`type`,`button`,`title`,`Dupliquer (Ctrl+D)`,`aria-label`,`Dupliquer`,1,`btn`,`ghost`,`icon`,3,`click`],[`type`,`button`,`title`,`Tourner de 90°`,`aria-label`,`Tourner de 90°`,1,`btn`,`ghost`,`icon`,3,`click`],[`type`,`button`,`data-haptic`,`warning`,`title`,`Supprimer (Suppr)`,`aria-label`,`Supprimer`,1,`btn`,`ghost`,`icon`,`danger`,3,`click`],[1,`segmented`],[`type`,`button`,3,`on`],[1,`switch`],[`type`,`checkbox`,3,`change`,`checked`],[1,`stepper-gap`],[`type`,`number`,3,`change`,`step`,`min`,`value`],[1,`aside`],[`title`,`Fichier .gpl, .pal, .hex ou .png (Aseprite, Lospec, GIMP)`,1,`btn`,`small`,`ghost`],[`aria-label`,`Choisir la face`,1,`segmented`,`faces`],[`title`,`Fichier .gpl, .pal, .hex ou .png (Aseprite, Lospec, GIMP)`,1,`btn`,`small`,`ghost`,3,`click`],[1,`face-row`],[`type`,`button`,`title`,`Puis clique une autre face de même taille : elles auront les mêmes pixels`,1,`btn`,3,`click`],[`lucideLink`,``],[`type`,`button`,`title`,`Puis clique la face où copier ce dessin`,1,`btn`,3,`click`],[`lucideClipboardCopy`,``],[`type`,`button`,`title`,`Retourner gauche ↔ droite`,`aria-label`,`Retourner gauche droite`,1,`btn`,`icon`,3,`click`],[`lucideArrowLeftRight`,``],[`type`,`button`,`title`,`Retourner haut ↕ bas`,`aria-label`,`Retourner haut bas`,1,`btn`,`icon`,3,`click`],[`lucideArrowUpDown`,``],[1,`grow`,`note`],[`type`,`button`,`title`,`Copie en miroir gauche ↔ droite`,`aria-label`,`Miroir gauche droite`,1,`btn`,`icon`,3,`click`],[`type`,`button`,`title`,`Copie en miroir haut ↕ bas`,`aria-label`,`Miroir haut bas`,1,`btn`,`icon`,3,`click`],[`type`,`button`,`title`,`Cette face garde une copie de ses pixels et ne suit plus les autres`,1,`link-btn`,3,`click`],[`type`,`button`,`title`,`Grande vue de la face (G)`,1,`btn`,`outline`,3,`click`],[`lucideMaximize2`,``],[3,`texture`,`layer`,`version`,`faceKey`],[3,`strokeStart`,`strokeMove`,`strokeEnd`,`strokeCancel`,`texture`,`layer`,`version`,`faceKey`],[`role`,`tablist`,`aria-label`,`Mode`,1,`mode-switch`],[`type`,`button`,`role`,`tab`,`title`,`Modélisation : choisir, déplacer, régler les formes (V)`,3,`click`],[`type`,`button`,`role`,`tab`,`title`,`Dessin : peindre les faces`,3,`click`],[`lucideBrush`,``],[`value`,``,`selected`,``,`disabled`,``],[`label`,`Modèles du jeu`],[3,`value`,`selected`],[`label`,`Nouveaux (navigateur)`],[1,`field`],[3,`change`],[1,`row`],[1,`field`,`grow`],[`type`,`text`,3,`change`,`value`],[`title`,`0 à 1 : plie au vent (végétation)`,1,`field`],[1,`hint`,`small`],[`type`,`button`,`data-haptic`,`warning`,`title`,`Oublie les modifications enregistrées dans le navigateur`,1,`btn`,`wide`,3,`danger`,`on`],[`type`,`button`,`data-haptic`,`success`,1,`primary`,3,`click`],[`type`,`button`,`data-haptic`,`warning`,`title`,`Oublie les modifications enregistrées dans le navigateur`,1,`btn`,`wide`,3,`click`],[`role`,`listbox`,`aria-label`,`Formes du modèle`,1,`chips`],[1,`hint`],[1,`vec`],[1,`vec`,`sides`],[`title`,`Décocher pour un élément posé par-dessus (texte d'un panneau)`,1,`switch`],[`title`,`Décocher pour les fleurs, herbes (ne cachent pas ce qui est derrière)`,1,`switch`],[`role`,`tablist`,`aria-label`,`Calque`,1,`layer-tiles`],[`type`,`button`,`role`,`tab`,3,`on`],[1,`hint`,`box`],[`title`,`Voir le modèle la nuit : le calque Nuit s'allume`,1,`switch`],[`type`,`button`,`role`,`tab`,3,`click`],[`title`,`Le coin de la vue 3D montre le modèle en couleurs`,1,`switch`],[`title`,`Force du relief (1 par défaut)`,1,`field`],[`type`,`button`,`aria-label`,`Moins de relief`,3,`click`],[`type`,`number`,`min`,`0.1`,`step`,`0.1`,`aria-label`,`Force du relief`,3,`change`,`value`],[`type`,`button`,`aria-label`,`Plus de relief`,3,`click`],[`role`,`toolbar`,`aria-label`,`Outils`,1,`tools`],[`type`,`button`,1,`btn`,3,`on`,`title`],[`type`,`button`,1,`btn`,3,`click`,`title`],[1,`current-color`],[`title`,`Couleur libre`,1,`current`,`big`],[`aria-label`,`Couleurs récentes`,1,`swatches`],[`aria-label`,`Couleurs du modèle`,1,`swatches`],[`aria-label`,`Palette importée`,1,`swatches`],[1,`palette-head`],[`type`,`button`,1,`link-btn`,3,`click`],[`type`,`button`,3,`background`,`on`,`title`],[`title`,`Le crayon, le pot, la ligne et le rectangle prennent toujours la couleur de la palette la plus proche`,1,`switch`],[`lucideLock`,``],[`aria-label`,`Nuances de gris`,1,`grays`],[1,`row`,`gray-slider`],[`type`,`range`,`min`,`0`,`max`,`255`,`aria-label`,`Valeur de gris`,3,`input`,`value`],[1,`gray-value`],[`aria-label`,`Choisir la face`,1,`face-buttons`],[`type`,`button`,1,`btn`,3,`on`],[1,`face-actions`],[`type`,`button`,`title`,`Retourner gauche ↔ droite`,1,`btn`,3,`click`],[`type`,`button`,`title`,`Retourner haut ↕ bas`,1,`btn`,3,`click`],[`type`,`button`,`title`,`Puis touche une autre face de même taille : elles auront les mêmes pixels`,1,`btn`,3,`click`],[`type`,`button`,`title`,`Puis touche la face où copier ce dessin`,1,`btn`,3,`click`],[1,`row`,`wrap`,`mirror`],[`type`,`button`,`aria-label`,`Miroir gauche droite`,1,`btn`,3,`click`],[`type`,`button`,`aria-label`,`Miroir haut bas`,1,`btn`,3,`click`]],template:function(t,n){if(t&1&&(S(0,Bv,15,5),gr$1(1,`div`,10)(2,`div`,11,0),c_(`pointerdown`,function(r){return n.onPointerDown(r)})(`pointerup`,function(r){return n.onPointerUp(r)})(`pointercancel`,function(r){return n.onPointerUp(r)}),S(4,Vv,6,12,`div`,12),S(5,Gv,3,1,`p`,13),Ud(),S(6,Wv,3,6,`section`,14),S(7,Qv,5,2),Ud(),S(8,MM,9,5)(9,jM,43,14),A1(10,QM,7,6,`ng-template`,null,1,Qh)(12,sb,5,2,`ng-template`,null,2,Qh)(14,db,8,4,`ng-template`,null,3,Qh)(16,vb,5,1,`ng-template`,null,4,Qh)(18,Eb,7,2,`ng-template`,null,5,Qh)(20,Ab,4,1,`ng-template`,null,6,Qh)(22,Bb,2,1,`ng-template`,null,7,Qh)(24,Wb,3,2,`ng-template`,null,8,Qh)),t&2){let s;T(n.phone()?0:-1),g(2),f_(`painting`,n.mode()===`paint`),g(2),T(n.layer()!==`color`?4:-1),g(),T(!n.phone()&&!(n.bigView()&&n.mode()===`paint`&&n.faceTexture())?5:-1),g(),T((s=n.bigView()&&n.mode()===`paint`&&n.faceTexture())?6:-1,s),g(),T(n.phone()?7:-1),g(),T(n.phone()?8:9)}},dependencies:[Ol,Ov$1,WI,KI,a7,n7,f7,y7,C7,m7,g7,E7,d8,$7,X7,J7,Y7,i9,r9,p9,y9,_9,k9,g9,S9,T9,F9,E9,M9,w9,H9,R9,W9,Q9,J9,Y9,l8],styles:[`[_nghost-%COMP%]{--%NS%bg: #2a2b33;--%NS%panel: #22232a;--%NS%surface: #33353f;--%NS%border: #4a4c5a;--%NS%accent: #3a6ea5;--%NS%accent-border: #5a8ec5;--%NS%accent-soft: rgba(58, 110, 165, .2);--%NS%muted: #8a8d9c;--%NS%highlight: #ffd34d;--%NS%danger: #ff9c9c;position:absolute;inset:0;display:flex;background:var(--%NS%bg);color:#eceef4;touch-action:none;font-size:14px}.stage[_ngcontent-%COMP%]{flex:1;min-width:0;min-height:0;position:relative;display:flex}.viewport[_ngcontent-%COMP%]{flex:1;min-width:0;position:relative}.viewport[_ngcontent-%COMP%]     canvas{display:block;width:100%;height:100%}.viewport.painting[_ngcontent-%COMP%]{cursor:crosshair}.preview[_ngcontent-%COMP%]{position:absolute;z-index:1;border:1px solid #6a6d7e;border-radius:4px;box-shadow:0 2px 10px #0006;cursor:default}.preview[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:absolute;top:6px;left:8px;font-size:12px;color:#d8dae4;text-shadow:0 1px 2px #000;pointer-events:none}.preview[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{position:absolute;top:4px;right:4px;width:32px;height:32px;border:1px solid var(--%NS%border);border-radius:6px;background:#22232ad9;color:var(--%NS%highlight);font-size:16px;cursor:pointer}.big-face[_ngcontent-%COMP%]{position:absolute;z-index:2;top:calc(12px + var(--%NS%safe-top));left:calc(12px + var(--%NS%safe-left));bottom:12px;width:55%;min-width:280px;padding:10px;display:flex;flex-direction:column;gap:8px;background:#22232af5;border:1px solid var(--%NS%border);border-radius:8px;box-shadow:0 4px 18px #00000080}.big-face[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{display:flex;align-items:baseline;gap:10px}.big-face[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%]{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px}.big-face[_ngcontent-%COMP%]   app-pixel-canvas[_ngcontent-%COMP%]{flex:1}.btn[_ngcontent-%COMP%]{padding:6px 10px;border:1px solid var(--%NS%border);border-radius:8px;background:var(--%NS%surface);color:inherit;font:inherit;cursor:pointer}.btn[_ngcontent-%COMP%]:hover:not(:disabled){background:#40424e}.btn[_ngcontent-%COMP%]:disabled{opacity:.4;cursor:default}.btn.danger[_ngcontent-%COMP%]:not(:disabled){color:var(--%NS%danger)}.btn.on[_ngcontent-%COMP%]{background:var(--%NS%accent);border-color:var(--%NS%accent-border);color:#fff}.btn.wide[_ngcontent-%COMP%]{width:100%}label.btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px}.primary[_ngcontent-%COMP%]{flex-shrink:0;width:100%;padding:12px;border:none;border-radius:10px;background:var(--%NS%accent);color:#fff;font:inherit;font-size:15px;font-weight:600;cursor:pointer}.back[_ngcontent-%COMP%]{color:#9fc3ff;text-decoration:none}.muted[_ngcontent-%COMP%]{color:var(--%NS%muted)}.grow[_ngcontent-%COMP%]{flex:1;min-width:0}.row[_ngcontent-%COMP%]{display:flex;align-items:flex-end;gap:8px}.row.wrap[_ngcontent-%COMP%]{flex-wrap:wrap;align-items:center}.field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:4px}.field[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:12px;font-weight:600;color:var(--%NS%muted)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{font:inherit;padding:6px 8px;border-radius:8px;background:var(--%NS%surface);color:inherit;border:1px solid var(--%NS%border);min-width:0}h3[_ngcontent-%COMP%]{margin:6px 0 0;font-size:13px;color:var(--%NS%muted)}.hint[_ngcontent-%COMP%], .status[_ngcontent-%COMP%]{margin:0;color:#b4b7c4}.hint.small[_ngcontent-%COMP%], .status.small[_ngcontent-%COMP%]{font-size:12px;color:var(--%NS%muted)}.hint.box[_ngcontent-%COMP%], .status.box[_ngcontent-%COMP%]{padding:10px 12px;border-radius:8px;background:var(--%NS%surface);font-size:13px}.link-btn[_ngcontent-%COMP%]{margin-left:6px;padding:0;border:none;background:none;color:#9fc3ff;text-decoration:underline;cursor:pointer;font:inherit}.banner[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;background:#4a3d10;border:1px solid var(--%NS%highlight)}.banner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{flex:1}.mode-switch[_ngcontent-%COMP%]{display:flex;gap:3px;padding:3px;border-radius:12px;background:var(--%NS%surface)}.mode-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1;padding:8px 4px;border:none;border-radius:9px;background:none;color:var(--%NS%muted);font:inherit;font-weight:600;cursor:pointer}.mode-switch[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]{background:var(--%NS%accent);color:#fff}.stepper[_ngcontent-%COMP%]{display:flex;align-items:stretch;min-width:0;border:1px solid var(--%NS%border);border-radius:8px;background:var(--%NS%surface)}.stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex-shrink:0;width:24px;padding:0;border:none;background:none;color:var(--%NS%muted);font-size:16px;cursor:pointer}.stepper[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center}.stepper[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:9px;font-style:normal;color:var(--%NS%muted);line-height:1;padding-top:3px}.stepper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:2px 0;border:none;background:none;text-align:center;font-weight:600;-moz-appearance:textfield}.stepper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-inner-spin-button, .stepper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-outer-spin-button{-webkit-appearance:none}.stepper[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]{padding:6px 0}.vec[_ngcontent-%COMP%]{display:grid;grid-template-columns:62px repeat(3,1fr);align-items:center;gap:4px}.vec[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{color:#b4b7c4;font-size:13px}.vec.sides[_ngcontent-%COMP%]{grid-template-columns:62px 1fr}.segmented[_ngcontent-%COMP%]{display:flex;gap:3px;padding:3px;border-radius:8px;background:var(--%NS%surface)}.segmented[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1;padding:6px 2px;border:none;border-radius:6px;background:none;color:var(--%NS%muted);font:inherit;font-size:12px;cursor:pointer}.segmented[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]{background:var(--%NS%border);color:inherit}.switch[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;cursor:pointer}.switch[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column}.switch[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:11px;color:var(--%NS%muted)}.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{appearance:none;flex-shrink:0;position:relative;width:40px;height:24px;padding:0;border:none;border-radius:12px;background:var(--%NS%border);cursor:pointer;transition:background .15s}.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .15s}.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked{background:var(--%NS%accent)}.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked:after{transform:translate(16px)}.chips[_ngcontent-%COMP%]{display:flex;gap:6px;overflow-x:auto;padding-bottom:2px}.chips[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex-shrink:0;padding:6px 12px;border:1px solid var(--%NS%border);border-radius:999px;background:var(--%NS%surface);color:inherit;font:inherit;font-size:13px;cursor:pointer}.chips[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]{background:var(--%NS%accent);border-color:var(--%NS%accent-border);color:#fff;font-weight:600}.layer-tiles[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.layer-tiles[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 2px;border:1px solid var(--%NS%border);border-radius:10px;background:var(--%NS%surface);color:inherit;font:inherit;cursor:pointer}.layer-tiles[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:18px}.layer-tiles[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:12px}.layer-tiles[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:10px;color:var(--%NS%muted)}.layer-tiles[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]{background:var(--%NS%accent);border-color:var(--%NS%accent-border);color:#fff}.layer-tiles[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#dce8f8}.tools[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(6,1fr);gap:4px}.tools[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 0}.tools[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:17px}.tools[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:9px;color:var(--%NS%muted)}.tools[_ngcontent-%COMP%]   .btn.on[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#fff}.current[_ngcontent-%COMP%]{flex-shrink:0;width:36px;height:36px;border:2px solid white;border-radius:8px;cursor:pointer}.current[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{opacity:0;width:100%;height:100%;padding:0;border:none;cursor:pointer}.current.big[_ngcontent-%COMP%]{width:48px;height:48px}.current-color[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}.current-color[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column;font-size:12px}.current-color[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:15px}.swatches[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:3px}.swatches[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{width:100%;color:var(--%NS%muted);font-size:12px;font-weight:600}.swatches[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:20px;height:20px;padding:0;border:1px solid rgba(0,0,0,.5);border-radius:4px;cursor:pointer}.swatches[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]{outline:2px solid var(--%NS%highlight);outline-offset:1px}.palette-head[_ngcontent-%COMP%]{display:flex;gap:4px;align-items:baseline}.grays[_ngcontent-%COMP%]{display:flex;gap:3px}.grays[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1;height:22px;padding:0;border:1px solid #000;border-radius:4px;cursor:pointer}.grays[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]{outline:2px solid var(--%NS%highlight);outline-offset:1px}.gray-slider[_ngcontent-%COMP%]{align-items:center}.gray-slider[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;padding:0}.gray-slider[_ngcontent-%COMP%]   .gray-value[_ngcontent-%COMP%]{width:22px;height:22px;border:1px solid #000;border-radius:4px}.face-buttons[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.face-actions[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:6px}.mirror[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{width:48px;font-size:16px}.atlas[_ngcontent-%COMP%]{max-width:100%;image-rendering:pixelated;background:repeating-conic-gradient(#555 0 25%,#444 0 50%) 0 0/8px 8px}`,`@media(min-width:701px){[_nghost-%COMP%]{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto minmax(0,1fr)}.d-top[_ngcontent-%COMP%]{grid-area:1/1/2/3}.stage[_ngcontent-%COMP%]{grid-area:2/1}.panel[_ngcontent-%COMP%]{grid-area:2/2}.big-face[_ngcontent-%COMP%]{top:16px;left:16px;bottom:16px;padding:0;gap:0;overflow:hidden;background:var(--%NS%panel)}.big-face[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{align-items:center;height:48px;flex-shrink:0;padding:0 8px 0 16px;border-bottom:1px solid var(--%NS%line)}}[_nghost-%COMP%]{--%NS%line: #2f3039}.d-top[_ngcontent-%COMP%]{grid-column:1/-1;display:flex;align-items:center;gap:12px;height:calc(52px + var(--%NS%safe-top));padding:var(--%NS%safe-top) 0 0 calc(12px + var(--%NS%safe-left));background:var(--%NS%panel);border-bottom:1px solid var(--%NS%border);overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none;touch-action:pan-x}.d-top[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.d-top[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex-shrink:0}.d-top[_ngcontent-%COMP%]:after{content:"";flex:0 0 calc(52px + var(--%NS%safe-right));align-self:stretch}.d-top[_ngcontent-%COMP%]   .back[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:6px 8px;border-radius:8px}.d-top[_ngcontent-%COMP%]   .back[_ngcontent-%COMP%]:hover{background:var(--%NS%surface)}.d-sep[_ngcontent-%COMP%]{width:1px;height:24px;background:var(--%NS%border)}.d-model[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;color:var(--%NS%muted)}.d-model[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{position:absolute;pointer-events:none}.d-model[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:first-child{left:10px}.d-model[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:last-child{right:8px;width:14px;height:14px}.d-model[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{appearance:none;height:36px;padding:0 30px 0 34px;border:none;background:var(--%NS%surface);color:#eceef4;font-size:14px;font-weight:600;cursor:pointer}.d-model[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:hover{background:#40424e}.d-save[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--%NS%muted);white-space:nowrap}.d-mode[_ngcontent-%COMP%]{flex:1;display:flex;justify-content:center}.d-mode[_ngcontent-%COMP%]   .mode-switch[_ngcontent-%COMP%]{width:300px}@media(min-width:1100px){.d-top[_ngcontent-%COMP%]{position:relative}.d-mode[_ngcontent-%COMP%]{position:absolute;left:50%;transform:translate(-50%)}}.history[_ngcontent-%COMP%]{margin-left:auto;display:flex;gap:4px}.btn.icon[_ngcontent-%COMP%], .btn.small[_ngcontent-%COMP%], .btn.accent[_ngcontent-%COMP%], .pair[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], .face-row[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], .block[_ngcontent-%COMP%] > .btn.outline[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;gap:6px}.btn.icon[_ngcontent-%COMP%]{width:32px;height:32px;padding:0;flex-shrink:0}.btn.small[_ngcontent-%COMP%]{height:28px;padding:0 8px;font-size:12px}.btn.ghost[_ngcontent-%COMP%]{background:none;border-color:transparent}.btn.ghost[_ngcontent-%COMP%]:hover:not(:disabled){background:var(--%NS%surface)}.btn.outline[_ngcontent-%COMP%]{background:none}.btn.accent[_ngcontent-%COMP%]{height:36px;padding:0 14px;border:none;background:var(--%NS%accent);color:#fff;font-weight:600}.btn.accent[_ngcontent-%COMP%]:hover:not(:disabled){background:#4a7eb5}.panel[_ngcontent-%COMP%]{width:340px;min-height:0;display:flex;flex-direction:column;overflow-y:auto;padding-right:var(--%NS%safe-right);background:var(--%NS%panel);border-left:1px solid var(--%NS%border)}.panel[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%]{margin:0 16px 16px}.block[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px;padding:0 16px 16px}.block[_ngcontent-%COMP%] + .block[_ngcontent-%COMP%]{border-top:1px solid var(--%NS%line)}.block[_ngcontent-%COMP%]:not([open]){padding-bottom:0}.block[_ngcontent-%COMP%] > summary[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;height:44px;flex-shrink:0;list-style:none;cursor:pointer}.block[_ngcontent-%COMP%] > summary[_ngcontent-%COMP%]::-webkit-details-marker{display:none}.block[_ngcontent-%COMP%] > summary[_ngcontent-%COMP%]   .chev[_ngcontent-%COMP%]{display:inline-flex;color:var(--%NS%muted);font-size:13px;transition:transform .15s}.block[_ngcontent-%COMP%] > summary[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{flex:1;min-width:0;font-size:13px;font-weight:600}.block[_ngcontent-%COMP%] > summary[_ngcontent-%COMP%]   .aside[_ngcontent-%COMP%]{font-size:12px;color:var(--%NS%muted)}.block[_ngcontent-%COMP%]:not([open]) > summary[_ngcontent-%COMP%]   .chev[_ngcontent-%COMP%]{transform:rotate(-90deg)}.block[_ngcontent-%COMP%]::details-content{display:flex;flex-direction:column;gap:10px}.prop[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;min-height:32px}.prop[_ngcontent-%COMP%] > .label[_ngcontent-%COMP%]{width:68px;flex-shrink:0;font-size:12px;color:var(--%NS%muted)}.prop[_ngcontent-%COMP%] > input[_ngcontent-%COMP%], .prop[_ngcontent-%COMP%] > .stepper[_ngcontent-%COMP%], .prop[_ngcontent-%COMP%] > .segmented[_ngcontent-%COMP%], .prop[_ngcontent-%COMP%] > .stepper-gap[_ngcontent-%COMP%]{flex:1;min-width:0}.prop[_ngcontent-%COMP%] > input[_ngcontent-%COMP%], .prop[_ngcontent-%COMP%] > .stepper[_ngcontent-%COMP%]{height:32px}.note[_ngcontent-%COMP%]{margin:0;font-size:12px;color:var(--%NS%muted)}.pair[_ngcontent-%COMP%]{display:flex;gap:8px}.pair[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{flex:1;height:32px}.shape-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px}.shape-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;height:32px;padding:0 10px;border:none;border-radius:8px;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer}.shape-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], .shape-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--%NS%muted)}.shape-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:12px;font-variant-numeric:tabular-nums}.shape-list[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:var(--%NS%surface)}.shape-list[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]{background:var(--%NS%accent-soft);color:#fff;font-weight:600}.shape-list[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:#9fc3ff}.segmented.faces[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:6px 0;font-size:11px}.face-row[_ngcontent-%COMP%]{display:flex;gap:6px}.face-row[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{height:32px;font-size:12px;white-space:nowrap}.face-row[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:not(.icon){flex:1;padding:0 6px}.block[_ngcontent-%COMP%] > .btn.outline[_ngcontent-%COMP%]{height:32px}.panel[_ngcontent-%COMP%]   .layer-tiles[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:64px;justify-content:center}.panel[_ngcontent-%COMP%]   .tools[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{height:52px;justify-content:center}.panel[_ngcontent-%COMP%]   .current.big[_ngcontent-%COMP%]{width:40px;height:40px}.panel[_ngcontent-%COMP%]   .swatches[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(10,1fr);gap:4px}.panel[_ngcontent-%COMP%]   .swatches[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{grid-column:1/-1;font-size:11px}.panel[_ngcontent-%COMP%]   .swatches[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:auto;height:24px;border-radius:5px}.shortcuts[_ngcontent-%COMP%]{position:sticky;bottom:0;margin-top:auto;display:flex;flex-wrap:wrap;gap:4px 12px;padding:10px 16px calc(10px + var(--%NS%safe-bottom, 0px));border-top:1px solid var(--%NS%line);background:var(--%NS%panel);font-size:11px;color:var(--%NS%muted)}.shortcuts[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{margin-right:4px;padding:1px 5px;border:1px solid var(--%NS%border);border-radius:4px;font:inherit;font-size:10px;font-weight:600}.view-hint[_ngcontent-%COMP%]{position:absolute;z-index:1;top:16px;left:16px;margin:0;display:inline-flex;align-items:center;gap:8px;height:32px;padding:0 12px;border:1px solid var(--%NS%border);border-radius:8px;background:#22232ae6;color:#b4b7c4;font-size:12px;pointer-events:none}.view-hint[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{color:var(--%NS%muted)}`,`@media(max-width:700px){[_nghost-%COMP%]{flex-direction:column;background:var(--%NS%panel)}.big-face[_ngcontent-%COMP%]{inset:0;width:auto;min-width:0;padding:56px 8px 8px;border:none;border-radius:0;box-shadow:none;background:var(--%NS%bg)}}.m-top[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;padding:calc(4px + var(--%NS%safe-top)) 56px 0 calc(8px + var(--%NS%safe-left));min-height:48px}.m-top[_ngcontent-%COMP%]   .back[_ngcontent-%COMP%]{padding:10px 8px;font-size:16px}.m-top[_ngcontent-%COMP%]   .history[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{width:44px;height:40px;font-size:20px}.m-title[_ngcontent-%COMP%]{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;padding:2px;border:none;background:none;color:inherit;font:inherit;cursor:pointer}.m-title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:16px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.m-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:11px}.m-mode[_ngcontent-%COMP%]{padding:6px 16px 10px}.m-mode[_ngcontent-%COMP%]   .mode-switch[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-height:40px}.m-overlay[_ngcontent-%COMP%]{position:absolute;z-index:3;top:10px;left:10px;right:10px;pointer-events:none}.m-overlay[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{pointer-events:auto}.chip[_ngcontent-%COMP%]{display:inline-flex;flex-direction:column;margin:0;padding:6px 10px;border-radius:8px;background:#22232ad9;color:#c8cad6;font-size:12px}.chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:10px;color:var(--%NS%muted)}.m-view-top[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}.view-toggle[_ngcontent-%COMP%]{display:flex;gap:2px;padding:3px;border-radius:10px;background:#22232ad9;border:1px solid var(--%NS%border)}.view-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-width:52px;min-height:36px;border:none;border-radius:8px;background:none;color:var(--%NS%muted);font:inherit;font-weight:600;cursor:pointer}.view-toggle[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]{background:var(--%NS%accent);color:#fff}.view-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled{opacity:.4}.selection-card[_ngcontent-%COMP%]{position:absolute;z-index:3;left:10px;right:10px;bottom:10px;display:flex;flex-direction:column;gap:8px;padding:10px;border-radius:14px;background:#22232af0;border:1px solid var(--%NS%border)}.sel-head[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.sel-head[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:15px}.sel-head[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%]{font-size:12px}.sel-head[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{min-height:36px}.nudges[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}.nudges[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;min-height:44px;padding:2px 0}.nudges[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:18px;line-height:1.2}.nudges[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:10px;color:#b4b7c4}.sel-actions[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}.sel-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{min-height:40px;padding:4px;font-size:13px}.tray[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;padding:10px 12px 8px;border-top:1px solid #3a3c48}.tray[_ngcontent-%COMP%]   .tools[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{min-height:48px}.tray[_ngcontent-%COMP%]   .tools[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:20px}.tray-colors[_ngcontent-%COMP%]{display:flex;align-items:center;gap:5px}.tray-colors[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]{width:44px;height:44px}.tray-colors[_ngcontent-%COMP%]   .swatch[_ngcontent-%COMP%]{flex:1;min-width:0;max-width:40px;height:36px;padding:0;border:1px solid rgba(0,0,0,.5);border-radius:8px;cursor:pointer}.tray-colors[_ngcontent-%COMP%]   .swatch.on[_ngcontent-%COMP%]{outline:2px solid var(--%NS%highlight);outline-offset:1px}.tray-colors[_ngcontent-%COMP%]   .palette-btn[_ngcontent-%COMP%]{flex-shrink:0;margin-left:auto;width:44px;height:44px;padding:0;font-size:20px}.m-nav[_ngcontent-%COMP%]{display:flex;gap:6px;padding:4px 12px calc(8px + var(--%NS%safe-bottom, 0px))}.m-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;min-height:52px;padding:4px;border:none;border-radius:12px;background:none;color:var(--%NS%muted);font:inherit;font-size:11px;font-weight:500;cursor:pointer}.m-nav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:20px;line-height:1.1}.m-nav[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]{background:var(--%NS%accent-soft);color:#9fc3ff}.sheet[_ngcontent-%COMP%]{position:absolute;z-index:10;left:0;right:0;bottom:0;max-height:72%;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;background:var(--%NS%panel);border-radius:18px 18px 0 0;box-shadow:0 -6px 24px #00000080;transition:transform .15s,height .22s ease}.sheet.dragging[_ngcontent-%COMP%]{transition:none}.sheet[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], .sheet[_ngcontent-%COMP%]   .primary[_ngcontent-%COMP%], .sheet[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .sheet[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .sheet[_ngcontent-%COMP%]   .stepper[_ngcontent-%COMP%]{min-height:44px}.sheet[_ngcontent-%COMP%]   .stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:30px}.sheet[_ngcontent-%COMP%]   .stepper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{min-height:0}.sheet[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]{min-height:44px}.sheet[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:46px;height:28px;min-height:0}.sheet[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:after{width:22px;height:22px}.sheet[_ngcontent-%COMP%]   .switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked:after{transform:translate(18px)}.sheet[_ngcontent-%COMP%]   .chips[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-height:40px}.sheet[_ngcontent-%COMP%]   .segmented[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-height:36px}.sheet[_ngcontent-%COMP%]   .layer-tiles[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-height:76px}.sheet[_ngcontent-%COMP%]   .swatches[_ngcontent-%COMP%]{gap:6px}.sheet[_ngcontent-%COMP%]   .swatches[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:calc((100% - 42px)/8);height:38px;border-radius:8px}.sheet[_ngcontent-%COMP%]   .grays[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:40px}.sheet-inner[_ngcontent-%COMP%]{padding:0 16px calc(20px + var(--%NS%safe-bottom, 0px))}.sheet-inner[_ngcontent-%COMP%], .sheet-body[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px}.sheet-top[_ngcontent-%COMP%]{position:sticky;top:0;z-index:1;flex-shrink:0;display:flex;flex-direction:column;align-items:center;margin:0 -16px;padding:0 16px 8px;background:var(--%NS%panel);touch-action:none;cursor:grab}.grip[_ngcontent-%COMP%]{align-self:stretch;display:flex;justify-content:center;padding:10px 0 8px}.grip[_ngcontent-%COMP%]:before{content:"";width:36px;height:5px;border-radius:3px;background:var(--%NS%border)}.sheet-head[_ngcontent-%COMP%]{align-self:stretch;display:flex;align-items:center;gap:8px}.sheet-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{flex:1;margin:0;font-size:18px}.sheet-head[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]{width:44px;padding:0;font-size:16px}.add-choices[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr;gap:10px}.add-choices[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:4px;padding:16px 8px}.add-choices[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:28px}.add-choices[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--%NS%muted);font-size:11px}`,`.sheet-in[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slide-up .26s cubic-bezier(.2,.8,.2,1)}.sheet-out[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slide-down .2s cubic-bezier(.4,0,1,1) forwards}.rise-in[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_rise .2s cubic-bezier(.2,.8,.2,1)}.sink-out[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_sink .14s cubic-bezier(.4,0,1,1) forwards}.drop-in[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_drop .2s cubic-bezier(.2,.8,.2,1)}.fade-in[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fade .18s ease-out}.fade-out[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fade .14s ease-in reverse forwards}.face-in[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_grow .2s cubic-bezier(.2,.8,.2,1)}.face-out[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_grow .14s cubic-bezier(.4,0,1,1) reverse forwards}@media(min-width:701px){.face-in[_ngcontent-%COMP%], .face-out[_ngcontent-%COMP%]{animation-name:_ngcontent-%COMP%_from-left}}.block[_ngcontent-%COMP%]{interpolate-size:allow-keywords}.block[_ngcontent-%COMP%]::details-content{block-size:0;overflow:hidden;transition:block-size .2s ease,content-visibility .2s allow-discrete}.block[open][_ngcontent-%COMP%]::details-content{block-size:auto}@keyframes _ngcontent-%COMP%_slide-up{0%{transform:translateY(100%)}}@keyframes _ngcontent-%COMP%_slide-down{to{transform:translateY(100%)}}@keyframes _ngcontent-%COMP%_rise{0%{opacity:0;transform:translateY(12px)}}@keyframes _ngcontent-%COMP%_sink{to{opacity:0;transform:translateY(12px)}}@keyframes _ngcontent-%COMP%_drop{0%{opacity:0;transform:translateY(-10px)}}@keyframes _ngcontent-%COMP%_fade{0%{opacity:0}}@keyframes _ngcontent-%COMP%_grow{0%{opacity:0;transform:scale(.96)}}@keyframes _ngcontent-%COMP%_from-left{0%{opacity:0;transform:translate(-16px)}}@media(prefers-reduced-motion:reduce){.sheet-in[_ngcontent-%COMP%], .sheet-out[_ngcontent-%COMP%], .rise-in[_ngcontent-%COMP%], .sink-out[_ngcontent-%COMP%], .drop-in[_ngcontent-%COMP%], .fade-in[_ngcontent-%COMP%], .fade-out[_ngcontent-%COMP%], .face-in[_ngcontent-%COMP%], .face-out[_ngcontent-%COMP%]{animation:none}.block[_ngcontent-%COMP%]::details-content{transition:none}}`]})};export{vr as $,Ut as A,lt as B,Qo as C,Tt as D,Si as E,dn as F,qe as G,nt as H,dt as I,ts as J,qn as K,gi as L,_l as M,bc as N,Un as O,bi as P,vi as Q,hn as R,Pc as S,Se as T,nu as U,ns as V,oa as W,un as X,ua as Y,vc as Z,Mc as _,Br as a,Ni as b,Di as c,Ei as d,wn as et,En as f,L as g,Jr as h,Bn as i,yc as it,Yf as j,Ur as k,Dt as l,Jn as m,Ar as n,wt as nt,Cn as o,Er as p,sm as q,At as r,xc as rt,Cr as s,$n as t,wr as tt,Ec as u,Mi as v,Sc as w,Or as x,Ne as y,ii as z};