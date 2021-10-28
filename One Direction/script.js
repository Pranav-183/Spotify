
console.log('Welcome to Spotify');

//Initialise the variables
let songIndex = 0;
let audioElement = new Audio('./Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Up All Night - One Direction", filePath: "./songs/1.mp3", coverPath: "Covers/1.jpg", duration: "03:14"},
    {songName: "What Makes You Beautiful - One Direction", filePath: "./songs/2.mp3", coverPath: "Covers/2.jpg", duration: "03:21"},
    {songName: "More Than This - One Direction", filePath: "./songs/3.mp3", coverPath: "Covers/3.jpg", duration: "03:49"},
    {songName: "Stole My Heart - One Direction", filePath: "./songs/4.mp3", coverPath: "Covers/4.jpg", duration: "03:23"},
    {songName: "I Wish - One Direction", filePath: "./songs/5.mp3", coverPath: "Covers/5.jpg", duration: "03:36"},
    {songName: "Save You Tonight - One Direction", filePath: "./songs/6.mp3", coverPath: "Covers/6.jpg", duration: "03:24"},
    {songName: "I Want - One Direction", filePath: "./songs/8.mp3", coverPath: "Covers/7.jpg", duration: "02:51"},
    {songName: "Gotta Be You - One Direction", filePath: "./songs/7.mp3", coverPath: "Covers/8.jpg", duration: "04:01"}
]

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
})

//audioElement.play();

//Handle Play/Pause Click and Spacebar
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        if(audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;

        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

const autoPlay =  () => {
    if(songIndex >= 7 ) {
        songIndex = 0
    } else {
        songIndex ++
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

//audioElement.addEventListener('ended', (event) => {
//   autoPlay();
//})

//OR

audioElement.onended = (event) => {
    autoPlay();
}

document.getElementById('next').addEventListener('click', () => {
    if(songIndex >=7 ) {
        songIndex = 0
    } else {
        songIndex ++
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <=0 ) {
        songIndex = 7
    } else {
        songIndex --
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
