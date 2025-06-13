//set the variables
let intro = document.getElementById('intro');
let introText = document.getElementById('introText');
let items = document.getElementById('items');
let storySection = document.getElementById('storySection');
let sceneTitle = document.getElementById('sceneTitle');
let sceneImage = document.getElementById('sceneImage');
let sceneText = document.getElementById('sceneText');
let choiceButtons = document.getElementById('choiceButtons');
let themeToggle = document.getElementById('themeToggle');

let currentScene = null;   // tracks current story scene
let isTyping = false;      // prevents skipping during typing effect

// Story data structure with scenes, images, and choices
let story = {

  // Starting scenes based on item choice

// this is called a object based structure, if else did not work:(
  //egypt (scroll)
  egypt: {
    title: 'Ancient Egypt',
    text: 'You arrive in the bustling city of Thebes. The sun shines brightly over the pyramids.',
    image: 'https://imgcdn.stablediffusionweb.com/2024/4/6/7e82d1ca-dd7a-4713-9a70-da4856b0fdb9.jpg',
    choices: [
      { text: 'Explore the marketplace', next: 'market' },
      { text: 'Visit the Pharaoh’s palace', next: 'palace' }
    ]
  },

  //italy (paintbrush)
  italy: {
    title: 'Renaissance Italy',
    text: 'You find yourself in Florence surrounded by artists and inventors.',
    image: 'https://thumbs.dreamstime.com/b/lively-italian-market-fresh-produce-vegetables-pasta-colorful-canopies-bright-summer-day-image-captures-341284233.jpg',
    choices: [
      { text: 'Visit Leonardo da Vinci’s workshop', next: 'workshop' },
      { text: 'Attend a grand feast', next: 'feast' }
    ]
  },

  //japan (katana)
  japan: {
    title: 'Feudal Japan',
    text: 'You arrive in Edo during the age of the samurai. The cherry blossoms are in full bloom.',
    image: 'https://thumbs.dreamstime.com/b/cherry-blossom-background-spring-landscape-blooming-sakura-wooden-house-japanese-anime-style-ai-generated-332105807.jpg',
    choices: [
      { text: 'Train with the samurai', next: 'samurai' },
      { text: 'Visit a traditional tea house', next: 'teaHouse' }
    ]
  },
  // Continuing scenes (branch 2)

  //egypt-level 2
  market: {
    title: 'Marketplace Adventures',
    text: 'You barter with merchants and find a mysterious amulet.',
    image: 'https://img.freepik.com/premium-vector/asian-market-booth-with-vendor-buyers-isolated-white-background-indian-street-souk-kiosk-with-spices-local-outdoor-bazaar-vector-illustration-flat-cartoon-style_198278-9798.jpg',
    choices: [
      { text: 'Keep and wear the amulet', next: 'amulet' },
      { text: 'Sell the amulet', next: 'sell' }
    ]
  },
  palace: {
    title: 'Pharaoh’s Palace',
    text: 'You are honored with a royal feast and secrets of the kingdom.',
    image: 'https://t4.ftcdn.net/jpg/08/15/70/45/360_F_815704589_0xXKi2K0XLD1XO3CahmOkJhUmsQwKAMC.jpg',
    choices: [
      { text: 'Learn ancient secrets', next: 'secrets' },
      { text: 'Sneak out to explore', next: 'explore' }
    ]
  },

  //italy- level 2
  workshop: {
    title: 'Da Vinci’s Workshop',
    text: 'You assist Leonardo with his latest invention, gaining inspiration.',
    image: 'https://media.istockphoto.com/id/1474478145/vector/renaissance-artist-workshop-illustration.jpg?s=612x612&w=0&k=20&c=tXXCoBKaDnhE503rxpwbMQHecOLcI-n4wH4WUcIpvvU=',
    choices: [
      { text: 'Sketch your own prototype', next: 'sketch' },
      { text: 'Join a secret society', next: 'society' }
    ]
  },
  feast: {
    title: 'Grand Feast',
    text: 'The feast is lively with music, dance, and fine food.',
    image: 'https://media.istockphoto.com/id/1295713205/vector/medieval-fair-vector-illustration-cartoon-flat-middle-ages-or-fairy-tale-fair-market-with.jpg?s=612x612&w=0&k=20&c=3PU2_eYGmwqD0QwG-fBGwYVY6YNi8YEZ4wxcXfZtqCg=',
    choices: [
      { text: 'Dance with nobles', next: 'dance' },
      { text: 'Plan a future journey with new friends', next: 'plan' }
    ]
  },

  //japan- level 2
  samurai: {
    title: 'Samurai Training',
    text: 'You train hard and master the katana, becoming a respected warrior.',
    image: 'https://img.freepik.com/premium-photo/samurai-man-japan-buildings-3d-rendering_691560-3906.jpg',
    choices: [
      { text: 'Enter a duel with another samurai', next: 'duel' },
      { text: 'Meditate in the garden', next: 'meditate' }
    ]
  },
  teaHouse: {
    title: 'Traditional Tea House',
    text: 'You enjoy a serene tea ceremony and learn about Japanese culture.',
    image: 'https://thumbs.dreamstime.com/b/serene-japanese-tea-room-garden-view-illustration-depicts-traditional-showcasing-calm-peaceful-atmosphere-368497324.jpg',
    choices: [
      { text: 'Join a poetry contest', next: 'poetry' },
      { text: 'Explore the gardens', next: 'gardens' }
    ]
  },
  // Ending scenes 

 //egypt- level 3

  amulet: {
    title: 'Mysterious Power',
    text: 'The amulet glows and you feel a surge of ancient power. Your adventure ends here with new knowledge.',
    image: 'https://thumbs.dreamstime.com/b/magic-amulet-glowing-gemstone-rope-cartoon-vector-necklace-wizard-crystal-game-award-fantasy-jewelry-medieval-307968709.jpg',
    choices: []
  },
  sell: {
    title: 'Merchant’s Bargain',
    text: 'You sell the amulet and fynd your return back home. Sometimes the best adventure is knowing when to go back.',
    image: 'https://static.vecteezy.com/system/resources/previews/006/622/391/non_2x/illustration-with-hand-giving-money-in-cartoon-hand-drawn-flat-style-hand-with-falling-coins-isolated-on-white-background-vector.jpg',
    choices: []
  },
  secrets: {
    title: 'Ancient Secrets',
    text: 'You learn new powerful secrets.',
    image: 'https://img.freepik.com/premium-vector/egyptian-hieroglyphs-cartoon-vector-illustration_1322560-6685.jpg',
    choices: []
  },
  explore: {
    title: 'Hidden Passages',
    text: 'Sneaking out, you discover hidden passages leading to gold.',
    image: 'https://media.istockphoto.com/id/1353757138/vector/egypt-pharaoh-tomb-game-background-ancient-temple-interior-secret-treasure-room-gold-coin.jpg?s=612x612&w=0&k=20&c=X3NsBww0o2nDkf4mETOJfCax5DZPXEcgmT_bAzyHg-w=',
    choices: []
  },

  //itlay- level 3
  sketch: {
    title: 'Inspired Artist',
    text: 'Your sketches become famous and you earn a lot of money.',
    image: 'https://www.shutterstock.com/image-vector/paintings-famous-artists-golden-ornamented-260nw-2527289669.jpg',
    choices: []
  },
  society: {
    title: 'Secret Society',
    text: 'You join a secret society dedicated to promoting knowledge.',
    image: 'https://st2.depositphotos.com/4806855/8134/v/450/depositphotos_81343756-stock-illustration-lords-supper-vector.jpg',
    choices: []
  },
  dance: {
    title: 'Dance of Celebration',
    text: 'Your dance wins the admiration of all and you become a legend in Renaissance tales.',
    image: 'https://media.istockphoto.com/id/110872712/vector/audience-applauding-and-empty-stage.jpg?s=612x612&w=0&k=20&c=iyM3RGjYoO1Dcbvy3rcCZmdVThRcVXbXAFT27IBaJVY=',
    choices: []
  },
  plan: {
    title: 'Journey Planner',
    text: 'You plan your next big adventure, eager to explore more of time’s mysteries.',
    image: 'https://media.istockphoto.com/id/1350596066/vector/hands-holding-travel-or-camping-map-and-a-compass-vector-illustration.jpg?s=612x612&w=0&k=20&c=pwVThTaO1d0mjAIdP_jlSDo_GhiuGZXq3za_RUQYVsU=',
    choices: []
  },

  //japan- level 3
  duel: {
    title: 'The Duel',
    text: 'You face a worthy opponent and win.',
    image: 'https://img.freepik.com/free-vector/two-cartoon-samurai-characters-fighting-each-other-with-swords-flat-illustration-asian-warriors-wearing-traditional-kimono-standing-fighting-poses-asia-samurai-fight-culture-concept_74855-16520.jpg',
    choices: []
  },
  meditate: {
    title: 'Peaceful Meditation',
    text: 'You find inner peace and wisdom in the tranquil gardens.',
    image: 'https://thumbs.dreamstime.com/b/integrate-nature-inner-peace-leave-all-stress-life-aside-find-137382184.jpg',
    choices: []
  },
  poetry: {
    title: 'Poetry Contest',
    text: 'Your poem wins the contest, earning a lot of money.',
    image: 'https://img.freepik.com/free-vector/hand-drawn-poetry-illustration_23-2149263482.jpg?semt=ais_hybrid&w=740',
    choices: []
  },
  gardens: {
    title: 'Exploring the Gardens',
    text: 'The beautiful gardens inspire you to be one with nature.',
    image: 'https://us.123rf.com/450wm/sonulkaster/sonulkaster2404/sonulkaster240400273/228095076-outdoor-meditation-peaceful-nature-scene.jpg?ver=6',
    choices: []
  }
};

