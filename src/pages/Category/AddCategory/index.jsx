import React from 'react'
import Layout from "../../../components/Layout"
import CategoryForm from "../../../components/CategoryForm"
import Content from '../../../components/Content'

const AddCategory = ()=>{
    return(
        <Layout>
            <Content title={'Add Category'}>
                <CategoryForm />
            </Content>
        </Layout>
    )
}

export default AddCategory