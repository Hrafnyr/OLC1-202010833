import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSComponent } from './tabla-s.component';

describe('TablaSComponent', () => {
  let component: TablaSComponent;
  let fixture: ComponentFixture<TablaSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
