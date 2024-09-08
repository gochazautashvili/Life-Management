"use client";
import { User } from "@prisma/client";
import React, { createContext, ReactNode } from "react";

interface Props {
  value: User | null;
  children: ReactNode;
}

export const UserContext = createContext<User | null>(null);

const UserProvider = ({ children, value }: Props) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
