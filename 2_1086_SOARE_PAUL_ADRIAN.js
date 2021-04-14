//declarari
var listOfVideosURLs = ["media/vid1.mp4", "media/vid2.mp4", "media/vid3.mp4", "media/vid4.mp4"];
var canvas, context, W, H, video, vid2, vid3, vid4;
let currentVid = 0;
let afisareControale = true;
let h = 40;
let progressbar = 10;
let mx = 0,
	my = 0;
let videoOnPause = false;
let videoOnMute = false;
let previewVideoBool;

//functie pt video precedent
function previousVideo() {
	currentVid--;
	if (currentVid < 0) {
		currentVid = listOfVideosURLs.length - 1;
		video.src = listOfVideosURLs[currentVid];
	} else {
		video.src = listOfVideosURLs[currentVid];
	}
	previewVideo.src = video.src;
}
//functie pt video urmator
function nextVideo() {
	currentVid++;
	if (currentVid < listOfVideosURLs.length) {
		video.src = listOfVideosURLs[currentVid];
	} else {
		currentVid = 0;
		video.src = listOfVideosURLs[currentVid];
	}
	previewVideo.src = video.src;
}
//functie pentru a arata durata videoului + cat timp a parcurs  + formatat putin textul de exp daca videoul are 9 secunde apare 09
function videoDuration() {
	context.fillStyle = "rgb(238, 238, 238)";
	context.font = "10pt Arial  ";
	context.textBaseline = "middle";
	context.textAlign = "left";
	let seconds = Math.floor(video.currentTime % 60);
	let minutes = Math.floor(video.currentTime / 60);
	let minutesRemaining = Math.floor(video.duration / 60);
	let secondsRemaining = Math.floor(video.duration - minutesRemaining * 60);

	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (minutesRemaining < 10) {
		minutesRemaining = "0" + minutesRemaining;
	}
	if (secondsRemaining < 10) {
		secondsRemaining = "0" + secondsRemaining;
	}

	context.fillText(minutes + ":" + seconds + " / " + minutesRemaining + ":" + secondsRemaining, 0 + 175, H - (h - progressbar) / 2 + 1);
}

