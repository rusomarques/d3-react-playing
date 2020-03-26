import React, { useRef, useEffect } from 'react';
import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending
} from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';

const StackedBarChart = ({ data, keys, colors }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const stackGenerator = stack()
      .keys(keys)
      .order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, layer => max(layer, sequence => sequence[1]))
    ];

    const xScale = scaleBand()
      .domain(data.map(d => d.year))
      .range([0, width])
      .padding(0.25);
    const yScale = scaleLinear()
      .domain(extent)
      .range([height, 0]);

    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', layer => colors[layer.key])
      .selectAll('rect')
      .data(layer => layer)
      .join('rect')
      .attr('x', sequence => xScale(sequence.data.year))
      .attr('width', xScale.bandwidth())
      .attr('y', sequence => yScale(sequence[1]))
      .attr('height', sequence => yScale(sequence[0]) - yScale(sequence[1]));

    const yAxis = axisLeft(yScale);

    const xAxis = axisBottom(xScale);

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.select('.y-axis').call(yAxis);
  }, [data, keys, colors, dimensions]);

  return (
    <div className="svg-wrapper" ref={wrapperRef}>
      <svg className="svg" ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default StackedBarChart;
