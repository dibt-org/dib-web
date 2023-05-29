import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurkeyMapComponent } from './turkey-map.component';

describe('TurkeyMapComponent', () => {
  let component: TurkeyMapComponent;
  let fixture: ComponentFixture<TurkeyMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurkeyMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurkeyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
