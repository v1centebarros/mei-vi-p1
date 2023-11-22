import {useEffect, useMemo, useRef} from "react";
import * as d3 from "d3";
import {useDimensions} from "../../../hooks/useDimensions.js";

const MARGIN = {top: 30, right: 30, bottom: 50, left: 50};

export const SimpleLinePlot = ({data}) => {
    const wrapperRef = useRef();
    const {width,height} = useDimensions(wrapperRef);

    const axesRef = useRef(null);
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    // Y axis
    const [min, max] = d3.extent(data, (d) => d.y);
    const yScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, max || 0])
            .range([boundsHeight, 0]);
    }, [data, height]);

    // X axis
    const [xMin, xMax] = d3.extent(data, (d) => d.x);
    const xScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, xMax || 0])
            .range([0, boundsWidth]);
    }, [data, width]);

    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = d3.axisBottom(xScale);
        svgElement
            .append("g")
            .attr("transform", "translate(0," + boundsHeight + ")")
            .call(xAxisGenerator);

        const yAxisGenerator = d3.axisLeft(yScale);
        svgElement.append("g").call(yAxisGenerator);
    }, [xScale, yScale, boundsHeight]);

    useEffect(() => {
        console.log(wrapperRef.current)
        console.log(width, height);
    }, [width, height]);
    // Build the line
    const lineBuilder = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));
    const linePath = lineBuilder(data);
    if (!linePath) {
        return null;
    }

    return (<div className={"w-full flex-1 bg-amber-300"} ref={wrapperRef}>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    <path
                        d={linePath}
                        opacity={1}
                        stroke="#9a6fb0"
                        fill="none"
                        strokeWidth={2}
                    />
                </g>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    ref={axesRef}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                />
            </svg>
        </div>);
};