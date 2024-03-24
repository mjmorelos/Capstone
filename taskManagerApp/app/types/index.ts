import { users } from "@prisma/client";

export type SafeUser = Omit<users, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
