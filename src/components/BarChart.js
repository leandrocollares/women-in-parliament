import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Axis from './Axis';
import Bar from './Bar';
import Tooltip from './Tooltip';

const margin = {
  top: 50, right: 10, bottom: 110, left: 100,
};
const width = 900 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

class BarChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      country: PropTypes.string,
      lastElections: PropTypes.string,
      women: PropTypes.number,
      singleHouse: PropTypes.bool,
    })),
  };

  state = {
    hovered: null,
  };

  onBarHover = bar => () => {
    this.setState({ hovered: bar });
  };

  render() {
    const { data } = this.props;

    const { hovered } = this.state;

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.country))
      .rangeRound([0, width])
      .padding(0.05);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.women)])
      .rangeRound([height, 0])
      .nice();

    return (
      <div className="chart">
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {data.map(d => (
              <Bar
                key={d.country}
                x={xScale(d.country)}
                y={yScale(d.women)}
                width={xScale.bandwidth()}
                height={height - yScale(d.women)}
                onMouseEnter={this.onBarHover(d)}
                onMouseLeave={this.onBarHover(null)}
              />
            ))}
            <Axis
              orientation="Bottom"
              scale={xScale}
              xTransform={0}
              yTransform={height}
              className="xAxis"
              label=""
            />
            <Axis
              orientation="Left"
              xTransform={0}
              yTransform={0}
              scale={yScale}
              className="yAxis"
              label="seats (%)"
            />
          </g>
        </svg>
        {hovered ? (
          <Tooltip
            hovered={hovered}
            xScale={xScale}
            yScale={yScale}
            marginLeft={margin.left}
            marginTop={margin.top}
          />
        ) : null}
      </div>
    );
  }
}

export default BarChart;
