import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Checkbox } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useForm } from "antd/lib/form/Form";
import data from './mockData.json';
import { IEntityField } from "../typeDefinitions/entity";



const initialData: IEntityField[] = data[0].fields;

const EntityTable: React.FC = () => {
  const [data, setData] = useState<IEntityField[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();

  const columns = [
    { title: "Name", dataIndex: "fname" },
    { title: "Field type", dataIndex: "type" },
    {
      title: 'Add to entity',
      key: 'included',
      dataIndex: 'included',
      render: (_:any, record:IEntityField) => (
          <Checkbox
              checked={record.included}
              onChange={() => { console.log(record) }} />
      ),
  },
  {
      title: 'Mandatory',
      key: 'mandatory',
      dataIndex: 'mandatory',
      render: (_:any, record:IEntityField) => (
          <Checkbox
              checked={record.mandatory}
              onChange={() => { console.log(record) }} />
      ),
  },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newRow: IEntityField = {
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

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add New Row
      </Button>

      <Table dataSource={data} columns={columns} rowKey="id" />

      <Modal
        title="Add New Row"
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

export default EntityTable;
