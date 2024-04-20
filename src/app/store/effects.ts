import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from './actions';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(({ page }) => this.userService.getUsers(page).pipe(
      map(users => UserActions.loadUsersSuccess({ users })),
      catchError(error => of(UserActions.loadUsersFailure({ error })))
    ))
  ));

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUser),
    mergeMap(({ userId }) => this.userService.getUserById(userId).pipe(
      map(user => UserActions.loadUserSuccess({ user })),
      catchError(error => of(UserActions.loadUserFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
