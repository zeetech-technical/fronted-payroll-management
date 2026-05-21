import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { TabuladorService } from "../services";

export interface TabuladorState {
  tabuladores: any[];
  getTabuladores: () => Promise<void>;
  createTabuladorConfig: (data: any) => Promise<void>;
}

export const storeTabuladorApi: StateCreator<TabuladorState> = (set) => ({
  tabuladores: [],
  getTabuladores: async () => {
    try {
      const tabuladores = await TabuladorService.getAllTabulador();
      set({ tabuladores });
    } catch (error) {
      set({ tabuladores: [] });
      throw new Error("Error al obtener tabuladores");
    }
  },
  createTabuladorConfig: async (data: any) => {
    try {
      await TabuladorService.createTabuladorConfig(data);

      // set((state) => ({ tabuladores: [...state.tabuladores, newTabuladorConfig] }));
    } catch (error) {
      throw new Error("Error al agregar tabulador");
    }
  },
});

export const useTabuladorStore = create<TabuladorState>()(
  devtools(storeTabuladorApi),
);
