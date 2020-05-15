import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import 'rxjs/add/operator/filter';
import { MessageBoxButton, MessageBox } from 'src/app/shared/message-box';
import { MatDialog } from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  items: any[];

  constructor(
    private service: FlightService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {

    if (localStorage.getItem("flightInfo") != null) {
      $('#wait').show();
      var flightInfo = JSON.parse(localStorage.getItem("flightInfo"));
      //localStorage.removeItem("flightInfo");
      this.service.getData(flightInfo).subscribe(
        response => {
          $('#wait').hide();
          this.items = response.data;
          //console.log(JSON.stringify(this.items));
        },
        error => {
          $('#wait').hide();
        }
      );
    }
  }

}
