import { Component, OnInit } from '@angular/core';
//import { FormFunctionalityService } from '../form-functionality.service';
import { Observable } from 'rxjs';
import { FilmListService } from '../film-list.service';
import { Film } from '../models/film';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	formFilm: Film = new Film('', '', [], [], [], [], 0, 0);
	films: Film[];

	constructor(
		private filmListService: FilmListService,
		//private formFunctionalityService: FormFunctionalityService
		) {}

	ngOnInit() {
		//this.getFormFilm();
		this.getFilms();
	}

	getFormFilm(): void {
		/*
		this.formFunctionalityService.getFormFilm().subscribe(formFilm => this.formFilm = formFilm);
		console.log('---Form Component Test---')
		console.log(this.formFilm);
		 */
	}
	getFilms(): void {
		this.filmListService.getFilms().subscribe(films => this.films = films);
	}

	ayy(): void {
		console.log('---Form Component Entered---');
	}
}
