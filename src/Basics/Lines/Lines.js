import React, { useRef, useEffect } from 'react';
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  axisBottom,
  axisRight
} from 'd3';

const Lines = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);
    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index + 1);
    const yAxis = axisRight(yScale);

    svg
      .select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis); // same as xAxis(svg.select('x-axis))

    svg
      .select('.y-axis')
      .style('transform', 'translateX(300px)')
      .call(yAxis); // same as xAxis(svg.select('x-axis))

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'green');
  }, [data]);

  return (
    <svg className="basics-svg" width={300} height={150} ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default Lines;
