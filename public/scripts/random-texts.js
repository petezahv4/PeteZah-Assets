const splashTexts = [
  "Welcome to Velara!",
  "ahahahhah",
  "axon sucks, fight me!",
  "you didnt even see this",
  "what did you just do",
  "i like the sound of this",
  "i dont think this is a good idea",
  "watermelon > chicken",
  "Velara > 55gms",
  "i dont know what this is",
];

const splashTextElement = document.getElementById("random-texts");
const randomIndex = Math.floor(Math.random() * splashTexts.length);
splashTextElement.textContent = splashTexts[randomIndex];
