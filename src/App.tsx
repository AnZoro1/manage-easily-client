import React, { useEffect, useState } from 'react';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import { Layout, Space, Avatar, Badge, Menu, theme } from 'antd';
import { UserOutlined, VideoCameraOutlined, } from '@ant-design/icons';
import { CreateObject, ListObjectCards } from './modules/Objects';
import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './features/store/store';
import { useDispatch } from 'react-redux';
import { logOut } from './modules/Authorization/LoginOwner/slice/OwnerLoginSlice';



const App: React.FC = () => {
  const { Header, Footer, Sider, Content } = Layout;
  const dispatch = useDispatch()
  const authToken = useSelector((state: RootState) => state.OwnerLoginSlice.token)

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: '100%',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
  };

  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
  };

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <>
      {!authToken && <AuthorizationPage />}
      {authToken && <>
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <Layout style={{ height: '100vh' }}>
            <Header style={headerStyle}>
              Header
              <Space size={24}>
                <Badge>
                  <Avatar icon={<UserOutlined />} />
                </Badge>
              </Space>
            </Header>
            <Layout hasSider>
              <Sider style={siderStyle}>
                <Menu
                  theme="light"
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  items={[
                    {
                      key: 'objectsList',
                      icon: <UserOutlined />,
                      label: <NavLink to="/">Список объектов</NavLink>,
                    },
                    {
                      key: 'createObject',
                      icon: <VideoCameraOutlined />,
                      label: <NavLink to="/createObject">Создать объект</NavLink>,
                    },
                    {
                      key: 'logOut',
                      icon: <VideoCameraOutlined />,
                      label: <div onClick={handleLogOut}>выйти</div>,
                    },
                  ]}
                />
              </Sider>
              <Content style={contentStyle}>
                <Routes>
                  <Route path='/' element={<ListObjectCards />} />
                  <Route path='/createObject' element={<CreateObject />} />
                </Routes>
              </Content>
            </Layout>
            <Footer style={footerStyle}>Footer</Footer>
          </Layout>
        </Space>
      </>
      }
    </>
  );
};

export default App;
