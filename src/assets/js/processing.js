function ayy(){
	console.log('processing.js entered');
}

function ffprobe(paths, sendOutput) {
	let command = "ffmpeg -hide_banner -i '" + paths + "'";
	var exec = require('child_process').exec, child;
	child = exec(command,
	function (error, stdout, stderr) {
		sendOutput(stderr);
	});
}
