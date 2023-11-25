import {useEffect, useRef} from 'react';
import {boundsCalculator} from '../../../utils/utils';
import * as d3 from 'd3';

export const DeathLinePlot = ({data, width, height, margin}) => {
    const svgRef = useRef();


    useEffect(() => {
        if (!data) return;
        const {boundsWidth, boundsHeight} = boundsCalculator(width, height, margin);

        // Set the dimensions and margins of the graph
        // Select the SVG element and clear it
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Append group element and transform it
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        // Format the data
        const parseDate = d3.timeParse("%Y-%m-%d");

        // Aggregate the number of deaths by month
        const parsedData = d3.groups(data, d => d3.timeMonth(parseDate(d.date_of_event)))
            .map(([date, deaths]) => ({date, deaths: deaths.length}));

        parsedData.forEach(d => {
            d.date = new Date(d.date);
            d.deaths = +d.deaths;
        })

        // Add X axis
        const x = d3.scaleTime().domain(d3.extent(parsedData, d => d.date)).range([0, boundsWidth]);
        g.append("g").attr("transform", `translate(0,${boundsHeight})`).call(d3.axisBottom(x));
        // Add Y axis
        const y = d3.scaleLinear().domain([0, d3.max(parsedData, d => d.deaths)]).range([boundsHeight, 0]);
        g.append("g").call(d3.axisLeft(y));

        // Add the line
        g.append("path").datum(parsedData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line().x(d => x(d.date)).y(d => y(d.deaths)));
        // Add labels
        g.append("text")
            .attr("transform", `translate(${width / 2},${height + margin.bottom})`)
            .text("Date of Death");

        // Add labels
        g.append("text")
            .attr("transform", `translate(-40,${height / 2}) rotate(-90)`)
            .style("text-anchor", "middle")
            .text("Deaths");

    }, [data, width, height]); // Dependency array includes width and height

    return (<svg ref={svgRef} width={width} height={height}></svg>);
};
