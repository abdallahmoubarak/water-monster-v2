import { graphQLClient } from "@/utils/graphQLInstance";
import { gql } from "graphql-request";
import { useSignTypes } from "../hookTypes";
import { useMutation } from "@tanstack/react-query";

const sendMagicLinkMutation = gql`
  mutation Mutation($email: String!) {
    sendMagicLink(email: $email) {
      message
      success
    }
  }
`;

const sendMagicLink = async ({ email }: { email: string }) => {
  const res: any = await graphQLClient.request(sendMagicLinkMutation, {
    email,
  });
  return res;
};

export const useSendMagicLinkMutation = ({
  setMsg,
  setIsLoading,
  setIsMailSent,
}: useSignTypes) => {
  return useMutation(sendMagicLink, {
    onSuccess: ({ message }) => {
      setMsg(message);
      setIsMailSent && setIsMailSent(true);
    },
    onError: (err: Error) => {
      setMsg(err.message.split(":")[0]);
      setIsLoading(false);
    },
  });
};
