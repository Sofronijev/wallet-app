-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT DEFAULT '',
    "password" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Types_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Wallet" (
    "walletId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "startingBalance" DECIMAL NOT NULL,
    "walletName" TEXT NOT NULL DEFAULT 'My custom wallet',
    "currencyCode" TEXT NOT NULL DEFAULT 'EUR',
    "currencySymbol" TEXT NOT NULL DEFAULT '€',
    "type" TEXT NOT NULL DEFAULT 'custom',
    "color" TEXT NOT NULL DEFAULT '#3EB489',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" DECIMAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    CONSTRAINT "Transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transactions_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet" ("walletId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "fromWalletId" INTEGER NOT NULL,
    "toWalletId" INTEGER NOT NULL,
    "fromTransactionId" INTEGER NOT NULL,
    "toTransactionId" INTEGER NOT NULL,
    CONSTRAINT "Transfer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transfer_fromWalletId_fkey" FOREIGN KEY ("fromWalletId") REFERENCES "Wallet" ("walletId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transfer_toWalletId_fkey" FOREIGN KEY ("toWalletId") REFERENCES "Wallet" ("walletId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transfer_fromTransactionId_fkey" FOREIGN KEY ("fromTransactionId") REFERENCES "Transactions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transfer_toTransactionId_fkey" FOREIGN KEY ("toTransactionId") REFERENCES "Transactions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Types_categoryId_idx" ON "Types"("categoryId");

-- CreateIndex
CREATE INDEX "Transactions_wallet_id_idx" ON "Transactions"("wallet_id");

-- CreateIndex
CREATE INDEX "Transfer_fromWalletId_idx" ON "Transfer"("fromWalletId");

-- CreateIndex
CREATE INDEX "Transfer_toWalletId_idx" ON "Transfer"("toWalletId");

-- CreateIndex
CREATE INDEX "Transfer_fromTransactionId_idx" ON "Transfer"("fromTransactionId");

-- CreateIndex
CREATE INDEX "Transfer_toTransactionId_idx" ON "Transfer"("toTransactionId");

INSERT INTO "Categories" (id, name) VALUES
(1, "income"),
(2, "saving"),
(3, "gifts"),
(4, "housing"),
(5, "utilities"),
(6, "food"),
(7, "transportation"),
(8, "health"),
(9, "dailyLiving"),
(10, "children"),
(11, "obligation"),
(12, "entertainment"),
(13, "other"),
(14, "balanceAdjust"),
(15, "transfer");

INSERT INTO "Types" (id, name, categoryId) VALUES
(1, "income_wage", 1),
(2, "income_interests", 1),
(3, "income_gifts", 1),
(4, "income_refunds", 1),
(5, "income_financial_aid", 1),
(6, "income_other", 1),
(7, "saving_emergency", 2),
(8, "saving_retirement", 2),
(9, "saving_vacation", 2),
(10, "saving_others", 2),
(11, "charity_donations", 3),
(12, "gifts", 3),
(13, "charity_other", 3),
(14, "mortgage_rent", 4),
(15, "housing_improvements", 4),
(16, "housing_supplies", 4),
(17, "housing_other", 4),
(18, "utilities_electricity", 5),
(19, "utilities_gas_oil", 5),
(20, "utilities_water_sewer_trash", 5),
(21, "utilities_phone", 5),
(22, "utilities_cable_satellite", 5),
(23, "utilities_internet", 5),
(24, "utilities_other", 5),
(25, "food_groceries", 6),
(26, "food_eating_out", 6),
(27, "food_other", 6),
(28, "transportation_insurance", 7),
(29, "transportation_payments", 7),
(30, "transportation_fuel", 7),
(31, "transportation_ticket", 7),
(32, "transportation_taxi", 7),
(33, "transportation_repairs", 7),
(34, "transportation_registration", 7),
(35, "transportation_other", 7),
(36, "health_insurance", 8),
(37, "health_doctor", 8),
(38, "health_medicine", 8),
(39, "health_other", 8),
(40, "dailyLiving_education", 9),
(41, "dailyLiving_clothing", 9),
(42, "dailyLiving_personal", 9),
(43, "dailyLiving_cleaning", 9),
(44, "dailyLiving_salon_barber", 9),
(45, "dailyLiving_other", 9),
(46, "children_clothing", 10),
(47, "children_medical", 10),
(48, "children_school", 10),
(49, "children_babysitting", 10),
(50, "children_toys_games", 10),
(51, "children_other", 10),
(52, "obligation_loan", 11),
(53, "obligation_credit_card", 11),
(54, "obligation_child_support", 11),
(55, "obligation_taxes", 11),
(56, "obligation_other", 11),
(57, "entertainment_vacation_travel", 12),
(58, "entertainment_movies", 12),
(59, "entertainment_music", 12),
(60, "entertainment_games", 12),
(61, "entertainment_rental", 12),
(62, "entertainment_books", 12),
(63, "entertainment_hobbies", 12),
(64, "entertainment_sport", 12),
(65, "entertainment_gadgets", 12);
