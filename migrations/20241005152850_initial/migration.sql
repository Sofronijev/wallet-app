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
    "type" TEXT NOT NULL DEFAULT 'custom',
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Types_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    CONSTRAINT "type_check_types" CHECK ("type" IN ('custom', 'system'))
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'custom'
    CONSTRAINT "type_check_categories" CHECK ("type" IN ('custom', 'system'))
);

-- CreateTable
CREATE TABLE "Wallet" (
    "walletId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "startingBalance" DECIMAL NOT NULL DEFAULT 0.00,
    "walletName" TEXT NOT NULL DEFAULT 'My custom wallet',
    "currencyCode" TEXT NOT NULL DEFAULT 'EUR',
    "currencySymbol" TEXT NOT NULL DEFAULT '€',
    "type" TEXT NOT NULL DEFAULT 'custom',
    "color" TEXT NOT NULL DEFAULT '#3EB489',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    CONSTRAINT "type_check_wallet" CHECK ("type" IN ('custom', 'system'))
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

-- Initial Data

INSERT INTO "Users" (id) VALUES 
(1);

INSERT INTO "Wallet" (walletId, userId, walletName, type, color) VALUES
(1, 1, "Personal", "system","#3EB489"),
(2, 1, "Savings", "custom", "#6DB993");

INSERT INTO "Categories" (id, name, type) VALUES
(1, "income", "system"),
(2, "saving", "system"),
(3, "gifts", "system"),
(4, "housing", "system"),
(5, "utilities", "system"),
(6, "food", "system"),
(7, "transportation", "system"),
(8, "health", "system"),
(9, "dailyLiving", "system"),
(10, "children", "system"),
(11, "obligation", "system"),
(12, "entertainment", "system"),
(13, "other", "system"),
(14, "balanceAdjust", "system"),
(15, "transfer", "system");

INSERT INTO "Types" (id, name, categoryId, type) VALUES
(1, "income_wage", 1, "system"),
(2, "income_interests", 1, "system"),
(3, "income_gifts", 1, "system"),
(4, "income_refunds", 1, "system"),
(5, "income_financial_aid", 1, "system"),
(6, "income_other", 1, "system"),
(7, "saving_emergency", 2, "system"),
(8, "saving_retirement", 2, "system"),
(9, "saving_vacation", 2, "system"),
(10, "saving_others", 2, "system"),
(11, "charity_donations", 3, "system"),
(12, "gifts", 3, "system"),
(13, "charity_other", 3, "system"),
(14, "mortgage_rent", 4, "system"),
(15, "housing_improvements", 4, "system"),
(16, "housing_supplies", 4, "system"),
(17, "housing_other", 4, "system"),
(18, "utilities_electricity", 5, "system"),
(19, "utilities_gas_oil", 5, "system"),
(20, "utilities_water_sewer_trash", 5, "system"),
(21, "utilities_phone", 5, "system"),
(22, "utilities_cable_satellite", 5, "system"),
(23, "utilities_internet", 5, "system"),
(24, "utilities_other", 5, "system"),
(25, "food_groceries", 6, "system"),
(26, "food_eating_out", 6, "system"),
(27, "food_other", 6, "system"),
(28, "transportation_insurance", 7, "system"),
(29, "transportation_payments", 7, "system"),
(30, "transportation_fuel", 7, "system"),
(31, "transportation_ticket", 7, "system"),
(32, "transportation_taxi", 7, "system"),
(33, "transportation_repairs", 7, "system"),
(34, "transportation_registration", 7, "system"),
(35, "transportation_other", 7, "system"),
(36, "health_insurance", 8, "system"),
(37, "health_doctor", 8, "system"),
(38, "health_medicine", 8, "system"),
(39, "health_other", 8, "system"),
(40, "dailyLiving_education", 9, "system"),
(41, "dailyLiving_clothing", 9, "system"),
(42, "dailyLiving_personal", 9, "system"),
(43, "dailyLiving_cleaning", 9, "system"),
(44, "dailyLiving_salon_barber", 9, "system"),
(45, "dailyLiving_other", 9, "system"),
(46, "children_clothing", 10, "system"),
(47, "children_medical", 10, "system"),
(48, "children_school", 10, "system"),
(49, "children_babysitting", 10, "system"),
(50, "children_toys_games", 10, "system"),
(51, "children_other", 10, "system"),
(52, "obligation_loan", 11, "system"),
(53, "obligation_credit_card", 11, "system"),
(54, "obligation_child_support", 11, "system"),
(55, "obligation_taxes", 11, "system"),
(56, "obligation_other", 11, "system"),
(57, "entertainment_vacation_travel", 12, "system"),
(58, "entertainment_movies", 12, "system"),
(59, "entertainment_music", 12, "system"),
(60, "entertainment_games", 12, "system"),
(61, "entertainment_rental", 12, "system"),
(62, "entertainment_books", 12, "system"),
(63, "entertainment_hobbies", 12, "system"),
(64, "entertainment_sport", 12, "system"),
(65, "entertainment_gadgets", 12, "system");