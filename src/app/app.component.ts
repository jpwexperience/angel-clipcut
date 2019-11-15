import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'angel-clipcut';
	fileUp(files){
		for (var i = 0; i < files.length; i++){
			console.log(files[i].path);
		}
	}	

}
