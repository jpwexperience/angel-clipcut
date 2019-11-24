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
	films: Film[];

	constructor(
		private filmListService: FilmListService,
		) {}

	ngOnInit() {
		this.getFilms();
	}

	getFilms(): void {
		this.filmListService.getFilms().subscribe(films => this.films = films);
	}

	setStart(value, film): void {
		film.start = value;
	}

	setDur(value, film): void {
		film.dur = value;
	}

	setExt(event, value): void {
		console.log(value + ' is checked: ' + event.currentTarget.checked);
	}

}
