import { useAuthStore } from "../store";

export const useCan = () => {
  const permissions = useAuthStore((state) => state.permissions);
  const can = (slug: string) => {
    return permissions.includes(slug);
  }
  return { can };
};