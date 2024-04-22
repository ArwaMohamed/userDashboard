import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUser, loadUsers } from 'src/app/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private store: Store) {}

  searchUser(event: any): void {
    if(event){
      const userId = event.target.value
      this.store.dispatch(loadUser({ userId }));
    }else{
      this.store.dispatch(loadUsers({ page: 1 }));
    }
  }
}
