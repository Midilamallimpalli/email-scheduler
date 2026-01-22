import React from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
}

function Table<T extends { id: string | number }>({ columns, data }: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#2a2a2a] text-left text-sm text-gray-400">
            {columns.map((col) => (
              <th key={String(col.key)} className="py-3 px-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[#1f1f1f] hover:bg-[#1a1a1a]"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="py-3 px-3 text-sm">
                  {col.render
                    ? col.render(row)
                    : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
