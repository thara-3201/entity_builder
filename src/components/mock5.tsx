import React, { useState } from "react";

interface TableRow {
  id: number;
  name: string;
  age: number;
}

interface TableProps {
  data: TableRow[];
  onAddRow: (newRow: TableRow) => void;
}

const Table: React.FC<TableProps> = ({ data, onAddRow }) => {
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [newRowValues, setNewRowValues] = useState<Partial<TableRow>>({});

  const handleAddRow = () => {
    const newRow: TableRow = {
      id: data.length + 1,
      name: newRowValues.name || "",
      age: newRowValues.age || 0,
    };

    onAddRow(newRow);
    setNewRowValues({});
    setIsAddingRow(false);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4"
        onClick={() => setIsAddingRow(true)}
      >
        Add New Row
      </button>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{row.id}</td>
              <td className="border px-4 py-2">{row.name}</td>
              <td className="border px-4 py-2">{row.age}</td>
            </tr>
          ))}

          {isAddingRow && (
            <tr>
              <td className="border px-4 py-2">{data.length + 1}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  className="w-full border rounded py-1 px-2"
                  placeholder="Enter Name"
                  value={newRowValues.name || ""}
                  onChange={(e) => setNewRowValues({ ...newRowValues, name: e.target.value })}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  className="w-full border rounded py-1 px-2"
                  placeholder="Enter Age"
                  value={newRowValues.age || ""}
                  onChange={(e) => setNewRowValues({ ...newRowValues, age: +e.target.value })}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isAddingRow && (
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4"
          onClick={handleAddRow}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Table;
