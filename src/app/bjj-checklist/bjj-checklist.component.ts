import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';

import { Technique } from './technique.model';
import { BjjChecklistService } from './bjj-checklist.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bjj-checklist',
  templateUrl: './bjj-checklist.component.html',
  styleUrls: ['./bjj-checklist.component.scss']
})
export class BjjChecklistComponent implements OnInit {
  techniques: Technique[];
  videoUrl: SafeResourceUrl;
  user: firebase.User;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private service: BjjChecklistService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.angularFireAuth.authState.subscribe(this.firebaseAuthChangeListener.bind(this));
    this.service.getTechniques().subscribe((results: Technique[]) => {
      this.techniques = results;
    });
  }

  setVideoUrl(technique: Technique): void {
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${technique.videoId}`);
  }

  private firebaseAuthChangeListener(user: firebase.User) {
    // if needed, do a redirect in here
    if (user) {
      console.log('Logged in :)');
      this.user = user;
      console.log('user: ', user);
    } else {
      console.log('user: ', user);
      console.log('Logged out :(');
    }
  }

  routeToLogin(): void {
    this.router.navigate(['/login']);
  }

  signOut(): void {
    this.angularFireAuth.auth.signOut().then(() => {
      console.log('signed out');
      this.user = undefined;
    }).catch((error) => {
      console.log('error: ', error);
    });
  }

}
