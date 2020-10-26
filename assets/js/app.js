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

let svg = d3.select(".container")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

let containerGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(stateData) {
    stateData.poverty = +stateData.poverty;
    stateData.healthcare = +stateData.healthcare;
    console.log(stateData);
});