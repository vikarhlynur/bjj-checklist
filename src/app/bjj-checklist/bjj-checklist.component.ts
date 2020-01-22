import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BjjChecklistService } from './bjj-checklist.service';
import { BeltFilter } from './models/belt-filter.model';
import { GiFilter } from './models/gi-filter.model';
import { PositionFilter } from './models/position-filter.model';
import { Belt, Gi, Technique } from './models/technique.model';

@Component({
  selector: 'app-bjj-checklist',
  templateUrl: './bjj-checklist.component.html',
  styleUrls: ['./bjj-checklist.component.scss']
})
export class BjjChecklistComponent implements OnInit {
  techniques: Technique[];
  techniquesFiltered: Technique[];
  videoUrl: SafeResourceUrl;
  user: firebase.User;

  nameFilter = '';
  beltFilter = new BeltFilter();
  beltFiltersAvailable = ['blue', 'purple', 'brown'];
  positionFilter = new PositionFilter();
  positionFiltersAvailable = ['Back control', 'Full guard', 'Half guard', 'Inside guard', 'Mount', 'Side control', 'Standing'];
  giFilter = new GiFilter();
  giFiltersAvailable: Gi[] = ['Gi', 'No-gi'];

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private service: BjjChecklistService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getLoggedInUser();
    this.getTechniquesList();
  }

  //////////////////////////////////////////

  setVideoUrl(technique: Technique): void {
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(technique.video.url);
  }

  routeToLogin(): void {
    this.router.navigate(['/login']);
  }

  signOut(): void {
    this.angularFireAuth.auth.signOut().then(() => {
      this.user = undefined;
    }).catch((error) => {
    });
  }

  filterTechniques(): void {
    this.techniquesFiltered = this.techniques
      .filter(t => t.caption.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1)
      .filter(t => this.beltFilter.belts.length > 0 ? this.beltFilter.belts.includes(t.belt) : true)
      .filter(t => this.positionFilter.positions.length > 0 ? this.positionFilter.positions.includes(t.position.caption) : true)
      .filter(t => this.giFilter.gis.length > 0 ? this.giFilter.gis.includes(t.gi) : true);
  }

  filterBelt(belt: Belt): void {
    this.beltFilter.toggle(belt);
    this.filterTechniques();
  }

  filterPosition(position: Position): void {
    this.positionFilter.toggle(position);
    this.filterTechniques();
  }

  filterGi(gi: Gi): void {
    this.giFilter.toggle(gi);
    this.filterTechniques();
  }

  // Private

  private getLoggedInUser(): void {
    this.angularFireAuth.authState.subscribe((user: firebase.User) => {
      if (user) { this.user = user; }
    });
  }

  private getTechniquesList(): void {
    this.service.getTechniques().subscribe((results: Technique[]) => {
      this.techniques = this.techniquesFiltered = results;
      this.filterTechniques();
    });
  }

}
