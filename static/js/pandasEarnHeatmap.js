// Salina, KS coordinates = [38.8403, -97.6114];
// var mapZoomLevel = 7;

// Create a blank map to start from in order to be able to add layers and the heat map to it.
// var myMap;

var metadataURL = "/totalearnedlevelpop/";
d3.json(metadataURL).then(function(countyEarnEdLev) {

  //     if (err) throw err;
  console.log(countyEarnEdLev);
  vizualize(countyEarnEdLev)
  // markervizualize(countyPopData)
});

function popmarkerSize(population) {
  return population / 10;
}
function markerSize(Total_Median_Earnings_) {
  return Total_Median_Earnings_ / 2;
}

//Create the array for the heatmap based on population:
function vizualize(countyEarnEdLev){
  console.log(countyEarnEdLev);
    var popmarkers = L.markerClusterGroup();
    var popheatArray = [];
    var medEarnheatArray = [];
    var fmeassocheatArray = [];
    var fmebachheatArray = [];
    var fmegradheatArray = [];
    var fmehsheatArray = [];
    var fmelthsheatArray = [];
    var fmeheatArray = [];
    var mleassocheatArray = [];
    var mlebachheatArray = [];
    var mlegradheatArray = [];
    var mlehsheatArray = [];
    var mlelthsheatArray = [];
    var mleheatArray = [];
    var toteassocheatArray = [];
    var totebachheatArray = [];
    var totegradheatArray = [];
    var totehsheatArray = [];
    var totelthsheatArray = [];
    var toteheatArray = [];
    var medearncircle = [];
    var popcircle = [];
    countyEarnEdLev.forEach(function(d){
      var location = [d.Latitude, d.Longitude];
       
      if (location) {
        console.log(d);
          popheatArray.push([d.Latitude, d.Longitude, d.population])
          medEarnheatArray.push([d.Latitude, d.Longitude, d.Total_Median_Earnings_])
          fmeassocheatArray.push([d.Latitude, d.Longitude, d.Female_Median_Earning_Assoc])
          fmebachheatArray.push([d.Latitude, d.Longitude, d.Female_Median_Earning_Bach])
          fmegradheatArray.push([d.Latitude, d.Longitude, d.Female_Median_Earning_Grad])
          fmehsheatArray.push([d.Latitude, d.Longitude, d.Female_Median_Earning_HS])
          fmelthsheatArray.push([d.Latitude, d.Longitude, d.Female_Median_Earning_Less_than_HS])
          fmeheatArray.push([d.Latitude, d.Longitude, d.Female_Median_Earnings])
          mleassocheatArray.push([d.Latitude, d.Longitude, d.Male_Median_Earning_Assoc])
          mlebachheatArray.push([d.Latitude, d.Longitude, d.Male_Median_Earning_Bach])
          mlegradheatArray.push([d.Latitude, d.Longitude, d.Male_Median_Earning_Grad])
          mlehsheatArray.push([d.Latitude, d.Longitude, d.Male_Median_Earning_HS])
          mlelthsheatArray.push([d.Latitude, d.Longitude, d.Male_Median_Earning_Less_than_HS])
          mleheatArray.push([d.Latitude, d.Longitude, d.Male_Median_Earnings])
          toteassocheatArray.push([d.Latitude, d.Longitude, d.Total_Median_Earning_Assoc])
          totebachheatArray.push([d.Latitude, d.Longitude, d.Total_Median_Earning_Bach])
          totegradheatArray.push([d.Latitude, d.Longitude, d.Total_Median_Earning_Grad])
          totehsheatArray.push([d.Latitude, d.Longitude, d.Total_Median_Earning_HS])
          totelthsheatArray.push([d.Latitude, d.Longitude, d.Total_Median_Earning_Less_than_HS])
          toteheatArray.push([d.Latitude, d.Longitude, d.Total_Median_Earnings])
          // .bindPopup("<h1>" + d.Geography + "<hr>" + d.Population +"</h1>");
          popcircle.push(L.circle([d.Latitude, d.Longitude], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "steelblue",
            // Setting our circle's radius equal to the output of our markerSize function
            // This will make our marker's size proportionate to its population
            radius: popmarkerSize(d.Population)
          }))
          medearncircle.push(L.circle([d.Latitude, d.Longitude], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple",
            // Setting our circle's radius equal to the output of our markerSize function
            // This will make our marker's size proportionate to its population
            radius: markerSize(d.Total_Median_Earnings)
          }))
          popmarkers.addLayer(L.marker([d.Latitude, d.Longitude])
          .bindPopup("<h10>" + d.county + "<hr>" + "Population - " + d.population + 
                     "<hr>" + "Total Median Income - " + d.Total_Median_Earnings_+ 
                     "<hr>" + "Female Median Income - " + "Assoc - " + d.Female_Median_Earning_Assoc + 
                     "<hr>" + "-- Bach - " + d.Female_Median_Earning_Bach + 
                     "<hr>" + "-- Grad - " + d.Female_Median_Earning_Grad + 
                     "<hr>" + "-- HS - " + d.Female_Median_Earning_HS + 
                     "<hr>" + "-- LHS - " + d.Female_Median_Earning_Less_than_HS +
                     "<hr>" + "Male Median Income - " + "Assoc - " + d.Male_Median_Earning_Assoc + 
                     "<hr>" + " -- Bach - " + d.Male_Median_Earning_Bach + 
                     "<hr>" + " -- Grad - " + d.Male_Median_Earning_Grad + 
                     "<hr>" + " -- HS - " + d.Male_Median_Earning_HS + 
                     "<hr>" + " -- LHS - " + d.Male_Median_Earning_Less_than_HS + 
                     "<hr>" + "Total Median Income - " + "Assoc - " + d.Total_Median_Earning_Assoc + 
                     "<hr>" + " -- Bach - " + d.Total_Median_Earning_Bach + 
                     "<hr>" + " -- Grad - " + d.Total_Median_Earning_Grad + 
                     "<hr>" + " -- HS - " + d.Total_Median_Earning_HS + 
                     "<hr>" + " -- LHS - " + d.Total_Median_Earning_Less_than_HS + "</h10>"));
      
      }
    })
      console.log(popheatArray, medEarnheatArray, popmarkers);
  //   createMap(popheatArray, medEarnheatArray, popmarkers)
      createMap(popheatArray, medEarnheatArray, 
                fmeassocheatArray,
                fmebachheatArray,
                fmegradheatArray, 
                fmehsheatArray,
                fmelthsheatArray,
                fmeheatArray, 
                mleassocheatArray,
                mlebachheatArray,
                mlegradheatArray, 
                mlehsheatArray,
                mlelthsheatArray,
                mleheatArray,
                toteassocheatArray,
                totebachheatArray,
                totegradheatArray, 
                totehsheatArray,
                totelthsheatArray,
                toteheatArray,
                medearncircle,
                popcircle, 
                popmarkers)
}

