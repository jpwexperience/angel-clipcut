const path = require('path');
const fs = require('fs');
const {dialog} = require('electron').remote;
const spawn = require('child_process').spawn;
const {shell} = require('electron');
var ffmpeg = require('ffmpeg-static');

function ffprobe(filePath, sendOutput) {
	let command = ffmpeg.path + " -hide_banner -i '" + filePath + "'";
	//Need to run synchronously to ffmpeg output is properly returned
	let exec = require('child_process').execSync, child;
	let extSubs = [];
	let dirpath = path.dirname(filePath);
	let files = fs.readdirSync(dirpath);
	for (i = 0; i < files.length; i++){
		var ext = files[i].split('.').pop();
		if (ext === "srt" || ext === "ass"){
			var extSub = dirpath + "/" + files[i];
			extSubs.push(extSub);
		}
	}
	let ffOut = "";
	try {
		child = exec(command,
			function (error, stdout, stderr) {
				ffOut = stderr;
		});
	} catch(e) {
		//We anticipate an error based on ffmpeg's usage
		ffOut = e.stderr.toString();
	}
	return [ffOut, extSubs, path.basename(filePath), dirpath];
}

function filmDir(film, callBack){
	dialog.showOpenDialog( {
		properties: ['openDirectory']
	}).then(result => {
		callBack(result.filePaths[0], film);
	}).catch(err => {
		console.log(err);
	})
}

function createClip(clip, callback){
	let duration = clip.command[clip.command.findIndex(element => element === '-t') + 1];
	const ffCmd = spawn(ffmpeg.path, clip.command);
	ffCmd.stderr.on('data', (data) => {
		console.log(`${data}`);
	});
	ffCmd.on('close', (code) => {
		console.log('Clip is Finished');	
		callback(clip);
	});
	ffCmd.on('error', (err) => {
		console.log('FFmpeg Command Issue: ' + err);
	});
}

function createGif(clip, callback){
	const ffCmd = spawn(ffmpeg.path, clip.command);
	ffCmd.stderr.on('data', (data) => {
		console.log(`${data}`);
	});
	ffCmd.on('close', (code) => {
		const palGen = spawn(ffmpeg.path, clip.palCommand);
		palGen.stderr.on('data', (data) => {
			console.log(`${data}`);
		});
		palGen.on('close', (code) => {
			const gifGen = spawn(ffmpeg.path, clip.gifCommand);
			gifGen.stderr.on('data', (data) => {
				console.log(`${data}`);
			});
			gifGen.on('close', (code) => {
				callback(clip);
				console.log('Gif Creation Finished');
				let exec = require('child_process').exec, child;
				child = exec('rm "' + clip.palCommand[clip.palCommand.length - 1] + 
					'" && rm "' + clip.gifCommand[2] + '"',
					    function (error, stdout, stderr) {
						console.log('stdout: ' + stdout);
						console.log('stderr: ' + stderr);
						if (error !== null) {
						     console.log('exec error: ' + error);
						}
					    });
			});
		});
	});

}

function timecodeToSeconds(time){
	//console.log('time: ' + time);
	var durArr = time.split(':');
	var milliString = time.split('.');
	var milli = 0;
	if (typeof milliString[1] != 'undefined'){
		milli = parseInt(milliString[1].substring(0, 3)) * 0.001;
	}
	var len = durArr.length;
	var durNum = [];
	//console.log(durArr);
	for (var i = 0; i < len; i++){
		durNum.push(parseInt(durArr[i]));
	}
	//hours first, then minutes, then seconds
	if(len == 1){
		//return Math.floor(durNum[0]);
		return durNum[0] + milli;
	} else if(len == 2){
		//return Math.floor(durNum[1] + (60 * durNum[0]));
		return durNum[1] + (60 * durNum[0]) + milli;
	} else if(len == 3){
		//return Math.floor(durNum[2] + (60 * durNum[1]) + (3600 * durNum[0]));
		return durNum[2] + (60 * durNum[1]) + (3600 * durNum[0]) + milli;
	} else{
		console.log('Too many things. Default to 1:00');
		return 60;
	}
}

function openFile(clip){
	let filePath = clip.command[clip.command.length - 1];
	shell.showItemInFolder(filePath);
}
