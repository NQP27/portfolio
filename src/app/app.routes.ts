import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { StackComponent } from './components/stack/stack';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stack', component: StackComponent },
];
