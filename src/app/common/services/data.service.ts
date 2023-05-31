import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BarChart } from '../models/bar-chart';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient : HttpClient) { }

  /**
   * 
   * @returns Demo Data
   */
  public getData():Observable<BarChart[]>{
    return this.httpClient.get<any>('../../assets/fake_storage.json')
  }

}
