export function setTimeToDate(timeStr: string): Date {
  const timeParts = timeStr.split(':'); // Split the string by colon to extract hours, minutes, and seconds

  if (timeParts.length !== 3) {
    throw new Error("Invalid time format, expected 'HH:mm:ss'");
  }

  const today = new Date(); // Get today's date
  today.setHours(parseInt(timeParts[0], 10)); // Set hours from the time string
  today.setMinutes(parseInt(timeParts[1], 10)); // Set minutes from the time string
  today.setSeconds(parseInt(timeParts[2], 10)); // Set seconds from the time string
  today.setMilliseconds(0); // Reset milliseconds to zero for consistency

  return today;
}
