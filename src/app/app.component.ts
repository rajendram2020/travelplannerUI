import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Travel Planner Application';

  constructor(
    location: PlatformLocation,
  ) {

    location.onPopState(() => {
      history.go(0);
    });
  }
}
