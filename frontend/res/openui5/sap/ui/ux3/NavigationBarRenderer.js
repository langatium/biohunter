/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.ux3.NavigationBarRenderer");sap.ui.ux3.NavigationBarRenderer={};
sap.ui.ux3.NavigationBarRenderer.render=function(r,c){if(!c.getVisible()){return}var a=r;var i=c.getId();a.addClass("sapUiUx3NavBar");if(c.getToplevelVariant()){a.addClass("sapUiUx3NavBarToplevel")}a.write("<nav");a.writeControlData(c);a.writeClasses();a.write(" role='navigation'><ul id='"+i+"-list' role='menubar' class='sapUiUx3NavBarList'>");sap.ui.ux3.NavigationBarRenderer.renderItems(a,c);a.write("</ul>");a.write("<a id='"+i+"-ofb' tabindex='-1' role='presentation' class='sapUiUx3NavBarBack' href='javascript:void(0)'>&lt;&lt;</a>");a.write("<a id='"+i+"-off' tabindex='-1' role='presentation' class='sapUiUx3NavBarForward' href='javascript:void(0)'>&gt;&gt;</a>");a.write("<a id='"+i+"-ofl' tabindex='-1' role='presentation' class='sapUiUx3NavBarOverflowBtn' href='javascript:void(0)'>");a.writeIcon("sap-icon://overflow",[],{id:i+"-oflt"});a.write("</a>");a.write("</nav>")};
sap.ui.ux3.NavigationBarRenderer.renderItems=function(r,c){var I=c.getItems();var n=false;if(!I||I.length==0){I=c.getAssociatedItems();n=true}var N=I.length;r.write("<li><a id='"+c.getId()+"-dummyItem' class='sapUiUx3NavBarDummyItem sapUiUx3NavBarItem'>&nbsp;</a></li>");var s=c.getSelectedItem();for(var i=0;i<N;i++){var a=n?sap.ui.getCore().byId(I[i]):I[i];if(a.getVisible()){var b=a.getId();var d=b==s;r.write("<li");if(d){r.write(" class='sapUiUx3NavBarItemSel'")}var u=a.getHref()||"javascript:void(0);";r.write("><a ");r.writeElementData(a);r.write("href='"+u+"' aria-setsize='"+N+"' aria-posinset='"+(i+1)+"' role='menuitemradio' class='sapUiUx3NavBarItem'");if(d){r.write(" tabindex='0'")}r.write(" aria-checked='"+(d?"true":"false")+"'");var t=a.getTooltip_AsString();if(t){r.write(" title='"+jQuery.sap.escapeHTML(t)+"'")}r.write(">");r.write(jQuery.sap.escapeHTML(a.getText()));r.write("</a></li>")}}var e;if(c._bRtl){e="right:"+c._iLastArrowPos}else{e="left:"+c._iLastArrowPos}r.write("<span id='"+c.getId()+"-arrow' style='"+e+"px;");if((I.length==1)&&!c.getToplevelVariant()&&!!sap.ui.Device.browser.internet_explorer&&(sap.ui.Device.browser.version==8||sap.ui.Device.browser.version==7)){r.write("display:none;")}r.write("' class='sapUiUx3NavBarArrow'></span>")};
