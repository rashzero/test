import React from 'react';
import PropTypes from 'prop-types';
import CanvasJSReact from './assets/canvasjs.react.js';
import ProgressCentered from './ProgressCentered';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ChartClicks extends React.Component {	

  get options() {
    return {
      animationEnabled:  true,
      axisX: {
        //valueFormatString:  "MMM"
        lineColor: "#F1F1F1",
      },
      axisY: {
        includeZero:  true,
        lineColor: "#F1F1F1",
        gridColor: "#F1F1F1",
      },
      data: [{
        yValueFormatString: "#,###",
        xValueFormatString:  "MMMM",
        type: "spline",
        dataPoints: this.userStatistic,
      }]
    };
  };

  get userStatistic() {
    return(
      this.props.statistics.map((userStat) => {
        const result = {x: new Date(userStat.date), y: userStat.clicks}
        return result;
      })
    );
  };

  render() {
    if (!this.props.statistics) {
      return <ProgressCentered />;
    };

		return (
      <div>
        <CanvasJSChart options={this.options} />
      </div>
		);
	}
}

ChartClicks.propTypes = {
  statistics: PropTypes.array,
};
                       