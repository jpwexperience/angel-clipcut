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

	heightCheck(film): void {
			if (film.cropW % 2 != 0){
				film.cropW--;
			}
			if (film.cropH % 2 != 0){
				film.cropH--;
			}
			if (film.scale % 2 != 0){
				film.scale--;
			}
			let finalHeight = Math.round((film.scale * film.cropH) / film.cropW);
			console.log(film.cropW + 'x' + film.cropH + ' Scale: ' + film.scale);
			while(finalHeight % 2 != 0){
				film.scale -= 2;
				finalHeight = Math.round((film.scale * film.cropH) / film.cropW);
			}
		}

	create(film): Clip[] {
		let clips = [];
		for (const ext in film.ext){
			if(film.ext[ext]){
				let oldName = film.clipName;
				film.clipName = this.clipListService.nameCheck(film, ext);
				let clipName = film.clipName + '.' + ext;
				let initialClip = this.commandGenerateService.generate(film, ext);
				let newClip = new Clip(clipName, initialClip);
				if(ext == "gif"){
					newClip.palCommand = this.commandGenerateService.palGenerate(film);
					newClip.gifCommand = this.commandGenerateService.gifGenerate(film);
				} 
				this.clipListService.addClip(newClip);
				clips.push(newClip);
				film.clipName = oldName;
			}
		}
		return clips;
	}

}
