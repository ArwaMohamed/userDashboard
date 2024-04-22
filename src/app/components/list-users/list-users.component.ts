import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router,NavigationStart  } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, filter } from 'rxjs';
import { loadUsers, resetSelectedUser } from 'src/app/store/actions';
import { UserState } from 'src/app/store/redusers';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit,OnDestroy{
  users$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  userList:any[]=[]
  currentPage = 1;
  pageSize !:number // Adjust the page size as needed
  totalUsersCount!: number;
  isLoading:boolean=false
  private routerSubscription!: Subscription;
  constructor(private store: Store<UserState>, private router: Router) {
    this.users$ = store.pipe(select(state => state.users));
    this.loading$ = store.pipe(select(state => state.loading));
    this.error$ = store.pipe(select(state => state.error));

    //check for back from browser
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationStart => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        this.store.dispatch(resetSelectedUser());

      }
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.store.select(state => state.users).subscribe(({users,selectedUser,loading}:any )=> {
      this.isLoading=loading
      console.log(selectedUser);

      if (selectedUser) {
        const userData =selectedUser['data']
        if(Array.isArray(userData)){
          this.userList = userData
        }else{
          this.userList=[userData]
        }
      }
    });

  }
  ngOnDestroy(): void {
    // Unsubscribe from router events
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  loadUsers(): void {
    this.store.dispatch(loadUsers({ page: this.currentPage }));
    this.users$.subscribe(({users,total,per_page,loading}:any) => {
      this.isLoading=loading
      // Update the totalUsersCount based on the length of users array
      this.totalUsersCount = total;
      this.pageSize = per_page
      // Update the userList with the latest users array
      this.userList = users;
    });
  }

  onPageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1; // MatPaginator starts page index from 0
    this.loadUsers();
  }
  getUserDetails(userId:any){
    this.router.navigate([`users/${userId}`])
  }
}
