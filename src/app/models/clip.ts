export class Clip {
	palCommand = [];
	gifCommand = [];
	running = false;
	complete = false;
	constructor(
		public name: string, 
		public command: string[]) {}
}
