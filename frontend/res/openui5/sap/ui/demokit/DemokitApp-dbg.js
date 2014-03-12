jQuery.sap.declare("sap.ui.demokit.DemokitApp");
jQuery.sap.require("sap.ui.demokit.library");
jQuery.sap.require("sap.ui.demokit.TagCloud");
jQuery.sap.require("sap.ui.demokit.Tag");
jQuery.sap.require("sap.ui.ux3.Shell");
jQuery.sap.require("sap.ui.ux3.NavigationItem");
jQuery.sap.require("sap.ui.commons.DropdownBox");
jQuery.sap.require("sap.ui.commons.layout.AbsoluteLayout");
jQuery.sap.require("sap.ui.core.ListItem");
jQuery.sap.require("sap.ui.commons.Splitter");
jQuery.sap.require("sap.ui.commons.SearchProvider");
jQuery.sap.require("sap.ui.commons.Label");
jQuery.sap.require("testsuite.js.testfwk");

sap.ui.demokit.DemokitApp = function(sTitle, sVersion, aThemes) {
	
	function basename(sPath) { 
		return sPath.split('/').slice(0,-1).join('/') + '/'; 
	}

	// Calculate Application Base HRef and Pathname
	var sBaseUrl = window.location.href;
	if (sBaseUrl.indexOf('#') >= 0) {
		// remove the hash from the URL (otherwise the URL + hash is used as base URL)
		sBaseUrl = sBaseUrl.slice(0, sBaseUrl.indexOf('#'));
	} 
	this.sBaseUrl = basename(sBaseUrl);
	this.sBasePathname = basename(window.location.pathname);
	this._iPendingCalls = 0;
	this._mBestMatchingPage = {};
	this._aTopLevelNavItems = [];
	this._aThemes = aThemes || ["sap_bluecrystal", "sap_goldreflection", "sap_platinum", "sap_ux", "sap_mvi", "sap_hcb"];
	this._sTheme = this._aThemes[0]; // 'aThemes' must contain at least one theme
	this._sCurrentContent = null;
	this._mAliases = {};
	
	// view state
	this._sTitleStr = sTitle;
	this._sVersionStr = sVersion; 
	this._sSelectedWorkSetItem = null;

}

/**
 * Checks whether the given URL references a page within the demokit app.
 * If so, only the internal part of the path is returned, otherwise null.  
 */
sap.ui.demokit.DemokitApp.prototype.calcRelativeUrl = function (sUrl) {
	return sUrl.indexOf(this.sBaseUrl) == 0 ? sUrl.substring(this.sBaseUrl.length) : null; 
};

sap.ui.demokit.DemokitApp.prototype.registerPageForType = function(sUrl, aControls) {
	this._mBestMatchingPage[aControls[0]] = sUrl;
};

sap.ui.demokit.DemokitApp.prototype.findPageForType = function(sType) {
	return this._mBestMatchingPage[sType] || "docs/api/symbols/" + sType + ".html"
};

sap.ui.demokit.DemokitApp.prototype._addPendingCall = function() {
	this._iPendingCalls++;
};

sap.ui.demokit.DemokitApp.prototype._removePendingCall = function() {
	this._iPendingCalls--;
};

sap.ui.demokit.DemokitApp.prototype.addIndex = function(sId, oSettings) {
	oSettings = oSettings || {};
	
	var that = this;
	
	var oTLNItem = {
		id : "mi-" + sId,
		text : oSettings.caption || sId,
		visible : (typeof oSettings.visible === "boolean") ? oSettings.visible : true,
		themable : oSettings.themable || false 
	};
	this._aTopLevelNavItems.push(oTLNItem);
	this._createWorksetItem(oTLNItem);
	if ( oSettings.index ) {
		if ( oSettings.extend ) {
			oSettings.extend(oSettings.index, function(oData){
				that._setIndexData(sId, oData);
			});
		}else{
			that._setIndexData(sId, oSettings.index);
		}
	} else if ( oSettings.url ) {
		this._loadIndexFromUrl(sId, oSettings.url, oSettings.transformer, oSettings.extend);
	}
};

