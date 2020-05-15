import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'flight', loadChildren: "../../flight/flight.module#FlightModule" },
    { path: 'hotel', loadChildren: "../../hotel/hotel.module#HotelModule" },
];
