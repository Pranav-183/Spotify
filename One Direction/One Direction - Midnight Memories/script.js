
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
    {songName: "Midnight Memories - One Direction", filePath: "./Songs/1.mp3", coverPath: "Covers/1.jpg", duration: ""},
    {songName: "Best Song Ever - One Direction", filePath: "./Songs/2.mp3", coverPath: "Covers/2.jpg", duration: ""},
    {songName: "Story Of My Life - One Direction", filePath: "./Songs/3.mp3", coverPath: "Covers/3.jpg", duration: ""},
    {songName: "You And I - One Direction", filePath: "./Songs/4.mp3", coverPath: "Covers/4.jpg", duration: ""},
    {songName: "Right Now - One Direction", filePath: "./Songs/5.mp3", coverPath: "Covers/5.jpg", duration: ""},
    {songName: "Happily - One Direction", filePath: "./Songs/6.mp3", coverPath: "Covers/6.jpg", duration: ""},
    {songName: "Diana - One Direction", filePath: "./Songs/7.mp3", coverPath: "Covers/7.jpg", duration: ""},
]

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
})

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

//songItem

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
        audioElement.src = `./Songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

//Autoplay

const autoPlay =  () => {
    if(songIndex >= 9 ) {
        songIndex = 0
    } else {
        songIndex ++
    }
    audioElement.src = `./Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

// audioElement.addEventListener('ended', (event) => {
//     autoPlay();
// })

//OR

audioElement.onended = (event) => {
    autoPlay();
}

//Previous And Next Buttons

document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= 9 ) {
        songIndex = 0
    } else {
        songIndex ++
    }
    audioElement.src = `./Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <=0 ) {
        songIndex = 9
    } else {
        songIndex --
    }
    audioElement.src = `./Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
