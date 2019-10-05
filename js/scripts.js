var map;
//a blank array for all the markers
var markers = [];
function initMap() {

  //the styles for the vintage map
  var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];

    map = new google.maps.Map(document.getElementById('map'), {
     zoom: 12,
     center: {lat: 51.5624745, lng: -0.0865189},
     styles: styles,
     mapTypeControl: false

    });

  var iconBase = 'img/';
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < locations.length; i++) {
    //get the position from the location array
    var position = locations[i].location;
    var title = locations[i].title;
    var streetAddress = locations[i].streetAddress;
    var cityAddress = locations[i].cityAddress;
    var url = locations[i].url;
    //create a marker per location
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i,
      streetAddress: streetAddress,
      cityAddress : cityAddress,
      url : url,
      icon: iconBase + 'pin.png'
    });
    //push the marker to the array
    markers.push(marker);
    //create an array where locations are linked to a marker
    locations.forEach(function(location, i){
      location.marker = markers[i];
    })
    //start will all the markers on the map
    markers[i].setMap(map);
    //extend the boundaries if the marker is outside
    bounds.extend(markers[i].position);
    //create an onclick event to open an infowindow at each one
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
      if (this.getAnimation() !== null) {
          this.setAnimation(null);
        } else {
          this.setAnimation(google.maps.Animation.BOUNCE);
          stopAnimation(this);

        }
    });
  }
  document.getElementById('show-listings').addEventListener('click', showListings);
  document.getElementById('hide-listings').addEventListener('click', hideListings);
}

//this is a list of the pubs that will be marked in the map
  var locations = [
        {
        title: "The Bull & Last",
        location: {lat: 51.5589099,lng: -0.1508656,},
        streetAddress: "168 Highgate Rd",
        cityAddress: "London NW5 1QS",
        url: "http://www.thebullandlast.co.uk/",
        visible: ko.observable(true),
        },
        {
        title: "The Red Lion & Sun",
        location:{lat: 51.5726144, lng: -0.1523236},
        streetAddress: "25 North Rd",
        cityAddress: "London N6 4BE",
        url: "http://www.theredlionandsun.com/",
        visible: ko.observable(true)
        },
        {
        title: "The Cellars",
        location:{lat: 51.5505774 , lng: 0.0887055},
        streetAddress: "125 Newington Green Rd, Mildmay Ward",
        cityAddress: "London N1 4RA",
        url: "http://www.thecellarsnewingtongreen.com/",
        visible: ko.observable(true)
        },
        {
        title: "The Lord Palmerston",
        location:{lat: 51.5594425, lng: -0.1427043},
        streetAddress: "33 Dartmouth Park Hill, Tufnell Park",
        cityAddress: "London NW5 1HU",
        url: "http://thelordpalmerston.com/",
        visible: ko.observable(true)
        },
        {
        title: "Brewdog",
        location:{lat: 51.5594164, lng: -0.1755349},
        streetAddress: "113 Bayham St",
        cityAddress: "London NW1 0AG",
        url: "https://www.brewdog.com/",
        visible: ko.observable(true)
        },
        {
        title: "The Wells",
        location:{lat: 51.5569574, lng:-0.1758456 },
        streetAddress: "30 Well Walk",
        cityAddress: "London NW3 1BX",
        url: "https://twitter.com/wellshampstead",
        visible: ko.observable(true)
        },
        {
        title: "The Alex",
        location:{lat: 51.4765824, lng:-0.4249319 },
        streetAddress: "120 Park Rd",
        cityAddress: "London N8",
        url: "http://www.thealex.pub/",
        visible: ko.observable(true)
        },
        {
        title: "Sir Richard Steele",
        location:{lat:51.5468687 , lng:-0.1610136 },
        streetAddress: "97 Haverstock Hill, Belsize Park",
        cityAddress: "London NW3 4RL",
        url: "http://www.faucetinn.com/sirrichardsteele/",
        visible: ko.observable(true)
        },
        {
        title: "The Spaniards Inn",
        location:{lat:51.569902 , lng: -0.1761637 },
        streetAddress: "Spaniards Rd, Hampstead",
        cityAddress: "London NW3 7JJ",
        url: "http://www.thespaniardshampstead.co.uk/",
        visible: ko.observable(true)
        },
        {
        title: "The Lord Clyde",
        location:{lat: 51.52328, lng: -0.1102659 },
        streetAddress: "27 Clennam St",
        cityAddress: "London SE1 1ER",
        url: "http://www.thelordclyde.com/home",
        visible: ko.observable(true)
        },
        {
        title: "The Windsor Castle",
        location:{lat: 51.5063152, lng: -0.2687091 },
        streetAddress: "114 Campden Hill Rd, Kensington",
        cityAddress: "London W8 7AR",
        url: "http://thewindsorcastleclapton.com/",
        visible: ko.observable(true)
        },
        {
        title: "The Kenton",
        location:{lat: 51.5441423, lng: -0.04675},
        streetAddress: "38 Kenton Rd",
        cityAddress: "London E9 7AB",
        url: "http://www.kentonpub.co.uk/website/Home.html",
        visible: ko.observable(true)
        },
        {
        title: "The Proud Archivist",
        location:{lat:51.5368923 , lng:-0.0808339},
        streetAddress: "2-10 Hertford Rd",
        cityAddress: "London N1 5ET",
        url: "http://www.theproudarchivist.co.uk/",
        visible: ko.observable(true)
        },
        {
        title: "The Water Poet",
        location:{lat:  51.521069, lng:-0.0800587 },
        streetAddress: "9-11 Folgate St",
        cityAddress: "London E1 6BX",
        url: "http://www.waterpoet.co.uk/about-the-water-poet/",
        visible: ko.observable(true)
        },
        {
        title: "People’s Park Tavern",
        location:{lat: 51.5415307, lng: -0.0400052},
        streetAddress: "360 Victoria Park Rd",
        cityAddress: "London E9 7BT",
        url: "http://peoplesparktavern.pub/",
        visible: ko.observable(true)
        }
    ];


function populateInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div><b>' + marker.title + '</b></div>' + '<div>' + marker.streetAddress +  '</div>'+ '<div>' + marker.cityAddress +  '</div>'+ '<div>' + marker.url + '</div>');
    infowindow.open(map, marker);
    //make sure the info is cleared if the window is closed
    infowindow.addListener('closeclick',function(){
      infowindow.marker = null;
    });
  }
}
//stop the marker from bouncing
function stopAnimation(marker) {
    setTimeout(function () {
        marker.setAnimation(null);
    }, 3000);
}
//shows all the pins and alters the bounds so that all can fit
function showListings(){
  var bounds = new google.maps.LatLngBounds();
  for (var i=0; i < markers.length; i++){
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
    map.fitBounds(bounds);
}
//it just hides them all... they are there but hidden
function hideListings(){
  for (var i=0; i < markers.length; i++){
    markers[i].setMap(null);
  }
}
//if click on the list element, display the marker on the map
function showMyMarker(){
    var largeInfowindow = new google.maps.InfoWindow();
    var i = this.marker;
    populateInfoWindow(i, largeInfowindow);
    if (i.getAnimation() !== null) {
          i.setAnimation(null);
        } else {
          i.setAnimation(google.maps.Animation.BOUNCE);
          stopAnimation(i);
        }
  }

//filter the results to what matches the search box
var show = {
    searchBox: ko.observable(''),
};
show.locations = ko.dependentObservable(function() {
      var info = ko.observable(0);
    var self = this;
    var search = self.searchBox().toLowerCase();
    return ko.utils.arrayFilter(locations, function(location) {
    if (location.title.toLowerCase().indexOf(search) >= 0) {
            location.inSearch = true;
            return location.visible(true);
        } else {
            location.inSearch = false;
            return location.visible(false);
        }
    });
}, show);
ko.applyBindings(show);

//show and hide the markers that are not on the search box
function showMarkers() {
  for (var i=0; i < markers.length; i++){
    if(locations[i].inSearch === true){
      markers[i].setMap(map);
    }else{
      markers[i].setMap(null);
    }
  }
}
//trigger showmarkers depending on the input of the searchbox
$("#input").keyup(function() {
showMarkers();
});

//Weather
//getting the json from weather underground with my key
var weatherUrl = "https://api.wunderground.com/api/4536789d3dff09ad/conditions/q/GB/London.json";

//putting the information in a list to display on the menu
$.getJSON(weatherUrl, function(data) {
    var list = $(".weather ul");
    information = data.current_observation;
    list.append('<li>Weather: ' + information.weather + '</li>');
    list.append('<li>Temperature: ' + information.temp_c + '° C</li>');
    list.append('<li>Feels Like: ' + information.feelslike_c + '° F</li>');
}).error(function(e){
        $(".weather").append('<p>Sorry! The weather information is currently unavailable</p>');
    });
