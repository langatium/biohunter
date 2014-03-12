/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.demokit.UI5EntityCueCardRenderer");sap.ui.demokit.UI5EntityCueCardRenderer={};
sap.ui.demokit.UI5EntityCueCardRenderer.render=function(d,C){var N=C.getNavigable();var D=C.getStyle()==sap.ui.demokit.UI5EntityCueCardStyle.Demokit;function e(t){while(t.slice(-2)=="[]"){t=t.slice(0,-2)}if(t.indexOf("sap.ui.core.")!=0)return false;t=t.slice("sap.ui.core.".length);return"boolean int float number function object string void any ".indexOf(t)>=0}d.write("<div");d.writeControlData(C);d.writeAttribute("class","sapDkCueCd");d.write(">");var f=0;if(!C.getCollapsible()||C.getExpanded()){var g=C._getDoc();function h(o){var r=[];for(var s in o){r.push(s)}r.sort(function(a,b){var k=o[a].deprecation?1:0;var p=o[b].deprecation?1:0;var c=k-p;if(c===0&&a!==b){c=a<b?-1:1}return c});return r};function l(i){return" class='"+((i%2)?"sapDkCueCdOdd":"sapDkCueCdEven")+"'"};function m(k){if(k===0){return"Property of type "}else if(k===1||k===2){return"Aggregation of type "}else if(k===3||k===4){return"Association of type "}else if(k===6){return"Event parameter of type "}else if(k===7){return"Return value of type "}else if(k===6){return"Method parameter of type "}else{return""}};function q(p,t,c){if(t){if(c==="0..n"){return q(p,t)+"[]"}var b=e(t);var s=jQuery.sap.encodeHTML(t.split(".").slice(-1)[0]);var a=jQuery.sap.encodeHTML(m(p.kind)+t);if(N&&(!D||!b)){return"<a class='sapDkLnk' id='"+C.getId()+"-l-"+(f++)+"' data-sap-ui-entity='"+t+"' title='"+a+"'>"+s+"</a>"}else{return"<span title='"+t+"'>"+s+"</span>"}}return''};function u(o){return o.deprecation?" sapDkCueCdDeprct":""};function v(o){return o.deprecation?"<br><i><b>Deprecated</b>: "+o.deprecation+"</i>":""};if(g){d.write("<table>");if(!D){d.write("<tr><td colspan='3' class='sapDkCueCdHd0",u(o),"'>",C.getEntityName(),"</td></tr>");d.write("<tr><td colspan='3' class='sapDkCueCdDoc'>",g.doc||'',v(g),"</td></tr>")}if(g.metatype===".control"){var w=jQuery.extend({},g.properties,g.aggregations,g.associations);var n=h(w);if(n.length>0){d.write("<tr><td colspan='3' class='sapDkCueCdHd'>","Properties, Aggregations, Associations","</td></tr>");for(var i=0;i<n.length;i++){var P=w[n[i]];d.write("<tr",l(i),"><td class='sapDkCueCdName",u(P),"'>",n[i],"</td>","<td class='sapDkCueCdType'>",q(P,P.type,P.cardinality),"</td>","<td class='sapDkCueCdDoc'>",P.doc,v(P),"</td></tr>")}}var n=h(g.events);if(n.length>0){d.write("<tr><td colspan='3' class='sapDkCueCdHd'>","Events","</td></tr>");for(var i=0;i<n.length;i++){var E=g.events[n[i]];d.write("<tr",l(i),"><td class='sapDkCueCdName",u(E),"'>",n[i],"</td>","<td class='sapDkCueCdType'>","&nbsp","</td>","<td class='sapDkCueCdDoc'>",E.doc,v(E),"</td></tr>");var x=h(E.parameters);for(var j=0;j<x.length;j++){var y=x[j];var z=E.parameters[y];d.write("<tr",l(i),"><td class='sapDkCueCdSubName",u(z),"'>",y,"</td>","<td class='sapDkCueCdType'>",q(z,z.type),"</td>","<td class='sapDkCueCdDoc'>",z.doc,v(z),"</td></tr>")}}}var n=h(g.methods);if(n.length>0){d.write("<tr><td colspan='3' class='sapDkCueCdHd'>","Methods","</td></tr>");for(var i=0;i<n.length;i++){var M=g.methods[n[i]];var A=n[i]+"(";for(var j=0;j<M.parameters.length;j++){if(j>0){A+=","}A+=M.parameters[j].name}A+=")";d.write("<tr",l(i),"><td class='sapDkCueCdName",u(M),"' colspan='2'>",A,"</td>","<td class='sapDkCueCdDoc'>",M.doc,v(M),"</td></tr>");for(var j=0;j<M.parameters.length;j++){var z=M.parameters[j];d.write("<tr",l(i),"><td class='sapDkCueCdSubName",u(z),"'>",z.name,"</td>","<td class='sapDkCueCdType'>",q(z,z.type),"</td>","<td class='sapDkCueCdDoc'>",z.doc,v(z),"</td></tr>")}if(M.type!=="sap.ui.core/void"){d.write("<tr",l(i),"><td class='sapDkCueCdSubName'>","<i>returns</i>","</td>","<td class='sapDkCueCdType'>",q(M,M.type),"</td>","<td class='sapDkCueCdDoc'>","&nbsp;","</td></tr>")}}}}if(g.metatype===".type"){var n=h(g.values);if(n.length>0){d.write("<tr><td colspan='3' class='sapDkCueCdHd",u(g),"'>","Values","</td></tr>");for(var i=0;i<n.length;i++){var V=g.values[n[i]];d.write("<tr",l(i),"><td class='sapDkCueCdName",u(V),"'>",n[i],"</td>","<td class='sapDkCueCdType'>","&nbsp;","</td>","<td class='sapDkCueCdDoc'>",V.doc,v(V),"</td></tr>")}}if(g.pattern){d.write("<tr><td colspan='3' class='sapDkCueCdHd'>","Constraints","</td></tr>");d.write("<tr",l(i),"><td class='sapDkCueCdName'>","pattern","</td>","<td>","&nbsp;","</td>","<td class='sapDkCueCdDoc'>",g.pattern,"</td></tr>")}}d.write("</table>")}}if(C.getCollapsible()){d.renderControl(C._oShowCueCardLink)}d.write("</div>")};
