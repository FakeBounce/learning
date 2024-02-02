import LoadableComponent from './LoadableComponent';
import { lazy } from 'react';
// ----------------------------------------------------------------------

// AUTH
export const LoginPage = LoadableComponent(lazy(() => import('../pages/auth/LoginPage')));

// MAIN
export const Page404 = LoadableComponent(lazy(() => import('../pages/Page404')));
