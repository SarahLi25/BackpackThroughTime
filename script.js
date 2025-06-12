//set the variables
const intro = document.getElementById('intro');
const introText = document.getElementById('introText');
const items = document.getElementById('items');
const storySection = document.getElementById('storySection');
const sceneTitle = document.getElementById('sceneTitle');
const sceneImage = document.getElementById('sceneImage');
const sceneText = document.getElementById('sceneText');
const choiceButtons = document.getElementById('choiceButtons');
const themeToggle = document.getElementById('themeToggle');

let currentScene = null;   // Tracks current story scene
let isTyping = false;      // To prevent skipping during typing effect

// Story data structure with scenes, images, and choices
const story = {
  // Starting scenes based on item choice
  egypt: {
    title: 'Ancient Egypt',
    text: 'You arrive in the bustling city of Thebes. The sun shines brightly over the pyramids.',
    image: 'images/egypt.jpg',
    choices: [
      { text: 'Explore the marketplace', next: 'market' },
      { text: 'Visit the Pharaoh’s palace', next: 'palace' }
    ]
  },
  italy: {
    title: 'Renaissance Italy',
    text: 'You find yourself in Florence surrounded by artists and inventors.',
    image: 'images/italy.jpg',
    choices: [
      { text: 'Visit Leonardo da Vinci’s workshop', next: 'workshop' },
      { text: 'Attend a grand feast', next: 'feast' }
    ]
  },
  japan: {
    title: 'Feudal Japan',
    text: 'You arrive in Edo during the age of the samurai. The cherry blossoms are in full bloom.',
    image: 'images/japan.jpg',
    choices: [
      { text: 'Train with the samurai', next: 'samurai' },
      { text: 'Visit a traditional tea house', next: 'teaHouse' }
    ]
  },
  // Continuing scenes
  market: {
    title: 'Marketplace Adventures',
    text: 'You barter with merchants and find a mysterious amulet.',
    image: 'images/market.jpg',
    choices: [
      { text: 'Wear the amulet', next: 'amulet' },
      { text: 'Sell the amulet', next: 'sell' }
    ]
  },
  palace: {
    title: 'Pharaoh’s Palace',
    text: 'You are honored with a royal feast and secrets of the kingdom.',
    image: 'images/palace.jpg',
    choices: [
      { text: 'Learn ancient secrets', next: 'secrets' },
      { text: 'Sneak out to explore', next: 'explore' }
    ]
  },
  workshop: {
    title: 'Da Vinci’s Workshop',
    text: 'You assist Leonardo with his latest invention, gaining inspiration.',
    image: 'images/workshop.jpg',
    choices: [
      { text: 'Sketch your own design', next: 'sketch' },
      { text: 'Join a secret society', next: 'society' }
    ]
  },
  feast: {
    title: 'Grand Feast',
    text: 'The feast is lively with music, dance, and fine food.',
    image: 'images/feast.jpg',
    choices: [
      { text: 'Dance with nobles', next: 'dance' },
      { text: 'Plan a future journey', next: 'plan' }
    ]
  },
  samurai: {
    title: 'Samurai Training',
    text: 'You train hard and master the katana, becoming a respected warrior.',
    image: 'images/samurai.jpg',
    choices: [
      { text: 'Enter a duel', next: 'duel' },
      { text: 'Meditate in the garden', next: 'meditate' }
    ]
  },
  teaHouse: {
    title: 'Traditional Tea House',
    text: 'You enjoy a serene tea ceremony and learn about Japanese culture.',
    image: 'images/teaHouse.jpg',
    choices: [
      { text: 'Join a poetry contest', next: 'poetry' },
      { text: 'Explore the gardens', next: 'gardens' }
    ]
  },
  // Ending scenes (same as before)
  amulet: {
    title: 'Mysterious Power',
    text: 'The amulet glows and you feel a surge of ancient power. Your adventure ends here with new knowledge.',
    image: 'images/amulet.jpg',
    choices: []
  },
  sell: {
    title: 'Merchant’s Bargain',
    text: 'You sell the amulet and fund your return home. Sometimes the best adventure is knowing when to go back.',
    image: 'images/sell.jpg',
    choices: []
  },
  secrets: {
    title: 'Ancient Secrets',
    text: 'You learn powerful secrets that change your understanding of history forever.',
    image: 'images/secrets.jpg',
    choices: []
  },
  explore: {
    title: 'Hidden Passages',
    text: 'Sneaking out, you discover hidden passages leading to untold treasures.',
    image: 'images/explore.jpg',
    choices: []
  },
  sketch: {
    title: 'Inspired Artist',
    text: 'Your sketches become famous and inspire generations to come.',
    image: 'images/sketch.jpg',
    choices: []
  },
  society: {
    title: 'Secret Society',
    text: 'You join a secret society dedicated to protecting knowledge through the ages.',
    image: 'images/society.jpg',
    choices: []
  },
  dance: {
    title: 'Dance of Celebration',
    text: 'Your dance wins the admiration of all and you become a legend in Renaissance tales.',
    image: 'images/dance.jpg',
    choices: []
  },
  plan: {
    title: 'Journey Planner',
    text: 'You plan your next big adventure, eager to explore more of time’s mysteries.',
    image: 'images/plan.jpg',
    choices: []
  },
  duel: {
    title: 'The Duel',
    text: 'You face a worthy opponent and demonstrate your mastery of the katana.',
    image: 'images/duel.jpg',
    choices: []
  },
  meditate: {
    title: 'Peaceful Meditation',
    text: 'You find inner peace and wisdom in the tranquil gardens.',
    image: 'images/meditate.jpg',
    choices: []
  },
  poetry: {
    title: 'Poetry Contest',
    text: 'Your poem wins the contest, bringing honor and joy.',
    image: 'images/poetry.jpg',
    choices: []
  },
  gardens: {
    title: 'Exploring the Gardens',
    text: 'The beautiful gardens inspire you to create lasting memories.',
    image: 'images/gardens.jpg',
    choices: []
  }
};

