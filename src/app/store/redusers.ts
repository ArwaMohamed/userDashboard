import { createReducer, on } from '@ngrx/store';
import * as UserActions from './actions';

export interface UserState {
  loading: boolean;
  users: any[];
  selectedUser: any;
  per_page:any;
  total:any;
  error: any;
}

export const initialState: UserState = {
  loading:false,
  users: [],
  per_page: 0,
  total: 0,
  selectedUser: null,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    users: [], // Reset users array
    error: null
  })),
  on(UserActions.loadUsersSuccess, (state, { users, per_page, total }) => ({
    ...state,
    users: [...state.users, ...users],
    per_page,
    total,
    loading:false
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading:false
  })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    loading:false,
    selectedUser: user
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading:false
  }))
);
