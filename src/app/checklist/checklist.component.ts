import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Technique } from '../models/technique.model';
import { ChecklistService } from './checklist.service';
import { TechniqueFilters } from './filters/checklist-filters.component';

@Component({
  selector: 'app-bjj-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  user: firebase.User;
  filters: TechniqueFilters;
  techniques: Technique[];
  techniquesFiltered: Technique[];

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private service: ChecklistService
  ) { }

  ngOnInit() {
    this.getLoggedInUser();
  }

  //////////////////////////////////////////

  routeToLogin(): void {
    this.router.navigate(['/login']);
  }

  signOut(): void {
    this.angularFireAuth.auth.signOut().then(() => {
      this.user = undefined;
    }).catch((error) => {
    });
  }

  onStatusChanged(technique: Technique): void {
    if (!this.user) { return; }
    if (technique.status.id) {
      this.service.updateStatus(technique);
    } else {
      this.service.createStatus(technique, this.user.uid);
    }
  }

  // Filtering

  onFiltersChanged(filters: TechniqueFilters): void {
    this.filters = filters;
    this.filter();
  }

  filter(): void {
    if (!this.filters || !this.techniques) { return; }
    this.techniquesFiltered = this.techniques
      .filter(t => t.caption.toLowerCase().indexOf(this.filters.caption.toLowerCase()) > -1)
      .filter(t => this.filters.belt.belts.length > 0 ? this.filters.belt.belts.includes(t.belt) : true)
      .filter(t => {
        const positionsNames = this.filters.position.filter(f => f.isFilter).map(f => f.name);
        return positionsNames.length > 0 ? positionsNames.includes(t.position.name) : true;
      })
      .filter(t => {
        const placementNames = this.filters.placement.filter(f => f.isFilter).map(f => f.name);
        return placementNames.length > 0 ? placementNames.includes(t.placement.name) : true;
      })
      .filter(t => this.filters.gi.isFilter === !t.noGi || this.filters.noGi.isFilter === t.noGi);
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
    this.service.getStatuses(this.user.uid).subscribe(statusDtos => {
      statusDtos.forEach(statusDto => {
        this.techniques.forEach(technique => {
          technique.status.updateFormDto(statusDto);
        });
      });
      this.filter();
    });
  }

}
