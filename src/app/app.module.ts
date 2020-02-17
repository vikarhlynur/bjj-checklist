import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { firebase, FirebaseUIModule } from 'firebaseui-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChecklistDataComponent } from './checklist-data/checklist-data.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ChecklistFiltersComponent } from './checklist/filters/checklist-filters.component';
import { ChecklistListComponent } from './checklist/list/checklist-list.component';
import { LoginComponent } from './login/login.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    ChecklistComponent,
    ChecklistDataComponent,
    ChecklistFiltersComponent,
    LoginComponent,
    ChecklistListComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