//bara de progres
function progressBarVideo() {
	context.fillStyle = "rgba(0, 0, 0, 0.2)";
	context.fillRect(0, H - h, W, progressbar);
	context.fillStyle = "rgba(238, 238, 238, 1)";
	let w = video.duration ? (video.currentTime * W) / video.duration : 0;
	context.fillRect(0, H - h, w, progressbar);
	context.fillStyle = "rgba(0, 173, 181, 1)";
	context.fillRect(0 - 5, H - h, w, progressbar);
}
//bara de jos neagra inaltime H-h
function videoBar() {
	context.fillStyle = "rgba(0, 0, 0, 0.2)";
	context.fillRect(0, H - h, W, h);
}
//controalele din bara neagra
function multimediaControls() {
	context.font = "15pt Arial";
	context.fillStyle = "rgb(238, 238, 238)";
	context.textAlign = "left";
	context.textBaseline = "middle";

	context.fillText(String.fromCodePoint(8920), 5 + 35, H - (h - progressbar) / 2);
	context.fillText(String.fromCodePoint(8921), 5 + 100, H - (h - progressbar) / 2);
	context.font = "bold 10pt Arial";
	context.fillText("|" + String.fromCodePoint(11207), 5 + 7, H - (h - progressbar) / 2); // stanga
	context.fillText(String.fromCodePoint(11208) + "|", 5 + 140, H - (h - progressbar) / 2); //dreapta
	//schimbari de iconite
	//pauza
	if (videoOnPause) {
		context.font = "15pt Arial";
		context.fillText(String.fromCodePoint(9205), 5 + 70, H - (h - progressbar) / 2);
	} else {
		context.font = "bold 10pt Arial";
		context.fillText("||", 5 + 70 + 5, H - (h - progressbar) / 2);
	}

	context.fillStyle = "rgb(238, 238, 238)";
	context.font = "15pt Arial";
	context.textBaseline = "middle";
	context.textAlign = "right";
	//mute/unmute
	if (videoOnMute || video.volume === 0) {
		context.fillText(String.fromCodePoint(128360), W - 5, H - (h - progressbar) / 2);
	} else if (video.volume < 0.5) {
		context.fillText(String.fromCodePoint(128361), W - 5, H - (h - progressbar) / 2);
	} else {
		context.fillText(String.fromCodePoint(128362), W - 5, H - (h - progressbar) / 2);
	}
	// bara de volum
	context.fillStyle = "rgba(230, 230, 230, 0.3)";
	context.fillRect(W - 130, H - (h - progressbar) / 2 - 3, 100, 5); //pt bara din spate
	context.fillStyle = "rgba(230, 230, 230, 1)"; //pt bara din fata
	let vol = video.volume * 100;
	context.fillRect(W - 130, H - (h - progressbar) / 2 - 3, vol, 5);
}
//efecte
//IMPORTANT: nu merg pe local ci doar pe server. atunci cand am facut proiectul rulam pe live server si mergea..cand am rulat pe local
//nu au mers din motive de securitate al browserului cred
function effects() {
	let imageData = context.getImageData(0, 0, W, H);
	let v = imageData.data;

	//verifica daca butonul este apasat
	if (efect1Bool) {
		sepia();
	}
	if (efect2Bool) {
		intensifyColors();
	}
	if (efect3Bool) {
		fuzzyEffect();
	}
	if (efect4Bool) {
		partyEffect();
	}

	function partyEffect() {
		let r = Math.floor(Math.random() * Math.floor(255));
		let g = Math.floor(Math.random() * Math.floor(255));
		let b = Math.floor(Math.random() * Math.floor(255));

		for (let i = 0; i < v.length; i += 4) {
			v[i + 0] = v[i + 0] + r;
			v[i + 1] = v[i + 1] + g;
			v[i + 2] = v[i + 2] + b;
		}
	}

	function fuzzyEffect() {
		for (let i = 0; i < v.length; i += 4) {
			let r = Math.floor(Math.random() * Math.floor(255));
			let g = Math.floor(Math.random() * Math.floor(255));
			let b = Math.floor(Math.random() * Math.floor(255));

			v[i + 0] = v[i + 0] + r;
			v[i + 1] = v[i + 1] + g;
			v[i + 2] = v[i + 2] + b;
		}
	}

	function intensifyColors() {
		for (let i = 0; i < v.length; i += 4) {
			v[i + 0] = v[i + 0] * 2;
			v[i + 1] = v[i + 1] * 2;
			v[i + 2] = v[i + 2] * 2;
		}
	}

	function sepia() {
		for (let i = 0; i < v.length; i += 4) {
			v[i + 0] = v[i + 0] + 112;
			v[i + 1] = v[i + 1] + 66;
			v[i + 2] = v[i + 2] + 20;
		}
	}

	context.putImageData(imageData, 0, 0);
}
//functia de desenare
function desenare() {
	context.drawImage(video, 0, 0);

	//accesare filtre (depinde de browser sau modu de rulare server/local)
	try {
		effects();
	} catch (err) {}

	//afiseaza controale
	if (afisareControale) {
		videoBar();
		progressBarVideo();
		videoDuration();
		multimediaControls();

		if (previewVideoBool) {
			try {
				previewVideo.currentTime = (mx * video.duration) / W;
			} catch (err) {}

			//ca sa se vada si daca mx e in margini
			if (mx < 75) {
				context.drawImage(previewVideo, 5, H - 140, W / 4, H / 4);
			} else if (mx > 565) {
				context.drawImage(previewVideo, W - 165, H - 140, W / 4, H / 4);
			} else {
				context.drawImage(previewVideo, mx - W / 4 / 2, H - 140, W / 4, H / 4);
			}
		}
	}

	//autoplay-ul
	if (video.ended) {
		nextVideo();
	}

	//playlist
	let lista = document.querySelector("ul");
	lista.innerHTML = "";
	for (let i = 0; i < listOfVideosURLs.length; i++) {
		let element = document.createElement("li");
		let deleteBtn = document.createElement("button");
		let moveUpBtn = document.createElement("button");
		let moveDownBtn = document.createElement("button");
		element.className = "list-element-name";

		//clase pt design - bootstrap
		deleteBtn.className = "btn btn-light mr-2";
		moveUpBtn.className = "btn btn-light mr-2";
		moveDownBtn.className = "btn btn-light mr-2";
		element.innerText = listOfVideosURLs[i];
		if (i == currentVid) {
			element.style.fontWeight = "bold";
		}

		element.dataset.index = i.toString();
		//eveniment de click pt a se duce la video

		element.addEventListener("mousedown", (e) => {
			currentVid = parseInt(e.target.dataset.index);
			video.src = listOfVideosURLs[currentVid];
			video.load();
			video.play();
			previewVideo.src = video.src;
		});

		//delete/moveup/movedown button
		deleteBtn.textContent = "Delete";
		moveUpBtn.textContent = "Move Up";
		moveDownBtn.textContent = "Move Down";

		//muta elementele in playlist prin functia moveInPlaylist()
		moveUpBtn.addEventListener("mousedown", (e) => {
			if (i === 0) {
				moveInPlaylist(listOfVideosURLs, i, listOfVideosURLs.length - 1);
			} else {
				moveInPlaylist(listOfVideosURLs, i, i - 1);
			}
		});
		moveDownBtn.addEventListener("mousedown", (e) => {
			if (i === listOfVideosURLs.length - 1) {
				moveInPlaylist(listOfVideosURLs, i, 0);
			} else {
				moveInPlaylist(listOfVideosURLs, i, i + 1);
			}
		});
		deleteBtn.addEventListener("mousedown", (e) => {
			listOfVideosURLs.splice(i, 1);
		});

		//creare elemente
		lista.append(element);
		lista.append(deleteBtn);
		lista.append(moveDownBtn);
		lista.append(moveUpBtn);
	}

	//salveaza setarile cu ajutorul Web Storage API - salveaza current time volume si indexul videoului
	localStorage.videoCurrentTime = video.currentTime;
	localStorage.videoVolume = video.volume;
	localStorage.videoIndex = currentVid;
	requestAnimationFrame(desenare);
}

