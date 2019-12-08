export class Clip {
	palCommand = [];
	gifCommand = [];
	running = false;
	complete = false;
	percentage = 0;
	constructor(
		public name: string, 
		public command: string[]) {}
}
