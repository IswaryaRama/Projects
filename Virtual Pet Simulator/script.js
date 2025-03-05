// DOM Elements
const petImage = document.getElementById('pet-image');
const hungerBar = document.getElementById('hunger-bar');
const happinessBar = document.getElementById('happiness-bar');
const energyBar = document.getElementById('energy-bar');
const feedButton = document.getElementById('feed-button');
const playButton = document.getElementById('play-button');
const sleepButton = document.getElementById('sleep-button');
const petTypeSelect = document.getElementById('pet-type');
const achievementsList = document.getElementById('achievements-list');
const timeOfDayElement = document.getElementById('time-of-day');

// Pet Attributes
let hunger = 0; // Start with 0 hunger (pet is full)
let happiness = 100;
let energy = 100;
let feedCount = 0;
let isDay = true;
let currentPetType = 'cat';

// Update Status Bars
function updateStatus() {
    hungerBar.style.width = `${hunger}%`; 
    happinessBar.style.width = `${happiness}%`;
    energyBar.style.width = `${energy}%`;

    // Update Pet Image Based on Status
    if (hunger >= 70 || happiness <= 30) {
        petImage.src = `assets/${currentPetType}-sad.png`;
    } else if (energy <= 30) {
        petImage.src = `assets/${currentPetType}-sleeping.png`;
    } else {
        petImage.src = `assets/${currentPetType}-happy.png`;
    }
}

// Interaction Functions
feedButton.addEventListener('click', () => {
    hunger = Math.max(hunger - 20, 0); // Decrease hunger (pet becomes less hungry)
    energy = Math.max(energy - 10, 0);
    feedCount++;
    checkAchievements();
    updateStatus();
});

playButton.addEventListener('click', () => {
    happiness = Math.min(happiness + 20, 100);
    energy = Math.max(energy - 10, 0);
    updateStatus();
});

sleepButton.addEventListener('click', () => {
    energy = Math.min(energy + 30, 100);
    hunger = Math.min(hunger + 10, 100); // Increase hunger slightly while sleeping
    happiness = Math.max(happiness - 10, 0);
    updateStatus();
});

// Change Pet Type
petTypeSelect.addEventListener('change', () => {
    currentPetType = petTypeSelect.value;
    updateStatus();
});

// Day-Night Cycle
function toggleDayNight() {
    isDay = !isDay;
    document.body.classList.toggle('day', isDay);
    document.body.classList.toggle('night', !isDay);
    timeOfDayElement.textContent = isDay ? 'Day' : 'Night';

    // Pet sleeps at night
    if (!isDay) {
        petImage.src = `assets/${currentPetType}-sleeping.png`;
    } else {
        updateStatus();
    }
}

// Toggle day/night every 10 seconds
setInterval(toggleDayNight, 10000);

// Achievements
function checkAchievements() {
    if (feedCount === 10) {
        const achievement = document.createElement('li');
        achievement.textContent = 'Master Feeder: Fed the pet 10 times!';
        achievementsList.appendChild(achievement);
    }
}

// Game Loop (Decrease Attributes Over Time)
setInterval(() => {
    hunger = Math.min(hunger + 1, 100); // Increase hunger over time
    happiness = Math.max(happiness - 1, 0);
    energy = Math.max(energy - 1, 0);
    updateStatus();
}, 2000);

// Initial Status Update
updateStatus();
