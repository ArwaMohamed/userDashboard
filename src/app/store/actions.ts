import { createAction, props } from '@ngrx/store';
import { User } from '../models/User';

export const loadUsers = createAction('[User] Load Users', props<{ page: number }>());
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[], per_page: number, total: number}>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: User }>());
export const loadUser = createAction('[User] Load User', props<{ userId: number }>());
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());
export const resetSelectedUser = createAction('[User] Reset Selected User');
