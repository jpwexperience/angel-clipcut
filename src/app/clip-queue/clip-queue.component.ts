import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClipListService } from '../clip-list.service';
import { Clip } from '../models/clip';

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

	runCommand(clip, button): void {	
		button.setAttribute('disabled', 'true');
		button.setAttribute('class', 'runClick');
		this.clipListService.runCommand(clip);
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
	
}
