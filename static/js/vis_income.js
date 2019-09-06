//Pie Chart to demonstrate gender gap by county

function getGenderData(county) {

  var url = `/genderoverall`;
  d3.json(url).then(function (response) {
    //var pie_data = d3.select("#pie");
    // console.error(response);
    response = response.filter(c => c.county === county);
    var County = response.map(function (c) { return c.county });
    var Male = response.map(function (c) { return (c.MaleMedianEarnings) });
    var Male = parseInt(Male);
    var Female = response.map(function (c) { return (c.FemaleMedianEarnings) });
    var Female = parseInt(Female);
    // console.log(County);
    // console.log(Male);});
    var pieTrace = {
      values: [Male, Female],
      labels: ["Male", "Female"],
      type: "pie",
      marker: {
        colors: ["#3e9bae","#f078e3"]},
      //text: County,
    };

    var pieLayout = {
      title: `<b>Male vs Female Median Income</b><br>${county} County`,
      yaxis: { autorange: true },
    };
    Plotly.newPlot("pie", [pieTrace], pieLayout);
  });

}
getGenderData("Allen");

// Create HS Bubble Chart

function getHSData(county) {
  d3.csv("../static/data/Census_Data/race_ed_lvl_tbl.csv", function (HSData) {
    
    if (HSData.county === county) {
      //console.log(HSData);
      var race_textA = HSData.county;
      var white_hs = Math.round(HSData.White_HS / HSData.White_Pop * 100, 3);

      //var white_bach = Math.round(BachData.white_bach / BachData.White_Pop * 100, 3);
      var black_hs = Math.round(HSData.Black_HS / HSData.Black_Pop * 100, 3);
      //var black_bach = Math.round(BachData.Black_Bach / BachData.Black_Pop * 100, 3);
      var ind_hs = Math.round(HSData.AmIndAK_HS / HSData.AmIndAK_Pop * 100, 3);
      //var ind_bach = Math.round(BachData.AmIndAK_Bach / BachData.AmIndAK_Pop * 100, 3);
      var asian_hs = Math.round(HSData.Asian_HS / HSData.Asian_Pop * 100, 3);
      //var asian_bach = Math.round(BachData.Asian_Bach / BachData.Asian_Pop * 100, 3);
      var HI_PI_hs = Math.round(HSData.HI0PI_HS / HSData.HI0PI_Pop * 100, 3);
      //var HI_PI_bach = Math.round(BachData.HI0PI_Bach / BachData.HI0PI_Pop * 100, 3);
      var hisp_hs = Math.round(HSData.Hisp_HS / HSData.Hisp_Pop * 100, 3);
      //var hisp_bach = Math.round(BachData.Hisp_Bach / BachData.Hisp_Pop * 100, 3);
      var multi_hs = Math.round(HSData.Multi_HS / HSData.Multi_Pop * 100, 3);
      //var multi_bach = Math.round(BachData.Multi_Bach / BachData.Multi_Pop * 100, 3);
      var other_hs = Math.round(HSData.Other_HS / HSData.Other_Pop * 100, 3);
      //var other_bach = Math.round(BachData.Other_Bach / BachData.Other_Pop * 100, 3);
     // console.log(ind_hs)
     // console.log(other_HS);

      var yval = [white_hs, black_hs, ind_hs, asian_hs, HI_PI_hs, hisp_hs, other_hs, multi_hs];
      var trace = {
        y: yval,
        x: ["White", "Black", "American Indian/Alaskan", "Asian", "Hawaiian/Pacific Islander", "Hispanic", "Other", "Multi-racial"],
        mode: "markers",
        marker: {
          size: yval,
          color: "#78bcf0"
        },
        type: "bubble"
        //text: yval + '%'
      }
      var data = [trace];
      var layout = {
        title: `<b>High School Education by Race (%)</b><br> Education Level Achieved/Total Race Population,<br> ${county} County<br>`,
        autosize: true
      };
      console.log("blah")
      Plotly.newPlot("bubble0", data, layout)
    }
  });
}
getHSData("Allen");

function getBachData(county) {
  d3.csv("../static/data/Census_Data/race_ed_lvl_tbl.csv", function (BachData) {
    // BachData = BachData.filter(c=> c.county===county);
    // 
    if (BachData.county === county) {
      console.log(BachData);
      var race_text = BachData.county;
      //var white_hs = Math.round(BachData.White_HS / BachData.White_Pop * 100, 3);

      var white_bach = Math.round(BachData.White_Bach / BachData.White_Pop * 100, 3);
      //var black_hs = Math.round(BachData.Black_HS / BachData.Black_Pop * 100, 3);
      var black_bach = Math.round(BachData.Black_Bach / BachData.Black_Pop * 100, 3);
      //var ind_hs = Math.round(BachData.AmIndAK_HS / BachData.AmIndAK_Pop * 100, 3);
      var ind_bach = Math.round(BachData.AmIndAK_Bach / BachData.AmIndAK_Pop * 100, 3);
      //var asian_hs = Math.round(BachData.Asian_HS / BachData.Asian_Pop * 100, 3);
      var asian_bach = Math.round(BachData.Asian_Bach / BachData.Asian_Pop * 100, 3);
      //var HI_PI_hs = Math.round(BachData.HI0PI_HS / BachData.HI0PI_Pop * 100, 3);
      var HI_PI_bach = Math.round(BachData.HI0PI_Bach / BachData.HI0PI_Pop * 100, 3);
      //var hisp_hs = Math.round(BachData.Hisp_HS / BachData.Hisp_Pop * 100, 3);
      var hisp_bach = Math.round(BachData.Hisp_Bach / BachData.Hisp_Pop * 100, 3);
      //var multi_hs = Math.round(BachData.Multi_HS / BachData.Multi_Pop * 100, 3);
      var multi_bach = Math.round(BachData.Multi_Bach / BachData.Multi_Pop * 100, 3);
      //var other_hs = Math.round(BachData.Other_HS / BachData.Other_Pop * 100, 3);
      var other_bach = Math.round(BachData.Other_Bach / BachData.Other_Pop * 100, 3);
      console.log(white_bach)
      //console.log(other_bach);

      var yvalB = [white_bach, black_bach, ind_bach, asian_bach, HI_PI_bach, hisp_bach, other_bach, multi_bach];
      var traceB = {
        y: yvalB,
        x: ["White", "Black", "American Indian/Alaskan", "Asian", "Hawaiian/Pacific Islander", "Hispanic", "Other", "Multi-racial"],
        mode: "markers",
        marker: {
          size: yvalB,
          color: "#86c15d"
        },
        type: "bubble"
        //text: yval + '%'
      }
      var data= [traceB];
      var layout = {
        title: `<b>Bachelor's Degree by Race (%)</b><br> Education Level Achieved/Total Race Population,<br> ${county} County<br>`,
        autosize: true
      };

      Plotly.newPlot("bubble", data, layout)
    }
  });
}
getBachData("Allen");

//getBachData(this.value)

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/countynames").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
      console.log(sample)
    });
  })
}
init("Allen");

function optionChanged(county) {
  console.log(county)
  getHSData(county);
  getBachData(county);
  getGenderData(county);
}