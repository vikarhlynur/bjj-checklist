import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { get, sortBy } from 'lodash';

import { Technique } from 'src/app/models/technique.model';
import { ChecklistSortBtn } from '../filters/checklist-table-header.model';

@Component({
  selector: 'app-checklist-list',
  templateUrl: './checklist-list.component.html',
  styleUrls: ['./checklist-list.component.scss']
})
export class ChecklistListComponent implements OnInit, OnChanges {
  @Input() techniques: Technique[];
  @Output() readonly statusChanged = new EventEmitter<Technique>();

  sortBtns: ChecklistSortBtn[] = [];
  sortBtnActive: ChecklistSortBtn;
  selected: Technique;
  videoUrl: SafeResourceUrl;

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.setTableHeaders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    if (get(changes, 'techniques.currentValue.length') > 0) {
      this.setDefaultSort();
    }
  }

  //////////////////////////////////////////

  setSelected(technique: Technique): void {
    this.selected = technique;
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(technique.video.url);
  }

  toggleStatus(technique: Technique): void {
    technique.status.toggle();
    this.statusChanged.emit(technique);
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
