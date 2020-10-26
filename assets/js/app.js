let svgWidth = 1000;
let svgHeight = 500;

let margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

let containerGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// initial params
// Y axis is healthcare
// X axis is poverty
// imported the data
d3.csv("assets/data/data.csv").then(function(stateData) {
    // parse data/cast as numbers
    stateData.forEach(function(data) {
        stateData.poverty = +stateData.poverty;
        stateData.healthcare = +stateData.healthcare;

    });
    
    // create scale functions
    let xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(stateData, d => d.poverty)])
        .range([0, width]);

    let yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.healthcare)])
        .range([height, 0]);

    // create axis functions
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // append Axes to the chart
    

});