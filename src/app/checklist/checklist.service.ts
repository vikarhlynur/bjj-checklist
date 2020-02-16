import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TechniqueFilters, TechniqueFiltersDto } from './filters/technique-filters.model';
import { Technique, TechniqueDto, TechniqueStatusDto } from './technique.model';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(
    private db: AngularFirestore
  ) { }

  getTechniques(): Observable<Technique[]> {
    return this.db.collection('techniques').snapshotChanges().pipe(
      map(snapshots => snapshots.map(snapshot => {
        const data = snapshot.payload.doc.data() as TechniqueDto;
        data.id = snapshot.payload.doc.id;
        return new Technique(data);
      }))
    );
  }

  // Statuses

  getStatuses(userId: string): Observable<TechniqueStatusDto[]> {
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

  // Filters

  getFilters(userId): Observable<TechniqueFiltersDto[]> {
    return this.db.collection('techniqueFilters', ref => ref.where('userId', '==', userId)).snapshotChanges().pipe(
      map(snapshots => snapshots.map(snapshot => {
        const data = snapshot.payload.doc.data() as TechniqueFiltersDto;
        data.id = snapshot.payload.doc.id;
        return data;
      }))
    );
  }

  createFilters(userId: string): Promise<any> {
    return this.db.collection(`techniqueFilters`).add({
      userId
    } as TechniqueFiltersDto);
  }

  updateFilters(techniqueFilters: TechniqueFilters, userId: string): Promise<any> {
    const dto = techniqueFilters.toDto();
    dto.userId = userId;
    return this.db.collection(`techniqueFilters`).doc(dto.id).set(dto);
  }

}
