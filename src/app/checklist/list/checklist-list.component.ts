import { get, sortBy } from 'lodash';

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Technique } from 'src/app/models/technique.model';
import { ChecklistSortBtn } from '../filters/checklist-table-header.model';

@Component({
  selector: 'app-checklist-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.scss']
})
export class ChecklistListComponent implements OnInit, OnChanges {
  @Input() techniques: Technique[];
  sortBtns: ChecklistSortBtn[] = [];
  sortBtnActive: ChecklistSortBtn;

  constructor() { }

  ngOnInit() {
    this.setTableHeaders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    if (get(changes, 'techniques.currentValue.length') > 0) {
      this.setDefaultSort();
    }
  }

  // Sorting

  sort(header: ChecklistSortBtn): void {
    if (this.sortBtnActive !== header) {
      this.techniques = sortBy(this.techniques, [header.path]);
      this.sortBtnActive = header;
      return;
    }
    if (!header.isReverse) {
      this.techniques.reverse();
      header.isReverse = true;
    } else { // reset
      header.isReverse = false;
      this.sortBtnActive = undefined;
      this.setDefaultSort();
    }
  }

  private setDefaultSort(): void {
    this.techniques = sortBy(this.techniques, ['belt', 'caption']);
  }

  private setTableHeaders(): void {
    this.sortBtns.push(new ChecklistSortBtn('Status', 'status.status'));
    this.sortBtns.push(new ChecklistSortBtn('Technique', 'caption'));
    this.sortBtns.push(new ChecklistSortBtn('Position', 'position.caption'));
    this.sortBtns.push(new ChecklistSortBtn('Type', 'gi'));
    this.sortBtns.push(new ChecklistSortBtn('Belt', 'belt'));
  }

}
