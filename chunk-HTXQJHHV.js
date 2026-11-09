import{$a as li,Fa as dt,Fb as Bp,Ga as sn,Ha as rn,Ia as He,Ib as yr,Ja as Ue,Jb as Ra,Ka as Hp,Kb as zp,La as Jt,Ma as jt,N as je,Na as ai,Oa as ye,Pa as be,Qa as ji,Ra as ee,S as Le,Sa as oe,T as De,Ta as Qi,Ua as ft,Va as mn,W as fr,Wa as zt,Xa as ct,Ya as K,Za as mr,_a as gr,a as Ve,ab as ut,b as ht,ba as rt,bb as xr,c as rh,cb as V,db as yt,eb as Ct,fb as Di,g as Ip,ga as Ji,gb as Up,h as Lp,hb as oh,ia as wt,ib as wa,ja as Np,jb as Ca,kb as ci,lb as Ni,mb as kp,na as Op,nb as es,pb as Tt,ra as Fp,rb as ui,sa as H,t as Ws,tb as ln,ub as Nt,vb as qs,w as Dp,za as Tn}from"./chunk-YUXTISIO.js";var Sf=0,Hh=1,wf=2;var tr=1,Cf=2,Jr=3,$n=0,wn=1,Gt=2,nr=0,Cs=1,Ln=2,Uh=3,kh=4,Rf=5;var ir=100,Af=101,Pf=102,If=103,Lf=104,Df=200,Nf=201,Of=202,Ff=203,Bh=204,zh=205,Hf=206,Uf=207,kf=208,Bf=209,zf=210,Gf=211,Vf=212,Wf=213,qf=214,sl=0,rl=1,ol=2,kr=3,al=4,ll=5,cl=6,ul=7,Jo=0,Xf=1,Yf=2,zi=0,Gh=1,Vh=2,Wh=3,qh=4,Xh=5,Yh=6,Kh=7;var Zh=300,sr=301,jr=302,Nl=303,Ol=304,ls=1e3,Fi=1001,hl=1002,Wt=1003,Kf=1004;var jo=1005;var Sn=1006,Fl=1007;var pi=1008;var qn=1009,$h=1010,Jh=1011,Qr=1012,Hl=1013,Ri=1014,fi=1015,on=1016,Ul=1017,kl=1018,rr=1020,jh=35902,Qh=35899,ed=1021,td=1022,Jn=1023,cs=1026,hs=1027,Bl=1028,zl=1029,Rs=1030,Gl=1031;var Vl=1033,Qo=33776,ea=33777,ta=33778,na=33779,Wl=35840,ql=35841,Xl=35842,Yl=35843,Kl=36196,Zl=37492,$l=37496,Jl=37488,jl=37489,ia=37490,Ql=37491,ec=37808,tc=37809,nc=37810,ic=37811,sc=37812,rc=37813,oc=37814,ac=37815,lc=37816,cc=37817,uc=37818,hc=37819,dc=37820,pc=37821,fc=36492,mc=36494,gc=36495,xc=36283,yc=36284,sa=36285,_c=36286;var Po=2300,dl=2301,tl=2302,Ah=2303,Ph=2400,Ih=2401,Lh=2402;var Zf=3200;var ra=0,$f=1,Ai="",pt="srgb",Io="srgb-linear",Lo="linear",Pt="srgb";var nl=7680;var Jf=519,jf=512,Qf=513,em=514,nd=515,tm=516,nm=517,id=518,sd=519,rd=35044,It=35048;var od="300 es",di=2e3,Br=2001;function a_(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function l_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function zr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function im(){let s=zr("canvas");return s.style.display="block",s}var Gp={},Gr=null;function Do(...s){let e="THREE."+s.shift();Gr?Gr("log",e,...s):console.log(e,...s)}function sm(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ye(...s){s=sm(s);let e="THREE."+s.shift();if(Gr)Gr("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Je(...s){s=sm(s);let e="THREE."+s.shift();if(Gr)Gr("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Co(...s){let e=s.join(" ");e in Gp||(Gp[e]=!0,Ye(...s))}function rm(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var om={[sl]:sl,[ol]:cl,[al]:al,[kr]:ll,[rl]:rl,[cl]:ol,[ul]:ul,[ll]:kr},Hi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},On=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vp=1234567,Ro=Math.PI/180,Vr=180/Math.PI;function As(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(On[s&255]+On[s>>8&255]+On[s>>16&255]+On[s>>24&255]+"-"+On[e&255]+On[e>>8&255]+"-"+On[e>>16&15|64]+On[e>>24&255]+"-"+On[t&63|128]+On[t>>8&255]+"-"+On[t>>16&255]+On[t>>24&255]+On[n&255]+On[n>>8&255]+On[n>>16&255]+On[n>>24&255]).toLowerCase()}function Et(s,e,t){return Math.max(e,Math.min(t,s))}function ad(s,e){return(s%e+e)%e}function c_(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function u_(s,e,t){return s!==e?(t-s)/(e-s):0}function Ao(s,e,t){return(1-t)*s+t*e}function h_(s,e,t,n){return Ao(s,e,1-Math.exp(-t*n))}function d_(s,e=1){return e-Math.abs(ad(s,e*2)-e)}function p_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function f_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function m_(s,e){return s+Math.floor(Math.random()*(e-s+1))}function g_(s,e){return s+Math.random()*(e-s)}function x_(s){return s*(.5-Math.random())}function y_(s){s!==void 0&&(Vp=s);let e=Vp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function __(s){return s*Ro}function E_(s){return s*Vr}function v_(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function b_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ld(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function T_(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),f=o((n-e)/2);switch(i){case"XYX":s.set(a*u,l*h,l*d,a*c);break;case"YZY":s.set(l*d,a*u,l*h,a*c);break;case"ZXZ":s.set(l*h,l*d,a*u,a*c);break;case"XZX":s.set(a*u,l*f,l*p,a*c);break;case"YXY":s.set(l*p,a*u,l*f,a*c);break;case"ZYZ":s.set(l*f,l*p,a*u,a*c);break;default:Ye("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ec(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function cd(s,e){if(e.constructor===Float32Array)return s;let t=Ec(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/t,-1)}function ud(s,e){if(e.constructor===Float32Array)return s;let t=Ec(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*t)}var F={DEG2RAD:Ro,RAD2DEG:Vr,generateUUID:As,clamp:Et,euclideanModulo:ad,mapLinear:c_,inverseLerp:u_,lerp:Ao,damp:h_,pingpong:d_,smoothstep:p_,smootherstep:f_,randInt:m_,randFloat:g_,randFloatSpread:x_,seededRandom:y_,degToRad:__,radToDeg:E_,isPowerOfTwo:v_,ceilPowerOfTwo:b_,floorPowerOfTwo:ld,setQuaternionFromProperEuler:T_,normalize:ud,denormalize:cd},_e=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Et(this.x,e.x,t.x),this.y=Et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Et(this.x,e,t),this.y=Et(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ot=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=r[o+0],p=r[o+1],f=r[o+2],_=r[o+3];if(h!==_||l!==d||c!==p||u!==f){let m=l*d+c*p+u*f+h*_;m<0&&(d=-d,p=-p,f=-f,_=-_,m=-m);let g=1-a;if(m<.9995){let b=Math.acos(m),C=Math.sin(b);g=Math.sin(g*b)/C,a=Math.sin(a*b)/C,l=l*g+d*a,c=c*g+p*a,u=u*g+f*a,h=h*g+_*a}else{l=l*g+d*a,c=c*g+p*a,u=u*g+f*a,h=h*g+_*a;let b=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=b,c*=b,u*=b,h*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[o],d=r[o+1],p=r[o+2],f=r[o+3];return e[t]=a*f+u*h+l*p-c*d,e[t+1]=l*f+u*d+c*h-a*p,e[t+2]=c*f+u*p+a*d-l*h,e[t+3]=u*f-a*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(r/2),d=l(n/2),p=l(i/2),f=l(r/2);switch(o){case"XYZ":this._x=d*u*h+c*p*f,this._y=c*p*h-d*u*f,this._z=c*u*f+d*p*h,this._w=c*u*h-d*p*f;break;case"YXZ":this._x=d*u*h+c*p*f,this._y=c*p*h-d*u*f,this._z=c*u*f-d*p*h,this._w=c*u*h+d*p*f;break;case"ZXY":this._x=d*u*h-c*p*f,this._y=c*p*h+d*u*f,this._z=c*u*f+d*p*h,this._w=c*u*h-d*p*f;break;case"ZYX":this._x=d*u*h-c*p*f,this._y=c*p*h+d*u*f,this._z=c*u*f-d*p*h,this._w=c*u*h+d*p*f;break;case"YZX":this._x=d*u*h+c*p*f,this._y=c*p*h+d*u*f,this._z=c*u*f-d*p*h,this._w=c*u*h-d*p*f;break;case"XZY":this._x=d*u*h-c*p*f,this._y=c*p*h-d*u*f,this._z=c*u*f+d*p*h,this._w=c*u*h+d*p*f;break;default:Ye("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-i)*p}else if(n>a&&n>h){let p=2*Math.sqrt(1+n-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+c)/p}else if(a>h){let p=2*Math.sqrt(1+a-n-h);this._w=(r-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+h-n-a);this._w=(o-i)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Et(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-r*l,this._y=i*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-r*i),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=i+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Et(this.x,e.x,t.x),this.y=Et(this.y,e.y,t.y),this.z=Et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Et(this.x,e,t),this.y=Et(this.y,e,t),this.z=Et(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ah.copy(this).projectOnVector(e),this.sub(ah)}reflect(e){return this.sub(ah.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ah=new w,Wp=new Ot,Qe=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,i,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],p=n[5],f=n[8],_=i[0],m=i[3],g=i[6],b=i[1],C=i[4],T=i[7],A=i[2],P=i[5],y=i[8];return r[0]=o*_+a*b+l*A,r[3]=o*m+a*C+l*P,r[6]=o*g+a*T+l*y,r[1]=c*_+u*b+h*A,r[4]=c*m+u*C+h*P,r[7]=c*g+u*T+h*y,r[2]=d*_+p*b+f*A,r[5]=d*m+p*C+f*P,r[8]=d*g+p*T+f*y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*r,p=c*r-o*l,f=t*h+n*d+i*p;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/f;return e[0]=h*_,e[1]=(i*c-u*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(u*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=p*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Co("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(lh.makeScale(e,t)),this}rotate(e){return Co("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(lh.makeRotation(-e)),this}translate(e,t){return Co("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(lh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},lh=new Qe,qp=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xp=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function M_(){let s={enabled:!0,workingColorSpace:Io,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Pt&&(i.r=as(i.r),i.g=as(i.g),i.b=as(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Pt&&(i.r=Ur(i.r),i.g=Ur(i.g),i.b=Ur(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ai?Lo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Io]:{primaries:e,whitePoint:n,transfer:Lo,toXYZ:qp,fromXYZ:Xp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:pt},outputColorSpaceConfig:{drawingBufferColorSpace:pt}},[pt]:{primaries:e,whitePoint:n,transfer:Pt,toXYZ:qp,fromXYZ:Xp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:pt}}}),s}var _t=M_();function as(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ur(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var _r,pl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{_r===void 0&&(_r=zr("canvas")),_r.width=e.width,_r.height=e.height;let i=_r.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=_r}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=zr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=as(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(as(t[n]/255)*255):t[n]=as(t[n]);return{data:t,width:e.width,height:e.height}}else return Ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},S_=0,Wr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:S_++}),this.uuid=As(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(ch(i[o].image)):r.push(ch(i[o]))}else r=ch(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function ch(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?pl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ye("Texture: Unable to serialize Texture."),{})}var w_=0,uh=new w,Hn=class s extends Hi{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Fi,i=Fi,r=Sn,o=pi,a=Jn,l=qn,c=s.DEFAULT_ANISOTROPY,u=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:w_++}),this.uuid=As(),this.name="",this.source=new Wr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new _e(0,0),this.repeat=new _e(1,1),this.center=new _e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(uh).x}get height(){return this.source.getSize(uh).y}get depth(){return this.source.getSize(uh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ye(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ls:e.x=e.x-Math.floor(e.x);break;case Fi:e.x=e.x<0?0:1;break;case hl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ls:e.y=e.y-Math.floor(e.y);break;case Fi:e.y=e.y<0?0:1;break;case hl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Hn.DEFAULT_IMAGE=null;Hn.DEFAULT_MAPPING=Zh;Hn.DEFAULT_ANISOTROPY=1;var kt=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],p=l[5],f=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(f-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(f+m)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let C=(c+1)/2,T=(p+1)/2,A=(g+1)/2,P=(u+d)/4,y=(h+_)/4,M=(f+m)/4;return C>T&&C>A?C<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(C),i=P/n,r=y/n):T>A?T<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(T),n=P/i,r=M/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=y/r,i=M/r),this.set(n,i,r,t),this}let b=Math.sqrt((m-f)*(m-f)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(m-f)/b,this.y=(h-_)/b,this.z=(d-u)/b,this.w=Math.acos((c+p+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Et(this.x,e.x,t.x),this.y=Et(this.y,e.y,t.y),this.z=Et(this.z,e.z,t.z),this.w=Et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Et(this.x,e,t),this.y=Et(this.y,e,t),this.z=Et(this.z,e,t),this.w=Et(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},fl=class extends Hi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new kt(0,0,e,t),this.scissorTest=!1,this.viewport=new kt(0,0,e,t),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new Hn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Sn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Wr(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qt=class extends fl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},No=class extends Hn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ml=class extends Hn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ie=class s{static{this.prototype.isMatrix4=!0}constructor(e,t,n,i,r,o,a,l,c,u,h,d,p,f,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,u,h,d,p,f,_,m)}set(e,t,n,i,r,o,a,l,c,u,h,d,p,f,_,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=u,g[10]=h,g[14]=d,g[3]=p,g[7]=f,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/Er.setFromMatrixColumn(e,0).length(),r=1/Er.setFromMatrixColumn(e,1).length(),o=1/Er.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=o*u,p=o*h,f=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+f*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=f+p*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*u,p=l*h,f=c*u,_=c*h;t[0]=d+_*a,t[4]=f*a-p,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=p*a-f,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*u,p=l*h,f=c*u,_=c*h;t[0]=d-_*a,t[4]=-o*h,t[8]=f+p*a,t[1]=p+f*a,t[5]=o*u,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*u,p=o*h,f=a*u,_=a*h;t[0]=l*u,t[4]=f*c-p,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=p*c-f,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,p=o*c,f=a*l,_=a*c;t[0]=l*u,t[4]=_-d*h,t[8]=f*h+p,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*h+f,t[10]=d-_*h}else if(e.order==="XZY"){let d=o*l,p=o*c,f=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=o*u,t[9]=p*h-f,t[2]=f*h-p,t[6]=a*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(C_,e,R_)}lookAt(e,t,n){let i=this.elements;return Yn.subVectors(e,t),Yn.lengthSq()===0&&(Yn.z=1),Yn.normalize(),gs.crossVectors(n,Yn),gs.lengthSq()===0&&(Math.abs(n.z)===1?Yn.x+=1e-4:Yn.z+=1e-4,Yn.normalize(),gs.crossVectors(n,Yn)),gs.normalize(),Aa.crossVectors(Yn,gs),i[0]=gs.x,i[4]=Aa.x,i[8]=Yn.x,i[1]=gs.y,i[5]=Aa.y,i[9]=Yn.y,i[2]=gs.z,i[6]=Aa.z,i[10]=Yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],p=n[13],f=n[2],_=n[6],m=n[10],g=n[14],b=n[3],C=n[7],T=n[11],A=n[15],P=i[0],y=i[4],M=i[8],G=i[12],N=i[1],O=i[5],W=i[9],$=i[13],D=i[2],X=i[6],ie=i[10],z=i[14],ce=i[3],Z=i[7],se=i[11],le=i[15];return r[0]=o*P+a*N+l*D+c*ce,r[4]=o*y+a*O+l*X+c*Z,r[8]=o*M+a*W+l*ie+c*se,r[12]=o*G+a*$+l*z+c*le,r[1]=u*P+h*N+d*D+p*ce,r[5]=u*y+h*O+d*X+p*Z,r[9]=u*M+h*W+d*ie+p*se,r[13]=u*G+h*$+d*z+p*le,r[2]=f*P+_*N+m*D+g*ce,r[6]=f*y+_*O+m*X+g*Z,r[10]=f*M+_*W+m*ie+g*se,r[14]=f*G+_*$+m*z+g*le,r[3]=b*P+C*N+T*D+A*ce,r[7]=b*y+C*O+T*X+A*Z,r[11]=b*M+C*W+T*ie+A*se,r[15]=b*G+C*$+T*z+A*le,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],f=e[3],_=e[7],m=e[11],g=e[15],b=l*p-c*d,C=a*p-c*h,T=a*d-l*h,A=o*p-c*u,P=o*d-l*u,y=o*h-a*u;return t*(_*b-m*C+g*T)-n*(f*b-m*A+g*P)+i*(f*C-_*A+g*y)-r*(f*T-_*P+m*y)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return t*(o*u-a*c)-n*(r*u-a*l)+i*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],f=e[12],_=e[13],m=e[14],g=e[15],b=t*a-n*o,C=t*l-i*o,T=t*c-r*o,A=n*l-i*a,P=n*c-r*a,y=i*c-r*l,M=u*_-h*f,G=u*m-d*f,N=u*g-p*f,O=h*m-d*_,W=h*g-p*_,$=d*g-p*m,D=b*$-C*W+T*O+A*N-P*G+y*M;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let X=1/D;return e[0]=(a*$-l*W+c*O)*X,e[1]=(i*W-n*$-r*O)*X,e[2]=(_*y-m*P+g*A)*X,e[3]=(d*P-h*y-p*A)*X,e[4]=(l*N-o*$-c*G)*X,e[5]=(t*$-i*N+r*G)*X,e[6]=(m*T-f*y-g*C)*X,e[7]=(u*y-d*T+p*C)*X,e[8]=(o*W-a*N+c*M)*X,e[9]=(n*N-t*W-r*M)*X,e[10]=(f*P-_*T+g*b)*X,e[11]=(h*T-u*P-p*b)*X,e[12]=(a*G-o*O-l*M)*X,e[13]=(t*O-n*G+i*M)*X,e[14]=(_*C-f*A-m*b)*X,e[15]=(u*A-h*C+d*b)*X,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,d=r*c,p=r*u,f=r*h,_=o*u,m=o*h,g=a*h,b=l*c,C=l*u,T=l*h,A=n.x,P=n.y,y=n.z;return i[0]=(1-(_+g))*A,i[1]=(p+T)*A,i[2]=(f-C)*A,i[3]=0,i[4]=(p-T)*P,i[5]=(1-(d+g))*P,i[6]=(m+b)*P,i[7]=0,i[8]=(f+C)*y,i[9]=(m-b)*y,i[10]=(1-(d+_))*y,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Er.set(i[0],i[1],i[2]).length(),a=Er.set(i[4],i[5],i[6]).length(),l=Er.set(i[8],i[9],i[10]).length();r<0&&(o=-o),_i.copy(this);let c=1/o,u=1/a,h=1/l;return _i.elements[0]*=c,_i.elements[1]*=c,_i.elements[2]*=c,_i.elements[4]*=u,_i.elements[5]*=u,_i.elements[6]*=u,_i.elements[8]*=h,_i.elements[9]*=h,_i.elements[10]*=h,t.setFromRotationMatrix(_i),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,i,r,o,a=di,l=!1){let c=this.elements,u=2*r/(t-e),h=2*r/(n-i),d=(t+e)/(t-e),p=(n+i)/(n-i),f,_;if(l)f=r/(o-r),_=o*r/(o-r);else if(a===di)f=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Br)f=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=di,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-i),d=-(t+e)/(t-e),p=-(n+i)/(n-i),f,_;if(l)f=1/(o-r),_=o/(o-r);else if(a===di)f=-2/(o-r),_=-(o+r)/(o-r);else if(a===Br)f=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=f,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Er=new w,_i=new Ie,C_=new w(0,0,0),R_=new w(1,1,1),gs=new w,Aa=new w,Yn=new w,Yp=new Ie,Kp=new Ot,Un=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(Et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Et(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ye("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kp.setFromEuler(this),this.setFromQuaternion(Kp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Un.DEFAULT_ORDER="XYZ";var qr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},A_=0,Zp=new w,vr=new Ot,ts=new Ie,Pa=new w,xo=new w,P_=new w,I_=new Ot,$p=new w(1,0,0),Jp=new w(0,1,0),jp=new w(0,0,1),Qp={type:"added"},L_={type:"removed"},br={type:"childadded",child:null},hh={type:"childremoved",child:null},In=class s extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:A_++}),this.uuid=As(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new w,t=new Un,n=new Ot,i=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ie},normalMatrix:{value:new Qe}}),this.matrix=new Ie,this.matrixWorld=new Ie,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vr.setFromAxisAngle(e,t),this.quaternion.multiply(vr),this}rotateOnWorldAxis(e,t){return vr.setFromAxisAngle(e,t),this.quaternion.premultiply(vr),this}rotateX(e){return this.rotateOnAxis($p,e)}rotateY(e){return this.rotateOnAxis(Jp,e)}rotateZ(e){return this.rotateOnAxis(jp,e)}translateOnAxis(e,t){return Zp.copy(e).applyQuaternion(this.quaternion),this.position.add(Zp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($p,e)}translateY(e){return this.translateOnAxis(Jp,e)}translateZ(e){return this.translateOnAxis(jp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ts.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Pa.copy(e):Pa.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),xo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ts.lookAt(xo,Pa,this.up):ts.lookAt(Pa,xo,this.up),this.quaternion.setFromRotationMatrix(ts),i&&(ts.extractRotation(i.matrixWorld),vr.setFromRotationMatrix(ts),this.quaternion.premultiply(vr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qp),br.child=e,this.dispatchEvent(br),br.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(L_),hh.child=e,this.dispatchEvent(hh),hh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ts.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ts.multiply(e.parent.matrixWorld)),e.applyMatrix4(ts),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qp),br.child=e,this.dispatchEvent(br),br.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xo,e,P_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xo,I_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>ht(Ve({},a),{boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>Ve({},a)),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),f=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),f.length>0&&(n.nodes=f)}return n.object=i,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};In.DEFAULT_UP=new w(0,1,0);In.DEFAULT_MATRIX_AUTO_UPDATE=!0;In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Pn=class extends In{constructor(){super(),this.isGroup=!0,this.type="Group"}},D_={type:"move"},Xr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,f=.005;c.inputState.pinching&&d>p+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(D_)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Pn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},am={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xs={h:0,s:0,l:0},Ia={h:0,s:0,l:0};function dh(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var x=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=_t.workingColorSpace){if(e=ad(e,1),t=Et(t,0,1),n=Et(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=dh(o,r,e+1/3),this.g=dh(o,r,e),this.b=dh(o,r,e-1/3)}return _t.colorSpaceToWorking(this,i),this}setStyle(e,t=pt){function n(r){r!==void 0&&parseFloat(r)<1&&Ye("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ye("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ye("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pt){let n=am[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ye("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=as(e.r),this.g=as(e.g),this.b=as(e.b),this}copyLinearToSRGB(e){return this.r=Ur(e.r),this.g=Ur(e.g),this.b=Ur(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pt){return _t.workingToColorSpace(Fn.copy(this),e),Math.round(Et(Fn.r*255,0,255))*65536+Math.round(Et(Fn.g*255,0,255))*256+Math.round(Et(Fn.b*255,0,255))}getHexString(e=pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(Fn.copy(this),t);let n=Fn.r,i=Fn.g,r=Fn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(Fn.copy(this),t),e.r=Fn.r,e.g=Fn.g,e.b=Fn.b,e}getStyle(e=pt){_t.workingToColorSpace(Fn.copy(this),e);let t=Fn.r,n=Fn.g,i=Fn.b;return e!==pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(xs),this.setHSL(xs.h+e,xs.s+t,xs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xs),e.getHSL(Ia);let n=Ao(xs.h,Ia.h,t),i=Ao(xs.s,Ia.s,t),r=Ao(xs.l,Ia.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fn=new x;x.NAMES=am;var Oo=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new x(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ti=class extends In{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ei=new w,ns=new w,ph=new w,is=new w,Tr=new w,Mr=new w,ef=new w,fh=new w,mh=new w,gh=new w,xh=new kt,yh=new kt,_h=new kt,os=class s{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ei.subVectors(e,t),i.cross(Ei);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Ei.subVectors(i,t),ns.subVectors(n,t),ph.subVectors(e,t);let o=Ei.dot(Ei),a=Ei.dot(ns),l=Ei.dot(ph),c=ns.dot(ns),u=ns.dot(ph),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;let d=1/h,p=(c*l-a*u)*d,f=(o*u-a*l)*d;return r.set(1-p-f,f,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,is)===null?!1:is.x>=0&&is.y>=0&&is.x+is.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,is)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,is.x),l.addScaledVector(o,is.y),l.addScaledVector(a,is.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return xh.setScalar(0),yh.setScalar(0),_h.setScalar(0),xh.fromBufferAttribute(e,t),yh.fromBufferAttribute(e,n),_h.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(xh,r.x),o.addScaledVector(yh,r.y),o.addScaledVector(_h,r.z),o}static isFrontFacing(e,t,n,i){return Ei.subVectors(n,t),ns.subVectors(e,t),Ei.cross(ns).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ei.subVectors(this.c,this.b),ns.subVectors(this.a,this.b),Ei.cross(ns).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Tr.subVectors(i,n),Mr.subVectors(r,n),fh.subVectors(e,n);let l=Tr.dot(fh),c=Mr.dot(fh);if(l<=0&&c<=0)return t.copy(n);mh.subVectors(e,i);let u=Tr.dot(mh),h=Mr.dot(mh);if(u>=0&&h<=u)return t.copy(i);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0&&l-u>0)return o=l/(l-u),t.copy(n).addScaledVector(Tr,o);gh.subVectors(e,r);let p=Tr.dot(gh),f=Mr.dot(gh);if(f>=0&&p<=f)return t.copy(r);let _=p*c-l*f;if(_<=0&&c>=0&&f<=0)return a=c/(c-f),t.copy(n).addScaledVector(Mr,a);let m=u*f-p*h;if(m<=0&&h-u>=0&&p-f>=0)return ef.subVectors(r,i),a=(h-u)/(h-u+(p-f)),t.copy(i).addScaledVector(ef,a);let g=1/(m+_+d);return o=_*g,a=d*g,t.copy(n).addScaledVector(Tr,o).addScaledVector(Mr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},nn=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=vi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,vi):vi.fromBufferAttribute(r,o),vi.applyMatrix4(e.matrixWorld),this.expandByPoint(vi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),La.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),La.copy(n.boundingBox)),La.applyMatrix4(e.matrixWorld),this.union(La)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vi),vi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(yo),Da.subVectors(this.max,yo),Sr.subVectors(e.a,yo),wr.subVectors(e.b,yo),Cr.subVectors(e.c,yo),ys.subVectors(wr,Sr),_s.subVectors(Cr,wr),Xs.subVectors(Sr,Cr);let t=[0,-ys.z,ys.y,0,-_s.z,_s.y,0,-Xs.z,Xs.y,ys.z,0,-ys.x,_s.z,0,-_s.x,Xs.z,0,-Xs.x,-ys.y,ys.x,0,-_s.y,_s.x,0,-Xs.y,Xs.x,0];return!Eh(t,Sr,wr,Cr,Da)||(t=[1,0,0,0,1,0,0,0,1],!Eh(t,Sr,wr,Cr,Da))?!1:(Na.crossVectors(ys,_s),t=[Na.x,Na.y,Na.z],Eh(t,Sr,wr,Cr,Da))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ss[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ss[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ss[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ss[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ss[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ss[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ss[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ss[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ss),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ss=[new w,new w,new w,new w,new w,new w,new w,new w],vi=new w,La=new nn,Sr=new w,wr=new w,Cr=new w,ys=new w,_s=new w,Xs=new w,yo=new w,Da=new w,Na=new w,Ys=new w;function Eh(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Ys.fromArray(s,r);let a=i.x*Math.abs(Ys.x)+i.y*Math.abs(Ys.y)+i.z*Math.abs(Ys.z),l=e.dot(Ys),c=t.dot(Ys),u=n.dot(Ys);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var cn=new w,Oa=new _e,N_=0,un=class extends Hi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:N_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=rd,this.updateRanges=[],this.gpuType=fi,this.version=0,this._normalizationScale=e!==void 0?Ec(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Oa.fromBufferAttribute(this,t),Oa.applyMatrix3(e),this.setXY(t,Oa.x,Oa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix3(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix4(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyNormalMatrix(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.transformDirection(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):cd(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):ud(e,this.array)}};var Fo=class extends un{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ho=class extends un{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Yt=class extends un{constructor(e,t,n){super(new Float32Array(e),t,n)}},O_=new nn,_o=new w,vh=new w,Mi=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):O_.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_o.subVectors(e,this.center);let t=_o.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(_o,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_o.copy(e.center).add(vh)),this.expandByPoint(_o.copy(e.center).sub(vh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},F_=0,hi=new Ie,bh=new In,Rr=new w,Kn=new nn,Eo=new nn,Mn=new w,hn=class s extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:F_++}),this.uuid=As(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(a_(e)?Ho:Fo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,t,n){return hi.makeTranslation(e,t,n),this.applyMatrix4(hi),this}scale(e,t,n){return hi.makeScale(e,t,n),this.applyMatrix4(hi),this}lookAt(e){return bh.lookAt(e),bh.updateMatrix(),this.applyMatrix4(bh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rr).negate(),this.translate(Rr.x,Rr.y,Rr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Yt(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Kn.setFromBufferAttribute(r),this.morphTargetsRelative?(Mn.addVectors(this.boundingBox.min,Kn.min),this.boundingBox.expandByPoint(Mn),Mn.addVectors(this.boundingBox.max,Kn.max),this.boundingBox.expandByPoint(Mn)):(this.boundingBox.expandByPoint(Kn.min),this.boundingBox.expandByPoint(Kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){let n=this.boundingSphere.center;if(Kn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Eo.setFromBufferAttribute(a),this.morphTargetsRelative?(Mn.addVectors(Kn.min,Eo.min),Kn.expandByPoint(Mn),Mn.addVectors(Kn.max,Eo.max),Kn.expandByPoint(Mn)):(Kn.expandByPoint(Eo.min),Kn.expandByPoint(Eo.max))}Kn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Mn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Mn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Mn.fromBufferAttribute(a,c),l&&(Rr.fromBufferAttribute(e,c),Mn.add(Rr)),i=Math.max(i,n.distanceToSquared(Mn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new un(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let G=0;G<n.count;G++)a[G]=new w,l[G]=new w;let u=new w,h=new w,d=new w,p=new _e,f=new _e,_=new _e,m=new w,g=new w;function b(G,N,O){c[G]=c[N]=c[O]=1,u.fromBufferAttribute(n,G),h.fromBufferAttribute(n,N),d.fromBufferAttribute(n,O),p.fromBufferAttribute(r,G),f.fromBufferAttribute(r,N),_.fromBufferAttribute(r,O),h.sub(u),d.sub(u),f.sub(p),_.sub(p);let W=1/(f.x*_.y-_.x*f.y);isFinite(W)&&(m.copy(h).multiplyScalar(_.y).addScaledVector(d,-f.y).multiplyScalar(W),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-_.x).multiplyScalar(W),a[G].add(m),a[N].add(m),a[O].add(m),l[G].add(g),l[N].add(g),l[O].add(g))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let G=0,N=C.length;G<N;++G){let O=C[G],W=O.start,$=O.count;for(let D=W,X=W+$;D<X;D+=3)b(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let T=new w,A=new w,P=new w,y=new w;function M(G){P.fromBufferAttribute(i,G),y.copy(P);let N=a[G];T.copy(N),T.sub(P.multiplyScalar(P.dot(N))).normalize(),A.crossVectors(y,N);let W=A.dot(l[G])<0?-1:1;o.setXYZW(G,T.x,T.y,T.z,W)}for(let G=0,N=n.count;G<N;++G)c[G]&&M(G);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new un(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new w,r=new w,o=new w,a=new w,l=new w,c=new w,u=new w,h=new w;if(e)for(let d=0,p=e.count;d<p;d+=3){let f=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,f),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,f),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(f,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mn.fromBufferAttribute(e,t),Mn.normalize(),e.setXYZ(t,Mn.x,Mn.y,Mn.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u),p=0,f=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let g=0;g<u;g++)d[f++]=c[p++]}return new un(d,u,h)}if(this.index===null)return Ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){let d=c[u],p=e(d,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(i[l]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let u=i[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Uo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=rd,this.updateRanges=[],this.version=0,this.uuid=As()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=tf(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=tf(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function tf(s){return s.buffer._uuid===void 0&&(s.buffer._uuid=As()),s.byteOffset===0&&s.byteLength===s.buffer.byteLength?s.buffer._uuid:s.buffer._uuid+":"+s.byteOffset+":"+s.byteLength}var Gn=new w,Yr=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i,this._normalizationScale=e!==void 0?Ec(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.applyMatrix4(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.applyNormalMatrix(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.transformDirection(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Do("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new un(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Do("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):cd(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):ud(e,this.data.array)}},Th=new w,H_=new w,U_=new Qe,bi=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Th.subVectors(n,t).cross(H_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Th),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||U_.getNormalMatrix(e),i=this.coplanarPoint(Th).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},k_=0,Si=class extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=As(),this.name="",this.type="Material",this.blending=Cs,this.side=$n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bh,this.blendDst=zh,this.blendEquation=ir,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new x(0,0,0),this.blendAlpha=0,this.depthFunc=kr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nl,this.stencilZFail=nl,this.stencilZPass=nl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ye(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ye(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new x().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new bi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new _e().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _e().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ui=class extends Si{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new x(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ar,vo=new w,Pr=new w,Ir=new w,Lr=new _e,bo=new _e,lm=new Ie,Fa=new w,To=new w,Ha=new w,nf=new _e,Mh=new _e,sf=new _e,us=class extends In{constructor(e=new Ui){if(super(),this.isSprite=!0,this.type="Sprite",Ar===void 0){Ar=new hn;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Uo(t,5);Ar.setIndex([0,1,2,0,2,3]),Ar.setAttribute("position",new Yr(n,3,0,!1)),Ar.setAttribute("uv",new Yr(n,2,3,!1))}this.geometry=Ar,this.material=e,this.center=new _e(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Je('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pr.setFromMatrixScale(this.matrixWorld),lm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ir.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pr.multiplyScalar(-Ir.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;Ua(Fa.set(-.5,-.5,0),Ir,o,Pr,i,r),Ua(To.set(.5,-.5,0),Ir,o,Pr,i,r),Ua(Ha.set(.5,.5,0),Ir,o,Pr,i,r),nf.set(0,0),Mh.set(1,0),sf.set(1,1);let a=e.ray.intersectTriangle(Fa,To,Ha,!1,vo);if(a===null&&(Ua(To.set(-.5,.5,0),Ir,o,Pr,i,r),Mh.set(0,1),a=e.ray.intersectTriangle(Fa,Ha,To,!1,vo),a===null))return;let l=e.ray.origin.distanceTo(vo);l<e.near||l>e.far||t.push({distance:l,point:vo.clone(),uv:os.getInterpolation(vo,Fa,To,Ha,nf,Mh,sf,new _e),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function Ua(s,e,t,n,i,r){Lr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(bo.x=r*Lr.x-i*Lr.y,bo.y=i*Lr.x+r*Lr.y):bo.copy(Lr),s.copy(e),s.x+=bo.x,s.y+=bo.y,s.applyMatrix4(lm)}var rs=new w,Sh=new w,ka=new w,Ba=new w,vs=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,rs)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=rs.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(rs.copy(this.origin).addScaledVector(this.direction,t),rs.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Sh.copy(e).add(t).multiplyScalar(.5),ka.copy(t).sub(e).normalize(),Ba.copy(this.origin).sub(Sh);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ka),a=Ba.dot(this.direction),l=-Ba.dot(ka),c=Ba.lengthSq(),u=Math.abs(1-o*o),h,d,p,f;if(u>0)if(h=o*l-a,d=o*a-l,f=r*u,h>=0)if(d>=-f)if(d<=f){let _=1/u;h*=_,d*=_,p=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;else d<=-f?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+d*(d+2*l)+c):d<=f?(h=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+d*(d+2*l)+c);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Sh).addScaledVector(ka,d),p}intersectSphere(e,t){if(e.radius<0)return null;rs.subVectors(e.center,this.origin);let n=rs.dot(this.direction),i=rs.dot(rs)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,rs)!==null}intersectTriangle(e,t,n,i,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,u=a.z,h=e.x-o.x,d=e.y-o.y,p=e.z-o.z,f=t.x-o.x,_=t.y-o.y,m=t.z-o.z,g=n.x-o.x,b=n.y-o.y,C=n.z-o.z,T=Math.abs(l),A=Math.abs(c),P=Math.abs(u),y,M,G,N,O,W,$,D,X,ie,z,ce;if(T>=A&&T>=P?(G=l,W=h,X=f,ce=g,l>=0?(y=c,M=u,N=d,O=p,$=_,D=m,ie=b,z=C):(y=u,M=c,N=p,O=d,$=m,D=_,ie=C,z=b)):A>=P?(G=c,W=d,X=_,ce=b,c>=0?(y=u,M=l,N=p,O=h,$=m,D=f,ie=C,z=g):(y=l,M=u,N=h,O=p,$=f,D=m,ie=g,z=C)):(G=u,W=p,X=m,ce=C,u>=0?(y=l,M=c,N=h,O=d,$=f,D=_,ie=g,z=b):(y=c,M=l,N=d,O=h,$=_,D=f,ie=b,z=g)),G===0)return null;let Z=y/G,se=M/G,le=1/G,Pe=N-Z*W,Ke=O-se*W,j=$-Z*X,Te=D-se*X,Ae=ie-Z*ce,ze=z-se*ce,Me=Ae*Te-ze*j,et=Pe*ze-Ke*Ae,tn=j*Ke-Te*Pe;if(i){if(Me<0||et<0||tn<0)return null}else if((Me<0||et<0||tn<0)&&(Me>0||et>0||tn>0))return null;let $e=Me+et+tn;if($e===0)return null;let Lt=le*(Me*W+et*X+tn*ce);return($e>0?Lt<0:Lt>0)?null:this.at(Lt/$e,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},vt=class extends Si{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new x(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},rf=new Ie,Ks=new vs,za=new Mi,of=new w,Ga=new w,Va=new w,Wa=new w,wh=new w,qa=new w,af=new w,Xa=new w,bt=class extends In{constructor(e=new hn,t=new vt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){qa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],h=r[l];u!==0&&(wh.fromBufferAttribute(h,e),o?qa.addScaledVector(wh,u):qa.addScaledVector(wh.sub(t),u))}t.add(qa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),za.copy(n.boundingSphere),za.applyMatrix4(r),Ks.copy(e.ray).recast(e.near),!(za.containsPoint(Ks.origin)===!1&&(Ks.intersectSphere(za,of)===null||Ks.origin.distanceToSquared(of)>(e.far-e.near)**2))&&(rf.copy(r).invert(),Ks.copy(e.ray).applyMatrix4(rf),!(n.boundingBox!==null&&Ks.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ks)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let f=0,_=d.length;f<_;f++){let m=d[f],g=o[m.materialIndex],b=Math.max(m.start,p.start),C=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let T=b,A=C;T<A;T+=3){let P=a.getX(T),y=a.getX(T+1),M=a.getX(T+2);i=Ya(this,g,e,n,c,u,h,P,y,M),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let f=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=f,g=_;m<g;m+=3){let b=a.getX(m),C=a.getX(m+1),T=a.getX(m+2);i=Ya(this,o,e,n,c,u,h,b,C,T),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let f=0,_=d.length;f<_;f++){let m=d[f],g=o[m.materialIndex],b=Math.max(m.start,p.start),C=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let T=b,A=C;T<A;T+=3){let P=T,y=T+1,M=T+2;i=Ya(this,g,e,n,c,u,h,P,y,M),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let f=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=f,g=_;m<g;m+=3){let b=m,C=m+1,T=m+2;i=Ya(this,o,e,n,c,u,h,b,C,T),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function B_(s,e,t,n,i,r,o,a){let l;if(e.side===wn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===$n,a),l===null)return null;Xa.copy(a),Xa.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Xa);return c<t.near||c>t.far?null:{distance:c,point:Xa.clone(),object:s}}function Ya(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Ga),s.getVertexPosition(l,Va),s.getVertexPosition(c,Wa);let u=B_(s,e,t,n,Ga,Va,Wa,af);if(u){let h=new w;os.getBarycoord(af,Ga,Va,Wa,h),i&&(u.uv=os.getInterpolatedAttribute(i,a,l,c,h,new _e)),r&&(u.uv1=os.getInterpolatedAttribute(r,a,l,c,h,new _e)),o&&(u.normal=os.getInterpolatedAttribute(o,a,l,c,h,new w),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new w,materialIndex:0};os.getNormal(Ga,Va,Wa,d.normal),u.face=d,u.barycoord=h}return u}var $s=class extends Hn{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Wt,u=Wt,h,d){super(null,o,a,l,c,u,i,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var bs=class extends un{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Dr=new Ie,lf=new Ie,Ka=[],cf=new nn,z_=new Ie,Mo=new bt,So=new Mi,St=class extends bt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,z_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Dr),cf.copy(e.boundingBox).applyMatrix4(Dr),this.boundingBox.union(cf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Mi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Dr),So.copy(e.boundingSphere).applyMatrix4(Dr),this.boundingSphere.union(So)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Mo.geometry=this.geometry,Mo.material=this.material,Mo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),So.copy(this.boundingSphere),So.applyMatrix4(n),e.ray.intersectsSphere(So)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Dr),lf.multiplyMatrices(n,Dr),Mo.matrixWorld=lf,Mo.raycast(e,Ka);for(let o=0,a=Ka.length;o<a;o++){let l=Ka[o];l.instanceId=r,l.object=this,t.push(l)}Ka.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new bs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new $s(new Float32Array(i*this.count),i,this.count,Bl,fi));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Zs=new Mi,G_=new _e(.5,.5),Za=new w,ki=class{constructor(e=new bi,t=new bi,n=new bi,i=new bi,r=new bi,o=new bi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=di,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],p=r[7],f=r[8],_=r[9],m=r[10],g=r[11],b=r[12],C=r[13],T=r[14],A=r[15];if(i[0].setComponents(c-o,p-u,g-f,A-b).normalize(),i[1].setComponents(c+o,p+u,g+f,A+b).normalize(),i[2].setComponents(c+a,p+h,g+_,A+C).normalize(),i[3].setComponents(c-a,p-h,g-_,A-C).normalize(),n)i[4].setComponents(l,d,m,T).normalize(),i[5].setComponents(c-l,p-d,g-m,A-T).normalize();else if(i[4].setComponents(c-l,p-d,g-m,A-T).normalize(),t===di)i[5].setComponents(c+l,p+d,g+m,A+T).normalize();else if(t===Br)i[5].setComponents(l,d,m,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zs)}intersectsSprite(e){Zs.center.set(0,0,0);let t=G_.distanceTo(e.center);return Zs.radius=.7071067811865476+t,Zs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zs)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Za.x=i.normal.x>0?e.max.x:e.min.x,Za.y=i.normal.y>0?e.max.y:e.min.y,Za.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Za)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},uf=new Ie,gl=class s{constructor(){this.coordinateSystem=di,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];uf.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new ki),n[i].setFromProjectionMatrix(uf,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new ki),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};var Js=class extends Si{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new x(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},xl=new w,yl=new w,hf=new Ie,wo=new vs,$a=new Mi,Ch=new w,df=new w,ko=class extends In{constructor(e=new hn,t=new Js){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)xl.fromBufferAttribute(t,i-1),yl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=xl.distanceTo(yl);e.setAttribute("lineDistance",new Yt(n,1))}else Ye("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$a.copy(n.boundingSphere),$a.applyMatrix4(i),$a.radius+=r,e.ray.intersectsSphere($a)===!1)return;hf.copy(i).invert(),wo.copy(e.ray).applyMatrix4(hf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let p=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let _=p,m=f-1;_<m;_+=c){let g=u.getX(_),b=u.getX(_+1),C=Ja(this,e,wo,l,g,b,_);C&&t.push(C)}if(this.isLineLoop){let _=u.getX(f-1),m=u.getX(p),g=Ja(this,e,wo,l,_,m,f-1);g&&t.push(g)}}else{let p=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let _=p,m=f-1;_<m;_+=c){let g=Ja(this,e,wo,l,_,_+1,_);g&&t.push(g)}if(this.isLineLoop){let _=Ja(this,e,wo,l,f-1,p,f-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ja(s,e,t,n,i,r,o){let a=s.geometry.attributes.position;if(xl.fromBufferAttribute(a,i),yl.fromBufferAttribute(a,r),t.distanceSqToSegment(xl,yl,Ch,df)>n)return;Ch.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Ch);if(!(c<e.near||c>e.far))return{distance:c,point:df.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var pf=new w,ff=new w,_l=class extends ko{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)pf.fromBufferAttribute(t,i),ff.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+pf.distanceTo(ff);e.setAttribute("lineDistance",new Yt(n,1))}else Ye("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Bo=class extends ko{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}};var zo=class extends Hn{constructor(e=[],t=sr,n,i,r,o,a,l,c,u){super(e,t,n,i,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ft=class extends Hn{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var wi=class extends Hn{constructor(e,t,n=Ri,i,r,o,a=Wt,l=Wt,c,u=cs,h=1){if(u!==cs&&u!==hs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,i,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Go=class extends wi{constructor(e,t=Ri,n=sr,i,r,o=Wt,a=Wt,l,c=cs){let u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,i,r,o,a,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Vo=class extends Hn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Bi=class s extends hn{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],h=[],d=0,p=0;f("z","y","x",-1,-1,n,t,e,o,r,0),f("z","y","x",1,-1,n,t,-e,o,r,1),f("x","z","y",1,1,e,n,t,i,o,2),f("x","z","y",1,-1,e,n,-t,i,o,3),f("x","y","z",1,-1,e,t,n,i,r,4),f("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(u,3)),this.setAttribute("uv",new Yt(h,2));function f(_,m,g,b,C,T,A,P,y,M,G){let N=T/y,O=A/M,W=T/2,$=A/2,D=P/2,X=y+1,ie=M+1,z=0,ce=0,Z=new w;for(let se=0;se<ie;se++){let le=se*O-$;for(let Pe=0;Pe<X;Pe++){let Ke=Pe*N-W;Z[_]=Ke*b,Z[m]=le*C,Z[g]=D,c.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[g]=P>0?1:-1,u.push(Z.x,Z.y,Z.z),h.push(Pe/y),h.push(1-se/M),z+=1}}for(let se=0;se<M;se++)for(let le=0;le<y;le++){let Pe=d+le+X*se,Ke=d+le+X*(se+1),j=d+(le+1)+X*(se+1),Te=d+(le+1)+X*se;l.push(Pe,Ke,Te),l.push(Ke,j,Te),ce+=6}a.addGroup(p,ce,G),p+=ce,d+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var it=class s extends hn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,d=t/l,p=[],f=[],_=[],m=[];for(let g=0;g<u;g++){let b=g*d-o;for(let C=0;C<c;C++){let T=C*h-r;f.push(T,-b,0),_.push(0,0,1),m.push(C/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let b=0;b<a;b++){let C=b+c*g,T=b+c*(g+1),A=b+1+c*(g+1),P=b+1+c*g;p.push(C,T,P),p.push(T,A,P)}this.setIndex(p),this.setAttribute("position",new Yt(f,3)),this.setAttribute("normal",new Yt(_,3)),this.setAttribute("uv",new Yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Wo=class s extends hn{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],u=[],h=e,d=(t-e)/i,p=new w,f=new _e;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){let g=r+m/n*o;p.x=h*Math.cos(g),p.y=h*Math.sin(g),l.push(p.x,p.y,p.z),c.push(0,0,1),f.x=(p.x/t+1)/2,f.y=(p.y/t+1)/2,u.push(f.x,f.y)}h+=d}for(let _=0;_<i;_++){let m=_*(n+1);for(let g=0;g<n;g++){let b=g+m,C=b,T=b+n+1,A=b+n+2,P=b+1;a.push(C,T,P),a.push(T,A,P)}}this.setIndex(a),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(c,3)),this.setAttribute("uv",new Yt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};function or(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(mf(i))i.isRenderTargetTexture?(Ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(mf(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function kn(s){let e={};for(let t=0;t<s.length;t++){let n=or(s[t]);for(let i in n)e[i]=n[i]}return e}function mf(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function V_(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function hd(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:_t.workingColorSpace}var cm={clone:or,merge:kn},W_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,q_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xn=class extends Si{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=W_,this.fragmentShader=q_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=or(e.uniforms),this.uniformsGroups=V_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new x().setHex(i.value);break;case"v2":this.uniforms[n].value=new _e().fromArray(i.value);break;case"v3":this.uniforms[n].value=new w().fromArray(i.value);break;case"v4":this.uniforms[n].value=new kt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Qe().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Ie().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},El=class extends xn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var js=class extends Si{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new x(16777215),this.specular=new x(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new x(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ra,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Jo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ts=class extends Si{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new x(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new x(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ra,this.normalScale=new _e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Jo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Kr=class extends Si{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},vl=class extends Si{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Nr(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function ja(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var Ms=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},bl=class extends Ms{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ph,endingEnd:Ph}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ih:r=e,a=2*t-n;break;case Lh:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ih:o=e,l=2*n-t;break;case Lh:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,f=(n-t)/(i-t),_=f*f,m=_*f,g=-d*m+2*d*_-d*f,b=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*f+1,C=(-1-p)*m+(1.5+p)*_+.5*f,T=p*m-p*_;for(let A=0;A!==a;++A)r[A]=g*o[u+A]+b*o[c+A]+C*o[l+A]+T*o[h+A];return r}},Tl=class extends Ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==a;++d)r[d]=o[c+d]*h+o[l+d]*u;return r}},Ml=class extends Ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Sl=class extends Ms{interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this.inTangents,h=this.outTangents;if(!u||!h){let f=(n-t)/(i-t),_=1-f;for(let m=0;m!==a;++m)r[m]=o[c+m]*_+o[l+m]*f;return r}let d=a*2,p=e-1;for(let f=0;f!==a;++f){let _=o[c+f],m=o[l+f],g=p*d+f*2,b=h[g],C=h[g+1],T=e*d+f*2,A=u[T],P=u[T+1],y=Y_(n,t,b,A,i);r[f]=um(y,_,C,P,m)}return r}};function um(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function X_(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function Y_(s,e,t,n,i){let r=(s-e)/(i-e);for(let o=0;o<8;o++){let a=um(r,e,t,n,i)-s;if(Math.abs(a)<1e-10)break;let l=X_(r,e,t,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Zn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Nr(t,this.TimeBufferType),this.values=Nr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Nr(e.times,Array),values:Nr(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),ja(e.settings)&&(n.settings={inTangents:Nr(e.settings.inTangents,Array),outTangents:Nr(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ml(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Tl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new bl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Sl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Po:t=this.InterpolantFactoryMethodDiscrete;break;case dl:t=this.InterpolantFactoryMethodLinear;break;case tl:t=this.InterpolantFactoryMethodSmooth;break;case Ah:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ye("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Po;case this.InterpolantFactoryMethodLinear:return dl;case this.InterpolantFactoryMethodSmooth:return tl;case this.InterpolantFactoryMethodBezier:return Ah}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e;ja(this.settings)&&(gf(this.settings.inTangents,e),gf(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;ja(this.settings)&&(xf(this.settings.inTangents,e),xf(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Je("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Je("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Je("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Je("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&l_(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){Je("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===tl,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{let h=a*n,d=h-n,p=h+n;for(let f=0;f!==n;++f){let _=t[h+f];if(_!==t[d+f]||_!==t[p+f]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let h=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[h+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,ja(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function gf(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]+=e}function xf(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}Zn.prototype.ValueTypeName="";Zn.prototype.TimeBufferType=Float32Array;Zn.prototype.ValueBufferType=Float32Array;Zn.prototype.DefaultInterpolation=dl;var Ss=class extends Zn{constructor(e,t,n){super(e,t,n)}};Ss.prototype.ValueTypeName="bool";Ss.prototype.ValueBufferType=Array;Ss.prototype.DefaultInterpolation=Po;Ss.prototype.InterpolantFactoryMethodLinear=void 0;Ss.prototype.InterpolantFactoryMethodSmooth=void 0;var wl=class extends Zn{constructor(e,t,n,i){super(e,t,n,i)}};wl.prototype.ValueTypeName="color";var Cl=class extends Zn{constructor(e,t,n,i){super(e,t,n,i)}};Cl.prototype.ValueTypeName="number";var Rl=class extends Ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let u=c+a;c!==u;c+=4)Ot.slerpFlat(r,0,o,c-a,o,c,l);return r}},qo=class extends Zn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Rl(this.times,this.values,this.getValueSize(),e)}};qo.prototype.ValueTypeName="quaternion";qo.prototype.InterpolantFactoryMethodSmooth=void 0;var ws=class extends Zn{constructor(e,t,n){super(e,t,n)}};ws.prototype.ValueTypeName="string";ws.prototype.ValueBufferType=Array;ws.prototype.DefaultInterpolation=Po;ws.prototype.InterpolantFactoryMethodLinear=void 0;ws.prototype.InterpolantFactoryMethodSmooth=void 0;var Al=class extends Zn{constructor(e,t,n,i){super(e,t,n,i)}};Al.prototype.ValueTypeName="vector";var il={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(yf(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!yf(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function yf(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Pl=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let p=c[h],f=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return f}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},hm=new Pl,Zr=class{constructor(e){this.manager=e!==void 0?e:hm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Zr.DEFAULT_MATERIAL_NAME="__DEFAULT";var Or=new WeakMap,Il=class extends Zr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=il.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let h=Or.get(o);h===void 0&&(h=[],Or.set(o,h)),h.push({onLoad:t,onError:i})}return o}let a=zr("img");function l(){u(),t&&t(this);let h=Or.get(this)||[];for(let d=0;d<h.length;d++){let p=h[d];p.onLoad&&p.onLoad(this)}Or.delete(this),r.manager.itemEnd(e)}function c(h){u(),i&&i(h),il.remove(`image:${e}`);let d=Or.get(this)||[];for(let p=0;p<d.length;p++){let f=d[p];f.onError&&f.onError(h)}Or.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),il.add(`image:${e}`,a),r.manager.itemStart(e),a.fetchPriority=this.priority,a.src=e,a}};var Qs=class extends Zr{constructor(e){super(e)}load(e,t,n,i){let r=new Hn,o=new Il(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Xo=class extends In{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new x(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var Rh=new Ie,_f=new w,Ef=new w,Ll=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _e(512,512),this.mapType=qn,this.map=null,this.mapPass=null,this.matrix=new Ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ki,this._frameExtents=new _e(1,1),this._viewportCount=1,this._viewports=[new kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;_f.setFromMatrixPosition(e.matrixWorld),t.position.copy(_f),Ef.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ef),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){Rh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Rh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;e.coordinateSystem===Br||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(Rh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Qa=new w,el=new Ot,Oi=new w,Yo=class extends In{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ie,this.projectionMatrix=new Ie,this.projectionMatrixInverse=new Ie,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Qa,el,Oi),Oi.x===1&&Oi.y===1&&Oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qa,el,Oi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Qa,el,Oi),Oi.x===1&&Oi.y===1&&Oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qa,el,Oi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Es=new w,vf=new _e,bf=new _e,gn=class extends Yo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ro*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vr*2*Math.atan(Math.tan(Ro*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Es.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Es.x,Es.y).multiplyScalar(-e/Es.z),Es.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Es.x,Es.y).multiplyScalar(-e/Es.z)}getViewSize(e,t){return this.getViewBounds(e,vf,bf),t.subVectors(bf,vf)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ro*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ci=class extends Yo{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Dh=class extends Ll{constructor(){super(new Ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ko=class extends Xo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(In.DEFAULT_UP),this.updateMatrix(),this.target=new In,this.shadow=new Dh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Zo=class extends Xo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Fr=-90,Hr=1,$r=class extends In{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new gn(Fr,Hr,e,t);i.layers=this.layers,this.add(i);let r=new gn(Fr,Hr,e,t);r.layers=this.layers,this.add(r);let o=new gn(Fr,Hr,e,t);o.layers=this.layers,this.add(o);let a=new gn(Fr,Hr,e,t);a.layers=this.layers,this.add(a);let l=new gn(Fr,Hr,e,t);l.layers=this.layers,this.add(l);let c=new gn(Fr,Hr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===di)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Br)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),f=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=_,e.setRenderTarget(n,5,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,p),e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},Dl=class extends gn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var dd="\\[\\]\\.:\\/",K_=new RegExp("["+dd+"]","g"),pd="[^"+dd+"]",Z_="[^"+dd.replace("\\.","")+"]",$_=/((?:WC+[\/:])*)/.source.replace("WC",pd),J_=/(WCOD+)?/.source.replace("WCOD",Z_),j_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pd),Q_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pd),eE=new RegExp("^"+$_+J_+j_+Q_+"$"),tE=["material","materials","bones","map"],Nh=class{constructor(e,t,n){let i=n||Vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Vt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(K_,"")}static parseTrackName(e){let t=eE.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);tE.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ye("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;Je("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Vt.Composite=Nh;Vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Vt.prototype.GetterByBindingType=[Vt.prototype._getValue_direct,Vt.prototype._getValue_array,Vt.prototype._getValue_arrayElement,Vt.prototype._getValue_toArray];Vt.prototype.SetterByBindingTypeAndVersioning=[[Vt.prototype._setValue_direct,Vt.prototype._setValue_direct_setNeedsUpdate,Vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_array,Vt.prototype._setValue_array_setNeedsUpdate,Vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_arrayElement,Vt.prototype._setValue_arrayElement_setNeedsUpdate,Vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_fromArray,Vt.prototype._setValue_fromArray_setNeedsUpdate,Vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var eP=new Float32Array(1);var Tf=new Ie,er=class{constructor(e,t,n=0,i=1/0){this.ray=new vs(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new qr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Tf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tf),this}intersectObject(e,t=!0,n=[]){return Oh(e,this,n,t),n.sort(Mf),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Oh(e[i],this,n,t);return n.sort(Mf),n}};function Mf(s,e){return s.distance-e.distance}function Oh(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Oh(r[o],e,t,!0)}}var Fh=class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};var $o=class extends _l{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new hn;r.setIndex(new un(n,1)),r.setAttribute("position",new Yt(i,3)),super(r,new Js({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){let t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function fd(s,e,t,n){let i=nE(n);switch(t){case ed:return s*e;case Bl:return s*e/i.components*i.byteLength;case zl:return s*e/i.components*i.byteLength;case Rs:return s*e*2/i.components*i.byteLength;case Gl:return s*e*2/i.components*i.byteLength;case td:return s*e*3/i.components*i.byteLength;case Jn:return s*e*4/i.components*i.byteLength;case Vl:return s*e*4/i.components*i.byteLength;case Qo:case ea:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ta:case na:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ql:case Yl:return Math.max(s,16)*Math.max(e,8)/4;case Wl:case Xl:return Math.max(s,8)*Math.max(e,8)/2;case Kl:case Zl:case Jl:case jl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case $l:case ia:case Ql:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ec:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case tc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case nc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case ic:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case sc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case rc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case oc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ac:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case lc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case cc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case uc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case hc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case dc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case pc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case fc:case mc:case gc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case xc:case yc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case sa:case _c:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function nE(s){switch(s){case qn:case $h:return{byteLength:1,components:1};case Qr:case Jh:case on:return{byteLength:2,components:1};case Ul:case kl:return{byteLength:2,components:4};case Ri:case Hl:case fi:return{byteLength:4,components:1};case jh:case Qh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ye("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Dm(){let s=null,e=!1,t=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),t(r,o)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function lE(s){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,h=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){let u=l.array,h=l.updateRanges;if(s.bindBuffer(c,a),h.length===0)s.bufferSubData(c,0,u);else{h.sort((p,f)=>p.start-f.start);let d=0;for(let p=1;p<h.length;p++){let f=h[d],_=h[p];_.start<=f.start+f.count+1?f.count=Math.max(f.count,_.start+_.count-f.start):(++d,h[d]=_)}h.length=d+1;for(let p=0,f=h.length;p<f;p++){let _=h[p];s.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var cE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uE=`#ifdef USE_ALPHAHASH
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
#endif`,hE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mE=`#ifdef USE_AOMAP
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
#endif`,gE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xE=`#ifdef USE_BATCHING
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
#endif`,yE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_E=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,EE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bE=`#ifdef USE_IRIDESCENCE
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
#endif`,TE=`#ifdef USE_BUMPMAP
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
#endif`,ME=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,SE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,CE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,RE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,AE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,PE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,IE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,LE=`#define PI 3.141592653589793
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
} // validated`,DE=`vec3 transformedNormal = objectNormal;
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
#endif`,NE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,OE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,FE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,HE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,UE="gl_FragColor = linearToOutputTexel( gl_FragColor );",kE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,BE=`#ifdef USE_ENVMAP
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
#endif`,zE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,GE=`#ifdef USE_ENVMAP
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
#endif`,VE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,WE=`#ifdef USE_ENVMAP
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
#endif`,qE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,XE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,YE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,KE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ZE=`#ifdef USE_GRADIENTMAP
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
}`,$E=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,JE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,QE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ev=`#ifdef USE_ENVMAP
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
#endif`,tv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,iv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rv=`PhysicalMaterial material;
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
#endif`,ov=`uniform sampler2D dfgLUT;
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
}`,av=`
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
#endif`,lv=`#if defined( RE_IndirectDiffuse )
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
#endif`,cv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uv=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,hv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yv=`#if defined( USE_POINTS_UV )
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
#endif`,_v=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ev=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bv=`#if defined( USE_MORPHCOLORS )
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
#endif`,Tv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mv=`#ifdef USE_MORPHTARGETS
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
#endif`,Sv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Rv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Av=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Iv=`#ifdef USE_NORMALMAP
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
#endif`,Lv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ov=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Uv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Yv=`float getShadowMask() {
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
}`,Kv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zv=`#ifdef USE_SKINNING
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
#endif`,$v=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jv=`#ifdef USE_SKINNING
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
#endif`,jv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,nb=`#ifdef USE_TRANSMISSION
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
#endif`,ib=`#ifdef USE_TRANSMISSION
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
#endif`,sb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ob=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ab=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,lb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cb=`uniform sampler2D t2D;
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
}`,ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hb=`uniform float backgroundBlurriness;
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
}`,db=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fb=`#include <common>
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
}`,mb=`#if DEPTH_PACKING == 3200
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
}`,gb=`#define DISTANCE
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
}`,xb=`#define DISTANCE
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
}`,yb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_b=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eb=`uniform float scale;
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
}`,vb=`uniform vec3 diffuse;
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
}`,bb=`#include <common>
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
}`,Tb=`uniform vec3 diffuse;
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
}`,Mb=`#define LAMBERT
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
}`,Sb=`#define LAMBERT
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
}`,wb=`#define MATCAP
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
}`,Cb=`#define MATCAP
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
}`,Rb=`#define NORMAL
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
}`,Ab=`#define NORMAL
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
}`,Pb=`#define PHONG
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
}`,Ib=`#define PHONG
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
}`,Lb=`#define STANDARD
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
}`,Db=`#define STANDARD
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
}`,Nb=`#define TOON
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
}`,Ob=`#define TOON
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
}`,Fb=`uniform float size;
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
}`,Hb=`uniform vec3 diffuse;
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
}`,Ub=`#include <common>
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
}`,kb=`uniform vec3 color;
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
}`,Bb=`uniform float rotation;
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
}`,zb=`uniform vec3 diffuse;
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
}`,st={alphahash_fragment:cE,alphahash_pars_fragment:uE,alphamap_fragment:hE,alphamap_pars_fragment:dE,alphatest_fragment:pE,alphatest_pars_fragment:fE,aomap_fragment:mE,aomap_pars_fragment:gE,batching_pars_vertex:xE,batching_vertex:yE,begin_vertex:_E,beginnormal_vertex:EE,bsdfs:vE,iridescence_fragment:bE,bumpmap_pars_fragment:TE,clipping_planes_fragment:ME,clipping_planes_pars_fragment:SE,clipping_planes_pars_vertex:wE,clipping_planes_vertex:CE,color_fragment:RE,color_pars_fragment:AE,color_pars_vertex:PE,color_vertex:IE,common:LE,defaultnormal_vertex:DE,displacementmap_pars_vertex:NE,displacementmap_vertex:OE,emissivemap_fragment:FE,emissivemap_pars_fragment:HE,colorspace_fragment:UE,colorspace_pars_fragment:kE,envmap_fragment:BE,envmap_common_pars_fragment:zE,envmap_pars_fragment:GE,envmap_pars_vertex:VE,envmap_physical_pars_fragment:ev,envmap_vertex:WE,fog_vertex:qE,fog_pars_vertex:XE,fog_fragment:YE,fog_pars_fragment:KE,gradientmap_pars_fragment:ZE,lightmap_pars_fragment:$E,lights_lambert_fragment:JE,lights_lambert_pars_fragment:jE,lights_pars_begin:QE,lights_toon_fragment:tv,lights_toon_pars_fragment:nv,lights_phong_fragment:iv,lights_phong_pars_fragment:sv,lights_physical_fragment:rv,lights_physical_pars_fragment:ov,lights_fragment_begin:av,lights_fragment_maps:lv,lights_fragment_end:cv,lightprobes_pars_fragment:uv,logdepthbuf_fragment:hv,logdepthbuf_pars_fragment:dv,logdepthbuf_pars_vertex:pv,logdepthbuf_vertex:fv,map_fragment:mv,map_pars_fragment:gv,map_particle_fragment:xv,map_particle_pars_fragment:yv,metalnessmap_fragment:_v,metalnessmap_pars_fragment:Ev,morphinstance_vertex:vv,morphcolor_vertex:bv,morphnormal_vertex:Tv,morphtarget_pars_vertex:Mv,morphtarget_vertex:Sv,normal_fragment_begin:wv,normal_fragment_maps:Cv,normal_pars_fragment:Rv,normal_pars_vertex:Av,normal_vertex:Pv,normalmap_pars_fragment:Iv,clearcoat_normal_fragment_begin:Lv,clearcoat_normal_fragment_maps:Dv,clearcoat_pars_fragment:Nv,iridescence_pars_fragment:Ov,opaque_fragment:Fv,packing:Hv,premultiplied_alpha_fragment:Uv,project_vertex:kv,dithering_fragment:Bv,dithering_pars_fragment:zv,roughnessmap_fragment:Gv,roughnessmap_pars_fragment:Vv,shadowmap_pars_fragment:Wv,shadowmap_pars_vertex:qv,shadowmap_vertex:Xv,shadowmask_pars_fragment:Yv,skinbase_vertex:Kv,skinning_pars_vertex:Zv,skinning_vertex:$v,skinnormal_vertex:Jv,specularmap_fragment:jv,specularmap_pars_fragment:Qv,tonemapping_fragment:eb,tonemapping_pars_fragment:tb,transmission_fragment:nb,transmission_pars_fragment:ib,uv_pars_fragment:sb,uv_pars_vertex:rb,uv_vertex:ob,worldpos_vertex:ab,background_vert:lb,background_frag:cb,backgroundCube_vert:ub,backgroundCube_frag:hb,cube_vert:db,cube_frag:pb,depth_vert:fb,depth_frag:mb,distance_vert:gb,distance_frag:xb,equirect_vert:yb,equirect_frag:_b,linedashed_vert:Eb,linedashed_frag:vb,meshbasic_vert:bb,meshbasic_frag:Tb,meshlambert_vert:Mb,meshlambert_frag:Sb,meshmatcap_vert:wb,meshmatcap_frag:Cb,meshnormal_vert:Rb,meshnormal_frag:Ab,meshphong_vert:Pb,meshphong_frag:Ib,meshphysical_vert:Lb,meshphysical_frag:Db,meshtoon_vert:Nb,meshtoon_frag:Ob,points_vert:Fb,points_frag:Hb,shadow_vert:Ub,shadow_frag:kb,sprite_vert:Bb,sprite_frag:zb},Ce={common:{diffuse:{value:new x(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new _e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new x(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new x(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new x(16777215)},opacity:{value:1},center:{value:new _e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},Vi={basic:{uniforms:kn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:st.meshbasic_vert,fragmentShader:st.meshbasic_frag},lambert:{uniforms:kn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new x(0)},envMapIntensity:{value:1}}]),vertexShader:st.meshlambert_vert,fragmentShader:st.meshlambert_frag},phong:{uniforms:kn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new x(0)},specular:{value:new x(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:st.meshphong_vert,fragmentShader:st.meshphong_frag},standard:{uniforms:kn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new x(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag},toon:{uniforms:kn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new x(0)}}]),vertexShader:st.meshtoon_vert,fragmentShader:st.meshtoon_frag},matcap:{uniforms:kn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:st.meshmatcap_vert,fragmentShader:st.meshmatcap_frag},points:{uniforms:kn([Ce.points,Ce.fog]),vertexShader:st.points_vert,fragmentShader:st.points_frag},dashed:{uniforms:kn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:st.linedashed_vert,fragmentShader:st.linedashed_frag},depth:{uniforms:kn([Ce.common,Ce.displacementmap]),vertexShader:st.depth_vert,fragmentShader:st.depth_frag},normal:{uniforms:kn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:st.meshnormal_vert,fragmentShader:st.meshnormal_frag},sprite:{uniforms:kn([Ce.sprite,Ce.fog]),vertexShader:st.sprite_vert,fragmentShader:st.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:st.background_vert,fragmentShader:st.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:st.backgroundCube_vert,fragmentShader:st.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:st.cube_vert,fragmentShader:st.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:st.equirect_vert,fragmentShader:st.equirect_frag},distance:{uniforms:kn([Ce.common,Ce.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:st.distance_vert,fragmentShader:st.distance_frag},shadow:{uniforms:kn([Ce.lights,Ce.fog,{color:{value:new x(0)},opacity:{value:1}}]),vertexShader:st.shadow_vert,fragmentShader:st.shadow_frag}};Vi.physical={uniforms:kn([Vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new _e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new x(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new _e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new x(0)},specularColor:{value:new x(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new _e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag};var vc={r:0,b:0,g:0},Gb=new Ie,Nm=new Qe;Nm.set(-1,0,0,0,1,0,0,0,1);function Vb(s,e,t,n,i,r){let o=new x(0),a=i===!0?0:1,l,c,u=null,h=0,d=null;function p(b){let C=b.isScene===!0?b.background:null;if(C&&C.isTexture){let T=b.backgroundBlurriness>0;C=e.get(C,T)}return C}function f(b){let C=!1,T=p(b);T===null?m(o,a):T&&T.isColor&&(m(T,1),C=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(b,C){let T=p(C);T&&T.isCubeTexture?(c===void 0&&(c=new bt(new Bi(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:or(Vi.backgroundCube.uniforms),vertexShader:Vi.backgroundCube.vertexShader,fragmentShader:Vi.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,P,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=T,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Gb.makeRotationFromEuler(C.backgroundRotation)).transpose(),T.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Nm),c.material.toneMapped=_t.getTransfer(T.colorSpace)!==Pt,(u!==T||h!==T.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,u=T,h=T.version,d=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new bt(new it(2,2),new xn({name:"BackgroundMaterial",uniforms:or(Vi.background.uniforms),vertexShader:Vi.background.vertexShader,fragmentShader:Vi.background.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=_t.getTransfer(T.colorSpace)!==Pt,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||h!==T.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,u=T,h=T.version,d=s.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,C){b.getRGB(vc,hd(s)),t.buffers.color.setClear(vc.r,vc.g,vc.b,C,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,C=1){o.set(b),a=C,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,m(o,a)},render:f,addToRenderList:_,dispose:g}}function Wb(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(O,W,$,D,X){let ie=!1,z=h(O,D,$,W);r!==z&&(r=z,c(r.object)),ie=p(O,D,$,X),ie&&f(O,D,$,X),X!==null&&e.update(X,s.ELEMENT_ARRAY_BUFFER),(ie||o)&&(o=!1,T(O,W,$,D),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return s.createVertexArray()}function c(O){return s.bindVertexArray(O)}function u(O){return s.deleteVertexArray(O)}function h(O,W,$,D){let X=D.wireframe===!0,ie=n[W.id];ie===void 0&&(ie={},n[W.id]=ie);let z=O.isInstancedMesh===!0?O.id:0,ce=ie[z];ce===void 0&&(ce={},ie[z]=ce);let Z=ce[$.id];Z===void 0&&(Z={},ce[$.id]=Z);let se=Z[X];return se===void 0&&(se=d(l()),Z[X]=se),se}function d(O){let W=[],$=[],D=[];for(let X=0;X<t;X++)W[X]=0,$[X]=0,D[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:$,attributeDivisors:D,object:O,attributes:{},index:null}}function p(O,W,$,D){let X=r.attributes,ie=W.attributes,z=0,ce=$.getAttributes();for(let Z in ce)if(ce[Z].location>=0){let le=X[Z],Pe=ie[Z];if(Pe===void 0&&(Z==="instanceMatrix"&&O.instanceMatrix&&(Pe=O.instanceMatrix),Z==="instanceColor"&&O.instanceColor&&(Pe=O.instanceColor)),le===void 0||le.attribute!==Pe||Pe&&le.data!==Pe.data)return!0;z++}return r.attributesNum!==z||r.index!==D}function f(O,W,$,D){let X={},ie=W.attributes,z=0,ce=$.getAttributes();for(let Z in ce)if(ce[Z].location>=0){let le=ie[Z];le===void 0&&(Z==="instanceMatrix"&&O.instanceMatrix&&(le=O.instanceMatrix),Z==="instanceColor"&&O.instanceColor&&(le=O.instanceColor));let Pe={};Pe.attribute=le,le&&le.data&&(Pe.data=le.data),X[Z]=Pe,z++}r.attributes=X,r.attributesNum=z,r.index=D}function _(){let O=r.newAttributes;for(let W=0,$=O.length;W<$;W++)O[W]=0}function m(O){g(O,0)}function g(O,W){let $=r.newAttributes,D=r.enabledAttributes,X=r.attributeDivisors;$[O]=1,D[O]===0&&(s.enableVertexAttribArray(O),D[O]=1),X[O]!==W&&(s.vertexAttribDivisor(O,W),X[O]=W)}function b(){let O=r.newAttributes,W=r.enabledAttributes;for(let $=0,D=W.length;$<D;$++)W[$]!==O[$]&&(s.disableVertexAttribArray($),W[$]=0)}function C(O,W,$,D,X,ie,z){z===!0?s.vertexAttribIPointer(O,W,$,X,ie):s.vertexAttribPointer(O,W,$,D,X,ie)}function T(O,W,$,D){_();let X=D.attributes,ie=$.getAttributes(),z=W.defaultAttributeValues;for(let ce in ie){let Z=ie[ce];if(Z.location>=0){let se=X[ce];if(se===void 0&&(ce==="instanceMatrix"&&O.instanceMatrix&&(se=O.instanceMatrix),ce==="instanceColor"&&O.instanceColor&&(se=O.instanceColor)),se!==void 0){let le=se.normalized,Pe=se.itemSize,Ke=e.get(se);if(Ke===void 0)continue;let j=Ke.buffer,Te=Ke.type,Ae=Ke.bytesPerElement,ze=Te===s.INT||Te===s.UNSIGNED_INT||se.gpuType===Hl;if(se.isInterleavedBufferAttribute){let Me=se.data,et=Me.isInterleavedBuffer===!0?Me.stride:Me.itemSize,tn=se.offset;if(Me.isInstancedInterleavedBuffer||Me.isInstancedBufferAttribute){for(let $e=0;$e<Z.locationSize;$e++)g(Z.location+$e,Me.meshPerAttribute);O.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Me.meshPerAttribute*Me.count)}else for(let $e=0;$e<Z.locationSize;$e++)m(Z.location+$e);s.bindBuffer(s.ARRAY_BUFFER,j);for(let $e=0;$e<Z.locationSize;$e++)C(Z.location+$e,Pe/Z.locationSize,Te,le,et*Ae,(tn+Pe/Z.locationSize*$e)*Ae,ze)}else{if(se.isInstancedBufferAttribute){for(let Me=0;Me<Z.locationSize;Me++)g(Z.location+Me,se.meshPerAttribute);O.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Me=0;Me<Z.locationSize;Me++)m(Z.location+Me);s.bindBuffer(s.ARRAY_BUFFER,j);for(let Me=0;Me<Z.locationSize;Me++)C(Z.location+Me,Pe/Z.locationSize,Te,le,Pe*Ae,Pe/Z.locationSize*Me*Ae,ze)}}else if(z!==void 0){let le=z[ce];if(le!==void 0)switch(le.length){case 2:s.vertexAttrib2fv(Z.location,le);break;case 3:s.vertexAttrib3fv(Z.location,le);break;case 4:s.vertexAttrib4fv(Z.location,le);break;default:s.vertexAttrib1fv(Z.location,le)}}}}b()}function A(){G();for(let O in n){let W=n[O];for(let $ in W){let D=W[$];for(let X in D){let ie=D[X];for(let z in ie)u(ie[z].object),delete ie[z];delete D[X]}}delete n[O]}}function P(O){if(n[O.id]===void 0)return;let W=n[O.id];for(let $ in W){let D=W[$];for(let X in D){let ie=D[X];for(let z in ie)u(ie[z].object),delete ie[z];delete D[X]}}delete n[O.id]}function y(O){for(let W in n){let $=n[W];for(let D in $){let X=$[D];if(X[O.id]===void 0)continue;let ie=X[O.id];for(let z in ie)u(ie[z].object),delete ie[z];delete X[O.id]}}}function M(O){for(let W in n){let $=n[W],D=O.isInstancedMesh===!0?O.id:0,X=$[D];if(X!==void 0){for(let ie in X){let z=X[ie];for(let ce in z)u(z[ce].object),delete z[ce];delete X[ie]}delete $[D],Object.keys($).length===0&&delete n[W]}}}function G(){N(),o=!0,r!==i&&(r=i,c(r.object))}function N(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:G,resetDefaultState:N,dispose:A,releaseStatesOfGeometry:P,releaseStatesOfObject:M,releaseStatesOfProgram:y,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function qb(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,u){u!==0&&(s.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let p=0;p<u;p++)d+=c[p];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Xb(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(y){return!(y!==Jn&&n.convert(y)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){let M=y===on&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(y!==qn&&y!==fi&&!M&&n.convert(y)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(y){if(y==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Ye("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&h===!1;t.reversedDepthBuffer===!0&&h===!1&&Ye("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&h===!0&&Ye("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),C=s.getParameter(s.MAX_VARYING_VECTORS),T=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),P=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:f,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:b,maxVaryings:C,maxFragmentUniforms:T,maxSamples:A,samples:P}}function Yb(s){let e=this,t=null,n=0,i=!1,r=!1,o=new bi,a=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let p=h.length!==0||d||n!==0||i;return i=d,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){let f=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,g=s.get(h);if(!i||f===null||f.length===0||r&&!m)r?u(null):c();else{let b=r?0:n,C=b*4,T=g.clippingState||null;l.value=T,T=u(f,d,C,p);for(let A=0;A!==C;++A)T[A]=t[A];g.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,f){let _=h!==null?h.length:0,m=null;if(_!==0){if(m=l.value,f!==!0||m===null){let g=p+_*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<g)&&(m=new Float32Array(g));for(let C=0,T=p;C!==_;++C,T+=4)o.copy(h[C]).applyMatrix4(b,a),o.normal.toArray(m,T),m[T+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}var la=class extends Qt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new zo(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Bi(5,5,5),r=new xn({name:"CubemapFromEquirect",uniforms:or(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:wn,blending:nr});r.uniforms.tEquirect.value=t;let o=new bt(i,r),a=t.minFilter;return t.minFilter===pi&&(t.minFilter=Sn),new $r(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},dm=256,Kb=3,Zb=20,Om=256,Fm=16,$b=3,Jb=new w,jb=new x,Tc=class s{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new $r(1,10,null),this._boxMesh=new bt(new Bi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=Jb}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);let h=l.autoClear,d=l.autoClearColor,p=l.autoClearDepth,f=l.autoClearStencil,_=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(e.background=l.getClearColor(jb));let m=new $r(n,i,u);return m.position.copy(a),m.update(l,e),l.autoClear=h,l.autoClearColor=d,l.autoClearDepth=p,l.autoClearStencil=f,e.background=_,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(dm,ld(e))}_fromTexture(e,t){e.mapping===sr||e.mapping===jr?this._setSize(e.image.length===0?dm:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=pm(e,!1,!1),n=Math.log2(e)-Kb;for(let i=0;i<=n;i++)t.texture.mipmaps.push({width:e>>i,height:e>>i});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=pm(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,i),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===sr||e.mapping===jr?(this._cubemapMaterial===null&&(this._cubemapMaterial=mm()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=fm()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Qb(),this._integrationMaterial=eT());let t=this._cubeSize,n=e.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Fm);for(let o=0;o<=n;o++){let a=s.lodToRoughness(o,n);if(o>n-$b)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let l=a>0?Math.log2(t)+.5*Math.log2(6/(Om*Math.pow(a,4)))+.5:0;i.roughness.value=a,i.lodBias.value=l,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=tT());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(e,0,n),i.envMap.value=e.texture,this._renderCube(r,0,n)}};function pm(s,e,t){return new la(s,{minFilter:pi,generateMipmaps:e,type:on,colorSpace:Io,depthBuffer:t})}function ca(s,e,t){return new xn({name:s,uniforms:e,vertexShader:st.cube_vert,fragmentShader:t,side:wn,blending:nr,depthTest:!1,depthWrite:!1})}function Qb(){return ca("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Om}u

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
	`)}function eT(){return ca("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Fm}},`

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
	`)}function tT(){return ca("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Zb}
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
	`)}function fm(){return ca("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function mm(){return ca("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function nT(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,p=!1){return d==null?null:p?o(d):r(d)}function r(d){if(d&&d.isTexture){let p=d.mapping;if(p===Nl||p===Ol)if(e.has(d)){let f=e.get(d).texture;return a(f,d.mapping)}else{let f=d.image;if(f&&f.height>0){let _=new la(f.height);return _.fromEquirectangularTexture(s,d),e.set(d,_),d.addEventListener("dispose",c),a(_.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let p=d.mapping,f=p===Nl||p===Ol,_=p===sr||p===jr;if(f||_){let m=t.get(d),g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new Tc(s)),m=f?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let b=d.image;return f&&b&&b.height>0||_&&b&&l(b)?(n===null&&(n=new Tc(s)),m=f?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function a(d,p){return p===Nl?d.mapping=sr:p===Ol&&(d.mapping=jr),d}function l(d){let p=0,f=6;for(let _=0;_<f;_++)d[_]!==void 0&&p++;return p===f}function c(d){let p=d.target;p.removeEventListener("dispose",c);let f=e.get(p);f!==void 0&&(e.delete(p),f.dispose())}function u(d){let p=d.target;p.removeEventListener("dispose",u);let f=t.get(p);f!==void 0&&(t.delete(p),f.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:h}}function iT(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Co("WebGLRenderer: "+n+" extension not supported."),i}}}function sT(s,e,t,n){let i={},r=new WeakMap,o=new FinalizationRegistry(f=>delete i[f]);function a(f){l(f.target)}function l(f){f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",a),delete i[f.id],o.unregister(f);let _=r.get(f);_&&(e.remove(_),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(f,_){return i[_.id]!==void 0||(_.addEventListener("dispose",a),i[_.id]=new WeakRef(_),o.register(_,_.id,_),t.memory.geometries++),_}function u(f){let _=f.attributes;for(let m in _)e.update(_[m],s.ARRAY_BUFFER)}function h(f){let _=f.index,m=f.attributes.position,g=0;if(m===void 0)return;let b=_!==null?_.array.length:m.array.length/3-1,C=m.count>=65535?Ho:Fo,T=new C(Math.ceil(b/3)*6,1),A=T.array;if(_!==null){let y=_.array;g=_.version;for(let M=0,G=0;M<b;M+=3){let N=y[M+0],O=y[M+1],W=y[M+2];A[G++]=N,A[G++]=O,A[G++]=O,A[G++]=W,A[G++]=W,A[G++]=N}}else{g=m.version;for(let y=0,M=0;y<b;y+=3){let G=y+0,N=y+1,O=y+2;A[M++]=G,A[M++]=N,A[M++]=N,A[M++]=O,A[M++]=O,A[M++]=G}}T.version=g;let P=r.get(f);P&&e.remove(P),r.set(f,T)}function d(f){let _=r.get(f);if(_){let m=f.index;m!==null&&_.version<m.version&&h(f)}else h(f);return r.get(f)}function p(){for(let f in i){let _=i[f].deref();_!==void 0&&l(_)}}return{get:c,update:u,getWireframeAttribute:d,dispose:p}}function rT(s,e,t){let n;function i(h){n=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,d){s.drawElements(n,d,r,h*o),t.update(d,n,1)}function c(h,d,p){p!==0&&(s.drawElementsInstanced(n,d,r,h*o,p),t.update(d,n,p))}function u(h,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,h,0,p);let _=0;for(let m=0;m<p;m++)_+=d[m];t.update(_,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function oT(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:Je("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function aT(s,e,t){let n=new WeakMap,i=new kt;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==h){let N=function(){M.dispose(),n.delete(a),a.removeEventListener("dispose",N)};var p=N;d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],C=a.morphAttributes.color||[],T=0;f===!0&&(T=1),_===!0&&(T=2),m===!0&&(T=3);let A=a.attributes.position.count*T,P=1;A>e.maxTextureSize&&(P=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);let y=new Float32Array(A*P*4*h),M=new No(y,A,P,h);M.type=fi,M.needsUpdate=!0;let G=T*4;for(let O=0;O<h;O++){let W=g[O],$=b[O],D=C[O],X=A*P*4*O;for(let ie=0;ie<W.count;ie++){let z=ie*G;f===!0&&(i.fromBufferAttribute(W,ie),y[X+z+0]=i.x,y[X+z+1]=i.y,y[X+z+2]=i.z,y[X+z+3]=0),_===!0&&(i.fromBufferAttribute($,ie),y[X+z+4]=i.x,y[X+z+5]=i.y,y[X+z+6]=i.z,y[X+z+7]=0),m===!0&&(i.fromBufferAttribute(D,ie),y[X+z+8]=i.x,y[X+z+9]=i.y,y[X+z+10]=i.z,y[X+z+11]=D.itemSize===4?i.w:1)}}d={count:h,texture:M,size:new _e(A,P)},n.set(a,d),a.addEventListener("dispose",N)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let m=0;m<c.length;m++)f+=c[m];let _=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function lT(s,e,t,n,i){let r=new WeakMap;function o(c){let u=i.render.frame,h=c.geometry,d=e.get(c,h);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return d}function a(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var cT={[Gh]:"LINEAR_TONE_MAPPING",[Vh]:"REINHARD_TONE_MAPPING",[Wh]:"CINEON_TONE_MAPPING",[qh]:"ACES_FILMIC_TONE_MAPPING",[Yh]:"AGX_TONE_MAPPING",[Kh]:"NEUTRAL_TONE_MAPPING",[Xh]:"CUSTOM_TONE_MAPPING"};function uT(s,e,t,n,i,r){let o=new Qt(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,u=new hn;u.setAttribute("position",new Yt([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Yt([0,2,0,0,2,0],2));let h=new El({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new bt(u,h),p=new Ci(-1,1,1,-1,0,1),f=null,_=null,m=!1,g,b=null,C=[],T=!1;this.setSize=function(A,P){o.setSize(A,P),a!==null&&a.setSize(A,P),l!==null&&l.setSize(A,P);for(let y=0;y<C.length;y++){let M=C[y];M.setSize&&M.setSize(A,P)}},this.setEffects=function(A){C=A,T=C.length>0&&C[0].isRenderPass===!0;let P=o.width,y=o.height;C.length>0&&a===null&&(a=new Qt(P,y,{type:on,depthBuffer:!1,stencilBuffer:!1}),l=new Qt(P,y,{type:on,depthBuffer:!1,stencilBuffer:!1}));let M=i===!0&&C.some(G=>G.needsDepthTexture===!0);M!==(o.depthTexture!==null)&&(M===!0&&c===null&&(c=new wi(P,y),r===!0&&(c.format=hs,c.type=rr)),o.dispose(),o.depthTexture=M?c:null,o.resolveDepthBuffer=M,o.storeMultisampledDepthBuffer=M);for(let G=0;G<C.length;G++){let N=C[G];N.setSize&&N.setSize(P,y),M&&N.needsDepthTexture===!0&&N.setDepthTexture&&N.setDepthTexture(c)}},this.begin=function(A,P){if(m||A.toneMapping===zi&&C.length===0)return!1;if(b=P,P!==null){let y=P.width,M=P.height;(o.width!==y||o.height!==M)&&this.setSize(y,M)}return T===!1&&A.setRenderTarget(o),g=A.toneMapping,A.toneMapping=zi,!0},this.hasRenderPass=function(){return T},this.end=function(A,P){A.toneMapping=g,m=!0;let y=o,M=a;for(let G=0;G<C.length;G++){let N=C[G];N.enabled!==!1&&(N.render(A,M,y,P),N.needsSwap!==!1&&(y=M,M=M===a?l:a))}if(f!==A.outputColorSpace||_!==A.toneMapping){f=A.outputColorSpace,_=A.toneMapping,h.defines={},_t.getTransfer(f)===Pt&&(h.defines.SRGB_TRANSFER="");let G=cT[_];G&&(h.defines[G]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=y.texture,A.setRenderTarget(b),A.render(d,p),b=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),u.dispose(),h.dispose()}}var Hm=new Hn,Um=new wi(1,1),km=new Go(1),Bm=new No,zm=new ml,Gm=new zo,gm=[],xm=[],ym=new Float32Array(16),_m=new Float32Array(9),Em=new Float32Array(4);function to(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=gm[i];if(r===void 0&&(r=new Float32Array(i),gm[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function yn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function _n(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Sc(s,e){let t=xm[e];t===void 0&&(t=new Int32Array(e),xm[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function hT(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function dT(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yn(t,e))return;s.uniform2fv(this.addr,e),_n(t,e)}}function pT(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yn(t,e))return;s.uniform3fv(this.addr,e),_n(t,e)}}function fT(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yn(t,e))return;s.uniform4fv(this.addr,e),_n(t,e)}}function mT(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(yn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),_n(t,e)}else{if(yn(t,n))return;Em.set(n),s.uniformMatrix2fv(this.addr,!1,Em),_n(t,n)}}function gT(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(yn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),_n(t,e)}else{if(yn(t,n))return;_m.set(n),s.uniformMatrix3fv(this.addr,!1,_m),_n(t,n)}}function xT(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(yn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),_n(t,e)}else{if(yn(t,n))return;ym.set(n),s.uniformMatrix4fv(this.addr,!1,ym),_n(t,n)}}function yT(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function _T(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yn(t,e))return;s.uniform2iv(this.addr,e),_n(t,e)}}function ET(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yn(t,e))return;s.uniform3iv(this.addr,e),_n(t,e)}}function vT(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yn(t,e))return;s.uniform4iv(this.addr,e),_n(t,e)}}function bT(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function TT(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yn(t,e))return;s.uniform2uiv(this.addr,e),_n(t,e)}}function MT(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yn(t,e))return;s.uniform3uiv(this.addr,e),_n(t,e)}}function ST(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yn(t,e))return;s.uniform4uiv(this.addr,e),_n(t,e)}}function wc(s){return s.version===0&&(s.compareFunction=sd,s.needsUpdate=!0),s}function wT(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=wc(Um):r=Hm,t.setTexture2D(e||r,i)}function CT(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||zm,i)}function RT(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=wc(km):r=Gm,t.setTextureCube(e||r,i)}function AT(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Bm,i)}function PT(s){switch(s){case 5126:return hT;case 35664:return dT;case 35665:return pT;case 35666:return fT;case 35674:return mT;case 35675:return gT;case 35676:return xT;case 5124:case 35670:return yT;case 35667:case 35671:return _T;case 35668:case 35672:return ET;case 35669:case 35673:return vT;case 5125:return bT;case 36294:return TT;case 36295:return MT;case 36296:return ST;case 35678:case 36198:case 36298:case 36306:case 35682:return wT;case 35679:case 36299:case 36307:return CT;case 35680:case 36300:case 36308:case 36293:return RT;case 36289:case 36303:case 36311:case 36292:return AT}}function IT(s,e){s.uniform1fv(this.addr,e)}function LT(s,e){let t=to(e,this.size,2);s.uniform2fv(this.addr,t)}function DT(s,e){let t=to(e,this.size,3);s.uniform3fv(this.addr,t)}function NT(s,e){let t=to(e,this.size,4);s.uniform4fv(this.addr,t)}function OT(s,e){let t=to(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function FT(s,e){let t=to(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function HT(s,e){let t=to(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function UT(s,e){s.uniform1iv(this.addr,e)}function kT(s,e){s.uniform2iv(this.addr,e)}function BT(s,e){s.uniform3iv(this.addr,e)}function zT(s,e){s.uniform4iv(this.addr,e)}function GT(s,e){s.uniform1uiv(this.addr,e)}function VT(s,e){s.uniform2uiv(this.addr,e)}function WT(s,e){s.uniform3uiv(this.addr,e)}function qT(s,e){s.uniform4uiv(this.addr,e)}function XT(s,e,t){let n=this.cache,i=e.length,r=Sc(t,i);yn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=wc(Um):o=Hm;for(let a=0;a!==i;++a)t.setTexture2D(e[a]||o,r[a])}function YT(s,e,t){let n=this.cache,i=e.length,r=Sc(t,i);yn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||zm,r[o])}function KT(s,e,t){let n=this.cache,i=e.length,r=Sc(t,i);yn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));let o;this.type===s.SAMPLER_CUBE_SHADOW?o=wc(km):o=Gm;for(let a=0;a!==i;++a)t.setTextureCube(e[a]||o,r[a])}function ZT(s,e,t){let n=this.cache,i=e.length,r=Sc(t,i);yn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Bm,r[o])}function $T(s){switch(s){case 5126:return IT;case 35664:return LT;case 35665:return DT;case 35666:return NT;case 35674:return OT;case 35675:return FT;case 35676:return HT;case 5124:case 35670:return UT;case 35667:case 35671:return kT;case 35668:case 35672:return BT;case 35669:case 35673:return zT;case 5125:return GT;case 36294:return VT;case 36295:return WT;case 36296:return qT;case 35678:case 36198:case 36298:case 36306:case 35682:return XT;case 35679:case 36299:case 36307:return YT;case 35680:case 36300:case 36308:case 36293:return KT;case 36289:case 36303:case 36311:case 36292:return ZT}}var xd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=PT(t.type)}},yd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$T(t.type)}},_d=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},md=/(\w+)(\])?(\[|\.)?/g;function vm(s,e){s.seq.push(e),s.map[e.id]=e}function JT(s,e,t){let n=s.name,i=n.length;for(md.lastIndex=0;;){let r=md.exec(n),o=md.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){vm(t,c===void 0?new xd(a,s,e):new yd(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new _d(a),vm(t,h)),t=h}}}var eo=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);JT(a,l,this)}let i=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function bm(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var jT=37297,QT=0;function eM(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Tm=new Qe;function tM(s){_t._getMatrix(Tm,_t.workingColorSpace,s);let e=`mat3( ${Tm.elements.map(t=>t.toFixed(4))} )`;switch(_t.getTransfer(s)){case Lo:return[e,"LinearTransferOETF"];case Pt:return[e,"sRGBTransferOETF"];default:return Ye("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Mm(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+eM(s.getShaderSource(e),a)}else return r}function nM(s,e){let t=tM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var iM={[Gh]:"Linear",[Vh]:"Reinhard",[Wh]:"Cineon",[qh]:"ACESFilmic",[Yh]:"AgX",[Kh]:"Neutral",[Xh]:"Custom"};function sM(s,e){let t=iM[e];return t===void 0?(Ye("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var bc=new w;function rM(){_t.getLuminanceCoefficients(bc);let s=bc.x.toFixed(4),e=bc.y.toFixed(4),t=bc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function oM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(aa).join(`
`)}function aM(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function lM(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function aa(s){return s!==""}function Sm(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function wm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var cM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ed(s){return s.replace(cM,uM)}function uM(s,e){let t=st[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Ed(t)}var hM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cm(s){return s.replace(hM,dM)}function dM(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Rm(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var pM={[tr]:"SHADOWMAP_TYPE_PCF",[Jr]:"SHADOWMAP_TYPE_VSM"};function fM(s){return pM[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var mM={[jr]:"ENVMAP_MODE_REFRACTION"};function gM(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":mM[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var xM={[Jo]:"ENVMAP_BLENDING_MULTIPLY",[Xf]:"ENVMAP_BLENDING_MIX",[Yf]:"ENVMAP_BLENDING_ADD"};function yM(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":xM[s.combine]||"ENVMAP_BLENDING_NONE"}function _M(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=fM(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=gM(t),h=yM(t),d=oM(t),p=aM(r),f=i.createProgram(),_,m,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(aa).join(`
`),_.length>0&&(_+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(aa).join(`
`),m.length>0&&(m+=`
`)):(_=[Rm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(aa).join(`
`),m=[Rm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zi?"#define TONE_MAPPING":"",t.toneMapping!==zi?st.tonemapping_pars_fragment:"",t.toneMapping!==zi?sM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",st.colorspace_pars_fragment,nM("linearToOutputTexel",t.outputColorSpace),rM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(aa).join(`
`)),o=Ed(o),o=Sm(o,t),o=wm(o,t),a=Ed(a),a=Sm(a,t),a=wm(a,t),o=Cm(o),a=Cm(a),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,m=["#define varying in",t.glslVersion===od?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===od?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=g+_+o,C=g+m+a,T=bm(i,i.VERTEX_SHADER,b),A=bm(i,i.FRAGMENT_SHADER,C);i.attachShader(f,T),i.attachShader(f,A),t.index0AttributeName!==void 0?i.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(f,0,"position"),i.linkProgram(f);function P(N){if(s.debug.checkShaderErrors){let O=i.getProgramInfoLog(f)||"",W=i.getShaderInfoLog(T)||"",$=i.getShaderInfoLog(A)||"",D=O.trim(),X=W.trim(),ie=$.trim(),z=!0,ce=!0;if(i.getProgramParameter(f,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,f,T,A);else{let Z=Mm(i,T,"vertex"),se=Mm(i,A,"fragment");Je("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(f,i.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+D+`
`+Z+`
`+se)}else D!==""?Ye("WebGLProgram: Program Info Log:",D):(X===""||ie==="")&&(ce=!1);ce&&(N.diagnostics={runnable:z,programLog:D,vertexShader:{log:X,prefix:_},fragmentShader:{log:ie,prefix:m}})}i.deleteShader(T),i.deleteShader(A),y=new eo(i,f),M=lM(i,f)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let M;this.getAttributes=function(){return M===void 0&&P(this),M};let G=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return G===!1&&(G=i.getProgramParameter(f,jT)),G},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=QT++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=T,this.fragmentShader=A,this}var EM=0,vd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new bd(e),t.set(e,n)),n}},bd=class{constructor(e){this.id=EM++,this.code=e,this.usedTimes=0}};function vM(s){return s===Rs||s===ia||s===sa}function bM(s,e,t,n,i,r){let o=new qr,a=new vd,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return l.add(y),y===0?"uv":`uv${y}`}function f(y,M,G,N,O,W){let $=N.fog,D=O.geometry,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?N.environment:null,ie=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,z=e.get(y.envMap||X,ie),ce=d[y.type],Z=n.precision;y.precision!==null&&(Z=n.getMaxPrecision(y.precision),Z!==y.precision&&Ye("WebGLProgram.getParameters:",y.precision,"not supported, using",Z,"instead."));let se=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,le=se!==void 0?se.length:0,Pe=0;D.morphAttributes.position!==void 0&&(Pe=1),D.morphAttributes.normal!==void 0&&(Pe=2),D.morphAttributes.color!==void 0&&(Pe=3);let Ke,j,Te,Ae;if(ce){let we=Vi[ce];Ke=we.vertexShader,j=we.fragmentShader}else{Ke=y.vertexShader,j=y.fragmentShader;let we=a.getVertexShaderStage(y),Dt=a.getFragmentShaderStage(y);a.update(y,we,Dt),Te=we.id,Ae=Dt.id}let ze=s.getRenderTarget(),Me=s.state.buffers.depth.getReversed(),et=O.isInstancedMesh===!0,tn=O.isBatchedMesh===!0,$e=!!y.map,Lt=!!y.matcap,Ht=!!z,mt=Ht&&z.isPMREMTexture===!0,Rn=!!y.aoMap,pn=!!y.lightMap,Wn=!!y.bumpMap&&y.wireframe===!1,Zt=!!y.normalMap,Li=!!y.displacementMap,En=!!y.emissiveMap,ii=!!y.metalnessMap,si=!!y.roughnessMap,ri=y.anisotropy>0,R=y.clearcoat>0,oi=y.diffuseRoughness>0,qt=y.dispersion>0,Xt=y.retroreflectivity>0,Se=y.iridescence>0,fn=y.sheen>0,Ze=y.transmission>0,tt=ri&&!!y.anisotropyMap,S=R&&!!y.clearcoatMap,E=R&&!!y.clearcoatNormalMap,k=R&&!!y.clearcoatRoughnessMap,ue=oi&&!!y.diffuseRoughnessMap,re=Se&&!!y.iridescenceMap,pe=Se&&!!y.iridescenceThicknessMap,Ee=fn&&!!y.sheenColorMap,Q=fn&&!!y.sheenRoughnessMap,te=!!y.specularMap,me=!!y.specularColorMap,I=!!y.specularIntensityMap,ne=Ze&&!!y.transmissionMap,J=Ze&&!!y.thicknessMap,ge=!!y.gradientMap,de=!!y.alphaMap,fe=y.alphaTest>0,Ge=!!y.alphaHash,lt=!!y.extensions,he=zi;y.toneMapped&&(ze===null||ze.isXRRenderTarget===!0)&&(he=s.toneMapping);let qe=mt?z.isCompressedCubeTexture?z.image[0].mipmaps:z.mipmaps:null,ot={shaderID:ce,shaderType:y.type,shaderName:y.name,vertexShader:Ke,fragmentShader:j,defines:y.defines,customVertexShaderID:Te,customFragmentShaderID:Ae,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:Z,batching:tn,batchingColor:tn&&O._colorsTexture!==null,instancing:et,instancingColor:et&&O.instanceColor!==null,instancingMorph:et&&O.morphTexture!==null,outputColorSpace:ze===null?s.outputColorSpace:ze.isXRRenderTarget===!0?ze.texture.colorSpace:_t.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:$e,matcap:Lt,envMap:Ht,envMapMode:Ht&&z.mapping,envMapPMREM:mt,envMapMaxLod:mt?qe.length-1:null,envMapSize:mt?qe[0].width:null,aoMap:Rn,lightMap:pn,bumpMap:Wn,normalMap:Zt,displacementMap:Li,emissiveMap:En,normalMapObjectSpace:Zt&&y.normalMapType===$f,normalMapTangentSpace:Zt&&y.normalMapType===ra,packedNormalMap:Zt&&y.normalMapType===ra&&vM(y.normalMap.format),metalnessMap:ii,roughnessMap:si,anisotropy:ri,anisotropyMap:tt,clearcoat:R,clearcoatMap:S,clearcoatNormalMap:E,clearcoatRoughnessMap:k,diffuseRoughness:oi,diffuseRoughnessMap:ue,dispersion:qt,retroreflection:Xt,iridescence:Se,iridescenceMap:re,iridescenceThicknessMap:pe,sheen:fn,sheenColorMap:Ee,sheenRoughnessMap:Q,specularMap:te,specularColorMap:me,specularIntensityMap:I,transmission:Ze,transmissionMap:ne,thicknessMap:J,gradientMap:ge,opaque:y.transparent===!1&&y.blending===Cs&&y.alphaToCoverage===!1,alphaMap:de,alphaTest:fe,alphaHash:Ge,combine:y.combine,mapUv:$e&&p(y.map.channel),aoMapUv:Rn&&p(y.aoMap.channel),lightMapUv:pn&&p(y.lightMap.channel),bumpMapUv:Wn&&p(y.bumpMap.channel),normalMapUv:Zt&&p(y.normalMap.channel),displacementMapUv:Li&&p(y.displacementMap.channel),emissiveMapUv:En&&p(y.emissiveMap.channel),metalnessMapUv:ii&&p(y.metalnessMap.channel),roughnessMapUv:si&&p(y.roughnessMap.channel),anisotropyMapUv:tt&&p(y.anisotropyMap.channel),clearcoatMapUv:S&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:E&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:k&&p(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ue&&p(y.diffuseRoughnessMap.channel),iridescenceMapUv:re&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:Q&&p(y.sheenRoughnessMap.channel),specularMapUv:te&&p(y.specularMap.channel),specularColorMapUv:me&&p(y.specularColorMap.channel),specularIntensityMapUv:I&&p(y.specularIntensityMap.channel),transmissionMapUv:ne&&p(y.transmissionMap.channel),thicknessMapUv:J&&p(y.thicknessMap.channel),alphaMapUv:de&&p(y.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(Zt||ri),vertexNormals:!!D.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!D.attributes.uv&&($e||de),fog:!!$,useFog:y.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||D.attributes.normal===void 0&&Zt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Me,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Pe,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:W.filter(we=>we.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&G.length>0,shadowMapType:s.shadowMap.type,toneMapping:he,decodeVideoTexture:$e&&y.map.isVideoTexture===!0&&_t.getTransfer(y.map.colorSpace)===Pt,decodeVideoTextureEmissive:En&&y.emissiveMap.isVideoTexture===!0&&_t.getTransfer(y.emissiveMap.colorSpace)===Pt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Gt,flipSided:y.side===wn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:lt&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(lt&&y.extensions.multiDraw===!0||tn)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ot.vertexUv1s=l.has(1),ot.vertexUv2s=l.has(2),ot.vertexUv3s=l.has(3),l.clear(),ot}function _(y){let M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(let G in y.defines)M.push(G),M.push(y.defines[G]);return y.isRawShaderMaterial===!1&&(m(M,y),g(M,y),M.push(s.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function m(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapPMREM),y.push(M.envMapMaxLod),y.push(M.envMapSize),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.diffuseRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.numSunLights),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numSunLightShadows),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.numLightProbeGrids),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function g(y,M){o.disableAll(),M.instancing&&o.enable(0),M.instancingColor&&o.enable(1),M.instancingMorph&&o.enable(2),M.matcap&&o.enable(3),M.envMap&&o.enable(4),M.normalMapObjectSpace&&o.enable(5),M.normalMapTangentSpace&&o.enable(6),M.clearcoat&&o.enable(7),M.iridescence&&o.enable(8),M.alphaTest&&o.enable(9),M.vertexColors&&o.enable(10),M.vertexAlphas&&o.enable(11),M.vertexUv1s&&o.enable(12),M.vertexUv2s&&o.enable(13),M.vertexUv3s&&o.enable(14),M.vertexTangents&&o.enable(15),M.anisotropy&&o.enable(16),M.alphaHash&&o.enable(17),M.batching&&o.enable(18),M.dispersion&&o.enable(19),M.retroreflection&&o.enable(24),M.diffuseRoughness&&o.enable(25),M.batchingColor&&o.enable(20),M.gradientMap&&o.enable(21),M.packedNormalMap&&o.enable(22),M.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),M.numLightProbeGrids>0&&o.enable(22),M.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function b(y){let M=d[y.type],G;if(M){let N=Vi[M];G=cm.clone(N.uniforms)}else G=y.uniforms;return G}function C(y,M){let G=u.get(M);return G!==void 0?++G.usedTimes:(G=new _M(s,M,y,i),c.push(G),u.set(M,G)),G}function T(y){if(--y.usedTimes===0){let M=c.indexOf(y);c[M]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function A(y){a.remove(y)}function P(){a.dispose()}return{getParameters:f,getProgramCacheKey:_,getUniforms:b,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:c,dispose:P}}function TM(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function MM(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Am(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Pm(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function a(d,p,f,_,m,g){let b=s[e];return b===void 0?(b={id:d.id,object:d,geometry:p,material:f,materialVariant:o(d),groupOrder:_,renderOrder:d.renderOrder,z:m,group:g},s[e]=b):(b.id=d.id,b.object=d,b.geometry=p,b.material=f,b.materialVariant=o(d),b.groupOrder=_,b.renderOrder=d.renderOrder,b.z=m,b.group=g),e++,b}function l(d,p,f,_,m,g,b){b.reversedDepth===!0&&(m=-m);let C=a(d,p,f,_,m,g);f.transmission>0?n.push(C):f.transparent===!0?i.push(C):t.push(C)}function c(d,p,f,_,m,g){let b=a(d,p,f,_,m,g);f.transmission>0?n.unshift(b):f.transparent===!0?i.unshift(b):t.unshift(b)}function u(d,p){t.length>1&&t.sort(d||MM),n.length>1&&n.sort(p||Am),i.length>1&&i.sort(p||Am)}function h(){for(let d=e,p=s.length;d<p;d++){let f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:h,sort:u}}function SM(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new Pm,s.set(n,[o])):i>=r.length?(o=new Pm,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function wM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new w,color:new x};break;case"SpotLight":t={position:new w,direction:new w,color:new x,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new x,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new x,groundColor:new x};break;case"RectAreaLight":t={color:new x,position:new w,halfWidth:new w,halfHeight:new w};break}return s[e.id]=t,t}}}function CM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _e,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var RM=0;function AM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function PM(s){let e=new wM,t=CM(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new w);let i=new w,r=new Ie,o=new Ie;function a(c){let u=0,h=0,d=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let p=0,f=0,_=0,m=0,g=0,b=0,C=0,T=0,A=0,P=0,y=0,M=0,G=0,N=0;c.sort(AM);for(let W=0,$=c.length;W<$;W++){let D=c[W],X=D.color,ie=D.intensity,z=D.distance,ce=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Rs?ce=D.shadow.map.texture:ce=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=X.r*ie,h+=X.g*ie,d+=X.b*ie;else if(D.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(D.sh.coefficients[Z],ie);N++}else if(D.isSunLight){let Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let se=D.shadow,le=t.get(D);le.shadowIntensity=se.intensity,le.shadowBias=se.bias,le.shadowNormalBias=se.normalBias,le.shadowRadius=se.radius,le.shadowMapSize.copy(se.mapSize).multiply(se.getFrameExtents()),n.sunShadow[f]=le,n.sunShadowMap[f]=ce;let Pe=se.getViewportCount();for(let Ke=0;Ke<Pe;Ke++)n.sunShadowMatrix[_+Ke]=se.getMatrix(Ke),n.sunShadowCascade[_+Ke]=se._cascadeData[Ke];_+=Pe,f++}n.sun[p]=Z,p++}else if(D.isDirectionalLight){let Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let se=D.shadow,le=t.get(D);le.shadowIntensity=se.intensity,le.shadowBias=se.bias,le.shadowNormalBias=se.normalBias,le.shadowRadius=se.radius,le.shadowMapSize=se.mapSize,n.directionalShadow[m]=le,n.directionalShadowMap[m]=ce,n.directionalShadowMatrix[m]=D.shadow.matrix,A++}n.directional[m]=Z,m++}else if(D.isSpotLight){let Z=e.get(D);Z.position.setFromMatrixPosition(D.matrixWorld),Z.color.copy(X).multiplyScalar(ie),Z.distance=z,Z.coneCos=Math.cos(D.angle),Z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Z.decay=D.decay,n.spot[b]=Z;let se=D.shadow;if(D.map&&(n.spotLightMap[M]=D.map,M++,se.updateMatrices(D),D.castShadow&&G++),n.spotLightMatrix[b]=se.matrix,D.castShadow){let le=t.get(D);le.shadowIntensity=se.intensity,le.shadowBias=se.bias,le.shadowNormalBias=se.normalBias,le.shadowRadius=se.radius,le.shadowMapSize=se.mapSize,n.spotShadow[b]=le,n.spotShadowMap[b]=ce,y++}b++}else if(D.isRectAreaLight){let Z=e.get(D);Z.color.copy(X).multiplyScalar(ie),Z.halfWidth.set(D.width*.5,0,0),Z.halfHeight.set(0,D.height*.5,0),n.rectArea[C]=Z,C++}else if(D.isPointLight){let Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),Z.distance=D.distance,Z.decay=D.decay,D.castShadow){let se=D.shadow,le=t.get(D);le.shadowIntensity=se.intensity,le.shadowBias=se.bias,le.shadowNormalBias=se.normalBias,le.shadowRadius=se.radius,le.shadowMapSize=se.mapSize,le.shadowCameraNear=se.camera.near,le.shadowCameraFar=se.camera.far,n.pointShadow[g]=le,n.pointShadowMap[g]=ce,n.pointShadowMatrix[g]=D.shadow.matrix,P++}n.point[g]=Z,g++}else if(D.isHemisphereLight){let Z=e.get(D);Z.skyColor.copy(D.color).multiplyScalar(ie),Z.groundColor.copy(D.groundColor).multiplyScalar(ie),n.hemi[T]=Z,T++}}C>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let O=n.hash;(O.sunLength!==p||O.directionalLength!==m||O.pointLength!==g||O.spotLength!==b||O.rectAreaLength!==C||O.hemiLength!==T||O.numSunShadows!==f||O.numDirectionalShadows!==A||O.numPointShadows!==P||O.numSpotShadows!==y||O.numSpotMaps!==M||O.numLightProbes!==N)&&(n.sun.length=p,n.directional.length=m,n.spot.length=b,n.rectArea.length=C,n.point.length=g,n.hemi.length=T,n.sunShadow.length=f,n.sunShadowMap.length=f,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=P,n.pointShadowMap.length=P,n.pointShadowMatrix.length=P,n.spotShadow.length=y,n.spotShadowMap.length=y,n.spotLightMatrix.length=y+M-G,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=G,n.numLightProbes=N,O.sunLength=p,O.directionalLength=m,O.pointLength=g,O.spotLength=b,O.rectAreaLength=C,O.hemiLength=T,O.numSunShadows=f,O.numDirectionalShadows=A,O.numPointShadows=P,O.numSpotShadows=y,O.numSpotMaps=M,O.numLightProbes=N,n.version=RM++)}function l(c,u){let h=0,d=0,p=0,f=0,_=0,m=0,g=u.matrixWorldInverse;for(let b=0,C=c.length;b<C;b++){let T=c[b];if(T.isSunLight){let A=n.sun[h];A.direction.setFromMatrixPosition(T.matrixWorld),A.direction.transformDirection(g),h++}else if(T.isDirectionalLight){let A=n.directional[d];A.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),d++}else if(T.isSpotLight){let A=n.spot[f];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(g),A.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(g),f++}else if(T.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(g),o.identity(),r.copy(T.matrixWorld),r.premultiply(g),o.extractRotation(r),A.halfWidth.set(T.width*.5,0,0),A.halfHeight.set(0,T.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){let A=n.point[p];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(g),p++}else if(T.isHemisphereLight){let A=n.hemi[m];A.direction.setFromMatrixPosition(T.matrixWorld),A.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function Im(s){let e=new PM(s),t=[],n=[],i=[];function r(h){u.camera=h,t.length=0,n.length=0,i.length=0}function o(h){h.isLightProbeGrid?i.push(h):t.push(h)}function a(h){n.push(h)}function l(){e.setup(t),i.sort((h,d)=>h.priority-d.priority||h.id-d.id)}function c(h){e.setupView(t,h)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function IM(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new Im(s),e.set(i,[a])):r>=o.length?(a=new Im(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var LM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,DM=`uniform sampler2D shadow_pass;
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
}`,NM=[new w(1,0,0),new w(-1,0,0),new w(0,1,0),new w(0,-1,0),new w(0,0,1),new w(0,0,-1)],OM=[new w(0,-1,0),new w(0,-1,0),new w(0,0,1),new w(0,0,-1),new w(0,-1,0),new w(0,-1,0)],Lm=new Ie,oa=new w,gd=new w;function FM(s,e,t){let n=new ki,i=new _e,r=new _e,o=new kt,a=new Kr,l=new vl,c={},u=t.maxTextureSize,h={[$n]:wn,[wn]:$n,[Gt]:Gt},d=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _e},radius:{value:4}},vertexShader:LM,fragmentShader:DM}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let f=new hn;f.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new bt(f,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tr;let g=this.type;this.render=function(P,y,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;this.type===Cf&&(Ye("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=tr);let G=s.getRenderTarget(),N=s.getActiveCubeFace(),O=s.getActiveMipmapLevel(),W=s.state;W.setBlending(nr),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let $=g!==this.type;$&&y.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(X=>X.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,X=P.length;D<X;D++){let ie=P[D],z=ie.shadow;if(z===void 0){Ye("WebGLShadowMap:",ie,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);let ce=z.getFrameExtents();i.multiply(ce),r.copy(z.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ce.x),i.x=r.x*ce.x,z.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ce.y),i.y=r.y*ce.y,z.mapSize.y=r.y));let Z=s.state.buffers.depth.getReversed();if(z.camera._reversedDepth=Z,z.map===null||$===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Jr){if(ie.isPointLight){Ye("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Qt(i.x,i.y,{format:Rs,type:on,minFilter:Sn,magFilter:Sn,generateMipmaps:!1}),z.map.texture.name=ie.name+".shadowMap",z.map.depthTexture=new wi(i.x,i.y,fi),z.map.depthTexture.name=ie.name+".shadowMapDepth",z.map.depthTexture.format=cs,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Wt,z.map.depthTexture.magFilter=Wt}else ie.isPointLight?(z.map=new la(i.x),z.map.depthTexture=new Go(i.x,Ri)):(z.map=new Qt(i.x,i.y),z.map.depthTexture=new wi(i.x,i.y,Ri)),z.map.depthTexture.name=ie.name+".shadowMap",z.map.depthTexture.format=cs,this.type===tr?(z.map.depthTexture.compareFunction=Z?id:nd,z.map.depthTexture.minFilter=Sn,z.map.depthTexture.magFilter=Sn):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Wt,z.map.depthTexture.magFilter=Wt);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==i.x||z.map.height!==i.y)&&z.map.setSize(i.x,i.y);let se=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();ie.isPointLight!==!0&&z.updateMatrices(ie,M);let le=(z.camera.layers.mask&4294967294)!==0?z.camera.layers:M.layers;for(let Pe=0;Pe<se;Pe++){let Ke=z.getCamera(Pe);if(ie.isPointLight){let j=z.camera,Te=z.matrix,Ae=ie.distance||j.far;Ae!==j.far&&(j.far=Ae,j.updateProjectionMatrix()),oa.setFromMatrixPosition(ie.matrixWorld),j.position.copy(oa),gd.copy(j.position),gd.add(NM[Pe]),j.up.copy(OM[Pe]),j.lookAt(gd),j.updateMatrixWorld(),Te.makeTranslation(-oa.x,-oa.y,-oa.z),Lm.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Lm,j.coordinateSystem,j.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)s.setRenderTarget(z.map,Pe),s.clear();else{Pe===0&&(s.setRenderTarget(z.map),s.clear());let j=z.getViewport(Pe);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),W.viewport(o)}n=z.getFrustum(Pe),T(y,M,Ke,ie,le,this.type)}z.isPointLightShadow!==!0&&this.type===Jr&&b(z,M),z.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(G,N,O)};function b(P,y){let M=e.update(_);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null?P.mapPass=new Qt(i.x,i.y,{format:Rs,type:on}):(P.mapPass.width!==P.map.width||P.mapPass.height!==P.map.height)&&P.mapPass.setSize(P.map.width,P.map.height),d.uniforms.shadow_pass.value=P.map.depthTexture,d.uniforms.resolution.value.set(P.map.width,P.map.height),d.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(y,null,M,d,_,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value.set(P.map.width,P.map.height),p.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(y,null,M,p,_,null)}function C(P,y,M,G){let N=null,O=M.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(O!==void 0)N=O;else if(N=M.isPointLight===!0?l:a,s.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let W=N.uuid,$=y.uuid,D=c[W];D===void 0&&(D={},c[W]=D);let X=D[$];X===void 0&&(X=N.clone(),D[$]=X,y.addEventListener("dispose",A)),N=X}if(N.visible=y.visible,N.wireframe=y.wireframe,G===Jr?N.side=y.shadowSide!==null?y.shadowSide:y.side:N.side=y.shadowSide!==null?y.shadowSide:h[y.side],N.alphaMap=y.alphaMap,N.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,N.map=y.map,N.clipShadows=y.clipShadows,N.clippingPlanes=y.clippingPlanes,N.clipIntersection=y.clipIntersection,N.displacementMap=y.displacementMap,N.displacementScale=y.displacementScale,N.displacementBias=y.displacementBias,N.wireframeLinewidth=y.wireframeLinewidth,N.linewidth=y.linewidth,M.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let W=s.properties.get(N);W.light=M}return N}function T(P,y,M,G,N,O){if(P.visible===!1)return;if(P.layers.test(N)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&O===Jr)&&(!P.frustumCulled||P.intersectsFrustum(n))){P.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,P.matrixWorld);let D=e.update(P),X=P.material;if(Array.isArray(X)){let ie=D.groups;for(let z=0,ce=ie.length;z<ce;z++){let Z=ie[z],se=X[Z.materialIndex];if(se&&se.visible){let le=C(P,se,G,O);P.onBeforeShadow(s,P,y,M,D,le,Z),s.renderBufferDirect(M,null,D,le,P,Z),P.onAfterShadow(s,P,y,M,D,le,Z)}}}else if(X.visible){let ie=C(P,X,G,O);P.onBeforeShadow(s,P,y,M,D,ie,null),s.renderBufferDirect(M,null,D,ie,P,null),P.onAfterShadow(s,P,y,M,D,ie,null)}}let $=P.children;for(let D=0,X=$.length;D<X;D++)T($[D],y,M,G,N,O)}function A(P){P.target.removeEventListener("dispose",A);for(let M in c){let G=c[M],N=P.target.uuid;N in G&&(G[N].dispose(),delete G[N])}}}function HM(s,e){function t(){let I=!1,ne=new kt,J=null,ge=new kt(0,0,0,0);return{setMask:function(de){J!==de&&!I&&(s.colorMask(de,de,de,de),J=de)},setLocked:function(de){I=de},setClear:function(de,fe,Ge,lt,he){he===!0&&(de*=lt,fe*=lt,Ge*=lt),ne.set(de,fe,Ge,lt),ge.equals(ne)===!1&&(s.clearColor(de,fe,Ge,lt),ge.copy(ne))},reset:function(){I=!1,J=null,ge.set(-1,0,0,0)}}}function n(){let I=!1,ne=!1,J=null,ge=null,de=null;return{setReversed:function(fe){if(ne!==fe){let Ge=e.get("EXT_clip_control");fe?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),ne=fe;let lt=de;de=null,this.setClear(lt)}},getReversed:function(){return ne},setTest:function(fe){fe?Me(s.DEPTH_TEST):et(s.DEPTH_TEST)},setMask:function(fe){J!==fe&&!I&&(s.depthMask(fe),J=fe)},setFunc:function(fe){if(ne&&(fe=om[fe]),ge!==fe){switch(fe){case sl:s.depthFunc(s.NEVER);break;case rl:s.depthFunc(s.ALWAYS);break;case ol:s.depthFunc(s.LESS);break;case kr:s.depthFunc(s.LEQUAL);break;case al:s.depthFunc(s.EQUAL);break;case ll:s.depthFunc(s.GEQUAL);break;case cl:s.depthFunc(s.GREATER);break;case ul:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ge=fe}},setLocked:function(fe){I=fe},setClear:function(fe){de!==fe&&(de=fe,ne&&(fe=1-fe),s.clearDepth(fe))},reset:function(){I=!1,J=null,ge=null,de=null,ne=!1}}}function i(){let I=!1,ne=null,J=null,ge=null,de=null,fe=null,Ge=null,lt=null,he=null;return{setTest:function(qe){I||(qe?Me(s.STENCIL_TEST):et(s.STENCIL_TEST))},setMask:function(qe){ne!==qe&&!I&&(s.stencilMask(qe),ne=qe)},setFunc:function(qe,ot,we){(J!==qe||ge!==ot||de!==we)&&(s.stencilFunc(qe,ot,we),J=qe,ge=ot,de=we)},setOp:function(qe,ot,we){(fe!==qe||Ge!==ot||lt!==we)&&(s.stencilOp(qe,ot,we),fe=qe,Ge=ot,lt=we)},setLocked:function(qe){I=qe},setClear:function(qe){he!==qe&&(s.clearStencil(qe),he=qe)},reset:function(){I=!1,ne=null,J=null,ge=null,de=null,fe=null,Ge=null,lt=null,he=null}}}let r=new t,o=new n,a=new i,l={},c=new WeakMap,u={},h={},d={},p=new WeakMap,f=[],_=null,m=!1,g=null,b=null,C=null,T=null,A=null,P=null,y=null,M=new x(0,0,0),G=0,N=!1,O=null,W=null,$=null,D=null,X=null,ie=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,ce=0,Z=s.getParameter(s.VERSION);Z.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec(Z)[1]),z=ce>=1):Z.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),z=ce>=2);let se=null,le={},Pe=s.getParameter(s.SCISSOR_BOX),Ke=s.getParameter(s.VIEWPORT),j=new kt().fromArray(Pe),Te=new kt().fromArray(Ke);function Ae(I,ne,J,ge){let de=new Uint8Array(4),fe=s.createTexture();s.bindTexture(I,fe),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ge=0;Ge<J;Ge++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(ne,0,s.RGBA,1,1,ge,0,s.RGBA,s.UNSIGNED_BYTE,de):s.texImage2D(ne+Ge,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,de);return fe}let ze={};ze[s.TEXTURE_2D]=Ae(s.TEXTURE_2D,s.TEXTURE_2D,1),ze[s.TEXTURE_CUBE_MAP]=Ae(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ze[s.TEXTURE_2D_ARRAY]=Ae(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ze[s.TEXTURE_3D]=Ae(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Me(s.DEPTH_TEST),o.setFunc(kr),Wn(!1),Zt(Hh),Me(s.CULL_FACE),Rn(nr);function Me(I){u[I]!==!0&&(s.enable(I),u[I]=!0)}function et(I){u[I]!==!1&&(s.disable(I),u[I]=!1)}function tn(I,ne){return d[I]!==ne?(s.bindFramebuffer(I,ne),d[I]=ne,I===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ne),I===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ne),!0):!1}function $e(I,ne){let J=f,ge=!1;if(I){J=p.get(ne),J===void 0&&(J=[],p.set(ne,J));let de=I.textures;if(J.length!==de.length||J[0]!==s.COLOR_ATTACHMENT0){for(let fe=0,Ge=de.length;fe<Ge;fe++)J[fe]=s.COLOR_ATTACHMENT0+fe;J.length=de.length,ge=!0}}else J[0]!==s.BACK&&(J[0]=s.BACK,ge=!0);ge&&s.drawBuffers(J)}function Lt(I){return _!==I?(s.useProgram(I),_=I,!0):!1}let Ht={[ir]:s.FUNC_ADD,[Af]:s.FUNC_SUBTRACT,[Pf]:s.FUNC_REVERSE_SUBTRACT};Ht[If]=s.MIN,Ht[Lf]=s.MAX;let mt={[Df]:s.ZERO,[Nf]:s.ONE,[Of]:s.SRC_COLOR,[Bh]:s.SRC_ALPHA,[zf]:s.SRC_ALPHA_SATURATE,[kf]:s.DST_COLOR,[Hf]:s.DST_ALPHA,[Ff]:s.ONE_MINUS_SRC_COLOR,[zh]:s.ONE_MINUS_SRC_ALPHA,[Bf]:s.ONE_MINUS_DST_COLOR,[Uf]:s.ONE_MINUS_DST_ALPHA,[Gf]:s.CONSTANT_COLOR,[Vf]:s.ONE_MINUS_CONSTANT_COLOR,[Wf]:s.CONSTANT_ALPHA,[qf]:s.ONE_MINUS_CONSTANT_ALPHA};function Rn(I,ne,J,ge,de,fe,Ge,lt,he,qe){if(I===nr){m===!0&&(et(s.BLEND),m=!1);return}if(m===!1&&(Me(s.BLEND),m=!0),I!==Rf){if(I!==g||qe!==N){if((b!==ir||A!==ir)&&(s.blendEquation(s.FUNC_ADD),b=ir,A=ir),qe)switch(I){case Cs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ln:s.blendFunc(s.ONE,s.ONE);break;case Uh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case kh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Je("WebGLState: Invalid blending: ",I);break}else switch(I){case Cs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ln:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Uh:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case kh:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",I);break}C=null,T=null,P=null,y=null,M.set(0,0,0),G=0,g=I,N=qe}return}de=de||ne,fe=fe||J,Ge=Ge||ge,(ne!==b||de!==A)&&(s.blendEquationSeparate(Ht[ne],Ht[de]),b=ne,A=de),(J!==C||ge!==T||fe!==P||Ge!==y)&&(s.blendFuncSeparate(mt[J],mt[ge],mt[fe],mt[Ge]),C=J,T=ge,P=fe,y=Ge),(lt.equals(M)===!1||he!==G)&&(s.blendColor(lt.r,lt.g,lt.b,he),M.copy(lt),G=he),g=I,N=!1}function pn(I,ne){I.side===Gt?et(s.CULL_FACE):Me(s.CULL_FACE);let J=I.side===wn;ne&&(J=!J),Wn(J),I.blending===Cs&&I.transparent===!1?Rn(nr):Rn(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);let ge=I.stencilWrite;a.setTest(ge),ge&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),En(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Me(s.SAMPLE_ALPHA_TO_COVERAGE):et(s.SAMPLE_ALPHA_TO_COVERAGE)}function Wn(I){O!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),O=I)}function Zt(I){I!==Sf?(Me(s.CULL_FACE),I!==W&&(I===Hh?s.cullFace(s.BACK):I===wf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):et(s.CULL_FACE),W=I}function Li(I){I!==$&&(z&&s.lineWidth(I),$=I)}function En(I,ne,J){I?(Me(s.POLYGON_OFFSET_FILL),(D!==ne||X!==J)&&(D=ne,X=J,o.getReversed()&&(ne=-ne,J=-J),s.polygonOffset(ne,J))):et(s.POLYGON_OFFSET_FILL)}function ii(I){I?Me(s.SCISSOR_TEST):et(s.SCISSOR_TEST)}function si(I){I===void 0&&(I=s.TEXTURE0+ie-1),se!==I&&(s.activeTexture(I),se=I)}function ri(I,ne,J){J===void 0&&(se===null?J=s.TEXTURE0+ie-1:J=se);let ge=le[J];ge===void 0&&(ge={type:void 0,texture:void 0},le[J]=ge),(ge.type!==I||ge.texture!==ne)&&(se!==J&&(s.activeTexture(J),se=J),s.bindTexture(I,ne||ze[I]),ge.type=I,ge.texture=ne)}function R(){let I=le[se];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function oi(){try{s.compressedTexImage2D(...arguments)}catch(I){Je("WebGLState:",I)}}function qt(){try{s.compressedTexImage3D(...arguments)}catch(I){Je("WebGLState:",I)}}function Xt(){try{s.texSubImage2D(...arguments)}catch(I){Je("WebGLState:",I)}}function Se(){try{s.texSubImage3D(...arguments)}catch(I){Je("WebGLState:",I)}}function fn(){try{s.compressedTexSubImage2D(...arguments)}catch(I){Je("WebGLState:",I)}}function Ze(){try{s.compressedTexSubImage3D(...arguments)}catch(I){Je("WebGLState:",I)}}function tt(){try{s.texStorage2D(...arguments)}catch(I){Je("WebGLState:",I)}}function S(){try{s.texStorage3D(...arguments)}catch(I){Je("WebGLState:",I)}}function E(){try{s.texImage2D(...arguments)}catch(I){Je("WebGLState:",I)}}function k(){try{s.texImage3D(...arguments)}catch(I){Je("WebGLState:",I)}}function ue(I){return h[I]!==void 0?h[I]:s.getParameter(I)}function re(I,ne){h[I]!==ne&&(s.pixelStorei(I,ne),h[I]=ne)}function pe(I){j.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),j.copy(I))}function Ee(I){Te.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),Te.copy(I))}function Q(I,ne){let J=c.get(ne);J===void 0&&(J=new WeakMap,c.set(ne,J));let ge=J.get(I);ge===void 0&&(ge=s.getUniformBlockIndex(ne,I.name),s.uniformBlockBinding(ne,ge,ge),J.set(I,ge))}function te(I,ne,J){let de=c.get(ne).get(I);l[de]!==J&&(s.bindBufferBase(s.UNIFORM_BUFFER,de,J),l[de]=J)}function me(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),u={},h={},se=null,le={},d={},l={},p=new WeakMap,f=[],_=null,m=!1,g=null,b=null,C=null,T=null,A=null,P=null,y=null,M=new x(0,0,0),G=0,N=!1,O=null,W=null,$=null,D=null,X=null,j.set(0,0,s.canvas.width,s.canvas.height),Te.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Me,disable:et,bindFramebuffer:tn,drawBuffers:$e,useProgram:Lt,setBlending:Rn,setMaterial:pn,setFlipSided:Wn,setCullFace:Zt,setLineWidth:Li,setPolygonOffset:En,setScissorTest:ii,activeTexture:si,bindTexture:ri,unbindTexture:R,compressedTexImage2D:oi,compressedTexImage3D:qt,texImage2D:E,texImage3D:k,pixelStorei:re,getParameter:ue,updateUBOMapping:Q,uniformBlockBinding:te,texStorage2D:tt,texStorage3D:S,texSubImage2D:Xt,texSubImage3D:Se,compressedTexSubImage2D:fn,compressedTexSubImage3D:Ze,scissor:pe,viewport:Ee,reset:me}}function UM(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _e,u=new WeakMap,h=new Set,d,p=new WeakMap,f=new Set,_=new FinalizationRegistry(S=>f.delete(S)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,E){return m?new OffscreenCanvas(S,E):zr("canvas")}function b(S,E,k){let ue=1,re=tt(S);if((re.width>k||re.height>k)&&(ue=k/Math.max(re.width,re.height)),ue<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let pe=Math.floor(ue*re.width),Ee=Math.floor(ue*re.height);d===void 0&&(d=g(pe,Ee));let Q=E?g(pe,Ee):d;return Q.width=pe,Q.height=Ee,Q.getContext("2d").drawImage(S,0,0,pe,Ee),Ye("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+pe+"x"+Ee+")."),Q}else return"data"in S&&Ye("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),S;return S}function C(S){return S.generateMipmaps}function T(S){s.generateMipmap(S)}function A(S){return S.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?s.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function P(S,E,k,ue,re,pe=!1){if(S!==null){if(s[S]!==void 0)return s[S];Ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let Ee;ue&&(Ee=e.get("EXT_texture_norm16"),Ee||Ye("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=E;if(E===s.RED&&(k===s.FLOAT&&(Q=s.R32F),k===s.HALF_FLOAT&&(Q=s.R16F),k===s.UNSIGNED_BYTE&&(Q=s.R8),k===s.UNSIGNED_SHORT&&Ee&&(Q=Ee.R16_EXT),k===s.SHORT&&Ee&&(Q=Ee.R16_SNORM_EXT)),E===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(Q=s.R8UI),k===s.UNSIGNED_SHORT&&(Q=s.R16UI),k===s.UNSIGNED_INT&&(Q=s.R32UI),k===s.BYTE&&(Q=s.R8I),k===s.SHORT&&(Q=s.R16I),k===s.INT&&(Q=s.R32I)),E===s.RG&&(k===s.FLOAT&&(Q=s.RG32F),k===s.HALF_FLOAT&&(Q=s.RG16F),k===s.UNSIGNED_BYTE&&(Q=s.RG8),k===s.UNSIGNED_SHORT&&Ee&&(Q=Ee.RG16_EXT),k===s.SHORT&&Ee&&(Q=Ee.RG16_SNORM_EXT)),E===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(Q=s.RG8UI),k===s.UNSIGNED_SHORT&&(Q=s.RG16UI),k===s.UNSIGNED_INT&&(Q=s.RG32UI),k===s.BYTE&&(Q=s.RG8I),k===s.SHORT&&(Q=s.RG16I),k===s.INT&&(Q=s.RG32I)),E===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),k===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),k===s.UNSIGNED_INT&&(Q=s.RGB32UI),k===s.BYTE&&(Q=s.RGB8I),k===s.SHORT&&(Q=s.RGB16I),k===s.INT&&(Q=s.RGB32I)),E===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),k===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),k===s.UNSIGNED_INT&&(Q=s.RGBA32UI),k===s.BYTE&&(Q=s.RGBA8I),k===s.SHORT&&(Q=s.RGBA16I),k===s.INT&&(Q=s.RGBA32I)),E===s.RGB&&(k===s.UNSIGNED_SHORT&&Ee&&(Q=Ee.RGB16_EXT),k===s.SHORT&&Ee&&(Q=Ee.RGB16_SNORM_EXT),k===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),k===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),E===s.RGBA){let te=pe?Lo:_t.getTransfer(re);k===s.FLOAT&&(Q=s.RGBA32F),k===s.HALF_FLOAT&&(Q=s.RGBA16F),k===s.UNSIGNED_BYTE&&(Q=te===Pt?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT&&Ee&&(Q=Ee.RGBA16_EXT),k===s.SHORT&&Ee&&(Q=Ee.RGBA16_SNORM_EXT),k===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function y(S,E){let k;return S?E===null||E===Ri||E===rr?k=s.DEPTH24_STENCIL8:E===fi?k=s.DEPTH32F_STENCIL8:E===Qr&&(k=s.DEPTH24_STENCIL8,Ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ri||E===rr?k=s.DEPTH_COMPONENT24:E===fi?k=s.DEPTH_COMPONENT32F:E===Qr&&(k=s.DEPTH_COMPONENT16),k}function M(S,E){return C(S)===!0||S.isFramebufferTexture&&S.minFilter!==Wt&&S.minFilter!==Sn?Math.log2(Math.max(E.width,E.height))+1:S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?E.mipmaps.length:1}function G(S){let E=new WeakRef(S);n.get(S).__ref=E,f.add(E),_.register(S,E,E)}function N(S){let E=n.get(S).__ref;E!==void 0&&(f.delete(E),_.unregister(E))}function O(S){$(S.target)}function W(S){D(S.target)}function $(S){S.removeEventListener("dispose",O),N(S),ie(S),S.isVideoTexture&&u.delete(S),S.isHTMLTexture&&h.delete(S)}function D(S){S.removeEventListener("dispose",W),N(S),ce(S)}function X(){for(let S of f){let E=S.deref();E!==void 0&&(E.isRenderTarget===!0?D(E):$(E))}f.clear(),h.clear()}function ie(S){let E=n.get(S);if(E.__webglInit===void 0)return;let k=S.source,ue=p.get(k);if(ue){let re=ue[E.__cacheKey];re.usedTimes--,re.usedTimes===0&&z(S),Object.keys(ue).length===0&&p.delete(k)}n.remove(S)}function z(S){let E=n.get(S);s.deleteTexture(E.__webglTexture);let k=S.source,ue=p.get(k);delete ue[E.__cacheKey],o.memory.textures--}function ce(S){let E=n.get(S);E.__depthDisposeCallback&&E.__depthDisposeCallback();let k=S.depthTexture;if(k&&k.renderTarget===S&&$(k),S.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(E.__webglFramebuffer[re]))for(let pe=0;pe<E.__webglFramebuffer[re].length;pe++)s.deleteFramebuffer(E.__webglFramebuffer[re][pe]);else s.deleteFramebuffer(E.__webglFramebuffer[re]);E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer[re])}else{if(Array.isArray(E.__webglFramebuffer))for(let re=0;re<E.__webglFramebuffer.length;re++)s.deleteFramebuffer(E.__webglFramebuffer[re]);else s.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&s.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&s.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let re=0;re<E.__webglColorRenderbuffer.length;re++)E.__webglColorRenderbuffer[re]&&s.deleteRenderbuffer(E.__webglColorRenderbuffer[re]);E.__webglDepthRenderbuffer&&s.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let ue=S.textures;for(let re=0,pe=ue.length;re<pe;re++){let Ee=n.get(ue[re]);Ee.__webglTexture&&(s.deleteTexture(Ee.__webglTexture),o.memory.textures--),n.remove(ue[re])}n.remove(S)}let Z=0;function se(){Z=0}function le(){return Z}function Pe(S){Z=S}function Ke(){let S=Z;return S>=i.maxTextures&&Ye("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+i.maxTextures),Z+=1,S}function j(S){let E=[];return E.push(S.wrapS),E.push(S.wrapT),E.push(S.wrapR||0),E.push(S.magFilter),E.push(S.minFilter),E.push(S.anisotropy),E.push(S.internalFormat),E.push(S.format),E.push(S.type),E.push(S.generateMipmaps),E.push(S.mipmapsAutoUpdate),E.push(S.premultiplyAlpha),E.push(S.flipY),E.push(S.unpackAlignment),E.push(S.colorSpace),E.join()}function Te(S,E){let k=n.get(S);if(S.isVideoTexture&&fn(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&k.__version!==S.version){let ue=S.image;if(ue===null)Ye("WebGLRenderer: Texture marked for update but no image data found.");else if(ue.complete===!1)Ye("WebGLRenderer: Texture marked for update but image is incomplete");else{pn(k,S,E);return}}else S.isExternalTexture&&(k.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+E)}function Ae(S,E){let k=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&k.__version!==S.version){pn(k,S,E);return}else S.isExternalTexture&&(k.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+E)}function ze(S,E){let k=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&k.__version!==S.version){pn(k,S,E);return}t.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+E)}function Me(S,E){let k=n.get(S);if(S.version>0&&k.__version!==S.version){Wn(k,S,E);return}t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+E)}let et={[ls]:s.REPEAT,[Fi]:s.CLAMP_TO_EDGE,[hl]:s.MIRRORED_REPEAT},tn={[Wt]:s.NEAREST,[Kf]:s.NEAREST_MIPMAP_NEAREST,[jo]:s.NEAREST_MIPMAP_LINEAR,[Sn]:s.LINEAR,[Fl]:s.LINEAR_MIPMAP_NEAREST,[pi]:s.LINEAR_MIPMAP_LINEAR},$e={[jf]:s.NEVER,[sd]:s.ALWAYS,[Qf]:s.LESS,[nd]:s.LEQUAL,[em]:s.EQUAL,[id]:s.GEQUAL,[tm]:s.GREATER,[nm]:s.NOTEQUAL};function Lt(S,E){if(E.type===fi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Sn||E.magFilter===Fl||E.magFilter===jo||E.magFilter===pi||E.minFilter===Sn||E.minFilter===Fl||E.minFilter===jo||E.minFilter===pi)&&Ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(S,s.TEXTURE_WRAP_S,et[E.wrapS]),s.texParameteri(S,s.TEXTURE_WRAP_T,et[E.wrapT]),(S===s.TEXTURE_3D||S===s.TEXTURE_2D_ARRAY)&&s.texParameteri(S,s.TEXTURE_WRAP_R,et[E.wrapR]),s.texParameteri(S,s.TEXTURE_MAG_FILTER,tn[E.magFilter]),s.texParameteri(S,s.TEXTURE_MIN_FILTER,tn[E.minFilter]),E.compareFunction&&(s.texParameteri(S,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(S,s.TEXTURE_COMPARE_FUNC,$e[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Wt||E.minFilter!==jo&&E.minFilter!==pi||E.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");s.texParameterf(S,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Ht(S,E){let k=!1;S.__webglInit===void 0&&(S.__webglInit=!0,E.addEventListener("dispose",O),G(E));let ue=E.source,re=p.get(ue);re===void 0&&(re={},p.set(ue,re));let pe=j(E);if(pe!==S.__cacheKey){re[pe]===void 0&&(re[pe]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,k=!0),re[pe].usedTimes++;let Ee=re[S.__cacheKey];Ee!==void 0&&(re[S.__cacheKey].usedTimes--,Ee.usedTimes===0&&z(E)),S.__cacheKey=pe,S.__webglTexture=re[pe].texture}return k}function mt(S,E,k){return Math.floor(Math.floor(S/k)/E)}function Rn(S,E,k,ue){let pe=S.updateRanges;if(pe.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,E.width,E.height,k,ue,E.data);else{pe.sort((I,ne)=>I.start-ne.start);let Ee=0;for(let I=1;I<pe.length;I++){let ne=pe[Ee],J=pe[I],ge=ne.start+ne.count,de=mt(J.start,E.width,4),fe=mt(ne.start,E.width,4);J.start<=ge+1&&de===fe&&mt(J.start+J.count-1,E.width,4)===de?ne.count=Math.max(ne.count,J.start+J.count-ne.start):(++Ee,pe[Ee]=J)}pe.length=Ee+1;let Q=t.getParameter(s.UNPACK_ROW_LENGTH),te=t.getParameter(s.UNPACK_SKIP_PIXELS),me=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,E.width);for(let I=0,ne=pe.length;I<ne;I++){let J=pe[I],ge=Math.floor(J.start/4),de=Math.ceil(J.count/4),fe=ge%E.width,Ge=Math.floor(ge/E.width),lt=de,he=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(s.UNPACK_SKIP_ROWS,Ge),t.texSubImage2D(s.TEXTURE_2D,0,fe,Ge,lt,he,k,ue,E.data)}S.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,Q),t.pixelStorei(s.UNPACK_SKIP_PIXELS,te),t.pixelStorei(s.UNPACK_SKIP_ROWS,me)}}function pn(S,E,k){let ue=s.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ue=s.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ue=s.TEXTURE_3D);let re=Ht(S,E),pe=E.source;t.bindTexture(ue,S.__webglTexture,s.TEXTURE0+k);let Ee=n.get(pe);if(pe.version!==Ee.__version||re===!0){if(t.activeTexture(s.TEXTURE0+k),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){let he=_t.getPrimaries(_t.workingColorSpace),qe=E.colorSpace===Ai?null:_t.getPrimaries(E.colorSpace),ot=E.colorSpace===Ai||he===qe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot)}t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment);let te=b(E.image,!1,i.maxTextureSize);te=Ze(E,te);let me=r.convert(E.format,E.colorSpace),I=r.convert(E.type),ne=P(E.internalFormat,me,I,E.normalized,E.colorSpace,E.isVideoTexture);Lt(ue,E);let J,ge=E.mipmaps,de=E.isVideoTexture!==!0,fe=Ee.__version===void 0||re===!0,Ge=pe.dataReady,lt=M(E,te);if(E.isDepthTexture)ne=y(E.format===hs,E.type),fe&&(de?t.texStorage2D(s.TEXTURE_2D,1,ne,te.width,te.height):t.texImage2D(s.TEXTURE_2D,0,ne,te.width,te.height,0,me,I,null));else if(E.isDataTexture)if(ge.length>0){de&&fe&&t.texStorage2D(s.TEXTURE_2D,lt,ne,ge[0].width,ge[0].height);for(let he=0,qe=ge.length;he<qe;he++)J=ge[he],de?Ge&&t.texSubImage2D(s.TEXTURE_2D,he,0,0,J.width,J.height,me,I,J.data):t.texImage2D(s.TEXTURE_2D,he,ne,J.width,J.height,0,me,I,J.data);E.generateMipmaps=!1}else de?(fe&&t.texStorage2D(s.TEXTURE_2D,lt,ne,te.width,te.height),Ge&&Rn(E,te,me,I)):t.texImage2D(s.TEXTURE_2D,0,ne,te.width,te.height,0,me,I,te.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){de&&fe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,lt,ne,ge[0].width,ge[0].height,te.depth);for(let he=0,qe=ge.length;he<qe;he++)if(J=ge[he],E.format!==Jn)if(me!==null)if(de){if(Ge)if(E.layerUpdates.size>0){let ot=fd(J.width,J.height,E.format,E.type);for(let we of E.layerUpdates){let Dt=J.data.subarray(we*ot/J.data.BYTES_PER_ELEMENT,(we+1)*ot/J.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,he,0,0,we,J.width,J.height,1,me,Dt)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,he,0,0,0,J.width,J.height,te.depth,me,J.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,he,ne,J.width,J.height,te.depth,0,J.data,0,0);else Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else de?Ge&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,he,0,0,0,J.width,J.height,te.depth,me,I,J.data):t.texImage3D(s.TEXTURE_2D_ARRAY,he,ne,J.width,J.height,te.depth,0,me,I,J.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{de&&fe&&t.texStorage2D(s.TEXTURE_2D,lt,ne,ge[0].width,ge[0].height);for(let he=0,qe=ge.length;he<qe;he++)J=ge[he],E.format!==Jn?me!==null?de?Ge&&t.compressedTexSubImage2D(s.TEXTURE_2D,he,0,0,J.width,J.height,me,J.data):t.compressedTexImage2D(s.TEXTURE_2D,he,ne,J.width,J.height,0,J.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):de?Ge&&t.texSubImage2D(s.TEXTURE_2D,he,0,0,J.width,J.height,me,I,J.data):t.texImage2D(s.TEXTURE_2D,he,ne,J.width,J.height,0,me,I,J.data)}else if(E.isDataArrayTexture)if(de){if(fe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,lt,ne,te.width,te.height,te.depth),Ge)if(E.layerUpdates.size>0){let he=fd(te.width,te.height,E.format,E.type);for(let qe of E.layerUpdates){let ot=te.data.subarray(qe*he/te.data.BYTES_PER_ELEMENT,(qe+1)*he/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,qe,te.width,te.height,1,me,I,ot)}E.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,me,I,te.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ne,te.width,te.height,te.depth,0,me,I,te.data);else if(E.isData3DTexture)de?(fe&&t.texStorage3D(s.TEXTURE_3D,lt,ne,te.width,te.height,te.depth),Ge&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,me,I,te.data)):t.texImage3D(s.TEXTURE_3D,0,ne,te.width,te.height,te.depth,0,me,I,te.data);else if(E.isFramebufferTexture){if(fe)if(de)t.texStorage2D(s.TEXTURE_2D,lt,ne,te.width,te.height);else{let he=te.width,qe=te.height;for(let ot=0;ot<lt;ot++)t.texImage2D(s.TEXTURE_2D,ot,ne,he,qe,0,me,I,null),he>>=1,qe>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in s){let he=s.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),te.parentNode!==he){he.appendChild(te),h.add(E),he.onpaint=qe=>{let ot=qe.changedElements;for(let we of h)ot.includes(we.image)&&(we.needsUpdate=!0)},he.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,te);else{let ot=s.RGBA,we=s.RGBA,Dt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ot,we,Dt,te)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(ge.length>0){if(de&&fe){let he=tt(ge[0]);t.texStorage2D(s.TEXTURE_2D,lt,ne,he.width,he.height)}for(let he=0,qe=ge.length;he<qe;he++)J=ge[he],de?Ge&&t.texSubImage2D(s.TEXTURE_2D,he,0,0,me,I,J):t.texImage2D(s.TEXTURE_2D,he,ne,me,I,J);E.generateMipmaps=!1}else if(de){if(fe){let he=tt(te);t.texStorage2D(s.TEXTURE_2D,lt,ne,he.width,he.height)}Ge&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,me,I,te)}else t.texImage2D(s.TEXTURE_2D,0,ne,me,I,te);C(E)&&E.mipmapsAutoUpdate===!0&&T(ue),Ee.__version=pe.version,E.onUpdate&&E.onUpdate(E)}S.__version=E.version}function Wn(S,E,k){if(E.image.length!==6)return;let ue=Ht(S,E),re=E.source;t.bindTexture(s.TEXTURE_CUBE_MAP,S.__webglTexture,s.TEXTURE0+k);let pe=n.get(re);if(re.version!==pe.__version||ue===!0){t.activeTexture(s.TEXTURE0+k);let Ee=_t.getPrimaries(_t.workingColorSpace),Q=E.colorSpace===Ai?null:_t.getPrimaries(E.colorSpace),te=E.colorSpace===Ai||Ee===Q?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let me=E.isCompressedTexture||E.image[0].isCompressedTexture,I=E.image[0]&&E.image[0].isDataTexture,ne=[];for(let we=0;we<6;we++)!me&&!I?ne[we]=b(E.image[we],!0,i.maxCubemapSize):ne[we]=I?E.image[we].image:E.image[we],ne[we]=Ze(E,ne[we]);let J=ne[0],ge=r.convert(E.format,E.colorSpace),de=r.convert(E.type),fe=P(E.internalFormat,ge,de,E.normalized,E.colorSpace),Ge=E.isVideoTexture!==!0,lt=pe.__version===void 0||ue===!0,he=re.dataReady,qe=M(E,J);Lt(s.TEXTURE_CUBE_MAP,E);let ot;if(E.isDepthTexture){if(fe=y(E.format===hs,E.type),lt)if(Ge)t.texStorage2D(s.TEXTURE_CUBE_MAP,1,fe,J.width,J.height);else for(let we=0;we<6;we++)t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,fe,J.width,J.height,0,ge,de,null)}else if(me){Ge&&lt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,qe,fe,J.width,J.height);for(let we=0;we<6;we++){ot=ne[we].mipmaps;for(let Dt=0;Dt<ot.length;Dt++){let vn=ot[Dt];E.format!==Jn?ge!==null?Ge?he&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Dt,0,0,vn.width,vn.height,ge,vn.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Dt,fe,vn.width,vn.height,0,vn.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?he&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Dt,0,0,vn.width,vn.height,ge,de,vn.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Dt,fe,vn.width,vn.height,0,ge,de,vn.data)}}}else{if(ot=E.mipmaps,Ge&&lt){ot.length>0&&qe++;let we=tt(ne[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,qe,fe,we.width,we.height)}for(let we=0;we<6;we++)if(I){Ge?he&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,ne[we].width,ne[we].height,ge,de,ne[we].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,fe,ne[we].width,ne[we].height,0,ge,de,ne[we].data);for(let Dt=0;Dt<ot.length;Dt++){let fs=ot[Dt].image[we].image;Ge?he&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Dt+1,0,0,fs.width,fs.height,ge,de,fs.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Dt+1,fe,fs.width,fs.height,0,ge,de,fs.data)}}else{Ge?he&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,ge,de,ne[we]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,fe,ge,de,ne[we]);for(let Dt=0;Dt<ot.length;Dt++){let vn=ot[Dt];Ge?he&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Dt+1,0,0,ge,de,vn.image[we]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+we,Dt+1,fe,ge,de,vn.image[we])}}}C(E)&&E.mipmapsAutoUpdate===!0&&T(s.TEXTURE_CUBE_MAP),pe.__version=re.version,E.onUpdate&&E.onUpdate(E)}S.__version=E.version}function Zt(S,E,k,ue,re,pe){let Ee=r.convert(k.format,k.colorSpace),Q=r.convert(k.type),te=P(k.internalFormat,Ee,Q,k.normalized,k.colorSpace),me=n.get(E),I=n.get(k);if(I.__renderTarget=E,!me.__hasExternalTextures){let ne=Math.max(1,E.width>>pe),J=Math.max(1,E.height>>pe);re===s.TEXTURE_3D||re===s.TEXTURE_2D_ARRAY?t.texImage3D(re,pe,te,ne,J,E.depth,0,Ee,Q,null):t.texImage2D(re,pe,te,ne,J,0,Ee,Q,null)}t.bindFramebuffer(s.FRAMEBUFFER,S),Se(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ue,re,I.__webglTexture,0,Xt(E)):(re===s.TEXTURE_2D||re>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ue,re,I.__webglTexture,pe),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Li(S,E,k){if(s.bindRenderbuffer(s.RENDERBUFFER,S),E.depthBuffer){let ue=E.depthTexture,re=ue&&ue.isDepthTexture?ue.type:null,pe=y(E.stencilBuffer,re),Ee=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Se(E)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Xt(E),pe,E.width,E.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,Xt(E),pe,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,pe,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ee,s.RENDERBUFFER,S)}else{let ue=E.textures;for(let re=0;re<ue.length;re++){let pe=ue[re],Ee=r.convert(pe.format,pe.colorSpace),Q=r.convert(pe.type),te=P(pe.internalFormat,Ee,Q,pe.normalized,pe.colorSpace);Se(E)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Xt(E),te,E.width,E.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,Xt(E),te,E.width,E.height):s.renderbufferStorage(s.RENDERBUFFER,te,E.width,E.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function En(S,E,k){let ue=E.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,S),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let re=n.get(E.depthTexture);re.__renderTarget=E;let pe=ue?E.depthTexture.image[0]:E.depthTexture.image;(!re.__webglTexture||pe.width!==E.width||pe.height!==E.height)&&(pe.width=E.width,pe.height=E.height,E.depthTexture.needsUpdate=!0),ue?Me(E.depthTexture,0):Te(E.depthTexture,0);let Ee=re.__webglTexture,Q=Xt(E),te=ue?s.TEXTURE_CUBE_MAP_POSITIVE_X+k:s.TEXTURE_2D,me=E.depthTexture.format===hs?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(E.depthTexture.format===cs)Se(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,te,Ee,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,me,te,Ee,0);else if(E.depthTexture.format===hs)Se(E)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,te,Ee,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,me,te,Ee,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ii(S){let E=n.get(S),k=S.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==S.depthTexture){let ue=S.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ue){let re=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ue.removeEventListener("dispose",re)};ue.addEventListener("dispose",re),E.__depthDisposeCallback=re}E.__boundDepthTexture=ue}if(S.depthTexture&&!E.__autoAllocateDepthBuffer)if(k)for(let ue=0;ue<6;ue++)En(E.__webglFramebuffer[ue],S,ue);else S.texture.mipmaps.length>0?En(E.__webglFramebuffer[0],S,0):En(E.__webglFramebuffer,S,0);else if(k){E.__webglDepthbuffer=[];for(let ue=0;ue<6;ue++)if(t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[ue]),E.__webglDepthbuffer[ue]===void 0)E.__webglDepthbuffer[ue]=s.createRenderbuffer(),Li(E.__webglDepthbuffer[ue],S,!1);else{let re=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pe=E.__webglDepthbuffer[ue];s.bindRenderbuffer(s.RENDERBUFFER,pe),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,pe)}}else if(S.texture.mipmaps.length>0?t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=s.createRenderbuffer(),Li(E.__webglDepthbuffer,S,!1);else{let re=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pe=E.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,pe),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,pe)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function si(S,E,k){let ue=n.get(S);E!==void 0&&Zt(ue.__webglFramebuffer,S,S.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&ii(S)}function ri(S){let E=S.texture,k=n.get(S),ue=n.get(E);S.addEventListener("dispose",W),G(S);let re=S.textures,pe=S.isWebGLCubeRenderTarget===!0,Ee=re.length>1;if(Ee||(ue.__webglTexture===void 0&&(ue.__webglTexture=s.createTexture()),ue.__version=E.version,o.memory.textures++),pe){k.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(E.mipmaps.length>0){k.__webglFramebuffer[Q]=[];for(let te=0;te<E.mipmaps.length;te++)k.__webglFramebuffer[Q][te]=s.createFramebuffer()}else k.__webglFramebuffer[Q]=s.createFramebuffer()}else{if(E.mipmaps.length>0){k.__webglFramebuffer=[];for(let Q=0;Q<E.mipmaps.length;Q++)k.__webglFramebuffer[Q]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(Ee)for(let Q=0,te=re.length;Q<te;Q++){let me=n.get(re[Q]);me.__webglTexture===void 0&&(me.__webglTexture=s.createTexture(),o.memory.textures++)}if(S.samples>0&&Se(S)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Q=0;Q<re.length;Q++){let te=re[Q];k.__webglColorRenderbuffer[Q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[Q]);let me=r.convert(te.format,te.colorSpace),I=r.convert(te.type),ne=P(te.internalFormat,me,I,te.normalized,te.colorSpace,S.isXRRenderTarget===!0),J=Xt(S);s.renderbufferStorageMultisample(s.RENDERBUFFER,J,ne,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Q,s.RENDERBUFFER,k.__webglColorRenderbuffer[Q])}s.bindRenderbuffer(s.RENDERBUFFER,null),S.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),Li(k.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(pe){t.bindTexture(s.TEXTURE_CUBE_MAP,ue.__webglTexture),Lt(s.TEXTURE_CUBE_MAP,E);for(let Q=0;Q<6;Q++)if(E.mipmaps.length>0)for(let te=0;te<E.mipmaps.length;te++)Zt(k.__webglFramebuffer[Q][te],S,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else Zt(k.__webglFramebuffer[Q],S,E,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);C(E)?T(s.TEXTURE_CUBE_MAP):E.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),t.unbindTexture()}else if(Ee){for(let Q=0,te=re.length;Q<te;Q++){let me=re[Q],I=n.get(me),ne=s.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ne=S.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ne,I.__webglTexture),Lt(ne,me),Zt(k.__webglFramebuffer,S,me,s.COLOR_ATTACHMENT0+Q,ne,0),C(me)&&T(ne)}t.unbindTexture()}else{let Q=s.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(Q=S.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Q,ue.__webglTexture),Lt(Q,E),E.mipmaps.length>0)for(let te=0;te<E.mipmaps.length;te++)Zt(k.__webglFramebuffer[te],S,E,s.COLOR_ATTACHMENT0,Q,te);else Zt(k.__webglFramebuffer,S,E,s.COLOR_ATTACHMENT0,Q,0);C(E)?T(Q):E.mipmaps.length>0&&s.texParameteri(Q,s.TEXTURE_MAX_LEVEL,E.mipmaps.length-1),t.unbindTexture()}S.depthBuffer&&ii(S)}function R(S){let E=S.textures;for(let k=0,ue=E.length;k<ue;k++){let re=E[k];if(C(re)&&re.mipmapsAutoUpdate===!0){let pe=A(S),Ee=n.get(re).__webglTexture;t.bindTexture(pe,Ee),T(pe),t.unbindTexture()}}}let oi=[];function qt(S){if(S.samples>0){if(Se(S)===!1){let E=S.textures,k=S.width,ue=S.height,re=s.COLOR_BUFFER_BIT,pe=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ee=n.get(S),Q=E.length>1;if(Q)for(let me=0;me<E.length;me++)t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),S.texture.mipmaps.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let me=0;me<E.length;me++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(re|=s.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(re|=s.STENCIL_BUFFER_BIT)),Q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[me]);let I=n.get(E[me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,I,0)}s.blitFramebuffer(0,0,k,ue,0,0,k,ue,re,s.NEAREST),l===!0&&(oi.length=0,oi.push(s.COLOR_ATTACHMENT0+me),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&oi.push(pe),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,oi))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Q)for(let me=0;me<E.length;me++){t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.RENDERBUFFER,Ee.__webglColorRenderbuffer[me]);let I=n.get(E[me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ee.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+me,s.TEXTURE_2D,I,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&l){let E=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[E])}}}function Xt(S){return Math.min(i.maxSamples,S.samples)}function Se(S){let E=n.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function fn(S){let E=o.render.frame;u.get(S)!==E&&(u.set(S,E),S.update())}function Ze(S,E){let k=S.colorSpace,ue=S.format,re=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||k!==Io&&k!==Ai&&(_t.getTransfer(k)===Pt?(ue!==Jn||re!==qn)&&Ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",k)),E}function tt(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=Ke,this.resetTextureUnits=se,this.getTextureUnits=le,this.setTextureUnits=Pe,this.setTexture2D=Te,this.setTexture2DArray=Ae,this.setTexture3D=ze,this.setTextureCube=Me,this.rebindTextures=si,this.setupRenderTarget=ri,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=qt,this.setupDepthRenderbuffer=ii,this.setupFrameBufferTexture=Zt,this.useMultisampledRTT=Se,this.dispose=X}function kM(s,e){function t(n,i=Ai){let r,o=_t.getTransfer(i);if(n===qn)return s.UNSIGNED_BYTE;if(n===Ul)return s.UNSIGNED_SHORT_4_4_4_4;if(n===kl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===jh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Qh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===$h)return s.BYTE;if(n===Jh)return s.SHORT;if(n===Qr)return s.UNSIGNED_SHORT;if(n===Hl)return s.INT;if(n===Ri)return s.UNSIGNED_INT;if(n===fi)return s.FLOAT;if(n===on)return s.HALF_FLOAT;if(n===ed)return s.ALPHA;if(n===td)return s.RGB;if(n===Jn)return s.RGBA;if(n===cs)return s.DEPTH_COMPONENT;if(n===hs)return s.DEPTH_STENCIL;if(n===Bl)return s.RED;if(n===zl)return s.RED_INTEGER;if(n===Rs)return s.RG;if(n===Gl)return s.RG_INTEGER;if(n===Vl)return s.RGBA_INTEGER;if(n===Qo||n===ea||n===ta||n===na)if(o===Pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Qo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Qo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===na)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Wl||n===ql||n===Xl||n===Yl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Wl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ql)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Yl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Kl||n===Zl||n===$l||n===Jl||n===jl||n===ia||n===Ql)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Kl||n===Zl)return o===Pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===$l)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Jl)return r.COMPRESSED_R11_EAC;if(n===jl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ia)return r.COMPRESSED_RG11_EAC;if(n===Ql)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===oc||n===ac||n===lc||n===cc||n===uc||n===hc||n===dc||n===pc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ec)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===tc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===nc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ic)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===rc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===oc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ac)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===lc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===cc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===uc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===hc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===dc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===pc)return o===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fc||n===mc||n===gc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===fc)return o===Pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===mc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===gc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xc||n===yc||n===sa||n===_c)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===xc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===sa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===_c)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var BM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zM=`
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

}`,Td=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Vo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new xn({vertexShader:BM,fragmentShader:zM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new bt(new it(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Md=class extends Hi{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,p=null,f=null,_=typeof XRWebGLBinding<"u",m=new Td,g={},b=t.getContextAttributes(),C=null,T=null,A=[],P=[],y=new _e,M=null,G=null,N=new gn;N.viewport=new kt;let O=new gn;O.viewport=new kt;let W=[N,O],$=new Dl,D=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Te=A[j];return Te===void 0&&(Te=new Xr,A[j]=Te),Te.getTargetRaySpace()},this.getControllerGrip=function(j){let Te=A[j];return Te===void 0&&(Te=new Xr,A[j]=Te),Te.getGripSpace()},this.getHand=function(j){let Te=A[j];return Te===void 0&&(Te=new Xr,A[j]=Te),Te.getHandSpace()};function ie(j){let Te=P.indexOf(j.inputSource);if(Te===-1)return;let Ae=A[Te];Ae!==void 0&&(Ae.update(j.inputSource,j.frame,c||o),Ae.dispatchEvent({type:j.type,data:j.inputSource}))}function z(){i.removeEventListener("select",ie),i.removeEventListener("selectstart",ie),i.removeEventListener("selectend",ie),i.removeEventListener("squeeze",ie),i.removeEventListener("squeezestart",ie),i.removeEventListener("squeezeend",ie),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",ce);for(let j=0;j<A.length;j++){let Te=P[j];Te!==null&&(P[j]=null,A[j].disconnect(Te))}D=null,X=null,m.reset();for(let j in g)delete g[j];if(e.setRenderTarget(C),p=null,d=null,h=null,i=null,T=null,Ke.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(y.width,y.height,!1),G!==null){let j=G.camera;j.fov=G.fov,j.zoom=G.zoom,j.updateProjectionMatrix(),G=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&Ye("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&Ye("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return f},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(C=e.getRenderTarget(),i.addEventListener("select",ie),i.addEventListener("selectstart",ie),i.addEventListener("selectend",ie),i.addEventListener("squeeze",ie),i.addEventListener("squeezestart",ie),i.addEventListener("squeezeend",ie),i.addEventListener("end",z),i.addEventListener("inputsourceschange",ce),b.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(y),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ae=null,ze=null,Me=null;b.depth&&(Me=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ae=b.stencil?hs:cs,ze=b.stencil?rr:Ri);let et={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(et),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new Qt(d.textureWidth,d.textureHeight,{format:Jn,type:qn,depthTexture:new wi(d.textureWidth,d.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,Ae),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Ae={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,t,Ae),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new Qt(p.framebufferWidth,p.framebufferHeight,{format:Jn,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ke.setContext(i),Ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ce(j){for(let Te=0;Te<j.removed.length;Te++){let Ae=j.removed[Te],ze=P.indexOf(Ae);ze>=0&&(P[ze]=null,A[ze].disconnect(Ae))}for(let Te=0;Te<j.added.length;Te++){let Ae=j.added[Te],ze=P.indexOf(Ae);if(ze===-1){for(let et=0;et<A.length;et++)if(et>=P.length){P.push(Ae),ze=et;break}else if(P[et]===null){P[et]=Ae,ze=et;break}if(ze===-1)break}let Me=A[ze];Me&&Me.connect(Ae)}}function Z(j,Te){Te===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Te.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let Te=j.near,Ae=j.far;m.texture!==null&&(m.depthNear>0&&(Te=m.depthNear),m.depthFar>0&&(Ae=m.depthFar)),$.near=O.near=N.near=Te,$.far=O.far=N.far=Ae,(D!==$.near||X!==$.far)&&(i.updateRenderState({depthNear:$.near,depthFar:$.far}),D=$.near,X=$.far),$.layers.mask=j.layers.mask|6,N.layers.mask=$.layers.mask&-5,O.layers.mask=$.layers.mask&-3;let ze=j.parent,Me=$.cameras;Z($,ze);for(let et=0;et<Me.length;et++)Z(Me[et],ze);$.projectionMatrix.copy(N.projectionMatrix),$.projectionMatrixInverse.copy(N.projectionMatrixInverse),G===null&&j.isPerspectiveCamera&&(G={camera:j,fov:j.fov,zoom:j.zoom}),se(j,$,ze)};function se(j,Te,Ae){Ae===null?j.matrix.copy(Te.matrixWorld):(j.matrix.copy(Ae.matrixWorld),j.matrix.invert(),j.matrix.multiply(Te.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Te.projectionMatrix),j.projectionMatrixInverse.copy(Te.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Vr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh($)},this.getCameraTexture=function(j){return g[j]};let le=null;function Pe(j,Te){if(u=Te.getViewerPose(c||o),f=Te,u!==null){let Ae=u.views;p!==null&&(e.setRenderTargetFramebuffer(T,p.framebuffer),e.setRenderTarget(T));let ze=!1;Ae.length!==$.cameras.length&&($.cameras.length=0,ze=!0);for(let $e=0;$e<Ae.length;$e++){let Lt=Ae[$e],Ht=null;if(p!==null)Ht=p.getViewport(Lt);else{let Rn=h.getViewSubImage(d,Lt);Ht=Rn.viewport,$e===0&&(e.setRenderTargetTextures(T,Rn.colorTexture,Rn.depthStencilTexture),e.setRenderTarget(T))}let mt=W[$e];mt===void 0&&(mt=new gn,mt.layers.enable($e),mt.viewport=new kt,W[$e]=mt),mt.matrix.fromArray(Lt.transform.matrix),mt.matrix.decompose(mt.position,mt.quaternion,mt.scale),mt.projectionMatrix.fromArray(Lt.projectionMatrix),mt.projectionMatrixInverse.copy(mt.projectionMatrix).invert(),mt.viewport.set(Ht.x,Ht.y,Ht.width,Ht.height),$e===0&&($.matrix.copy(mt.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),ze===!0&&$.cameras.push(mt)}let Me=i.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){h=n.getBinding();let $e=h.getDepthInformation(Ae[0]);$e&&$e.isValid&&$e.texture&&m.init($e,i.renderState)}if(Me&&Me.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let $e=0;$e<Ae.length;$e++){let Lt=Ae[$e].camera;if(Lt){let Ht=g[Lt];Ht||(Ht=new Vo,g[Lt]=Ht);let mt=h.getCameraImage(Lt);Ht.sourceTexture=mt}}}}for(let Ae=0;Ae<A.length;Ae++){let ze=P[Ae],Me=A[Ae];ze!==null&&Me!==void 0&&Me.update(ze,Te,c||o)}le&&le(j,Te),Te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Te}),f=null}let Ke=new Dm;Ke.setAnimationLoop(Pe),this.setAnimationLoop=function(j){le=j},this.dispose=function(){}}},GM=new Ie,Vm=new Qe;Vm.set(-1,0,0,0,1,0,0,0,1);function VM(s,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,hd(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,b,C,T){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),h(m,g)):g.isMeshPhongMaterial?(r(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&p(m,g,T)):g.isMeshMatcapMaterial?(r(m,g),f(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,b,C):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===wn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===wn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let b=e.get(g),C=b.envMap,T=b.envMapRotation;C&&(m.envMap.value=C,m.envMapRotation.value.setFromMatrix4(GM.makeRotationFromEuler(T)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Vm),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,b,C){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*b,m.scale.value=C*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function h(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function p(m,g,b){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,t(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===wn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function f(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){let b=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function WM(s,e,t,n){let i={},r={};function o(b,C){let T=C.program;n.uniformBlockBinding(b,T,i[b.id])}function a(b,C){let T=i[b.id];T===void 0&&(f(b),T=l(b),i[b.id]=T,b.addEventListener("dispose",m));let A=C.program;n.updateUBOMapping(b,A);let P=e.render.frame;r[b.id]!==P&&(c(b),r[b.id]=P)}function l(b){let C=s.createBuffer(),T=b.__size,A=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,C),s.bufferData(s.UNIFORM_BUFFER,T,A),s.bindBuffer(s.UNIFORM_BUFFER,null),C}function c(b){let C=i[b.id],T=b.uniforms,A=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,C);for(let P=0,y=T.length;P<y;P++){let M=T[P];if(Array.isArray(M))for(let G=0,N=M.length;G<N;G++)u(M[G],P,G,A);else u(M,P,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function u(b,C,T,A){if(d(b,C,T,A)===!0){let P=b.__offset,y=b.value;if(Array.isArray(y)){let M=0;for(let G=0;G<y.length;G++){let N=y[G],O=_(N,!0);h(N,b.__data,M),M+=O.storage/Float32Array.BYTES_PER_ELEMENT}}else h(y,b.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,P,b.__data)}}function h(b,C,T){typeof b=="number"||typeof b=="boolean"?C[T]=b:b.isMatrix3?(C[T]=b.elements[0],C[T+1]=b.elements[1],C[T+2]=b.elements[2],C[T+3]=0,C[T+4]=b.elements[3],C[T+5]=b.elements[4],C[T+6]=b.elements[5],C[T+7]=0,C[T+8]=b.elements[6],C[T+9]=b.elements[7],C[T+10]=b.elements[8],C[T+11]=0):ArrayBuffer.isView(b)?C.set(b.subarray(0,C.length-T),T):b.toArray(C,T)}function d(b,C,T,A){let P=b.value,y=C+"_"+T;if(Array.isArray(P)){A[y]===void 0&&(A[y]=[]);let M=A[y],G=!1;for(let N=0;N<P.length;N++)p(P[N],M,N)===!0&&(G=!0);return G}return p(P,A,y)}function p(b,C,T){if(C[T]===void 0)return typeof b=="number"||typeof b=="boolean"?C[T]=b:ArrayBuffer.isView(b)?C[T]=b.slice():C[T]=b.clone(),!0;{let A=C[T];if(typeof b=="number"||typeof b=="boolean"){if(A!==b)return C[T]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(A.equals(b)===!1)return A.copy(b),!0}}return!1}function f(b){let C=b.uniforms,T=0,A=16;for(let y=0,M=C.length;y<M;y++){let G=Array.isArray(C[y])?C[y]:[C[y]];for(let N=0,O=G.length;N<O;N++){let W=G[N],$=Array.isArray(W.value)?W.value:[W.value],D=Array.isArray(C[y])||Array.isArray(W.value),X=T;for(let z=0,ce=$.length;z<ce;z++){let Z=$[z],se=_(Z,D),le=T%A,Pe=le%se.boundary,Ke=le+Pe;T+=Pe,Ke!==0&&A-Ke<se.storage&&(T+=A-Ke),z===0&&(X=T),T+=se.storage}let ie=W.type==="int"?Int32Array:W.type==="uint"?Uint32Array:Float32Array;W.__data=new ie((T-X)/Float32Array.BYTES_PER_ELEMENT),W.__offset=X}}let P=T%A;return P>0&&(T+=A-P),b.__size=T,b.__cache={},this}function _(b,C){let T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=16,T.storage=48):b.isMatrix4?(T.boundary=16,T.storage=64):b.isTexture?Ye("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(T.boundary=16,T.storage=b.byteLength):Ye("WebGLRenderer: Unsupported uniform value type.",b),C===!0&&(T.boundary=16,T.storage=Math.ceil(T.storage/16)*16),T}function m(b){let C=b.target;C.removeEventListener("dispose",m),s.deleteBuffer(i[C.id]),delete i[C.id],delete r[C.id]}function g(){for(let b in i)s.deleteBuffer(i[b]);i={},r={}}return{bind:o,update:a,dispose:g}}var qM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Gi=null;function XM(){return Gi===null&&(Gi=new $s(qM,16,16,Rs,on),Gi.name="DFG_LUT",Gi.minFilter=Sn,Gi.magFilter=Sn,Gi.wrapS=Fi,Gi.wrapT=Fi,Gi.generateMipmaps=!1,Gi.needsUpdate=!0),Gi}var Mc=class{constructor(e={}){let{canvas:t=im(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:p=qn}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let _=p,m=new Set([Vl,Gl,zl]),g=new Set([qn,Ri,Qr,rr,Ul,kl]),b=new Uint32Array(4),C=new Int32Array(4),T={textures:[],min:[],max:[],resolution:[]},A=null,P=null,y=[],M=[],G=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,O=!1,W=null,$=null,D=null,X=null;this._outputColorSpace=pt;let ie=0,z=0,ce=null,Z=-1,se=null,le=new kt,Pe=new kt,Ke=null,j=new x(0),Te=0,Ae=t.width,ze=t.height,Me=1,et=null,tn=null,$e=new kt(0,0,Ae,ze),Lt=new kt(0,0,Ae,ze),Ht=!1,mt=new ki,Rn=new gl,pn=!1,Wn=!1,Zt=new Ie,Li=new w,En=new kt,ii={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},si=!1;function ri(){return ce===null?Me:1}let R=n;function oi(v,L){return t.getContext(v,L)}let qt,Xt,Se,fn,Ze,tt,S,E,k,ue,re,pe,Ee,Q,te,me,I,ne,J,ge,de,fe,Ge;try{let v={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",qe,!1),t.addEventListener("webglcontextrestored",ot,!1),t.addEventListener("webglcontextcreationerror",we,!1),R===null){let L="webgl2";if(R=oi(L,v),R===null)throw oi(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}lt()}catch(v){throw t.removeEventListener("webglcontextlost",qe,!1),t.removeEventListener("webglcontextrestored",ot,!1),t.removeEventListener("webglcontextcreationerror",we,!1),Je("WebGLRenderer: "+v.message),v}function lt(){qt=new iT(R),qt.init(),de=new kM(R,qt),Xt=new Xb(R,qt,e,de),Se=new HM(R,qt),Xt.reversedDepthBuffer&&d&&Se.buffers.depth.setReversed(!0),$=R.createFramebuffer(),D=R.createFramebuffer(),X=R.createFramebuffer(),fn=new oT(R),Ze=new TM,tt=new UM(R,qt,Se,Ze,Xt,de,fn),S=new nT(N),E=new lE(R),fe=new Wb(R,E),k=new sT(R,E,fn,fe),ue=new lT(R,k,E,fe,fn),ne=new aT(R,Xt,tt),te=new Yb(Ze),re=new bM(N,S,qt,Xt,fe,te),pe=new VM(N,Ze),Ee=new SM,Q=new IM(qt),I=new Vb(N,S,Se,ue,f,l),me=new FM(N,ue,Xt),Ge=new WM(R,fn,Xt,Se),J=new qb(R,qt,fn),ge=new rT(R,qt,fn),fn.programs=re.programs,N.capabilities=Xt,N.extensions=qt,N.properties=Ze,N.renderLists=Ee,N.shadowMap=me,N.state=Se,N.info=fn}_!==qn&&(G=new uT(_,t.width,t.height,a,i,r));let he=new Md(N,R);this.xr=he,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let v=qt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=qt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Me},this.setPixelRatio=function(v){v!==void 0&&(Me=v,this.setSize(Ae,ze,!1))},this.getSize=function(v){return v.set(Ae,ze)},this.setSize=function(v,L,q=!0){if(he.isPresenting){Ye("WebGLRenderer: Can't change size while VR device is presenting.");return}Ae=v,ze=L,t.width=Math.floor(v*Me),t.height=Math.floor(L*Me),q===!0&&(t.style.width=v+"px",t.style.height=L+"px"),G!==null&&G.setSize(t.width,t.height),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(Ae*Me,ze*Me).floor()},this.setDrawingBufferSize=function(v,L,q){Ae=v,ze=L,Me=q,t.width=Math.floor(v*q),t.height=Math.floor(L*q),this.setViewport(0,0,v,L)},this.setEffects=function(v){if(_===qn){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let L=0;L<v.length;L++)if(v[L].isOutputPass===!0){Ye("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}G.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(le)},this.getViewport=function(v){return v.copy($e)},this.setViewport=function(v,L,q,U){v.isVector4?$e.set(v.x,v.y,v.z,v.w):$e.set(v,L,q,U),Se.viewport(le.copy($e).multiplyScalar(ri()).round())},this.getScissor=function(v){return v.copy(Lt)},this.setScissor=function(v,L,q,U){v.isVector4?Lt.set(v.x,v.y,v.z,v.w):Lt.set(v,L,q,U),Se.scissor(Pe.copy(Lt).multiplyScalar(ri()).round())},this.getScissorTest=function(){return Ht},this.setScissorTest=function(v){Se.setScissorTest(Ht=v)},this.setOpaqueSort=function(v){et=v},this.setTransparentSort=function(v){tn=v},this.getClearColor=function(v){return v.copy(I.getClearColor())},this.setClearColor=function(){I.setClearColor(...arguments)},this.getClearAlpha=function(){return I.getClearAlpha()},this.setClearAlpha=function(){I.setClearAlpha(...arguments)},this.clear=function(v=!0,L=!0,q=!0){let U=0;if(v){let B=!1;if(ce!==null){let ve=ce.texture.format;B=m.has(ve)}if(B){let ve=ce.texture.type,Ne=g.has(ve),xe=I.getClearColor(),Re=I.getClearAlpha(),Be=xe.r,nt=xe.g,gt=xe.b;Ne?(b[0]=Be,b[1]=nt,b[2]=gt,b[3]=Re,R.clearBufferuiv(R.COLOR,0,b)):(C[0]=Be,C[1]=nt,C[2]=gt,C[3]=Re,R.clearBufferiv(R.COLOR,0,C))}else U|=R.COLOR_BUFFER_BIT}L&&(U|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(U|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U!==0&&R.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),W=v},this.dispose=function(){t.removeEventListener("webglcontextlost",qe,!1),t.removeEventListener("webglcontextrestored",ot,!1),t.removeEventListener("webglcontextcreationerror",we,!1),I.dispose(),Ee.dispose(),Q.dispose(),tt.dispose(),Ze.dispose(),S.dispose(),ue.dispose(),k.dispose(),fe.dispose(),Ge.dispose(),re.dispose(),he.dispose(),he.removeEventListener("sessionstart",vp),he.removeEventListener("sessionend",bp),zs.stop()};function qe(v){v.preventDefault(),Do("WebGLRenderer: Context Lost."),O=!0}function ot(){Do("WebGLRenderer: Context Restored."),O=!1;let v=fn.autoReset,L=me.enabled,q=me.autoUpdate,U=me.needsUpdate,B=me.type;lt(),fn.autoReset=v,me.enabled=L,me.autoUpdate=q,me.needsUpdate=U,me.type=B}function we(v){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Dt(v){let L=v.target;L.removeEventListener("dispose",Dt),vn(L)}function vn(v){fs(v),Ze.remove(v)}function fs(v){let L=Ze.get(v).programs;L!==void 0&&(L.forEach(function(q){re.releaseProgram(q)}),v.isShaderMaterial&&re.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,q,U,B,ve){L===null&&(L=ii);let Ne=B.isMesh&&B.matrixWorld.determinantAffine()<0,xe=s_(v,L,q,U,B);Se.setMaterial(U,Ne);let Re=q.index,Be=1;if(U.wireframe===!0){if(Re=k.getWireframeAttribute(q),Re===void 0)return;Be=2}let nt=q.drawRange,gt=q.attributes.position,Oe=nt.start*Be,xt=(nt.start+nt.count)*Be;ve!==null&&(Oe=Math.max(Oe,ve.start*Be),xt=Math.min(xt,(ve.start+ve.count)*Be)),Re!==null?(Oe=Math.max(Oe,0),xt=Math.min(xt,Re.count)):gt!=null&&(Oe=Math.max(Oe,0),xt=Math.min(xt,gt.count));let an=xt-Oe;if(an<0||an===1/0)return;fe.setup(B,U,xe,q,Re);let Bt,Ut=J;if(Re!==null&&(Bt=E.get(Re),Ut=ge,Ut.setIndex(Bt)),B.isMesh)U.wireframe===!0?(Se.setLineWidth(U.wireframeLinewidth*ri()),Ut.setMode(R.LINES)):Ut.setMode(R.TRIANGLES);else if(B.isLine){let Dn=U.linewidth;Dn===void 0&&(Dn=1),Se.setLineWidth(Dn*ri()),B.isLineSegments?Ut.setMode(R.LINES):B.isLineLoop?Ut.setMode(R.LINE_LOOP):Ut.setMode(R.LINE_STRIP)}else B.isPoints?Ut.setMode(R.POINTS):B.isSprite&&Ut.setMode(R.TRIANGLES);if(B.isBatchedMesh)if(qt.get("WEBGL_multi_draw"))Ut.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Dn=B._multiDrawStarts,Fe=B._multiDrawCounts,zn=B._multiDrawCount,At=Re?E.get(Re).bytesPerElement:1,Gs=Ze.get(U).currentProgram.getUniforms();for(let Nn=0;Nn<zn;Nn++)Gs.setValue(R,"_gl_DrawID",Nn),Ut.render(Dn[Nn]/At,Fe[Nn])}else if(B.isInstancedMesh)Ut.renderInstances(Oe,an,B.count);else if(q.isInstancedBufferGeometry){let Dn=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Fe=Math.min(q.instanceCount,Dn);Ut.renderInstances(Oe,an,Fe)}else Ut.render(Oe,an)};function Ep(v,L,q,U){W!==null&&v.isNodeMaterial&&W.setObject(U,v),pn===!0&&te.setState(v,q,!1),v.transparent===!0&&v.side===Gt&&v.forceSinglePass===!1?(v.side=wn,v.needsUpdate=!0,go(v,L,U),v.side=$n,v.needsUpdate=!0,go(v,L,U),v.side=Gt):go(v,L,U)}this.compile=function(v,L,q=null){q===null&&(q=v),W!==null&&W.renderStart(v,L,q),P=Q.get(q),P.init(L),M.push(P),q.traverseVisible(function(B){B.isLight&&B.layers.test(L.layers)&&(P.pushLight(B),B.castShadow&&P.pushShadow(B))}),v!==q&&v.traverseVisible(function(B){B.isLight&&B.layers.test(L.layers)&&(P.pushLight(B),B.castShadow&&P.pushShadow(B))}),P.setupLights(),W!==null&&W.updateLights(P.state.lightsArray),Wn=this.localClippingEnabled,pn=te.init(this.clippingPlanes,Wn),pn===!0&&te.setGlobalState(this.clippingPlanes,L),W!==null&&me.render(P.state.shadowsArray,q,L);let U=new Set;return v.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let ve=B.material;if(ve)if(Array.isArray(ve))for(let Ne=0;Ne<ve.length;Ne++){let xe=ve[Ne];Ep(xe,q,L,B),U.add(xe)}else Ep(ve,q,L,B),U.add(ve)}),P=M.pop(),W!==null&&W.renderEnd(),U},this.compileAsync=function(v,L,q=null){let U=this.compile(v,L,q);return new Promise(B=>{function ve(){if(U.forEach(function(Ne){let Re=Ze.get(Ne).currentProgram;(Re===void 0||Re.isReady())&&U.delete(Ne)}),U.size===0){B(v);return}setTimeout(ve,10)}qt.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let ih=null;function n_(v){ih&&ih(v)}function vp(){zs.stop()}function bp(){zs.start()}let zs=new Dm;zs.setAnimationLoop(n_),typeof self<"u"&&zs.setContext(self),this.setAnimationLoop=function(v){ih=v,he.setAnimationLoop(v),v===null?zs.stop():zs.start()},he.addEventListener("sessionstart",vp),he.addEventListener("sessionend",bp),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;W!==null&&W.renderStart(v,L);let q=he.enabled===!0&&he.isPresenting===!0,U=G!==null&&(ce===null||q)&&G.begin(N,ce);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(G===null||G.isCompositing()===!1)&&(he.cameraAutoUpdate===!0&&he.updateCamera(L),L=he.getCamera()),v.isScene===!0&&v.onBeforeRender(N,v,L,ce),P=Q.get(v,M.length),P.init(L),P.state.textureUnits=tt.getTextureUnits(),M.push(P),Zt.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),L.isArrayCamera?Rn.setFromArrayCamera(L):mt.setFromProjectionMatrix(Zt,di,L.reversedDepth),Wn=this.localClippingEnabled,pn=te.init(this.clippingPlanes,Wn),A=Ee.get(v,y.length),A.init(),y.push(A),this.info.render.frame++,he.enabled===!0&&he.isPresenting===!0){let Ne=N.xr.getDepthSensingMesh();Ne!==null&&sh(Ne,L,-1/0,N.sortObjects)}sh(v,L,0,N.sortObjects),A.finish(),W!==null&&W.updateLights(P.state.lightsArray),N.sortObjects===!0&&A.sort(et,tn),si=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,si&&I.addToRenderList(A,v),this.info.autoReset===!0&&this.info.reset(),pn===!0&&te.beginShadows();let B=P.state.shadowsArray;if(me.render(B,v,L),pn===!0&&te.endShadows(),(U&&G.hasRenderPass())===!1){let Ne=A.opaque,xe=A.transmissive;if(P.setupLights(),L.isArrayCamera){let Re=L.cameras;if(xe.length>0)for(let Be=0,nt=Re.length;Be<nt;Be++){let gt=Re[Be];Mp(Ne,xe,v,gt)}si&&I.render(v);for(let Be=0,nt=Re.length;Be<nt;Be++){let gt=Re[Be];Tp(A,v,gt,gt.viewport)}}else xe.length>0&&Mp(Ne,xe,v,L),si&&I.render(v),Tp(A,v,L)}ce!==null&&z===0&&(tt.updateMultisampleRenderTarget(ce),tt.updateRenderTargetMipmap(ce)),U&&G.end(N),v.isScene===!0&&v.onAfterRender(N,v,L),fe.resetDefaultState(),Z=-1,se=null,M.pop(),M.length>0?(P=M[M.length-1],tt.setTextureUnits(P.state.textureUnits),pn===!0&&te.setGlobalState(N.clippingPlanes,P.state.camera)):P=null,y.pop(),y.length>0?A=y[y.length-1]:A=null,W!==null&&W.renderEnd()};function sh(v,L,q,U){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)q=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLight)P.pushLight(v),v.castShadow&&P.pushShadow(v);else if(v.isSprite){let Ne=L.isArrayCamera?Rn:mt;if(!v.frustumCulled||v.intersectsFrustum(Ne)){U&&En.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Zt);let xe=ue.update(v),Re=v.material;Re.visible&&A.push(v,xe,Re,q,En.z,null,L)}}else if(v.isMesh||v.isLine||v.isPoints){let Ne=L.isArrayCamera?Rn:mt;if(!v.frustumCulled||v.intersectsFrustum(Ne)){let xe=ue.update(v),Re=v.material;if(U&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),En.copy(v.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),En.copy(xe.boundingSphere.center)),En.applyMatrix4(v.matrixWorld).applyMatrix4(Zt)),Array.isArray(Re)){let Be=xe.groups;for(let nt=0,gt=Be.length;nt<gt;nt++){let Oe=Be[nt],xt=Re[Oe.materialIndex];xt&&xt.visible&&A.push(v,xe,xt,q,En.z,Oe,L)}}else Re.visible&&A.push(v,xe,Re,q,En.z,null,L)}}}let ve=v.children;for(let Ne=0,xe=ve.length;Ne<xe;Ne++)sh(ve[Ne],L,q,U)}function Tp(v,L,q,U){let{opaque:B,transmissive:ve,transparent:Ne}=v;P.setupLightsView(q),pn===!0&&te.setGlobalState(N.clippingPlanes,q),U&&Se.viewport(le.copy(U)),B.length>0&&Ma(B,L,q),ve.length>0&&Ma(ve,L,q),Ne.length>0&&Ma(Ne,L,q),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Mp(v,L,q,U){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(P.state.transmissionRenderTarget[U.id]===void 0){let Oe=qt.has("EXT_color_buffer_half_float")||qt.has("EXT_color_buffer_float");P.state.transmissionRenderTarget[U.id]=new Qt(1,1,{generateMipmaps:!0,type:Oe?on:qn,minFilter:pi,samples:Math.max(4,Xt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_t.workingColorSpace})}let ve=P.state.transmissionRenderTarget[U.id],Ne=U.viewport||le;ve.setSize(Ne.z*N.transmissionResolutionScale,Ne.w*N.transmissionResolutionScale);let xe=N.getRenderTarget(),Re=N.getActiveCubeFace(),Be=N.getActiveMipmapLevel();N.setRenderTarget(ve),N.getClearColor(j),Te=N.getClearAlpha(),Te<1&&N.setClearColor(16777215,.5),N.clear(),si&&I.render(q);let nt=N.toneMapping;N.toneMapping=zi;let gt=U.viewport;if(U.viewport!==void 0&&(U.viewport=void 0),P.setupLightsView(U),pn===!0&&te.setGlobalState(N.clippingPlanes,U),Ma(v,q,U),tt.updateMultisampleRenderTarget(ve),tt.updateRenderTargetMipmap(ve),qt.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let xt=0,an=L.length;xt<an;xt++){let Bt=L[xt],{object:Ut,geometry:Dn,material:Fe,group:zn}=Bt;if(Fe.side===Gt&&Ut.layers.test(U.layers)){let At=Fe.side;Fe.side=wn,Fe.needsUpdate=!0,Sp(Ut,q,U,Dn,Fe,zn),Fe.side=At,Fe.needsUpdate=!0,Oe=!0}}Oe===!0&&(tt.updateMultisampleRenderTarget(ve),tt.updateRenderTargetMipmap(ve))}N.setRenderTarget(xe,Re,Be),N.setClearColor(j,Te),gt!==void 0&&(U.viewport=gt),N.toneMapping=nt}function Ma(v,L,q){let U=L.isScene===!0?L.overrideMaterial:null;for(let B=0,ve=v.length;B<ve;B++){let Ne=v[B],{object:xe,geometry:Re,group:Be}=Ne,nt=Ne.material;nt.allowOverride===!0&&U!==null&&(nt=U),xe.layers.test(q.layers)&&Sp(xe,L,q,Re,nt,Be)}}function Sp(v,L,q,U,B,ve){W!==null&&B.isNodeMaterial&&W.setObject(v,B),v.onBeforeRender(N,L,q,U,B,ve),v.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),B.onBeforeRender(N,L,q,U,v,ve),B.transparent===!0&&B.side===Gt&&B.forceSinglePass===!1?(B.side=wn,B.needsUpdate=!0,N.renderBufferDirect(q,L,U,B,v,ve),B.side=$n,B.needsUpdate=!0,N.renderBufferDirect(q,L,U,B,v,ve),B.side=Gt):N.renderBufferDirect(q,L,U,B,v,ve),v.onAfterRender(N,L,q,U,B,ve)}function wp(v){let L=0;for(let q of v)q.texture!==null&&L++;return L}function go(v,L,q){L.isScene!==!0&&(L=ii);let U=Ze.get(v),B=P.state.lights,ve=P.state.shadowsArray,Ne=B.state.version,xe=re.getParameters(v,B.state,ve,L,q,P.state.lightProbeGridArray),Re=re.getProgramCacheKey(xe),Be=U.programs;U.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,U.fog=L.fog;let nt=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;U.envMap=S.get(v.envMap||U.environment,nt),U.envMapRotation=U.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,Be===void 0&&(v.addEventListener("dispose",Dt),Be=new Map,U.programs=Be,U.programVariants=new Map);let gt=Be.get(Re);if(gt!==void 0){if(U.currentProgram===gt&&U.lightsStateVersion===Ne)return Rp(v,xe),gt}else xe.uniforms=re.getUniforms(v),W!==null&&v.isNodeMaterial&&W.build(v,q,xe),v.onBeforeCompile(xe,N),gt=re.acquireProgram(xe,Re),Be.set(Re,gt),U.uniforms=xe.uniforms;let Oe=U.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Oe.clippingPlanes=te.uniform),Rp(v,xe),U.needsLights=o_(v),U.lightsStateVersion=Ne,U.needsLights&&(Oe.ambientLightColor.value=B.state.ambient,Oe.lightProbe.value=B.state.probe,Oe.sunLights.value=B.state.sun,Oe.sunLightShadows.value=B.state.sunShadow,Oe.directionalLights.value=B.state.directional,Oe.directionalLightShadows.value=B.state.directionalShadow,Oe.spotLights.value=B.state.spot,Oe.spotLightShadows.value=B.state.spotShadow,Oe.rectAreaLights.value=B.state.rectArea,Oe.ltc_1.value=B.state.rectAreaLTC1,Oe.ltc_2.value=B.state.rectAreaLTC2,Oe.pointLights.value=B.state.point,Oe.pointLightShadows.value=B.state.pointShadow,Oe.hemisphereLights.value=B.state.hemi,Oe.sunShadowMatrix.value=B.state.sunShadowMatrix,Oe.sunShadowCascade.value=B.state.sunShadowCascade,Oe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Oe.spotLightMatrix.value=B.state.spotLightMatrix,Oe.spotLightMap.value=B.state.spotLightMap,Oe.pointShadowMatrix.value=B.state.pointShadowMatrix),U.numLightProbeGrids=wp(P.state.lightProbeGridArray),U.currentProgram=gt,U.uniformsList=null,gt}function i_(v,L,q,U,B){let ve=Ze.get(v),Ne=ve.currentProgram.id+","+U+","+B,xe=ve.programVariants.get(Ne);return xe===void 0?(xe=go(v,L,q),ve.programVariants.set(Ne,xe)):(ve.currentProgram=xe,ve.uniformsList=null,ve.outputColorSpace=U,ve.toneMapping=B),xe}function Cp(v){if(v.uniformsList===null){let L=v.currentProgram.getUniforms();v.uniformsList=eo.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function Rp(v,L){let q=Ze.get(v);q.outputColorSpace=L.outputColorSpace,q.batching=L.batching,q.batchingColor=L.batchingColor,q.instancing=L.instancing,q.instancingColor=L.instancingColor,q.instancingMorph=L.instancingMorph,q.skinning=L.skinning,q.morphTargets=L.morphTargets,q.morphNormals=L.morphNormals,q.morphColors=L.morphColors,q.morphTargetsCount=L.morphTargetsCount,q.numClippingPlanes=L.numClippingPlanes,q.numIntersection=L.numClipIntersection,q.vertexAlphas=L.vertexAlphas,q.vertexTangents=L.vertexTangents,q.toneMapping=L.toneMapping}function s_(v,L,q,U,B){L.isScene!==!0&&(L=ii),tt.resetTextureUnits();let ve=L.fog,Ne=U.isMeshStandardMaterial||U.isMeshLambertMaterial||U.isMeshPhongMaterial?L.environment:null,xe=ce===null?N.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:_t.workingColorSpace,Re=U.isMeshStandardMaterial||U.isMeshLambertMaterial&&!U.envMap||U.isMeshPhongMaterial&&!U.envMap,Be=S.get(U.envMap||Ne,Re),nt=U.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,gt=!!q.attributes.tangent&&(!!U.normalMap||U.anisotropy>0),Oe=!!q.morphAttributes.position,xt=!!q.morphAttributes.normal,an=!!q.morphAttributes.color,Bt=zi;U.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Bt=N.toneMapping);let Ut=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Dn=Ut!==void 0?Ut.length:0,Fe=Ze.get(U),zn=P.state.lights;if(pn===!0&&(Wn===!0||v!==se)){let $t=v===se&&U.id===Z;te.setState(U,v,$t)}let At=!1,Gs=!1;U.version===Fe.__version?Fe.needsLights&&Fe.lightsStateVersion!==zn.state.version||B.isBatchedMesh&&Fe.batching===!1||!B.isBatchedMesh&&Fe.batching===!0||B.isBatchedMesh&&Fe.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&Fe.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&Fe.instancing===!1||!B.isInstancedMesh&&Fe.instancing===!0||B.isSkinnedMesh&&Fe.skinning===!1||!B.isSkinnedMesh&&Fe.skinning===!0||B.isInstancedMesh&&Fe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Fe.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Fe.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Fe.instancingMorph===!1&&B.morphTexture!==null||Fe.envMap!==Be||U.fog===!0&&Fe.fog!==ve||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==te.numPlanes||Fe.numIntersection!==te.numIntersection)||Fe.vertexAlphas!==nt||Fe.vertexTangents!==gt||Fe.morphTargets!==Oe||Fe.morphNormals!==xt||Fe.morphColors!==an||Fe.morphTargetsCount!==Dn||Fe.numLightProbeGrids!==wp(P.state.lightProbeGridArray)?At=!0:(Fe.outputColorSpace!==xe||Fe.toneMapping!==Bt)&&(Gs=!0):(At=!0,Fe.__version=U.version);let Nn=Fe.currentProgram;(At===!0||Gs===!0)&&(Nn=Gs===!0?i_(U,L,B,xe,Bt):go(U,L,B),W&&U.isNodeMaterial&&W.onUpdateProgram(U,Nn,Fe));let Sa=!1,ms=!1,Vs=!1,Mt=Nn.getUniforms(),An=Fe.uniforms;if(Se.useProgram(Nn.program)&&(Sa=!0,ms=!0,Vs=!0),U.id!==Z&&(Z=U.id,ms=!0),Sa||se!==v){Se.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),Mt.setValue(R,"projectionMatrix",v.projectionMatrix),Mt.setValue(R,"viewMatrix",v.matrixWorldInverse);let bn=Mt.map.cameraPosition;bn!==void 0&&bn.setValue(R,Li.setFromMatrixPosition(v.matrixWorld)),Xt.logarithmicDepthBuffer&&Mt.setValue(R,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&Mt.setValue(R,"isOrthographic",v.isOrthographicCamera===!0),se!==v&&(se=v,ms=!0,Vs=!0)}if(Fe.needsLights&&(zn.state.sunShadowMap.length>0&&Mt.setValue(R,"sunShadowMap",zn.state.sunShadowMap,tt),zn.state.directionalShadowMap.length>0&&Mt.setValue(R,"directionalShadowMap",zn.state.directionalShadowMap,tt),zn.state.spotShadowMap.length>0&&Mt.setValue(R,"spotShadowMap",zn.state.spotShadowMap,tt),zn.state.pointShadowMap.length>0&&Mt.setValue(R,"pointShadowMap",zn.state.pointShadowMap,tt)),B.isSkinnedMesh){Mt.setOptional(R,B,"bindMatrix"),Mt.setOptional(R,B,"bindMatrixInverse");let $t=B.skeleton;$t&&($t.boneTexture===null&&$t.computeBoneTexture(),Mt.setValue(R,"boneTexture",$t.boneTexture,tt))}B.isBatchedMesh&&(Mt.setOptional(R,B,"batchingTexture"),Mt.setValue(R,"batchingTexture",B._matricesTexture,tt),Mt.setOptional(R,B,"batchingIdTexture"),Mt.setValue(R,"batchingIdTexture",B._indirectTexture,tt),Mt.setOptional(R,B,"batchingColorTexture"),B._colorsTexture!==null&&Mt.setValue(R,"batchingColorTexture",B._colorsTexture,tt));let yi=q.morphAttributes;if((yi.position!==void 0||yi.normal!==void 0||yi.color!==void 0)&&ne.update(B,q,Nn),(ms||Fe.receiveShadow!==B.receiveShadow)&&(Fe.receiveShadow=B.receiveShadow,Mt.setValue(R,"receiveShadow",B.receiveShadow)),(U.isMeshStandardMaterial||U.isMeshLambertMaterial||U.isMeshPhongMaterial)&&U.envMap===null&&L.environment!==null&&(An.envMapIntensity.value=L.environmentIntensity),An.dfgLUT!==void 0&&(An.dfgLUT.value=XM()),ms){if(Mt.setValue(R,"toneMappingExposure",N.toneMappingExposure),Fe.needsLights&&r_(An,Vs),ve&&U.fog===!0&&pe.refreshFogUniforms(An,ve),pe.refreshMaterialUniforms(An,U,Me,ze,P.state.transmissionRenderTarget[v.id]),Fe.needsLights&&Fe.numLightProbeGrids>0){let $t=T,bn=0;for(let $i of P.state.lightProbeGridArray)$i.texture!==null&&($t.textures[bn]=$i.texture,$t.min[bn]=$i.boundingBox.min,$t.max[bn]=$i.boundingBox.max,$t.resolution[bn]=$i.resolution,bn++);for(let $i in $t)$t[$i].length=bn;An.probesSH.value=$t.textures,An.probesMin.value=$t.min,An.probesMax.value=$t.max,An.probesResolution.value=$t.resolution}eo.upload(R,Cp(Fe),An,tt)}if(U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(eo.upload(R,Cp(Fe),An,tt),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&Mt.setValue(R,"center",B.center),Mt.setValue(R,"modelViewMatrix",B.modelViewMatrix),Mt.setValue(R,"normalMatrix",B.normalMatrix),Mt.setValue(R,"modelMatrix",B.matrixWorld),U.uniformsGroups!==void 0){let $t=U.uniformsGroups;for(let bn=0,$i=$t.length;bn<$i;bn++){let Pp=$t[bn];Ge.update(Pp,Nn),Ge.bind(Pp,Nn)}}return Nn}function r_(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.sunLights.needsUpdate=L,v.sunLightShadows.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function o_(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return ie},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return ce},this.setRenderTargetTextures=function(v,L,q){let U=Ze.get(v);U.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,U.__autoAllocateDepthBuffer===!1&&(U.__useRenderToTexture=!1),Ze.get(v.texture).__webglTexture=L,Ze.get(v.depthTexture).__webglTexture=U.__autoAllocateDepthBuffer?void 0:q,U.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,L){let q=Ze.get(v);q.__webglFramebuffer=L,q.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(v,L=0,q=0){ce=v,ie=L,z=q;let U=null,B=!1,ve=!1;if(v){let xe=Ze.get(v);if(xe.__useDefaultFramebuffer!==void 0){Se.bindFramebuffer(R.FRAMEBUFFER,xe.__webglFramebuffer),le.copy(v.viewport),Pe.copy(v.scissor),Ke=v.scissorTest,Se.viewport(le),Se.scissor(Pe),Se.setScissorTest(Ke),Z=-1;return}else if(xe.__webglFramebuffer===void 0)tt.setupRenderTarget(v);else if(xe.__hasExternalTextures)tt.rebindTextures(v,Ze.get(v.texture).__webglTexture,Ze.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let nt=v.depthTexture;if(xe.__boundDepthTexture!==nt){if(nt!==null&&Ze.has(nt)&&(v.width!==nt.image.width||v.height!==nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");tt.setupDepthRenderbuffer(v)}}let Re=v.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(ve=!0);let Be=Ze.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Be[L])?U=Be[L][q]:U=Be[L],B=!0):v.samples>0&&tt.useMultisampledRTT(v)===!1?U=Ze.get(v).__webglMultisampledFramebuffer:Array.isArray(Be)?U=Be[q]:U=Be,le.copy(v.viewport),Pe.copy(v.scissor),Ke=v.scissorTest}else le.copy($e).multiplyScalar(Me).floor(),Pe.copy(Lt).multiplyScalar(Me).floor(),Ke=Ht;if(q!==0&&(U=$),Se.bindFramebuffer(R.FRAMEBUFFER,U)&&Se.drawBuffers(v,U),Se.viewport(le),Se.scissor(Pe),Se.setScissorTest(Ke),B){let xe=Ze.get(v.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+L,xe.__webglTexture,q)}else if(ve){let xe=L;for(let Re=0;Re<v.textures.length;Re++){let Be=Ze.get(v.textures[Re]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Re,Be.__webglTexture,q,xe)}}else if(v!==null&&q!==0){let xe=Ze.get(v.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,xe.__webglTexture,q)}Z=-1};function Ap(v){let L=Ze.get(v);return(L.__readFormat!==v.format||L.__readType!==v.type)&&(L.__readFormat=v.format,L.__readType=v.type,L.__formatReadable=Xt.textureFormatReadable(v.format),L.__typeReadable=Xt.textureTypeReadable(v.type)),L}this.readRenderTargetPixels=function(v,L,q,U,B,ve,Ne,xe=0){if(!(v&&v.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Ze.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Ne!==void 0&&(Re=Re[Ne],Array.isArray(Re)&&(Re=Re[0])),Re){Se.bindFramebuffer(R.FRAMEBUFFER,Re);try{let Be=v.textures[xe],nt=Be.format,gt=Be.type;v.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+xe);let Oe=Ap(Be);if(Oe.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Oe.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-U&&q>=0&&q<=v.height-B&&R.readPixels(L,q,U,B,de.convert(nt),de.convert(gt),ve)}finally{let Be=ce!==null?Ze.get(ce).__webglFramebuffer:null;Se.bindFramebuffer(R.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(v,L,q,U,B,ve,Ne,xe=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Ze.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Ne!==void 0&&(Re=Re[Ne],Array.isArray(Re)&&(Re=Re[0])),Re)if(L>=0&&L<=v.width-U&&q>=0&&q<=v.height-B){Se.bindFramebuffer(R.FRAMEBUFFER,Re);let Be=v.textures[xe],nt=Be.format,gt=Be.type;v.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+xe);let Oe=Ap(Be);if(Oe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Oe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,xt),R.bufferData(R.PIXEL_PACK_BUFFER,ve.byteLength,R.STREAM_READ),R.readPixels(L,q,U,B,de.convert(nt),de.convert(gt),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let an=ce!==null?Ze.get(ce).__webglFramebuffer:null;Se.bindFramebuffer(R.FRAMEBUFFER,an);let Bt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await rm(R,Bt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,xt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ve),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(xt),R.deleteSync(Bt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,L=null,q=0){let U=Math.pow(2,-q),B=Math.floor(v.image.width*U),ve=Math.floor(v.image.height*U),Ne=L!==null?L.x:0,xe=L!==null?L.y:0;tt.setTexture2D(v,0),R.copyTexSubImage2D(R.TEXTURE_2D,q,0,0,Ne,xe,B,ve),Se.unbindTexture()},this.copyTextureToTexture=function(v,L,q=null,U=null,B=0,ve=0){let Ne,xe,Re,Be,nt,gt,Oe,xt,an,Bt=v.isCompressedTexture?v.mipmaps[ve]:v.image;if(q!==null)Ne=q.max.x-q.min.x,xe=q.max.y-q.min.y,Re=q.isBox3?q.max.z-q.min.z:1,Be=q.min.x,nt=q.min.y,gt=q.isBox3?q.min.z:0;else{let Mt=Math.pow(2,-B);Ne=Math.floor(Bt.width*Mt),xe=Math.floor(Bt.height*Mt),v.isDataArrayTexture?Re=Bt.depth:v.isData3DTexture?Re=Math.floor(Bt.depth*Mt):Re=1,Be=0,nt=0,gt=0}U!==null?(Oe=U.x,xt=U.y,an=U.z):(Oe=0,xt=0,an=0);let Ut=de.convert(L.format),Dn=de.convert(L.type),Fe;L.isData3DTexture?(tt.setTexture3D(L,0),Fe=R.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(tt.setTexture2DArray(L,0),Fe=R.TEXTURE_2D_ARRAY):(tt.setTexture2D(L,0),Fe=R.TEXTURE_2D),Se.activeTexture(R.TEXTURE0),Se.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,L.flipY),Se.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),Se.pixelStorei(R.UNPACK_ALIGNMENT,L.unpackAlignment);let zn=Se.getParameter(R.UNPACK_ROW_LENGTH),At=Se.getParameter(R.UNPACK_IMAGE_HEIGHT),Gs=Se.getParameter(R.UNPACK_SKIP_PIXELS),Nn=Se.getParameter(R.UNPACK_SKIP_ROWS),Sa=Se.getParameter(R.UNPACK_SKIP_IMAGES);Se.pixelStorei(R.UNPACK_ROW_LENGTH,Bt.width),Se.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Bt.height),Se.pixelStorei(R.UNPACK_SKIP_PIXELS,Be),Se.pixelStorei(R.UNPACK_SKIP_ROWS,nt),Se.pixelStorei(R.UNPACK_SKIP_IMAGES,gt);let ms=v.isDataArrayTexture||v.isData3DTexture,Vs=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){let Mt=Ze.get(v),An=Ze.get(L),yi=Ze.get(Mt.__renderTarget),$t=Ze.get(An.__renderTarget);Se.bindFramebuffer(R.READ_FRAMEBUFFER,yi.__webglFramebuffer),Se.bindFramebuffer(R.DRAW_FRAMEBUFFER,$t.__webglFramebuffer);for(let bn=0;bn<Re;bn++)ms&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ze.get(v).__webglTexture,B,gt+bn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ze.get(L).__webglTexture,ve,an+bn)),R.blitFramebuffer(Be,nt,Be+Ne,nt+xe,Oe,xt,Oe+Ne,xt+xe,R.DEPTH_BUFFER_BIT,R.NEAREST);Se.bindFramebuffer(R.READ_FRAMEBUFFER,null),Se.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(B!==0||v.isRenderTargetTexture||Ze.has(v)){let Mt=Ze.get(v),An=Ze.get(L);Se.bindFramebuffer(R.READ_FRAMEBUFFER,D),Se.bindFramebuffer(R.DRAW_FRAMEBUFFER,X);for(let yi=0;yi<Re;yi++)ms?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Mt.__webglTexture,B,gt+yi):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Mt.__webglTexture,B),Vs?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,An.__webglTexture,ve,an+yi):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,An.__webglTexture,ve),B!==0?R.blitFramebuffer(Be,nt,Be+Ne,nt+xe,Oe,xt,Oe+Ne,xt+xe,R.COLOR_BUFFER_BIT,R.NEAREST):Vs?R.copyTexSubImage3D(Fe,ve,Oe,xt,an+yi,Be,nt,Ne,xe):R.copyTexSubImage2D(Fe,ve,Oe,xt,Be,nt,Ne,xe);Se.bindFramebuffer(R.READ_FRAMEBUFFER,null),Se.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Vs?v.isDataTexture||v.isData3DTexture?R.texSubImage3D(Fe,ve,Oe,xt,an,Ne,xe,Re,Ut,Dn,Bt.data):L.isCompressedArrayTexture?R.compressedTexSubImage3D(Fe,ve,Oe,xt,an,Ne,xe,Re,Ut,Bt.data):R.texSubImage3D(Fe,ve,Oe,xt,an,Ne,xe,Re,Ut,Dn,Bt):v.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,ve,Oe,xt,Ne,xe,Ut,Dn,Bt.data):v.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,ve,Oe,xt,Bt.width,Bt.height,Ut,Bt.data):R.texSubImage2D(R.TEXTURE_2D,ve,Oe,xt,Ne,xe,Ut,Dn,Bt);Se.pixelStorei(R.UNPACK_ROW_LENGTH,zn),Se.pixelStorei(R.UNPACK_IMAGE_HEIGHT,At),Se.pixelStorei(R.UNPACK_SKIP_PIXELS,Gs),Se.pixelStorei(R.UNPACK_SKIP_ROWS,Nn),Se.pixelStorei(R.UNPACK_SKIP_IMAGES,Sa),ve===0&&L.generateMipmaps===!0&&L.mipmapsAutoUpdate===!0&&R.generateMipmap(Fe),Se.unbindTexture()},this.initRenderTarget=function(v){Ze.get(v).__webglFramebuffer===void 0&&tt.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?tt.setTextureCube(v,0):v.isData3DTexture?tt.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?tt.setTexture2DArray(v,0):tt.setTexture2D(v,0),Se.unbindTexture()},this.resetState=function(){ie=0,z=0,ce=null,Se.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}};var Sd={high:{maxPixelRatio:2,shadowMapSize:4096,detail:1,postEffects:!0},medium:{maxPixelRatio:1.5,shadowMapSize:2048,detail:.6,postEffects:!0},low:{maxPixelRatio:.75,shadowMapSize:0,detail:.35,postEffects:!1}},Vn={particles:1,postEffects:!0},Cc=[{mode:"auto",label:"Auto",hint:"S'adapte pour rester fluide"},{mode:"high",label:"Haute",hint:"R\xE9solution max \xD72, ombres fines, tous les effets"},{mode:"medium",label:"Moyenne",hint:"R\xE9solution \xD71.5, moins de particules"},{mode:"low",label:"\xC9conomie",hint:"R\xE9solution \xD70.75, sans ombres ni halos, moins de particules"}],Wm=45,qm=3,Xm=58,Ym=8,wd=.25,Rc=1;function Km(){return typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches}var ar=(R=>(R.NEUTRAL="neutral",R.SUNNY="sunny",R.CLOUDY="cloudy",R.RAINY="rainy",R.STORM="storm",R.SNOW="snow",R.AURORA="aurora",R.FOG="fog",R.DRIZZLE="drizzle",R.BLOOD_MOON="blood-moon",R.HEATWAVE="heatwave",R.FIREFLIES="fireflies",R.LEAVES="leaves",R.SPORES="spores",R.SANDSTORM="sandstorm",R.ELECTRIC="electric",R.FAIRY_MIST="fairy-mist",R.RISING_ENERGY="rising-energy",R.VOLCANIC="volcanic",R.BLOOD_RAIN="blood-rain",R.BLIZZARD="blizzard",R.DARKNESS="darkness",R.FOREST="forest",R.MONSOON="monsoon",R.AUTUMN_DRIZZLE="autumn-drizzle",R.STARRY_NIGHT="starry-night",R.SMOG="smog",R.FIREWORKS="fireworks",R.LIGHT_TIDE="light-tide",R.EARTHQUAKE="earthquake",R.GEYSERS="geysers",R.TIME_WARP="time-warp",R.INVERTED="inverted",R.STALKING_FOG="stalking-fog",R.ERUPTION="eruption",R.ANTIGRAVITY="antigravity",R.OLD_FILM="old-film",R.THUNDER_RAIN="thunder-rain",R.MORNING_MIST="morning-mist",R.MIRAGE="mirage",R.MOONLESS="moonless",R.DEEP_FREEZE="deep-freeze",R.CRYSTAL_MIST="crystal-mist",R.MARS="mars",R.ACID_RAIN="acid-rain",R.HAIL="hail",R.SEA_MIST="sea-mist",R.SPRING_SHOWER="spring-shower",R.ASH="ash",R.FREEZING_RAIN="freezing-rain",R.MAGIC_SNOW="magic-snow",R.STARDUST="stardust",R.SOLAR_STORM="solar-storm",R.CURSE="curse",R.PETAL_WHIRL="petal-whirl",R.FROST="frost",R.HAUNTED="haunted",R.FLOOD="flood",R.TORNADO="tornado",R.POISON="poison",R))(ar||{}),Xe={litLevel:1,shadowLevel:.6,ambientColor:new x(16777215),sunColor:new x(16777215),unlitTint:new x(16777215),specular:.3,cloudCover:0,cloudAmbient:0,sunGlow:0,windowGlow:0,windowTint:new x(16777215),lightPulse:0,godRays:0,cloudSpeed:12,rain:0,bloodRain:0,poisonRain:0,drizzle:0,lightning:0,lightningColor:new x(15002879),aurora:0,snow:0,snowDrift:1,minWind:0,heatHaze:0,heatWash:0,embers:0,lava:0,fireflies:0,fairyLights:0,risingEnergy:0,leaves:0,spores:0,pollen:0,canopy:0,sand:0,electric:0,fog:0,soak:1,lightningFar:0,frogs:0,autumnLeaves:0,dew:0,stars:0,tide:0,quake:0,geysers:0,timeWarp:0,invert:0,stalkingFog:0,eruption:0,antigravity:0,oldFilm:0,thunderRain:0,morningMist:0,mirage:0,moonless:0,deepFreeze:0,crickets:0,city:0,fireworks:0,crystals:0,marsDust:0,acidRain:0,fumes:0,poisonFumes:0,sandColor:new x().setRGB(.86,.71,.48),sandTint:new x(16777215),hail:0,sea:0,sunRain:0,birds:0,ash:0,ice:0,magicSnow:0,stardust:0,iridescence:0,auroraRed:0,flicker:0,curse:0,sunWander:0,petalWhirl:0,frost:0,haunt:0,flood:0,tornado:0,fogColor:new x(14541800),darkness:0,temperature:0},We=ht(Ve({},Xe),{litLevel:.45,shadowLevel:.26,ambientColor:new x(7176115),sunColor:new x(11781375),unlitTint:new x(7372456),specular:.4,windowGlow:1,fogColor:new x(9674419)}),ae=(s,e)=>Ve(Ve({},s),e),lr={neutral:Xe,sunny:ae(Xe,{specular:1,sunGlow:.8,godRays:.5}),forest:ae(Xe,{litLevel:1,shadowLevel:.55,ambientColor:new x(13954248),sunColor:new x(16774872),unlitTint:new x(15003868),specular:.3,sunGlow:.3,godRays:.7,cloudSpeed:6,canopy:1,pollen:1,leaves:.2,fog:.2,fogColor:new x(12114096)}),hail:ae(Xe,{litLevel:.7,shadowLevel:.6,ambientColor:new x(13160668),sunColor:new x(15265528),unlitTint:new x(13423840),specular:.2,cloudCover:.8,cloudAmbient:.15,cloudSpeed:35,hail:1,fog:.15,fogColor:new x(13160664)}),"sea-mist":ae(Xe,{litLevel:.85,shadowLevel:.64,ambientColor:new x(13951210),sunColor:new x(15791871),unlitTint:new x(14213868),specular:.3,cloudCover:.5,cloudAmbient:.08,cloudSpeed:20,minWind:.25,sea:1,fog:.75,fogColor:new x(11057864)}),"spring-shower":ae(Xe,{litLevel:1.02,shadowLevel:.62,ambientColor:new x(16775404),sunColor:new x(16773328),unlitTint:new x(16775408),specular:.8,sunGlow:.5,godRays:.6,cloudCover:.2,cloudSpeed:15,sunRain:.45,birds:.8}),"morning-mist":ae(Xe,{litLevel:.95,shadowLevel:.62,ambientColor:new x(16184042),sunColor:new x(16773336),unlitTint:new x(16184044),specular:.6,sunGlow:.4,cloudCover:.1,cloudSpeed:4,birds:1,morningMist:1,fogColor:new x(15657700)}),ash:ae(Xe,{litLevel:.72,shadowLevel:.55,ambientColor:new x(13941928),sunColor:new x(16754800),unlitTint:new x(14206132),specular:.1,cloudCover:.6,cloudAmbient:.12,cloudSpeed:5,ash:1,fog:.45,fogColor:new x(11048072)}),"freezing-rain":ae(Xe,{litLevel:.8,shadowLevel:.62,ambientColor:new x(13950186),sunColor:new x(15660287),unlitTint:new x(14213356),specular:1.2,cloudCover:.6,cloudAmbient:.1,cloudSpeed:15,drizzle:.9,ice:1,fog:.25,fogColor:new x(13161696)}),"magic-snow":ae(Xe,{litLevel:.95,shadowLevel:.68,ambientColor:new x(14477567),sunColor:new x(15791359),unlitTint:new x(14740223),specular:.4,cloudCover:.3,cloudSpeed:6,snow:.5,magicSnow:1,fog:.2,fogColor:new x(13688063)}),stardust:ae(Xe,{litLevel:.96,shadowLevel:.62,ambientColor:new x(15787775),sunColor:new x(16774380),unlitTint:new x(16051455),specular:1.3,sunGlow:.3,cloudSpeed:6,iridescence:1,stardust:1,fog:.15,fogColor:new x(14996724)}),"solar-storm":ae(Xe,{litLevel:.92,shadowLevel:.6,ambientColor:new x(16769240),sunColor:new x(16773344),unlitTint:new x(16771296),specular:.6,sunGlow:.3,cloudSpeed:8,aurora:3,auroraRed:1,flicker:1}),curse:ae(Xe,{litLevel:.6,shadowLevel:.36,ambientColor:new x(12099792),sunColor:new x(14205183),unlitTint:new x(12364496),specular:.3,cloudCover:.3,cloudSpeed:4,lightPulse:.08,curse:1,sunWander:1,fog:.35,fogColor:new x(5783664)}),"petal-whirl":ae(Xe,{litLevel:1.02,shadowLevel:.62,ambientColor:new x(16773364),sunColor:new x(16773866),unlitTint:new x(16774390),specular:.4,sunGlow:.3,cloudCover:.2,cloudSpeed:25,minWind:.5,petalWhirl:1}),frost:ae(Xe,{litLevel:.95,shadowLevel:.66,ambientColor:new x(14477567),sunColor:new x(16774376),unlitTint:new x(14871807),specular:.6,cloudSpeed:4,frost:1,fog:.2,fogColor:new x(14740216)}),"deep-freeze":ae(Xe,{litLevel:.92,shadowLevel:.64,ambientColor:new x(13689087),sunColor:new x(15791871),unlitTint:new x(14214911),specular:.9,cloudSpeed:8,minWind:.4,frost:1,ice:.5,deepFreeze:1,fog:.25,fogColor:new x(14477562)}),haunted:ae(Xe,{litLevel:.65,shadowLevel:.5,ambientColor:new x(12897492),sunColor:new x(14542060),unlitTint:new x(12634320),specular:.1,cloudCover:.6,cloudSpeed:4,minWind:.15,haunt:1,fog:.85,fogColor:new x(10134704),darkness:.5}),flood:ae(Xe,{litLevel:.72,shadowLevel:.58,ambientColor:new x(12634840),sunColor:new x(14739700),unlitTint:new x(12897498),specular:.2,cloudCover:.85,cloudAmbient:.15,cloudSpeed:30,rain:.8,flood:1,fog:.2}),tornado:ae(Xe,{litLevel:.62,shadowLevel:.5,ambientColor:new x(12108976),sunColor:new x(14213320),unlitTint:new x(12371636),specular:.1,cloudCover:.9,cloudAmbient:.2,cloudSpeed:50,minWind:.8,rain:.25,lightning:.3,tornado:1,fog:.25,fogColor:new x(9081984)}),cloudy:ae(Xe,{shadowLevel:.62,ambientColor:new x(15922424),unlitTint:new x(16054010),specular:.25,cloudCover:1,cloudAmbient:.3,sunGlow:.15}),rainy:ae(Xe,{litLevel:.78,ambientColor:new x(12898272),unlitTint:new x(13226720),specular:0,cloudCover:.7,cloudAmbient:.15,cloudSpeed:30,rain:.6}),"blood-rain":ae(Xe,{litLevel:.7,shadowLevel:.5,ambientColor:new x(13150376),sunColor:new x(15779008),unlitTint:new x(13676720),specular:.2,cloudCover:.75,cloudAmbient:.15,cloudSpeed:25,bloodRain:.8,lightning:.6,lightningColor:new x(16722466),fog:.3,fogColor:new x(9065560)}),poison:ae(Xe,{litLevel:.78,shadowLevel:.56,ambientColor:new x(13150432),sunColor:new x(14730495),unlitTint:new x(13677796),specular:.3,cloudCover:.5,cloudAmbient:.1,cloudSpeed:6,lightPulse:.06,heatHaze:1,poisonRain:.6,poisonFumes:1,fog:.8,fogColor:new x(10117832)}),storm:ae(Xe,{litLevel:.55,shadowLevel:.45,ambientColor:new x(10135229),sunColor:new x(14213375),unlitTint:new x(10726850),specular:0,cloudCover:.8,cloudAmbient:.25,cloudSpeed:55,windowGlow:.5,rain:1,lightning:1}),"thunder-rain":ae(Xe,{litLevel:.45,shadowLevel:.38,ambientColor:new x(9214136),sunColor:new x(13161727),unlitTint:new x(9872064),specular:.3,cloudCover:.9,cloudAmbient:.3,cloudSpeed:60,windowGlow:.5,rain:1,soak:2,thunderRain:1,electric:.35,fog:.2,fogColor:new x(6976656)}),monsoon:ae(Xe,{litLevel:.66,shadowLevel:.54,ambientColor:new x(11849144),sunColor:new x(14478552),unlitTint:new x(12374720),specular:.3,cloudCover:.85,cloudAmbient:.2,cloudSpeed:35,rain:1,soak:3,lightning:.25,lightningFar:.65,frogs:.6,fog:.45,fogColor:new x(9416340)}),snow:ae(Xe,{litLevel:.95,shadowLevel:.68,ambientColor:new x(15134200),sunColor:new x(16054527),unlitTint:new x(15265528),specular:.2,cloudCover:.4,cloudAmbient:.1,cloudSpeed:8,snow:1}),blizzard:ae(Xe,{litLevel:.85,shadowLevel:.72,ambientColor:new x(15002872),sunColor:new x(15791359),unlitTint:new x(14871286),specular:.1,cloudCover:.85,cloudAmbient:.15,cloudSpeed:40,snow:1.8,snowDrift:3.5,minWind:.95,fog:1,fogColor:new x(14476268)}),darkness:ae(Xe,{litLevel:.4,shadowLevel:.28,ambientColor:new x(8949920),sunColor:new x(10527920),unlitTint:new x(7370368),specular:.1,cloudCover:.6,cloudSpeed:4,windowGlow:.25,fog:.7,fogColor:new x(460554),darkness:1}),mirage:ae(Xe,{litLevel:1.15,shadowLevel:.7,ambientColor:new x(16772828),sunColor:new x(16769712),unlitTint:new x(16774372),specular:1,sunGlow:.7,cloudSpeed:3,minWind:.3,heatHaze:.7,heatWash:.6,mirage:1,fog:.15,fogColor:new x(16180940)}),heatwave:ae(Xe,{litLevel:1.12,shadowLevel:.68,ambientColor:new x(16770760),sunColor:new x(16767392),unlitTint:new x(16773340),specular:.9,sunGlow:.6,cloudSpeed:4,heatHaze:1,heatWash:1,fog:.18,fogColor:new x(15981752)}),"acid-rain":ae(Xe,{litLevel:.72,shadowLevel:.58,ambientColor:new x(13424804),sunColor:new x(15397560),unlitTint:new x(13687980),specular:.3,cloudCover:.75,cloudAmbient:.14,cloudSpeed:25,acidRain:.7,fumes:1,fog:.3,fogColor:new x(11453574)}),mars:ae(Xe,{litLevel:.8,shadowLevel:.56,ambientColor:new x(14984836),sunColor:new x(16765616),unlitTint:new x(15250582),specular:.15,cloudCover:.4,cloudAmbient:.08,cloudSpeed:30,sand:.7,minWind:.5,sandColor:new x().setRGB(.6,.24,.12),sandTint:new x(16747114),marsDust:1,fog:.5,fogColor:new x(12745298)}),earthquake:ae(Xe,{litLevel:.92,shadowLevel:.6,ambientColor:new x(15655632),sunColor:new x(16773340),unlitTint:new x(15787736),specular:.2,cloudCover:.2,cloudSpeed:6,quake:1,fog:.18,fogColor:new x(13154464)}),geysers:ae(Xe,{litLevel:.92,shadowLevel:.62,ambientColor:new x(15265520),sunColor:new x(16775404),unlitTint:new x(15659764),specular:.5,cloudCover:.25,cloudSpeed:8,dew:.5,geysers:1,fog:.3,fogColor:new x(14213348)}),"time-warp":ae(Xe,{litLevel:.9,shadowLevel:.62,ambientColor:new x(14472946),sunColor:new x(15920383),unlitTint:new x(14867700),specular:.5,cloudCover:.3,cloudSpeed:10,heatHaze:.3,timeWarp:1,fog:.22,fogColor:new x(13156584)}),inverted:ae(Xe,{litLevel:.95,shadowLevel:.5,specular:.4,cloudCover:.3,cloudSpeed:10,invert:1,fog:.12}),"crystal-mist":ae(Xe,{litLevel:.95,shadowLevel:.66,ambientColor:new x(14740735),sunColor:new x(16054527),unlitTint:new x(15134463),specular:1.2,sunGlow:.3,cloudCover:.2,cloudSpeed:4,iridescence:.7,crystals:1,fog:.4,fogColor:new x(14214906)}),smog:ae(Xe,{litLevel:.74,shadowLevel:.58,ambientColor:new x(14076836),sunColor:new x(16766104),unlitTint:new x(14208426),specular:.1,cloudCover:.4,cloudAmbient:.08,cloudSpeed:4,heatWash:.7,city:1,fog:.7,fogColor:new x(11706990)}),"autumn-drizzle":ae(Xe,{litLevel:.92,shadowLevel:.6,ambientColor:new x(15520434),sunColor:new x(16757864),unlitTint:new x(16769728),specular:.5,sunGlow:.55,godRays:.25,cloudCover:.35,cloudAmbient:.06,cloudSpeed:12,drizzle:.55,autumnLeaves:.6,birds:.35,fog:.2,fogColor:new x(14861466)}),leaves:ae(Xe,{litLevel:1.02,shadowLevel:.62,ambientColor:new x(16774374),sunColor:new x(16772044),unlitTint:new x(16774890),specular:.3,sunGlow:.3,cloudCover:.25,cloudAmbient:.05,cloudSpeed:10,leaves:1}),spores:ae(Xe,{litLevel:.95,shadowLevel:.6,ambientColor:new x(13496029),sunColor:new x(15326463),unlitTint:new x(14479334),specular:.4,sunGlow:.3,cloudCover:.2,cloudSpeed:8,lightPulse:.05,spores:1,fog:.22,fogColor:new x(12117708)}),sandstorm:ae(Xe,{litLevel:.82,shadowLevel:.62,ambientColor:new x(15256482),sunColor:new x(16765594),unlitTint:new x(15520946),specular:.1,cloudCover:.55,cloudAmbient:.1,cloudSpeed:40,sand:1,minWind:.6,fog:.65,fogColor:new x(13609076)}),electric:ae(Xe,{litLevel:.9,shadowLevel:.58,ambientColor:new x(14279935),sunColor:new x(15660031),unlitTint:new x(14871295),specular:1,cloudCover:.45,cloudAmbient:.12,cloudSpeed:25,electric:1,fog:.18,fogColor:new x(12899583)}),"fairy-mist":ae(Xe,{litLevel:.95,shadowLevel:.64,ambientColor:new x(16770291),sunColor:new x(16773370),unlitTint:new x(16771830),specular:.4,sunGlow:.2,cloudSpeed:6,lightPulse:.04,heatHaze:.6,fairyLights:1,fog:.45,fogColor:new x(16756956)}),volcanic:ae(Xe,{litLevel:.92,shadowLevel:.55,ambientColor:new x(16754804),sunColor:new x(16749636),unlitTint:new x(16762012),specular:.5,sunGlow:.3,cloudCover:.35,cloudAmbient:.08,cloudSpeed:6,lightPulse:.06,heatHaze:.9,lava:1,fog:.65,fogColor:new x(14715472)}),eruption:ae(Xe,{litLevel:.85,shadowLevel:.5,ambientColor:new x(16751208),sunColor:new x(16746560),unlitTint:new x(16758928),specular:.5,sunGlow:.3,cloudCover:.5,cloudAmbient:.1,cloudSpeed:8,lightPulse:.1,heatHaze:.9,lava:1,ash:.4,quake:1,eruption:1,fog:.7,fogColor:new x(13135946)}),antigravity:ae(Xe,{litLevel:.95,shadowLevel:.6,ambientColor:new x(14473460),sunColor:new x(16052479),unlitTint:new x(14999800),specular:.3,cloudCover:.3,cloudSpeed:-8,antigravity:1,fog:.15,fogColor:new x(14210288)}),"old-film":ae(Xe,{litLevel:1,shadowLevel:.55,cloudCover:.3,cloudSpeed:6,oldFilm:1,fog:.12}),drizzle:ae(Xe,{litLevel:.86,shadowLevel:.64,ambientColor:new x(14410218),sunColor:new x(15659768),unlitTint:new x(14541804),specular:.1,cloudCover:.6,cloudAmbient:.1,cloudSpeed:15,drizzle:1,fog:.25,fogColor:new x(14015459)}),"stalking-fog":ae(Xe,{litLevel:.8,shadowLevel:.66,ambientColor:new x(15133423),sunColor:new x(15725044),unlitTint:new x(14738922),specular:0,cloudCover:.3,cloudSpeed:4,fog:.3,fogColor:new x(14541544),stalkingFog:1}),fog:ae(Xe,{litLevel:.82,shadowLevel:.68,ambientColor:new x(15330802),sunColor:new x(15922422),unlitTint:new x(15002094),specular:0,cloudCover:.3,cloudAmbient:.05,cloudSpeed:6,fog:.85})},Cd={neutral:We,cloudy:ae(We,{litLevel:.42,unlitTint:new x(7306406),specular:.35,cloudCover:.8,cloudAmbient:.2}),rainy:ae(We,{litLevel:.34,shadowLevel:.24,ambientColor:new x(6254492),sunColor:new x(11122920),unlitTint:new x(6319250),specular:0,cloudCover:.6,cloudAmbient:.15,cloudSpeed:30,rain:.6}),"blood-rain":ae(We,{litLevel:.32,shadowLevel:.2,ambientColor:new x(8014422),sunColor:new x(13666960),unlitTint:new x(8148064),specular:.2,cloudCover:.6,cloudAmbient:.15,cloudSpeed:25,windowGlow:.6,windowTint:new x(16744560),bloodRain:.8,lightning:.6,lightningColor:new x(16722466),fog:.35,fogColor:new x(4858408)}),poison:ae(We,{litLevel:.36,shadowLevel:.24,ambientColor:new x(7228054),sunColor:new x(12094207),unlitTint:new x(8018588),specular:.3,cloudCover:.4,cloudSpeed:6,windowGlow:.6,windowTint:new x(13668607),lightPulse:.08,heatHaze:1,poisonRain:.6,poisonFumes:1,fog:.8,fogColor:new x(4860526)}),"starry-night":ae(We,{litLevel:.52,shadowLevel:.26,ambientColor:new x(7112388),sunColor:new x(13951743),unlitTint:new x(8031420),specular:.6,windowGlow:.45,fireflies:.2,dew:1,stars:1,crickets:.8}),"light-tide":ae(We,{litLevel:.3,shadowLevel:.18,ambientColor:new x(2899056),sunColor:new x(9087231),unlitTint:new x(4872840),specular:.6,windowGlow:.4,dew:.6,tide:1,fog:.18,fogColor:new x(1055808)}),fireworks:ae(We,{litLevel:.4,shadowLevel:.24,ambientColor:new x(5925530),unlitTint:new x(6977176),specular:.5,windowGlow:.6,fireworks:1}),"crystal-mist":ae(We,{litLevel:.46,shadowLevel:.3,ambientColor:new x(7111876),sunColor:new x(13689087),unlitTint:new x(7899320),specular:1.1,iridescence:.7,crystals:1,fog:.4,fogColor:new x(3689076)}),"acid-rain":ae(We,{litLevel:.32,shadowLevel:.22,ambientColor:new x(5662282),sunColor:new x(13162656),unlitTint:new x(6057040),specular:.3,cloudCover:.6,cloudSpeed:25,windowGlow:.5,acidRain:.7,fumes:1,fog:.3,fogColor:new x(3292710)}),mars:ae(We,{litLevel:.34,shadowLevel:.22,ambientColor:new x(6964288),sunColor:new x(11057376),unlitTint:new x(7360588),specular:.15,cloudCover:.3,cloudSpeed:30,sand:.6,minWind:.5,sandColor:new x().setRGB(.6,.24,.12),sandTint:new x(16747114),marsDust:1,fog:.5,fogColor:new x(3940384)}),earthquake:ae(We,{litLevel:.4,shadowLevel:.25,ambientColor:new x(6974084),unlitTint:new x(7368840),specular:.2,windowGlow:.6,quake:1,fog:.18,fogColor:new x(3814964)}),geysers:ae(We,{litLevel:.4,shadowLevel:.26,ambientColor:new x(6057100),unlitTint:new x(6977680),specular:.5,windowGlow:.5,dew:.5,geysers:1,fog:.3,fogColor:new x(2897476)}),"time-warp":ae(We,{litLevel:.4,shadowLevel:.26,ambientColor:new x(6050960),sunColor:new x(12628223),unlitTint:new x(6972052),specular:.5,windowGlow:.5,heatHaze:.3,timeWarp:1,fog:.22,fogColor:new x(2893392)}),inverted:ae(We,{windowGlow:.5,invert:1,fog:.12}),smog:ae(We,{litLevel:.38,shadowLevel:.28,ambientColor:new x(8022608),sunColor:new x(13150328),unlitTint:new x(8154196),specular:.1,cloudCover:.3,cloudSpeed:4,windowGlow:.6,windowTint:new x(16763024),heatWash:.5,city:.7,fog:.7,fogColor:new x(4997168)}),"autumn-drizzle":ae(We,{litLevel:.36,shadowLevel:.24,ambientColor:new x(7232084),sunColor:new x(14200976),unlitTint:new x(7758940),specular:.4,cloudCover:.3,cloudSpeed:12,windowGlow:.7,windowTint:new x(16760960),drizzle:.55,autumnLeaves:.5,fog:.22,fogColor:new x(3944489)}),monsoon:ae(We,{litLevel:.32,shadowLevel:.22,ambientColor:new x(5204572),unlitTint:new x(5795936),specular:.3,cloudCover:.6,cloudSpeed:35,windowGlow:.6,rain:1,soak:3,lightning:.25,lightningFar:.65,frogs:1,fog:.45,fogColor:new x(2900020)}),storm:ae(We,{litLevel:.3,shadowLevel:.2,ambientColor:new x(5661839),sunColor:new x(10530525),unlitTint:new x(5661322),specular:0,cloudCover:.7,cloudAmbient:.2,cloudSpeed:55,rain:1,lightning:1}),"thunder-rain":ae(We,{litLevel:.26,shadowLevel:.18,ambientColor:new x(5003912),sunColor:new x(10530525),unlitTint:new x(5267594),specular:.3,cloudCover:.8,cloudAmbient:.2,cloudSpeed:60,windowGlow:.5,rain:1,soak:2,thunderRain:1,electric:.35,fog:.2,fogColor:new x(1843764)}),"morning-mist":ae(We,{specular:.4,windowGlow:.4,morningMist:1,fogColor:new x(3818072)}),snow:ae(We,{litLevel:.47,shadowLevel:.3,ambientColor:new x(7636664),unlitTint:new x(7898284),specular:.2,cloudCover:.4,cloudAmbient:.1,cloudSpeed:8,snow:1}),blizzard:ae(We,{litLevel:.4,shadowLevel:.32,ambientColor:new x(7899316),unlitTint:new x(8029866),specular:.1,cloudCover:.7,cloudAmbient:.1,cloudSpeed:40,snow:1.8,snowDrift:3.5,minWind:.95,fog:1,fogColor:new x(9214136)}),darkness:ae(We,{litLevel:.22,shadowLevel:.14,ambientColor:new x(4871280),unlitTint:new x(3949656),specular:.1,cloudCover:.4,cloudSpeed:4,windowGlow:.35,fog:.75,fogColor:new x(197381),darkness:1}),"deep-freeze":ae(We,{litLevel:.44,shadowLevel:.28,ambientColor:new x(6981824),sunColor:new x(11591920),unlitTint:new x(7377080),specular:.7,windowGlow:.5,minWind:.4,aurora:.7,frost:1,ice:.5,deepFreeze:1,fog:.2,fogColor:new x(1845312)}),aurora:ae(We,{litLevel:.4,shadowLevel:.24,ambientColor:new x(6258606),sunColor:new x(11067600),unlitTint:new x(7311274),aurora:1}),drizzle:ae(We,{litLevel:.37,shadowLevel:.25,ambientColor:new x(6517660),unlitTint:new x(6779802),specular:.1,cloudCover:.5,cloudAmbient:.1,cloudSpeed:15,drizzle:1,fog:.3}),forest:ae(We,{litLevel:.4,shadowLevel:.22,ambientColor:new x(5208696),sunColor:new x(12113128),unlitTint:new x(6061184),canopy:1,fireflies:.35,fog:.25,fogColor:new x(2375740)}),hail:ae(We,{litLevel:.34,shadowLevel:.24,ambientColor:new x(6254492),unlitTint:new x(6714010),specular:.2,cloudCover:.6,cloudSpeed:35,windowGlow:.5,hail:1,fog:.15}),"sea-mist":ae(We,{litLevel:.36,shadowLevel:.26,ambientColor:new x(5927056),unlitTint:new x(6453392),specular:.3,cloudCover:.4,cloudSpeed:20,minWind:.25,sea:1,fog:.75,fogColor:new x(3425882)}),ash:ae(We,{litLevel:.34,shadowLevel:.22,ambientColor:new x(8018508),sunColor:new x(13666912),unlitTint:new x(8152152),specular:.1,cloudCover:.5,cloudSpeed:5,windowGlow:.6,ash:1,fog:.45,fogColor:new x(3943978)}),"freezing-rain":ae(We,{litLevel:.36,shadowLevel:.25,ambientColor:new x(6583456),unlitTint:new x(6977696),specular:1.2,cloudCover:.5,cloudSpeed:15,windowGlow:.5,drizzle:.9,ice:1,fog:.25,fogColor:new x(3950688)}),"magic-snow":ae(We,{litLevel:.45,shadowLevel:.3,ambientColor:new x(6979776),unlitTint:new x(7636148),specular:.4,cloudCover:.3,cloudSpeed:6,snow:.5,magicSnow:1,fog:.2,fogColor:new x(3951740)}),stardust:ae(We,{litLevel:.42,shadowLevel:.26,ambientColor:new x(6970016),sunColor:new x(13680895),unlitTint:new x(7628964),specular:1.2,iridescence:1,stardust:1,fog:.15,fogColor:new x(3812444)}),"solar-storm":ae(We,{litLevel:.42,shadowLevel:.26,ambientColor:new x(9067114),sunColor:new x(16756896),unlitTint:new x(9200752),specular:.5,aurora:1,auroraRed:1,flicker:1}),curse:ae(We,{litLevel:.3,shadowLevel:.18,ambientColor:new x(4864618),sunColor:new x(11571455),unlitTint:new x(5259888),specular:.3,cloudCover:.3,cloudSpeed:4,windowGlow:.4,windowTint:new x(12615935),lightPulse:.1,curse:1,sunWander:1,fog:.4,fogColor:new x(2627640)}),"petal-whirl":ae(We,{litLevel:.42,shadowLevel:.26,ambientColor:new x(8022682),unlitTint:new x(8680604),cloudSpeed:25,minWind:.5,petalWhirl:1}),frost:ae(We,{litLevel:.46,shadowLevel:.3,ambientColor:new x(6980800),unlitTint:new x(7637172),specular:.6,frost:1,fog:.2,fogColor:new x(3425388)}),haunted:ae(We,{litLevel:.32,shadowLevel:.22,ambientColor:new x(5923960),unlitTint:new x(6187128),specular:.1,cloudCover:.4,cloudSpeed:4,windowGlow:.4,minWind:.15,haunt:1,fog:.85,fogColor:new x(2764856),darkness:.5}),flood:ae(We,{litLevel:.32,shadowLevel:.22,ambientColor:new x(5925524),unlitTint:new x(6187664),specular:.2,cloudCover:.6,cloudSpeed:30,windowGlow:.6,rain:.8,flood:1,fog:.2}),tornado:ae(We,{litLevel:.3,shadowLevel:.2,ambientColor:new x(5135448),unlitTint:new x(5661278),specular:.1,cloudCover:.6,cloudSpeed:50,windowGlow:.5,minWind:.8,rain:.25,lightning:.4,tornado:1,fog:.25,fogColor:new x(2765360)}),fireflies:ae(We,{litLevel:.42,shadowLevel:.25,ambientColor:new x(6520742),unlitTint:new x(7241638),fireflies:1}),leaves:ae(We,{leaves:1}),spores:ae(We,{litLevel:.4,shadowLevel:.25,ambientColor:new x(5209978),sunColor:new x(11836671),unlitTint:new x(6261384),specular:.3,lightPulse:.06,spores:1,fog:.3,fogColor:new x(5012076)}),electric:ae(We,{litLevel:.36,shadowLevel:.24,ambientColor:new x(6255800),sunColor:new x(11059455),unlitTint:new x(6978736),specular:.8,cloudCover:.4,cloudSpeed:25,electric:1,fog:.2,fogColor:new x(4872848)}),"fairy-mist":ae(We,{litLevel:.4,shadowLevel:.27,ambientColor:new x(9071272),sunColor:new x(14858495),unlitTint:new x(9205414),specular:.3,cloudSpeed:6,lightPulse:.05,heatHaze:.6,fairyLights:1,fog:.45,fogColor:new x(11561632)}),"rising-energy":ae(We,{litLevel:.38,shadowLevel:.24,ambientColor:new x(4889226),sunColor:new x(11071708),unlitTint:new x(5936266),specular:.4,windowGlow:.4,cloudSpeed:8,lightPulse:.06,risingEnergy:1,fog:.62,fogColor:new x(4568219)}),volcanic:ae(We,{litLevel:.42,shadowLevel:.22,ambientColor:new x(10115644),sunColor:new x(16747082),unlitTint:new x(11037260),specular:.5,cloudCover:.3,cloudSpeed:6,windowGlow:.7,windowTint:new x(16752736),lightPulse:.1,heatHaze:.9,lava:1,fog:.65,fogColor:new x(6960164)}),eruption:ae(We,{litLevel:.4,shadowLevel:.2,ambientColor:new x(10111536),sunColor:new x(16742970),unlitTint:new x(11033148),specular:.5,cloudCover:.4,cloudSpeed:8,windowGlow:.7,windowTint:new x(16752736),lightPulse:.16,heatHaze:.9,lava:1,ash:.4,quake:1,eruption:1,fog:.7,fogColor:new x(5907992)}),antigravity:ae(We,{ambientColor:new x(6973608),unlitTint:new x(7631016),specular:.3,cloudCover:.3,cloudSpeed:-8,windowGlow:.5,antigravity:1,fog:.15,fogColor:new x(2368060)}),"old-film":ae(We,{litLevel:.5,shadowLevel:.3,windowGlow:.6,oldFilm:1,fog:.12}),moonless:ae(We,{litLevel:.3,shadowLevel:.25,ambientColor:new x(4870248),unlitTint:new x(4870248),specular:0,cloudCover:.6,cloudSpeed:3,windowGlow:.8,crickets:.4,moonless:1,fog:.2,fogColor:new x(329226)}),"blood-moon":ae(We,{litLevel:.44,shadowLevel:.15,ambientColor:new x(9058882),sunColor:new x(16733254),unlitTint:new x(10244182),specular:.6,cloudCover:.2,cloudAmbient:.1,cloudSpeed:6,windowGlow:.9,windowTint:new x(16738896),lightPulse:.12,embers:1,fog:.45,fogColor:new x(9056310)}),"stalking-fog":ae(We,{litLevel:.34,shadowLevel:.27,ambientColor:new x(6978214),unlitTint:new x(6977432),specular:0,windowGlow:.5,fog:.3,fogColor:new x(2764864),stalkingFog:1}),fog:ae(We,{litLevel:.34,shadowLevel:.27,ambientColor:new x(6978214),unlitTint:new x(6977432),specular:0,cloudCover:.3,cloudSpeed:6,fog:1})},Rd={neutral:[18,12],sunny:[26,16],cloudy:[16,11],rainy:[13,9],"blood-rain":[12,8],poison:[29,24],"acid-rain":[19,15],storm:[17,13],monsoon:[30,26],"autumn-drizzle":[14,9],"starry-night":[16,11],snow:[-4,-10],blizzard:[-14,-19],darkness:[9,4],forest:[21,14],hail:[7,4],"sea-mist":[14,11],smog:[27,21],fireworks:[22,18],"light-tide":[19,16],"spring-shower":[19,13],ash:[24,18],"freezing-rain":[-2,-5],"magic-snow":[-3,-8],"crystal-mist":[-2,-6],mars:[-15,-40],stardust:[18,12],"solar-storm":[23,15],curse:[11,7],"petal-whirl":[17,12],frost:[-6,-12],haunted:[8,5],flood:[14,11],tornado:[24,19],earthquake:[17,12],geysers:[23,17],"time-warp":[15,12],inverted:[12,18],"stalking-fog":[8,5],eruption:[54,46],antigravity:[18,13],"old-film":[16,11],"thunder-rain":[16,12],"morning-mist":[13,7],mirage:[44,44],moonless:[9,9],"deep-freeze":[-22,-34],aurora:[-6,-8],fog:[8,5],drizzle:[11,8],"blood-moon":[15,13],heatwave:[42,30],fireflies:[23,19],leaves:[14,9],spores:[24,20],sandstorm:[37,24],electric:[21,16],"fairy-mist":[20,16],"rising-energy":[17,14],volcanic:[48,40]};for(let[s,e]of[[lr,0],[Cd,1]])for(let t of Object.keys(s))s[t]=ht(Ve({},s[t]),{temperature:Rd[t][e]});var jn=[6,8],Qn=[18,20],Ac=12,Pc=22,Zm=6;function Ic(s){let e=(s%24+24)%24;return e<3?F.smoothstep(e,0,3):e<7?1:1-F.smoothstep(e,7,10)}function Lc(s){let e=(s%24+24)%24;return e<jn[0]||e>=Qn[1]?0:e<jn[1]?F.smoothstep(e,jn[0],jn[1]):e<Qn[0]?1:1-F.smoothstep(e,Qn[0],Qn[1])}function $m(s){let e=(s%24+24)%24,t=(r,o)=>e>r&&e<o?Math.sin(Math.PI*(e-r)/(o-r)):0,n=t(jn[0]-.5,jn[1]+.5),i=t(Qn[0]-.5,Qn[1]+.5);return i>n?{amount:i,dusk:!0}:{amount:n,dusk:!1}}function Dc(s){return Lc(s)<.5}function Jm(s){let e=(s%24+24)%24;return e>=jn[0]&&e<jn[1]?"dawn":e>=Qn[0]&&e<Qn[1]?"dusk":e>=jn[1]&&e<Qn[0]?"day":"night"}var jm={night:{label:"Nuit",icon:"\u{1F319}"},dawn:{label:"Aube",icon:"\u{1F305}"},day:{label:"Jour",icon:"\u{1F31E}"},dusk:{label:"Cr\xE9puscule",icon:"\u{1F307}"}};function ua(s){let e=Math.round((s%24+24)%24*60)%1440;return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}var Qm={sunColor:new x(16752752),ambientColor:new x(14725312),unlitTint:new x(16763064),fogColor:new x(16761008)},e0={sunColor:new x(16742952),ambientColor:new x(13668474),unlitTint:new x(16758928),fogColor:new x(15769712)};function Ad(s,e){let t=e?Cd:lr;return t[s]??t.neutral}function Ps(s,e){return!!(e?Cd:lr)[s]}var ha=[{type:"neutral",label:"Neutre",icon:"\u26AA"},{type:"sunny",label:"Ensoleill\xE9",icon:"\u2600\uFE0F"},{type:"heatwave",label:"Canicule",icon:"\u{1F525}"},{type:"mirage",label:"Mirage",icon:"\u{1FAE0}"},{type:"volcanic",label:"Volcanique",icon:"\u{1F30B}"},{type:"eruption",label:"\xC9ruption imminente",icon:"\u{1F4A5}"},{type:"ash",label:"Neige de cendres",icon:"\u{1F32B}\uFE0F"},{type:"forest",label:"For\xEAt",icon:"\u{1F332}"},{type:"petal-whirl",label:"Vent de p\xE9tales",icon:"\u{1F338}"},{type:"geysers",label:"Geysers",icon:"\u2668\uFE0F"},{type:"leaves",label:"Feuilles",icon:"\u{1F342}"},{type:"autumn-drizzle",label:"Bruine d'automne",icon:"\u{1F341}"},{type:"spores",label:"Spores",icon:"\u{1F9A0}"},{type:"sandstorm",label:"Temp\xEAte de sable",icon:"\u{1F3DC}\uFE0F"},{type:"electric",label:"Champ \xE9lectrique",icon:"\u26A1"},{type:"cloudy",label:"Nuageux",icon:"\u2601\uFE0F"},{type:"fog",label:"Brouillard",icon:"\u{1F32B}\uFE0F"},{type:"moonless",label:"Nuit sans lune",icon:"\u{1F31A}"},{type:"deep-freeze",label:"Aurore glac\xE9e",icon:"\u{1F9CA}"},{type:"morning-mist",label:"Brume matinale",icon:"\u{1F304}"},{type:"stalking-fog",label:"Brouillard r\xF4deur",icon:"\u{1F301}"},{type:"sea-mist",label:"Brume marine",icon:"\u{1F30A}"},{type:"smog",label:"Smog",icon:"\u{1F3ED}"},{type:"darkness",label:"T\xE9n\xE8bres",icon:"\u{1F311}"},{type:"curse",label:"Mal\xE9diction",icon:"\u{1F56F}\uFE0F"},{type:"haunted",label:"Brume hant\xE9e",icon:"\u{1F47B}"},{type:"drizzle",label:"Bruine",icon:"\u{1F326}\uFE0F"},{type:"spring-shower",label:"Pluie de printemps",icon:"\u{1F324}\uFE0F"},{type:"freezing-rain",label:"Pluie vergla\xE7ante",icon:"\u{1F976}"},{type:"hail",label:"Gr\xEAle",icon:"\u{1F9CA}"},{type:"rainy",label:"Pluvieux",icon:"\u{1F327}\uFE0F"},{type:"storm",label:"Orage",icon:"\u26C8\uFE0F"},{type:"thunder-rain",label:"Pluie de tonnerre",icon:"\u{1F329}\uFE0F"},{type:"monsoon",label:"Mousson",icon:"\u{1F334}"},{type:"tornado",label:"Tornade",icon:"\u{1F32A}\uFE0F"},{type:"earthquake",label:"S\xE9isme",icon:"\u{1FAE8}"},{type:"flood",label:"Inondation",icon:"\u{1F30A}"},{type:"blood-rain",label:"Pluie de mort",icon:"\u{1F480}"},{type:"poison",label:"Climat empoisonn\xE9",icon:"\u2620\uFE0F"},{type:"acid-rain",label:"Pluie acide",icon:"\u{1F9EA}"},{type:"snow",label:"Neige",icon:"\u2744\uFE0F"},{type:"magic-snow",label:"Neige magique",icon:"\u2728"},{type:"crystal-mist",label:"Brume de cristal",icon:"\u{1F48E}"},{type:"blizzard",label:"Blizzard",icon:"\u{1F328}\uFE0F"},{type:"frost",label:"Gel",icon:"\u{1F9CA}"},{type:"aurora",label:"Aurore",icon:"\u{1F30C}"},{type:"starry-night",label:"Nuit \xE9toil\xE9e",icon:"\u{1F303}"},{type:"time-warp",label:"Distorsion temporelle",icon:"\u23F3"},{type:"inverted",label:"Monde invers\xE9",icon:"\u{1F52E}"},{type:"antigravity",label:"Gravit\xE9 invers\xE9e",icon:"\u{1FA90}"},{type:"old-film",label:"Vieux film",icon:"\u{1F39E}\uFE0F"},{type:"mars",label:"Vent de Mars",icon:"\u{1FA90}"},{type:"fireworks",label:"Feu d'artifice",icon:"\u{1F386}"},{type:"light-tide",label:"Mar\xE9e de lumi\xE8re",icon:"\u{1F30A}"},{type:"solar-storm",label:"Temp\xEAte solaire",icon:"\u2600\uFE0F"},{type:"stardust",label:"Poussi\xE8re d'\xE9toiles",icon:"\u{1F320}"},{type:"fireflies",label:"Lucioles",icon:"\u2728"},{type:"fairy-mist",label:"Brume f\xE9\xE9rique",icon:"\u{1F9DA}"},{type:"rising-energy",label:"\xC9nergie montante",icon:"\u{1F4A0}"},{type:"blood-moon",label:"Lune de sang",icon:"\u{1FA78}"}],no=[{color:"green",label:"Vert",hex:"#c8ff4a"},{color:"pink",label:"Rose",hex:"#ff6ad5"},{color:"cyan",label:"Cyan",hex:"#4af0ff"},{color:"purple",label:"Mauve",hex:"#cc99ff"}];function Pd(s){return(no.find(e=>e.color===s)??no[0]).hex}var t0=[{mode:"autumn",label:"\u{1F342} Normal"},{mode:"cherry",label:"\u{1F338} Cerisier"}],n0=[{direction:"east",label:"Ouest \u2192 Est"},{direction:"west",label:"Est \u2192 Ouest"}];function Id(s,e){return F.clamp(s,0,1)*(e==="east"?1:-1)}function Ld(s){return ht(Ve({},s),{ambientColor:s.ambientColor.clone(),sunColor:s.sunColor.clone(),unlitTint:s.unlitTint.clone(),fogColor:s.fogColor.clone(),sandColor:s.sandColor.clone(),sandTint:s.sandTint.clone(),windowTint:s.windowTint.clone(),lightningColor:s.lightningColor.clone()})}function YM(s){return()=>{s=s+1831565813|0;let e=Math.imul(s^s>>>15,1|s);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var KM=4,ZM=5,i0=256,Nc;function s0(s,e){if(!Nc)return 0;let t=i0,n=(s-Math.floor(s))*t-.5,i=(e-Math.floor(e))*t-.5,r=Math.floor(n),o=Math.floor(i),a=n-r,l=i-o,c=(d,p)=>Nc[(p%t+t)%t*t+(d%t+t)%t],u=c(r,o)+(c(r+1,o)-c(r,o))*a,h=c(r,o+1)+(c(r+1,o+1)-c(r,o+1))*a;return(u+(h-u)*l)/255}function r0(s=i0){let e=YM(42),t=new Float32Array(s*s);for(let a=0;a<ZM;a++){let l=KM<<a,c=Math.pow(.5,a),u=Float32Array.from({length:l*l},()=>e()),h=(p,f)=>u[f%l*l+p%l],d=s/l;for(let p=0;p<s;p++){let f=p/d,_=Math.floor(f),m=f-_;m=m*m*(3-2*m);for(let g=0;g<s;g++){let b=g/d,C=Math.floor(b),T=b-C;T=T*T*(3-2*T);let A=h(C,_)+(h(C+1,_)-h(C,_))*T,P=h(C,_+1)+(h(C+1,_+1)-h(C,_+1))*T;t[p*s+g]+=(A+(P-A)*m)*c}}}let n=1/0,i=-1/0;for(let a of t)n=Math.min(n,a),i=Math.max(i,a);let r=new Uint8Array(s*s*4);Nc=new Uint8Array(s*s);for(let a=0;a<t.length;a++){let l=Math.round(255*(t[a]-n)/(i-n));r.set([l,l,l,255],a*4),Nc[a]=l}let o=new $s(r,s,s,Jn);return o.wrapS=ls,o.wrapT=ls,o.magFilter=Sn,o.minFilter=Sn,o.colorSpace=Ai,o.needsUpdate=!0,o}var dn={uCloudMap:{value:r0()},uCloudScale:{value:1/900},uCloudDensity:{value:.5},uCloudOffset:{value:new _e},uCloudCover:{value:0},uSunDir:{value:new w(0,1,0)},uSpecular:{value:1},uCloudAmbient:{value:0},uSunGlow:{value:0},uBeamTime:{value:0},uBeamLight:{value:0},uWindowGlow:{value:0},uWindowTint:{value:new x(1,1,1)},uAurora:{value:0},uSnowCover:{value:0},uSandCover:{value:0},uSandColor:{value:new x().setRGB(.86,.71,.48)},uWetness:{value:0},uPuddles:{value:0},uRipples:{value:0},uSkyColor:{value:new x},uBlood:{value:0},uStainColor:{value:new x(.42,.02,.03)},uWindX:{value:0},uFlutterPhase:{value:0},uFog:{value:0},uFogColor:{value:new x},uFogOffset:{value:new _e},uDarkness:{value:0},uIce:{value:0},uIridescence:{value:0},uFrost:{value:0},uStars:{value:0},uTide:{value:0},uWarp:{value:0},uStrikeOn:{value:0},uMirage:{value:0},uFrostClimb:{value:0},uStrikes:{value:[new kt,new kt]},uWarpCenter:{value:new w},uAuroraRed:{value:0},uCanopy:{value:0},uDarkCenter:{value:new w},uStalk:{value:0},uStalkRadius:{value:0}},Wi="aSway";function Oc(s){let e=s;if(!e.isInstancedMesh)return[s.getWorldPosition(new w)];let t=new Ie,n=[];for(let i=0;i<e.count;i++)e.getMatrixAt(i,t),n.push(new w().setFromMatrixPosition(t.premultiply(s.matrixWorld)));return n}var $M=5,fa=new Set;function Nd(s){return s.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace("#include <fog_fragment>","").replace("#include <colorspace_fragment>",`#include <fog_fragment>
#include <colorspace_fragment>`)},s.customProgramCacheKey=()=>"linear-fog-v1",s}function en(s){return fa.add(s),s.userData.unlitBaseColor=s.color.clone(),Nd(s),s}var Od=`
// Hash without sine (Dave Hoskins): sin() of big values is imprecise on phone GPUs, the noise cells didn't
// match anymore and the fog showed straight seams every ~5 tiles
float wbHash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float wbNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(wbHash(i), wbHash(i + vec2(1.0, 0.0)), f.x),
             mix(wbHash(i + vec2(0.0, 1.0)), wbHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float beamPattern(vec3 p, vec3 sunDir, float time) {
  vec3 a1 = normalize(cross(sunDir, vec3(0.0, 0.0, 1.0)));
  vec3 a2 = cross(sunDir, a1);
  vec2 q = vec2(dot(p, a1), dot(p, a2)) * 0.03;
  return smoothstep(0.4, 0.9, wbNoise(q + vec2(time * 0.05, 0.0)));
}
`,JM=`
attribute float ${Wi};
uniform float uWindX;
uniform float uBeamTime;
uniform float uFlutterPhase;
varying vec3 vWeatherWorldPos;
varying vec3 vWeatherWorldNormal;
`,l0=`
if (${Wi} > 0.0) {
  #ifdef USE_INSTANCING
    vec3 swayWorld = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
  #else
    vec3 swayWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
  #endif
  float windAbs = abs(uWindX);
  // Slow gusts (the lean breathes) + fast flutter, both offset by position so plants don't move in sync
  float gust = 0.65 + 0.35 * sin(uBeamTime * 1.3 + swayWorld.x * 0.04 + swayWorld.z * 0.03);
  float flutter = sin(uFlutterPhase + swayWorld.x * 0.35 + swayWorld.z * 0.25);
  transformed.x += ${Wi} * (uWindX * ${$M.toFixed(1)} * gust + flutter * (0.25 + 1.2 * windAbs));
}
`,jM=`
// (instanced copies: their own position / rotation too)
#ifdef USE_INSTANCING
  vWeatherWorldPos = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
  vWeatherWorldNormal = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * objectNormal);
#else
  vWeatherWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
  vWeatherWorldNormal = normalize(mat3(modelMatrix) * objectNormal);
#endif
`,QM=.1,c0=[{scale:1/260,angle:0,offset:[.13,.57],weight:.5},{scale:1/83,angle:.6458,offset:[.61,.29],weight:.35},{scale:1/31,angle:-1.0647,offset:[.83,.07],weight:.15}],u0=.02,pa=[.671,.553];function eS(s){return pa[0]+(pa[1]-pa[0])*Math.sqrt(Math.max(s,0))}function Fc(s,e,t){if(t<.01)return!1;let n=0;for(let i of c0){let r=Math.cos(i.angle),o=Math.sin(i.angle);n+=i.weight*s0((r*s-o*e)*i.scale+i.offset[0],(o*s+r*e)*i.scale+i.offset[1])}return n>eS(t)+u0*.5}var tS=[{scale:1/170,angle:.4,sway:.5,weight:.55},{scale:1/61,angle:-.9,sway:1,weight:.3},{scale:1/23,angle:1.7,sway:1.8,weight:.15}],nS=.8,o0=.47,a0=.025,iS=`
float canopyLeaves(vec2 p, vec2 sway) {
  float h = 0.0;
${tS.map((s,e)=>{let t=Math.cos(s.angle).toFixed(5),n=Math.sin(s.angle).toFixed(5);return`  { vec2 q = p + sway * ${s.sway.toFixed(2)};
    h += ${s.weight.toFixed(3)} * texture2D(uCloudMap, vec2(${t} * q.x - ${n} * q.y, ${n} * q.x + ${t} * q.y) * ${s.scale.toFixed(6)} + vec2(${(.21+e*.29).toFixed(2)}, ${(.47+e*.17).toFixed(2)})).r; }`}).join(`
`)}
  return h;
}
`,sS=`
float puddleLevel(float puddles) {
  return mix(${pa[0].toFixed(3)}, ${pa[1].toFixed(3)}, sqrt(max(puddles, 0.0)));
}
float puddleHollow(vec2 p) {
  float h = 0.0;
${c0.map(s=>{let e=Math.cos(s.angle).toFixed(5),t=Math.sin(s.angle).toFixed(5);return`  h += ${s.weight.toFixed(3)} * texture2D(uCloudMap, vec2(${e} * p.x - ${t} * p.y, ${t} * p.x + ${e} * p.y) * ${s.scale.toFixed(6)} + vec2(${s.offset[0].toFixed(2)}, ${s.offset[1].toFixed(2)})).r;`}).join(`
`)}
  return h;
}
`,rS=`
#define AURORA_GLOBAL_TINT ${QM.toFixed(3)}
uniform sampler2D uCloudMap;
uniform float uCloudScale;
uniform float uCloudDensity;
uniform vec2 uCloudOffset;
uniform float uCloudCover;
uniform vec3 uSunDir;
uniform float uSpecular;
uniform float uCloudAmbient;
uniform float uSunGlow;
uniform float uBeamTime;
uniform float uBeamLight;
uniform float uWindowGlow;
uniform vec3 uWindowTint;
uniform float uAurora;
uniform float uSnowCover;
uniform float uSandCover;
uniform vec3 uSandColor;
uniform float uWetness;
uniform float uPuddles;
uniform float uRipples;
uniform vec3 uSkyColor;
uniform float uBlood;
uniform vec3 uStainColor;
uniform float uWindX;
uniform float uFog;
uniform vec3 uFogColor;
uniform vec2 uFogOffset;
uniform float uDarkness;
uniform float uIce;
uniform float uIridescence;
uniform float uFrost;
uniform float uStars;
uniform float uTide;
uniform float uWarp;
uniform float uStrikeOn;
uniform float uMirage;
uniform float uFrostClimb;
uniform vec4 uStrikes[2];
uniform vec3 uWarpCenter;
uniform float uAuroraRed;
uniform float uCanopy;
uniform vec3 uDarkCenter;
uniform float uStalk;
uniform float uStalkRadius;
varying vec3 vWeatherWorldPos;
varying vec3 vWeatherWorldNormal;
`+Od+sS+iS,oS=70,aS=14,lS=[.15,.55,1.1],cS=1.2,uS=.985,hS=70,dS=130,Dd=45,pS=.25,fS=1.6,mS=`
{
  // Project the point along the sun direction onto the y = 0 plane,
  // so a roof and the ground below it receive a coherent cloud shadow.
  vec2 cloudPos = vWeatherWorldPos.xz - uSunDir.xz * (vWeatherWorldPos.y / max(uSunDir.y, 0.1));
  // The noise is thresholded by the density: higher density = lower threshold = more of the sky covered.
  // The soft band gives blurry edges.
  float cloudNoise = texture2D(uCloudMap, cloudPos * uCloudScale + uCloudOffset).r;
  float cloudThreshold = mix(0.72, 0.28, uCloudDensity);
  float cloud = smoothstep(cloudThreshold - 0.06, cloudThreshold + 0.14, cloudNoise);
  float sunVisibility = 1.0 - uCloudCover * cloud;
  // Forest canopy: the sun comes through gaps in the foliage (sun flecks). Three rotated layers of the fbm map:
  // leaf clusters, smaller holes, ragged leafy edges; the smaller ones sway more with the wind.
  if (uCanopy > 0.0) {
    vec2 sway = vec2(sin(uBeamTime * 1.3), cos(uBeamTime * 0.9)) * (0.4 + 1.6 * abs(uWindX));
    float leaves = canopyLeaves(cloudPos, sway);
    float shade = smoothstep(${o0.toFixed(3)} - ${a0.toFixed(3)}, ${o0.toFixed(3)} + ${a0.toFixed(3)}, leaves);
    sunVisibility *= 1.0 - uCanopy * ${nS.toFixed(2)} * shade;
  }

  // Facades (vertical faces) turned towards the sun get an extra warm glow.
  // directDiffuse is already 0 in the shadows, so the glow never lights a shaded wall.
  vec3 worldNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  float facade = (1.0 - abs(worldNormal.y)) * smoothstep(0.05, 0.5, dot(worldNormal, uSunDir));
  reflectedLight.directDiffuse *= 1.0 + uSunGlow * facade * vec3(1.0, 0.92, 0.75);

  // Sun beams: brighter inside a beam, slightly dimmer between beams (still 0 in the shadows)
  if (uBeamLight > 0.0) {
    float beam = beamPattern(vWeatherWorldPos, uSunDir, uBeamTime);
    reflectedLight.directDiffuse *= mix(1.0 - 0.35 * uBeamLight, 1.0 + 0.8 * uBeamLight, beam);
  }

  reflectedLight.directDiffuse *= sunVisibility;
  reflectedLight.directSpecular *= sunVisibility * uSpecular;
  // Star dust: the sun reflections shimmer in rainbow colors, changing with the view angle and position
  if (uIridescence > 0.0) {
    vec3 irView = normalize(cameraPosition - vWeatherWorldPos);
    float h = fract(dot(vWeatherWorldPos.xz, vec2(0.011, 0.017)) + irView.y * 1.5 + uBeamTime * 0.04);
    vec3 rainbow = 0.5 + 0.5 * cos(6.2831 * (h + vec3(0.0, 0.33, 0.67)));
    reflectedLight.directSpecular *= mix(vec3(1.0), rainbow * 2.2, uIridescence);
  }
  reflectedLight.indirectDiffuse *= 1.0 - uCloudAmbient * cloud;

  // Aurora: slowly waving green / purple light curtains sweeping the ground and roofs
  if (uAurora > 0.0) {
    vec2 ap = vWeatherWorldPos.xz * 0.0035;
    float t = uBeamTime;
    float warp = wbNoise(ap * 2.0 + vec2(t * 0.04, -t * 0.03)) * 2.5;
    float curtain = sin((ap.x * 1.3 + ap.y * 0.6 + warp) * 6.2831 + t * 0.25);
    curtain = pow(max(curtain, 0.0), 2.5);
    // Thin vertical-looking rays inside the curtains
    float rays = 0.55 + 0.45 * wbNoise(vec2((ap.x * 0.9 - ap.y * 0.4) * 30.0 + t * 0.6, t * 0.2));
    float hue = smoothstep(0.35, 0.75, wbNoise(ap * 1.5 - vec2(t * 0.02)));
    vec3 auroraColor = mix(vec3(0.1, 1.0, 0.5), vec3(0.65, 0.25, 1.0), hue);
    auroraColor = mix(auroraColor, mix(vec3(1.0, 0.12, 0.08), vec3(1.0, 0.45, 0.15), hue), uAuroraRed);
    // Global tint everywhere (same slowly shifting green / purple as the curtains) + the brighter curtains
    float auroraLight = AURORA_GLOBAL_TINT + curtain * rays * 0.55;
    reflectedLight.indirectDiffuse += diffuseColor.rgb * auroraColor * (auroraLight * uAurora);
  }

  // Puddles: mirror-like water reflecting the sky (stronger at grazing angles) and the sun
  if (wbPuddle > 0.0) {
    vec3 viewDir = normalize(cameraPosition - vWeatherWorldPos);
    float fresnel = 0.55 + 0.45 * pow(1.0 - clamp(viewDir.y, 0.0, 1.0), 3.0);
    // Rain ripples: expanding rings in a grid of cells, each with its own rhythm
    float ripple = 0.0;
    if (uRipples > 0.0) {
      vec2 cell = floor(vWeatherWorldPos.xz / 2.5);
      vec2 local = fract(vWeatherWorldPos.xz / 2.5) - 0.5 - (vec2(wbHash(cell), wbHash(cell + 7.1)) - 0.5) * 0.5;
      float phase = fract(uBeamTime * 1.3 + wbHash(cell + 3.7));
      float ring = abs(length(local) - phase * 0.45);
      ripple = (1.0 - smoothstep(0.0, 0.04, ring)) * (1.0 - phase) * uRipples;
    }
    vec3 reflection = uSkyColor * mix(vec3(1.0), uStainColor * 1.3, uBlood) * fresnel * (0.7 + 0.7 * ripple);
    // Starry night: a few stars mirrored in the water, each twinkling on its own rhythm
    if (uStars > 0.0) {
      vec2 starCell = floor(vWeatherWorldPos.xz * ${cS.toFixed(2)});
      float star = step(${uS.toFixed(3)}, wbHash(starCell));
      float twinkle = 0.4 + 0.6 * sin(uBeamTime * (2.0 + 3.0 * wbHash(starCell + 5.3)) + wbHash(starCell + 1.7) * 40.0);
      reflection += vec3(0.85, 0.9, 1.0) * star * max(twinkle, 0.0) * fresnel * uStars * 1.6;
    }
    float glint = pow(max(dot(reflect(-uSunDir, vec3(0.0, 1.0, 0.0)), viewDir), 0.0), 60.0);
    reflection += vec3(1.0, 0.97, 0.9) * glint * 1.5 * sunVisibility * uSpecular;
    reflectedLight.indirectDiffuse += reflection * wbPuddle;
  }
  // Time warp: rings of light spreading from the player across the ground, fading with the distance
  if (uWarp > 0.0) {
    vec3 warpNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    float warpGround = smoothstep(0.6, 0.9, warpNormal.y);
    float warpDist = length(vWeatherWorldPos.xz - uWarpCenter.xz);
    float rings = smoothstep(0.93, 1.0, sin(warpDist * 0.14 - uBeamTime * 2.5));
    reflectedLight.indirectDiffuse += vec3(0.55, 0.45, 1.0) * rings * exp(-warpDist / 110.0) * uWarp * warpGround * 0.6;
  }
  // Thunder rain: from each lightning impact, an electric discharge spreads on the ground as branching lines
  // (Lichtenberg figure): iso-lines of a noise sampled on a circle around the impact (so they run outwards),
  // a second finer layer further out for the branching, jagged by a small noise. The puddles nearby light up.
  if (uStrikeOn > 0.0) {
    vec3 strikeNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    float strikeGround = smoothstep(0.6, 0.9, strikeNormal.y);
    float discharge = 0.0;
    for (int i = 0; i < 2; i++) {
      vec4 st = uStrikes[i];
      if (st.w <= 0.0) {
        continue;
      }
      vec2 d = vWeatherWorldPos.xz - st.xy;
      float r = length(d);
      vec2 dir = d / max(r, 0.001);
      float reach = ${Dd.toFixed(1)} * smoothstep(0.0, ${pS.toFixed(2)}, st.z);
      float fade = exp(-st.z * 2.2);
      float jag = wbNoise(vWeatherWorldPos.xz * 0.35) * 0.12;
      vec2 seed = st.xy * 0.13;
      float n1 = wbNoise(dir * 4.0 + r * 0.008 + seed) + jag;
      float n2 = wbNoise(dir * 11.0 + r * 0.012 + seed + 7.3) + jag;
      float thin = 1.0 - r / max(reach, 0.001);
      float veins = smoothstep(0.06 * thin, 0.0, abs(n1 - 0.5)) * 1.5
        + smoothstep(0.045 * thin, 0.0, abs(n2 - 0.5)) * smoothstep(8.0, 22.0, r);
      float inside = step(r, reach) * thin;
      float flick = 0.6 + 0.4 * sin(uBeamTime * 70.0 + float(i) * 2.0);
      // Scorched bright core at the impact
      float core = exp(-r / 5.0) * 2.0;
      discharge += (veins * inside + core) * fade * flick * strikeGround;
      // Puddles nearby: the water carries the current, flickering longer
      discharge += wbPuddle * (1.0 - smoothstep(${(Dd*.8).toFixed(1)}, ${(Dd*1.6).toFixed(1)}, r))
        * exp(-st.z * 1.2) * (0.55 + 0.45 * sin(uBeamTime * 45.0) * sin(uBeamTime * 31.0 + float(i))) * 0.6;
    }
    reflectedLight.indirectDiffuse += vec3(0.55, 0.75, 1.0) * discharge * ${fS.toFixed(2)};
  }
  // Mirage: patches of fake water on the ground, only far from the player (fading out as they come closer, so they
  // can never be reached): the ground there shows the bright sky instead of its own color, rippling.
  if (uMirage > 0.0) {
    vec3 mirageNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    float mirageGround = smoothstep(0.6, 0.9, mirageNormal.y) * (1.0 - step(1.0, vWeatherWorldPos.y));
    float mirageDist = length(vWeatherWorldPos.xz - uDarkCenter.xz);
    float distant = smoothstep(${hS.toFixed(1)}, ${dS.toFixed(1)}, mirageDist);
    vec2 mp = vWeatherWorldPos.xz * 0.02;
    float patches = smoothstep(0.52, 0.62, wbNoise(mp + vec2(uBeamTime * 0.01, 0.0)) * 0.7 + wbNoise(mp * 2.7 - uBeamTime * 0.015) * 0.3);
    float pool = patches * distant * mirageGround * uMirage;
    if (pool > 0.0) {
      // Thin horizontal shimmer lines moving fast, like heat over water
      float ripple = 0.5 + 0.5 * sin(vWeatherWorldPos.z * 1.7 + uBeamTime * 5.0 + wbNoise(vWeatherWorldPos.xz * 0.3) * 6.0);
      vec3 sky = vec3(0.72, 0.84, 0.98) * (0.85 + 0.35 * ripple);
      reflectedLight.directDiffuse *= 1.0 - 0.7 * pool;
      reflectedLight.indirectDiffuse = mix(reflectedLight.indirectDiffuse, sky, pool * 0.85);
    }
  }
  // Light tide: bioluminescent waves sweeping the ground. Two wave trains crossing at an angle, their crests
  // warped by noise (no straight lines); the plankton glows as tiny sparkles where a crest passes, with a soft halo.
  if (uTide > 0.0) {
    vec3 tideNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    float tideGround = smoothstep(0.6, 0.9, tideNormal.y) * (1.0 - step(1.0, vWeatherWorldPos.y));
    if (tideGround > 0.0) {
      vec2 tp = vWeatherWorldPos.xz;
      // Crests bent by two octaves of noise: organic fronts, never straight lines
      float warp = (wbNoise(tp * 0.015 + uBeamTime * 0.02) * 0.7 + wbNoise(tp * 0.05 - uBeamTime * 0.03) * 0.3) * 45.0;
      float k = 6.2831 / ${oS.toFixed(1)};
      float wave = sin((dot(tp, vec2(0.8, 0.6)) + warp - uBeamTime * ${aS.toFixed(1)}) * k);
      // A slow second wave only modulates the strength (some crests bright, others faint), no grid
      float swell = 0.35 + 0.65 * smoothstep(-0.3, 1.0, sin((dot(tp, vec2(-0.5, 0.86)) + warp * 0.5 - uBeamTime * 6.0) * k * 0.45));
      float crest = smoothstep(0.86, 1.0, wave) * swell;
      // Light lingering behind the crest (the plankton fades slowly after the wave)
      float trail = smoothstep(0.2, 0.86, wave) * (1.0 - smoothstep(0.86, 1.0, wave)) * 0.25 * swell;
      vec2 cell = floor(tp * 1.8);
      float plankton = step(0.8, wbHash(cell)) * (0.5 + 0.5 * sin(uBeamTime * 4.0 + wbHash(cell + 3.1) * 30.0));
      vec3 tideColor = vec3(${lS.join(", ")});
      reflectedLight.indirectDiffuse += tideColor * uTide * tideGround * (crest * 0.18 + (crest + trail) * plankton * 1.8);
    }
  }
  // Frost: tiny ice crystals glittering in the sun
  if (wbFrost > 0.0) {
    float glitter = step(0.97, wbHash(floor(vWeatherWorldPos.xz * 2.5) + floor(vWeatherWorldPos.y * 2.5)));
    float twinkle = 0.5 + 0.5 * sin(uBeamTime * 3.0 + wbHash(floor(vWeatherWorldPos.xz * 2.5)) * 30.0);
    reflectedLight.indirectDiffuse += vec3(0.9, 0.95, 1.0) * glitter * twinkle * wbFrost * (0.25 + 0.75 * sunVisibility) * 0.8;
  }
  // Ice glaze: glassy sky reflection and a sharp sun glint
  if (wbIce > 0.0) {
    vec3 iceView = normalize(cameraPosition - vWeatherWorldPos);
    float iceFresnel = 0.3 + 0.7 * pow(1.0 - clamp(iceView.y, 0.0, 1.0), 3.0);
    reflectedLight.indirectDiffuse += uSkyColor * iceFresnel * 0.35 * wbIce;
    float iceGlint = pow(max(dot(reflect(-uSunDir, vec3(0.0, 1.0, 0.0)), iceView), 0.0), 40.0);
    reflectedLight.indirectDiffuse += vec3(1.0) * iceGlint * 1.2 * sunVisibility * wbIce;
  }
}
`,h0=1,gS=.42,xS=`
if (uSnowCover > 0.0) {
  vec3 snowNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  float facingUp = smoothstep(0.25, 0.75, snowNormal.y);
  float isGround = 1.0 - step(${h0.toFixed(1)}, vWeatherWorldPos.y);
  // Roofs end fully covered; the ground stays patchy so paths remain readable
  float level = uSnowCover * mix(1.0, ${gS.toFixed(2)}, isGround) * 1.2;
  float patches = wbNoise(vWeatherWorldPos.xz * 0.12) * 0.6 + wbNoise(vWeatherWorldPos.xz * 0.5) * 0.4;
  float snow = facingUp * smoothstep(patches - 0.08, patches + 0.08, level);
  // Keep a hint of the texture shading under the snow (outlines, tiles) instead of a flat white
  float textureLum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
  vec3 snowColor = vec3(0.92, 0.95, 1.0) * min(0.72 + 0.4 * textureLum, 1.0);
  diffuseColor.rgb = mix(diffuseColor.rgb, snowColor, snow);
}
`,da;function d0(){return da||(da=new Kr,da.onBeforeCompile=s=>{s.uniforms.uWindX=dn.uWindX,s.uniforms.uBeamTime=dn.uBeamTime,s.uniforms.uFlutterPhase=dn.uFlutterPhase,s.vertexShader=`attribute float ${Wi};
uniform float uWindX;
uniform float uBeamTime;
uniform float uFlutterPhase;
`+s.vertexShader.replace("#include <project_vertex>",l0+"#include <project_vertex>")},da.customProgramCacheKey=()=>"weather-sway-depth-v4"),da}var yS="float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;";function _S(){let s=st.shadowmap_pars_fragment,e=s.indexOf(yS),t=e<0?-1:s.indexOf(") * 0.2;",e);if(t<0){console.warn("Shadow filter patch not applied (three shader chunk changed)");return}st.shadowmap_pars_fragment=s.slice(0,e)+`
				vec2 o = 0.5 * radius;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vec2( -o.x, -o.y ), shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vec2( o.x, -o.y ), shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vec2( -o.x, o.y ), shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vec2( o.x, o.y ), shadowCoord.z ) )
				) * 0.25;`+s.slice(t+8)}_S();var ES=120,Fd=64,vS=.45,bS=.99,TS=420,MS=.12,SS=.97,wS=`
if (uFog > 0.0) {
  float fogDist = length(vWeatherWorldPos - cameraPosition);
  vec2 fogPos = vWeatherWorldPos.xz;
  // Two noise layers drifting at different speeds: the fog rolls instead of sliding as a block
  float fogNoise = wbNoise(fogPos * 0.012 + uFogOffset) * 0.65
    + wbNoise(fogPos * 0.035 - uFogOffset * 1.6 + vec2(uBeamTime * 0.02, 0.0)) * 0.35;
  float fogAmount = uFog * (0.35 + 0.65 * smoothstep(${ES.toFixed(1)}, ${TS.toFixed(1)}, fogDist));
  fogAmount *= mix(0.45, 1.25, fogNoise);
  // Ground fog: roofs stick out of it a bit
  fogAmount *= 1.0 - 0.35 * smoothstep(5.0, 60.0, vWeatherWorldPos.y);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, clamp(fogAmount, 0.0, 0.92));
}
// Darkness: the fog closes in around the player, its ragged edge slowly wavering.
// Never fully opaque: lit windows (very bright) still shine faintly through.
if (uDarkness > 0.0) {
  float darkDist = length(vWeatherWorldPos.xz - uDarkCenter.xz);
  float wisp = wbNoise(vWeatherWorldPos.xz * 0.045 + uFogOffset * 2.0 + vec2(0.0, uBeamTime * 0.03));
  float edge = ${Fd.toFixed(1)} * mix(0.7, 1.3, wisp);
  float dark = smoothstep(edge * 0.3, edge, darkDist);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, uDarkness * mix(${vS.toFixed(2)}, ${bS.toFixed(2)}, dark));
}
// Stalking fog: a wall of fog with a clearing around the player, whose radius (uStalkRadius) opens while walking
// and closes in when standing still. The edge is torn by drifting noise, like the darkness.
if (uStalk > 0.0) {
  float stalkDist = length(vWeatherWorldPos.xz - uDarkCenter.xz);
  float curl = wbNoise(vWeatherWorldPos.xz * 0.05 + uFogOffset * 2.5 + vec2(uBeamTime * 0.04, 0.0));
  float stalkEdge = uStalkRadius * mix(0.65, 1.35, curl);
  float stalkFog = smoothstep(stalkEdge * 0.35, stalkEdge, stalkDist);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, uStalk * mix(${MS.toFixed(2)}, ${SS.toFixed(2)}, stalkFog));
}
`,CS=.6,RS=.45,AS=`
if (uSandCover > 0.0) {
  vec3 sandNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  float up = smoothstep(0.25, 0.75, sandNormal.y);
  // Walls whose face looks against the wind (the wind blows towards +x when uWindX > 0)
  float windward = (1.0 - abs(sandNormal.y)) * smoothstep(0.2, 0.8, -sandNormal.x * sign(uWindX + 0.0001));
  // Drifts: elongated along the wind, thicker at the bottom of the walls
  float drift = wbNoise(vWeatherWorldPos.xz * vec2(0.05, 0.2)) * 0.65 + wbNoise(vWeatherWorldPos.xz * 0.6) * 0.35;
  float wallLow = 1.0 - smoothstep(0.0, 14.0, vWeatherWorldPos.y);
  float amount = up * ${CS.toFixed(2)} + windward * wallLow * ${RS.toFixed(2)};
  float sand = amount * smoothstep(drift - 0.15, drift + 0.15, uSandCover * 1.1);
  float sandLum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
  vec3 sandColor = uSandColor * min(0.75 + 0.35 * sandLum, 1.0);
  diffuseColor.rgb = mix(diffuseColor.rgb, sandColor, sand);
}
`,PS=.22,IS=.45,LS=.4,DS=.9,NS=`
float wbPuddle = 0.0;
if (uWetness > 0.0 || uPuddles > 0.0) {
  vec3 wetNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  float wetUp = smoothstep(0.5, 0.9, wetNormal.y);
  // Hidden under the snow / sand layer
  float dry = max(uSnowCover, uSandCover);
  float wet = uWetness * wetUp * (1.0 - dry);
  float onGround = 1.0 - step(${h0.toFixed(1)}, vWeatherWorldPos.y);
  // Puddles fill the "hollows" of the noise map (also sampled on the CPU for the footsteps, see puddleAt):
  // they grow from their center while it rains, shrink as they dry. Visible early (sqrt).
  float hollow = puddleHollow(vWeatherWorldPos.xz);
  float level = puddleLevel(uPuddles);
  wbPuddle = smoothstep(level, level + ${u0.toFixed(3)}, hollow) * step(0.01, uPuddles) * wetUp * onGround * (1.0 - dry);
  diffuseColor.rgb *= 1.0 - ${PS.toFixed(2)} * wet - ${IS.toFixed(2)} * wbPuddle;
  // (blood / poison below)
  if (uBlood > 0.0) {
    float stain = uBlood * max(${LS.toFixed(2)} * wet, ${DS.toFixed(2)} * wbPuddle);
    float shade = dot(diffuseColor.rgb, vec3(0.3, 0.55, 0.15));
    diffuseColor.rgb = mix(diffuseColor.rgb, uStainColor * (0.6 + 0.8 * shade), stain);
  }
}
float wbIce = 0.0;
if (uIce > 0.0) {
  // Ice glaze: surfaces facing up get bluish, glassy (reflections added in FRAGMENT_BODY)
  vec3 iceNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  wbIce = uIce * smoothstep(0.4, 0.9, iceNormal.y) * (1.0 - uSnowCover);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.8, 0.88, 1.0) + vec3(0.04, 0.06, 0.1), wbIce * 0.7);
}
float wbFrost = 0.0;
if (uFrost > 0.0) {
  // Frost: spreads with uFrost over a crystalline pattern; reaches the surfaces facing up and the grass first
  vec3 frostNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  float frostUp = smoothstep(0.2, 0.8, frostNormal.y);
  float green = clamp((diffuseColor.g - max(diffuseColor.r, diffuseColor.b)) * 4.0, 0.0, 1.0);
  float crystals = texture2D(uCloudMap, vWeatherWorldPos.xz * 0.09 + vWeatherWorldPos.y * 0.05).r * 0.6
    + wbNoise(vWeatherWorldPos.xz * 1.6 + vWeatherWorldPos.y * 0.8) * 0.4;
  float reach = uFrost * (0.3 + 0.22 * frostUp + 0.32 * green);
  // Deep freeze: the frost also climbs up the walls from the ground, up to uFrostClimb
  reach += uFrost * 0.55 * (1.0 - frostUp) * (1.0 - smoothstep(uFrostClimb * 0.6, uFrostClimb + 0.01, vWeatherWorldPos.y));
  wbFrost = smoothstep(crystals - 0.08, crystals + 0.08, reach) * (1.0 - uSnowCover);
  float frostLuma = dot(diffuseColor.rgb, vec3(0.3, 0.55, 0.15));
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.84, 0.91, 1.0) * (0.8 + 0.3 * frostLuma), wbFrost * 0.7);
}
`;function io(s){return s.onBeforeCompile=e=>{Object.assign(e.uniforms,dn),e.vertexShader=JM+e.vertexShader.replace("#include <project_vertex>",l0+`#include <project_vertex>
`+jM),e.fragmentShader=rS+e.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+xS+AS+NS).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance *= uWindowGlow * uWindowTint;`).replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
`+mS).replace("#include <fog_fragment>","").replace("#include <colorspace_fragment>",wS+"#include <colorspace_fragment>")},s.customProgramCacheKey=()=>"weather-v39",s}var p0=[1.2,3.5],OS=.15,f0=[15,55],Hc={minX:-130,maxX:130,minZ:-200,maxZ:50},m0=.45,FS=260,g0=50,Hd=32,x0=4,y0=8,_0=[30,80],E0=2.4,HS=1.1,US=45,kS=1.8,BS=14,Uc=2,zS=new x(.85,.92,1).multiplyScalar(2.6),GS=new x(.45,.65,1).multiplyScalar(1.5);function VS(){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.3,"rgba(255,255,255,0.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64);let i=new Ft(e);return i.colorSpace=pt,i}var kc=class{constructor(e,t){this.surfaces=t;let n={transparent:!0,blending:Ln,depthWrite:!1,fog:!1},i=Hd+x0*y0;this.segments=new St(new it(1,1),new vt(Ve({},n)),Uc*i),this.glows=new St(new it(1,1),new vt(ht(Ve({},n),{map:VS()})),Uc);for(let r of[this.segments,this.glows])r.instanceMatrix.setUsage(It),r.setColorAt(0,this.color.set(0)),r.frustumCulled=!1,r.raycast=()=>{},r.renderOrder=12,r.visible=!1,e.add(r)}surfaces;segments;glows;strikes=[];timer=1;crackleDebt=0;onStrike;onCrackle;sparks=0;sparkAt=new w;matrix=new Ie;xAxis=new w;yAxis=new w;zAxis=new w;mid=new w;color=new x;update(e,t,n,i,r){i>.05&&(this.timer-=e*i,this.timer<=0&&(this.timer=F.randFloat(p0[0],p0[1]),this.strike(t,n))),this.sparks=0;let o=0;for(let l=this.strikes.length-1;l>=0;l--){let c=this.strikes[l];if(c.age+=e,c.age>=kS){this.strikes.splice(l,1);continue}let u=Math.exp(-c.age*3);u>this.sparks&&(this.sparks=u,this.sparkAt.copy(c.impact)),o=Math.max(o,Math.exp(-c.age*2))}for(this.crackleDebt+=e*BS*o;this.crackleDebt>=1&&this.strikes.length;){this.crackleDebt--;let l=this.strikes[Math.floor(Math.random()*this.strikes.length)],c=Math.random()*Math.PI*2,u=Math.random()*30;this.mid.set(l.impact.x+Math.cos(c)*u,l.impact.y,l.impact.z+Math.sin(c)*u),this.onCrackle?.(this.mid,Math.exp(-l.age*2))}this.strikes.length||(this.crackleDebt=0);let a=dn.uStrikes.value;for(let l=0;l<Uc;l++){let c=this.strikes[l];a[l].set(c?.impact.x??0,c?.impact.z??0,c?.age??0,c?1:0)}dn.uStrikeOn.value=this.strikes.length?1:0,this.draw(r)}strike(e,t){this.strikes.length>=Uc&&this.strikes.shift();let n,i;if(Math.random()<OS){let c=Math.random()*Math.PI*2,u=F.randFloat(f0[0],f0[1]);n=t.x+Math.cos(c)*u,i=t.z+Math.sin(c)*u}else n=e.x+F.randFloat(Hc.minX,Hc.maxX),i=e.z+F.randFloat(Hc.minZ,Hc.maxZ);let r=new w(n,this.surfaces.heightAt(n,i,e.y),i),o=r.clone().add(new w(F.randFloatSpread(g0*2),FS,F.randFloatSpread(g0*2))),a=v0(o,r,Hd,.22),l=[{points:a,width:E0}];for(let c=0;c<x0;c++){let u=a[Math.floor(F.randFloat(.1,.75)*Hd)],h=F.randFloat(_0[0],_0[1]),d=Math.random()*Math.PI*2,p=u.clone().add(new w(Math.cos(d)*h*.7,-h*.7,Math.sin(d)*h*.7));l.push({points:v0(u,p,y0,.3),width:HS})}this.strikes.push({impact:r,age:0,lines:l}),this.onStrike?.(r)}draw(e){e.getWorldDirection(this.zAxis).negate();let t=0,n=0;for(let i of this.strikes){if(i.age>=m0)continue;let r=i.age/m0,o=r<.15?1:r<.25?.15:r<.4?1:1-(r-.4)/.6;for(let a of i.lines){this.color.copy(zS).multiplyScalar(o*(a.width===E0?1:.7));for(let l=0;l<a.points.length-1;l++){let c=a.points[l],u=a.points[l+1];this.xAxis.subVectors(u,c);let h=this.xAxis.length();this.xAxis.divideScalar(h||1),this.yAxis.crossVectors(this.zAxis,this.xAxis).normalize(),this.mid.addVectors(c,u).multiplyScalar(.5),this.matrix.makeBasis(this.xAxis.multiplyScalar(h*1.05),this.yAxis.multiplyScalar(a.width),this.zAxis).setPosition(this.mid),this.segments.setMatrixAt(t,this.matrix),this.segments.setColorAt(t,this.color),t++}}this.mid.copy(i.impact).y+=4,this.matrix.compose(this.mid,e.quaternion,this.xAxis.setScalar(US)),this.glows.setMatrixAt(n,this.matrix),this.glows.setColorAt(n,this.color.copy(GS).multiplyScalar(o)),n++}this.segments.count=t,this.glows.count=n;for(let i of[this.segments,this.glows])i.visible=i.count>0,i.instanceMatrix.needsUpdate=!0,i.instanceColor.needsUpdate=!0}};function v0(s,e,t,n){let i=new Array(t+1);i[0]=s.clone(),i[t]=e.clone();let r=(o,a)=>{if(a-o<2)return;let l=o+a>>1,c=i[o].distanceTo(i[a]);i[l]=i[o].clone().lerp(i[a],.5).add(new w(F.randFloatSpread(c*n*2),F.randFloatSpread(c*n*.5),F.randFloatSpread(c*n*2))),r(o,l),r(l,a)};return r(0,t),i}var b0=7,T0=[55,140],WS=42,M0=[4,11],Bc=.8,Ud=[1.5,5],S0=.14,w0=[2.5,7],qS=2.2,C0=1.5,R0=[16773242,12124010,16734778,16773328].map(s=>new x(s).multiplyScalar(2.2));function XS(){let e=document.createElement("canvas");e.width=e.height=32;let t=e.getContext("2d"),n=t.createRadialGradient(32/2,32/2,0,32/2,32/2,32/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,0.8)"),n.addColorStop(.6,"rgba(255,255,255,0.15)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,32,32);let i=new Ft(e);return i.colorSpace=pt,i}var zc=class{constructor(e,t){this.surfaces=t;this.mesh=new St(new it(1,1),new vt({map:XS(),transparent:!0,blending:Ln,depthWrite:!1,fog:!1}),b0*2),this.mesh.instanceMatrix.setUsage(It),this.mesh.setColorAt(0,this.color.set(0)),this.mesh.frustumCulled=!1,this.mesh.raycast=()=>{},this.mesh.renderOrder=12,this.mesh.visible=!1,e.add(this.mesh)}surfaces;mesh;pairs=[];spawnTimer=1;onFlee;matrix=new Ie;position=new w;scale=new w;side=new w;color=new x;update(e,t,n,i,r){let o=Math.round(b0*i);this.spawnTimer-=e,this.spawnTimer<=0&&this.pairs.length<o&&(this.spawnTimer=F.randFloat(.5,2),this.spawn(t,n)),this.side.set(1,0,0).applyQuaternion(r.quaternion);let a=0;for(let l=this.pairs.length-1;l>=0;l--){let c=this.pairs[l];c.age+=e;let u=Math.hypot(c.x-n.x,c.z-n.z);if(!c.fleeing&&(u<WS||i<.05)&&(c.fleeing=!0,c.life=Math.min(c.life,c.age+Bc*.5),i>=.05&&this.onFlee?.(this.position.set(c.x,c.y,c.z))),c.age>=c.life){this.pairs.splice(l,1);continue}let h=Math.min(c.age/Bc,(c.life-c.age)/(c.fleeing?Bc*.5:Bc),1);c.blinkTimer-=e,c.blinkTimer<=0&&(c.blinkTimer=F.randFloat(Ud[0],Ud[1]),c.blinkAge=0);let d=1;c.blinkAge>=0&&(c.blinkAge+=e,d=Math.abs(c.blinkAge/S0*2-1),c.blinkAge>=S0&&(c.blinkAge=-1,d=1)),this.color.copy(c.color).multiplyScalar(h),this.scale.set(C0,C0*Math.max(d,.08),1);for(let p of[-.5,.5])this.position.set(c.x,c.y,c.z).addScaledVector(this.side,p*qS),this.matrix.compose(this.position,r.quaternion,this.scale),this.mesh.setMatrixAt(a,this.matrix),this.mesh.setColorAt(a,this.color),a++}this.mesh.count=a,this.mesh.visible=a>0,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor.needsUpdate=!0}spawn(e,t){for(let n=0;n<10;n++){let i=Math.random()*Math.PI*2,r=F.randFloat(T0[0],T0[1]),o=t.x+Math.cos(i)*r,a=t.z+Math.sin(i)*r*.8;if(Math.abs(o-e.x)>170||a-e.z<-200||a-e.z>70)continue;let l=this.surfaces.heightAt(o,a,e.y);this.pairs.push({x:o,z:a,y:l+F.randFloat(w0[0],w0[1]),age:0,life:F.randFloat(M0[0],M0[1]),fleeing:!1,blinkTimer:F.randFloat(.5,Ud[1]),blinkAge:-1,color:R0[Math.floor(Math.random()*R0.length)]});return}}};var Y=(s,e)=>s+Math.random()*(e-s),A0={ground:[1,2,3,4,5,6].map(s=>`assets/sounds/steps/ground-${s}.m4a`),snow:[1,2,3,4,5,6].map(s=>`assets/sounds/steps/snow-${s}.m4a`)},YS={ground:.35,snow:.5,water:.3},P0=.2,KS=.45,ZS=.16,$S=.22,JS=.12,jS=1.3,QS=.8,e1=.22,t1=.5,n1=7,i1=.16,s1=3.5,r1=.28,o1=.12,a1=.8,l1=.3,c1=.1,kd=14,u1=14,h1=.13,I0=.3,d1=8,p1=.1,L0=[4,12],f1=1.6,m1=.07,Gc=[1047,1175,1319,1568,1760,2093,2349,2637,3136],g1=.12,D0=[4,10],x1=2.5,y1=3,_1=.45,E1=.35,v1=.12,b1=.16,N0=[5,12],T1=.7,M1=.8,S1=.3,w1=.25,C1=.18,O0=[2,5],R1=1.6,A1=.12,P1=.1,I1=.07,L1=.12,D1=.3,N1=.1,O1=.018,F1=18,H1=7,U1=.12,k1=.22,F0=[1300,900],B1=.5,z1=18,G1=.2,H0=[9,18],U0=[14,28],k0=.1,V1=.09,B0=[.8,3.5],W1=.16,Bd=.05,z0=[4,11],q1=.15,G0=.035,X1=.55,Y1=.09,K1=.22,Z1=.16,Vc=.35,V0=[6,16],$1=.14,W0=.12,q0=[.8,4],J1=.035,j1=.2,X0=[12,28],Y0=[{freq:520,glide:.35,q:18,speed:.23},{freq:780,glide:.3,q:22,speed:.31},{freq:340,glide:.25,q:12,speed:.17}],Q1=.12,ew=.35,Wc=.4,qc=class{ctx;master;rainBus;noise;brownNoise;rainGain;rainFilter;dropsGain;drizzleGain;windGain;windFilter;sandGain;rumbleGain;rumbleFilter;swampGain;swampFilter;howls=[];droneGain;breathGain;breathFilter;dreadTimer=4;sizzleGain;trafficGain;trafficFilter;hornTimer=3;frogsState=[0,1,2,3].map(()=>({timer:Math.random()*2,pitch:Y(170,340),side:Y(-.9,.9)}));bloodDroneGain;bloodDroneFilter;bloodHeartTimer=5;bloodHowlTimer=8;waveGain;waveFilter;washGain;gullTimer=3;lapping=0;staticGain;staticFilter;staticBurst=0;whisperTimer=3;moanTimer=3;roarGain;roarFilter;quakeGain;steamGain;warpDroneGain;floatGain;mirageGain;projectorGain;tickTimer=0;tock=!1;reverseTimer=1;whirlGain;whirlFilter;humGain;electricNear=0;zapBudget=kd;rustleGain;rustleFilter;birdTimer=1;owlTimer=5;crickets=[0,1,2].map(()=>({timer:Math.random(),period:Y(.55,.95),freq:Y(4200,5200),side:Y(-.8,.8)}));steps={};volume=.7;muted=!1;time=0;constructor(){let e=()=>{this.start(),window.removeEventListener("keydown",e),window.removeEventListener("pointerdown",e)};window.addEventListener("keydown",e),window.addEventListener("pointerdown",e)}setVolume(e,t){this.volume=Math.min(Math.max(e,0),1),this.muted=t,this.ctx&&this.master&&this.master.gain.setTargetAtTime(this.muted?0:this.volume,this.ctx.currentTime,.05)}update(e,t){let n=this.ctx;if(!n||n.state!=="running")return;this.time+=e;let i=n.currentTime,r=(d,p)=>d?.gain.setTargetAtTime(p,i,Wc);r(this.rainGain,P0*Math.pow(t.rain,.8)),this.rainFilter?.frequency.setTargetAtTime(2500+3500*(1-t.rain),i,Wc);let o=t.rain*(.6+.4*Math.random());this.dropsGain?.gain.setTargetAtTime(P0*.5*o,i,.02),r(this.drizzleGain,ZS*t.drizzle);let a=Math.min(t.wind,1.3),l=.8+.2*Math.sin(this.time*.7)*Math.sin(this.time*.23);r(this.windGain,$S*Math.pow(a,1.6)*l),this.windFilter?.frequency.setTargetAtTime(250+650*a*l,i,Wc),r(this.sandGain,JS*t.sand*Math.min(a,1));let c=.6+.25*Math.sin(this.time*.31)+.15*Math.sin(this.time*.83+1.7);r(this.rumbleGain,t1*t.lava*c),this.rumbleFilter?.frequency.setTargetAtTime(70+50*c,i,Wc),t.lava>.05&&Math.random()<n1*t.lava*e&&this.crackle(t.lava);let u=.7+.3*Math.sin(this.time*.9+Math.sin(this.time*2.3));r(this.swampGain,o1*t.poison*u),this.swampFilter?.frequency.setTargetAtTime(220+160*u,i,.2),t.poison>.05&&Math.random()<s1*t.poison*e&&this.bubbles(t.poison),this.updateDarkness(e,t.darkness,i),this.updateBloodMoon(e,t.bloodMoon,i),this.updateFrogs(e,t.frogs),this.updateCity(e,t.city,i),this.updateTimeWarp(e,t.timeWarp,i),this.updateInverted(e,t.inverted),this.floatGain?.gain.setTargetAtTime(P1*t.antigravity,i,.5),this.projectorGain?.gain.setTargetAtTime(I1*t.oldFilm,i,.5),this.updateIceCracks(e,t.deepFreeze),this.mirageGain?.gain.setTargetAtTime(O1*t.mirage*(.7+.3*Math.sin(this.time*.9)),i,.3),this.updateFilmCrackle(e,t.oldFilm),this.updateHail(e,t.hail),this.lapping=t.lapping,this.updateSea(e,t.sea,i),this.updateMagic(e,t,i),this.updateEerie(e,t,i),this.electricNear=Math.max(0,this.electricNear-e*2.5),this.zapBudget=Math.min(kd,this.zapBudget+e*kd),this.humGain?.gain.setTargetAtTime(c1*Math.min(this.electricNear,1),i,.08),this.updateForest(e,t,i);let h=Math.max(t.wind-.9,0);this.howls.forEach(({gain:d,filter:p},f)=>{let _=Y0[f],m=this.time*_.speed+f*2.1,g=Math.sin(m)*.6+Math.sin(m*2.7+1.3)*.4;p.frequency.setTargetAtTime(_.freq*(1+_.glide*g+.4*h),i,.15);let b=Math.max(0,.55+.45*Math.sin(m*1.6+.7));d.gain.setTargetAtTime(a1*t.howl*b*(1+h),i,.25)})}updateForest(e,t,n){let i=t.forest,r=this.time,o=.55+.25*Math.sin(r*1.3)+.2*Math.sin(r*2.9+1.1),a=Math.min(t.wind,1.2);this.rustleGain?.gain.setTargetAtTime($1*i*(.2+.8*a)*o,n,.15),this.rustleFilter?.frequency.setTargetAtTime(2500+2500*o,n,.15);let l=t.daylight,c=Math.max(i,t.birds);c>=.3&&(this.birdTimer-=e*l,this.birdTimer<=0&&(this.birdTimer=Y(q0[0],q0[1]),this.bird(c*l)));let u=1-l,h=Math.max(i,t.crickets);if(h>=.3&&u>.2)for(let d of this.crickets)d.timer-=e,d.timer<=0&&(d.timer=d.period*Y(.9,1.1),this.cricket(d.freq,d.side,h*u));i<.3||u>.2&&(this.owlTimer-=e*u,this.owlTimer<=0&&(this.owlTimer=Y(X0[0],X0[1]),this.owl(i*u)))}bird(e){let t=this.ctx,n=this.panned(Y(-.9,.9)),i=Y(.4,1),r=t.currentTime,o=(l,c,u,h,d)=>{let p=t.createOscillator();p.frequency.setValueAtTime(c,l),p.frequency.exponentialRampToValueAtTime(u,l+h);let f=t.createGain();f.gain.setValueAtTime(0,l),f.gain.linearRampToValueAtTime(W0*e*i*d,l+Math.min(.01,h*.3)),f.gain.linearRampToValueAtTime(0,l+h),p.connect(f).connect(n),p.start(l),p.stop(l+h+.02)},a=Math.random();if(a<.35){let l=Y(3500,5500),c=6+Math.floor(Math.random()*10);for(let u=0;u<c;u++)o(r+u*.055,l*1.15,l*.9,.04,.8)}else if(a<.65){let l=Y(2200,3400),c=r;for(let u=0;u<2+Math.floor(Math.random()*2);u++){let h=Y(.12,.3);o(c,l*Y(.9,1.3),l*Y(.75,1.2),h,1),c+=h+Y(.05,.12)}}else if(a<.88){let l=Y(3e3,6e3);for(let c=0;c<2+Math.floor(Math.random()*4);c++)o(r+c*Y(.1,.18),l*.8,l*1.3,.05,.9)}else if(a<.95)for(let l=0;l<2;l++){let c=r+l*.9;o(c,680,660,.25,.7),o(c+.32,545,530,.35,.7)}else{let l=r;for(let c=0;c<12+Math.floor(Math.random()*8);c++){let u=t.createBufferSource();u.buffer=this.noise;let h=t.createGain();h.gain.setValueAtTime(W0*2*e*i*(1-c*.03),l),h.gain.exponentialRampToValueAtTime(.001,l+.03),u.connect(this.bandpass(1300,4)).connect(h).connect(n),u.start(l,Math.random()*3,.04),l+=.05+c*.002}}}cricket(e,t,n){let i=this.ctx,r=this.panned(t);for(let o=0;o<3;o++){let a=i.currentTime+o*.035,l=i.createOscillator();l.frequency.value=e;let c=i.createGain();c.gain.setValueAtTime(0,a),c.gain.linearRampToValueAtTime(J1*n,a+.004),c.gain.linearRampToValueAtTime(0,a+.022),l.connect(c).connect(r),l.start(a),l.stop(a+.03)}}owl(e){let t=this.ctx,n=this.panned(Y(-.8,.8)),i=Y(320,370),r=t.currentTime,o=Math.random()<.6?[.7,1.1]:[.6];for(let a of o)this.hoot(r,a,i*Y(.97,1.03),j1*e,n),r+=a+Y(.35,.7)}hoot(e,t,n,i,r){let o=this.ctx,a=Math.min(t*.2,.18),l=o.createGain();for(let[_,m]of[[1,1],[2,.32],[3,.1]]){let g=o.createOscillator();g.frequency.setValueAtTime(n*_*.9,e),g.frequency.linearRampToValueAtTime(n*_,e+t*.3),g.frequency.linearRampToValueAtTime(n*_*.88,e+t);let b=o.createGain();b.gain.value=m,g.connect(b).connect(l),g.start(e),g.stop(e+t+.05)}let c=o.createBufferSource();c.buffer=this.noise;let u=o.createGain();u.gain.value=.08,c.connect(this.bandpass(n*3,2)).connect(u).connect(l),c.start(e,Math.random()*3,t+.05);let h=o.createGain();h.gain.setValueAtTime(.5,e),h.gain.setValueAtTime(.5,e+a*.6),h.gain.linearRampToValueAtTime(1,e+a);let d=o.createOscillator();d.frequency.value=Y(24,32);let p=o.createGain();p.gain.setValueAtTime(.5,e),p.gain.setValueAtTime(.5,e+a*.6),p.gain.linearRampToValueAtTime(0,e+a),d.connect(p).connect(h.gain),d.start(e),d.stop(e+a+.05);let f=o.createGain();f.gain.setValueAtTime(0,e),f.gain.linearRampToValueAtTime(i*.7,e+.06),f.gain.linearRampToValueAtTime(i,e+t*.4),f.gain.linearRampToValueAtTime(0,e+t),l.connect(h).connect(this.lowpass(2e3)).connect(f).connect(r)}zap(e,t,n){let i=this.ctx;if(!i||!this.master||!this.noise||i.state!=="running"||(this.electricNear=Math.min(this.electricNear+e*.5,1.5),this.zapBudget<1))return;this.zapBudget--;let r=this.panned(t),o=i.currentTime,a=l1*e*Y(.6,1),l=i.createBufferSource();l.buffer=this.noise;let c=i.createGain();c.gain.setValueAtTime(a,o),c.gain.exponentialRampToValueAtTime(.001,o+.03),l.connect(this.highpass(2500)).connect(c).connect(r),l.start(o,Math.random()*3,.04);let u=Math.max(.06,n*Y(.6,1)),h=i.createBufferSource();h.buffer=this.noise;let d=i.createGain();d.gain.setValueAtTime(0,o);let p=o+.01;for(;p<o+u;)d.gain.linearRampToValueAtTime(a*Y(.3,.8),p+.002),d.gain.linearRampToValueAtTime(a*.05,p+Y(.006,.018)),p+=Y(.01,.03);d.gain.linearRampToValueAtTime(0,p+.01),h.connect(this.bandpass(Y(3e3,6e3),1.2)).connect(d).connect(r),h.start(o,Math.random()*3,u+.05);let f=i.createOscillator();f.type="sawtooth",f.frequency.value=Y(110,180);let _=i.createGain();_.gain.setValueAtTime(0,o),_.gain.linearRampToValueAtTime(a*.25,o+.01),_.gain.linearRampToValueAtTime(0,o+u),f.connect(this.bandpass(Y(900,1600),2)).connect(_).connect(r),f.start(o),f.stop(o+u+.02)}updateHail(e,t){if(t<.05)return;let n=this.ctx,i=u1*t*e;for(;i>0&&!(i<1&&Math.random()>i);){i--;let r=Math.random()<.3,o=r?Y(650,1250):Y(1700,3300),a=this.panned(Y(-1,1)),l=n.currentTime+Math.random()*e,c=h1*t*Y(.3,1),u=Math.random()<.6?1+Math.floor(Math.random()*2):0;for(let h=0;h<=u;h++)this.hailTick(l,o*(1+h*.06),c,r,a),l+=Y(.04,.09)/(h+1),c*=Y(.3,.5)}}hailTick(e,t,n,i,r){let o=this.ctx,a=o.createBufferSource();a.buffer=this.noise;let l=o.createGain();l.gain.setValueAtTime(n*.6,e),l.gain.exponentialRampToValueAtTime(.001,e+.005),a.connect(this.highpass(i?1e3:1800)).connect(this.lowpass(7e3)).connect(l).connect(r),a.start(e,Math.random()*3,.01);let c=i?Y(.02,.035):Y(.008,.016);for(let[u,h]of[[1,.25],[2.37,.15]]){let d=o.createOscillator();d.type="triangle",d.frequency.value=t*u;let p=o.createGain();p.gain.setValueAtTime(n*h,e),p.gain.exponentialRampToValueAtTime(.001,e+c),d.connect(p).connect(r),d.start(e),d.stop(e+c+.01)}}updateSea(e,t,n){let i=this.time/d1%1,r=Math.pow(Math.sin(Math.PI*i),2),o=Math.pow(Math.max(0,Math.sin(Math.PI*((i+.75)%1))),3),a=Math.max(t,this.lapping);this.waveGain?.gain.setTargetAtTime(I0*a*(.25+.75*r),n,.3),this.waveFilter?.frequency.setTargetAtTime(250+450*r,n,.3),this.washGain?.gain.setTargetAtTime(I0*.4*a*o,n,.3),!(t<.3)&&(this.gullTimer-=e,this.gullTimer<=0&&(this.gullTimer=Y(L0[0],L0[1]),this.gull(t)))}gull(e){let t=this.ctx,n=this.panned(Y(-.9,.9)),i=Y(1100,1500),r=t.currentTime;for(let o=0;o<2+Math.floor(Math.random()*3);o++){let a=Y(.25,.45),l=t.createOscillator();l.type="sawtooth",l.frequency.setValueAtTime(i*1.1,r),l.frequency.linearRampToValueAtTime(i*1.25,r+a*.2),l.frequency.exponentialRampToValueAtTime(i*.7,r+a);let c=t.createOscillator();c.frequency.value=Y(8,12);let u=t.createGain();u.gain.value=i*.03,c.connect(u).connect(l.frequency);let h=t.createGain();h.gain.setValueAtTime(0,r),h.gain.linearRampToValueAtTime(p1*e,r+.04),h.gain.linearRampToValueAtTime(0,r+a),l.connect(this.bandpass(i*1.4,2)).connect(this.lowpass(3500)).connect(h).connect(n),l.start(r),c.start(r),l.stop(r+a+.02),c.stop(r+a+.02),r+=a+Y(.08,.2)}}updateMagic(e,t,n){t.chimes>.05&&Math.random()<f1*t.chimes*e&&this.chime(t.chimes),this.staticBurst=Math.max(0,this.staticBurst-e*2),t.static>.05&&Math.random()<.4*e*t.static&&(this.staticBurst=Y(.6,1));let i=Math.random()<.3?1:.4;this.staticGain?.gain.setTargetAtTime(g1*t.static*(.15+.85*this.staticBurst)*i,n,.01),this.staticFilter?.frequency.setTargetAtTime(Y(1200,3500),n,.02);let r=Math.random()<.45?Y(.6,1):Y(.15,.35);this.sizzleGain?.gain.setTargetAtTime(Y1*t.sizzle*r,n,.015),t.whispers>.3&&(this.whisperTimer-=e,this.whisperTimer<=0&&(this.whisperTimer=Y(D0[0],D0[1]),this.whisper(t.whispers*.8,Y(-.9,.9))))}updateEerie(e,t,n){let i=this.ctx;if(t.crackle>.05&&Math.random()<x1*t.crackle*e){let c=i.currentTime,u=this.panned(Y(-.9,.9));for(let h=0;h<1+Math.floor(Math.random()*Math.random()*4);h++){let d=i.createBufferSource();d.buffer=this.noise;let p=i.createGain();p.gain.setValueAtTime(v1*t.crackle*Y(.4,1),c),p.gain.exponentialRampToValueAtTime(.001,c+Y(.01,.04)),d.connect(this.bandpass(Y(2500,7e3),Y(3,8))).connect(p).connect(u),d.start(c,Math.random()*3,.06),c+=Y(.02,.09)}}t.ashCrackle>.05&&Math.random()<y1*t.ashCrackle*e&&this.crackle(_1*t.ashCrackle),t.moan>.05&&(this.moanTimer-=e,this.moanTimer<=0&&(this.moanTimer=Y(N0[0],N0[1]),this.ghostMoan(t.moan)));let r=t.whirl,o=Math.sin(this.time*4.2)*.6+Math.sin(this.time*6.9+1)*.4;this.whirlGain?.gain.setTargetAtTime(E1*r*r*(.75+.25*o),n,.12),this.whirlFilter?.frequency.setTargetAtTime(500+500*r+350*o,n,.06);let a=t.quake;if(this.quakeGain?.gain.setTargetAtTime(M1*a,n,.08),a>.1&&Math.random()<z1*a*e){let c=i.currentTime,u=i.createBufferSource();u.buffer=this.noise;let h=i.createGain();h.gain.setValueAtTime(.12*a*Y(.4,1),c),h.gain.exponentialRampToValueAtTime(.001,c+Y(.02,.06)),u.connect(this.bandpass(Y(400,1800),Y(3,7))).connect(h).connect(this.panned(Y(-1,1))),u.start(c,Math.random()*3,.08)}this.steamGain?.gain.setTargetAtTime(S1*t.steam*(.85+.15*Math.sin(this.time*23)),n,.1);let l=t.roar;this.roarGain?.gain.setTargetAtTime(T1*l*l*(.85+.15*Math.sin(this.time*1.7)),n,.3),this.roarFilter?.frequency.setTargetAtTime(150+600*l,n,.3)}ghostMoan(e){let t=this.ctx,n=Y(-.9,.9),i=Y(230,320),r=Y(1.6,3);for(let[o,a]of[[0,1],[.35,.35]]){let l=t.currentTime+o,c=t.createOscillator();c.type="triangle",c.frequency.setValueAtTime(i*1.1,l),c.frequency.linearRampToValueAtTime(i*1.2,l+r*.3),c.frequency.exponentialRampToValueAtTime(i*.7,l+r);let u=t.createOscillator();u.frequency.value=Y(4,6);let h=t.createGain();h.gain.value=i*.025,u.connect(h).connect(c.frequency);let d=t.createGain();d.gain.setValueAtTime(0,l),d.gain.linearRampToValueAtTime(b1*e*a,l+r*.35),d.gain.linearRampToValueAtTime(0,l+r),c.connect(this.lowpass(900)).connect(d).connect(this.panned(n*(o?-.5:1))),c.start(l),u.start(l),c.stop(l+r+.05),u.stop(l+r+.05)}}chime(e){let t=this.ctx,n=this.panned(Y(-.8,.8)),i=t.currentTime,r=Gc[Math.floor(Math.random()*Gc.length)],o=Y(1.2,2.5);for(let[a,l]of[[1,1],[2.76,.3],[5.4,.1]]){let c=t.createOscillator();c.frequency.value=r*a;let u=t.createGain();u.gain.setValueAtTime(0,i),u.gain.linearRampToValueAtTime(m1*e*l,i+.005),u.gain.exponentialRampToValueAtTime(5e-4,i+o/a),c.connect(u).connect(n),c.start(i),c.stop(i+o+.05)}}updateBloodMoon(e,t,n){let i=this.time,r=.7*Math.sin(i*.8)+.3*Math.sin(i*2.3);this.bloodDroneGain?.gain.setTargetAtTime(G1*t*(.65+.35*r),n,.3),this.bloodDroneFilter?.frequency.setTargetAtTime(160+90*(r+1),n,.3),!(t<.3)&&(this.bloodHeartTimer-=e,this.bloodHeartTimer<=0&&(this.bloodHeartTimer=Y(H0[0],H0[1]),this.heartbeat(t*.8)),this.bloodHowlTimer-=e,this.bloodHowlTimer<=0&&(this.bloodHowlTimer=Y(U0[0],U0[1]),this.wolfHowl(t)))}updateFilmCrackle(e,t){if(t<.05||Math.random()>H1*t*e)return;let n=this.ctx,i=n.currentTime,r=n.createBufferSource();r.buffer=this.noise;let o=n.createGain();o.gain.setValueAtTime(U1*t*Y(.3,1),i),o.gain.exponentialRampToValueAtTime(1e-4,i+.006),r.connect(this.highpass(1500)).connect(o).connect(this.panned(Y(-.5,.5))),r.start(i,Math.random()*2,.01)}updateInverted(e,t){if(t<.3||(this.reverseTimer-=e,this.reverseTimer>0))return;this.reverseTimer=Y(O0[0],O0[1]);let n=this.ctx,i=n.currentTime,r=Y(1,2.2),o=this.panned(Y(-.8,.8)),a=n.createGain();if(a.gain.setValueAtTime(5e-4,i),a.gain.exponentialRampToValueAtTime(C1*t,i+r),a.gain.setValueAtTime(0,i+r+.01),a.connect(o),Math.random()<.5){let l=n.createBufferSource();l.buffer=this.noise;let c=this.bandpass(800,.7);c.frequency.setValueAtTime(800,i),c.frequency.exponentialRampToValueAtTime(6e3,i+r),l.connect(c).connect(a),l.start(i,Math.random()*2,r+.05)}else{let l=Gc[Math.floor(Math.random()*Gc.length)]/2;for(let[c,u]of[[1,1],[2.76,.35],[5.4,.12]]){let h=n.createOscillator();h.frequency.value=l*c;let d=n.createGain();d.gain.value=u*.5,h.connect(d).connect(a),h.start(i),h.stop(i+r+.05)}}}updateTimeWarp(e,t,n){if(this.warpDroneGain?.gain.setTargetAtTime(A1*t*(.8+.2*Math.sin(this.time*.4)),n,.5),t<.3||(this.tickTimer-=e,this.tickTimer>0))return;this.tickTimer=R1,this.tock=!this.tock;let i=this.ctx,r=i.currentTime,o=this.panned(this.tock?.3:-.3),a=i.createOscillator();a.frequency.setValueAtTime(this.tock?220:260,r),a.frequency.exponentialRampToValueAtTime(this.tock?150:180,r+.25);let l=i.createGain();l.gain.setValueAtTime(0,r),l.gain.linearRampToValueAtTime(w1*t,r+.01),l.gain.exponentialRampToValueAtTime(.001,r+.35),a.connect(this.bandpass(this.tock?400:480,3)).connect(l).connect(o),a.start(r),a.stop(r+.4);let c=i.createDelay(1);c.delayTime.value=.42;let u=i.createGain();u.gain.value=.45,l.connect(c).connect(u).connect(c),u.connect(o),setTimeout(()=>{u.disconnect(),c.disconnect()},4e3)}updateCity(e,t,n){let i=this.time,r=.7+.2*Math.sin(i*.21)+.1*Math.sin(i*.67+2);this.trafficGain?.gain.setTargetAtTime(W1*t*r,n,.5),this.trafficFilter?.frequency.setTargetAtTime(220+120*r,n,.5),!(t<.3)&&(this.hornTimer-=e,this.hornTimer<=0&&(this.hornTimer=Y(z0[0],z0[1]),Math.random()<q1?this.siren(t):this.horn(t)))}horn(e){let t=this.ctx,n=this.panned(Y(-.9,.9)),i=Y(330,440),r=t.currentTime;for(let o=0;o<(Math.random()<.5?1:2);o++){let a=Y(.15,.4);for(let l of[1,1.26]){let c=t.createOscillator();c.type="square",c.frequency.value=i*l;let u=t.createGain();u.gain.setValueAtTime(0,r),u.gain.linearRampToValueAtTime(Bd*e,r+.02),u.gain.setValueAtTime(Bd*e,r+a-.03),u.gain.linearRampToValueAtTime(0,r+a),c.connect(this.lowpass(900)).connect(u).connect(n),c.start(r),c.stop(r+a+.02)}r+=a+Y(.08,.15)}}siren(e){let t=this.ctx,n=t.currentTime,i=Y(4,7),r=t.createOscillator();r.type="triangle";let o=t.createOscillator();o.frequency.value=Y(.4,.7);let a=t.createGain();a.gain.value=160,r.frequency.value=720,o.connect(a).connect(r.frequency);let l=t.createGain();l.gain.setValueAtTime(0,n),l.gain.linearRampToValueAtTime(Bd*.7*e,n+i*.4),l.gain.linearRampToValueAtTime(0,n+i),r.connect(this.lowpass(1100)).connect(l).connect(this.panned(Y(-.8,.8))),r.start(n),o.start(n),r.stop(n+i+.05),o.stop(n+i+.05)}updateFrogs(e,t){if(!(t<.05))for(let n of this.frogsState)n.timer-=e,n.timer<=0&&(n.timer=Y(B0[0],B0[1]),this.croak(n.pitch,n.side,t*Y(.5,1)))}croak(e,t,n){let i=this.ctx,r=this.panned(t),o=i.currentTime,a=2+Math.floor(Math.random()*2);for(let l=0;l<a;l++){let c=Y(.05,.08),u=i.createOscillator();u.type="sawtooth",u.frequency.setValueAtTime(e*.9,o),u.frequency.linearRampToValueAtTime(e*1.1,o+c);let h=i.createGain();h.gain.setValueAtTime(0,o),h.gain.linearRampToValueAtTime(V1*n,o+.01),h.gain.exponentialRampToValueAtTime(.001,o+c),u.connect(this.bandpass(e*3.5,4)).connect(this.lowpass(2200)).connect(h).connect(r),u.start(o),u.stop(o+c+.02),o+=c+Y(.03,.06)}}wolfHowl(e){let t=this.ctx,n=Math.random()<.4?2:1;for(let i=0;i<n;i++){let r=t.currentTime+i*Y(.8,1.6),o=Y(2.2,3.5),a=Y(380,460)*(i?Y(1.08,1.2):1),l=t.createOscillator();l.type="triangle",l.frequency.setValueAtTime(a*.7,r),l.frequency.linearRampToValueAtTime(a*1.25,r+o*.3),l.frequency.linearRampToValueAtTime(a*1.2,r+o*.7),l.frequency.linearRampToValueAtTime(a*.8,r+o);let c=t.createOscillator();c.frequency.value=Y(5,6.5);let u=t.createGain();u.gain.setValueAtTime(0,r),u.gain.linearRampToValueAtTime(a*.02,r+o*.5),c.connect(u).connect(l.frequency);let h=t.createGain();h.gain.setValueAtTime(0,r),h.gain.linearRampToValueAtTime(k0*e,r+o*.25),h.gain.setValueAtTime(k0*e,r+o*.7),h.gain.linearRampToValueAtTime(0,r+o);let d=this.panned(Y(-.9,.9)),p=this.lowpass(1400);l.connect(p).connect(h).connect(d);let f=t.createDelay(1);f.delayTime.value=.35;let _=t.createGain();_.gain.value=.3,h.connect(f).connect(_).connect(d),l.start(r),c.start(r),l.stop(r+o+.05),c.stop(r+o+.05)}}updateDarkness(e,t,n){let i=this.time,r=.6+.4*Math.sin(i*.13)*Math.sin(i*.07+1);this.droneGain?.gain.setTargetAtTime(K1*t*r,n,.8);let o=Math.max(0,Math.sin(i*2*Math.PI/7+Math.sin(i*.3)));if(this.breathGain?.gain.setTargetAtTime(Z1*t*o,n,.6),this.breathFilter?.frequency.setTargetAtTime(180+220*o,n,.6),!(t<.3)&&(this.dreadTimer-=e,this.dreadTimer<=0)){this.dreadTimer=Y(V0[0],V0[1]);let a=Math.random(),l=Y(-.9,.9);a<.3?this.knocks(t,l):a<.55?this.creak(t,l):a<.8?this.whisper(t,l):this.heartbeat(t)}}panned(e){let t=this.ctx.createStereoPanner();return t.pan.value=e,t.connect(this.master),t}knocks(e,t){let n=this.ctx,i=this.panned(t),r=1+Math.floor(Math.random()*3),o=n.currentTime;for(let a=0;a<r;a++){let l=n.createOscillator();l.frequency.setValueAtTime(Y(70,95),o),l.frequency.exponentialRampToValueAtTime(45,o+.25);let c=n.createGain();c.gain.setValueAtTime(0,o),c.gain.linearRampToValueAtTime(Vc*e,o+.01),c.gain.exponentialRampToValueAtTime(.001,o+.35),l.connect(c).connect(this.lowpass(300)).connect(i),l.start(o),l.stop(o+.4),o+=Y(.35,.8)}}creak(e,t){let n=this.ctx,i=n.currentTime,r=Y(.8,1.8),o=n.createOscillator();o.type="sawtooth";let a=Y(90,160);o.frequency.setValueAtTime(a,i),o.frequency.linearRampToValueAtTime(a*Y(.7,1.4),i+r*.5),o.frequency.linearRampToValueAtTime(a*Y(.8,1.2),i+r);let l=this.bandpass(Y(700,1300),6),c=n.createGain();c.gain.setValueAtTime(0,i),c.gain.linearRampToValueAtTime(Vc*.35*e,i+r*.3),c.gain.linearRampToValueAtTime(0,i+r),o.connect(l).connect(c).connect(this.lowpass(2500)).connect(this.panned(t)),o.start(i),o.stop(i+r+.05)}whisper(e,t){let n=this.ctx,i=n.currentTime,r=this.panned(t),o=3+Math.floor(Math.random()*5),a=i;for(let l=0;l<o;l++){let c=Y(.12,.3),u=n.createBufferSource();u.buffer=this.noise;let h=this.bandpass(Y(600,1100),5),d=this.bandpass(Y(1600,2800),7);d.frequency.linearRampToValueAtTime(Y(1400,3e3),a+c);let p=n.createGain();p.gain.setValueAtTime(0,a),p.gain.linearRampToValueAtTime(Vc*.5*e*Y(.5,1),a+c*.3),p.gain.linearRampToValueAtTime(0,a+c),u.connect(h).connect(p),u.connect(d).connect(p),p.connect(r),u.start(a,Math.random()*3,c+.05),a+=c+Y(.02,.15)}}heartbeat(e){let t=this.ctx,n=this.panned(0),i=5+Math.floor(Math.random()*5),r=Y(.9,1.15);for(let o=0;o<i;o++){let a=t.currentTime+o*r,l=Math.sin(Math.PI*(o+.5)/i);for(let[c,u]of[[0,1],[.18,.7]]){let h=t.createOscillator();h.frequency.setValueAtTime(60,a+c),h.frequency.exponentialRampToValueAtTime(38,a+c+.12);let d=t.createGain();d.gain.setValueAtTime(0,a+c),d.gain.linearRampToValueAtTime(Vc*1.2*e*u*l,a+c+.015),d.gain.exponentialRampToValueAtTime(.001,a+c+.16),h.connect(d).connect(n),h.start(a+c),h.stop(a+c+.2)}}}bubbles(e){let t=this.ctx,n=Math.random()<.35,i=n?3+Math.floor(Math.random()*5):1,r=t.currentTime+Math.random()*.05;for(let o=0;o<i;o++){let a=!n&&Math.random()<.6;this.blop(r,a?Y(110,200):Y(220,520),a?Y(.12,.2):Y(.05,.1),r1*e*(a?1:Y(.4,.8)),Y(-.7,.7)),r+=Y(.04,.14)}}blop(e,t,n,i,r){let o=this.ctx,a=o.createOscillator();a.type="sine",a.frequency.setValueAtTime(t,e),a.frequency.exponentialRampToValueAtTime(t*Y(2,3.2),e+n);let l=this.lowpass(1200),c=o.createGain();c.gain.setValueAtTime(0,e),c.gain.linearRampToValueAtTime(i,e+n*.25),c.gain.exponentialRampToValueAtTime(.001,e+n);let u=o.createStereoPanner();u.pan.value=r,a.connect(l).connect(c).connect(u).connect(this.master),a.start(e),a.stop(e+n+.02)}crackle(e){let t=this.ctx,n=1+Math.floor(Math.random()*Math.random()*5),i=t.currentTime;for(let r=0;r<n;r++){let o=Math.random()<.2,a=o?.03+Math.random()*.03:.006+Math.random()*.014,l=t.createBufferSource();l.buffer=this.noise;let c=this.bandpass(o?600+Math.random()*600:2e3+Math.random()*4e3,o?2:1),u=t.createGain(),h=i1*e*(o?1.3:.4+.6*Math.random());u.gain.setValueAtTime(h,i),u.gain.exponentialRampToValueAtTime(.001,i+a),l.connect(c).connect(u).connect(this.master),l.start(i,Math.random()*3,a+.02),i+=.02+Math.random()*.07}}geyserBurst(e,t){let n=this.ctx;if(!n||!this.master||!this.noise||n.state!=="running"||e<=0)return;this.bubbles(e);let i=n.currentTime+.25,r=n.createBufferSource();r.buffer=this.noise;let o=this.bandpass(600,.8);o.frequency.setValueAtTime(400,i),o.frequency.exponentialRampToValueAtTime(2500,i+.6);let a=n.createGain();a.gain.setValueAtTime(0,i),a.gain.linearRampToValueAtTime(B1*e,i+.15),a.gain.exponentialRampToValueAtTime(.001,i+1.6),r.connect(o).connect(a).connect(this.panned(t*.8)),r.start(i,Math.random()*2,1.7)}rocketWhistle(e,t){let n=this.ctx;if(!n||!this.master||n.state!=="running")return;let i=n.currentTime,r=n.createOscillator();r.frequency.setValueAtTime(Y(500,700),i),r.frequency.exponentialRampToValueAtTime(Y(1800,2600),i+e);let o=n.createGain();o.gain.setValueAtTime(0,i),o.gain.linearRampToValueAtTime(G0,i+.1),o.gain.linearRampToValueAtTime(G0*.4,i+e),o.gain.linearRampToValueAtTime(0,i+e+.05),r.connect(o).connect(this.panned(t*.8)),r.start(i),r.stop(i+e+.1)}fireworkBang(e,t){let n=this.ctx;if(!n||!this.master||!this.noise||n.state!=="running")return;let i=n.currentTime+.15+(1-e)*.5,r=this.panned(t*.8),o=n.createBufferSource();o.buffer=this.noise;let a=n.createGain(),l=X1*(.4+.6*e);a.gain.setValueAtTime(l,i),a.gain.exponentialRampToValueAtTime(.001,i+.5),o.connect(this.lowpass(700)).connect(a).connect(r),o.start(i,Math.random()*3,.55);let c=n.createOscillator();c.frequency.setValueAtTime(90,i),c.frequency.exponentialRampToValueAtTime(35,i+.4);let u=n.createGain();u.gain.setValueAtTime(l*.8,i),u.gain.exponentialRampToValueAtTime(.001,i+.45),c.connect(u).connect(r),c.start(i),c.stop(i+.5);let h=n.createDelay(1);h.delayTime.value=Y(.25,.4);let d=n.createGain();if(d.gain.value=.25,a.connect(h).connect(d).connect(r),Math.random()<.6){let p=i+.3;for(let f=0;f<14;f++){let _=n.createBufferSource();_.buffer=this.noise;let m=n.createGain();m.gain.setValueAtTime(l*.15*Y(.4,1),p),m.gain.exponentialRampToValueAtTime(.001,p+.02),_.connect(this.bandpass(Y(2500,5e3),3)).connect(m).connect(r),_.start(p,Math.random()*3,.03),p+=Y(.03,.12)}}}ledgeHop(){let e=this.ctx;if(!e||!this.master||!this.noise||e.state!=="running")return;let t=e.currentTime,n=e.createBufferSource();n.buffer=this.noise;let i=this.bandpass(1400,1.2);i.frequency.setValueAtTime(1400,t),i.frequency.exponentialRampToValueAtTime(300,t+.3);let r=e.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.12,t+.06),r.gain.exponentialRampToValueAtTime(1e-4,t+.32),n.connect(i).connect(r).connect(this.master),n.start(t,Math.random()*2,.35)}thud(){let e=this.ctx;if(!e||!this.master||e.state!=="running")return;let t=e.currentTime,n=e.createOscillator();n.frequency.setValueAtTime(110,t),n.frequency.exponentialRampToValueAtTime(40,t+.18);let i=e.createGain();i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(.6,t+.008),i.gain.exponentialRampToValueAtTime(.001,t+.25),n.connect(i).connect(this.master),n.start(t),n.stop(t+.3);let r=e.createBufferSource();r.buffer=this.noise;let o=e.createGain();o.gain.setValueAtTime(.2,t),o.gain.exponentialRampToValueAtTime(.001,t+.2),r.connect(this.lowpass(900)).connect(o).connect(this.master),r.start(t,Math.random()*3,.25)}updateIceCracks(e,t){if(t<.3||Math.random()>D1*t*e)return;let n=this.ctx,i=n.currentTime,r=this.panned(Y(-.9,.9)),o=N1*t*Y(.4,1),a=n.createBufferSource();a.buffer=this.noise;let l=n.createGain();l.gain.setValueAtTime(o,i),l.gain.exponentialRampToValueAtTime(1e-4,i+.04),a.connect(this.highpass(2e3)).connect(l).connect(r),a.start(i,Math.random()*2,.05);let c=n.createOscillator(),u=Y(1800,3200),h=Y(.25,.5);c.frequency.setValueAtTime(u,i),c.frequency.exponentialRampToValueAtTime(u*.12,i+h);let d=n.createGain();d.gain.setValueAtTime(o*.5,i),d.gain.exponentialRampToValueAtTime(1e-4,i+h),c.connect(d).connect(r),c.start(i),c.stop(i+h+.02)}scurry(e){let t=this.ctx;if(!t||!this.master||!this.noise||t.state!=="running")return;let n=this.panned(e),i=t.currentTime,r=4+Math.floor(Math.random()*5),o=0;for(let a=0;a<r;a++){let l=t.createBufferSource();l.buffer=this.noise;let c=t.createGain(),u=L1*Y(.5,1)*(1-a/r*.6);c.gain.setValueAtTime(u,i+o),c.gain.exponentialRampToValueAtTime(1e-4,i+o+.07),l.connect(this.bandpass(Y(1800,3500),1.2)).connect(c).connect(n),l.start(i+o,Math.random()*2,.08),o+=Y(.05,.12)}}thunder(e){let t=this.ctx;if(!(!t||!this.master||!this.brownNoise||t.state!=="running"))for(let n of e){let i=1-n.distance,r=n.at+.05+n.distance*5+Math.random()*.6,o=t.currentTime+r,a=t.createStereoPanner();a.pan.value=n.pan,a.connect(this.master),n.distance<.35&&this.thunderCrack(o,i,a),this.thunderRumble(o,n.distance,a)}}thunderCrack(e,t,n){let i=this.ctx,r=(c,u,h)=>{let d=i.createBufferSource();d.buffer=this.noise;let p=this.lowpass(Y(2200,3500)),f=this.highpass(120),_=i.createGain();_.gain.setValueAtTime(0,c),_.gain.linearRampToValueAtTime(u,c+.006),_.gain.exponentialRampToValueAtTime(u*.25,c+h*.3),_.gain.exponentialRampToValueAtTime(.001,c+h),d.connect(f).connect(p).connect(_).connect(n),d.start(c,Math.random()*3,h+.05)},o=QS*t;r(e,o,Y(.4,.7));let a=Math.floor(Y(0,3)),l=e;for(let c=0;c<a;c++)l+=Y(.08,.25),r(l,o*Y(.3,.6),Y(.3,.5))}thunderRumble(e,t,n){let i=this.ctx,r=1-t,o=2.5+t*4+Math.random()*2.5,a=i.createBufferSource();a.buffer=this.brownNoise,a.playbackRate.value=Y(.7,1);let l=i.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(550+1800*r*r+Math.random()*300,e),l.frequency.exponentialRampToValueAtTime(160+80*Math.random(),e+o);let c=i.createGain(),u=jS*(.55+.45*r);c.gain.setValueAtTime(0,e),c.gain.linearRampToValueAtTime(u,e+Y(.03,.08)+t*.6);let h=e+.3+t*.5,d=1;for(;h<e+o-.5;)d*=Y(.85,1),c.gain.linearRampToValueAtTime(u*d*Y(.45,.95),h),h+=Y(.2,.5)+t*Y(.2,.7);c.gain.linearRampToValueAtTime(0,e+o),a.connect(l).connect(c).connect(n);let p=this.rainBus.gain,f=1-(1-KS)*(.5+.5*r);p.cancelScheduledValues(e),p.setTargetAtTime(f,e,.08),p.setTargetAtTime(1,e+o*.6,o*.25),a.loop=!0,a.start(e,Math.random()*2,o+.1)}footstep(e,t,n){let i=this.ctx,r=this.steps[e==="water"?"ground":e];if(!i||!this.master||!r?.length||i.state!=="running")return;let o=i.createBufferSource();o.buffer=r[Math.floor(Math.random()*r.length)],o.playbackRate.value=(n?1.08:1)*(.92+Math.random()*.16);let a=i.createGain();a.gain.value=YS[e]*(n?1.15:1)*(.8+Math.random()*.4),e==="water"?o.connect(this.lowpass(2200)).connect(a).connect(this.master):o.connect(a).connect(this.master),o.start(),(e==="water"||t)&&this.wetLayer(t?1:ew,n)}wetLayer(e,t){let n=this.ctx,i=n.currentTime,r=e*(t?1.25:1),o=n.createBufferSource();o.buffer=this.noise;let a=.12+.08*e+(t?.05:0),l=n.createGain();l.gain.setValueAtTime(0,i),l.gain.linearRampToValueAtTime(e1*r,i+.012),l.gain.exponentialRampToValueAtTime(.001,i+a),o.connect(this.highpass(1800)).connect(this.lowpass(7500)).connect(l).connect(this.master),o.start(i,Math.random()*3,a+.05);let c=e>=1?3+Math.floor(Math.random()*3):Math.floor(Math.random()*3);for(let u=0;u<c;u++)this.plink(i+.02+Math.random()*(.08+.12*e),Q1*r*(.5+.5*Math.random()))}plink(e,t){let n=this.ctx,i=n.createOscillator();i.type="sine";let r=700+Math.random()*900,o=.04+Math.random()*.05;i.frequency.setValueAtTime(r,e),i.frequency.exponentialRampToValueAtTime(r*(1.8+Math.random()*1.2),e+o);let a=n.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(t,e+.003),a.gain.exponentialRampToValueAtTime(.001,e+o),i.connect(a).connect(this.master),i.start(e),i.stop(e+o+.02)}start(){if(this.ctx){this.ctx.resume();return}let e=new AudioContext;this.ctx=e,this.master=e.createGain(),this.master.gain.value=this.muted?0:this.volume;let t=e.createDynamicsCompressor();t.threshold.value=-6,t.knee.value=6,t.ratio.value=12,t.attack.value=.003,t.release.value=.25,this.master.connect(t).connect(e.destination),this.noise=this.makeNoise(!1),this.brownNoise=this.makeNoise(!0),this.rainFilter=e.createBiquadFilter(),this.rainFilter.type="lowpass",this.rainBus=e.createGain(),this.rainBus.connect(this.master),this.rainGain=this.loop(this.noise,[this.highpass(400),this.rainFilter],this.rainBus),this.dropsGain=this.loop(this.noise,[this.bandpass(4500,.9)],this.rainBus),this.drizzleGain=this.loop(this.noise,[this.highpass(2500),this.lowpass(9e3)],this.rainBus),this.windFilter=this.bandpass(400,.9),this.windGain=this.loop(this.brownNoise,[this.windFilter]),this.sandGain=this.loop(this.noise,[this.bandpass(6e3,.7)]),this.rumbleFilter=this.lowpass(100),this.rumbleGain=this.loop(this.brownNoise,[this.rumbleFilter,this.lowpass(160)]),this.humGain=e.createGain(),this.humGain.gain.value=0;let n=e.createOscillator();n.type="sawtooth",n.frequency.value=100,n.connect(this.lowpass(700)).connect(this.humGain).connect(this.master),n.start(),this.waveFilter=this.lowpass(400),this.waveGain=this.loop(this.brownNoise,[this.waveFilter]),this.washGain=this.loop(this.noise,[this.highpass(1200),this.lowpass(6e3)]),this.staticFilter=this.bandpass(2e3,1.5),this.staticGain=this.loop(this.noise,[this.staticFilter]),this.whirlFilter=this.bandpass(800,1.4),this.whirlGain=this.loop(this.noise,[this.whirlFilter]),this.steamGain=this.loop(this.noise,[this.highpass(1500),this.lowpass(7e3)]),this.warpDroneGain=e.createGain(),this.warpDroneGain.gain.value=0,this.warpDroneGain.connect(this.master);for(let h of[73,74.5,110]){let d=e.createOscillator();d.frequency.value=h;let p=e.createGain();p.gain.value=h>100?.3:.5,d.connect(p).connect(this.warpDroneGain),d.start()}let i=this.bandpass(F0[0],1.4),r=e.createOscillator();r.type="sawtooth",r.frequency.value=k1;let o=e.createGain();o.gain.value=F0[1],r.connect(o).connect(i.frequency),r.start(),this.floatGain=this.loop(this.noise,[i]),this.mirageGain=e.createGain(),this.mirageGain.gain.value=0,this.mirageGain.connect(this.master);for(let h of[2900,2903,4350]){let d=e.createOscillator();d.frequency.value=h;let p=e.createGain();p.gain.value=h>4e3?.25:.5,d.connect(p).connect(this.mirageGain),d.start()}let a=e.createGain();a.gain.value=.6;let l=e.createOscillator();l.type="square",l.frequency.value=F1;let c=e.createGain();c.gain.value=.4,l.connect(c).connect(a.gain),l.start(),this.projectorGain=this.loop(this.noise,[this.bandpass(1600,1.5),a]),this.quakeGain=this.loop(this.brownNoise,[this.lowpass(110)]),this.roarFilter=this.lowpass(300),this.roarGain=this.loop(this.brownNoise,[this.roarFilter]),this.bloodDroneGain=e.createGain(),this.bloodDroneGain.gain.value=0,this.bloodDroneFilter=this.lowpass(220),this.bloodDroneFilter.connect(this.bloodDroneGain).connect(this.master);for(let[h,d]of[[41.2,1],[43.65,.7],[61.7,.35]]){let p=e.createOscillator();p.type="sawtooth",p.frequency.value=h;let f=e.createGain();f.gain.value=d*.35,p.connect(f).connect(this.bloodDroneFilter),p.start()}this.trafficFilter=this.lowpass(280),this.trafficGain=this.loop(this.brownNoise,[this.trafficFilter]),this.sizzleGain=this.loop(this.noise,[this.highpass(3500),this.lowpass(9e3)]),this.droneGain=e.createGain(),this.droneGain.gain.value=0;let u=this.lowpass(400);u.connect(this.droneGain).connect(this.master);for(let[h,d]of[[55,1],[55.6,.8],[41.2,.7],[77.8,.25]]){let p=e.createOscillator();p.type="triangle",p.frequency.value=h;let f=e.createGain();f.gain.value=d*.4,p.connect(f).connect(u),p.start()}this.rustleFilter=this.bandpass(4e3,.7),this.rustleGain=this.loop(this.noise,[this.highpass(1500),this.rustleFilter]),this.breathFilter=this.lowpass(250),this.breathGain=this.loop(this.brownNoise,[this.breathFilter]);for(let h of Y0){let d=this.bandpass(h.freq,h.q);this.howls.push({gain:this.loop(this.noise,[d]),filter:d})}this.swampFilter=this.bandpass(300,3),this.swampGain=this.loop(this.brownNoise,[this.swampFilter]),Object.keys(A0).forEach(h=>{Promise.all(A0[h].map(d=>fetch(d).then(p=>p.arrayBuffer()).then(p=>e.decodeAudioData(p)))).then(d=>this.steps[h]=d).catch(d=>console.warn(`Footstep sounds "${h}" not loaded`,d))})}loop(e,t,n=this.master){let i=this.ctx,r=i.createBufferSource();r.buffer=e,r.loop=!0;let o=i.createGain();o.gain.value=0;let a=r;for(let l of t)a=a.connect(l);return a.connect(o).connect(n),r.start(0,Math.random()*e.duration),o}highpass(e){let t=this.ctx.createBiquadFilter();return t.type="highpass",t.frequency.value=e,t}lowpass(e){let t=this.ctx.createBiquadFilter();return t.type="lowpass",t.frequency.value=e,t}bandpass(e,t){let n=this.ctx.createBiquadFilter();return n.type="bandpass",n.frequency.value=e,n.Q.value=t,n}makeNoise(e){let t=this.ctx,n=t.createBuffer(1,t.sampleRate*4,t.sampleRate),i=n.getChannelData(0),r=0;for(let o=0;o<i.length;o++){let a=Math.random()*2-1;e?(r=(r+.02*a)/1.02,i[o]=r*3.5):i[o]=a}if(e){let o=i[i.length-1]-i[0];for(let a=0;a<i.length;a++)i[a]-=o*a/(i.length-1)}return n}};var so=400,Is={minX:-240,maxX:240,minZ:-300,maxZ:140},zd=.25,ro={maxDrops:2500,speed:420,length:7,width:.35,color:14083839,opacity:.6,windSpeed:220,splashes:!0,top:260,followLight:!1},K0={maxDrops:3e3,speed:130,length:3.5,width:.5,color:15002870,opacity:.5,windSpeed:110,splashes:!1,top:90,followLight:!0},Z0=ht(Ve({},ro),{maxDrops:1800,speed:380,length:6,width:.5,color:10490908,opacity:.9,followLight:!0,splashColor:7997966}),$0=ht(Ve({},ro),{maxDrops:900,speed:520,length:1.8,width:1.1,color:16054527,opacity:.95,windSpeed:120,followLight:!0,splashColor:13161700}),J0=ht(Ve({},ro),{maxDrops:1200,color:16773312,opacity:.7,splashColor:11575408}),j0=ht(Ve({},ro),{maxDrops:2200,color:12904554,opacity:.8,followLight:!0,splashColor:5933600}),Q0=ht(Ve({},ro),{maxDrops:2e3,speed:340,length:6,width:.45,color:10898672,opacity:.85,followLight:!0,splashColor:6957728}),tw=new w(0,0,1),nw=new w(1,1,1),qi=class s{constructor(e,t,n=ro){this.surfaces=t;this.style=n;this.splashBaseColor=new x(n.splashColor??10467544);let i=n.maxDrops;this.dropX=new Float32Array(i),this.dropY=new Float32Array(i),this.dropZ=new Float32Array(i),this.dropStopY=new Float32Array(i),this.dropAlive=new Uint8Array(i),this.drops=s.makeDrops(n),this.splashes=s.makeSplashes(),this.drops.renderOrder=10,this.splashes.renderOrder=10,this.group.add(this.drops,this.splashes),this.group.visible=!1,e.add(this.group)}surfaces;style;group=new Pn;drops;splashes;dropX;dropY;dropZ;dropStopY;dropAlive;activeDrops=0;splashPos=new Float32Array(so*3);splashAge=new Float32Array(so).fill(zd);nextSplash=0;aliveSplashes=0;matrix=new Ie;scale=new w;position=new w;quaternion=new Ot;tilt=new Ot;vx=0;splashColor=new x;splashBaseColor;static makeDrops(e){let t=new it(e.width,e.length);t.translate(0,e.length/2,0);let n=t.getAttribute("position"),i=new Float32Array(n.count*4);for(let a=0;a<n.count;a++)i.set([1,1,1,n.getY(a)>e.length/2?0:1],a*4);t.setAttribute("color",new un(i,4));let r=new vt({color:e.color,vertexColors:!0,transparent:!0,opacity:e.opacity,depthWrite:!1});e.followLight?en(r):Nd(r);let o=new St(t,r,e.maxDrops);return o.instanceMatrix.setUsage(It),o.frustumCulled=!1,o.count=0,o}static makeSplashes(){let e=new Wo(.5,.9,10);e.rotateX(-Math.PI/2);let t=new vt({color:16777215,transparent:!0,blending:Ln,depthWrite:!1,fog:!1,side:Gt}),n=new St(e,t,so);n.instanceMatrix.setUsage(It),n.frustumCulled=!1;let i=new x(0),r=new Ie().makeScale(0,0,0);for(let o=0;o<so;o++)n.setMatrixAt(o,r),n.setColorAt(o,i);return n}update(e,t,n,i=0){this.vx=i*this.style.windSpeed,this.tilt.setFromAxisAngle(tw,Math.atan2(this.vx,this.style.speed));let r=Math.round(this.style.maxDrops*Vn.particles*F.clamp(n,0,1));for(let o=r;o<this.activeDrops;o++)this.dropAlive[o]=0;if(this.activeDrops=r,r===0&&this.aliveSplashes===0){this.group.visible=!1;return}this.group.visible=!0,this.updateDrops(e,t,r),this.updateSplashes(e)}updateDrops(e,t,n){for(let i=0;i<n;i++){this.dropAlive[i]||this.respawnDrop(i,t,!0),this.dropY[i]-=this.style.speed*e,this.dropX[i]+=this.vx*e;let o=this.dropX[i]+this.vx*Math.max(this.dropY[i]-this.dropStopY[i],0)/this.style.speed-t.x,a=this.dropZ[i]-t.z;o<Is.minX||o>Is.maxX||a<Is.minZ||a>Is.maxZ?this.respawnDrop(i,t,!0):this.dropY[i]<=this.dropStopY[i]&&(this.style.splashes&&this.addSplash(this.dropX[i],this.dropStopY[i],this.dropZ[i]),this.respawnDrop(i,t,!1)),this.position.set(this.dropX[i],this.dropY[i],this.dropZ[i]),this.matrix.compose(this.position,this.tilt,nw),this.drops.setMatrixAt(i,this.matrix)}this.drops.count=n,this.drops.instanceMatrix.needsUpdate=!0}respawnDrop(e,t,n){let i=t.x+F.randFloat(Is.minX,Is.maxX),r=t.z+F.randFloat(Is.minZ,Is.maxZ),o=t.y+this.style.top,a=this.surfaces.heightAt(i,r,t.y),l=n?F.randFloat(a,Math.max(o,a)):Math.max(o,a);this.dropX[e]=i-this.vx*(l-a)/this.style.speed,this.dropY[e]=l,this.dropZ[e]=r,this.dropStopY[e]=a,this.dropAlive[e]=1}addSplash(e,t,n){let i=this.nextSplash;this.nextSplash=(this.nextSplash+1)%so,this.splashPos[i*3]=e,this.splashPos[i*3+1]=t+.3,this.splashPos[i*3+2]=n,this.splashAge[i]=0}updateSplashes(e){let t=0;for(let n=0;n<so;n++){if(this.splashAge[n]>=zd)continue;this.splashAge[n]+=e;let i=Math.min(this.splashAge[n]/zd,1),r=i<1?.4+1.6*i:0;this.position.set(this.splashPos[n*3],this.splashPos[n*3+1],this.splashPos[n*3+2]),this.scale.set(r,r,r),this.matrix.compose(this.position,this.quaternion,this.scale),this.splashes.setMatrixAt(n,this.matrix),this.splashes.setColorAt(n,this.splashColor.copy(this.splashBaseColor).multiplyScalar(1-i)),i<1&&t++}this.aliveSplashes=t,this.splashes.instanceMatrix.needsUpdate=!0,this.splashes.instanceColor&&(this.splashes.instanceColor.needsUpdate=!0)}};var iw=2e3,Xi=4e3,Ls={minX:-240,maxX:240,minZ:-300,maxZ:140},sw=220,eg=[22,42],rw=60,Gd=3,ow=2.5,aw=1.6,tg=[.6,1.4];function lw(){let e=document.createElement("canvas");e.width=e.height=32;let t=e.getContext("2d"),n=t.createRadialGradient(32/2,32/2,0,32/2,32/2,32/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.5,"rgba(255,255,255,0.8)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,32,32);let i=new Ft(e);return i.colorSpace=pt,i}var Xc=class{constructor(e,t){this.surfaces=t;let n=new vt({map:lw(),color:16777215,transparent:!0,depthWrite:!1});en(n),this.flakes=new St(new it(1,1),n,Xi),this.flakes.instanceMatrix.setUsage(It),this.flakes.frustumCulled=!1,this.flakes.renderOrder=10,this.flakes.count=0,this.flakes.visible=!1,e.add(this.flakes)}surfaces;flakes;x=new Float32Array(Xi);y=new Float32Array(Xi);z=new Float32Array(Xi);stopY=new Float32Array(Xi);speed=new Float32Array(Xi);phase=new Float32Array(Xi);size=new Float32Array(Xi);alive=new Uint8Array(Xi);activeFlakes=0;time=0;vx=0;fallScale=1;stretch=1;matrix=new Ie;position=new w;scale=new w;update(e,t,n,i,r=0,o=1){this.vx=r*rw*o,this.fallScale=1+(o-1)*.6,this.stretch=1+(o-1)*.5*Math.min(Math.abs(r),1);let a=Math.min(Math.round(iw*Vn.particles*Math.max(n,0)),Xi);for(let l=a;l<this.activeFlakes;l++)this.alive[l]=0;if(this.activeFlakes=a,this.flakes.visible=a>0,!!a){this.time+=e;for(let l=0;l<a;l++){this.alive[l]||this.respawn(l,t,!0),this.y[l]-=this.speed[l]*this.fallScale*e,this.x[l]+=this.vx*e,this.z[l]+=Gd*e;let c=Math.max(this.y[l]-this.stopY[l],0)/(this.speed[l]*this.fallScale),u=this.x[l]+this.vx*c-t.x,h=this.z[l]+Gd*c-t.z;u<Ls.minX||u>Ls.maxX||h<Ls.minZ||h>Ls.maxZ?this.respawn(l,t,!0):this.y[l]<=this.stopY[l]&&this.respawn(l,t,!1);let d=Math.sin(this.time*aw+this.phase[l])*ow;this.position.set(this.x[l]+d,this.y[l],this.z[l]+d*.4),this.scale.set(this.size[l]*this.stretch,this.size[l],this.size[l]),this.matrix.compose(this.position,i.quaternion,this.scale),this.flakes.setMatrixAt(l,this.matrix)}this.flakes.count=a,this.flakes.instanceMatrix.needsUpdate=!0}}respawn(e,t,n){let i=t.x+F.randFloat(Ls.minX,Ls.maxX),r=t.z+F.randFloat(Ls.minZ,Ls.maxZ),o=t.y+sw,a=F.randFloat(eg[0],eg[1]),l=this.surfaces.heightAt(i,r,t.y),c=n?F.randFloat(l,Math.max(o,l)):Math.max(o,l),u=(c-l)/(a*this.fallScale);this.x[e]=i-this.vx*u,this.z[e]=r-Gd*u,this.y[e]=c,this.stopY[e]=l,this.speed[e]=a,this.phase[e]=Math.random()*Math.PI*2,this.size[e]=F.randFloat(tg[0],tg[1]),this.alive[e]=1}};var Yc=4,ng=1,ma="rainStop",Kc=class s{constructor(e){this.scene=e}scene;cache=new Map;age=ng;surfaces=[];raycaster=new er;rayOrigin=new w;down=new w(0,-1,0);update(e){if(this.age+=e,this.age<ng)return;this.age=0;let t=[];this.scene.traverse(i=>{i.userData[ma]&&s.parentsVisible(i)&&t.push(i)}),(t.length!==this.surfaces.length||t.some((i,r)=>i!==this.surfaces[r]))&&(this.surfaces=t,this.cache.clear())}static parentsVisible(e){for(let t=e.parent;t;t=t.parent)if(!t.visible)return!1;return!0}heightAt(e,t,n){let i=Math.round(e/Yc),r=Math.round(t/Yc),o=i*1000003+r,a=this.cache.get(o);if(a!==void 0)return a;this.rayOrigin.set(i*Yc,n+1e3,r*Yc),this.raycaster.set(this.rayOrigin,this.down),this.raycaster.far=2e3;let l=this.raycaster.intersectObjects(this.surfaces,!1)[0],c=l?l.point.y:n-50;return this.cache.set(o,c),c}};var Vd=24,ig=.5,cw=600,uw=.5,hw=new x(1,.9,.65),sg=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,dw=`
uniform sampler2D tDepth;
uniform sampler2DShadow tShadow;
uniform mat4 uShadowMatrix;
uniform mat4 uProjInv;
uniform mat4 uCamWorld;
uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform float uTime;
varying vec2 vUv;

// Interleaved gradient noise: per-pixel jitter of the march start, hides banding
float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
`+Od+`
void main() {
  // World position of the visible surface, rebuilt from the depth buffer
  float depth = texture(tDepth, vUv).r;
  vec4 view = uProjInv * vec4(vUv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  view /= view.w;
  vec3 world = (uCamWorld * view).xyz;

  vec3 ray = world - uCamPos;
  float len = min(length(ray), ${cw.toFixed(1)});
  vec3 dir = normalize(ray);

  float stepLen = len / ${Vd}.0;
  float t = stepLen * ign(gl_FragCoord.xy);
  float acc = 0.0;
  for (int i = 0; i < ${Vd}; i++) {
    vec3 p = uCamPos + dir * t;

    vec4 sc = uShadowMatrix * vec4(p, 1.0);
    sc.xyz /= sc.w;
    float lit = 1.0;
    if (all(greaterThan(sc.xyz, vec3(0.0))) && all(lessThan(sc.xyz, vec3(1.0)))) {
      lit = texture(tShadow, vec3(sc.xy, sc.z - 0.001));
    }

    // Only the beams glow (no uniform haze, which washed out the whole scene)
    acc += lit * beamPattern(p, uSunDir, uTime);
    t += stepLen;
  }

  gl_FragColor = vec4(vec3(acc / ${Vd}.0), 1.0);
}
`,pw=`
uniform sampler2D tScene;
uniform sampler2D tRays;
uniform vec3 uColor;
uniform float uIntensity;
varying vec2 vUv;
void main() {
  vec3 scene = texture2D(tScene, vUv).rgb;
  float rays = texture2D(tRays, vUv).r;
  // Screen blend: lights dark areas, barely touches bright ones (no washed-out look)
  vec3 light = uColor * rays * uIntensity;
  gl_FragColor = vec4(scene + light * (1.0 - clamp(scene, 0.0, 1.0)), 1.0);
  #include <colorspace_fragment>
}
`,Zc=class{sceneTarget;raysTarget;raysMaterial;compositeMaterial;quad;quadScene=new Ti;quadCamera=new Ci(-1,1,1,-1,0,1);size=new _e;constructor(){this.sceneTarget=new Qt(1,1,{type:on,depthTexture:new wi(1,1)}),this.raysTarget=new Qt(1,1,{type:on}),this.raysMaterial=new xn({vertexShader:sg,fragmentShader:dw,uniforms:{tDepth:{value:null},tShadow:{value:null},uShadowMatrix:{value:new Ie},uProjInv:{value:new Ie},uCamWorld:{value:new Ie},uCamPos:{value:new w},uSunDir:{value:new w(0,1,0)},uTime:{value:0}},depthTest:!1,depthWrite:!1}),this.compositeMaterial=new xn({vertexShader:sg,fragmentShader:pw,uniforms:{tScene:{value:this.sceneTarget.texture},tRays:{value:this.raysTarget.texture},uColor:{value:hw},uIntensity:{value:0}},depthTest:!1,depthWrite:!1}),this.quad=new bt(new it(2,2),this.raysMaterial),this.quad.frustumCulled=!1,this.quadScene.add(this.quad)}render(e,t,n,i,r,o,a=null){let l=i.shadow.map?.depthTexture;if(!l)return!1;this.resize(e),e.setRenderTarget(this.sceneTarget),e.render(t,n);let c=this.raysMaterial.uniforms;return c.tDepth.value=this.sceneTarget.depthTexture,c.tShadow.value=l,c.uShadowMatrix.value.copy(i.shadow.matrix),c.uProjInv.value.copy(n.projectionMatrixInverse),c.uCamWorld.value.copy(n.matrixWorld),c.uCamPos.value.setFromMatrixPosition(n.matrixWorld),c.uSunDir.value.copy(r),c.uTime.value=dn.uBeamTime.value,this.quad.material=this.raysMaterial,e.setRenderTarget(this.raysTarget),e.render(this.quadScene,this.quadCamera),this.compositeMaterial.uniforms.uIntensity.value=o*uw,this.quad.material=this.compositeMaterial,e.setRenderTarget(a),e.render(this.quadScene,this.quadCamera),e.setRenderTarget(null),!0}resize(e){e.getDrawingBufferSize(this.size);let{x:t,y:n}=this.size;(this.sceneTarget.width!==t||this.sceneTarget.height!==n)&&(this.sceneTarget.setSize(t,n),this.raysTarget.setSize(Math.max(1,Math.round(t*ig)),Math.max(1,Math.round(n*ig))))}};var fw=1.6,mw=.5,gw=.5,xw=.2,yw=.25,_w=[1,2,3],Wd=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Ew=`
uniform sampler2D tScene;
uniform float uThreshold;
uniform float uKnee;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tScene, vUv).rgb;
  float brightest = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + uKnee, brightest), 1.0);
}
`,vw=`
uniform sampler2D tInput;
uniform vec2 uStep;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tInput, vUv).rgb * 0.2270270270;
  c += (texture2D(tInput, vUv + uStep * 1.3846153846).rgb + texture2D(tInput, vUv - uStep * 1.3846153846).rgb) * 0.3162162162;
  c += (texture2D(tInput, vUv + uStep * 3.2307692308).rgb + texture2D(tInput, vUv - uStep * 3.2307692308).rgb) * 0.0702702703;
  gl_FragColor = vec4(c, 1.0);
}
`,bw=`
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform float uStrength;
varying vec2 vUv;
void main() {
  vec3 scene = texture2D(tScene, vUv).rgb;
  vec3 bloom = texture2D(tBloom, vUv).rgb;
  gl_FragColor = vec4(scene + bloom * uStrength, 1.0);
  #include <colorspace_fragment>
}
`,$c=class{sceneTarget=new Qt(1,1,{type:on});brightTarget=new Qt(1,1,{type:on,depthBuffer:!1});blurTargets=[new Qt(1,1,{type:on,depthBuffer:!1}),new Qt(1,1,{type:on,depthBuffer:!1})];brightMaterial;blurMaterial;compositeMaterial;quad;quadScene=new Ti;quadCamera=new Ci(-1,1,1,-1,0,1);size=new _e;constructor(){this.brightMaterial=new xn({vertexShader:Wd,fragmentShader:Ew,uniforms:{tScene:{value:this.sceneTarget.texture},uThreshold:{value:gw},uKnee:{value:xw}},depthTest:!1,depthWrite:!1}),this.blurMaterial=new xn({vertexShader:Wd,fragmentShader:vw,uniforms:{tInput:{value:null},uStep:{value:new _e}},depthTest:!1,depthWrite:!1}),this.compositeMaterial=new xn({vertexShader:Wd,fragmentShader:bw,uniforms:{tScene:{value:this.sceneTarget.texture},tBloom:{value:this.blurTargets[1].texture},uStrength:{value:0}},depthTest:!1,depthWrite:!1}),this.quad=new bt(new it(2,2),this.compositeMaterial),this.quad.frustumCulled=!1,this.quadScene.add(this.quad)}render(e,t,n,i,r=null){this.resize(e),e.setRenderTarget(this.sceneTarget),e.render(t,n),this.quad.material=this.brightMaterial,e.setRenderTarget(this.brightTarget),e.render(this.quadScene,this.quadCamera),this.quad.material=this.blurMaterial;let o=this.blurMaterial.uniforms,a=new _e(1/this.blurTargets[0].width,1/this.blurTargets[0].height),l=this.brightTarget.texture;for(let c of _w)o.tInput.value=l,o.uStep.value.set(a.x*c,0),e.setRenderTarget(this.blurTargets[0]),e.render(this.quadScene,this.quadCamera),o.tInput.value=this.blurTargets[0].texture,o.uStep.value.set(0,a.y*c),e.setRenderTarget(this.blurTargets[1]),e.render(this.quadScene,this.quadCamera),l=this.blurTargets[1].texture;this.quad.material=this.compositeMaterial,this.compositeMaterial.uniforms.uStrength.value=i*fw,e.setRenderTarget(r),e.render(this.quadScene,this.quadCamera),e.setRenderTarget(null)}resize(e){e.getDrawingBufferSize(this.size);let{x:t,y:n}=this.size;if(this.sceneTarget.width===t&&this.sceneTarget.height===n)return;let i=r=>[Math.max(1,Math.round(t*r)),Math.max(1,Math.round(n*r))];this.sceneTarget.setSize(t,n),this.brightTarget.setSize(...i(mw)),this.blurTargets.forEach(r=>r.setSize(...i(yw)))}};var Tw=.0022,Mw=new _e(26,60),Sw=1.8,ww=.3,qd=new x(1.06,1,.88),Cw=18,Rw=.05,Aw=.2,Pw=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Iw=`
uniform sampler2D tScene;
uniform float uHeat;
uniform float uWash;
uniform float uInvert;
uniform float uFilm;
uniform float uMirage;
uniform float uLantern;
uniform vec2 uLanternAt;
uniform float uTime;
uniform float uAspect;
uniform vec2 uScale;
uniform vec3 uTint;
varying vec2 vUv;

// Hash without sine: precise on phone GPUs too (see wbHash in weather-shader.ts)
float hhHash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hhNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hhHash(i), hhHash(i + vec2(1.0, 0.0)), f.x),
             mix(hhHash(i + vec2(0.0, 1.0)), hhHash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  // Rising wavy distortion, stronger far away (top of the screen) where the air layer looks thicker
  vec2 p = vec2(vUv.x * uAspect, vUv.y) * uScale - vec2(0.0, uTime * ${Sw.toFixed(2)});
  vec2 wave = vec2(hhNoise(p), hhNoise(p + vec2(17.3, 5.1))) - 0.5;
  float strength = uHeat * mix(0.35, 1.0, vUv.y);
  vec2 offset = wave * ${Tw.toFixed(4)} * 2.0 * strength * vec2(1.0 / uAspect, 1.0);
  // Old film: the frame number, and the picture jumping a little in the projector gate
  float frame = floor(uTime * ${Cw.toFixed(1)});
  offset.y += uFilm * (hhHash(vec2(frame, 9.0)) - 0.5) * 0.003;
  vec3 c = texture2D(tScene, vUv + offset).rgb;
  // Mirage: the whole picture doubles a little, the copy slowly drifting (the fake water is on the ground, see
  // the surface shader)
  if (uMirage > 0.0) {
    vec2 ghost = vec2(sin(uTime * 0.7), sin(uTime * 0.5 + 1.0)) * vec2(0.006, 0.003);
    c = mix(c, texture2D(tScene, vUv + offset + ghost).rgb, 0.25 * uMirage);
  }

  // Washed-out, warm colors
  float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(c, vec3(luma), ${ww.toFixed(2)} * uWash);
  c *= mix(vec3(1.0), uTint, uWash);

  // Inverted world: photographic negative, done in display (gamma) space so mid greys stay mid greys
  if (uInvert > 0.0) {
    vec3 shown = pow(max(c, 0.0), vec3(1.0 / 2.2));
    vec3 negative = pow(clamp(1.0 - shown, 0.0, 1.0), vec3(2.2));
    c = mix(c, negative, uInvert);
  }

  // Moonless night: pitch dark except a warm flickering lantern light around the player (an ellipse: the circle on
  // the ground seen in perspective). Very bright pixels (lit windows, glowing eyes) keep shining in the dark.
  if (uLantern > 0.0) {
    vec2 ld = (vUv - uLanternAt) * vec2(uAspect, 1.4);
    float flick = 1.0 + 0.05 * sin(uTime * 13.0) + 0.03 * sin(uTime * 29.0 + 1.0);
    float lit = 1.0 - smoothstep(${Rw.toFixed(3)}, ${Aw.toFixed(3)} * flick, length(ld));
    float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
    float keep = smoothstep(0.25, 0.7, luma);
    vec3 dark = c * mix(0.035, 1.0, keep);
    vec3 lantern = c * vec3(1.5, 1.15, 0.75) * 1.6;
    c = mix(c, mix(dark, lantern, lit), uLantern);
  }
  // Old film: black and white with a hint of sepia, grain, flicker, scratches, dust specks and a vignette.
  // Done in display (gamma) space, like a real print.
  if (uFilm > 0.0) {
    float s = pow(max(dot(c, vec3(0.2126, 0.7152, 0.0722)), 0.0), 1.0 / 2.2);
    s = smoothstep(0.04, 0.96, s);
    s *= 0.9 + 0.1 * hhHash(vec2(frame, 3.1));
    s += (hhHash(gl_FragCoord.xy + frame * 17.0) - 0.5) * 0.14;
    for (int i = 0; i < 2; i++) {
      float fi = float(i);
      float sx = hhHash(vec2(frame, fi * 7.0 + 2.0));
      float on = step(0.55, hhHash(vec2(frame, fi * 13.0 + 1.0)));
      s += on * 0.22 * (1.0 - smoothstep(0.0, 0.0012, abs(vUv.x - sx)));
    }
    float speck = step(0.9993, hhHash(floor(vUv * vec2(uAspect, 1.0) * 220.0) + frame * 3.7));
    s -= speck * 0.5;
    vec2 d = vUv - 0.5;
    s *= 1.0 - dot(d, d) * 1.4;
    vec3 film = pow(clamp(s * vec3(1.06, 1.0, 0.88), 0.0, 1.0), vec3(2.2));
    c = mix(c, film, uFilm);
  }
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}
`,Jc=class{sceneTarget=new Qt(1,1,{type:on});material;quadScene=new Ti;quadCamera=new Ci(-1,1,1,-1,0,1);size=new _e;constructor(){this.material=new xn({vertexShader:Pw,fragmentShader:Iw,uniforms:{tScene:{value:this.sceneTarget.texture},uHeat:{value:0},uWash:{value:0},uInvert:{value:0},uFilm:{value:0},uMirage:{value:0},uLantern:{value:0},uLanternAt:{value:new _e(.5,.5)},uTime:{value:0},uAspect:{value:1},uScale:{value:Mw},uTint:{value:new w(qd.r,qd.g,qd.b)}},depthTest:!1,depthWrite:!1});let e=new bt(new it(2,2),this.material);e.frustumCulled=!1,this.quadScene.add(e)}render(e,t,n){e.getDrawingBufferSize(this.size),(this.sceneTarget.width!==this.size.x||this.sceneTarget.height!==this.size.y)&&this.sceneTarget.setSize(this.size.x,this.size.y),t(this.sceneTarget);let i=this.material.uniforms;i.uHeat.value=n.heat,i.uWash.value=n.wash,i.uInvert.value=n.invert??0,i.uFilm.value=n.film??0,i.uMirage.value=n.mirage??0,i.uLantern.value=n.lantern??0,n.lanternAt&&i.uLanternAt.value.copy(n.lanternAt),i.uTime.value=n.time,i.uAspect.value=this.size.x/this.size.y,e.setRenderTarget(null),e.render(this.quadScene,this.quadCamera)}};var Bn={minX:-240,maxX:240,minZ:-300,maxZ:140},rg=2,Lw=40,Dw=10,og={maxParticles:240,color:16728096,intensity:2.2,rise:[5,12],wobble:1.8,wobbleSpeed:1.4,life:[3,7],size:[1.6,3],spawnHeight:[0,15],flicker:.35,flickerSpeed:9,nearPlants:0,windSpeed:25},ag={maxParticles:420,color:16742938,palette:[16756768,16730640,16765024],intensity:1.8,blending:"normal",rise:[10,22],wobble:1.2,wobbleSpeed:2,life:[1.5,4],size:[2.6,4.4],spawnHeight:[0,2],flicker:.5,flickerSpeed:12,nearPlants:0,windSpeed:20},lg={maxParticles:220,color:16773280,palette:[16777215,15269808],intensity:1.3,blending:"normal",rise:[-.6,.9],wobble:3,wobbleSpeed:.4,life:[6,12],size:[1.3,2.2],spawnHeight:[2,30],flicker:.3,flickerSpeed:1.5,nearPlants:.5,windSpeed:12},cg={maxParticles:700,color:9209988,palette:[6051926,11578020],intensity:1,blending:"normal",rise:[-14,-7],wobble:4,wobbleSpeed:.8,life:[6,11],size:[1.4,2.6],spawnHeight:[30,110],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:30},ug={maxParticles:600,color:7129343,palette:[14218495,3838207,10518783],intensity:2.2,blending:"normal",rise:[-9,-4],wobble:3,wobbleSpeed:.9,life:[6,12],size:[2.6,4.2],spawnHeight:[15,70],flicker:.8,flickerSpeed:9,nearPlants:0,windSpeed:25},hg={maxParticles:520,color:4249855,palette:[16736464,16764992,9466111,4259744,16777215],intensity:2.2,blending:"normal",rise:[-.8,.8],wobble:2,wobbleSpeed:.35,life:[5,10],size:[2.2,3.6],spawnHeight:[2,45],flicker:.95,flickerSpeed:11,nearPlants:0,windSpeed:8},dg={maxParticles:500,color:11819066,palette:[14188634,9059368,15245440],intensity:1,blending:"normal",rise:[-2.5,1.5],wobble:5,wobbleSpeed:.25,life:[10,18],size:[1.6,3],spawnHeight:[2,60],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:22},jc={maxParticles:420,color:4870724,palette:[4081210,5660240],intensity:.7,blending:"additive",followLight:!0,smoke:{spin:.6},rise:[5,9],wobble:1.5,wobbleSpeed:.8,life:[2,3.5],size:[5,8],spawnHeight:[0,1],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:18,stretchY:1.3,grow:2.6},pg=ht(Ve({},jc),{color:10123452,palette:[8676008,11571408],maxParticles:480}),fg=ht(Ve({},jc),{maxParticles:220,color:3949648,palette:[3423046,4739164],smoke:{spin:.25},rise:[2,4.5],wobble:5,wobbleSpeed:.35,life:[5,8],size:[13,19],stretchY:1.25,grow:2.2,windSpeed:10}),mg={maxParticles:200,color:394761,palette:[657936,263174],intensity:1,blending:"normal",smoke:{spin:.2},smokeOpacity:.7,rise:[.3,1.8],wobble:6,wobbleSpeed:.3,life:[4,7],size:[14,22],spawnHeight:[0,4],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:6,stretchY:.75,grow:1.6},gg={maxParticles:70,color:8024684,palette:[6971996,9077372],intensity:1,blending:"normal",followLight:!0,smoke:{spin:.08},smokeOpacity:.35,rise:[-.5,1.5],wobble:3,wobbleSpeed:.2,life:[7,11],size:[22,32],spawnHeight:[5,40],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:40,stretchY:.6,grow:1.7},xg={maxParticles:170,color:16054527,palette:[15265528,16777215],intensity:1,blending:"normal",followLight:!0,smoke:{spin:.05},smokeOpacity:.5,rise:[-.5,1.2],wobble:1.5,wobbleSpeed:1.2,life:[1.5,3],size:[16,26],spawnHeight:[0,5],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:170,stretchY:.35,grow:1.6},yg={maxParticles:700,color:7233614,palette:[5523514,9075302],intensity:1,blending:"normal",followLight:!0,rise:[-30,-14],wobble:1,wobbleSpeed:2,life:[1.2,2.2],size:[2,3.6],spawnHeight:[18,38],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:4},_g={maxParticles:260,color:9074784,palette:[7627854,10259058],intensity:1,blending:"normal",followLight:!0,smoke:{spin:.3},smokeOpacity:.65,rise:[2,5],wobble:2,wobbleSpeed:.6,life:[1.5,3],size:[11,17],spawnHeight:[0,1],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:10,stretchY:.7,grow:2},Xd={maxParticles:140,color:15791352,palette:[15002352,16777215],intensity:1,blending:"normal",followLight:!0,smoke:{spin:.3},smokeOpacity:.45,rise:[5,9],wobble:1.5,wobbleSpeed:.7,life:[2,3.5],size:[5,8],spawnHeight:[0,1],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:14,stretchY:1.2,grow:2.4},Eg=ht(Ve({},Xd),{maxParticles:420,smokeOpacity:.7,rise:[55,85],wobble:1,life:[1.1,1.8],size:[6,9],windSpeed:10,stretchY:1.5,grow:3.2}),vg={maxParticles:260,color:16769184,palette:[11587839,14205183,16777215],intensity:1.8,blending:"normal",rise:[-.3,.3],wobble:.8,wobbleSpeed:.15,life:[8,14],size:[1.4,2.6],spawnHeight:[2,50],flicker:.4,flickerSpeed:.8,nearPlants:0,windSpeed:1},bg={maxParticles:650,color:5917242,palette:[4077104,8023648,5134904],intensity:1,blending:"normal",followLight:!0,rise:[5,13],wobble:1.5,wobbleSpeed:.6,life:[5,9],size:[2.4,4.6],spawnHeight:[0,3],flicker:0,flickerSpeed:1,nearPlants:.2,windSpeed:3},Tg={maxParticles:500,color:15792383,palette:[16777215,13690104],intensity:1.3,blending:"normal",followLight:!0,stretchY:4,rise:[30,55],wobble:.2,wobbleSpeed:1,life:[1.5,2.5],size:[.9,1.4],spawnHeight:[0,1],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:6},Mg={maxParticles:160,color:13164799,palette:[16777215,8960255],intensity:2.4,rise:[8,30],wobble:4,wobbleSpeed:9,life:[.2,.6],size:[.7,1.4],spawnHeight:[0,3],flicker:.5,flickerSpeed:40,nearPlants:0,windSpeed:0},Sg={maxParticles:160,color:16052974,palette:[15265008,16775920],intensity:1,blending:"normal",followLight:!0,smoke:{spin:.03},rise:[-.3,.6],wobble:2,wobbleSpeed:.1,life:[10,18],size:[45,75],spawnHeight:[1,4],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:8,grow:1.3,smokeOpacity:.32,renderOrder:-1,flat:!0},wg={maxParticles:24,color:16054527,intensity:1,blending:"normal",followLight:!0,smoke:{spin:.8},rise:[1.5,3],wobble:.6,wobbleSpeed:1.5,life:[.9,1.5],size:[3,4.5],spawnHeight:[15,16],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:6,grow:2.2,smokeOpacity:.8,puff:!0},Cg={maxParticles:300,color:3814192,palette:[2893348,4866624],intensity:1,blending:"normal",followLight:!0,smoke:{spin:.4},rise:[8,12],wobble:1.2,wobbleSpeed:.5,life:[3.5,5.5],size:[9,13],spawnHeight:[0,1],flicker:0,flickerSpeed:1,nearPlants:0,windSpeed:26,stretchY:1.2,grow:3,smokeOpacity:.55},Rg={maxParticles:480,color:16762944,palette:[13144319,16773824,9482495],intensity:1.6,blending:"normal",rise:[-1,1.5],wobble:4,wobbleSpeed:.5,life:[7,13],size:[2.6,4.2],spawnHeight:[2,40],flicker:.6,flickerSpeed:4,nearPlants:0,windSpeed:10},Ag={maxParticles:260,color:13172554,intensity:3.2,rise:[-1.2,1.5],wobble:5,wobbleSpeed:.6,life:[6,12],size:[2,3.4],spawnHeight:[1,12],flicker:.85,flickerSpeed:1.6,nearPlants:.75,windSpeed:8},Pg={maxParticles:280,color:16740306,palette:[16753638,16732096],intensity:1.6,blending:"normal",rise:[-.8,1.6],wobble:5,wobbleSpeed:.55,life:[6,12],size:[3.2,5],spawnHeight:[1,18],flicker:.8,flickerSpeed:1.4,nearPlants:.6,windSpeed:8},Ig={maxParticles:210,color:4568219,palette:[7336144,3135152,11075560],intensity:2.4,rise:[12,22],wobble:1.5,wobbleSpeed:.8,life:[3,6],size:[1.8,3.2],spawnHeight:[0,4],flicker:.35,flickerSpeed:3,nearPlants:.2,windSpeed:6},Lg={maxParticles:320,color:7208858,palette:[11563263,5439448],intensity:1.15,blending:"normal",rise:[1.5,4],wobble:3.5,wobbleSpeed:.5,life:[8,14],size:[4.5,7.5],spawnHeight:[0,25],flicker:.35,flickerSpeed:1.2,nearPlants:.35,windSpeed:15};function Nw(s){let e=s.onBeforeCompile,t=s.customProgramCacheKey();s.onBeforeCompile=(n,i)=>{e.call(s,n,i),n.vertexShader=`attribute float aOpacity;
varying float vOpacity;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vOpacity = aOpacity;`),n.fragmentShader=`varying float vOpacity;
`+n.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
diffuseColor.a *= vOpacity;`)},s.customProgramCacheKey=()=>t+"-instance-opacity"}function cr(){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=7,i=()=>(n=n*16807%2147483647)/2147483647;for(let o=0;o<14;o++){let a=64*(.12+.18*i()),l=i()*Math.PI*2,c=64*.18*i(),u=64/2+Math.cos(l)*c,h=64/2+Math.sin(l)*c,d=t.createRadialGradient(u,h,0,u,h,a);d.addColorStop(0,`rgba(255,255,255,${.18+.12*i()})`),d.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=d,t.fillRect(0,0,64,64)}let r=new Ft(e);return r.colorSpace=pt,r}function Ow(){let e=document.createElement("canvas");e.width=e.height=32;let t=e.getContext("2d"),n=t.createRadialGradient(32/2,32/2,0,32/2,32/2,32/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,0.85)"),n.addColorStop(.6,"rgba(255,255,255,0.2)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,32,32);let i=new Ft(e);return i.colorSpace=pt,i}var Rt=class s{constructor(e,t,n){this.scene=e;this.surfaces=t;this.style=n;let i=n.maxParticles;this.x=new Float32Array(i),this.y=new Float32Array(i),this.z=new Float32Array(i),this.rise=new Float32Array(i),this.age=new Float32Array(i),this.life=new Float32Array(i),this.size=new Float32Array(i),this.phase=new Float32Array(i),this.alive=new Uint8Array(i),this.colorIndex=new Uint8Array(i),this.paletteColors=(n.palette??[]).map(c=>new x(c).multiplyScalar(n.intensity)),this.baseColor=new x(n.color).multiplyScalar(n.intensity),this.targetColor=this.baseColor.clone();let r=n.blending!=="normal",o=new vt({map:n.smoke?cr():Ow(),transparent:!0,blending:r?Ln:Cs,depthWrite:!1,fog:!1});n.followLight&&en(o);let a=!r&&!!n.smoke,l=new it(1,1);a&&(this.opacity=new bs(new Float32Array(i),1),this.opacity.setUsage(It),l.setAttribute("aOpacity",this.opacity),Nw(o)),this.mesh=new St(l,o,i),this.mesh.instanceMatrix.setUsage(It),this.mesh.setColorAt(0,this.baseColor),this.mesh.frustumCulled=!1,this.mesh.renderOrder=n.renderOrder??10,this.mesh.count=0,this.mesh.visible=!1,e.add(this.mesh)}scene;surfaces;style;mesh;x;y;z;rise;age;life;size;phase;alive;colorIndex;paletteColors;active=0;time=0;plants=[];plantsAge=rg;matrix=new Ie;position=new w;scale=new w;opacity;spin=new Ot;turned=new Ot;static FORWARD=new w(0,0,1);static UP=new w(0,1,0);static HIDDEN=new Ie().makeScale(0,0,0);static FLAT=new Ot().setFromAxisAngle(new w(1,0,0),-Math.PI/2);baseColor;targetColor;tmpColor=new x;setColor(e){this.targetColor.set(e).multiplyScalar(this.style.intensity)}update(e,t,n,i,r=0){let o=this.style,a=Math.round(o.maxParticles*Vn.particles*F.clamp(n,0,1));for(let u=a;u<this.active;u++)this.alive[u]=0;if(this.active=a,this.mesh.visible=a>0,!a)return;this.time+=e,this.baseColor.lerp(this.targetColor,1-Math.exp(-e*3));let l=r*o.windSpeed;o.nearPlants>0&&this.refreshPlants(e);let c=0;for(let u=0;u<a;u++){if(!this.alive[u]){if(this.spawnGate&&!this.spawnGate()||c>=Lw){this.hide(u);continue}c++,this.respawn(u,t,!this.spawnGate)}this.age[u]+=e,this.y[u]+=this.rise[u]*e,this.x[u]+=l*e;let h=this.x[u]-t.x,d=this.z[u]-t.z;if(this.age[u]>=this.life[u]||h<Bn.minX||h>Bn.maxX||d<Bn.minZ||d>Bn.maxZ){if(this.spawnGate&&!this.spawnGate()){this.alive[u]=0,this.hide(u);continue}this.respawn(u,t,!1)}let p=this.age[u]/this.life[u],f=1-o.flicker*(.5+.5*Math.sin(this.time*o.flickerSpeed+this.phase[u]*3)),_=(o.puff?p<.08?p/.08:Math.pow(1-(p-.08)/.92,2):Math.sin(Math.PI*p))*f,m=this.colorIndex[u]?this.paletteColors[this.colorIndex[u]-1]:this.baseColor,g=o.blending!=="normal";this.mesh.setColorAt(u,g?this.tmpColor.copy(m).multiplyScalar(_):m);let b=this.phase[u],C=this.time*o.wobbleSpeed+b;this.position.set(this.x[u]+Math.sin(C)*o.wobble,this.y[u],this.z[u]+Math.cos(C*.7)*o.wobble*.5);let T=1+((o.grow??1)-1)*(o.puff?1-(1-p)*(1-p):p),A=this.size[u]*T*(g||this.opacity?1:Math.sqrt(Math.max(_,0)));this.scale.set(A,A*(o.stretchY??1),A),o.flat?(this.spin.setFromAxisAngle(s.UP,this.phase[u]*3+this.age[u]*(o.smoke?.spin??0)),this.matrix.compose(this.position,this.turned.copy(this.spin).multiply(s.FLAT),this.scale)):o.smoke?(this.spin.setFromAxisAngle(s.FORWARD,this.phase[u]*3+this.age[u]*o.smoke.spin*(this.phase[u]>Math.PI?1:-1)),this.matrix.compose(this.position,this.turned.copy(i.quaternion).multiply(this.spin),this.scale)):this.matrix.compose(this.position,i.quaternion,this.scale),this.mesh.setMatrixAt(u,this.matrix),this.opacity?.setX(u,Math.max(_,0)*(o.smokeOpacity??1))}this.mesh.count=a,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor.needsUpdate=!0,this.opacity&&(this.opacity.needsUpdate=!0)}refreshPlants(e){if(this.plantsAge+=e,this.plantsAge<rg)return;this.plantsAge=0;let t=[];this.scene.traverseVisible(n=>{n.geometry?.getAttribute?.(Wi)&&t.push(...Oc(n))}),this.plants=t}spawnFilter;spawnAt;spawnGate;hide(e){this.mesh.setMatrixAt(e,s.HIDDEN),this.opacity?.setX(e,0)}spawnPoint(e){let t=this.spawnAt?.(e);if(t)return t;if(this.spawnFilter)for(let n=0;n<40;n++){let i=e.x+F.randFloat(Bn.minX,Bn.maxX),r=e.z+F.randFloat(Bn.minZ,Bn.maxZ);if(this.spawnFilter(i,r))return[i,r]}if(this.plants.length&&Math.random()<this.style.nearPlants)for(let n=0;n<6;n++){let i=this.plants[Math.floor(Math.random()*this.plants.length)],r=i.x-e.x,o=i.z-e.z;if(r>Bn.minX&&r<Bn.maxX&&o>Bn.minZ&&o<Bn.maxZ){let a=Math.random()*Math.PI*2,l=Math.random()*Dw;return[i.x+Math.cos(a)*l,i.z+Math.sin(a)*l]}}return[e.x+F.randFloat(Bn.minX,Bn.maxX),e.z+F.randFloat(Bn.minZ,Bn.maxZ)]}respawn(e,t,n){let i=this.style,[r,o]=this.spawnPoint(t),a=this.surfaces.heightAt(r,o,t.y);this.x[e]=r,this.z[e]=o,this.y[e]=a+F.randFloat(i.spawnHeight[0],i.spawnHeight[1]),this.rise[e]=F.randFloat(i.rise[0],i.rise[1]),this.life[e]=F.randFloat(i.life[0],i.life[1]),this.age[e]=n?Math.random()*this.life[e]:0,this.size[e]=F.randFloat(i.size[0],i.size[1]),this.phase[e]=Math.random()*Math.PI*2,this.colorIndex[e]=Math.floor(Math.random()*(this.paletteColors.length+1)),this.alive[e]=1}};var ei=450,mi={minX:-240,maxX:240,minZ:-300,maxZ:140},Dg=[18,55],Fw=.6,Hw=14,Ng=2,Og=[6,12],Uw=3,kw=45,Bw=3,Qc=1.8,Fg=[3,7],Hg=.8,zw={autumn:[3.2,4.8],cherry:[2.4,3.4]},xa={autumn:[14254635,12862763,15119165,11884074,10119983,9416768],cherry:[16761052,16756178,16767466,16751302,16773366]};function oo(s){let t=document.createElement("canvas");t.width=t.height=64;let n=t.getContext("2d");if(n.translate(64/2,64/2),n.fillStyle="#ffffff",n.beginPath(),s==="autumn")n.moveTo(0,-28),n.bezierCurveTo(22,-14,18,16,0,28),n.bezierCurveTo(-18,16,-22,-14,0,-28),n.fill(),n.strokeStyle="rgba(0,0,0,0.3)",n.lineWidth=3,n.beginPath(),n.moveTo(0,-22),n.lineTo(0,30),n.stroke();else{n.moveTo(0,28),n.bezierCurveTo(-26,10,-22,-24,-6,-26),n.lineTo(0,-18),n.lineTo(6,-26),n.bezierCurveTo(22,-24,26,10,0,28),n.fill();let r=n.createRadialGradient(0,22,0,0,22,26);r.addColorStop(0,"rgba(255,90,150,0.45)"),r.addColorStop(1,"rgba(255,90,150,0)"),n.fillStyle=r,n.fill()}let i=new Ft(t);return i.colorSpace=pt,i}var ga=class{constructor(e,t){this.scene=e;this.surfaces=t;this.material=en(new vt({map:this.textures.autumn,alphaTest:.5,side:Gt})),this.mesh=new St(new it(1,1),this.material,ei),this.mesh.instanceMatrix.setUsage(It),this.mesh.setColorAt(0,this.color.set(16777215)),this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,this.mesh.raycast=()=>{},this.mesh.count=0,this.mesh.visible=!1,e.add(this.mesh)}scene;surfaces;mesh;material;textures={autumn:oo("autumn"),cherry:oo("cherry")};mode="autumn";x=new Float32Array(ei);y=new Float32Array(ei);z=new Float32Array(ei);speed=new Float32Array(ei);size=new Float32Array(ei);phase=new Float32Array(ei);spin=new Float32Array(ei);rest=new Float32Array(ei);restTime=new Float32Array(ei);alive=new Uint8Array(ei);active=0;time=0;plants=[];plantsAge=Ng;matrix=new Ie;position=new w;scale=new w;quaternion=new Ot;euler=new Un;color=new x;setMode(e){if(e!==this.mode){this.mode=e,this.material.map=this.textures[e];for(let t=0;t<ei;t++)this.alive[t]&&this.pickLook(t);this.mesh.instanceColor.needsUpdate=!0}}update(e,t,n,i=0){let r=Math.round(ei*Vn.particles*F.clamp(n,0,1));for(let a=r;a<this.active;a++)this.alive[a]=0;if(this.active=r,this.mesh.visible=r>0,!r)return;this.time+=e,this.refreshPlants(e);let o=Math.sign(i||1)*Uw+i*kw;for(let a=0;a<r;a++){this.alive[a]||this.respawn(a,t,!0);let l=this.phase[a],c=this.size[a];if(this.rest[a]<0){let u=Math.sin(this.time*Qc+l);this.y[a]-=this.speed[a]*(.6+.4*Math.abs(Math.cos(this.time*Qc+l)))*e,this.x[a]+=(o+u*Bw*Qc*.5)*e,this.z[a]+=Math.cos(this.time*Qc*.7+l)*1.5*e;let h=this.time*this.spin[a]+l;this.euler.set(Math.sin(h)*1.2+.4,h*.8,Math.cos(h*1.3)*.9);let d=this.surfaces.heightAt(this.x[a],this.z[a],t.y);this.y[a]<=d&&(this.y[a]=d,this.rest[a]=0);let p=this.x[a]-t.x,f=this.z[a]-t.z;(p<mi.minX||p>mi.maxX||f<mi.minZ||f>mi.maxZ)&&this.respawn(a,t,!1)}else{this.rest[a]+=e,this.euler.set(-Math.PI/2,0,l*3);let u=this.restTime[a]-this.rest[a];u<=0?this.respawn(a,t,!1):u<Hg&&(c*=u/Hg)}this.position.set(this.x[a],this.y[a]+(this.rest[a]>=0?.15:0),this.z[a]),this.quaternion.setFromEuler(this.euler),this.scale.set(c,c,c),this.matrix.compose(this.position,this.quaternion,this.scale),this.mesh.setMatrixAt(a,this.matrix)}this.mesh.count=r,this.mesh.instanceMatrix.needsUpdate=!0}refreshPlants(e){if(this.plantsAge+=e,this.plantsAge<Ng)return;this.plantsAge=0;let t=[];this.scene.traverseVisible(n=>{n.geometry?.getAttribute?.(Wi)&&t.push(...Oc(n))}),this.plants=t}spawnPoint(e){if(this.plants.length&&Math.random()<Fw)for(let t=0;t<6;t++){let n=this.plants[Math.floor(Math.random()*this.plants.length)],i=n.x-e.x,r=n.z-e.z;if(i>mi.minX&&i<mi.maxX&&r>mi.minZ&&r<mi.maxZ){let o=Math.random()*Math.PI*2,a=Math.random()*Hw;return[n.x+Math.cos(o)*a,n.z+Math.sin(o)*a]}}return[e.x+F.randFloat(mi.minX,mi.maxX),e.z+F.randFloat(mi.minZ,mi.maxZ)]}pickLook(e){let t=xa[this.mode];this.mesh.setColorAt(e,this.color.set(t[Math.floor(Math.random()*t.length)]));let[n,i]=zw[this.mode];this.size[e]=F.randFloat(n,i)}respawn(e,t,n){let[i,r]=this.spawnPoint(t),o=this.surfaces.heightAt(i,r,t.y),a=o+F.randFloat(Dg[0],Dg[1]);this.x[e]=i,this.z[e]=r,this.y[e]=n?F.randFloat(o,a):a,this.speed[e]=F.randFloat(Og[0],Og[1]),this.phase[e]=Math.random()*Math.PI*2,this.spin[e]=F.randFloat(.8,2.2),this.rest[e]=-1,this.restTime[e]=F.randFloat(Fg[0],Fg[1]),this.pickLook(e),this.alive[e]=1,this.mesh.instanceColor.needsUpdate=!0}};var Yi={minX:-260,maxX:260,minZ:-300,maxZ:140},Gw=1400,Vw=70,Ww=[.5,35],qw=[130,220],Xw=[4,8],Yw=.5,Kw=[2,25],Zw=[40,80],$w=[28,55],Jw=.45,jw=.5,Qw=new w(0,0,1),eC=.6,tC=[15916206,15254666,16773327,14465152],nC=[14071432,13214580,14730396],eu=class{constructor(e,t,n){this.max=e;this.mesh=new St(new it(1,1),t,e),this.mesh.instanceMatrix.setUsage(It),this.mesh.setColorAt(0,new x(16777215)),this.mesh.frustumCulled=!1,this.mesh.raycast=()=>{},this.mesh.renderOrder=n,this.mesh.count=0,this.mesh.visible=!1,this.x=new Float32Array(e),this.y=new Float32Array(e),this.z=new Float32Array(e),this.speed=new Float32Array(e),this.length=new Float32Array(e),this.phase=new Float32Array(e),this.alive=new Uint8Array(e)}max;mesh;x;y;z;speed;length;phase;alive;active=0},tu=class s{constructor(e,t){this.surfaces=t;let n=en(new vt({transparent:!0,opacity:.85,depthWrite:!1})),i=en(new vt({map:cr(),transparent:!0,opacity:Jw,depthWrite:!1}));this.grains=new eu(Gw,n,10),this.puffs=new eu(Vw,i,11),e.add(this.grains.mesh,this.puffs.mesh)}surfaces;grains;puffs;time=0;matrix=new Ie;position=new w;scale=new w;color=new x;spin=new Ot;turned=new Ot;setTint(e){for(let t of[this.grains.mesh,this.puffs.mesh])t.material.userData.unlitBaseColor?.copy(e)}static sandWind(e){return Math.sign(e||1)*Math.max(Math.abs(e),eC)}update(e,t,n,i,r){this.time+=e;let o=s.sandWind(r);this.updateGroup(this.grains,e,t,n,i,o,!1),this.updateGroup(this.puffs,e,t,n,i,o,!0)}updateGroup(e,t,n,i,r,o,a){let l=Math.round(e.max*F.clamp(i,0,1));for(let u=l;u<e.active;u++)e.alive[u]=0;if(e.active=l,e.mesh.visible=l>0,!l)return;let c=Math.sign(o);for(let u=0;u<l;u++){e.alive[u]||this.respawn(e,u,n,a,c,!0),e.x[u]+=e.speed[u]*o*t;let h=e.phase[u],d=a?Math.sin(this.time*.4+h)*3:Math.sin(this.time*6+h)*.6,p=e.x[u]-n.x,f=e.z[u]-n.z;(p*c>Yi.maxX||p*c<Yi.minX-40||f<Yi.minZ||f>Yi.maxZ)&&this.respawn(e,u,n,a,c,!1),this.position.set(e.x[u],e.y[u]+d,e.z[u]),a?this.scale.set(e.length[u],e.length[u]*.6,1):this.scale.set(e.length[u]*(.5+.5*Math.abs(o)),Yw,1),a?(this.spin.setFromAxisAngle(Qw,h*3+this.time*jw*(h>Math.PI?1:-1)),this.matrix.compose(this.position,this.turned.copy(r.quaternion).multiply(this.spin),this.scale)):this.matrix.compose(this.position,r.quaternion,this.scale),e.mesh.setMatrixAt(u,this.matrix)}e.mesh.count=l,e.mesh.instanceMatrix.needsUpdate=!0}respawn(e,t,n,i,r,o){let a=o?F.randFloat(Yi.minX,Yi.maxX):-r*F.randFloat(Yi.maxX-30,Yi.maxX);e.x[t]=n.x+a,e.z[t]=n.z+F.randFloat(Yi.minZ,Yi.maxZ);let l=this.surfaces.heightAt(e.x[t],e.z[t],n.y),[c,u]=i?Kw:Ww,h=i?Math.random():Math.pow(Math.random(),2);e.y[t]=l+c+(u-c)*h;let[d,p]=i?Zw:qw;e.speed[t]=F.randFloat(d,p);let[f,_]=i?$w:Xw;e.length[t]=F.randFloat(f,_),e.phase[t]=Math.random()*Math.PI*2;let m=i?nC:tC;e.mesh.setColorAt(t,this.color.set(m[Math.floor(Math.random()*m.length)])),e.mesh.instanceColor.needsUpdate=!0,e.alive[t]=1}};var nu={minX:-240,maxX:240,minZ:-300,maxZ:140},iu=44,ao=7,iC=48,Ug=[.08,.32],kg=[2.5,8],sC=.6,rC=.9,oC=.65,aC=.035,lC=.45,cC=9,uC=new x(.75,.92,1).multiplyScalar(2.2),hC=new x(.35,.6,1).multiplyScalar(1.3),Bg=2;function dC(){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.35,"rgba(255,255,255,0.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64);let i=new Ft(e);return i.colorSpace=pt,i}var su=class{constructor(e,t){this.scene=e;this.surfaces=t;let n={transparent:!0,blending:Ln,depthWrite:!1,fog:!1};this.segments=new St(new it(1,1),new vt(Ve({},n)),iu*ao),this.glows=new St(new it(1,1),new vt(ht(Ve({},n),{map:dC()})),iu);for(let i of[this.segments,this.glows])i.instanceMatrix.setUsage(It),i.setColorAt(0,this.color.set(0)),i.frustumCulled=!1,i.raycast=()=>{},i.renderOrder=12,i.visible=!1,e.add(i)}scene;surfaces;segments;glows;arcs=[];spawnDebt=0;conductors=[];conductorAreas=[];conductorsAge=Bg;onArc;activity=0;matrix=new Ie;xAxis=new w;yAxis=new w;zAxis=new w;mid=new w;color=new x;get flicker(){return this.activity}update(e,t,n,i){if(this.activity=Math.max(0,this.activity-e*6),n<=.01&&!this.arcs.length){this.segments.visible=this.glows.visible=!1;return}for(this.refreshConductors(e),this.spawnDebt+=e*iC*n;this.spawnDebt>=1;)if(this.spawnDebt--,this.arcs.length<iu){let o=this.newArc(t);o&&(this.arcs.push(o),this.onArc?.(o.start,o.life),Math.random()<lC&&this.arcs.length<iu&&this.arcs.push(this.newArc(t,o.start)))}for(let o=this.arcs.length-1;o>=0;o--){let a=this.arcs[o];if(a.age+=e,a.jitterAge+=e,a.age>=a.life){this.arcs.splice(o,1);continue}a.jitterAge>=aC&&(a.jitterAge=0,this.zigzag(a))}i.getWorldDirection(this.zAxis).negate();let r=0;this.arcs.forEach((o,a)=>{let l=o.age/o.life,c=(l<.15?1:1-(l-.15)/.85)*(.7+.3*Math.random());this.color.copy(uC).multiplyScalar(c);for(let u=0;u<ao;u++){let h=o.points[u],d=o.points[u+1];this.xAxis.subVectors(d,h);let p=this.xAxis.length();this.xAxis.divideScalar(p||1),this.yAxis.crossVectors(this.zAxis,this.xAxis).normalize(),this.mid.addVectors(h,d).multiplyScalar(.5),this.matrix.makeBasis(this.xAxis.multiplyScalar(p),this.yAxis.multiplyScalar(oC),this.zAxis).setPosition(this.mid),this.segments.setMatrixAt(r,this.matrix),this.segments.setColorAt(r,this.color),r++}this.mid.addVectors(o.start,o.end).multiplyScalar(.5),this.matrix.compose(this.mid,i.quaternion,this.xAxis.setScalar(cC)),this.glows.setMatrixAt(a,this.matrix),this.glows.setColorAt(a,this.color.copy(hC).multiplyScalar(c)),this.activity=Math.max(this.activity,c*.5)}),this.segments.count=r,this.glows.count=this.arcs.length;for(let o of[this.segments,this.glows])o.visible=o.count>0,o.instanceMatrix.needsUpdate=!0,o.instanceColor.needsUpdate=!0}refreshConductors(e){if(this.conductorsAge+=e,this.conductorsAge<Bg)return;this.conductorsAge=0;let t=[];this.scene.traverseVisible(i=>{let r=i;r.isMesh&&r.material?.type==="MeshPhongMaterial"&&t.push(new nn().setFromObject(r))}),this.conductors=t;let n=0;this.conductorAreas=t.map(i=>n+=Math.max((i.max.x-i.min.x)*(i.max.z-i.min.z),1))}pickConductor(){let e=this.conductorAreas[this.conductorAreas.length-1];if(!e)return;let t=Math.random()*e;return this.conductors[this.conductorAreas.findIndex(n=>n>=t)]}newArc(e,t){let n=null;if(t)n=t.clone();else for(let l=0;l<6&&!n;l++){let c=this.pickConductor();if(!c)break;let u=F.randFloat(c.min.x,c.max.x),h=F.randFloat(c.min.z,c.max.z),d=u-e.x,p=h-e.z;d>nu.minX&&d<nu.maxX&&p>nu.minZ&&p<nu.maxZ&&(n=new w(u,this.surfaces.heightAt(u,h,e.y)+sC,h))}if(!n)return null;let i=Math.random()*Math.PI*2,r=F.randFloat(kg[0],kg[1]),o=n.clone().add(new w(Math.cos(i)*r,Math.random()*1.5,Math.sin(i)*r)),a={start:n,end:o,age:0,jitterAge:0,life:F.randFloat(Ug[0],Ug[1]),points:Array.from({length:ao+1},()=>new w)};return this.zigzag(a),a}zigzag(e){for(let t=0;t<=ao;t++){let n=t/ao,i=e.points[t].lerpVectors(e.start,e.end,n);if(t>0&&t<ao){let r=rC*Math.sin(Math.PI*n)+.2;i.x+=(Math.random()-.5)*2*r,i.y+=Math.random()*r,i.z+=(Math.random()-.5)*2*r}}}};var Yd=6,zg=[26,48],Gg=[8,18],Vg=[.25,.6],pC=5,fC=20,mC=new x(.9,.6,1.4),gC=new x(.45,.15,.8),xC=1.2;function yC(){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),n=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.3,"rgba(255,255,255,0.45)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64);let i=new Ft(e);return i.colorSpace=pt,i}var ru=class{mesh;wisps=Array.from({length:Yd},()=>({angle:Math.random()*Math.PI*2,speed:F.randFloat(Vg[0],Vg[1])*(Math.random()<.5?-1:1),radius:F.randFloat(zg[0],zg[1]),height:F.randFloat(Gg[0],Gg[1]),phase:Math.random()*10}));center=new w(NaN,0,0);time=0;matrix=new Ie;position=new w;scale=new w;color=new x;constructor(e){let t=new vt({map:yC(),transparent:!0,blending:Ln,depthWrite:!1,fog:!1});this.mesh=new St(new it(1,1),t,Yd*2),this.mesh.instanceMatrix.setUsage(It),this.mesh.setColorAt(0,this.color.set(0)),this.mesh.frustumCulled=!1,this.mesh.renderOrder=12,this.mesh.visible=!1,this.mesh.raycast=()=>{},e.add(this.mesh)}update(e,t,n,i){if(n<=.01){this.mesh.visible=!1,this.center.set(NaN,0,0);return}this.time+=e,isNaN(this.center.x)&&this.center.copy(t),this.center.lerp(t,1-Math.exp(-e*xC)),this.wisps.forEach((r,o)=>{r.angle+=r.speed*e;let a=this.time+r.phase,l=r.radius*(.85+.15*Math.sin(a*.5));this.position.set(this.center.x+Math.cos(r.angle)*l,this.center.y+r.height+Math.sin(a*1.3)*2.5,this.center.z+Math.sin(r.angle)*l*.75);let c=(.65+.35*Math.sin(a*7.3)*Math.sin(a*2.1))*(.6+.4*Math.sin(a*.4)),u=n*Math.max(c,.1);this.matrix.compose(this.position,i.quaternion,this.scale.setScalar(fC)),this.mesh.setMatrixAt(o*2,this.matrix),this.mesh.setColorAt(o*2,this.color.copy(gC).multiplyScalar(u)),this.matrix.compose(this.position,i.quaternion,this.scale.setScalar(pC)),this.mesh.setMatrixAt(o*2+1,this.matrix),this.mesh.setColorAt(o*2+1,this.color.copy(mC).multiplyScalar(u))}),this.mesh.count=Yd*2,this.mesh.visible=!0,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor.needsUpdate=!0}};var Wg=[-.75,.75],qg=[.1,.7],Xg=150,Yg=[.6,2.2],Kg=[1.1,1.7],Zg=[40,75],$g=[70,130],Jg=[42,64],jg=[1.4,2.4],_C=18,EC=1.1,Kd=1400,vC=2.6,bC=2.6,ou=[16728128,4259696,4890879,16764992,12607743,16777215,16740560,4255999],TC=2.4;function MC(){let e=document.createElement("canvas");e.width=e.height=32;let t=e.getContext("2d"),n=t.createRadialGradient(32/2,32/2,0,32/2,32/2,32/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.3,"rgba(255,255,255,0.6)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,32,32);let i=new Ft(e);return i.colorSpace=pt,i}var au=class{mesh;rockets=[];sparks=[];timer=.5;flash=0;flashColor=new x;onLaunch;onBurst;matrix=new Ie;scale=new w;color=new x;constructor(e){let t=new vt({map:MC(),transparent:!0,blending:Ln,depthWrite:!1,fog:!1});this.mesh=new St(new it(1,1),t,Kd),this.mesh.instanceMatrix.setUsage(It),this.mesh.setColorAt(0,this.color.set(0)),this.mesh.frustumCulled=!1,this.mesh.renderOrder=12,this.mesh.visible=!1,this.mesh.raycast=()=>{},e.add(this.mesh)}update(e,t,n,i){if(this.flash=Math.max(0,this.flash-e*2.2),n>.05&&(this.timer-=e*n,this.timer<=0&&(this.timer=F.randFloat(Yg[0],Yg[1]),this.launch(t,i))),!this.rockets.length&&!this.sparks.length){this.mesh.visible=!1;return}let r=0;for(let a=this.rockets.length-1;a>=0;a--){let l=this.rockets[a];l.age+=e;let c=Math.min(l.age/l.climb,1),u=1-(1-c)*(1-c),h=this.matrix.identity(),d=l.from.x+(l.to.x-l.from.x)*c,p=l.from.y+(l.to.y-l.from.y)*u,f=l.from.z+(l.to.z-l.from.z)*c;if(c>=1){this.burst(l.to,t),this.rockets.splice(a,1);continue}h.compose(new w(d,p,f),i.quaternion,this.scale.setScalar(bC)),this.mesh.setMatrixAt(r,h),this.mesh.setColorAt(r++,this.color.setRGB(1.6,1.3,.9))}let o=Math.exp(-EC*e);for(let a=this.sparks.length-1;a>=0;a--){let l=this.sparks[a];if(l.age+=e,l.age>=l.life){this.sparks.splice(a,1);continue}if(l.vel.multiplyScalar(o),l.vel.y-=_C*e,l.pos.addScaledVector(l.vel,e),r>=Kd)continue;let c=1-l.age/l.life,u=l.twinkle&&c<.6?Math.random()<.5?1:.15:1;this.matrix.compose(l.pos,i.quaternion,this.scale.setScalar(vC*(.5+.5*c))),this.mesh.setMatrixAt(r,this.matrix),this.mesh.setColorAt(r++,this.color.copy(l.color).multiplyScalar(TC*c*c*u))}this.mesh.count=r,this.mesh.visible=r>0,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor.needsUpdate=!0}launch(e,t){let n=e.y+F.randFloat(Zg[0],Zg[1]),i=new w(F.randFloat(Wg[0],Wg[1]),F.randFloat(qg[0],qg[1]),.5).unproject(t).sub(t.position).normalize();if(i.y>-.01)return;let r=(n-t.position.y)/i.y,o=t.position.clone().addScaledVector(i,r),a=new w(o.x+F.randFloatSpread(20),e.y,o.z+F.randFloatSpread(10)),l=F.randFloat(Kg[0],Kg[1]);this.rockets.push({from:a,to:o,age:0,climb:l}),this.onLaunch?.(l,F.clamp((o.x-e.x)/Xg,-1,1))}burst(e,t){let n=F.randInt($g[0],$g[1]),i=new x(ou[Math.floor(Math.random()*ou.length)]),r=Math.random()<.4?new x(ou[Math.floor(Math.random()*ou.length)]):i,o=F.randFloat(Jg[0],Jg[1]),a=Math.random()<.35;for(let c=0;c<n&&this.sparks.length<Kd;c++){let u=Math.random()*2-1,h=Math.random()*Math.PI*2,d=Math.sqrt(1-u*u),p=new w(d*Math.cos(h),u,d*Math.sin(h));this.sparks.push({pos:e.clone(),vel:p.multiplyScalar(o*F.randFloat(.85,1.05)),color:c%2?r:i,age:0,life:F.randFloat(jg[0],jg[1]),twinkle:a})}this.flashColor.copy(i).lerp(r,.5),this.flash=1;let l=Math.hypot(e.x-t.x,e.z-t.z);this.onBurst?.(F.clamp(1-l/300,.2,1),F.clamp((e.x-t.x)/Xg,-1,1))}};var SC=4,Ds={minX:-170,maxX:170,minZ:-190,maxZ:70},Zd=[6,16],Qg=[2.5,4.5],wC=60,CC=2.5,lu=class{geysers=[];onEruption;update(e,t,n){if(!n){this.geysers.length=0;return}for(let i=this.geysers.length-1;i>=0;i--){let r=this.geysers[i];(r.x-t.x<Ds.minX||r.x-t.x>Ds.maxX||r.z-t.z<Ds.minZ||r.z-t.z>Ds.maxZ)&&this.geysers.splice(i,1)}for(let i=0;this.geysers.length<SC&&i<20;i++){let r=t.x+F.randFloat(Ds.minX,Ds.maxX),o=t.z+F.randFloat(Ds.minZ,Ds.maxZ);this.geysers.every(a=>Math.hypot(a.x-r,a.z-o)>wC)&&this.geysers.push({x:r,z:o,timer:F.randFloat(1,Zd[1]),age:-1,length:0,power:0})}for(let i of this.geysers){if(i.age<0){i.timer-=e,i.power=0,i.timer<=0&&(i.age=0,i.length=F.randFloat(Qg[0],Qg[1]),this.onEruption?.(i));continue}i.age+=e;let r=i.age/i.length;if(r>=1){i.age=-1,i.timer=F.randFloat(Zd[0],Zd[1]),i.power=0;continue}i.power=Math.min(r/.08,1)*(r<.6?1:1-(r-.6)/.4)}}get eruptions(){return this.geysers.reduce((e,t)=>e+t.power,0)}spawnPoint(e){let t=e?this.geysers.filter(o=>o.power>.05):this.geysers;if(!t.length)return null;let n=t[0];if(e){let o=Math.random()*t.reduce((a,l)=>a+l.power,0);for(let a of t)if(o-=a.power,o<=0){n=a;break}}else n=t[Math.floor(Math.random()*t.length)];let i=Math.random()*Math.PI*2,r=Math.sqrt(Math.random())*CC;return[n.x+Math.cos(i)*r,n.z+Math.sin(i)*r]}nearestErupting(e,t){let n=null;for(let i of this.geysers)if(i.power>.3){let r=Math.hypot(i.x-e,i.z-t);(!n||r<n.distance)&&(n={geyser:i,distance:r})}return n}};var ds={minX:-220,maxX:220,minZ:-260,maxZ:120},$d=4,Jd=110,ex=[4,18],jd=45,RC=14,AC=2.6,tx=[6,14],PC=40,nx=12,ix=[2.2,3.4],cu=class{mesh;whirls=[];petals=Array.from({length:Jd},()=>({angle:Math.random()*Math.PI*2,h:Math.random(),climb:F.randFloat(tx[0],tx[1]),spin:F.randFloat(.7,1.3),size:F.randFloat(ix[0],ix[1]),tumble:Math.random()*10}));time=0;matrix=new Ie;position=new w;scale=new w;quaternion=new Ot;euler=new Un;color=new x;constructor(e){let t=en(new vt({map:oo("cherry"),alphaTest:.5,side:Gt}));this.mesh=new St(new it(1,1),t,$d*Jd),this.mesh.instanceMatrix.setUsage(It);let n=xa.cherry;for(let i=0;i<$d*Jd;i++)this.mesh.setColorAt(i,this.color.set(n[i%n.length]));this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,this.mesh.visible=!1,this.mesh.raycast=()=>{},e.add(this.mesh)}update(e,t,n,i){let r=Math.round($d*F.clamp(n,0,1));if(!r&&!this.whirls.length){this.mesh.visible=!1;return}this.time+=e;for(let l=this.whirls.length;l<r;l++)this.whirls.push(this.newWhirl(t,i,!0));let o=Math.sign(i||1),a=0;for(let l=this.whirls.length-1;l>=0;l--){let c=this.whirls[l];c.x+=(i*PC+Math.sin(this.time*.3+c.phase)*nx)*e,c.z+=Math.cos(this.time*.25+c.phase)*nx*e;let u=c.x-t.x,h=c.z-t.z,d=l>=r||u*o>ds.maxX||h<ds.minZ||h>ds.maxZ;if(c.presence=F.clamp(c.presence+(d?-e:e)*.6,0,1),d&&c.presence<=0){if(l>=r){this.whirls.splice(l,1);continue}this.whirls[l]=this.newWhirl(t,i,!1)}}for(let l of this.petals){let c=(l.h+this.time*l.climb/jd)%1;l.angle+=e*AC*l.spin*(1.4-c*.7)}for(let l of this.whirls)for(let c of this.petals){let u=(c.h+this.time*c.climb/jd)%1,h=F.lerp(ex[0],ex[1],u*u)*(.6+.4*l.presence),d=c.angle+l.phase;this.position.set(l.x+Math.cos(d)*h,t.y+RC+u*jd+Math.sin(this.time*2+c.tumble)*1.5,l.z+Math.sin(d)*h*.8);let p=this.time*3+c.tumble;this.euler.set(Math.sin(p)*1.3,p*.9,Math.cos(p*1.2)),this.quaternion.setFromEuler(this.euler);let f=Math.min(u*6,1,(1-u)*6)*l.presence;this.scale.setScalar(c.size*f),this.matrix.compose(this.position,this.quaternion,this.scale),this.mesh.setMatrixAt(a++,this.matrix)}this.mesh.count=a,this.mesh.visible=a>0,this.mesh.instanceMatrix.needsUpdate=!0}closeness(e,t){let n=0;for(let i of this.whirls){let r=Math.hypot(i.x-e.x,i.z-e.z);n=Math.max(n,Math.max(0,1-r/t)*i.presence)}return n}newWhirl(e,t,n){let i=Math.sign(t||1),r=n?F.randFloat(ds.minX,ds.maxX):i>0?ds.minX:ds.maxX;return{x:e.x+r,z:e.z+F.randFloat(ds.minZ*.7,ds.maxZ*.7),phase:Math.random()*100,presence:0}}};var uu=650,IC=260,hu=[7,70],du=2.2,sx=[10,46],rx=[14209220,12630188,15525080,11051156],ox=160,ax=[10,45],LC=90,lx=60,cx=[110,200],ux=16,Qd=.5,DC=240,NC=600,pu=class s{funnel;debris;puffs=Array.from({length:uu+lx},(e,t)=>({h:t<uu?Math.pow(Math.random(),.8):0,angle:Math.random()*Math.PI*2,jitter:Math.random(),ring:t>=uu}));heading=Math.random()*Math.PI*2;placed=!1;bits=Array.from({length:ox},()=>({angle:Math.random()*Math.PI*2,radius:F.randFloat(ax[0],ax[1]),h:Math.random(),climb:F.randFloat(.08,.25),tumble:Math.random()*10,size:F.randFloat(2.5,4.5)}));time=Math.random()*100;presence=0;position=new w;matrix=new Ie;pos=new w;scale=new w;quaternion=new Ot;euler=new Un;spin=new Ot;turned=new Ot;static FORWARD=new w(0,0,1);color=new x;constructor(e){let t=en(new vt({map:cr(),transparent:!0,opacity:.95,depthWrite:!1}));this.funnel=new St(new it(1,1),t,uu+lx),this.funnel.instanceMatrix.setUsage(It),this.puffs.forEach((r,o)=>this.funnel.setColorAt(o,this.color.set(rx[o%rx.length])));let n=en(new vt({map:oo("autumn"),alphaTest:.5,side:Gt}));this.debris=new St(new it(1,1),n,ox),this.debris.instanceMatrix.setUsage(It);let i=xa.autumn;this.bits.forEach((r,o)=>this.debris.setColorAt(o,this.color.set(i[o%i.length])));for(let r of[this.funnel,this.debris])r.frustumCulled=!1,r.visible=!1,r.raycast=()=>{},r.renderOrder=11,e.add(r)}get strength(){return this.presence}update(e,t,n,i,r){let o=this.placed&&Math.hypot(this.position.x-t.x,this.position.z-t.z)>NC;if(this.presence=F.clamp(this.presence+(n>.5&&!o?e:-e)*.25,0,1),this.presence<=0){this.funnel.visible=this.debris.visible=!1,this.placed=!1;return}this.time+=e;let a=this.time;this.move(e,t,r);let l=this.presence;this.puffs.forEach((c,u)=>{let h,d,p,f;if(c.ring){let _=c.angle+a*du*.8,m=hu[0]*2.5+c.jitter*18;h=Math.cos(_)*m,p=Math.sin(_)*m*.7,d=2+c.jitter*6,f=14+c.jitter*10}else{let _=c.h,m=(hu[0]+(hu[1]-hu[0])*Math.pow(_,1.6))*(.8+.4*c.jitter),g=c.angle+a*du*(1.3-.6*_),b=Math.sin(a*.4+_*2.5)*25*_;h=Math.cos(g)*m+b,p=Math.sin(g)*m*.7+Math.cos(a*.3+_*2)*12*_,d=_*IC,f=F.lerp(sx[0],sx[1],_)}this.pos.set(this.position.x+h,this.position.y+d,this.position.z+p),this.scale.setScalar(f*l),this.spin.setFromAxisAngle(s.FORWARD,c.jitter*20+a*du*(c.ring?1.5:1.6-c.h)),this.matrix.compose(this.pos,this.turned.copy(i.quaternion).multiply(this.spin),this.scale),this.funnel.setMatrixAt(u,this.matrix)}),this.bits.forEach((c,u)=>{let h=(c.h+a*c.climb)%1;c.angle+=e*du*1.4*(1.2-h*.5);let d=c.angle,p=c.radius*(1-.5*h);this.pos.set(this.position.x+Math.cos(d)*p,this.position.y+1+Math.sin(Math.PI*h)*LC,this.position.z+Math.sin(d)*p*.7);let f=a*5+c.tumble;this.euler.set(f,f*.7,f*1.3),this.quaternion.setFromEuler(this.euler),this.scale.setScalar(c.size*l),this.matrix.compose(this.pos,this.quaternion,this.scale),this.debris.setMatrixAt(u,this.matrix)}),this.funnel.visible=this.debris.visible=!0,this.funnel.instanceMatrix.needsUpdate=!0,this.debris.instanceMatrix.needsUpdate=!0}move(e,t,n){if(!this.placed){let o=F.randFloat(-Math.PI,0),a=F.randFloat(cx[0],cx[1]);this.position.set(t.x+Math.cos(o)*a,t.y,t.z+Math.sin(o)*a*.8),this.heading=Math.random()*Math.PI*2,this.placed=!0}this.heading+=Math.sin(this.time*.23)*Math.sin(this.time*.11+2)*Qd*2*e;let i=t.x-this.position.x,r=t.z-this.position.z;if(Math.hypot(i,r)>DC){let o=Math.atan2(r,i),a=Math.atan2(Math.sin(o-this.heading),Math.cos(o-this.heading));this.heading+=F.clamp(a,-Qd*e,Qd*e)}this.position.x+=(Math.cos(this.heading)*ux+n*8)*e,this.position.z+=Math.sin(this.heading)*ux*e,this.position.y+=(t.y-this.position.y)*Math.min(1,e*2)}};var OC=4,hx=[70,150],FC=50,dx=[8,18],HC=.35,UC=1.5,kC=4,px=[24,34],BC=.7;function zC(){let t=document.createElement("canvas");t.width=64,t.height=128;let n=t.getContext("2d");n.filter="blur(5px)";let i=n.createLinearGradient(0,30,0,128);i.addColorStop(0,"rgba(255,255,255,0.95)"),i.addColorStop(.6,"rgba(255,255,255,0.6)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.beginPath(),n.moveTo(64*.22,42),n.quadraticCurveTo(64*.5,30,64*.78,42),n.quadraticCurveTo(64*.86,80,64*.62,122),n.quadraticCurveTo(64*.5,108,64*.38,122),n.quadraticCurveTo(64*.14,80,64*.22,42),n.fill(),n.fillStyle="rgba(255,255,255,0.95)",n.beginPath(),n.ellipse(64*.5,24,11,13,0,0,Math.PI*2),n.fill();let r=new Ft(t);return r.colorSpace=pt,r}var fu=class{constructor(e){this.scene=e}scene;ghosts=[];texture=zC();spawnTimer=1;time=0;nearest=0;update(e,t,n){this.time+=e,this.nearest=0,n>.5&&(this.spawnTimer-=e,this.spawnTimer<=0&&this.ghosts.length<OC&&(this.spawnTimer=F.randFloat(2,6),this.ghosts.push(this.newGhost(t))));for(let i=this.ghosts.length-1;i>=0;i--){let r=this.ghosts[i];r.age+=e;let o=Math.hypot(r.sprite.position.x-t.x,r.sprite.position.z-t.z);if((o<FC||r.age>r.life||n<=.5)&&(r.vanishing=!0),r.alpha=r.vanishing?r.alpha-e*UC:Math.min(1,r.alpha+e*HC),r.alpha<=0){this.scene.remove(r.sprite),fa.delete(r.sprite.material),r.sprite.material.dispose(),this.ghosts.splice(i,1);continue}let a=this.time+r.phase;r.sprite.material.opacity=BC*r.alpha*(.8+.2*Math.sin(a*1.3)),r.sprite.position.x+=Math.sin(a*.4)*1.5*e,r.sprite.material.rotation=Math.sin(a*.6)*.06;let l=r.vanishing?1+(1-r.alpha)*.6:1,c=r.sprite.userData.size;r.sprite.scale.set(c*.5/l,c*l,1),this.nearest=Math.max(this.nearest,r.alpha*Math.max(0,1-o/160))}}newGhost(e){let t=en(new Ui({map:this.texture,transparent:!0,opacity:0,depthWrite:!1,color:16777215,fog:!1})),n=new us(t),i=F.randFloat(-Math.PI*1.1,Math.PI*.1),r=F.randFloat(hx[0],hx[1]),o=F.randFloat(px[0],px[1]);return n.userData.size=o,n.center.set(.5,0),n.position.set(e.x+Math.cos(i)*r,e.y+kC,e.z+Math.sin(i)*r*.7),n.renderOrder=11,n.raycast=()=>{},this.scene.add(n),{sprite:n,age:0,alpha:0,phase:Math.random()*10,vanishing:!1,life:F.randFloat(dx[0],dx[1])}}};var mu=1400,fx=4,GC=.12,VC=.2,WC=4026254,qC=.62;function XC(){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d");t.fillStyle="rgb(128,128,255)",t.fillRect(0,0,128,128);for(let i=0;i<90;i++){let r=Math.random()*128,o=Math.random()*128,a=4+Math.random()*12;for(let[l,c]of[[0,0],[128,0],[-128,0],[0,128],[0,-128]]){let u=t.createRadialGradient(r+l-a*.3,o+c-a*.3,0,r+l,o+c,a);u.addColorStop(0,"rgba(170,170,255,0.5)"),u.addColorStop(1,"rgba(90,90,255,0)"),t.fillStyle=u,t.fillRect(r+l-a,o+c-a,a*2,a*2)}}let n=new Ft(e);return n.wrapS=n.wrapT=ls,n.repeat.set(mu/40,mu/40),n}var gu=class{mesh;ripples;level=0;groundY=NaN;time=0;constructor(e){this.ripples=XC();let t=new js({color:WC,transparent:!0,opacity:qC,shininess:90,specular:10138824,normalMap:this.ripples,normalScale:new _e(.6,.6),depthWrite:!1});this.mesh=new bt(new it(mu,mu),t),this.mesh.rotation.x=-Math.PI/2,this.mesh.receiveShadow=!0,this.mesh.renderOrder=-1,this.mesh.visible=!1,this.mesh.raycast=()=>{},e.add(this.mesh)}get depth(){return this.level/fx}update(e,t,n,i,r){let o=fx*F.clamp(n,0,1);if(this.level=this.level<o?Math.min(o,this.level+e*GC):Math.max(o,this.level-e*VC),this.level<=.01){this.mesh.visible=!1,this.groundY=NaN;return}isNaN(this.groundY)&&(this.groundY=i),this.time+=e,this.mesh.visible=!0;let a=40;this.mesh.position.set(Math.round(t.x/a)*a,this.groundY+this.level,Math.round(t.z/a)*a),this.ripples.offset.set(this.time*(.004+.01*r),this.time*.006)}};var mx=900,gx=-900,YC=900,KC=900,xx=.55,ZC=.9,$C=.12,JC=.35;function ep(s,e){let t=(s%24+24)%24,n=Qn[1]-jn[0],i,r,o;t>=jn[0]&&t<Qn[1]?(i=(t-jn[0])/n,r=mx,o=gx):(i=(t-Qn[1]+24)%24/(24-n),r=gx,o=mx);let a=Math.sin(Math.PI*i);return e.set(F.lerp(r,o,i),YC*(xx+(1-xx)*a),KC)}var xu=.45,yu=1.5,yx=[2.5,8],jC=.9,QC=.8,eR=.07,tR=new x(10274047),nR=40,iR=25,sR=.45,rR=.3,oR=.4,aR=45,lR=30,cR=.1,uR=350,hR=110,dR=16,pR=3.2,_x=50,fR=16,mR=5,gR=.8,xR=20,yR=45,Ex=.4,_R=30,ER=20,vR=new x(1,1,1),vx=90,bx=[.4,3],bR=1100,TR=.35,MR=10,SR=90,tp=14,wR=1.2,CR=.25,RR=8,AR=2.5,Tx=1.6,PR=.08,IR=300,Mx=70,LR=.7,DR=160,NR=.55,OR=.6,FR=.9,Sx=3.2,HR=4,UR=22,wx=.6,kR=28,lo={minX:-240,maxX:240,minZ:-300,maxZ:140},_u=8,BR=40,zR=96,GR=.8,Cx=220,Rx=[7,18],Ax=[2,4.5],VR=60,WR=7,qR=1.4,Px=[.5,2.5],XR=.8,YR=2.5,KR=1,np=2.2,Ix=6,ZR=10,$R=.35,JR=.45,jR=.35,QR=new x(.42,.02,.03),eA=new x(.22,.04,.42),tA=new x(.2,.34,.04),Lx=new x,Dx=new x,nA=40,Nx=25,iA=90,Ox=22,sA=30,ip=20,rA=1.5,oA=.2,Fx=.35,aA=.55,lA=new x(8368874),Hx=new _e(1,.15).normalize(),cA=.6,uA=1.8,Ux=[3,9],kx=[1.5,3.5],hA=.12,dA=.7,pA=.45,fA=1.2,Bx=1.25,zx=.01,mA=.2,gA=.4,xA=212;function yA(s=0){let e=Math.random(),t=e<.3?F.randFloat(.7,1):e<.8?F.randFloat(.35,.7):Math.random()*.35,n=s+(1-s)*t,i=F.randFloat(-.8,.8),r=[{at:0,distance:n,pan:i}];return Math.random()<.15+.25*(1-n)&&r.push({at:F.randFloat(.35,1.4),distance:F.clamp(n+F.randFloat(-.2,.2),0,1),pan:F.clamp(i+F.randFloat(-.4,.4),-1,1)}),r}function Gx(s){let e=1-s.distance,t=s.distance>.7?1+Math.floor(Math.random()*2):1+Math.floor(Math.random()*(2+2*e)),n=[],i=s.at;for(let r=0;r<t;r++)n.push({start:i,peak:(.25+.75*e*e)*(r===0?1:F.randFloat(.55,1)),rise:F.lerp(.12,.02,e),decay:F.lerp(3.5,12,e)}),i+=F.randFloat(.06,.22);return n}var Eu=class{constructor(e){this.game=e;this.surfaces=new Kc(e.scene),this.rain=new qi(e.scene,this.surfaces),this.drizzle=new qi(e.scene,this.surfaces,K0),this.bloodRain=new qi(e.scene,this.surfaces,Z0),this.poisonRain=new qi(e.scene,this.surfaces,Q0),this.embers=new Rt(e.scene,this.surfaces,og),this.fireflies=new Rt(e.scene,this.surfaces,Ag),this.fairyLights=new Rt(e.scene,this.surfaces,Pg),this.risingEnergy=new Rt(e.scene,this.surfaces,Ig),this.lava=new Rt(e.scene,this.surfaces,ag),this.volcanoSmoke=new Rt(e.scene,this.surfaces,Cg),this.leaves=new ga(e.scene,this.surfaces),this.autumnLeaves=new ga(e.scene,this.surfaces),this.spores=new Rt(e.scene,this.surfaces,Lg),this.pollen=new Rt(e.scene,this.surfaces,lg),this.ashFall=new Rt(e.scene,this.surfaces,cg),this.ashSmoke=new Rt(e.scene,this.surfaces,gg),this.spindrift=new Rt(e.scene,this.surfaces,xg),this.quakeDebris=new Rt(e.scene,this.surfaces,yg),this.quakeDust=new Rt(e.scene,this.surfaces,_g),this.steam=new Rt(e.scene,this.surfaces,Xd),this.steam.spawnAt=()=>this.geysers.spawnPoint(!1),this.steamJet=new Rt(e.scene,this.surfaces,Eg),this.timeMotes=new Rt(e.scene,this.surfaces,vg),this.gravityPebbles=new Rt(e.scene,this.surfaces,bg),this.gravityDrops=new Rt(e.scene,this.surfaces,Tg),this.strikes=new kc(e.scene,this.surfaces),this.strikes.onStrike=t=>this.onGroundStrike(t),this.strikes.onCrackle=(t,n)=>{let i=this.playerPosition(),r=t.x-i.x,o=Math.max(0,1-Math.hypot(r,t.z-i.z)/DR);o>0&&this.audio.zap(o*n,F.clamp(r/60,-1,1),F.randFloat(.05,.25))},this.strikeSparks=new Rt(e.scene,this.surfaces,Mg),this.mist=new Rt(e.scene,this.surfaces,Sg),this.eyes=new zc(e.scene,this.surfaces),this.breath=new Rt(e.scene,this.surfaces,wg),this.breath.spawnAt=()=>{let t=this.playerPosition();return this.breathPos.subVectors(this.game.camera.position,t).setY(0).setLength(HR),[t.x+this.breathPos.x+F.randFloatSpread(.8),t.z+this.breathPos.z]},this.breath.spawnGate=()=>this.breathTokens<1?!1:(this.breathTokens--,!0),this.eyes.onFlee=t=>{let n=this.playerPosition(),i=t.x-n.x;this.audio.scurry(F.clamp(i/80,-1,1))},this.strikeSparks.spawnAt=()=>{let t=Math.random()*Math.PI*2,n=Math.random()*5;return[this.strikes.sparkAt.x+Math.cos(t)*n,this.strikes.sparkAt.z+Math.sin(t)*n]},this.steamJet.spawnAt=()=>this.geysers.spawnPoint(!0),this.geysers.onEruption=t=>{let n=this.playerPosition(),i=Math.hypot(t.x-n.x,t.z-n.z);this.audio.geyserBurst(Math.max(0,1-i/Cx),F.clamp((t.x-n.x)/150,-1,1))},this.quakeDebris.spawnAt=()=>{if(!this.wallFeet.length)return null;let[t,n]=this.wallFeet[Math.floor(Math.random()*this.wallFeet.length)];return[t+F.randFloatSpread(4),n+F.randFloatSpread(4)]},this.magicSnow=new Rt(e.scene,this.surfaces,ug),this.stardust=new Rt(e.scene,this.surfaces,Rg),this.crystals=new Rt(e.scene,this.surfaces,hg),this.marsDust=new Rt(e.scene,this.surfaces,dg),this.acidRain=new qi(e.scene,this.surfaces,j0),this.fumes=new Rt(e.scene,this.surfaces,jc),this.fumes.spawnFilter=(t,n)=>Fc(t,n,this.puddles),this.poisonFumes=new Rt(e.scene,this.surfaces,pg),this.hauntWisps=new Rt(e.scene,this.surfaces,fg),this.darkWisps=new Rt(e.scene,this.surfaces,mg),this.darkWisps.spawnAt=()=>{let t=this.playerPosition(),n=Math.random()*Math.PI*2,i=Fd*F.randFloat(.7,1.15);return[t.x+Math.cos(n)*i,t.z+Math.sin(n)*i]},this.poisonFumes.spawnFilter=(t,n)=>Fc(t,n,this.puddles),this.wisps=new ru(e.scene),this.fireworks=new au(e.scene),this.fireworks.onLaunch=(t,n)=>this.audio.rocketWhistle(t,n),this.fireworks.onBurst=(t,n)=>this.audio.fireworkBang(t,n),this.whirls=new cu(e.scene),this.tornado=new pu(e.scene),this.ghosts=new fu(e.scene),this.flood=new gu(e.scene),this.hail=new qi(e.scene,this.surfaces,$0),this.sunRain=new qi(e.scene,this.surfaces,J0),this.sand=new tu(e.scene,this.surfaces),this.electric=new su(e.scene,this.surfaces),this.electric.onArc=(t,n)=>{let i=this.game.mapHelper?.scenePlayer?.mesh?.position??this.game.getCameraTarget(),r=t.x-i.x,o=Math.hypot(r,t.z-i.z);if(o<vx){let a=1-o/vx;this.audio.zap(a*a,F.clamp(r/60,-1,1),n)}},this.snow=new Xc(e.scene,this.surfaces),e.scene.fog=this.sceneFog}game;weatherType="sunny";hour=12;target=Ld(lr.sunny);sunPos=ep(12,new w);sunTarget=new w;current=Ld(lr.sunny);audio=new qc;lastPlayerPos=new w(NaN,0,0);stepDistance=0;stillTime=0;stalkRadius=tp;stalkLastPos=new w(NaN,0,0);surfaces;rain;bloodRain;poisonRain;blood=0;drizzle;embers;fireflies;fairyLights;risingEnergy;lava;volcanoSmoke;leaves;autumnLeaves;spores;pollen;ashFall;ashSmoke;spindrift;quakeDebris;quakeDust;geysers=new lu;steam;steamJet;timeMotes;gravityPebbles;gravityDrops;wallFeet=[];wallFeetCenter=null;wallScan=null;strikes;strikeSparks;mist;eyes;breath;frostClimb=0;breathTime=0;breathTokens=0;breathPos=new w;lanternAt=new _e(.5,.5);lanternPos=new w;floatOffset=0;floatTime=0;quakeTimer=3;quakeAge=-1;quakeLength=0;quakePower=0;quakeShake=0;eruptionTension=0;shakeOffset=new w;magicSnow;stardust;crystals;marsDust;acidRain;fumes;poisonFumes;hauntWisps;darkWisps;wisps;fireworks;whirls;tornado;ghosts;flood;frostCover=0;flightTime=-1;flightCooldown=0;flightBaseY=0;flightSpin=0;cameraLift=0;dipTimer=1;dipAge=-1;dipLength=0;dipDepth=0;hail;sunRain;iceCover=0;sand;electric;snow;snowCover=0;sandCover=0;wetness=0;puddles=0;godRays=new Zc;bloom=new $c;heatHaze=new Jc;sunDir=new w;cloudVelocity=new _e;windX=0;targetWindX=0;baseWindX=0;gustsEnabled=!0;targetCloudDensity=.5;gustTimer=2;gustAge=-1;gustDuration=0;gustPeak=0;gustTime=0;tmpColor=new x;sceneFog=new Oo(16777215,0);lightningTimer=1;flashTime=-1;flashPulses=[];get type(){return this.weatherType}get temperature(){return this.current.temperature}get night(){return Dc(this.hour)}setWeather(e){this.weatherType=e}setWind(e){this.targetWindX=F.clamp(e,-1,1)}setFireflyColor(e){this.fireflies.setColor(e)}setLeafMode(e){this.leaves.setMode(e)}setCloudDensity(e){this.targetCloudDensity=F.clamp(e,0,1)}setGusts(e){this.gustsEnabled=e}setSoundVolume(e,t){this.audio.setVolume(e,t)}setHour(e){this.hour=(e%24+24)%24}update(e){this.game.camera.position.sub(this.shakeOffset),this.shakeOffset.set(0,0,0),this.blendParams(e),e*=1-GR*Math.min(this.current.timeWarp,1);let t=this.current,n=this.game.getCameraTarget();if(ep(this.hour,this.sunTarget),t.sunWander>.01){let C=dn.uBeamTime.value;this.sunTarget.x+=bR*t.sunWander*(.7*Math.sin(C*.11)+.3*Math.sin(C*.27+1))}this.sunPos.lerp(this.sunTarget,1-Math.exp(-e*yu));let i=this.sunDir.copy(this.sunPos).sub(n).normalize();if(i.y<xu){let C=Math.sqrt(1-xu*xu)/Math.hypot(i.x,i.z);i.set(i.x*C,xu,i.z*C)}this.game.placeSun(n,i);let r=this.updateLightning(e,t.lightning)*Math.min(Math.max(t.lightning,t.thunderRain),1),o=dn.uBeamTime.value,a=this.updateDips(e,t.flicker),l=(1+t.lightPulse*(.7*Math.sin(o*.8)+.3*Math.sin(o*2.3)))*(1-a),c=this.electric.flicker*Math.min(t.electric,1),u=this.fireworks.flash*this.fireworks.flash;this.game.ambientLight.intensity=Math.PI*(t.shadowLevel*l+jC*r+eR*c+TR*u),this.game.ambientLight.color.copy(t.ambientColor).lerp(tR,c*.3).lerp(t.lightningColor,r).lerp(this.fireworks.flashColor,u*.6),this.game.sun.color.copy(t.sunColor).lerp(t.lightningColor,r),this.tmpColor.copy(t.unlitTint).lerp(t.lightningColor,r),fa.forEach(C=>C.color.copy(this.tmpColor).multiply(C.userData.unlitBaseColor??vR)),this.game.sun.intensity=Math.PI*(Math.max(t.litLevel-t.shadowLevel,0)*l+QC*r)/i.y;let h=dn;h.uSunDir.value.copy(i),h.uCloudCover.value=t.cloudCover,h.uSpecular.value=t.specular,h.uCloudAmbient.value=t.cloudAmbient,h.uSunGlow.value=t.sunGlow,h.uBeamTime.value+=e,h.uBeamLight.value=t.godRays,h.uWindowGlow.value=t.windowGlow*(1-Math.min(a*1.5,1)),h.uWindowTint.value.copy(t.windowTint),h.uAurora.value=t.aurora;let d=Math.sign(this.targetWindX||1)*Math.max(Math.abs(this.targetWindX),t.minWind);this.baseWindX+=(d-this.baseWindX)*(1-Math.exp(-e*yu)),this.windX=F.clamp(this.baseWindX+this.updateGusts(e),-Bx,Bx);let p=Math.abs(this.windX),f=Math.min(Math.abs(this.baseWindX),1),_=t.cloudSpeed*F.lerp(cA,uA,f);this.cloudVelocity.set(Hx.x*Math.sign(this.baseWindX||1),Hx.y).multiplyScalar(_),h.uCloudDensity.value+=(this.targetCloudDensity-h.uCloudDensity.value)*(1-Math.exp(-e*yu)),h.uCloudOffset.value.addScaledVector(this.cloudVelocity,-e*h.uCloudScale.value),h.uWindX.value=this.windX,this.updateFog(e,t,p),h.uFlutterPhase.value=(h.uFlutterPhase.value+e*(2.5+5*p))%(Math.PI*2),(t.rain>0||t.bloodRain>0||t.poisonRain>0||t.drizzle>0||t.snow>0||t.embers>0||t.lava>0||t.fireflies>0||t.fairyLights>0||t.risingEnergy>0||t.leaves>0||t.autumnLeaves>0||t.spores>0||t.pollen>0||t.ash>0||t.magicSnow>0||t.stardust>0||t.crystals>0||t.marsDust>0||t.acidRain>0||t.fumes>0||t.poisonFumes>0||t.haunt>0||t.darkness>0||t.quake>0||t.geysers>0||t.timeWarp>0||t.antigravity>0||t.thunderRain>0||t.morningMist>0||t.moonless>0||t.deepFreeze>0||t.hail>0||t.sunRain>0||t.sand>0||t.electric>0)&&this.surfaces.update(e),this.rain.update(e,n,t.rain,this.windX),this.bloodRain.update(e,n,t.bloodRain,this.windX),this.poisonRain.update(e,n,t.poisonRain,this.windX),this.drizzle.update(e,n,t.drizzle,this.windX),this.embers.update(e,n,t.embers,this.game.camera,this.windX),this.fireflies.update(e,n,t.fireflies,this.game.camera,this.windX),this.fairyLights.update(e,n,t.fairyLights,this.game.camera,this.windX),this.risingEnergy.update(e,n,t.risingEnergy,this.game.camera,this.windX);let m=(1+t.eruption*(XR*this.eruptionTension+YR*this.quakeShake))/(1+t.eruption*KR);this.lava.update(e,n,t.lava*m,this.game.camera,this.windX),this.volcanoSmoke.update(e,n,t.lava*m,this.game.camera,this.windX),this.leaves.update(e,n,t.leaves,this.windX),this.autumnLeaves.update(e,n,t.autumnLeaves,this.windX),this.spores.update(e,n,t.spores,this.game.camera,this.windX),this.pollen.update(e,n,t.pollen,this.game.camera,this.windX),this.ashFall.update(e,n,t.ash,this.game.camera,this.windX),this.ashSmoke.update(e,n,t.ash,this.game.camera,this.windX),this.spindrift.update(e,n,F.clamp((t.snowDrift-1)/2.5,0,1),this.game.camera,this.windX),this.magicSnow.update(e,n,t.magicSnow,this.game.camera,this.windX),this.stardust.update(e,n,t.stardust,this.game.camera,this.windX),this.crystals.update(e,n,t.crystals,this.game.camera,this.windX),this.marsDust.update(e,n,t.marsDust,this.game.camera,this.windX),this.acidRain.update(e,n,t.acidRain,this.windX),this.fumes.update(e,n,t.fumes*Math.min(this.wetness*1.5,1),this.game.camera,this.windX),this.poisonFumes.update(e,n,t.poisonFumes*Math.min(this.wetness*1.5,1),this.game.camera,this.windX),this.hauntWisps.update(e,n,t.haunt,this.game.camera,this.windX),this.darkWisps.update(e,n,Math.max(0,t.darkness-.6)/.4,this.game.camera,this.windX),this.wisps.update(e,this.playerPosition(),t.curse,this.game.camera),this.fireworks.update(e,n,t.fireworks,this.game.camera),this.whirls.update(e,n,t.petalWhirl,this.windX),this.tornado.update(e,this.playerPosition(),t.tornado,this.game.camera,this.windX),this.updateFlight(e),t.eruption>.01?this.eruptionTension=Math.min(1,this.eruptionTension+e*t.eruption/VR):this.eruptionTension=0;let g=t.eruption>.01?F.lerp(Px[0],Px[1],this.eruptionTension):1;this.quakeShake=this.updateQuake(e,t.quake*g),this.updateWallFeet(n,t.quake>.05||t.thunderRain>.05),this.quakeDebris.update(e,n,this.quakeShake,this.game.camera,this.windX),this.quakeDust.update(e,n,this.quakeShake,this.game.camera,this.windX),this.geysers.update(e,n,t.geysers>.5),this.steam.update(e,n,Math.min(t.geysers,1),this.game.camera,this.windX),this.steamJet.update(e,n,Math.min(this.geysers.eruptions/2,1),this.game.camera,this.windX),this.timeMotes.update(e,n,t.timeWarp,this.game.camera,this.windX),this.gravityPebbles.update(e,n,t.antigravity,this.game.camera,this.windX),this.gravityDrops.update(e,n,t.antigravity,this.game.camera,this.windX),this.strikes.update(e,n,this.playerPosition(),t.thunderRain,this.game.camera),this.strikeSparks.update(e,n,this.strikes.sparks,this.game.camera,0),this.mist.update(e,n,t.morningMist,this.game.camera,this.windX),this.eyes.update(e,n,this.playerPosition(),t.moonless,this.game.camera),this.breathTime+=e;let b=this.breathTime%Sx/Sx;this.breathTokens=b<.3?Math.min(this.breathTokens+e*UR,3):0,this.breath.update(e,n,t.deepFreeze,this.game.camera,this.windX),this.frostClimb=t.deepFreeze>.05?Math.min(kR,this.frostClimb+e*t.deepFreeze*wx):Math.max(0,this.frostClimb-e*wx*3),dn.uFrostClimb.value=this.frostClimb,this.updateFloat(e,t.antigravity),this.ghosts.update(e,this.playerPosition(),t.haunt),this.flood.update(e,n,t.flood,this.surfaces.heightAt(n.x,n.z,n.y),this.windX),this.frostCover=t.frost>.05?Math.min(1,this.frostCover+e*t.frost/aR):Math.max(0,this.frostCover-e/lR),h.uFrost.value=this.frostCover,h.uIridescence.value=t.iridescence,h.uAuroraRed.value=t.auroraRed,this.hail.update(e,n,t.hail,this.windX),this.sunRain.update(e,n,t.sunRain,this.windX),this.sand.setTint(t.sandTint),this.sand.update(e,n,t.sand,this.game.camera,this.windX),this.electric.update(e,n,t.electric,this.game.camera),this.snow.update(e,n,t.snow,this.game.camera,this.windX,t.snowDrift),this.snowCover=t.snow>.05?Math.min(1,this.snowCover+e*t.snow/nR):Math.max(0,this.snowCover-e/iR),h.uSnowCover.value=this.snowCover,this.iceCover=t.ice>.05?Math.min(1,this.iceCover+e*t.ice/xR):Math.max(0,this.iceCover-e/yR),h.uIce.value=this.iceCover,this.sandCover=t.sand>.05?Math.min(1,this.sandCover+e*t.sand/_R):Math.max(0,this.sandCover-e/ER),h.uSandCover.value=this.sandCover,h.uSandColor.value.copy(t.sandColor),this.updatePuddles(e,t),this.audio.update(e,{rain:Math.min(t.rain+t.bloodRain+t.poisonRain+t.acidRain+t.sunRain*.6+t.hail*.05,1),drizzle:t.drizzle,wind:Math.abs(this.windX),sand:t.sand,lava:t.lava*(1+.5*t.eruption*this.eruptionTension),poison:Math.max(t.poisonRain>0?Math.min(t.poisonRain/.6,1):0,jR*Math.min(t.spores,1)),howl:F.clamp((t.snowDrift-1)/2.5,0,1)*Math.min(Math.abs(this.windX),1),darkness:t.darkness,forest:t.canopy,daylight:Lc(this.hour),hail:t.hail,sea:t.sea,birds:t.birds,chimes:Math.max(t.magicSnow*sR,t.stardust*rR,t.crystals*oR),static:t.flicker,whispers:Math.max(t.curse,t.haunt*.6),crackle:this.frostCover>.05&&t.frost>.05?.5+.5*this.frostCover:0,moan:t.haunt>.3?.35+.65*this.ghosts.nearest:0,lapping:Math.max(Math.min(this.flood.depth*1.5,1)*.5,t.tide*.35),roar:this.tornado.strength*Math.max(0,1-Math.hypot(this.tornado.position.x-this.playerPosition().x,this.tornado.position.z-this.playerPosition().z)/uR),ashCrackle:Math.min(t.ash,1),whirl:Math.max(t.petalWhirl>.05?this.whirls.closeness(this.playerPosition(),hR):0,this.flightTime>=0?1:0),bloodMoon:Math.min(t.embers,1),quake:this.quakeShake,steam:this.steamLevel(),timeWarp:t.timeWarp,antigravity:t.antigravity,oldFilm:t.oldFilm,mirage:t.mirage,deepFreeze:t.deepFreeze,inverted:t.invert,frogs:t.frogs,crickets:t.crickets,city:t.city,sizzle:t.acidRain>.05?Math.min(t.acidRain/.7,1)*Math.min(this.wetness*1.5,1):0}),this.updateFootsteps(e)}updateFog(e,t,n){let i=dn;i.uFog.value=t.fog,i.uCanopy.value=t.canopy,i.uDarkness.value=t.darkness,i.uStalk.value=t.stalkingFog,i.uMirage.value=t.mirage,this.updateStalkingFog(e,t.stalkingFog),i.uDarkCenter.value.copy(this.game.getCameraTarget()),i.uFogColor.value.copy(t.fogColor);let r=F.lerp(zx,mA,n)*Math.sign(this.windX||1);i.uFogOffset.value.x-=r*e,i.uFogOffset.value.y-=zx*.5*e;let o=Math.min(t.fog*gA,.95);this.sceneFog.density=o>.001?Math.sqrt(-Math.log(1-o))/xA:0,this.sceneFog.color.copy(i.uFogColor.value)}renderPostEffects(){let e=this.game,t=this.current,n=o=>Vn.postEffects&&t.godRays>=.01&&this.godRays.render(e.renderer,e.scene,e.camera,e.sun,this.sunDir,t.godRays,o)?!0:Vn.postEffects&&t.windowGlow>=.01?(this.bloom.render(e.renderer,e.scene,e.camera,t.windowGlow,o),!0):o?(e.renderer.setRenderTarget(o),e.renderer.render(e.scene,e.camera),e.renderer.setRenderTarget(null),!0):!1;t.moonless>=.01&&(this.lanternPos.copy(this.playerPosition()).y+=8,this.lanternPos.project(e.camera),this.lanternAt.set(this.lanternPos.x*.5+.5,this.lanternPos.y*.5+.5));let i=t.invert>=.01||t.oldFilm>=.01||t.mirage>=.01||t.moonless>=.01,r=Vn.postEffects&&(t.heatHaze>=.01||t.heatWash>=.01);return i||r?(this.heatHaze.render(e.renderer,n,{heat:t.heatHaze,wash:t.heatWash,time:dn.uBeamTime.value,invert:t.invert,film:t.oldFilm,mirage:t.mirage,lantern:t.moonless,lanternAt:this.lanternAt}),!0):n(null)}updateStalkingFog(e,t){let n=this.playerPosition(),i=Math.hypot(n.x-this.stalkLastPos.x,n.z-this.stalkLastPos.z);if(this.stalkLastPos.copy(n),t<.01){this.stalkRadius=tp;return}let r=i>0&&i<ip,o=r?SR:tp,a=r?wR:CR;this.stalkRadius+=(o-this.stalkRadius)*(1-Math.exp(-a*e)),dn.uStalkRadius.value=this.stalkRadius}updateFootsteps(e){let t=this.game.mapHelper?.scenePlayer.mesh;if(!t)return;let n=t.position,i=Math.hypot(n.x-this.lastPlayerPos.x,n.z-this.lastPlayerPos.z);if(this.lastPlayerPos.copy(n),!(i>0)||i>ip){this.stillTime+=e,(this.stillTime>oA||i>ip)&&(this.stepDistance=Ox*.75);return}this.stillTime=0;let r=i>rA;if(this.stepDistance+=i,this.stepDistance<(r?sA:Ox))return;this.stepDistance=0;let o=this.flood.depth>cR,a=o||Fc(n.x,n.z,this.puddles)&&this.snowCover<Fx,l="ground";!o&&(this.snowCover>=Fx||this.iceCover>=Ex||this.frostCover>=Ex)?l="snow":(a||this.wetness>=aA)&&(l="water"),this.audio.footstep(l,a,r)}updatePuddles(e,t){let n=Math.max(t.rain,t.bloodRain,t.poisonRain,t.acidRain,t.sunRain*.6,t.drizzle*.5);if(n>.05){let o=t.bloodRain+t.poisonRain+t.acidRain,a=t.rain+t.sunRain+t.drizzle*.5,l=o/Math.max(o+a,.001),c=Math.min(1,e*n/ZR);this.blood+=(l-this.blood)*c,o>.01&&(Dx.copy(QR).multiplyScalar(t.bloodRain/o).add(Lx.copy(eA).multiplyScalar(t.poisonRain/o)).add(Lx.copy(tA).multiplyScalar(t.acidRain/o)),dn.uStainColor.value.lerp(Dx,c))}else this.puddles<=0&&this.wetness<=0&&(this.blood=0);if(dn.uBlood.value=this.blood,n>.05)this.wetness=Math.min(1,this.wetness+e*n*t.soak/Ix),this.puddles=Math.min(1,this.puddles+e*n*t.soak/Nx);else{let o=F.clamp(t.litLevel,.3,1.2)*(1+2*t.heatWash);this.wetness=Math.max(0,this.wetness-e*o/nA),this.puddles=Math.max(0,this.puddles-e*o/iA)}t.dew>.01&&(this.wetness=Math.max(this.wetness,Math.min($R*t.dew,this.wetness+e/Ix)),this.puddles=Math.max(this.puddles,Math.min(JR*t.dew,this.puddles+e/Nx)));let i=dn;i.uStars.value=t.stars,i.uTide.value=t.tide,i.uWarp.value=t.timeWarp,i.uWarpCenter.value.copy(this.playerPosition()),i.uWetness.value=this.wetness,i.uPuddles.value=this.puddles,i.uRipples.value=Math.min(n*1.5,1)*(1-Math.max(this.iceCover,this.frostCover));let r=(1-Math.min(t.cloudCover,1)*.85)*F.smoothstep(t.litLevel,.6,.95);i.uSkyColor.value.copy(t.ambientColor).lerp(lA,r).multiplyScalar(Math.min(t.litLevel*.85,1))}updateGusts(e){if(this.gustTime+=e,this.gustAge<0&&(this.gustTimer-=e,this.gustTimer<=0&&this.gustsEnabled&&(this.gustAge=0,this.gustDuration=F.randFloat(kx[0],kx[1]),this.gustPeak=F.randFloat(.55,1)),this.gustAge<0))return 0;this.gustAge+=e;let t=this.gustAge;if(t>=this.gustDuration)return this.gustAge=-1,this.gustTimer=F.randFloat(Ux[0],Ux[1]),0;let n=F.smoothstep(t,0,pA)*(1-F.smoothstep(t,this.gustDuration-fA,this.gustDuration)),i=1+.15*Math.sin(this.gustTime*7.3)*Math.sin(this.gustTime*2.9),r=hA+dA*Math.abs(this.baseWindX);return Math.sign(this.baseWindX||1)*r*this.gustPeak*n*i}updateLightning(e,t){if(t<.05&&this.flashTime<0)return 0;if(this.lightningTimer-=e*t,t>=.05&&this.lightningTimer<=0){this.lightningTimer=F.randFloat(yx[0],yx[1]);let r=yA(this.current.lightningFar);this.flashPulses=r.flatMap(Gx),this.flashTime=0,this.audio.thunder(r)}if(this.flashTime<0)return 0;this.flashTime+=e;let n=0,i=0;for(let r of this.flashPulses){let o=this.flashTime-r.start;o>=0&&(n=Math.max(n,r.peak*Math.min(o/r.rise,1)*Math.exp(-Math.max(o-r.rise,0)*r.decay))),i=Math.max(i,r.start)}return this.flashTime>i+1.2&&(this.flashTime=-1),n}snapToTarget(){this.blendParams(60),ep(this.hour,this.sunPos)}playLedgeHop(){this.audio.ledgeHop()}playLanding(){this.audio.thud()}get playerFlying(){return this.flightTime>=0}updateWallFeet(e,t){if(!t)return;if(!this.wallScan){if(!(!this.wallFeetCenter||this.wallFeetCenter.distanceTo(new _e(e.x,e.z))>zR))return;this.wallScan={center:new _e(e.x,e.z),index:0,found:[]}}let n=this.wallScan,i=Math.floor((lo.maxX-lo.minX)/_u)+1,r=Math.floor((lo.maxZ-lo.minZ)/_u)+1,o=Math.min(n.index+BR,i*r);for(;n.index<o;n.index++){let a=n.center.x+lo.minX+n.index%i*_u,l=n.center.y+lo.minZ+Math.floor(n.index/i)*_u,c=this.surfaces.heightAt(a,l,e.y);c<e.y+2&&[[6,0],[-6,0],[0,6],[0,-6]].some(([u,h])=>this.surfaces.heightAt(a+u,l+h,e.y)>c+15)&&n.found.push([a,l])}n.index>=i*r&&(this.wallFeet=n.found,this.wallFeetCenter=n.center,this.wallScan=null)}updateFloat(e,t){let n=this.game.mapHelper?.scenePlayer?.mesh?.children[0];if(n){if(n.position.y-=this.floatOffset,this.floatOffset=0,t<.01||this.flightTime>=0){n.rotation.z=0;return}this.floatTime+=e,this.floatOffset=t*(RR+AR*Math.sin(this.floatTime*Tx)),n.position.y+=this.floatOffset,n.rotation.z=t*PR*Math.sin(this.floatTime*Tx*.7)}}onGroundStrike(e){let t=this.playerPosition(),n=Math.hypot(e.x-t.x,e.z-t.z),i={at:0,distance:F.clamp(n/IR,0,1),pan:F.clamp((e.x-t.x)/150,-1,1)};this.flashPulses=Gx(i),this.flashTime=0,this.audio.thunder([i]),n<Mx&&this.quakeAge<0&&(this.quakeAge=0,this.quakeLength=LR,this.quakePower=.4+.6*(1-n/Mx))}updateFlight(e){let t=this.game.mapHelper?.scenePlayer?.mesh?.children[0];if(!t)return;if(this.flightCooldown=Math.max(0,this.flightCooldown-e),this.flightTime<0){let l=this.playerPosition(),c=Math.hypot(this.tornado.position.x-l.x,this.tornado.position.z-l.z),u=this.geysers.nearestErupting(l.x,l.z),h=!!u&&u.distance<MR;(this.tornado.strength>.8&&c<dR||h)&&!this.flightCooldown&&(this.flightTime=0,this.flightBaseY=t.position.y,this.flightSpin=0);return}this.flightTime+=e;let n=this.flightTime/pR;if(n>=1){t.position.y=this.flightBaseY,t.rotation.y=0,this.liftCamera(0),this.flightTime=-1,this.flightCooldown=mR,this.audio.thud();return}let i=.6,r=n<i?1-Math.pow(1-n/i,2):1-Math.pow((n-i)/(1-i),2),o=n>.93?Math.sin((n-.93)/.07*Math.PI)*.05:0;t.position.y=this.flightBaseY+_x*Math.max(r,o),this.liftCamera(_x*r*gR);let a=fR*Math.sin(Math.PI*Math.min(n/.9,1));this.flightSpin+=a*e,t.rotation.y=n<.9?this.flightSpin:this.flightSpin*(1-(n-.9)/.1)%(Math.PI*2)}updateQuake(e,t){if(t<.05&&this.quakeAge<0)return 0;if(this.quakeAge<0){if(this.quakeTimer-=e*t,this.quakeTimer>0)return 0;this.quakeTimer=F.randFloat(Rx[0],Rx[1]),this.quakeAge=0,this.quakeLength=F.randFloat(Ax[0],Ax[1]),this.quakePower=F.randFloat(.5,1),this.eruptionTension>=1&&(this.quakeLength=WR,this.quakePower=qR,this.eruptionTension=0)}this.quakeAge+=e;let n=this.quakeAge/this.quakeLength;if(n>=1)return this.quakeAge=-1,0;let i=Math.pow(Math.sin(Math.PI*Math.pow(n,.6)),.8)*this.quakePower,r=.75+.25*Math.sin(this.quakeAge*7.3)*Math.sin(this.quakeAge*2.1),o=i*r,a=this.quakeAge;return this.shakeOffset.set((Math.sin(a*31)*.6+Math.sin(a*53+1)*.4)*np*o,(Math.sin(a*41+2)*.5+Math.sin(a*67)*.5)*np*.5*o,(Math.sin(a*37+3)*.6+Math.sin(a*59+2)*.4)*np*o),this.game.camera.position.add(this.shakeOffset),o}steamLevel(){let e=this.playerPosition(),t=0;for(let n of this.geysers.geysers){let i=Math.max(0,1-Math.hypot(n.x-e.x,n.z-e.z)/Cx);t=Math.max(t,i*(.15+.85*n.power))}return t}liftCamera(e){let t=this.game.camera;t.position.y+=e-this.cameraLift,this.cameraLift=e,this.game.mapHelper?.updateCameraAim()}playerPosition(){return this.game.mapHelper?.scenePlayer?.mesh?.position??this.game.getCameraTarget()}updateDips(e,t){if(t<.05)return this.dipAge=-1,0;if(this.dipAge<0){if(this.dipTimer-=e*t,this.dipTimer>0)return 0;this.dipTimer=F.randFloat(bx[0],bx[1]),this.dipAge=0,this.dipLength=F.randFloat(.05,.3),this.dipDepth=F.randFloat(.25,.65)*t}return this.dipAge+=e,this.dipAge>=this.dipLength?(this.dipAge=-1,0):this.dipDepth*(Math.random()<.7?1:.3)}targetParams(){let e=Ad(this.weatherType,!1),t=Ad(this.weatherType,!0),n=Lc(this.hour),i=this.target;for(let o of Vx)i[o]=t[o]+(e[o]-t[o])*n;for(let o of Wx)i[o].copy(t[o]).lerp(e[o],n);let r=$m(this.hour);if(r.amount>0){let o=r.dusk?e0:Qm,a=r.amount*ZC*(1-.6*Math.min(i.cloudCover,1));i.sunColor.lerp(o.sunColor,a),i.ambientColor.lerp(o.ambientColor,a),i.unlitTint.lerp(o.unlitTint,a),i.fogColor.lerp(o.fogColor,a),i.sunGlow+=JC*a,i.litLevel+=$C*a}if(i.morningMist>0){let o=Ic(this.hour);i.morningMist*=o,i.fog+=NR*i.morningMist,i.dew=Math.max(i.dew,OR*i.morningMist),i.godRays=Math.max(i.godRays,FR*i.morningMist*n)}return i}blendParams(e){let t=this.targetParams(),n=1-Math.exp(-e*yu),i=this.current;for(let r of Vx)i[r]+=(t[r]-i[r])*n;for(let r of Wx)i[r].lerp(t[r],n);t.poisonRain===0&&i.poisonRain<.005&&(i.poisonRain=0),t.bloodRain===0&&i.bloodRain<.005&&(i.bloodRain=0),t.rain===0&&i.rain<.005&&(i.rain=0),t.snow===0&&i.snow<.005&&(i.snow=0),t.drizzle===0&&i.drizzle<.005&&(i.drizzle=0),t.embers===0&&i.embers<.005&&(i.embers=0),t.lava===0&&i.lava<.005&&(i.lava=0),t.fireflies===0&&i.fireflies<.005&&(i.fireflies=0),t.fairyLights===0&&i.fairyLights<.005&&(i.fairyLights=0),t.risingEnergy===0&&i.risingEnergy<.005&&(i.risingEnergy=0),t.leaves===0&&i.leaves<.005&&(i.leaves=0);for(let r of _A)t[r]===0&&i[r]<.005&&(i[r]=0);t.pollen===0&&i.pollen<.005&&(i.pollen=0),t.spores===0&&i.spores<.005&&(i.spores=0),t.sand===0&&i.sand<.005&&(i.sand=0),t.electric===0&&i.electric<.005&&(i.electric=0)}},vu=lr.neutral,_A=["autumnLeaves","hail","sunRain","ash","magicSnow","stardust","crystals","marsDust","acidRain","fumes","poisonFumes","curse","petalWhirl","haunt"],Vx=Object.keys(vu).filter(s=>typeof vu[s]=="number"),Wx=Object.keys(vu).filter(s=>vu[s]instanceof x);var bu=class{enabled=!1;report=null;input=0;weather=0;render=0;frames=0;frameMax=0;lastFrame=0;calls=0;triangles=0;measure(e,t){if(!this.enabled)return t();let n=performance.now(),i=t();return this[e]+=performance.now()-n,i}frameStart(e){if(!this.enabled)return;let t=performance.now();this.lastFrame&&(this.frameMax=Math.max(this.frameMax,t-this.lastFrame)),this.lastFrame=t,this.frames++,e.info.autoReset=!1,e.info.reset()}frameEnd(e){this.enabled&&(this.calls+=e.info.render.calls,this.triangles+=e.info.render.triangles)}flush(e,t,n){if(!this.enabled){this.report=null,e.info.autoReset=!0;return}let i=Math.max(this.frames,1),r=e.getDrawingBufferSize(new _e);this.report=ht(Ve({fps:this.frames,frameAvg:this.frames?1e3/this.frames:0,frameMax:this.frameMax,input:this.input,weather:this.weather,render:this.render,calls:Math.round(this.calls/i),triangles:Math.round(this.triangles/i),width:r.x,height:r.y},t),{geometries:e.info.memory.geometries,textures:e.info.memory.textures,breakdown:n()}),this.input=this.weather=this.render=this.frames=this.frameMax=this.calls=this.triangles=0}};var Mu=(t=>(t[t.MAP=0]="MAP",t[t.FIGHT=1]="FIGHT",t))(Mu||{}),Xn=new w(0,140,160),Xx=40,ps=480,ti=32,Ki=256,sp=2048,qx=500,Tu=class s{scene;raycaster;canvas;camera=new gn;ambientLight;sun;weather;renderer;mapHelper;fightHelper;mode;loading=!1;frame=0;framePerSec=0;paused=!1;editMode=!1;editModelId=null;editTileId=null;editBrush=1;editSelection=null;editCanUndo=!1;editCanRedo=!1;cameraZoom=1;constructor(e){this.scene=e.scene,this.raycaster=e.raycaster,this.canvas=e.canvas,this.renderer=e.renderer,this.mode=e.mode,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=tr,this.ambientLight=new Zo(16777215),this.sun=s.makeSun(),this.scene.add(this.ambientLight,this.sun,this.sun.target),this.weather=new Eu(this)}static makeSun(){let e=new Ko(16777215);e.castShadow=!0,e.shadow.mapSize.set(sp,sp);let t=e.shadow.camera;return t.left=-Ki,t.right=Ki,t.top=Ki,t.bottom=-Ki,t.near=1,t.far=qx*2,t.updateProjectionMatrix(),e.shadow.bias=-5e-4,e.shadow.normalBias=.25,e}cameraOffset(){return Xn.clone().multiplyScalar(this.cameraZoom)}getCameraTarget(){return this.camera.position.clone().sub(this.cameraOffset())}placeSun(e,t){let n=Ki*2/(this.shadowMapSize||sp),i=new w(Math.round(e.x/n)*n,Math.round(e.y/n)*n,Math.round(e.z/n)*n);this.sun.target.position.copy(i),this.sun.position.copy(i).addScaledVector(t,qx)}updateLights(e=0){this.weather.update(e)}diagnostics=new bu;qualityMode="auto";pixelRatio=1;shadowMapSize=2048;slowSeconds=0;fastSeconds=0;detail=1;postEffects=!0;setQuality(e){this.qualityMode=e;let t=Sd[e==="auto"?Km()?"medium":"high":e];this.slowSeconds=this.fastSeconds=0,this.applyQuality(Math.min(window.devicePixelRatio,t.maxPixelRatio),t.shadowMapSize,t.detail,t.postEffects)}adaptQuality(e){if(this.qualityMode!=="auto"||this.paused||this.loading)return;this.slowSeconds=e<Wm?this.slowSeconds+1:0,this.fastSeconds=e>=Xm?this.fastSeconds+1:0;let{high:t,medium:n,low:i}=Sd,r=Math.min(window.devicePixelRatio,t.maxPixelRatio),o=n.shadowMapSize/2;this.slowSeconds>=qm?(this.slowSeconds=0,this.pixelRatio>Rc?this.applyQuality(Math.max(Rc,this.pixelRatio-wd),this.shadowMapSize,this.detail,this.postEffects):this.shadowMapSize>o?this.applyQuality(this.pixelRatio,this.shadowMapSize/2,this.detail,this.postEffects):this.shadowMapSize&&this.applyQuality(Math.min(this.pixelRatio,i.maxPixelRatio),i.shadowMapSize,i.detail,i.postEffects)):this.fastSeconds>=Ym&&(this.fastSeconds=0,this.shadowMapSize?this.shadowMapSize<n.shadowMapSize?this.applyQuality(this.pixelRatio,this.shadowMapSize*2,this.detail,this.postEffects):this.pixelRatio<r&&this.applyQuality(Math.min(r,this.pixelRatio+wd),this.shadowMapSize,t.detail,this.postEffects):this.applyQuality(Math.max(this.pixelRatio,Rc),o,n.detail,n.postEffects))}applyQuality(e,t,n,i){this.pixelRatio=e,this.renderer.setPixelRatio(e),this.renderer.domElement.style.imageRendering=e<1?"pixelated":"",this.detail=n,this.postEffects=i,Vn.particles=n,Vn.postEffects=i,this.sun.castShadow=t>0,t&&(t!==this.shadowMapSize||!this.sun.shadow.map)&&(this.sun.shadow.mapSize.set(t,t),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null),this.shadowMapSize=t}render(){this.updateLights(),this.renderFrame()}renderFrame(){this.weather.renderPostEffects()||this.renderer.render(this.scene,this.camera)}warmUp(){let e=[];this.scene.traverse(n=>{n.visible||(e.push(n),n.visible=!0)}),this.renderer.compile(this.scene,this.camera);let t=new Set;this.scene.traverse(n=>{let i=n.material;(Array.isArray(i)?i:i?[i]:[]).forEach(r=>{Object.values(r).forEach(o=>o?.isTexture&&t.add(o)),Object.values(r.uniforms??{}).forEach(o=>o.value?.isTexture&&t.add(o.value))})}),t.forEach(n=>this.renderer.initTexture(n)),e.forEach(n=>n.visible=!1)}refreshRenderer(){let e=this.canvas.getBoundingClientRect();this.camera.aspect=e.width/e.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.width,e.height)}};var Zx=new ki,Yx=new Ie,Kx=new Mi;function EA(s){for(let t=s;t;t=t.parent)if(!t.visible)return!1;let e=s;return!s.frustumCulled||!e.geometry?!0:(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),Kx.copy(e.geometry.boundingSphere).applyMatrix4(s.matrixWorld),Zx.intersectsSphere(Kx))}function vA(s){let e=s;return Array.isArray(e.material)?Math.max(e.geometry?.groups.length??1,1):1}function $x(s,e,t){Yx.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),Zx.setFromProjectionMatrix(Yx);let n=new Map;if(t){for(let l of t.sceneMap.chunks){l.grounds.forEach(c=>c.mesh&&n.set(c.mesh,{label:"sol",root:c.mesh}));for(let c of l.buildings){let u=t.meshes[l.id+"-"+c.id];u?.traverse(h=>n.set(h,{label:c.modelId,root:u}))}}let a=t.scenePlayer.mesh;a?.traverse(l=>n.set(l,{label:"joueur",root:a}));for(let l of t.instancedSets())l.parts.forEach(c=>n.set(c,{label:l.modelId,root:c,copies:l.copies}))}let i=new Map,r=new Map,o=new Map;return s.traverse(a=>{if(!a.isMesh&&!a.isSprite&&!a.isLine||!EA(a))return;let l=n.get(a),c=l?.label??"m\xE9t\xE9o / effets",u=i.get(c)??{label:c,calls:0,objects:0,copies:0};if(u.calls+=vA(a),u.objects++,i.set(c,u),l?.copies!==void 0){o.set(c,Math.max(o.get(c)??0,l.copies));return}let h=r.get(c)??new Set;h.add(l?.root??a),r.set(c,h)}),i.forEach((a,l)=>a.copies=(r.get(l)?.size??0)+(o.get(l)??0)),[...i.values()].sort((a,l)=>l.calls-a.calls)}var gi=(u=>(u[u.confirm=0]="confirm",u[u.cancel=1]="cancel",u[u.left=2]="left",u[u.right=3]="right",u[u.down=4]="down",u[u.up=5]="up",u[u.x=6]="x",u[u.y=7]="y",u[u.pause=8]="pause",u[u.select=9]="select",u))(gi||{});function Su(s){let e=null,t=null;return s.x<-.2&&(e=2),s.x>.2&&(e=3),s.y<-.2&&(t=5),s.y>.2&&(t=4),e!=null&&t!=null?Math.abs(s.x)>Math.abs(s.y)?e:t:e??t??null}var wu=class s{vibrating=!1;static isGamepadAvailable(){return!!navigator.getGamepads()[0]}static getPressedKeys(){let e=new Set,t=navigator.getGamepads()[0];if(t){t.buttons[0].pressed&&e.add(0),t.buttons[1].pressed&&e.add(1),t.buttons[3].pressed&&e.add(7),t.buttons[2].pressed&&e.add(6),t.buttons[9].pressed&&e.add(8),t.buttons[8].pressed&&e.add(9),t.buttons[12].pressed&&e.add(5),t.buttons[13].pressed&&e.add(4),t.buttons[14].pressed&&e.add(2),t.buttons[15].pressed&&e.add(3);let n=[...t.axes],i=Su({x:n[0],y:n[1]});i!==null&&e.add(i)}return Array.from(e)}vibrate(){let t=navigator.getGamepads()[0]?.vibrationActuator;t&&!this.vibrating&&(this.vibrating=!0,t.playEffect("dual-rumble",{startDelay:0,duration:2,weakMagnitude:.5,strongMagnitude:.5}))}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var ya=60;var Jx=()=>"ontouchstart"in window||navigator.maxTouchPoints>0,Ns=class s{isTouchDeviceState=rt(Jx());isTouchDevice=this.isTouchDeviceState.asReadonly();stickState=rt(null);stick=this.stickState.asReadonly();directionTouch=null;constructor(){Ws(window,"resize").subscribe(()=>this.isTouchDeviceState.set(Jx()))}updateStick(e){this.stickState.set(e)}bindTouching(e){e.addEventListener("touchstart",t=>{let n=t.touches[t.touches.length-1],i=e.getBoundingClientRect().width;n.clientX<i/2&&(this.updateStick({begin:{x:n.clientX,y:n.clientY},current:{x:n.clientX,y:n.clientY},radius:ya}),this.directionTouch??=n)},!1),e.addEventListener("touchend",t=>{this.updateStick(null);let n=t.changedTouches[0];this.directionTouch&&n.identifier===this.directionTouch.identifier&&(this.directionTouch=null)},!1),e.addEventListener("touchmove",t=>{t.scale!==void 0&&t.scale!==1&&t.preventDefault();let n=t.changedTouches[0],i=this.directionTouch,r=this.stick();if(!i||!r||n.identifier!==i.identifier)return;let o=n.clientX-i.clientX,a=n.clientY-i.clientY,l=Math.asin(a/Math.sqrt(o*o+a*a))*180/Math.PI;if(l=o>0?180-l:(360+l)%360,Math.hypot(r.begin.x-n.clientX,r.begin.y-n.clientY)>r.radius-10){let u=Math.cos(F.degToRad(l))*(-r.radius+10),h=Math.sin(F.degToRad(l))*(r.radius-10);this.updateStick(ht(Ve({},r),{current:{x:u+r.begin.x,y:h+r.begin.y}}))}else this.updateStick(ht(Ve({},r),{current:{x:n.clientX,y:n.clientY}}))},{passive:!1})}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var bA={Enter:0,Escape:1,ArrowDown:4,ArrowUp:5,ArrowLeft:2,ArrowRight:3,s:4,z:5,q:2,d:3,a:1,e:0," ":0,r:6,f:7,p:8,o:9},Cn=class s{coreService=je(yr);touchService=je(Ns);gamepadKeys=[];stickKeys=[];pressedKeys=[];pressedCodes=[];pressedSubject=new Lp(this.pressedKeys);pressedState=this.pressedSubject.asObservable();holdedKeys=[];holdedCodes=[];constructor(){Ws(document,"keydown").subscribe(e=>this.setKeyDown(s.getKeyCodeFromKeyboard(e))),Ws(document,"keyup").subscribe(e=>this.setKeyUp(s.getKeyCodeFromKeyboard(e))),Ji(()=>this.updateStick(this.touchService.stick())),Ji(()=>{this.coreService.resumed(),this.clearKeys()})}clearKeys(){this.clearPressedKey(),this.holdedKeys=[],this.holdedCodes=[]}initTouch(e){this.touchService.bindTouching(e)}updateStick(e){let t=[];if(e){let n=Su({x:(e.begin.x-e.current.x)/-(ya-10),y:(e.begin.y-e.current.y)/-(ya-10)});n!==null&&t.push(n)}this.syncKeys(this.stickKeys,t),this.stickKeys=t}updateGamePadKeys(){let e=wu.getPressedKeys();this.syncKeys(this.gamepadKeys,e),this.gamepadKeys=e}syncKeys(e,t){e.filter(n=>!t.includes(n)).forEach(n=>this.setKeyUp(n)),t.filter(n=>!e.includes(n)).forEach(n=>this.setKeyDown(n))}clearPressedKey(){this.pressedKeys=[],this.pressedCodes=[],this.pressedSubject.next(this.pressedKeys)}setKeyDown(e){if(e===null||this.holdedCodes.includes(e))return;let t=Date.now();this.pressedKeys.unshift({code:e,pressedTime:t}),this.pressedCodes.unshift(e),this.pressedSubject.next(this.pressedKeys),this.holdedKeys.unshift({code:e,pressedTime:t}),this.holdedCodes.unshift(e)}setKeyUp(e){if(e===null)return;let t=this.holdedCodes.indexOf(e);t>=0&&(this.holdedKeys.splice(t,1),this.holdedCodes.splice(t,1))}static getKeyCodeFromKeyboard(e){return bA[e.key]??null}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};function Os(s){return s===!0?"n":s||null}var Cu={id:"labo",tex:{link:"assets/tex/labo.png",size:{x:300,y:200}},hitBox:{min:{x:0,y:0,z:8},max:{x:0,y:0,z:8}},planes:[],boxes:[{size:{x:110,y:31,z:42},pos:{x:0,y:16,z:0},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:110,y:31},max:{x:0,y:0}},back:{min:{x:0,y:0},max:{x:110,y:31}},left:{min:{x:112,y:0},max:{x:154,y:31}},right:{min:{x:112,y:0},max:{x:154,y:31}},top:{min:{x:0,y:34},max:{x:110,y:76}},bottom:{min:{x:0,y:34},max:{x:110,y:76}}}},{size:{x:112,y:4,z:44},pos:{x:0,y:33.5,z:0},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,shininess:.5,side:2,uvs:{front:{min:{x:112,y:86},max:{x:0,y:82}},back:{min:{x:112,y:86},max:{x:0,y:82}},left:{min:{x:115,y:82},max:{x:159,y:86}},right:{min:{x:115,y:82},max:{x:159,y:86}},top:{min:{x:0,y:133},max:{x:112,y:89}},bottom:{min:{x:0,y:133},max:{x:112,y:89}}}},{size:{x:22,y:2,z:22},pos:{x:35,y:35.5,z:-4},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:0,y:157},max:{x:22,y:159}},back:{min:{x:0,y:157},max:{x:22,y:159}},left:{min:{x:0,y:157},max:{x:22,y:159}},right:{min:{x:0,y:157},max:{x:22,y:159}},top:{min:{x:0,y:156},max:{x:22,y:134}},bottom:{min:{x:0,y:134},max:{x:22,y:156}}}},{size:{x:16,y:7,z:3},pos:{x:35,y:40,z:-10},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:21,y:164},max:{x:37,y:171}},back:{min:{x:0,y:164},max:{x:16,y:171}},left:{min:{x:17,y:164},max:{x:20,y:171}},right:{min:{x:17,y:164},max:{x:20,y:171}},top:{min:{x:0,y:160},max:{x:16,y:163}},bottom:{min:{x:0,y:160},max:{x:16,y:163}}}},{size:{x:16,y:7,z:3},pos:{x:35,y:40,z:2.5},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:0,y:164},max:{x:16,y:171}},back:{min:{x:0,y:164},max:{x:16,y:171}},left:{min:{x:17,y:164},max:{x:20,y:171}},right:{min:{x:17,y:164},max:{x:20,y:171}},top:{min:{x:0,y:163},max:{x:16,y:160}},bottom:{min:{x:0,y:160},max:{x:16,y:163}}}},{size:{x:10,y:7,z:3},pos:{x:28.5,y:40,z:-3.5},rot:{x:0,y:Math.PI/2,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:0,y:176},max:{x:10,y:183}},back:{min:{x:0,y:176},max:{x:10,y:183}},left:{min:{x:11,y:176},max:{x:14,y:183}},right:{min:{x:11,y:176},max:{x:14,y:183}},top:{min:{x:0,y:172},max:{x:10,y:175}},bottom:{min:{x:0,y:172},max:{x:10,y:175}}}},{size:{x:10,y:7,z:3},pos:{x:41.5,y:40,z:-3.5},rot:{x:0,y:Math.PI/2,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:0,y:176},max:{x:10,y:183}},back:{min:{x:0,y:176},max:{x:10,y:183}},left:{min:{x:11,y:176},max:{x:14,y:183}},right:{min:{x:11,y:176},max:{x:14,y:183}},top:{min:{x:0,y:175},max:{x:10,y:172}},bottom:{min:{x:0,y:172},max:{x:10,y:175}}}}]};var Ru={id:"barrier",tex:{link:"assets/tex/barrier.png",size:{x:32,y:22}},hitBox:{min:{x:0,y:0,z:8},max:{x:0,y:0,z:16}},planes:[],boxes:[{size:{x:6,y:8,z:4},pos:{x:0,y:4,z:0},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:0,y:20},max:{x:6,y:12}},back:{min:{x:0,y:12},max:{x:6,y:20}},left:{min:{x:0,y:12},max:{x:6,y:20}},right:{min:{x:0,y:12},max:{x:6,y:20}},top:{min:{x:0,y:7},max:{x:6,y:11}},bottom:{min:{x:0,y:7},max:{x:6,y:11}}}},{size:{x:8,y:3,z:2},pos:{x:0,y:4,z:0},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:0,y:3},max:{x:8,y:6}},back:{min:{x:0,y:3},max:{x:8,y:6}},left:{min:{x:0,y:3},max:{x:3,y:6}},right:{min:{x:0,y:3},max:{x:3,y:6}},top:{min:{x:0,y:0},max:{x:8,y:2}},bottom:{min:{x:0,y:0},max:{x:3,y:2}}}}]};var Au={id:"pannel",tex:{link:"assets/tex/pannel.png",size:{x:50,y:50}},hitBox:{min:{x:0,y:0,z:8},max:{x:0,y:0,z:15}},planes:[],boxes:[{size:{x:16,y:9,z:2},pos:{x:0,y:6,z:0},rot:{x:0,y:0,z:0},uvs:{front:{min:{x:16,y:9},max:{x:0,y:0}},back:{min:{x:0,y:0},max:{x:16,y:9}},left:{min:{x:19,y:9},max:{x:17,y:0}},right:{min:{x:19,y:9},max:{x:17,y:0}},top:{min:{x:16,y:12},max:{x:0,y:10}},bottom:{min:{x:0,y:10},max:{x:16,y:12}}}},{size:{x:3,y:11,z:3},pos:{x:-4,y:2.5,z:-2},rot:{x:0,y:0,z:0},uvs:{front:{min:{x:3,y:28},max:{x:0,y:17}},back:{min:{x:3,y:28},max:{x:0,y:17}},left:{min:{x:3,y:28},max:{x:0,y:17}},right:{min:{x:3,y:28},max:{x:0,y:17}},top:{min:{x:0,y:13},max:{x:3,y:16}},bottom:{min:{x:0,y:13},max:{x:3,y:16}}}},{size:{x:3,y:11,z:3},pos:{x:4,y:2.5,z:-2},rot:{x:0,y:0,z:0},uvs:{front:{min:{x:3,y:28},max:{x:0,y:17}},back:{min:{x:3,y:28},max:{x:0,y:17}},left:{min:{x:3,y:28},max:{x:0,y:17}},right:{min:{x:3,y:28},max:{x:0,y:17}},top:{min:{x:0,y:13},max:{x:3,y:16}},bottom:{min:{x:0,y:13},max:{x:3,y:16}}}}]};var Pu={id:"flowers",tex:{link:"assets/tex/flowers.png",size:{x:40,y:40}},sway:.6,hitBox:{min:{x:0,y:0,z:0},max:{x:0,y:0,z:0}},planes:[{size:{x:11,y:12,z:0},pos:{x:2,y:6,z:4},rot:{x:0,y:0,z:0},depthWrite:!1,depthTest:!1,side:2,uvs:{front:{min:{x:0,y:12},max:{x:11,y:0}},back:{min:{x:0,y:0},max:{x:3,y:3}}}},{size:{x:10,y:13,z:0},pos:{x:-2,y:6,z:-4},rot:{x:0,y:0,z:0},depthWrite:!1,depthTest:!1,side:2,uvs:{front:{min:{x:0,y:27},max:{x:10,y:14}},back:{min:{x:0,y:0},max:{x:3,y:3}}}}],boxes:[]};var Iu={id:"tree",tex:{link:"assets/tex/tree.png",size:{x:96,y:120}},sway:.5,hitBox:{min:{x:0,y:0,z:8},max:{x:0,y:0,z:8}},boxes:[{size:{x:9,y:10,z:9},pos:{x:0,y:5,z:0},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:11,y:100},max:{x:19,y:90}},back:{min:{x:11,y:100},max:{x:19,y:90}},left:{min:{x:11,y:100},max:{x:19,y:90}},right:{min:{x:11,y:100},max:{x:19,y:90}},top:{min:{x:11,y:100},max:{x:19,y:90}},bottom:{min:{x:0,y:0},max:{x:0,y:0}}}}],planes:[...[1,-1].reduce((s,e)=>[...s,...[0,1,2,3].map(t=>{let n=t===4?0:-e*(2.8+t/5),i=t===4?0:e*((t+1)*.2);return{size:{x:30,y:20,z:0},pos:{x:0,y:2+6*(5-t),z:n},rot:{x:i,y:0,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:0,y:(t+1)*20},max:{x:30,y:t*20}},back:{min:{x:0,y:(t+1)*20},max:{x:30,y:t*20}}}}})],[])]};var Lu={id:"house",tex:{link:"assets/tex/house.png",size:{x:300,y:200}},hitBox:{min:{x:-2,y:0,z:8},max:{x:4,y:0,z:8}},planes:[{size:{x:76,y:6,z:0},pos:{x:0,y:33,z:15},rot:{x:0,y:0,z:0},depthWrite:!1,depthTest:!0,side:0,uvs:{front:{min:{x:0,y:43},max:{x:76,y:37}},back:{min:{x:0,y:43},max:{x:76,y:37}}}}],boxes:[{size:{x:76,y:31,z:30},pos:{x:0,y:16,z:0},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,side:2,uvs:{front:{min:{x:0,y:31},max:{x:76,y:0}},back:{min:{x:0,y:31},max:{x:0,y:0}},left:{min:{x:78,y:31},max:{x:108,y:0}},right:{min:{x:78,y:31},max:{x:108,y:0}},top:{min:{x:0,y:47},max:{x:58,y:79}},bottom:{min:{x:0,y:47},max:{x:58,y:79}}}},{size:{x:58,y:3,z:32},pos:{x:0,y:39.1,z:2},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,shininess:.5,side:2,uvs:{front:{min:{x:0,y:83},max:{x:58,y:80}},back:{min:{x:0,y:83},max:{x:58,y:80}},left:{min:{x:0,y:83},max:{x:58,y:80}},right:{min:{x:0,y:83},max:{x:58,y:80}},top:{min:{x:0,y:47},max:{x:58,y:79}},bottom:{min:{x:0,y:47},max:{x:58,y:79}}}},{size:{x:18,y:3,z:32},pos:{x:-35,y:33,z:1.99},rot:{x:0,y:0,z:Math.PI/4},depthWrite:!0,depthTest:!0,shininess:.5,side:2,uvs:{front:{min:{x:60,y:83},max:{x:78,y:80}},back:{min:{x:60,y:83},max:{x:78,y:80}},left:{min:{x:46,y:84},max:{x:78,y:87}},right:{min:{x:46,y:87},max:{x:78,y:84}},top:{min:{x:60,y:47},max:{x:78,y:79}},bottom:{min:{x:60,y:47},max:{x:78,y:79}}}},{size:{x:18,y:3,z:32},pos:{x:35,y:33,z:1.99},rot:{x:0,y:0,z:-Math.PI/4},depthWrite:!0,depthTest:!0,shininess:.5,side:2,uvs:{front:{min:{x:80,y:83},max:{x:98,y:80}},back:{min:{x:80,y:83},max:{x:98,y:80}},left:{min:{x:80,y:84},max:{x:112,y:87}},right:{min:{x:80,y:87},max:{x:112,y:84}},top:{min:{x:80,y:47},max:{x:98,y:79}},bottom:{min:{x:80,y:47},max:{x:98,y:79}}}}]};var Du={id:"wood-pannel",tex:{link:"assets/tex/wood-pannel.png",size:{x:40,y:40}},hitBox:{min:{x:0,y:0,z:8},max:{x:0,y:0,z:15}},planes:[],boxes:[{size:{x:14,y:8,z:3},pos:{x:0,y:5,z:0},rot:{x:0,y:0,z:0},uvs:{front:{min:{x:0,y:8},max:{x:14,y:0}},back:{min:{x:0,y:0},max:{x:14,y:8}},left:{min:{x:15,y:8},max:{x:18,y:0}},right:{min:{x:15,y:8},max:{x:18,y:0}},top:{min:{x:0,y:11},max:{x:14,y:8}},bottom:{min:{x:0,y:8},max:{x:14,y:11}}}},{size:{x:4,y:15,z:4},pos:{x:0,y:2.5,z:-2},rot:{x:0,y:0,z:0},uvs:{front:{min:{x:0,y:27},max:{x:4,y:12}},back:{min:{x:0,y:27},max:{x:4,y:12}},left:{min:{x:0,y:27},max:{x:4,y:12}},right:{min:{x:0,y:27},max:{x:4,y:12}},top:{min:{x:0,y:32},max:{x:4,y:28}},bottom:{min:{x:0,y:28},max:{x:4,y:32}}}}]};var Nu={id:"letter-box",tex:{link:"assets/tex/letter-box.png",size:{x:40,y:40}},hitBox:{min:{x:0,y:0,z:8},max:{x:0,y:0,z:15}},planes:[{size:{x:12,y:3,z:0},pos:{x:0,y:10,z:4},rot:{x:0,y:0,z:0},depthWrite:!1,depthTest:!1,side:0,uvs:{front:{min:{x:0,y:21},max:{x:12,y:18}},back:{min:{x:0,y:21},max:{x:12,y:18}}}}],boxes:[{size:{x:12,y:7,z:8},pos:{x:0,y:6,z:0},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,shininess:.8,side:2,uvs:{front:{min:{x:0,y:7},max:{x:12,y:0}},back:{min:{x:0,y:7},max:{x:12,y:0}},left:{min:{x:13,y:7},max:{x:21,y:0}},right:{min:{x:13,y:7},max:{x:21,y:0}},top:{min:{x:0,y:16},max:{x:12,y:8}},bottom:{min:{x:0,y:16},max:{x:12,y:8}}}},{size:{x:6.5,y:1,z:8},pos:{x:0,y:11.88,z:0},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,shininess:.8,side:2,uvs:{front:{min:{x:17,y:9},max:{x:21,y:8}},back:{min:{x:4,y:16},max:{x:8,y:8}},left:{min:{x:4,y:16},max:{x:8,y:8}},right:{min:{x:4,y:16},max:{x:8,y:8}},top:{min:{x:4,y:16},max:{x:8,y:8}},bottom:{min:{x:4,y:16},max:{x:8,y:8}}}},{size:{x:4,y:1,z:8},pos:{x:-4.25,y:10.62,z:-.01},rot:{x:0,y:0,z:.8},depthWrite:!0,depthTest:!0,shininess:.8,side:2,uvs:{front:{min:{x:13,y:9},max:{x:17,y:8}},back:{min:{x:0,y:16},max:{x:4,y:8}},left:{min:{x:0,y:16},max:{x:4,y:8}},right:{min:{x:0,y:16},max:{x:4,y:8}},top:{min:{x:0,y:16},max:{x:4,y:8}},bottom:{min:{x:0,y:16},max:{x:4,y:8}}}},{size:{x:4,y:1,z:8},pos:{x:4.25,y:10.62,z:-.01},rot:{x:0,y:0,z:-.8},depthWrite:!0,depthTest:!0,shininess:.8,side:2,uvs:{front:{min:{x:21,y:9},max:{x:25,y:8}},back:{min:{x:8,y:16},max:{x:12,y:8}},left:{min:{x:8,y:16},max:{x:12,y:8}},right:{min:{x:8,y:16},max:{x:12,y:8}},top:{min:{x:8,y:16},max:{x:12,y:8}},bottom:{min:{x:8,y:16},max:{x:12,y:8}}}},{size:{x:4,y:6,z:4},pos:{x:0,y:.5,z:0},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,uvs:{front:{min:{x:0,y:28},max:{x:4,y:22}},back:{min:{x:0,y:28},max:{x:4,y:22}},left:{min:{x:0,y:28},max:{x:4,y:22}},right:{min:{x:0,y:28},max:{x:4,y:22}},top:{min:{x:0,y:28},max:{x:4,y:22}},bottom:{min:{x:0,y:28},max:{x:4,y:22}}}}]};var Ou={id:"rock",tex:{link:"assets/tex/rock.png",size:{x:16,y:16}},hitBox:{min:{x:0,y:0,z:4},max:{x:0,y:0,z:6}},planes:[],boxes:[{size:{x:14,y:6,z:12},pos:{x:0,y:3,z:0},rot:{x:0,y:0,z:0},depthWrite:!0,depthTest:!0,side:0,uvs:{front:{min:{x:1,y:16},max:{x:15,y:10}},back:{min:{x:1,y:16},max:{x:15,y:10}},left:{min:{x:2,y:16},max:{x:14,y:10}},right:{min:{x:2,y:16},max:{x:14,y:10}},top:{min:{x:1,y:14},max:{x:15,y:2}},bottom:{min:{x:0,y:0},max:{x:0,y:0}}}}]};var Fs=[Cu,Ru,Au,Pu,Iu,Lu,Du,Nu,Ou];var TA=new x(16762219),MA=50,jx=.1,Pi=class s{static windowMasks=new Map;static isWindowGlass(e,t,n,i){return i>0&&n>=200&&n-e>=60}static getWindowMask(e){let t=s.windowMasks.get(e);if(t)return t;let n=document.createElement("canvas");n.width=n.height=1;let i=new Ft(n);i.colorSpace=pt,i.magFilter=Wt,i.minFilter=pi,s.windowMasks.set(e,i);let r=new Image;return r.addEventListener("load",()=>{n.width=r.width,n.height=r.height;let o=n.getContext("2d",{willReadFrequently:!0});o.drawImage(r,0,0);let a=o.getImageData(0,0,r.width,r.height),l=a.data,c=0;for(let u=0;u<l.length;u+=4){let h=s.isWindowGlass(l[u],l[u+1],l[u+2],l[u+3]),d=h?Math.round(140+115*l[u+1]/255):0;c+=h?1:0,l[u]=l[u+1]=l[u+2]=d,l[u+3]=255}if(c<MA){l.fill(0);for(let u=3;u<l.length;u+=4)l[u]=255}o.putImageData(a,0,0),i.dispose(),i.needsUpdate=!0},{once:!0}),r.src=e,i}static addWindowLights(e,t){return e.emissiveMap=s.getWindowMask(t),e.emissive=TA,e}static loadTexture(e){let t=new Qs().load(e);return t.colorSpace=pt,t.magFilter=Wt,t.minFilter=pi,t}static getMaterialFromLink(e,t){let n=new vt({map:s.loadTexture(e),transparent:!!t,alphaTest:t?jx:0});return en(n),n}static getLambertMaterialFromLink(e,t){return io(new Ts({map:s.loadTexture(e),transparent:!!t}))}static getSpriteMaterialFromLink(e){let t=new Ui({map:s.loadTexture(e),alphaTest:jx});return en(t),t}static getPhongMaterialFromLink(e,t,n=.5){return io(new js({map:s.loadTexture(e),transparent:!!t,specular:new x().setScalar(n),shininess:20}))}static getModelMaterialFromLink(e,t){let n=t?s.getPhongMaterialFromLink(e,!1,t):s.getLambertMaterialFromLink(e);return s.addWindowLights(n,e)}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};function ey(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new hn;l.morphTargetsRelative=a;let c=0;for(let u=0;u<s.length;++u){let h=s[u],d=0,p=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in h.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;if(h.morphAttributes[f].length!==s[0].morphAttributes[f].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have the same number of morph targets for the "'+f+'" morph attribute.'),null;o[f]===void 0&&(o[f]=[]),o[f].push(h.morphAttributes[f]),p++}if(p!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of morph attributes."),null;if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(t){let u=0,h=[];for(let d=0;d<s.length;++d){let p=s[d].index;for(let f=0;f<p.count;++f)h.push(p.getX(f)+u);u+=s[d].attributes.position.count}l.setIndex(h)}for(let u in r){let h=Qx(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(let u in o){let h=o[u][0].length;if(h!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<h;++d){let p=[];for(let _=0;_<o[u].length;++_)p.push(o[u][_][d]);let f=Qx(p);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(f)}}}return l}function Qx(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){let u=s[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*t}let o=new e(r),a=new un(o,t,n),l=0;for(let c=0;c<s.length;++c){let u=s[c];if(u.isInterleavedBufferAttribute){let h=l/t;for(let d=0,p=u.count;d<p;d++)for(let f=0;f<t;f++){let _=u.getComponent(d,f);a.setComponent(d+h,f,_)}}else o.set(u.array,l);l+=u.count*t}return i!==void 0&&(a.gpuType=i),a}var ni=class s{static makeCube(e,t){let n=Pi.getMaterialFromLink(e),i=new Bi(t,t,t);return new bt(i,n)}static makeBox(e,t){let n=Pi.getMaterialFromLink(e),i=new Bi(t.x,t.y,t.z);return new bt(i,n)}static makeSprite(e,t){let n=Pi.getSpriteMaterialFromLink(e);n.depthTest=!0,n.depthWrite=!0,n.side=Gt;let i=new us(n);i.scale.set(t.x,t.y,1),i.position.y=t.y/2;let r=new Pn;return r.add(i),r}static makePlane(e,t,n){let i=Pi.getMaterialFromLink(e,n);i.depthTest=!0,i.depthWrite=!0,i.side=Gt;let r=new it(t.x,t.y);return new bt(r,i)}static makePlaneFromPoints(e,t,n){let i=Pi.getLambertMaterialFromLink(e,n);i.depthTest=!0,i.depthWrite=!0,i.side=Gt;let r=new hn,o=new w(t.b.x-t.a.x,t.b.y-t.a.y,t.b.z-t.a.z),l=new w(t.c.x-t.a.x,t.c.y-t.a.y,t.c.z-t.a.z).clone().cross(o).y>=0;r.setIndex(l?[0,3,2,0,2,1]:[0,2,3,0,1,2]),r.setAttribute("position",new un(new Float32Array([t.a.x,t.a.y,t.a.z,t.b.x,t.b.y,t.b.z,t.c.x,t.c.y,t.c.z,t.d.x,t.d.y,t.d.z]),3));let c=[0,1,1,1,1,0,0,0];r.setAttribute("uv",new Yt(c,2)),r.computeVertexNormals();let u=new bt(r,i);return u.receiveShadow=!0,u.userData[ma]=!0,u}static makePhongPlane(e,t,n){let i=Pi.getPhongMaterialFromLink(e,n),r=new it(t.x,t.y);return new bt(r,i)}static makeModel(e){let t=new Pn;return e.boxes.forEach(n=>{let i=Pi.getModelMaterialFromLink(e.tex.link,n.shininess),r=new Bi(n.size.x,n.size.y,n.size.z),o=r.getAttribute("uv"),a=new _e;for(let c=0;c<o.count;c++){a.fromBufferAttribute(o,c);let u=Math.floor(c/4),h=null;switch(u){case 0:h=n.uvs.right;break;case 1:h=n.uvs.left;break;case 2:h=n.uvs.top;break;case 3:h=n.uvs.bottom;break;case 4:h=n.uvs.front;break;case 5:h=n.uvs.back;break}if(h){let d=h.min.x/e.tex.size.x,p=h.max.x/e.tex.size.x,f=(e.tex.size.y-h.min.y)/e.tex.size.y,_=(e.tex.size.y-h.max.y)/e.tex.size.y;c%4===0&&o.setXY(c,d,_),c%4===1&&o.setXY(c,p,_),c%4===2&&o.setXY(c,d,f),c%4===3&&o.setXY(c,p,f)}}switch(n.side){case 0:i.side=$n;break;case 1:i.side=wn;break;case 2:i.side=Gt;break;default:i.side=$n;break}i.depthWrite=!!n.depthWrite,i.depthTest=!!n.depthTest,i.alphaTest=.5;let l=new bt(r,i);l.castShadow=!0,l.receiveShadow=!0,l.userData[ma]=!0,l.position.x=n.pos.x,l.position.y=n.pos.y,l.position.z=n.pos.z,l.rotation.x=n.rot.x,l.rotation.y=n.rot.y,l.rotation.z=n.rot.z,t.add(l)}),e.planes.forEach(n=>{let i=Pi.getModelMaterialFromLink(e.tex.link,n.shininess),r=new it(n.size.x,n.size.y),o=r.getAttribute("uv"),a=new _e;for(let c=0;c<o.count;c++){a.fromBufferAttribute(o,c);let u=Math.floor(c/4),h=null;switch(u){case 0:h=n.uvs.front;break;case 1:h=n.uvs.back;break}if(h){let d=h.min.x/e.tex.size.x,p=h.max.x/e.tex.size.x,f=(e.tex.size.y-h.min.y)/e.tex.size.y,_=(e.tex.size.y-h.max.y)/e.tex.size.y;c%4===0&&o.setXY(c,d,_),c%4===1&&o.setXY(c,p,_),c%4===2&&o.setXY(c,d,f),c%4===3&&o.setXY(c,p,f)}}switch(n.side){case 0:i.side=$n;break;case 1:i.side=wn;break;case 2:i.side=Gt;break;default:i.side=$n;break}i.depthWrite=!!n.depthWrite,i.depthTest=!!n.depthTest,i.alphaTest=.5;let l=new bt(r,i);l.castShadow=!0,l.receiveShadow=!0,l.userData[ma]=!0,l.position.x=n.pos.x,l.position.y=n.pos.y,l.position.z=n.pos.z,l.rotation.x=n.rot.x,l.rotation.y=n.rot.y,l.rotation.z=n.rot.z,t.add(l)}),e.sway&&s.addSwayAttribute(t,e.sway),s.mergeParts(t),t}static mergeParts(e){let t=new Map;for(let n of e.children){let i=n,r=i.material;if(!r.depthTest)continue;let o=r.isMeshPhongMaterial?r.specular.r:-1,a=[r.type,o,r.side,r.depthWrite,r.depthTest].join("|");t.set(a,[...t.get(a)??[],i])}for(let n of t.values()){if(n.length<2)continue;let i=n.map(l=>(l.updateMatrix(),l.geometry.clone().applyMatrix4(l.matrix))),r=ey(i);if(i.forEach(l=>l.dispose()),!r)continue;let o=n[0],a=new bt(r,o.material);a.castShadow=o.castShadow,a.receiveShadow=o.receiveShadow,a.userData=Ve({},o.userData),o.customDepthMaterial&&(a.customDepthMaterial=o.customDepthMaterial),n.forEach(l=>{e.remove(l),l.geometry.dispose(),l!==o&&l.material.dispose()}),e.add(a)}}static addSwayAttribute(e,t){let n=e.children.filter(o=>o instanceof bt),i=new w,r=0;n.forEach(o=>{o.updateMatrix();let a=o.geometry.getAttribute("position");for(let l=0;l<a.count;l++)r=Math.max(r,i.fromBufferAttribute(a,l).applyMatrix4(o.matrix).y)}),!(r<=0)&&n.forEach(o=>{let a=o.geometry.getAttribute("position"),l=new Float32Array(a.count);for(let c=0;c<a.count;c++){let u=F.clamp(i.fromBufferAttribute(a,c).applyMatrix4(o.matrix).y/r,0,1);l[c]=t*Math.pow(u,1.5)}o.geometry.setAttribute(Wi,new un(l,1)),o.customDepthMaterial=d0()})}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var co="assets/tex/tileset.png",xi={x:477,y:800};function Hs(s,e){return{x:1+17*s,y:1+17*e}}var rp=[{id:"sand",label:"Sable",center:[0,0],blocking:!1,shoreVariants:[[0,27,0],[2,27,50],[4,27,100],[3,27,145],[1,27,200],[2,28,118],[4,28,179],[3,28,217],[1,28,236]],variants:[[0,0,0],[3,2,16],[1,2,32],[2,2,64],[4,2,128],[2,0,50],[4,0,100],[3,0,145],[1,0,200],[2,1,118],[4,1,179],[3,1,217],[1,1,236]]},{id:"grass-light",label:"Herbe claire",center:[0,3],blocking:!1,variants:[[0,3,0],[1,5,0],[2,5,0],[3,5,0],[4,5,0],[2,3,34],[1,3,72],[4,3,100],[3,3,145],[2,4,102],[1,4,108],[4,4,179],[3,4,217]]},{id:"dirt",label:"Terre",center:[0,6],blocking:!1,variants:[[0,6,0],[3,8,16],[1,8,32],[2,8,64],[4,8,128],[2,6,50],[4,6,100],[3,6,145],[1,6,200],[2,7,118],[4,7,179],[3,7,217],[1,7,236]]},{id:"speckled",label:"Herbe mouchet\xE9e",center:[0,9],blocking:!1,variants:[[0,9,0],[1,11,0],[2,11,0],[3,11,0],[4,11,0],[2,9,50],[4,9,100],[3,9,145],[1,9,200],[2,10,118],[4,10,179],[3,10,217],[1,10,236]]},{id:"stone",label:"Dalles",center:[0,12],blocking:!1,variants:[[0,12,0],[1,14,0],[2,14,0],[3,14,0],[4,14,0],[2,12,50],[4,12,100],[3,12,145],[1,12,200],[2,13,118],[4,13,179],[3,13,217],[1,13,236]]},{id:"paving",label:"Pav\xE9s",center:[0,15],blocking:!1,variants:[[0,15,0],[3,17,16],[1,17,32],[2,17,64],[4,17,128],[2,15,50],[4,15,100],[3,15,145],[1,15,200],[2,16,118],[4,16,179],[3,16,217],[1,16,236]]},{id:"gravel",label:"Gravier",center:[0,24],blocking:!1,variants:[[0,24,0],[3,26,16],[1,26,32],[2,26,64],[4,26,128],[2,24,50],[4,24,100],[3,24,145],[1,24,200],[2,25,118],[4,25,179],[3,25,217],[1,25,236]]},{id:"water",label:"Eau",center:[11,1],blocking:!0,variants:[[11,1,0],[11,2,100],[12,1,55],[11,0,155],[10,1,205],[12,2,119],[10,2,237],[12,0,191],[10,0,223]]},{id:"grass",label:"Herbe",center:[6,1],blocking:!1,variants:[]},{id:"grass-tuft",label:"Herbe touffue",center:[6,0],blocking:!1,variants:[]},{id:"deep-water",label:"Eau profonde",center:[11,12],blocking:!0,variants:[]},{id:"planks",label:"Planches",center:[0,18],blocking:!1,variants:[]}],_a=[[0,-1],[1,0],[0,1],[-1,0],[1,-1],[1,1],[-1,1],[-1,-1]];function op(s,e,t=!1){let n=t&&s.shoreVariants?s.shoreVariants:s.variants;if(!n.length)return s.center;let[i,r,o,a,l,c,u,h]=e,p=[i,r,o,a,l||i||r,c||o||r,u||o||a,h||i||a].reduce((m,g,b)=>g?m|1<<b:m,0),f=n[0],_=1/0;for(let m of n){let g=m[2]^p,b=0;for(;g;)b+=g&1,g>>=1;b<_&&(f=m,_=b)}return[f[0],f[1]]}var ty="assets/tex/tileset-anim.png",SA=8,wA={water:{x:121,y:32},"deep-water":{x:121,y:66}};function ny(s,e){let t=wA[s];return t?{x:t.x+17*(e%SA),y:t.y}:null}function hr(s){return s?rp.find(e=>e.id===s):void 0}var ap={shallow:"water",water:"deep-water",flowers:null};var Ii=(i=>(i[i.UP=0]="UP",i[i.RIGHT=1]="RIGHT",i[i.DOWN=2]="DOWN",i[i.LEFT=3]="LEFT",i))(Ii||{});function iy(s){return[2,1].indexOf(s.status)>=0}var uo=(i=>(i[i.LOG=0]="LOG",i[i.MESSAGE=1]="MESSAGE",i[i.WAIT=2]="WAIT",i[i.TELEPORT=3]="TELEPORT",i))(uo||{});var lp="pk-map-edits",oy=1,CA="ck-pallet-town.ts";function ay(s){let n=s,{originModel:e}=n;return rh(n,["originModel"])}function ly(s){let e=null;try{e=JSON.parse(localStorage.getItem(lp)??"null")}catch{e=null}return!e||e.version!==oy||!e.chunks?!1:(s.chunks.forEach(t=>{let n=e.chunks[t.id];n?.buildings&&(t.buildings=n.buildings.map(i=>Ve({},i))),n?.heights&&(t.heights=Ve({},n.heights)),n?.stairs&&(t.stairs=Ve({},n.stairs)),n?.tiles&&(t.tiles={},Object.entries(n.tiles).forEach(([i,r])=>{let o=r in ap?ap[r]:r;o&&(t.tiles[i]=o)}))}),!0)}function cy(s){let e={version:oy,chunks:{}};s.chunks.forEach(t=>e.chunks[t.id]={buildings:t.buildings.map(ay),tiles:t.tiles,heights:t.heights,stairs:t.stairs});try{localStorage.setItem(lp,JSON.stringify(e))}catch{}}function uy(){try{localStorage.removeItem(lp)}catch{}}function RA(s){return"PC_"+s.toUpperCase().replace(/[^A-Z0-9]+/g,"_")}var sy={direction:["PlayerDirection",Ii],pressedKeys:["KeyCode",gi],type:["InstructionType",uo]};function Fu(s,e,t){let n=e+"  ";if(t&&t in sy&&(typeof s=="number"||Array.isArray(s))){let[i,r]=sy[t],o=a=>typeof a=="number"&&r[a]?`${i}.${r[a]}`:JSON.stringify(a);return Array.isArray(s)?`[${s.map(o).join(", ")}]`:o(s)}if(Array.isArray(s))return s.length?`[
${s.map(i=>n+Fu(i,n)).join(`,
`)}
${e}]`:"[]";if(s&&typeof s=="object"){let i=Object.entries(s).filter(([,r])=>r!==void 0);return i.every(([,r])=>typeof r!="object"||r===null)&&i.length<=4?`{ ${i.map(([r,o])=>`${ry(r)}: ${Fu(o,n,r)}`).join(", ")} }`:`{
${i.map(([r,o])=>`${n}${ry(r)}: ${Fu(o,n,r)}`).join(`,
`)}
${e}}`}return typeof s=="string"?`'${s.replace(/\\/g,"\\\\").replace(/'/g,"\\'")}'`:JSON.stringify(s)}function ry(s){return/^[A-Za-z_$][\w$]*$/.test(s)?s:`'${s}'`}function AA(s){let e=["import { SceneChunk } from '../../../../app/modules/game/shared/model/SceneMap';","import { PlayerDirection } from '../../../../app/modules/game/shared/model/ScenePlayer';","import { KeyCode } from '../../../../app/core/shared/model/PressedKey';","import { InstructionType } from '../../../../app/modules/game/shared/model/SceneEventInstruction';","","// Generated by the map editor (export). Edit the map in the game (B key), then export again.","",""].join(`
`),t=s.chunks.map(n=>{let i={id:n.id,pos:n.pos,size:n.size,buildings:n.buildings.map(ay),grounds:n.grounds.map(a=>{var l=a,{mesh:r}=l,o=rh(l,["mesh"]);return o}),tiles:n.tiles&&Object.keys(n.tiles).length?n.tiles:void 0,heights:n.heights&&Object.keys(n.heights).length?n.heights:void 0,stairs:n.stairs&&Object.keys(n.stairs).length?n.stairs:void 0};return`export const ${RA(n.id)}: SceneChunk = ${Fu(i,"")};
`});return e+t.join(`
`)}function hy(s){let e=new Blob([AA(s)],{type:"text/plain"}),t=URL.createObjectURL(e),n=document.createElement("a");n.href=t,n.download=CA,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}var PA=.4,IA=1.8,LA=.0012,DA=3,Us=8,NA=5,OA=.55,dy=16756810,FA=100,HA=400,UA=4096,ho=class s{keyService=je(Cn);savedPosition=new w;savedZoom=1;drag=null;ghost=null;ghostAt=null;pointer=new _e;selected=null;selectionBox=new nn;selectionHelper=new $o(this.selectionBox,dy);undoStack=[];redoStack=[];saveTimer;stroke=null;brush=new Bo(new hn().setFromPoints([[0,0],[16,0],[16,16],[0,16]].map(([e,t])=>new w(e,0,t))),new Js({color:dy,depthTest:!1}));attach(e){let t=e.canvas;this.selectionHelper.visible=!1,e.scene.add(this.selectionHelper),this.brush.visible=!1,this.brush.renderOrder=20,e.scene.add(this.brush),t.addEventListener("contextmenu",i=>{e.editMode&&i.preventDefault()}),t.addEventListener("pointerdown",i=>{if(!e.editMode)return;if(i.button===1||i.button===2){this.drag={startX:i.clientX,startY:i.clientY,x:i.clientX,y:i.clientY,hit:null,dragging:!0,moving:!1,panOnly:!0},t.setPointerCapture(i.pointerId);return}if(i.button!==0)return;if(e.editTileId){this.stroke={cells:new Map,levels:new Map,stairs:new Map},this.paintAt(e,i.clientX,i.clientY),t.setPointerCapture(i.pointerId);return}let r=e.editModelId?null:this.pick(e,i.clientX,i.clientY);if(this.drag={startX:i.clientX,startY:i.clientY,x:i.clientX,y:i.clientY,hit:r,dragging:!1,moving:!1},r&&this.selected&&r.building===this.selected.building&&e.mapHelper){let o=e.mapHelper.buildingWorldPos(r.chunk,r.building),a=this.groundAt(e,i.clientX,i.clientY);this.drag.moving=!0,this.drag.from=o,this.drag.grab=a?o.clone().sub(a).setY(0):new w}t.setPointerCapture(i.pointerId)}),t.addEventListener("pointermove",i=>{if(!e.editMode)return;if(this.moveBrush(e,i.clientX,i.clientY),this.stroke){this.paintAt(e,i.clientX,i.clientY);return}let r=this.drag;r&&!r.dragging&&Math.hypot(i.clientX-r.startX,i.clientY-r.startY)>NA&&(r.dragging=!0),r?.dragging&&r.moving?this.dragSelected(e,i.clientX,i.clientY):r?.dragging&&this.pan(e,i.clientX-r.x,i.clientY-r.y),r&&(r.x=i.clientX,r.y=i.clientY),this.moveGhost(e,i.clientX,i.clientY)});let n=(i,r)=>{this.stroke&&this.endStroke(e);let o=this.drag;if(this.drag=null,t.hasPointerCapture(i.pointerId)&&t.releasePointerCapture(i.pointerId),!o||r){o?.moving&&o.from&&this.selected&&e.mapHelper&&(e.mapHelper.moveBuilding(this.selected.chunk,this.selected.building,o.from),this.refreshSelection(e));return}o.panOnly||(o.moving&&o.dragging?this.endMove(e,o):o.dragging||(e.editModelId?this.place(e):this.select(e,o.hit)))};t.addEventListener("pointerup",i=>n(i,!1)),t.addEventListener("pointercancel",i=>n(i,!0)),t.addEventListener("pointerleave",()=>{this.showGhostAt(null),this.brush.visible=!1}),t.addEventListener("wheel",i=>{e.editMode&&(i.preventDefault(),this.setZoom(e,e.cameraZoom*Math.exp(i.deltaY*LA)))},{passive:!1})}enter(e){e.editMode||(this.savedPosition.copy(e.camera.position),this.savedZoom=e.cameraZoom,e.editMode=!0,this.updateHistoryFlags(e))}exit(e){e.editMode&&(e.editMode=!1,this.drag=null,this.showGhostAt(null),this.brush.visible=!1,this.select(e,null),e.cameraZoom=this.savedZoom,e.camera.position.copy(this.savedPosition),this.updateFar(e),e.mapHelper?.updateCameraAim())}selectModel(e,t){e.editModelId=t,t&&(this.select(e,null),e.editTileId=null,this.brush.visible=!1),this.ghost&&(e.scene.remove(this.ghost),this.ghost=null);let n=t?Fs.find(i=>i.id===t):void 0;n&&(this.ghost=ni.makeModel(n),this.ghost.traverse(i=>{let r=i;if(r.isMesh){let o=r.material.clone();o.transparent=!0,o.opacity=OA,o.depthWrite=!1,r.material=o,r.castShadow=!1,r.receiveShadow=!1}}),this.ghost.visible=!1,e.scene.add(this.ghost)),this.ghostAt=null}selectTile(e,t){t&&(this.selectModel(e,null),this.select(e,null)),e.editTileId=t,this.brush.visible=!1}setBrush(e,t){e.editBrush=t}command(e,t){if(e.editMode)switch(t){case"undo":this.undo(e);break;case"redo":this.redo(e);break;case"deselect":this.select(e,null);break;case"delete":this.deleteSelected(e);break;case"togglePassable":this.toggleOption(e,"passable");break;case"toggleCanHide":this.toggleOption(e,"canHide");break;case"export":e.mapHelper&&hy(e.mapHelper.sceneMap);break;case"reset":clearTimeout(this.saveTimer),uy(),location.reload();break}}update(e){let t=this.keyService.holdedCodes,n=DA*e.cameraZoom,i=(t.includes(3)?1:0)-(t.includes(2)?1:0),r=(t.includes(4)?1:0)-(t.includes(5)?1:0);(i||r)&&(e.camera.position.x+=i*n,e.camera.position.z+=r*n,e.mapHelper?.updateCameraAim());let o=e.mapHelper;if(o){let a=e.getCameraTarget();o.sceneMap.chunks.forEach(l=>{l.visible&&l.buildings.forEach(c=>o.updateVisibleMesh(l.id+"-"+c.id,a,c.canHide))})}}select(e,t){this.selected=t,this.refreshSelection(e)}refreshSelection(e){let t=this.selected,n=t&&e.mapHelper?.buildingBounds(t.chunk,t.building);this.selectionHelper.visible=!!n,n&&this.selectionBox.copy(n),e.editSelection=t?{modelId:t.building.modelId,passable:t.building.passable,canHide:t.building.canHide}:null}pick(e,t,n){let i=e.mapHelper;if(!i)return null;this.setRay(e,t,n);let r=e.raycaster.intersectObjects(i.pickableBuildingMeshes(),!0).filter(o=>o.object.material?.colorWrite!==!1);return r.length?i.findBuilding(r[0].object,r[0].instanceId):null}dragSelected(e,t,n){let i=this.drag,r=this.groundAt(e,t,n);if(!i?.grab||!r||!this.selected||!e.mapHelper)return;let o=r.add(i.grab);o.set(Math.round(o.x/Us)*Us,Math.round(r.y*1e3)/1e3,Math.round(o.z/Us)*Us),e.mapHelper.moveBuilding(this.selected.chunk,this.selected.building,o)&&(this.selected.chunk=this.chunkOf(e,this.selected.building)??this.selected.chunk,this.refreshSelection(e))}endMove(e,t){let n=this.selected;if(!n||!t.from||!e.mapHelper)return;let i=t.from.clone(),r=e.mapHelper.buildingWorldPos(n.chunk,n.building);if(r.equals(i))return;let o=n.building;this.record(e,{undo:()=>this.moveTo(e,o,i),redo:()=>this.moveTo(e,o,r)})}moveTo(e,t,n){let i=this.chunkOf(e,t);i&&e.mapHelper?.moveBuilding(i,t,n)&&this.select(e,{chunk:this.chunkOf(e,t)??i,building:t})}deleteSelected(e){let t=this.selected;if(!t||!e.mapHelper)return;let n=t.building,i=t.chunk,r=()=>{let o=this.chunkOf(e,n);o&&e.mapHelper?.removeBuilding(o,n),this.selected?.building===n&&this.select(e,null)};r(),this.record(e,{undo:()=>{e.mapHelper?.addBuilding(i,n),this.select(e,{chunk:i,building:n})},redo:r})}toggleOption(e,t){let n=this.selected;if(!n)return;let i=n.building,r=!i[t],o=a=>{i[t]=a;let l=this.chunkOf(e,i);l&&(e.mapHelper?.refreshBuilding(l,i),this.select(e,{chunk:l,building:i}))};o(r),this.record(e,{undo:()=>o(!r),redo:()=>o(r)})}chunkOf(e,t){return e.mapHelper?.sceneMap.chunks.find(n=>n.buildings.includes(t))}record(e,t){this.undoStack.push(t),this.undoStack.length>FA&&this.undoStack.shift(),this.redoStack.length=0,this.updateHistoryFlags(e)}undo(e){let t=this.undoStack.pop();t&&(t.undo(),this.redoStack.push(t),this.updateHistoryFlags(e))}redo(e){let t=this.redoStack.pop();t&&(t.redo(),this.undoStack.push(t),this.updateHistoryFlags(e))}updateHistoryFlags(e){e.editCanUndo=this.undoStack.length>0,e.editCanRedo=this.redoStack.length>0,this.scheduleSave(e)}scheduleSave(e){!this.undoStack.length&&!this.redoStack.length||(clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>{e.mapHelper&&cy(e.mapHelper.sceneMap)},HA))}moveGhost(e,t,n){if(!this.ghost)return;let i=this.groundAt(e,t,n);this.showGhostAt(i?new w(Math.round(i.x/Us)*Us,Math.round(i.y*1e3)/1e3,Math.round(i.z/Us)*Us):null)}showGhostAt(e){this.ghostAt=e,this.ghost&&(this.ghost.visible=!!e,e&&this.ghost.position.copy(e))}place(e){let t=e.mapHelper;if(!e.editModelId||!this.ghostAt||!t)return;let n=t.addBuildingAt(e.editModelId,this.ghostAt),i=n&&this.chunkOf(e,n);!n||!i||this.record(e,{undo:()=>{let r=this.chunkOf(e,n);r&&t.removeBuilding(r,n),this.selected?.building===n&&this.select(e,null)},redo:()=>t.addBuilding(i,n)})}moveBrush(e,t,n){let i=e.editTileId?this.groundAt(e,t,n):null,r=i&&e.mapHelper?.cellAt(i.x,i.z);this.brush.visible=!!r;let o=e.editBrush==="fill"?1:e.editBrush;this.brush.scale.set(o,1,o),r&&this.brush.position.set(r.chunk.pos.x-r.chunk.size.x/2+r.col*16,i.y+.3,r.chunk.pos.z-r.chunk.size.y/2+r.row*16)}paintAt(e,t,n){let i=this.groundAt(e,t,n),r=e.mapHelper;if(!i||!this.stroke||!r)return;let o=e.editTileId!=="raise"&&e.editTileId!=="lower"&&e.editTileId!=="stairs";if(e.editBrush==="fill"&&o){this.stroke.cells.size||this.fillCells(e,i.x,i.z).forEach(l=>this.paintCell(e,l));return}let a=e.editBrush==="fill"?1:e.editBrush;for(let l=0;l<a;l++)for(let c=0;c<a;c++){let u=r.cellAt(i.x+l*16,i.z+c*16);u&&this.paintCell(e,u)}}fillCells(e,t,n){let i=e.mapHelper,r=i.cellAt(t,n);if(!r)return[];let o=d=>d.chunk.tiles?.[d.col+","+d.row],a=o(r),l=d=>[d.chunk.pos.x-d.chunk.size.x/2+(d.col+.5)*16,d.chunk.pos.z-d.chunk.size.y/2+(d.row+.5)*16],c=new Set,u=[],h=[r];for(;h.length&&u.length<UA;){let d=h.shift(),p=d.chunk.id+":"+d.col+","+d.row;if(c.has(p)||o(d)!==a)continue;c.add(p),u.push(d);let[f,_]=l(d);for(let[m,g]of[[16,0],[-16,0],[0,16],[0,-16]]){let b=i.cellAt(f+m,_+g);b&&h.push(b)}}return u}paintCell(e,t){if(!this.stroke||!e.mapHelper)return;let n=t.chunk.id+":"+t.col+","+t.row;if(e.editTileId==="raise"||e.editTileId==="lower"){if(!this.stroke.levels.has(n)){let o=e.mapHelper.levelAt(t.chunk,t.col,t.row),a=o+(e.editTileId==="raise"?1:-1);e.mapHelper.setLevel(t.chunk,t.col,t.row,a),this.stroke.levels.set(n,ht(Ve({},t),{before:o,after:e.mapHelper.levelAt(t.chunk,t.col,t.row)}))}return}if(e.editTileId==="stairs"||e.editTileId==="erase"){let o=Os(t.chunk.stairs?.[t.col+","+t.row]);if(!this.stroke.stairs.has(n)&&(o||e.editTileId==="stairs")){e.mapHelper.setStairs(t.chunk,t.col,t.row,e.editTileId==="stairs"?"auto":null);let a=Os(t.chunk.stairs?.[t.col+","+t.row]);this.stroke.stairs.set(n,ht(Ve({},t),{before:o,after:a}))}if(e.editTileId==="stairs")return}let i=e.editTileId==="erase"?null:e.editTileId,r=t.chunk.tiles?.[t.col+","+t.row]??null;r!==i&&(this.stroke.cells.has(n)||this.stroke.cells.set(n,ht(Ve({},t),{before:r,after:i})),e.mapHelper.paintCell(t.chunk,t.col,t.row,i))}endStroke(e){let t=[...this.stroke?.cells.values()??[]],n=[...this.stroke?.levels.values()??[]].filter(o=>o.before!==o.after),i=[...this.stroke?.stairs.values()??[]];if(this.stroke=null,!t.length&&!n.length&&!i.length||!e.mapHelper)return;let r=e.mapHelper;this.record(e,{undo:()=>{t.forEach(o=>r.paintCell(o.chunk,o.col,o.row,o.before)),n.forEach(o=>r.setLevel(o.chunk,o.col,o.row,o.before)),i.forEach(o=>r.setStairs(o.chunk,o.col,o.row,o.before))},redo:()=>{t.forEach(o=>r.paintCell(o.chunk,o.col,o.row,o.after)),n.forEach(o=>r.setLevel(o.chunk,o.col,o.row,o.after)),i.forEach(o=>r.setStairs(o.chunk,o.col,o.row,o.after))}})}setRay(e,t,n){let i=e.canvas.getBoundingClientRect();this.pointer.set((t-i.left)/i.width*2-1,-((n-i.top)/i.height)*2+1),e.raycaster.setFromCamera(this.pointer,e.camera)}groundAt(e,t,n){if(!e.mapHelper)return null;this.setRay(e,t,n);let i=e.mapHelper.sceneMap.chunks.filter(r=>r.visible).flatMap(r=>r.grounds.filter(o=>o.passable&&o.mesh).map(o=>o.mesh));return e.raycaster.intersectObjects(i,!1)[0]?.point.clone()??null}pan(e,t,n){let i=e.camera,r=e.cameraOffset(),o=r.length(),a=2*o*Math.tan(F.degToRad(i.fov/2))/e.canvas.clientHeight,l=r.y/o;i.position.x-=t*a,i.position.z-=n*a/l,e.mapHelper?.updateCameraAim()}setZoom(e,t){let n=e.getCameraTarget();e.cameraZoom=F.clamp(t,PA,IA),e.camera.position.copy(n).add(e.cameraOffset()),this.updateFar(e),e.mapHelper?.updateCameraAim()}updateFar(e){e.camera.far=(ps+ti)*Math.max(1,e.cameraZoom),e.camera.updateProjectionMatrix()}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var py={id:"player",pos:{x:0,y:0,z:0},dir:2,tex:{link:"assets/tex/sprite.png",size:{x:14,y:21}}};function fy(s){return new _e(s.x,s.y)}function ks(s){return new w(s.x,s.y,s.z)}var dr=class s{static getDist(e,t){let n=Math.pow(e.x-t.x,2),i=Math.pow(e.y-t.y,2),r=Math.pow(e.z-t.z,2);return Math.sqrt(n+i+r)}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var pr=8,my=6,cp=[[20,18],[21,18]],gy=[20,17];function xy(s,e,t=()=>null){let n=s.size.x/16,i=s.size.y/16,r=s.size.x/2,o=s.size.y/2,a=[],l=[],c=[],u=[],h=(f,_,m,g)=>{for(let b of[0,1,2,0,2,3])f.push(...m[b]),_.push(...g[b])},d=(f,_)=>[(f+r)/s.size.x,1-(_+o)/s.size.y];for(let f=0;f<i;f++)for(let _=0;_<n;_++){let m=e(_,f),g=m*pr,b=_*16-r,C=f*16-o,T=b+16,A=C+16,P=t(_,f),y=$=>$?g+pr:g,M=y(P==="n"||P==="w"),G=y(P==="s"||P==="w"),N=y(P==="s"||P==="e"),O=y(P==="n"||P==="e");if(h(a,l,[[b,M,C],[b,G,A],[T,N,A],[T,O,C]],[d(b,C),d(b,A),d(T,A),d(T,C)]),P){let $=Hs(...cp[0]),D=$.x/xi.x,X=($.x+16)/xi.x,ie=1-$.y/xi.y,z=1-($.y+16)/xi.y,ce=[[0,1,[b,A,G],[T,A,N]],[0,-1,[T,C,O],[b,C,M]],[1,0,[T,A,N],[T,C,O]],[-1,0,[b,C,M],[b,A,G]]];for(let[Z,se,[le,Pe,Ke],[j,Te,Ae]]of ce){if(Ke===Ae||e(_+Z,f+se)>m)continue;let[ze,Me,et,tn]=Ke>Ae?[le,Pe,Ke,D]:[j,Te,Ae,X];c.push(le,g,Pe,j,g,Te,ze,et,Me),u.push(D,z,X,z,tn,ie)}}if(!m)continue;let W=[[0,1,[b,A],[T,A]],[0,-1,[T,C],[b,C]],[1,0,[T,A],[T,C]],[-1,0,[b,C],[b,A]]];for(let[$,D,[X,ie],[z,ce]]of W){let Z=e(_+$,f+D);for(let se=Z;se<m;se++){let le=cp[(_+f+se)%cp.length],Pe=Hs(...le),Ke=Pe.x/xi.x,j=(Pe.x+16)/xi.x,Te=1-Pe.y/xi.y,Ae=1-(Pe.y+16)/xi.y,ze=se*pr,Me=ze+pr;h(c,u,[[X,ze,ie],[z,ze,ce],[z,Me,ce],[X,Me,ie]],[[Ke,Ae],[j,Ae],[j,Te],[Ke,Te]])}}}let p=new hn;return p.setAttribute("position",new Yt([...a,...c],3)),p.setAttribute("uv",new Yt([...l,...u],2)),p.addGroup(0,a.length/3,0),p.addGroup(a.length/3,c.length/3,1),p.computeVertexNormals(),p}var kA=2,BA=8,yy=new Map;function _y(s){let e=yy.get(s.id);if(!e){let t=ni.makeModel(s);t.updateMatrixWorld(!0);let n=t.children.filter(i=>i.isMesh).map(i=>({mesh:i,matrix:i.matrix.clone()}));e={parts:n,bounds:new nn().setFromObject(t),instanceable:n.every(i=>i.mesh.material.depthTest)},yy.set(s.id,e)}return e}function Ey(s,e){return!e.canHide&&!e.events.length&&_y(s).instanceable}var Hu=class{constructor(e,t){this.group=t;this.template=_y(e),this.grow(BA)}group;buildings=[];parts=[];template;capacity=0;matrix=new Ie;position=new Ie;boundsAt(e){return this.template.bounds.clone().translate(e)}has(e){return this.buildings.includes(e)}add(e,t){this.buildings.length>=this.capacity&&this.grow(this.capacity*kA),this.buildings.push(e),this.write(this.buildings.length-1,t),this.updateCount()}remove(e){let t=this.buildings.indexOf(e);if(t<0)return;let n=this.buildings.length-1;t!==n&&(this.buildings[t]=this.buildings[n],this.parts.forEach(i=>{i.getMatrixAt(n,this.matrix),i.setMatrixAt(t,this.matrix)})),this.buildings.pop(),this.updateCount()}move(e,t){let n=this.buildings.indexOf(e);n>=0&&(this.write(n,t),this.updateCount())}buildingAt(e){return e===void 0?null:this.buildings[e]??null}dispose(){this.parts.forEach(e=>{e.removeFromParent(),e.dispose()}),this.parts=[]}write(e,t){this.position.makeTranslation(t.x,t.y,t.z),this.template.parts.forEach(({matrix:n},i)=>this.parts[i].setMatrixAt(e,this.matrix.multiplyMatrices(this.position,n)))}updateCount(){this.parts.forEach(e=>{e.count=this.buildings.length,e.instanceMatrix.needsUpdate=!0,e.boundingSphere=null,e.boundingBox=null})}grow(e){let t=this.parts;this.parts=this.template.parts.map(({mesh:n},i)=>{let r=new St(n.geometry,n.material,e);r.instanceMatrix.setUsage(It),r.castShadow=n.castShadow,r.receiveShadow=n.receiveShadow,r.userData=Ve({},n.userData),n.customDepthMaterial&&(r.customDepthMaterial=n.customDepthMaterial),r.frustumCulled=!1,r.material.forceSinglePass=!0;for(let o=0;o<this.buildings.length;o++)t[i].getMatrixAt(o,this.matrix),r.setMatrixAt(o,this.matrix);return r.count=this.buildings.length,this.group.add(r),r}),t.forEach(n=>{n.removeFromParent(),n.dispose()}),this.capacity=e}};var zA=220,vy=new Map;function Uu(s){let e=vy.get(s);return e||(e=new Promise(t=>{let n=new Image;n.onload=()=>t(n),n.src=s}),vy.set(s,e)),e}var ku=class s{originGame;meshes={};sceneMap;scenePlayer;constructor(e){this.originGame=e.originGame,this.sceneMap=e.sceneMap,this.scenePlayer=e.scenePlayer}getPlayerScreenCoords(e){let t=new w,n=this.scenePlayer.mesh;if(!n)return null;let i=e.canvas.clientWidth/2,r=e.canvas.clientHeight/2;return n.updateMatrixWorld(),t.setFromMatrixPosition(n.matrixWorld),t.project(e.camera),t.x=t.x*i+i,t.y=-(t.y*r)+r,new _e(t.x,t.y)}buildPlayer(){let e=this.scenePlayer,t=new Pn,n=ni.makePlane(e.tex.link,fy(e.tex.size),!0),i=n.material;i.depthTest=!0,i.depthWrite=!0,i.side=Gt;let r=1/Math.cos(Math.atan2(Xn.y,Xn.z));n.scale.y=r;let o=n.material.clone();o.colorWrite=!1,o.depthWrite=!1,this.playerShadow=new bt(n.geometry,o),this.playerShadow.castShadow=!0,n.add(this.playerShadow),n.position.x=0,n.position.y=e.tex.size.y/2*r,n.position.z=0,t.add(n);let a=this.originGame.camera,l=this.originGame.scene;this.addMesh(e.id,t),a.position.x=n.position.x,l.add(t),this.scenePlayer.mesh=t,this.updateVisibleChunks()}updateVisibleChunks(e){let t=this.sceneMap.chunks,n=e??this.scenePlayer.mesh?.position;if(!n)return;let i=new w(n.x,n.y,this.originGame.camera.position.z);t.forEach(r=>{r.visible=s.isChunkVisible(r,i),r.group&&(r.group.visible=r.visible)})}static isChunkVisible(e,t){return!(e.pos.z-e.size.y/2>t.z||e.pos.z+e.size.y*1.4<t.z||e.pos.x+e.size.x*1.2<t.x||e.pos.x-e.size.x*1.2>t.x||Math.abs(e.pos.y-t.y)>ps+ti)}buildChunks(){this.sceneMap.chunks.forEach(e=>{let t=new Pn;e.group=t,e.grounds.forEach(n=>{let i=e.id+"-g-"+n.id,r=ni.makePlaneFromPoints(n.link,n.points);this.addMesh(i,r,ks(e.pos)),n.mesh=r,t.add(r),e.tiles&&Object.keys(e.tiles).length&&n===e.grounds[0]&&this.paintedGround(e),e.stairs&&Object.keys(e.stairs).length&&n===e.grounds[0]&&this.paintedGround(e),(e.heights&&Object.keys(e.heights).length||e.stairs&&Object.keys(e.stairs).length)&&n===e.grounds[0]&&this.rebuildGround(e)}),e.buildings.forEach(n=>this.createView(e,n)),this.originGame.scene.add(t)})}paintedGrounds=new Map;waterFrame=0;waterTimer;cellAt(e,t){let n=this.chunkAt(e,t);if(!n)return null;let i=Math.floor((e-n.pos.x+n.size.x/2)/16),r=Math.floor((t-n.pos.z+n.size.y/2)/16);return{chunk:n,col:i,row:r}}paintCell(e,t,n,i){let r=t+","+n;e.tiles??={},i?e.tiles[r]=i:delete e.tiles[r];let o=this.paintedGround(e);o&&this.drawCell(e,o,t,n);for(let[a,l]of _a){let c=this.neighborCell(e,t+a,n+l),u=c&&c.chunk.tiles?.[c.col+","+c.row]?this.paintedGround(c.chunk):null;c&&u&&this.drawCell(c.chunk,u,c.col,c.row)}}levelAt(e,t,n){let i=this.neighborCell(e,t,n);return i?.chunk.heights?.[i.col+","+i.row]??0}levelAtWorld(e,t){let n=this.cellAt(e,t);return n?n.chunk.heights?.[n.col+","+n.row]??0:0}stairsAt(e,t){let n=this.cellAt(e,t),i=n&&Os(n.chunk.stairs?.[n.col+","+n.row]);return!n||!i?null:{side:i,cx:n.chunk.pos.x-n.chunk.size.x/2+(n.col+.5)*16,cz:n.chunk.pos.z-n.chunk.size.y/2+(n.row+.5)*16}}isStairsAt(e,t){let n=this.cellAt(e,t);return!!n?.chunk.stairs?.[n.col+","+n.row]}setStairs(e,t,n,i){let r=t+","+n;if(e.stairs??={},i==="auto"){let a=this.levelAt(e,t,n);i=[["n",0,-1],["e",1,0],["w",-1,0],["s",0,1]].find(([,c,u])=>this.levelAt(e,t+c,n+u)===a+1)?.[0]??"n"}i?e.stairs[r]=i:delete e.stairs[r],this.rebuildGround(e);let o=this.paintedGround(e);o&&this.drawCell(e,o,t,n)}setLevel(e,t,n,i){let r=t+","+n;i=Math.max(0,Math.min(my,i)),e.heights??={},i?e.heights[r]=i:delete e.heights[r],this.rebuildGround(e),e.buildings.forEach(l=>{let c=Math.floor((l.pos.x+e.size.x/2)/16),u=Math.floor((l.pos.z+e.size.y/2)/16);if(c===t&&u===n){l.pos=ht(Ve({},l.pos),{y:i*pr});let h=this.instancesOf(e,l);h?h.move(l,this.buildingWorldPos(e,l)):this.meshes[e.id+"-"+l.id]?.position.setY(e.pos.y+i*pr)}});let o=e.size.x/16,a=e.size.y/16;if(t===0||n===0||t===o-1||n===a-1)for(let[l,c]of _a){let u=this.neighborCell(e,t+l,n+c);u&&u.chunk!==e&&this.rebuildGround(u.chunk)}}wallMaterial;rebuildGround(e){let t=e.grounds[0]?.mesh;if(!t)return;let n=t.geometry;if(t.geometry=xy(e,(i,r)=>this.levelAt(e,i,r),(i,r)=>Os(e.stairs?.[i+","+r])),n.dispose(),!this.wallMaterial){let i=new Qs().load(co);i.colorSpace=pt,i.magFilter=Wt,i.minFilter=Wt,this.wallMaterial=io(new Ts({map:i}))}Array.isArray(t.material)||(t.material=[t.material,this.wallMaterial]),t.castShadow=!0,t.receiveShadow=!0}neighborCell(e,t,n){let i=e.size.x/16,r=e.size.y/16;if(t>=0&&n>=0&&t<i&&n<r)return{chunk:e,col:t,row:n};let o=e.pos.x-e.size.x/2+(t+.5)*16,a=e.pos.z-e.size.y/2+(n+.5)*16;return this.cellAt(o,a)}differs(e,t){return t===e?!1:!(hr(e)?.blocking&&t==="sand")}terrainIdAt(e,t,n){let i=this.neighborCell(e,t,n);return i?.chunk.tiles?.[i.col+","+i.row]}paintedGround(e){let t=this.paintedGrounds.get(e.id),n=e.grounds[0];if(t||!n?.mesh)return t??null;let i=document.createElement("canvas");i.width=e.size.x,i.height=e.size.y;let r=i.getContext("2d");r.imageSmoothingEnabled=!1;let o=new Ft(i);o.colorSpace=pt,o.magFilter=Wt;let a=n.mesh.material,l=Array.isArray(a)?a[0]:a,c=io(new Ts({map:o,side:l.side}));n.mesh.material=Array.isArray(a)?[c,...a.slice(1)]:c;let u={ctx:r,texture:o,base:null};return this.paintedGrounds.set(e.id,u),this.waterTimer??=setInterval(()=>this.animateWater(),zA),Uu(n.link).then(h=>{u.base=h,r.drawImage(h,0,0,i.width,i.height),Object.keys(e.tiles??{}).forEach(d=>{let[p,f]=d.split(",").map(Number);this.drawCell(e,u,p,f)}),o.needsUpdate=!0}),u}animateWater(){this.waterFrame++,Uu(ty).then(e=>this.paintedGrounds.forEach((t,n)=>{let i=this.sceneMap.chunks.find(o=>o.id===n);if(!i?.visible||!i.tiles)return;let r=!1;Object.entries(i.tiles).forEach(([o,a])=>{let l=hr(a);if(!l?.blocking)return;let[c,u]=o.split(",").map(Number),h=_a.map(([_,m])=>this.differs(a,this.terrainIdAt(i,c+_,u+m))),[d,p]=op(l,h);if(d!==l.center[0]||p!==l.center[1])return;let f=ny(a,this.waterFrame);f&&(t.ctx.drawImage(e,f.x,f.y,16,16,c*16,u*16,16,16),r=!0)}),r&&(t.texture.needsUpdate=!0)}))}drawCell(e,t,n,i){let r=n*16,o=i*16,a=e.tiles?.[n+","+i],l=hr(a),c=Os(e.stairs?.[n+","+i]);if(c)Uu(co).then(u=>{if(Os(e.stairs?.[n+","+i])===c){let h=Hs(...gy),d=t.ctx;d.save(),d.translate(r+16/2,o+16/2),d.rotate({n:0,e:Math.PI/2,s:Math.PI,w:-Math.PI/2}[c]),d.drawImage(u,h.x,h.y,16,16,-16/2,-16/2,16,16),d.restore(),t.texture.needsUpdate=!0}});else if(l)Uu(co).then(u=>{if(e.tiles?.[n+","+i]===a){let h=_a.map(([m,g])=>this.terrainIdAt(e,n+m,i+g)),d=h.map(m=>this.differs(a,m)),p=h.filter(m=>m!==a),f=p.length>0&&p.every(m=>hr(m)?.blocking),_=Hs(...op(l,d,f));t.ctx.drawImage(u,_.x,_.y,16,16,r,o,16,16),t.texture.needsUpdate=!0}});else if(t.base){let u=t.base.width/e.size.x,h=t.base.height/e.size.y;t.ctx.drawImage(t.base,r*u,o*h,16*u,16*h,r,o,16,16),t.texture.needsUpdate=!0}}chunkAt(e,t){return this.sceneMap.chunks.find(n=>Math.abs(e-n.pos.x)<=n.size.x/2&&Math.abs(t-n.pos.z)<=n.size.y/2)}addBuildingAt(e,t){let n=this.chunkAt(t.x,t.z),i=Fs.find(o=>o.id===e);if(!n||!i||!n.group)return null;let r=ht(Ve({id:`${e}-${Date.now().toString(36)}${Math.floor(Math.random()*1296).toString(36)}`,modelId:e,pos:{x:t.x-n.pos.x,y:t.y-n.pos.y,z:t.z-n.pos.z}},this.defaultOptions(e)),{originModel:i,events:[]});return this.addBuilding(n,r),r}addBuilding(e,t){let n=t.originModel??Fs.find(i=>i.id===t.modelId);!n||!e.group||(t.originModel=n,e.buildings.push(t),this.createView(e,t))}instances=new Map;instancesOf(e,t){let n=this.instances.get(e.id)?.get(t.modelId);return n?.has(t)?n:void 0}createView(e,t){let n=t.originModel??Fs.find(o=>o.id===t.modelId);if(!n||!e.group)return;t.originModel=n;let i=ks(e.pos).add(ks(t.pos));if(Ey(n,t)){let o=this.instances.get(e.id);o||(o=new Map,this.instances.set(e.id,o));let a=o.get(n.id);a||(a=new Hu(n,e.group),o.set(n.id,a)),a.add(t,i);return}let r=ni.makeModel(n);this.addMesh(e.id+"-"+t.id,r,i),e.group.add(r)}removeView(e,t){let n=this.instancesOf(e,t);if(n){n.remove(t);return}let i=e.id+"-"+t.id;this.meshes[i]?.removeFromParent(),delete this.meshes[i]}refreshBuilding(e,t){this.removeView(e,t),this.createView(e,t)}buildingBounds(e,t){let n=this.instancesOf(e,t);return n?n.boundsAt(this.buildingWorldPos(e,t)):this.getBounds(e.id+"-"+t.id)}removeBuilding(e,t){this.removeView(e,t),e.buildings=e.buildings.filter(n=>n!==t)}moveBuilding(e,t,n){let i=this.chunkAt(n.x,n.z);if(!i)return!1;if(i!==e)return this.removeBuilding(e,t),t.pos={x:n.x-i.pos.x,y:n.y-i.pos.y,z:n.z-i.pos.z},this.addBuilding(i,t),!0;t.pos={x:n.x-e.pos.x,y:n.y-e.pos.y,z:n.z-e.pos.z};let r=this.instancesOf(e,t);return r?r.move(t,n):this.meshes[e.id+"-"+t.id]?.position.copy(n),!0}buildingWorldPos(e,t){return ks(e.pos).add(ks(t.pos))}findBuilding(e,t){for(let[n,i]of this.instances)for(let r of i.values())if(r.parts.includes(e)){let o=r.buildingAt(t),a=this.sceneMap.chunks.find(l=>l.id===n);return o&&a?{chunk:a,building:o}:null}for(let n of this.sceneMap.chunks)for(let i of n.buildings){let r=this.meshes[n.id+"-"+i.id],o=e;for(;o;){if(o===r)return{chunk:n,building:i};o=o.parent}}return null}pickableBuildingMeshes(){let e=this.sceneMap.chunks.filter(t=>t.visible);return[...e.flatMap(t=>t.buildings.map(n=>this.meshes[t.id+"-"+n.id])).filter(t=>!!t&&t.visible),...e.flatMap(t=>[...this.instances.get(t.id)?.values()??[]].flatMap(n=>n.parts))]}instancedSets(){return[...this.instances.entries()].flatMap(([,e])=>[...e.entries()].map(([t,n])=>({modelId:t,copies:n.buildings.length,parts:n.parts})))}defaultOptions(e){let t=new Map;this.sceneMap.chunks.forEach(i=>i.buildings.forEach(r=>{if(r.modelId===e){let o=`${r.passable}-${r.canHide}`;t.set(o,(t.get(o)??0)+1)}}));let n=[...t.entries()].sort((i,r)=>r[1]-i[1])[0]?.[0];return n?{passable:n.startsWith("true"),canHide:n.endsWith("true")}:{passable:!1,canHide:!1}}playerShadow;updatePlayerShadow(){let e=this.playerShadow,t=e?.parent;if(!e||!t)return;let n=this.originGame.sun,i=n.position.x-n.target.position.x,r=n.position.z-n.target.position.z;e.rotation.y=Math.atan2(i,r)-t.rotation.y}updateCameraAim(){this.originGame.camera.lookAt(this.originGame.getCameraTarget()),this.updateVisibleChunks(this.originGame.editMode?this.originGame.getCameraTarget():void 0)}addMesh(e,t,n){this.meshes[e]=t;let i=n||new w(0,0,0);t.position.x=i.x,t.position.y=i.y,t.position.z=i.z}getBounds(e){let t=this.meshes[e];return t?new nn().setFromObject(t):null}updateVisibleMesh(e,t,n){let i=this.meshes[e];if(!i)return;let r=new nn().setFromObject(i),o=this.getOpacity(i,r,t,n),a=this.originGame.getCameraTarget(),l=r.max.x>a.x-Ki&&r.min.x<a.x+Ki&&r.max.z>a.z-Ki&&r.min.z<a.z+Ki;i.children.forEach(c=>s.updateMeshOpacity(c,o,l))}getOpacity(e,t,n,i){let r=1,o=this.originGame.camera,a=o.position.z-Xx,l=t.max.z-(t.max.y-t.min.y)*Xn.z/Xn.y;if(a<l)return r=Math.max(0,1-(l-a)/ti),r;let c=ps*Math.max(1,this.originGame.cameraZoom),u=dr.getDist(e.position,o.position);if(u>c)return r=Math.max(0,1-(u-c)/ti),r;if(t.min.x<n.x&&t.max.x>n.x&&n.z<t.min.z){let h=Math.min(Math.abs(n.x-t.min.x),Math.abs(n.x-t.max.x)),d=Math.abs(n.z-t.min.z),p=t.max.y-t.min.y+ti;if(d<p){let f=h>ti?0:1-h/ti,_=d>p?0:d/p;r=.7+.3*Math.max(f,_)}}return i?r:r>0?1:0}static updateMeshOpacity(e,t,n){if(!(e instanceof bt))return;let i=e.material;i.transparent=t>0&&t<1||!i.depthTest,i.forceSinglePass=!0,e.visible=t>0||n,i.userData.depthWrite===void 0&&(i.userData.depthWrite=i.depthWrite);let r=t<=0;i.colorWrite=!r,i.depthWrite=r?!1:i.userData.depthWrite,i.opacity=Math.min(t,1)}};var GA=6,by=6,Ty=3,po=class s{static checkCollisions(e,t,n){let i=new w(t.position.x+n.x,t.position.y+n.y,t.position.z+n.z),r=new w;new nn().setFromObject(t).getSize(r),e.sceneMap.chunks.forEach(o=>{o.visible&&o.buildings.forEach(a=>{if(!a.originModel||a.passable)return;let l=e.buildingBounds(o,a),c=a.originModel?.hitBox;if(!l||!c)return;let u=r.x/2,h=l.min.x-u-c.min.x,d=l.max.x+u-c.max.x,p=i.x,f=i.z;p>=h&&p<=d&&f>=l.min.z-c.min.z&&f<l.max.z+c.max.z&&(n.z=0,n.x=0)})})}static checkGroundCollisions(e,t,n){let i=f=>Math.sign(f)*GA,r=t.position,o=()=>{n.x=0,n.z=0},a=n.z!==0,l=a?[[-by,0],[by,0]]:[[0,-Ty],[0,Ty]],c=l.map(([f,_])=>[r.x+f,r.z+_]),u=l.map(([f,_])=>[r.x+n.x+i(n.x)+f,r.z+n.z+i(n.z)+_]),h=[...c,...u].map(([f,_])=>e.stairsAt(f,_)),d=h.some(f=>f);for(let f of h){if(!f)continue;let _=(f.side==="n"||f.side==="s")===a,m=a?Math.abs(r.x-f.cx)<1:Math.abs(r.z-f.cz)<1;if(!_||!m){o();return}}let p=Math.max(...c.map(([f,_])=>e.levelAtWorld(f,_)));for(let[f,_]of u){let m=e.cellAt(f,_),g=e.levelAtWorld(f,_)-p;if(g>0&&!(g===1&&d)||m&&hr(m.chunk.tiles?.[m.col+","+m.row])?.blocking){o();return}}}static getMove(e,t){let n=new w(0,0,0),i=t.indexOf(0)>=0,r=i?2:1,o=i?2:1,a=0,l=e.scenePlayer.dir;for(let c=0;c<t.length;c++)switch(t[c]){case 5:n.z=-o,l=0,t=[],a=o;break;case 2:n.x=-o,l=3,t=[],a=o;break;case 4:n.z=o,l=2,t=[],a=o;break;case 3:n.x=o,l=1,t=[],a=o;break}return a||(r=0),e.scenePlayer.dir=l,{move:n,speed:a,status:r}}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var Bu=class s{static updatePlayerSprite(e){let i,r=0;e.framePerSecond&&iy(e)&&(r=Math.floor(e.currentFrame/(e.framePerSecond/9))%3);let a=43-22*r,l=(a+1)/65,c=(a+22)/65;switch(e.player.dir){case 0:i={min:{x:15/59,y:l},max:{x:29/59,y:c}};break;case 2:i={min:{x:0,y:l},max:{x:14/59,y:c}};break;case 3:i={min:{x:30/59,y:l},max:{x:44/59,y:c}};break;case 1:i={min:{x:45/59,y:l},max:{x:59/59,y:c}};break}let h=e.mapHelper.meshes[e.player.id].children[0].geometry.getAttribute("uv"),d=new _e;for(let p=0;p<h.count;p++)d.fromBufferAttribute(h,p),p%4===0&&h.setXY(p,i.min.x,i.max.y),p%4===1&&h.setXY(p,i.max.x,i.max.y),p%4===2&&h.setXY(p,i.min.x,i.min.y),p%4===3&&h.setXY(p,i.max.x,i.min.y);h.needsUpdate=!0}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var zu=class s{static checkEvents(e,t,n){let i=[];return e.sceneMap.chunks.forEach(r=>{r.visible&&r.buildings.forEach(o=>{o.events.forEach(a=>{if(!s.checkDirection(a.conditions.direction,e)||!s.checkPressedKeys(a.conditions.pressedKeys,n))return;let u=r.id+"-"+o.id,h=e.getBounds(r.id+"-"+o.id);if(!s.checkBounds(a.conditions.bounds,h,t))return;let p=e.meshes[u];p&&i.push({evt:a,buildingMesh:p})})})}),i.length?i.length===1?i[0].evt:i.sort((r,o)=>{let a=dr.getDist(t.position,r.buildingMesh.position),l=dr.getDist(t.position,o.buildingMesh.position);return a>l?1:-1})[0].evt:null}static checkDirection(e,t){return e===void 0||!Ii[e]?!0:e===t.scenePlayer.dir}static checkPressedKeys(e,t){return!e||!e.length?!0:e.findIndex(n=>t.indexOf(n)>=0)>=0}static checkBounds(e,t,n){return e?!!t&&n.position.x>=t.min.x-e.min.x&&n.position.y>=t.min.y-e.min.y&&n.position.z>=t.min.z-e.min.z&&n.position.x<=t.max.x+e.max.x&&n.position.y<=t.max.y+e.max.y&&n.position.z<=t.max.z+e.max.z:!0}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var Gu=class{constructor(e=[]){this.instructions=e}instructions;currentIndex=-1;current(){return this.instructions[this.currentIndex]}next(e){let t=this.current();this.currentIndex++,(t?.subInstructions??[]).forEach(i=>{(!i.condition||i.condition===e)&&i.instructions.forEach((r,o)=>{this.instructions.splice(this.currentIndex+o+1,0,Ve({},r))})});let n=this.current();return n||(this.currentIndex=-1,this.instructions=[]),n}};var Zi=class s{coreService=je(yr);keyService=je(Cn);sequence=null;messageState=rt(null);message=this.messageState.asReadonly();teleportSubject=new Ip;teleport$=this.teleportSubject.asObservable();get isRunning(){return this.sequence!==null}launchSequence(e){this.keyService.clearKeys(),this.sequence=new Gu(e.instructions.map(t=>Ve({},t))),this.nextSequence()}closeMessage(e){this.messageState.set(null),this.nextSequence(e)}nextSequence(e){let t=this.sequence;if(!t)return;let n=t.next(e);if(!n){this.sequence=null;return}switch(n.type){case 0:this.setLogs(n.log);break;case 1:this.setMessage(n.message);break;case 2:this.setWait(n.wait);break;case 3:this.setTeleport(n.teleport);break}}setLogs(e){e&&this.coreService.setLogs(e.text),this.nextSequence()}setMessage(e){if(!e)return this.nextSequence();this.messageState.set(e)}setWait(e){if(!e)return this.nextSequence();setTimeout(()=>this.nextSequence(),e.time)}setTeleport(e){if(!e)return this.nextSequence();this.teleportSubject.next(e)}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var Sy={id:"pallet-town-n",pos:{x:0,y:0,z:-512},size:{x:512,y:512},buildings:[],grounds:[{id:"main-ground",link:"assets/tex/ground2.png",points:{a:{x:-256,y:0,z:-256},b:{x:256,y:0,z:-256},c:{x:256,y:0,z:256},d:{x:-256,y:0,z:256}},passable:!0,canHide:!0}]},wy={id:"pallet-town-ne",pos:{x:512,y:0,z:-512},size:{x:512,y:512},buildings:[],grounds:[{id:"main-ground",link:"assets/tex/ground2.png",points:{a:{x:-256,y:0,z:-256},b:{x:256,y:0,z:-256},c:{x:256,y:0,z:256},d:{x:-256,y:0,z:256}},passable:!0,canHide:!0}]},Cy={id:"pallet-town-e",pos:{x:512,y:0,z:0},size:{x:512,y:512},buildings:[],grounds:[{id:"main-ground",link:"assets/tex/ground2.png",points:{a:{x:-256,y:0,z:-256},b:{x:256,y:0,z:-256},c:{x:256,y:0,z:256},d:{x:-256,y:0,z:256}},passable:!0,canHide:!0}]},Ry={id:"pallet-town-se",pos:{x:512,y:0,z:512},size:{x:512,y:512},buildings:[],grounds:[{id:"main-ground",link:"assets/tex/ground2.png",points:{a:{x:-256,y:0,z:-256},b:{x:256,y:0,z:-256},c:{x:256,y:0,z:256},d:{x:-256,y:0,z:256}},passable:!0,canHide:!0}]},Ay={id:"pallet-town-s",pos:{x:0,y:0,z:512},size:{x:512,y:512},buildings:[],grounds:[{id:"main-ground",link:"assets/tex/ground2.png",points:{a:{x:-256,y:0,z:-256},b:{x:256,y:0,z:-256},c:{x:256,y:0,z:256},d:{x:-256,y:0,z:256}},passable:!0,canHide:!0}]},Py={id:"pallet-town-sw",pos:{x:-512,y:0,z:512},size:{x:512,y:512},buildings:[],grounds:[{id:"main-ground",link:"assets/tex/ground2.png",points:{a:{x:-256,y:0,z:-256},b:{x:256,y:0,z:-256},c:{x:256,y:0,z:256},d:{x:-256,y:0,z:256}},passable:!0,canHide:!0}]},Iy={id:"pallet-town-w",pos:{x:-512,y:0,z:0},size:{x:512,y:512},buildings:[],grounds:[{id:"main-ground",link:"assets/tex/ground2.png",points:{a:{x:-256,y:0,z:-256},b:{x:256,y:0,z:-256},c:{x:256,y:0,z:256},d:{x:-256,y:0,z:256}},passable:!0,canHide:!0}]},Ly={id:"pallet-town-nw",pos:{x:-512,y:0,z:-512},size:{x:512,y:512},buildings:[],grounds:[{id:"main-ground",link:"assets/tex/ground2.png",points:{a:{x:-256,y:0,z:-256},b:{x:256,y:0,z:-256},c:{x:256,y:0,z:256},d:{x:-256,y:0,z:256}},passable:!0,canHide:!0}]},Dy={id:"pallet-town",pos:{x:0,y:0,z:0},size:{x:512,y:512},buildings:[{id:"letter-box-1",modelId:"letter-box",pos:{x:-120,y:0,z:-62},passable:!1,canHide:!1,events:[]},{id:"letter-box-2",modelId:"letter-box",pos:{x:24,y:0,z:-62},passable:!1,canHide:!1,events:[]},{id:"labo",modelId:"labo",pos:{x:72,y:0,z:20},passable:!1,canHide:!0,events:[]},{id:"house1",modelId:"house",pos:{x:-72,y:0,z:-70},passable:!1,canHide:!0,events:[]},{id:"house2",modelId:"house",pos:{x:72,y:0,z:-70},passable:!1,canHide:!0,events:[]},...[0,1,2,3,4,5].map(s=>({id:"tree-"+s,modelId:"tree",pos:{x:-16-s*32,y:0,z:-160},passable:!1,canHide:!1,events:[]})),...[0,1,2,3,4,5,6,7,8].map(s=>({id:"tree-"+(6+s),modelId:"tree",pos:{x:-176,y:0,z:-128+s*32},passable:!1,canHide:!1,events:[]})),...[0,1,2,3,4,5,6,7,8].map(s=>({id:"tree-"+(16+s),modelId:"tree",pos:{x:176,y:0,z:-128+s*32},passable:!1,canHide:!1,events:[]})),...[0,1,2,3,4].map(s=>({id:"tree-"+(25+s),modelId:"tree",pos:{x:48+s*32,y:0,z:-160},passable:!1,canHide:!1,events:[]})),{id:"wood-pannel",modelId:"wood-pannel",pos:{x:-105,y:0,z:52},passable:!1,canHide:!1,events:[]},{id:"pannel",modelId:"pannel",pos:{x:-40,y:0,z:5},passable:!1,canHide:!1,events:[{conditions:{direction:2,pressedKeys:[0],bounds:{min:{x:0,y:0,z:16},max:{x:0,y:0,z:0}}},instructions:[{type:1,message:{name:"Jason",text:"Impossible de lire une pancarte par derri\xE8re"}},{type:2,wait:{time:400}}]},{conditions:{direction:0,pressedKeys:[0,5],bounds:{min:{x:0,y:0,z:0},max:{x:0,y:0,z:24}}},instructions:[{type:1,message:{name:"Hugo",pic:"assets/img/faces/face-hugo.png",text:"J'adore manger des frites mais le probl\xE8me c'est que \xE7a fait trop grossir alors je me contente d'en manger de temps en temps mais pas tous les jours parce que sinon je ne ressemblerai jamais \xE0 Terry Crews.",choices:[{key:"confirm",text:"N'oublie jamais le cheat meal !"},{key:"cancel",text:"Tu devrais \xE9viter la malbouffe."},{key:"cancel",text:"..."}]},subInstructions:[{condition:"confirm",instructions:[{type:2,wait:{time:200}},{type:1,message:{name:"Hugo",text:"Un bon grec de temps en temps \xE7a fait pas de mal !",pic:"assets/img/faces/face-hugo.png"}},{type:2,wait:{time:200}},{type:1,message:{name:"Jason",text:"Grave !!!!",pic:"assets/img/faces/face-jason.png"}},{type:2,wait:{time:400}}]},{condition:"cancel",instructions:[{type:2,wait:{time:200}},{type:1,message:{name:"Hugo",text:"Fais pas genre, t'as grave envie d'un bon gros keugr\xE9 des familles",pic:"assets/img/faces/face-hugo.png"}},{type:2,wait:{time:200}},{type:1,message:{name:"Jason",text:"J'avoue, suppl\xE9ment oeuf et 3 fromages !",pic:"assets/img/faces/face-jason.png"}},{type:2,wait:{time:200}},{type:1,message:{name:"Hugo",text:"Et le petit piment !",pic:"assets/img/faces/face-hugo.png"}},{type:2,wait:{time:400}}]}]}]}]},{id:"pannel2",modelId:"pannel",pos:{x:72,y:0,z:85},passable:!1,canHide:!1,events:[{conditions:{direction:0,pressedKeys:[0],bounds:{min:{x:0,y:0,z:0},max:{x:0,y:0,z:24}}},instructions:[{type:3,teleport:{pos:{x:0,y:0,z:0}}}]}]},...[0,1,2,3,4,5,6,7].map(s=>({id:"barrier-"+s,modelId:"barrier",pos:{x:-108+s*8,y:0,z:3},passable:!1,canHide:!1,events:[]})),...[8,9,10,11,12,13].map(s=>({id:"barrier-"+s,modelId:"barrier",pos:{x:20+(s-8)*8,y:0,z:83},passable:!1,canHide:!1,events:[]})),...[14,15,16,17].map(s=>({id:"barrier-"+s,modelId:"barrier",pos:{x:36+(s-8)*8,y:0,z:83},passable:!1,canHide:!1,events:[]})),...[1,2,3,4,5,6,7,8].map(s=>{let e=s%2?20:36,t=-105+Math.floor((s-1)/2)*18;return{id:"flowers-"+s,modelId:"flowers",pos:{x:t,y:0,z:e},passable:!0,canHide:!1,events:[]}})],grounds:[{id:"main-ground",link:"assets/tex/ground.png",points:{a:{x:-256,y:0,z:-256},b:{x:256,y:0,z:-256},c:{x:256,y:0,z:256},d:{x:-256,y:0,z:256}},passable:!0,canHide:!0}]};var up={chunks:[Dy,Cy,wy,Ry,Iy,Ly,Py,Sy,Ay]};var Ny=7,VA=.45,Oy=9,hp=[3,8],Vu=class{puffs=[];origin=new w;start=-1;constructor(e){let t=cr();for(let n=0;n<Ny;n++){let i=en(new Ui({map:t,color:15260872,transparent:!0,depthWrite:!1})),r=new us(i);r.visible=!1,r.renderOrder=11,e.add(r);let o=n/Ny*Math.PI*2+Math.random()*.4;this.puffs.push({sprite:r,dir:new _e(Math.cos(o),Math.sin(o)*.6)})}}spawn(e){this.origin.copy(e),this.start=performance.now()}update(){if(this.start<0)return;let e=(performance.now()-this.start)/1e3/VA,t=e>=1,n=1-(1-Math.min(e,1))**2;for(let{sprite:i,dir:r}of this.puffs){if(i.visible=!t,t)continue;i.position.set(this.origin.x+r.x*Oy*n,this.origin.y+2+3*n,this.origin.z+r.y*Oy*n);let o=hp[0]+(hp[1]-hp[0])*n;i.scale.set(o,o,1),i.material.opacity=.75*(1-e)}t&&(this.start=-1)}};var Fy=.42,WA=7,dp=80,Hy=.013,Uy=7,qA=4,Wu=class s{keyService=je(Cn);sequenceService=je(Zi);mapEditorService=je(ho);pixelSize=8;hopTime=-1;hopOffset=0;visibilityTick=0;hopDrop=0;hopCameraOffset=0;hopLastTime=0;hopNudge=new _e;dust;lastLevel=0;lastOnStairs=!1;isMoving=0;moveRatio={x:0,y:0,z:0};moveSpeed=0;moveDir=2;moveStatus=0;init(e){if(e.mapHelper)Object.values(e.mapHelper.meshes).forEach(t=>t.visible=!0);else{ly(up);let t=new ku({originGame:e,sceneMap:up,scenePlayer:py});e.mapHelper=t;let n=e.canvas.getBoundingClientRect();e.camera=new gn(45,n.width/n.height,1,ps+ti),e.camera.position.set(Xn.x,Xn.y,Xn.z),e.camera.lookAt(0,0,0),e.render(),t.buildChunks(),t.buildPlayer()}}updateHop(e,t){let n=t.children[0];if(!n||this.hopTime<0)return;n.position.y-=this.hopOffset,e.camera.position.y-=this.hopCameraOffset;let i=performance.now(),r=Math.min((i-this.hopLastTime)/1e3,.05);this.hopLastTime=i;let o=Math.min(this.hopTime/Fy,1);this.hopTime+=r;let a=Math.min(this.hopTime/Fy,1),l=a-o;if(t.position.x+=this.hopNudge.x*l,t.position.z+=this.hopNudge.y*l,e.camera.position.x+=this.hopNudge.x*l,e.camera.position.z+=this.hopNudge.y*l,a>=1){this.hopTime=-1,this.hopOffset=0,this.hopCameraOffset=0,t.position.x=Math.round(t.position.x),t.position.z=Math.round(t.position.z),e.mapHelper?.updateCameraAim(),e.weather.playLanding(),this.dust??=new Vu(e.scene),this.dust.spawn(t.position);return}let c=this.hopDrop*(1-a*a);this.hopOffset=c+WA*Math.sin(Math.PI*a),this.hopCameraOffset=c,n.position.y+=this.hopOffset,e.camera.position.y+=this.hopCameraOffset,e.mapHelper?.updateCameraAim()}clear(e){e.mapHelper&&Object.values(e.mapHelper.meshes).forEach(t=>t.visible=!1)}inputLoop(e){let t=e.mapHelper,n=t?.scenePlayer.mesh;if(!t||!n||e.paused)return;if(e.editMode){this.mapEditorService.update(e);return}let i=this.sequenceService.isRunning||e.weather.playerFlying?{move:{x:0,y:0,z:0},speed:0,status:0}:po.getMove(t,this.keyService.holdedCodes),r=i.move,o=i.status;if(this.isMoving?t.scenePlayer.dir=this.moveDir:(this.moveRatio=r,this.moveSpeed=i.speed,this.moveDir=t.scenePlayer.dir,this.moveStatus=o),this.isMoving<this.pixelSize?this.isMoving+=this.moveSpeed:(this.isMoving=0,this.moveSpeed=0,this.moveDir=2,this.moveRatio={x:0,y:0,z:0},this.moveStatus=o),this.isMoving&&this.isMoving===this.moveSpeed){let u=this.pixelSize/this.moveSpeed,h={x:this.moveRatio.x*u,y:this.moveRatio.y*u,z:this.moveRatio.z*u};po.checkCollisions(t,n,h),po.checkGroundCollisions(t,n,h),this.moveRatio={x:h.x/u,y:h.y/u,z:h.z/u}}let a=e.camera;this.updateHop(e,n),this.dust?.update(),t.updatePlayerShadow(),a.position.x+=this.moveRatio.x,a.position.z+=this.moveRatio.z,t.updateCameraAim(),n.position.x+=this.moveRatio.x,n.position.z+=this.moveRatio.z;let l=new w(n.position.x+Hy,n.position.y+dp,n.position.z+Hy);e.raycaster.ray=new vs(l,new w(0,-1,0));let c=-1;if(t.sceneMap.chunks.forEach(u=>{u.visible&&u.grounds.forEach(h=>{if(!h.passable||!h.mesh)return;let d=e.raycaster.intersectObject(h.mesh)[0];d&&d.distance&&(c===-1||d.distance<c)&&(c=d.distance)})}),c>-1){let u=n.position.y;n.position.y-=c-dp,a.position.y-=c-dp;let h=t.levelAtWorld(n.position.x,n.position.z),d=t.isStairsAt(n.position.x,n.position.z);if(h<this.lastLevel&&!d&&!this.lastOnStairs&&this.hopTime<0){this.hopTime=0,this.hopLastTime=performance.now(),this.hopDrop=u-n.position.y,this.hopOffset=this.hopDrop,this.hopCameraOffset=this.hopDrop,n.children[0].position.y+=this.hopOffset,a.position.y+=this.hopCameraOffset;let p=Math.sign(this.moveRatio.x),f=Math.sign(this.moveRatio.z),_=t.levelAtWorld(n.position.x-p*Uy,n.position.z-f*Uy);this.hopNudge.set(_>h?p*this.pixelSize:0,_>h?f*this.pixelSize:0),e.weather.playLedgeHop()}this.lastLevel=h,this.lastOnStairs=d}else n.position.x-=this.moveRatio.x,n.position.z-=this.moveRatio.z,a.position.x-=this.moveRatio.x,a.position.z-=this.moveRatio.z;if(Bu.updatePlayerSprite({mapHelper:t,player:t.scenePlayer,status:this.moveStatus,currentFrame:e.frame,framePerSecond:e.framePerSec}),!this.sequenceService.isRunning){let u=zu.checkEvents(t,n,this.keyService.pressedCodes);u&&this.sequenceService.launchSequence(u)}++this.visibilityTick%qA===0&&t.sceneMap.chunks.forEach(u=>{u.visible&&u.buildings.forEach(h=>{t.updateVisibleMesh(u.id+"-"+h.id,n.position,h.canHide)})})}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var qu=class{originGame;meshes={};battleField;fighters;constructor(e){this.originGame=e.originGame,this.battleField=e.battleField,this.fighters=e.fighters}buildBattlefield(){let e=this.battleField,t=new Pn;e.group=t,e.grounds.forEach(n=>{let i=e.id+"-g-"+n.id;this.addMesh(i,ni.makePlaneFromPoints(n.link,n.points),ks(e.pos)),n.mesh=this.meshes[i],t.add(n.mesh)}),e.buildings.forEach(n=>{let i=e.id+"-"+n.id,r=Fs.find(o=>o.id===n.modelId);if(r){n.originModel=r,this.addMesh(i,ni.makeModel(r));let o=this.meshes[i];o.position.x=e.pos.x+n.pos.x,o.position.y=e.pos.y+n.pos.y,o.position.z=e.pos.z+n.pos.z,t.add(o)}}),this.originGame.scene.add(t),e.buildings.forEach(n=>{this.updateVisibleMesh(e.id+"-"+n.id)})}addMesh(e,t,n){this.meshes[e]=t;let i=n||new w(0,0,0);t.position.x=i.x,t.position.y=i.y,t.position.z=i.z}updateVisibleMesh(e){let t=this.meshes[e];if(!t)return;(t.children.length?t.children:[t]).forEach(i=>{i instanceof bt&&(i.material.transparent=!0)})}};var ky={0:{id:0,stats:{hp:1,atk:1,def:1,spAtk:1,spDef:1,speed:1}},1:{id:1,stats:{hp:1,atk:1.1,def:.9,spAtk:1,spDef:1,speed:1}},2:{id:2,stats:{hp:1,atk:1.1,def:1,spAtk:1,spDef:1,speed:.9}},3:{id:3,stats:{hp:1,atk:1.1,def:1,spAtk:.9,spDef:1,speed:1}},4:{id:4,stats:{hp:1,atk:1.1,def:1,spAtk:1,spDef:.9,speed:1}},5:{id:5,stats:{hp:1,atk:.9,def:1.1,spAtk:1,spDef:1,speed:1}},6:{id:6,stats:{hp:1,atk:1,def:1,spAtk:1,spDef:1,speed:1}},7:{id:7,stats:{hp:1,atk:1,def:1.1,spAtk:1,spDef:1,speed:.9}},8:{id:8,stats:{hp:1,atk:1,def:1.1,spAtk:.9,spDef:1,speed:1}},9:{id:9,stats:{hp:1,atk:1,def:1.1,spAtk:1,spDef:.9,speed:1}},10:{id:10,stats:{hp:1,atk:.9,def:1,spAtk:1,spDef:1,speed:1.1}},11:{id:11,stats:{hp:1,atk:1,def:.9,spAtk:1,spDef:1,speed:1.1}},12:{id:12,stats:{hp:1,atk:1,def:1,spAtk:1,spDef:1,speed:1}},13:{id:13,stats:{hp:1,atk:1,def:1,spAtk:.9,spDef:1,speed:1.1}},14:{id:14,stats:{hp:1,atk:1,def:1,spAtk:1,spDef:.9,speed:1.1}},15:{id:15,stats:{hp:1,atk:.9,def:1,spAtk:1.1,spDef:1,speed:1}},16:{id:16,stats:{hp:1,atk:1,def:.9,spAtk:1.1,spDef:1,speed:1}},17:{id:17,stats:{hp:1,atk:1,def:1,spAtk:1.1,spDef:1,speed:.9}},18:{id:18,stats:{hp:1,atk:1,def:1,spAtk:1,spDef:1,speed:1}},19:{id:19,stats:{hp:1,atk:1,def:1,spAtk:1.1,spDef:.9,speed:1}},20:{id:20,stats:{hp:1,atk:.9,def:1,spAtk:1,spDef:1.1,speed:1}},21:{id:21,stats:{hp:1,atk:1,def:.9,spAtk:1,spDef:1.1,speed:1}},22:{id:22,stats:{hp:1,atk:1,def:1,spAtk:1,spDef:1.1,speed:.9}},23:{id:23,stats:{hp:1,atk:1,def:1,spAtk:.9,spDef:1.1,speed:1}},24:{id:24,stats:{hp:1,atk:1,def:1,spAtk:1,spDef:1,speed:1}}};var By={name:"Griffe",description:"Un coup de griffes ac\xE9r\xE9es",type:0,power:40,category:0,accuracy:100,pp:35,aim:null,statsModifier:null,status:null,specialStatus:null,volatileStatus:null};function zy(s){switch(s){case 0:return YA();case 1:return KA();case 2:return ZA();case 3:return $A();case 4:return JA();case 5:return jA()}}function YA(){let s=[];for(let e=0;e<=100;e++){let t=0;e<=50?t=Math.floor(Math.pow(e,3)*(100-e)/50):e<=68?t=Math.floor(Math.pow(e,3)*(150-e)/50):e<=98?t=Math.floor(Math.pow(e,3)*((1911-10*e)/3)/500):t=Math.floor(Math.pow(e,3)*(160-e)/100),s.push(t)}return s}function KA(){let s=[];for(let e=0;e<=100;e++)s.push(Math.floor(Math.pow(e,3)*4/5));return s}function ZA(){let s=[];for(let e=0;e<=100;e++)s.push(Math.pow(e,3));return s}function $A(){let s=[];for(let e=0;e<=100;e++){let t=Math.pow(e,3)*6/5,n=Math.pow(e,2)*15,i=e*100;s.push(Math.floor(t-n+i-140))}return s}function JA(){let s=[];for(let e=0;e<=100;e++)s.push(Math.floor(Math.pow(e,3)*5/4));return s}function jA(){let s=[];for(let e=0;e<=100;e++){let t=Math.pow(e,3)/50,n=1;e<=15?n=24+(e+1)/3:e<=36?n=14+e:n=32+e/2,s.push(Math.floor(t*n))}return s}var Gy={id:"004",name:"Salam\xE8che",description:"La flamm\xE8che au bout de sa queue \xE9met un cr\xE9pitement audible seulement dans les endroits calmes.",height:.6,weight:8.5,baseStats:{hp:39,atk:52,def:43,spAtk:60,spDef:50,speed:65},types:[9],evolve:[],sprites:{map:"",fight:""},evYield:{hp:0,atk:0,def:0,spAtk:0,spDef:0,speed:1},baseExpYield:62,genderRatio:{neutral:0,female:12.5,male:87.5},eggGroups:[],hatchTime:5120,baby:null,levellingRate:3,catchRate:45,abilities:[0,1],learnSkills:[{level:0,skill:By}],tutorableSkills:[]};var pp=[Gy];var QA=4;var e2=252,t2=510,Vy=["hp","atk","def","spAtk","spDef","speed"],Ea=class s{base;currentHp;surname;level;xp;xpValues;combativeness;iv;ev;skills;status;holdedItem;ability;nature;currentStats;constructor(e){this.base=e.base,this.currentHp=e.currentHp,this.surname=e.surname,this.level=e.level,this.xp=e.xp,this.xpValues=e.xpValues,this.combativeness=e.combativeness,this.iv=e.iv,this.ev=e.ev,this.skills=e.skills,this.status=e.status,this.holdedItem=e.holdedItem,this.ability=e.ability,this.nature=e.nature,this.currentStats=this.getCurrentStats()}static getRandomGamePokemon(e){let t=pp[Math.floor(Math.random()*pp.length)],n=Object.values(ky),i=n[Math.floor(Math.random()*n.length)],r=50,o=zy(t.levellingRate),a=t.learnSkills.filter(c=>c.level<=r).map(c=>({base:c.skill,pp:c.skill.pp})),l=new s({base:t,currentHp:0,surname:e||t.name,level:r,xp:o[r],xpValues:o,combativeness:1,iv:s.getRandomStats(0,31),ev:{hp:0,atk:0,def:0,spAtk:0,spDef:0,speed:0},skills:a.slice(-QA),status:null,holdedItem:null,ability:t.abilities[Math.floor(Math.random()*t.abilities.length)],nature:i});return l.currentHp=l.currentStats.hp,l}updateCurrentStats(){this.currentStats=this.getCurrentStats()}getCurrentStats(){let e=this.iv,t=this.ev,n=this.level,i=this.base.baseStats,r=this.nature.stats;return{hp:Math.floor(s.computeIvEv(i.hp,e.hp,t.hp,n)+n+10),atk:Math.floor((s.computeIvEv(i.atk,e.atk,t.atk,n)+5)*r.atk),def:Math.floor((s.computeIvEv(i.def,e.def,t.def,n)+5)*r.def),spAtk:Math.floor((s.computeIvEv(i.spAtk,e.spAtk,t.spAtk,n)+5)*r.spAtk),spDef:Math.floor((s.computeIvEv(i.spDef,e.spDef,t.spDef,n)+5)*r.spDef),speed:Math.floor((s.computeIvEv(i.speed,e.speed,t.speed,n)+5)*r.speed)}}static getRandomStats(e,t){let n=()=>e+Math.floor(Math.random()*(t-e+1));return{hp:n(),atk:n(),def:n(),spAtk:n(),spDef:n(),speed:n()}}static computeIvEv(e,t,n,i){let r=t+2*e+Math.floor(n/4);return Math.floor(r*(i/100))}addEv(e){let t=Vy.find(r=>!!e[r]);if(!t)return;let n=Vy.reduce((r,o)=>r+this.ev[o],0),i=Math.min(t2-n,e[t]);i>0&&(this.ev[t]=Math.min(e2,this.ev[t]+i))}};function fp(s){return s.updateCurrentStats(),{origin:s,current:!1,currentStats:ht(Ve({},s.currentStats),{hp:s.currentHp}),status:s.status,specialStatus:[],volatileStatus:[]}}var fo=class s{menuState=rt([]);menu=this.menuState.asReadonly();openMenu(e,t){let n={id:"attack",label:"Attaque",desc:"Lancer une attaque",enabled:!0,subMenus:t.origin.skills.map(a=>({id:a.base.name.toLowerCase(),label:a.base.name,amount:a.pp+"/"+a.base.pp+" PP",desc:a.base.description+" ( Puissance: "+a.base.power+" )",subMenus:[],enabled:!!a.pp,skill:a}))},i={id:"pokemons",label:"Pok\xE9mons",enabled:!0,subMenus:e.pokemons.map((a,l)=>({id:a.origin.surname+"-"+l,label:a.origin.surname,enabled:!a.current,amount:a.currentStats.hp+"/"+a.origin.currentStats.hp+" HP",subMenus:[],pokemon:a}))},r={id:"objects",label:"Objets",enabled:!1,subMenus:[]},o={id:"escape",label:"Fuite",isEscape:!0,enabled:!1,subMenus:[]};this.menuState.set([n,i,r,o])}closeMenu(){this.menuState.set([])}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var mo=class s{fightMenuService=je(fo);turnInfo=null;launchFight(e){this.turn({fighter:e.currentFighter,pk1:e.currentFighter.pokemons[0],pk2:e.opponents[0].pokemons[0]})}turn(e){e.pk1.current=!0,this.turnInfo=e,this.fightMenuService.openMenu(e.fighter,e.pk1)}afterChoice(e){let t=this.turnInfo;if(!t)return;this.turnInfo=null;let n=e.skill;if(!n?.pp)return this.turn(t);this.fightMenuService.closeMenu(),setTimeout(()=>{let{pk1:i,pk2:r}=t,o=[i,r].sort((c,u)=>c.currentStats.speed>u.currentStats.speed?1:0),a=i===o[0]?n:o[0].origin.skills[0],l=i===o[0]?o[1].origin.skills[0]:n;if(this.attack(a,o[0],o[1]),o[1].currentStats.hp<=0){console.log(o[1].origin.surname+" est KO"),console.log("Fin du combat !");return}if(this.attack(l,o[1],o[0]),o[0].currentStats.hp<=0){console.log(o[0].origin.surname+" est KO"),console.log("Fin du combat !");return}this.turn(t)},500)}attack(e,t,n){if(!e)return;let i=e.base;e.pp-=1;let r=2*t.origin.level/5+2,o=i.power*t.currentStats.atk/n.currentStats.def,a=Math.floor(85+Math.random()*16)/100,l=Math.floor((r*o/50+2)*a),c=Math.min(n.currentStats.hp,l);console.log(t.origin.surname+" lance "+i.name),n.currentStats.hp-=c,console.log(n.origin.surname+" perd "+c+" PVs"),console.log("PVs de "+n.origin.surname+" = "+n.currentStats.hp+"/"+n.origin.currentStats.hp)}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var Wy={id:"pallet-town",pos:{x:0,y:0,z:0},size:{x:512,y:512},buildings:[{id:"letter-box-1",modelId:"letter-box",pos:{x:-120,y:0,z:-62},passable:!1,canHide:!1,events:[]},{id:"letter-box-2",modelId:"letter-box",pos:{x:24,y:0,z:-62},passable:!1,canHide:!1,events:[]},{id:"labo",modelId:"labo",pos:{x:72,y:0,z:20},passable:!1,canHide:!0,events:[]},{id:"house1",modelId:"house",pos:{x:-72,y:0,z:-70},passable:!1,canHide:!0,events:[]},{id:"house2",modelId:"house",pos:{x:72,y:0,z:-70},passable:!1,canHide:!0,events:[]},...[0,1,2,3,4,5].map(s=>({id:"tree-"+s,modelId:"tree",pos:{x:-16-s*32,y:0,z:-160},passable:!1,canHide:!1,events:[]})),...[0,1,2,3,4,5,6,7,8].map(s=>({id:"tree-"+(6+s),modelId:"tree",pos:{x:-176,y:0,z:-128+s*32},passable:!1,canHide:!1,events:[]})),...[0,1,2,3,4,5,6,7,8].map(s=>({id:"tree-"+(16+s),modelId:"tree",pos:{x:176,y:0,z:-128+s*32},passable:!1,canHide:!1,events:[]})),...[0,1,2,3,4].map(s=>({id:"tree-"+(25+s),modelId:"tree",pos:{x:48+s*32,y:0,z:-160},passable:!1,canHide:!1,events:[]})),{id:"wood-pannel",modelId:"wood-pannel",pos:{x:-105,y:0,z:52},passable:!1,canHide:!1,events:[]},{id:"pannel",modelId:"pannel",pos:{x:-40,y:0,z:5},passable:!1,canHide:!1,events:[{conditions:{direction:2,pressedKeys:[0],bounds:{min:{x:0,y:0,z:16},max:{x:0,y:0,z:0}}},instructions:[{type:1,message:{name:"Jason",text:"Impossible de lire une pancarte par derri\xE8re"}},{type:2,wait:{time:400}}]},{conditions:{direction:0,pressedKeys:[0,5],bounds:{min:{x:0,y:0,z:0},max:{x:0,y:0,z:24}}},instructions:[{type:1,message:{name:"Hugo",pic:"assets/img/faces/face-hugo.png",text:"J'adore manger des frites mais le probl\xE8me c'est que \xE7a fait trop grossir alors je me contente d'en manger de temps en temps mais pas tous les jours parce que sinon je ne ressemblerai jamais \xE0 Terry Crews.",choices:[{key:"confirm",text:"N'oublie jamais le cheat meal !"},{key:"cancel",text:"Tu devrais \xE9viter la malbouffe."},{key:"cancel",text:"..."}]},subInstructions:[{condition:"confirm",instructions:[{type:2,wait:{time:200}},{type:1,message:{name:"Hugo",text:"Un bon grec de temps en temps \xE7a fait pas de mal !",pic:"assets/img/faces/face-hugo.png"}},{type:2,wait:{time:200}},{type:1,message:{name:"Jason",text:"Grave !!!!",pic:"assets/img/faces/face-jason.png"}},{type:2,wait:{time:400}}]},{condition:"cancel",instructions:[{type:2,wait:{time:200}},{type:1,message:{name:"Hugo",text:"Fais pas genre, t'as grave envie d'un bon gros keugr\xE9 des familles",pic:"assets/img/faces/face-hugo.png"}},{type:2,wait:{time:200}},{type:1,message:{name:"Jason",text:"J'avoue, suppl\xE9ment oeuf et 3 fromages !",pic:"assets/img/faces/face-jason.png"}},{type:2,wait:{time:200}},{type:1,message:{name:"Hugo",text:"Et le petit piment !",pic:"assets/img/faces/face-hugo.png"}},{type:2,wait:{time:400}}]}]}]}]},{id:"pannel2",modelId:"pannel",pos:{x:72,y:0,z:85},passable:!1,canHide:!1,events:[{conditions:{direction:0,pressedKeys:[0],bounds:{min:{x:0,y:0,z:0},max:{x:0,y:0,z:24}}},instructions:[{type:3,teleport:{pos:{x:0,y:0,z:0}}}]}]},...[0,1,2,3,4,5,6,7].map(s=>({id:"barrier-"+s,modelId:"barrier",pos:{x:-108+s*8,y:0,z:3},passable:!1,canHide:!1,events:[]})),...[8,9,10,11,12,13].map(s=>({id:"barrier-"+s,modelId:"barrier",pos:{x:20+(s-8)*8,y:0,z:83},passable:!1,canHide:!1,events:[]})),...[14,15,16,17].map(s=>({id:"barrier-"+s,modelId:"barrier",pos:{x:36+(s-8)*8,y:0,z:83},passable:!1,canHide:!1,events:[]})),...[1,2,3,4,5,6,7,8].map(s=>{let e=s%2?20:36,t=-105+Math.floor((s-1)/2)*18;return{id:"flowers-"+s,modelId:"flowers",pos:{x:t,y:0,z:e},passable:!0,canHide:!1,events:[]}})],grounds:[{id:"main-ground",link:"assets/tex/ground.png",points:{a:{x:-256,y:0,z:-256},b:{x:256,y:0,z:-256},c:{x:256,y:0,z:256},d:{x:-256,y:0,z:256}},passable:!0,canHide:!0}]};var Xu=class s{fightSequenceService=je(mo);init(e){e.fightHelper&&Object.values(e.fightHelper.meshes).forEach(a=>a.visible=!0);let t=e.fightHelper??=new qu({originGame:e,battleField:Wy}),n=e.canvas.getBoundingClientRect();e.camera=new gn(45,n.width/n.height,1,ps+ti),e.camera.position.set(Xn.x,Xn.y,Xn.z),e.camera.lookAt(0,0,0),e.render(),t.buildBattlefield();let i=Ea.getRandomGamePokemon("salam1"),r=Ea.getRandomGamePokemon("salam2"),o={currentFighter:{name:"Jason",money:0,stamina:10,pokemons:[fp(i)]},ally:null,opponents:[{name:"Hugo",money:500,stamina:10,pokemons:[fp(r)]}],isDoubleFight:!1};t.fighters=o,this.fightSequenceService.launchFight(o)}inputLoop(e){}clear(e){e.fightHelper&&Object.values(e.fightHelper.meshes).forEach(t=>t.visible=!1)}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};var n2=(s,e)=>s===e||!!s&&!!e&&Object.keys(s).every(t=>s[t]===e[t]),gp="pk-weather-settings",mp=1e3/120,qy=12,i2=250;function s2(){let s;try{s=JSON.parse(localStorage.getItem(gp)??"{}")??{}}catch{return{}}let e={},t=i=>typeof i=="number"&&i>=0&&i<=1?i:void 0,n=i=>typeof i=="boolean"?i:void 0;return Object.values(ar).includes(s.weather)&&(e.weather=s.weather),typeof s.hour=="number"&&s.hour>=0&&s.hour<24&&(e.hour=s.hour),(s.windDirection==="east"||s.windDirection==="west")&&(e.windDirection=s.windDirection),no.some(i=>i.color===s.fireflyColor)&&(e.fireflyColor=s.fireflyColor),Cc.some(i=>i.mode===s.quality)&&(e.quality=s.quality),(s.leafMode==="autumn"||s.leafMode==="cherry")&&(e.leafMode=s.leafMode),e.windStrength=t(s.windStrength),e.cloudDensity=t(s.cloudDensity),e.soundVolume=t(s.soundVolume),e.timeFlow=n(s.timeFlow),e.gusts=n(s.gusts),e.soundMuted=n(s.soundMuted),e}var xp={};function r2(s){let e=Object.keys(s).filter(t=>s[t]!==xp[t]);if(e.length)try{let t=JSON.parse(localStorage.getItem(gp)??"{}")??{};e.forEach(n=>t[n]=s[n]),localStorage.setItem(gp,JSON.stringify(t)),xp=Ve({},s)}catch{}}var o2=720,Xy=250,Yu=class s{keyService=je(Cn);fightService=je(Xu);gameMapService=je(Wu);mapEditorService=je(ho);game=null;hudState=rt(null,{equal:n2});hud=this.hudState.asReadonly();saved=xp=s2();weatherState=rt(this.saved.weather??"neutral");weather=this.weatherState.asReadonly();hourState=rt(this.saved.hour??12);hour=this.hourState.asReadonly();night=Tt(()=>Dc(this.hourState()));timeFlowState=rt(this.saved.timeFlow??!0);timeFlow=this.timeFlowState.asReadonly();windStrengthState=rt(this.saved.windStrength??.3);windStrength=this.windStrengthState.asReadonly();windDirectionState=rt(this.saved.windDirection??"east");windDirection=this.windDirectionState.asReadonly();soundVolumeState=rt(this.saved.soundVolume??.7);soundVolume=this.soundVolumeState.asReadonly();soundMutedState=rt(this.saved.soundMuted??!1);soundMuted=this.soundMutedState.asReadonly();cloudDensityState=rt(this.saved.cloudDensity??.5);cloudDensity=this.cloudDensityState.asReadonly();gustsState=rt(this.saved.gusts??!0);gusts=this.gustsState.asReadonly();fireflyColorState=rt(this.saved.fireflyColor??"green");fireflyColor=this.fireflyColorState.asReadonly();leafModeState=rt(this.saved.leafMode??"autumn");leafMode=this.leafModeState.asReadonly();qualityState=rt(this.saved.quality??"auto");quality=this.qualityState.asReadonly();constructor(){this.initCheckResize(),Ji(()=>r2({weather:this.weatherState(),hour:this.hourState(),timeFlow:this.timeFlowState(),windStrength:this.windStrengthState(),windDirection:this.windDirectionState(),gusts:this.gustsState(),cloudDensity:this.cloudDensityState(),soundVolume:this.soundVolumeState(),soundMuted:this.soundMutedState(),fireflyColor:this.fireflyColorState(),leafMode:this.leafModeState(),quality:this.qualityState()}))}init(e,t=0){this.keyService.initTouch(e);let n=e.getBoundingClientRect(),i=new Mc({powerPreference:"high-performance"});i.setSize(n.width,n.height),e.appendChild(i.domElement);let r=new Ti,o=new er,a=new Tu({scene:r,raycaster:o,renderer:i,canvas:e,mode:t});this.game=a,this.mapEditorService.attach(a),a.weather.setWeather(this.weatherState()),a.weather.setHour(this.hourState()),a.weather.setWind(Id(this.windStrengthState(),this.windDirectionState())),a.weather.setFireflyColor(Pd(this.fireflyColorState())),a.weather.setLeafMode(this.leafModeState()),a.weather.setGusts(this.gustsState()),a.weather.setCloudDensity(this.cloudDensityState()),a.weather.setSoundVolume(this.soundVolumeState(),this.soundMutedState()),a.weather.snapToTarget(),this.switchGameMode(t,!0),a.setQuality(this.qualityState()),setInterval(()=>{a.framePerSec=a.frame,a.frame=0,a.adaptQuality(a.framePerSec),a.diagnostics.flush(a.renderer,{pixelRatio:a.pixelRatio,shadowMapSize:a.shadowMapSize,detail:a.detail},()=>$x(a.scene,a.camera,a.mapHelper))},1e3);let l=performance.now(),c=0;return setInterval(()=>{let u=performance.now();c+=Math.min(u-l,i2),l=u;let h=0;for(;c>=mp&&h<qy;)this.inputLoop(a),c-=mp,h++;h===qy&&(c=0)},mp),setInterval(()=>{this.timeFlowState()&&!a.paused&&!a.loading&&this.advanceHour(Xy/1e3*24/o2)},Xy),this.animate(a),a}switchGameMode(e,t){let n=this.game;!n||n.loading||(n.loading=!0,n.mode=e,setTimeout(()=>{switch(e){case 1:this.gameMapService.clear(n),this.fightService.init(n);break;case 0:this.fightService.clear(n),this.gameMapService.init(n);break}n.refreshRenderer(),setTimeout(()=>{n.warmUp(),n.loading=!1},300)},t?0:300))}lastFrameTime=performance.now();renderLoop(e){e.frame++;let t=performance.now(),n=Math.min((t-this.lastFrameTime)/1e3,.1);if(this.lastFrameTime=t,this.keyService.updateGamePadKeys(),!e.paused){let r=e.diagnostics;r.frameStart(e.renderer),r.measure("weather",()=>e.updateLights(n)),r.measure("render",()=>e.renderFrame()),r.frameEnd(e.renderer)}let i=this.keyService.pressedCodes;i.includes(8)?this.togglePaused():i.includes(1)&&(e.paused=!1),this.keyService.clearPressedKey(),this.syncHud()}syncHud(){let e=this.game;this.hudState.set(e?{loading:e.loading,paused:e.paused,framePerSec:e.framePerSec,temperature:Math.round(e.weather.temperature*10)/10,mode:e.mode,editModelId:e.editModelId,editTileId:e.editTileId,editBrush:e.editBrush,editSelection:e.editSelection,editCanUndo:e.editCanUndo,editCanRedo:e.editCanRedo,pixelRatio:e.pixelRatio,shadowMapSize:e.shadowMapSize,diagnostics:e.diagnostics.report,diagnosticsOpen:e.diagnostics.enabled,editMode:e.editMode,mapHelper:e.mapHelper??null}:null)}inputLoop(e){e.diagnostics.measure("input",()=>{switch(e.mode){case 0:this.gameMapService.inputLoop(e);break;case 1:this.fightService.inputLoop(e);break}})}animate(e){requestAnimationFrame(()=>this.animate(e)),this.renderLoop(e)}initCheckResize(){Ws(window,"resize").pipe(Dp(200)).subscribe(()=>this.game?.refreshRenderer())}togglePaused(){this.game&&(this.game.paused=!this.game.paused,this.syncHud())}setWeather(e){Ps(e,this.night())?e==="morning-mist"&&Ic(this.hourState())<.5&&this.setHour(Zm):this.setHour(Ps(e,!0)?Pc:Ac),this.game?.weather.setWeather(e),this.weatherState.set(e)}setWind(e,t){this.windStrengthState.set(e),this.windDirectionState.set(t),this.game?.weather.setWind(Id(e,t))}setFireflyColor(e){this.fireflyColorState.set(e),this.game?.weather.setFireflyColor(Pd(e))}setSound(e,t){this.soundVolumeState.set(e),this.soundMutedState.set(t),this.game?.weather.setSoundVolume(e,t)}setCloudDensity(e){this.cloudDensityState.set(e),this.game?.weather.setCloudDensity(e)}setGusts(e){this.gustsState.set(e),this.game?.weather.setGusts(e)}setLeafMode(e){this.leafModeState.set(e),this.game?.weather.setLeafMode(e)}setTimeFlow(e){this.timeFlowState.set(e)}advanceHour(e){let t=(this.hourState()+e)%24;this.game?.weather.setHour(t),this.hourState.set(t)}setHour(e){this.game?.weather.setHour(e),this.hourState.set(e),Ps(this.weatherState(),this.night())||this.setWeather("neutral")}toggleEditMode(){let e=this.game;!e||e.loading||e.mode!==0||(e.editMode?this.mapEditorService.exit(e):this.mapEditorService.enter(e),this.syncHud())}setDiagnostics(e){this.game&&(this.game.diagnostics.enabled=e,this.syncHud())}setQuality(e){this.qualityState.set(e),this.game?.setQuality(e),this.syncHud()}editCommand(e){this.game&&(this.mapEditorService.command(this.game,e),this.syncHud())}setEditBrush(e){this.game&&(this.mapEditorService.setBrush(this.game,e),this.syncHud())}selectEditTile(e){this.game&&(this.mapEditorService.selectTile(this.game,e),this.syncHud())}selectEditModel(e){this.game&&(this.mapEditorService.selectModel(this.game,e),this.syncHud())}static \u0275fac=function(t){return new(t||s)};static \u0275prov=wt({token:s,factory:s.\u0275fac})};function a2(s,e){if(s&1&&Qi(0,"div",3),s&2){let t=K(2);xr(t.currentStyle())}}function l2(s,e){if(s&1&&(ee(0,"div",1),He(1,a2,1,2,"div",2),oe()),s&2){let t=K();xr(t.contentStyle()),H(),Ue(e.current?1:-1)}}var Ku=class s{stick=je(Ns).stick;contentStyle=Tt(()=>{let e=this.stick();return e?{width:e.radius*2+"px",height:e.radius*2+"px",left:e.begin.x-e.radius+"px",top:e.begin.y-e.radius-10+"px"}:null});currentStyle=Tt(()=>{let e=this.stick();return e?{left:e.current.x-e.begin.x+e.radius+"px",top:e.current.y-e.begin.y+e.radius+"px"}:null});static \u0275fac=function(t){return new(t||s)};static \u0275cmp=Tn({type:s,selectors:[["core-stick"]],decls:1,vars:1,consts:[[1,"stick-circle",3,"style"],[1,"stick-circle"],[1,"stick-current",3,"style"],[1,"stick-current"]],template:function(t,n){if(t&1&&He(0,l2,2,3,"div",0),t&2){let i;Ue((i=n.stick())?0:-1,i)}},styles:["[_nghost-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;z-index:15;pointer-events:none}.stick-circle[_ngcontent-%COMP%]{border-radius:50%;position:absolute;display:flex;justify-content:center;align-items:center;background:radial-gradient(#ffffff1a,#ffffff4d);box-shadow:0 0 2px #fff6}.stick-circle[_ngcontent-%COMP%]   .stick-current[_ngcontent-%COMP%]{position:absolute;width:80px;height:80px;transform:translate3d(-40px,-40px,0);background:#fff;border-radius:50%;background:radial-gradient(#ffffff1a,#fff6);box-shadow:0 0 2px #ffffff80}"]})};var Yy=[{code:0,label:"a",type:0,size:{x:50,y:50},position:{x:110,y:25}},{code:1,label:"b",type:0,size:{x:50,y:50},position:{x:40,y:80}},{code:6,label:"x",type:0,size:{x:50,y:50},position:{x:180,y:80}},{code:7,label:"y",type:0,size:{x:50,y:50},position:{x:110,y:135}},{code:8,label:"start",type:1,size:{x:80,y:30},position:{x:40,y:220}},{code:9,label:"select",type:1,size:{x:80,y:30},position:{x:160,y:220}}];var c2=(s,e)=>e.label;function u2(s,e){if(s&1){let t=ft();ee(0,"div",2),ct("touchend",function(){let i=Le(t).$implicit,r=K(2);return De(r.touchBtn(i,"up"))})("touchstart",function(){let i=Le(t).$implicit,r=K(2);return De(r.touchBtn(i,"down"))}),ee(1,"div",3),V(2),oe()()}if(s&2){let t=e.$implicit,n=K(2);xr(n.getBtnStyle(t,!0)),H(),xr(n.getBtnStyle(t,!1)),H(),Ct(" ",t.label.toUpperCase()," ")}}function h2(s,e){if(s&1&&(ee(0,"div",0),rn("anim-fade-out"),sn("anim-fade-in-delayed"),Jt(1,u2,3,5,"div",1,c2),oe()),s&2){let t=K();H(),jt(t.btns)}}var Zu=class s{keyService=je(Cn);coreService=je(yr);sequenceService=je(Zi);pushedBtns=rt([]);btns=Yy;isTouchDevice=je(Ns).isTouchDevice;hasMessage=Tt(()=>!!this.sequenceService.message());constructor(){Ji(()=>{this.hasMessage(),this.coreService.resumed(),this.pushedBtns.set([])})}getBtnStyle(e,t){let n=e.size.y+(e.type===1?10:30),i=e.size.x+(e.type===1?20:30);if(t)return{right:e.position.x+"px",bottom:e.position.y+"px",width:i+"px",height:n+"px"};let r=this.isBtnPushed(e);return{"font-size":e.type===1?"12px":null,"border-radius":e.type===1?"4px":"50%",height:(r?n:e.size.y)+"px",width:(r?i:e.size.x)+"px",background:"rgba(255,255,255,"+(r?.6:.3)+")"}}isBtnPushed(e){return this.pushedBtns().includes(e.label)}touchBtn(e,t){t==="up"?(this.pushedBtns.update(n=>n.filter(i=>i!==e.label)),this.keyService.setKeyUp(e.code)):(this.pushedBtns.update(n=>n.includes(e.label)?n:[...n,e.label]),this.keyService.setKeyDown(e.code))}static \u0275fac=function(t){return new(t||s)};static \u0275cmp=Tn({type:s,selectors:[["core-touch-pad"]],decls:1,vars:1,consts:[[1,"right-touch-btns"],[1,"btn-container",3,"style"],[1,"btn-container",3,"touchend","touchstart"],[1,"btn"]],template:function(t,n){t&1&&He(0,h2,3,0,"div",0),t&2&&Ue(n.isTouchDevice()&&!n.hasMessage()?0:-1)},styles:["[_nghost-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;z-index:16;pointer-events:none}.right-touch-btns[_ngcontent-%COMP%]{position:absolute;z-index:2;right:0;bottom:0;width:50%;height:100%;color:#fff;font-weight:500;font-size:24px}.right-touch-btns[_ngcontent-%COMP%]   .btn-container[_ngcontent-%COMP%]{position:absolute;display:flex;justify-content:center;align-items:center;text-align:center;pointer-events:auto}.right-touch-btns[_ngcontent-%COMP%]   .btn-container[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{transition:all .4s ease-in-out;display:flex;justify-content:center;align-items:center;text-align:center;text-shadow:1px 1px 3px rgba(0,0,0,.1)}"]})};var d2=(s,e)=>e.key;function p2(s,e){if(s&1&&(ee(0,"div",5),Qi(1,"img",10),oe()),s&2){let t=K();H(),mn("src",t.pic)}}function f2(s,e){if(s&1&&(ee(0,"div",9),rn("anim-fade-out"),sn("anim-fade-in"),V(1),oe()),s&2){let t=K();H(),Ct(" ",t.name," ")}}function m2(s,e){if(s&1&&(ee(0,"div",4),rn("anim-fade-out"),sn("anim-fade-in"),He(1,p2,2,1,"div",5),ee(2,"div",6),Qi(3,"img",7),oe(),ee(4,"div",8),V(5),oe()(),He(6,f2,2,1,"div",9)),s&2){let t=e,n=K();H(),Ue(t.pic?1:-1),H(4),Ct(" ",n.text()," "),H(),Ue(t.name?6:-1)}}function g2(s,e){if(s&1){let t=ft();ee(0,"div",11),rn("message-choice-leave"),sn("message-choice-enter"),ct("click",function(i){return i.stopPropagation()})("touchstart",function(i){let r=Le(t).$index,o=K();return De(o.selectChoice(i,r))})("touchend",function(i){let r=Le(t).$implicit,o=K();return De(o.confirmChoice(i,r.key))}),V(1),oe()}if(s&2){let t=e.$implicit,n=e.$index,i=K();li("--%NS%enter-delay",(n+2)*100,"ms"),ut("selected",n===i.choiceId()),dt("aria-selected",n===i.choiceId()),H(),Ct(" ",t.text," ")}}var $u=class s{sequenceService=je(Zi);keyService=je(Cn);message=this.sequenceService.message;text=Tt(()=>this.message()?.text??"");choices=Tt(()=>this.message()?.choices??[]);choiceId=ui(()=>this.choices().length?0:-1);constructor(){this.keyService.pressedState.pipe(Ra()).subscribe(e=>this.onKeysPressed(e))}onKeysPressed(e){if(!e.length||!this.message())return;let t=this.choices();if(!t.length){this.keyService.clearPressedKey(),this.closeMessage();return}let n=this.keyService.pressedCodes;n.includes(0)?this.setChoice(t[this.choiceId()].key):n.includes(5)&&this.choiceId()>0?this.choiceId.update(i=>i-1):n.includes(4)&&this.choiceId()<t.length-1&&this.choiceId.update(i=>i+1),this.keyService.clearPressedKey()}selectChoice(e,t){e.stopPropagation(),this.choiceId.set(t)}confirmChoice(e,t){e.stopPropagation(),this.setChoice(t)}setChoice(e){this.sequenceService.closeMessage(e)}closeMessage(){this.message()&&this.choices().length||this.sequenceService.closeMessage()}static \u0275fac=function(t){return new(t||s)};static \u0275cmp=Tn({type:s,selectors:[["core-message"]],decls:6,vars:3,consts:[[1,"message-container",3,"touchend"],[1,"message-content"],["role","listbox",1,"message-choices"],["role","option",1,"message-choice",3,"--%NS%enter-delay","selected"],[1,"message-box"],[1,"box-portrait"],[1,"box-pokeball"],["src","assets/svg/poke-ball.svg","alt",""],["aria-live","polite",1,"box-text"],[1,"message-name"],["alt","",3,"src"],["role","option",1,"message-choice",3,"click","touchstart","touchend"]],template:function(t,n){if(t&1&&(ee(0,"div",0),ct("touchend",function(){return n.closeMessage()}),ee(1,"div",1),He(2,m2,7,3),ee(3,"div",2),Jt(4,g2,2,6,"div",3,d2),oe()()()),t&2){let i;ut("clickable",!!n.message()),H(2),Ue((i=n.message())?2:-1,i),H(2),jt(n.choices())}},styles:["[_nghost-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;z-index:900;pointer-events:none}.message-container[_ngcontent-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;display:flex;justify-content:center}.message-container.clickable[_ngcontent-%COMP%]{pointer-events:auto}.message-content[_ngcontent-%COMP%]{position:relative;max-width:800px;width:100%;height:100%}.message-content[_ngcontent-%COMP%]   .message-box[_ngcontent-%COMP%]{position:absolute;bottom:16px;left:16px;width:calc(100% - 32px);height:160px;pointer-events:auto;overflow:hidden;border-radius:16px;background:#fff;display:flex;justify-content:flex-start;align-items:center;text-align:left;color:#000;padding:0 48px;font-size:20px;line-height:28px;border:4px solid #EEE;box-shadow:2px 4px 4px #0000001a}.message-content[_ngcontent-%COMP%]   .message-box[_ngcontent-%COMP%]   .box-portrait[_ngcontent-%COMP%]{margin-right:24px}.message-content[_ngcontent-%COMP%]   .message-box[_ngcontent-%COMP%]   .box-portrait[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:120px}.message-content[_ngcontent-%COMP%]   .message-box[_ngcontent-%COMP%]   .box-text[_ngcontent-%COMP%]{position:relative;z-index:2}.message-content[_ngcontent-%COMP%]   .message-box[_ngcontent-%COMP%]   .box-pokeball[_ngcontent-%COMP%]{position:absolute;right:50px;bottom:-25px;transform:rotate(35deg);pointer-events:auto}.message-content[_ngcontent-%COMP%]   .message-box[_ngcontent-%COMP%]   .box-pokeball[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:200px;opacity:.6}.message-content[_ngcontent-%COMP%]   .message-name[_ngcontent-%COMP%]{position:absolute;left:64px;bottom:160px;min-width:20%;height:48px;border-radius:10px;padding:0 16px;background:#fff;font-size:20px;display:flex;justify-content:center;align-items:center;box-shadow:2px 4px 4px #00000026;border:2px solid #FAFAFA}.message-content[_ngcontent-%COMP%]   .message-choices[_ngcontent-%COMP%]{position:absolute;bottom:180px;right:12px;display:flex;flex-direction:column;align-items:flex-end}.message-content[_ngcontent-%COMP%]   .message-choices[_ngcontent-%COMP%]   .message-choice[_ngcontent-%COMP%]{transition:right .2s ease-in-out;right:0;position:relative;margin:2px 0;min-width:20%;width:100%;height:48px;border-radius:10px;padding:0 32px;background:#fff;font-size:20px;display:flex;justify-content:center;align-items:center;box-shadow:2px 4px 4px #00000026;border:2px solid #FAFAFA}.message-content[_ngcontent-%COMP%]   .message-choices[_ngcontent-%COMP%]   .message-choice.selected[_ngcontent-%COMP%]{right:40px;z-index:2;border:2px solid dodgerblue;color:#1e90ff}@media(max-width:850px){.message-content[_ngcontent-%COMP%]   .message-box[_ngcontent-%COMP%]{height:80px;border-radius:12px;padding:0 24px;font-size:16px;line-height:18px;border:3px solid #EEE}.message-content[_ngcontent-%COMP%]   .message-box[_ngcontent-%COMP%]   .box-portrait[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:60px}.message-content[_ngcontent-%COMP%]   .message-box[_ngcontent-%COMP%]   .box-pokeball[_ngcontent-%COMP%]{position:absolute;right:50px;bottom:-30px;transform:rotate(35deg);pointer-events:auto}.message-content[_ngcontent-%COMP%]   .message-box[_ngcontent-%COMP%]   .box-pokeball[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:140px;opacity:.6}.message-content[_ngcontent-%COMP%]   .message-name[_ngcontent-%COMP%]{left:40px;bottom:88px;min-width:20%;height:32px;border-radius:6px;padding:0 8px;background:#fff;font-size:16px}.message-content[_ngcontent-%COMP%]   .message-choices[_ngcontent-%COMP%]{position:absolute;bottom:100px;right:12px}.message-content[_ngcontent-%COMP%]   .message-choices[_ngcontent-%COMP%]   .message-choice[_ngcontent-%COMP%]{height:32px;border-radius:6px;padding:0 24px;font-size:16px}.message-content[_ngcontent-%COMP%]   .message-choices[_ngcontent-%COMP%]   .message-choice.selected[_ngcontent-%COMP%]{right:40px;z-index:2;border:2px solid dodgerblue;color:#1e90ff}}@keyframes _ngcontent-%COMP%_message-choice-in{0%{opacity:0;right:-20px}}@keyframes _ngcontent-%COMP%_message-choice-out{to{opacity:0;right:-20px}}.message-choice-enter[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_message-choice-in .2s var(--%NS%enter-delay, 0ms) both}.message-choice-leave[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_message-choice-out .2s forwards}"]})};function x2(s,e){s&1&&(ee(0,"div",0),rn("anim-fade-out"),sn("anim-fade-in"),oe())}var Ju=class s{sequenceService=je(Zi);mapHelper=Nt.required();teleport=rt(null);constructor(){this.sequenceService.teleport$.pipe(Ra()).subscribe(e=>this.onTeleport(e))}onTeleport(e){let t=this.mapHelper();this.teleport.set(e),setTimeout(()=>{let n=t.scenePlayer.mesh;if(n){let i={x:e.pos.x-n.position.x,z:e.pos.z-n.position.z},r=t.originGame.camera;r.position.x+=i.x,r.position.z+=i.z,t.updateCameraAim(),n.position.x+=i.x,n.position.z+=i.z,t.originGame.render()}this.teleport.set(null),setTimeout(()=>this.sequenceService.nextSequence(),200)},300)}static \u0275fac=function(t){return new(t||s)};static \u0275cmp=Tn({type:s,selectors:[["core-teleport"]],inputs:{mapHelper:[1,"mapHelper"]},decls:1,vars:1,consts:[[1,"teleport-container"]],template:function(t,n){t&1&&He(0,x2,1,0,"div",0),t&2&&Ue(n.teleport()?0:-1)},styles:["[_nghost-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;z-index:900;pointer-events:none}.teleport-container[_ngcontent-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:auto;background:#222}"]})};var Ky=(s,e)=>e.id;function y2(s,e){if(s&1&&(ee(0,"div",6),V(1),oe()),s&2){let t=K().$implicit;H(),yt(t.amount)}}function _2(s,e){if(s&1&&(ee(0,"div",4)(1,"div",5),V(2),oe(),He(3,y2,2,1,"div",6),oe()),s&2){let t=e.$implicit,n=K(2);ut("disabled",!t.enabled)("selected",t===n.currentMenu()),dt("aria-selected",t===n.currentMenu())("aria-disabled",!t.enabled),H(2),yt(t.label),H(),Ue(t.amount?3:-1)}}function E2(s,e){if(s&1&&(ee(0,"div",2),rn("anim-slide-out-right"),sn("anim-slide-in-right"),Jt(1,_2,4,8,"div",3,Ky),oe()),s&2){let t=K();ut("back",t.subMenus().length),H(),jt(t.menuItems())}}function v2(s,e){if(s&1&&(ee(0,"div",6),V(1),oe()),s&2){let t=K().$implicit;H(),yt(t.amount)}}function b2(s,e){if(s&1&&(ee(0,"div",4)(1,"div",5),V(2),oe(),He(3,v2,2,1,"div",6),oe()),s&2){let t=e.$implicit,n=K(3);ut("disabled",!t.enabled)("selected",t===n.currentSubMenu()),dt("aria-selected",t===n.currentSubMenu())("aria-disabled",!t.enabled),H(2),yt(t.label),H(),Ue(t.amount?3:-1)}}function T2(s,e){if(s&1&&(ee(0,"div",7),rn("anim-slide-out-right"),sn("anim-slide-in-right"),Jt(1,b2,4,8,"div",3,Ky),oe()),s&2){let t=K(),n=K();dt("aria-label",t.label),H(),jt(n.subMenus())}}function M2(s,e){if(s&1&&He(0,T2,3,1,"div",7),s&2){let t=K();Ue(t.subMenus().length?0:-1)}}function S2(s,e){if(s&1&&(ee(0,"div",1),rn("anim-fade-out"),sn("anim-fade-in"),V(1),oe()),s&2){let t=K();H(),Ct(" ",t.description()," ")}}var ju=class s{fightSequenceService=je(mo);menuItems=je(fo).menu;currentMenu=ui(()=>this.menuItems()[0]);selectedMenu=ui({source:this.menuItems,computation:()=>null});currentSubMenu=ui(()=>this.selectedMenu()?.subMenus[0]);subMenus=Tt(()=>this.selectedMenu()?.subMenus??[]);description=Tt(()=>(this.currentSubMenu()??this.currentMenu())?.desc??"");onKeyDown(e){this.selectedMenu()?this.bindSubMenuCode(e.code):this.bindMenuCode(e.code)}bindMenuCode(e){let t=this.currentMenu();t&&(e==="ArrowDown"||e==="ArrowUp"?this.currentMenu.set(s.moveInList(this.menuItems(),t,e)):(e==="Enter"||e==="ArrowRight")&&(t.subMenus.length?this.selectedMenu.set(t):t.enabled&&this.fightSequenceService.afterChoice(t)))}bindSubMenuCode(e){let t=this.currentSubMenu();t&&(e==="ArrowDown"||e==="ArrowUp"?this.currentSubMenu.set(s.moveInList(this.subMenus(),t,e)):e==="Enter"||e==="ArrowRight"?t.enabled&&this.fightSequenceService.afterChoice(t):(e==="Space"||e==="ArrowLeft")&&this.selectedMenu.set(null))}static moveInList(e,t,n){let i=e.indexOf(t),r=n==="ArrowDown"?Math.min(e.length-1,i+1):Math.max(0,i-1);return e[r]}static \u0275fac=function(t){return new(t||s)};static \u0275cmp=Tn({type:s,selectors:[["fight-ui"]],hostBindings:function(t,n){t&1&&zt("keydown",function(r){return n.onKeyDown(r)},Op)},decls:3,vars:3,consts:[["role","listbox","aria-label","Menu de combat",1,"menu",3,"back"],["aria-live","polite",1,"ui-desc"],["role","listbox","aria-label","Menu de combat",1,"menu"],["role","option",1,"menu-choice",3,"disabled","selected"],["role","option",1,"menu-choice"],[1,"choice-label"],[1,"choice-amount"],["role","listbox",1,"menu","sub-menu"]],template:function(t,n){if(t&1&&(He(0,E2,3,2,"div",0),He(1,M2,1,1),He(2,S2,2,1,"div",1)),t&2){let i;Ue(n.menuItems().length?0:-1),H(),Ue((i=n.selectedMenu())?1:-1,i),H(),Ue(n.description()?2:-1)}},styles:["[_nghost-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;z-index:2000;box-shadow:inset 0 0 140px 70px #000c;pointer-events:none}.menu[_ngcontent-%COMP%]{position:absolute;top:80px;left:80px;border:2px solid #EEE;background:#fff;border-radius:8px;overflow:hidden}.menu.sub-menu[_ngcontent-%COMP%]{top:100px;left:100px}.menu.back[_ngcontent-%COMP%]{opacity:.7}.menu[_ngcontent-%COMP%]   .menu-choice[_ngcontent-%COMP%]{width:240px;height:32px;display:flex;align-items:center;background:#fff;color:#333;font-size:14px;pointer-events:auto}.menu[_ngcontent-%COMP%]   .menu-choice[_ngcontent-%COMP%]   .choice-label[_ngcontent-%COMP%]{flex:1;opacity:.8;padding-left:16px;transition:padding-left .2s ease-in-out,opacity .2s ease-in-out,transform .2s ease-in-out}.menu[_ngcontent-%COMP%]   .menu-choice[_ngcontent-%COMP%]   .choice-amount[_ngcontent-%COMP%]{opacity:.6;padding-right:8px}.menu[_ngcontent-%COMP%]   .menu-choice.selected[_ngcontent-%COMP%]   .choice-label[_ngcontent-%COMP%]{opacity:1;transform:scale(1.1)}.menu[_ngcontent-%COMP%]   .menu-choice.selected[_ngcontent-%COMP%]   .choice-amount[_ngcontent-%COMP%]{opacity:.8}.menu[_ngcontent-%COMP%]   .menu-choice.disabled[_ngcontent-%COMP%]   .choice-label[_ngcontent-%COMP%], .menu[_ngcontent-%COMP%]   .menu-choice.disabled[_ngcontent-%COMP%]   .choice-amount[_ngcontent-%COMP%]{opacity:.3}.menu[_ngcontent-%COMP%]   .menu-choice[_ngcontent-%COMP%]{border-top:2px solid #EEE}.menu[_ngcontent-%COMP%]   .menu-choice[_ngcontent-%COMP%]:first-child{border-top:none}.menu[_ngcontent-%COMP%]   .menu-choice[_ngcontent-%COMP%]:last-child{border-radius:0 0 8px 8px}.ui-desc[_ngcontent-%COMP%]{position:absolute;bottom:0;left:0;width:100%;height:40px;padding:0 16px;border-top:2px solid #EEE;background:#fffc;color:#333;display:flex;align-items:center}"]})};var yp=[{model:Ou,texPos:{min:{x:0,y:0},max:{x:16,y:16}}},{model:Cu,texPos:{min:{x:185,y:125},max:{x:297,y:197}}},{model:Ru,texPos:{min:{x:24,y:11},max:{x:32,y:22}}},{model:Au,texPos:{min:{x:34,y:35},max:{x:50,y:50}}},{model:Pu,texPos:{min:{x:25,y:25},max:{x:39,y:40}}},{model:Iu,texPos:{min:{x:65,y:79},max:{x:95,y:120}}},{model:Lu,texPos:{min:{x:218,y:120},max:{x:298,y:192}}},{model:Du,texPos:{min:{x:26,y:25},max:{x:40,y:40}}},{model:Nu,texPos:{min:{x:28,y:19},max:{x:40,y:40}}}];function Zy(s){return s.croppedPic?Promise.resolve(s.croppedPic):new Promise(e=>{let t=document.createElement("canvas");t.width=s.texPos.max.x-s.texPos.min.x,t.height=s.texPos.max.y-s.texPos.min.y;let n=document.createElement("img");n.addEventListener("load",()=>{t.getContext("2d")?.drawImage(n,s.texPos.min.x,s.texPos.min.y,t.width,t.height,0,0,t.width,t.height),s.croppedPic=t.toDataURL(),e(s.croppedPic)},{once:!0}),n.src=s.model.tex.link})}var w2=(s,e)=>e.value,$y=(s,e)=>e.id;function C2(s,e){s&1&&V(0," Clic / glisser : peindre le sol \xB7 Clic droit gliss\xE9 : d\xE9placer la vue \xB7 \xC9chap : reposer le pinceau ")}function R2(s,e){s&1&&V(0," Clic : poser \xB7 \xC9chap : reposer le mod\xE8le \xB7 Glisser : d\xE9placer la vue \xB7 Molette : zoom ")}function A2(s,e){s&1&&V(0," Glisser l'objet : le d\xE9placer \xB7 Suppr : supprimer \xB7 \xC9chap : d\xE9s\xE9lectionner ")}function P2(s,e){s&1&&V(0," Clic sur un objet : le s\xE9lectionner \xB7 Glisser : d\xE9placer la vue \xB7 Molette : zoom \xB7 Choisis un mod\xE8le en bas pour le poser ")}function I2(s,e){if(s&1){let t=ft();ee(0,"div",6),rn("anim-fade-out"),sn("anim-fade-in"),ee(1,"button",7),ct("click",function(i){Le(t);let r=K();return De(r.send("undo",i))}),V(2,"\u21B6"),oe(),ee(3,"button",8),ct("click",function(i){Le(t);let r=K();return De(r.send("redo",i))}),V(4,"\u21B7"),oe(),ee(5,"button",9),ct("click",function(i){Le(t);let r=K();return De(r.send("export",i))}),V(6,"\u2B07 Exporter"),oe(),ee(7,"button",10),ct("click",function(i){Le(t);let r=K();return De(r.reset(i))}),V(8),oe()(),ee(9,"p",11),rn("anim-fade-out"),sn("anim-fade-in"),He(10,C2,1,0)(11,R2,1,0)(12,A2,1,0)(13,P2,1,0),oe()}if(s&2){let t=K();H(),mn("disabled",!t.canUndo()),H(2),mn("disabled",!t.canRedo()),H(4),ut("danger",t.confirmReset()),mn("title",t.confirmReset()?"Clique encore pour oublier les modifications":"Revenir \xE0 la carte du code (oublie les modifications enregistr\xE9es dans le navigateur)"),H(),yt(t.confirmReset()?"Confirmer ?":"\u27F2 R\xE9initialiser"),H(2),Ue(t.tileId()?10:t.modelId()?11:t.selection()?12:13)}}function L2(s,e){s&1&&Qi(0,"img",12),s&2&&mn("src",e)}function D2(s,e){if(s&1){let t=ft();ee(0,"section",4),rn("anim-fade-out"),sn("anim-fade-in"),ee(1,"h2"),He(2,L2,1,1,"img",12),V(3),oe(),ee(4,"label",13)(5,"input",14),ct("change",function(i){Le(t);let r=K();return De(r.send("togglePassable",i))}),oe(),V(6," Bloque le passage "),oe(),ee(7,"label",13)(8,"input",14),ct("change",function(i){Le(t);let r=K();return De(r.send("toggleCanHide",i))}),oe(),V(9," Transparent quand le joueur est derri\xE8re "),oe(),ee(10,"button",15),ct("click",function(i){Le(t);let r=K();return De(r.send("delete",i))}),V(11,"\u{1F5D1} Supprimer "),ee(12,"kbd"),V(13,"Suppr"),oe()()()}if(s&2){let t,n=e,i=K();H(2),Ue((t=i.thumbs()[n.modelId])?2:-1,t),H(),Ct(" ",i.selectionLabel()," "),H(2),mn("checked",!n.passable),H(3),mn("checked",n.canHide)}}function N2(s,e){if(s&1){let t=ft();ee(0,"button",25),ct("click",function(i){Le(t);let r=K().$implicit,o=K(3);return De(o.setBrush(r.value,i))}),V(1),oe()}if(s&2){let t=K().$implicit,n=K(3);mn("title",t.title),dt("aria-checked",n.brush()===t.value),H(),yt(t.label)}}function O2(s,e){if(s&1&&He(0,N2,2,3,"button",24),s&2){let t=e.$implicit,n=K(3);Ue(n.tab()==="ground"||t.value!=="fill"?0:-1)}}function F2(s,e){if(s&1&&(ee(0,"div",19),Jt(1,O2,1,1,null,null,w2),oe()),s&2){let t=K(2);H(),jt(t.brushes)}}function H2(s,e){s&1&&Qi(0,"img",12),s&2&&mn("src",e)}function U2(s,e){if(s&1){let t=ft();ee(0,"button",27),ct("click",function(i){let r=Le(t).$implicit,o=K(3);return De(o.pick(r.id,i))}),ee(1,"span",28),He(2,H2,1,1,"img",12),oe(),ee(3,"span",23),V(4),oe()()}if(s&2){let t,n=e.$implicit,i=K(3);ut("selected",n.id===i.modelId()),mn("title",n.label),dt("aria-pressed",n.id===i.modelId()),H(2),Ue((t=i.thumbs()[n.id])?2:-1,t),H(2),yt(n.label)}}function k2(s,e){if(s&1&&Jt(0,U2,5,6,"button",26,$y),s&2){let t=K(2);jt(t.entries)}}function B2(s,e){if(s&1){let t=ft();ee(0,"button",31),ct("click",function(i){let r=Le(t).$implicit,o=K(3);return De(o.pickTile(r.id,i))}),ee(1,"span",28),Qi(2,"span",32),oe(),ee(3,"span",23),V(4),oe()()}if(s&2){let t=e.$implicit,n=K(3);ut("selected",t.id===n.tileId()),mn("title","Sol : "+t.label),dt("aria-pressed",t.id===n.tileId()),H(2),li("background",t.background),H(2),yt(t.label)}}function z2(s,e){if(s&1){let t=ft();Jt(0,B2,5,7,"button",29,$y),ee(2,"button",30),ct("click",function(i){Le(t);let r=K(2);return De(r.pickTile("erase",i))}),ee(3,"span",22),V(4,"\u{1F9FD}"),oe(),ee(5,"span",23),V(6,"Gomme"),oe()()}if(s&2){let t=K(2);jt(t.tiles),H(2),ut("selected",t.tileId()==="erase"),dt("aria-pressed",t.tileId()==="erase")}}function G2(s,e){if(s&1){let t=ft();ee(0,"button",33),ct("click",function(i){Le(t);let r=K(2);return De(r.pickTile("raise",i))}),ee(1,"span",22),V(2,"\u26F0\uFE0F"),oe(),ee(3,"span",23),V(4,"Monter"),oe()(),ee(5,"button",34),ct("click",function(i){Le(t);let r=K(2);return De(r.pickTile("lower",i))}),ee(6,"span",22),V(7,"\u{1F573}\uFE0F"),oe(),ee(8,"span",23),V(9,"Descendre"),oe()(),ee(10,"button",35),ct("click",function(i){Le(t);let r=K(2);return De(r.pickTile("stairs",i))}),ee(11,"span",22),V(12,"\u{1FA9C}"),oe(),ee(13,"span",23),V(14,"Escalier"),oe()()}if(s&2){let t=K(2);ut("selected",t.tileId()==="raise"),dt("aria-pressed",t.tileId()==="raise"),H(5),ut("selected",t.tileId()==="lower"),dt("aria-pressed",t.tileId()==="lower"),H(5),ut("selected",t.tileId()==="stairs"),dt("aria-pressed",t.tileId()==="stairs")}}function V2(s,e){if(s&1){let t=ft();ee(0,"div",5),rn("anim-fade-out"),sn("anim-fade-in"),ee(1,"div",16)(2,"div",17)(3,"button",18),ct("click",function(i){Le(t);let r=K();return De(r.setTab("objects",i))}),V(4,"Objets"),oe(),ee(5,"button",18),ct("click",function(i){Le(t);let r=K();return De(r.setTab("ground",i))}),V(6,"Sols"),oe(),ee(7,"button",18),ct("click",function(i){Le(t);let r=K();return De(r.setTab("relief",i))}),V(8,"Reliefs"),oe()(),He(9,F2,3,0,"div",19),oe(),ee(10,"div",20)(11,"button",21),ct("click",function(i){Le(t);let r=K();return r.pick(null,i),De(r.tileSelected.emit(null))}),ee(12,"span",22),V(13,"\u270B"),oe(),ee(14,"span",23),V(15,"Aucun"),oe()(),He(16,k2,2,0)(17,z2,7,3)(18,G2,15,9),oe()()}if(s&2){let t=K();H(3),dt("aria-selected",t.tab()==="objects"),H(2),dt("aria-selected",t.tab()==="ground"),H(2),dt("aria-selected",t.tab()==="relief"),H(2),Ue(t.tab()!=="objects"?9:-1),H(2),ut("selected",!t.modelId()&&!t.tileId()),dt("aria-pressed",!t.modelId()&&!t.tileId()),H(5),Ue(t.tab()==="objects"?16:t.tab()==="ground"?17:18)}}var W2="b",q2=3e3,X2={labo:"Labo",house:"Maison",tree:"Arbre",flowers:"Fleurs",barrier:"Barri\xE8re",pannel:"Panneau","wood-pannel":"Pancarte","letter-box":"Bo\xEEte aux lettres",rock:"Rocher"},Qu=class s{editMode=Nt(!1);modelId=Nt(null);tileId=Nt(null);brush=Nt(1);selection=Nt(null);canUndo=Nt(!1);canRedo=Nt(!1);toggled=ln();modelSelected=ln();tileSelected=ln();brushChange=ln();tab=rt("objects");brushes=[{value:1,label:"1",title:"Pinceau 1 case"},{value:2,label:"2",title:"Pinceau 2 \xD7 2 cases"},{value:3,label:"3",title:"Pinceau 3 \xD7 3 cases"},{value:"fill",label:"\u{1FAA3}",title:"Pot de peinture : remplit toute la zone du m\xEAme sol"}];tiles=rp.map(e=>{let t=Hs(...e.center);return{id:e.id,label:e.label,background:`url(${co}) -${t.x*2}px -${t.y*2}px / ${xi.x*2}px ${xi.y*2}px`}});command=ln();entries=yp.map(e=>({id:e.model.id,label:this.label(e.model.id)}));thumbs=rt({});confirmReset=rt(!1);resetTimer;selectionLabel=Tt(()=>{let e=this.selection();return e?this.label(e.modelId):""});constructor(){let e=t=>this.onKeyDown(t);window.addEventListener("keydown",e,!0),je(fr).onDestroy(()=>window.removeEventListener("keydown",e,!0)),yp.forEach(t=>Zy(t).then(n=>this.thumbs.update(i=>ht(Ve({},i),{[t.model.id]:n}))))}toggle(e){e.currentTarget.blur(),this.toggled.emit()}pick(e,t){t.currentTarget.blur(),this.modelSelected.emit(e===this.modelId()?null:e)}pickTile(e,t){t.currentTarget.blur(),this.tileSelected.emit(e===this.tileId()?null:e)}setTab(e,t){t.currentTarget.blur(),this.tab.set(e)}setBrush(e,t){t.currentTarget.blur(),this.brushChange.emit(e)}send(e,t){t.currentTarget.blur(),this.command.emit(e)}reset(e){if(!this.confirmReset()){this.confirmReset.set(!0),this.resetTimer=setTimeout(()=>this.confirmReset.set(!1),q2);return}clearTimeout(this.resetTimer),this.confirmReset.set(!1),this.send("reset",e)}label(e){return X2[e]??e}onKeyDown(e){if(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||e.altKey)return;let n=e.key.toLowerCase(),i=e.ctrlKey||e.metaKey,r=!0;n===W2&&!i?e.repeat||this.toggled.emit():this.editMode()?i&&n==="z"?this.command.emit(e.shiftKey?"redo":"undo"):i&&n==="y"?this.command.emit("redo"):(n==="delete"||n==="backspace")&&this.selection()?this.command.emit("delete"):n==="escape"&&this.modelId()?this.modelSelected.emit(null):n==="escape"&&this.tileId()?this.tileSelected.emit(null):n==="escape"&&this.selection()?this.command.emit("deselect"):r=!1:r=!1,r&&(e.preventDefault(),e.stopPropagation())}static \u0275fac=function(t){return new(t||s)};static \u0275cmp=Tn({type:s,selectors:[["game-editor-bar"]],inputs:{editMode:[1,"editMode"],modelId:[1,"modelId"],tileId:[1,"tileId"],brush:[1,"brush"],selection:[1,"selection"],canUndo:[1,"canUndo"],canRedo:[1,"canRedo"]},outputs:{toggled:"toggled",modelSelected:"modelSelected",tileSelected:"tileSelected",brushChange:"brushChange",command:"command"},decls:11,vars:8,consts:[[1,"top"],["type","button",1,"edit-btn",3,"click","title"],["aria-hidden","true",1,"icon"],[1,"label"],["aria-label","Objet s\xE9lectionn\xE9",1,"selection"],[1,"palette-box"],[1,"history"],["type","button","title","Annuler (Ctrl+Z)","aria-label","Annuler",1,"icon-btn",3,"click","disabled"],["type","button","title","Refaire (Ctrl+Y)","aria-label","Refaire",1,"icon-btn",3,"click","disabled"],["type","button","title","T\xE9l\xE9charger la carte en fichier ck-pallet-town.ts, \xE0 mettre dans src/assets/map/world/chunks/",1,"text-btn",3,"click"],["type","button",1,"text-btn",3,"click","title"],[1,"hint"],["alt","",3,"src"],[1,"option"],["type","checkbox",3,"change","checked"],["type","button",1,"delete",3,"click"],[1,"palette-head"],["role","tablist","aria-label","Cat\xE9gories",1,"tabs"],["type","button","role","tab",3,"click"],["role","radiogroup","aria-label","Pinceau",1,"brushes"],["role","toolbar","aria-label","Outils",1,"palette"],["type","button","title","Aucun (\xC9chap) : la souris s\xE9lectionne et d\xE9place la vue",1,"entry","none",3,"click"],["aria-hidden","true",1,"pic"],[1,"name"],["type","button","role","radio",3,"title"],["type","button","role","radio",3,"click","title"],["type","button",1,"entry",3,"title","selected"],["type","button",1,"entry",3,"click","title"],[1,"pic"],["type","button",1,"entry","tile",3,"title","selected"],["type","button","title","Gomme : revenir au sol d'origine (enl\xE8ve aussi les escaliers)",1,"entry","tile",3,"click"],["type","button",1,"entry","tile",3,"click","title"],[1,"tile-pic"],["type","button","title","Monter le sol d'un niveau (clic / glisser)",1,"entry","tile",3,"click"],["type","button","title","Descendre le sol d'un niveau (clic / glisser)",1,"entry","tile",3,"click"],["type","button","title","Escalier : monte d'un niveau vers la case voisine plus haute (la gomme l'enl\xE8ve)",1,"entry","tile",3,"click"]],template:function(t,n){if(t&1&&(ee(0,"div",0)(1,"button",1),ct("click",function(r){return n.toggle(r)}),ee(2,"span",2),V(3,"\u{1F6E0}\uFE0F"),oe(),ee(4,"span",3),V(5),oe(),ee(6,"kbd"),V(7,"B"),oe()(),He(8,I2,14,7),oe(),He(9,D2,14,4,"section",4),He(10,V2,19,8,"div",5)),t&2){let i;H(),ut("active",n.editMode()),mn("title",n.editMode()?"Quitter l'\xE9dition (B)":"\xC9diter la carte (B)"),dt("aria-pressed",n.editMode()),H(4),yt(n.editMode()?"Quitter l'\xE9dition":"\xC9diter"),H(3),Ue(n.editMode()?8:-1),H(),Ue((i=n.editMode()&&n.selection())?9:-1,i),H(),Ue(n.editMode()?10:-1)}},styles:["[_nghost-%COMP%]{position:absolute;top:calc(10px + var(--%NS%safe-top));left:calc(82px + var(--%NS%safe-left));z-index:800;color:#fff;pointer-events:none}.top[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px}.history[_ngcontent-%COMP%]{pointer-events:auto;display:flex;gap:4px}.icon-btn[_ngcontent-%COMP%]{width:40px;height:40px;border:none;border-radius:8px;background:#22232ae6;box-shadow:0 1px 4px #0000004d;color:inherit;font-size:20px;cursor:pointer}.icon-btn[_ngcontent-%COMP%]:hover:not(:disabled){background:#40424ef2}.icon-btn[_ngcontent-%COMP%]:disabled{opacity:.35;cursor:default}.icon-btn[_ngcontent-%COMP%]:focus-visible{outline:2px solid #5aa8ff;outline-offset:2px}.text-btn[_ngcontent-%COMP%]{height:40px;padding:0 10px;border:none;border-radius:8px;background:#22232ae6;box-shadow:0 1px 4px #0000004d;color:inherit;font:inherit;font-size:13px;white-space:nowrap;cursor:pointer}.text-btn[_ngcontent-%COMP%]:hover{background:#40424ef2}.text-btn[_ngcontent-%COMP%]:focus-visible{outline:2px solid #5aa8ff;outline-offset:2px}.text-btn.danger[_ngcontent-%COMP%]{background:#c83c32e6}.selection[_ngcontent-%COMP%]{pointer-events:auto;width:250px;margin-top:10px;padding:10px 12px;border-radius:10px;background:#22232ae6;box-shadow:0 2px 8px #00000059;font-size:13px}.selection[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 8px;display:flex;align-items:center;gap:8px;font-size:14px}.selection[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:40px;max-height:32px;image-rendering:pixelated}.selection[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:4px 0;cursor:pointer}.selection[_ngcontent-%COMP%]   .option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{accent-color:#ffb04a}.selection[_ngcontent-%COMP%]   .delete[_ngcontent-%COMP%]{width:100%;margin-top:8px;padding:6px 8px;display:flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:6px;background:#dc463c40;color:inherit;font:inherit;cursor:pointer}.selection[_ngcontent-%COMP%]   .delete[_ngcontent-%COMP%]:hover{background:#dc463c73}.selection[_ngcontent-%COMP%]   .delete[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{padding:0 4px;border-radius:3px;background:#ffffff24;font:inherit;font-size:10px;opacity:.7}.edit-btn[_ngcontent-%COMP%]{pointer-events:auto;height:40px;display:flex;align-items:center;gap:6px;padding:0 10px;border:none;border-radius:8px;background:#22232ae6;box-shadow:0 1px 4px #0000004d;color:inherit;font:inherit;font-size:13px;cursor:pointer;transition:background .15s ease-in-out,box-shadow .15s ease-in-out}.edit-btn[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{font-size:17px;line-height:1}.edit-btn[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{padding:0 4px;border-radius:3px;background:#ffffff24;font:inherit;font-size:10px;opacity:.7}.edit-btn[_ngcontent-%COMP%]:hover{background:#40424ef2}.edit-btn[_ngcontent-%COMP%]:focus-visible{outline:2px solid #5aa8ff;outline-offset:2px}.edit-btn.active[_ngcontent-%COMP%]{box-shadow:0 0 0 2px #ffb04a,0 1px 4px #0000004d}.hint[_ngcontent-%COMP%]{position:fixed;left:50%;bottom:136px;transform:translate(-50%);max-width:calc(100vw - 32px);text-align:center;white-space:normal;margin:0;padding:6px 10px;border-radius:8px;background:#22232abf;font-size:12px}@media(max-width:640px){.edit-btn[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%], .edit-btn[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%], .hint[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]{left:calc(10px + var(--%NS%safe-left));top:calc(56px + var(--%NS%safe-top))}}.palette-box[_ngcontent-%COMP%]{pointer-events:auto;position:fixed;left:50%;bottom:14px;transform:translate(-50%);max-width:calc(100vw - 32px);border-radius:10px;background:#22232ae6;box-shadow:0 2px 8px #00000059}.palette-head[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:12px;padding:6px 6px 0}.palette-head[_ngcontent-%COMP%]   .tabs[_ngcontent-%COMP%], .palette-head[_ngcontent-%COMP%]   .brushes[_ngcontent-%COMP%]{display:flex;gap:4px}.palette-head[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:4px 10px;border:none;border-radius:6px;background:transparent;color:inherit;font:inherit;font-size:12px;cursor:pointer}.palette-head[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#ffffff14}.palette-head[_ngcontent-%COMP%]   button[aria-selected=true][_ngcontent-%COMP%], .palette-head[_ngcontent-%COMP%]   button[aria-checked=true][_ngcontent-%COMP%]{background:#ffb04a40;box-shadow:inset 0 0 0 1px #ffb04a}.palette-head[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible{outline:2px solid #5aa8ff;outline-offset:-2px}.palette[_ngcontent-%COMP%]{display:flex;gap:6px;padding:6px;overflow-x:auto}.entry[_ngcontent-%COMP%]{flex:none;width:76px;display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 4px;border:none;border-radius:8px;background:transparent;color:inherit;font:inherit;font-size:11px;cursor:pointer;transition:background .15s ease-in-out,box-shadow .15s ease-in-out}.entry[_ngcontent-%COMP%]   .pic[_ngcontent-%COMP%]{width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:24px}.entry[_ngcontent-%COMP%]   .pic[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;image-rendering:pixelated}.entry[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.entry[_ngcontent-%COMP%]:hover{background:#ffffff14}.entry[_ngcontent-%COMP%]:focus-visible{outline:2px solid #5aa8ff;outline-offset:-2px}.entry.selected[_ngcontent-%COMP%]{background:#ffb04a2e;box-shadow:inset 0 0 0 2px #ffb04a}.separator[_ngcontent-%COMP%]{flex:none;width:1px;margin:4px 2px;background:#fff3}.entry.tile[_ngcontent-%COMP%]{width:64px}.entry.tile[_ngcontent-%COMP%]   .tile-pic[_ngcontent-%COMP%]{width:32px;height:32px;image-rendering:pixelated}"]})};var va=[[-20,[90,140,255]],[0,[110,210,255]],[15,[120,220,120]],[25,[255,210,70]],[35,[255,140,40]],[50,[235,40,30]]];function Jy(s){let e=va.findIndex(([a])=>a>=s);if(e<=0)return`rgb(${va[e<0?va.length-1:0][1].join(",")})`;let[t,n]=va[e-1],[i,r]=va[e],o=(s-t)/(i-t);return`rgb(${n.map((a,l)=>Math.round(a+(r[l]-a)*o)).join(",")})`}var ba=[{id:"classic",label:"Classiques",icon:"\u2600\uFE0F"},{id:"rain",label:"Pluie & temp\xEAtes",icon:"\u{1F327}\uFE0F"},{id:"cold",label:"Froid",icon:"\u2744\uFE0F"},{id:"heat",label:"Chaleur & feu",icon:"\u{1F525}"},{id:"nature",label:"Nature",icon:"\u{1F33F}"},{id:"magic",label:"Magie & ciel",icon:"\u2728"},{id:"dark",label:"Sombre & surnaturel",icon:"\u{1F311}"}],jy={neutral:{category:"classic",sound:!1,summary:"Lumi\xE8re simple, sans effet.",description:"Une lumi\xE8re claire et neutre, sans nuages ni effets : la sc\xE8ne telle quelle, avec les ombres des b\xE2timents.",effects:["Ombres nettes","Aucun effet m\xE9t\xE9o"]},sunny:{category:"classic",sound:!1,summary:"Grand soleil, rayons et reflets.",description:"Un grand soleil : rayons de lumi\xE8re dans l'air, reflets brillants sur les toits, fa\xE7ades dor\xE9es c\xF4t\xE9 soleil.",effects:["Rayons de soleil","Reflets sur les toits","Fa\xE7ades r\xE9chauff\xE9es"]},cloudy:{category:"classic",sound:!1,summary:"Ombres de nuages qui d\xE9filent.",description:"Le ciel se couvre : les ombres des nuages glissent sur le sol avec le vent, la lumi\xE8re devient plus douce.",effects:["Ombres de nuages mobiles","Lumi\xE8re douce"]},fog:{category:"classic",sound:!1,summary:"Brouillard \xE9pais qui d\xE9rive.",description:"Un brouillard \xE9pais, plus dense au loin et au ras du sol, qui d\xE9rive en nappes avec le vent. La nuit, les fen\xEAtres percent la brume.",effects:["Brouillard en nappes","Visibilit\xE9 r\xE9duite au loin"]},"stalking-fog":{category:"classic",sound:!1,summary:"Le brouillard s'ouvre quand on marche, se referme \xE0 l'arr\xEAt.",description:"Un mur de brouillard entoure le joueur. Quand il marche, la brume s'\xE9carte et r\xE9v\xE8le les alentours ; d\xE8s qu'il s'arr\xEAte, elle se referme lentement sur lui, comme si elle l'attendait.",effects:["\xC9claircie autour du joueur","Rayon qui suit le mouvement","Bord d\xE9chir\xE9 qui ondule"]},"morning-mist":{category:"classic",sound:!0,summary:"Brume basse \xE0 l'aube, qui se dissipe au lever du soleil.",description:"Le petit matin : des nappes de brume basse tra\xEEnent au ras du sol, les rayons du soleil levant les traversent, la ros\xE9e brille et les oiseaux se r\xE9veillent. La brume d\xE9pend de l'heure : \xE9paisse de 3 h \xE0 7 h, elle se d\xE9chire quand le soleil monte et dispara\xEEt vers 10 h. Choisie \xE0 un autre moment, l'heure passe \xE0 6 h.",effects:["Nappes de brume au sol","Rayons de soleil","Ros\xE9e","Chant des oiseaux","Se dissipe avec l'heure"]},smog:{category:"classic",sound:!0,summary:"Brume jaune, ville qui gronde au loin.",description:"Une brume jaune-brun \xE9paisse et pesante, un soleil orange p\xE2le, des couleurs ternes. Au loin, la rumeur de la circulation, des klaxons et parfois une sir\xE8ne.",effects:["Brume pollu\xE9e","Couleurs ternies","Bruits de ville lointains"]},"sea-mist":{category:"classic",sound:!0,summary:"Brume bleut\xE9e, vagues et mouettes.",description:"Une brume marine bleu-gris arrive par nappes, pouss\xE9e par un vent l\xE9ger. On entend la houle respirer et des mouettes au loin.",effects:["Brume bleu-gris","Vent l\xE9ger permanent","Vagues et mouettes"]},drizzle:{category:"rain",sound:!0,summary:"Fine pluie l\xE9g\xE8re et grise.",description:"Une bruine fine et dense sous un ciel gris clair. Le sol se mouille doucement, avec un l\xE9ger voile de brume.",effects:["Fines gouttes","Sol mouill\xE9","Brume l\xE9g\xE8re"]},rainy:{category:"rain",sound:!0,summary:"Pluie, flaques et sol mouill\xE9.",description:"Une vraie pluie : le sol s'assombrit, des flaques se forment dans les creux et refl\xE8tent le ciel, les gouttes y font des ronds.",effects:["Pluie","Flaques qui se remplissent","Pas dans l'eau"]},"spring-shower":{category:"rain",sound:!0,summary:"Averse dor\xE9e sous le soleil.",description:"Une averse l\xE9g\xE8re en plein soleil : les gouttes brillent \xE0 contre-jour, les rayons percent et les oiseaux chantent.",effects:["Gouttes dor\xE9es","Rayons de soleil","Chants d'oiseaux"]},storm:{category:"rain",sound:!0,summary:"Pluie battante, \xE9clairs et tonnerre.",description:"Ciel noir, pluie battante, \xE9clairs simples ou doubles. Le tonnerre arrive plus ou moins tard selon la distance de l'\xE9clair.",effects:["Grosse pluie","\xC9clairs proches ou lointains","Tonnerre vari\xE9"]},"thunder-rain":{category:"rain",sound:!0,summary:"La foudre frappe le sol, l'\xE9lectricit\xE9 s'y propage.",description:"Une pluie battante sous un ciel noir. Toutes les quelques secondes, la foudre frappe le sol \xE0 un endroit visible : un \xE9clair ramifi\xE9, un flash, un coup de tonnerre sec. Depuis l'impact, des fissures \xE9lectriques s'\xE9tendent sur le sol, les flaques proches s'illuminent et gr\xE9sillent, des \xE9tincelles jaillissent. Si elle tombe tout pr\xE8s, l'\xE9cran tremble. Des arcs cr\xE9pitent sur les toits.",effects:["\xC9clairs visibles qui frappent le sol","D\xE9charges \xE9lectriques au sol","Flaques \xE9lectrifi\xE9es","\xC9tincelles","Secousse si proche","Arcs sur les toits"]},monsoon:{category:"rain",sound:!0,summary:"D\xE9luge tropical chaud, grenouilles.",description:"Une pluie tropicale battante et chaude sous une brume verte : le sol se gorge d'eau tr\xE8s vite, les grenouilles chantent et l'orage gronde au loin.",effects:["Pluie tr\xE8s dense","Flaques express","Grenouilles","Tonnerre lointain"]},hail:{category:"rain",sound:!0,summary:"Gr\xEAlons qui rebondissent partout.",description:"Des gr\xEAlons blancs tombent tr\xE8s vite et rebondissent sur le sol et les toits, sous un ciel gris fonc\xE9.",effects:["Gr\xEAlons","\xC9claboussures blanches","Cr\xE9pitement perl\xE9"]},"freezing-rain":{category:"rain",sound:!0,summary:"Pluie fine qui g\xE8le en verglas.",description:"Une pluie fine et glaciale : peu \xE0 peu, le sol et les toits se couvrent d'un verglas bleut\xE9 et brillant, et les pas craquent.",effects:["Verglas progressif","Reflets glac\xE9s","Pas qui craquent"]},flood:{category:"rain",sound:!0,summary:"L'eau monte au-dessus du sol.",description:"Une grosse pluie, et l'eau monte lentement au-dessus du sol jusqu'\xE0 tout recouvrir. Chaque pas \xE9clabousse. L'eau se retire ensuite.",effects:["Niveau d'eau qui monte","Clapotis","Pas dans l'eau partout"]},"old-film":{category:"magic",sound:!0,summary:"Le monde en vieux film noir et blanc.",description:"Le monde devient un vieux film muet : noir et blanc l\xE9g\xE8rement s\xE9pia, grain, image qui saute et scintille, rayures et poussi\xE8res sur la pellicule, coins assombris. On entend le ronronnement du projecteur et le cr\xE9pitement de la bobine.",effects:["Noir et blanc s\xE9pia","Grain et scintillement","Rayures et poussi\xE8res","Bruit de projecteur"]},antigravity:{category:"magic",sound:!0,summary:"Tout tombe vers le ciel, le joueur flotte.",description:"La gravit\xE9 s'est invers\xE9e : cailloux et mottes de terre montent lentement vers le ciel, des gouttes d'eau jaillissent du sol comme une pluie \xE0 l'envers, et le joueur flotte au-dessus du sol en se balan\xE7ant doucement. Un souffle a\xE9rien monte sans fin.",effects:["Cailloux qui montent","Pluie \xE0 l'envers","Joueur qui flotte","Souffle ascendant"]},inverted:{category:"magic",sound:!0,summary:"Couleurs en n\xE9gatif, sons \xE0 l'envers.",description:"Une dimension parall\xE8le : tout passe en n\xE9gatif, les ombres deviennent claires et les lumi\xE8res sombres, les sons arrivent \xE0 l'envers. M\xEAme la temp\xE9rature s'inverse : il fait plus chaud la nuit.",effects:["Image en n\xE9gatif","Ombres claires","Sons \xE0 l'envers"]},"time-warp":{category:"magic",sound:!0,summary:"Le temps ralentit autour de toi.",description:"Le temps se d\xE9r\xE8gle : tout ralentit, des poussi\xE8res de lumi\xE8re restent suspendues, l'air ondule et des anneaux se propagent autour de toi. Une horloge \xE9gr\xE8ne ses secondes, \xE9tir\xE9es et graves.",effects:["Ralenti","Anneaux autour du joueur","Poussi\xE8res fig\xE9es","Horloge au ralenti"]},geysers:{category:"nature",sound:!0,summary:"Bouches de vapeur qui entrent en \xE9ruption.",description:"Un air ti\xE8de et brumeux : quelques bouches fument doucement, gargouillent\u2026 puis crachent une haute colonne de vapeur en sifflant. Ne reste pas dessus, elles te projettent en l'air !",effects:["Vapeur qui s'\xE9chappe du sol","\xC9ruptions","Le joueur est projet\xE9","Gargouillis et sifflement"]},earthquake:{category:"rain",sound:!0,summary:"Le sol tremble par secousses.",description:"De temps en temps, la terre tremble : l'image secoue, de la poussi\xE8re tombe le long des murs et monte du sol, un grondement sourd fait vibrer l'air. Puis tout redevient calme\u2026 jusqu'\xE0 la prochaine secousse.",effects:["Secousses de la cam\xE9ra","Poussi\xE8re qui tombe des toits","Grondement sourd"]},tornado:{category:"rain",sound:!0,summary:"Une tornade qui erre sur la carte.",description:"Ciel vert-gris, vent violent : un tourbillon de poussi\xE8re nuageux, charg\xE9 de d\xE9bris, erre sur la carte. Si tu t'en approches trop, il t'emporte !",effects:["Tornade mobile","Le joueur s'envole","Grondement selon la distance"]},snow:{category:"cold",sound:!1,summary:"Neige qui recouvre les toits.",description:"Des flocons tombent doucement et la neige s'accumule petit \xE0 petit sur les toits et le sol. Les pas crissent.",effects:["Flocons","Neige qui s'accumule","Pas dans la neige"]},"crystal-mist":{category:"cold",sound:!0,summary:"\xC9clats de glace aux reflets de prisme.",description:"Une brume glac\xE9e et lumineuse o\xF9 flottent de minuscules \xE9clats de glace : ils captent la lumi\xE8re en reflets de prisme, les toits s'irisent et de fins tintements cristallins r\xE9sonnent.",effects:["\xC9clats de glace scintillants","Reflets iris\xE9s","Brume bleut\xE9e","Tintements"]},"magic-snow":{category:"cold",sound:!0,summary:"Neige et \xE9tincelles bleues.",description:"Une neige l\xE9g\xE8re m\xEAl\xE9e d'\xE9tincelles bleues et mauves qui scintillent en tombant, avec quelques notes cristallines.",effects:["\xC9tincelles scintillantes","Neige l\xE9g\xE8re","Clochettes"]},blizzard:{category:"cold",sound:!0,summary:"Temp\xEAte de neige, vent hurlant.",description:"Une temp\xEAte de neige : flocons souffl\xE9s presque \xE0 l'horizontale, neige poudreuse arrach\xE9e au sol en bourrasques, vent violent qui hurle, brume blanche et presque aucune visibilit\xE9.",effects:["Neige \xE0 l'horizontale","Bourrasques au ras du sol","Vent forc\xE9","Hurlements du vent"]},frost:{category:"cold",sound:!0,summary:"Le givre gagne tout peu \xE0 peu.",description:"Un froid sec et clair : le givre s'\xE9tend lentement sur l'herbe, les toits puis les murs, avec des cristaux qui scintillent. Les flaques g\xE8lent.",effects:["Givre progressif","Cristaux scintillants","Craquements de glace"]},"deep-freeze":{category:"cold",sound:!0,summary:"Froid extr\xEAme : givre sur les murs, haleine visible.",description:"Un froid mordant. Le givre recouvre tout et grimpe peu \xE0 peu le long des murs, le sol devient glac\xE9 et brillant, l'haleine du joueur forme de petits nuages. La glace craque avec des sons \xE9tranges et le vent glac\xE9 souffle. La nuit, une aurore bor\xE9ale danse au-dessus de la ville gel\xE9e.",effects:["Givre qui grimpe sur les murs","Haleine visible","Sol glac\xE9","Craquements de glace","Aurore la nuit"]},moonless:{category:"dark",sound:!0,summary:"Le noir complet, une lanterne, des yeux qui brillent.",description:"Une nuit sans lune ni \xE9toiles : on ne voit presque rien. Seules les fen\xEAtres allum\xE9es percent l'obscurit\xE9, et la lanterne du joueur \xE9claire un petit cercle chaud qui vacille. Dans le noir, des paires d'yeux brillants observent, clignent\u2026 et s'enfuient dans un bruissement quand on s'approche. Uniquement la nuit.",effects:["Obscurit\xE9 totale","Lanterne qui vacille","Yeux dans le noir","Fuite dans un bruissement"]},mirage:{category:"heat",sound:!0,summary:"De fausses flaques d'eau scintillent au loin.",description:"Une chaleur \xE9crasante : l'air tremble et, au loin, des flaques d'eau scintillantes refl\xE8tent ce qu'il y a derri\xE8re elles. Comme un vrai mirage, elles restent toujours loin devant : on ne les atteint jamais, elles s'effacent et r\xE9apparaissent ailleurs. L'image se d\xE9double l\xE9g\xE8rement et un sifflement aigu flotte dans l'air. Uniquement de jour.",effects:["Fausses flaques au loin","Image d\xE9doubl\xE9e","Air qui tremble","Sifflement de chaleur"]},heatwave:{category:"heat",sound:!1,summary:"Chaleur \xE9crasante, air qui ondule.",description:"Un soleil \xE9crasant : l'air ondule au-dessus du sol, les couleurs sont d\xE9lav\xE9es et chaudes.",effects:["Ondulations de chaleur","Couleurs d\xE9lav\xE9es"]},sandstorm:{category:"heat",sound:!0,summary:"Sable souffl\xE9 par un vent fort.",description:"Un vent fort soul\xE8ve le sable : tra\xEEn\xE9es de grains, nuages de poussi\xE8re ocre, et le sable s'amasse sur le sol et contre les murs.",effects:["Sable souffl\xE9","Sable qui s'accumule","Vent forc\xE9"]},volcanic:{category:"heat",sound:!0,summary:"Lumi\xE8re orange, braises et fum\xE9es.",description:"Une lumi\xE8re orang\xE9e, une brume \xE9touffante et l'air qui ondule. Des braises s'\xE9chappent du sol et des fum\xE9es sombres montent \xE7\xE0 et l\xE0 ; on entend gronder et cr\xE9piter.",effects:["Braises","Fum\xE9es sombres","Ondulations","Grondement et cr\xE9pitements"]},eruption:{category:"heat",sound:!0,summary:"Le volcan se r\xE9veille : secousses de plus en plus fr\xE9quentes.",description:"L'ambiance volcanique, avec des cendres qui tombent, et des secousses qui deviennent de plus en plus fr\xE9quentes. La tension monte avec elles : de plus en plus de braises et de fum\xE9es, jusqu'\xE0 une grande secousse qui fait jaillir une gerbe de braises\u2026 puis le cycle recommence.",effects:["Secousses de plus en plus rapproch\xE9es","Grande secousse finale","Gerbes de braises et fum\xE9es","Cendres","Grondement et cr\xE9pitements"]},ash:{category:"heat",sound:!0,summary:"Flocons de cendres grises.",description:"Le soleil orange est voil\xE9, des flocons de cendres grises tombent lentement en tourbillonnant et des nappes de fum\xE9e d\xE9rivent avec le vent. Un feu cr\xE9pite au loin.",effects:["Cendres qui tombent","Nappes de fum\xE9e","Soleil voil\xE9","Cr\xE9pitement lointain"]},forest:{category:"nature",sound:!0,summary:"Ombres de feuillage et oiseaux.",description:"Comme sous les arbres : ombres de feuillage qui bougent avec le vent, pollen dor\xE9, oiseaux le jour, grillons et hibou la nuit.",effects:["Ombres de feuillage","Pollen","Oiseaux, grillons, hibou"]},"autumn-drizzle":{category:"nature",sound:!0,summary:"Bruine dor\xE9e et feuilles mortes.",description:"Une lumi\xE8re d'automne basse et dor\xE9e, une fine bruine et des feuilles mortes qui tombent ensemble. Les fa\xE7ades rougeoient, quelques oiseaux chantent encore.",effects:["Lumi\xE8re dor\xE9e rasante","Bruine","Feuilles d'automne","Oiseaux discrets"]},leaves:{category:"nature",sound:!1,summary:"Feuilles ou p\xE9tales qui tombent.",description:"Des feuilles d'automne (ou des p\xE9tales de cerisier) tombent des arbres en virevoltant et se posent un moment au sol.",effects:["Feuilles qui tombent","Mode automne ou cerisier"]},"petal-whirl":{category:"nature",sound:!0,summary:"Tourbillons de p\xE9tales de cerisier.",description:"Un vent fort fait traverser de grands tourbillons de p\xE9tales de cerisier qui montent en spirale. On entend le souffle quand ils passent pr\xE8s.",effects:["Tourbillons de p\xE9tales","Vent forc\xE9","Souffle tournoyant"]},fireflies:{category:"nature",sound:!1,summary:"Lucioles autour des plantes.",description:"La nuit, des lucioles flottent autour des arbres et des fleurs en s'allumant et s'\xE9teignant doucement.",effects:["Lucioles","Couleur au choix"]},spores:{category:"nature",sound:!0,summary:"Spores lumineuses qui flottent.",description:"Un air \xE9trange teint\xE9 de vert : de grosses spores lumineuses montent du sol et des plantes. Quelques bulles \xE9clatent.",effects:["Spores lumineuses","Brume verte","Bulles discr\xE8tes"]},aurora:{category:"magic",sound:!1,summary:"Voiles d'aurore vert et violet.",description:"Une nuit claire \xE9clair\xE9e par des voiles d'aurore vert et violet qui ondulent sur le sol et les toits.",effects:["Aurores mouvantes"]},"starry-night":{category:"magic",sound:!0,summary:"Ciel clair, \xE9toiles dans les flaques.",description:"Une nuit claire et fra\xEEche : lune brillante et nette, ros\xE9e au sol, des \xE9toiles qui scintillent dans les petites flaques, quelques lucioles et le chant des grillons.",effects:["Lumi\xE8re de lune nette","Ros\xE9e et flaques","\xC9toiles dans les flaques","Grillons"]},"light-tide":{category:"magic",sound:!0,summary:"Vagues de lumi\xE8re bleue au sol.",description:"Une nuit bleu profond : des vagues de lumi\xE8re parcourent le sol comme du plancton bioluminescent, scintillent \xE0 leur passage puis s'\xE9teignent. On entend un doux ressac.",effects:["Vagues lumineuses","Plancton scintillant","Ressac doux"]},fireworks:{category:"magic",sound:!0,summary:"Gerbes color\xE9es qui illuminent la nuit.",description:"Une nuit de f\xEAte : des fus\xE9es sifflent en montant puis \xE9clatent en gerbes de couleurs qui retombent en pluie d'\xE9tincelles. Chaque explosion colore toute la sc\xE8ne un instant.",effects:["Fus\xE9es et gerbes color\xE9es","Sc\xE8ne illumin\xE9e \xE0 chaque \xE9clat","Sifflements et d\xE9tonations"]},mars:{category:"magic",sound:!0,summary:"Ciel rouille et sable rouge.",description:"Comme sur une autre plan\xE8te : un ciel couleur rouille, un vent qui soul\xE8ve du sable rouge et le d\xE9pose partout, des poussi\xE8res qui flottent longtemps dans l'air. La nuit tombe glaciale.",effects:["Sable rouge souffl\xE9","Sol qui rougit","Poussi\xE8res en faible gravit\xE9","Froid extr\xEAme"]},"solar-storm":{category:"magic",sound:!0,summary:"Aurores rouges et interf\xE9rences.",description:"Des aurores rouges en plein jour : la lumi\xE8re baisse par \xE0-coups, les fen\xEAtres clignotent et la radio gr\xE9sille.",effects:["Aurores rouges","Lumi\xE8re qui vacille","Gr\xE9sillements"]},stardust:{category:"magic",sound:!0,summary:"Poussi\xE8res dor\xE9es, reflets iris\xE9s.",description:"Des poussi\xE8res dor\xE9es et violettes flottent dans l'air, les reflets des toits prennent des couleurs iris\xE9es.",effects:["Poussi\xE8res d'\xE9toiles","Reflets iris\xE9s","Clochettes discr\xE8tes"]},"fairy-mist":{category:"magic",sound:!1,summary:"Brume rose et lumi\xE8res f\xE9\xE9riques.",description:"Une brume rose de r\xEAve qui ondule comme de l'air chaud, avec des lucioles roses autour des plantes.",effects:["Brume rose","Lumi\xE8res roses","Ondulations"]},"rising-energy":{category:"magic",sound:!1,summary:"Brume turquoise, \xE9tincelles qui montent.",description:"La nuit seulement : une brume \xE9paisse turquoise recouvre la ville, et des \xE9tincelles de la m\xEAme couleur montent du sol jusqu'au ciel.",effects:["Brume turquoise \xE9paisse","\xC9tincelles montantes","Lumi\xE8re qui respire"]},electric:{category:"magic",sound:!0,summary:"Arcs \xE9lectriques sur les toits.",description:"L'air est charg\xE9 : de petits arcs \xE9lectriques cr\xE9pitent sur les toits et le m\xE9tal. On les entend gr\xE9siller quand on passe pr\xE8s.",effects:["Arcs \xE9lectriques","Cr\xE9pitements de proximit\xE9"]},"blood-moon":{category:"dark",sound:!1,summary:"Lune rouge et braises montantes.",description:"Une lune de sang : lumi\xE8re rouge oppressante qui respire lentement, brume rouge et braises qui montent.",effects:["Lumi\xE8re rouge","Braises","Brume rouge"]},"blood-rain":{category:"dark",sound:!0,summary:"Pluie de sang, \xE9clairs rouges.",description:"Il pleut du sang : les flaques et le sol se teintent de rouge, des \xE9clairs rouges illuminent la sc\xE8ne.",effects:["Gouttes de sang","Flaques rouges","\xC9clairs rouges"]},"acid-rain":{category:"dark",sound:!0,summary:"Pluie verd\xE2tre qui ronge le sol.",description:"Un ciel jaune-vert maladif et une pluie verd\xE2tre qui ronge tout : le sol se tache, des vapeurs s'\xE9l\xE8vent l\xE0 o\xF9 elle tombe et on l'entend gr\xE9siller.",effects:["Pluie acide","Flaques et taches vertes","Vapeurs qui montent","Gr\xE9sillement"]},poison:{category:"dark",sound:!0,summary:"Brume violette et pluie toxique.",description:"Un climat empoisonn\xE9 : grosse brume violette, pluie violette, flaques toxiques d'o\xF9 montent des fum\xE9es violettes, air \xE9touffant qui ondule. Des bulles \xE9clatent.",effects:["Brume violette","Pluie toxique","Fum\xE9es violettes","Bulles toxiques"]},darkness:{category:"dark",sound:!0,summary:"Le noir se referme autour de toi.",description:"Une brume noire engloutit tout \xE0 quelques pas, et des volutes de t\xE9n\xE8bres rampent tout autour de toi. Les fen\xEAtres percent \xE0 peine. Ambiance sonore oppressante.",effects:["Vision r\xE9duite","Volutes noires qui rampent","Bourdonnement, c\u0153ur, chuchotements"]},curse:{category:"dark",sound:!0,summary:"Feux follets et ombres vivantes.",description:"Une lumi\xE8re violette \xE9teinte : des feux follets tournent autour de toi, les ombres bougent toutes seules, on entend chuchoter.",effects:["Feux follets","Ombres mouvantes","Chuchotements"]},haunted:{category:"dark",sound:!0,summary:"Silhouettes dans la brume.",description:"Une brume \xE9paisse d'o\xF9 s'\xE9l\xE8vent des volutes p\xE2les, et o\xF9 des silhouettes se forment au loin\u2026 puis se dissipent quand on s'approche. G\xE9missements dans le vent.",effects:["Brume \xE9paisse","Volutes qui s'\xE9l\xE8vent","Silhouettes fantomatiques","G\xE9missements"]}};function eh(s,e){return`assets/weather/${s}-${e?"night":"day"}.webp`}var Y2=["searchInput"],K2=["grid"],Z2=(s,e)=>e.id,$2=(s,e)=>e.category.id,J2=(s,e)=>e.type,j2=(s,e)=>e.color,Q2=(s,e)=>e.mode;function e3(s,e){if(s&1){let t=ft();ee(0,"button",13),ct("click",function(){let i=Le(t).$implicit,r=K(2);return De(r.selectCategory(i.id))}),ee(1,"span",14),V(2),oe(),ee(3,"span",15),V(4),oe(),ee(5,"span",16),V(6),oe()()}if(s&2){let t=e.$implicit,n=K(2);ut("active",n.category()===t.id),H(2),yt(t.icon),H(2),yt(t.label),H(2),yt(n.counts()[t.id])}}function t3(s,e){if(s&1&&(ee(0,"h3",33),V(1),oe()),s&2){let t=K().$implicit;H(),Di("",t.category.icon," ",t.category.label)}}function n3(s,e){if(s&1){let t=ft();ee(0,"img",49),ct("error",function(){Le(t),K();let i=ci(2),r=K(3);return De(r.markMissing(i))}),oe()}if(s&2){let t=K().$implicit,n=ci(2);mn("src",n)("alt",t.label)}}function i3(s,e){if(s&1&&(ee(0,"span",39),V(1),oe()),s&2){let t=K().$implicit;H(),yt(t.icon)}}function s3(s,e){s&1&&(ee(0,"span",40),V(1,"Actuelle"),oe())}function r3(s,e){s&1&&(ee(0,"span",45),V(1,"\u2600\uFE0F Jour"),oe())}function o3(s,e){s&1&&(ee(0,"span",46),V(1,"\u{1F319} Nuit"),oe())}function a3(s,e){s&1&&(ee(0,"span",47),V(1,"\u{1F50A}"),oe())}function l3(s,e){if(s&1){let t=ft();ee(0,"button",36),ct("click",function(){let i=Le(t).$implicit,r=K(3);return De(r.focus(i))})("dblclick",function(){let i=Le(t).$implicit,r=K(3);return De(r.apply(i))}),ee(1,"span",37),wa(2),He(3,n3,1,2,"img",38)(4,i3,2,1,"span",39),He(5,s3,2,0,"span",40),oe(),ee(6,"span",41)(7,"span",42),V(8),oe(),ee(9,"span",43),V(10),oe(),ee(11,"span",44),He(12,r3,2,0,"span",45),He(13,o3,2,0,"span",46),He(14,a3,2,0,"span",47),ee(15,"span",48),V(16),oe()()()()}if(s&2){let t=e.$implicit,n=K(3);ut("focused",t.type===n.focused())("current",t.type===n.weather())("other-time",!n.available(t)),dt("data-type",t.type)("aria-selected",t.type===n.focused()),H(2);let i=Ca(n.screenshot(t,n.night()));H(),Ue(n.isMissing(i)?4:3),H(2),Ue(t.type===n.weather()?5:-1),H(3),yt(t.label),H(2),yt(t.info.summary),H(2),Ue(t.only==="day"?12:-1),H(),Ue(t.only==="night"?13:-1),H(),Ue(t.info.sound?14:-1),H(2),Ct("",t.temperature[n.night()&&t.only!=="day"?1:0],"\xB0C")}}function c3(s,e){if(s&1&&(He(0,t3,2,2,"h3",33),ee(1,"div",34),Jt(2,l3,17,17,"button",35,J2),oe()),s&2){let t=e.$implicit,n=K(2);Ue(n.category()===null?0:-1),H(2),jt(t.entries)}}function u3(s,e){if(s&1&&(ee(0,"p",19),V(1),oe()),s&2){let t=K(2);H(),Ct("Aucune m\xE9t\xE9o ne correspond \xE0 \xAB ",t.search()," \xBB.")}}function h3(s,e){if(s&1){let t=ft();ee(0,"img",50),ct("error",function(){Le(t),K();let i=ci(33),r=K();return De(r.markMissing(i))}),oe()}if(s&2){K();let t=ci(30),n=ci(33);mn("src",n)("alt",t.label)}}function d3(s,e){if(s&1&&(ee(0,"span",23),V(1),oe()),s&2){K();let t=ci(30);H(),yt(t.icon)}}function p3(s,e){if(s&1){let t=ft();ee(0,"div",24)(1,"button",51),ct("click",function(){Le(t);let i=K(2);return De(i.detailNight.set(!1))}),V(2,"\u2600\uFE0F"),oe(),ee(3,"button",51),ct("click",function(){Le(t);let i=K(2);return De(i.detailNight.set(!0))}),V(4,"\u{1F319}"),oe()()}if(s&2){let t=K(2);H(),ut("active",!t.detailNight()),dt("aria-checked",!t.detailNight()),H(2),ut("active",t.detailNight()),dt("aria-checked",t.detailNight())}}function f3(s,e){if(s&1&&(ee(0,"li"),V(1),oe()),s&2){let t=e.$implicit;H(),yt(t)}}function m3(s,e){if(s&1&&V(0),s&2){K();let t=ci(30);Ct(" \u2600\uFE0F ",t.temperature[0],"\xB0C ")}}function g3(s,e){if(s&1&&V(0),s&2){K();let t=ci(30);Ct(" \u{1F319} ",t.temperature[1],"\xB0C ")}}function x3(s,e){if(s&1){let t=ft();ee(0,"button",55),ct("click",function(){let i=Le(t).$implicit,r=K(3);return De(r.fireflyColorChange.emit(i.color))}),oe()}if(s&2){let t=e.$implicit,n=K(3);li("--%NS%swatch",t.hex),ut("active",t.color===n.fireflyColor()),mn("title",t.label),dt("aria-checked",t.color===n.fireflyColor())("aria-label",t.label)}}function y3(s,e){if(s&1&&(ee(0,"div",29)(1,"span",52),V(2,"Couleur des lucioles"),oe(),ee(3,"div",53),Jt(4,x3,1,7,"button",54,j2),oe()()),s&2){let t=K(2);H(4),jt(t.fireflyColors)}}function _3(s,e){if(s&1){let t=ft();ee(0,"button",51),ct("click",function(){let i=Le(t).$implicit,r=K(3);return De(r.leafModeChange.emit(i.mode))}),V(1),oe()}if(s&2){let t=e.$implicit,n=K(3);ut("active",t.mode===n.leafMode()),dt("aria-checked",t.mode===n.leafMode()),H(),yt(t.label)}}function E3(s,e){if(s&1&&(ee(0,"div",29)(1,"span",52),V(2,"Type de feuilles"),oe(),ee(3,"div",56),Jt(4,_3,2,4,"button",57,Q2),oe()()),s&2){let t=K(2);H(4),jt(t.leafModes)}}function v3(s,e){s&1&&(ee(0,"button",31),V(1,"\u2713 M\xE9t\xE9o actuelle"),oe())}function b3(s,e){if(s&1){let t=ft();ee(0,"button",58),ct("click",function(){Le(t),K();let i=ci(30),r=K();return De(r.apply(i))}),V(1),oe()}if(s&2){K();let t=ci(30),n=K();H(),Ct("Appliquer \xB7 ",n.timeChangeHint(t))}}function T3(s,e){if(s&1){let t=ft();ee(0,"button",58),ct("click",function(){Le(t),K();let i=ci(30),r=K();return De(r.apply(i))}),V(1,"Appliquer"),oe()}}function M3(s,e){if(s&1){let t=ft();ee(0,"div",2),ct("click",function(){Le(t);let i=K();return De(i.close())}),oe(),ee(1,"section",3)(2,"header",4)(3,"h2",5),V(4,"M\xE9t\xE9o"),oe(),ee(5,"label",6)(6,"span",7),V(7,"\u{1F50D}"),oe(),ee(8,"input",8,0),ct("input",function(i){Le(t);let r=K();return De(r.setSearch(i))}),oe()(),ee(10,"span",9),V(11,"M fermer \xB7 Tab cat\xE9gories / cartes \xB7 \u2190 \u2192 \u2191 \u2193 \xB7 Entr\xE9e"),oe(),ee(12,"button",10),ct("click",function(){Le(t);let i=K();return De(i.close())}),V(13,"\u2715"),oe()(),ee(14,"div",11)(15,"nav",12)(16,"button",13),ct("click",function(){Le(t);let i=K();return De(i.selectCategory(null))}),ee(17,"span",14),V(18,"\u{1F5C2}\uFE0F"),oe(),ee(19,"span",15),V(20,"Toutes"),oe(),ee(21,"span",16),V(22),oe()(),Jt(23,e3,7,5,"button",17,Z2),oe(),ee(25,"div",18,1),Jt(27,c3,4,1,null,null,$2,!1,u3,2,1,"p",19),oe(),wa(30),ee(31,"aside",20)(32,"div",21),wa(33),He(34,h3,1,2,"img",22)(35,d3,2,1,"span",23),He(36,p3,5,6,"div",24),oe(),ee(37,"div",25)(38,"span",26),V(39),oe(),ee(40,"h3"),V(41),oe(),ee(42,"p"),V(43),oe(),ee(44,"ul",27),Jt(45,f3,2,1,"li",null,Hp),oe(),ee(47,"dl",28)(48,"div")(49,"dt"),V(50,"\u{1F321}\uFE0F Temp\xE9rature"),oe(),ee(51,"dd"),He(52,m3,1,1),He(53,g3,1,1),oe()(),ee(54,"div")(55,"dt"),V(56,"\u{1F552} Disponible"),oe(),ee(57,"dd"),V(58),oe()(),ee(59,"div")(60,"dt"),V(61,"\u{1F50A} Sons"),oe(),ee(62,"dd"),V(63),oe()()(),He(64,y3,6,0,"div",29),He(65,E3,6,0,"div",29),oe(),ee(66,"div",30),He(67,v3,2,0,"button",31)(68,b3,2,1,"button",32)(69,T3,2,0,"button",32),oe()()()()}if(s&2){let t=K();H(8),mn("value",t.search()),H(7),ut("keyboard",t.zone()==="categories"),H(),ut("active",t.category()===null),H(6),yt(t.total),H(),jt(t.categories),H(2),ut("keyboard",t.zone()==="cards"),H(2),jt(t.groups()),H(3);let n=Ca(t.detail());H(3);let i=Ca(t.screenshot(n,t.detailNight()));H(),Ue(t.isMissing(i)?35:34),H(2),Ue(n.only?-1:36),H(3),Di("",t.detailCategory().icon," ",t.detailCategory().label),H(2),Di("",n.icon," ",n.label),H(2),yt(n.info.description),H(2),jt(n.info.effects),H(7),Ue(n.only!=="night"?52:-1),H(),Ue(n.only!=="day"?53:-1),H(5),yt(n.only==="day"?"Le jour seulement":n.only==="night"?"La nuit seulement":"Jour et nuit"),H(5),yt(n.info.sound?"Oui":"Non"),H(),Ue(n.type===t.WeatherType.FIREFLIES?64:-1),H(),Ue(n.type===t.WeatherType.LEAVES?65:-1),H(2),Ue(n.type===t.weather()?67:t.available(n)?69:68)}}var Qy="m",Ta=ha.map(s=>{let e=Ps(s.type,!1),t=Ps(s.type,!0);return ht(Ve({},s),{info:jy[s.type],only:e&&t?"":e?"day":"night",temperature:Rd[s.type]})});function e_(s){return s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()}var th=class s{keyService=je(Cn);weather=Nt.required();night=Nt(!1);fireflyColor=Nt("green");leafMode=Nt("autumn");weatherSelected=ln();fireflyColorChange=ln();leafModeChange=ln();categories=ba;fireflyColors=no;leafModes=t0;WeatherType=ar;isOpen=rt(!1);category=rt(null);search=rt("");focused=rt("neutral");zone=rt("cards");detailNight=rt(!1);missing=rt(new Set);searchInput=qs("searchInput");grid=qs("grid");visible=Tt(()=>{let e=e_(this.search().trim()),t=this.category();return Ta.filter(n=>(!t||n.info.category===t)&&(!e||e_(`${n.label} ${n.info.summary} ${n.info.description}`).includes(e)))});groups=Tt(()=>{let e=this.visible();return ba.map(t=>({category:t,entries:e.filter(n=>n.info.category===t.id)})).filter(t=>t.entries.length)});counts=Tt(()=>{let e={};return Ta.forEach(t=>e[t.info.category]=(e[t.info.category]??0)+1),e});detail=Tt(()=>Ta.find(e=>e.type===this.focused())??Ta[0]);detailCategory=Tt(()=>ba.find(e=>e.id===this.detail().info.category));total=Ta.length;constructor(){let e=n=>this.onKeyDown(n),t=n=>this.isOpen()&&n.stopPropagation();window.addEventListener("keydown",e,!0),window.addEventListener("keyup",t,!0),je(fr).onDestroy(()=>{window.removeEventListener("keydown",e,!0),window.removeEventListener("keyup",t,!0)})}show(){this.isOpen()||(this.focused.set(this.weather()),this.detailNight.set(this.night()),this.zone.set("cards"),this.isOpen.set(!0),this.keyService.clearKeys(),setTimeout(()=>this.scrollToFocused(),50))}close(){this.isOpen.set(!1),this.keyService.clearKeys(),document.activeElement?.blur()}available(e){return Ps(e.type,this.night())}timeChangeHint(e){return e.only==="day"?`passe au jour (${ua(Ac)})`:`passe \xE0 la nuit (${ua(Pc)})`}screenshot(e,t){let n=e.only==="day"?!1:e.only==="night"?!0:t;return eh(e.type,n)}isMissing(e){return this.missing().has(e)}markMissing(e){this.missing.update(t=>new Set([...t,e]))}selectCategory(e){this.zone.set("categories"),this.category.set(e);let t=this.visible()[0];t&&!this.visible().some(n=>n.type===this.focused())&&this.focused.set(t.type)}setSearch(e){this.search.set(e.target.value);let t=this.visible()[0];t&&!this.visible().some(n=>n.type===this.focused())&&this.focused.set(t.type)}focus(e){this.zone.set("cards"),this.focused.set(e.type),this.detailNight.set(e.only==="night"||e.only!=="day"&&this.night())}apply(e=this.detail()){this.weatherSelected.emit(e.type)}onKeyDown(e){let t=e.target instanceof HTMLInputElement&&e.target.type==="text";if(!this.isOpen()){e.key.toLowerCase()===Qy&&!(e.target instanceof HTMLInputElement)&&!e.repeat&&(e.stopPropagation(),this.show());return}if(e.stopPropagation(),e.key==="Escape"){t&&this.search()?(this.search.set(""),e.target.value=""):this.close(),e.preventDefault();return}if(e.key==="Tab"){this.zone.set(this.zone()==="cards"?"categories":"cards"),document.activeElement?.blur(),e.preventDefault();return}if(!(t&&(e.key==="ArrowLeft"||e.key==="ArrowRight"))&&(this.zone()==="categories"?this.categoriesKey(e):this.cardsKey(e),!e.defaultPrevented)){if(!t&&e.key.toLowerCase()===Qy){this.close();return}!t&&e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&this.searchInput()?.nativeElement.focus()}}categoriesKey(e){let t=[null,...ba.map(i=>i.id)],n=t.indexOf(this.category());switch(e.key){case"ArrowUp":case"ArrowDown":{let i=(n+(e.key==="ArrowUp"?-1:1)+t.length)%t.length;this.selectCategory(t[i]),this.grid()?.nativeElement.scrollTo({top:0}),e.preventDefault();return}case"ArrowRight":case"Enter":this.zone.set("cards"),!this.visible().some(i=>i.type===this.focused())&&this.visible().length&&this.focused.set(this.visible()[0].type),setTimeout(()=>this.scrollToFocused()),e.preventDefault();return}}cardsKey(e){switch(e.key){case"Enter":this.apply(),e.preventDefault();return;case"ArrowLeft":this.firstInRow()?this.zone.set("categories"):this.move(-1),e.preventDefault();return;case"ArrowRight":this.move(1),e.preventDefault();return;case"ArrowUp":case"ArrowDown":this.moveVertically(e.key==="ArrowUp"?-1:1),e.preventDefault();return}}move(e){let t=this.visible();if(!t.length)return;let n=Math.max(0,t.findIndex(r=>r.type===this.focused())),i=Math.min(t.length-1,Math.max(0,n+e));this.focus(t[i]),setTimeout(()=>this.scrollToFocused())}moveVertically(e){let t=this.cardElements(),n=t.find(u=>u.dataset.type===this.focused());if(!n){this.move(e);return}let i=n.getBoundingClientRect(),r=i.left+i.width/2,o=null,a=1/0,l=1/0;for(let u of t){let h=u.getBoundingClientRect(),d=(h.top-i.top)*e;if(d<5)continue;let p=Math.abs(h.left+h.width/2-r);(d<a-5||Math.abs(d-a)<=5&&p<l)&&(o=u,a=d,l=p)}let c=o&&this.visible().find(u=>u.type===o.dataset.type);c&&(this.focus(c),setTimeout(()=>this.scrollToFocused()))}firstInRow(){let e=this.cardElements(),t=e.find(i=>i.dataset.type===this.focused());if(!t)return!0;let n=t.getBoundingClientRect();return!e.some(i=>{let r=i.getBoundingClientRect();return Math.abs(r.top-n.top)<5&&r.left<n.left-5})}cardElements(){return Array.from(this.grid()?.nativeElement.querySelectorAll(".card")??[])}scrollToFocused(){this.grid()?.nativeElement.querySelector(".card.focused")?.scrollIntoView({block:"nearest",behavior:"smooth"})}static \u0275fac=function(t){return new(t||s)};static \u0275cmp=Tn({type:s,selectors:[["game-weather-catalog"]],viewQuery:function(t,n){t&1&&mr(n.searchInput,Y2,5)(n.grid,K2,5),t&2&&gr(2)},hostVars:2,hostBindings:function(t,n){t&2&&ut("open",n.isOpen())},inputs:{weather:[1,"weather"],night:[1,"night"],fireflyColor:[1,"fireflyColor"],leafMode:[1,"leafMode"]},outputs:{weatherSelected:"weatherSelected",fireflyColorChange:"fireflyColorChange",leafModeChange:"leafModeChange"},decls:1,vars:1,consts:[["searchInput",""],["grid",""],[1,"backdrop",3,"click"],["role","dialog","aria-modal","true","aria-labelledby","catalog-title",1,"popup"],[1,"popup-header"],["id","catalog-title"],[1,"search"],["aria-hidden","true"],["type","text","placeholder","Rechercher une m\xE9t\xE9o\u2026","aria-label","Rechercher une m\xE9t\xE9o",3,"input","value"],["aria-hidden","true",1,"shortcut"],["type","button","aria-label","Fermer",1,"close",3,"click"],[1,"popup-body"],["aria-label","Cat\xE9gories",1,"categories"],["type","button",3,"click"],["aria-hidden","true",1,"cat-icon"],[1,"cat-label"],[1,"cat-count"],["type","button",3,"active"],["role","listbox","aria-label","M\xE9t\xE9os",1,"grid"],[1,"empty"],["aria-live","polite",1,"detail"],[1,"detail-shot"],[3,"src","alt"],["aria-hidden","true",1,"thumb-emoji","big"],["role","radiogroup","aria-label","Aper\xE7u",1,"day-night"],[1,"detail-text"],[1,"detail-category"],[1,"effects"],[1,"facts"],[1,"options"],[1,"detail-actions"],["type","button","disabled","",1,"apply"],["type","button",1,"apply"],[1,"group-title"],[1,"cards"],["type","button","role","option",1,"card",3,"focused","current","other-time"],["type","button","role","option",1,"card",3,"click","dblclick"],[1,"thumb"],["loading","lazy",3,"src","alt"],["aria-hidden","true",1,"thumb-emoji"],[1,"current-badge"],[1,"card-text"],[1,"card-name"],[1,"card-summary"],[1,"badges"],["title","Seulement le jour",1,"badge"],["title","Seulement la nuit",1,"badge"],["title","Sons d'ambiance",1,"badge"],[1,"badge","temp"],["loading","lazy",3,"error","src","alt"],[3,"error","src","alt"],["type","button","role","radio",3,"click"],[1,"options-title"],["role","radiogroup","aria-label","Couleur des lucioles",1,"swatches"],["type","button","role","radio",1,"swatch",3,"active","title","--%NS%swatch"],["type","button","role","radio",1,"swatch",3,"click","title"],["role","radiogroup","aria-label","Type de feuilles",1,"sub-options"],["type","button","role","radio",3,"active"],["type","button",1,"apply",3,"click"]],template:function(t,n){t&1&&He(0,M3,70,25),t&2&&Ue(n.isOpen()?0:-1)},styles:["[_nghost-%COMP%]{--%NS%popup-bg: rgba(30, 31, 38, .96);--%NS%card-bg: rgba(255, 255, 255, .06);--%NS%accent: #5aa8ff;position:absolute;inset:0;z-index:900;pointer-events:none;color:#fff}.open[_nghost-%COMP%]{pointer-events:auto}button[_ngcontent-%COMP%]{font:inherit;color:inherit;border:none;cursor:pointer;background:none}.backdrop[_ngcontent-%COMP%]{position:absolute;inset:0;background:#00000073;animation:_ngcontent-%COMP%_fade-in .18s ease-out}.popup[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(1200px,100vw - 32px);height:min(780px,100vh - 32px);display:flex;flex-direction:column;border-radius:14px;background:var(--%NS%popup-bg);box-shadow:0 12px 48px #0000008c;overflow:hidden;animation:_ngcontent-%COMP%_pop-in .2s ease-out}.popup-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.08)}.popup-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase}.popup-header[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]{flex:1;max-width:420px;display:flex;align-items:center;gap:8px;padding:6px 12px;border-radius:8px;background:#ffffff14}.popup-header[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;min-width:0;border:none;outline:none;background:transparent;color:#fff;font:inherit;font-size:14px}.popup-header[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#ffffff73}.popup-header[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]:focus-within{box-shadow:0 0 0 2px var(--%NS%accent)}.popup-header[_ngcontent-%COMP%]   .shortcut[_ngcontent-%COMP%]{margin-left:auto;font-size:11px;opacity:.5;white-space:nowrap}.popup-header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]{width:32px;height:32px;border-radius:8px;font-size:15px}.popup-header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover{background:#ffffff1f}.popup-body[_ngcontent-%COMP%]{flex:1;min-height:0;display:grid;grid-template-columns:200px 1fr 340px}.categories[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2px;padding:10px 8px;border-right:1px solid rgba(255,255,255,.08);overflow-y:auto}.categories[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;font-size:13px;text-align:left;transition:background .15s ease-in-out}.categories[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .cat-label[_ngcontent-%COMP%]{flex:1}.categories[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .cat-count[_ngcontent-%COMP%]{font-size:11px;opacity:.5}.categories[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#ffffff14}.categories[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{background:#5aa8ff38;font-weight:600}.categories.keyboard[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{box-shadow:inset 0 0 0 2px var(--%NS%accent)}.grid[_ngcontent-%COMP%]:not(.keyboard)   .card.focused[_ngcontent-%COMP%]{outline-color:#5aa8ff59}.grid[_ngcontent-%COMP%]{min-height:0;padding:10px 16px 16px;overflow-y:auto}.group-title[_ngcontent-%COMP%]{margin:10px 2px 8px;font-size:13px;font-weight:600;opacity:.75}.cards[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}.card[_ngcontent-%COMP%]{display:flex;flex-direction:column;border-radius:10px;background:var(--%NS%card-bg);text-align:left;overflow:hidden;outline:2px solid transparent;transition:outline-color .15s ease-in-out,background .15s ease-in-out,transform .15s ease-in-out}.card[_ngcontent-%COMP%]:hover{background:#ffffff1c}.card.focused[_ngcontent-%COMP%]{outline-color:var(--%NS%accent);background:#5aa8ff1f}.card.current[_ngcontent-%COMP%]   .thumb[_ngcontent-%COMP%]{box-shadow:inset 0 0 0 2px #7ee08a}.card.other-time[_ngcontent-%COMP%]   .thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{filter:saturate(.6) brightness(.85)}.thumb[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:16/10;background:linear-gradient(135deg,#ffffff1a,#ffffff05)}.thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;image-rendering:pixelated}.thumb[_ngcontent-%COMP%]   .current-badge[_ngcontent-%COMP%]{position:absolute;top:6px;left:6px;padding:2px 6px;border-radius:4px;background:#2f9e44;font-size:10px;font-weight:700}.thumb-emoji[_ngcontent-%COMP%]{font-size:40px}.thumb-emoji.big[_ngcontent-%COMP%]{font-size:96px}.card-text[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:3px;padding:8px 10px 10px}.card-name[_ngcontent-%COMP%]{font-size:13px;font-weight:700}.card-summary[_ngcontent-%COMP%]{font-size:11px;opacity:.7;line-height:1.3}.badges[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:4px;margin-top:3px}.badge[_ngcontent-%COMP%]{padding:1px 5px;border-radius:4px;background:#ffffff1a;font-size:10px}.badge.temp[_ngcontent-%COMP%]{margin-left:auto;font-variant-numeric:tabular-nums}.empty[_ngcontent-%COMP%]{margin-top:40px;text-align:center;opacity:.6}.detail[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-height:0;border-left:1px solid rgba(255,255,255,.08);background:#00000026}.detail-shot[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:16/10;background:linear-gradient(135deg,#ffffff1a,#ffffff05)}.detail-shot[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;image-rendering:pixelated}.detail-shot[_ngcontent-%COMP%]   .day-night[_ngcontent-%COMP%]{position:absolute;right:8px;bottom:8px;display:flex;padding:2px;border-radius:8px;background:#0000008c}.detail-shot[_ngcontent-%COMP%]   .day-night[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:3px 8px;border-radius:6px;opacity:.6}.detail-shot[_ngcontent-%COMP%]   .day-night[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{opacity:1;background:#fff3}.detail-text[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-y:auto;padding:12px 16px}.detail-text[_ngcontent-%COMP%]   .detail-category[_ngcontent-%COMP%]{font-size:11px;opacity:.6}.detail-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:4px 0 8px;font-size:20px}.detail-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 0 10px;font-size:13px;line-height:1.5;opacity:.9}.effects[_ngcontent-%COMP%]{margin:0 0 12px;padding-left:18px;font-size:12px;line-height:1.6}.facts[_ngcontent-%COMP%]{margin:0;display:flex;flex-direction:column;gap:4px;font-size:12px}.facts[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.facts[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%]{opacity:.6}.facts[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%]{margin:0}.options[_ngcontent-%COMP%]{margin-top:14px}.options[_ngcontent-%COMP%]   .options-title[_ngcontent-%COMP%]{display:block;margin-bottom:6px;font-size:12px;opacity:.7}.swatches[_ngcontent-%COMP%]{display:flex;gap:10px}.swatches[_ngcontent-%COMP%]   .swatch[_ngcontent-%COMP%]{width:26px;height:26px;border-radius:50%;background:var(--%NS%swatch);box-shadow:0 0 8px var(--%NS%swatch);border:2px solid transparent;opacity:.75}.swatches[_ngcontent-%COMP%]   .swatch.active[_ngcontent-%COMP%]{opacity:1;border-color:#fafafa;transform:scale(1.12)}.sub-options[_ngcontent-%COMP%]{display:flex;gap:4px}.sub-options[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1;padding:6px 0;border-radius:6px;background:#ffffff14;font-size:12px}.sub-options[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{background:#fafafa;color:#222;font-weight:600}.detail-actions[_ngcontent-%COMP%]{padding:12px 16px;border-top:1px solid rgba(255,255,255,.08)}.detail-actions[_ngcontent-%COMP%]   .apply[_ngcontent-%COMP%]{width:100%;padding:10px;border-radius:8px;background:var(--%NS%accent);color:#0b1a2c;font-weight:700;font-size:14px}.detail-actions[_ngcontent-%COMP%]   .apply[_ngcontent-%COMP%]:hover:not(:disabled){filter:brightness(1.1)}.detail-actions[_ngcontent-%COMP%]   .apply[_ngcontent-%COMP%]:disabled{background:#ffffff1a;color:#ffffffb3;cursor:default}@media(max-width:900px){.popup-body[_ngcontent-%COMP%]{grid-template-columns:1fr;grid-template-rows:auto 1fr auto}.categories[_ngcontent-%COMP%]{flex-direction:row;border-right:none;border-bottom:1px solid rgba(255,255,255,.08);overflow-x:auto}.categories[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{white-space:nowrap}.detail[_ngcontent-%COMP%]{max-height:45%;border-left:none;border-top:1px solid rgba(255,255,255,.08)}.shortcut[_ngcontent-%COMP%]{display:none}}@media(max-height:520px)and (orientation:landscape){.popup[_ngcontent-%COMP%]{width:calc(100vw - 16px);height:calc(100vh - 16px);border-radius:10px}.popup-header[_ngcontent-%COMP%]{padding-top:6px;padding-bottom:6px}.popup-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:14px}.popup-body[_ngcontent-%COMP%]{grid-template-columns:1fr 250px;grid-template-rows:auto 1fr}.categories[_ngcontent-%COMP%]{grid-column:1;grid-row:1;flex-direction:row;overflow-x:auto;border-right:none;border-bottom:1px solid rgba(255,255,255,.08)}.categories[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{white-space:nowrap}.grid[_ngcontent-%COMP%]{grid-column:1;grid-row:2}.cards[_ngcontent-%COMP%]{grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}.thumb[_ngcontent-%COMP%]{aspect-ratio:5/2}.thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;inset:0}.detail[_ngcontent-%COMP%]{grid-column:2;grid-row:1/span 2;max-height:none;border-top:none;border-left:1px solid rgba(255,255,255,.08)}.detail-shot[_ngcontent-%COMP%]{aspect-ratio:2/1}.detail-text[_ngcontent-%COMP%], .detail-actions[_ngcontent-%COMP%]{padding:8px 12px}}@keyframes _ngcontent-%COMP%_fade-in{0%{opacity:0}}@keyframes _ngcontent-%COMP%_pop-in{0%{opacity:0;transform:translate(-50%,-48%) scale(.98)}}@media(prefers-reduced-motion:reduce){.backdrop[_ngcontent-%COMP%], .popup[_ngcontent-%COMP%]{animation:none}}"]})};var S3=["catalog"],w3=(s,e)=>e.direction;function C3(s,e){if(s&1){let t=ft();ye(0,"img",15),zt("error",function(){Le(t);let i=K();return De(i.thumbMissing.set(!0))}),be()}if(s&2){let t=K();ai("src",t.currentThumb())}}function R3(s,e){if(s&1&&(ye(0,"span",6),V(1),be()),s&2){let t=K();H(),yt(t.current().icon)}}function A3(s,e){if(s&1){let t=ft();ye(0,"div",10)(1,"section",16)(2,"div",17)(3,"span",18),V(4),be(),ye(5,"span",19),V(6),be()(),ye(7,"input",20),zt("input",function(i){Le(t);let r=K();return De(r.setHour(i))})("change",function(i){Le(t);let r=K();return De(r.releaseSlider(i))}),be(),ye(8,"div",21)(9,"span"),V(10,"0h"),be(),ye(11,"span"),V(12,"6h"),be(),ye(13,"span"),V(14,"12h"),be(),ye(15,"span"),V(16,"18h"),be(),ye(17,"span"),V(18,"24h"),be()(),ye(19,"button",22),zt("click",function(i){Le(t);let r=K();return De(r.toggleTimeFlow(i))}),ye(20,"span",23),V(21,"\u23F1\uFE0F Temps qui passe"),be(),ji(22,"span",24),be()(),ye(23,"p",25),V(24,"1 jour = 12 min \xB7 \u2190 \u2192 r\xE9gler \xB7 Entr\xE9e d\xE9filement \xB7 \xC9chap fermer"),be()()}if(s&2){let t=K();H(4),Ct("",t.timeOfDay().icon," Heure"),H(2),Di("",t.timeOfDay().label," \xB7 ",t.hourLabel()),H(),ai("value",t.hour()),dt("aria-valuetext",t.hourLabel()+", "+t.timeOfDay().label),H(12),ut("active",t.timeFlow()),dt("aria-checked",t.timeFlow())}}function P3(s,e){if(s&1){let t=ft();ye(0,"button",30),zt("click",function(i){let r=Le(t).$implicit,o=K(2);return De(o.setWindDirection(r.direction,i))}),V(1),be()}if(s&2){let t=e.$implicit,n=K(2);ut("active",t.direction===n.windDirection()),dt("aria-checked",t.direction===n.windDirection()),H(),Ct(" ",t.label," ")}}function I3(s,e){if(s&1){let t=ft();ye(0,"div",10)(1,"section",26)(2,"div",17)(3,"span",18),V(4,"\u{1F4A8} Vent"),be(),ye(5,"span",19),V(6),be()(),ye(7,"input",27),zt("input",function(i){Le(t);let r=K();return De(r.setWindStrength(i))})("change",function(i){Le(t);let r=K();return De(r.releaseSlider(i))}),be(),ye(8,"div",28),Jt(9,P3,2,4,"button",29,w3),be(),ye(11,"button",22),zt("click",function(i){Le(t);let r=K();return De(r.toggleGusts(i))}),ye(12,"span",23),V(13,"\u{1F32C}\uFE0F Rafales"),be(),ji(14,"span",24),be()(),ye(15,"p",25),V(16,"\u2190 \u2192 force \xB7 \u2191 \u2193 sens \xB7 Entr\xE9e rafales \xB7 \xC9chap fermer"),be()()}if(s&2){let t=K();H(6),Di("",t.windLabel()," \xB7 ",t.windPercent(),"%"),H(),li("--%NS%fill",t.windPercent(),"%"),ai("value",t.windPercent()),H(2),jt(t.windDirections),H(2),ut("active",t.gusts()),dt("aria-checked",t.gusts())}}function L3(s,e){if(s&1){let t=ft();ye(0,"div",10)(1,"section",31)(2,"div",17)(3,"span",18),V(4,"\u2601\uFE0F Nuages"),be(),ye(5,"span",19),V(6),be()(),ye(7,"input",32),zt("input",function(i){Le(t);let r=K();return De(r.setCloudDensity(i))})("change",function(i){Le(t);let r=K();return De(r.releaseSlider(i))}),be()(),ye(8,"p",25),V(9,"\u2190 \u2192 r\xE9gler \xB7 \xC9chap fermer"),be()()}if(s&2){let t=K();H(6),Di("",t.cloudLabel()," \xB7 ",t.cloudPercent(),"%"),H(),li("--%NS%fill",t.cloudPercent(),"%"),ai("value",t.cloudPercent())}}function D3(s,e){if(s&1){let t=ft();ye(0,"div",10)(1,"section",33)(2,"div",17)(3,"span",18),V(4),be(),ye(5,"button",34),zt("click",function(i){Le(t);let r=K();return De(r.toggleMute(i))}),V(6),be()(),ye(7,"input",35),zt("input",function(i){Le(t);let r=K();return De(r.setSoundVolume(i))})("change",function(i){Le(t);let r=K();return De(r.releaseSlider(i))}),be()(),ye(8,"p",25),V(9,"\u2190 \u2192 volume \xB7 Entr\xE9e couper \xB7 \xC9chap fermer"),be()()}if(s&2){let t=K();H(4),Ct("",t.soundMuted()||!t.soundPercent()?"\u{1F507}":"\u{1F50A}"," Son"),H(),dt("aria-pressed",t.soundMuted()),H(),Ct(" ",t.soundMuted()?"Activer":"Couper"," "),H(),li("--%NS%fill",t.soundMuted()?0:t.soundPercent(),"%"),ai("value",t.soundPercent())}}var N3={h:"hour",w:"wind",n:"clouds",v:"sound"},O3=.25,_p=.05,nh=class s{keyService=je(Cn);host=je(Np);weather=Nt.required();night=Nt(!1);hour=Nt(12);timeFlow=Nt(!0);windStrength=Nt(0);windDirection=Nt("east");fireflyColor=Nt("green");leafMode=Nt("autumn");gusts=Nt(!0);cloudDensity=Nt(.5);soundVolume=Nt(.7);soundMuted=Nt(!1);weatherSelected=ln();hourChange=ln();timeFlowChange=ln();windChange=ln();fireflyColorChange=ln();leafModeChange=ln();gustsChange=ln();cloudDensityChange=ln();soundChange=ln();catalog=qs.required("catalog");hourNow=ui(()=>this.hour());windNow=ui(()=>({strength:this.windStrength(),direction:this.windDirection()}));gustsNow=ui(()=>this.gusts());cloudsNow=ui(()=>this.cloudDensity());soundNow=ui(()=>({volume:this.soundVolume(),muted:this.soundMuted()}));panel=rt(null);windDirections=n0;windPercent=Tt(()=>Math.round(this.windStrength()*100));windLabel=Tt(()=>{let e=this.windStrength();return e<.05?"Calme":e<.35?"Brise":e<.7?"Vent fort":"Temp\xEAte"});soundPercent=Tt(()=>Math.round(this.soundVolume()*100));cloudPercent=Tt(()=>Math.round(this.cloudDensity()*100));cloudLabel=Tt(()=>{let e=this.cloudDensity();return e<.25?"Clairsem\xE9s":e<.5?"\xC9pars":e<.75?"Nombreux":"Couvert"});timeOfDay=Tt(()=>jm[Jm(this.hour())]);hourLabel=Tt(()=>ua(this.hour()));currentThumb=Tt(()=>eh(this.weather(),this.night()));thumbMissing=rt(!1);current=Tt(()=>ha.find(e=>e.type===this.weather())??ha[0]);constructor(){Ji(()=>{this.currentThumb(),this.thumbMissing.set(!1)});let e=i=>this.onKeyDown(i),t=i=>this.panel()&&i.stopPropagation(),n=i=>{this.panel()&&!this.host.nativeElement.querySelector(".toolbar")?.contains(i.target)&&this.panel.set(null)};window.addEventListener("keydown",e,!0),window.addEventListener("keyup",t,!0),window.addEventListener("pointerdown",n,!0),je(fr).onDestroy(()=>{window.removeEventListener("keydown",e,!0),window.removeEventListener("keyup",t,!0),window.removeEventListener("pointerdown",n,!0)})}openCatalog(e){e&&this.dropFocus(e),this.panel.set(null),this.catalog().show()}toggle(e,t){t&&this.dropFocus(t),this.panel.update(n=>n===e?null:e),this.keyService.clearKeys()}setWindStrength(e){this.emitWind(e.target.valueAsNumber/100,this.windNow().direction)}setWindDirection(e,t){this.dropFocus(t),this.emitWind(this.windNow().strength,e)}releaseSlider(e){this.dropFocus(e)}setSoundVolume(e){this.emitSound(e.target.valueAsNumber/100,!1)}toggleMute(e){e&&this.dropFocus(e),this.emitSound(this.soundNow().volume,!this.soundNow().muted)}setCloudDensity(e){this.emitClouds(e.target.valueAsNumber/100)}toggleGusts(e){e&&this.dropFocus(e),this.gustsNow.set(!this.gustsNow()),this.gustsChange.emit(this.gustsNow())}toggleTimeFlow(e){e&&this.dropFocus(e),this.timeFlowChange.emit(!this.timeFlow())}setHour(e){this.emitHour(e.target.valueAsNumber)}emitHour(e){this.hourNow.set((e%24+24)%24),this.hourChange.emit(this.hourNow())}emitWind(e,t){this.windNow.set({strength:Math.min(Math.max(e,0),1),direction:t}),this.windChange.emit(this.windNow())}emitClouds(e){this.cloudsNow.set(Math.min(Math.max(e,0),1)),this.cloudDensityChange.emit(this.cloudsNow())}emitSound(e,t){this.soundNow.set({volume:Math.min(Math.max(e,0),1),muted:t}),this.soundChange.emit(this.soundNow())}onKeyDown(e){if(this.catalog().isOpen()||e.target instanceof HTMLInputElement&&e.target.type==="text")return;let t=e.key.toLowerCase(),n=N3[t];if(n&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.stopPropagation(),e.repeat||this.toggle(n);return}let i=this.panel();if(!i)return;let r=e.key==="ArrowLeft"?-1:e.key==="ArrowRight"?1:0,o=!0;if(e.key==="Escape")this.panel.set(null);else if(r)switch(i){case"hour":this.emitHour(this.hourNow()+r*O3);break;case"wind":this.emitWind(this.windNow().strength+r*_p,this.windNow().direction);break;case"clouds":this.emitClouds(this.cloudsNow()+r*_p);break;case"sound":this.emitSound(this.soundNow().volume+r*_p,!1);break}else e.key==="ArrowUp"||e.key==="ArrowDown"?i==="wind"&&this.emitWind(this.windNow().strength,this.windNow().direction==="east"?"west":"east"):e.key==="Enter"||e.key===" "?i==="hour"?this.toggleTimeFlow():i==="wind"?this.toggleGusts():i==="sound"&&this.toggleMute():o=!1;o&&(e.stopPropagation(),e.preventDefault())}dropFocus(e){e.currentTarget?.blur?.()}static \u0275fac=function(t){return new(t||s)};static \u0275cmp=Tn({type:s,selectors:[["game-weather-panel"]],viewQuery:function(t,n){t&1&&mr(n.catalog,S3,5),t&2&&gr()},inputs:{weather:[1,"weather"],night:[1,"night"],hour:[1,"hour"],timeFlow:[1,"timeFlow"],windStrength:[1,"windStrength"],windDirection:[1,"windDirection"],fireflyColor:[1,"fireflyColor"],leafMode:[1,"leafMode"],gusts:[1,"gusts"],cloudDensity:[1,"cloudDensity"],soundVolume:[1,"soundVolume"],soundMuted:[1,"soundMuted"]},outputs:{weatherSelected:"weatherSelected",hourChange:"hourChange",timeFlowChange:"timeFlowChange",windChange:"windChange",fireflyColorChange:"fireflyColorChange",leafModeChange:"leafModeChange",gustsChange:"gustsChange",cloudDensityChange:"cloudDensityChange",soundChange:"soundChange"},decls:48,vars:28,consts:[["catalog",""],["role","toolbar","aria-label","M\xE9t\xE9o et ambiance",1,"toolbar"],[1,"tool"],["type","button","title","M\xE9t\xE9o (M)",1,"tool-btn","weather",3,"click"],[1,"weather-thumb"],["alt","",3,"src"],["aria-hidden","true"],[1,"tool-value"],["type","button","title","Heure (H)",1,"tool-btn",3,"click"],["aria-hidden","true",1,"tool-icon"],["role","dialog",1,"popover"],["type","button","title","Vent (W)",1,"tool-btn",3,"click"],["type","button","title","Nuages (N)",1,"tool-btn",3,"click"],["type","button","title","Son (V)",1,"tool-btn",3,"click"],[3,"weatherSelected","fireflyColorChange","leafModeChange","weather","night","fireflyColor","leafMode"],["alt","",3,"error","src"],["aria-label","Heure",1,"setting","time"],[1,"wind-header"],[1,"section-title"],[1,"wind-value"],["type","range","min","0","max","23.75","step","0.25","aria-label","Heure de la journ\xE9e",1,"wind-gauge",3,"input","change","value"],["aria-hidden","true",1,"time-marks"],["type","button","role","switch",1,"gusts",3,"click"],[1,"gusts-label"],["aria-hidden","true",1,"gusts-switch"],[1,"popover-hint"],["aria-label","Vent",1,"setting"],["type","range","min","0","max","100","step","1","aria-label","Force du vent",1,"wind-gauge",3,"input","change","value"],["role","radiogroup","aria-label","Sens du vent",1,"wind-directions"],["type","button","role","radio",3,"active"],["type","button","role","radio",3,"click"],["aria-label","Nuages",1,"setting","clouds"],["type","range","min","0","max","100","step","1","aria-label","Densit\xE9 des nuages",1,"wind-gauge",3,"input","change","value"],["aria-label","Son",1,"setting","sound"],["type","button",1,"mute",3,"click"],["type","range","min","0","max","100","step","1","aria-label","Volume",1,"wind-gauge",3,"input","change","value"]],template:function(t,n){t&1&&(ye(0,"div",1)(1,"div",2)(2,"button",3),zt("click",function(r){return n.openCatalog(r)}),ye(3,"span",4),He(4,C3,1,1,"img",5)(5,R3,2,1,"span",6),be(),ye(6,"span",7),V(7),be(),ye(8,"kbd"),V(9,"M"),be()()(),ye(10,"div",2)(11,"button",8),zt("click",function(r){return n.toggle("hour",r)}),ye(12,"span",9),V(13),be(),ye(14,"span",7),V(15),be(),ye(16,"kbd"),V(17,"H"),be()(),He(18,A3,25,8,"div",10),be(),ye(19,"div",2)(20,"button",11),zt("click",function(r){return n.toggle("wind",r)}),ye(21,"span",9),V(22,"\u{1F4A8}"),be(),ye(23,"span",7),V(24),be(),ye(25,"kbd"),V(26,"W"),be()(),He(27,I3,17,8,"div",10),be(),ye(28,"div",2)(29,"button",12),zt("click",function(r){return n.toggle("clouds",r)}),ye(30,"span",9),V(31,"\u2601\uFE0F"),be(),ye(32,"span",7),V(33),be(),ye(34,"kbd"),V(35,"N"),be()(),He(36,L3,10,5,"div",10),be(),ye(37,"div",2)(38,"button",13),zt("click",function(r){return n.toggle("sound",r)}),ye(39,"span",9),V(40),be(),ye(41,"span",7),V(42),be(),ye(43,"kbd"),V(44,"V"),be()(),He(45,D3,10,6,"div",10),be()(),ye(46,"game-weather-catalog",14,0),zt("weatherSelected",function(r){return n.weatherSelected.emit(r)})("fireflyColorChange",function(r){return n.fireflyColorChange.emit(r)})("leafModeChange",function(r){return n.leafModeChange.emit(r)}),be()),t&2&&(H(4),Ue(n.thumbMissing()?5:4),H(3),yt(n.current().label),H(4),ut("active",n.panel()==="hour"),dt("aria-expanded",n.panel()==="hour"),H(2),yt(n.timeOfDay().icon),H(2),yt(n.hourLabel()),H(3),Ue(n.panel()==="hour"?18:-1),H(2),ut("active",n.panel()==="wind"),dt("aria-expanded",n.panel()==="wind"),H(4),Ct("",n.windPercent(),"%"),H(3),Ue(n.panel()==="wind"?27:-1),H(2),ut("active",n.panel()==="clouds"),dt("aria-expanded",n.panel()==="clouds"),H(4),Ct("",n.cloudPercent(),"%"),H(3),Ue(n.panel()==="clouds"?36:-1),H(2),ut("active",n.panel()==="sound"),dt("aria-expanded",n.panel()==="sound"),H(2),yt(n.soundMuted()||!n.soundPercent()?"\u{1F507}":"\u{1F50A}"),H(2),yt(n.soundMuted()?"Muet":n.soundPercent()+"%"),H(3),Ue(n.panel()==="sound"?45:-1),H(),ai("weather",n.weather())("night",n.night())("fireflyColor",n.fireflyColor())("leafMode",n.leafMode()))},dependencies:[th],styles:['[_nghost-%COMP%]{--%NS%panel-bg: rgba(34, 35, 42, .9);position:absolute;inset:0;z-index:800;pointer-events:none;color:#fff}button[_ngcontent-%COMP%]{font:inherit;color:inherit;border:none;cursor:pointer}.toolbar[_ngcontent-%COMP%]{pointer-events:auto;position:absolute;top:calc(10px + var(--%NS%safe-top));right:calc(58px + var(--%NS%safe-right));max-width:calc(100% - 258px);display:flex;justify-content:flex-end;gap:6px}.tool[_ngcontent-%COMP%]{position:relative;flex:none}.tool[_ngcontent-%COMP%]:first-child{flex:0 1 auto;min-width:0}.tool-btn[_ngcontent-%COMP%]{height:40px;display:flex;align-items:center;gap:6px;padding:0 10px;border-radius:8px;background:var(--%NS%panel-bg);box-shadow:0 1px 4px #0000004d;font-size:13px;font-variant-numeric:tabular-nums;transition:background .15s ease-in-out,box-shadow .15s ease-in-out}.tool-btn[_ngcontent-%COMP%]   .tool-icon[_ngcontent-%COMP%]{font-size:17px;line-height:1}.tool-btn[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{padding:0 4px;border-radius:3px;background:#ffffff24;font:inherit;font-size:10px;opacity:.7}.tool-btn[_ngcontent-%COMP%]:hover{background:#40424ef2}.tool-btn.active[_ngcontent-%COMP%]{box-shadow:0 0 0 2px #5aa8ff,0 1px 4px #0000004d}.tool-btn.weather[_ngcontent-%COMP%]{max-width:100%;min-width:0;padding-left:4px;font-weight:600}.tool-btn.weather[_ngcontent-%COMP%]   .tool-value[_ngcontent-%COMP%]{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tool-btn.weather[_ngcontent-%COMP%]   .weather-thumb[_ngcontent-%COMP%]{flex:none;width:50px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:5px;overflow:hidden;background:#ffffff14;font-size:18px}.tool-btn.weather[_ngcontent-%COMP%]   .weather-thumb[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;image-rendering:pixelated}.popover[_ngcontent-%COMP%]{position:absolute;top:calc(100% + 8px);right:0;width:250px;padding:6px;border-radius:10px;background:var(--%NS%panel-bg);box-shadow:0 6px 20px #0006;animation:_ngcontent-%COMP%_popover-in .15s ease-out}.popover[_ngcontent-%COMP%]   .popover-hint[_ngcontent-%COMP%]{margin:6px 4px 2px;font-size:10px;opacity:.55;text-align:center}@keyframes _ngcontent-%COMP%_popover-in{0%{opacity:0;transform:translateY(-4px)}}@media(prefers-reduced-motion:reduce){.popover[_ngcontent-%COMP%]{animation:none}}@media(max-width:640px){.toolbar[_ngcontent-%COMP%]{max-width:calc(100% - 142px)}.tool-btn[_ngcontent-%COMP%]:not(.weather)   .tool-value[_ngcontent-%COMP%], .tool-btn[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%]{display:none}}.setting[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;padding:10px;border-radius:8px;background:#00000040}.wind-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:baseline}.wind-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]{font-size:13px;font-weight:600}.wind-header[_ngcontent-%COMP%]   .wind-value[_ngcontent-%COMP%]{font-size:12px;opacity:.8;font-variant-numeric:tabular-nums}.wind-gauge[_ngcontent-%COMP%]{--%NS%fill: 0%;width:100%;height:8px;margin:4px 0;border-radius:4px;appearance:none;-webkit-appearance:none;cursor:pointer;background:linear-gradient(to right,#7cc4ff 0%,#2f6fd6 var(--%NS%fill),rgba(255,255,255,.15) var(--%NS%fill))}.wind-gauge[_ngcontent-%COMP%]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#fafafa;box-shadow:0 1px 3px #0006}.wind-gauge[_ngcontent-%COMP%]::-moz-range-thumb{width:18px;height:18px;border:none;border-radius:50%;background:#fafafa;box-shadow:0 1px 3px #0006}.wind-directions[_ngcontent-%COMP%]{display:flex;gap:4px}.wind-directions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1;padding:6px 0;border-radius:6px;background:#ffffff14;font-size:12px;transition:all .2s ease-in-out}.wind-directions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(.active){background:#ffffff29}.wind-directions[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{background:#fafafa;color:#222;font-weight:600}.sound[_ngcontent-%COMP%]   .wind-gauge[_ngcontent-%COMP%]{background:linear-gradient(to right,#8fe3a8 0%,#2fae5c var(--%NS%fill),rgba(255,255,255,.15) var(--%NS%fill))}.sound[_ngcontent-%COMP%]   .mute[_ngcontent-%COMP%]{padding:2px 8px;border-radius:6px;background:#ffffff1a;font-size:11px}.sound[_ngcontent-%COMP%]   .mute[_ngcontent-%COMP%]:hover{background:#fff3}.sound[_ngcontent-%COMP%]   .mute[aria-pressed=true][_ngcontent-%COMP%]{background:#fafafa;color:#222}.time[_ngcontent-%COMP%]   .wind-gauge[_ngcontent-%COMP%]{background:linear-gradient(to right,#1d2350 0% 25%,#e8909a 29.2%,#8ec8ff 33.3% 75%,#f08848 79.2%,#1d2350 83.3% 100%)}.time[_ngcontent-%COMP%]   .time-marks[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:10px;opacity:.6}.clouds[_ngcontent-%COMP%]   .wind-gauge[_ngcontent-%COMP%]{background:linear-gradient(to right,#e8edf3 0%,#8f9aa8 var(--%NS%fill),rgba(255,255,255,.15) var(--%NS%fill))}.gusts[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:2px 2px 0;background:transparent;font-size:12px}.gusts[_ngcontent-%COMP%]   .gusts-switch[_ngcontent-%COMP%]{position:relative;width:32px;height:18px;border-radius:9px;background:#fff3;transition:background .2s ease-in-out}.gusts[_ngcontent-%COMP%]   .gusts-switch[_ngcontent-%COMP%]:after{content:"";position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fafafa;transition:transform .2s ease-in-out}.gusts.active[_ngcontent-%COMP%]   .gusts-switch[_ngcontent-%COMP%]{background:#2f6fd6}.gusts.active[_ngcontent-%COMP%]   .gusts-switch[_ngcontent-%COMP%]:after{transform:translate(14px)}']})};var F3=["canvas"],H3=(s,e)=>e.mode,U3=(s,e)=>e.label;function k3(s,e){if(s&1){let t=ft();ye(0,"button",18),zt("click",function(){let i=Le(t).$implicit,r=K(4);return De(r.setQuality(i.mode))}),ye(1,"span",19),V(2),be(),ye(3,"span",20),V(4),be()()}if(s&2){let t=e.$implicit,n=K(4);dt("aria-checked",n.quality()===t.mode),H(2),yt(t.label),H(2),yt(t.hint)}}function B3(s,e){if(s&1){let t=ft();ye(0,"div",10),zt("click",function(){Le(t);let i=K(3);return De(i.qualityMenu.set(!1))}),be(),ye(1,"section",11),rn("anim-fade-out"),sn("anim-fade-in"),ye(2,"h2"),V(3,"Qualit\xE9 graphique "),ye(4,"span",12),V(5),be()(),ye(6,"div",13),Jt(7,k3,5,3,"button",14,H3),be(),ye(9,"p",15),V(10),be(),ye(11,"label",16)(12,"input",17),zt("change",function(i){Le(t);let r=K(3);return De(r.setDiagnostics(i))}),be(),V(13," Console de diagnostic "),be()()}if(s&2){let t=K(2),n=K();H(5),Ct("v",n.appVersion),H(2),jt(n.qualityChoices),H(3),Di("R\xE9solution \xD7",t.pixelRatio," \xB7 Ombres ",t.shadowMapSize||"aucune"),H(2),ai("checked",t.diagnosticsOpen)}}function z3(s,e){if(s&1&&V(0),s&2){let t=K().$implicit;Ct(" (",t.copies,"\xD7) ")}}function G3(s,e){if(s&1&&(ye(0,"span",22),V(1),ye(2,"b"),V(3),be(),He(4,z3,1,1),be()),s&2){let t=e.$implicit;H(),Ct("",t.label," "),H(2),yt(t.calls),H(),Ue(t.copies>1?4:-1)}}function V3(s,e){if(s&1&&(ye(0,"div")(1,"span",21),V(2,"Images"),be(),ye(3,"b"),V(4),be(),V(5),Ni(6,"number"),ye(7,"b"),V(8),Ni(9,"number"),be()(),ye(10,"div")(11,"span",21),V(12,"Calcul"),be(),V(13),Ni(14,"number"),Ni(15,"number"),Ni(16,"number"),Ni(17,"number"),Ni(18,"number"),be(),ye(19,"div")(20,"span",21),V(21,"Rendu"),be(),V(22),Ni(23,"number"),be(),ye(24,"div")(25,"span",21),V(26,"R\xE9glages"),be(),V(27),Ni(28,"number"),be(),ye(29,"div")(30,"span",21),V(31,"R\xE9partition"),be(),Jt(32,G3,5,3,"span",22,U3),be(),ye(34,"div",23),V(35,"\xAB Envoi du rendu \xBB \xE9lev\xE9 : la carte graphique ou son pilote limite (trop d'appels de dessin, de pixels, d'ombres ou de transparences). D\xE9placements / m\xE9t\xE9o \xE9lev\xE9s : c'est le calcul du jeu."),be()),s&2){let t=e;H(4),Ct("",t.fps," fps"),H(),Ct(" \xB7 moy. ",es(6,19,t.frameAvg,"1.0-1")," ms \xB7 pire "),H(2),ut("bad",t.frameMax>50),H(),Ct("",es(9,22,t.frameMax,"1.0-0")," ms"),H(5),oh(" ",es(14,25,t.input+t.weather+t.render,"1.0-0")," ms/s (",es(15,28,(t.input+t.weather+t.render)/10,"1.0-0")," %) : d\xE9placements ",es(16,31,t.input,"1.0-0")," \xB7 m\xE9t\xE9o ",es(17,34,t.weather,"1.0-0")," \xB7 envoi du rendu ",es(18,37,t.render,"1.0-0")),H(9),oh(" ",t.calls," appels \xB7 ",kp(23,40,t.triangles)," triangles \xB7 ",t.width,"\xD7",t.height," (\xD7",t.pixelRatio,")"),H(5),Up(" ombres ",t.shadowMapSize||"aucune"," \xB7 particules ",es(28,42,t.detail*100,"1.0-0")," % \xB7 ",t.geometries," g\xE9om\xE9tries \xB7 ",t.textures," textures"),H(5),jt(t.breakdown)}}function W3(s,e){s&1&&(ye(0,"div"),V(1,"Mesure en cours\u2026"),be())}function q3(s,e){if(s&1&&(ye(0,"aside",9),He(1,V3,36,45)(2,W3,2,0,"div"),be()),s&2){let t,n=K(2);H(),Ue((t=n.diagnostics)?1:2,t)}}function X3(s,e){if(s&1){let t=ft();ye(0,"button",6),zt("click",function(i){Le(t);let r=K(2);return De(r.toggleQualityMenu(i))}),ye(1,"span",7),V(2),be(),ye(3,"span",8),V(4),ye(5,"small"),V(6,"fps"),be()()(),He(7,B3,14,4),He(8,q3,3,1,"aside",9)}if(s&2){let t=K(),n=K();ut("open",n.qualityMenu()),dt("aria-expanded",n.qualityMenu()),H(),li("color",n.temperatureColor()),H(),Ct("",n.temperatureLabel()," \xB0C"),H(),ut("ok",t.framePerSec>=50)("slow",t.framePerSec<30),H(),Ct("",t.framePerSec," "),H(3),Ue(n.qualityMenu()?7:-1),H(),Ue(t.diagnosticsOpen&&!n.qualityMenu()?8:-1)}}function Y3(s,e){s&1&&He(0,X3,9,13),s&2&&Ue(e.framePerSec?0:-1)}function K3(s,e){if(s&1){let t=ft();ye(0,"game-editor-bar",25),zt("toggled",function(){Le(t);let i=K(2);return De(i.toggleEditMode())})("modelSelected",function(i){Le(t);let r=K(2);return De(r.selectEditModel(i))})("tileSelected",function(i){Le(t);let r=K(2);return De(r.selectEditTile(i))})("brushChange",function(i){Le(t);let r=K(2);return De(r.setEditBrush(i))})("command",function(i){Le(t);let r=K(2);return De(r.editCommand(i))}),be()}if(s&2){let t=K();ai("editMode",t.editMode)("modelId",t.editModelId)("tileId",t.editTileId)("brush",t.editBrush)("selection",t.editSelection)("canUndo",t.editCanUndo)("canRedo",t.editCanRedo)}}function Z3(s,e){if(s&1&&He(0,K3,1,7,"game-editor-bar",24),s&2){let t=K();Ue(e.mode===t.GameMode.MAP?0:-1)}}function $3(s,e){s&1&&(ye(0,"div",3),rn("anim-loading-out"),sn("anim-fade-in"),V(1," Chargement ... "),be())}function J3(s,e){if(s&1){let t=ft();ye(0,"div",26),rn("anim-fade-out"),sn("anim-fade-in"),zt("touchend",function(){Le(t);let i=K();return De(i.togglePaused())}),V(1," Pause "),be()}}function j3(s,e){s&1&&ji(0,"core-teleport",5),s&2&&ai("mapHelper",e)}function Q3(s,e){s&1&&ji(0,"fight-ui")}var t_=class s{gameService=je(Yu);canvasRef=qs.required("canvas");hud=this.gameService.hud;weather=this.gameService.weather;night=this.gameService.night;hour=this.gameService.hour;timeFlow=this.gameService.timeFlow;windStrength=this.gameService.windStrength;windDirection=this.gameService.windDirection;fireflyColor=this.gameService.fireflyColor;leafMode=this.gameService.leafMode;gusts=this.gameService.gusts;cloudDensity=this.gameService.cloudDensity;soundVolume=this.gameService.soundVolume;soundMuted=this.gameService.soundMuted;GameMode=Mu;qualityMenu=rt(!1);qualityChoices=Cc;appVersion=zp;quality=this.gameService.quality;temperatureLabel=Tt(()=>Math.round(this.hud()?.temperature??20));temperatureColor=Tt(()=>Jy(this.hud()?.temperature??20));constructor(){Fp(()=>this.gameService.init(this.canvasRef().nativeElement))}togglePaused(){this.gameService.togglePaused()}editCommand(e){this.gameService.editCommand(e)}setEditBrush(e){this.gameService.setEditBrush(e)}selectEditTile(e){this.gameService.selectEditTile(e)}selectEditModel(e){this.gameService.selectEditModel(e)}setWeather(e){this.gameService.setWeather(e)}setWind(e){this.gameService.setWind(e.strength,e.direction)}setFireflyColor(e){this.gameService.setFireflyColor(e)}setSound(e){this.gameService.setSound(e.volume,e.muted)}setCloudDensity(e){this.gameService.setCloudDensity(e)}setGusts(e){this.gameService.setGusts(e)}setLeafMode(e){this.gameService.setLeafMode(e)}setHour(e){this.gameService.setHour(e)}setTimeFlow(e){this.gameService.setTimeFlow(e)}toggleQualityMenu(e){e.currentTarget.blur(),this.qualityMenu.update(t=>!t)}setDiagnostics(e){this.gameService.setDiagnostics(e.target.checked)}setQuality(e){this.gameService.setQuality(e)}toggleEditMode(){this.gameService.toggleEditMode()}static \u0275fac=function(t){return new(t||s)};static \u0275cmp=Tn({type:s,selectors:[["game-main"]],viewQuery:function(t,n){t&1&&mr(n.canvasRef,F3,5),t&2&&gr()},decls:12,vars:18,consts:[["canvas",""],[1,"canvas-container"],[3,"weatherSelected","hourChange","timeFlowChange","windChange","fireflyColorChange","leafModeChange","gustsChange","cloudDensityChange","soundChange","weather","night","hour","timeFlow","windStrength","windDirection","fireflyColor","leafMode","gusts","cloudDensity","soundVolume","soundMuted"],[1,"loading-screen"],[1,"pause-screen"],[3,"mapHelper"],["type","button","title","Temp\xE9rature et images par seconde",1,"status-tile",3,"click"],[1,"temperature"],[1,"fps"],["aria-label","Diagnostic",1,"diagnostics"],[1,"quality-backdrop",3,"click"],["role","dialog","aria-label","Qualit\xE9 graphique",1,"quality-menu"],["title","Version du jeu",1,"version"],["role","radiogroup","aria-label","Qualit\xE9"],["type","button","role","radio"],[1,"q-current"],[1,"q-diag"],["type","checkbox",3,"change","checked"],["type","button","role","radio",3,"click"],[1,"q-label"],[1,"q-hint"],[1,"k"],[1,"part"],[1,"hint"],[3,"editMode","modelId","tileId","brush","selection","canUndo","canRedo"],[3,"toggled","modelSelected","tileSelected","brushChange","command","editMode","modelId","tileId","brush","selection","canUndo","canRedo"],[1,"pause-screen",3,"touchend"]],template:function(t,n){if(t&1&&(ji(0,"div",1,0),He(2,Y3,1,1),He(3,Z3,1,1),ye(4,"game-weather-panel",2),zt("weatherSelected",function(r){return n.setWeather(r)})("hourChange",function(r){return n.setHour(r)})("timeFlowChange",function(r){return n.setTimeFlow(r)})("windChange",function(r){return n.setWind(r)})("fireflyColorChange",function(r){return n.setFireflyColor(r)})("leafModeChange",function(r){return n.setLeafMode(r)})("gustsChange",function(r){return n.setGusts(r)})("cloudDensityChange",function(r){return n.setCloudDensity(r)})("soundChange",function(r){return n.setSound(r)}),be(),ji(5,"core-stick")(6,"core-touch-pad"),He(7,$3,2,0,"div",3),He(8,J3,2,0,"div",4),ji(9,"core-message"),He(10,j3,1,1,"core-teleport",5),He(11,Q3,1,0,"fight-ui")),t&2){let i,r,o;H(2),Ue((i=n.hud())?2:-1,i),H(),Ue((r=n.hud())?3:-1,r),H(),ai("weather",n.weather())("night",n.night())("hour",n.hour())("timeFlow",n.timeFlow())("windStrength",n.windStrength())("windDirection",n.windDirection())("fireflyColor",n.fireflyColor())("leafMode",n.leafMode())("gusts",n.gusts())("cloudDensity",n.cloudDensity())("soundVolume",n.soundVolume())("soundMuted",n.soundMuted()),H(3),Ue(n.hud()?.loading?7:-1),H(),Ue(n.hud()?.paused?8:-1),H(2),Ue((o=n.hud()?.mapHelper)?10:-1,o),H(),Ue(n.hud()?.mode===n.GameMode.FIGHT?11:-1)}},dependencies:[Ku,Zu,$u,Ju,ju,nh,Qu,Bp],styles:["[_nghost-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#222}.canvas-container[_ngcontent-%COMP%]{width:100%;height:100%;box-shadow:0 4px 8px #00000080}.status-tile[_ngcontent-%COMP%]{position:absolute;left:calc(10px + var(--%NS%safe-left));top:calc(10px + var(--%NS%safe-top));z-index:800;width:64px;height:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;border-radius:8px;background:#22232ae6;box-shadow:0 1px 4px #0000004d;color:#fff;font-size:12px;font-weight:600;line-height:1.2;font-variant-numeric:tabular-nums;white-space:nowrap;border:none;padding:0;font-family:inherit;cursor:pointer}.status-tile[_ngcontent-%COMP%]:hover, .status-tile.open[_ngcontent-%COMP%]{background:#40424ef2}.status-tile[_ngcontent-%COMP%]   .temperature[_ngcontent-%COMP%]{transition:color .6s ease-in-out}.status-tile[_ngcontent-%COMP%]   .fps[_ngcontent-%COMP%]{color:#ff8a70}.status-tile[_ngcontent-%COMP%]   .fps[_ngcontent-%COMP%]:not(.slow){color:#ffc864}.status-tile[_ngcontent-%COMP%]   .fps.ok[_ngcontent-%COMP%]{color:#8fe08a}.status-tile[_ngcontent-%COMP%]   .fps[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:9px;font-weight:400;color:#fff9}.quality-backdrop[_ngcontent-%COMP%]{position:absolute;inset:0;z-index:850}.quality-menu[_ngcontent-%COMP%]{position:absolute;left:calc(10px + var(--%NS%safe-left));top:calc(56px + var(--%NS%safe-top));z-index:860;width:230px;padding:10px;border-radius:10px;background:#22232af2;box-shadow:0 4px 16px #00000073;color:#fff;font-size:13px}.quality-menu[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 8px;display:flex;justify-content:space-between;align-items:baseline;font-size:13px;font-weight:700}.quality-menu[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   .version[_ngcontent-%COMP%]{font-size:10px;font-weight:400;opacity:.5;font-variant-numeric:tabular-nums}.quality-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;gap:1px;padding:6px 8px;border:none;border-radius:6px;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer}.quality-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#ffffff14}.quality-menu[_ngcontent-%COMP%]   button[aria-checked=true][_ngcontent-%COMP%]{background:#5aa8ff33;box-shadow:inset 0 0 0 1px #5aa8ff}.quality-menu[_ngcontent-%COMP%]   .q-label[_ngcontent-%COMP%]{font-weight:600}.quality-menu[_ngcontent-%COMP%]   .q-hint[_ngcontent-%COMP%]{font-size:11px;opacity:.7}.quality-menu[_ngcontent-%COMP%]   .q-current[_ngcontent-%COMP%]{margin:8px 0 0;font-size:11px;opacity:.7}.quality-menu[_ngcontent-%COMP%]   .q-diag[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.1);cursor:pointer}.quality-menu[_ngcontent-%COMP%]   .q-diag[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{accent-color:#5aa8ff}.diagnostics[_ngcontent-%COMP%]{position:absolute;left:calc(10px + var(--%NS%safe-left));top:calc(56px + var(--%NS%safe-top));z-index:790;max-width:min(420px,100vw - 20px);padding:8px 10px;border-radius:8px;background:#000000b8;color:#e8e8e8;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;line-height:1.45;pointer-events:none}.diagnostics[_ngcontent-%COMP%]   .k[_ngcontent-%COMP%]{color:#8ab4ff}.diagnostics[_ngcontent-%COMP%]   .bad[_ngcontent-%COMP%]{color:#ff8a70}.diagnostics[_ngcontent-%COMP%]   .part[_ngcontent-%COMP%]{margin-right:8px;white-space:nowrap}.diagnostics[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%]{margin-top:4px;opacity:.6;font-family:inherit}.axes-count[_ngcontent-%COMP%]{position:absolute;right:0;top:0;font-size:10px;line-height:12px;width:80px;height:80px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;text-align:center;color:#fff}.where-is-brian[_ngcontent-%COMP%]{position:absolute;z-index:2;width:60px;height:60px;border:3px solid deeppink;border-radius:50%}.loading-screen[_ngcontent-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;z-index:1001;background:#000;color:#fff;display:flex;justify-content:center;align-items:center;padding:20px;font-size:24px}.pause-screen[_ngcontent-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;z-index:1000;background:#000000b3;color:#fff;display:flex;justify-content:center;align-items:center;padding:20px;font-size:24px}"]})};export{t_ as GameComponent};
