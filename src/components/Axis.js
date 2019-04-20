import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Axis extends Component {
  static propTypes = {
    orientation: PropTypes.oneOf(['Top', 'Right', 'Bottom', 'Left']),
    scale: PropTypes.func,
    xTransform: PropTypes.number,
    yTransform: PropTypes.number,
    className: PropTypes.string,
    label: PropTypes.string,
  };

  axisRef = React.createRef();

  componentDidMount() {
    this.createAxis();
  }

  get labelPos() {
    const { orientation, scale } = this.props;

    switch (orientation) {
      case 'Bottom':
        return { x: scale.range()[1] / 2, y: 100 };
      case 'Left':
        return { x: 10, y: -25 };
      default:
        return null;
    }
  }

  createAxis() {
    const { orientation, scale } = this.props;

    d3.select(this.axisRef.current).call(d3[`axis${orientation}`](scale));
  }

  render() {
    const {
      xTransform, yTransform, className, label,
    } = this.props;

    return (
      <g
        ref={this.axisRef}
        transform={`translate(${xTransform}, ${yTransform})`}
        className={className}
      >
        <text {...this.labelPos} className="axisLabel">{label}</text>
      </g>
    );
  }
}

export default Axis;
