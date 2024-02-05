import { apiSlice } from "./apiSlice";
import { TransactionType } from "store/reducers/monthlyBalance/monthlyBalanceSlice";

type CreateTransferRes = {
  message: string;
};

type CreateTransferReq = {
  userId: number;
  date: string;
  amountTo: number;
  amountFrom: number;
  walletIdTo: number;
  walletIdFrom: number;
};

type GetTransferByTransactionReq = {
  userId: number;
  transactionIdTo?: number;
  transactionIdFrom?: number;
};

type GetTransferByTransactionRes = {
  id: number;
  date: string;
  fromWalletId: number;
  toWalletId: number;
  fromTransaction: TransactionType;
  toTransaction: TransactionType;
};

export const transfersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewTransfer: builder.mutation<CreateTransferRes, CreateTransferReq>({
      query: (body: CreateTransferReq) => ({
        url: "/transfer/addTransfer",
        method: "POST",
        body,
      }),
      // TODO: Currently, this will fetch all wallets, make it so it only refetches wallet that had changed transaction
      invalidatesTags: ["Transactions", "Wallets"],
    }),
    getTransferByTransaction: builder.query<
      GetTransferByTransactionRes,
      GetTransferByTransactionReq
    >({
      query: (body: GetTransferByTransactionReq) => ({
        url: "/transfer/getByTransaction",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useCreateNewTransferMutation, useGetTransferByTransactionQuery } = transfersApi;
