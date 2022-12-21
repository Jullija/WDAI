import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrowanieComponent } from './filtrowanie.component';

describe('FiltrowanieComponent', () => {
  let component: FiltrowanieComponent;
  let fixture: ComponentFixture<FiltrowanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrowanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrowanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
