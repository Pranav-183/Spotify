
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
    {songName: "Rock Me - One Direction", filePath: "./Songs/1.mp3", coverPath: "Covers/1.jpg", duration: "03:19"},
    {songName: "C'mon C'mon - One Direction", filePath: "./Songs/2.mp3", coverPath: "Covers/2.jpg", duration: "02:44"},
    {songName: "I Would - One Direction", filePath: "./Songs/3.mp3", coverPath: "Covers/3.jpg", duration: "03:20"},
    {songName: "Kiss You - One Direction", filePath: "./Songs/4.mp3", coverPath: "Covers/4.jpg", duration: "03:06"},
    {songName: "Back For You - One Direction", filePath: "./Songs/5.mp3", coverPath: "Covers/5.jpg", duration: "02:58"},
    {songName: "Live While We're Young - One Direction", filePath: "./Songs/6.mp3", coverPath: "Covers/6.jpg", duration: "03:20"},
    {songName: "She's Not Afraid - One Direction", filePath: "./Songs/7.mp3", coverPath: "Covers/7.jpg", duration: "03:12"},
    {songName: "Heart Attack - One Direction", filePath: "./Songs/8.mp3", coverPath: "Covers/8.jpg", duration: "03:00"},
    {songName: "They Dont Know About Us - One Direction", filePath: "./Songs/9.mp3", coverPath: "Covers/9.jpg", duration: "03:20"},
    {songName: "Summer Love - One Direction", filePath: "./Songs/10.mp3", coverPath: "Covers/10.jpg", duration: "03:27"}
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
