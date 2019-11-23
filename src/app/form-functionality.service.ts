import { Injectable } from '@angular/core';
import { Film } from './models/film';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FormFunctionalityService {
	private formFilm: Film = new Film('', '', [], [], [], [], 0, 0);
	
	getFormFilm(): Observable<Film> {
		return of(this.formFilm);
	}
	
	setFormFilm(inFilm): void {
		this.formFilm = inFilm;
	}
}
