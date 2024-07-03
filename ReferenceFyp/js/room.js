// Define the dimensions of the chart
const width = 800;
const height = 400;
const gridSize = 50; // Size of each grid cell

// Create a zoom behavior
const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

// Create the SVG container for the chart
const svg = d3.select("#chart")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .call(zoom)
    .append("g");

// Generate data for the rooms (3x8 grid)
const rooms = [];
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
        rooms.push({
            id: `room-${row}-${col}`,
            x: col * gridSize,
            y: row * gridSize,
            width: gridSize,
            height: gridSize,
            color: "lightblue" // Default color
        });
    }
}
// Draw the rooms as rectangles
const roomRects = svg.selectAll(".room")
    .data(rooms)
    .enter().append("rect")
    .attr("class", "room")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", d => d.height)
    .attr("fill", d => d.color)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("cursor", "pointer")
    .on("click", clicked);

// Function to handle zooming
function zoomed(event) {
    const { transform } = event;
    svg.attr("transform", transform);
    svg.attr("stroke-width", 1 / transform.k);
}

// Function to handle click on a room
function clicked(event, d) {
    // Toggle color on click
    const newColor = d.color === "lightblue" ? "lightcoral" : "lightblue";
    d3.select(this).attr("fill", newColor);
}

// Function to reset zoom and colors
function reset() {
    roomRects.transition().attr("fill", "lightblue");
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
}

// Bind reset function to a reset button or click on background
d3.select("body").on("click", reset);
