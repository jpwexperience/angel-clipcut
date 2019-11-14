import { Component } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'angel-clipcut';
	constructor(private uploadservice: UploadService) {}
	fileUp(files){
		for (var i = 0; i < files.length; i++){
			console.log(files[i].path);
		}
	}	

}
