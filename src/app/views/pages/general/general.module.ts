import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {FeatherIconModule} from '../../../core/feather-icon/feather-icon.module';

import {
  NgbAccordionModule,
  NgbCarouselModule,
  NgbDatepickerModule,
  NgbDropdownModule, NgbNavModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';

import {GeneralComponent} from './general.component';
import {BlankComponent} from './blank/blank.component';
import {FaqComponent} from './faq/faq.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {ProfileComponent} from './profile/profile.component';
import {PricingComponent} from './pricing/pricing.component';
import {TimelineComponent} from './timeline/timeline.component';
import {Routes, RouterModule} from '@angular/router';
import {ComplaintCreateComponent} from "../complaint/complaint-create/complaint-create.component";
import {FormsModule} from "@angular/forms";
import {TurkeyMapComponent} from "../../../components/turkey-map/turkey-map.component";
import {ProfileAboutComponent} from "./profile/profile-about/profile-about.component";
import {MainComponent} from './main/main.component';
import {ProfileTimelineComponent} from './profile/profile-timeline/profile-timeline.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {SettingsComponent} from "../settings/settings.component";
import {MentionModule} from "angular-mentions";
import {SearchComponent} from './search/search.component';
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {CorporateUserDetailComponent} from './corporate-user-detail/corporate-user-detail.component';


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
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: ProfileTimelineComponent
          },
          {
            path: 'about',
            component: ProfileAboutComponent
          },
          {
            path: 'timeline',
            redirectTo: '',
          }
        ]
      },
      {
        path: 'pricing',
        component: PricingComponent
      },
      {
        path: 'create-complaint',
        component: ComplaintCreateComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'corporate-user-detail/:username',
        component: CorporateUserDetailComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralComponent, BlankComponent, FaqComponent, InvoiceComponent, ProfileComponent, PricingComponent, TurkeyMapComponent, ComplaintCreateComponent, ProfileAboutComponent, MainComponent, ProfileTimelineComponent, SettingsComponent, SearchComponent, CorporateUserDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    FormsModule,
    CarouselModule,
    NgbCarouselModule,
    NgbDatepickerModule,
    MentionModule,
    NgbNavModule,
    PerfectScrollbarModule,
    NgOptimizedImage
  ]
})
export class GeneralModule {
}
