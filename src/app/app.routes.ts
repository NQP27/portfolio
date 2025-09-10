import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { StackComponent } from './components/stack/stack';
import { ExperienceComponent } from './components/experience/experience';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stack', component: StackComponent },
  { path: 'experience', component: ExperienceComponent },
];
