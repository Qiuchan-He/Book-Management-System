import React,{useState, useEffect} from 'react'
import Layout from "../../components/Layout"
import Content from "../../components/Content"
import { Button, Form, Input, Select,Col, Row, Table,Space, Tag, Modal, message } from 'antd'; 
import {useNavigate} from'react-router-dom'
import dayjs from "dayjs"
import { getCategoryList, categoryDelete } from '../../api/api.js';
import "./style.less"



const LEVEL = {
  ONE: 1,
  TWO: 2
}
const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width:200
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
    width:120,
    render: (text)=>{
      return <Tag color={text === 1? 'green': 'cyan'}>{`Level${text}`}</Tag>
    }
  },
  {
    title: 'Category',
    dataIndex: 'parent',
    key: 'parent',
    width:120,
    render: (text)=> {
      return text.name? text.name : '__'    
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


const Category = ()=>{

    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [data,setData] = useState([])
  

    async function fetchData(values={}){
      const res = await getCategoryList(values);
      const data = res.data;
      setData(data);
    }

    useEffect(()=>{
      fetchData();
    },[])


    const columns = [...COLUMNS,{
      title:"Actions",
      key:"action",
      render: (row)=>{
        return <Space>
            <Button type="link" onClick={()=>handleCategoryEdit(row._id)}>edit</Button>
            <Button type="text" danger onClick={()=>handleCategoryDelete(row._id)}>delete</Button>
        </Space>
      }
    
    }]
    
    async function handleSearchFinish(values){
      const res = await getCategoryList(values);
      setData(res.data)
  }

  function handleSearchReset(){
      form.resetFields()
  }
  function handleCategoryEdit(id){
    navigate(`/category/edit/${id}`)
  }

   function handleCategoryDelete(id){
      Modal.confirm({
        title: "Are you sure you want to delete?",
        okText: "Yes",
        cancelText: "Cancel",
        async onOk(){
            await categoryDelete(id);
            message.success("Deleted successfully");
            fetchData(form.getFieldValue())
          }
        })
      }
   
  

    return(
         <Layout>
          <Content title={'Category List'} operation={<Button type="primary" onClick={()=>navigate("/category/add")}>Add</Button>}>
          <Form
        form ={form}
        name="search"
      onFinish={handleSearchFinish}
      initialValues={{
        name:"",
        level:""
      }}
    >
        <Row gutter={24}>
        <Col span={5}>
      <Form.Item name="name" label="Name">
        <Input placeholder='category name' allowClear/>
      </Form.Item>
      </Col>
      <Col span={5}>
      <Form.Item name="level" label="Level" >
      <Select
        allowClear
        options={[
            {value:LEVEL.ONE, label:"level_1"},
            {value:LEVEL.TWO, label:"level_2"}
            
        ]}
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

export default Category