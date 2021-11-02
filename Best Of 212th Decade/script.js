
console.log('Welcome to Spotify');

//Initialise the variables
let CurrentSongIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let next = document.getElementById('next');
let previous = document.getElementById('previous');

let songs = [
    {songName: "Blinding Lights - The Weeknd", filePath: "./songs/1.mp3", coverPath: "./covers/1.jpg", duration: "03:19"},
    {songName: "Someday - One Republic", filePath: "./songs/2.mp3", coverPath: "./covers/2.jpg", duration: "03:07"},
    {songName: "Deserve You - Justin Bieber", filePath: "./songs/3.mp3", coverPath: "./covers/3.jpg", duration: "03:07"},
    {songName: "Night Changes - One Direction", filePath: "./songs/4.mp3", coverPath: "./covers/4.jpg", duration: "04:00"},
    {songName: "Everywhere - Niall Horan", filePath: "./songs/5.mp3", coverPath: "./covers/5.jpg", duration: "02:48"},
    {songName: "What Makes You Beautiful - One Direction", filePath: "./songs/6.mp3", coverPath: "./covers/6.jpg", duration: "03:21"},
    {songName: "Rock Me- One Direction", filePath: "./songs/7.mp3", coverPath: "./covers/7.jpg", duration: "03:19"},
    {songName: "The Nights - Avicii", filePath: "./songs/8.mp3", coverPath: "./covers/8.jpg", duration: "02:56"},
    {songName: "Always You - Louis Tomlinson", filePath: "./songs/9.mp3", coverPath: "./covers/9.jpg", duration: "03:07"},
    {songName: "Story Of My Life - One Direction", filePath: "./songs/10.mp3", coverPath: "./covers/10.jpg", duration: "04:05"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
})

audioElement.play();

//Handle Play/Pause Click
const masterPlayFunc = () => {
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
}

document.addEventListener('click', () => {
    masterPlayFunc();
})

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
       masterPlayFunc();
    }
})

document.addEventListener('keyup', (event) => {
    if (event.key === 'k') {
        masterPlayFunc();
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

//songItems
const makeAllPlays = () => {
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        CurrentSongIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${CurrentSongIndex+1}.mp3`;
        masterSongName.innerText = songs[CurrentSongIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// Change songItem Icons

const playAdd = () => {
    for (let index = 0; index < songs.length; index++) {
        if (index !== CurrentSongIndex) {
            document.getElementById(index).classList.remove('fa-pause-circle');
            document.getElementById(index).classList.add('fa-play-circle');
        }
    }
}

const pauseAdd = () => {
    document.getElementById(`${CurrentSongIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${CurrentSongIndex}`).classList.add('fa-pause-circle');
}

audioElement.addEventListener('playing', () => {
    pauseAdd();
})

//Autoplay

const autoPlay =  () => {
    if(CurrentSongIndex >= 7 ) {
        CurrentSongIndex = 0
    } else {
        CurrentSongIndex ++
    }
    audioElement.src = `./Songs/${CurrentSongIndex+1}.mp3`;
    masterSongName.innerText = songs[CurrentSongIndex].songName;
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

// Next Button

const nextFunc = () => {
    if (CurrentSongIndex >= 9) {
        CurrentSongIndex = 0
    } else {
        CurrentSongIndex ++
    }
    audioElement.src = `songs/${CurrentSongIndex+1}.mp3`;
    masterSongName.innerText = songs[CurrentSongIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    playAdd();
}

next.addEventListener('click', () => {
    nextFunc();
})

document.addEventListener('keyup', (event) => {
     if (event.key === 'l') {
            nextFunc();
        }
})

// Previous Button

const previousFunc = () => {
    if(CurrentSongIndex <= 0) {
        CurrentSongIndex = 9
    } else {
        CurrentSongIndex --
    }
    audioElement.src = `songs/${CurrentSongIndex+1}.mp3`;
    masterSongName.innerText = songs[CurrentSongIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    playAdd();
}

previous.addEventListener('click', () => {
    previousFunc();
})

document.addEventListener('keyup', (event) => {
    if (event.key === 'j') {
        previousFunc();
    }
})