//functie pentru a schimba pozitiile in playlist
function moveInPlaylist(arr, fromIndex, toIndex) {
	var element = arr[fromIndex];
	arr.splice(fromIndex, 1);
	arr.splice(toIndex, 0, element);
}
//creare video principal
var mainVideo = document.createElement("video");
document.body.append(mainVideo);

video = document.querySelector("video");
video.src = listOfVideosURLs[currentVid];

//video pt preview
let preview = document.createElement("video");
document.body.append(preview);
preview.setAttribute("id", "videoPreview");
let previewVideo = document.getElementById("videoPreview");
previewVideo.style.display = "none";
mainVideo.style.display = "none";

//canvas pt video
canvas = document.querySelector("canvas");
context = canvas.getContext("2d");
W = canvas.width;
H = canvas.height;

canvas.addEventListener("mousemove", (e) => {
	mx = e.x - canvas.getBoundingClientRect().x;
	my = e.y - canvas.getBoundingClientRect().y;

	//preview video - doar daca mx,my sunt in progressbarul videoului
	if (my > H - h && my < H - h + progressbar) {
		previewVideoBool = true;
	} else {
		previewVideoBool = false;
	}
});

//drag and drop
canvas.addEventListener("dragover", (e) => {
	e.preventDefault();
});

canvas.addEventListener("drop", (e) => {
	e.preventDefault();
	for (let file of e.dataTransfer.files) {
		listOfVideosURLs.push(URL.createObjectURL(file).toString()); //adauga in lista videourile noi
	}
});

