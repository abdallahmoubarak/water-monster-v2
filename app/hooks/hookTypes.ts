import { setAlertMsgType } from "./../types/common";
/************************ useAuth types ************************/
export type useSignType = {
  setMsg: Function;
  setIsLoading: Function;
};

/************************ useContainer types ************************/

export type createContainerType = {
  id: string;
  name: string;
  size: string;
  address: string;
  date: string;
};

export type updateContainerType = {
  id: string;
  name: string;
  size: string;
};

export type useUpdateContainerType = {
  setPage: Function;
  setIsLoading: Function;
};

export type updatePrivateModeType = {
  id: string;
  private_mode: boolean;
};

export type updateManualModeType = {
  id: string;
  manual_mode: boolean;
};

/************************ useMessages types ************************/

export type createMessageType = {
  from: string;
  to: string;
  content: string;
};

export type useGetMessagesType = {
  me: string;
  other: string;
  enabled?: boolean;
};

/************************ useUser types ************************/
export type userType = {
  id: string;
  name?: string;
  phone?: string;
};
