import {useEffect, useRef} from "react";
import {boundsCalculator} from "../../../utils/utils.js";
import * as d3 from "d3";

export const TreePlot = ({data, width, height, margin}) => {
    const svgRef = useRef();

    function createHierarchy(data) {
        // Grouping data by region and then by district
        const groupedByRegion = d3.groups(data, d => d.event_location_region, d => d.event_location_district);

        // Transforming the grouped data into the required hierarchical format
        const hierarchy = {
            type: 'node',
            name: 'root',
            value: data.length,
            children: groupedByRegion.map(([region, districts]) => ({
                type: 'node',
                name: region,
                value: d3.sum(districts, district => district[1].length),
                children: districts.map(([district, records]) => ({
                    type: 'leaf',
                    name: district,
                    value: records.length
                }))
            }))
        };

        return hierarchy;
    }

    useEffect(() => {

        if (!data) return;
        // Select the SVG element and clear it
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Define the hierarchical structure
        const hierarchy = d3.hierarchy(createHierarchy(data))
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        // Create a treemap layout
        const treeGenerator = d3.treemap()
            .size([width, height])
            .padding(1)
            .tile(d3.treemapResquarify); // This tiling method attempts to create squarified rectangles

        const firstLevelGroups = hierarchy.children.map(d => d.data.name);
        // Create a color scale for each region
        const colorScale = d3.scaleOrdinal()
            .domain(firstLevelGroups)
            .range(d3.schemeSet3);

        // Compute the treemap layout
        const root = treeGenerator(hierarchy);

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        // Drawing rectangles for each node
        g.selectAll("rect")
            .data(root.leaves())
            .join("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .style("fill", d => colorScale(d.data.name)) // Use a color scale function for colors
            .attr("class", "opacity-80 hover:opacity-100");

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

        // Adding values as text (optional)
        g.selectAll("text.value")
            .data(root.leaves())
            .join("text")
            .attr("class", "value")
            .attr("x", d => d.x0 + 5)
            .attr("y", d => d.y0 + 35)
            .text(d => d.data.value)
            .attr("font-size", d => Math.min(12, (d.x1 - d.x0) / 3)) // Adjust font size based on rectangle width
            .attr("fill", "black") // Changed for better legibility
            .attr("text-anchor", "start")
            .attr("alignment-baseline", "hanging")
            .style("display", d => (d.y1 - d.y0) > 20 ? "block" : "none"); // Hide text if the rectangle is too short

    }, [data, width, height, margin]);


    return <svg ref={svgRef} width={width} height={height}></svg>;
};