export class FlightInfo {
    adults: number;
    children: number;
    currencyCode: String = "EUR";
    departureDate: Date;
    returnDate: Date;
    originLocationCode: String;
    destinationLocationCode: String;
    max: number = 4;
    nonstop: boolean = true;
    travelClass: String;
}
