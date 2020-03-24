import React, { useEffect, useRef, useState } from 'react';
import {
  select,
  scaleLinear,
  max,
  line,
  curveCardinal,
  axisBottom,
  axisLeft,
  brushX,
  event
} from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';
import usePrevious from '../hooks/usePrevious';

const BrushChart = ({ data, children }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const [selection, setSelection] = useState([0, 1.5]);
  const previousSelection = usePrevious(selection);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const yScale = scaleLinear()
      .domain([0, max(data)])
      .range([height, 0]);

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
    svg
      .selectAll('.myLine')
      .data([data])
      .join('path')
      .attr('class', 'myLine')
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('d', lineGenerator);

    /* render dots */
    svg
      .selectAll('.myDot')
      .data(data)
      .join('circle')
      .attr('class', 'myDot')
      .attr('stroke', 'black')
      .attr('r', (value, index) =>
        index >= selection[0] && index <= selection[1] ? 4 : 2
      )
      .attr('fill', (value, index) =>
        index >= selection[0] && index <= selection[1] ? 'orange' : 'black'
      )
      .attr('cx', (value, index) => xScale(index))
      .attr('cy', yScale);

    /* brush */
    const brush = brushX()
      .extent([
        [0, 0],
        [width, height]
      ])
      .on('start brush end', () => {
        if (event.selection) {
          const indexSelection = event.selection.map(xScale.invert);
          setSelection(indexSelection);
        }
      });

    if (previousSelection === selection) {
      svg
        .select('.brush')
        .call(brush)
        .call(brush.move, selection.map(xScale));
    }
  }, [data, dimensions, selection, previousSelection]);

  return (
    <>
      <div className="svg-wrapper" ref={wrapperRef}>
        <svg className="brush-svg" ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="brush" />
        </svg>
      </div>

      {children({ selection })}

      <small className="brush-data">
        Selected values: [
        {data
          .filter(
            (value, index) => index >= selection[0] && index <= selection[1]
          )
          .join(', ')}
        ]
      </small>
    </>
  );
};

export default BrushChart;
