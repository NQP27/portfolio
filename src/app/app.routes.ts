import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ProjectComponent } from './components/projects/projects';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectComponent },
];
