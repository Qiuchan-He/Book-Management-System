import React from 'react'
import {Form, Input, Button, message} from "antd"
import {login} from "../../api/api.js"
import { useNavigate } from 'react-router-dom'
import "./style.less"

const Login = ()=>{

    const navigate = useNavigate();

    async function handleFinish(values){
        const res = await login(values)
        if(res.status === 200){
            localStorage.setItem("user", JSON.stringify(res.data));
            message.success("login successfully")
            navigate('/book')
        }
    }
    
    return(
        <div className='login-container'>
            <h2 className='login-title'>Book Manage System</h2>
          <Form onFinish={handleFinish}>
            <Form.Item label="account" name="account" rules={[{
            required:true,
            message:"account is required"
            }]}>
                <Input placeholder='please input account'/>
            </Form.Item>  
            <Form.Item label="password" name="password" rules={[{
            required:true,
            message:"password is required"
            }]}>
                <Input.Password placeholder='please input password'/>
            </Form.Item>  
            <Form.Item  className="login-btn">
                <Button type="primary" htmlType="submit" size="large">Login</Button>  
            </Form.Item>
          </Form>
        </div>
    )
}

export default Login