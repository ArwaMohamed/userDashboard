import { createReducer, on } from '@ngrx/store';
import * as UserActions from './actions';

export interface UserState {
  loading: any;
  users: any[];
  selectedUser: any;
  error: any;
}

export const initialState: UserState = {
  loading:false,
  users: [],
  selectedUser: null,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: [...state.users, ...users]
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
