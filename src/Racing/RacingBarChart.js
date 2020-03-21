import React, { useRef, useEffect } from 'react';
import {
  select,
  min,
  max,
  scaleTime,
  axisBottom,
  scaleLinear,
  scaleBand
} from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';

const RacingBarChart = ({ data }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!dimensions) return;
    const svg = select(svgRef.current);

    // data.sort((b, a) => a.value - b.value);

    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((value, index) => index)) // [0,1,2,3,4,5]
      .range([0, dimensions.height]); // [0, 200]

    const xScale = scaleLinear()
      .domain([0, max(data, entry => entry.value)])
      .range([0, dimensions.width]);

    svg
      .selectAll('.bar')
      .data(data, entry => entry.name)
      .join(entry =>
        entry.append('rect').attr('y', (entry, index) => yScale(index))
      )
      .attr('fill', entry => entry.color)
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', yScale.bandwidth())
      .transition()
      .attr('width', entry => xScale(entry.value))
      .attr('y', (entry, index) => yScale(index));

    svg
      .selectAll('.label')
      .data(data, entry => entry.name)
      .join(entry =>
        entry
          .append('text')
          .attr(
            'y',
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .text(entry => `🐎 ${entry.name} (${entry.value})`)
      .attr('class', 'label')
      .attr('x', 10)
      .transition()
      .attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [data, dimensions]);

  return (
    <div className="svg-wrapper" ref={wrapperRef}>
      <svg className="basics-svg" ref={svgRef}>
        <g className="x-axis" />
      </svg>
    </div>
  );
};

export default RacingBarChart;
