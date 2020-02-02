import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistFiltersComponent } from './checklist-filters.component';

describe('ChecklistFiltersComponent', () => {
  let component: ChecklistFiltersComponent;
  let fixture: ComponentFixture<ChecklistFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
