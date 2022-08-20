import { format } from "date-fns";

export const dateIsoFormat = "yyyy-MM-dd";

export const getCurrentMonthName = () => format(new Date(), "MMMM");

export const getFormattedDate = (date: Date) => format(date, "dd-MMM-Y");

export const formatIsoDate = (date: Date) => format(date, dateIsoFormat);
