
var splitApp;

function initApp(){
    splitApp = new sap.m.SplitApp("BioXYZ", {});
    var oDetailPage0 = new sap.m.Page("Splash", {
    	title: "Index",
    	content : [ new sap.m.Label({text: "Welcome to BioHunter"})
    	        ,new sap.m.Image({
    	        	src: "logo.png",
    	            width: "50em",
    	            height: "50em"
    	        }) 
    	 ]
    }); 
    var oDetailPage1 = new sap.m.Page("IndexMap", {
	   title : "Index Map",
	   content : [new sap.ui.core.HTML("mapArea", {
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

					

						if(navigator.geolocation) {
						
						  navigator.geolocation.getCurrentPosition(function(position) {
						    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						
						    var marker = new google.maps.Marker({
						       position: pos,
						       map: window.map
						    });
						    window.map.setCenter(pos);
						}, function() {
						  handleNoGeolocation(true);
						  });
						} else {
						  // Browser doesn't support Geolocation
						  handleNoGeolocation(false);
						}


						$.getJSON('https://biohunterp1940459638trial.hanatrial.ondemand.com/biohunter/BarcodeDataServlet', function(entries) {
						    //data is the JSON string
						    for (var i=0; i< entries.length; i++) {
						            new google.maps.Marker({
						            position: new google.maps.LatLng(entries[i].longitude, entries[i].latitude),
						            map: window.map,
						            icon: iconBase + "parks.png"});
						    }
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
    }), new sap.m.Label({text: "Username: Jacob"}), new sap.m.Label({text: "About me: I am an enthusiastic animal\n and plant lover who enjoys spending time outside searching for different organisms and wildlife specimens. "}),
   		new sap.m.Label({text: "Date Joined: 02/07/2008"}),
   		new sap.m.Label({text: "Points: 312"}),
   		new sap.m.Label({text: "Title: Hyena Hunter"}),
   		new sap.m.Panel({
      infoToolbar: new sap.m.Toolbar({
        content: [
          new sap.m.Label({ text: "Social Links"}),
          new sap.m.ToolbarSpacer()
        ]
      }),
      content: [
        new sap.ui.layout.HorizontalLayout({
          content : [
            new sap.m.Image({
              src: "twitter-icon.png",
              width: "10em",
              height: "10em"
            }),
            new sap.m.Image({
            	src: "instagram-icon.png",
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
   		new sap.m.Button({text: "New Sample"}),
   		new sap.m.Button({text: "Points: 312"}),
   		new sap.m.Button({text: "Pending Submissions: 3"}),
   		new sap.m.List({
      headerText: "Live Feed",
      items: [
        new sap.m.FeedListItem({
          sender: "Giselle Ashante-Ramirez",
          icon: "img/people/giselle.jpg",
          info: "Request",
          timestamp: "March 03, 2013",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
        }),
        new sap.m.FeedListItem({
          sender: "Johannes Schaffensteiger",
          icon: "img/people/johannes.jpg",
          info: "Reply",
          timestamp: "March 04, 2013",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore"
        }),
        new sap.m.FeedListItem({
          sender: "Giselle Ashante-Ramirez",
          icon: "img/people/giselle.jpg",
          info: "Request",
          timestamp: "March 04, 2013",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat"
        }),
        new sap.m.FeedListItem({
          sender: "Johannes Schaffensteiger",
          icon: "img/people/johannes.jpg",
          info: "Rejection",
          timestamp: "March 07, 2013",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
        })
      ]
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
   title : "New Submission",
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
   new sap.m.Button({
	   text: "Submit",
	   press: function(){
		   sap.m.MessageToast.show("New Entry Created");   
	   }
	   })
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
		new sap.m.List({
      headerText: "Rankings",
      items: [
        new sap.m.DisplayListItem({
          label: "1st",
          value: "Rattlesnake Ranger Jackob - 322 Points"
        }),
        new sap.m.DisplayListItem({
          label: "2nd",
          value: "Hyena Hunter SuziQ - 282 Points"
        }),
        new sap.m.DisplayListItem({
          label: "3rd",
          value: "Hyena Hunter jBob - 198 Points"
        }),
        new sap.m.DisplayListItem({
          label: "4th",
          value: "Crab ChaserAdam - 159 Points"
        })
      ]
	})
	]
});



function openCamera(){

var pictureArea = new sap.ui.core.HTML({
        content: "<div id='picture_area'></div>",
        preferDOM : false,                      
        afterRendering : function(e) {
        }
});

var stdDialog = new sap.m.Dialog({
      title: "Add New Image",
      content: pictureArea,
      leftButton: new sap.m.Button({
        text: "Ok",
        press: function () {
          stdDialog.close();
        }
      }),
      rightButton: new sap.m.Button({
        text: "Cancel",
        press: function () {
          stdDialog.close();
        }
      })
    }).addStyleClass("sapUiPopupWithPadding");
    var photoUp = document.createElement('input');
	photoUp.type = "file";
	photoUp.accept = "image/*";
	setTimeout(function() {
		$(photoUp).click();
	}, 200);
		$(photoUp).change(function() {
		displayAsImage(photoUp.files[0]);
	}
	);
		stdDialog.open();
	}

function displayAsImage(file){
	var imgURL = URL.createObjectURL(file);
	var img = document.createElement('img');
	img.onload = function(){
		URL.revokeObjectURL(imgURL);
	};
	img.src = imgURL;
	img.height = 300;
	img.width = 300;
	document.getElementById('picture_area').appendChild(img);
}

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
				  } else if(oEv.getParameter("listItem").getId() == "ProfileChoice"){
					      splitApp.toDetail("Profile");
				  } else if(oEv.getParameter("listItem").getId() == "MapChoice"){
					      splitApp.toDetail("IndexMap");
				  } else if(oEv.getParameter("listItem").getId() == "ImagesChoice"){
					      splitApp.toDetail("Images");
				  } else if(oEv.getParameter("listItem").getId() == "SampleSubmissionChoice"){
					      splitApp.toDetail("SampleSubmission");
				  } else if(oEv.getParameter("listItem").getId() == "PendingSamplesChoice"){
						  splitApp.toDetail("PendingSamples");
				  } else if(oEv.getParameter("listItem").getId() == "RankingChoice"){
						  splitApp.toDetail("Ranking");
				  } else if(oEv.getParameter("listItem").getId() == "Camera"){
						  openCamera();
				  }
		},
		items : [ new sap.m.StandardListItem("SampleSubmissionChoice", {title: "Sample Submission"}), 
		new sap.m.StandardListItem("ImagesChoice", {title: "Images"}), 
		new sap.m.StandardListItem("ProfileChoice",{ title: "Profile"}), new sap.m.StandardListItem("IndexMapChoice",{ title: "Index Map"}), new sap.m.StandardListItem("PendingSamplesChoice", {title: "Pending Samples"}), new sap.m.StandardListItem("RankingChoice", {title: "Ranks"}), new sap.m.StandardListItem("Camera", {title: "Camera"})
			  ]
		}) ]
	});

//add the master pages to the splitapp control
splitApp.addMasterPage(oMasterPage1);

//add the detail pages to the splitapp control
splitApp.addDetailPage(oDetailPage0).addDetailPage(oDetailPage1).addDetailPage(oDetailPage2).addDetailPage(oDetailPage4).addDetailPage(oDetailPage5).addDetailPage(oDetailPage6).addDetailPage(oDetailPage7);
    
splitApp.setDefaultTransitionNameDetail("fade");

    // place app in the DOM tree
    splitApp.placeAt("content");
    
}