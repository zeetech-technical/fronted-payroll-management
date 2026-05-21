import { useEffect } from "react";
import { GeneralPayroll, UsersPayroll } from "../../components/graphics";
import { useTabuladorStore } from "../../store";
import { useCan } from "../../hooks/useCan";

export const DashboardPage = () => {
  const { getTabuladorAllStats, statsTabulador, getTabuladorUserStats } =
    useTabuladorStore((state) => state);
  const { can } = useCan();

  const handleExecuteGetStats = async () => {
    if (can("DASHBOARD:ADMINISTRATOR")) {
      await getTabuladorAllStats();
    }
    if (can("DASHBOARD:WORKERS")) {
      await getTabuladorUserStats();
    }
  };
  useEffect(() => {
    handleExecuteGetStats();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {can("DASHBOARD:ADMINISTRATOR") && (
        <>
          <GeneralPayroll
            data={statsTabulador.length > 0 ? statsTabulador : []}
          />
          <UsersPayroll
            data={statsTabulador.length > 0 ? statsTabulador : []}
          />
        </>
      )}
      {can("DASHBOARD:WORKERS") && (
        <>
          <GeneralPayroll
            data={statsTabulador.length > 0 ? statsTabulador : []}
          />
        </>
      )}
    </div>
  );
};
