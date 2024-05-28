import React,{useState, useEffect} from 'react'
import Layout from "../../components/Layout"
import Content from "../../components/Content"
import { Button, Form, Input, Select,Col, Row, Table,Space, message, Modal } from 'antd'; 
import {useNavigate} from'react-router-dom'
import dayjs from "dayjs"
import pic1 from "../../assets/images/cover.jpeg"
import { getBookList, bookDelete } from '../../api/api.js';
import "./style.less"



const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width:200
  },
  {
    title: 'Cover',
    dataIndex: 'cover',
    key: 'cover',
    width:120,
    render:(text)=>{
      return <img src={pic1} alt="" width={80}/>
    }
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
    width:120
  },
  {
    title: 'Intro',
    dataIndex: 'description',
    key: 'description',
    width:200,
    ellipsis:true,
  },
  {
    title: 'Inventory',
    dataIndex: 'stock',
    key: 'stock',
    width:80
  },
  {
    title: 'Created At',
    dataIndex: 'createAt',
    width:130,
    key: 'createdAt',
    render:(text)=>dayjs(text).format('MM-DD-YYYY')
  },
]


const Book = ()=>{

    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [data,setData] = useState([])
   
  

    async function fetchData(values={}){
      const res = await getBookList(values);
      const data = res.data
      setData(data);
    }


    const columns = [...COLUMNS,{
      title:"Actions",
      key:"action",
      render: (row)=>{
        return <Space>
            <Button type="link" onClick={()=>handleBookEdit(row._id)}>edit</Button>
            <Button type="text" danger onClick={()=>handleBookDelete(row._id)}>delete</Button>
        </Space>
      }
    
    }]
    
    async function handleSearchFinish(values){
      const res = await getBookList(values);
      setData(res.data)
  }

  function handleSearchReset(){
      form.resetFields()
  }

  function handleBookEdit(id){
    navigate(`/book/edit/${id}`)
  }

  async function handleBookDelete(id){
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      cancelText: "Cancel",
      async onOk(){
          await bookDelete(id);
          message.success("Deleted successfully");
          fetchData(form.getFieldValue())
        }
      })
  }
  useEffect(()=>{
    fetchData();
  },[]) 
  

    return(
         <Layout>
          <Content title={'Book List'} operation={<Button type="primary" onClick={()=>navigate("/book/add")}>Add</Button>}>
          <Form
        form ={form}
        name="search"
      onFinish={handleSearchFinish}
      initialValues={{
        name:"",
        author:"",
        category:""
      }}
      className='form'
    >
        <Row gutter={24}>
        <Col span={5}>
      <Form.Item name="name" label="book-name">
        <Input placeholder='book name' allowClear/>
      </Form.Item>
      </Col>
      <Col span={5}>
      <Form.Item name="author" label="author">
      <Input placeholder='book author' allowClear/>
      </Form.Item>
      </Col>
      <Col span={5}>
      <Form.Item name="category" label="category" >
      <Select
        allowClear
        options={[
            {value:"novel", label:"novel"},
            {value:"drama", label:"drama"},
            {value:"epic", label:"epic"}
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
            <Table 
              dataSource={data} 
              columns={columns} 
              scroll={{x:1000}}
              pagination={{defaultCurrent: 1, pageSize:6 }} 
              className='book-table'
            />
        </Content>
        </Layout>
    )
}

export default Book