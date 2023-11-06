import * as d3 from 'd3';
const ScatterPlot = ({ width, height, data }) => {
  // Define scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.x))
    .range([0, width]);
 
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.y))
    .range([height, 0]);
 
  // Generate circles
  const circles = data.map((d, i) => (
    <circle
      key={i}
      r={5}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      fill="#69b3a2"
    />
  ));
 
  return (
    <svg width={width} height={height}>
      {circles}
    </svg>
  );
 };
 
 export default ScatterPlot;