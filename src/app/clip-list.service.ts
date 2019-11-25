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

}
