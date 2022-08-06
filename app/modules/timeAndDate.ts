import { format } from "date-fns";

export const getCurrentMonthName = () => {
  return format(new Date(), "MMMM");
};

export const getFormattedDate = (date: Date) => {
  return format(date, "dd-MMM-Y");
};
