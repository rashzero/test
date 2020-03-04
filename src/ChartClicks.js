import React from 'react';
import PropTypes from 'prop-types';
import CanvasJSReact from './assets/canvasjs.react.js';
import ProgressCentered from './ProgressCentered';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ChartClicks extends React.Component {	

  render() {
    if (!this.props.statistics) {
      return <ProgressCentered />;
    }
    const userStatistic = this.props.statistics.map((userStat) => {
      const result = {x:  new Date(userStat.date),  y:  userStat.clicks}

      return result;
    });
		const options = {
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
        type:  "spline",
        dataPoints: userStatistic,
      }]
		}
		return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
		);
	}
}

ChartClicks.propTypes = {
  statistics: PropTypes.array,
};
                       