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

function filmDir(element){
	let outDir = "";
	console.log('---filmDir Entered---');
	console.log(element);
        if ('files' in element) {
		console.log(element.files);
                console.log(path.dirname(element.files[0].path));
        }
	/*
        var tempFilm = findFilm(id);
        var dirBut = document.getElementById('outDir-' + id);
        if ('files' in dirBut) {
                tempFilm.dirPath = dirBut.files[0].path;
        }
        $(document).ready(function () {
                $('#outDir-' + id).attr('class', 'dirButtonCh');
                $('#outDirBox-' + id).css('display', 'grid');
                $('#outDirCon-' + id).html(tempFilm.dirPath);
        });
	*/
}
