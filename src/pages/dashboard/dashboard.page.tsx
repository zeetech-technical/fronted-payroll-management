import { useEffect } from "react";
import { GeneralPayroll, UsersPayroll } from "../../components/graphics";
import { useTabuladorStore } from "../../store";

export const DashboardPage = () => {
  const { getTabuladorAllStats, statsTabulador } = useTabuladorStore(
    (state) => state,
  );
  useEffect(() => {
    getTabuladorAllStats();
  }, []);

  return (
    <>
      <GeneralPayroll data={statsTabulador} />
      <UsersPayroll data={statsTabulador} />
    </>
  );
};
