import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Cities} from "../../../assets/data/cities";
import {HttpClient} from "@angular/common/http";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CorporateUserService} from "../../services/corporate-user.service";
import {MapDto} from "../../models/corporate/map-dto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CorporateUserDetail} from "../../models/corporate/corporate-user-detail";
import {Router} from "@angular/router";

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
  mapData: MapDto[] = [];
  corporateUsers: CorporateUserDetail[] = [];
  loading = false;

  constructor(private corporateUserService: CorporateUserService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit() {
    this.corporateUserService.getMapData().subscribe({
      next: (result) => {
        this.mapData = result.data;
        this.cities = Cities.map((city) => ({
          ...city,
          isSelected: false // Add the isSelected property and initialize it as false
        }));

      },
      error: (error) => {
        console.log(error);
      }
    });
    // Load the city data from a JSON file
    // this.cities = Cities.map((city) => ({
    //   ...city,
    //   isSelected: false // Add the isSelected property and initialize it as false
    // }));

  }

  // Renk skalası tanımlama
  getColor(id: number) {
    const mapData = this.mapData.find(x => x.cityId === id);
    return mapData ? mapData.color : '#ffffff';
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
    this.popupPosition = {top: $event.clientY, left: $event.clientX + 30};
  }

  openLgModal(content: TemplateRef<any>, city: any) {
    this.loading = true;
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      this.corporateUsers = [];
      this.loading = false;
    }).catch((res) => {
    });
    this.corporateUserService.getDetailByCity(city.plateNumber).subscribe({
        next: (result) => {
          this.loading = false;
          this.corporateUsers = result.data;
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      }
    );
  }

  public hexToRgba(hex: string, opacity: number): string {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  detail(user: CorporateUserDetail) {
    this.router.navigate(['/general/corporate-user-detail', user.username]).then(r => {
      this.modalService.dismissAll();
    });
  }
}
