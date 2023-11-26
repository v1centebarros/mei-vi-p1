import {useEffect, useRef} from 'react';
import {boundsCalculator, DEFAULT_COLOR} from '../../../utils/utils';
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
        const tooltip = d3.select("#container").append("div").attr("class", "tooltip");

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
            .attr("stroke", DEFAULT_COLOR)
            .attr("stroke-width", 1.5)
            .attr("d", d3.line().x(d => x(d.date)).y(d => y(d.deaths)));

// Add dots for each data point
        g.selectAll(".dot")
            .data(parsedData)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.deaths))
            .attr("r", 2) // Radius of the dots; adjust as needed
            .attr("fill", DEFAULT_COLOR).on("mouseover", function () {
            return tooltip.style("visibility", "visible");
        })
            .on("mousemove", function (event, d) {

                return tooltip
                    .style("position", "absolute")
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px")
                    .html(`<div class="card bg-base-100 shadow"><div class="text-sm">${d.date}</div><div class="text-sm">Number of Fatalities: ${d.deaths}</div>`);
            })
            // Make div disappear
            .on("mouseout", function () {
                //set tooltip position on top and hide
                return tooltip.style("visibility", "hidden")

            });
        // Add labels
        g.append("text")
            .attr("transform", `translate(${width / 3},${(height - margin.bottom / 3)})`)
            .text("Date of the event");

        // Add labels
        g.append("text")
            .attr("transform", `translate(-40,${height / 2}) rotate(-90)`)
            .style("text-anchor", "middle")
            .text("Number of Fatalities");

    }, [data, width, height]); // Dependency array includes width and height

    return (<svg ref={svgRef} width={width} height={height}></svg>);
};
