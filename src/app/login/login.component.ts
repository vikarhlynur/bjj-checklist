import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseUISignInFailure } from 'firebaseui-angular';

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
