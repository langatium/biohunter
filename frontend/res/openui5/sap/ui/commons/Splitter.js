/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.Splitter");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.Splitter",{metadata:{library:"sap.ui.commons",properties:{"splitterOrientation":{type:"sap.ui.commons.Orientation",group:"Behavior",defaultValue:sap.ui.commons.Orientation.Vertical},"splitterPosition":{type:"sap.ui.core.Percentage",group:"Behavior",defaultValue:'50%'},"minSizeFirstPane":{type:"sap.ui.core.Percentage",group:"Behavior",defaultValue:'0%'},"minSizeSecondPane":{type:"sap.ui.core.Percentage",group:"Behavior",defaultValue:'0%'},"width":{type:"sap.ui.commons.SplitterSize",group:"Behavior",defaultValue:'100%'},"height":{type:"sap.ui.commons.SplitterSize",group:"Behavior",defaultValue:'100%'},"visible":{type:"boolean",group:"Behavior",defaultValue:true},"showScrollBars":{type:"boolean",group:"Behavior",defaultValue:true},"splitterBarVisible":{type:"boolean",group:"Behavior",defaultValue:true}},aggregations:{"firstPaneContent":{type:"sap.ui.core.Control",multiple:true,singularName:"firstPaneContent"},"secondPaneContent":{type:"sap.ui.core.Control",multiple:true,singularName:"secondPaneContent"}}}});jQuery.sap.require("sap.ui.core.delegate.ItemNavigation");jQuery.sap.require("jquery.sap.events");jQuery.sap.require("jquery.sap.keycodes");jQuery.sap.require("sap.ui.core.ResizeHandler");
sap.ui.commons.Splitter.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}if(this.sSpecialResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sSpecialResizeListenerId);this.sSpecialResizeListenerId=null}};
sap.ui.commons.Splitter.prototype.onAfterRendering=function(){this._recalculateInternals();this.sResizeListenerId=sap.ui.core.ResizeHandler.register(this.splitterDIV,jQuery.proxy(this.onresize,this))};
sap.ui.commons.Splitter.prototype._recalculateInternals=function(){var r=sap.ui.getCore().getConfiguration().getRTL();this.splitterDIV=jQuery.sap.domById(this.getId());this.splitterBar=jQuery.sap.domById(this.getId()+'_SB');this.firstPane=jQuery.sap.domById(this.getId()+'_firstPane');this.secondPane=jQuery.sap.domById(this.getId()+'_secondPane');this.minSizeFP=this.getMinSizeFirstPane();this.minSizeSP=this.getMinSizeSecondPane();this.minSizeFP=this.minSizeFP.substring(0,(this.minSizeFP).length-1);this.minSizeFP=parseFloat(this.minSizeFP);this.minSizeSP=this.minSizeSP.substring(0,(this.minSizeSP).length-1);this.minSizeSP=parseFloat(this.minSizeSP);this.spOrientation=this.getSplitterOrientation();this.sBarPosition=this.getSplitterPosition();this.sBarPosition=this.sBarPosition.substring(0,this.sBarPosition.length-1);this.sBarPosition=parseFloat(this.sBarPosition);if(sap.ui.getCore().getConfiguration().getTheme()=="sap_hcb"){this.sbSize=6}else{this.sbSize=4}this.resizeSplitterElements();var s=jQuery(this.splitterBar).height();if(this.spOrientation==sap.ui.commons.Orientation.Vertical){if(s<=0||s>jQuery(this.splitterDIV).height()){this.fixHeight()}}else{if(s<=0||s!=this.sbSize){this.fixHeight()}}};
sap.ui.commons.Splitter.prototype.onresize=function(e){this.resizeSplitterElements()};
sap.ui.commons.Splitter.prototype.resizeSplitterElements=function(){var s,a,w,h,b,c;var r=sap.ui.getCore().getConfiguration().getRTL();if(this.spOrientation==sap.ui.commons.Orientation.Vertical){w=jQuery(this.splitterDIV).width();if(w==0){w=100}s=(this.sbSize*100)/w;if(this.sBarPosition>=100||this.sBarPosition+s>100){this.sBarPosition=100-s;b=0}else{b=100-s-this.sBarPosition}jQuery(this.firstPane).css("width",this.sBarPosition+"%");jQuery(this.splitterBar).css("width",s+"%");jQuery(this.secondPane).css("width",b+"%")}else{h=jQuery(this.splitterDIV).height();if(h==0){h=100}a=(this.sbSize*100)/h;if(this.sBarPosition>=100||this.sBarPosition+a>100){this.sBarPosition=100-a;c=0}else{c=100-a-this.sBarPosition}jQuery(this.firstPane).css("height",this.sBarPosition+"%");jQuery(this.splitterBar).css("height",a+"%");jQuery(this.secondPane).css("height",c+"%")}this.setProperty("splitterPosition",this.sBarPosition+"%",true);if(jQuery(this.splitterDIV).height()==0){jQuery(this.splitterDIV).css("height","100px");jQuery(this.splitterBar).css("height","100px")}};
sap.ui.commons.Splitter.prototype.setSplitterPosition=function(p){if(this.getDomRef()){this.setProperty("splitterPosition",p,true);this._recalculateInternals()}else{this.setProperty("splitterPosition",p)}};
sap.ui.commons.Splitter.prototype.setSplitterBarVisible=function(v){if(this.getDomRef()){this.setProperty("splitterBarVisible",v,true);var c=this.getSplitterOrientation()===sap.ui.commons.Orientation.Vertical?"sapUiVertical":"sapUiHorizontal";if(v){jQuery.sap.byId(this.getId()+"_SB").removeClass(c+"SplitterBarHidden").addClass(c+"SplitterBar")}else{jQuery.sap.byId(this.getId()+"_SB").removeClass(c+"SplitterBar").addClass(c+"SplitterBarHidden")}}else{this.setProperty("splitterBarVisible",v)}};
sap.ui.commons.Splitter.prototype.fixHeight=function(){var p=jQuery(this.splitterDIV.parentNode).height();var s=jQuery(this.splitterDIV).height();if(p>s){s=p;var c=this.getHeight();if(c&&c.toLowerCase().indexOf("px")!=-1){s=parseInt(c,10)}if(c&&c.toLowerCase().indexOf("%")!=-1){var a=parseInt(c,10);if(a<100){s=jQuery(this.splitterDIV).height()}}if(s<=0){s=p}}jQuery(this.splitterDIV).css("height",s+"px");if(this.spOrientation==sap.ui.commons.Orientation.Vertical){jQuery(this.splitterBar).css("height",s+"px")}var P=this.splitterDIV.parentNode;if(P){var h=jQuery.proxy(this.onresizespecial,this);this.sSpecialResizeListenerId=sap.ui.core.ResizeHandler.register(P,h)}};
sap.ui.commons.Splitter.prototype.exit=function(){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}if(this.sSpecialResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sSpecialResizeListenerId);this.sSpecialResizeListenerId=null}};
sap.ui.commons.Splitter.prototype.onresizespecial=function(e){var s=jQuery(this.splitterDIV);var o=s.height();s.css("height","0px");var d=this.getDomRef();if(d&&window.getComputedStyle){window.getComputedStyle(d)}var p=jQuery(e.target).height();var c=s.height();if(c!=p){s.css("height",p+"px");if(this.spOrientation==sap.ui.commons.Orientation.Vertical){jQuery(this.splitterBar).css("height",p+"px")}}if(p<=0){s.css("height",o+"px");if(this.spOrientation==sap.ui.commons.Orientation.Vertical){jQuery(this.splitterBar).css("height",o+"px")}}};
sap.ui.commons.Splitter.prototype.onmousedown=function(e){if(e.target!=this.splitterBar){return}var j=jQuery(document.body);j.bind("selectstart",jQuery.proxy(this.splitterSelectStart,this));var o=jQuery(this.splitterBar).offset();var h=jQuery(this.splitterBar).height();var w=jQuery(this.splitterBar).width();var c;var r=sap.ui.getCore().getConfiguration().getRTL();if(this.spOrientation==sap.ui.commons.Orientation.Vertical){c="sapUiVSBGhost"}else{c="sapUiHSBGhost"}jQuery(document.body).append("<div id=\""+this.getId()+"_ghost\" class=\""+c+"\" style =\" height:"+h+"px; width:"+w+"px; left:"+o.left+"px; top:"+o.top+"px\" ></div>");jQuery(this.splitterDIV).append("<div id=\""+this.getId()+"_overlay\" style =\"left: 0px;"+" right: 0px; bottom: 0px; top: 0px; position:absolute\" ></div>");jQuery(document).bind("mouseup",jQuery.proxy(this.onGhostMouseRelease,this));jQuery(document).bind("mousemove",jQuery.proxy(this.onGhostMouseMove,this));jQuery(this.splitterBar).focus();e.preventDefault();e.stopPropagation()};
sap.ui.commons.Splitter.prototype.splitterSelectStart=function(e){e.preventDefault();e.stopPropagation();return false};
sap.ui.commons.Splitter.prototype.onGhostMouseRelease=function(e){var n,s,a;var b=jQuery.sap.domById(this.getId()+"_ghost");var r=sap.ui.getCore().getConfiguration().getRTL();if(this.spOrientation==sap.ui.commons.Orientation.Vertical){if(!r){n=e.pageX-jQuery(this.firstPane).offset().left;a=jQuery(this.splitterDIV).width();n=(n*100)/a}else{n=e.pageX-jQuery(this.secondPane).offset().left;a=jQuery(this.splitterDIV).width();n=((a-n)*100)/a}}else{n=e.pageY-jQuery(this.firstPane).offset().top;s=jQuery(this.splitterDIV).height();n=(n*100)/s}if(n<this.minSizeFP){n=this.minSizeFP}else if((100-n)<this.minSizeSP){n=100-this.minSizeSP}this.sBarPosition=n;this.resizeSplitterElements();jQuery(b).remove();jQuery.sap.byId(this.getId()+"_overlay").remove();var j=jQuery(document.body);j.unbind("selectstart",this.splitterSelectStart);jQuery(document).unbind("mouseup",this.onGhostMouseRelease);jQuery(document).unbind("mousemove",this.onGhostMouseMove)};
sap.ui.commons.Splitter.prototype.onGhostMouseMove=function(e){var s=jQuery.sap.domById(this.getId()+"_ghost");var m;var a;var r=sap.ui.getCore().getConfiguration().getRTL();var l=jQuery(this.firstPane).offset().left;var w=jQuery(this.splitterDIV).width();var b=jQuery(this.secondPane).offset().left;if(this.getSplitterOrientation()==sap.ui.commons.Orientation.Vertical){if(!r){a=l+(w*this.minSizeFP)/100;m=l+(w*(100-this.minSizeSP))/100;if(e.pageX>a&&e.pageX<m){jQuery(s).css("left",e.pageX+"px")}}else{a=b+(w*this.minSizeSP)/100;m=b+(w*(100-this.minSizeFP))/100;if(e.pageX>a&&e.pageX<m){jQuery(s).css("left",e.pageX+"px")}}}else{var h=jQuery(this.splitterDIV).height();a=jQuery(this.firstPane).offset().top+(h*this.minSizeFP)/100;m=jQuery(this.secondPane).offset().top+jQuery(this.secondPane).height()-(h*this.minSizeSP)/100;if(e.pageY>a&&e.pageY<m){jQuery(s).css("top",e.pageY+"px")}}};
sap.ui.commons.Splitter.prototype.getCtrlKey=function(e){return!!(e.ctrlKey||e.metaKey)};
sap.ui.commons.Splitter.prototype.checkModifierKey=function(e,c,a,s){return e.shiftKey==s&&e.altKey==a&&this.getCtrlKey(e)==c};
sap.ui.commons.Splitter.prototype.onsaphome=function(e){if(e.target==this.splitterBar){this.sBarPosition=this.minSizeFP;this.resizeSplitterElements();e.preventDefault();e.stopPropagation()}};
sap.ui.commons.Splitter.prototype.onsapend=function(e){if(e.target==this.splitterBar){this.sBarPosition=100-this.minSizeSP;this.resizeSplitterElements();e.preventDefault();e.stopPropagation()}};
sap.ui.commons.Splitter.prototype.onArrowKeys=function(e,i){var w,h,s,a,n;if(this.spOrientation==sap.ui.commons.Orientation.Vertical){w=jQuery(this.splitterDIV).width();a=jQuery(this.firstPane).width();a=(a*100)/w;s=(10*100)/w}else{h=jQuery(this.splitterDIV).height();a=jQuery(this.firstPane).height();a=(a*100)/h;s=(10*100)/h}if(i=="false"){n=a-s}else if(i=="true"){n=a+s}if(n<this.minSizeFP){n=this.minSizeFP}else if((100-n)<this.minSizeSP){n=100-this.minSizeSP}this.sBarPosition=n;this.resizeSplitterElements()};
sap.ui.commons.Splitter.prototype.onsapupmodifiers=function(e){if(this.checkModifierKey(e,false,false,true)){if(e.target==this.splitterBar){if(this.spOrientation==sap.ui.commons.Orientation.Horizontal){this.onArrowKeys(e,"false")}else{this.onsapleftmodifiers(e)}}e.preventDefault();e.stopPropagation()}};
sap.ui.commons.Splitter.prototype.onsapdownmodifiers=function(e){if(this.checkModifierKey(e,false,false,true)){if(e.target==this.splitterBar){if(this.spOrientation==sap.ui.commons.Orientation.Horizontal){this.onArrowKeys(e,"true")}else{this.onsaprightmodifiers(e)}}e.preventDefault();e.stopPropagation()}};
sap.ui.commons.Splitter.prototype.onsapleftmodifiers=function(e){if(this.checkModifierKey(e,false,false,true)){if(e.target==this.splitterBar){if(this.spOrientation==sap.ui.commons.Orientation.Vertical){var r=sap.ui.getCore().getConfiguration().getRTL();if(r){this.onArrowKeys(e,"true")}else{this.onArrowKeys(e,"false")}}else{this.onsapupmodifiers(e)}}e.preventDefault();e.stopPropagation()}};
sap.ui.commons.Splitter.prototype.onsaprightmodifiers=function(e){if(this.checkModifierKey(e,false,false,true)){if(e.target==this.splitterBar){if(this.spOrientation==sap.ui.commons.Orientation.Vertical){var r=sap.ui.getCore().getConfiguration().getRTL();if(r){this.onArrowKeys(e,"false")}else{this.onArrowKeys(e,"true")}}else{this.onsapdownmodifiers(e)}}e.preventDefault();e.stopPropagation()}};
sap.ui.commons.Splitter.prototype.ondragstart=function(e){if(e.target!=this.splitterBar){return}e.preventDefault();e.stopPropagation()};
sap.ui.commons.Splitter.prototype.splitterPart=function(d){var c;c=jQuery(d).attr("class");switch(c){case"sapUiVSplitterFirstPane":case"sapUiHSplitterFirstPane":{return"first"}case"sapUiHSplitterSecondPane":case"sapUiVSplitterSecondPane":{return"second"}case"sapUiVerticalSplitterBar":case"sapUiHorizontalSplitterBar":{return"bar"}case"sapUiSplitter":{return"DIV"}default:return"other"}};
sap.ui.commons.Splitter.prototype.setFocusNextSplitterElement=function(e){var c=e.target;var s=this.splitterPart(c);var a;var b;var d;var p;switch(s){case"first":{p=jQuery(c).children(".sapUiSplitter");if(p.length!=0){c=p[0];d=jQuery(c).children(".sapUiVSplitterFirstPane, .sapUiHSplitterFirstPane");jQuery(d[0]).focus();return}else{b=jQuery(c).next();jQuery(b).next().focus();return}}case"second":{p=jQuery(c).children(".sapUiSplitter");if(p.length!=0){c=p[0];d=jQuery(c).children(".sapUiVSplitterFirstPane, .sapUiHSplitterFirstPane");jQuery(d[0]).focus();return}else{a=jQuery(c).closest(".sapUiVSplitterFirstPane, .sapUiHSplitterFirstPane");if(a.length!=0){b=jQuery(a[0]).next();jQuery(b).focus();return}else{return}}}case"bar":{jQuery(jQuery(c).next()).focus();return}case"other":{a=jQuery(c).closest(".sapUiVSplitterFirstPane, .sapUiHSplitterFirstPane, .sapUiVSplitterSecondPane, .sapUiHSplitterSecondPane");if(a.length!=0){jQuery(a[0]).focus();return}else{return}}}};
sap.ui.commons.Splitter.prototype.focusPrev=function(e){var c=jQuery(e).children(".sapUiSplitter");var p;if(c.length!=0){p=jQuery(c[0]).children(".sapUiVSplitterSecondPane, .sapUiHSplitterSecondPane");this.focusPrev(p[0])}else{jQuery(e).focus();return}};
sap.ui.commons.Splitter.prototype.setFocusPreviousSplitterElement=function(e){var c=e.target;var s=this.splitterPart(c);var p;var a;switch(s){case"second":{a=jQuery(c).prev();if(this.splitterPart(a)=="bar"){var b=jQuery(a).prev();if(b&&this.splitterPart(b)=="first"){this.focusPrev(b)}}else if(a&&this.splitterPart(a)!="other"){jQuery(a).focus()}return}case"bar":{a=jQuery(c).prev();if(a&&this.splitterPart(a)=="first"){this.focusPrev(a)}return}case"first":{}case"other":{var d=jQuery(c).parent();p=jQuery(d).closest(".sapUiVSplitterFirstPane, .sapUiHSplitterFirstPane, .sapUiVSplitterSecondPane, .sapUiHSplitterSecondPane");if(p.length!=0){jQuery(p[0]).focus();return}else{return}}}};
sap.ui.commons.Splitter.prototype.onsapskipforward=function(e){e.preventDefault();e.stopPropagation();this.setFocusNextSplitterElement(e)};
sap.ui.commons.Splitter.prototype.onsapskipback=function(e){e.preventDefault();e.stopPropagation();this.setFocusPreviousSplitterElement(e)};
