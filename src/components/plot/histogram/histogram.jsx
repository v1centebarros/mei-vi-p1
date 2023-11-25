import {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {boundsCalculator} from '../../../utils/utils';

export const Histogram = ({data, width, height, margin}) => {
    const svgRef = useRef();
    const colors = {'M': "#1f77b4", 'F': "#e377c2"};

    useEffect(() => {
        if (!data) return;

        // Set the dimensions and margins of the graph

        const {boundsWidth, boundsHeight} = boundsCalculator(width, height, margin);

        // Select the SVG element and clear it
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

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

        const binsMale = histogram(data.filter(d => d.gender === 'M'));
        const binsFemale = histogram(data.filter(d => d.gender === 'F'));

        const y = d3.scaleLinear()
            .domain([0, d3.max([...binsMale, ...binsFemale], d => d.length)])
            .range([boundsHeight, 0]);
        g.append("g").call(d3.axisLeft(y));


        // Add the bars
        g.selectAll(".bar.male")
            .data(binsMale)
            .join("rect")
            .attr("x", 1)
            .attr("transform", d => `translate(${x(d.x0)},${y(d.length)})`)
            .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
            .attr("height", d => Math.max(0, boundsHeight - y(d.length)))
            .style("fill", colors['M']);

        g.selectAll(".bar.female")
            .data(binsFemale)
            .join("rect")
            .attr("x", 1)
            .attr("transform", d => `translate(${x(d.x0)},${y(d.length)})`)
            .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
            .attr("height", d => Math.max(0, boundsHeight - y(d.length)))
            .style("fill", colors['F']);

        // Add labels
        g.append("text")
            .attr("transform", `translate(${width / 2},${height - margin.bottom / 2})`)
            .text("Age");

        // Add labels
        g.append("text")
            .attr("transform", `translate(-40,${(height / 2) + margin.top}) rotate(-90)`)
            .text("Number of Deaths");

        // Add legend
        const legend = g.append("g")
            .attr("transform", `translate(${boundsWidth - 50},${margin.top + 20})`)
            .attr("text-anchor", "end")
            .style("font", "12px sans-serif")
            .selectAll("g")
            .data(Object.keys(colors))
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        legend.append("rect")
            .attr("x", -19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", d => colors[d]);

        legend.append("text")
            .attr("x", -24)
            .attr("y", 9.5)
            .attr("dy", "0.35em")
            .text(d => d);


    }, [data, width, height]);

    return <svg ref={svgRef} width={width} height={height}/>
};
