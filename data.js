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
  }
];
