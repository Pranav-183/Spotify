
console.log('Welcome to Spotify');

//Initialise the variables
let CurrentSongIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let masterSongImage = document.getElementById('masterSongImage');
let masterSongArtist = document.getElementById('masterSongArtist');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let songNumber1 = Array.from(document.getElementsByClassName('songNumber1'));
let myVolumeBar = document.getElementById('myVolumeBar');
let volumeIcon = document.getElementById('volumeIcon');

let songs = [
    {songName: "Blinding Lights", artistName: "The Weeknd", songAlbum: "After Hours", songAlbumHref: "", filePath: "./songs/1.mp3", coverPath: "./covers/1.jpg", duration: "03:19", number: "1"},
    {songName: "Someday", artistName: "One Republic", songAlbum: "Human", songAlbumHref: "", filePath: "./songs/2.mp3", coverPath: "./covers/2.jpg", duration: "03:07", number: "2"},
    {songName: "Deserve You", artistName: "Justin Bieber", songAlbum: "Justice", songAlbumHref: "", filePath: "./songs/3.mp3", coverPath: "./covers/3.jpg", duration: "03:07", number: "3"},
    {songName: "Night Changes", artistName: "One Direction", songAlbum: "Four", songAlbumHref: "", filePath: "./songs/4.mp3", coverPath: "./covers/4.jpg", duration: "04:00", number: "4"},
    {songName: "Everywhere", artistName: "Niall Horan", songAlbum: "Heartbreak Weather", songAlbumHref: "", filePath: "./songs/5.mp3", coverPath: "./covers/5.jpg", duration: "02:48", number: "5"},
    {songName: "What Makes You Beautiful", artistName: "One Direction", songAlbum: "Up All Night", songAlbumHref: "", filePath: "./songs/6.mp3", coverPath: "./covers/6.jpg", duration: "03:21", number: "6"},
    {songName: "Rock Me", artistName: "One Direction", songAlbum: "Take Me Home", songAlbumHref: "", filePath: "./songs/7.mp3", coverPath: "./covers/7.jpg", duration: "03:19", number: "7"},
    {songName: "The Nights", artistName: "Avicii", songAlbum: "The Days / Nights", songAlbumHref: "", filePath: "./songs/8.mp3", coverPath: "./covers/8.jpg", duration: "02:56", number: "8"},
    {songName: "Always You", artistName: "Louis Tomlinson", songAlbum: "Walls", songAlbumHref: "", filePath: "./songs/9.mp3", coverPath: "./covers/9.jpg", duration: "03:07", number: "9"},
    {songName: "Story Of My Life", artistName: "One Direction", songAlbum: "Midnight Memories", songAlbumHref: "", filePath: "./songs/10.mp3", coverPath: "./covers/10.jpg", duration: "04:05", number: "10"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName + ' - ' + songs[i].artistName;
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
    element.getElementsByClassName("songNumber")[0].innerText = songs[i].number;
    element.getElementsByClassName("songAlbum")[0].innerHTML = `<a href="">${songs[i].songAlbum}</a>`;
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
    if (CurrentSongIndex >= 9) {
        CurrentSongIndex = 0
    } else {
        CurrentSongIndex ++
    }
    audioElement.src = `songs/${CurrentSongIndex+1}.mp3`;
    masterSongName.innerText = songs[CurrentSongIndex].songName;
    masterSongImage.innerHTML = `<img src="./covers/${CurrentSongIndex+1}.jpg">`;
    masterSongArtist.innerText = songs[CurrentSongIndex].artistName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    playAdd();
}

const previousFunc = () => {
    if(CurrentSongIndex <= 0) {
        CurrentSongIndex = 9
    } else {
        CurrentSongIndex --
    }
    audioElement.src = `songs/${CurrentSongIndex+1}.mp3`;
    masterSongName.innerText = songs[CurrentSongIndex].songName;
    masterSongImage.innerHTML = `<img src="./covers/${CurrentSongIndex+1}.jpg">`;
    masterSongArtist.innerText = songs[CurrentSongIndex].artistName;
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