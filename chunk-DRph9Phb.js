import{ur as l}from"./chunk-DjUiFbcE.js";function u(n,s,c,e={}){let t=s+`  `,m=e.enums??{};if(c&&c in m&&(typeof n==`number`||Array.isArray(n))){let[i,f]=m[c],r=o=>typeof o==`number`&&f[o]?`${i}.${f[o]}`:JSON.stringify(o);return Array.isArray(n)?`[${n.map(r).join(`, `)}]`:r(n)}if(Array.isArray(n))return n.length===0?`[]`:`[
${n.map(i=>t+u(i,t,void 0,e)).join(`,
`)}
${s}]`;if(n&&typeof n==`object`){let i=Object.entries(n).filter(([,r])=>r!==void 0),f=()=>`{ ${i.map(([r,o])=>`${g(r)}: ${u(o,t,r,e)}`).join(`, `)} }`;if(i.every(([,r])=>typeof r!=`object`||r===null)&&i.length<=4)return f();if(e.inlineMax){let r=f();if(!r.includes(`
`)&&r.length<=e.inlineMax)return r}return`{
${i.map(([r,o])=>`${t}${g(r)}: ${u(o,t,r,e)}`).join(`,
`)}
${s}}`}return typeof n==`string`?`'${n.replace(/\\/g,`\\\\`).replace(/'/g,`\\'`)}'`:JSON.stringify(n)}function g(n){return/^[$A-Z_a-z][\w$]*$/.test(n)?n:`'${n}'`}function p(n,s){let c=typeof s==`string`?new Blob([s],{type:`text/plain`}):s,e=URL.createObjectURL(c),t=document.createElement(`a`);t.href=e,t.download=n,t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}function c(r,...o){let n=l({},r);for(let t of o)delete n[t];return n}var m=(e=>(e[e.UP=0]=`UP`,e[e.RIGHT=1]=`RIGHT`,e[e.DOWN=2]=`DOWN`,e[e.LEFT=3]=`LEFT`,e))(m||{});function s(r){return[2,1].includes(r.status)}export{u as a,p as i,m as n,s as r,c as t};