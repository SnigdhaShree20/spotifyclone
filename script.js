console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio();
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItemplay'));
let songinfo = document.querySelector('.songinfo'); // Select the .songinfo element

let songs = [
    { songname: "Lover", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songname: "Midnight Rain", filepath: "songs/2.mp3", coverpath:  "covers/2.jpg" },
    { songname: "August", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songname: "You Belong With Me", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songname: "Blank Space", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
    // Add other songs here
];

// Set the source of the audio element to the first song
audioElement.src = songs[songIndex].filepath;

// Function to play the selected song
function playSong(index) {
    audioElement.src = songs[index].filepath;
    audioElement.play();
    songinfo.textContent = songs[index].songname;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
}

// Handle play/pause click for the master play button
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
    }
});

// Listen to time update events
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset other play buttons when one is clicked
const makeAllPlays = () => {
    songItems.forEach(element => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Toggle play/pause icons for individual song items
songItems.forEach((element, index) => {
    element.addEventListener('click', () => {
        makeAllPlays();
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
        // Play the clicked song
        playSong(index);
    });
});
