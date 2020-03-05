import React from 'react';
import PropTypes from 'prop-types';
import CanvasJSReact from './assets/canvasjs.react.js';
import ProgressCentered from './ProgressCentered';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ChartViews extends React.Component {	

  get options() {
    return {
      animationEnabled:  true,
      axisX: {
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
        const result = {x: new Date(userStat.date), y: userStat.page_views}
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

ChartViews.propTypes = {
  statistics: PropTypes.array,
};
                       