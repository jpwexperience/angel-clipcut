export class Film {
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
