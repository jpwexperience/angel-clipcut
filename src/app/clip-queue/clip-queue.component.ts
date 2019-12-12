import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClipListService } from '../clip-list.service';
import { Clip } from '../models/clip';

declare var createClip: any;
declare var createGif: any;
declare var openFile: any;

@Component({
	selector: 'app-clip-queue',
	templateUrl: './clip-queue.component.html',
	styleUrls: ['./clip-queue.component.scss'],
})
export class ClipQueueComponent implements OnInit {
	changeDetectorRef: ChangeDetectorRef

	clips: Clip[];

	constructor(private clipListService: ClipListService,
		changeDetectorRef: ChangeDetectorRef) {
		this.changeDetectorRef = changeDetectorRef;
	}

	ngOnInit() {
		this.getClips();
		this.clipListService.clipsUpdate(this.detectChanges.bind(this));
	}

	getClips(): void {
		this.clipListService.getClips().subscribe(clips => this.clips = clips);
	}

	removeClip(clip): void {
		this.clipListService.removeClip(clip);
	}

	runCommand(clip): void {	
		clip.running = true;
		if(clip.palCommand.length == 0){
			createClip(clip, this.clipFinished, this.progUpdate);
		} else {
			createGif(clip, this.clipFinished, this.progUpdate);
		}
	}

	openClip(clip): void {
		openFile(clip);
	}

	logClip(clip): void {
		console.log(clip);
	}

	detectChanges(): void {
		this.changeDetectorRef.detectChanges();
	}
	
	//Use fat arrow function to use changeDetectorRef 
	//since it wouldn't be found otherwise
	clipFinished = (clip) => {
		clip.running = false;
		clip.complete = true;
		this.detectChanges();
	}

	progUpdate = (clip, value) => {
		clip.percentage = value;
		this.detectChanges();
	}

}


