import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BjjChecklistComponent } from './bjj-checklist.component';

describe('BjjChecklistComponent', () => {
  let component: BjjChecklistComponent;
  let fixture: ComponentFixture<BjjChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BjjChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BjjChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
