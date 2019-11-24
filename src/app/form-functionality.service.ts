import { Injectable } from '@angular/core';
import { Film } from './models/film';
import { FormComponent } from './form/form.component';

@Injectable({
	providedIn: 'root'
})
export class FormFunctionalityService {

	setFormFilm(inFilm): void {
		inFilm.isForm = true;
	}
}
