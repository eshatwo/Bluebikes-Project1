var stations;
var stations_loc = [];



mymap = L.map('mapid').setView([42.3530, -71.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 19,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXNoYXR3byIsImEiOiJjazhiNHB3cHMwMmxpM2xvMWh5MXR2OTFtIn0.flUX56rZrL9ZFvIf0m0Nuw'
}).addTo(mymap);

var bike = L.icon({
    iconUrl: 'images/MeetBike-Intro_New_Helmet_844.png',

    iconSize:     [30, 40], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


d3.csv("bluebikes_data/current_bluebikes_stations-2.csv").then(function(data) {
    stations = data;

}).then(function() {
    let i;
    for (i = 0; i < stations.length; i++) {
        let point = stations[i];
        lat = point["Latitude"];
        long = point["Longitude"];
        name = point["Name"];
        docks = point["Total_docks"];
        
        let marker = L.marker([lat,long], {icon: bike});

        

        marker.addTo(mymap);
        marker.bindPopup("<b>Name: </b>" + name + "<br>" + "<b>Number of Docks: </b>"+ docks).openPopup();
       

        i++;
    }
});

var females = 0;
var males = 0;
var other = 0;
var total = 0;


d3.csv("bluebikes_data/college_students.csv").then(function(data) {
    users = data;

}).then(function() {
    let i;
    for (i = 0; i < users.length; i++) {
        if (users[i].gender == "0") {
            other++
        }
        if (users[i].gender == "1") {
            males++
        }
        if (users[i].gender == "2") {
            females++            
        }
        
    }
    total = females + males + other;
    document.getElementById("p_females").outerHTML = ((females / total) * 100).toFixed(2);
    document.getElementById("p_males").outerHTML = ((males / total) * 100).toFixed(2);
    document.getElementById("p_other").outerHTML = ((other / total) * 100).toFixed(2);
})





