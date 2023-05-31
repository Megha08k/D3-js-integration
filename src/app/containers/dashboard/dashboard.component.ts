import { Component, OnInit } from '@angular/core';
import { BarChart } from 'src/app/common/models/bar-chart';
import { CommonService } from 'src/app/common/services/common.service';
import { DataService } from 'src/app/common/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartCollection: BarChart[] = [];

  constructor(private dataUtility : DataService) { }

  ngOnInit() {
    this.renderData();
  }

  private renderData(){
    this.dataUtility.getData().subscribe({
      next:(data:BarChart[]) => {
      this.chartCollection = data;
    },
    error: (error) => {

    },
    complete: () => {

    }
    });
  }

}
