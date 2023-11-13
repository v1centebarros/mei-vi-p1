import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const Histogram = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // Select the SVG element and clear it
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Append group element and transform it
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis: scale and draw
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.age)])
        .range([0, width]);
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Set the parameters for the histogram
    const histogram = d3.histogram()
        .value(d => d.age)
        .domain(x.domain())
        .thresholds(x.ticks(40));  // Number of bins

    // Group the data for the bars by gender
    const binsMale = histogram(data.filter(d => d.gender === 'M'));
    const binsFemale = histogram(data.filter(d => d.gender === 'F'));

    // Y axis: scale and draw
    const y = d3.scaleLinear()
        .domain([0, d3.max([...binsMale, ...binsFemale], d => d.length)])
        .range([height, 0]);
    g.append("g").call(d3.axisLeft(y));

    // Color palette
    const colors = { 'M': "#1f77b4", 'F': "#e377c2" };

    // Show the bars
    g.selectAll(".bar.male")
        .data(binsMale)
        .enter()
        .append("rect")
        .attr("class", "bar male")
        .attr("x", d => x(d.x0) + 1)
        .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
        .attr("y", d => y(d.length))
        .attr("height", d => height - y(d.length))
        .attr("fill", colors['M']);

    g.selectAll(".bar.female")
        .data(binsFemale)
        .enter()
        .append("rect")
        .attr("class", "bar female")
        .attr("x", d => x(d.x0) + 1)
        .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
        .attr("y", d => y(d.length))
        .attr("height", d => height - y(d.length))
        .attr("fill", colors['F']);

  }, [data]);

  return (
      <svg ref={svgRef} width={800} height={600} />
  );
};
