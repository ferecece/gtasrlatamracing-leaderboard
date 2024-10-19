export function msToTime(duration) {
  const milliseconds = parseInt(duration % 1000);
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  let formattedTime = "";
  if (hours > 0) {
    formattedTime += hours + "h ";
  }
  if (minutes > 0 || hours > 0) {
    formattedTime += minutes + "m ";
  }
  if (seconds > 0 || minutes > 0 || hours > 0) {
    formattedTime += seconds + "s ";
  }
  formattedTime += milliseconds + "ms";

  return formattedTime.trim();
}

export function removeHexColorCoding(nick) {
  return nick.replace(/#([A-Fa-f0-9]{6})/g, "");
}