import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BjjChecklistDataComponent } from './bjj-checklist-data.component';

describe('BjjChecklistDataComponent', () => {
  let component: BjjChecklistDataComponent;
  let fixture: ComponentFixture<BjjChecklistDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BjjChecklistDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BjjChecklistDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
