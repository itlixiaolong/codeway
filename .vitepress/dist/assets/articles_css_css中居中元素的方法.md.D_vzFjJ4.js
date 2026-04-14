import{_ as n,o as a,c as p,ae as l}from"./chunks/framework.DhtYoOpx.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/css/css中居中元素的方法.md","filePath":"articles/css/css中居中元素的方法.md","lastUpdated":1776146674000}'),e={name:"articles/css/css中居中元素的方法.md"};function i(t,s,c,r,b,d){return a(),p("div",null,[...s[0]||(s[0]=[l(`<h3 id="一-左右居中" tabindex="-1">一：左右居中 <a class="header-anchor" href="#一-左右居中" aria-label="Permalink to &quot;一：左右居中&quot;">​</a></h3><ul><li>当元素本身的 <code>display：block</code>时，设置自身的margin-left和margin-right为auto即可</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	&lt;div class=&quot;parent&quot;&gt;</span></span>
<span class="line"><span>		&lt;div class=&quot;child&quot;&gt;这是子元素&lt;/div&gt;</span></span>
<span class="line"><span>	&lt;/div&gt;</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	&lt;style&gt;</span></span>
<span class="line"><span>	.parent {</span></span>
<span class="line"><span>		width: 400px;</span></span>
<span class="line"><span>		height: 400px;</span></span>
<span class="line"><span>		border: 1px solid red;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	.child {</span></span>
<span class="line"><span>	    width：200px;</span></span>
<span class="line"><span>		display:block;</span></span>
<span class="line"><span>		margin：0 auto；</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><ul><li>当元素本身的 <code>display：inline-block</code>或者<code>display:inline</code>时，设置父元素为<code>text-align：center</code>即可</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	&lt;div class=&quot;parent&quot;&gt;</span></span>
<span class="line"><span>		&lt;div class=&quot;child&quot;&gt;这是子元素&lt;/div&gt;</span></span>
<span class="line"><span>	&lt;/div&gt;</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	&lt;style&gt;</span></span>
<span class="line"><span>	.parent {</span></span>
<span class="line"><span>		width: 400px;</span></span>
<span class="line"><span>		height: 400px;</span></span>
<span class="line"><span>		border: 1px solid red;</span></span>
<span class="line"><span>		text-align: center;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	.child {</span></span>
<span class="line"><span>		width: 200px;</span></span>
<span class="line"><span>		display: inline-block;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="二-垂直水平居中" tabindex="-1">二：垂直水平居中 <a class="header-anchor" href="#二-垂直水平居中" aria-label="Permalink to &quot;二：垂直水平居中&quot;">​</a></h3><ul><li>postion--&gt;将父元素设置为<code>position：relative;</code>,将要居中的元素设置为<code> position: absolute;left: 50%;top: 50%;transform: translate3d(-50%, -50%, 0);</code>即可</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	&lt;div class=&quot;parent&quot;&gt;</span></span>
<span class="line"><span>		&lt;div class=&quot;child&quot;&gt;这是子元素&lt;/div&gt;</span></span>
<span class="line"><span>	&lt;/div&gt;</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	&lt;style&gt;</span></span>
<span class="line"><span>    .parent {</span></span>
<span class="line"><span>		width: 400px;</span></span>
<span class="line"><span>		height: 400px;</span></span>
<span class="line"><span>		border: 1px solid red;</span></span>
<span class="line"><span>		position: relative;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	.child {</span></span>
<span class="line"><span>		width: 200px;</span></span>
<span class="line"><span>		position: absolute;</span></span>
<span class="line"><span>		left: 50%;</span></span>
<span class="line"><span>		top: 50%;</span></span>
<span class="line"><span>		transform: translate3d(-50%, -50%, 0);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><ul><li>flex--&gt;将父元素设置为<code>display：flex;justify-content: center;align-items: center;</code>即可</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	&lt;div class=&quot;parent&quot;&gt;</span></span>
<span class="line"><span>		&lt;div class=&quot;child&quot;&gt;这是子元素&lt;/div&gt;</span></span>
<span class="line"><span>	&lt;/div&gt;</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	&lt;style&gt;</span></span>
<span class="line"><span>    .parent {</span></span>
<span class="line"><span>		width: 400px;</span></span>
<span class="line"><span>		height: 400px;</span></span>
<span class="line"><span>		border: 1px solid red;</span></span>
<span class="line"><span>	    display: flex;</span></span>
<span class="line"><span>    	justify-content: center;</span></span>
<span class="line"><span>		align-items: center;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	.child {</span></span>
<span class="line"><span>		width: 200px;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><ul><li>table--&gt;将父元素设置为<code>display: table;</code>,将要居中的元素设置为<code>display: table-cell;text-align: center;vertical-align: middle;</code>即可</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>	&lt;div class=&quot;parent&quot;&gt;</span></span>
<span class="line"><span>		&lt;div class=&quot;child&quot;&gt;这是子元素&lt;/div&gt;</span></span>
<span class="line"><span>	&lt;/div&gt;</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	&lt;style&gt;</span></span>
<span class="line"><span>    .parent {</span></span>
<span class="line"><span>		width: 400px;</span></span>
<span class="line"><span>		height: 400px;</span></span>
<span class="line"><span>		border: 1px solid red;</span></span>
<span class="line"><span>		display: table;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	.child {</span></span>
<span class="line"><span>		width: 200px;</span></span>
<span class="line"><span>    	display: table-cell;</span></span>
<span class="line"><span>    	text-align: center;</span></span>
<span class="line"><span>    	vertical-align: middle;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	&lt;/style&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,12)])])}const m=n(e,[["render",i]]);export{o as __pageData,m as default};
