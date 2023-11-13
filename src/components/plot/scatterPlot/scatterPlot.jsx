import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const ScatterPlot = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!data) return;

        // Set the dimensions and margins of the graph
        const margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

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

        // Add X axis
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date_of_death))
            .range([0, width]);
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.age)])
            .range([height, 0]);
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

    }, [data]);

    return (
        <svg ref={svgRef} width={960} height={500}></svg>
    );
};