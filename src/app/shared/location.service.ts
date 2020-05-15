import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCATION_API_URL } from '../shared/constant';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getData(cityShortCode: String): Observable<any> {
    return this.http.post(`${LOCATION_API_URL}/city/CITY/${cityShortCode}`, {});
  }
}