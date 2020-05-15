import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { HotelDetailsComponent } from '../hotel-details/hotel-details.component';
import { MessageBox, MessageBoxButton } from 'src/app/shared/message-box';

declare var $: any;

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  items: any[];
  isCollapsed = false;

  constructor(
    private dialog: MatDialog,
    private service: HotelService,
  ) { }

  ngOnInit() {

    //setTimeout(() => MessageBox.show(this.dialog, "Error", "Hi Hi", MessageBoxButton.Ok, "350px"));
    if (localStorage.getItem("hotelInfo") != null) {
      var hotelInfo = JSON.parse(localStorage.getItem("hotelInfo"));
      //localStorage.removeItem("hotelInfo");
      $('#wait').show();
      this.service.getData(hotelInfo).subscribe(
        response => {
          $('#wait').hide();
          this.items = response.data;
        },
        error => {
          $('#wait').hide();
        }
      );
    }
  }

  showDetails(hotelId: String) {
    let dialogRef = this.dialog.open(HotelDetailsComponent, {
      data: {
        hotelId: hotelId
      },
      width: "750px",
      height: "500px",
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

}
