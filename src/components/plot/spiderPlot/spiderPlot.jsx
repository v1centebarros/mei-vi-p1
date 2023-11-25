import * as d3 from 'd3';
import {INNER_RADIUS, SpiderGrid} from "./grid.jsx";
import React, { useEffect, useState } from "react";

const MARGIN = 30;

export const SpiderPlot = ({data, width, height}) => {
    const [svgElements, setSvgElements] = useState({ linePath: '', xScale: null, axisConfig: [], outerRadius: 0 });

    useEffect(() => {
        if (!data || !width || !height) return;

        let parsedData = {};
        d3.groups(data, d => d.event_location_region).forEach(([region, deaths]) => {
            parsedData[region] = deaths.length;
        });

        const maxValue = d3.max(Object.values(parsedData));


        console.log(parsedData)
        const axisConfig = [
            {name: 'West Bank', max: maxValue},
            {name: 'Gaza Strip', max: maxValue},
            {name: 'Israel', max: maxValue}
        ];
        const outerRadius = Math.min(width, height) / 2 - MARGIN;

        const allVariableNames = axisConfig.map(axis => axis.name);
        const xScale = d3.scaleBand()
            .domain(allVariableNames)
            .range([0, 2 * Math.PI]);

        let yScales = {};
        axisConfig.forEach((axis) => {
            yScales[axis.name] = d3
                .scaleRadial()
                .domain([0, axis.max])
                .range([INNER_RADIUS, outerRadius]);
        });

        const lineGenerator = d3.lineRadial();
        const allCoordinates = axisConfig.map((axis) => {
            const yScale = yScales[axis.name];
            const angle = xScale(axis.name) ?? 0;
            const radius = yScale(parsedData[axis.name] || 0);
            return [angle, radius];
        });

        allCoordinates.push(allCoordinates[0]);
        const linePath = lineGenerator(allCoordinates);

        setSvgElements({ linePath, xScale, axisConfig, outerRadius });
    }, [data, width, height]);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${width / 2},${height / 2})`}>
                {svgElements.xScale && <SpiderGrid
                    outerRadius={svgElements.outerRadius}
                    xScale={svgElements.xScale}
                    axisConfig={svgElements.axisConfig}
                />}
                <path
                    d={svgElements.linePath}
                    stroke={'#cb1dd1'}
                    strokeWidth={3}
                    fill={'#cb1dd1'}
                    fillOpacity={0.1}
                />
            </g>
        </svg>
    );
};
