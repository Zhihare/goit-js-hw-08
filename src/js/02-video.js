
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOKAL_KEY = "videoplayer-current-time";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);


player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
	const playTime = data.seconds
	// console.log(playTime);

	localStorage.setItem(LOKAL_KEY, JSON.stringify(playTime));
}

const reboot = document.addEventListener("DOMContentLoaded", rebootFunc);

function rebootFunc() {

	const loadCurTime = localStorage.getItem(LOKAL_KEY);

	player.setCurrentTime(JSON.parse(loadCurTime)).then(function (seconds) {
		// seconds = the actual time that the player seeked to
	}).catch(function (error) {
		switch (error.name) {
			case 'RangeError':
				// the time was less than 0 or greater than the video’s duration
				break;

			default:
				// some other error occurred
				break;
		}
	});
}
