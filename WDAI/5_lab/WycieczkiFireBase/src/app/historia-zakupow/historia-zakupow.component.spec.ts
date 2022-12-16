import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaZakupowComponent } from './historia-zakupow.component';

describe('HistoriaZakupowComponent', () => {
  let component: HistoriaZakupowComponent;
  let fixture: ComponentFixture<HistoriaZakupowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaZakupowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaZakupowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
