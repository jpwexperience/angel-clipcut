import { Injectable } from '@angular/core';
import { Film } from './models/film';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FilmListService {
	private FILMS: Film[] = [];
	constructor() { }
	getFilms(): Observable<Film[]> {
		return of(this.FILMS);
	}
	findFilm(inFilm): Film {
		return this.FILMS.find(match => match.name == inFilm.name);
	}
	addFilm(film: Film): void {
		this.FILMS.push(film);
	}
	removeFilm(film: Film): void {
		let rmFilm = this.findFilm(film);
		this.FILMS.splice(this.FILMS.indexOf(rmFilm), 1);
	}
}