sap.ui.demokit.DemokitApp.prototype._loadIndexFromUrl = function(sId, sUrl, fnTransformer, fnExtend) {
	var that = this;

	jQuery.ajax({
		url : sUrl, 
		dataType : sUrl.slice(-4) == ".xml" ? "xml" : "json",
		error : function(xhr, status, e) {
			that._removePendingCall();
			jQuery.sap.log.error("failed to load index '" + sId + "' from '" + sUrl + "': " + status + ", " + e); 
			var oTopLevelNavItem = that._findIndexById(sId);
			if ( oTopLevelNavItem ) {
				// TODO find better way to handle errors... NavigationItem unfortunately has no 'enabled' 
				oTopLevelNavItem.navItem.setVisible(false);
			}
		},
		success : function(oData, sStatus, oXHR) { 
			var oIndex = fnTransformer ? fnTransformer.call(this, oData) : oData;
			if ( fnExtend ) {
				fnExtend(oIndex, function(oData){
					that._removePendingCall();
					that._setIndexData(sId, oData);
				});
			}else{
				that._removePendingCall();
				that._setIndexData(sId, oIndex);
			}
		}
	});
	this._addPendingCall();
};

sap.ui.demokit.DemokitApp.prototype._setIndexData = function(sId, oIndex) {
	var that=this;
	
	var oTopLevelNavItem = this._findIndexById(sId);
	if ( oTopLevelNavItem ) {
		oTopLevelNavItem.prefix = oIndex.prefix;
		oTopLevelNavItem.ref = oIndex.ref;
		oTopLevelNavItem.links = oIndex;
		
		var iNodes=0;
			
		function processNode(oNode) {
			iNodes++;
			if ( oNode.ref && oNode.controls ) {
				var aControls = jQuery.isArray(oNode.controls) ? oNode.controls : oNode.controls.split(/,/); 
				that.registerPageForType(oNode.ref, aControls);
			}
			if ( oNode.alias && oNode.ref ) {
				that._mAliases[oNode.alias] = oNode.ref;
			}
			if ( oNode.links ) {
				for(var i=0; i<oNode.links.length; i++){
					processNode(oNode.links[i]);
				}
			}
		}
		
		processNode(oIndex);
		oTopLevelNavItem._iTreeSize = iNodes;
		this._createNavigationTree(oTopLevelNavItem);
		oTopLevelNavItem.navItem.setEnabled(!!oTopLevelNavItem._oTree);
		oTopLevelNavItem.navItem.setHref(oIndex.ref);
	}
};

sap.ui.demokit.DemokitApp.prototype._findIndexById = function(sId) {
	for(var i=0; i<this._aTopLevelNavItems.length; i++) {
		var oTopLevelNavItem = this._aTopLevelNavItems[i];
		if ( oTopLevelNavItem.id === "mi-" + sId ) {
			return oTopLevelNavItem;
		}
	}
};

sap.ui.demokit.DemokitApp.prototype.getPagesForCategory = function(sCategory) {
	var oTopLevelNavItem = this._findIndexById("controls"); // TODO get rid of hard coded index id
	if ( !oTopLevelNavItem || !oTopLevelNavItem.links ) {
		return sap.ui.demokit.DemokitApp.RETRY_LATER;
	}
	var aPaths = sCategory.split('/');
	var o = oTopLevelNavItem.links;
	for(var i=0; i<aPaths.length; i++) {
		var sPath = aPaths[i];
		for(var j=0; j<o.links.length; j++) {
			if ( sPath == o.links[j].text ) {
				break;
			}
		}
		if ( j==o.links.length ) {
			return [];
		}
		o=o.links[j];					
	}
	return o.links || [];
};

sap.ui.demokit.DemokitApp.RETRY_LATER = -2;

sap.ui.demokit.DemokitApp.prototype.findIndexForPage = function(sUrl) {
	
	function findURL(oNode, sUrl) {
		if ( sUrl && oNode.ref && sUrl.indexOf(oNode.ref) === 0 ) {
			return true;
		}
		if ( oNode.links ) {
			for(var i=0; i<oNode.links.length; i++) {
				if ( findURL(oNode.links[i], sUrl) ) {
					return true;
				}
			}
		}
		return false;
	}
	
	for(var i=0; i<this._aTopLevelNavItems.length; i++){
		if ( this._aTopLevelNavItems[i].links && findURL(this._aTopLevelNavItems[i].links, sUrl) ) {
			return i;
		}
	}
	jQuery.sap.log.error("could not find " + sUrl + " in nav tree");
	
	return this._iPendingCalls > 0 ? sap.ui.demokit.DemokitApp.RETRY_LATER : -1;
};