// function createMap(popheatArray, medEarnheatArray, popmarkers) 
function createMap(popheatArray, medEarnheatArray, 
                fmeassocheatArray,
                fmebachheatArray,
                fmegradheatArray, 
                fmehsheatArray,
                fmelthsheatArray,
                fmeheatArray, 
                mleassocheatArray,
                mlebachheatArray,
                mlegradheatArray, 
                mlehsheatArray,
                mlelthsheatArray,
                mleheatArray,
                toteassocheatArray,
                totebachheatArray,
                totegradheatArray, 
                totehsheatArray,
                totelthsheatArray,
                toteheatArray,
                medearncircle,
                popcircle,
                popmarkers){
//     // Create a layer group made from the bike markers array, pass it into the createMap function
  //  var heat = L.layerGroup(heatArray);

  var medearncircle = L.layerGroup(medearncircle);
  var popcircle = L.layerGroup(popcircle);

    var popheat = L.heatLayer(popheatArray, {
    radius: 30,
    blur: 35
    })
    console.log(popheat);
  
  var medEarnheatArray = L.heatLayer(medEarnheatArray, {
    radius: 30,
    blur: 35
    })
    console.log(medEarnheatArray);

  var fmeassocheatArray = L.heatLayer(fmeassocheatArray, {
      radius: 30,
      blur: 35
      })
      console.log(fmeassocheatArray);
  
  var fmebachheatArray = L.heatLayer(fmebachheatArray, {
      radius: 30,
      blur: 55
      })
      console.log(fmebachheatArray);

  var fmegradheatArray = L.heatLayer(fmegradheatArray, {
      radius: 30,
      blur: 20
      })
      console.log(fmegradheatArray);
      
  var fmehsheatArray = L.heatLayer(fmehsheatArray, {
      radius: 30,
      blur: 30
      })
      console.log(fmehsheatArray);

  var fmelthsheatArray = L.heatLayer(fmelthsheatArray, {
      radius: 30,
      blur: 40
      })
      console.log(fmelthsheatArray);
        
  var fmeheatArray = L.heatLayer(fmeheatArray, {
      radius: 30,
      blur: 10
      })
      console.log(fmeheatArray);
  // var markers = L.layerGroup(markers);
  //   console.log(markers);

  var mleassocheatArray = L.heatLayer(mleassocheatArray, {
    radius: 30,
    blur: 35
    })
    console.log(mleassocheatArray);

var mlebachheatArray = L.heatLayer(mlebachheatArray, {
    radius: 30,
    blur: 10
    })
    console.log(mlebachheatArray);

var mlegradheatArray = L.heatLayer(mlegradheatArray, {
    radius: 30,
    blur: 20
    })
    console.log(mlegradheatArray);
    
var mlehsheatArray = L.heatLayer(mlehsheatArray, {
    radius: 30,
    blur: 30
    })
    console.log(mlehsheatArray);

var mlelthsheatArray = L.heatLayer(mlelthsheatArray, {
    radius: 30,
    blur: 30
    })
    console.log(mlelthsheatArray);
      
var mleheatArray = L.heatLayer(mleheatArray, {
    radius: 30,
    blur: 1
    })
    console.log(mleheatArray);
// var markers = L.layerGroup(markers);
//   console.log(markers);

var toteassocheatArray = L.heatLayer(toteassocheatArray, {
  radius: 30,
  blur: 35
  })
  console.log(toteassocheatArray);

var totebachheatArray = L.heatLayer(totebachheatArray, {
  radius: 30,
  blur: 10
  })
  console.log(totebachheatArray);

var totegradheatArray = L.heatLayer(totegradheatArray, {
  radius: 30,
  blur: 20
  })
  console.log(totegradheatArray);
  
var totehsheatArray = L.heatLayer(totehsheatArray, {
  radius: 30,
  blur: 30
  })
  console.log(totehsheatArray);

var totelthsheatArray = L.heatLayer(totelthsheatArray, {
  radius: 30,
  blur: 40
  })
  console.log(totelthsheatArray);
    
var toteheatArray = L.heatLayer(toteheatArray, {
  radius: 30,
  blur: 50
  })
  console.log(toteheatArray);
// var markers = L.layerGroup(markers);
//   console.log(markers);


  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Create an overlayMaps object to hold the bikeStations layer
  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
  });

  var comic = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.comic",
  accessToken: API_KEY
  });
  
  var pirate = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.pirates",
  accessToken: API_KEY
  });

  var baseMaps = {
    Street: streetmap,
    Light: light,
    Dark: dark,
    Comic: comic,
    Pirate: pirate
    };

  var overlayMaps = {
    PopulationHeat: popheat,
    PopulationMarkers: popmarkers, 
    MedianIncomeHeat: medEarnheatArray,
    Female_Assoc: fmeassocheatArray,
    Female_Bach: fmebachheatArray,
    Female_Grad: fmegradheatArray, 
    Female_HS: fmehsheatArray,
    Female_LHS: fmelthsheatArray,
    Female_MI: fmeheatArray,
    Male_Assoc: mleassocheatArray,
    Male_Bach: mlebachheatArray,
    Male_Grad: mlegradheatArray, 
    Male_HS: mlehsheatArray,
    Male_LHS: mlelthsheatArray,
    Male_MI: mleheatArray,
    Total_Assoc: mleassocheatArray,
    Total_Bach: mlebachheatArray,
    Total_Grad: mlegradheatArray, 
    Total_HS: mlehsheatArray,
    Total_LHS: mlelthsheatArray,
    Total_MI: mleheatArray,
    MedianIncomeCircle: medearncircle,
    PopulationCirle: popcircle
  };

  // Create the map object with options
   myMap = L.map("map-id", {
    center: [38.8403, -97.6114],
    zoom: 7,
    layers: [streetmap, popmarkers]
  });

//   // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map

L.control.layers(baseMaps, overlayMaps).addTo(myMap);


}
