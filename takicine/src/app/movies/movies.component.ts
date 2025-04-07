import {Component, DestroyRef, inject} from '@angular/core';
import {AsyncPipe, DatePipe} from "@angular/common";
import {MovieComponent} from "../home/movie/movie.component";
import {Observable} from "rxjs";
import {Movie} from "../models/movie";
import {MoviesService} from "../services/movies.service";
import {RouterLink} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    AsyncPipe,
    MovieComponent,
    DatePipe,
    RouterLink
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  private readonly moviesService = inject(MoviesService)
  private readonly toastr = inject(ToastrService)
  // movies$: Observable<Movie[]> = this.moviesService.getMovies()

  movies: Movie[] = [];
  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies);
  }

  private destroyRef = inject(DestroyRef)

  deleteMovie(id: number | undefined): void {
    if (id === undefined)
      return
    this.moviesService.deleteMovie(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() =>
      this.movies = this.movies.filter(film => film.id !== id)
    );
    this.toastr.success("Film supprimé !")
  }


}
