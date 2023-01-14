import { createReducer, on } from '@ngrx/store';
import { loading } from '../actions/ui.actions';

export interface State {
    loading: boolean; 
}

export const initialState: State = {
   loading: false,
}

const _uiReducer = createReducer(initialState,

    on(loading, state => ({ ...state, loading: false})),

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}