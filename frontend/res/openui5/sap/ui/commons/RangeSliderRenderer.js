/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.RangeSliderRenderer");jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.ui.commons.SliderRenderer");sap.ui.commons.RangeSliderRenderer=sap.ui.core.Renderer.extend(sap.ui.commons.SliderRenderer);
sap.ui.commons.RangeSliderRenderer.renderGrip=function(r,s){var a=r;a.write('<DIV');a.writeAttribute('id',s.getId()+'-grip');if(s.getEnabled()){a.writeAttribute('tabIndex','0')}else{a.writeAttribute('tabIndex','-1')}a.writeAttribute('class','sapUiSliGrip');a.writeAttribute('title',s.getValue());a.writeAccessibilityState(s,{role:'slider',controls:s.getId()+'-grip2',orientation:'horizontal',valuemin:s.getMin(),valuemax:s.getValue2(),live:'assertive',disabled:!s.getEditable()||!s.getEnabled(),describedby:s.getTooltip_AsString()?(s.getId()+'-Descr '+s.getAriaDescribedBy().join(" ")):undefined});a.write('>&#9650;</DIV>');a.write('<DIV');a.writeAttribute('id',s.getId()+'-grip2');if(s.getEnabled()){a.writeAttribute('tabIndex','0')}else{a.writeAttribute('tabIndex','-1')}a.writeAttribute('class','sapUiSliGrip');a.writeAttribute('title',s.getValue2());a.writeAccessibilityState(s,{role:'slider',controls:s.getId()+'-grip',orientation:'horizontal',valuemin:s.getValue(),valuemax:s.getMax(),live:'assertive',disabled:!s.getEditable()||!s.getEnabled(),describedby:s.getTooltip_AsString()?(s.getId()+'-Descr '+s.getAriaDescribedBy().join(" ")):undefined});a.write('>&#9650;</DIV>')};
sap.ui.commons.RangeSliderRenderer.controlAdditionalCode=function(r,s){r.addClass('sapUiRSli')};