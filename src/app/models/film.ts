export class Film {
	isForm = false;
	crf = 18;
	start = "00:00:00.00";
	dur = "1:00";
	ext = {
		mp4: true,
		mov: false,
		mkv: false,
		gif: false,
		webm: false
	};
	scale = 0;
	cropW = 0;
	cropH = 0;
	framerate = 23;
	bitrate = 0.50;
	clipName = "";
	vChoice = "0";
	aChoice = "0";
	sChoice = "no-sub";
	playing = 0;
	constructor(
		public filePath: string, 
		public name: string,
		public outDir: string,
		public vStreams: string[], 
		public aStreams: string[], 
		public sStreams: string[], 
		public extSubs: string[], 
		public width: number, 
		public height: number) {
		this.scale = width;
		this.cropW = width;
		this.cropH = height;
		this.clipName = name + '-cut';
        }
}
