var map;
var polyOn=false;
var polyListener;
var Marker;
var path;
var input1;
var button1coord;
var collectP = [];
var collectMarkers = [];
var gLat;
var gLong;
//different coloured marker icons being stored in a variable to be randomly picked
var icons = [
    "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png",
    "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_black.png",
    "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png",
    "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png",
    "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_grey.png",
    "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_orange.png",
    "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_white.png",
    "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_yellow.png"
];
var hoverArea = false;
var hoverlisteners = [];
//function to convert a number to a hex
function num2hex(num)
{
    if(num>9)
        switch(num){
            case 10: return 'A'; break;
            case 11: return 'B'; break;
            case 12: return 'C'; break;
            case 13: return 'D'; break;
            case 14: return 'E'; break;
            case 15: return 'F'; break;
        };

    return num;
}
//function for converting rgb2hex
function rgb2hex(r,g,b)
{
    var R=(r>15)?num2hex(Math.floor(r/16))+''+num2hex(r%16) :'0'+num2hex(r),
        G=(g>15)?num2hex(Math.floor(g/16))+''+num2hex(r%16) :'0'+num2hex(g);
    B=(b>15)?num2hex(Math.floor(b/16))+''+num2hex(r%16) :'0'+num2hex(b);
    console.log('('+r+','+g+','+b+') --> '+R+' '+G+' '+B);

    return '#'+R+G+B;
}


var polygon;
//function for selecting the region to be highlighted for button 4
function region(r,g,b,rr,rg,rb) {
    if (!polyOn) {
        polyOn = true;
        var area = new google.maps.MVCArray();

        polygon = new google.maps.Polygon({
            path: area,
            strokeColor: rgb2hex(r, g, b),
            strokeOpacity: 0.7,
            strokeWeight: 6,
            fillColor: rgb2hex(rr, rg, rb),
            fillOpacity: 0.5
        });
        polygon.setMap(map);
        polygonArray.push(polygon);


        polyListener = google.maps.event.addListener(map, 'click', function (e) {
            path = polygon.getPath();
            path.push(e.latLng);
            console.log(e.latLng);
            var marker = new google.maps.Marker({
                position: e.latLng,
                map: map,

            });


            google.maps.event.trigger(marker, 'click');

        });

    }
    else {
        polyOn = false;

        google.maps.event.removeListener(polyListener);

    }


     google.maps.event.addListener(polygon, 'mouseout', function (e) {
        polygon.setOptions({
            fillColor: rgb2hex(0, 255, 0),
            strokeColor: rgb2hex(255, 255, 0)
        });
    });

    google.maps.event.addListener(polygon, 'mouseover', function (e) {
        polygon.setOptions({
            fillColor: rgb2hex(255, 0, 0),
            strokeColor: rgb2hex(0, 0, 255)
        });
    });

}
//initialization function for button 1
    function initialize() {
    var lat = prompt("Enter Longatude");
    var lng = prompt("Enter Latitude");



    var mapOptions = {
        center: new google.maps.LatLng(lat,lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

        var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        map: map

        });
    marker1.setMap(map);
    input1 = google.maps.LatLng(lat,lng);
}

// function for adding another marker for button 2
function inputAnotherMarker() {
    gLat = prompt("Enter new marker longitude");
    gLong = prompt("Enter new marker lattitude");

    var MapOptions = {
        center: new google.maps.LatLng(gLat,gLong),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

     Marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(gLat,gLong),
        map:map,
        size: new google.maps.Size(5,50),
        icon:icons[Math.floor(Math.random()*icons .length)]


})
     button1coord = new google.maps.LatLng(gLat,gLong);
     map.panTo(button1coord);
}


// button2 function which only adds a marker if the lattitude and longitude is atleast 100km away from the button1 marker
function button2() {
    var Lat = prompt("Enter new marker longitude");
    var Long = prompt("Enter new marker lattitude");

    var button2cord = new google.maps.LatLng(Lat,Long);

     var dis = getDistanceInMiles(gLat,gLong,Lat,Long);

    console.log(dis);
    //100km converted to miles is 63 miles, a if statement is used to check if the distance is atleast 100km away, if so a marker is added
    if(dis >= 63){

        var MapOptions = {
            center: new google.maps.LatLng(Lat,Long),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };


        Marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(Lat,Long),
            map:map,
            size: new google.maps.Size(5,50),
            icon:icons[Math.floor(Math.random()*icons .length)]


        })
        map.panTo(button2cord);
    }

}
// funtion which takes the coordinates of button1 marker and the button 2 marker and computes the distance between both markers, returning the figure in miles
function getDistanceInMiles(pointa,pointb,pointc, pointd) {
    var distance_in_meters = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pointa,pointb), new google.maps.LatLng(pointc,pointd));

    return distance_in_meters * 0.000621371;
}
// button 3 function generates random longitude and latitude and drops a clickable marker at that location
// once clicked, another marker is dropped at a random location
function button3(){
    var Lat = Math.random()*70+-70;
    var Long = Math.random()*-170+170;
    var butCord = new google.maps.LatLng(Lat,Long);
    var MapOptions = {
        center: new google.maps.LatLng(Lat,Long),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    Marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(Lat,Long),
        map:map,
        size: new google.maps.Size(5,50),
        icon:icons[Math.floor(Math.random()*icons .length)]


    })
