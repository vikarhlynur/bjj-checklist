import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log('login success');
    this.router.navigate(['/']);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log('login failure');
  }

}
