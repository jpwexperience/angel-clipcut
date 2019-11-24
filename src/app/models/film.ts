export class Film {
	isForm = false;
	crf = 18;
	outDir = "";
	start = "00:00:00.00";
	dur = "1:00";
	ext = [];
	constructor(
		public filePath: string, 
		public name: string,
		public vStreams: string[], 
		public aStreams: string[], 
		public sStreams: string[], 
		public extSubs: string[], 
		public width: number, 
		public height: number) {
        }
}
