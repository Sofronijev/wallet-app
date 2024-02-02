import { apiSlice } from "./apiSlice";

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
  }),
});
export const { useCreateNewTransferMutation } = transfersApi;
