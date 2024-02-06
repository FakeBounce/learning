import LoadableComponent from './LoadableComponent';
import { lazy } from 'react';
// ----------------------------------------------------------------------

// AUTH
export const LoginPage = LoadableComponent(lazy(() => import('@src/pages/login/LoginPage')));

// MAIN
export const Page404 = LoadableComponent(lazy(() => import('../pages/Page404')));
