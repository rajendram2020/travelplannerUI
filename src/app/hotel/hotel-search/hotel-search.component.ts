import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';
import { HotelInfo } from '../hotel-info';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { AutocompleteStringValidator } from 'src/app/shared/constant';
import { LocationService } from 'src/app/shared/location.service';

declare var $: any;

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.css']
})
export class HotelSearchComponent implements OnInit {

  @Input() directOpen: boolean = true;
  maxDate = new Date();
  minDate = new Date();
  public registerForm: FormGroup;
  cityLocations: any[];
  filteredCityLocations: Observable<string[]>;

  constructor(
    private router: Router,
    private service: LocationService,
  ) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      cityCode: new FormControl('', [Validators.required, AutocompleteStringValidator(this.cityLocations, 'cityName')]),
      checkInDate: new FormControl('', [Validators.required]),
      checkOutDate: new FormControl('', [Validators.required]),
      adults: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern("[0-9]")]),
      roomQuantity: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern("[0-9]")]),
    });

  }

  public hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public updateMinDate(event: MatDatepickerInputEvent<Date>) {
    this.minDate = event.value;
  }

  public updateMaxDate(event: MatDatepickerInputEvent<Date>) {
    this.maxDate = event.value;
  }

  public fetchFilterData(value: string) {

    this.filteredCityLocations = this.fetchLocationDtls(value);
  }

  public fetchLocationDtls(value: string): Observable<string[]> {
    let result = [];
    if (value.length < 3 || value.indexOf('/') != -1)
      return Observable.of(result);
    $('#wait').show();
    this.service.getData(value).subscribe(
      response => {
        $('#wait').hide();
        for (let i = 0; i < response.data.length; i++) {
          result.push(response.data[i]);
        }
        this.cityLocations = response.data;
        this.registerForm.controls['cityCode'].setValidators([Validators.required, AutocompleteStringValidator(this.cityLocations, 'cityName')]);
      },
      error => {
        $('#wait').hide();
        result = [];
        this.cityLocations = [];
      }
    );
    return Observable.of(result);
  }

  public register(registerFormValue) {
    if (this.registerForm.valid) {
      var hotelInfo = new HotelInfo;
      hotelInfo.cityCode = this.cityLocations.filter(p => p.cityName === registerFormValue.cityCode)[0]["cityCode"];
      hotelInfo.checkInDate = registerFormValue.checkInDate;
      hotelInfo.checkOutDate = registerFormValue.checkOutDate;
      hotelInfo.adults = registerFormValue.adults;
      hotelInfo.roomQuantity = registerFormValue.roomQuantity;
      localStorage.setItem("hotelInfo", JSON.stringify(hotelInfo));
      let url: string = `/hotel/list`;
      this.router.navigate([url]);
    }
  }

}
