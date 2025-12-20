export const GAME_THEME = {
  HOK: {
    label: 'HONOR OF KINGS',
    className: 'bg-red-600 text-white',
  },
  'HONOR OF KINGS': {
    label: 'HONOR OF KINGS',
    className: 'bg-red-600 text-white',
  },

  PUBG: {
    label: 'PUBG',
    className: 'bg-yellow-400 text-black',
  },

  COD: {
    label: 'COD',
    className: 'bg-green-500 text-white',
  },
  'CALL OF DUTY': {
    label: 'COD',
    className: 'bg-green-500 text-white',
  },

  MLBB: {
    label: 'MOBILE LEGENDS',
    className: 'bg-blue-600 text-white',
  },
  'MOBILE LEGENDS': {
    label: 'MOBILE LEGENDS',
    className: 'bg-blue-600 text-white',
  },

  LOL: {
    label: 'LEAGUE OF LEGENDS',
    className: 'bg-purple-700 text-pink-400',
  },
  'LEAGUE OF LEGENDS': {
    label: 'LEAGUE OF LEGENDS',
    className: 'bg-purple-700 text-pink-400',
  },
};

export const DEFAULT_GAME_THEME = {
  label: 'UNKNOWN',
  className: 'bg-purple-900 text-purple-300',
};

export function getGameTheme(game) {
  if (!game) return DEFAULT_GAME_THEME;

  const key = game.toUpperCase().trim();
  return GAME_THEME[key] || DEFAULT_GAME_THEME;
}
