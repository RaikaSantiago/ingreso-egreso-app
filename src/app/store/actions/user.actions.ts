import { createAction, props } from '@ngrx/store';
import { UsuarioModel } from '../../models/usuario.models';

export const setUser = createAction('[Auth Component] setUser', props<{ user: UsuarioModel }>());
export const unSetUser = createAction('[Auth Component] unSetUser');