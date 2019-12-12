import { Injectable } from '@angular/core';
import { Clip } from './models/clip';
import { Observable, of } from 'rxjs';

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
}
