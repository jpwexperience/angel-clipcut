import { Component, OnInit } from '@angular/core';
import { FilmListService } from '../film-list.service';
import { FormFunctionalityService } from '../form-functionality.service';
import { Film } from '../models/film';

@Component({
	selector: 'app-video-queue',
	templateUrl: './video-queue.component.html',
	styleUrls: ['./video-queue.component.scss']
})
export class VideoQueueComponent implements OnInit {

	films: Film[];

	constructor(
		private filmListService: FilmListService,
		private formFunctionalityService: FormFunctionalityService
		) {}

	ngOnInit() {
		this.getFilms();
	}

	getFilms(): void {
		this.filmListService.getFilms().subscribe(films => this.films = films);
	}

	setFormFilm(film): void {
		this.filmListService.clearForm(film);
		this.formFunctionalityService.setFormFilm(film);
	}

	removeFilm(film): void {
		this.filmListService.removeFilm(film);
	}

	logFilm(film): void {
		console.log(film);
	}

}
