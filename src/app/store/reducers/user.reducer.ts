import { createReducer, on } from '@ngrx/store';
import * as auth from '../actions/user.actions';
import { UsuarioModel } from '../../models/usuario.models';

export interface State {
    user: UsuarioModel;
}

export const initialState: State = {
    user: null,
}

const _authReducer = createReducer(initialState,

    on(auth.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(auth.unSetUser, state => ({ ...state, user: null })),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}