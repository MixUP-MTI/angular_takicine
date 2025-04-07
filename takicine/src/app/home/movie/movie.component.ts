import {Component, inject, Input} from '@angular/core';
import {Movie} from "../../models/movie";
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [NgbCarouselModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  providers: [NgbCarouselConfig]
})
export class MovieComponent {
  @Input({required: true}) movie!: Movie

  constructor(config: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
	}
}
