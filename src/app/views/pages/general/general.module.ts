import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FeatherIconModule} from '../../../core/feather-icon/feather-icon.module';

import {NgbAccordionModule, NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

import { GeneralComponent } from './general.component';
import { BlankComponent } from './blank/blank.component';
import { FaqComponent } from './faq/faq.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { TimelineComponent } from './timeline/timeline.component';
import { Routes, RouterModule } from '@angular/router';
import {ComplaintCreateComponent} from "../complaint/complaint-create/complaint-create.component";
import {FormsModule} from "@angular/forms";
import {TurkeyMapComponent} from "../../../components/turkey-map/turkey-map.component";
import {Profilev1Component} from "../profilev1/profilev1/profilev1.component";
import {ProfileAboutComponent} from "../profilev1/profilev1/profile-about/profile-about.component";

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'blank-page',
        component: BlankComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'invoice',
        component: InvoiceComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'pricing',
        component: PricingComponent
      },
      {
        path: 'timeline',
        component: TimelineComponent
      },
      {
        path: 'create-complaint',
        component: ComplaintCreateComponent
      },
      {
        path: 'profilev1',
        component: Profilev1Component,
        children: [
          {
            path: 'about',
            component: ProfileAboutComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralComponent, BlankComponent, FaqComponent, InvoiceComponent, ProfileComponent, PricingComponent, TimelineComponent, TurkeyMapComponent,ComplaintCreateComponent,Profilev1Component,ProfileAboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    FormsModule,
  ]
})
export class GeneralModule { }
