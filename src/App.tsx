import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, Divider } from 'antd';
import React, { useState }  from 'react';
import FormSteps from './components/layout';
import Entities_List from './components/EntitiesList';
import EditField_Entity from './components/AddFields';
import EditableTable from './components/mock';
import EntityTable from './components/mock3';
import DuplicateRows from './components/mock4';
import Table from './components/mock5';
import ImportEntites from './components/ImportEntities';

const { Header, Content, Footer, Sider } = Layout;

interface TableRow {
  id: number;
  name: string;
  age: number;
}

const data = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Doe', age: 22 },
]

const App: React.FC = () => {
  const [listData, setNewList] = useState<TableRow[]>(data);
  return (
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
          (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }),
        )}
      />
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}>
          <Entities_List />
          {/* <br></br> */}
          <Table data={listData} onAddRow={(newRow) => setNewList([...listData, newRow])} />
          <Divider plain>Next Step</Divider>
          {/* <br></br> */}
          {/* <Divider plain>Next Step</Divider> */}
         {/* <ImportEntites /> */}
          {/* <br></br> */}
          <br></br>
          <EntityTable />
          <Divider plain>Next Step</Divider>
          <br></br>
          <br></br>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
)};

export default App;