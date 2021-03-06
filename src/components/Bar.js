import React from 'react';
import PropTypes from 'prop-types';

const Bar = (props) => {
  const {
    x, y, width, height, ...otherProps
  } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      {...otherProps}
      className="rect"
    />
  );
};

Bar.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Bar;
