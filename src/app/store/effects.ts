import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from './actions';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(({ page }) => this.userService.getUsers(page).pipe(
      tap(response => console.log('Response:', response)), // Log the response
      map(response => {
        const { data, per_page, total } = response;
        return UserActions.loadUsersSuccess({ users: data, per_page: per_page, total: total });
      }),
      catchError(error => of(UserActions.loadUsersFailure({ error })))
    ))
  ));


  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUser),
    mergeMap(({ userId }) => this.userService.getUserDetails(userId).pipe(
      map(user => UserActions.loadUserSuccess({ user })),
      catchError(error => of(UserActions.loadUserFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
