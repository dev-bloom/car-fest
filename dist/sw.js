if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-15aa4474"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/focus-visible-9c13edeb.js",revision:null},{url:"assets/focus-visible-legacy-b3e947fe.js",revision:null},{url:"assets/hardware-back-button-77fd2980.js",revision:null},{url:"assets/hardware-back-button-legacy-7391e573.js",revision:null},{url:"assets/index-314c1970.js",revision:null},{url:"assets/index-6960c975.css",revision:null},{url:"assets/index-legacy-b5770c33.js",revision:null},{url:"assets/index2-aa4949dd.js",revision:null},{url:"assets/index2-legacy-3b1f112b.js",revision:null},{url:"assets/index9-968e6fa8.js",revision:null},{url:"assets/index9-legacy-eab83438.js",revision:null},{url:"assets/input-shims-68710c41.js",revision:null},{url:"assets/input-shims-legacy-895b0900.js",revision:null},{url:"assets/ios.transition-fc006f21.js",revision:null},{url:"assets/ios.transition-legacy-739aa84c.js",revision:null},{url:"assets/keyboard2-09e85666.js",revision:null},{url:"assets/keyboard2-legacy-4c156420.js",revision:null},{url:"assets/md.transition-b3ddf21c.js",revision:null},{url:"assets/md.transition-legacy-0009391a.js",revision:null},{url:"assets/polyfills-legacy-c987ef99.js",revision:null},{url:"assets/status-tap-9c38af2e.js",revision:null},{url:"assets/status-tap-legacy-b1972e81.js",revision:null},{url:"assets/swipe-back-630b77c7.js",revision:null},{url:"assets/swipe-back-legacy-21ebdf18.js",revision:null},{url:"index.html",revision:"935b2908db6b208bd60a24650f6c48d4"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"bd5f88c3569c2fe48657f87046d6573c"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));