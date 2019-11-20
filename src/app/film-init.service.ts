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
				streamProcess(output);
			});
		}
	}
  constructor() { }
}

function streamProcess(info){
	console.log('Info---\n' + info);
	let streams = {
		"total": [],
		"video": [], 
		"audio": [], 
		"sub": []
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
	for (var i = 0; i < streams["total"].length; i++){
                if (vReg.test(streams["total"][i])){
			let tempReg = /Stream #\d+:\d+.*: Video: /;
                        let sizeReg = /, [0-9]+x[0-9]+/;
                        let pieces = streams["total"][i].split(tempReg);
                        let sizePieces = streams["total"][i].match(sizeReg);
                        sizePieces = sizePieces[0].split('x');
                        if(streams["video"].length == 0){
                                height = sizePieces[1];
                                let widthCut = sizePieces[0].split(', ');
                                width = widthCut[1];
                        }
			streams["video"].push(pieces[1]);
			//streams["video"].push(streams["total"][i]);
                } else if (aReg.test(streams["total"][i])){
                        let tempReg = /Stream #\d+:\d+\(/;
                        let pieces = streams["total"][i].split(tempReg);
			let outStream = "";
                        if(pieces.length < 2){
                                pieces = pieces[0].split(/Audio:/);
                                outStream = 'Undefinded:' + pieces[1];
                        } else{
                                pieces = pieces[1].split(/\): Audio:/);
                                outStream = pieces[0] + ':' + pieces[1];
			}
			streams["audio"].push(outStream);
                } else if (sReg.test(streams["total"][i])){
                        let tempReg = /Stream #\d+:\d+\(/;
                        let pieces = streams["total"][i].split(tempReg);
			let outStream = "";
                        if(pieces.length < 2){
                                pieces = pieces[0].split(/Subtitle:/);
                                outStream = 'Undefinded:' + pieces[1];
                        } else{
                                pieces = pieces[1].split(/\): Subtitle:/);
                                outStream = pieces[0] + ':' + pieces[1];
                        }
			streams["sub"].push(outStream);
                } else {;}
	}
	console.log(streams["video"]);
	console.log(streams["audio"]);
	console.log(streams["sub"]);
	console.log('Width: ' + width + ' Height: ' + height);
}
