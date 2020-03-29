import React, { useRef, useEffect, useState } from 'react';
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  zoom,
  zoomTransform
} from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';

const ZoomableLineChart = ({ data, id = 'myZoomableLineChart' }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [currentZoomState, setCurrentZoomState] = useState();

  useEffect(() => {
    const svg = select(svgRef.current);
    const svgContent = svg.select('.content');
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // scales + line generator
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([10, width - 10]);

    if (currentZoomState) {
      const newXscale = currentZoomState.rescaleX(xScale);
      xScale.domain(newXscale.domain());
    }

    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([height - 10, 10]);

    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y(d => yScale(d))
      .curve(curveCardinal);

    // render the line
    svgContent
      .selectAll('.myLine')
      .data([data])
      .join('path')
      .attr('class', 'myLine')
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('d', lineGenerator);

    svgContent
      .selectAll('.myDot')
      .data(data)
      .join('circle')
      .attr('class', 'myDot')
      .attr('stroke', 'black')
      .attr('r', 4)
      .attr('fill', 'orange')
      .attr('cx', (value, index) => xScale(index))
      .attr('cy', yScale);

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select('.y-axis').call(yAxis);

    const zoomBehaviour = zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([
        [0, 0],
        [width, height]
      ])
      .on('zoom', () => {
        const zoomState = zoomTransform(svg.node());
        setCurrentZoomState(zoomState);
      });

    svg.call(zoomBehaviour);
  }, [data, dimensions, currentZoomState]);

  return (
    <>
      <div ref={wrapperRef} className="zoom-svg-wrapper">
        <svg ref={svgRef} className="zoom-svg">
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`}></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};

export default ZoomableLineChart;
