const path = require('path');
const fs = require('fs');
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
	return [ffOut, extSubs, path.basename(filePath)];
}
