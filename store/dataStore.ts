import {create} from "zustand";

export const useStore = create<any>((set:any) => ({
  pageLang: "it",
  setPageLang: (pageLang) => {
    set({pageLang})
  }
}));
