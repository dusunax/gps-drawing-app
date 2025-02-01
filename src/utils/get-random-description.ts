export function randomDescription() {
  const descriptions = [
    "Today is a good day to walk 🚶",
    "Hello! 👋",
    "Keep pushing forward! 🔥",
    "Enjoy every little moment ✨",
    "Dream big, work hard 🚀",
    "The sky is the limit! ☁️",
    "Stay curious and keep learning 📚",
    "Every day is a new beginning 🌱",
    "Believe in yourself 💪",
    "Smile, it's contagious! 😄",
    "Create your own sunshine ☀️",
    "Small steps lead to big changes 👣",
    "Keep on stepping 👟",
    "Just do it! ✅",
    "Never give up! 💯",
    "Go for it! 🚀",
    "You got this! 💪",
    "Stay strong and keep going! 🌟",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}