//dont understand-used template

// Clears out any existing buttons(choices) from the screen
function clearChoices() {
  choiceButtons.innerHTML = '';
}

// creates clickable buttons for each choice in the scene
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

// Typing effect for scene text, fix using YT
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

// displays the full scene, title, image, text, and choices
function showScene(key) {
  currentScene = story[key];
  if (!currentScene) return;

  // Update title and image
  sceneTitle.textContent = currentScene.title;
  sceneImage.src = currentScene.image;
  sceneImage.alt = `Image for ${currentScene.title}`;

  clearChoices(); // removes choice buttons before
typeText(currentScene.text, () => { //typing effect
  // Add choice buttons 
  if (currentScene.choices.length > 0) {
    createChoiceButtons(currentScene.choices);
  } else { //no more choices, move the ending
    // End of story: show end screen after animation
    sceneText.classList.add('end-animation');
    setTimeout(() => {
      sceneText.classList.remove('end-animation');
      storySection.classList.add('hidden');
      endPage.classList.remove('hidden');
      endMessage.textContent = `"${currentScene.title}" has concluded. Want to explore another path?`;
    }, 700); //short delay (use 700ms), remove the animation
  }
});

// When user clicks an item, hides intro and start story at corresponding scene
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
      showScene('japan'); // Katana .. Japan
    } else if (item === 'scroll') {
      showScene('egypt'); // Scroll .. Egypt
    } else if (item === 'paintbrush') {
      showScene('italy'); // Paintbrush .. Italy
    } else {
      // Default fallback (start at egypt)
      showScene('egypt');
    }
  }
});

//  Restart Button
restartBtn.addEventListener('click', () => {
  // Hide end screen
  endPage.classList.add('hidden');

  // Reset story section and clear content
  storySection.classList.add('hidden');
  sceneTitle.textContent = '';
  sceneImage.src = '';
  sceneText.textContent = '';
  clearChoices();

  // Show intro again
  introText.style.display = '';
  items.style.display = '';
});

// Theme toggle button functionality
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
