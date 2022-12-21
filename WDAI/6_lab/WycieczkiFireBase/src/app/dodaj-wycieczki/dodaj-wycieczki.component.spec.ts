import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajWycieczkiComponent } from './dodaj-wycieczki.component';

describe('DodajWycieczkiComponent', () => {
  let component: DodajWycieczkiComponent;
  let fixture: ComponentFixture<DodajWycieczkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajWycieczkiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajWycieczkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
