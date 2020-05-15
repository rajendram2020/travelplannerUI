import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightRoutingModule } from './flight-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightListComponent } from './flight-list/flight-list.component';

@NgModule({
  declarations: [FlightSearchComponent, FlightListComponent],
  imports: [
    CommonModule,
    FlightRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    FlightSearchComponent
  ]
})
export class FlightModule { }
