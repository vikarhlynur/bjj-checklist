import { Component, OnInit } from '@angular/core';
import { FirebaseUISignInFailure } from 'firebaseui-angular';
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

  successCallback() {
    this.router.navigate(['/']);
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log(errorData);
  }

}
