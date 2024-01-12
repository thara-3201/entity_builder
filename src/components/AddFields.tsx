import React, { useState } from "react";
import { Space, Table, Input, Checkbox, Button, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { IEntityField } from "../typeDefinitions/entity";
import data from './mockData.json';

import type { FormInstance } from 'antd/es/form';

const EditableContext = React.createContext<FormInstance<any> | null>(null);


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    adding: boolean;
    dataIndex: string;
    title: any;
    record: IEntityField;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    adding,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
}) => {

    return (
        <td {...restProps}>
            {adding ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditField_Entity: React.FC = () => {
    const [form] = Form.useForm();
    const [addFieldKey, setAddingFieldKey] = useState('');

    const isAdding = (record: IEntityField) => record.fname === addFieldKey;

    const listData = data[0].fields
    const [dataSource, setDataSource] = useState<IEntityField[]>(listData)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'fname',
            key: 'name',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Field type',
            dataIndex: 'type',
            key: 'field_type',
        },
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

    const addingRow = (record: Partial<IEntityField> & { key: React.Key }) => {
        // form.setFieldsValue({ fname: '', type: '', mandatory: true, included: true,...record });
        setAddingFieldKey("x");
    };

    const handleAdd = () => {
        const record:any = {
            fname: 'x',
            type: '',
            mandatory: true,
            included: true,
            key:'x'
        };
        setDataSource([...dataSource, record]);
        addingRow(record)
    };

    return (
        <>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                Add a row
            </Button>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                columns={columns}
                dataSource={dataSource} />
        </>)
}

export default EditField_Entity;