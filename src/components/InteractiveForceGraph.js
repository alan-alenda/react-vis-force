import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { window } from 'global';

import ForceGraph, { isNode, isLink } from './ForceGraph';
import { nodeId } from '../utils/d3-force';

const isTouch = window && 'ontouchstart' in window;

const selectedNodeShape = PropTypes.shape({
  id: PropTypes.string,
});

export default class InteractiveForceGraph extends PureComponent {
  static get propTypes() {
    return Object.assign({
      selectedNode: selectedNodeShape,
      defaultSelectedNode: selectedNodeShape,
      highlightDependencies: PropTypes.bool,
      opacityFactor: PropTypes.number,
      onSelectNode: PropTypes.func,
      onDeselectNode: PropTypes.func,
    }, ForceGraph.propTypes);
  }

  static get defaultProps() {
    return {
      className: '',
      defaultSelectedNode: null,
      opacityFactor: 4,
      onSelectNode() {},
      onDeselectNode() {},
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      hoveredNode: null,
      selectedNode: props.selectedNode || props.defaultSelectedNode,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (Object.prototype.hasOwnProperty.call(nextProps, 'selectedNode')) {
      this.setState({ selectedNode: nextProps.selectedNode });
    }
  }

  onHoverNode(event, hoveredNode) {
    if (!isTouch) {
      this.setState({ hoveredNode });
    }
  }

  onBlurNode() {
    this.setState({ hoveredNode: null });
  }

  onClickNode(event, selectedNode) {
    const { onDeselectNode, onSelectNode } = this.props;
    const previousNode = this.state.selectedNode;

    // if the user clicked the same node that was already
    // selected, deselect it.
    if (previousNode && nodeId(previousNode) === nodeId(selectedNode)) {
      this.setState({ selectedNode: null });
      onDeselectNode(event, selectedNode);
    } else {
      this.setState({ selectedNode });
      onSelectNode(event, selectedNode);
    }
  }

  render() {
    const {
      highlightDependencies,
      opacityFactor,
      children,
      className,
      selectedNode: propsSelectedNode,
      ...spreadableProps
    } = this.props;

    const { hoveredNode, selectedNode: stateSelectedNode } = this.state;
    const { links } = ForceGraph.getDataFromChildren(children);

    const selectedNode = propsSelectedNode || stateSelectedNode;

    const applyOpacity = (opacity = 1) => opacity / opacityFactor;

    const createEventHandler = (name, node, fn) => (event) => {
      this[name](event, node);
      if (fn) {
        fn(event);
      }
    };

    const areNodesRelatives = (node1, node2) =>
      node1 && node2 && links.findIndex(link =>
        link.value > 0 && (
          (link.source === nodeId(node1) && link.target === nodeId(node2)) ||
          (link.source === nodeId(node2) && link.target === nodeId(node1))
        )
      ) > -1;

    const isNodeHighlighted = (focusedNode, node) =>
      focusedNode && (
        (nodeId(focusedNode) === nodeId(node)) ||
        (selectedNode && nodeId(selectedNode) === nodeId(node)) ||
        (highlightDependencies && areNodesRelatives(node, selectedNode || focusedNode))
      );

    const isLinkHighlighted = (focusedNode, link) =>
      focusedNode && highlightDependencies && link.value > 0 &&
      (nodeId(focusedNode) === link.source ||
      nodeId(focusedNode) === link.target);

    const fontSizeForNode = node =>
      (selectedNode && nodeId(node) === nodeId(selectedNode) ? 14 : 10);
    const fontWeightForNode = node =>
      (selectedNode && nodeId(node) === nodeId(selectedNode) ? 700 : null);

    const showLabelForNode = node =>
      isNodeHighlighted(selectedNode, node) ||
      isNodeHighlighted(hoveredNode, node);

    const opacityForNode = (node, origOpacity = 1) => {
      if (
        highlightDependencies && selectedNode &&
        !isNodeHighlighted(selectedNode, node) &&
        !isNodeHighlighted(hoveredNode, node)
      ) {
        return applyOpacity(origOpacity / 4);
      } else if (
        (selectedNode &&
          !isNodeHighlighted(selectedNode, node) &&
          !isNodeHighlighted(hoveredNode, node)
        ) || (
          hoveredNode && !isNodeHighlighted(hoveredNode, node)
        )
      ) {
        return applyOpacity(origOpacity);
      }

      return origOpacity;
    };

    const opacityForLink = (link, origOpacity = 1) => {
      if (
        highlightDependencies ? (
          (!selectedNode && hoveredNode && !isLinkHighlighted(hoveredNode, link)) ||
          (selectedNode && !isLinkHighlighted(selectedNode, link))
        ) : (hoveredNode || selectedNode)
      ) {
        return applyOpacity(origOpacity / 4);
      }

      if (
        hoveredNode && !isLinkHighlighted(hoveredNode, link) &&
        selectedNode && !isLinkHighlighted(selectedNode, link)
      ) {
        return applyOpacity(origOpacity);
      }

      return origOpacity;
    };

    return (
      <ForceGraph className={`rv-force__interactive ${className}`} {...spreadableProps}>
        {Children.map(children, (child) => {
          if (isNode(child)) {
            const {
              node,
              labelStyle,
              fontSize = fontSizeForNode(node),
              fontWeight = fontWeightForNode(node),
              showLabel = showLabelForNode(node),
              onMouseEnter,
              onMouseLeave,
              onClick,
            } = child.props;

            let { opacity } = child.props;
            opacity = opacityForNode(node, opacity);

            return cloneElement(child, {
              showLabel,
              opacity,
              labelStyle: {
                fontSize,
                fontWeight,
                opacity,
                ...labelStyle,
              },
              onMouseEnter: createEventHandler('onHoverNode', node, onMouseEnter),
              onMouseLeave: createEventHandler('onBlurNode', node, onMouseLeave),
              onClick: createEventHandler('onClickNode', node, onClick),
            });
          } else if (isLink(child)) {
            const { link } = child.props;
            let { opacity } = child.props;
            opacity = opacityForLink(link, opacity);

            return cloneElement(child, { opacity });
          }
          return child;
        })}
      </ForceGraph>
    );
  }
}
