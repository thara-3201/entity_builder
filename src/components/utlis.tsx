import React, { ReactNode } from 'react';

interface DuplicateCheckProps {
  data: any[];
  text: string;
}
// export const isDuplicate: React.FC<DuplicateCheckProps> = (data, text) =>  data.filter((item:any) => item.name === text).length > 1;

interface DynamicTableProps {
  jsonData: any[];
  children?: ReactNode;
}
export const DynamicTable: React.FC<DynamicTableProps> = ({jsonData, children} ) => {
  // Extracting column names from the first object in the JSON array
  const columns = Object.keys(jsonData[0]);
  console.log("columns", columns)
  return (
    <table>
      <thead className="table-auto w-full">
        <tr>
          {columns.map((colName) => (
            <th  className="border px-4 py-2" key={colName}>{colName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {jsonData.map((dataItem, index) => (
          <tr key={index}>
            {columns.map((colName) => (
              <td key={colName}>{renderCell(dataItem[colName])}</td>
            ))}
          </tr>
        ))}
        {children}
      </tbody>
    </table>
  );
};

const renderCell = (cellValue:any) => {
  // Check the type of the property and render accordingly
  if (Array.isArray(cellValue) || typeof cellValue === 'object') {
    // Render array values as comma-separated strings
    return null;
  } else {
    // Render other types directly
    return cellValue;
  }
};

// Example usage:
// const App = () => {
//   const jsonData = [
//     { id: 1, name: 'John', age: 25 },
//     { id: 2, name: 'Jane', age: 30 },
//     { id: 3, name: 'Doe', age: 22 },
//   ];

//   return (
//     <div>
//       <h1>Dynamic Table Example</h1>
//       <DynamicTable jsonData={jsonData} />
//     </div>
//   );
// };

// export default App;
