
// List of fun emojis for fallback avatars
const emojiList = [
  '😀', '😎', '🥳', '🤩', '😇', '🤠', '🥸', '😺', '🐱', '🐶', '🐻',
  '🦊', '🦄', '🦋', '🐝', '🐛', '🌸', '🌺', '🌻', '🌼', '🍀', '🍁',
  '🍂', '🌴', '🌵', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎹', '🎺',
  '🎻', '🎬', '🎮', '🎯', '🚀', '✈️', '🚗', '🏎️', '🚲', '🏄', '🏂',
  '🏃', '🚶', '👩', '👨', '🧑', '👱', '👴', '👵', '👶', '👧', '👦',
  '👩‍💻', '👨‍💻', '👩‍🎨', '👨‍🎨', '👩‍⚕️', '👨‍⚕️', '👩‍🚀', '👨‍🚀', '👩‍🔬', '👨‍🔬'
];

// Deterministic function to pick an emoji based on a string (user ID or email)
export function getRandomEmoji(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % emojiList.length;
  return emojiList[index];
}

// Background colors that pair well with emojis
const bgColors = [
  '#6a4cf5', // Gradient Violet
  '#d44df0', // Gradient Magenta
  '#ff7a3d', // Gradient Orange
  '#ff5577', // Gradient Coral
  '#22c55e', // Semantic Success
  '#0099ff', // Accent Blue
  '#f59e0b', // Amber
  '#84cc16', // Lime
  '#22d3ee', // Cyan
  '#f472b6'  // Pink
];

export function getAvatarBgColor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % bgColors.length;
  return bgColors[index];
}
