import { ActionReducerMap } from '@ngrx/store';
import * as auth from './store/reducers/user.reducer';
import * as ie from './store/reducers/ingreso-egreso.reducer';


export interface AppState {
   auth: auth.State;
   ingresoEgreso: ie.State;
}



export const appReducers: ActionReducerMap<AppState> = {
   auth: auth.authReducer,
   ingresoEgreso: ie.ingresoEgresoReducer
}