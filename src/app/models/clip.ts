export class Clip {
	palCommand = [];
	gifCommand = [];
	running = false;
	complete = 0;
	percentage = 0;
	constructor(
		public name: string, 
		public command: string[]) {}
}
