import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const GunfirePieChart = ({ data, width,height,margin }) => {
  const svgRef = useRef();
  const radius = Math.min(width, height) / 2; // Radius of the pie chart
  const legendRectSize = 15; // Defines the size of the legend color box
  const legendSpacing = 10; // Defines the spacing between legend items

  useEffect(() => {
    if (!data) return;



    // Prepare data for the 'Kills by Gunfire' pie chart
    const gunfireData = d3.rollups(data, v => v.length, d => d.ammunition)
        .map(([key, value]) => ({ gunfireType: key, count: value }));

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Pie function
    const pie = d3.pie().value(d => d.count);
    const gunfirePieData = pie(gunfireData);

    // Arc generator
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius - 10);

    // Label arc generator (for placing labels outside the arcs)
    const labelArc = d3.arc().outerRadius(radius).innerRadius(radius);

    // Create the pie chart
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous SVG contents

    // Translate the group to center the pie chart within the SVG
    const g = svg.append('g')
        .attr('transform', `translate(${radius}, ${height / 2})`);

    // Draw the pie chart
    g.selectAll('path')
        .data(gunfirePieData)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', (d, i) => color(i));

    // Legend group, which is translated to the right side of the pie chart
      const legend = svg.selectAll('.legend')
          .data(color.domain())
          .enter()
          .append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) {
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
        .text(d => gunfireData[d].gunfireType);
  }, [data, width, height]);

  return (
      <svg ref={svgRef} width={width} height={height}></svg>
  );
};

