import React from 'react';
import {Button, Form, Input, message, Radio} from 'antd';
import { useNavigate } from 'react-router-dom'
import {userAdd} from "../../api/api.js"
import "./style.less"


const UserForm = ()=>{

    const [form] = Form.useForm()
    const navigate = useNavigate();


    async function handleFinish(values){
       await userAdd(values);
       message.success("user edit successfully");
       navigate("/user");
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
        initialValues={{
          account:"",
          name: "",
          gender:"female",
          password:"",
          status:"on",
          role:"user"

        }}
      >
        <Form.Item label="account" name='account' rules={[{
          required:true,
          message:"account is required"
        }]}>
          <Input placeholder='please input'/>
        </Form.Item>
        <Form.Item label="name" name="name" rules={[{
          required:true,
          message:"name is required"
        }]}>
          <Input placeholder='please input'/>
        </Form.Item>
        <Form.Item label="gender" name="gender">
          <Radio.Group>
            <Radio value="male">male</Radio>
            <Radio value="female">female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="password" name="password">
              <Input.Password placeholder='please input' />
        </Form.Item >
        <Form.Item label="status" name="status">
          <Radio.Group>
              <Radio value="on">enable</Radio>
              <Radio value="off">disable</Radio>
         </Radio.Group>
        </Form.Item >
        <Form.Item label="role" name="role">
          <Radio.Group>
              <Radio value="user">user</Radio>
              <Radio value="admin">admin</Radio>
         </Radio.Group>
        </Form.Item >
        <Form.Item label=" " colon={false}>
          <Button size="large" type="primary" htmlType='submit' className='add-btn'>create</Button>
        </Form.Item>
      </Form>
        </div>
    )
}


export default UserForm

