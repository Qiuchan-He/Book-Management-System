import React from 'react';
import {DownOutlined} from '@ant-design/icons';
import {Layout as AntdLayout, Menu, Dropdown,Space, Modal} from 'antd';
import logoImg from "../../assets/images/logo.jpg"
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {useCurrentUser} from "../../utils/hoos.js"
import "./style.less"

const { Header, Content, Sider } = AntdLayout;

const USER_ROLE ={
  ADMIN : "admin",
  USER : "user",
}

const listItems = [
  {
    label: 'Book Management',
    key: 'book',
    children: [
      {label:"Book List", 
       key:"/book",
       role:USER_ROLE.USER
    },
      {label:"Add Book", 
       key:"/book/add",
       role:USER_ROLE.ADMIN
      }
    ]
  },
  {
    label: 'Borrow Management',
    key: 'borrow',
    children: [
      {label:"Borrow List", key:"/borrow", role: USER_ROLE.USER},
      {label:"Add Borrow", key:"/borrow/add", role: USER_ROLE.ADMIN}
    ]
  },
  {
    label: 'Category Management',
    key: 'category',
    children: [
      {label:"Category List", key:"/category", role: USER_ROLE.USER},
      {label:"Add Category", key:"/category/add", role: USER_ROLE.ADMIN}
    ]
  },
  {
    label: 'User Management',
    key: 'user',
    children: [
      {label:"User list", key:"/user", role: USER_ROLE.ADMIN},
      {label:"Add User", key:"/user/add", role: USER_ROLE.ADMIN}
    ] 
  },
]

const Layout = (props)=>{
    
    const navigate = useNavigate();
    const location = useLocation();
    const activeMenu = location.pathname;
    const defaultOpenKeys = [activeMenu.split("/")[1]]
    const user= useCurrentUser()
    //console.log(user);
    

    const items = [
      {
        key: '1',
        label: <Link to={`/user/edit`}>Mine</Link> 
      },
      {
        key: '2',
        label: <span onClick={handleLogOut}>Log out</span>
    
      }
    ]

    function handleMenuClick(item){
      const {key} = item
      navigate(key)
    }

    function handleLogOut(){
      Modal.confirm({
        title: "Are you sure you want to log out",
        okText: "Yes",
        cancelText: "Cancel",
        async onOk(){
           navigate("/login")
          }
        })
    }

    return(
      <AntdLayout>
      <Header className='layout-header'>
        <img src={logoImg} width={30} height={30} className="logo" alt=""/>
        Book-Management-System
        <span className='user'>
          <Dropdown menu={{items}}>
          <span onClick={(e) => e.preventDefault()}>
            <Space>
              {user?.nickName}
              <DownOutlined />
            </Space>
          </span>
          </Dropdown>
        </span>
      </Header>
      <AntdLayout className="layout-container">
        <Sider width={200} className='sider'>
          <Menu
            mode="inline"
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={[activeMenu]}
            items={listItems}
            onClick={handleMenuClick}
            className='menu'
          />
        </Sider>
          <Content className='layout-content' >
            {props.children}
          </Content>
      </AntdLayout>
      </AntdLayout>
    )
}

export default Layout