// Clear choice buttons before adding new ones
function clearChoices() {
  choiceButtons.innerHTML = '';
}

// Create choice buttons dynamically from the scene's choices
function createChoiceButtons(choices) {
  clearChoices();
  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.classList.add('choice-btn');
    btn.textContent = choice.text;
    btn.addEventListener('click', () => {
      if (!isTyping) {
        showScene(choice.next);
      }
    });
    choiceButtons.appendChild(btn);
  });
}

// Typing effect for scene text
function typeText(text, callback) {
  isTyping = true;
  sceneText.textContent = '';
  let index = 0;

  function type() {
    if (index < text.length) {
      sceneText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 30);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }
  type();
}

// Show a scene given a key in the story object
function showScene(key) {
  currentScene = story[key];
  if (!currentScene) return;

  // Update title and image
  sceneTitle.textContent = currentScene.title;
  sceneImage.src = currentScene.image;
  sceneImage.alt = `Image for ${currentScene.title}`;

  clearChoices();
  typeText(currentScene.text, () => {
    // Add choice buttons if available
    if (currentScene.choices.length > 0) {
      createChoiceButtons(currentScene.choices);
    } else {
      // Ending scene - highlight text briefly
      sceneText.classList.add('end-animation');
      setTimeout(() => sceneText.classList.remove('end-animation'), 700);
    }
  });
}

// When user clicks an item, start story at corresponding scene
items.addEventListener('click', e => {
  if (e.target.classList.contains('item-btn')) {
    const item = e.target.dataset.item;

    // Hide intro UI
    introText.style.display = 'none';
    items.style.display = 'none';

    // Show story section
    storySection.classList.remove('hidden');

    // Jump to scene based on item chosen
    if (item === 'katana') {
      showScene('japan'); // Katana → Japan
    } else if (item === 'scroll') {
      showScene('egypt'); // Scroll → Egypt
    } else if (item === 'paintbrush') {
      showScene('italy'); // Paintbrush → Italy
    } else {
      // Default fallback (start at egypt)
      showScene('egypt');
    }
  }
});

// Theme toggle button functionality
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
