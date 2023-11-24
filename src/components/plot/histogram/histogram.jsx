import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { boundsCalculator } from '../../../utils/utils';

export const Histogram = ({ data, width, height, margin }) => {
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

        // X axis: scale and draw
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.age)])
            .range([0, boundsWidth]);
        g.append("g")
            .attr("transform", `translate(0,${boundsHeight})`)
            .call(d3.axisBottom(x));

        // Set the parameters for the histogram
        const histogram = d3.bin()
            .value(d => d.age)
            .domain(x.domain())
            .thresholds(x.ticks(40));  // Number of bins

        // Group the data for the bars by gender
        const binsMale = histogram(data.filter(d => d.gender === 'M'));
        const binsFemale = histogram(data.filter(d => d.gender === 'F'));

        // Y axis: scale and draw
        const y = d3.scaleLinear()
            .domain([0, d3.max([...binsMale, ...binsFemale], d => d.length)])
            .range([boundsHeight, 0]);
        g.append("g").call(d3.axisLeft(y));

        // Color palette
        const colors = { 'M': "#1f77b4", 'F': "#e377c2" };

        // Show the bars
        // Show the bars
        g.selectAll(".bar.male")
            .data(binsMale)
            .enter()
            .append("rect")
            .attr("class", "bar male")
            .attr("x", d => x(d.x0) + 1)
            .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
            .attr("y", d => y(d.length))
            .attr("height", d => boundsHeight - y(d.length))  // Corrected this line
            .attr("fill", colors['M']);

        g.selectAll(".bar.female")
            .data(binsFemale)
            .enter()
            .append("rect")
            .attr("class", "bar female")
            .attr("x", d => x(d.x0) + 1)
            .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
            .attr("y", d => y(d.length))
            .attr("height", d => boundsHeight - y(d.length))  // Corrected this line
            .attr("fill", colors['F']);


    }, [data, width, height]);

    return <svg ref={svgRef} width={width} height={height} />
};
