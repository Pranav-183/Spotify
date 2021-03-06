console.log('Welcome to Spotify');

//Initialise the variables
let CurrentSongIndex = 0;
let audioElement = new Audio('./Songs/1.mp3');
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
    {songName: "Night Changes", filePath: "./Songs/1.mp3", coverPath: "Covers/1.jpg", duration: "04:00", number: "1"},
    {songName: "Steal My Girl", filePath: "./Songs/2.mp3", coverPath: "Covers/2.jpg", duration: "03:48", number: "2"},
    {songName: "18", filePath: "./Songs/3.mp3", coverPath: "Covers/3.jpg", duration: "04:08", number: "3"},
    {songName: "Ready To Run", filePath: "./Songs/4.mp3", coverPath: "Covers/4.jpg", duration: "03:16", number: "4"},
    {songName: "No Control", filePath: "./Songs/5.mp3", coverPath: "Covers/5.jpg", duration: "03:19", number: "5"},
    {songName: "Once In A Lifetime", filePath: "./Songs/6.mp3", coverPath: "Covers/6.jpg", duration: "02:38", number: "6"},
    {songName: "Stockholm Syndrome", filePath: "./Songs/7.mp3", coverPath: "Covers/7.jpg", duration: "03:34", number: "7"},
    {songName: "Where Do Broken Hearts Go", filePath: "./Songs/8.mp3", coverPath: "Covers/8.jpg", duration: "03:49", number: "8"},
    {songName: "Act My Age", filePath: "./Songs/9.mp3", coverPath: "Covers/9.jpg", duration: "03:18", number: "9"}
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
    if (CurrentSongIndex >= 8) {
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
        CurrentSongIndex = 8
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

