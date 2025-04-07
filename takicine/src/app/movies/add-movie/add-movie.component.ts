import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Movie} from "../../models/movie";
import {MoviesService} from "../../services/movies.service";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss'
})
export class AddMovieComponent {
  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  }

  private readonly moviesService = inject(MoviesService)
  private readonly router = inject(Router)
  private readonly toastr = inject(ToastrService)

  addMovie(): void {
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

    this.toastr.success("Nouveau film ajouté !")
    this.moviesService.addMovie(this.movie).subscribe(
      () => {
        this.router.navigate(['/movies'])
      }
    );
  }
}
