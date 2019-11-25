import { Component, OnInit } from '@angular/core';
//import { FormFunctionalityService } from '../form-functionality.service';
import { Observable } from 'rxjs';
import { FilmListService } from '../film-list.service';
import { Film } from '../models/film';
declare var filmDir: any;

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

	setExt(event, value, film): void {
		let isChecked = event.currentTarget.checked;
		if(isChecked){
			film.ext[value] = true;
		} else{
			film.ext[value] = false;
		}
	}

	setWidth(value, film): void {
		film.cropW = value;
	}

	setHeight(value, film): void {
		film.cropH = value;
	}

	setScale(value, film): void {
		film.scale = value;
	}

	setCrf(value, film): void {
		film.crf = value;
	}

	setClipName(value, film): void {
		film.clipName = value;
	}

	setOutDir(path, film): void {
		if(path != undefined){
			film.outDir = path;
		}
	}

	getOutDir(film): void {
		filmDir(film, this.setOutDir);
	}

	setVideoStream(value, film): void {
		console.log('---Video Choice---');
		console.log(value);
		film.vChoice = value;
	}
	
	setAudioStream(value, film): void {
		console.log('---Audio Choice---');
		console.log(value);
		film.aChoice = value;
	}

	setSubStream(value, film): void {
		console.log('---Subtitle Choice---');
		console.log(value);
		film.sChoice = value;
	}
}
