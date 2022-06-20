import { format } from "date-fns";

export const getCurrentMonthName = () => {
  return format(new Date(), "MMMM");
};
