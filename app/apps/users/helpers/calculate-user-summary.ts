/*import type { User } from "db";
type UserTotals = {
  nbPacks: number;
  nbGears: number;
  nbWishs: number;
};

type UserCardProps = {
  user: Pick<User, "id" | "username"> & { totals: UserTotals };
};*/

/*const calculateUserSummary = (user: User) => {*/
const calculateUserSummary = () => {
  let nbPacks = 0;
  let nbGears = 0;
  let nbWishs = 0;
  return {
    nbPacks,
    nbGears,
    nbWishs,
  };
};

export default calculateUserSummary;
