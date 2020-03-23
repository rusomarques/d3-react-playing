import React, { useEffect, useRef, useState } from 'react';
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';

const GeoChart = ({ data, property }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const minProp = min(data.features, feature => feature.properties[property]);
    const maxProp = max(data.features, feature => feature.properties[property]);
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(['#ccc', 'red']);

    /* projects geo-coordinates on a 2D plane */
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);

    /* takes geojson data, transforms that into the d attribute of a path element */
    const pathGenerator = geoPath().projection(projection);

    /* Render each country */
    svg
      .selectAll('.country')
      .data(data.features)
      .join('path')
      .on('click', feature => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr('class', 'country')
      .transition()
      .attr('fill', feature => colorScale(feature.properties[property]))
      .attr('d', feature => pathGenerator(feature));

    /* Render name of country and selected property value */
    svg
      .selectAll('.label')
      .data([selectedCountry])
      .join('text')
      .attr('class', 'label')
      .text(
        feature =>
          feature &&
          `${feature.properties.name}: ${feature.properties[
            property
          ].toLocaleString()}`
      )
      .attr('x', 10)
      .attr('y', 25);
  }, [data, property, dimensions, selectedCountry]);

  return (
    <div ref={wrapperRef} className="svg-wrapper">
      <svg ref={svgRef} className="svg"></svg>
    </div>
  );
};

export default GeoChart;
