// DOM Elements
const audio = document.getElementById('audio'); // Audio element
const playPauseButton = document.getElementById('play-pause'); // Play/Pause button
const progress = document.getElementById('progress'); // Progress bar
const volume = document.getElementById('volume'); // Volume slider
const playlist = document.getElementById('playlist'); // Playlist container
const songTitle = document.getElementById('song-title'); // Song title element
const artist = document.getElementById('artist'); // Artist element
const album = document.getElementById('album'); // Album element
const volumeLabel = document.getElementById('volume-label'); // Volume label

// Playlist Data
const songs = [
    { title: 'The Chainsmokers - All We Know', artist: 'Artist-Phoebe Ryan', album: 'Album 1', src: 'audio/The Chainsmokers - All We Know.mp3' },
    { title: 'Ed Sheeran - Shape of You', artist: 'Artist-Ed Sheeran', album: 'Album 2', src: 'audio/Ed Sheeran - Shape of You .mp3' },
    { title: 'Sia - Cheap Thrills', artist: 'Artist-Sean Paul', album: 'Album 3', src: 'audio/Sia - Cheap Thrills.mp3' }
];

let currentSongIndex = 0; // Track the current song index

// Load Playlist
function loadPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li'); // Create a new list item
        li.textContent = `${song.title} - ${song.artist}`; // Set the text content
        li.addEventListener('click', () => loadSong(index)); // Add click event to load the song
        playlist.appendChild(li); // Add the list item to the playlist
    });
}

// Load a Song
function loadSong(index) {
    currentSongIndex = index; // Update the current song index
    const song = songs[index]; // Get the song object
    audio.src = song.src; // Set the audio source
    songTitle.textContent = song.title; // Update the song title
    artist.textContent = song.artist; // Update the artist
    album.textContent = song.album; // Update the album
    audio.pause(); // Play the song
    playPauseButton.textContent = 'Play'; // Update the button text
}

// Play/Pause Functionality
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play(); // Play the audio
        playPauseButton.textContent = 'Pause'; // Update button text
    } else {
        audio.pause(); // Pause the audio
        playPauseButton.textContent = 'Play'; // Update button text
    }
});

// Update Progress Bar
audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100; // Update progress bar
});

// Seek Functionality
progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration; // Seek to the selected time
});

// Volume Control
volume.addEventListener('input', () => {
    audio.volume = volume.value; // Update the volume
    volumeLabel.textContent = `${Math.round(volume.value * 100)}%`; // Update the volume label
});

// Load the First Song Initially
loadPlaylist(); // Load the playlist
loadSong(0); // Load the first song
