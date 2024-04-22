import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUser } from 'src/app/store/actions';
import { UserState } from 'src/app/store/redusers';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  user$!: Observable<any>;
  error$!: Observable<any>;
  user:any
  constructor(
    private route: ActivatedRoute,
    private store: Store<UserState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id']; // Convert userId to number
      this.store.dispatch(loadUser({ userId }));
    });

    this.user$ = this.store.pipe(select(state => state.users));
    this.user$.subscribe((res)=>{
      this.user = res?.selectedUser?.data
    })
    this.error$ = this.store.pipe(select(state => state.error));
  }

}
