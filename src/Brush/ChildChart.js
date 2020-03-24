import React, { useEffect, useRef } from 'react';
import {
  select,
  scaleLinear,
  max,
  line,
  curveCardinal,
  axisBottom,
  axisLeft
} from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';

const ChildChart = ({ data, selection, id = 'myClipPath' }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const content = svg.select('.child-content');
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const xScale = scaleLinear()
      .domain(selection)
      .range([10, width - 10]);

    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([height - 10, 10]);

    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y(d => yScale(d))
      .curve(curveCardinal);

    const xAxis = axisBottom(xScale);
    svg
      .select('.x-axis')
      .style('transform', `translateY(${height}px)`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select('.y-axis').call(yAxis);

    /* render Line */
    content
      .selectAll('.myLine')
      .data([data])
      .join('path')
      .attr('class', 'myLine')
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('d', lineGenerator);

    /* render dots */
    content
      .selectAll('.myDot')
      .data(data)
      .join('circle')
      .attr('class', 'myDot')
      .attr('stroke', 'black')
      .attr('r', 4)
      .attr('fill', 'orange')
      .attr('cx', (value, index) => xScale(index))
      .attr('cy', yScale);
  }, [data, dimensions, selection]);

  return (
    <div className="svg-wrapper" ref={wrapperRef}>
      <svg className="brush-svg" ref={svgRef}>
        <defs>
          <clipPath id={id}>
            <rect x="0" y="0" width="100%" height="100%" />
          </clipPath>
        </defs>
        <g className="child-content" clipPath={`url(#${id})`} />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default ChildChart;
