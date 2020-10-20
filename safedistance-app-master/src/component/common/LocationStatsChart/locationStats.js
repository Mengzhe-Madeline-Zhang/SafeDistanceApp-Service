import React from 'react';
import * as d3 from 'd3';
class Bar extends React.Component {


  render() {
    return (
      <g>
        <rect className="bar" x={this.props.x} y={this.props.y + 5} width={this.props.width} height={this.props.height} />
      </g>
    )
  }

}

class YAxis extends React.Component {


  render() {
    let count = 0;
    //D3 mathy bits
    let ticks = d3.range(0, this.props.end, (this.props.end / this.props.labels.length))

    let lines = []
    ticks.forEach((tick, index) => {
      count++;
      lines.push(<line key={count} y1={tick} x1={this.props.y} y2={tick} x2={this.props.y - 4} />)
    })

    let columnLables = []
    ticks.forEach((tick, index) => {
      count++;
      columnLables.push(<text key={count} y={tick + 6} x={this.props.y - 6} >{this.props.labels[index]}</text>)
    })


    return (
      <g>
        <g className="y_labels one">
          <line x1={this.props.y} y1={this.props.start} y2={this.props.end} x2={this.props.y} />
        </g>
        <g className="y_labels two">
          {columnLables}
          {lines}
        </g>
      </g>
    )
  }

}

class XAxis extends React.Component {

  render() {
    let count = 0;
    let step = (this.props.start + this.props.end / this.props.labels.length)

    //D3 mathy bits   
    let ticks = d3.range(this.props.start, this.props.end, step)

    let lines = []
    ticks.forEach((tick, index) => {
      count++;
      lines.push(<line key={count} x1={tick + 10} y1={this.props.x} x2={tick + 5} y2={this.props.x + 2} />)
    })

    let columnLables = []
    ticks.forEach((tick, index) => {
      count++;
      columnLables.push(<text key={count} x={tick + 5} y={this.props.x + 20}>{this.props.labels[index]}</text>)
    })


    return (
      <g>
        <line x1={this.props.start} y1={this.props.x} x2={this.props.end} y2={this.props.x} />
        {columnLables}
        {lines}
      </g>
    )
  }

}

class LocationStats extends React.Component {

  render() {
    const data = this.props.data;

    if (Object.keys(data).length !== 0) {


      let margin = { top: 20, right: 20, bottom: 30, left: 45 },
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

      let sortedData = data.sort(function (a, b) {
        return parseInt(a.startTime) - parseInt(b.startTime);
      });
      let startTime = sortedData.map((d) => d.startTime.substring(11, 16))

      //D3 mathy bits    
      let ticks = d3.range(0, width, (width / data.length))
      let x = d3.scaleOrdinal()
        .domain(startTime)
        .range(ticks)
      let y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.numberOfUsers)])
        .range([height, 0])

      let bars = []
      let bottom = 450

      data.forEach((datum, index) => {
        bars.push(<Bar key={index} x={x(datum.startTime)} y={bottom - 6 - (height - y(datum.numberOfUsers))} width={30} height={height - y(datum.numberOfUsers)} />)
      })

      return (
        <svg width={this.props.width} height={this.props.height}>
          <YAxis y={40} labels={y.ticks().reverse()} start={15} end={height} />

          <g className="chart" transform={`translate(${margin.left},${margin.top})`}>
            {bars}
            <XAxis x={bottom} labels={startTime} start={0} end={this.props.width} />
          </g>
        </svg>
      );
    }
    else {
      return (
        <div>No Active Users</div>
      )

    }
  }

}

export default LocationStats;