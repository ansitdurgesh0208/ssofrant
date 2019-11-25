import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule, OpenIdConfiguration, AuthWellKnownEndpoints, OidcSecurityService } from 'angular-auth-oidc-client';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'home', component: AppComponent },
      { path: 'forbidden', component: AppComponent },
      { path: 'unauthorized', component: AppComponent },
    ]),
    AuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oidcSecurityService: OidcSecurityService) {
    const config: OpenIdConfiguration = {
      stsServer: 'https://localhost:44363',
      redirect_url: 'https://localhost:44363',
      client_id: 'singleapp',
      response_type: 'code',
      scope: 'dataEventRecords openid',
      post_logout_redirect_uri: 'https://localhost:44363/Unauthorized',
      start_checksession: false,
      silent_renew: true,
      silent_renew_url: 'https://localhost:44363/silent-renew.html',
      post_login_route: '/dataeventrecords',
      forbidden_route: '/Forbidden',
      unauthorized_route: '/Unauthorized',
      log_console_warning_active: true,
      log_console_debug_active: true,
      max_id_token_iat_offset_allowed_in_seconds: 10,
    };

    const authWellKnownEndpoints: AuthWellKnownEndpoints = {
      issuer: 'https://localhost:44363/.well-known/openid-configuration/jwks',
      authorization_endpoint: 'https://localhost:44363/connect/authorize',
      token_endpoint: 'https://localhost:44363/connect/token',
      userinfo_endpoint: 'https://localhost:44363/connect/userinfo',
      end_session_endpoint: 'https://localhost:44363/connect/endsession',
      check_session_iframe: 'https://localhost:44363/connect/checksession',
      revocation_endpoint: 'https://localhost:44363/connect/revocation',
      introspection_endpoint: 'https://localhost:44363/connect/introspect',
    };

    this.oidcSecurityService.setupModule(config, authWellKnownEndpoints);

  }

}
