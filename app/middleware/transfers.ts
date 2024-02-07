import { apiSlice } from "./apiSlice";
import { TransactionType } from "store/reducers/monthlyBalance/monthlyBalanceSlice";

type GenericResponse = {
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

type EditTransactionReq = {
  id: number;
  userId: number;
  date: string;
  amountTo: number;
  amountFrom: number;
  walletIdTo: number;
  walletIdFrom: number;
  transactionIdTo: number;
  transactionIdFrom: number;
};

type GetTransferReq = {
  userId: number;
  id?: number;
  transactionIdTo?: number;
  transactionIdFrom?: number;
};

type GetTransferRes = {
  id: number;
  date: string;
  fromWalletId: number;
  toWalletId: number;
  fromTransaction: TransactionType;
  toTransaction: TransactionType;
};

export const transfersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewTransfer: builder.mutation<GenericResponse, CreateTransferReq>({
      query: (body: CreateTransferReq) => ({
        url: "/transfer/addTransfer",
        method: "POST",
        body,
      }),
      // TODO: Currently, this will fetch all wallets, make it so it only refetches wallet that had changed transaction
      invalidatesTags: ["Transactions", "Wallets"],
    }),
    getTransferByTransaction: builder.query<GetTransferRes, GetTransferReq>({
      query: (body: GetTransferReq) => ({
        url: "/transfer/getTransfer",
        method: "POST",
        body,
      }),
    }),
    editTransfer: builder.mutation<GenericResponse, EditTransactionReq>({
      query: (body: EditTransactionReq) => ({
        url: "/transfer/setTransfer",
        method: "PUT",
        body,
      }),
      // TODO: Currently, this will fetch all wallets, make it so it only refetches wallet that had changed transaction
      invalidatesTags: ["Transactions", "Wallets"],
    }),
    deleteTransfer: builder.mutation<GenericResponse, { id: number; userId: number }>({
      query: (body: { id: number; userId: number }) => ({
        url: "/transfer/deleteTransfer",
        method: "DELETE",
        body,
      }),
      // TODO: Currently, this will fetch all wallets, make it so it only refetches wallet that had changed transaction
      invalidatesTags: ["Transactions", "Wallets"],
    }),
  }),
});
export const {
  useCreateNewTransferMutation,
  useGetTransferByTransactionQuery,
  useEditTransferMutation,
  useDeleteTransferMutation,
} = transfersApi;
