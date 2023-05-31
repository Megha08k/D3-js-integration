import { Injectable } from '@angular/core';
import { BarChart } from '../models/bar-chart';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

    public tooltip: any;
    public tooltipCollection: BarChart | null = null;
    public tooltipLeft = 0;
    public tooltipTop = 0;
    
  constructor() { }

  /**
   * 
   * @param arg Dynamic argument
   * @returns 
   */
    public getColor(arg: number): string {
      return (arg > 30) ? '#7788e6' : '#ff6347';
  }
}
