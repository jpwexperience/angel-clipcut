# Angel Clip / Cut

Cross platform utility to create web optimized video clips from larger files using ffmpeg. 

Reimplementation of <a href="https://github.com/jpwexperience/clipcut-gui" target="_blank">Clip / Cut</a> using Electron and Angular.

## Getting Stared
Requires Node.js 

```
# Clone Repository
git clone https://github.com/jpwexperience/angel-clipcut.git

# go into directory and install dependencies
cd angel-clipcut && npm i

# run it 
npm run angel
```

## MPV Controls
If you have mpv installed on your machine you can create clips while it plays in a window.

### Shortcuts
*  CTRL + Q | Sets start time 
*  CTRL + W | Sets duration from start time
*  CTRL + E | Creates clip with current settings 

## Things to Note about Windows
* MPV functionality requires locating the path of mpv.exe before playing a file. 
* External subtitle files may not be recognized

## Subtitles
Subrip and picture based subtitle streams will be extracted from the video file and search the directory for external subtitle files. Picture based subtitles will be scaled along with the video.

## Codecs & Containers
MP4, MKV, MOV
| Container | Video Codec                 | Audio Codec |
| ---       |---                          | ---         |
| MP4       | x264                        | aac         |
| MKV       | x264                        | aac         |
| MOV       | x264                        | aac         |
| GIF       | palettegen from x264        | n/a         |
| WEBM      | libvpx                      | libvorbis   |
