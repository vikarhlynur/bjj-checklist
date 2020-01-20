import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { camelCase } from 'lodash';
import { Technique } from '../bjj-checklist/technique.model.js';
import techniquesJson from './techniques.json';

@Component({
  selector: 'app-bjj-checklist-data',
  templateUrl: './bjj-checklist-data.component.html'
})
export class BjjChecklistDataComponent implements OnInit {

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit() {
  }

  add(): void {
    techniquesJson.forEach(technique => {
      technique.id = camelCase(technique.name);
      this.db.collection('technique').doc(technique.id).set(technique).then(() => {
        console.log('Finished');
      }, (error) => {
        console.log(error);
      });
    });
  }

  remove(): void {
    let techniques;
    const subscription = this.db.collection('technique').valueChanges().subscribe((results: Technique[]) => {
      techniques = results.map(result => new Technique(result));
      techniques.forEach(technique => {
        this.db.collection('technique').doc(technique.id).delete().then(() => {
          console.log('Finished');
          subscription.unsubscribe();
        }, (error) => {
          console.log(error);
          subscription.unsubscribe();
        });
      });
    });

  }

}
