(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[776],{1776:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return M}});var o,r,i,c,a,u=t(5007),s=t(5444),l=t(8712);!function(n){n.Call="call",n.Reply="reply",n.Syn="syn",n.SynAck="synAck",n.Ack="ack"}(o||(o={})),function(n){n.Fulfilled="fulfilled",n.Rejected="rejected"}(r||(r={})),function(n){n.ConnectionDestroyed="ConnectionDestroyed",n.ConnectionTimeout="ConnectionTimeout",n.NoIframeSrc="NoIframeSrc"}(i||(i={})),function(n){n.DataCloneError="DataCloneError"}(c||(c={})),function(n){n.Message="message"}(a||(a={}));var d={"http:":"80","https:":"443"},f=/^(https?:)?\/\/([^/:]+)?(:(\d+))?/,g=["file:","data:"],v=function(n){return{name:n.name,message:n.message,stack:n.stack}},m=function(n){var e=new Error;return Object.keys(n).forEach((function(t){return e[t]=n[t]})),e},h=0,p=function(){return++h},y=function(n){return n?n.split("."):[]},w=function(n,e,t){var o=y(e);return o.reduce((function(n,e,r){return void 0===n[e]&&(n[e]={}),r===o.length-1&&(n[e]=t),n[e]}),n),n},E=function n(e,t){var o={};return Object.keys(e).forEach((function(r){var i=e[r],c=function(n,e){var t=y(e||"");return t.push(n),function(n){return n.join(".")}(t)}(r,t);"object"==typeof i&&Object.assign(o,n(i,c)),"function"==typeof i&&(o[c]=i)})),o},S=function(n,e,t,c,u){var s=e.localName,l=e.local,d=e.remote,f=e.originForSending,g=e.originForReceiving,v=!1;u("".concat(s,": Connecting call sender"));var h=t.reduce((function(n,e){var t;return n[e]=(t=e,function(){for(var n=arguments.length,e=new Array(n),h=0;h<n;h++)e[h]=arguments[h];var y;u("".concat(s,": Sending ").concat(t,"() call"));try{d.closed&&(y=!0)}catch(E){y=!0}if(y&&c(),v){var w=new Error("Unable to send ".concat(t,"() call due ")+"to destroyed connection");throw w.code=i.ConnectionDestroyed,w}return new Promise((function(n,i){var c=p();l.addEventListener(a.Message,(function e(f){if(f.source===d&&f.data.penpal===o.Reply&&f.data.id===c)if("*"===g||f.origin===g){var v=f.data;u("".concat(s,": Received ").concat(t,"() reply")),l.removeEventListener(a.Message,e);var h=v.returnValue;v.returnValueIsError&&(h=m(h)),(v.resolution===r.Fulfilled?n:i)(h)}else u("".concat(s," received message from origin ").concat(f.origin," which did not match expected origin ").concat(g))}));var v={penpal:o.Call,id:c,methodName:t,args:e};d.postMessage(v,f)}))}),n}),{});return Object.assign(n,function(n){var e={};for(var t in n)w(e,t,n[t]);return e}(h)),function(){v=!0}},k=function(n,e,t,i,u){var s,l,d=i.destroy,f=i.onDestroy,g={};return function(i){if("*"===e||i.origin===e){u("Parent: Handshake - Received ACK");var m={localName:"Parent",local:window,remote:i.source,originForSending:t,originForReceiving:e};s&&s(),s=function(n,e,t){var i=n.localName,u=n.local,s=n.remote,l=n.originForSending,d=n.originForReceiving,f=!1,g=function(n){if(n.source===s&&n.data.penpal===o.Call)if("*"===d||n.origin===d){var a=n.data,u=a.methodName,g=a.args,m=a.id;t("".concat(i,": Received ").concat(u,"() call"));var h=function(n){return function(e){if(t("".concat(i,": Sending ").concat(u,"() reply")),f)t("".concat(i,": Unable to send ").concat(u,"() reply due to destroyed connection"));else{var a={penpal:o.Reply,id:m,resolution:n,returnValue:e};n===r.Rejected&&e instanceof Error&&(a.returnValue=v(e),a.returnValueIsError=!0);try{s.postMessage(a,l)}catch(g){if(g.name===c.DataCloneError){var d={penpal:o.Reply,id:m,resolution:r.Rejected,returnValue:v(g),returnValueIsError:!0};s.postMessage(d,l)}throw g}}}};new Promise((function(n){return n(e[u].apply(e,g))})).then(h(r.Fulfilled),h(r.Rejected))}else t("".concat(i," received message from origin ").concat(n.origin," which did not match expected origin ").concat(d))};return u.addEventListener(a.Message,g),function(){f=!0,u.removeEventListener(a.Message,g)}}(m,n,u),f(s),l&&l.forEach((function(n){delete g[n]})),l=i.data.methodNames;var h=S(g,m,l,d,u);return f(h),g}u("Parent: Handshake - Received ACK message from origin ".concat(i.origin," which did not match expected origin ").concat(e))}},C=function(n){var e=n.iframe,t=n.methods,r=void 0===t?{}:t,c=n.childOrigin,u=n.timeout,s=n.debug,l=function(n){return function(){if(n){for(var e,t=arguments.length,o=new Array(t),r=0;r<t;r++)o[r]=arguments[r];(e=console).log.apply(e,["[Penpal]"].concat(o))}}}(void 0!==s&&s),v=function(n,e){var t=[],o=!1;return{destroy:function(r){o||(o=!0,e("".concat(n,": Destroying connection")),t.forEach((function(n){n(r)})))},onDestroy:function(n){o?n():t.push(n)}}}("Parent",l),m=v.onDestroy,h=v.destroy;c||(!function(n){if(!n.src&&!n.srcdoc){var e=new Error("Iframe must have src or srcdoc property defined.");throw e.code=i.NoIframeSrc,e}}(e),c=function(n){if(n&&g.find((function(e){return n.startsWith(e)})))return"null";var e,t,o,r=document.location,i=f.exec(n);i?(e=i[1]?i[1]:r.protocol,t=i[2],o=i[4]):(e=r.protocol,t=r.hostname,o=r.port);var c=o&&o!==d[e]?":".concat(o):"";return"".concat(e,"//").concat(t).concat(c)}(e.src));var p="null"===c?"*":c,y=E(r),w=function(n,e,t,r){return function(i){if(i.source)if("*"===t||i.origin===t){n("Parent: Handshake - Received SYN, responding with SYN-ACK");var c={penpal:o.SynAck,methodNames:Object.keys(e)};i.source.postMessage(c,r)}else n("Parent: Handshake - Received SYN message from origin ".concat(i.origin," which did not match expected origin ").concat(t))}}(l,y,c,p),S=k(y,c,p,v,l);return{promise:new Promise((function(n,t){var r=function(n,e){var t;return void 0!==n&&(t=window.setTimeout((function(){var t=new Error("Connection timed out after ".concat(n,"ms"));t.code=i.ConnectionTimeout,e(t)}),n)),function(){clearTimeout(t)}}(u,h),c=function(t){if(t.source===e.contentWindow&&t.data)if(t.data.penpal!==o.Syn)if(t.data.penpal!==o.Ack);else{var i=S(t);i&&(r(),n(i))}else w(t)};window.addEventListener(a.Message,c),l("Parent: Awaiting handshake"),function(n,e){var t=e.destroy,o=e.onDestroy,r=setInterval((function(){n.isConnected||(clearInterval(r),t())}),6e4);o((function(){clearInterval(r)}))}(e,v),m((function(n){window.removeEventListener(a.Message,c),n&&t(n)}))})),destroy:function(){h()}}},R=t(8094),I=t(7791),b=t(2390),M=function(n){var e=n.src,t=n.height,o=void 0===t?"calc(100vh - var(--spectrum-global-dimension-size-800))":t,r=n.location,i=(0,u.useRef)(null),c=(0,u.useContext)(I.Z).ims,a=(0,u.useState)(null),d=a[0],f=a[1];return(0,u.useEffect)((function(){d&&(0===i.current.clientHeight?d.onHide():d.onShow())}),[r.pathname]),(0,l.tZ)(u.default.Fragment,null,(0,l.tZ)("iframe",{title:"Main content",ref:i,src:(0,b.Bm)(e)?e:(0,s.dq)(e),onLoad:function(){C({iframe:i.current,methods:{scrollTop:function(n){var e;void 0===n&&(n=0),null!==(e=document)&&void 0!==e&&e.scrollingElement&&(document.scrollingElement.scrollTop=n)},getURL:function(){var n,e;return null===(n=window)||void 0===n||null===(e=n.location)||void 0===e?void 0:e.href},setURL:function(n){var e;null!==(e=window)&&void 0!==e&&e.location&&(window.location=n)},setHeight:function(n){i.current.style.height=n},getIMSAccessToken:function(){return null!=c&&c.isSignedInUser()?c.getAccessToken():null},getIMSProfile:function(){return null!=c&&c.isSignedInUser()?c.getProfile():null},signIn:function(){c&&!c.isSignedInUser()&&c.signIn()},signOut:function(){c&&c.isSignedInUser()&&c.signOut()}}}).promise.then((function(n){0===i.current.clientHeight?n.onHide():n.onShow(),f(n)}))},css:(0,l.iv)("display:block;height:",o,";width:100%;border:none;","")}),(0,l.tZ)(R.$,null))}}}]);
//# sourceMappingURL=776-b31b65e60826dc0f2d42.js.map