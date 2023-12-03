import type { Item, User } from "@prisma/client";

export type ItemType = Item & {
  reportedBy: User;
  claimedBy: User | null;
};
