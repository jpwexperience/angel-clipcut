import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CommandGenerateService {

	constructor() { }

	palGenerate(film): string[] {
		let outFile = film.outDir + "/" + film.clipName + "-gifTemp.mp4";
		let palFile = film.outDir + "/" + film.clipName + "-pal.png";
		let palCommand = ["-y", "-i", outFile, "-vf", "fps=" + film.framerate + 
			",scale=" + film.scale + ":-2:flags=lanczos,palettegen", palFile];
		return palCommand;	
	}

	gifGenerate(film): string[] {
		let outFile = film.outDir + "/" + film.clipName + "-gifTemp.mp4";
		let palFile = film.outDir + "/" + film.clipName + "-pal.png";
		let gifFile = film.outDir + "/" + film.clipName + ".gif"
		let gifCommand = ["-y", "-i", outFile, "-i", palFile, "-filter_complex", "fps=" + film.framerate +
			",scale=" + film.scale + ":-2:flags=lanczos[x];[x][1:v]paletteuse", gifFile];
		return gifCommand;
	}

	generate(film, extension): string[] {
		var commandArr = ["-y", "-hide_banner"];
		let subtitleArr = [];
		let fastSub = false;
		let vcodec = "libx264";
		let acodec = "aac";
		if (extension === 'webm'){
			vcodec = "libvpx";
			acodec = "libvorbis";
		} 
		let start = ['-ss', film.start];
		let duration = ['-t', film.dur];
		let input = ['-i', film.filePath];
		let vMap = ['-map', '0:v:' + film.vChoice];
		let aMap = ['-map', '0:a:' + film.aChoice];
		let vFilter = ['-c:v', vcodec];
		let aFilter = ['-c:a', acodec];
		let bitrate = ["-b:v", film.bitrate + "M"];
		let crf = ['-crf', film.crf];
		let cropScale = ['-vf', 'crop=' + film.cropW + ':' + film.cropH + ', scale=' + film.scale + ':-2'];
		let outFile = film.outDir + "/" + film.clipName;
		if(extension == "gif"){
			outFile += '-gifTemp.mp4';
		} else {
			outFile += '.' + extension;
		}
		if(film.sChoice != "no-sub"){
			let fastSubReg = /.*(pgs|PGS|dvd_subtitle).*/;
			let extSubReg = /ext-.*/;
			if(extSubReg.test(film.sChoice)){
				let extSplit = film.sChoice.split('-');
				let extChoice = extSplit[1];
				console.log(extChoice);
				subtitleArr.push('-vf', 'crop=' + film.cropW + ':' + film.cropH + ', subtitles=\'' +
					film.extSubs[extChoice] + '\'' + ', scale=' + film.scale + ':-2');
			} else {
				if (fastSubReg.test(film.sStreams[film.sChoice])){
					fastSub = true;
					subtitleArr.push('-filter_complex',
						'[0:v:' + film.vChoice + ']crop=' + film.cropW + ':' + film.cropH + '[c]; ' +
						'[0:s:' + film.sChoice + ']scale=' + film.cropW + ':' + film.cropH + '[sub]; ' +
						'[c][sub]overlay[s];' +  ' [s]scale=' + film.scale + ':-2[v]', '-map', '[v]');
				} else{
					subtitleArr.push('-vf', 'crop=' + film.cropW + ':' + film.cropH + ', subtitles=\'' +
						film.filePath + ':si=' + film.sChoice + '\'' + ', scale=' + film.scale + ':-2');
				}
			}
		}
		if(fastSub || film.sChoice == "no-sub"){
			commandArr = commandArr.concat(start);
			commandArr = commandArr.concat(input);
		} else {
			commandArr = commandArr.concat(input);
			commandArr = commandArr.concat(start);
		}
		commandArr = commandArr.concat(duration);
		if(fastSub){
			commandArr = commandArr.concat(subtitleArr);
		} else if(film.sChoice != "no-sub"){
			commandArr = commandArr.concat(vMap);
			commandArr = commandArr.concat(subtitleArr);
		} else {
			commandArr = commandArr.concat(vMap);
			commandArr = commandArr.concat(cropScale);
		}
		commandArr = commandArr.concat(vFilter);
		if(film.aChoice == "no-audio"){
			commandArr.push('-an');
		} else{
			commandArr = commandArr.concat(aMap);
			commandArr = commandArr.concat(aFilter);
		}
		if(extension == "webm"){
			commandArr = commandArr.concat(bitrate);
		}
		commandArr = commandArr.concat(crf);
		commandArr.push(outFile);
		return commandArr;
	}

}
