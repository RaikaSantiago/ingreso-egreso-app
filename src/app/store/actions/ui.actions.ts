import { createAction, props } from '@ngrx/store';

export const loading = createAction('[UI Component] loading', props<{loading: boolean}>());