import { Layout, Menu, Breadcrumb } from 'antd';
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { 
  UserOutlined, 
  PieChartOutlined, 
  DesktopOutlined ,
  TeamOutlined,
  FileOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const AppLayout = (props) => {
  const [date, setDate] = useState(null);
   
  return (
    <>
   <Layout style={{ minHeight: '100vh' }}>
        <Sider >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={props.current} mode="inline">
            <Menu.Item key="Home" icon={<PieChartOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="User" icon={<DesktopOutlined />}>
              <Link to="/user">User</Link>
            </Menu.Item>
            <Menu.Item key="Leave" icon={<FileOutlined />}>
             <Link to="/leave">Leave</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;