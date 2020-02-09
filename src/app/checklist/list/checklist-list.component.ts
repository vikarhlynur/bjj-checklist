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
    if (get(changes, 'techniques.currentValue.length') > 0) {
      this.setDefaultSort();
    }
  }

  //////////////////////////////////////////

  setSelected(technique: Technique): void {
    if (this.selected === technique) {
      this.selected = undefined;
      return;
    }
    this.selected = technique;
    this.videoUrl = undefined;
    setTimeout(() => {
      this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(technique.video.url);
    }, 100);
  }

  toggleStatus(technique: Technique, event: Event): void {
    event.stopPropagation();
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
    this.sortBtns.push(new ChecklistSortBtn('status', 'status.status'));
    this.sortBtns.push(new ChecklistSortBtn('technique', 'caption'));
    this.sortBtns.push(new ChecklistSortBtn('position', 'position.caption'));
    this.sortBtns.push(new ChecklistSortBtn('gi', 'gi'));
    this.sortBtns.push(new ChecklistSortBtn('belt', 'belt'));
  }
}
