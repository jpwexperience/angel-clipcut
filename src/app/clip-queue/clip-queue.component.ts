import { Component, OnInit } from '@angular/core';
import { ClipListService } from '../clip-list.service';
import { Clip } from '../models/clip';
import * as child from 'child_process';

declare var createClip: any;
declare var createGif: any;
declare var openFile: any;

@Component({
  selector: 'app-clip-queue',
  templateUrl: './clip-queue.component.html',
  styleUrls: ['./clip-queue.component.scss']
})
export class ClipQueueComponent implements OnInit {

	clips: Clip[];

	constructor(private clipListService: ClipListService) {}

	ngOnInit() {
		this.getClips();
	}

	getClips(): void {
		this.clipListService.getClips().subscribe(clips => this.clips = clips);
	}

	removeClip(clip): void {
		this.clipListService.removeClip(clip);
	}

	runCommand(clip): void {	
		const ffCmd = child.spawn('ls', ['-la']);
		ffCmd.stderr.on('data', (data) => {
			console.log(`${data}`);
		});
		ffCmd.on('close', (code) => {
			console.log('Clip is Finished');
		});
		ffCmd.on('error', (err) => {
			console.log('FFmpeg Command Issue: ' + err);
		});
		/*
		clip.running = true;
		if(clip.palCommand.length == 0){
			createClip(clip, testFinished);
		} else {
			createGif(clip, testFinished);
		}
		 */
	}

	finished(clip): void {
		clip.running = false;
		clip.complete = true;
	}

	openClip(clip): void {
		openFile(clip);
	}

	logClip(clip): void {
		console.log(clip);
	}

}

function testFinished(clip) {
	console.log('---CLIP IS FINISHED---');
	clip.running = false;
	clip.complete = true;
}
