import { Injectable } from '@angular/core';
import { Clip } from './models/clip';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ClipListService {
	private CLIPS: Clip[] = [];
	constructor() { }

	getClips(): Observable<Clip[]> {
		return of(this.CLIPS);
	}
		/*
	findClip(clip): Clip {
		return this.CLIPS.find(match => match.name == clip.name);
	}

	addClip(clip): Clip {
		CLIPS.push(clip);
	}
	
	removeClip(clip): void {
		let rmClip = this.findClip(clip);
		this.CLIPS.splice(this.CLIPS.indexOf(rmClip), 1);
	}
		*/
}
