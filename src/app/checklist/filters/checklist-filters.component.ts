import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { BeltFilter } from 'src/app/checklist/filters/belt-filter.model';
import { Belt, Gi, TechniquePlacement, TechniquePosition } from 'src/app/models/technique.model';

export interface TechniqueFilters {
  caption: string;
  belt: BeltFilter;
  belts: Belt[];
  position: TechniquePosition[];
  placement: TechniquePlacement[];
  gi: GiFilter;
  noGi: GiFilter;
}

interface GiFilter {
  caption: string;
  isFilter: boolean;
}

@Component({
  selector: 'app-checklist-filters',
  templateUrl: './checklist-filters.component.html',
  styleUrls: ['./checklist-filters.component.scss']
})
export class ChecklistFiltersComponent implements OnInit {
  @Output() readonly changed = new EventEmitter<TechniqueFilters>();

  filters: TechniqueFilters = {
    caption: '',
    belt: new BeltFilter(),
    belts: ['blue', 'purple', 'brown'],
    position: [
      new TechniquePosition('backControl'),
      new TechniquePosition('turtle'),
      new TechniquePosition('closedGuard'),
      new TechniquePosition('openGuard'),
      new TechniquePosition('halfGuard'),
      new TechniquePosition('mount'),
      new TechniquePosition('sideControl'),
      new TechniquePosition('standing')
    ],
    placement: [
      new TechniquePlacement('top'),
      new TechniquePlacement('bottom')
    ],
    gi: { caption: 'Gi', isFilter: true },
    noGi: { caption: 'No-gi', isFilter: true }
  };

  constructor() { }

  ngOnInit() {
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

}
