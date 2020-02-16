import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { get } from 'lodash';

import { Belt, Gi, TechniquePlacement, TechniquePosition } from 'src/app/checklist/technique.model';
import { ChecklistService } from '../checklist.service';
import { TechniqueFilters, TechniqueFiltersDto } from './technique-filters.model';

@Component({
  selector: 'app-checklist-filters',
  templateUrl: './checklist-filters.component.html',
  styleUrls: ['./checklist-filters.component.scss']
})
export class ChecklistFiltersComponent implements OnInit, OnChanges {
  @Input() user: firebase.User;
  @Output() readonly changed = new EventEmitter<TechniqueFilters>();

  filters = new TechniqueFilters();

  constructor(
    private service: ChecklistService
  ) { }

  ngOnInit() {
    this.changed.emit(this.filters);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (get(changes, 'user.currentValue.uid')) {
      this.getUserFilters();
    }
  }

  clearTextFilter(): void {
    this.filters.caption = '';
    this.changed.emit(this.filters);
  }

  filterBelt(belt: Belt): void {
    this.filters.belt.toggle(belt);
    this.changed.emit(this.filters);
  }

  filterPosition(position: TechniquePosition): void {
    position.isFilter = !position.isFilter;
    this.changed.emit(this.filters);
  }

  filterPlacement(placement: TechniquePlacement): void {
    placement.isFilter = !placement.isFilter;
    this.changed.emit(this.filters);
  }

  filterGi(gi: Gi): void {
    if (gi === 'Gi') { this.filters.gi.isFilter = !this.filters.gi.isFilter; }
    if (gi === 'No-gi') { this.filters.noGi.isFilter = !this.filters.noGi.isFilter; }
    this.changed.emit(this.filters);
  }

  private getUserFilters(): void {
    this.service.getFilters(this.user.uid).subscribe((filters: TechniqueFiltersDto[]) => {
      if (filters.length === 0) {
        this.service.createFilters(this.user.uid).then(() => { this.getUserFilters(); });
      } else {
        this.filters.fromDto(filters[0]);
        this.changed.emit(this.filters);
      }
    });
  }

}
