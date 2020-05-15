import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  declarations: [HotelSearchComponent, HotelListComponent, HotelDetailsComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    BarRatingModule,
  ],
  exports: [
    HotelSearchComponent
  ]
})
export class HotelModule { }
