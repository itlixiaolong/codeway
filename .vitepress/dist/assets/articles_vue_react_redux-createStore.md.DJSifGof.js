import{_ as n,o as a,c as e,ae as p}from"./chunks/framework.DhtYoOpx.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/vue/react/redux-createStore.md","filePath":"articles/vue/react/redux-createStore.md","lastUpdated":1776146674000}'),l={name:"articles/vue/react/redux-createStore.md"};function r(t,s,i,c,b,u){return a(),e("div",null,[...s[0]||(s[0]=[p(`<div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const createStore = (reducer) =&gt; {</span></span>
<span class="line"><span>  let state;</span></span>
<span class="line"><span>  let listeners = [];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const getState = () =&gt; state;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const dispatch = (action) =&gt; {</span></span>
<span class="line"><span>    state = reducer(state, action);</span></span>
<span class="line"><span>    listeners.forEach(listener =&gt; listener());</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const subscribe = (listener) =&gt; {</span></span>
<span class="line"><span>    listeners.push(listener);</span></span>
<span class="line"><span>    return () =&gt; {</span></span>
<span class="line"><span>      listeners = listeners.filter(l =&gt; l !== listener);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  dispatch({type：&#39;@@redux/INIT&#39;}); // 先调用一次，派发一下{ type: &#39;@@redux/INIT&#39; } ，获取state</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return { getState, dispatch, subscribe };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div>`,1)])])}const m=n(l,[["render",r]]);export{d as __pageData,m as default};
