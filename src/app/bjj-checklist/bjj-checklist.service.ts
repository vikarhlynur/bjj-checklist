import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Technique } from './models/technique.model';

@Injectable({
  providedIn: 'root'
})
export class BjjChecklistService {

  constructor(
    private db: AngularFirestore
  ) { }

  getTechniques(): Observable<Technique[]> {
    return this.db.collection('technique').valueChanges().pipe(
      map((dtos: Technique[]) => dtos.map(dto => new Technique(dto)))
    );
  }
}
