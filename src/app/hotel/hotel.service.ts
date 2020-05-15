import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOTEL_API_URL } from '../shared/constant';
import { HotelInfo } from './hotel-info';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  getData(hotelInfo: HotelInfo): Observable<any> {
    return this.http.post(`${HOTEL_API_URL}/hotel`, hotelInfo);
  }

  getDataById(hotelId: String): Observable<any> {
    return this.http.get<any>(`${HOTEL_API_URL}/hotel/${hotelId}`);
  }
}
