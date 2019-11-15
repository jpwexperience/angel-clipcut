import { Component } from '@angular/core';
import { FilmInitService } from './film-init.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'angel-clipcut';
	constructor(private filmInitService: FilmInitService) {}
	fileUp(files){
		let paths = [];
		for (var i = 0; i < files.length; i++){
			paths.push(files[i].path);
		}
		this.filmInitService.process(paths);
	}	

}
