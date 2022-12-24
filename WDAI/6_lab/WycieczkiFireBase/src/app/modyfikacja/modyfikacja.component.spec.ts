import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModyfikacjaComponent } from './modyfikacja.component';

describe('ModyfikacjaComponent', () => {
  let component: ModyfikacjaComponent;
  let fixture: ComponentFixture<ModyfikacjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModyfikacjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModyfikacjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
