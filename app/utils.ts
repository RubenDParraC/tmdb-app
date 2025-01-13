/**
 * Formats a date to a human-readable string.
 * @param dateInput - The date to format, as a string or Date object.
 * @param locale - Optional locale for formatting (default is "en-US").
 * @returns The formatted date string.
 * @throws Will throw an error if the input date is invalid.
 */
export const formatDate = (
  dateInput: string | Date,
  locale = "en-US"
): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  return date.toLocaleDateString(locale, options);
};
