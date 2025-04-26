import { Routes } from '@angular/router';

export const routes: Routes =
  [
    {
      path: '',
      loadComponent: () =>
        import('./home/home.component').then(m => m.HomeComponent)
    },
    {
      path: 'stepper',
      loadComponent: () =>
        import('./reactive-stepper/stepper.component').then(m => m.StepperComponent)
    },
    {
      path: 'pse-01',
      loadComponent: () => 
        import('./pse-01/pse-01.component').then(c => c.Pse01Component)
    },

  ];