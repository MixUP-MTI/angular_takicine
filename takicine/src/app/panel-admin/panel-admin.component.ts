import { Component, inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.scss'
})
export class PanelAdminComponent {
  movieCount: number | null = null; 
  userCount: number | null = null; 
  private readonly moviesService = inject(MoviesService)
  private readonly userService = inject(UserService)

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => this.movieCount = movies.length)
    this.userService.getUsers().subscribe(users => this.userCount = users.length)
  }
}