sap.ui.demokit.DemokitApp.DEFAULT_TLN_ITEM = 0;

// ---- View ------------------------------------------------------

sap.ui.demokit.DemokitApp.prototype._createNavigationTree = function(oTopLevelNavItem) {
	
	var that=this;
	var iNodes=0;
	
	function selected(oEvent) {
		that.navigateTo(oEvent.getSource()._ref_);
	}
	
	function initLinks(oTarget, aLinks, iLevel) {
		for(var i=0; i<aLinks.length; i++){
			var oNode = new sap.ui.commons.TreeNode({
				text: aLinks[i].text, 
				tooltip: aLinks[i].tooltip, 
				expanded: iLevel<4, 
				selectable: !!aLinks[i].ref, 
				icon: aLinks[i].ico || null,
				selected: selected
			});
			oNode._ref_ = aLinks[i].ref;
			oTarget.addNode(oNode);
			iNodes++;
			if (aLinks[i].links && aLinks[i].links.length > 0) { 
				initLinks(oNode, aLinks[i].links, iLevel+1);
			}
		}
	};

	if (oTopLevelNavItem._oTree) return;
	
	var oTree = new sap.ui.commons.Tree(oTopLevelNavItem.id + "-index", {
		showHeader: true, 
		width: "100%", 
		height: "100%", 
		showHorizontalScrollbar: true
	});
	oTree.addStyleClass("sapUiTreeWithHeader");
	initLinks(oTree, oTopLevelNavItem.links.links, 0);
	oTopLevelNavItem._oTree = oTree;	
	oTopLevelNavItem._iTreeSize = iNodes;
};

sap.ui.demokit.DemokitApp.prototype._createWorksetItem = function(oTLNItem) {
	var oNavItem = oTLNItem.navItem = new sap.ui.ux3.NavigationItem({
		key: oTLNItem.id, 
		text: oTLNItem.text, 
		href: "#" + oTLNItem.ref,
		visible : oTLNItem.visible,
		enabled: false
	});
	oNavItem._itemData_ = oTLNItem;
	if ( this._oShell ) {
		this._oShell.addWorksetItem(oNavItem);
	}
};

