import React, {useState} from 'react';
import {Button, DatePicker, Form, Input, InputNumber,Select,Image, message} from 'antd';
import {bookAdd} from "../../api/api.js"
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
import "./style.less"

const { TextArea } = Input;

const BookForm = ()=>{

    
    const [preview, setPreview] = useState("")
    const [form] = Form.useForm()
    const navigate = useNavigate();


    async function handleFinish(value){
       if(value.publishAt){
          value.publishAt = dayjs(value.publishAt).valueOf()
       }
       await bookAdd(value);
       message.success("book added successfully");
       navigate("/book");
    }

    return(
        <div>

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
        <Form.Item label="book-name" name='name' rules={[{
          required:true,
          message:"book name is required"
        }]}>
          <Input placeholder='please input'/>
        </Form.Item>
        <Form.Item label="author" name="author" rules={[{
          required:true,
          message:"author is required"
        }]}>
          <Input placeholder='please input'/>
        </Form.Item>
        <Form.Item label="category" name="category" rules={[{
          required:true,
          message:"please choose the category"
        }]}>
          <Select placeholder='please choose'>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="cover" name="cover">
          <Input.Group compact>
              <Input placeholder='please input' 
              style={{width:"calc(100% - 86px)"}}
              onChange={(e)=>{form.setFieldValue('cover', e.target.value)}}
              />
              <Button type="primary" onClick={(e)=>{setPreview(form.getFieldValue('cover'))}}>Preview</Button>
          </Input.Group>
        </Form.Item >
        {
          preview && <Form.Item label=" " colon={false}>
          <Image src={preview} width={100} height={100} alt="preview cover"/>
        </Form.Item>
        }
        <Form.Item label="date" name="publishAt">
          <DatePicker placeholder='please choose'/>
        </Form.Item>
        <Form.Item label="stock" name="stock">
          <InputNumber placeholder='please input'/>
        </Form.Item>
        <Form.Item label="description" name="description">
          <TextArea rows={4} placeholder='please input' />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button size="large" type="primary" htmlType='submit' className='add-btn'>create</Button>
        </Form.Item>
      </Form>
        </div>
    )
}


export default BookForm

