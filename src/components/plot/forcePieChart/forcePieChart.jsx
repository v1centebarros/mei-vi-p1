import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

export const ForcePieChart = ({data, width, height, margin}) => {
    const svgRef = useRef();
    const radius = Math.min(width, height) / 2; // Radius of the pie chart
    const legendRectSize = 20; // Defines the size of the legend color box
    const legendSpacing = 10; // Defines the spacing between legend items

    useEffect(() => {
        if (!data) return;

        // Prepare data for the 'Kills by Force' pie chart
        const forceData = d3.rollups(data, v => v.length, d => d.killed_by)
            .map(([key, value]) => ({force: key, count: value}));

        // Color scale
        const color = d3.scaleOrdinal(d3.schemeSet2);

        // Pie function
        const pie = d3.pie().value(d => d.count)(forceData);

        // Arc generator
        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius - 10);

        // Create the pie chart
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous SVG contents

        // Translate the group to center the pie chart within the SVG
        const g = svg.append('g')
            .attr('transform', `translate(${radius}, ${height / 2})`);

        const tooltip = d3.select("#container").append("div").attr("class", "tooltip");

        // Draw the pie chart
        g.selectAll('path')
            .data(pie)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', (d, i) => color(i)).on("mouseover", function () {
            return tooltip.style("visibility", "visible");
        })
            .on("mousemove", function (event, d) {
                return tooltip
                    .style("position", "absolute")
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px")
                    .html(`<div class="card bg-base-100 shadow">
<div class="card-body">
<div class="card-title">${d.data.force}</div><div class="text-sm">Number of Fatalities: ${d.data.count}</div></div>`);
            })
            // Make div disappear
            .on("mouseout", function () {
                return tooltip.style("visibility", "hidden");
            });

        // Legend group, which is translated to the right side of the pie chart
        const legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function (d, i) {
                const height = legendRectSize + legendSpacing;
                const offset = height * color.domain().length / 2;
                const horz = 2 * radius + 40; // Move to the right side of the pie
                const vert = i * height;
                return `translate(${horz}, ${vert + (height / 2)})`;
            });

        // Draw legend colored rectangles
        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);

        // Draw legend text
        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(d => forceData[d].force);

    }, [data, width, height]);

    return (<svg ref={svgRef} width={width} height={height}></svg>);
};