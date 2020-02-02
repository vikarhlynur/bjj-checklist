import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Technique, TechniqueDto } from '../bjj-checklist/models/technique.model.js';
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
    Object.keys(techniquesJson).forEach(key => {
      this.db.collection('techniques').doc(key).set(techniquesJson[key]).then(() => {
        console.log('Finished');
      }, (error) => {
        console.log(error);
      });
    });
  }

  remove(): void {
    let techniques;
    const subscription = this.db.collection('techniques').snapshotChanges().subscribe(snapshots => {
      techniques = snapshots.map(snapshot => {
        const data = snapshot.payload.doc.data() as TechniqueDto;
        data.id = snapshot.payload.doc.id;
        return new Technique(data);
      });

      subscription.unsubscribe();

      techniques.forEach(technique => {
        this.db.collection('techniques').doc(technique.id).delete().then(() => {
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
