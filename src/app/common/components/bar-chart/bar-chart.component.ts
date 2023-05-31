import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BarChart } from '../../models/bar-chart';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() data: BarChart[] = [];



  //SVG Configration
  public x_axis: any;
  public y_axis: any;
  private svg: any;
  private margin = { top: 20, right: 50, bottom: 40, left: 50 };

  public highestValue!: string;
  private width = 460 - this.margin.left - this.margin.right;
  private height = 600 - this.margin.top - this.margin.bottom;
  
  constructor(private elementRef: ElementRef, public utility : CommonService) { }

  ngOnInit(): void {
    this.onConfigure();
    this.onChartConfigure();
    this.drawBars(this.data);
  }

  private onConfigure() {
    let currentState = 0;
    this.data.forEach((data, i) => {
      const barValue = Number(data.value);
      if (barValue > currentState) {
          currentState = barValue;
      }
      if (this.data.length == i + 1) {
        this.highestValue = currentState.toString();
      }
    });
  }

  private onChartConfigure() {

    this.svg = d3.select("#chart")
                 .append("svg")
                 .attr("width", this.width + this.margin.left + this.margin.right)
                 .attr("height", this.height + this.margin.top + this.margin.bottom)
                 .append("g")
                 .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.x_axis = d3.scaleBand()
               .range([0, this.height])
               .domain(this.data.map((element) => element.label))
               .padding(0.1);

    this.y_axis = d3.scaleLinear()
               .domain([Number(this.highestValue) + 50, 0])
               .range([this.width, 0]);

     this.svg.append("g")
             .attr("transform", "translate(0," + this.height + ")")
             .selectAll("text")
             .attr("transform", "translate(-10,0)rotate(-45)")
             .style("text-anchor", "end");
  }

  private drawBars(data: any[]): void {

    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.y_axis))
      .selectAll("text")
      .attr('transform', 'translate(-10, 0)rotate(-40)')
      .style('text-anchor', 'end')
      .style("font-size", "5px")
      .style("color", "#261ae8");

    this.svg
      .append("g")
      .call(d3.axisLeft(this.x_axis))
      .selectAll("text")
      .style(["font-size", "9px", "text-align", "center"]);

      this.svg
      .selectAll("bars")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (element: BarChart) => this.x_axis(element.label))
      .attr("width", 0)
      .attr("height", this.x_axis.bandwidth())
      .on('mouseover', (event: any, element: BarChart) => this.showTooltip(event, element))
      .on('mouseout', () => this.hideTooltip())
      .attr("fill", (element: BarChart) => (this.utility.getColor(element.value)))
      .transition()
      .duration(3000)
      .attr("width", (element: BarChart) => this.y_axis(element.value));

    this.utility.tooltip = d3.select(this.elementRef.nativeElement).select('.tooltip');
  }

  private showTooltip(event: any, data: BarChart) {
    this.utility.tooltipCollection = data;
    this.utility.tooltipLeft = event.pageX + 10;
    this.utility.tooltipTop = event.pageY + 10;
    this.utility.tooltip.style('display', 'block');
  }

  private hideTooltip() {
    this.utility.tooltipCollection = null;
    this.utility.tooltip.style('display', 'none');
  }

  public raisedFlow() {
    this.data.sort((a: any, b: any) => (a.value - b.value));
    this.svg.selectAll('rect')
      .data(this.data)
      .transition()
      .duration(1000)
      .attr("width", (element: BarChart) => this.y_axis(element.value))
      .attr("x", 0)
      .attr("fill", (element: BarChart) => (this.utility.getColor(element.value)))
  }
  public downFlow() {
    this.data.sort((a: any, b: any) => b.value - a.value);
    this.svg.selectAll('rect')
      .data(this.data)
      .transition()
      .duration(1000)
      .attr("width", (element: BarChart) => this.y_axis(element.value))
      .attr("x", 0)
      .attr("fill", (element: BarChart) => (this.utility.getColor(element.value)))
  }

}
