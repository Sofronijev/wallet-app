import { format, isToday, isYesterday } from "date-fns";

export const dateIsoFormat = "yyyy-MM-dd";

export const getCurrentMonthYear = () => format(new Date(), "MMMM Y");

export const getFormattedDate = (date: Date | string | number) =>
  format(new Date(date), "dd-MMM-Y");

export const formatIsoDate = (date: Date | string | number) =>
  format(new Date(date), dateIsoFormat);

export const formatDayString = (date: Date | string | number) => {
  const getDate = new Date(date);
  if (isToday(getDate)) return "Today";
  if (isYesterday(getDate)) return "Yesterday";
  return getFormattedDate(getDate);
};
