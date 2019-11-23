import { Component, OnInit } from '@angular/core';
import { FormFunctionalityService } from '../form-functionality.service';
import { Observable } from 'rxjs';
import { Film } from '../models/film';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	formFilm: Film;
	constructor(private formFunctionalityService: FormFunctionalityService) {}

	ngOnInit() {
		this.getFormFilm();
	}

	getFormFilm(): void {
		this.formFunctionalityService.getFormFilm().subscribe(formFilm => this.formFilm = formFilm);
		console.log('---Form Component Test---')
		console.log(this.formFilm);
	}
}
