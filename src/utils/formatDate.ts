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
export const convertDateFormat = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day} - ${month} - ${year}`;
  };
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

 export function formatAmount(value: any): string {
  if (value === null || value === undefined || isNaN(Number(value))) return "0.00"; // Handle null, undefined, and non-numeric inputs

  const numValue = Number(value);

  if (numValue >= 0.01) {
    return numValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    });
  }

  if (numValue > 0) {
    const precision = numValue < 0.0001 ? 8 : 6;
    return numValue.toFixed(precision);
  }

  return "0.00";
}
  export const formatDateAndTime = (utcDateString: string) => {
  const date = new Date(utcDateString + 'Z'); // Parse UTC string
  
  // Extract the day with ordinal suffix
  const day = date.getDate();
  const ordinalDay = `${day}${getOrdinalSuffix(day)}`;

  // Format the date (e.g., Aug 26th, 2024)
  const monthAndYear = `${date.toLocaleString('default', { month: 'short' })} ${ordinalDay}, ${date.getFullYear()}`;
  
  // Extract the time part (e.g., 9:00am)
  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return { monthAndYear, formattedTime };
};

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th'; // Covers the exception for numbers ending in 11-13
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};