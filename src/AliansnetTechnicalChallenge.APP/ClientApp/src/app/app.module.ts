import { HelperService } from './shared/services/helper.service';
import { AccountService } from './accounts/services/account.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing,module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './accounts/effects/login.effects';
import { StoreModule } from '@ngrx/store';
import { loginReducer, authStatusReducer } from './accounts/reducers/login.reducer';
import { RegisterEffect } from './accounts/effects/register.effect';
import { registerReducer } from './accounts/reducers/register.reducer';

@NgModule({
  declarations: [
    NavMenuComponent,
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([LoginEffects, RegisterEffect]),
    StoreModule.forRoot({
      loginState: loginReducer,
      regState: registerReducer,
      authState: authStatusReducer
    })
  ],
  providers: [
    { provide: 'ORIGIN_URL', useValue: `${location.origin}/api` },
    AccountService,
    HelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
