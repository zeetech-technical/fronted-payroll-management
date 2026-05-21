
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Empty } from "../empty/empty";
interface Props {
  data: any[];
}
export const UsersPayroll = ({ data }: Props) => {
  const chartData = data.map((item) => {
    const calc = item.calcs?.[0];

    return {
      usuario: item.position?.user?.name || "Sin usuario",
      puesto: item.position?.name || "Sin puesto",

      sueldoBase: Number(calc?.sueldoBase || 0).toFixed(2),
      deducciones: Number(calc?.totalDeducciones || 0).toFixed(2),
      percepciones: Number(calc?.totalPercepciones || 0).toFixed(2),
      neto: Number(calc?.total || 0).toFixed(2),
    };
  });
  const baseContainer = data.length > 0 ? "w-full h-[800px] p-4" : "w-full p-4";

  return (
    <div className={`${baseContainer}`}>
      <h2 className="text-xl font-semibold mb-4">Nómina por empleado</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="usuario" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sueldoBase" name="Sueldo Base" fill="#0d9488" />
          <Bar dataKey="neto" name="Sueldo Total" fill="#184D3F" />
          <Bar dataKey="percepciones" name="Percepciones" fill="#02B340" />
          <Bar dataKey="deducciones" name="Deducciones" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
      ):
      (
        <Empty title="No hay datos" subtitle="Ups! parece que no hay datos que mostrar en este momento." />
      )}
    </div>
  );
}
