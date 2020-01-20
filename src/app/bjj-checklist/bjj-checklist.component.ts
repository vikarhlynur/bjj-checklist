import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BeltColor, BeltFilter } from './belt-filter.model';
import { BjjChecklistService } from './bjj-checklist.service';
import { Position, PositionFilter } from './position-filter.model';
import { Technique } from './technique.model';

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
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${technique.videoId}`);
  }

  routeToLogin(): void {
    this.router.navigate(['/login']);
  }

  signOut(): void {
    this.angularFireAuth.auth.signOut().then(() => {
      this.user = undefined;
    }).catch((error) => {
      console.log('error: ', error);
    });
  }

  filterTechniques(): void {
    console.log('filterTechniques()');
    this.techniquesFiltered = this.techniques
      .filter(technique => {
        return technique.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1;
      })
      .filter(technique => {
        return this.beltFilter.belts.includes(technique.belt);
      })
      .filter(technique => {
        return this.positionFilter.positions.includes(technique.position);
      });
  }

  filterBelt(belt: BeltColor): void {
    this.beltFilter.toggle(belt);
    this.filterTechniques();
  }

  filterPosition(position: Position): void {
    this.positionFilter.toggle(position);
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
    });
  }

}
