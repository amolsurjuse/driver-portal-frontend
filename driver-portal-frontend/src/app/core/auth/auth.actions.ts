import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequest, RegisterRequest } from '../api/auth-api.service';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ payload: LoginRequest }>(),
    'Login Success': props<{ accessToken: string }>(),
    'Login Failure': props<{ error: string }>(),

    'Register': props<{ payload: RegisterRequest }>(),
    'Register Success': props<{ accessToken: string }>(),
    'Register Failure': props<{ error: string }>(),

    'Refresh': emptyProps(),
    'Refresh Success': props<{ accessToken: string }>(),
    'Refresh Failure': props<{ error: string }>(),

    'Logout Device': emptyProps(),
    'Logout All': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>(),

    'Set Access Token': props<{ accessToken: string | null }>(),
    'Clear Auth': emptyProps(),
  },
});
