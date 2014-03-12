/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function($){var o="",D={},c=sap.ui.getCore(),l=sap.m.getLocale(),L=l.getLanguage(),a=sap.m.getLocaleData(),r=c.getLibraryResourceBundle("sap.m"),_=function(T){return r.getText("MOBISCROLL_"+T)},b="(?=([^']*'[^']*')*[^']*$)",C=$.sap.getModulePath("sap.ui.thirdparty.mobiscroll","/css/"),s={endYear:new Date().getFullYear()+10,lang:L},f={setText:_("SET"),cancelText:_("CANCEL"),monthText:_("MONTH"),dayText:_("DAY"),yearText:_("YEAR"),hourText:_("HOURS"),minuteText:_("MINUTES"),secText:_("SECONDS"),nowText:_("NOW"),dayNames:a.getDaysStandAlone("wide"),dayNamesShort:a.getDaysStandAlone("abbreviated"),monthNames:a.getMonthsStandAlone("wide"),monthNamesShort:a.getMonthsStandAlone("abbreviated")},t=sap.ui.core.theming.Parameters.get();$.sap.includeStyleSheet(C+"mobiscroll-core.css");$.sap.require("sap.ui.thirdparty.mobiscroll.js.mobiscroll-core");$.sap.require("sap.ui.thirdparty.mobiscroll.js.mobiscroll-datetime");D=$("<input>").scroller({}).scroller("getInst").settings;if(t["sapMPlatformDependent"]!="true"){var g=["phone","tablet","desktop"].filter(function(d){return $.device.is[d]})[0],u=function(d){if(!d){return""}return d.charAt(0).toUpperCase()+d.substr(1)},h=function(k,d,p){var v=t["sapUiDTICustom"+u(p)+u(k)];if(v){if(d=="bool"){s[k]=(v.toLowerCase()=="true"?true:false)}else if(d=="int"){v=parseInt(v,10);!isNaN(v)&&(s[k]=v)}else{s[k]=v}}if(!p&&g){h(k,d,g)}};s.mode="mixed";s.display="modal";s.theme="sapMDTICustom";h("mode");h("display");h("animate");h("rows","int");h("width","int");h("height","int");h("showLabel","bool");h("headerText","bool");if(s.headerText){s.headerText="{value}"}$.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle()}else if($.os.ios){o="ios";s.display="bubble"}else if($.os.android){o="android-ics";if($.os.fVersion==2.3){s.mode="clickpick";s.rows=3}else if($.os.fVersion==3.2){s.mode="scroller"}}else if($.browser.msie){o="wp"}$.scroller.i18n[L]=$.extend(f);if(o){s.theme=($.os.android)?o+" light":o;$.sap.includeStyleSheet(C+"mobiscroll-"+o+".css");$.sap.require("sap.ui.thirdparty.mobiscroll.js.mobiscroll-"+o);s=$.extend({},$.mobiscroll.themes[s.theme].defaults,s)}$.sap.require("sap.m.InstanceManager");$.extend(sap.m.DateTimeInput.prototype,{close:function(){this._$input.scroller("hide")},_setScrollerHeader:function(v){try{var d=this._$input.scroller("getInst").settings,F=!this.getType().indexOf("Date")?d.dateFormat:d.timeFormat,i=$.mobiscroll.parseDate(F,v);return sap.ui.core.format.DateFormat.getDateInstance({pattern:this.getDisplayFormat()}).format(i)}catch(e){return v}},_autoClose:function(e){var d=this.getDomRef();if(d&&d.contains(e.target)){e.stopPropagation();e.preventDefault();return}var i=document.querySelector(".sapMDTICustom .dwwr");if(i&&!i.contains(e.target)){this._$input.scroller("hide")}},_restrictMaxWidth:function(d){d[0].querySelector(".dwwr").style.maxWidth=(document.documentElement.clientWidth-22)+"px"},_handleResize:function(e){this._restrictMaxWidth(e.data.$dialog)},_handleBtnKeyDown:function(e){if(e.keyCode===jQuery.sap.KeyCodes.ENTER){if(e.target&&jQuery(e.target.parentElement).hasClass("dwb-c")){this._$input.scroller("cancel")}else{this._$input.scroller("select")}}else if(e.keyCode===jQuery.sap.KeyCodes.ESCAPE){this._$input.scroller("cancel")}},_getScrollerConfig:function(){var d=this,T=this.getType(),F=this.getDisplayFormat(),A=$.proxy(this._autoClose,this),H=$.proxy(this._handleResize,this),e=$.proxy(this._handleBtnKeyDown,this),i,j,k=$("<span class='sapMFirstFE' tabIndex='0'/>"),m=$("<span class='sapMLastFE' tabIndex='0'/>"),K,n,p=$.extend({},s,{preset:T.toLowerCase(),disabled:!d.getEnabled()||!d.getEditable(),onShow:function(q){if(jQuery.browser.msie){if(d._popupIsShown){return}d._popupIsShown=true}sap.m.InstanceManager.addDialogInstance(d);$(window).on("resize.sapMDTICustom",{$dialog:q},H);$(window).unbind('keydown.dw');q.on('keydown.dw',e);if(s.display=="bubble"){document.addEventListener($.support.touch?"touchstart":"mousedown",A,true)}if(sap.ui.Device.system.desktop){var v=q.find('.dwcc'),w=q.find('.dwbc'),x=v.find(":focusable.dwww");k.insertBefore(v);j=$.proxy(d._getFocusInHandler(w,false),d);k.focusin(j);m.insertAfter(w);i=$.proxy(d._getFocusInHandler(v,true),d);m.focusin(i);jQuery.sap.focus(v.firstFocusableDomRef());n=q;K=$.proxy(d._getKeyDownHandler(x),d);q.keydown(K)}},onClose:function(){if(jQuery.browser.msie){d._popupIsShown=false}sap.m.InstanceManager.removeDialogInstance(d);$(window).off("resize.sapMDTICustom",H);if(s.display=="bubble"){document.removeEventListener($.support.touch?"touchstart":"mousedown",A,true)}k.unbind('focusin',j);m.unbind('focusin',i);if(n){n.unbind('keydown',K);n.unbind('keydown.dw',e)}},onMarkupReady:function(q,v){d._restrictMaxWidth(q);if(s.theme!="sapMDTICustom"){q.addClass("sapMDTICustom")}if(s.headerText!==false){q.addClass("sapMDTICustomHdr")}if(sap.ui.getCore().getConfiguration().getRTL()){var w=q.find(".dwbc");var x=w.find(".dwb-c");x.prependTo(w)}}});if(T=="Date"){F=this._convertDatePattern(F);$.extend(p,{dateFormat:F,dateOrder:this._getLongDatePattern(F.replace(/'.*?'/g,"")).replace(/[^ymd ]/ig,""),})}else if(T=="Time"){F=this._convertTimePattern(F);$.extend(p,{timeFormat:F,timeWheels:F.replace(/'.*?'/g,"").replace(/[^hisa]/ig,"")})}else if(T=="DateTime"){F=this._convertDatePattern(this._convertTimePattern(F));$.extend(p,{dateFormat:F,dateOrder:this._getLongDatePattern(F.replace(/'.*?'/g,"")).replace(/[^ymd ]/ig,""),rows:this._getRowForDateTime(),timeWheels:F,timeFormat:"",separator:""})}if(/[^ymdhisa\W]/i.test(F)){this._reformat=true;if(s.headerText!==false){p.headerText=$.proxy(this._setScrollerHeader,this)}}else{this._reformat=false}return p},_getRowForDateTime:function(){var d=s.rows||D.rows;if(!d||d<=3){return 3}return Math.min(window.innerWidth,window.innerHeight)<360?3:d},_getFocusInHandler:function(d,e){return function(){var E=e?d.firstFocusableDomRef():d.lastFocusableDomRef();jQuery.sap.focus(E)}},_getKeyDownHandler:function(F){return function(e){var k=e.which,S=e.shiftKey,A=e.altKey,d=e.ctrlKey;if(!A&&!S&&!d){switch(k){case jQuery.sap.KeyCodes.ARROW_RIGHT:var i=F.index(document.activeElement),j=F.eq(i+1).length?F.eq(i+1):F.eq(0);j.focus();break;case jQuery.sap.KeyCodes.ARROW_LEFT:var i=F.index(document.activeElement),m=F.eq(i-1).length?F.eq(i-1):F.eq(F.length-1);m.focus();break;case jQuery.sap.KeyCodes.HOME:F[0].focus();break;case jQuery.sap.KeyCodes.END:F[F.length-1].focus();break;default:break}}else if(A&&!S&&!d){switch(k){case jQuery.sap.KeyCodes.ARROW_UP:this._$input.scroller("select");break;default:break}}}},_rgxYear:new RegExp("y+"+b,"ig"),_rgxMonth:new RegExp("m+"+b,"ig"),_rgxDay:new RegExp("d+"+b,"g"),_rgxMinute:new RegExp("m"+b,"g"),_rgxAmPm:new RegExp("a"+b,"g"),_rgxDayOfWeekLong:new RegExp("EEEE"+b,"g"),_rgxDayOfWeekShort:new RegExp("E+"+b,"g"),_getLongDatePattern:function(p){p=(p||this.getDisplayFormat()).replace(this._rgxYear,"YY");if(o=="wp"){return p.replace(this._rgxMonth,"mm MM").replace(this._rgxDay,"dd DD")}return p.replace(this._rgxMonth,"MM").replace(this._rgxDay,"dd")},_convertTimePattern:function(p){p=p||this.getDisplayFormat();return p.replace(this._rgxMinute,"i").replace(this._rgxAmPm,"A")},_convertDatePattern:function(p){p=p||this.getDisplayFormat();var i=p.indexOf('M'),I=p.lastIndexOf('M'),F=p,n;if(i==-1){i=p.indexOf('L');I=p.lastIndexOf('L')}if(i>-1){switch(I-i){case 0:n='m';break;case 1:n='mm';break;case 2:n='M';break;case 5:n='m';break;default:n='MM';break}F=p.substring(0,i)+n+p.substring(I+1)}var N;i=F.indexOf('y');if(i>-1){I=F.lastIndexOf('y');if(I-i==1){N='y'}else{N='yy'}F=F.substring(0,i)+N+F.substring(I+1)}var d;i=F.indexOf('D');if(i>-1){I=F.lastIndexOf('D');if(I-i==1){d='o'}else{d='oo'}F=F.substring(0,i)+d+F.substring(I+1)}F=F.replace(this._rgxDayOfWeekLong,"DD").replace(this._rgxDayOfWeekShort,"D");return F}})})(jQuery);
