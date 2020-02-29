import React from 'react';
import CanvasJSReact from './assets/canvasjs.react.js';
import CircularIndeterminate from './CircularIndeterminate';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class ChartViews extends React.Component {	

  render() {
    if (!this.props.statistics) {
      return <CircularIndeterminate />;
    }
    const userStatistic = this.props.statistics.map((userStat) => {
      const result = {x:  new Date(userStat.date),  y:  userStat.page_views}

      return result;
    });
		const options = {
      animationEnabled:  true,
      axisX: {
        //valueFormatString:  "MMM"
      },
      axisY: {
        includeZero:  true
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
			< CanvasJSChart options = { options} />
		</div>
		);
	}
}
                       