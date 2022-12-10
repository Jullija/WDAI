import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcenWycieczkiComponent } from './ocen-wycieczki.component';

describe('OcenWycieczkiComponent', () => {
  let component: OcenWycieczkiComponent;
  let fixture: ComponentFixture<OcenWycieczkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcenWycieczkiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcenWycieczkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
