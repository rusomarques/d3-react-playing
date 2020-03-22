import React, { useRef, useEffect } from 'react';
import { select, hierarchy, tree, linkVertical, linkHorizontal } from 'd3';

import useResizeObserver from '../hooks/useResizeObserver';
import usePrevious from '../hooks/usePrevious';

export const TreeChart = ({ data }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  const svgRefHorizontal = useRef(null);
  const wrapperRefHorizontal = useRef(null);
  const dimensionsHorizontal = useResizeObserver(wrapperRefHorizontal);

  const previouslyRenderedData = usePrevious(data);

  useEffect(() => {
    /* Horizontal Tree */
    const svg = select(svgRefHorizontal.current);
    const { width, height } =
      dimensionsHorizontal || wrapperRef.current.getBoundingClientRect();

    const root = hierarchy(data);
    const treeLayout = tree().size([height, width]);
    treeLayout(root);

    const linkGeneratorHorizontal = linkHorizontal()
      // .source(link => link.source) is default
      // .target(link => link.target) is default
      .x(node => node.y)
      .y(node => node.x);

    /* Nodes */
    const enteringAndUpdatingNodes = svg
      .selectAll('.node')
      .data(root.descendants())
      .join('circle')
      .attr('class', 'node')
      .attr('r', 4)
      .attr('fill', 'black')
      .attr('cx', node => node.y)
      .attr('cy', node => node.x);
    // .attr('opacity', 0)
    // .transition()
    // .duration(500)
    // .delay(node => node.depth * 300)
    // .attr('opacity', 1);

    /* Links */
    const enteringAndUpdatingLinks = svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', linkGeneratorHorizontal)
      /* to animate links: */
      .attr('stroke-dasharray', function() {
        const length = this.getTotalLength();
        // first lenght is visible path and second is the invisible
        return `${length} ${length}`;
      });
    // .attr('opacity', 1);
    // .attr('stroke-dashoffset', function() {
    //   const length = this.getTotalLength();
    //   return length;
    // })
    // .transition()
    // .duration(500)
    // .delay(linkObj => linkObj.source.depth * 500)
    // .attr('stroke-dashoffset', 0);

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
    // .attr('opacity', 0)
    // .transition()
    // .duration(500)
    // .delay(node => node.depth * 500)
    // .attr('opacity', 1);

    /* To not animate on change of dimensions (only on new data) */
    if (data !== previouslyRenderedData) {
      enteringAndUpdatingLinks
        .attr('stroke-dashoffset', function() {
          return this.getTotalLength();
        })
        .transition()
        .duration(500)
        .delay(link => link.source.depth * 300)
        .attr('stroke-dashoffset', 0);

      enteringAndUpdatingNodes
        .attr('opacity', 0)
        .transition()
        .duration(500)
        .delay(node => node.depth * 300)
        .attr('opacity', 1);
    }
  }, [data, dimensionsHorizontal, previouslyRenderedData]);

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
