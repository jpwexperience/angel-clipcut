import { Injectable } from '@angular/core';
import { Clip } from './models/clip';
import { Observable, of } from 'rxjs';

declare var createClip: any;
declare var createGif: any;
declare var fileCheck: any;
declare var timecodeToSec: any;

@Injectable({
	providedIn: 'root'
})
export class ClipListService {
	private detectChanges: () => void; 
	private CLIPS: Clip[] = [];

	constructor() {}

	clipsUpdate(fn: () => void){
		this.detectChanges = fn;
	}

	clipGen(fn: () => void){
		this.detectChanges = fn;
	}

	getClips(): Observable<Clip[]> {
		return of(this.CLIPS);
	}

	findClip(clip): Clip {
		return this.CLIPS.find(match => match.name == clip.name);
	}

	addClip(clip): void {
		this.CLIPS.unshift(clip);
		this.detectChanges();
	}
	
	removeClip(clip): void {
		let rmClip = this.findClip(clip);
		this.CLIPS.splice(this.CLIPS.indexOf(rmClip), 1);
		this.detectChanges();
	}
	
	runCommand(clip): void {
		clip.running = true;
		if(clip.palCommand.length == 0){
			createClip(clip, this.clipFinished, this.progUpdate);
		} else {
			createGif(clip, this.clipFinished, this.progUpdate);
		}
	}

	nameCheck(film, ext): string {
		let fileName = fileCheck(film, ext);
		let badname = true;
		let finalName = fileName;
		while(badname){
			let tempName = finalName + '.' + ext;
			if(ext == "gif"){}
			badname = false;
			for(var i = 0; i < this.CLIPS.length; i++){
				if(tempName == this.CLIPS[i].name){
					finalName += '_' + timecodeToSec(film.start) + '-' + timecodeToSec(film.dur);	
					badname = true;
					break;
				}
			}
		}
		return finalName;
	}

	//Need arrow function so detectChanges can be accessed
	clipFinished = (clip) => {
		clip.running = false;
		clip.complete = true;
		this.detectChanges();
	}

	progUpdate = (clip, value) => {
		clip.percentage = value;
		this.detectChanges();
	}
}
