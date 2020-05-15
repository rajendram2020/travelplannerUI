import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { Routes, RouterModule } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';

const routes: Routes = [
  { path: 'search', component: HotelSearchComponent },
  { path: 'list', component: HotelListComponent },
  { path: 'details/:id', component: HotelDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HotelRoutingModule { }
