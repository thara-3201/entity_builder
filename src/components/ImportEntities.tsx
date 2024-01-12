import React, { useState } from "react";
import type { IEntity, IEntity_with_TotalFields } from "../typeDefinitions/entity";
import { DynamicTable } from "./utlis";
import data from './mockData.json';

// interface TableProps {
//     data: IEntity_with_TotalFields[];
//     // onAddRow: (newRow: TableRow) => void;
// }

const Entity_with_totalFields = (source: IEntity[]) => {
    let jsonData: IEntity_with_TotalFields[] = []
    source.map(x => {
        const newData = {
            ...x,
            totalFields: x.fields.length
        }
        jsonData.push(newData)
    })
    return jsonData
}
const listData = Entity_with_totalFields(data)

const ImportEntites = () => {
    const [isAddingRow, setIsAddingRow] = useState(false);
    const [selectedEntities, setselectedEntities] = useState<Partial<IEntity_with_TotalFields>>({});
    const [newRowValues, setNewRowValues] = useState<Partial<IEntity_with_TotalFields>>({});
    // const handleAddRow = () => {
    //   const newRow: TableRow = {
    //     id: data.length + 1,
    //     name: newRowValues.name || "",
    //     age: newRowValues.age || 0,
    //   };

    //   // onAddRow(newRow);
    //   setNewRowValues({});
    //   setIsAddingRow(false);
    // };

    return (
        <div className="container mx-auto mt-8 p-4">
            <DynamicTable
                jsonData={listData} />
            {isAddingRow && (
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4"
                // onClick={handleAddRow}
                >
                    Save
                </button>
            )}

        </div>
    );
};

export default ImportEntites;
