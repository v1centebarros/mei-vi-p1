import ScatterPlot from "../../components/plot/scatterPlot/scatterPlot.jsx";

export const Stats = (props) => {
  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
  ];

  return <>
    <ScatterPlot width={500} height={500} data={data} />
  </>
};