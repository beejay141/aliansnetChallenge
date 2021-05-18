import { adminUserProductListReducer } from './dashboard/reducers/admin-user-product.reducer';
import { AdminAuthGuard } from './shared/guards/admin-auth.guard';
import { productReducer } from './dashboard/reducers/product.reducer';
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/services/interceptors/token-interceptor.service';
import { ErrorInterceptor } from './shared/services/interceptors/error-interceptor.service';
import { ProductEffect } from './dashboard/effects/product.effect';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NonAuthGuard } from './shared/guards/non-auth.guard';
import { ProductAuditEffect } from './dashboard/effects/product-audit.effect';
import { productAuditReducer } from './dashboard/reducers/product-audit.reducer';
import { AuthGuard } from './shared/guards/auth.guard';
import { adminUserListReducer } from './dashboard/reducers/user.reducer';
import { UserEffect } from './dashboard/effects/user.effect';
import { AdminUserProductEffect } from './dashboard/effects/admin-user-products.effect';

@NgModule({
  declarations: [
    NavMenuComponent,
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,

    EffectsModule.forRoot([LoginEffects, RegisterEffect,
      ProductEffect, ProductAuditEffect,
      UserEffect,AdminUserProductEffect]),

    StoreModule.forRoot({
      loginState: loginReducer,
      regState: registerReducer,
      authState: authStatusReducer,
      productState: productReducer,
      productAuditState: productAuditReducer,
      adminUserListState: adminUserListReducer,
      adminUserProductsState: adminUserProductListReducer
    })
  ],
  providers: [
    { provide: 'ORIGIN_URL', useValue: `${location.origin}/api` },
    AccountService,
    HelperService,
    NonAuthGuard,
    AuthGuard,
    AdminAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
