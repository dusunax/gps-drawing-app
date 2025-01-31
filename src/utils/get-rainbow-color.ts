let hue = 0;

export function getRainbowColor(options: { speed: number } = { speed: 1 }) {
  hue = (hue + options.speed) % 360;
  return `hsl(${hue}, 100%, 50%)`;
}
