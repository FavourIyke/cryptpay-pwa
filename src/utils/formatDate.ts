import { format } from "date-fns";
export const formatTime =(transactionDate: any)  => {
  // Parse the date string
  const date = new Date(transactionDate);

  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Add leading zero to minutes if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return formatted time string
  return `${hours}:${formattedMinutes}${ampm}`;
}

export const getFormattedDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    return "Today";
  } else if (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  ) {
    return "Yesterday";
  } else {
    return format(date, "dd.MM.yyyy");
  }
};

  export function formatAmount(value: any) {
    if (value === null || value === undefined) return "0.00"; // Handle null/undefined values

    // Convert to a number if it's a string
    const numValue = Number(value);

    // If value is greater than 0.01, format with 2 decimal places
    if (numValue >= 0.01) {
      return numValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    // If value is smaller than 0.01, but not zero, format with higher precision
    if (numValue > 0) {
      const precision = Math.abs(numValue) < 0.0001 ? 8 : 3; // More precision for very small values
      return numValue.toFixed(precision);
    }

    // Return '0.00' for zero value
    return "0.00";
  }