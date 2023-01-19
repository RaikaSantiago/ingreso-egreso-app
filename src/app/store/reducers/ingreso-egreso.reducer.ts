import { createReducer, on } from '@ngrx/store';
import * as ieActions from '../actions/ingreso-egreso.actions';
import { IngresoEgreso } from '../../models/ingreso-egreso.models';
import { AppState } from 'src/app/app.reducer';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIE extends AppState {
    ingresoEgreso: State
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(ieActions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(ieActions.unSetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}