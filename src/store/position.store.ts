import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { PositionService } from "../services";
import { useTabuladorStore } from "./tabulador.store";

export interface PositionsState {
  positions: any[];
  selectPositiosns: any[];
  getPositions: () => Promise<void>;
  createPosition: (data: any) => Promise<void>;
  deletePosition: (id: number) => Promise<void>;
  restorePosition: (id: number) => Promise<void>;
  assignToTab: (data: any) => Promise<void>;
  selectPositionToTab: () => Promise<void>;
  selectPositionUserAvailable: () => Promise<void>;
}

export const storePositionApi: StateCreator<PositionsState> = (set) => ({
  positions: [],
  selectPositiosns: [],
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
  deletePosition: async (id: number) => {
    try {
      await PositionService.deletePosition(id);
      set((state) => ({
        positions: state.positions.map((position) => {
          if (position.id === id) {
            return {
              ...position,
              deletedAt: new Date().toISOString(),
            };
          }
          return position;
        }),
      }));
    } catch (error) {
      throw new Error("Error al eliminar puesto");
    }
  },
  restorePosition: async (id: number) => {
    try {
      await PositionService.restorePosition(id);
      console.log("here");
      set((state) => ({
        positions: state.positions.map((position) => {
          console.log({ position, id });
          if (position.id === id) {
            return {
              ...position,
              deletedAt: null,
            };
          }
          return position;
        }),
      }));
    } catch (error) {
      throw new Error("Error al restaurar puesto");
    }
  },
  assignToTab: async (data: any) => {
    try {
      const resp: any = await PositionService.assignToTab(data);   
      let tabuladores = useTabuladorStore.getState().tabuladores
      let newTabuladores = tabuladores.map((tabulador: any) => {
        if (tabulador.id === resp.id) {
          return resp
        }
        return tabulador
      })
      
      useTabuladorStore.setState({ tabuladores: newTabuladores });
    } catch (error) {
      throw new Error("Error al asignar puesto a tabulador");
    }
  },

  selectPositionToTab: async () => {
    try {
      const positions = await PositionService.selectPositionToTab();
      console.log(positions);
      
      set({ selectPositiosns: positions.data });
    } catch (error) {
      set({ selectPositiosns: [] });
      throw new Error("Error al obtener puestos");
    }
  },

  selectPositionUserAvailable: async () => {
    try {
      const positions = await PositionService.selectPositionUserAvailable();   
      set({ selectPositiosns: positions.data });
    } catch (error) {
      set({ selectPositiosns: [] });
      throw new Error("Error al obtener puestos");
    }
  },
});

export const usePositionStore = create<PositionsState>()(
  devtools(storePositionApi),
);
