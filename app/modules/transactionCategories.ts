export type Transaction = {
  name: string;
  id: number;
  label: string;
};
export type TransactionTypes = Record<number, Transaction>;

export type Category = Transaction & { types: TransactionTypes };
export type CategoriesType = Record<number, Category>;

export const income = {
  1: { name: "income_wage", id: 1, label: "Wage" },
  2: { name: "income_interests", id: 2, label: "Interests" },
  3: { name: "income_gifts", id: 3, label: "Gifts" },
  4: { name: "income_refunds", id: 4, label: "Refunds" },
  5: { name: "income_financial_aid", id: 5, label: "Financial aid" },
  6: { name: "income_other", id: 6, label: "Other" },
};

const saving = {
  7: { name: "saving_emergency", id: 7, label: "Emergency" },
  8: { name: "saving_retirement", id: 8, label: "Retirement" },
  9: { name: "saving_vacation", id: 9, label: "Vacation" },
  10: { name: "saving_others", id: 10, label: "Other" },
};

const gifts = {
  11: { name: "charity_donations", id: 11, label: "Donation" },
  12: { name: "gifts", id: 12, label: "Gifts" },
  13: { name: "charity_other", id: 13, label: "Other" },
};

const housing = {
  14: { name: "mortgage_rent", id: 14, label: "Mortgage/Rent" },
  15: { name: "housing_improvements", id: 15, label: "Improvements" },
  16: { name: "housing_supplies", id: 16, label: "Supplies" },
  17: { name: "housing_other", id: 17, label: "Other" },
};

const utilities = {
  18: { name: "utilities_electricity", id: 18, label: "Electricity" },
  19: { name: "utilities_gas_oil", id: 19, label: "Gas/Oil" },
  20: { name: "utilities_water_sewer_trash", id: 20, label: "Water/Sewer/Trash" },
  21: { name: "utilities_phone", id: 21, label: "Phone" },
  22: { name: "utilities_cable_satellite", id: 22, label: "Cable/Satellite" },
  23: { name: "utilities_internet", id: 23, label: "Internet" },
  24: { name: "utilities_other", id: 24, label: "Other" },
};

const food = {
  25: { name: "food_groceries", id: 25, label: "Groceries" },
  26: { name: "food_eating_out", id: 26, label: "Eating out" },
  27: { name: "food_other", id: 27, label: "Other" },
};

const transportation = {
  28: { name: "transportation_insurance", id: 28, label: "Insurance" },
  29: { name: "transportation_payments", id: 29, label: "Payments" },
  30: { name: "transportation_fuel", id: 30, label: "Fuel" },
  31: { name: "transportation_ticket", id: 31, label: "Ticket" },
  32: { name: "transportation_taxi", id: 32, label: "Taxi" },
  33: { name: "transportation_repairs", id: 33, label: "Repairs" },
  34: { name: "transportation_registration", id: 34, label: "Registration" },
  35: { name: "transportation_other", id: 35, label: "Other" },
};

const health = {
  36: { name: "health_insurance", id: 36, label: "Insurance" },
  37: { name: "health_doctor", id: 37, label: "Doctor" },
  38: { name: "health_medicine", id: 38, label: "Medicine" },
  39: { name: "health_other", id: 39, label: "Other" },
};

const dailyLiving = {
  40: { name: "dailyLiving_education", id: 40, label: "Education" },
  41: { name: "dailyLiving_clothing", id: 41, label: "Clothing" },
  42: { name: "dailyLiving_personal", id: 42, label: "Personal" },
  43: { name: "dailyLiving_cleaning", id: 43, label: "Cleaning" },
  44: { name: "dailyLiving_salon_barber", id: 44, label: "Salon/Barber" },
  45: { name: "dailyLiving_other", id: 45, label: "Other" },
};

const children = {
  46: { name: "children_clothing", id: 46, label: "Clothing" },
  47: { name: "children_medical", id: 47, label: "Medical" },
  48: { name: "children_school", id: 48, label: "School" },
  49: { name: "children_babysitting", id: 49, label: "Babysitting" },
  50: { name: "children_toys_games", id: 50, label: "Toys/Games" },
  51: { name: "children_other", id: 51, label: "Other" },
};

const obligation = {
  52: { name: "obligation_loan", id: 52, label: "Loan" },
  53: { name: "obligation_credit_card", id: 53, label: "Credit card" },
  54: { name: "obligation_child_support", id: 54, label: "Child support" },
  55: { name: "obligation_taxes", id: 55, label: "Taxes" },
  56: { name: "obligation_other", id: 56, label: "Other" },
};

const entertainment = {
  57: { name: "entertainment_vacation_travel", id: 57, label: "Vacation/Travel" },
  58: { name: "entertainment_movies", id: 58, label: "Movies" },
  59: { name: "entertainment_music", id: 59, label: "Music" },
  60: { name: "entertainment_games", id: 60, label: "Games" },
  61: { name: "entertainment_rental", id: 61, label: "Rental" },
  62: { name: "entertainment_books", id: 62, label: "Books" },
  63: { name: "entertainment_hobbies", id: 63, label: "Hobbies" },
  64: { name: "entertainment_sport", id: 64, label: "Sport" },
  65: { name: "entertainment_gadgets", id: 65, label: "Gadgets" },
  66: { name: "entertainment_other", id: 66, label: "Other" },
};
const other = {
  67: { name: "expenses_other", id: 67, label: "Other" },
};

export const transactionCategories: CategoriesType = {
  1: { name: "income", id: 1, label: "Income", types: income },
  2: { name: "saving", id: 2, label: "Saving", types: saving },
  3: { name: "gifts", id: 3, label: "Gifts/Charity", types: gifts },
  4: { name: "housing", id: 4, label: "Housing", types: housing },
  5: { name: "utilities", id: 5, label: "Utilities", types: utilities },
  6: { name: "food", id: 6, label: "Food", types: food },
  7: { name: "transportation", id: 7, label: "Transportation", types: transportation },
  8: { name: "health", id: 8, label: "Health", types: health },
  9: { name: "dailyLiving", id: 9, label: "Daily living", types: dailyLiving },
  10: { name: "children", id: 10, label: "Children", types: children },
  11: { name: "obligation", id: 11, label: "Obligation", types: obligation },
  12: { name: "entertainment", id: 12, label: "Entertainment", types: entertainment },
  13: { name: "other", id: 13, label: "Other", types: other },
};