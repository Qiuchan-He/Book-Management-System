import React, {useState,useEffect,useMemo} from 'react';
import {Button,  Form, Input, Select, message} from 'antd';
import {categoryAdd,getCategoryList} from "../../api/api.js"
import { useNavigate } from 'react-router-dom';
import "./style.less"

const CategoryForm = ()=>{

    const [level, setLevel] = useState();
    const [levelOneList, setLevelOneList] = useState([])
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const LEVEL = {
      ONE: 1,
      TWO: 2
    }

    async function fetchData() {
      const res = await getCategoryList();
      setLevelOneList(res.data);
    }

    useEffect(()=>{fetchData()},[])

    const levelOneOptions = useMemo(()=>{return levelOneList.map((item)=>({
      value:item._id,
      label:item.name
    }));
  },[levelOneList])

    async function handleFinish(values){
       await categoryAdd(values);
       message.success("category added successfully");
       navigate("/category");
    }

    return(
        <>
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
        <Form.Item label="name" name='name' rules={[{
          required:true,
          message:"book name is required"
        }]}>
          <Input placeholder='please input'/>
        </Form.Item>
          <Form.Item name="level" label="Level" rules={[{
            required:true,
            message:"level is required"
          }]} >
            <Select
              allowClear
              options={[
                  {value:LEVEL.ONE, label:"level_1"},
                  {value:LEVEL.TWO, label:"level_2"} 
              ]}
              onChange={(value)=> setLevel(value)}
            />
          </Form.Item>
        

          {level === 2 &&
            <Form.Item name="ParentLevel" label="parent-Level" rules={[{
            required:true,
            message:"parent-level is required"
            }]} >
            <Select
              allowClear
              options={levelOneOptions
              }
            />
          </Form.Item>
          }
      

      <Form.Item label=" " colon={false}>
        <Button size="large" type="primary" htmlType='submit' className='add-btn'>create</Button>
      </Form.Item>
      </Form>
       </>
    )
}


export default CategoryForm

