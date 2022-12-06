import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation } from "@tanstack/react-query";
import { client } from "pages/_app";
import {
  cashMutation,
  chargeWalletMutation,
  createWalletMutation,
  payMutation,
  withdrawMutation,
} from "./gql/wallet";
import { payType, useWalletType, walletType } from "./hookTypes";

/****************** create wallet  ******************/

const createWallet = async ({ id }: walletType) => {
  const variables = { id };
  const res = await graphQLClient.request(createWalletMutation, variables);
  return res;
};

export const useCreateWallet = ({
  setIsLoading,
  setAlertMsg,
}: useWalletType) => {
  return useMutation(createWallet, {
    onError: (err: Error) => console.log(err.message),
    onSuccess: () => {
      setIsLoading(false);
      client.refetchQueries(["User"]);
      setAlertMsg("Wallet created successfully!");
    },
  });
};

/****************** charge wallet  ******************/

const chargeWallet = async ({ id, amount }: walletType) => {
  const variables = { id, amount };
  const res = await graphQLClient.request(chargeWalletMutation, variables);
  return res;
};

export const useChargeWallet = ({
  setAlertMsg,
  setAmount,
  setIsLoading,
}: useWalletType) => {
  return useMutation(chargeWallet, {
    onError: (err: Error) => console.log(err.message),
    onSuccess: () => {
      setIsLoading(false);
      setAmount("");
      client.refetchQueries(["User"]);
      setAlertMsg("Charging done!");
    },
  });
};

/****************** charge wallet  ******************/

const withdrawWallet = async ({ id, amount }: walletType) => {
  const variables = { id, amount };
  const res = await graphQLClient.request(withdrawMutation, variables);
  return res;
};

export const useWithdrawMutation = ({
  setAlertMsg,
  setAmount,
  setIsLoading,
}: useWalletType) => {
  return useMutation(withdrawWallet, {
    onError: (err: Error) => console.log(err.message),
    onSuccess: () => {
      setIsLoading(false);
      setAmount("");
      client.refetchQueries(["User"]);
      setAlertMsg("Withdraw done!");
    },
  });
};

/****************** Pay Mutation  ******************/

const pay = async ({
  req_id,
  payer_wallet_id,
  payed_wallet_id,
  amount,
}: payType) => {
  const variables = { req_id, payer_wallet_id, payed_wallet_id, amount };
  const res = await graphQLClient.request(payMutation, variables);
  return res;
};

export const usePayMutation = ({
  setIsLoading,
  setAlertMsg,
}: useWalletType) => {
  return useMutation(pay, {
    onError: (err: Error) => console.log(err.message),
    onSuccess: () => {
      setIsLoading(false);
      setAlertMsg("Payment done!");
      client.refetchQueries(["FillingHistory"]);
    },
  });
};

/****************** Cash Mutation  ******************/

const cash = async ({ req_id }: { req_id: string }) => {
  const variables = { req_id };
  const res = await graphQLClient.request(cashMutation, variables);
  return res;
};

export const useCashMutation = ({
  setIsLoading,
  setAlertMsg,
}: useWalletType) => {
  return useMutation(cash, {
    onError: (err: Error) => console.log(err.message),
    onSuccess: () => {
      setIsLoading(false);
      setAlertMsg("Payment done!");
      client.refetchQueries(["FillingHistory"]);
    },
  });
};
