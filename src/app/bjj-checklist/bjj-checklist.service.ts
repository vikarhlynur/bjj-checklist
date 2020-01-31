import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Technique, TechniqueDto, TechniqueStatus, TechniqueStatusDto } from './models/technique.model';

interface UserMetaDto {
  userId: string;
  statuses: TechniqueStatusDto[];
}

@Injectable({
  providedIn: 'root'
})
export class BjjChecklistService {

  constructor(
    private db: AngularFirestore
  ) { }

  getTechniques(): Observable<Technique[]> {
    return this.db.collection('technique').valueChanges().pipe(
      map((dtos: TechniqueDto[]) => dtos.map(dto => new Technique(dto)))
    );
  }

  getUserStatuses(userId: string): Observable<TechniqueStatusDto[]> {
    return this.db.collection('techniqueStatuses', ref => ref.where('userId', '==', userId)).snapshotChanges().pipe(
      map(snapshots => snapshots.map(snapshot => {
        const data = snapshot.payload.doc.data() as TechniqueStatusDto;
        data.id = snapshot.payload.doc.id;
        return data;
      }))
    );
  }

  createStatus(technique: Technique, userId: string): Promise<any> {
    return this.db.collection(`techniqueStatuses`).add({
      userId,
      techniqueId: technique.id,
      status: technique.status.status
    } as TechniqueStatusDto);
  }

  updateStatus(technique: Technique): Promise<any> {
    return this.db.collection(`techniqueStatuses`).doc(technique.status.id).set(technique.status.toDto());
  }

}
