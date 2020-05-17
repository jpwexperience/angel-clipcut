const path = require('path');
const { resolve } = require('path');
const fs = require('fs');
const os = require('os');
const {dialog} = require('electron').remote;
const spawn = require('child_process').spawn;
const {shell} = require('electron');
const osPlatform = os.platform;
var ffmpeg = require('ffmpeg-static');
var windowsMpvPath = "";

/**
 * Get input file information
 * 
 * @param {string} filePath
 */
function ffprobe(filePath) {
	let command = "\"" + ffmpeg.path + "\" -hide_banner -i \"" + filePath + "\"";
	//Need to run synchronously to ffmpeg output is properly returned
	let exec = require('child_process').execSync, child;
	let extSubs = [];
	let dirpath = path.dirname(filePath);
	let files = fs.readdirSync(dirpath);
	//Extract subtitle paths from input directory
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

/**
 * Select directory clips should output to
 * 
 * @param {Film} film 
 * @param {callBack} dirSelect 
 */
function filmDir(film, dirSelect){
	dialog.showOpenDialog( {
		properties: ['openDirectory']
	}).then(result => {
		dirSelect(result.filePaths[0], film);
	}).catch(err => {
		console.log(err);
	})
}

/**
 * Check if a file is already present
 * 
 * @param {Film} film 
 * @param {string} ext 
 */
function fileCheck(film, ext){
	//need search path for windows
	let clipPath = film.outDir + '/' + film.clipName;
	let badname = true;
	while (badname){
		let tempPath = clipPath + '.' + ext;
		if (fs.existsSync(tempPath)) {
			clipPath += '_' + timecodeToSec(film.start) + '-' + timecodeToSec(film.dur);
		} else {
			badname = false;
		}
	}
	clipPath += '.' + ext;
	return path.basename(clipPath, path.extname(clipPath));
}

/**
 * Creates a new clip
 * 
 * @param {Clip} clip 
 * @param {callBack} finished 
 * @param {callBack} clipUpdate 
 */
function createClip(clip, finished, clipUpdate){
	let duration = timecodeToSec(clip.command[clip.command.findIndex(element => element === '-t') + 1]);
	const ffCmd = spawn(ffmpeg.path, clip.command);
	ffCmd.stderr.on('data', (data) => {
		console.log(`${data}`);
		let update = progUpdate(data, duration);
		clipUpdate(clip, update);
	});
	ffCmd.on('close', (code) => {
		finished(clip);
	});
	ffCmd.on('error', (err) => {
		console.log('FFmpeg Command Issue: ' + err);
	});
}

/**
 * Creates a new gif
 * 
 * @param {Clip} clip 
 * @param {callBack} finished 
 * @param {callBack} clipUpdate 
 */
function createGif(clip, finished, clipUpdate){
	let duration = timecodeToSec(clip.command[clip.command.findIndex(element => element === '-t') + 1]);
	const ffCmd = spawn(ffmpeg.path, clip.command);
	ffCmd.stderr.on('data', (data) => {
		console.log(`${data}`);
		let update = progUpdate(data, duration);
		clipUpdate(clip, update);
	});
	ffCmd.on('close', (code) => {
		const palGen = spawn(ffmpeg.path, clip.palCommand);
		palGen.stderr.on('data', (data) => {
			console.log(`${data}`);
		});
		palGen.on('close', (code) => {
			clipUpdate(clip, 0);
			const gifGen = spawn(ffmpeg.path, clip.gifCommand);
			gifGen.stderr.on('data', (data) => {
				console.log(`${data}`);
				update = progUpdate(data, duration);
				clipUpdate(clip, update);
			});
			gifGen.on('close', (code) => {
				finished(clip);
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

/**
 * Converts timecode to seconds
 * 
 * @param {string} time 
 */
function timecodeToSec(time){
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
		return durNum[0] + milli;
	} else if(len == 2){
		return durNum[1] + (60 * durNum[0]) + milli;
	} else if(len == 3){
		return durNum[2] + (60 * durNum[1]) + (3600 * durNum[0]) + milli;
	} else{
		console.log('Too many things. Default to 1:00');
		return 60;
	}
}

//Need path for windows
function openFile(clip){
	if(clip.gifCommand.length == 0){
		shell.showItemInFolder(clip.command[clip.command.length - 1]);
	} else{
		shell.showItemInFolder(clip.gifCommand[clip.gifCommand.length - 1]);
	}
}

/**
 * Update status of clip duration
 * 
 * @param {string} line 
 * @param {float} duration 
 * 	clip duration
 */
function progUpdate(line, duration){
        var timeRegex = /time=[0-9][0-9]:[0-9][0-9]:[0-9][0-9][.][0-9]*/;
        var failRegex = /Conversion failed!/;
        var fail = line.toString().match(failRegex);
        if (fail){
                return -2;
        }
        let time = line.toString().match(timeRegex);
        if (time){
                time = time[0].substring(5);
                let timeSec = timecodeToSec(time);
                let percentDone = Math.floor((timeSec / duration) * 100);
		return percentDone;
        }
        return 0;
}

/**
 * Watch for mpv keyboard message
 * 
 * @param {string} line 
 * @param {Film} film 
 * @param {callBack} playerUpdate 
 */
function getMpvEvent(line, film, playerUpdate) {
        var startReg=/.*Ctrl\+Q.*/;
        var endReg=/.*Ctrl\+W.*/;
        var createReg=/.*Ctrl\+E.*/;
        var id = film.id;
        if (line.match(startReg)){
			playerUpdate(film, "start");
        }
        if (line.match(endReg)){
			playerUpdate(film, "duration");
        }
        if (line.match(createReg)){
			playerUpdate(film, "create");
        }
}

/**
 * Extract and set current timestemp from mpv
 * 
 * @param {string} line 
 * @param {Film} film 
 */
function updatePlayingStamp(line, film) {
	let avSplitReg = /V:[^\/]+/;
	let currTime = line.match(avSplitReg);
	if (currTime) {
		currTime = currTime[0].split(" ")[1];
		let currSec = timecodeToSec(currTime);
		film.playing = currSec;
	}
}
/**
 * Opens and plays video in mpv
 * 
 * @param {Film} film 
 * @param {callBack} playerUpdate 
 */
function playVideo(film, playerUpdate) {
	let mpvPath = "";
	let hasPathError = false;
	// Get mpv path based on OS
	if(osPlatform == "darwin"){
		mpvPath = "/usr/local/bin/mpv";
	} else if(osPlatform == "win32"){
		// Make user choose mpv path if none is present
		if(windowsMpvPath.length == 0){
			let userChoice = dialog.showMessageBoxSync({
				type: 'error',
				title: 'MPV Not Found',
				buttons: ['cancel', 'ok'],
				message: 'Select path to MPV executable'
			});
			if(userChoice != 0){
				// Select and save mpv path
				mpvPath = dialog.showOpenDialogSync({
					properties: ['openFile'],
					title: 'Select MPV Executable (mpv.exe)',
					filters: [{ name: 'Executables', extensions: ['exe'] }]
				});
				if(mpvPath === undefined){
					hasPathError = true;
				} else if(path.basename(mpvPath[0]) !== "mpv.exe"){
					let userChoice = dialog.showMessageBox({
						type: 'error',
						title: 'Incorrect',
						message: mpvPath[0] + ' is not the MPV executable'
					});
					hasPathError = true;
				} else{
					mpvPath = mpvPath[0];
					windowsMpvPath = mpvPath;
				}
			} else {
				hasPathError = true;
			}
		} else {
			mpvPath = windowsMpvPath;
		}
	} else {
		mpvPath = "/usr/bin/mpv";
	} 
	if(!hasPathError){
		const mpvPlay = spawn(mpvPath, 
			['--osd-fractions', film.filePath]);
		mpvPlay.stderr.on('data', (data) => {
			// extract and set film timestamp
			updatePlayingStamp(data.toString(), film);
		});
		mpvPlay.stdout.on('data', (data) => {
			// Trigger error for keyboard clicks
			getMpvEvent(data.toString(), film, playerUpdate);
		});

		mpvPlay.on('close', (code) => {
			console.log(film.filePath + ' closed');
		});

		mpvPlay.on('error', (err) => {
			console.log('MPV Err: ' + err);
		});
	}
}
