import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, APP_INITIALIZER } from '@angular/core';


import { AuthModule, OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './service/auth.service';
import { ConfigurationService } from './service/config.service';

const appInitializerFn = (appConfig: ConfigurationService) => {
  return () => {
    return appConfig.loadConfig();
  };
};

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
  providers: [
    { provide: 'ORIGIN_URL', useFactory: getBaseUrl },
    AuthService,
    OidcSecurityService,
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigurationService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructore() {

  }

}
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
