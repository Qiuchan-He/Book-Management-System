import React,{useState, useEffect} from 'react'
import Layout from "../../components/Layout"
import Content from "../../components/Content"
import { Button, Form, Input, Select,Col, Row, Table,Space, Tag, Modal, message } from 'antd'; 
import {useNavigate} from'react-router-dom'
import dayjs from "dayjs"
import { getUserList, userDelete,userUpdate} from '../../api/api.js';
import "./style.less"



const STATUS_OPTIONS = [
  {
    label:"normal",
    value:'on'
  },
  {
    label:"disable",
    value:'off'
  }
]


const COLUMNS = [
  {
    title: 'Account',
    dataIndex: 'name',
    key: 'name',
    width:200
  },
  {
    title: 'Username',
    dataIndex: 'nickName',
    key: 'nickName',
    width:120,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width:120,
    render: (text)=> {
      return text === 'on'? <Tag color='green'>normal</Tag>  :
       <Tag color='cyan'>disable</Tag>;
    }
  },
  {
    title: 'Created At',
    dataIndex: 'createAt',
    width:130,
    key: 'createdAt',
    render:(text)=>dayjs(text).format('MM-DD-YYYY')
  },
]


const User = ()=>{

    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [data,setData] = useState([])
  

    async function fetchData(values={}){
      const res = await getUserList(values);
      const data = res.data;
      setData(data);
    }

    useEffect(()=>{
      fetchData();
    },[])

    async function handleStatusChange(row){
        const status = row.status === 'on' ? 'off' : 'on'
        await userUpdate({...row, status});
        fetchData();
    }

    const columns = [...COLUMNS,{
      title:"Actions",
      key:"action",
      render: (row)=>{
        return <Space>
            <Button type="link" onClick={()=>handleUserEdit(row._id)}>edit</Button>
            <Button type="text" danger onClick={()=>handleUserDelete(row._id)}>delete</Button>
            <Button type="text" danger={row.status === 'on'? true : false} onClick={()=>handleStatusChange(row)} >{row.status === 'on'? 'disable' : 'ennale' }</Button>
        </Space>
      }
    
    }]
    
    async function handleSearchFinish(values){
      const res = await getUserList(values);
      setData(res.data)
  }

  function handleSearchReset(){
      form.resetFields()
  }
  function handleUserEdit(id){
    navigate(`/user/edit/${id}`)
  }

   function handleUserDelete(id){
      Modal.confirm({
        title: "Are you sure you want to delete?",
        okText: "Yes",
        cancelText: "Cancel",
        async onOk(){
            await userDelete(id);
            message.success("Deleted successfully");
            fetchData(form.getFieldValue())
          }
        })
      }
   
  

    return(
         <Layout>
          <Content title={'User List'} operation={<Button type="primary" onClick={()=>navigate("/user/add")}>Add</Button>}>
          <Form
        form ={form}
        name="search"
      onFinish={handleSearchFinish}
      initialValues={{
        name:"",
        status:""
      }}
    >
        <Row gutter={24}>
        <Col span={5}>
      <Form.Item name="name" label="Name">
        <Input placeholder='username' allowClear/>
      </Form.Item>
      </Col>
      <Col span={5}>
      <Form.Item name="status" label="Status" >
      <Select
        allowClear
        options={STATUS_OPTIONS}
      />
      </Form.Item>
      </Col>
      <Col span={9}>
        <Button type="primary" htmlType="submit">
          search
        </Button>
        &nbsp;
        <Button onClick={handleSearchReset}>
          clear all
        </Button>
      </Col>
      </Row>
          </Form>
        <div className='table-container'>
            <Table 
              dataSource={data} 
              columns={columns} 
              scroll={{x:1000}}
              pagination={{defaultCurrent: 1, pageSize:10 }} 
            />
        </div>
        </Content>
        </Layout>
    )
}

export default User