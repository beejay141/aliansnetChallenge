import { adminUsersInitialState, AdminUsersListState } from './../../dashboard.state';
import { refreshUsersAction } from './../../actions/user.action';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { UserFilterModel } from '../../models/users/user-filter.model';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.component.html'
})

export class AdminDashboardComponent implements OnInit, OnDestroy {

  usersData: AdminUsersListState = adminUsersInitialState;
  private unsubscribe: Subject<void> = new Subject();

  filter : UserFilterModel;

  usersData$: Observable<AdminUsersListState> = this.store.pipe(select(state => state.adminUserListState));

  constructor(private store: Store<AppState>,private router: Router) { }

  ngOnInit() {
    this.filter = new UserFilterModel();

    this.filterUsers();

    this.usersData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(usersState => {
      this.usersData = usersState;
    });
  }

  viewProducts(id: string){
    this.router.navigate([`/dashboard/admin/user/${id}/products`])
  }

  filterUsers(){
    this.store.dispatch(refreshUsersAction({filter: this.filter}));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
