/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.AppCacheBuster");jQuery.sap.require("sap.ui.core.Core");jQuery.sap.require("sap.ui.thirdparty.URI");(function(){var c=sap.ui.getCore().getConfiguration();var l=c.getLanguage();var s=c.getAppCacheBusterMode()==="sync";var b=c.getAppCacheBusterMode()==="batch";var i={};var a=jQuery.ajax;var I=jQuery.sap.includeScript;var f=jQuery.sap.includeStyleSheet;var v=sap.ui.base.ManagedObject.prototype.validateProperty;var L=document.location.href.replace(/\?.*|#.*/g,"");var B=URI("./").absoluteTo(L);var A=B.toString();var u=URI(jQuery.sap.getModulePath("","/../"));var o=u.toString();if(u.is("relative")){u=u.absoluteTo(L)}var d=u.normalize().toString();var r=URI("resources").absoluteTo(d).toString();var F=new RegExp("^"+jQuery.sap.escapeRegExp(r));var E=function(U){if(U.length>0&&U.slice(-1)!=="/"){U+="/"}return U};var R=function(d,S){var e;if(jQuery.isArray(d)&&!b){jQuery.each(d,function(p,q){R(q,S)})}else if(jQuery.isArray(d)&&b){var g=E(d[0]);var C=[];jQuery.sap.log.debug("sap.ui.core.AppCacheBuster.register(\""+g+"\"); // BATCH MODE!");var h=sap.ui.core.AppCacheBuster.normalizeURL(g);jQuery.sap.log.debug("  --> normalized to: \""+h+"\"");jQuery.each(d,function(p,q){var U=E(q);var t=sap.ui.core.AppCacheBuster.normalizeURL(U);if(!i[j]){C.push(t)}});if(C.length>0){var U=h+"sap-ui-cachebuster-info.json?sap-ui-language="+l;e={url:U,type:"POST",async:!s&&!!S,dataType:"json",contentType:"text/plain",data:C.join("\n"),success:function(p){jQuery.extend(i,p)},error:function(){jQuery.sap.log.error("Failed to batch load AppCacheBuster index file from: \""+U+"\".")}}}}else{d=E(d);jQuery.sap.log.debug("sap.ui.core.AppCacheBuster.register(\""+d+"\");");var j=sap.ui.core.AppCacheBuster.normalizeURL(d);jQuery.sap.log.debug("  --> normalized to: \""+j+"\"");if(!i[j]){var U=j+"sap-ui-cachebuster-info.json?sap-ui-language="+l;e={url:U,async:!s&&!!S,dataType:"json",success:function(p){i[j]=p},error:function(){jQuery.sap.log.error("Failed to load AppCacheBuster index file from: \""+U+"\".")}}}}if(e){if(e.async){var k=S.startTask("load "+U);var m=e.success,n=e.error;jQuery.extend(e,{success:function(p){m.apply(this,arguments);S.finishTask(k)},error:function(){n.apply(this,arguments);S.finishTask(k,false)}})}jQuery.sap.log.info("Loading AppCacheBuster index file from: \""+U+"\".");jQuery.ajax(e)}};sap.ui.core.AppCacheBuster={boot:function(S){var C=c.getAppCacheBuster();if(C&&C.length>0){C=C.slice();var e=true;var V=String(C[0]).toLowerCase();if(C.length===1){if(V==="true"||V==="x"){var u=URI(o);C=u.is("relative")?[u.toString()]:[]}else if(V==="false"){e=false}}if(e){sap.ui.core.AppCacheBuster.init();R(C,S)}}},init:function(){var C=sap.ui.core.AppCacheBuster.convertURL;var n=sap.ui.core.AppCacheBuster.normalizeURL;var g=function(U){if(U&&typeof(U)==="string"){U=n(U);return!U.match(F)}return false};jQuery.ajax=function(e,h){if(e&&e.url&&g(e.url)){e.url=C(e.url)}return a.apply(this,arguments)};jQuery.sap.includeScript=function(U,e){var h=Array.prototype.slice.apply(arguments);if(g(h[0])){h[0]=C(h[0])}return I.apply(this,h)};jQuery.sap.includeStyleSheet=function(U,e){var h=Array.prototype.slice.apply(arguments);if(g(h[0])){h[0]=C(h[0])}return f.apply(this,h)};sap.ui.base.ManagedObject.prototype.validateProperty=function(p,V){var m=this.getMetadata(),P=m.getAllProperties()[p],h;if(P&&P.type==="sap.ui.core.URI"){h=Array.prototype.slice.apply(arguments);try{if(g(h[1])){h[1]=C(h[1])}}catch(e){}}return v.apply(this,h||arguments)}},exit:function(){jQuery.ajax=a;jQuery.sap.includeScript=I;jQuery.sap.includeStyleSheet=f;sap.ui.base.ManagedObject.prototype.validateProperty=v;i={}},register:function(d){R(d)},convertURL:function(U){jQuery.sap.log.debug("sap.ui.core.AppCacheBuster.convertURL(\""+U+"\");");if(i&&U){var n=sap.ui.core.AppCacheBuster.normalizeURL(U);jQuery.sap.log.debug("  --> normalized to: \""+n+"\"");if(n&&sap.ui.core.AppCacheBuster.handleURL(n)){jQuery.each(i,function(d,m){var e;if(d&&n.length>=d.length&&n.slice(0,d.length)===d){e=n.slice(d.length);if(m[e]){U=d+"~"+m[e]+"~/"+e;jQuery.sap.log.debug("  ==> return \""+U+"\";");return false}}})}}return U},normalizeURL:function(U){var u=URI(U||"./");if(u.is("relative")){u=u.absoluteTo(L)}return u.normalizeProtocol().normalizeHostname().normalizePort().normalizePath().toString()},handleURL:function(U){return true}}}());
