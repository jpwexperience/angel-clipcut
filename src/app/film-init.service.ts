import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';
declare var ffprobe: any;

@Injectable({
  providedIn: 'root'
})



export class FilmInitService {
	process(paths): void{
		for (var i = 0; i < paths.length; i++){
			ffprobe(paths[i], function grab(output){
				infoSplit(output);
			});
		}
	}
  constructor() { }
}

function infoSplit(info){
	console.log('Info---\n' + info);
	let streams = {
		"total": [],
		"v": [], 
		"a": [], 
		"s": []
	};
	let width = 0;
        let height = 0;
        let streamReg = /.*Stream #.*/;
        let vReg = /.*Video:.*/;
        let aReg = /.*Audio:.*/;
        let sReg = /.*Subtitle:.*/;
	let lines = info.split("\n");
	for (var i = 0; i < lines.length; i++){
                if (streamReg.test(lines[i])){
			console.log(lines[i]);
                        streams["total"].push(lines[i]);
		}
        }
	console.log(streams["total"]);
}
