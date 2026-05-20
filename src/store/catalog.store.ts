import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { CatalogService } from "../services/catalog.service";

export interface CatalogState {
  typeCatalogs: any[];
  catalogs: any[];
  getTypeCatalogs: () => Promise<void>;
  getCatalogs: () => Promise<void>;
  addCatalog: (catalog: {
    name: string;
    typeCatalogId: string;
  }) => Promise<void>;
  deleteCatalog: (id: number) => Promise<void>;
  restoreCatalog: (id: number) => Promise<void>;
}

export const storeCatalogApi: StateCreator<CatalogState> = (set) => ({
  typeCatalogs: [],
  catalogs: [],
  getTypeCatalogs: async () => {
    try {
      const typeCatalogs = await CatalogService.getTypeCatalogs();
      set({ typeCatalogs });
    } catch (error) {
      set({ typeCatalogs: [] });
      throw new Error("Error al obtener typeCatalogs");
    }
  },
  getCatalogs: async () => {
    try {
      const catalogs = await CatalogService.getCatalogs();
      set({ catalogs });
    } catch (error) {
      set({ catalogs: [] });
      throw new Error("Error al obtener catalogs");
    }
  },
  addCatalog: async (catalog) => {
    try {
      const newCatalog = await CatalogService.addCatalog({
        name: catalog.name,
        typeCatalogId: +catalog.typeCatalogId,
      });
      set((state) => ({ catalogs: [...state.catalogs, newCatalog] }));
    } catch (error) {
      throw new Error("Error al agregar catalog");
    }
  },
  deleteCatalog: async (id) => {
    try {
      await CatalogService.deleteCatalog(id);

      set((state) => ({
        catalogs: state.catalogs.map((catalog) => {
          if (catalog.id === id) {
            return {
              ...catalog,
              deletedAt: new Date().toISOString(),
            };
          }
          return catalog;
        }),
      }));
    } catch (error) {
      throw new Error("Error al eliminar catalog");
    }
  },
  restoreCatalog: async (id) => {
    try {
      await CatalogService.restoreCatalog(id);

      set((state) => ({
        catalogs: state.catalogs.map((catalog) => {
          if (catalog.id === id) {
            return {
              ...catalog,
              deletedAt: null,
            };
          }
          return catalog;
        }),
      }));
    } catch (error) {
      throw new Error("Error al restaurar catalog");
    }
  },
});

export const useCatalogStore = create<CatalogState>()(
  devtools(storeCatalogApi),
);
