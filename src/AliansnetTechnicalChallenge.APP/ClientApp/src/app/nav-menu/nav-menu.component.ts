import { AccountService } from './../accounts/services/account.service';
import { getAuthStatusAction, logoutAction } from './../accounts/actions/login.action';
import { AuthStatusState } from './../accounts/account.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../app.state';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isExpanded = false;

  authData: AuthStatusState;
  private unsubscribe: Subject<void> = new Subject();

  authData$: Observable<AuthStatusState> = this.store.pipe(select(state => state.authState));

  constructor(private store: Store<AppState>, private accountService: AccountService) { }

  ngOnInit() {

    this.store.dispatch(getAuthStatusAction({ data: this.accountService.GetAuthStatus() }));

    this.authData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(authState => {
      this.authData = authState;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  doLogout(){
    this.store.dispatch(logoutAction());
    this.accountService.LogOut();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
