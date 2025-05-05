// Define other wallpapers
const wallpapers = [
    { displayName: "Jungle", fileName: "jungle"},
]

// Define puzzles with names and images
const puzzles = [
    { displayName: "Albatross", fileName: "albatross" },
    { displayName: "Baboon", fileName: "baboon" },
    { displayName: "Bald Eagle", fileName: "bald-eagle" },
    { displayName: "Blue Whale", fileName: "blue-whale" },
    { displayName: "Crocodile", fileName: "crocodile" },
    { displayName: "Elephant", fileName: "elephant" },
    { displayName: "Giant Squid", fileName: "giant-squid" },
    { displayName: "Hammerhead Shark", fileName: "hammerhead-shark" },
    { displayName: "Humpback Whale", fileName: "humpback-whale" },
    { displayName: "Hummingbird", fileName: "hummingbird" },
    { displayName: "Koala", fileName: "koala" },
    { displayName: "Manta Ray", fileName: "manta-ray" },
    { displayName: "Moon Bear", fileName: "moon-bear" },
    { displayName: "Octopus", fileName: "octopus" },
    { displayName: "Opossum", fileName: "opossum" },
    { displayName: "Pygmy Marmoset", fileName: "pygmy-marmoset" },
    { displayName: "Pine Marten", fileName: "pine-marten" },
    { displayName: "Red Panda", fileName: "red-panda" },
    { displayName: "Ring Tailed Lemur", fileName: "ring-tailed-lemur" },
    { displayName: "Spectacled Owl", fileName: "spectacled-owl" },
    { displayName: "Weasel", fileName: "weasel" },
    { displayName: "Wolverine", fileName: "wolverine" },
    { displayName: "Lion", fileName: "lion" },
    { displayName: "Sumatran Tiger", fileName: "sumatran-tiger" },
    { displayName: "Painted Wolf", fileName: "painted-wolf"},
    { displayName: "Bat-eared Fox", fileName: "bat-eared-fox"},
    { displayName: "Dhole", fileName: "dhole"},
    { displayName: "Malaysian Tapir", fileName: "malaysian-tapir"},
    { displayName: "African Rhino", fileName: "african-rhino"},
    { displayName: "Californian Sea Lion", fileName: "californian-sea-lion"},
    { displayName: "Dolphin", fileName: "dolphin"},
    { displayName: "Armadillo", fileName: "armadillo"}
];

