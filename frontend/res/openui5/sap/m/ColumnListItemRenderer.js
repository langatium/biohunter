/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ColumnListItemRenderer");jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.m.ListRenderer");jQuery.sap.require("sap.m.ListItemBaseRenderer");sap.m.ColumnListItemRenderer=sap.ui.core.Renderer.extend(sap.m.ListItemBaseRenderer);
sap.m.ColumnListItemRenderer.renderLIAttributes=function(r,l){r.addClass("sapMListTblRow")};
sap.m.ColumnListItemRenderer.renderLIContent=function(r,l,t){if(!t){return}var c=t.getColumns(true),C=l.getCells();l.destroyAggregation("clonedHeaders",true);if(!t._bRendering){l.removePopin()}c.forEach(function(o,i){var a,R=true,b=C[o.getInitialOrder()];if(!b||!o.getVisible()||o.isNeverVisible(true)||o.isPopin()){return}r.write("<td");r.addClass("sapMListTblCell");r.writeAttribute("id",l.getId()+"_cell"+i);if(o){a=o.getStyleClass(true);a&&r.addClass(a);if(!t.hasPopin()&&o.getMergeDuplicates()){var f=o.getMergeFunctionName(),F=f.split("#"),s=F[1],d=F[0];if(typeof b[d]!="function"){jQuery.sap.log.warning("mergeFunctionName property is defined on "+o+" but this is not function of "+b)}else{var e=o.getLastValue(),g=b[d](s);if(e===g){R=false;r.addClass("sapMListTblCellDup")}else{o.setLastValue(g)}}}o.getVAlign()!="Inherit"&&r.addStyle("vertical-align",o.getVAlign().toLowerCase());r.addStyle("text-align",o.getCssAlign());r.writeStyles()}r.writeClasses();r.write(">");if(R){r.renderControl(o.applyAlignTo(b))}r.write("</td>")})};
sap.m.ColumnListItemRenderer.renderPopin=function(r,l,t){l._popinId=l.getId()+"-sub";r.write("<tr class='sapMListTblSubRow'");r.writeAttribute("id",l._popinId);r.writeAttribute("tabindex",-1);r.write("><td");r.writeAttribute("colspan",t.getColCount());r.write("><div class='sapMListTblSubCnt'>");var c=l.getCells(),C=t.getColumns(true);C.forEach(function(o){if(!o.getVisible()||!o.isPopin()){return}var a=c[o.getInitialOrder()],h=o.getHeader();if(!h&&!a){return}var b=o.getStyleClass();r.write("<div");r.addClass("sapMListTblSubCntRow");b&&r.addClass(b);r.writeClasses();r.write(">");if(h){r.write("<div");r.addClass("sapMListTblSubCntHdr");r.writeClasses();r.write(">");h=h.clone();l.addAggregation("clonedHeaders",h,true);o.applyAlignTo(h,"Begin");r.renderControl(h);r.write("</div>");r.write("<div class='sapMListTblSubCntSpr'>:</div>")}if(a){r.write("<div");r.addClass("sapMListTblSubCntVal");r.addClass("sapMListTblSubCntVal"+o.getPopinDisplay());r.writeClasses();r.write(">");o.applyAlignTo(a,"Begin");r.renderControl(a);r.write("</div>")}r.write("</div>")});r.write("</div></td></tr>")};
