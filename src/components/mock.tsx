import React, { useState, useRef } from "react";
import { Table, Button, Input, Form } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ColumnType } from "antd/lib/table/interface";

interface IDataItem {
  id: number;
  name: string;
  age: number;
}

const EditableTable: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>([
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Doe", age: 30 },
  ]);
  const formRef = useRef<any>();

  const columns  = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name", editable: true },
    { title: "Age", dataIndex: "age", editable: true },
  ];

  const EditableCell: React.FC<any> = ({
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "text" ? <Input /> : null;

    return (
      <td {...restProps}>
        {record.id === data.length + 1 ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            initialValue={record[dataIndex]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const handleAddRow = () => {
    const newRow: IDataItem = { id: data.length + 1, name: "", age: 0 };
    setData([...data, newRow]);
    formRef.current?.setFieldsValue(newRow); // Set form values for the newly added row
  };

  return (
    <div>
      <Button onClick={handleAddRow} type="primary" style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      <Table
        dataSource={data}
        columns={columns.map((col) => ({
          ...col,
          onCell: (record: IDataItem) => ({
            record,
            inputType: "text",
            dataIndex: col.dataIndex, // as keyof IDataItem,
            title: col.title,
          }),
        }))}
        rowKey="id"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
      <Form ref={formRef} style={{ display: "none" }} />
    </div>
  );
};

export default EditableTable;