const geronimoPuzzles = [
  {
    image: "cheese.png",
    question: "Who is Geronimo’s number one enemy and editor-in-chief of The Daily Rat?",
    options: ["Bobby Ratherford", "Sally Ratmousen", "Sophie van der Paws"],
    answerIndex: 1,
    difficulty: 2
  },
  {
    image: "mouse.png",
    question: "Rebellious and mischievous, he often engages in pranks and schemes that annoy Geronimo.",
    options: ["Rascal Rattletail", "Slicky Slickwhiskers", "Punk Rat"],
    answerIndex: 2,
    difficulty: 3
  },
  {
    image: "camera.png",
    question: "Very famous and talented chef, renowned for his culinary genius and celebrity chef persona.",
    options: ["Spicy McSizzle", "Saucy le Paws", "Basil von Whiskers"],
    answerIndex: 1,
    difficulty: 1
  },
  {
    image: "jacket.png",
    question: "What is the address of The Rodent’s Gazette, Geronimo Stilton’s office in New Mouse City?",
    options: ["17 Swiss Cheese St.", "9 Brie Blvd.", "5 Cheddar Av."],
    answerIndex: 0,
    difficulty: 3
  },
  {
    image: "fridge.png",
    question: "Briliant detective and close friend of Geronimo, he hasn't missed any of his birthdays.",
    options: ["Inspector Paws", "Sherlock Bones", "Hercule Poirat"],
    answerIndex: 2,
    difficulty: 2
  },
  {
    image: "tower.png",
    question: "Secret agent and close friend of Geronimo Stilton since elementary school, always wears shades and a trench coat",
    options: ["Maximilian Shadowtail", "Darius Quickpaws", "Kornelius von Kickpaw"],
    answerIndex: 2,
    difficulty: 1
  },
  {
    image: "flag.png",
    question: "Geronimo in the morning ..",
    options: ["values his sleep and prefers to stay cozy in bed", "is always ready for adventure", "is always up before the chicken wake up"],
    answerIndex: 0,
    difficulty: 3
  },
  {
    image: "australia.png",
    question: "Something Geronimo is afraid of, which gets him into funny situations:",
    options: ["The dark", "Helping his friends", "Mysteries and adventures"],
    answerIndex: 0,
    difficulty: 2
  },
  {
    image: "ship.png",
    question: "Briliant scientist who often invests gadgets and devices, good friend of Geronimo?",
    options: ["Prof. von Sparkle", "Dr. Percival Techton", "Prof. von Volt"],
    answerIndex: 2,
    difficulty: 1
  },
  {
    image: "mountains.png",
    question: "Geronimo’s favourite song which he likes to sing in the shower?",
    options: ["If you’re  joyful and you know it, wiggle your whiskers", "If you’re jolly and you know it, tap your tail", "If you’re happy and you know it clap your paws"],
    answerIndex: 2,
    difficulty: 3
  },
  {
    image: "moai.png",
    question: "Geronimo solves the mystery of the talking lion statue. Where was that?",
    options: ["Trafalgar Square", "Leicester Square", "Parliament Square"],
    answerIndex: 0,
    difficulty: 2
  },
  {
    image: "spy.png",
    question: "Loud and obnoxious, he loves playing pranks and thinks he’s a great cook",
    options: ["Alfredo Cat", "Benjamin Stilton", "Trap Stilton"],
    answerIndex: 2,
    difficulty: 1
  },
  {
    image: "lion.png",
    question: "Very pretty mouse, who is kind and caring and Geronimo has a crush on her",
    options: ["Fiona Furryfeet", "Rosie Cuddlepaws", "Petunia Prettypaws"],
    answerIndex: 2,
    difficulty: 1
  },
  {
    image: "cat.png",
    question: "Funny name invented by Trap, but definitely not funny for Geronimo",
    options: ["Merry Gerry", "Gerry Huckleberry", "Gerry Berry"],
    answerIndex: 2,
    difficulty: 2
  },
  {
    image: "cake.png",
    question: "Extremely greedy, and obsessed with saving money, he only washes his teeth once per week to save money",
    options: ["Samuel S. Stingysnout", "Matilda M. Munchmouser", "Penelope P. Pennywise"],
    answerIndex: 0,
    difficulty: 3
  },
  {
    image: "truck.png",
    question: "Precious object that Geronimo lost on Xmas day (and found with the help of agents 00K and 00V)",
    options: ["A treasure map", "A sealed envelope", "A photo of Benjamin when he was little"],
    answerIndex: 1,
    difficulty: 1
  },
  {
    image: "bathtub.png",
    question: "Very strict and bossy, founder of  The Rodent's Gazette",
    options: ["Geronimo’s teacher Walter Whiskerpaws", "Geronimo’s grandfather William Shortpaws", "Geronimo’s cousin Waldo Whiskerwink"],
    answerIndex: 1,
    difficulty: 2
  },
  {
    image: "fan.png",
    question: "Despite not being a great athlete, Geronimo trained and won a very important race",
    options: ["New Mouse City Cheese Eating Contest", "New Mouse City Boxing Contest", "New Mouse City Marathon"],
    answerIndex: 2,
    difficulty: 3
  },
  {
    image: "flippers.png",
    question: "Geronimo accidentally ends up on a school trip where he gets very little sleep but saves Punk Rat from drowning",
    options: ["Niagara Falls", "Grand Canyon", "Easter Island"],
    answerIndex: 0,
    difficulty: 3
  },
  {
    image: "stopwatch.png",
    question: "She always forgets things like her glasses and mobile but never forgets Geronimo’s birthday",
    options: ["Grandma Buttersqueak", "Uncle Whiskertail", "Aunt Sweetfur"],
    answerIndex: 2,
    difficulty: 2
  },
  {
    image: "goggles.png",
    question: "Young and clever, she’s an editor at Geronimo’s Gazette and likes to call him funny names",
    options: ["Popsy Wopsy", "Pinky Pick", "Rosie McFun"],
    answerIndex: 1,
    difficulty: 1
  },
  {
    image: "palm-tree.png",
    question: "What was the lost treasure of the Emerald Eye?",
    options: ["A treasure shaped as an eye", "A big eye made of chocolate", "A  green lake in the middle of an oval island"],
    answerIndex: 2,
    difficulty: 3
  },
  {
    image: "burger.png",
    question: "What food does Trap like to cook that always gives Geronimo stomach aches?",
    options: ["Fried bananas", "Cheesecake", "Mussels"],
    answerIndex: 2,
    difficulty: 2
  },
  {
    image: "money.png",
    question: "Who is always making Geronimo pay for stuff when they go on trips together?",
    options: ["His nephew Benjamin", "His cousin Trap", "His secretary Mousella"],
    answerIndex: 1,
    difficulty: 1
  },
  {
    image: "sheriff.png",
    question: "Strong mouse that Geronimo manages to upset multiple times and escape him in Wild Wild West",
    options: ["Cactus Cody Mouse", "Sheriff Squeaks", "Mick Muscle Mouse"],
    answerIndex: 2,
    difficulty: 3
  },
  {
    image: "freezer.png",
    question: "Trap almost won the Super Chef contest by cooking frozen dishes made by who?",
    options: ["Aunt Sweetfur", "Saucy le Paws", "Gordon Ratsey"],
    answerIndex: 0,
    difficulty: 2
  },
  {
    image: "telescope.png",
    question: "What was Trap’s favourite subject in school?",
    options: ["Maths", "Spelling", "Lunch"],
    answerIndex: 2,
    difficulty: 1
  },
  {
    image: "pirate.png",
    question: "Evil mouse who spreads Blue Spots Disease over New Moise City and steals the antidote from Prof. Brainymouse:",
    options: ["Sally Ratmousen", "Sally’s cousin Shadow", "Sally’s evil cat"],
    answerIndex: 1,
    difficulty: 3
  },
  {
    image: "icecream.png",
    question: "He appears dressed as an ice cream cone, cactus and banana tree and helps Geronimo solve the mystery of the blue spots",
    options: ["Sherlock Mouse", "Inspector Clawseau", "Hercule Poirat"],
    answerIndex: 2,
    difficulty: 2
  },
  {
    image: "banana.png",
    question: "A fried of Geronimo since preschool who has banana-shaped things, including his car",
    options: ["Cheddar Cluepaw", "Hercule Poirat", "Mystery Whiskers"],
    answerIndex: 1,
    difficulty: 1
  },
  {
    image: "map.png",
    question: "What does the parchment that Geronimo recovers in Japan contain?",
    options: ["A secret recipe to world’s best sushi", "An ancient technique used by samurai", "A treasure map"],
    answerIndex: 1,
    difficulty: 3
  },
  {
    image: "samurai.png",
    question: "How is Geronimo called in Japan by the local people, in a polite manner?",
    options: ["Gernomino-san", "Sir Geronimo", "Sensei Geronimo"],
    answerIndex: 0,
    difficulty: 2
  },
  {
    image: "magnifying.png",
    question: "How does Trap help the researchers find a cure for the blue spot disease?",
    options: ["He bakes cookies", "He sings songs", "He tells jokes"],
    answerIndex: 2,
    difficulty: 1
  },
  {
    image: "storybook.png",
    question: "What story would Aunt Sweetfur read to Geronimo when he was little?",
    options: ["Jack and the Cheese Sticks", "The three little rats", "Ratpunzel"],
    answerIndex: 0,
    difficulty: 3
  },
  {
    image: "tp.png",
    question: "One-eyed rat that has built his business around toilet related products?",
    options: ["Flusher Pottypaws", "Pawsy von Potty", "Flusher McPotty"],
    answerIndex: 0,
    difficulty: 2
  },
  {
    image: "coins.png",
    question: "Scary and dangerous contest that Geronimo participates in, and wins a million pounds?",
    options: ["The price is right", "Escape room", "Mousetrap"],
    answerIndex: 2,
    difficulty: 1
  },
  {
    image: "chocolate.png",
    question: "Old friend of Geronimo that he helps opening a new business of selling chocolate?",
    options: ["Martzipaw Nibbleton", "Whisker Fudgetail", "Nutty Chocorat"],
    answerIndex: 2,
    difficulty: 3
  },
  {
    image: "camper.png",
    question: "Very cold place where Geronimo is stranded with his grandfather’s camper van",
    options: ["Frostpaw Forest", "Ratzikistan", "Mouseberg Tundra"],
    answerIndex: 1,
    difficulty: 2
  },
  {
    image: "spoon.png",
    question: "Grandfather William Shortpaws’ cook, whose favourite tool is an extensive rolling pin",
    options: ["Fiona Flavourpaw", "Nina Garlicwhiskers", "Tina Spicytail"],
    answerIndex: 2,
    difficulty: 1
  },
  {
    image: "factory.png",
    question: "The mouse behind the ghost at the Grand Hotel wants to scare the guests and turn the hotel into what?",
    options: ["A toy factory", "A toilet factory", "A cheese factory"],
    answerIndex: 1,
    difficulty: 3
  },
  {
    image: "sandwich.png",
    question: "What “glorious” breakfast does uncle Samuel Stingysnout serve the guests of his son Stevie’s weeding?",
    options: ["A carrot", "A salami and cheese wrap", "A pea"],
    answerIndex: 2,
    difficulty: 2
  },
  {
    image: "ghost.png",
    question: "Funny costume that Geronimo wears in order to blend in with the carnivorous ware-pumpkins",
    options: ["Giant dandelion", "Beanstalk", "Pumpkin"],
    answerIndex: 2,
    difficulty: 1
  }
];
