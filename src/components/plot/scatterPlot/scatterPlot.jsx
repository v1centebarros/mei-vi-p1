import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { boundsCalculator } from '../../../utils/utils';

export const ScatterPlot = ({ data, width, height, margin}) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!data) return;

        // Set the dimensions and margins of the graph
        const { boundsWidth, boundsHeight } = boundsCalculator(width, height, margin);

        // Select the SVG element and clear it
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Append group element and transform it
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        // Format the data
        data.forEach(d => {
            d.date_of_death = new Date(d.date_of_death);
            d.age = +d.age;
        });

        // Add X axis and legend to label for date of death

        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date_of_death))
            .range([0, boundsWidth]);
        g.append("g")
            .attr("transform", `translate(0,${boundsHeight})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.age)])
            .range([boundsHeight, 0]);
        g.append("g").call(d3.axisLeft(y));

        // Add dots
        g.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", d => x(d.date_of_death))
            .attr("cy", d => y(d.age))
            .attr("r", 5)
            .style("fill", "#69b3a2")
            .style("opacity", 0.5);


        // Add labels
        g.append("text")
            .attr("transform", `translate(${width / 2},${(height - margin.bottom / 3)})`)
            .text("Year");

        // Add labels
        g.append("text")
            .attr("transform", `translate(-40,${height / 2}) rotate(-90)`)
            .style("text-anchor", "middle")
            .text("Age at Death");
    }, [data, width, height]);

    return <svg ref={svgRef} width={width} height={height}></svg>;
};