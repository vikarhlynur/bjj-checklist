import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Technique } from './technique.model';


@Component({
  selector: 'app-bjj-checklist',
  templateUrl: './bjj-checklist.component.html',
  styleUrls: ['./bjj-checklist.component.scss']
})
export class BjjChecklistComponent implements OnInit {
  techniques: Technique[];
  videoUrl: SafeResourceUrl;

  constructor(
    private db: AngularFirestore,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.db.collection('techniques').valueChanges().subscribe((results: Technique[]) => {
      this.techniques = results.map(result => new Technique(result));
    });
  }

  setVideoUrl(technique: Technique): void {
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${technique.videoId}`);
  }

  addTechnique(): void {
    this.db.collection('techniques').doc('test').set({
      name: 'Tokyo',
      country: 'Japan'
    });
  }

  deleteTechnique(): void {
    this.db.collection('techniques').doc('test').delete();
  }

}
