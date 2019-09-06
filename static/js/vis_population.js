// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the data.csv file
// =================================
// d3.csv("assets/data/data.csv", function(error, journalismData) {
  
  // if (error) throw error;
  // console.log(journalismData);

// var url = "../static/data/Census_Data/tot_earn_ed_lev_pop.csv"
// var url = "assets/data/data.csv"
// d3.csv(url).then(function(journalData){
//     console.log(journalData);
//     vizualize(journalData)
//     // console.log(journalData);
//   });

var metadataURL = "/totalearnedlevelpop/";
d3.json(metadataURL).then(function(journalData) {
  console.log(journalData);
  vizualize(journalData)
  // console.log(journalData);
});
  
  // Step 4: Format the data
  // =================================
function vizualize(journalData){
  var County = journalData.map(function (c) { return c.county });
  var TotalMedianEarnings = journalData.map(function (c) { return (+c.Total_Median_Earnings) });
  var population = journalData.map(function (c) { return (+c.Population) });
  console.log(TotalMedianEarnings);
  console.log(population);
  // journalData.forEach(function(data) {
  //   console.log(data);
    // data.state = data.abbr
    // Total_Median_Earning_Less_than_HS
    // data.earnings_ = +TotalMedianEarnings
    // data.population = +population;
    // console.log(data.earnings);
  

  // Step 5: Create the scales for the chart
  // =================================
  
  var xLinearScale = d3.scaleLinear()
      // .domain([d3.min(journalData, d => d.county), d3.max(journalData, d => d.county)])
      .domain([d3.min(population), d3.max(population)])
      .range([0, width]);
      // [d3.min(data), d3.max(data)]

  var yLinearScale = d3.scaleLinear()
      // .domain([0, d3.max(journalData, d => d.population)])
      .domain([0, d3.max(TotalMedianEarnings)])
      .range([height, 0]);

 
  // Step 6: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  // Step 7: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

  // Step 9: Create Circles
    // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
    .data(journalData)
    // .data(population)
    // .data(TotalMedianEarnings)
    .enter()
    .append("circle")
    .attr("cx", (d, i)=> xLinearScale(population[i]))
    .attr("cy", (d, i)=> yLinearScale(TotalMedianEarnings[i]))
    .attr("r", 10)
    .attr("fill", "steelblue")
    .attr("opacity", ".5");
  
  // var abbr = chartGroup.selectAll("label")
  //   .data(journalData) //change this to your data
  //   .enter()
  //   .append("text")
  //   .attr("class", "label")
  //   .text((d) => d.abbr)
  //   .attr("x", d => xLinearScale(d.county))
  //   .attr("y", d => yLinearScale(d.population))
  //   // .attr("class", "stateText")
  //   .attr("text-anchor", "middle")
  //   .attr("font-size", "10px")
  //   .attr("fill", "black")

  // Create y-axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - (margin.left + 2))
    .attr("x", 0 - (height / 1.90))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Median Income")
    .classed("active", true); 

  // X-Label
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Population")
    .classed("active", true); 

};