/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.ToolbarRenderer");
jQuery.sap.require("sap.ui.core.Renderer");

/**
 * @class Toolbar renderer.
 * @static
 */
sap.m.ToolbarRenderer = {};

sap.m.ToolbarRenderer.render = function(rm, oControl) {
	if (!oControl.getVisible()) {
		return;
	}

	rm.write("<div");
	rm.writeControlData(oControl);
	rm.addClass("sapMTB");

	if (!oControl.hasFlexBoxSupport) {
		rm.addClass("sapMTBNoFlex");
	} else if (!oControl.hasNewFlexBoxSupport) {
		rm.addClass("sapMTBOldFlex");
	} else {
		rm.addClass("sapMTBNewFlex");
	}

	if (oControl.getActive()) {
		rm.addClass("sapMTBActive");
		rm.writeAttribute("tabindex", "0");
	} else {
		rm.addClass("sapMTBInactive");
		rm.writeAttribute("tabindex", "-1");
	}

	var sWidth = oControl.getWidth();
	var sHeight = oControl.getHeight();
	sWidth && rm.addStyle("width", sWidth);
	sHeight && rm.addStyle("height", sHeight);

	rm.writeClasses();
	rm.writeStyles();
	rm.write(">");

	oControl.getContent().forEach(function(oContent) {
		rm.renderControl(oContent);
	});

	rm.write("</div>");
};