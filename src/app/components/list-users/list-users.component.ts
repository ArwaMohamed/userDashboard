import { Component, OnInit } from '@angular/core';
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

  currentPage = 1;
  pageSize !:number // Adjust the page size as needed
  totalUsersCount!: number;

  constructor(private store: Store<UserState>) {
    this.users$ = store.pipe(select(state => state.users));
    this.loading$ = store.pipe(select(state => state.loading));
    this.error$ = store.pipe(select(state => state.error));
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.store.dispatch(loadUsers({ page: this.currentPage }));
    this.users$.subscribe((users) => {
      this.totalUsersCount = users.length
    }); // Assuming total count is the length of users array
  }

  onPageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1; // MatPaginator starts page index from 0
    this.loadUsers();
  }
}
