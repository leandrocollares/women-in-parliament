import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const Tooltip = (props) => {
  const {
    hovered, xScale, yScale, marginLeft, marginTop,
  } = props;

  const x = xScale(hovered.country)
      + xScale.bandwidth() / 2
      + marginLeft;

  const y = yScale(hovered.women)
      + marginTop;

  const formatWomenPercentage = d3.format('.1f');

  const styles = {
    transform: 'translate('
    + `calc( -50% + ${x}px),`
    + `calc(-100% + ${y}px)`
    + ')',
  };

  const country = `${hovered.country}`;
  const elections = `Elections held on ${hovered.lastElection}`;
  const house = (hovered.singleHouse) ? 'house' : 'lower house';
  const women = `Women in the ${house}: ${formatWomenPercentage(hovered.women)}%`;

  return (
    <div className="tooltip" style={styles}>
      <div className="tooltipCountry">{country}</div>
      <div>{elections}</div>
      <div>{women}</div>
    </div>
  );
};

Tooltip.propTypes = {
  hovered: PropTypes.shape({
    country: PropTypes.string,
    lastElections: PropTypes.string,
    women: PropTypes.number,
    singleHouse: PropTypes.bool,
  }),
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
};

export default Tooltip;
