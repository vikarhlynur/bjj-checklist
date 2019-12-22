import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bjj-checklist';
  items: Observable<any[]>;
  
  constructor(
    private db: AngularFirestore
  ) {
    this.items = db.collection('test').valueChanges();
    db.collection('test').valueChanges().subscribe(data => {
      console.log('data: ', data);
    });
  }
}
