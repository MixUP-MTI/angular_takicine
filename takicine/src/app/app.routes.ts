import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MoviesComponent} from "./movies/movies.component";
import {AddMovieComponent} from "./movies/add-movie/add-movie.component";
import {EditMovieComponent} from "./movies/edit-movie/edit-movie.component";
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'add-movie', component: AddMovieComponent},
  { path: 'edit-movie/:id', component: EditMovieComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'panel-admin', component: PanelAdminComponent},
];

