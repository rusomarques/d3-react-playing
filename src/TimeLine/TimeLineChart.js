import React, { useRef, useEffect } from 'react';
import { select, min, max, scaleTime, axisBottom, scaleLinear } from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';
import getDate from '../Utils/getDate';

const TimeLineChart = ({ highlight, data }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!dimensions) return;

    const svg = select(svgRef.current);
    const minDate = min(data, episode => getDate(episode.air_date));
    const maxDate = max(data, episode => getDate(episode.air_date));

    const xScale = scaleTime()
      .domain([minDate, maxDate])
      .range([0, dimensions.width]);

    const yScale = scaleLinear()
      .domain([max(data, episode => episode.characters.length), 0])
      .range([0, dimensions.height]);

    const xAxis = axisBottom(xScale);
    svg
      .select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis);

    svg
      .selectAll('.episode')
      .data(data)
      .join('line')
      .attr('class', 'episode')
      .attr('stroke', episode =>
        episode.characters.includes(highlight) ? 'blue' : 'black'
      )
      .attr('x1', episode => xScale(getDate(episode.air_date)))
      .attr('x2', episode => xScale(getDate(episode.air_date)))
      .attr('y1', dimensions.height)
      .attr('y2', episode => yScale(episode.characters.length));
  }, [data, highlight, dimensions]);

  return (
    <div className="svg-wrapper" ref={wrapperRef}>
      <svg className="basics-svg" ref={svgRef}>
        <g className="x-axis" />
      </svg>
    </div>
  );
};

export default TimeLineChart;
