import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-bjj-checklist',
  templateUrl: './bjj-checklist.component.html',
  styleUrls: ['./bjj-checklist.component.scss']
})
export class BjjChecklistComponent implements OnInit {
  items: Observable<any[]>;

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.items = this.db.collection('test').valueChanges();
    this.db.collection('test').valueChanges().subscribe(data => {
      console.log('data: ', data);
    });
  }

}
