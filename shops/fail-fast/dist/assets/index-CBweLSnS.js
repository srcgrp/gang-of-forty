(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=function(){return e=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},e.apply(this,arguments)},t=function(){function e(e){this.options=e,this.listeners={}}return e.prototype.on=function(e,t){var n=this.listeners[e]||[];this.listeners[e]=n.concat([t])},e.prototype.triggerEvent=function(e,t){var n=this;(this.listeners[e]||[]).forEach(function(e){return e({target:n,event:t})})},e}(),n;(function(e){e[e.Add=0]=`Add`,e[e.Remove=1]=`Remove`})(n||={});var r=function(){function e(){this.notifications=[]}return e.prototype.push=function(e){this.notifications.push(e),this.updateFn(e,n.Add,this.notifications)},e.prototype.splice=function(e,t){var r=this.notifications.splice(e,t)[0];return this.updateFn(r,n.Remove,this.notifications),r},e.prototype.indexOf=function(e){return this.notifications.indexOf(e)},e.prototype.onUpdate=function(e){this.updateFn=e},e}(),i;(function(e){e.Dismiss=`dismiss`,e.Click=`click`})(i||={});var a={types:[{type:`success`,className:`notyf__toast--success`,backgroundColor:`#3dc763`,icon:{className:`notyf__icon--success`,tagName:`i`}},{type:`error`,className:`notyf__toast--error`,backgroundColor:`#ed3d3d`,icon:{className:`notyf__icon--error`,tagName:`i`}}],duration:2e3,ripple:!0,position:{x:`right`,y:`bottom`},dismissible:!1},o=function(){function t(){this.notifications=[],this.events={},this.X_POSITION_FLEX_MAP={left:`flex-start`,center:`center`,right:`flex-end`},this.Y_POSITION_FLEX_MAP={top:`flex-start`,center:`center`,bottom:`flex-end`};var e=document.createDocumentFragment(),t=this._createHTMLElement({tagName:`div`,className:`notyf`});e.appendChild(t),document.body.appendChild(e),this.container=t,this.animationEndEventName=this._getAnimationEndEventName(),this._createA11yContainer()}return t.prototype.on=function(t,n){var r;this.events=e(e({},this.events),(r={},r[t]=n,r))},t.prototype.update=function(e,t){t===n.Add?this.addNotification(e):t===n.Remove&&this.removeNotification(e)},t.prototype.removeNotification=function(e){var t=this,n=this._popRenderedNotification(e),r;if(n){r=n.node,r.classList.add(`notyf__toast--disappear`);var i;r.addEventListener(this.animationEndEventName,i=function(e){e.target===r&&(r.removeEventListener(t.animationEndEventName,i),t.container.removeChild(r))})}},t.prototype.addNotification=function(e){var t=this._renderNotification(e);this.notifications.push({notification:e,node:t}),this._announce(e.options.message||`Notification`)},t.prototype._renderNotification=function(e){var t,n=this._buildNotificationCard(e),r=e.options.className;return r&&(t=n.classList).add.apply(t,r.split(` `)),this.container.appendChild(n),n},t.prototype._popRenderedNotification=function(e){for(var t=-1,n=0;n<this.notifications.length&&t<0;n++)this.notifications[n].notification===e&&(t=n);if(t!==-1)return this.notifications.splice(t,1)[0]},t.prototype.getXPosition=function(e){return e?.position?.x||`right`},t.prototype.getYPosition=function(e){return e?.position?.y||`bottom`},t.prototype.adjustContainerAlignment=function(e){var t=this.X_POSITION_FLEX_MAP[this.getXPosition(e)],n=this.Y_POSITION_FLEX_MAP[this.getYPosition(e)],r=this.container.style;r.setProperty(`justify-content`,n),r.setProperty(`align-items`,t)},t.prototype._buildNotificationCard=function(e){var t=this,n=e.options,r=n.icon;this.adjustContainerAlignment(n);var a=this._createHTMLElement({tagName:`div`,className:`notyf__toast`}),o=this._createHTMLElement({tagName:`div`,className:`notyf__ripple`}),s=this._createHTMLElement({tagName:`div`,className:`notyf__wrapper`}),c=this._createHTMLElement({tagName:`div`,className:`notyf__message`});c.innerHTML=n.message||``;var l=n.background||n.backgroundColor;if(r){var u=this._createHTMLElement({tagName:`div`,className:`notyf__icon`});if((typeof r==`string`||r instanceof String)&&(u.innerHTML=new String(r).valueOf()),typeof r==`object`){var d=r.tagName,f=d===void 0?`i`:d,p=r.className,m=r.text,h=r.color,g=h===void 0?l:h,_=this._createHTMLElement({tagName:f,className:p,text:m});g&&(_.style.color=g),u.appendChild(_)}s.appendChild(u)}if(s.appendChild(c),a.appendChild(s),l&&(n.ripple?(o.style.background=l,a.appendChild(o)):a.style.background=l),n.dismissible){var v=this._createHTMLElement({tagName:`div`,className:`notyf__dismiss`}),y=this._createHTMLElement({tagName:`button`,className:`notyf__dismiss-btn`});v.appendChild(y),s.appendChild(v),a.classList.add(`notyf__toast--dismissible`),y.addEventListener(`click`,function(n){var r,a;(a=(r=t.events)[i.Dismiss])==null||a.call(r,{target:e,event:n}),n.stopPropagation()})}a.addEventListener(`click`,function(n){var r;return(r=t.events)[i.Click]?.call(r,{target:e,event:n})});var b=this.getYPosition(n)===`top`?`upper`:`lower`;return a.classList.add(`notyf__toast--`+b),a},t.prototype._createHTMLElement=function(e){var t=e.tagName,n=e.className,r=e.text,i=document.createElement(t);return n&&(i.className=n),i.textContent=r||null,i},t.prototype._createA11yContainer=function(){var e=this._createHTMLElement({tagName:`div`,className:`notyf-announcer`});e.setAttribute(`aria-atomic`,`true`),e.setAttribute(`aria-live`,`polite`),e.style.border=`0`,e.style.clip=`rect(0 0 0 0)`,e.style.height=`1px`,e.style.margin=`-1px`,e.style.overflow=`hidden`,e.style.padding=`0`,e.style.position=`absolute`,e.style.width=`1px`,e.style.outline=`0`,document.body.appendChild(e),this.a11yContainer=e},t.prototype._announce=function(e){var t=this;this.a11yContainer.textContent=``,setTimeout(function(){t.a11yContainer.textContent=e},100)},t.prototype._getAnimationEndEventName=function(){var e=document.createElement(`_fake`),t={MozTransition:`animationend`,OTransition:`oAnimationEnd`,WebkitTransition:`webkitAnimationEnd`,transition:`animationend`},n;for(n in t)if(e.style[n]!==void 0)return t[n];return`animationend`},t}(),s=function(){function n(t){var n=this;this.dismiss=this._removeNotification,this.notifications=new r,this.view=new o;var s=this.registerTypes(t);this.options=e(e({},a),t),this.options.types=s,this.notifications.onUpdate(function(e,t){return n.view.update(e,t)}),this.view.on(i.Dismiss,function(e){var t=e.target,r=e.event;n._removeNotification(t),t.triggerEvent(i.Dismiss,r)}),this.view.on(i.Click,function(e){var t=e.target,n=e.event;return t.triggerEvent(i.Click,n)})}return n.prototype.error=function(e){var t=this.normalizeOptions(`error`,e);return this.open(t)},n.prototype.success=function(e){var t=this.normalizeOptions(`success`,e);return this.open(t)},n.prototype.open=function(n){var r=this.options.types.find(function(e){return e.type===n.type})||{},i=e(e({},r),n);this.assignProps([`ripple`,`position`,`dismissible`],i);var a=new t(i);return this._pushNotification(a),a},n.prototype.dismissAll=function(){for(;this.notifications.splice(0,1););},n.prototype.assignProps=function(e,t){var n=this;e.forEach(function(e){t[e]=t[e]==null?n.options[e]:t[e]})},n.prototype._pushNotification=function(e){var t=this;this.notifications.push(e);var n=e.options.duration===void 0?this.options.duration:e.options.duration;n&&setTimeout(function(){return t._removeNotification(e)},n)},n.prototype._removeNotification=function(e){var t=this.notifications.indexOf(e);t!==-1&&this.notifications.splice(t,1)},n.prototype.normalizeOptions=function(t,n){var r={type:t};return typeof n==`string`?r.message=n:typeof n==`object`&&(r=e(e({},r),n)),r},n.prototype.registerTypes=function(t){var n=(t&&t.types||[]).slice();return a.types.map(function(t){var r=-1;n.forEach(function(e,n){e.type===t.type&&(r=n)});var i=r===-1?{}:n.splice(r,1)[0];return e(e({},t),i)}).concat(n)},n}(),c=`
<svg
  class="lucide lucide-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 6 9 17l-5-5" />
</svg>
`,l=`
<svg
  class="lucide lucide-circle-alert"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <line x1="12" x2="12" y1="8" y2="12" />
  <line x1="12" x2="12.01" y1="16" y2="16" />
</svg>
`,u=`
<svg
  class="lucide lucide-search"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
</svg>
`,d=`
<svg
  class="lucide lucide-shopping-cart"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
  <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
  <circle cx="18" cy="20" r="2" />
  <circle cx="8" cy="20" r="2" />
</svg>
`,f=`
<svg
  class="lucide lucide-x"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
`,p=`../../api/products.json`,m=`../../api/offers.json`,h=`../../api/stock.json`,g={search:u,cart:d,check:c,x:f,alertCircle:l},_,v=0;function y(){let e=document.querySelector(`#cart-count`);e?e.textContent=String(v):console.error(`Cart count element was not found.`)}function b(){_=new s({duration:3e3,position:{x:`left`,y:`bottom`},types:[{type:`success`,background:`#4CAF50`,icon:g.check},{type:`error`,background:`#F44336`,icon:g.x},{type:`warning`,background:`#FF9800`,icon:g.alertCircle}]})}function x(){let e=document.querySelector(`#search-icon`),t=document.querySelector(`#cart-icon`);e&&(e.innerHTML=g.search),t&&(t.innerHTML=g.cart)}async function S(){let e=document.querySelector(`#dairy-products`);if(!e){console.error(`Container #dairy-products not found`);return}let t=document.createElement(`p`);t.textContent=`در حال بارگذاری محصولات...`,t.setAttribute(`role`,`status`),e.appendChild(t);try{let n=await fetch(p);if(!n.ok)throw Error(`لطفا چند لحظه منتظر بمانید`);let r=(await n.json()).filter(e=>e.categoryId===2);t.remove();let i=e.querySelector(`#dairy-template`);if(!i){console.error(`Template #dairy-template not found`);return}i.remove(),r.forEach((t,n)=>{let a=i.cloneNode(!0);a.removeAttribute(`id`),n===0&&(a.id=`dairy-first`),n===r.length-1&&(a.id=`dairy-last`);let o=a.querySelector(`.product-emoji`),s=a.querySelector(`h3`),c=a.querySelector(`.product-info p`),l=a.querySelector(`.product-price`),u=a.querySelector(`button`);o&&(o.textContent=t.emoji),s&&(s.textContent=t.name),c&&(c.textContent=t.unit),l&&(l.textContent=`${new Intl.NumberFormat(`fa-IR`).format(t.price)} تومان`),u&&(u.setAttribute(`aria-label`,`افزودن ${t.name} به سبد خرید`),u.addEventListener(`click`,()=>{v+=1,y(),_.success(`${t.name} به سبد خرید اضافه شد`)})),e.appendChild(a)})}catch(t){console.error(`خطا در دریافت محصولات لبنی:`,t);let n=document.createElement(`p`);n.textContent=`دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.`,n.setAttribute(`role`,`alert`),e.replaceChildren(n),_.error(`دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.`)}}async function C(){let e=document.querySelector(`#dailyOffers`);if(!e){console.error(`Container #dailyOffers not found`);return}let t=document.createElement(`p`);t.textContent=`در حال بارگذاری پیشنهادهای روزانه...`,t.setAttribute(`role`,`status`),e.appendChild(t);try{let[n,r,i]=await Promise.all([fetch(p),fetch(m),fetch(h)]);if(!n.ok||!r.ok||!i.ok)throw Error(`دریافت اطلاعات با خطا مواجه شد`);let[a,o,s]=await Promise.all([n.json(),r.json(),i.json()]);t.remove();let c=a.map(e=>{let t=o.find(t=>t.productId===e.id);return t?{...e,percent:t.percent,quantity:s.items[e.id]??0,discountedPrice:Math.round(e.price*(1-t.percent/100))}:null}).filter(e=>e!==null),l=e.querySelector(`#offer-template`);if(!l){console.error(`Template #offer-template not found`);return}if(l.remove(),e.replaceChildren(),c.forEach((t,n)=>{let r=l.cloneNode(!0);r.removeAttribute(`id`),n===0&&(r.id=`offer-first`),n===c.length-1&&(r.id=`offer-last`);let i=r.querySelector(`.product-emoji`),a=r.querySelector(`h3`),o=r.querySelector(`.product-info p`),s=r.querySelector(`.discount-badge`),u=r.querySelector(`.unavailable-badge`),d=r.querySelector(`.old-price`),f=r.querySelector(`.new-price`),p=r.querySelector(`button`);i&&(i.textContent=t.emoji),a&&(a.textContent=t.name),o&&(o.textContent=t.unit),s&&(s.textContent=`${t.percent}٪ تخفیف`,s.hidden=!1),d&&(d.textContent=`${new Intl.NumberFormat(`fa-IR`).format(t.price)} تومان`),f&&(f.textContent=`${new Intl.NumberFormat(`fa-IR`).format(t.discountedPrice)} تومان`),p&&p.setAttribute(`aria-label`,`افزودن ${t.name} به سبد خرید`),t.quantity===0?(r.classList.add(`out-of-stock`),u&&(u.textContent=`ناموجود`,u.hidden=!1),p&&(p.disabled=!0)):(u&&(u.hidden=!0),p&&(p.disabled=!1,p.addEventListener(`click`,()=>{v+=1,y(),_.success(`${t.name} به سبد خرید اضافه شد`)}))),e.appendChild(r)}),c.length===0){let t=document.createElement(`p`);t.textContent=`فعلاً پیشنهادی برای نمایش وجود ندارد.`,e.appendChild(t)}}catch(t){console.error(`خطا در دریافت محصولات پیشنهادی:`,t);let n=document.createElement(`p`);n.textContent=`دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.`,n.setAttribute(`role`,`alert`),e.replaceChildren(n),_.error(`دریافت محصولات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.`)}}document.addEventListener(`DOMContentLoaded`,()=>{b(),x(),S(),C()});