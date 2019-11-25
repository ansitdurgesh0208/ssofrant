import { Component, OnDestroy, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sso';
  isAuthenticated: boolean;
  userData: any;
  constructor(
    private _AuthService: AuthService,
    private oidcSecurityService: OidcSecurityService
  ) {
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.doCallbackLogicIfRequired();
      });
    }

  }


  ngOnInit() {
    this._AuthService.getIsAuthorized().subscribe(auth => {
      this.isAuthenticated = auth;
    });

    // this._AuthService.getUserData().subscribe(userData => {
    //   this.userData = userData;
    // });

  }
  ngOnDestroy() {

  }

  login() {
    debugger;
    this._AuthService.login();
  }

  logout() {
    this._AuthService.logout();
  }

  doCallbackLogicIfRequired() {
    // Will do a callback, if the url has a code and state parameter.
    this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  }

}


