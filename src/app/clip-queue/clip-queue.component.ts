import { Component, OnInit } from '@angular/core';
import { ClipListService } from '../clip-list.service';
import { Clip } from '../models/clip';

@Component({
  selector: 'app-clip-queue',
  templateUrl: './clip-queue.component.html',
  styleUrls: ['./clip-queue.component.scss']
})
export class ClipQueueComponent implements OnInit {

	clips: Clip[];

	constructor(
		private clipListService: ClipListService,
		) {}

	ngOnInit() {
		this.getClips();
	}

	getClips(): void {
		this.clipListService.getClips().subscribe(clips => this.clips = clips);
	}

}
