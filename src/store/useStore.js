import React from 'react';
import { create } from "zustand";

const useStore = create((set) => ({
  user,
  setUser=> set({ user }),
}));

export default useStore;
