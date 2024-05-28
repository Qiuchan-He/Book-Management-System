import React, {useEffect,useState} from 'react'
import {Button,Form, Select,message} from 'antd';
import {getUserList, getBookList, borrowAdd} from "../../api/api.js"

const BorrowForm = ()=>{
    const [form] = Form.useForm();
    const [userList, setUserList] = useState([])
    const [bookList, setBookList] = useState([])
    const [stock, setStock] = useState(0)

    async function handleFinish(values){
        await borrowAdd(values)
        message.success('edit successfully')
    }

    useEffect(()=>{
        getUserList().then(res=>{
            setUserList(res.data)
        });
        getBookList().then(res=>{
            setBookList(res.data)
        });
    },[])

    function handleBookChange(value,option){
        setStock(option.stock)
    }

    return(
                <Form
            labelCol={{
            span: 6,
            }}
            wrapperCol={{
            span: 18,
            }}
            layout="horizontal"
            form={form}
            onFinish={handleFinish}
        >
            <Form.Item label="book-name" name='book' rules={[{
            required:true,
            message:"book name is required"
            }]}>
            <Select 
                placeholder="please choose" 
                onChange= {(value,option)=>handleBookChange(value,option)}
                options={bookList.map((item)=>(
                    {label:item.name,
                     value:item._id,
                     stock:item.stock
                     }))}>
            </Select>
            </Form.Item>
            <Form.Item label="borrower" name="user" rules={[{
            required:true,
            message:"author is required"
            }]}>
            <Select 
                placeholder="please choose" 
                options={userList.map((item)=>(
                    {label:item.name,
                     value:item._id
                     }))}>
            </Select>
            </Form.Item>
            <Form.Item label="Stock" name="stock">
                {stock}
            </Form.Item>
            <Form.Item label=" " colon={false}>
            <Button size="large" type="primary" htmlType='submit' className='add-btn' disabled={stock <= 0}>create</Button>
            </Form.Item>
              </Form>
    )
}

export default BorrowForm