type Column<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  title?: string;
};

export const DataTable = <T,>({ data, columns, title }: Props<T>) => {
  return (
    <>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

          <span className="text-sm text-gray-400">{data.length} registros</span>
        </div>
      )}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div
          className="grid gap-4 px-5 py-3 border-b bg-gray-50 text-sm font-medium text-gray-600"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((column, index) => (
            <div key={index} className={column.className}>
              {column.header}
            </div>
          ))}
        </div>

        <div className="divide-y">
          {data.map((item, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4 px-5 py-4 items-center hover:bg-gray-50 transition"
              style={{
                gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
              }}
            >
              {columns.map((column, colIndex) => (
                <div key={colIndex} className={column.className}>
                  {column.render(item)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
