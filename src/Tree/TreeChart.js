import React, { useRef, useEffect } from 'react';
import { select, hierarchy, tree, linkVertical, linkHorizontal } from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';

export const TreeChart = ({ data }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  const svgRefHorizontal = useRef(null);
  const wrapperRefHorizontal = useRef(null);
  const dimensionsHorizontal = useResizeObserver(wrapperRefHorizontal);

  useEffect(() => {
    /* Horizontal Tree */
    if (!dimensionsHorizontal) return;
    const svg = select(svgRefHorizontal.current);

    const root = hierarchy(data);
    const treeLayout = tree().size([
      dimensionsHorizontal.height,
      dimensionsHorizontal.width
    ]);
    treeLayout(root);

    const linkGeneratorHorizontal = linkHorizontal()
      // .source(link => link.source) is default
      // .target(link => link.target) is default
      .x(node => node.y)
      .y(node => node.x);

    /* Nodes */
    svg
      .selectAll('.node')
      .data(root.descendants())
      .join('circle')
      .attr('class', 'node')
      .attr('r', 4)
      .attr('fill', 'black')
      .attr('cx', node => node.y)
      .attr('cy', node => node.x);

    /* Links */
    svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', linkGeneratorHorizontal);

    /* Labels */
    svg
      .selectAll('.label')
      .data(root.descendants())
      .join('text')
      .attr('class', 'label')
      .text(node => node.data.name)
      .attr('text-anchor', 'middle')
      .attr('x', node => node.y)
      .attr('y', node => node.x - 10);
  }, [data, dimensionsHorizontal]);

  useEffect(() => {
    /* Verticla Tree */
    if (!dimensions) return;
    const svg = select(svgRef.current);

    const root = hierarchy(data);
    const treeLayout = tree().size([dimensions.width, dimensions.height]);
    treeLayout(root);

    const linkGenerator = linkVertical()
      // .source(link => link.source) is default
      // .target(link => link.target) is default
      .x(node => node.x)
      .y(node => node.y);

    /* Nodes */
    svg
      .selectAll('.node')
      .data(root.descendants())
      .join('circle')
      .attr('class', 'node')
      .attr('r', 4)
      .attr('fill', 'black')
      .attr('cx', node => node.x)
      .attr('cy', node => node.y);

    /* Links */
    svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', linkGenerator);

    /* Labels */
    svg
      .selectAll('.label')
      .data(root.descendants())
      .join('text')
      .attr('class', 'label')
      .text(node => node.data.name)
      .attr('text-anchor', 'middle')
      .attr('x', node => node.x - 15)
      .attr('y', node => node.y + 5);
  }, [data, dimensions]);

  return (
    <>
      <div className="svg-wrapper" ref={wrapperRefHorizontal}>
        <svg className="basics-svg" ref={svgRefHorizontal} />
      </div>
      <div className="svg-wrapper" ref={wrapperRef}>
        <svg className="basics-svg" ref={svgRef} />
      </div>
    </>
  );
};
