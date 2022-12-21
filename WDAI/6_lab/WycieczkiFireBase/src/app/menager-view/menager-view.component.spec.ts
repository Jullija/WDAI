import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenagerViewComponent } from './menager-view.component';

describe('MenagerViewComponent', () => {
  let component: MenagerViewComponent;
  let fixture: ComponentFixture<MenagerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenagerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
