import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { PositionService } from "../services";

export interface PositionsState {
  positions: any[];
  getPositions: () => Promise<void>;
  createPosition: (data: any) => Promise<void>;
}

export const storePositionApi: StateCreator<PositionsState> = (set) => ({
  positions: [],
  getPositions: async () => {
    try {
      const positions = await PositionService.getAllPositions();
      set({ positions: positions.data });
    } catch (error) {
      set({ positions: [] });
      throw new Error("Error al obtener puestos");
    }
  },
  createPosition: async (data: any) => {
    try {
      const resp = await PositionService.createPosition(data);
      const position = resp.data;
      set((state) => ({ positions: [...state.positions, position] }));
    } catch (error) {
      throw new Error("Error al agregar puesto");
    }
  },
});

export const usePositionStore = create<PositionsState>()(
  devtools(storePositionApi),
);
