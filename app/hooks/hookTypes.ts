/************************ useAuth types ************************/
export type useSignTypes = {
  setMsg: Function;
  setIsLoading: Function;
  setIsMailSent?: Function;
  router?: any;
};

/************************ useContainer types ************************/

export type createContainerTypes = {
  userId: string;
  serialNumber: string;
  location: any;
};

export type transferOwnerShipTypes = {
  contId: string;
  ownerId: string;
  viewerId: string;
};
export type removeViewer = {
  contId: string;
  userId: string;
};

export type updateContainerInfoTypes = {
  id: string;
  name: string;
  size: string;
  height: string;
};

export type useUpdateContainerTypes = {
  setAlertMsg: Function;
  setIsLoading: Function;
  setPage: Function;
};

export type updatePrivateModeTypes = {
  id: string;
  private_mode: boolean;
};

export type updateManualModeTypes = {
  id: string;
  manual_mode: boolean;
};

/************************ useUser types ************************/
export type userTypes = {
  id: string;
  name?: string;
  phone?: number;
  profileUrl?: string;
};
