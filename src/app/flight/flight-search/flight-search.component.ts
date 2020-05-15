import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { TRAVEL_CLASS_TYPE, AutocompleteStringValidator } from 'src/app/shared/constant';
import { LocationService } from 'src/app/shared/location.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { FlightInfo } from '../flight-info';

declare var $: any;

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  @Input() directOpen: boolean = true;

  maxDate = new Date();
  minDate = new Date();
  public registerForm: FormGroup;
  travelClasstType = TRAVEL_CLASS_TYPE;
  orgLocations: any[];
  filteredOrgLocations: Observable<string[]>;
  destLocations: any[];
  filteredDestLocations: Observable<string[]>;

  constructor(
    private router: Router,
    private service: LocationService,
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      originLocationCode: new FormControl('', [Validators.required, AutocompleteStringValidator(this.orgLocations, 'detailedName')]),
      destinationLocationCode: new FormControl('', [Validators.required, AutocompleteStringValidator(this.destLocations, 'detailedName')]),
      departureDate: new FormControl('', [Validators.required]),
      returnDate: new FormControl('', [Validators.required]),
      travelClass: new FormControl('', [Validators.required]),
      adults: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern("[0-9]")]),
      children: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern("[0-9]")])
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

  public fetchFilterData(opt: number, value: string) {

    if (opt == 1)
      this.filteredOrgLocations = this.fetchLocationDtls('src', value);
    if (opt == 2)
      this.filteredDestLocations = this.fetchLocationDtls('dest', value);
  }

  public fetchLocationDtls(locType: string, value: string): Observable<string[]> {
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
        if (locType == "src") {
          this.orgLocations = response.data;
          this.registerForm.controls['originLocationCode'].setValidators([Validators.required, AutocompleteStringValidator(this.orgLocations, 'detailedName')]);
        } else if (locType == "dest") {
          this.destLocations = response.data;
          this.registerForm.controls['destinationLocationCode'].setValidators([Validators.required, AutocompleteStringValidator(this.destLocations, 'detailedName')]);
        }
      },
      error => {
        $('#wait').hide();
        result = [];
        if (locType == "src")
          this.orgLocations = [];
        else if (locType == "dest")
          this.destLocations = []
      }
    );
    return Observable.of(result);
  }

  public register(registerFormValue) {
    if (this.registerForm.valid) {
      var flightInfo = new FlightInfo;
      flightInfo.originLocationCode = this.orgLocations.filter(p => p.detailedName === registerFormValue.originLocationCode)[0]["cityCode"];
      flightInfo.destinationLocationCode = this.destLocations.filter(p => p.detailedName === registerFormValue.destinationLocationCode)[0]["cityCode"];
      flightInfo.departureDate = registerFormValue.departureDate;
      flightInfo.returnDate = registerFormValue.returnDate;
      flightInfo.travelClass = registerFormValue.travelClass;
      flightInfo.adults = registerFormValue.adults;
      flightInfo.children = registerFormValue.children;
      //console.log(JSON.stringify(flightInfo));
      localStorage.setItem("flightInfo", JSON.stringify(flightInfo));
      let url: string = `/flight/list`;
      this.router.navigate([url]);
    }
  }
}
