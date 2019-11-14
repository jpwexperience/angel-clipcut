import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	filename = 'No File';
	vStreams = [];
	aStreams = ['No Audio'];
	sStreams = ['No Subtitle'];
	start = '00:00:00.00';
	duration = '1:00';
	extension = ['mp4'];
	cropW = 0;
	cropH = 0;
	scale = 0;

	constructor() { }

	ngOnInit() {
	}

}
