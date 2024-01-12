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

  const [editingId, setEditingId] = useState<number | null>(null);

  const isEditing = (record: IDataItem) => record.id === editingId;

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
    {
      title: "Action",
      dataIndex: "action",
      render: (_text:any, record:any) => {
        debugger
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => handleSave(record.id)} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </span>
        ) : (
          <Button onClick={() => handleEdit(record.id)} disabled={editingId !== null}>
            Edit
          </Button>
        );
      },
    },
  ];

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number) => {
    const newData = [...data];
    const index = newData.findIndex((item) => id === item.id);
    const item = newData[index];

    const updatedItem = formRef.current?.getFieldsValue();
    if (id === data.length + 1) {
      // For new row, add it to the data array
      newData.push({
        id: data.length + 1,
        ...updatedItem,
      });
    } else {
      // For existing rows, update the existing item
      newData[index] = { ...item, ...updatedItem };
    }

    setData(newData);
    setEditingId(null);
    formRef.current.resetFields();
  };

  const handleCancel = () => {
    setEditingId(null);
    formRef.current.resetFields();
  };

  const formRef = React.createRef<any>();

  const handleAddRow = () => {
    const newRow: IDataItem = { id: data.length + 1, name: "", age: 0 };
    setData([...data, newRow]);
    setEditingId(newRow.id);
  };

  const EditableCell: React.FC<any> = ({
    editing,
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
        {editing ? (
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
  
  

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const columnsWithEdit = columns.map((col) => {
    return {
      ...col,
      onCell: (record: IDataItem) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    } as ColumnType<IDataItem>;
  });

  return (
    <div>
      <Button onClick={handleAddRow} type="primary" style={{ marginBottom: 16 }}>
        Add Row
      </Button>
      <Table
        components={components}
        rowKey="id"
        bordered
        dataSource={data}
        columns={columnsWithEdit.filter((col) => col.dataIndex !== "action")}
      />
    </div>
  );
};

export default EditableTable;