map.panTo(butCord);

    Marker2.addListener('click',function() {
       var lat = Math.random()*70+-70;
       var long = Math.random()*-170+170;
       var markerCoord = new google.maps.LatLng(lat,long);
       marker3 = new google.maps.Marker({
            position: new google.maps.LatLng(lat,long),
            map:map,
            size: new google.maps.Size(5,50),
            icon:icons[Math.floor((Math.random()*icons.length))]
        })

        map.panTo(markerCoord);
    })


}
var ranMON=false;
var cPoints = [];
var iWindow;
//Marker in region function drops random markers in a region with infowindows displaying the address of the location
//A minimap also displaying the specific location of the marker is also displayed
function markerInRegion() {

    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < polygon.getPath().getLength(); i++) {
        bounds.extend(polygon.getPath().getAt(i));
    }
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();


    if (!ranMON)
    {
        ranMON=true; // enable random dropping
        polygon.setOptions({clickable:false});

        dropListener=google.maps.event.addListener(map, 'click', function (e) {

            var inum = 0;

            var click = new google.maps.LatLng(e.latLng.lat(),e.latLng.lng());

            if  (google.maps.geometry.poly.containsLocation(click,polygon))
                while (inum < 3) {
                    var ptLat = Math.random() * (ne.lat() - sw.lat()) + sw.lat();
                    var ptLng = Math.random() * (ne.lng() - sw.lng()) + sw.lng();

                    var point = new google.maps.LatLng(ptLat, ptLng);



                    if (google.maps.geometry.poly.containsLocation(point, polygon))
                    {
                        cPoints.push(point);


                        inum++;

                        var marker = new google.maps.Marker({
                            position: point,
                            map: map,
                            icon: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_purple" + inum + ".png",
                        });

                        marker.addListener('click',function(){

                            var detailDiv = document.createElement('div');
                            detailDiv.style.width = '200px';
                            detailDiv.style.height = '200px';

                            document.getElementById('map').appendChild(detailDiv);

                            var overviewOpts = {
                                zoom: 14,
                                center: marker.getPosition(),
                                mapTypeId: map.getMapTypeId(),
                                disableDefaultUI: true
                            };

                            var detailMap = new google.maps.Map(detailDiv, overviewOpts);

                            var detailmarker = new google.maps.Marker({
                                position: marker.getPosition(),
                                map:detailMap,
                                clickable: false
                            });
                            var iWinInfo = new google.maps.InfoWindow;
                            var geocoder = new google.maps.Geocoder;
                            if (!iWindow) iWindow = new google.maps.InfoWindow();
                            iWindow.setContent(detailDiv);
                            iWindow.open(map, marker);
                            //reverse geocoding used to display the address in a infowindow of the dropped marker
                            geocoder.geocode({'location': point}, function(results, status) {
                                if (status === 'OK') {
                                    if (results[0]) {
                                        

                                        iWinInfo.setContent(results[0].formatted_address);
                                        iWinInfo.open(map, marker);
                                    } else {
                                        window.alert('No results found');
                                    }
                                } else {
                                    window.alert('Geocoder failed due to: ' + status);
                                }
                            });




                        })


                        collectMarkers.push(marker);


                    }
                }
        });
    }
    else
    {
        ranMON=false;
        google.maps.event.removeListener(dropListener);
    }


}


//hover function to drop markers when the mouse is hovering over the selected region
var polygonArray=[];
function hover(){
    if(!hoverArea)
    {
        for (var i = 0; i < polygonArray.length; i++){
            var listener = google.maps.event.addListener(polygonArray[i], 'mousemove', function(mouseEvent)
            {
                var point = mouseEvent.latLng;
                var marker = new google.maps.Marker({
                    position: point,
                    map: map,
                });
            });

            hoverlisteners.push(listener);
        }
        hoverArea = true;
    }
    else{
        for (var i = 0; i < hoverlisteners.length; i++){

            google.maps.event.removeListener(hoverlisteners[i]);
        }
        hoverArea = false;
    }
}

google.maps.event.addDomListener(window, 'load', initialize);







