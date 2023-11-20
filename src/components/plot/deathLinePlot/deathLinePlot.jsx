import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const DeathLinePlot = ({ data, width, height }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!data) return;

        // Set the dimensions and margins of the graph
        const margin = { top: 10, right: 30, bottom: 30, left: 60 },
            effectiveWidth = width - margin.left - margin.right,
            effectiveHeight = height - margin.top - margin.bottom;

        // Select the SVG element and clear it
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Append group element and transform it
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // Format the data agrregating by date and summing the deaths
    const parseDate = d3.timeParse("%Y-%m-%d");
    const parsedData = d3.groups(data, d => d.date_of_death).map(([date, deaths]) => {
        return {
            date: parseDate(date),
            deaths: deaths.length
        }
    });


        // Add X axis
        const x = d3.scaleTime()
            .domain(d3.extent(parsedData, d => d.date))
            .range([0, effectiveWidth]);
        g.append("g")
            .attr("transform", `translate(0,${effectiveHeight})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(parsedData, d => d.deaths)])
            .range([effectiveHeight, 0]);
        g.append("g").call(d3.axisLeft(y));

        // Add the line
        g.append("path")
            .datum(parsedData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(d => x(d.date))
                .y(d => y(d.deaths))
            );

    }, [data, width, height]); // Dependency array includes width and height

    return (
        <svg ref={svgRef} width={width} height={height}></svg>
    );
};
