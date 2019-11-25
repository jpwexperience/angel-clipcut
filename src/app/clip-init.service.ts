import { Injectable } from '@angular/core';
import { ClipListService } from './clip-list.service';
import { CommandGenerateService } from './command-generate.service';
import { Clip } from './models/clip';

@Injectable({
	providedIn: 'root'
})
export class ClipInitService {

	constructor(private clipListService: ClipListService,
		private commandGenerateService: CommandGenerateService) { }

	create(film): void {
		for (const ext in film.ext){
			if(film.ext[ext]){
				let clipName = film.clipName + '.' + ext;
				let command = this.commandGenerateService.generate(film, ext);
				let newClip = new Clip(clipName, command);
				this.clipListService.addClip(newClip);
			}
		}

	}

}
