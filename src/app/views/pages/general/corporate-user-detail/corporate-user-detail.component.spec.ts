import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserDetailComponent } from './corporate-user-detail.component';

describe('CorporateUserDetailComponent', () => {
  let component: CorporateUserDetailComponent;
  let fixture: ComponentFixture<CorporateUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateUserDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
