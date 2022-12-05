import { setAlertMsgType } from "./../types/common";
import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "pages/_app";
import {
  acceptRequestMutation,
  clientFillingRequestsQuery,
  createFillingRequestMutation,
  providerFillingRequestsQuery,
  requestsQuery,
  reserveRequestMutation,
  startFillingMutation,
} from "./gql/request";

/*********************** getting users requests ***********************/

const getRequests = async () => {
  const res = await graphQLClient.request(requestsQuery);
  return res?.requests;
};

export const useRequests = () => {
  return useQuery({
    queryKey: ["Requests"],
    queryFn: () => getRequests(),
  });
};

/*********************** accept user request ***********************/

const acceptRequest = async ({ id, state }: acceptRequestType) => {
  const variables = { id, state };
  const res = await graphQLClient.request(acceptRequestMutation, variables);
  return res?.requests;
};

export const useAcceptRequest = () => {
  return useMutation(acceptRequest, {
    onSuccess: () => client.invalidateQueries({ queryKey: ["Requests"] }),
    onError: (err: Error) => console.log(err.message),
  });
};

type acceptRequestType = {
  id: string;
  state: string;
};

/*********************** create Filling request ***********************/

const fillingRequest = async ({
  user_id,
  container_id,
}: fillingRequestType) => {
  const variables = { user_id, container_id };
  const res = await graphQLClient.request(
    createFillingRequestMutation,
    variables,
  );
  return res?.requests;
};

export const useFillingRequest = ({ setAlertMsg }: setAlertMsgType) => {
  return useMutation(fillingRequest, {
    onError: (err: Error) => console.log(err.message),
    onSuccess: () => setAlertMsg("Request done"),
  });
};

type fillingRequestType = {
  user_id: string;
  container_id: string;
};

/*********************** reserve Filling request ***********************/

const reserveRequest = async ({
  provider_id,
  request_id,
}: reserveRequestType) => {
  const variables = { provider_id, request_id };
  const res = await graphQLClient.request(reserveRequestMutation, variables);
  return res?.requests;
};

export const useReserveRequest = ({ setAlertMsg }: setAlertMsgType) => {
  return useMutation(reserveRequest, {
    onError: (err) => console.log(err),
    onSuccess: () => setAlertMsg("Reserved for you"),
  });
};

type reserveRequestType = {
  provider_id: string;
  request_id: string;
};

/*********************** start Filling  ***********************/

const startFilling = async ({
  provider_id,
  request_id,
  empty_level,
}: startFillingType) => {
  const variables = { provider_id, request_id, empty_level };
  const res = await graphQLClient.request(startFillingMutation, variables);
  return res?.requests;
};

export const useStartFilling = ({ setAlertMsg }: setAlertMsgType) => {
  return useMutation(startFilling, {
    onError: (err) => console.log(err),
    onSuccess: () => {
      setAlertMsg("Filling");
      client.refetchQueries(["MapContainers"]);
    },
  });
};

type startFillingType = {
  provider_id: string;
  request_id: string;
  empty_level: number;
};

/*********************** getting filling requests ***********************/

const getFillingRequests = async ({ id, userType }: getFillingRequestsType) => {
  const variables = { id };
  let res;
  switch (userType) {
    case "Provider":
      res = await graphQLClient.request(
        providerFillingRequestsQuery,
        variables,
      );
      break;
    case "Client":
      res = await graphQLClient.request(clientFillingRequestsQuery, variables);
      break;
  }
  return res?.requests;
};

export const useGetFillingRequests = ({
  id,
  userType,
  enabled,
}: useGetFillingRequestsType) => {
  return useQuery({
    queryKey: ["FillingHistory"],
    queryFn: () => getFillingRequests({ id, userType }),
    enabled,
  });
};

type getFillingRequestsType = {
  id: string;
  userType: string;
};

type useGetFillingRequestsType = {
  id: string;
  userType: string;
  enabled: boolean;
};
