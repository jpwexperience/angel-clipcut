import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmListService } from '../film-list.service';
import { ClipInitService } from '../clip-init.service';
import { ClipListService } from '../clip-list.service';
import { Film } from '../models/film';
declare var filmDir: any;
declare var playVideo: any;

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	changeDetectorRef: ChangeDetectorRef
	films: Film[];

	constructor(
		private filmListService: FilmListService,
		private clipInitService: ClipInitService,
		private clipListService: ClipListService,
		changeDetectorRef: ChangeDetectorRef
	) {
		this.changeDetectorRef = changeDetectorRef;
	}

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
		if(film.scale > value){
			film.scale = value;
		}
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

	setBitrate(value, film): void {
		film.bitrate = value;
	}

	setFramerate(value, film): void {
		film.framerate = value;
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
		film.vChoice = value;
	}
	
	setAudioStream(value, film): void {
		film.aChoice = value;
	}

	setSubStream(value, film): void {
		film.sChoice = value;
	}

	playVid(film): void {
		playVideo(film, this.playerUpdate);
	}

	toggleErr(element, value): void {
		let elemClass = element.classList[0];
		if(elemClass == "errBox"){
			element.setAttribute('class', 'inputBox');
			element.value = value;
		}
	}

	playerUpdate = (film, option) => {
		if(option == "start"){
			film.stamps[0] = film.playing;
			film.start = film.playing.toString();
		} else if(option == "duration"){
			if(film.playing >= film.stamps[0]){
				film.stamps[1] = film.playing;
				film.dur = (film.playing - film.stamps[0]).toFixed(3).toString();
			} else{
				let tempTime = film.stamps[0];
				film.stamps[0] = film.playing;
				film.stamps[1] = tempTime;
				film.start = film.playing.toString();
				film.dur = (tempTime - film.stamps[0]).toFixed(3).toString();
			}
		} else{
			//this.clipInitService.heightCheck(film);
			let newClips = this.clipInitService.create(film);
			for (var i = 0; i < newClips.length; i++){
				this.clipListService.runCommand(newClips[i]);
			}
		}
		this.changeDetectorRef.detectChanges();
	}

	createClip(film, start, dur): void {
		//this.clipInitService.heightCheck(film);
		let stampReg = /^(([1-5]?[0-9]|[0][0-9]):){1,2}(([1-5]?[0-9]|[0][0-9])(\.[0-9]+)?)$|^([0-9]+(\.[0-9]{1,3})?)$/;
		let startMatch = start.value.match(stampReg); 
		let durMatch = dur.value.match(stampReg); 
		let inputErr = false;
		if(!startMatch){
			console.log('Bad Start Input: ' + start.value);
			start.setAttribute('class', 'errBox');
			start.value = "Bad Start Input";
			inputErr = true;
		}
		if(!durMatch){
			console.log('Bad Duration Input: ' + dur.value);
			dur.setAttribute('class', 'errBox');
			dur.value = "Bad Duration Input";
			inputErr = true
		}
		if(inputErr){
			return
		} else{
			this.clipInitService.create(film);
		}
	}
}
