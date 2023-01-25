export const getDate = (date: Date): string =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const getTime = (date: Date): string =>
  new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const getYear = (date: Date): string =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
  });
