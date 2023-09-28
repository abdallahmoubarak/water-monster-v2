export type childrenProp = { children: React.ReactNode };

export type signTypes = {
  name?: string;
  email: string;
  password: string;
  phone?: number;
  userType?: string;
};

export type setAlertMsgType = {
  setAlertMsg: Function;
};