sap.ui.demokit.DemokitApp.prototype.createUI = function(bSearchSupported, sInitialPage) {
	
	var that=this;
	var sIconPrefix = "theme/img/themeswitch_";
	var THEMES = sap.ui.testfwk.TestFWK.THEMES;
	
	this._oThemeSwitch = new sap.ui.commons.DropdownBox({
		change: [this._handleThemeChanged, this],
		items: jQuery.map(this._aThemes, function(sThemeId) { 
			return new sap.ui.core.ListItem({text: THEMES[sThemeId], key: sThemeId});
		}),
		value: THEMES[this._sTheme]
	});

	this._oThemeSwitchPopup = new sap.ui.ux3.ToolPopup({
		title:"Select a theme",
		icon:sIconPrefix+"regular.png", //TODO find a proper icon
		iconHover:sIconPrefix+"hover.png", //TODO find a proper icon
		iconSelected:sIconPrefix+"selected.png", //TODO find a proper icon
		content:[ this._oThemeSwitch ],
		initialFocus: this._oThemeSwitch
	});
	
	var oContent = new sap.ui.core.HTML("content", {
		content: "<iframe id=\"content\" name=\"content\" src=\"about:blank\" frameborder=\"0\" onload=\"onContentLoaded();\"></iframe>"
	});

	var oSidePanelLayout = this._oSidePanelLayout = new sap.ui.commons.layout.AbsoluteLayout();
	// TODO oSidePanelLayout.addContent(oDemokit._aTopLevelNavItems[0]._oTree, {top:"0", bottom:"0", left:"0", right:"0"});
	
	var oShell = this._oShell = new sap.ui.ux3.Shell({
		appTitle: this._sTitleStr,
		showLogoutButton: false,
		showInspectorTool: false,
		showFeederTool: false,
		designType: "Crystal",
		showSearchTool: bSearchSupported, 
		fullHeightContent: true,
		toolPopups: [ this._oThemeSwitchPopup ],
		search: function(oEvent){
			that.navigateTo("search.html?q=" + encodeURIComponent(oEvent.getParameter("text")));
			that._oShell._getSearchTool().close();
		},
		worksetItemSelected: function(oEvent){
			var oNavItem = oEvent.getParameter("item");  
			if ( oNavItem.getEnabled() ) {
				// navigate to the default reference
				that.navigateTo(oNavItem._itemData_.ref);
			} else {
				oEvent.preventDefault();
			}
		},
		content:[
			new sap.ui.commons.Splitter("demokitSplitter", {
				width:"100%",
				height:"100%",
				splitterPosition:"0%",
				splitterBarVisible:false,
				firstPaneContent:[oSidePanelLayout],
				secondPaneContent:[oContent],
				showScrollBars:false
			})
		],
		headerItems:[new sap.ui.commons.Label("version", {text: this._sVersionStr})]
	});	
	this._oShell.addStyleClass("sapDkShell");
	
	var oSearchField = oShell.getSearchField();
	oSearchField.setEnableListSuggest(true);
	oSearchField.setShowListExpander(false);
	oSearchField.setVisibleItemCount(5);
	oSearchField.setSearchProvider(new sap.ui.commons.SearchProvider({
		suggestType: "json",
		suggestUrl: "/demokit/suggest?q={searchTerms}"
	}));

	jQuery.each(oDemokit._aTopLevelNavItems, function(i, oTLNItem) {
		oShell.addWorksetItem(oTLNItem.navItem);
	});

	// request top keywords
	jQuery.ajax({
		url : "keywords?kind=tags&max=50",
		dataType : "json",
		success : function(data, status, xhr) { 
			if ( data && data[0] && data[0].success && data[0].keywords && data[0].keywords.length ) {
				addTagCloud(data[0].keywords);
				oSearchField.setWidth("80%");
			}
		} 
	})
		
	function addTagCloud(aKeywords) {
		
	 	var oTagCloud = new sap.ui.demokit.TagCloud({
	 		minFontSize:15, 
	 		maxFontSize:30,
	 		press : function (oEvent) {
		 		var term = sap.ui.getCore().byId(oEvent.getParameter("tagId")).getText();
		 		oShell.fireSearch({text : term});
		 	}
	 	}).addStyleClass("grTagCloud");
	 	for(var i=0; i<aKeywords.length; i++) {
	 		oTagCloud.addTag(new sap.ui.demokit.Tag({ text : aKeywords[i].tag, weight : aKeywords[i].score }));
	 	}
	 	
	 	// enhance the original search tool
	 	oShell._getSearchTool && oShell._getSearchTool().addContent(oTagCloud);
	}

	setTimeout(function() {
		that.navigateTo(sInitialPage);
	}, 200);
	
	jQuery(function(){
		jQuery("body").append("<div id=\"logo\"><img id=\"logoico\"><img id=\"logotxt\"></div>");
		jQuery("#logoico").attr("src", "resources/sap/ui/core/mimes/logo/icoonly_black_100x80.png").addClass("sapUiImg");
		jQuery("#logotxt").attr("src", "resources/sap/ui/core/mimes/logo/txtonly_32x32.png").addClass("sapUiImg");
	});
};

sap.ui.demokit.DemokitApp.prototype.placeAt = function(sId) {
	this._oShell.placeAt(sId);
};

// ---- controller ----------------------------------------------------

