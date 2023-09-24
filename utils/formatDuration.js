export default function formatDuration(duration) {
  // Parse the duration using regular expressions
  const regex = /PT(\d+)H(\d+)M/;
  const match = duration.match(regex);

  if (!match) {
    return 'Invalid duration format';
  }

  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);

  // Format the duration as HH:MM
  return `${hours}h ${minutes}m`;
}
