import React, { useState, useContext, useEffect, useRef, } from "react";
import { Space, Table, Checkbox, Form, Input } from 'antd';
import type { InputRef } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { IEntity, IEntity_with_TotalFields } from "../typeDefinitions/entity";
import data from './mockData.json';

import type { FormInstance } from 'antd/es/form';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

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


interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof IEntity_with_TotalFields;
    record: IEntity_with_TotalFields;
    handleSave: (record: IEntity_with_TotalFields) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};


interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const Entities_List: React.FC = () => {
    const listData = Entity_with_totalFields(data)
    const [dataSource, setDataSource] = useState<any[]>(listData)
    const [dataUpdated, setdataUpdated] =  useState<boolean>(false)
    const [selectedEntities, setselectedEntities] = useState<any[]>([])
    const defaultColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // render: (text) => <a>{text}</a>,
            editable: true,
            onCell: (record: any) => ({
                record,
                dataIndex: "name",
                title: "Name",
                inputType: "text",
                editable: true,
            }),
            render: (text: any, record: any) => {
                const isDuplicate = data.filter((item) => item.name === text).length > 1;
                return isDuplicate ? <span style={{ color: "red" }}>{text}</span> : text;
            },
        },
        {
            title: 'Total Fields',
            dataIndex: 'totalFields',
            key: 'totalFields',
        },
        {
            title: 'Import Select',
            key: 'import',
            dataIndex: '',
            render: (text: any, record: any) => (
                <Checkbox 
                // disabled={data.filter((item) => item.name === text).length > 1 ? true : false}
                onChange={() => { 
                    handleSelectedEntities(record) 
                }} />
            ),
        },
    ];

    const handleSave = (row: any) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
        setdataUpdated(true)
    };



    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const [stateColumns, setColumns] = useState(columns)
    useEffect(() => {
        // Create new columns based on dataSource
        // console.log("useeffect columns")
        const newColumns = columns;
       
        setColumns(newColumns);
    }, [dataSource]);

    const handleSelectedEntities = (record:any) => {
        const selected = [...selectedEntities, record]
        setselectedEntities(selected)
        // add checked entites here and pass it to the next step
    }
    return (
        <>
            <Table
                components={components}
                columns={stateColumns} dataSource={dataSource} />
        </>)
}

export default Entities_List;
