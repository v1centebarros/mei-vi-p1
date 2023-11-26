import {useEffect, useRef} from "react";
import {boundsCalculator} from "../../../utils/utils.js";
import * as d3 from "d3";

export const TreePlot = ({data, width, height, margin, regionName}) => {
    const svgRef = useRef();

    function createHierarchy(data, regionName) {
        let filteredData = data;
        // If regionName is provided, filter the data to include only that region
        if (regionName) {
            filteredData = data.filter(d => d.event_location_region === regionName);
        }

        // Grouping data by region and then by district
        const groupedByRegion = d3.groups(filteredData, d => d.event_location_district);

        // Transforming the grouped data into the required hierarchical format
        const hierarchy = {
            type: 'node', name: 'root', children: groupedByRegion.map(([district, records]) => ({
                type: 'leaf', name: district, value: records.length
            }))
        };

        return hierarchy;
    }

    useEffect(() => {
        if (!data) return;

        // Calculate bounds
        const {boundsWidth, boundsHeight} = boundsCalculator(width, height, margin);

        // Select the SVG element and clear it
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Define the hierarchical structure
        const hierarchy = d3.hierarchy(createHierarchy(data, regionName))
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        // Create a treemap layout
        const treeGenerator = d3.treemap()
            .size([boundsWidth, boundsHeight])
            .padding(1)
            .tile(d3.treemapResquarify);

        // Compute the treemap layout
        const root = treeGenerator(hierarchy);

        // Create a color scale for each district
        const colorScale = d3.scaleOrdinal()
            .domain(root.leaves().map(d => d.data.name))
            .range(d3.schemeSet2);

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const tooltip = d3.select("#container").append("div").attr("class", "tooltip");


        // Drawing rectangles for each node
        g.selectAll("rect")
            .data(root.leaves())
            .join("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .style("fill", d => colorScale(d.data.name)) // Use a color scale function for colors
            .attr("class", "opacity-80 hover:opacity-100").on("mouseover", function () {
            return tooltip.style("visibility", "visible");
        })
            .on("mousemove", function (event, d) {
                return tooltip
                    .style("position", "absolute")
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px")
                    .html(`<div class="card bg-base-100 shadow"><div class="card-body"><div class="card-title">${d.data.name}</div><div class="text-sm">Number of Fatalities: ${d.data.value}</div></div>`);
            })
            // Make div disappear
            .on("mouseout", function () {
                return tooltip.style("visibility", "hidden").style("top", "0px").style("left", "0px");
            });

        // Adding text labels only if they fit in the rectangle
        g.selectAll("text.name")
            .data(root.leaves())
            .join("text")
            .attr("class", "name")
            .attr("x", d => d.x0 + 5)
            .attr("y", d => d.y0 + 20)
            .text(d => d.data.name)
            .attr("font-size", d => Math.min(12, (d.x1 - d.x0) / 3)) // Adjust font size based on rectangle width
            .attr("fill", "black") // Changed for better legibility
            .attr("text-anchor", "start")
            .attr("alignment-baseline", "hanging")
            .style("display", d => (d.x1 - d.x0) > d.data.name.length * 8 ? "block" : "none"); // Hide text if it doesn't fit

    }, [data, width, height, margin, regionName]); // Add regionName as a dependency

    return <svg ref={svgRef} width={width} height={height}></svg>;
};