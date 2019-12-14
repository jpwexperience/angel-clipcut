import { Injectable } from '@angular/core';
import { ClipListService } from './clip-list.service';
import { CommandGenerateService } from './command-generate.service';
import { Clip } from './models/clip';

declare var fileCheck: any;

@Injectable({
	providedIn: 'root'
})
export class ClipInitService {

	constructor(private clipListService: ClipListService,
		private commandGenerateService: CommandGenerateService) { }

	create(film): Clip[] {
		let clips = [];
		for (const ext in film.ext){
			if(film.ext[ext]){
				if(ext == "gif"){
					film.clipName = fileCheck(film, "mp4");
					let clipName = film.clipName + '.' + ext;
					let initialClip = this.commandGenerateService.generate(film, "mp4");
					let newClip = new Clip(clipName, initialClip);
					newClip.palCommand = this.commandGenerateService.palGenerate(film);
					newClip.gifCommand = this.commandGenerateService.gifGenerate(film);
					this.clipListService.addClip(newClip);
					clips.push(newClip);
				} else {
					film.clipName = fileCheck(film, ext);
					let clipName = film.clipName + '.' + ext;
					let command = this.commandGenerateService.generate(film, ext);
					let newClip = new Clip(clipName, command);
					this.clipListService.addClip(newClip);
					clips.push(newClip);
				}
			}
		}
		return clips;
	}

}