sap.ui.demokit.DemokitApp.prototype.navigateTo = function(sPageName, bSkipSetHash, bSkipSwitchLocation) {
	
	var that = this;
	
	// normalize page name (from hash)
	sPageName = sPageName.indexOf("#") === 0 ? sPageName.substring(1) : sPageName;
	// resolve aliases
	sPageName = this._mAliases[sPageName] || sPageName;
	
	if (this._sCurrentContent == sPageName) {
		return;
	}

	var topNavIdx = this.findIndexForPage(sPageName);
	if ( topNavIdx === sap.ui.demokit.DemokitApp.RETRY_LATER ) {
		setTimeout(function() {
			that.navigateTo(sPageName, bSkipSetHash, bSkipSwitchLocation);
		}, 200);
		return;
	}
		
	var oNewTLNItem = topNavIdx >= 0 ? this._aTopLevelNavItems[topNavIdx] : null;
	var oShell = this._oShell;
	var oSplitter = sap.ui.getCore().byId("demokitSplitter");
	if ( oNewTLNItem && oNewTLNItem._iTreeSize <= 1 ) {
		if (oSplitter.getSplitterBarVisible()) {
			var sOldPos = oSplitter.getSplitterPosition();
			if (sOldPos !== "0%") {
				oSplitter._oldPos = sOldPos;
				oSplitter.setSplitterPosition("0%");
			}
			oSplitter.setSplitterBarVisible(false);
		}
	} else {
		if (!oSplitter.getSplitterBarVisible()) {
			var sOldPos = oSplitter._oldPos || "20%";
			oSplitter.setSplitterPosition(sOldPos);
			oSplitter.setSplitterBarVisible(true);
		}
	}
	
	var oContentWindow = jQuery("#content")[0].contentWindow;
	this._sCurrentContent = sPageName;

	function findAndSelectTreeNode(sPageName, oParent, bClearSelection) {
		if ( oParent ) {
			if(bClearSelection && oParent.getSelectedNode && oParent.getSelectedNode()) {
				oParent.getSelectedNode().setIsSelected(false);
			}
			var aNodes = oParent.getNodes();
			for(var i=0; i<aNodes.length; i++){
				if(aNodes[i]._ref_ && aNodes[i]._ref_.indexOf(sPageName) >= 0){
					aNodes[i].setIsSelected(true);
					var par = oParent;
					while(par instanceof sap.ui.commons.TreeNode){
						par.expand();
						par = par.getParent();
					}
					return aNodes[i];
				}else{
					var node = findAndSelectTreeNode(sPageName, aNodes[i], false);
					if(node) return node;
				}
			}
		}
		return null;
	}

	//Update Top Level Navigation and Navigation Tree
	var oSelectedNavEntry = null;
	var oNewNavItem = oNewTLNItem && oNewTLNItem.navItem;
	if ( oNewNavItem && this._sSelectedWorkSetItem != oNewNavItem.getId() ) {
		oNewNavItem.setVisible(true);
		oShell.setSelectedWorksetItem(oNewNavItem);
		this._oSidePanelLayout.removeAllContent();
		if ( oNewTLNItem._oTree ) {
			this._oSidePanelLayout.addContent(oNewTLNItem._oTree);
		}
		oSelectedNavEntry = findAndSelectTreeNode(sPageName, oNewTLNItem._oTree, true);

		//Hide/Show Theme Switch
		if ( oNewTLNItem.themable ) {
			if(oShell.getToolPopups().length == 0){
				oShell.addToolPopup(this._oThemeSwitchPopup );
			}
		} else {
			oShell.removeAllToolPopups();
		}
	} else {
		oSelectedNavEntry = findAndSelectTreeNode(sPageName, this._oSidePanelLayout.getContent()[0], true);
		//If no entry is found, try again without hash
		if (!oSelectedNavEntry && sPageName.indexOf("#") > 0) {
			var sShortName = sPageName.substr(0, sPageName.indexOf("#") - 1);
			oSelectedNavEntry = findAndSelectTreeNode(sShortName, this._oSidePanelLayout.getContent()[0]);
		}

	}

	sap.ui.getCore().applyChanges();
	this._sSelectedWorkSetItem = oShell.getSelectedWorksetItem();

	// Update IFrame content and URL hash
	if(!bSkipSetHash) {
		window.location.hash = sPageName;
	}
	
	if(!bSkipSwitchLocation){
		
		bIgnoreIFrameOnLoad = true;
		
		// set fakeOS for mobile test pages (BUT not for mobile demo apps)
		var isMobilePage = sPageName && sPageName.match(/\/sap\/me?\//);
		var isMobileDemoApp = sPageName && sPageName.indexOf("sap/m/demokit") !== -1;
		var sFakeOS = (isMobilePage && !isMobileDemoApp) ? "?sap-ui-xx-fakeOS=ios" : "";
		
		oContentWindow.location.replace((sPageName.indexOf("/") == 0 ? "" : this.sBasePathname) + sPageName + sFakeOS);
	}

}

sap.ui.demokit.DemokitApp.prototype._handleThemeChanged = function(oEvent) {
	var newTheme = oEvent.getParameter("newValue");
	for(var x in sap.ui.testfwk.TestFWK.THEMES){
		if(sap.ui.testfwk.TestFWK.THEMES[x] == newTheme){
			this._sTheme = x;
			this._applyTheme();
			oEvent.getSource().getParent().close();
			break;
		}
	}
}

sap.ui.demokit.DemokitApp.prototype._applyTheme = function() {
	var oContentWindow = jQuery("#content")[0].contentWindow;
	var sIFrameContent = this.calcRelativeUrl(oContentWindow.location.href);
	var topNavIdx = sIFrameContent ? this.findIndexForPage(sIFrameContent) : -1;

	if (sIFrameContent 
			&& topNavIdx >= 0 && this._aTopLevelNavItems[topNavIdx].themable 
			&& oContentWindow 
			&& oContentWindow.sap 
			&& oContentWindow.sap.ui
			&& oContentWindow.sap.ui.getCore ) {
		
		//Find supported themes
		var isMobilePage = sIFrameContent.match(/\/sap\/me?\//);
		var aSupportedThemes = oContentWindow.sap.ui.demokit && oContentWindow.sap.ui.demokit._supportedThemes ? oContentWindow.sap.ui.demokit._supportedThemes : isMobilePage ? ["sap_bluecrystal"] : this._aThemes;
		
		//Update theme switch 
		var aItems = this._oThemeSwitch.getItems();
		for(var i=0; i<aItems.length; i++) {
			aItems[i].setEnabled(jQuery.inArray(aItems[i].getKey(), aSupportedThemes) >= 0);
		}
		
		//Current theme is not supported -> Use a different one 
		if(jQuery.inArray(this._sTheme, aSupportedThemes) < 0) {
			this._sTheme = aSupportedThemes[0];
			this._oThemeSwitch.setValue(sap.ui.testfwk.TestFWK.THEMES[oDemokit._sTheme]); 
		}

		oContentWindow.sap.ui.getCore().applyTheme(this._sTheme);
	} 
};


(function() {
	
	function resolve(oLink, sLibUrl){
		if(oLink.ref && oLink.resolve === "lib"){
			oLink.ref = sLibUrl + oLink.ref;
		}
		if(oLink.links){
			for(var i=0; i<oLink.links.length; i++){
				resolve(oLink.links[i], sLibUrl);
			}
		}
	}
	
	function merge(oNode1, oNode2){
		if(oNode1.key != oNode2.key || !oNode2.links || oNode2.links.length == 0){
			return;
		}
		if(!oNode1.links){
			oNode1.links = oNode2.links;
			return;
		}
		
		function findNodeWithKey(oNode, key){
			for(var i=0; i<oNode.links.length; i++){
				if(oNode.links[i].key === key){
					return oNode.links[i];
				}
			}
			return null;
		}
		
		var oSubNode;
		
		for(var i=0; i<oNode2.links.length; i++){
			oSubNode = oNode2.links[i];
			if(!oSubNode.key){
				oNode1.links.push(oSubNode);
			}else{
				var oNode = findNodeWithKey(oNode1, oSubNode.key);
				if(oNode){
					merge(oNode, oSubNode);
				}else{
					oNode1.links.push(oSubNode);
				}
			}
		}
	}
	
	function finalize(oIndexData, fnCallback, aLibs, oDocIndices){
		for(var j=0; j<aLibs.length; j++){
			var oData = oDocIndices[aLibs[j]];
			if(oData && oData.docu){
				resolve(oData.docu, oData.libraryUrl);
				merge(oIndexData, oData.docu);
			}
		}
		
		fnCallback(oIndexData);
	}
	
	sap.ui.demokit.DemokitApp.extendDevGuide = function(oIndexData, fnCallback) {
		jQuery.sap.require("sap.ui.core.util.LibraryInfo");
		var libInfo = new sap.ui.core.util.LibraryInfo();
		var sUrl = "discovery/all_libs";
		
		jQuery.ajax({
			url : sUrl,
			dataType : "json",
			error : function(xhr, status, e) {
				jQuery.sap.log.error("failed to load library list from '" + sUrl + "': " + status + ", " + e); 
				fnCallback(oIndexData);
			},
			success : function(oData, sStatus, oXHR) { 
				var libs = oData["all_libs"];
				if(!libs){
					jQuery.sap.log.error("failed to load library list from '" + sUrl + "': " + sStatus + ", Data: " + libs); 
					fnCallback(oIndexData);
					return;
				}
				
				var count = 0,
					len = libs.length,
					oDocIndices = {},
					aLibs = [],
					libName;
				for(var i=0; i<len; i++){
					libName = libs[i].entry.replace(/\//g, ".");
					aLibs.push(libName);
					libInfo._getDocuIndex(libName, function(oExtensionData){
						oDocIndices[oExtensionData.library] = oExtensionData;
						count++;
						if(count == len) {
							finalize(oIndexData, fnCallback, aLibs, oDocIndices);
						}
					});
				}
			}
		});
	}

})();
