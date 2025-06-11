// Sections
let startSection = document.querySelector('#start');
let hauntedHallSection = document.querySelector('#hauntedHall');
let mirrorMazeSection = document.querySelector('#mirrorMaze');
let candyGardenSection = document.querySelector('#candyGarden');
let dragonLairSection = document.querySelector('#dragonLair');
let freedomEndSection = document.querySelector('#freedomEnd');
let treasureEndSection = document.querySelector('#treasureEnd');
let failEndSection = document.querySelector('#failEnd');

// Buttons
let startBtn = document.querySelector('#startBtn');
let sneakGhostsBtn = document.querySelector('#sneakGhostsBtn');
let talkGhostsBtn = document.querySelector('#talkGhostsBtn');
let shatterMirrorBtn = document.querySelector('#shatterMirrorBtn');
let followWinkBtn = document.querySelector('#followWinkBtn');
let eatCandyBtn = document.querySelector('#eatCandyBtn');
let ignoreCandyBtn = document.querySelector('#ignoreCandyBtn');
let tiptoeDragonBtn = document.querySelector('#tiptoeDragonBtn');
let petDragonBtn = document.querySelector('#petDragonBtn');

// Intial block, nothing yet
startBtn.addEventListener('click', () => {
  startSection.style.display = 'none';
  hauntedHallSection.style.display = 'block';
});

talkGhostsBtn.addEventListener('click', () => {
  hauntedHallSection.style.display = 'none';
  failEndSection.style.display = 'block';
});

sneakGhostsBtn.addEventListener('click', () => {
  hauntedHallSection.style.display = 'none';
  mirrorMazeSection.style.display = 'block';
});

shatterMirrorBtn.addEventListener('click', () => {
  mirrorMazeSection.style.display = 'none';
  candyGardenSection.style.display = 'block';
});

followWinkBtn.addEventListener('click', () => {
  mirrorMazeSection.style.display = 'none';
  failEndSection.style.display = 'block';
});

eatCandyBtn.addEventListener('click', () => {
  candyGardenSection.style.display = 'none';
  failEndSection.style.display = 'block';
});

ignoreCandyBtn.addEventListener('click', () => {
  candyGardenSection.style.display = 'none';
  dragonLairSection.style.display = 'block';
});

tiptoeDragonBtn.addEventListener('click', () => {
  dragonLairSection.style.display = 'none';
  freedomEndSection.style.display = 'block';
});

petDragonBtn.addEventListener('click', () => {
  dragonLairSection.style.display = 'none';
  treasureEndSection.style.display = 'block';
});
