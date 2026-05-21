import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { TabuladorService } from "../services";

export interface TabuladorState {
  tabuladores: any[];
  statsTabulador: any[];
  getTabuladores: () => Promise<void>;
  createTabuladorConfig: (data: any) => Promise<void>;
  getTabuladorAllStats: () => Promise<void>;
}

export const storeTabuladorApi: StateCreator<TabuladorState> = (set) => ({
  tabuladores: [],
  statsTabulador: [],
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
      const tabuladorCompleto = await TabuladorService.createTabuladorConfig(data);
      set((state) => ({tabuladores: [...state.tabuladores, tabuladorCompleto]}));
    } catch (error) {
      throw new Error("Error al agregar tabulador");
    }
  },

  getTabuladorAllStats: async () => {
    try {
      const statsTabulador = await TabuladorService.getTabuladorAllStats();
      set({ statsTabulador });
    } catch (error) {
      set({ statsTabulador: [] });
      throw new Error("Error al obtener estadisticas del tabulador");
    }
  }
});

export const useTabuladorStore = create<TabuladorState>()(
  devtools(storeTabuladorApi),
);
