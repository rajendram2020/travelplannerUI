import { AbstractControl, ValidatorFn } from "@angular/forms";

export const HOTEL_API_URL = 'https://hotelservice-vasanthakumar-in.osc-sbx-exp-ap-15768375-f72ef11f3ab089a8c677044eb28292cd-0001.us-east.containers.appdomain.cloud';
export const FLIGHT_API_URL = 'https://localhost:8080';
export const LOCATION_API_URL = 'https://travelplanner-vasanthakumar-in.osc-sbx-exp-ap-15768375-f72ef11f3ab089a8c677044eb28292cd-0001.us-east.containers.appdomain.cloud';

export const TRAVEL_CLASS_TYPE: Array<any> = [
    { option: "BUSINESS", value: "BUSINESS", checked: false },
    { option: "ECONOMY", value: "ECONOMY", checked: false }
];

export function AutocompleteStringValidator(validOptions: Array<any>, propName: string): ValidatorFn {
    let opts: Array<string> = [];
    if (validOptions != undefined) {
        for (let i = 0; i < validOptions.length; i++)
            opts.push(validOptions[i][propName]);
    }
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (opts == undefined || opts.length == 0 || control.value.length < 3)
            return null;
        else if (opts.indexOf(control.value) !== -1)
            return null
        else
            return { 'invalidAutocomplete': { value: control.value } }
    }
}
