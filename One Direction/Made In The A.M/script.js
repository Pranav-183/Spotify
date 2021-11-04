
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
let songNumber1 = Array.from(document.getElementsByClassName('songNumber1'));
let myVolumeBar = document.getElementById('myVolumeBar');
let volumeIcon = document.getElementById('volumeIcon');


let songs = [
    {songName: "A.M.", filePath: "./Songs/1.mp3", coverPath: "Covers/1.jpg", duration: "03:28", number: "1"},
    {songName: "Drag Me Down", filePath: "./Songs/2.mp3", coverPath: "Covers/2.jpg", duration: "03:12", number: "2"},
    {songName: "End Of The Day", filePath: "./Songs/3.mp3", coverPath: "Covers/3.jpg", duration: "03:14", number: "3"},
    {songName: "Infinity", filePath: "./Songs/4.mp3", coverPath: "Covers/4.jpg", duration: "04:09", number: "4"},
    {songName: "Perfect", filePath: "./Songs/5.mp3", coverPath: "Covers/5.jpg", duration: "03:50", number: "5"},
    {songName: "If I Could Fly", filePath: "./Songs/6.mp3", coverPath: "Covers/6.jpg", duration: "03:50", number: "6"},
    {songName: "Hey Angel", filePath: "./Songs/7.mp3", coverPath: "Covers/7.jpg", duration: "04:00", number: "7"},
    {songName: "I Want To Write You A Song", filePath: "./Songs/8.mp3", coverPath: "Covers/8.jpg", duration: "02:59", number: "8"},
    {songName: "Walking In The Wind", filePath: "./Songs/9.mp3", coverPath: "Covers/9.jpg", duration: "03:22", number: "9"},
    {songName: "History", filePath: "./Songs/10.mp3", coverPath: "Covers/10.jpg", duration: "03:07", number: "10"},
    {songName: "Olivia", filePath: "./Songs/11.mp3", coverPath: "Covers/11.jpg", duration: "02:58", number: "11"},
    {songName: "Temporary Fix", filePath: "./Songs/12.mp3", coverPath: "Covers/12.jpg", duration: "02:55", number: "12"},
    {songName: "Long Way Down", filePath: "./Songs/13.mp3", coverPath: "Covers/13.jpg", duration: "03:12", number: "13"},
    {songName: "Never Enough", filePath: "./Songs/14.mp3", coverPath: "Covers/14.jpg", duration: "03:33", number: "14"}
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
    if (CurrentSongIndex >= 13) {
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

const previousFunc = () => {
    if(CurrentSongIndex <= 0) {
        CurrentSongIndex = 13
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
        audioElement.src = `songs/${CurrentSongIndex+1}.mp3`;
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

