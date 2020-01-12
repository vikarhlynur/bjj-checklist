import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Technique } from './technique.model';
import { BjjChecklistService } from './bjj-checklist.service';


@Component({
  selector: 'app-bjj-checklist',
  templateUrl: './bjj-checklist.component.html',
  styleUrls: ['./bjj-checklist.component.scss']
})
export class BjjChecklistComponent implements OnInit {
  techniques: Technique[];
  videoUrl: SafeResourceUrl;

  constructor(
    private service: BjjChecklistService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.service.getTechniques().subscribe((results: Technique[]) => {
      this.techniques = results;
    });
  }

  setVideoUrl(technique: Technique): void {
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${technique.videoId}`);
  }

}