//event pt click pe canvas
canvas.addEventListener("mousedown", (e) => {
	//pt a seta current time in functie de progress bar
	if (my > H - h && my < H - h + progressbar) {
		video.currentTime = (mx * video.duration) / W;
	} else if (my < H - h) {
		//pause/play pe video
		if (video.paused) {
			videoOnPause = false;
			video.play();
		} else {
			videoOnPause = true;
			video.pause();
		}
	}
	//controale multimedia prev/forward video + fast prev/forward + play/stop + volum si bara de volum
	if (my > H - h + progressbar && mx > 10 && mx < 30) {
		console.log(mx, my);
		console.log("Previous video");
		previousVideo();
	} else if (my > H - h + progressbar && mx > 40 && mx < 70) {
		console.log(mx, my);
		video.currentTime = video.currentTime - 5;
		console.log("Fast Backwards");
	} else if (my > H - h + progressbar && mx > 75 && mx < 95) {
		console.log(mx, my);
		console.log("Play/Stop");
		if (video.paused) {
			videoOnPause = false;
			video.play();
		} else {
			videoOnPause = true;
			video.pause();
		}
	} else if (my > H - h + progressbar && mx > 105 && mx < 135) {
		console.log(mx, my);
		video.currentTime = video.currentTime + 5;
		console.log("Fast Forward");
	} else if (my > H - h + progressbar && mx > 145 && mx < 165) {
		console.log(mx, my);
		console.log("Next Video");
		nextVideo();
	} else if (my > H - h + progressbar && mx < W - 5 && mx > W - 20) {
		console.log(mx, my);
		console.log("Muted/Unmuted");
		if (video.muted) {
			video.muted = false;
			videoOnMute = false;
		} else {
			videoOnMute = true;
			video.muted = true;
		}
	} else if (my > H - (h + progressbar) && mx <= W - 30 && mx >= W - 130 && my < H - progressbar && my > H - h / 2) {
		video.volume = (100 - (610 - mx)) / 100;
		console.log(mx, my);
		console.log("Volume changed!");
	}
	console.log("mx:" + mx + "my:" + my);
});
//daca cursorul este pe canvas apar controalele
canvas.addEventListener("mouseenter", (e) => {
	afisareControale = true;
});
//controalele dispar in afara canvasului
canvas.addEventListener("mouseleave", (e) => {
	afisareControale = false;
});

//efecte video
//se activeaza la apasarea butonului
let efect1 = document.getElementById("efect1");
let efect1Bool = false;
efect1.addEventListener("mousedown", (e) => {
	if (efect1Bool) {
		efect1Bool = false;
		efect1.style.backgroundColor = "#f8f9fa";
		efect1.style.borderColor = "#f8f9fa";
	} else {
		efect1Bool = true;
		efect1.style.backgroundColor = "#d9d9d9";
		efect1.style.borderColor = "#d9d9d9";
	}
});

let efect2 = document.getElementById("efect2");
let efect2Bool = false;
efect2.addEventListener("mousedown", (e) => {
	if (efect2Bool) {
		efect2Bool = false;
		efect2.style.backgroundColor = "#f8f9fa";
		efect2.style.borderColor = "#f8f9fa";
	} else {
		efect2Bool = true;
		efect2.style.backgroundColor = "#d9d9d9";
		efect2.style.borderColor = "#d9d9d9";
	}
});

let efect3 = document.getElementById("efect3");
let efect3Bool = false;
efect3.addEventListener("mousedown", (e) => {
	if (efect3Bool) {
		efect3Bool = false;
		efect3.style.backgroundColor = "#f8f9fa";
		efect3.style.borderColor = "#f8f9fa";
	} else {
		efect3Bool = true;
		efect3.style.backgroundColor = "#d9d9d9";
		efect3.style.borderColor = "#d9d9d9";
	}
});

let efect4 = document.getElementById("efect4");
let efect4Bool = false;
efect4.addEventListener("mousedown", (e) => {
	if (efect4Bool) {
		efect4Bool = false;
		efect4.style.backgroundColor = "#f8f9fa";
		efect4.style.borderColor = "#f8f9fa";
	} else {
		efect4Bool = true;
		efect4.style.backgroundColor = "#d9d9d9";
		efect4.style.borderColor = "#d9d9d9";
	}
});

//verifica daca exista inregistrari in local storage (daca aplicatia a mai fost deschisa se salveaza date cu privire la volum index si currenttime)
if (localStorage.videoVolume) {
	video.volume = localStorage.videoVolume;
}
if (localStorage.videoIndex) {
	currentVid = localStorage.videoIndex;
	video.src = listOfVideosURLs[localStorage.videoIndex];
	previewVideo.src = video.src;
} else {
	video.src = listOfVideosURLs[0];
	previewVideo.src = video.src;
}
if (localStorage.videoCurrentTime) {
	video.currentTime = localStorage.videoCurrentTime;
}
video.autoplay = true;

desenare();
