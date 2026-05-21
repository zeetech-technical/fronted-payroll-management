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


export const GeneralPayroll = ({ data }) => {
  const summary = data.reduce(
    (acc, item) => {
      const calc = item.calcs?.[0];
      console.log(calc);

      acc.sueldoBase += calc?.sueldoBase || 0;
      acc.deducciones += calc?.totalDeducciones || 0;
      acc.percepciones += calc?.totalPercepciones || 0;
      acc.neto += calc?.total || 0;

      return acc;
    },
    {
      sueldoBase: 0,
      deducciones: 0,
      neto: 0,
      percepciones: 0,
    },
  );

  const chartData = [
    {
      name: "Nómina General",
      sueldoBase: summary.sueldoBase,
      deducciones: summary.deducciones,
      percepciones: summary.percepciones,
      neto: summary.neto,
    },
  ];
  const baseContainer = data.length > 0 ? "w-full h-[600px] p-4" : "w-full p-4";

  return (
    <div className={`${baseContainer}`}>
      <h2 className="text-xl font-semibold mb-4">Resumen General de Nominal</h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-teal-900 rounded-lg p-4 text-white">
          <p className="text-sm ">Sueldo Base</p>

          <p className="text-2xl font-bold">
            ${summary.sueldoBase.toLocaleString()}
          </p>
        </div>

        <div className="bg-green-600 rounded-lg p-4 text-white">
          <p className="text-sm ">Percepciones Totales</p>

          <p className="text-2xl font-bold">
            ${summary.percepciones.toLocaleString()}
          </p>
        </div>

        <div className="bg-red-600 rounded-lg p-4 text-white">
          <p className="text-sm ">Deducciones Totales</p>
          <p className="text-2xl font-bold  ">
            ${summary.deducciones.toLocaleString()}
          </p>
        </div>

        <div className="bg-emerald-900 rounded-lg p-4 text-white">
          <p className="text-sm ">Sueldo Total</p>
          <p className="text-2xl font-bold  ">
            ${summary.neto.toLocaleString()}
          </p>
        </div>
      </div>

      {data.length > 0 ? (
      <ResponsiveContainer width="100%" height="60%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sueldoBase" name="Sueldo Base" fill="#0d9488" />
          <Bar dataKey="deducciones" name="Deducciones" fill="#dc2626" />
          <Bar dataKey="percepciones" name="Percepciones" fill="#02B340" />
          <Bar dataKey="neto" name="Sueldo Total" fill="#184D3F" />
        </BarChart>
      </ResponsiveContainer>
      ) :
      (
        <Empty title="No hay datos" subtitle="Ups! parece que no hay datos que mostrar en este momento." />
      )}
    </div>
  );
}
