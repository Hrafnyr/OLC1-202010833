import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaErrComponent } from './tabla-err.component';

describe('TablaErrComponent', () => {
  let component: TablaErrComponent;
  let fixture: ComponentFixture<TablaErrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaErrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
