import { Component } from '@angular/core';
const spawn = require('child_process');

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
			var probe = spawn('ffmpeg', ['-h']);
			probe.stderr.on('data', (data) =>{
				console.log(`${data}`);
			});
		}
	}	

}
