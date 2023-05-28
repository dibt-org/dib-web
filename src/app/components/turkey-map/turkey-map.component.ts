import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Cities} from "../../../assets/data/cities";
import {HttpClient} from "@angular/common/http";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-turkey-map',
  templateUrl: './turkey-map.component.html',
  styleUrls: ['./turkey-map.component.scss'],
  animations: [
    trigger('zoomIn', [
      state('inactive', style({transform: 'scale(1)'})),
      state('active', style({transform: 'scale(1.2)'})),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ]),
    trigger('moveCenter', [
      state('inactive', style({transform: 'translateX(0) translateY(0)'})),
      state('active', style({transform: 'translateX(-1%) translateY(-10%)'})),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class TurkeyMapComponent implements OnInit {
  cities: any[] = []; // Initialize an empty array to hold the city data
  selectedCity: any = null; // Store the currently selected city

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // Load the city data from a JSON file
    this.cities = Cities.map((city) => ({
      ...city,
      isSelected: false // Add the isSelected property and initialize it as false
    }));

  }

  selectCity(city: any) {
    if (this.selectedCity === city) {
      // Deselect the city if it's already selected
      this.selectedCity.isSelected = false;
      this.selectedCity = null;
    } else {
      // Deselect the previously selected city
      if (this.selectedCity) {
        this.selectedCity.isSelected = false;
      }

      // Select the new city
      city.isSelected = true;
      this.selectedCity = city;
    }
  }

  // Renk skalası tanımlama
  getColor(id: number) {
    var startColor = [255, 0, 0]; // Kırmızı (RGB değeri)
    var endColor = [0, 128, 0]; // Yeşil (RGB değeri)

    var percentage = (id - 1) / 80; // Yüzde hesaplama

    var r = Math.round(startColor[0] * (1 - Math.sqrt(percentage)) + endColor[0] * Math.sqrt(percentage)); // Kırmızı bileşenini hesaplama
    var g = Math.round(startColor[1] * (1 - Math.sqrt(percentage)) + endColor[1] * Math.sqrt(percentage)); // Yeşil bileşenini hesaplama
    var b = Math.round(startColor[2] * (1 - Math.sqrt(percentage)) + endColor[2] * Math.sqrt(percentage)); // Mavi bileşenini hesaplama

    return "rgb(" + r + "," + g + "," + b + ")";
  }



  isPopupVisible = false;
  popupCity: any = {};
  popupPosition = {top: 0, left: 0};

  showPopup(city: any, event: MouseEvent) {
    this.popupCity = city;
    this.popupPosition = {top: event.clientY, left: event.clientX};
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }

  updatePopupPosition($event: MouseEvent) {
    this.popupPosition = {top: $event.clientY , left: $event.clientX + 30};
  }
}
