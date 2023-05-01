/************************ useAuth types ************************/
export type useSignTypes = {
  setMsg: Function;
  setIsLoading: Function;
};

/************************ useContainer types ************************/

export type createContainerTypes = {
  userId: string;
  serialNumber: string;
  location: any;
};

export type updateContainerTypes = {
  id: string;
  name: string;
  size: string;
  height: string;
  threshold: number;
};

export type useUpdateContainerTypes = {
  setPage: Function;
  setIsLoading: Function;
};

export type updatePrivateModeTypes = {
  id: string;
  private_mode: boolean;
};

export type updateManualModeTypes = {
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
export type userTypes = {
  id: string;
  name?: string;
  phone?: string;
  profile_url?: string;
};
