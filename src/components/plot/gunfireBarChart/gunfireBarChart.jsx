import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const GunfireBarChart = ({ data, width, height, margin }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    // Prepare data for the horizontal bar chart
    const gunfireData = d3.rollups(data, v => v.length, d => d.ammunition)
        .map(([key, value]) => ({ gunfireType: key, count: value }));

    // Sort the data by count
    gunfireData.sort((a, b) => b.count - a.count);

    // Create scales
    const yScale = d3.scaleBand()
        .domain(gunfireData.map(d => d.gunfireType))
        .rangeRound([margin.top, height - margin.bottom])
        .padding(0.1);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(gunfireData, d => d.count)])
        .nice()
        .range([margin.left, width - margin.right]);

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeSet2);

    // Create the SVG context and clear any previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous SVG contents

    const tooltip = d3.select("#container").append("div").attr("class", "tooltip");

    // Draw the bars
    svg.selectAll('.bar')
        .data(gunfireData)
        .join('rect')
        .attr('class', 'bar')
        .attr('y', d => yScale(d.gunfireType))
        .attr('x', margin.left)
        .attr('width', d => xScale(d.count) - margin.left)
        .attr('height', yScale.bandwidth())
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
<div class="card-title text-md">${d.gunfireType}</div><div class="text-sm">Number of Fatalities: ${d.count}</div></div>`);
        })
        // Make div disappear
        .on("mouseout", function () {
          return tooltip.style("visibility", "hidden");
        });


    // Add the Y Axis
    svg.append('g')
        .attr('transform', `translate(${margin.left})`)
        .call(d3.axisLeft(yScale))
        .selectAll('.tick text')
        .style('text-anchor', 'end');

    // Add the X Axis
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

    // Optional: Add labels to the end of the bars
    svg.selectAll('.label')
        .data(gunfireData)
        .join('text')
        .attr('class', 'label')
        .attr('y', d => yScale(d.gunfireType)+ 3 + yScale.bandwidth() / 2)
        .attr('x', d => xScale(d.count) + 3)
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
        .text(d => d.count);

  }, [data, width, height, margin]);

  return (
      <svg ref={svgRef} width={width} height={height}></svg>
  );
};