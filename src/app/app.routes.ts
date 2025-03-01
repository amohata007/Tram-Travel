// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { TramListComponent } from './components/tram-list/tram-list.component';

export const routes: Routes = [
  { path: '', component: TramListComponent },
  { path: '**', redirectTo: '' },
];
