/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.MenuBar");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.MenuBar",{metadata:{library:"sap.ui.commons",properties:{"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},"design":{type:"sap.ui.commons.MenuBarDesign",group:"Appearance",defaultValue:sap.ui.commons.MenuBarDesign.Standard}},defaultAggregation:"items",aggregations:{"items":{type:"sap.ui.commons.MenuItem",multiple:true,singularName:"item"}}}});jQuery.sap.require("sap.ui.commons.Menu");jQuery.sap.require("sap.ui.commons.MenuItem");sap.ui.commons.MenuItem.extend("sap.ui.commons._DelegatorMenuItem",{constructor:function(a){sap.ui.commons.MenuItem.apply(this);this.oAlterEgoItm=a;var t=this;this.oAlterEgoItm.getSubmenu().getRootMenu=function(){return t.getParent()}},exit:function(){this.oAlterEgoItm.getSubmenu().getRootMenu=sap.ui.commons.Menu.prototype.getRootMenu;this.oAlterEgoItm=null},getText:function(){return this.oAlterEgoItm.getText()},getIcon:function(){return this.oAlterEgoItm.getIcon()},getEnabled:function(){return this.oAlterEgoItm.getEnabled()},getVisible:function(){return this.oAlterEgoItm.getVisible()},getSubmenu:function(){return this.oAlterEgoItm.getSubmenu()}});(function(){sap.ui.commons.MenuBar.prototype.init=function(){this.oOvrFlwMnu=null;this.sCurrentFocusedItemRefId=null};sap.ui.commons.MenuBar.prototype.exit=function(){if(this.oOvrFlwMnu){this.oOvrFlwMnu.destroy()}this.oOvrFlwMnu=null;if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};sap.ui.commons.MenuBar.prototype.doBeforeRendering=function(){var I=this.getItems();for(var i=0;i<I.length;i++){var m=I[i].getSubmenu();if(m){m.setRootMenuTopStyle(this.getDesign()==sap.ui.commons.MenuBarDesign.Header)}}if(this.oOvrFlwMnu){this.oOvrFlwMnu.setRootMenuTopStyle(this.getDesign()==sap.ui.commons.MenuBarDesign.Header)}if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};sap.ui.commons.MenuBar.prototype.onAfterRendering=function(){this.sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),jQuery.proxy(this.onresize,this));this.onresize()};sap.ui.commons.MenuBar.prototype.onresize=function(e){u(this)};sap.ui.commons.MenuBar.prototype.onfocusin=function(e){var t=jQuery(e.target);var T=t.attr("id");if(!T||T==this.getId()||T==this.getId()+"-area"){var i=jQuery.sap.byId(this.getId()+"-area").children();this.sCurrentFocusedItemRefId=i.length==0?null:jQuery(i.get(0)).attr("id");if(this.sCurrentFocusedItemRefId){jQuery.sap.byId(this.sCurrentFocusedItemRefId).get(0).focus()}}jQuery.sap.byId(this.getId()).attr("tabindex","-1")};sap.ui.commons.MenuBar.prototype.onfocusout=function(e){jQuery.sap.byId(this.getId()).attr("tabindex","0")};sap.ui.commons.MenuBar.prototype.onmousedown=function(e){var m=_(this,e);if(m==="ovrflw"){this._bOvrFlwMnuSkipOpen=this.oOvrFlwMnu&&this.oOvrFlwMnu.bOpen}else if(m){var M=m.getSubmenu();m._bSkipOpen=M&&M.bOpen}};sap.ui.commons.MenuButton.prototype.onmouseout=function(e){var m=_(this,e);if(m==="ovrflw"){var r=g(this,e);if(this._bOvrFlwMnuSkipOpen&&jQuery.sap.checkMouseEnterOrLeave(e,r[0])){this._bOvrFlwMnuSkipOpen=false}}else if(m){var r=g(this,e);if(m._bSkipOpen&&jQuery.sap.checkMouseEnterOrLeave(e,r[0])){m._bSkipOpen=false}}};sap.ui.commons.MenuBar.prototype.onclick=function(e){o(this,e,false)};sap.ui.commons.MenuBar.prototype.onsapselect=function(e){o(this,e,true)};sap.ui.commons.MenuBar.prototype.onsapdown=function(e){o(this,e,true)};sap.ui.commons.MenuBar.prototype.onsapdownmodifiers=function(e){if(e.altKey){o(this,e,true)}};sap.ui.commons.MenuBar.prototype.onsapprevious=function(e){if(e.keyCode!=jQuery.sap.KeyCodes.ARROW_UP){f(this,e,"prev")}};sap.ui.commons.MenuBar.prototype.onsapnext=function(e){if(e.keyCode!=jQuery.sap.KeyCodes.ARROW_DOWN){f(this,e,"next")}};sap.ui.commons.MenuBar.prototype.onsaphome=function(e){f(this,e,"first")};sap.ui.commons.MenuBar.prototype.onsapend=function(e){f(this,e,"last")};var o=function(t,e,w){e.preventDefault();e.stopPropagation();if(t.getEnabled()){var m=_(t,e);if(m==="ovrflw"){var r=g(t,e);if(t.oOvrFlwMnu&&!t._bOvrFlwMnuSkipOpen){var b=sap.ui.core.Popup.Dock;t.oOvrFlwMnu.open(w,r.get(0),b.EndTop,b.EndBottom,r.get(0))}}else if(m){if(m.getEnabled()){var r=g(t,e);var M=m.getSubmenu();if(M&&!m._bSkipOpen){var b=sap.ui.core.Popup.Dock;M.open(w,r.get(0),b.BeginTop,b.BeginBottom,r.get(0))}}}}t._bOvrFlwMnuSkipOpen=false;var I=t.getItems();for(var i=0;i<I.length;i++){I[i]._bSkipOpen=false}};var g=function(t,e){var r=jQuery(e.target);if(!r.attr("itemidx")){r=r.parent()}return r.attr("itemidx")?r:null};var _=function(t,e){var r=g(t,e);if(r){var i=r.attr("itemidx");if(i){if(i=="ovrflw"){return"ovrflw"}else{var I=parseInt(i,10);var m=t.getItems()[I];return m}}}return null};var a=function(t){var v=0;var A=jQuery.sap.byId(t.getId()+"-area");var i=A.children();var r=sap.ui.getCore().getConfiguration().getRTL();var l=(r?100000:0);i.each(function(I){if(I==0){return true}var c=this.offsetLeft;var L=(r?(c>=l):(c<=l));if(L){v=I;return false}else if(jQuery(this).attr("id")==t.getId()+"-ovrflw"){v=I;return false}else{l=c;return true}});return v};var u=function(t){var v=a(t);var b=v;var A=jQuery.sap.byId(t.getId()+"-area");var I=A.children();var O=jQuery.sap.byId(t.getId()+"-ovrflw");var U=false;if(v<I.length-1){O.attr("style","display:block;");if(!t.oOvrFlwMnu){t.oOvrFlwMnu=new sap.ui.commons.Menu(t.getId()+"-ovrflwmnu");t.oOvrFlwMnu.bUseTopStyle=t.getDesign()==sap.ui.commons.MenuBarDesign.Header;t.oOvrFlwMnu.attachItemSelect(function(e){var d=e.getParameter("item");if(!(d instanceof sap.ui.commons._DelegatorMenuItem)){var h=sap.ui.commons.Menu.prototype.getRootMenu.apply(d.getParent());h.fireItemSelect({item:d})}})}t.oOvrFlwMnu.destroyItems();var c=t.getItems();for(var i=0;i<c.length;i++){var d=c[i];if(v!=0){if(d.getVisible()){v--}if(v==0){t.sLastVisibleItemId=d.getId()}}else{t.oOvrFlwMnu.addItem(new sap.ui.commons._DelegatorMenuItem(d));if(d.getId()==t.sCurrentFocusedItemRefId){U=true}}}if(sap.ui.getCore().getConfiguration().getAccessibility()){I.attr("aria-setsize",b+1);O.attr("aria-posinset",b+1)}}else{O.attr("style","display:none;");if(t.oOvrFlwMnu){t.oOvrFlwMnu.destroyItems()}t.sLastVisibleItemId=null;if(sap.ui.getCore().getConfiguration().getAccessibility()){I.attr("aria-setsize",b);O.attr("aria-posinset",0)}}A.scrollTop(0);if(U){t.sCurrentFocusedItemRefId=t.sLastVisibleItemId;jQuery.sap.byId(t.sLastVisibleItemId).get(0).focus()}};var f=function(t,e,d){e.stopPropagation();e.preventDefault();if(!t.sCurrentFocusedItemRefId){return}var F=null;if(t.sLastVisibleItemId&&((t.sCurrentFocusedItemRefId==t.sLastVisibleItemId&&d=="next")||d=="last")){F=t.getId()+"-ovrflw"}else if(t.sLastVisibleItemId&&t.sCurrentFocusedItemRefId==t.getId()+"-ovrflw"&&d=="prev"){F=t.sLastVisibleItemId}else{var s=d+"All";var i=false;if(d=="first"){s="prevAll";i=true}else if(d=="last"){s="nextAll";i=true}var c=jQuery.sap.byId(t.sCurrentFocusedItemRefId);var j=c[s](":visible");F=jQuery(j.get(i?j.length-1:0)).attr("id")}if(F){t.sCurrentFocusedItemRefId=F;jQuery.sap.byId(F).get(0).focus()}}}());
