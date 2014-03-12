
var splitApp;
function initApp(){
    splitApp = new sap.m.SplitApp("BioXYZ", {});
    
    var oDetailPage1 = new sap.m.Page("IndexMap", {
   title : "Index Map",
   content : [ new sap.ui.core.HTML("mapArea", {
                content: "<div id='map_area'></div>",
                preferDOM : false,                      
                afterRendering : function(e) {
                    var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
                	var center = new google.maps.LatLng(52.375892, 9.73201);

                    var map_canvas = document.getElementById('map_area');
                    var map_options = {
                        center: new google.maps.LatLng(52.375892, 9.73201),
                        zoom: 12,
                        mapTypeId: google.maps.MapTypeId.TERRAIN
                    };
                    
                    var canvas_height = 700;
                    map_canvas.style.height=canvas_height+"px";
                    
                    window.map = new google.maps.Map(map_canvas, map_options);

					var marker = new google.maps.Marker({
                    	position: center,
                    	map: window.map,
                    	title: "You are here"
                    });

					var infoWindow = new google.maps.InfoWindow({
						content: "You are here"
					});

					infoWindow.open(window.map, marker);

					var marker2 = new google.maps.Marker({
                    	position: new google.maps.LatLng(52.345892, 9.73201),
                    	map: window.map,
                    	icon: iconBase + "parks.png"
                    });

					var marker3 = new google.maps.Marker({
                    	position: new google.maps.LatLng(52.408892, 9.753201),
                    	map: window.map,
                    	icon: iconBase + "parks.png"
                    });

                     new google.maps.Marker({
                    	position: new google.maps.LatLng(52.38892, 9.700201),
                    	map: window.map,
                    	icon: iconBase + "parks.png"
                    });

                    window.pointArray = new google.maps.MVCArray();
                    var heatmap = new google.maps.visualization.HeatmapLayer({
                        data: pointArray,
                        dissipating: false,
                        map: map
                    });
                }
        })
	     ]
});

var oDetailPage2 = new sap.m.Page("Profile", {
   title : "Profile",
   content : [ new sap.m.Image({
      src: "ccr1.jpg"
    }), new sap.m.Label({text: "Username: SuziQ"}), new sap.m.Label({text: "About me: I am an enthusiastic animal\n and plant lover who enjoys spending time outside searching for different organisms and wildlife specimens. "}),
   		new sap.m.Label({text: "Date Joined: 02/07/2008"}),
   		new sap.m.Button({text: "New Sample"}),
   		new sap.m.Button({text: "Points: 312"}),
   		new sap.m.Button({text: "Pending Submissions: 3"}),
   		new sap.m.TextArea({
      value : "{/Text}",
      rows : 30
    })
	     ]
});

var oDetailPage4 = new sap.m.Page("Images", {
   title : "Images",
   content : [ new sap.m.Image({
      src: "rattlesnake3.jpg"
    }), new sap.m.Label({text: "Comments: An amazing animal is being displayed today, the deadly rattlesnake."}), new sap.m.Label({text: "Date submitted: 09/12/2003"}),
   new sap.m.Image({
      src: "709px-Sandal_leaf.jpg"
    }), new sap.m.Label({text: "Comments: An amazing animal is being displayed today, the deadly rattlesnake."}), new sap.m.Label({text: "Date submitted: 09/12/2003"}),
   new sap.m.Image({
      src: "Baum.jpg"
    }), new sap.m.Label({text: "Comments: An amazing animal is being displayed today, the deadly rattlesnake."}), new sap.m.Label({text: "Date submitted: 09/12/2003"}),
   new sap.m.Image({
      src: "Colourful-Flowers-Wallpapers-HD-960x720.jpg"
    }), new sap.m.Label({text: "Comments: An amazing animal is being displayed today, the deadly rattlesnake."}), new sap.m.Label({text: "Date submitted: 09/12/2003"}),
   new sap.m.Image({
      src: "crab5.jpg"
    }), new sap.m.Label({text: "Comments: An amazing animal is being displayed today, the deadly rattlesnake."}), new sap.m.Label({text: "Date submitted: 09/12/2003"}),
   new sap.m.Image({
      src: "hyena1.jpg"
    }), new sap.m.Label({text: "Comments: An amazing animal is being displayed today, the deadly rattlesnake."}), new sap.m.Label({text: "Date submitted: 09/12/2003"}),
   new sap.m.Image({
      src: "phoenix.jpg"
    }), new sap.m.Label({text: "Comments: An amazing animal is being displayed today, the deadly rattlesnake."}), new sap.m.Label({text: "Date submitted: 09/12/2003"})
               
	     ]
});

var oDetailPage5 = new sap.m.Page("SampleSubmission", {
   title : "Sample Submission",
   content : [ new sap.m.Label({
		 text : "SAMPLE SUBMISSION - THANK YOU"
               }),
   new sap.m.Input({
          type: sap.m.InputType.Text,
          placeholder: 'Enter your username here...'
        }),
   new sap.m.Input({
          type: sap.m.InputType.Text,
          placeholder: 'Enter the submission title here...'
        }),
   new sap.m.Input({
          type: sap.m.InputType.Text,
          placeholder: 'Description...'
        }),
   new sap.m.DateTimeInput({
      type: sap.m.DateTimeInputType.DateTime,
      placeholder: 'Enter Date & Time ...'
    }),
   new sap.m.Input({
          type: sap.m.InputType.Url,
          placeholder: 'Enter URL ...'
        }),
   new sap.m.Button({text: "Submit"})
	     ]
});

var oDetailPage6 = new sap.m.Page("PendingSamples", {
	title : "Pending Samples",
	// pic in question
	content : [new sap.m.Panel({
      infoToolbar: new sap.m.Toolbar({
        content: [
          new sap.m.Label({ text: "Pending Sample # - Pending Status: Completed"}),
          new sap.m.ToolbarSpacer()
        ]
      }),
      content: [
        new sap.ui.layout.HorizontalLayout({
          content : [
            new sap.m.Image({
              src: "rattlesnake3.jpg",
              width: "10em",
              height: "10em"
            })
          ]
        }),
        new sap.m.Text({
          text: "{/Text}"
        })
      ]
    }),
    new sap.m.Panel({
      infoToolbar: new sap.m.Toolbar({
        content: [
          new sap.m.Label({ text: "Pending Sample # - Pending Status: Pending"}),
          new sap.m.ToolbarSpacer()
        ]
      }),
      content: [
        new sap.ui.layout.HorizontalLayout({
          content : [
            new sap.m.Image({
              src: "phoenix.jpg",
              width: "10em",
              height: "10em"
            })
          ]
        }),
        new sap.m.Text({
          text: "{/Text}"
        })
      ]
    }),
    new sap.m.Panel({
      infoToolbar: new sap.m.Toolbar({
        content: [
          new sap.m.Label({ text: "Pending Sample # - Pending Status: Processing"}),
          new sap.m.ToolbarSpacer()
        ]
      }),
      content: [
        new sap.ui.layout.HorizontalLayout({
          content : [
            new sap.m.Image({
              src: "Baum.jpg",
              width: "10em",
              height: "10em"
            })
          ]
        }),
        new sap.m.Text({
          text: "{/Text}"
        })
      ]
    })
  ]
});

var oDetailPage7 = new sap.m.Page("Ranking", {
	title: "Point Rankings",
	content : [

	]
});

	var oMasterPage1 = new sap.m.Page("MainMenu",{
   title : "Main Menu",
   navButtonPress : function() {
		   splitApp.backMaster();
	          },
   content : [ new sap.m.List({
		mode:"SingleSelectMaster",
		select: function(oEv) {
			      if(oEv.getParameter("listItem").getId() == "IndexMapChoice") {
			      splitApp.toDetail("IndexMap");
			}else if(oEv.getParameter("listItem").getId() == "ProfileChoice"){
			      splitApp.toDetail("Profile");
			}else if(oEv.getParameter("listItem").getId() == "MapChoice"){
			      splitApp.toDetail("Map");
			}else if(oEv.getParameter("listItem").getId() == "ImagesChoice"){
			      splitApp.toDetail("Images");
			}else if(oEv.getParameter("listItem").getId() == "SampleSubmissionChoice"){
			      splitApp.toDetail("SampleSubmission");
			}else if(oEv.getParameter("listItem").getId() == "PendingSamplesChoice"){
				  splitApp.toDetail("PendingSamples");
			}
		},
		items : [ new sap.m.StandardListItem("SampleSubmissionChoice", {title: "Sample Submission"}), 
		new sap.m.StandardListItem("ImagesChoice", {title: "Images"}), new sap.m.StandardListItem("MapChoice", {title: "Map"}), 
		new sap.m.StandardListItem("ProfileChoice",{ title: "Profile"}), new sap.m.StandardListItem("IndexMapChoice",{ title: "Index Map"}), new sap.m.StandardListItem("PendingSamplesChoice", {title: "Pending Samples"})
			  ]
		}) ]
	});

//add the master pages to the splitapp control
splitApp.addMasterPage(oMasterPage1);

//add the detail pages to the splitapp control
splitApp.addDetailPage(oDetailPage1).addDetailPage(oDetailPage2).addDetailPage(oDetailPage4).addDetailPage(oDetailPage5).addDetailPage(oDetailPage6);
    
splitApp.setDefaultTransitionNameDetail("fade");

    // place app in the DOM tree
    splitApp.placeAt("content");
    
}