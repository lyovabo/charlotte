

angular
  .module('charlotte',[]);
 
$(function() {
  $('.kwicks').kwicks({
      maxSize : 200,
      behavior: 'menu'
  });
  $(".gallery").justifyGallery();
  $(".gallery").bootstrapGallery();
  $('#slider-gallery').Cloud9Carousel( {
                // buttonLeft: $("#buttons > .left"),
                // buttonRight: $("#buttons > .right"),
                yRadius: 5,
                autoPlay: 1,
                bringToFront: true
              } );
  

});
function initMap() {
  var myLatLng = {lat: 40.1920621, lng: 44.501738};
  var infowindow = new google.maps.InfoWindow({
    content: "<span style='color:#000'>Charlotte</span>"
});

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: myLatLng
  });
  var styles = [
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#f765b8"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f765b8"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f765b8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#f765b8"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f765b8"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f765b8"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f765b8"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f765b8"
      }
    ]
  }
]

  map.setOptions({styles: styles});
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Charlotte'
  });
  infowindow.open(map,marker);
}