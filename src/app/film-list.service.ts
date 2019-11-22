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
	addFilm(film: Film): void {
		this.FILMS.push(film);
	}
}
