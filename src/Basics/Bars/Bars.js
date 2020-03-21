import React, { useRef, useEffect } from 'react';
import { select, scaleLinear, axisBottom, axisRight, scaleBand } from 'd3';

import useResizeObserver from '../../hooks/useResizeObserver';

const Bars = ({ data }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!dimensions) return;
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width])
      .padding(0.3);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([dimensions.height, 0]);

    const colorScale = scaleLinear()
      .domain([50, 80, 150]) // all values below 50 are green
      .range(['green', 'orange', 'red']);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index + 1);

    const yAxis = axisRight(yScale);

    svg
      .select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis); // same as xAxis(svg.select('x-axis))

    svg
      .select('.y-axis')
      .style('transform', `translateX(${dimensions.width}px)`)
      .call(yAxis); // same as xAxis(svg.select('x-axis))

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (value, index) => xScale(index))
      // .attr('y', yScale) in order to apply transition, it is needed to fix on -150
      .style('transform', 'scale(1, -1)')
      .attr('y', -dimensions.height)
      .attr('width', xScale.bandwidth())
      .on('mouseenter', (value, index) => {
        svg
          .selectAll('.tooltip')
          .data([data])
          .join(enter => enter.append('text').attr('y', yScale(value) - 4))
          .attr('class', 'tooltip')
          .text(value)
          .attr('x', xScale(index) + xScale.bandwidth() / 2)
          .attr('text-anchor', 'middle')
          .transition()
          .attr('y', yScale(value) - 8)
          .attr('opacity', 1);
      })
      .on('mouseleave', () => svg.selectAll('.tooltip').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', value => dimensions.height - yScale(value));
  }, [data, dimensions]);

  return (
    <div className="svg-wrapper" ref={wrapperRef}>
      <svg className="basics-svg" ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default Bars;
