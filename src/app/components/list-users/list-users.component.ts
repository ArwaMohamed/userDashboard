import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUsers } from 'src/app/store/actions';
import { UserState } from 'src/app/store/redusers';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit{
  users$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  userList:any[]=[]
  currentPage = 1;
  pageSize !:number // Adjust the page size as needed
  totalUsersCount!: number;
  isLoading:boolean=false
  constructor(private store: Store<UserState>, private router: Router) {
    this.users$ = store.pipe(select(state => state.users));
    this.loading$ = store.pipe(select(state => state.loading));
    this.error$ = store.pipe(select(state => state.error));
  }

  ngOnInit(): void {
    this.loadUsers();
    this.store.select(state => state.users).subscribe(({users,selectedUser,loading}:any )=> {
      this.isLoading=loading
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
