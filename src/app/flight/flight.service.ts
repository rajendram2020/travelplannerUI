import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FLIGHT_API_URL } from '../shared/constant';
import { FlightInfo } from './flight-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  getData(flightInfo: FlightInfo): Observable<any> {
    return this.http.post(`${FLIGHT_API_URL}/flight`, flightInfo);
  }

}
