require(["dojo/ready",  
	"dojox/geo/openlayers/Map", 
	"dojox/geo/openlayers/GeometryFeature", 
	"dojox/geo/openlayers/Point", 
	"dojox/geo/openlayers/GfxLayer", 
	"dojox/geo/openlayers/Layer",
	 "dojo/store/JsonRest",
	 "dojox/timing"], function(ready, Map,GeometryFeature, Point, GfxLayer, Layer, jrest, timething ){
	ready(function(){
		map = new Map("map", { baseLayerType : dojox.geo.openlayers.BaseLayerType.Transport } );
		map.fitTo([ -3, 55, 3, 48]);

		var train_data = new jrest({
			          target: "./train_locs.php/"
		});
		var layer;
		var t= new timething.Timer(900);
		t.onTick = function(){
			train_data.get(1 ).then(function(item){
    			   // create a GfxLayer

    			    //http://dojotoolkit.org/reference-guide/1.9/dojox/geo/openlayers.html#id6

    		map.removeLayer( layer);
    		layer = new GfxLayer();
     		for( i =0; i < item.length; i++ ){
    // create a Point geometry at New York location
       			var p = new Point({x:item[i].Long, y:item[i].Lat});
    // create a GeometryFeature
       			var f = new GeometryFeature(p);
       			var toc_id = item[i].toc_id;
			var toc = toc_id;
    // set the shape properties, fill and stroke
                if (toc_id == 06){
                   f.setFill([ 225, 225, 0]);
       		   f.setStroke([ 0, 0, 0 ]);
       		   f.setShapeProperties({
           			r : 5
        	   });
                }

                if (toc_id == 20){
                   f.setFill([ 51, 0 , 225 ]);
                   f.setStroke([ 0, 0, 0 ]);
                   f.setShapeProperties({
                       r : 5
		   });
                }
                if (toc_id == 21){
		    f.setFill([ 255, 0 , 0 ]);
		    f.setStroke([ 0, 0, 0 ]);
                    f.setShapeProperties({
                        r : 5
                     });
                }
      if (toc_id == 22){
            f.setFill([ 0,0,0 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });
    } else
      if (toc_id == 23){
            f.setFill([ 153, 0, 153 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });
    } else
      if (toc_id == 24){
            f.setFill([ 255, 102, 0]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });
      } else
      if (toc_id == 25){
            f.setFill([ 51, 0 , 153 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });
    } else    
      if (toc_id == 26){
            f.setFill([ 51, 204, 204 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });
    } else
      if (toc_id == 27){
            f.setFill([ 204, 204, 204]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });
      } else
      if (toc_id == 28){
            f.setFill([ 255,204,51 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 29){
            f.setFill([ 102,153,0 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 30){
            f.setFill([ 255, 153, 0 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 34){
            f.setFill([ 0, 51, 0 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 50){
            f.setFill([ 102,0,0 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });
    } else
      if (toc_id == 51){
            f.setFill([ 0,0,0]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 55){
            f.setFill([  51,153,255]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 56){
            f.setFill([ 0,0,204 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 60){
            f.setFill([ 102, 51, 153 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 61){
            f.setFill([ 102,102,102 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 64){
            f.setFill([ 255,255, 0 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 65){
            f.setFill([ 153, 0, 0 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 71){
            f.setFill([ 102,204,153 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 74){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 79){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 80){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 81){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 82){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 84){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 85){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 86){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 90){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

    } else
      if (toc_id == 91){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

      } else 
      if (toc_id == 93){
            f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
            f.setStroke([ 0, 0, 0 ]);
            f.setShapeProperties({
                r : 5
                });

      } else{
          f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
          f.setStroke([ 0, 0, 0 ]);
          f.setShapeProperties({
                r : 5
          });
      }
                

     
    // add the feature to the layer
      layer.addFeature(f);
   }
   map.addLayer(layer)
//    			  console.log( item );
 });
 }


    	train_data.get(1 ).then(function(item){
    			   // create a GfxLayer

    			    //http://dojotoolkit.org/reference-guide/1.9/dojox/geo/openlayers.html#id6

    		layer = new GfxLayer();
     		for( i =0; i < item.length; i++ ){
    // create a Point geometry at New York location
       			var p = new Point({x:item[i].Long, y:item[i].Lat});
    // create a GeometryFeature
       			var f = new GeometryFeature(p);
       			var toc = item[i].toc_id;
    // set the shape properties, fill and stroke
       			f.setFill([ 225-parseInt(toc)*2, 225-parseInt(toc)*2, 225 ]);
       			f.setStroke([ 0, 0, 0 ]);
       			f.setShapeProperties({
           			r : 5
        		});
    // add the feature to the layer
        		layer.addFeature(f);
    		}
    		map.addLayer(layer)
//    			  console.log( item );
    	});
    	t.start();

	});
});
