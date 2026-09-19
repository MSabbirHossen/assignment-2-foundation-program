import React, { createContext, useContext } from "react";
import { useShowModalState } from "../hooks/useShowModal";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const modal = useShowModalState();

  return (
    <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
