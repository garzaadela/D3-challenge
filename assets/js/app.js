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

let scatterGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

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

    scatterGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    scatterGroup.append("g")
        .call(leftAxis);

    // create circles
    let circlesGroup = scatterGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    // initialize tool tip
    let toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return(`${d.healthdata}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
        });

    // create tooltip in the chart
    scatterGroup.call(toolTip);

    // create event listeners to display and hide the tooltip

    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
    })

    // onmouseout event
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
    });

    // create axes labels
    scatterGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Number of Billboard 100 Hits");

    scatterGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Hair Metal Band Hair Length (inches)");
    }).catch(function(error) {
        console.log(error);
    });