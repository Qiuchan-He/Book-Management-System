import React from 'react'
import Layout from "../../../components/Layout"
import Content from "../../../components/Content"
import UserForm from "../../../components/UserForm"


const AddUser = ()=>{
    return(
        <Layout>
            <Content title="Edit User">
               <UserForm />
            </Content>
        </Layout>
    )
}

export default AddUser