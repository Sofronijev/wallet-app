import { RootStateType } from "store/index";
import { formatDataForStore } from "./monthlyBalanceSlice";
import { createSelector } from "@reduxjs/toolkit";

export const getMonthlyBalance = (date: Date | string) =>
  createSelector(
    (state: RootStateType) => state.monthlyBalance.balanceByMonth,
    (balanceByMonth) => {
      const formattedDate = formatDataForStore(date);
      const monthlyBalance = balanceByMonth[formattedDate];

      const income = monthlyBalance?.income ?? 0;
      const expense = monthlyBalance?.expense ?? 0;
      const balance = monthlyBalance?.balance ?? 0;
      return {
        income,
        expense,
        balance,
      };
    }
  );
