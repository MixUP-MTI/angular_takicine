import { AsyncPipe, DatePipe } from "@angular/common";
import { Component, inject } from '@angular/core';
import { MoviesService } from "../services/movies.service";
import { Observable } from "rxjs";
import { Movie } from "../models/movie";
import { MovieComponent } from "./movie/movie.component";
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    MovieComponent,
    NgbCarouselModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent {
  private readonly moviesService = inject(MoviesService)
  movies$: Observable<Movie[]> = this.moviesService.getMovies()

  constructor(config: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
	}

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
