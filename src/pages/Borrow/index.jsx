import React,{useState, useEffect} from 'react'
import Layout from "../../components/Layout"
import Content from "../../components/Content"
import { Button, Form, Select,Col, Row, Table,Space, message, Tag, Modal } from 'antd'; 
import {useNavigate} from'react-router-dom'
import dayjs from "dayjs"
import { getBookList,getBorrowList,borrowDelete } from '../../api/api.js';
import "./style.less"



const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'bookName',
    key: 'bookName',
    width:150
  },

  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width:80,
    render: (text)=>
        text === "on"? <Tag color='red'>borrowed</Tag>:
        <Tag color="green">returned</Tag>


  },
  {
    title: 'Borrower',
    dataIndex: 'borrowUser',
    key: 'borrowUser',
    width:150,
    ellipsis:true,
  },
  {
    title: 'Borrowed At',
    dataIndex: 'borrowAt',
    width:130,
    key: 'borrowAt',
    render:(text)=>dayjs(text).format('MM-DD-YYYY')
  },
  {
    title: 'Return At',
    dataIndex: 'backAt',
    width:130,
    key: 'backAt',
    render:(text)=>dayjs(text).format('MM-DD-YYYY')
  },
]

const STATUS_OPTIONS = [
  {
    label:"borrowed",
    value:"on"
  },
  {
    label:"returned",
    value:"off"
  }
]

const Borrow = ()=>{

    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [data,setData] = useState([])
    const [bookList, setBookList] = useState([])
  

    async function fetchData(values={}){
      const resBook = await getBookList(values);
      const resBorrow = await getBorrowList();
      const newData = resBorrow.data.map((item)=>({
        ...item,
        bookName:item.book.name,
        borrowUser:item.user.nickName
      }))
      setBookList(resBook.data);
      setData(newData);
    }

    useEffect(()=>{
      fetchData();
    },[])


    const columns = [...COLUMNS,{
      title:"Actions",
      key:"action",
      render: (row)=>{
        return <Space>
            <Button type="text" danger onClick={()=>handleBorrowDelete(row._id)}>delete</Button>
        </Space>
      }
    
    }]
    
    async function handleSearchFinish(values){
      const res = await getBorrowList(values); 
      const newData = res.data.map((item)=>({
        ...item,
        bookName:item.book.name,
        borrowUser:item.user.nickName
      }))
      setData(newData)
  }

  function handleSearchReset(){
      form.resetFields()
  }

  async function handleBorrowDelete(id){
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      cancelText: "Cancel",
      async onOk(){
          await borrowDelete(id);
          message.success("Deleted successfully");
          fetchData(form.getFieldValue())
        }
      })
  }
  

    return(
         <Layout>
          <Content title={'Borrow List'} operation={<Button type="primary" onClick={()=>navigate("/borrow/add")}>borrow</Button>}>
          <Form
        form ={form}
        name="search"
        onFinish={handleSearchFinish}
        initialValues={{
        name:"",
        author:"",
        category:""
      }}
    >
        <Row gutter={24}>
        <Col span={5}>
      <Form.Item name="name" label="name">
       <Select 
       allowClear
       showSearch
       optionFilterProp="label"
       options={bookList.map(item=>
       ({label: item.name, value: item._id}))} />
      </Form.Item>
      </Col>
      <Col span={5}>
      <Form.Item name="status" label="status">
      <Select  allowClear options={STATUS_OPTIONS} />
      </Form.Item>
      </Col>
      <Col span={5}>
      <Form.Item name="borrower" label="borrower" >
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

export default Borrow