import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Movie} from "../../models/movie";
import {MoviesService} from "../../services/movies.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-movies',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss'
})
export class EditMovieComponent implements OnInit{
  movieId!: number;
  movie!: Movie;

  constructor(private route: ActivatedRoute) {}
  private readonly moviesService = inject(MoviesService)
  private readonly router = inject(Router)
  private readonly toastr = inject(ToastrService)


  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.moviesService.getMovie(this.movieId).subscribe(movie => this.movie = movie);

  }

  editMovie(): void {
    if (!this.movie.title) {
      this.toastr.error("Le titre ne doit pas être vide")
      return
    }

    if (this.movie.title !== this.movie.title.toUpperCase()) {
      this.toastr.error("Le titre doit être en majuscules")
      return
    }

    var regex = /^([A-Za-z]+([ '-][A-Za-z]+)*)(\s*&\s*([A-Za-z]+([ '-][A-Za-z]+)*))*$/
    if (!this.movie.director || !regex.test(this.movie.director)) {
      this.toastr.error("Le nom du réalisateur est invalide")
      return
    }

    var dateNow = new Date()
    if (!this.movie.releaseDate || new Date(this.movie.releaseDate) > dateNow) {
      this.toastr.error("La date de sortie doit être antérieure à aujourd'hui")
      return
    }

    if (!this.movie.synopsis || this.movie.synopsis.trim().length < 30) {
      this.toastr.error("Le synopsis doit contenir au moins 30 caractères")
      return
    }

    this.toastr.success("Film mis à jour !")
    this.moviesService.editMovie(this.movie).subscribe(
      () => this.router.navigate(['/movies'])
    );
  }


}
