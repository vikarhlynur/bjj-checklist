import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { BjjChecklistService } from './bjj-checklist.service';
import { BeltFilter } from './models/belt-filter.model';
import { Belt, Gi, Technique, TechniquePlacement, TechniquePosition, TechniqueStatus } from './models/technique.model';

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
  selected: Technique;

  nameFilter = '';
  beltFilter = new BeltFilter();
  beltFilters = ['blue', 'purple', 'brown'];
  positionFilters = [
    new TechniquePosition('backControl'),
    new TechniquePosition('fullGuard'),
    new TechniquePosition('halfGuard'),
    new TechniquePosition('insideGuard'),
    new TechniquePosition('mount'),
    new TechniquePosition('sideControl'),
    new TechniquePosition('standing')
  ];
  placementFilters = [
    new TechniquePlacement('top'),
    new TechniquePlacement('bottom')
  ];
  giFilters = {
    gi: { caption: 'Gi', isFilter: false },
    noGi: { caption: 'No-gi', isFilter: false }
  };

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private service: BjjChecklistService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getLoggedInUser();
  }

  //////////////////////////////////////////

  setSelected(technique: Technique): void {
    this.selected = technique;
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

  toggleStatus(technique: Technique): void {
    if (!this.user) {
      return;
    }
    technique.status.toggle();
    if (technique.status.id) {
      this.service.updateStatus(technique).then(results => {
      });
    } else {
      this.service.createStatus(technique, this.user.uid).then(results => {
      });
    }
  }

  // Filtering

  filter(): void {
    this.techniquesFiltered = this.techniques
      .filter(t => t.caption.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1)
      .filter(t => this.beltFilter.belts.length > 0 ? this.beltFilter.belts.includes(t.belt) : true)
      .filter(t => {
        const positionsNames = this.positionFilters.filter(f => f.isFilter).map(f => f.name);
        return positionsNames.length > 0 ? positionsNames.includes(t.position.name) : true;
      })
      .filter(t => this.giFilters.gi.isFilter === !t.noGi || this.giFilters.noGi.isFilter === t.noGi);
  }

  filterBelt(belt: Belt): void {
    this.beltFilter.toggle(belt);
    this.filter();
  }

  filterPosition(position: TechniquePosition): void {
    position.isFilter = !position.isFilter;
    this.filter();
  }

  filterGi(gi: Gi): void {
    if (gi === 'Gi') { this.giFilters.gi.isFilter = !this.giFilters.gi.isFilter; }
    if (gi === 'No-gi') { this.giFilters.noGi.isFilter = !this.giFilters.noGi.isFilter; }
    this.filter();
  }

  // Init functions

  private getLoggedInUser(): void {
    this.angularFireAuth.authState.subscribe((user: firebase.User) => {
      if (user) { this.user = user; }
      this.getTechniquesList();
    });
  }

  private getTechniquesList(): void {
    this.service.getTechniques().subscribe((results: Technique[]) => {
      this.techniques = this.techniquesFiltered = results;
      if (this.user) {
        this.setUserStatuses();
      } else {
        this.filter();
      }
    });
  }

  private setUserStatuses(): void {
    this.service.getUserStatuses(this.user.uid).subscribe(statusDtos => {
      statusDtos.forEach(statusDto => {
        this.techniques.forEach(technique => {
          technique.status.updateFormDto(statusDto);
        });
      });

      this.filter();
    });
  }

}
