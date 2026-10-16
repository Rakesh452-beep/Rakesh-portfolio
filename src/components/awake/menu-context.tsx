"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type MenuContextValue = {
  open: boolean;
  toggle: () => void;
  setOpen: (value: boolean) => void;
  close: () => void;
};

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((value) => !value), []);

  const value = useMemo(() => ({ open, toggle, setOpen, close }), [open, toggle, close]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used inside a MenuProvider");
  return context;
}
