
// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable var client;

// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on var earthquakelayer;

// create the code to get the Earthquakes data using an XMLHttpRequest
function getEarthquakes() {
  client = new XMLHttpRequest();

client.open('GET','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
  client.onreadystatechange = earthquakeResponse;
  // note don't use earthquakeResponse() with brackets as that doesn't work
  client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function earthquakeResponse() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
if (client.readyState == 4) {
  // once the data is ready, process the data
  var earthquakedata = client.responseText;
  loadEarthquakelayer(earthquakedata);
  }
}
// convert the received data - which is text - to JSON format and add it to the map
function loadEarthquakelayer(earthquakedata) {
  // convert the text received from the server to JSON
  var earthquakejson = JSON.parse(earthquakedata );
  // load the geoJSON layer
  var earthquakelayer = L.geoJson(earthquakejson,
  {
    // use point to layer to create the points
    pointToLayer: function (feature, latlng)
    {
    // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value

    // also include a pop-up that shows the place value of the earthquakes
    if (feature.properties.mag > 1.75) {
      return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>"+feature.properties.place+", Magnitude: "+feature.properties.mag +"</b>");
    }
    else {
    // magnitude is 1.75 or less
    return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+feature.properties.place+", Magnitude: "+feature.properties.mag +"</b>");;
  }
},
}).addTo(mymap);
mymap.fitBounds(earthquakelayer.getBounds());
}
function getLocation() {
alert('getting location');
navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude +
"<br>Longitude: " + position.coords.longitude;
}
var xhr; // define the global variable to process the AJAX request
function callDivChange() {
xhr = new XMLHttpRequest();
var filename = document.getElementById("filename").value;
xhr.open("GET", filename, true);
xhr.onreadystatechange = processDivChange;
try {
 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
}
catch (e) {
}
xhr.send();
}
function processDivChange() {
if (xhr.readyState < 4) // while waiting response from server
 document.getElementById('ajaxtest').innerHTML = "Loading...";
 else if (xhr.readyState === 4) { // 4 = Response from server has been completely loaded.
 if (xhr.status == 200 && xhr.status < 300)
// http status between 200 to 299 are all successful
 document.getElementById('ajaxtest').innerHTML = xhr.responseText;
 }
}
