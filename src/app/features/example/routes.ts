import { Routes } from '@angular/router';
import Example from './example';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => Example,
  },
];

export default routes;
