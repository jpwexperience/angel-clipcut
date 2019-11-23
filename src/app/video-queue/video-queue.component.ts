import { Component, OnInit } from '@angular/core';
import { FilmListService } from '../film-list.service';
import { Film } from '../models/film';

@Component({
	selector: 'app-video-queue',
	templateUrl: './video-queue.component.html',
	styleUrls: ['./video-queue.component.scss']
})
export class VideoQueueComponent implements OnInit {

	films: Film[];
	constructor(private filmListService: FilmListService) {}

	ngOnInit() {
		this.getFilms();
	}

	getFilms(): void {
		this.filmListService.getFilms().subscribe(films => this.films = films);
	}

	ayy(event): void {
		console.log('Button Got Clicked.');
		console.log(event);
	}
	removeFilm(film): void {
		this.filmListService.removeFilm(film);
	}

}
