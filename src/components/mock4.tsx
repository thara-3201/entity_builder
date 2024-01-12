import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useForm } from "antd/lib/form/Form";

interface IDataItem {
  id: number;
  name: string;
  age: number;
}

const initialData: IDataItem[] = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Doe", age: 30 },
  { id: 3, name: "John Doe", age: 25 }, // Duplicate entry
];

const DuplicateRows: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      onCell: (record: IDataItem) => ({
        record,
        dataIndex: "id",
        title: "ID",
        inputType: "text",
        editable: true,
      }),
    },
    {
      title: "Name",
      dataIndex: "name",
      onCell: (record: IDataItem) => ({
        record,
        dataIndex: "name",
        title: "Name",
        inputType: "text",
        editable: true,
      }),
      render: (text:any, record:any) => {
        const isDuplicate = data.filter((item) => item.name === text).length > 1;
        return isDuplicate ? <span style={{ color: "red" }}>{text}</span> : text;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      onCell: (record: IDataItem) => ({
        record,
        dataIndex: "age",
        title: "Age",
        inputType: "number",
        editable: true,
      }),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newRow: IDataItem = {
          id: data.length + 1,
          ...values,
        };

        setData([...data, newRow]);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  

  const handleDoubleClick = (text: string, record: IDataItem, dataIndex: keyof IDataItem) => {
    const isDuplicate = data.filter((item) => item[dataIndex] === text).length > 1;
    if (isDuplicate) {
      setIsModalVisible(true); // Open modal for editing on double-click
      form.setFieldsValue({
        ...record,
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add New Row
      </Button>

      <Table
        dataSource={data}
        columns={columns.map((col) => ({
            ...col,
            onCell: (record: IDataItem) => col.onCell(record),
            onDoubleClick: (event:any, record:any) => {
              const text = event.target.innerHTML;
              const dataIndex = event.target.getAttribute("data-index") as keyof IDataItem;
              handleDoubleClick(text, record, dataIndex);
            },
          }))
          
        }
        rowKey="id"
      />

      <Modal
        title="Edit Row"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          {columns.map((col) => (
            <Form.Item key={col.dataIndex} label={col.title} name={col.dataIndex}>
              <Input />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default DuplicateRows;
