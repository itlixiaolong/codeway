import{_ as n,o as a,c as e,ae as p}from"./chunks/framework.DhtYoOpx.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/vue/react/redux-combineReducers 的实现.md","filePath":"articles/vue/react/redux-combineReducers 的实现.md","lastUpdated":1776146674000}'),l={name:"articles/vue/react/redux-combineReducers 的实现.md"};function r(c,s,i,t,b,u){return a(),e("div",null,[...s[0]||(s[0]=[p(`<div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const combineReducers = reducers =&gt; {</span></span>
<span class="line"><span>  return (state = {}, action) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //返回一个函数，闭包保存reducers</span></span>
<span class="line"><span>    return Object.keys(reducers).reduce(</span></span>
<span class="line"><span>      (nextState, key) =&gt; {</span></span>
<span class="line"><span>        依次执行每个reducer，获得最终的nextState</span></span>
<span class="line"><span>        nextState[key] = reducers[key] (</span></span>
<span class="line"><span>          state[key],</span></span>
<span class="line"><span>          action</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>        return nextState;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {} //定义初始的state为{}，经过依次循环最终产生最终的state</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//使用</span></span>
<span class="line"><span>const todoApp = combineReducers({</span></span>
<span class="line"><span>  todos,</span></span>
<span class="line"><span>  visibilityFilter</span></span>
<span class="line"><span>});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div>`,1)])])}const o=n(l,[["render",r]]);export{m as __pageData,o as default};
