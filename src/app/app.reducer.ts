import { ActionReducerMap } from '@ngrx/store';
import * as ui from './store/reducers/ui.reducer';
import * as auth from './store/reducers/user.reducer';


export interface AppState {
   ui: ui.State;
   auth: auth.State;
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   auth: auth.authReducer
}