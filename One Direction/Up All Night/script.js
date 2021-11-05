
console.log('Welcome to Spotify');

//Initialise the variables
let CurrentSongIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let songNumber1 = Array.from(document.getElementsByClassName('songNumber1'));
let myVolumeBar = document.getElementById('myVolumeBar');
let volumeIcon = document.getElementById('volumeIcon');


let songs = [
    {songName: "Up All Night", filePath: "Songs/1.mp3", duration: "03:14", number: "1"},
    {songName: "What Makes You Beautiful", filePath: "Songs/2.mp3", duration: "03:21", number: "2"},
    {songName: "More Than This", filePath: "Songs/3.mp3", duration: "03:49", number: "3"},
    {songName: "Stole My Heart", filePath: "Songs/4.mp3", duration: "03:23", number: "4"},
    {songName: "I Wish", filePath: "Songs/5.mp3", duration: "03:36", number: "5"},
    {songName: "Save You Tonight", filePath: "Songs/6.mp3", duration: "03:24", number: "6"},
    {songName: "I Want", filePath: "Songs/7.mp3", duration: "02:51", number: "7"},
    {songName: "Gotta Be You", filePath: "Songs/8.mp3", duration: "04:01", number: "8"}
]

songItems.forEach((element, i) => { 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName + ' - One Direction';
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
    element.getElementsByClassName("songNumber")[0].innerText = songs[i].number;    
})

// Add GIF When Song Is Playing

audioElement.addEventListener('playing', () => {
    document.getElementsByClassName('songNumber1')[CurrentSongIndex].innerHTML = `
    <img src='./Images/playing.gif' 
    style='width: 44px; margin-left: -1vw'>
    `;
})
    
audioElement.addEventListener('pause', () => {
    document.getElementsByClassName('songNumber1')[CurrentSongIndex].innerHTML = `${CurrentSongIndex+1}`;
})

// Functions

const masterPlayFunc = () => {
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
}

const makeAllPlays = () => {
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

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

const autoPlay =  () => {
    nextFunc();
}

const nextFunc = () => {
    if (CurrentSongIndex >= 7) {
        CurrentSongIndex = 0
    } else {
        CurrentSongIndex ++
    }
    audioElement.src = `Songs/${CurrentSongIndex+1}.mp3`;
    masterSongName.innerText = songs[CurrentSongIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    playAdd();
}

const previousFunc = () => {
    if(CurrentSongIndex <= 0) {
        CurrentSongIndex = 7
    } else {
        CurrentSongIndex --
    }
    audioElement.src = `Songs/${CurrentSongIndex+1}.mp3`;
    masterSongName.innerText = songs[CurrentSongIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    playAdd();
}

// Calling and Implementing All Functions

masterPlay.addEventListener('click', () => {
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

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        CurrentSongIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Songs/${CurrentSongIndex+1}.mp3`;
        masterSongName.innerText = songs[CurrentSongIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

audioElement.addEventListener('playing', () => {
    pauseAdd();
})

audioElement.onended = (event) => {
    autoPlay();
}

next.addEventListener('click', () => {
    nextFunc();
})

document.addEventListener('keyup', (event) => {
    if (event.key === 'l') {
            document.getElementsByClassName('songNumber1')[CurrentSongIndex].innerHTML = `${CurrentSongIndex+1}`;
            nextFunc();
        }
    })
    
previous.addEventListener('click', () => {
    previousFunc();
})

document.addEventListener('keyup', (event) => {
    if (event.key === 'j') {
        document.getElementsByClassName('songNumber1')[CurrentSongIndex].innerHTML = `${CurrentSongIndex+1}`;
        previousFunc();
    }
})

// Progress Bar Updates

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

// Volume

myVolumeBar.addEventListener('mousemove', () => {
    audioElement.volume = myVolumeBar.value / 100
    if (myVolumeBar.value < 30) {
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.remove('fa-volume-up-1');
        volumeIcon.classList.add('fa-no-volume');
    } else if (myVolumeBar.value < 60 && myVolumeBar.value > 30) {
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.remove('fa-no-volume');
        volumeIcon.classList.add('fa-volume-up-1');
    } else if (myVolumeBar.value > 60) {
        volumeIcon.classList.remove('fa-no-volume');
        volumeIcon.classList.remove('fa-volume-up-1');
        volumeIcon.classList.add('fa-volume-up');
    }
})

volumeIcon.addEventListener('click', () => {
    if (myVolumeBar.value == 0) {
        myVolumeBar.value = 100;
        volumeIcon.classList.remove('fa-no-volume');
        volumeIcon.classList.add('fa-volume-up');
        audioElement.volume = 1;
    } else {
        myVolumeBar.value = 0;
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-no-volume');
        audioElement.volume = 0;
    }
})

