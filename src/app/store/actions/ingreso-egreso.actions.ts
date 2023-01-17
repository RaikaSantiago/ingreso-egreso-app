import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.models';

export const setItems = createAction('[Ingreso_Egreso Component] setItems', props<{ items: IngresoEgreso[] }>());
export const unSetItems = createAction('[Ingreso_Egreso Component] unSetItems');