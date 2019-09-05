import React, { Component } from 'react'


class GroupedBarChart extends Component {
    constructor(props) {
        super(props);
       this.drawBarChart = this.drawBarChart.bind(this);
    }
    componentDidMount() {
        
            this.drawBarChart(this.props.data);
   
    }

    drawBarChart(data)  {

        <script src="http://d3js.org/d3.v3.min.js" ></script>
    
        var margin = {top: 20, right: 20, bottom: 30, left: 60},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
    
    var x1 = d3.scale.ordinal();
    
    var y = d3.scale.linear()
        .range([height, 0]);
    
    var xAxis = d3.svg.axis()
        .scale(x0)
        .tickSize(0)
        .orient("bottom");
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    
    var color = d3.scale.ordinal()
        .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);
    
    var svg = d3.select(this.refs.canvas).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    
      var categoriesNames = data.map(function(d) { return d.monthYear; });
      var categoryNames = data[0].values.map(function(d) { return d.category; });
    
      x0.domain(categoriesNames);
      x1.domain(categoryNames).rangeRoundBands([0, x0.rangeBand()]);
      y.domain([0, d3.max(data, function(monthYear) { return d3.max(monthYear.values, function(d) { return parseInt(d.cost); }); })]);
    
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
    
      svg.append("g")
          .attr("class", "y axis")
          .style('opacity','0')
          .call(yAxis)
      .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style('font-weight','bold')
          .text("Cost");
    
      svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
    
      var slice = svg.selectAll(".slice")
          .data(data)
          .enter().append("g")
          .attr("class", "g")
          .attr("transform",function(d) { return "translate(" + x0(d.monthYear) + ",0)"; });
    
      slice.selectAll("rect")
          .data(function(d) { return d.values; })
      .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.category); })
          .style("fill", function(d) { return color(d.category) })
          .attr("y", function(d) { return y(0); })
          .attr("height", function(d) { return height - y(0); })
          .on("mouseover", function(d,i) {
              d3.select(this).style("fill", d3.rgb(color(d.category)).darker(1));
              svg.append("text").attr({
                id: "t" + d.category + "-" + d.cost ,  
                 x: function() { return d3.mouse(this)[0];},
                 y: function() { return  y(parseInt(d.cost)); }
             })
             .text(function() {
                 console.log(d3.mouse(this)[0]);
               return d.category+ ':'+d.cost; 
             });
          })
          .on("mouseout", function(d) {
              d3.select(this).style("fill", color(d.category));
              d3.select("#t"+ d.category + "-" + d.cost).remove();
          });
    
      slice.selectAll("rect")
          .transition()
          .delay(function (d) {return Math.random()*1000;})
          .duration(1000)
          .attr("y", function(d) { return y(parseInt(d.cost)); })
          .attr("height", function(d) { return height - y(parseInt(d.cost)); });
    
      //Legend
      var legend = svg.selectAll(".legend")
          .data(data[0].values.map(function(d) { return d.category; }).reverse())
      .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
          .style("opacity","0");
    
      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", function(d) { return color(d); });
    
      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) {return d; });
    
      legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
    
   
    }
    render() { return <div ref="canvas"></div> }
}
export default GroupedBarChart;