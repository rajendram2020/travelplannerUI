import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { FlightModule } from '../../flight/flight.module';
import { HotelModule } from '../../hotel/hotel.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    FlightModule,
    HotelModule,
  ],
  declarations: [
    DashboardComponent,
  ]
})

export class AdminLayoutModule {}
