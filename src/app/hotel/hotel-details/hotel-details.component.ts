import { Component, OnInit, AfterViewChecked, Inject, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit, AfterViewChecked {

  item: any;
  hotelId: string;
  @Input() title = `Information`;

  constructor(
    public dialogRef: MatDialogRef<HotelDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activeRoute: ActivatedRoute,
    private service: HotelService) {
    this.hotelId = data.hotelId
  }

  ngOnInit() {

    //let id: string = this.activeRoute.snapshot.params['id'];

    $('#wait').show();
    this.service.getDataById(this.hotelId).subscribe(
      response => {
        $('#wait').hide();
        this.item = response.data[0];
        console.log(JSON.stringify(this.item));
      },
      error => {
        $('#wait').hide();
      }
    );

  }

  onClose() {
    this.dialogRef.close();
  }

  ngAfterViewChecked(): void {

    $(document).ready(function () {

      /*$("#moreLink").click(function () {
        if ($(this).text() == 'more...') {
          $(this).html('less...');
          $(".collapseExample").each(function (i) {
            $(this).show();
          });
        } else {
          $(this).html('more...');
          $(".collapseExample").each(function (i) {
            $(this).hide();
          });
        }
      });*/
    });

  }
  

}
