import { createContext } from "react";

export type UserState = {
  skip: number;
  take: number;
};

type UsersContext = {
  state: UserState;
  setState: (update: (state: UserState) => UserState) => void;
  refetch: () => void;
};

const usersContext = createContext<UsersContext>({} as UsersContext);

export default usersContext;
