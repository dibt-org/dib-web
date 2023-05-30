import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profilev1Component } from './profilev1.component';

describe('Profilev1Component', () => {
  let component: Profilev1Component;
  let fixture: ComponentFixture<Profilev1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Profilev1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profilev1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
